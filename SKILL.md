# 写作Agent (writing-agent)

## 概述

基于 OpenClaw 的全栈写作系统，核心卖点是"反AI味"写作，让AI写出的文章像人写的一样自然。

**中文名**: 写作Agent
**来源**: https://github.com/dongbeixiaohuo/writing-agent

## 功能

- 🤖 **Humanizer**: 识别并修复24种AI痕迹
- 🎨 **配图生成**: 对接 Nano Banana (Google AI)
- 📺 **读者模拟**: 模拟真实用户的心理弹幕
- ✍️ **完整工作流**: 14阶段深度创作模式

## 工作流模式

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| A. 轻量模式 | 快速产出 | 短文、随笔、已有素材 |
| B. 协作模式 | 深度创作 ⭐ | 长文、深度分析、数据支撑 |
| C. 从选题开始 | 无灵感 | 需要AI帮忙生成选题 |

## 配置

模型配置在 `config.json` 中，支持：
- `auto` - 自动选择
- `deepseek` - DeepSeek
- `minimax` - MiniMax
- `qwen` - 阿里Qwen
- `gemini` - Google Gemini

## 子技能

- `workflow-director` - 工作流导演
- `agents/` - 14个写作Agent

## 使用方式

```
帮我写一篇关于[主题]的文章
```

或指定模式：
```
帮我用轻量模式写一篇[主题]文章
```
