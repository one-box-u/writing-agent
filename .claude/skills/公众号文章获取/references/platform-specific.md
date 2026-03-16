# 特定平台处理指南

## 处理不同类型网站

### 知乎

```typescript
const zhihuContent = await javascript_tool({
  tabId,
  action: "javascript_exec",
  text: `
    JSON.stringify({
      title: document.querySelector('.Post-Title, h1')?.innerText,
      content: document.querySelector('.Post-RichText, .RichContent-inner')?.innerText,
      author: document.querySelector('.UserLink-link, .AuthorInfo-name')?.innerText,
      votes: document.querySelector('.VoteButton--up .CountValue')?.innerText
    })
  `
})
```

### 掘金

```typescript
const juejinContent = await javascript_tool({
  tabId,
  action: "javascript_exec",
  text: `
    JSON.stringify({
      title: document.querySelector('.article-title')?.innerText,
      content: document.querySelector('.article-content, .markdown-body')?.innerText,
      author: document.querySelector('.user-name')?.innerText,
      views: document.querySelector('.view-count')?.innerText
    })
  `
})
```

### Medium

```typescript
const mediumContent = await javascript_tool({
  tabId,
  action: "javascript_exec",
  text: `
    JSON.stringify({
      title: document.querySelector('h1')?.innerText,
      content: document.querySelector('article')?.innerText,
      author: document.querySelector('[data-testid="author-name"]')?.innerText,
      claps: document.querySelector('[data-testid="clap-count"]')?.innerText
    })
  `
})
```

## 绕过常见反爬机制

### 1. User-Agent 检测

```typescript
await javascript_tool({
  tabId,
  action: "javascript_exec",
  text: `
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });
  `
})
```

### 2. WebDriver 检测

```typescript
await javascript_tool({
  tabId,
  action: "javascript_exec",
  text: `
    // 移除 webdriver 标记
    delete navigator.__proto__.webdriver
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    })
  `
})
```

### 3. 懒加载内容

```typescript
// 滚动页面触发懒加载
await javascript_tool({
  tabId,
  action: "javascript_exec",
  text: `
    async function scrollToBottom() {
      const scrollHeight = document.body.scrollHeight
      const steps = 5
      for (let i = 0; i < steps; i++) {
        window.scrollTo(0, (scrollHeight / steps) * (i + 1))
        await new Promise(r => setTimeout(r, 500))
      }
    }
    scrollToBottom()
  `
})
```

### 4. 弹窗处理

```typescript
await javascript_tool({
  tabId,
  action: "javascript_exec",
  text: `
    // 关闭所有弹窗
    document.querySelectorAll('.modal, .popup, .dialog, [role="dialog"]')
      .forEach(el => el.style.display = 'none')
  `
})
```

## CSS 选择器参考

### 微信公众号

| 元素 | 选择器 |
|------|--------|
| 标题 | `#activity-name`, `.rich_media_title` |
| 正文 | `#js_content`, `.rich_media_content` |
| 作者/公众号 | `#js_name`, `.rich_media_meta_text` |
| 发布时间 | `#publish_time`, `.publish_time` |
| 图片 | `#js_content img`, `.rich_media_content img` |
| 摘要 | `meta[name="description"]` |
