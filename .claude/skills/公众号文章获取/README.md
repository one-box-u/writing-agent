# Web Article Extractor

使用 Chrome DevTools MCP 和 Readability.js 从网页中智能提取文章内容。

## 🎯 功能特性

- ✅ **智能内容提取** - 基于 Mozilla Readability.js 算法
- ✅ **多种提取方法** - Readability、简化算法、自定义选择器
- ✅ **微信公众号支持** - 绕过安全限制，提取微信文章
- ✅ **丰富的元数据** - 标题、作者、发布时间、图片、标签等
- ✅ **自动降级** - 提取失败时自动使用备用方案
- ✅ **结构化输出** - JSON、Markdown、HTML 等多种格式
- ✨ **Markdown 导出** - 使用 Turndown.js 转换为 Markdown 格式 ⭐ 新增
- ✨ **图片下载** - 自动下载并保存文章图片到本地 ⭐ 新增

## 🚀 快速开始

### 在 Claude Code 中使用

```bash
# 提取单篇文章
请提取这篇文章的内容：https://example.com/article

# 提取微信公众号文章
提取这篇微信文章：https://mp.weixin.qq.com/s/xxxxx

# 批量提取
提取这些文章：
- https://site1.com/article1
- https://site2.com/article2
```

### 作为技能调用

Claude 会自动识别文章提取请求并：
1. 打开浏览器标签页
2. 加载 Readability.js 库
3. 智能提取文章内容
4. 返回结构化数据

## 📦 文件结构

```
web-article-extractor/
├── SKILL.md                        # 技能详细文档
├── README.md                       # 本文件
├── scripts/
│   ├── readability_extractor.js   # Readability.js 提取器
│   ├── extract_article.js         # 简化提取器
│   ├── markdown_converter.js      # Markdown 转换器 ⭐ 新增
│   └── save_with_images.js        # 图片下载和保存 ⭐ 新增
└── references/
    ├── usage_examples.md          # 使用示例
    ├── markdown_usage.md          # Markdown 导出指南 ⭐ 新增
    └── selector_patterns.md       # CSS 选择器参考
```

## 🆕 最新更新 (2025-12-28)

### ✨ Markdown 导出功能

现在支持将文章导出为 Markdown 格式并自动下载图片：

**新增功能：**
- ✅ 使用 Turndown.js 转换 HTML 到 Markdown
- ✅ 自动下载文章中的所有图片到本地
- ✅ 更新 Markdown 中的图片链接为本地路径
- ✅ 生成包含 YAML Front Matter 的完整 Markdown 文件
- ✅ 保存文章元数据为 JSON 文件
- ✅ 支持批量下载和并发控制

**使用示例：**

```bash
# 在 Claude Code 中使用
提取这篇文章并保存为 markdown：https://example.com/article

# 或使用 Node.js 脚本
node save_with_images.js article-data.json ./output
```

**输出结构：**
```
output/
├── 2025-12-28-article-title.md     # Markdown 文件
├── 2025-12-28-article-title.json   # 元数据
└── images/                          # 图片目录
    ├── image-0-cover.jpg
    └── image-1-diagram.png
```

### 集成 Readability.js

支持使用 Mozilla 的 Readability.js 库进行更准确的文章提取：

**核心功能：**
- ✅ 自动加载 Readability.js CDN
- ✅ 智能 DOM 结构分析
- ✅ 自动过滤广告和导航元素
- ✅ 保留文章 HTML 格式
- ✅ 提取摘要和元数据
- ✅ 计算阅读时长
- ✅ SEO 元数据提取（Open Graph、Twitter Card）

**技术对比：**

| 特性 | Markdown 导出 | Readability.js | 简化算法 |
|------|--------------|----------------|----------|
| 输出格式 | Markdown + 图片 | JSON | JSON |
| 准确度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 图片处理 | 下载到本地 | 提取 URL | 提取 URL |
| 依赖库 | Turndown + Readability | Readability | 无 |

## 📚 文档

- **[SKILL.md](./SKILL.md)** - 完整技能文档
  - Readability.js 详解
  - 微信公众号提取指南
  - 常见网站提取方法
  - 错误处理和调试

- **[markdown_usage.md](./references/markdown_usage.md)** - Markdown 导出指南 ⭐ 新增
  - 快速开始
  - 完整示例
  - 批量导出
  - 图片下载配置
  - 自定义 Markdown 格式

- **[usage_examples.md](./references/usage_examples.md)** - 使用示例
  - 基础示例
  - 高级示例
  - 实际应用场景
  - 调试技巧

- **[selector_patterns.md](./references/selector_patterns.md)** - CSS 选择器参考

## 💡 使用示例

### 提取并分析文章

```typescript
// 自动使用 Readability 提取
const article = await extractWithReadability('https://example.com/article');

console.log(article.title);         // 文章标题
console.log(article.author);        // 作者
console.log(article.wordCount);     // 字数
console.log(article.readingTime);   // 阅读时长（分钟）
console.log(article.content);       // 纯文本内容
console.log(article.contentHtml);   // HTML 格式内容
console.log(article.images);        // 图片列表
console.log(article.headings);      // 标题结构
```

### 提取微信文章

```typescript
// 自动处理微信公众号的安全限制
const wechatArticle = await extractWeChatArticle(
  'https://mp.weixin.qq.com/s/xxxxx'
);
```

### 智能降级

```typescript
// 自动尝试多种提取方法
// 1. Readability.js
// 2. 简化算法
// 3. 基础提取
const article = await extractWithFallback(url);
```

## 🛠️ 技术栈

- **Chrome DevTools MCP** - 浏览器自动化
- **Readability.js v0.5.0** - Mozilla 文章提取算法
- **Turndown.js v7.1.3** - HTML 转 Markdown 转换器 ⭐ 新增
- **Node.js** - 图片下载和文件保存 ⭐ 新增
- **JavaScript** - 脚本语言

## 📋 返回数据结构

### Readability 提取

```typescript
{
  success: boolean;
  title: string;
  content: string;              // 纯文本
  contentHtml: string;          // HTML 格式
  author: string | null;
  publishDate: string | null;
  wordCount: number;
  readingTime: number;          // 分钟
  images: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  headings: Array<{
    level: number;
    text: string;
  }>;
  tags: string[];
  url: string;
  extractedAt: string;
  extractionMethod: 'readability' | 'simple' | 'fallback';
  // ... 更多元数据
}
```

### Markdown 导出 ⭐ 新增

```typescript
{
  success: boolean;
  markdown: string;             // 完整 Markdown 内容（含 Front Matter）

  // 元数据
  title: string;
  author: string | null;
  publishDate: string | null;
  siteName: string | null;
  url: string;
  excerpt: string;

  // 统计信息
  wordCount: number;
  readingTime: number;          // 分钟
  imageCount: number;

  // 图片信息
  images: Array<{
    src: string;
    alt: string;
    title: string;
  }>;

  // 分类标签
  tags: string[];
  categories: string[];

  // 提取信息
  extractedAt: string;
  extractionMethod: 'turndown+readability';
}
```

### 保存结果 ⭐ 新增

```typescript
{
  success: boolean;
  outputDir: string;
  markdownFile: string;         // Markdown 文件路径
  metadataFile: string;         // 元数据 JSON 文件路径
  imagesDownloaded: number;     // 成功下载的图片数
  totalImages: number;          // 总图片数
}
```

## 🔧 前置条件

确保已安装 Chrome DevTools MCP 服务器：

```bash
claude mcp add chrome-devtools npx -y chrome-devtools-mcp@latest
```

## ⚙️ 配置选项

### 绕过安全限制（可选）

对于微信公众号等有安全限制的网站：

```bash
claude mcp remove chrome-devtools
claude mcp add chrome-devtools npx -y chrome-devtools-mcp@latest -- \
  --disable-web-security \
  --disable-blink-features=AutomationControlled
```

## 📝 常见问题

### Q: Readability 无法加载怎么办？

A: 脚本会自动降级到简化算法，不影响基本功能。

### Q: 如何提高提取成功率？

A:
1. 确保 Chrome DevTools MCP 配置正确
2. 设置合适的等待时间
3. 对特殊网站使用自定义选择器
4. 启用降级机制

### Q: 支持哪些网站？

A: 理论上支持所有公开访问的文章类网站，包括：
- 博客（Medium、Dev.to、个人博客等）
- 新闻网站
- 技术文档
- 微信公众号（需特殊配置）
- 知乎、掘金等平台

## 🤝 贡献

如有问题或建议，请创建 Issue 或提交 Pull Request。

## 📄 许可证

MIT License

---

**Version:** 3.0.0
**Last Updated:** 2025-12-28
**Author:** AI Skills Team

## 📝 更新日志

### v3.0.0 (2025-12-28)
- ✨ 新增 Markdown 导出功能（使用 Turndown.js）
- ✨ 新增图片自动下载和本地保存
- ✨ 新增 YAML Front Matter 支持
- ✨ 新增批量导出和并发控制
- 📝 添加 Markdown 导出使用指南
- 🔧 创建 save_with_images.js 脚本

### v2.0.0 (2025-12-28)
- ✨ 集成 Mozilla Readability.js
- ✨ 支持微信公众号文章提取
- 📝 完善文档和使用示例

### v1.0.0 (2025-12-27)
- 🎉 初始版本发布
- ✅ 基础文章提取功能
