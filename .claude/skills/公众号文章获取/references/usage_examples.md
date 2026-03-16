# Web Article Extractor - 使用示例

本文档提供在 Claude Code 中使用 web-article-extractor 技能的实际示例。

---

## 基础示例

### 示例 1: 提取博客文章

**用户输入:**
```
请帮我提取这篇文章的内容：https://example.com/blog/ai-trends-2024
```

**Claude 的处理流程:**
1. 识别到需要提取网页内容
2. 使用 Chrome DevTools MCP 打开页面
3. 加载 Readability.js 脚本
4. 提取并返回结构化内容

**返回结果示例:**
```json
{
  "success": true,
  "title": "2024 年 AI 发展趋势",
  "author": "张三",
  "publishDate": "2024-01-15",
  "wordCount": 2500,
  "readingTime": 13,
  "content": "文章正文内容...",
  "contentHtml": "<p>文章正文HTML...</p>",
  "images": [
    {
      "src": "https://example.com/images/ai-trends.jpg",
      "alt": "AI 趋势图表",
      "width": 1200,
      "height": 800
    }
  ],
  "headings": [
    { "level": 2, "text": "大语言模型的进展" },
    { "level": 2, "text": "AI 应用落地" },
    { "level": 3, "text": "企业级应用" }
  ]
}
```

---

### 示例 2: 提取微信公众号文章

**用户输入:**
```
提取这篇微信文章：https://mp.weixin.qq.com/s/xxxxx
```

**Claude 的处理:**
1. 检测到是微信公众号链接
2. 使用自定义微信提取逻辑
3. 设置微信 User-Agent
4. 提取内容

**返回结果:**
```markdown
# 微信文章标题

**公众号：** AI科技前沿
**发布时间：** 2024-01-15

文章正文内容...

---
来源：[微信公众号](https://mp.weixin.qq.com/s/xxxxx)
```

---

### 示例 3: 批量提取多篇文章

**用户输入:**
```
请帮我提取以下文章的内容：
1. https://example.com/article1
2. https://example.com/article2
3. https://example.com/article3
```

**Claude 的处理:**
```typescript
async function extractMultipleArticles(urls) {
  const results = [];

  for (const url of urls) {
    try {
      const article = await extractWithReadability(url);
      results.push({
        url: url,
        success: true,
        data: article
      });
    } catch (error) {
      results.push({
        url: url,
        success: false,
        error: error.message
      });
    }
  }

  return results;
}
```

---

## 高级示例

### 示例 4: 提取并转换为 Markdown

**用户输入:**
```
提取这篇文章并转换为 Markdown 格式：https://example.com/article
```

**Claude 的处理:**
```typescript
async function extractAndConvertToMarkdown(url) {
  // 1. 提取内容
  const article = await extractWithReadability(url);

  // 2. 转换为 Markdown
  let markdown = `# ${article.title}\n\n`;

  if (article.author) {
    markdown += `**作者：** ${article.author}\n`;
  }

  if (article.publishDate) {
    markdown += `**发布时间：** ${article.publishDate}\n`;
  }

  markdown += `**字数：** ${article.wordCount} | **阅读时长：** ${article.readingTime} 分钟\n\n`;

  markdown += `---\n\n`;

  // 添加正文（从 HTML 转换）
  markdown += article.contentHtml
    .replace(/<h2>/g, '\n## ')
    .replace(/<h3>/g, '\n### ')
    .replace(/<p>/g, '\n')
    .replace(/<\/h2>|<\/h3>|<\/p>/g, '\n')
    .replace(/<[^>]+>/g, ''); // 移除其他 HTML 标签

  markdown += `\n\n---\n\n`;
  markdown += `来源：[${article.title}](${article.url})\n`;

  return markdown;
}
```

---

### 示例 5: 提取并保存到本地

**用户输入:**
```
提取这篇文章并保存为 article.json：https://example.com/article
```

**Claude 的处理:**
```typescript
async function extractAndSave(url, filename) {
  // 提取文章
  const article = await extractWithReadability(url);

  // 保存到文件
  await fs.writeFile(
    filename,
    JSON.stringify(article, null, 2),
    'utf8'
  );

  console.log(`文章已保存到 ${filename}`);
  console.log(`标题: ${article.title}`);
  console.log(`字数: ${article.wordCount}`);
  console.log(`阅读时长: ${article.readingTime} 分钟`);
}
```

---

### 示例 6: 提取并分析内容

**用户输入:**
```
分析这篇文章的内容结构：https://example.com/article
```

**Claude 的处理:**
```typescript
async function analyzeArticle(url) {
  const article = await extractWithReadability(url);

  return {
    基本信息: {
      标题: article.title,
      作者: article.author,
      发布时间: article.publishDate,
      来源: article.siteName
    },

    内容统计: {
      字数: article.wordCount,
      段落数: article.contentHtml.match(/<p>/g)?.length || 0,
      图片数: article.images.length,
      标题数: article.headings.length,
      阅读时长: `${article.readingTime} 分钟`
    },

    文章结构: {
      一级标题: article.headings.filter(h => h.level === 1).length,
      二级标题: article.headings.filter(h => h.level === 2).length,
      三级标题: article.headings.filter(h => h.level === 3).length
    },

    大纲: article.headings.map(h => {
      const indent = '  '.repeat(h.level - 1);
      return `${indent}- ${h.text}`;
    }).join('\n'),

    关键词: article.tags.join(', '),

    图片列表: article.images.map((img, i) =>
      `${i + 1}. ${img.alt || '无描述'} (${img.width}x${img.height})`
    ).join('\n')
  };
}
```

---

### 示例 7: 智能降级处理

**用户输入:**
```
提取这个页面的内容（如果 Readability 失败就用简化算法）：https://complex-site.com
```

**Claude 的处理:**
```typescript
async function extractWithFallback(url) {
  const context = await tabs_context_mcp({ createIfEmpty: true });
  const tabId = context.availableTabs[0].tabId;

  await navigate({ tabId, url });

  // 等待加载
  await new Promise(r => setTimeout(r, 2000));

  // 1. 尝试 Readability
  try {
    const readabilityScript = await fs.readFile(
      '.claude/skills/公众号文章获取/scripts/readability_extractor.js',
      'utf8'
    );

    const result = await javascript_tool({
      tabId,
      action: "javascript_exec",
      text: readabilityScript
    });

    const article = JSON.parse(result);

    if (article.success) {
      console.log('✅ 使用 Readability 提取成功');
      return article;
    }
  } catch (error) {
    console.warn('⚠️ Readability 提取失败，降级到简化算法', error);
  }

  // 2. 降级到简化算法
  try {
    const simpleScript = await fs.readFile(
      '.claude/skills/公众号文章获取/scripts/extract_article.js',
      'utf8'
    );

    const result = await javascript_tool({
      tabId,
      action: "javascript_exec",
      text: simpleScript
    });

    const article = JSON.parse(result);
    console.log('✅ 使用简化算法提取成功');
    return article;

  } catch (error) {
    // 3. 最后的降级：基础提取
    console.error('❌ 所有提取方法都失败了，使用基础提取');

    const basicContent = await javascript_tool({
      tabId,
      action: "javascript_exec",
      text: `
        JSON.stringify({
          title: document.title,
          content: document.body.innerText.substring(0, 10000),
          url: window.location.href
        })
      `
    });

    return JSON.parse(basicContent);
  }
}
```

---

## 实际应用场景

### 场景 1: 内容聚合
```
我想创建一个技术文章摘要，请提取以下文章的标题、作者和摘要：
- https://techblog.com/article1
- https://devto.com/article2
- https://medium.com/article3
```

### 场景 2: 研究资料收集
```
帮我收集这 5 篇论文相关文章的内容，并生成 Markdown 格式的阅读笔记
```

### 场景 3: 内容迁移
```
提取我博客上所有文章的内容（URL 列表在 urls.txt），并转换为 Markdown 文件
```

### 场景 4: 内容对比
```
提取这两篇文章并对比它们的异同：
- https://site1.com/ai-trends
- https://site2.com/ai-trends
```

---

## 调试技巧

### 查看提取过程

```typescript
async function debugExtraction(url) {
  console.log('🔍 开始提取:', url);

  const context = await tabs_context_mcp({ createIfEmpty: true });
  const tabId = context.availableTabs[0].tabId;

  console.log('📄 导航到页面...');
  await navigate({ tabId, url });

  console.log('⏳ 等待加载...');
  await new Promise(r => setTimeout(r, 2000));

  console.log('🔧 执行 Readability...');
  const readabilityScript = await fs.readFile(
    '.claude/skills/公众号文章获取/scripts/readability_extractor.js',
    'utf8'
  );

  const result = await javascript_tool({
    tabId,
    action: "javascript_exec",
    text: readabilityScript
  });

  const article = JSON.parse(result);

  console.log('✅ 提取完成!');
  console.log('📊 统计信息:');
  console.log(`   - 标题: ${article.title}`);
  console.log(`   - 字数: ${article.wordCount}`);
  console.log(`   - 图片: ${article.images.length} 张`);
  console.log(`   - 提取方法: ${article.extractionMethod}`);

  return article;
}
```

---

## 性能优化建议

1. **复用浏览器标签页** - 避免频繁创建新标签页
2. **并行处理** - 对于多个 URL，使用 Promise.all
3. **缓存结果** - 避免重复提取相同内容
4. **智能降级** - 根据网站类型选择合适的提取方法
5. **超时控制** - 设置合理的等待时间

---

*更新于 2025-12-28*
