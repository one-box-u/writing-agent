# Markdown 导出使用指南

本指南介绍如何使用 web-article-extractor 提取文章并保存为 Markdown 格式（包含图片）。

## 快速开始

### 方法 1：使用 Claude Code（推荐）

最简单的方式是直接在 Claude Code 中使用：

```
提取这篇文章并保存为 markdown：https://example.com/article
```

Claude 会自动：
1. 提取文章内容
2. 转换为 Markdown 格式
3. 下载所有图片
4. 保存到本地文件

### 方法 2：手动步骤

如果需要更多控制，可以按以下步骤操作：

#### 步骤 1：提取文章并转换为 Markdown

```javascript
// 在浏览器 DevTools 中运行
const result = await mcp__chrome_devtools__evaluate_script({
  function: await fs.readFile(
    '~/.claude/skills/web-article-extractor/scripts/markdown_converter.js',
    'utf8'
  )
});

const articleData = JSON.parse(result);
console.log(articleData);
```

#### 步骤 2：保存数据到临时文件

```javascript
// 将提取的数据保存到临时文件
await fs.writeFile('/tmp/article-data.json', JSON.stringify(articleData, null, 2));
```

#### 步骤 3：下载图片并保存 Markdown

```bash
# 使用 Node.js 脚本下载图片并保存
node ~/.claude/skills/web-article-extractor/scripts/save_with_images.js \
  /tmp/article-data.json \
  ./output
```

## 完整示例

### 示例 1：提取微信公众号文章

```javascript
// 1. 导航到文章页面
await mcp__chrome_devtools__navigate_page({
  type: 'url',
  url: 'https://mp.weixin.qq.com/s/xxxxx'
});

// 2. 等待页面加载
await new Promise(resolve => setTimeout(resolve, 3000));

// 3. 运行 Markdown 转换脚本
const markdownScript = await fs.readFile(
  '~/.claude/skills/web-article-extractor/scripts/markdown_converter.js',
  'utf8'
);

const result = await mcp__chrome_devtools__evaluate_script({
  function: markdownScript
});

const articleData = JSON.parse(result);

// 4. 保存临时数据
await fs.writeFile('./article-data.json', JSON.stringify(articleData, null, 2));

console.log('✅ 文章提取完成！');
console.log(`标题: ${articleData.title}`);
console.log(`图片数量: ${articleData.imageCount}`);
console.log(`字数: ${articleData.wordCount}`);

// 5. 使用 Node.js 下载图片并保存
// 在终端运行：
// node save_with_images.js article-data.json ./output
```

### 示例 2：批量提取文章

```javascript
const urls = [
  'https://example.com/article1',
  'https://example.com/article2',
  'https://example.com/article3'
];

for (const url of urls) {
  // 导航到页面
  await mcp__chrome_devtools__navigate_page({ type: 'url', url });

  // 等待加载
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 提取并转换
  const result = await mcp__chrome_devtools__evaluate_script({
    function: markdownScript
  });

  const articleData = JSON.parse(result);

  // 保存
  const filename = `article-${Date.now()}.json`;
  await fs.writeFile(filename, JSON.stringify(articleData, null, 2));

  console.log(`✅ 已保存: ${articleData.title}`);
}
```

## 输出文件结构

保存后的文件结构如下：

```
output/
├── 2025-01-15-article-title.md          # Markdown 文件
├── 2025-01-15-article-title.json        # 元数据 JSON
└── images/                               # 图片目录
    ├── image-0-cover.jpg
    ├── image-1-diagram.png
    └── image-2-screenshot.jpg
```

## Markdown 文件格式

生成的 Markdown 文件包含 YAML Front Matter：

```markdown
---
title: "文章标题"
author: "作者名称"
date: "2025-01-15"
source: "网站名称"
url: "https://example.com/article"
tags: ["标签1", "标签2"]
categories: ["分类1"]
---

# 文章标题

> 文章摘要或预览文本

## 第一章节

正文内容...

![图片描述](images/image-0-cover.jpg)

更多内容...

---

**来源:** [网站名称](https://example.com/article)
**作者:** 作者名称
**发布时间:** 2025-01-15
```

## 配置选项

### 保存选项

```javascript
const options = {
  downloadImages: true,           // 是否下载图片
  imagesSubdir: 'images',        // 图片子目录名称
  maxConcurrentDownloads: 5      // 最大并发下载数
};

await saveArticleWithImages(articleData, './output', options);
```

### Turndown 转换选项

Markdown 转换器使用以下默认配置：

```javascript
{
  headingStyle: 'atx',           // 使用 # 标题样式
  hr: '---',                     // 分隔线样式
  bulletListMarker: '-',         // 无序列表标记
  codeBlockStyle: 'fenced',      // 代码块使用围栏样式
  emDelimiter: '*',              // 斜体分隔符
  strongDelimiter: '**',         // 粗体分隔符
  linkStyle: 'inlined'           // 链接样式
}
```

## 处理特殊网站

### 微信公众号

微信文章的图片可能使用 `data-src` 属性，转换器会自动处理：

```javascript
// 自动检测多种图片属性
const src = img.getAttribute('src') ||
           img.getAttribute('data-src') ||
           img.getAttribute('data-original');
```

### 知乎文章

知乎文章可能有懒加载图片，建议先滚动页面：

```javascript
// 滚动触发懒加载
await mcp__chrome_devtools__evaluate_script({
  function: `
    async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 2000));
      window.scrollTo(0, 0);
    }
  `
});
```

### Medium 文章

Medium 使用特殊的图片格式，可能需要额外处理：

```javascript
// Medium 图片通常在 figure 标签中
turndownService.addRule('mediumImages', {
  filter: function(node) {
    return node.nodeName === 'FIGURE' && node.querySelector('img');
  },
  replacement: function(content, node) {
    const img = node.querySelector('img');
    const figcaption = node.querySelector('figcaption');
    const caption = figcaption ? figcaption.innerText : '';
    return `![${caption}](${img.src})\n${caption ? `\n*${caption}*\n` : ''}`;
  }
});
```

## 常见问题

### Q: 图片下载失败怎么办？

A: 图片下载失败时，Markdown 中会保留原始 URL。可以：
1. 检查网络连接
2. 确认图片 URL 是否有效
3. 查看是否需要认证或特殊 headers

### Q: 如何处理超大图片？

A: 可以在下载前添加图片大小限制：

```javascript
async function downloadImage(url, filepath, maxSize = 10 * 1024 * 1024) {
  // 添加大小检查逻辑
}
```

### Q: 如何自定义 Markdown 格式？

A: 修改 `markdown_converter.js` 中的 Turndown 配置和自定义规则。

### Q: 支持哪些图片格式？

A: 支持所有常见格式：JPG, PNG, GIF, WebP, SVG 等。

## 技术栈

- **Turndown.js** - HTML 转 Markdown
- **Readability.js** - 文章内容提取
- **Node.js** - 图片下载和文件保存
- **Chrome DevTools MCP** - 浏览器控制

## 性能优化

### 并发下载控制

```javascript
// 限制并发下载数，避免服务器拒绝
const options = {
  maxConcurrentDownloads: 3  // 减少并发数
};
```

### 下载超时设置

```javascript
// 在 save_with_images.js 中修改超时
request.setTimeout(30000, () => {
  // 30秒超时
});
```

### 缓存已下载图片

```javascript
// 检查图片是否已存在
if (await fs.access(filepath).then(() => true).catch(() => false)) {
  console.log('图片已存在，跳过下载');
  return;
}
```

## 许可证

本技能使用的第三方库：

- **Turndown.js** - MIT License
- **Readability.js** - Apache License 2.0

---

*更新于 2025-12-28*
