# Readability.js 完整指南

## 什么是 Readability.js？

Readability.js 是 Mozilla 开发的开源文章提取算法，被 Firefox Reader View 功能使用。它能够智能识别网页中的主要内容，自动过滤广告、导航、评论等干扰元素。

## 主要优势

| 特性 | 说明 |
|------|------|
| **智能内容识别** | 使用复杂算法分析DOM结构，识别主要文章内容 |
| **自动清理** | 移除广告、导航、社交分享按钮等干扰元素 |
| **保留格式** | 保留文章的HTML格式（标题、段落、图片、列表等） |
| **元数据提取** | 自动提取标题、作者、摘要等元数据 |
| **跨网站兼容** | 适用于绝大多数新闻、博客、文章类网站 |

## 完整使用示例

```typescript
async function extractWithReadability(url) {
  // 1. 获取标签页
  const context = await tabs_context_mcp({ createIfEmpty: true });
  const tabId = context.availableTabs[0].tabId;

  // 2. 导航到目标页面
  await navigate({ tabId, url });

  // 3. 等待页面加载
  await javascript_tool({
    tabId,
    action: "javascript_exec",
    text: `new Promise(r => {
      if (document.readyState === 'complete') r();
      else window.addEventListener('load', r);
    })`
  });

  // 4. 读取并执行 Readability 提取脚本
  const readabilityScript = await fs.readFile(
    '.claude/skills/公众号文章获取/scripts/readability_extractor.js',
    'utf8'
  );

  const result = await javascript_tool({
    tabId,
    action: "javascript_exec",
    text: readabilityScript
  });

  // 5. 解析结果
  const article = JSON.parse(result);

  if (!article.success) {
    throw new Error(`提取失败: ${article.error}`);
  }

  return article;
}
```

## isProbablyReaderable - 快速预检测

### 什么是 isProbablyReaderable？

`isProbablyReaderable()` 是一个快速、轻量级的检测函数，用于判断页面是否适合使用 Readability 进行内容提取。

### 基本用法

```typescript
// 检查当前页面是否适合提取
if (isProbablyReaderable(document)) {
  const article = new Readability(document.cloneNode(true)).parse();
  console.log('提取成功:', article.title);
} else {
  console.log('此页面可能不适合内容提取');
}
```

### 配置选项

```typescript
const options = {
  minContentLength: 140,  // 最小内容长度（字符数）
  minScore: 20,           // 最小可读性分数
  visibilityChecker: (node) => {
    if (!node || node.nodeType !== 1) return false;
    const style = window.getComputedStyle(node);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0'
    );
  }
};

const isReaderable = isProbablyReaderable(document, options);
```

### 评分机制

| 因素 | 权重 | 说明 |
|------|------|------|
| **段落数量** | 高 | 至少需要一定数量的 `<p>` 标签 |
| **内容长度** | 高 | 文本内容需要达到最小长度阈值 |
| **链接密度** | 中 | 链接与文本的比例不能过高 |
| **文章结构** | 中 | 检测 `<article>`, `<main>` 等语义化标签 |
| **可见性** | 低 | 内容必须可见（非 display:none） |

### 性能对比

| 操作 | 耗时 | 说明 |
|------|------|------|
| `isProbablyReaderable()` | ~5-10ms | 快速扫描 DOM |
| `Readability.parse()` | ~50-200ms | 完整解析和清理 |

使用预检测可以节省 90% 的不必要处理时间。

## 返回数据结构

```typescript
interface ReadabilityResult {
  // 状态信息
  success: boolean;
  extractionMethod: 'readability' | 'fallback';
  extractedAt: string;
  readabilityVersion: string;

  // isProbablyReaderable 预检测结果
  readerability: {
    isReaderable: boolean;
    checkedAt: string;
  };

  // 核心内容（Readability 原生字段）
  title: string;
  content: string;          // 纯文本内容
  contentHtml: string;      // HTML 格式内容
  excerpt: string;          // 摘要

  // 元数据
  author: string | null;
  byline: string | null;
  publishDate: string | null;
  publishedTime: string | null;
  siteName: string | null;
  language: string | null;
  dir: string | null;

  // 内容分析
  wordCount: number;
  contentLength: number;
  readingTime: number;

  // 文章结构
  headings: Array<{ level: number; text: string }>;
  images: Array<{
    src: string;
    alt: string | null;
    width: number | null;
    height: number | null;
  }>;

  // URL 信息
  url: string;
  canonicalUrl: string;

  // SEO 元数据
  metaDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;

  // 其他
  favicon: string | null;
  theme: string | null;
}
```

## Readability vs 简化算法对比

| 特性 | Readability.js | 简化算法 |
|------|----------------|----------|
| **准确度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **速度** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **依赖** | 需要加载外部库 | 无依赖 |
| **文件大小** | ~50KB | ~5KB |
| **复杂网站支持** | 优秀 | 一般 |
| **自定义选择器** | 不支持 | 支持 |

## 参考资源

- [Mozilla Readability GitHub](https://github.com/mozilla/readability)
- [Readability.js API 文档](https://github.com/mozilla/readability#api-reference)
- [Firefox Reader View](https://support.mozilla.org/en-US/kb/firefox-reader-view-clutter-free-web-pages)
