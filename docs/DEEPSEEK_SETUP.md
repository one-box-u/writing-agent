# DeepSeek API 配置指南

本项目完全兼容 DeepSeek API，通过 Anthropic API 适配实现。使用 DeepSeek 可以大幅降低使用成本。

## 为什么选择 DeepSeek？

| 对比项 | Claude API | DeepSeek API |
|--------|-----------|--------------|
| 价格 | 较高 | **极低**（约为 Claude 的 1/10） |
| 中文能力 | 优秀 | **优秀** |
| 长文本处理 | 128K tokens | **64K tokens** |
| API 兼容性 | 原生 | **完美兼容 Anthropic API** |

**本项目所有功能均在 DeepSeek-V3 上测试通过。**

---

## 配置步骤

### 1. 获取 DeepSeek API Key

1. 访问 [DeepSeek 平台](https://platform.deepseek.com)
2. 注册/登录账号
3. 进入 "API Keys" 页面
4. 创建新的 API Key
5. 复制保存（只显示一次）

### 2. 在 Claude Code 中配置

#### 方法一：通过设置界面（推荐）

1. 打开 Claude Code
2. 点击右上角 **设置图标** ⚙️
3. 找到 **"API Configuration"** 或 **"模型设置"**
4. 填写以下信息：
   ```
   API Provider: Anthropic (或 Custom)
   API Base URL: https://api.deepseek.com/v1
   API Key: sk-xxxxxxxxxxxxxxxxxxxxxxxx
   Model: deepseek-chat
   ```
5. 保存设置

#### 方法二：通过配置文件

编辑 Claude Code 配置文件（位置因系统而异）：

**Windows:**
```
%APPDATA%\Claude Code\config.json
```

**macOS:**
```
~/Library/Application Support/Claude Code/config.json
```

**Linux:**
```
~/.config/claude-code/config.json
```

添加以下配置：
```json
{
  "api": {
    "provider": "anthropic",
    "baseUrl": "https://api.deepseek.com/v1",
    "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
    "model": "deepseek-chat"
  }
}
```

### 3. 验证配置

在 Claude Code 中输入：
```
你好，请介绍一下你自己
```

如果返回类似 "我是 DeepSeek..." 的回复，说明配置成功。

---

## 模型选择

DeepSeek 提供两个主要模型：

| 模型 | 用途 | 推荐场景 |
|------|------|---------|
| `deepseek-chat` | 通用对话 | **本项目推荐** |
| `deepseek-coder` | 代码生成 | 不推荐用于写作 |

**建议使用 `deepseek-chat`。**

---

## 成本估算

以一篇 2000 字文章为例：

| 步骤 | 输入 tokens | 输出 tokens | 成本（约） |
|------|------------|------------|-----------|
| 需求澄清 | 500 | 300 | ¥0.001 |
| 调研素材 | 1000 | 1500 | ¥0.003 |
| 风格建模 | 5000 | 3000 | ¥0.010 |
| 写作执行 | 3000 | 4000 | ¥0.008 |
| 主编审稿 | 4000 | 1000 | ¥0.006 |
| **总计** | **13500** | **9800** | **¥0.028** |

**一篇 2000 字文章成本约 ¥0.03（3分钱）。**

---

## 常见问题

### Q1: 配置后还是连接到 Claude？

检查：
1. API Base URL 是否正确填写为 `https://api.deepseek.com/v1`
2. 是否重启了 Claude Code
3. 配置文件是否正确保存

### Q2: 提示 API Key 无效？

检查：
1. API Key 是否完整复制（包括 `sk-` 前缀）
2. API Key 是否已激活（DeepSeek 平台查看）
3. 账户余额是否充足

### Q3: 功能是否完全兼容？

是的！DeepSeek 通过 Anthropic API 适配，与 Claude 完全兼容。本项目所有功能均测试通过。

### Q4: 效果和 Claude 有差异吗？

在写作任务上，DeepSeek-V3 的表现与 Claude 相当，尤其是中文写作。部分场景甚至更好。

### Q5: 如何切换回 Claude？

在设置中修改：
```
API Base URL: https://api.anthropic.com
API Key: [你的 Claude API Key]
Model: claude-3-5-sonnet-20241022
```

---

## 性能优化建议

### 1. 启用缓存（如果支持）

DeepSeek 支持 Prompt Caching，可以降低重复内容的成本。

### 2. 调整 Temperature

对于写作任务，建议：
```
Temperature: 0.7-0.9
```
（在 Claude Code 设置中调整）

### 3. 批量处理

如果需要写多篇文章，建议：
- 一次性提取风格（复用）
- 一次性调研多个主题
- 批量生成初稿

---

## 官方文档

- [DeepSeek API 文档](https://api-docs.deepseek.com)
- [Anthropic API 适配指南](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api)
- [价格说明](https://platform.deepseek.com/pricing)

---

## 技术支持

如果遇到配置问题：

1. 查看 [DeepSeek 官方文档](https://api-docs.deepseek.com)
2. 在本项目 [GitHub Issues](https://github.com/dongbeixiaohuo/写稿Agent/issues) 提问
3. 加入 [Discussions](https://github.com/dongbeixiaohuo/写稿Agent/discussions) 讨论

---

**配置成功后，享受低成本、高质量的 AI 写作体验！**
