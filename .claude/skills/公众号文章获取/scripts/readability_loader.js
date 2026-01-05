/**
 * Readability Loader - Smart loader for Readability extraction
 *
 * This loader intelligently chooses the best way to load and execute Readability:
 * 1. Check if Readability is already loaded in the page
 * 2. Try to load from local embedded version (readability_extractor.js)
 * 3. Fallback to CDN if local loading fails
 * 4. Fallback to basic extraction if all else fails
 *
 * Version: 2.1.0
 */

(async function() {
  const SKILL_PATH = '/Users/pan/.claude/skills/web-article-extractor/scripts';

  /**
   * Load Readability extractor script
   */
  async function loadReadabilityExtractor() {
    // Method 1: Try to read from local file using Node.js fs (if available in context)
    if (typeof require !== 'undefined') {
      try {
        const fs = require('fs');
        const path = require('path');
        const scriptPath = path.join(SKILL_PATH, 'readability_extractor.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        return eval(scriptContent);
      } catch (error) {
        console.warn('Failed to load via Node.js fs:', error.message);
      }
    }

    // Method 2: Try to load as external script
    if (typeof window !== 'undefined') {
      try {
        return await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = `file://${SKILL_PATH}/readability_extractor.js`;
          script.onload = () => {
            // Script loaded, now execute the extraction
            resolve(window.__readabilityResult);
          };
          script.onerror = () => reject(new Error('Failed to load script via script tag'));
          document.head.appendChild(script);
        });
      } catch (error) {
        console.warn('Failed to load via script tag:', error.message);
      }
    }

    // Method 3: Fallback to CDN version
    console.warn('Local loading failed, falling back to CDN version');
    return await loadFromCDN();
  }

  /**
   * Fallback: Load from CDN
   */
  async function loadFromCDN() {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });
    };

    try {
      await loadScript('https://cdn.jsdelivr.net/npm/@mozilla/readability@0.6.0/Readability-readerable.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mozilla/readability@0.6.0/Readability.min.js');

      // Execute extraction logic
      return await extractWithReadability();
    } catch (error) {
      throw new Error('CDN loading failed: ' + error.message);
    }
  }

  /**
   * Extract article using Readability
   */
  async function extractWithReadability() {
    // Check if Readability is available
    if (typeof Readability === 'undefined') {
      throw new Error('Readability is not available');
    }

    // Pre-check
    let isReaderable = true;
    if (typeof isProbablyReaderable !== 'undefined') {
      isReaderable = isProbablyReaderable(document, {
        minContentLength: 140,
        minScore: 20
      });
    }

    const documentClone = document.cloneNode(true);
    const reader = new Readability(documentClone, {
      debug: false,
      charThreshold: 500,
      keepClasses: false
    });

    const article = reader.parse();

    if (!article) {
      throw new Error('Readability failed to parse article');
    }

    // Extract metadata
    const wordCount = article.textContent.split(/\s+/).length;

    return {
      success: true,
      extractionMethod: 'readability',
      title: article.title,
      content: article.textContent,
      contentHtml: article.content,
      author: article.byline,
      excerpt: article.excerpt,
      wordCount: wordCount,
      readingTime: Math.ceil(wordCount / 200),
      url: window.location.href,
      extractedAt: new Date().toISOString()
    };
  }

  /**
   * Fallback: Basic extraction
   */
  function basicExtraction() {
    return {
      success: false,
      extractionMethod: 'fallback',
      title: document.querySelector('h1')?.innerText || document.title,
      content: document.body.innerText.substring(0, 10000),
      url: window.location.href,
      extractedAt: new Date().toISOString()
    };
  }

  // Main execution
  try {
    const result = await loadReadabilityExtractor();
    return result;
  } catch (error) {
    console.error('Readability loading failed:', error);

    // Try CDN fallback
    try {
      return await loadFromCDN();
    } catch (cdnError) {
      console.error('CDN fallback failed:', cdnError);

      // Final fallback: basic extraction
      return basicExtraction();
    }
  }
})();
