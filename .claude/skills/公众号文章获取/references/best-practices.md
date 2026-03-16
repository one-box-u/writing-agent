# 最佳实践与优化策略

## 提取流程优化

### 推荐流程（三层策略）

```typescript
async function optimizedExtract(url) {
  // 第一层：isProbablyReaderable 快速预检
  const isReaderable = await checkReaderable();

  if (!isReaderable) {
    console.warn('页面可能不适合提取，但仍会尝试');
  }

  // 第二层：使用 Readability 完整提取
  try {
    const article = await extractWithReadability();
    if (article.success && article.contentLength > 500) {
      return article;
    }
  } catch (error) {
    console.error('Readability 失败:', error);
  }

  // 第三层：降级到简化算法
  return await extractWithSimpleAlgorithm();
}
```

## 性能优化建议

### 减少不必要的提取

```typescript
// 使用 isProbablyReaderable 避免无效提取
if (isProbablyReaderable(document)) {
  await extractFull();
} else {
  // 只提取基本信息
  return { title: document.title, url: location.href };
}
```

### 批量提取时的优化

```typescript
async function batchExtract(urls) {
  // 1. 快速预筛选
  const readableUrls = [];
  for (const url of urls) {
    await navigate(url);
    if (isProbablyReaderable(document)) {
      readableUrls.push(url);
    }
  }

  // 2. 只对通过预检的 URL 进行完整提取
  return Promise.all(readableUrls.map(extractWithReadability));
}
```

## 错误处理和降级策略

```typescript
async function robustExtract(url) {
  const strategies = [
    // 策略 1: Readability with strict config
    () => extract({ charThreshold: 1000 }),

    // 策略 2: Readability with lenient config
    () => extract({ charThreshold: 200, linkDensityModifier: 0.5 }),

    // 策略 3: 简化算法
    () => simpleExtract(),

    // 策略 4: 基础提取
    () => ({ title: document.title, content: document.body.innerText })
  ];

  for (const strategy of strategies) {
    try {
      const result = await strategy();
      if (result.contentLength > 100) {
        return result;
      }
    } catch (error) {
      console.warn('策略失败，尝试下一个:', error);
    }
  }

  throw new Error('所有提取策略均失败');
}
```

## 内容质量验证

```typescript
function validateExtractedContent(article) {
  const quality = {
    hasTitle: !!article.title && article.title.length > 5,
    hasContent: article.contentLength > 500,
    hasAuthor: !!article.author || !!article.byline,
    hasImages: article.images && article.images.length > 0,
    isReaderable: article.readerability?.isReaderable
  };

  const score = Object.values(quality).filter(Boolean).length;

  return {
    isValid: score >= 2,
    score: score,
    quality: quality,
    recommendation: score >= 4 ? '高质量' : score >= 2 ? '可用' : '质量较低'
  };
}
```

## 特殊网站处理

### 知乎

```typescript
const zhihuConfig = {
  charThreshold: 300,
  classesToPreserve: ['RichText', 'Post-RichTextContainer']
};
```

### Medium

```typescript
const mediumConfig = {
  charThreshold: 500,
  keepClasses: false
};
```

## 调试技巧

### 启用 Readability 调试模式

```javascript
const reader = new Readability(documentClone, {
  debug: true  // 在控制台输出详细日志
});
```

### 对比不同配置的效果

```typescript
async function compareConfigs(url) {
  const configs = [
    { name: '默认', options: {} },
    { name: '严格', options: { charThreshold: 1000 } },
    { name: '宽松', options: { charThreshold: 200 } }
  ];

  for (const config of configs) {
    const reader = new Readability(doc.cloneNode(true), config.options);
    const result = reader.parse();
    console.log(`${config.name}:`, {
      contentLength: result?.length,
      title: result?.title
    });
  }
}
```

## 常见问题

**Q: Readability 无法加载怎么办？**

A: 脚本会自动降级到基础提取，返回 `success: false` 和 `extractionMethod: 'fallback'`。

**Q: 如何处理动态加载的内容？**

A: 在执行 Readability 之前，先等待内容加载完成。

**Q: Readability 适用于所有网站吗？**

A: Readability 针对文章类内容优化，对于电商、社交媒体等非文章类网站效果可能不佳。
