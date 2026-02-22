# 写作 Agent - OpenClaw 适配版

> 🚀 一个基于 OpenClaw 的"反AI味"写作系统，让AI写出的文章像人写的一样自然。

## 三种写作模式

| 模式 | 命令示例 | 说明 |
|------|----------|------|
| **轻量模式** | 帮我用轻量模式写一篇关于xxx的文章 | 快速产出，适合短文、随笔 |
| **协作模式** | 帮我写一篇关于xxx的文章 | 深度创作，适合长文、深度分析 |
| **从选题开始** | 帮我写一篇我不知道写什么，帮我推荐选题 | 无灵感时，AI帮你生成选题 |

## 功能特点

- 🤖 **Humanizer**: 识别并修复24种AI写作痕迹
- 🎨 **配图生成**: 支持多种图片生成服务
- 📺 **读者模拟**: 模拟真实用户的心理反应
- ✍️ **完整工作流**: 14阶段深度创作模式

## 安装配置

### 前提条件

- OpenClaw 环境
- Node.js 18+
- 支持的大模型 API (DeepSeek / MiniMax / 智谱GLM等)

### 配置步骤

1. 复制 `config.json.template` 为 `config.json`
2. 填写你的 API 配置:

```json
{
  "model": {
    "provider": "minimax",
    "model_id": "MiniMax-M2.1",
    "api_key": "你的API密钥"
  },
  "image": {
    "provider": "nano-banana"
  },
  "search": {
    "provider": "tavily"
  }
}
```

## 使用方式

```
# 默认协作模式
帮我写一篇关于[主题]的文章

# 指定轻量模式
帮我用轻量模式写一篇关于[主题]的文章

# 从选题开始
帮我写一篇，但我不知道写什么，帮我推荐选题
```

## 支持的模型

- MiniMax (推荐)
- DeepSeek
- 阿里 Qwen
- 智谱 GLM
- Google Gemini

## 目录结构

```
writing-agent/
├── agents/              # 14个写作Agent
├── workflow-director/   # 工作流导演
├── styles/             # 写作风格配置
├── config.json         # 配置文件
└── SKILL.md            # OpenClaw技能定义
```

## 开源许可

MIT License

## 致谢

原项目: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
