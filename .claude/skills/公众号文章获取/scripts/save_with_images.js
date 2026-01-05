/**
 * Save Article as Markdown with Downloaded Images
 *
 * This script downloads images and saves the article as Markdown
 * Usage: Run this in Node.js environment after extracting article data
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * Download an image from URL
 * @param {string} url - Image URL
 * @param {string} filepath - Local file path to save
 * @returns {Promise<void>}
 */
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = require('fs').createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath).catch(() => {});
        reject(err);
      });
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Download timeout'));
    });
  });
}

/**
 * Generate a safe filename from URL
 * @param {string} url - Image URL
 * @param {number} index - Image index
 * @returns {string}
 */
function generateFilename(url, index) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const ext = path.extname(pathname) || '.jpg';
    const basename = path.basename(pathname, ext).replace(/[^a-zA-Z0-9-_]/g, '');
    return `image-${index}-${basename}${ext}`;
  } catch (error) {
    return `image-${index}.jpg`;
  }
}

/**
 * Sanitize filename
 * @param {string} filename - Original filename
 * @returns {string}
 */
function sanitizeFilename(filename) {
  return filename
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 200);
}

/**
 * Save article with images
 * @param {Object} articleData - Article data from browser extraction
 * @param {string} outputDir - Output directory path
 * @param {Object} options - Options
 * @returns {Promise<Object>}
 */
async function saveArticleWithImages(articleData, outputDir, options = {}) {
  const {
    downloadImages = true,
    imagesSubdir = 'images',
    maxConcurrentDownloads = 5
  } = options;

  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });

    let markdown = articleData.markdown;
    const downloadedImages = [];

    if (downloadImages && articleData.images && articleData.images.length > 0) {
      // Create images subdirectory
      const imagesDir = path.join(outputDir, imagesSubdir);
      await fs.mkdir(imagesDir, { recursive: true });

      // Download images in batches
      const images = articleData.images;
      const imageBatches = [];

      for (let i = 0; i < images.length; i += maxConcurrentDownloads) {
        imageBatches.push(images.slice(i, i + maxConcurrentDownloads));
      }

      let imageIndex = 0;
      for (const batch of imageBatches) {
        const downloadPromises = batch.map(async (image) => {
          const index = imageIndex++;
          const filename = generateFilename(image.src, index);
          const filepath = path.join(imagesDir, filename);
          const relativePath = path.join(imagesSubdir, filename);

          try {
            await downloadImage(image.src, filepath);
            downloadedImages.push({
              original: image.src,
              local: relativePath,
              alt: image.alt
            });

            // Replace image URL in markdown
            markdown = markdown.replace(
              new RegExp(image.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
              relativePath
            );

            return { success: true, image: image.src };
          } catch (error) {
            console.error(`Failed to download ${image.src}:`, error.message);
            return { success: false, image: image.src, error: error.message };
          }
        });

        await Promise.all(downloadPromises);
      }
    }

    // Generate markdown filename
    const title = sanitizeFilename(articleData.title || 'article');
    const timestamp = new Date().toISOString().split('T')[0];
    const markdownFilename = `${timestamp}-${title}.md`;
    const markdownPath = path.join(outputDir, markdownFilename);

    // Save markdown file
    await fs.writeFile(markdownPath, markdown, 'utf-8');

    // Save metadata JSON
    const metadataPath = path.join(outputDir, `${timestamp}-${title}.json`);
    const metadata = {
      ...articleData,
      markdown: undefined, // Don't duplicate markdown content in JSON
      downloadedImages,
      savedAt: new Date().toISOString(),
      files: {
        markdown: markdownFilename,
        imagesDir: downloadImages ? imagesSubdir : null
      }
    };
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');

    return {
      success: true,
      outputDir,
      markdownFile: markdownPath,
      metadataFile: metadataPath,
      imagesDownloaded: downloadedImages.length,
      totalImages: articleData.images?.length || 0
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    saveArticleWithImages,
    downloadImage,
    generateFilename,
    sanitizeFilename
  };
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node save_with_images.js <article-data.json> <output-dir>');
    console.log('');
    console.log('Example:');
    console.log('  node save_with_images.js article.json ./output');
    process.exit(1);
  }

  const dataFile = args[0];
  const outputDir = args[1];

  (async () => {
    try {
      const data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));
      const result = await saveArticleWithImages(data, outputDir);

      if (result.success) {
        console.log('✅ Article saved successfully!');
        console.log(`📄 Markdown: ${result.markdownFile}`);
        console.log(`📊 Metadata: ${result.metadataFile}`);
        console.log(`🖼️  Images: ${result.imagesDownloaded}/${result.totalImages} downloaded`);
      } else {
        console.error('❌ Failed to save article:', result.error);
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  })();
}
