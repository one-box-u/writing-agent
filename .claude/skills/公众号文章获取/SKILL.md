---
name: web-article-extractor
description: 使用 Chrome DevTools MCP 提取和分析网页文章内容。当用户请求获取网页内容、阅读在线文章、从网站提取文本、捕获网页快照或分析网页结构时使用。支持多种提取格式包括纯文本、HTML 和结构化内容。特别优化了微信公众号等有安全限制的网站。
---

# Web Article Extractor

使用 Chrome DevTools MCP 服务器从网页中提取干净的文章内容，支持绕过常见的安全限制。

## 快速开始

### 前置条件

确保已配置 `chrome-devtools` MCP 服务器：

```bash
# 添加 chrome-devtools 服务器（带安全绕过参数）
claude mcp add chrome-devtools npx -y chrome-devtools-mcp@latest -- \
  --disable-blink-features=AutomationControlled \
  --disable-web-security \
  --disable-features=IsolateOrigins,site-per-process
```

### 基本使用流程

```typescript
// 1. 获取标签页
const context = await tabs_context_mcp({ createIfEmpty: true });
const tabId = context.availableTabs[0].tabId;

// 2. 导航到目标页面
await navigate({ tabId, url: targetUrl });

// 3. 等待页面加载
await javascript_tool({
  tabId,
  action: "javascript_exec",
  text: `new Promise(r => {
    if (document.readyState === 'complete') r();
    else window.addEventListener('load', r);
  })`
});

// 4. 使用 Readability 提取（推荐）
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
```

## 微信公众号专用流程

微信公众号有多层安全防护，需要特殊处理：

### 完整提取脚本

```typescript
async function extractWeChatArticle(articleUrl) {
  // 1. 连接到浏览器
  const tabs = await tabs_context_mcp({ createIfEmpty: true })
  const tabId = tabs.availableTabs[0].tabId

  // 2. 设置微信 User-Agent（关键步骤）
  await javascript_tool({
    tabId,
    action: "javascript_exec",
    text: `
      Object.defineProperty(navigator, 'userAgent', {
        get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.38(0x18002633) NetType/WIFI Language/zh_CN'
      });
      'User-Agent set to WeChat';
    `
  })

  // 3. 导航到文章页面
  await navigate({ tabId, url: articleUrl })

  // 4. 等待页面加载完成
  await javascript_tool({
    tabId,
    action: "javascript_exec",
    text: `
      await new Promise((resolve) => {
        const check = () => {
          const content = document.querySelector('#js_content, .rich_media_content')
          if (content && content.innerText.length > 100) {
            resolve()
          } else if (document.readyState === 'complete') {
            setTimeout(resolve, 2000)
          } else {
            setTimeout(check, 100)
          }
        }
        check()
      })
      'Content loaded';
    `
  })

  // 5. 提取文章内容
  const article = await javascript_tool({
    tabId,
    action: "javascript_exec",
    text: `
      (() => {
        const titleEl = document.querySelector('#activity-name, .rich_media_title')
        const title = titleEl ? titleEl.innerText.trim() : document.title

        const authorEl = document.querySelector('#js_name, .rich_media_meta_text')
        const author = authorEl ? authorEl.innerText.trim() : ''

        const dateEl = document.querySelector('#publish_time, .publish_time')
        const publishTime = dateEl ? dateEl.innerText.trim() : ''

        const contentEl = document.querySelector('#js_content, .rich_media_content')
        let content = ''
        if (contentEl) {
          const clone = contentEl.cloneNode(true)
          clone.querySelectorAll('script, style, noscript').forEach(el => el.remove())
          content = clone.innerText.trim()
        }

        const images = Array.from(document.querySelectorAll('#js_content img'))
          .map(img => img.getAttribute('data-src') || img.src)
          .filter(src => src && !src.includes('placeholder'))

        return JSON.stringify({
          title,
          author,
          publishTime,
          content,
          images,
          url: window.location.href,
          wordCount: content.length
        }, null, 2)
      })()
    `
  })

  return JSON.parse(article)
}
```

## 提取方法选择

本技能提供三种提取方法：

1. **Readability.js（推荐）** - Mozilla 的成熟提取算法，处理复杂布局更准确
   - 详细说明：[references/readability-guide.md](references/readability-guide.md)
   - 配置选项：[references/config-options.md](references/config-options.md)

2. **简化算法** - 自定义轻量级算法，速度更快但准确度稍低
   - 使用脚本：`scripts/extract_article.js`

3. **自定义选择器** - 针对特定平台的选择器
   - 平台指南：[references/platform-specific.md](references/platform-specific.md)

## 输出格式

### Markdown 格式
```markdown
# 文章标题

**作者：** 作者名称
**发布时间：** 2024-01-15

文章正文内容...

---
来源：[链接](https://example.com)
```

### JSON 格式
```json
{
  "title": "文章标题",
  "author": "作者名称",
  "publishDate": "2024-01-15",
  "content": "完整文章内容...",
  "images": ["url1", "url2"],
  "metadata": {
    "url": "https://example.com/article",
    "wordCount": 1500,
    "readTime": 5
  }
}
```

## 进阶主题

- **最佳实践与优化**：[references/best-practices.md](references/best-practices.md)
- **特定平台处理**：[references/platform-specific.md](references/platform-specific.md)
- **Readability 详解**：[references/readability-guide.md](references/readability-guide.md)
- **配置选项**：[references/config-options.md](references/config-options.md)

## 常见问题

**Q: 如何处理需要登录的内容？**

A: 使用已登录的浏览器实例，或者在代码中实现登录流程。

**Q: 微信文章显示"请在微信中打开"？**

A: 需要设置微信 User-Agent（见上面的微信专用流程）。

**Q: 如何提高提取成功率？**

A: 使用最新版本的 Chrome DevTools MCP，设置正确的启动参数，模拟真实浏览器行为。

## 技术栈

- **Chrome DevTools MCP** - 浏览器控制和页面操作
- **Readability.js v0.6.0** - Mozilla 文章提取算法
- **自定义提取器** - 特殊网站支持（微信、知乎等）

## 版本更新

### v2.0.0 (2025-12-28)
- 升级 Readability.js 至 v0.6.0
- 新增 isProbablyReaderable 快速预检测
- 增强 SEO 元数据提取
- 完善文档结构

### v1.0.0 (2025-11-15)
- 初始版本
- 集成 Mozilla Readability.js
- 支持微信公众号
自定义提取器** - 特殊网站支持（微信、知乎等）

## 版本更新

### v2.0.0 (2025-12-28)
- 升级 Readability.js 至 v0.6.0
- 新增 isProbablyReaderable 快速预检测
- 增强 SEO 元数据提取
- 完善文档结构

### v1.0.0 (2025-11-15)
- 初始版本
- 集成 Mozilla Readability.js
- 支持微信公众号
