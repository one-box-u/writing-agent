/**
 * Markdown Converter with Turndown.js
 *
 * Converts HTML content to clean Markdown format with images
 * Uses Turndown.js for HTML to Markdown conversion
 *
 * @see https://github.com/mixmark-io/turndown
 */

(async function() {
  // Helper: Load Turndown.js from CDN
  async function loadTurndown() {
    if (window.TurndownService) {
      return true;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/turndown@7.1.3/dist/turndown.min.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Turndown.js'));
      document.head.appendChild(script);
    });
  }

  // Helper: Load Readability.js from CDN
  async function loadReadability() {
    if (window.Readability) {
      return true;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@mozilla/readability@0.5.0/Readability.min.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Readability.js'));
      document.head.appendChild(script);
    });
  }

  try {
    // Load both libraries
    await Promise.all([loadTurndown(), loadReadability()]);

    // Clone the document for parsing
    const documentClone = document.cloneNode(true);

    // Create Readability instance
    const reader = new Readability(documentClone, {
      debug: false,
      maxElemsToParse: 0,
      nbTopCandidates: 5,
      charThreshold: 500,
      classesToPreserve: ['caption', 'credit', 'figure']
    });

    // Parse the article
    const article = reader.parse();

    if (!article) {
      throw new Error('Readability failed to extract article content');
    }

    // Extract metadata
    const metadata = {
      author: article.byline ||
              document.querySelector('meta[name="author"]')?.content ||
              document.querySelector('[rel="author"]')?.innerText ||
              document.querySelector('.author-name, .byline, .post-author')?.innerText ||
              null,

      publishDate: document.querySelector('time')?.getAttribute('datetime') ||
                   document.querySelector('meta[property="article:published_time"]')?.content ||
                   document.querySelector('.publish-date, .post-date, .entry-date')?.innerText ||
                   null,

      tags: [],
      categories: []
    };

    // Extract tags
    const keywords = document.querySelector('meta[name="keywords"]')?.content;
    if (keywords) {
      metadata.tags = keywords.split(',').map(t => t.trim());
    }

    // Extract categories
    metadata.categories = Array.from(document.querySelectorAll('.category, .tag, [rel="category tag"]'))
      .map(el => el.innerText.trim())
      .filter(Boolean);

    // Extract images from parsed content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = article.content;
    const images = Array.from(tempDiv.querySelectorAll('img'))
      .map(img => ({
        src: img.src || img.getAttribute('data-src') || img.getAttribute('data-original'),
        alt: img.alt || '',
        title: img.title || ''
      }))
      .filter(img => img.src && !img.src.includes('data:image'));

    // Initialize Turndown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      hr: '---',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
      emDelimiter: '*',
      strongDelimiter: '**',
      linkStyle: 'inlined',
      linkReferenceStyle: 'full'
    });

    // Add custom rules for better conversion

    // Rule: Preserve image attributes
    turndownService.addRule('images', {
      filter: 'img',
      replacement: function(content, node) {
        const alt = node.getAttribute('alt') || '';
        const src = node.getAttribute('src') ||
                   node.getAttribute('data-src') ||
                   node.getAttribute('data-original') || '';
        const title = node.getAttribute('title') || '';

        if (!src) return '';

        const titlePart = title ? ` "${title}"` : '';
        return `![${alt}](${src}${titlePart})`;
      }
    });

    // Rule: Better handling of code blocks
    turndownService.addRule('codeBlocks', {
      filter: function(node) {
        return node.nodeName === 'PRE' && node.querySelector('code');
      },
      replacement: function(content, node) {
        const code = node.querySelector('code');
        const language = code ? (code.className.match(/language-(\w+)/) || [])[1] || '' : '';
        const text = code ? code.textContent : node.textContent;
        return '\n\n```' + language + '\n' + text + '\n```\n\n';
      }
    });

    // Convert HTML to Markdown
    const markdown = turndownService.turndown(article.content);

    // Build the final Markdown document
    const frontMatter = [];
    frontMatter.push('---');
    frontMatter.push(`title: "${article.title}"`);
    if (metadata.author) frontMatter.push(`author: "${metadata.author}"`);
    if (metadata.publishDate) frontMatter.push(`date: "${metadata.publishDate}"`);
    if (article.siteName) frontMatter.push(`source: "${article.siteName}"`);
    frontMatter.push(`url: "${window.location.href}"`);
    if (metadata.tags.length > 0) frontMatter.push(`tags: [${metadata.tags.map(t => `"${t}"`).join(', ')}]`);
    if (metadata.categories.length > 0) frontMatter.push(`categories: [${metadata.categories.map(c => `"${c}"`).join(', ')}]`);
    frontMatter.push('---');
    frontMatter.push('');

    const finalMarkdown = [
      ...frontMatter,
      `# ${article.title}`,
      '',
      article.excerpt ? `> ${article.excerpt}` : '',
      article.excerpt ? '' : '',
      markdown,
      '',
      '---',
      '',
      `**来源:** [${article.siteName || '原文链接'}](${window.location.href})`,
      metadata.author ? `**作者:** ${metadata.author}` : '',
      metadata.publishDate ? `**发布时间:** ${metadata.publishDate}` : ''
    ].filter(line => line !== null).join('\n');

    // Calculate statistics
    const wordCount = article.textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      success: true,
      markdown: finalMarkdown,

      // Metadata
      title: article.title,
      author: metadata.author,
      publishDate: metadata.publishDate,
      siteName: article.siteName,
      url: window.location.href,
      canonicalUrl: document.querySelector('link[rel="canonical"]')?.href || window.location.href,

      // Content info
      excerpt: article.excerpt,
      wordCount: wordCount,
      readingTime: readingTime,

      // Images
      images: images,
      imageCount: images.length,

      // Tags and categories
      tags: metadata.tags,
      categories: metadata.categories,

      // Extraction info
      extractedAt: new Date().toISOString(),
      extractionMethod: 'turndown+readability'
    };

  } catch (error) {
    console.error('Markdown conversion failed:', error);

    // Fallback: simple conversion
    const title = document.querySelector('h1')?.innerText || document.title;
    const content = document.body.innerText.substring(0, 10000);

    const fallbackMarkdown = [
      '---',
      `title: "${title}"`,
      `url: "${window.location.href}"`,
      '---',
      '',
      `# ${title}`,
      '',
      content,
      '',
      '---',
      '',
      `**来源:** [原文链接](${window.location.href})`
    ].join('\n');

    return {
      success: false,
      error: error.message,
      markdown: fallbackMarkdown,
      title: title,
      url: window.location.href,
      extractedAt: new Date().toISOString(),
      extractionMethod: 'fallback'
    };
  }
})();
