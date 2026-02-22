# 写作 Agent - OpenClaw 适配版

> 🚀 一个基于 OpenClaw 的"反AI味"写作系统，让AI写出的文章像人写的一样自然。

## 三种写作模式

| 模式 | 命令示例 | 适用场景 |
|------|----------|----------|
| **轻量模式** | 帮我用轻量模式写一篇xxx | 短文（≤1000字）、随笔、已有素材 |
| **协作模式** | 帮我写一篇xxx（默认） | 长文（>1500字）、深度分析、数据支撑 |
| **从选题开始** | 帮我写一篇但我不知道写什么 | 无灵感，需要AI生成选题 |

## 详细文档

- [中文详细文档](./README_ZH.md)
- [English Documentation](./README_EN.md)

## 功能特点

- 🤖 **Humanizer**: 识别并修复24种AI写作痕迹
- 🎨 **配图生成**: 支持多种图片生成服务
- 📺 **读者模拟**: 模拟真实用户的心理反应
- ✍️ **完整工作流**: 14阶段深度创作模式

## 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/one-box-u/writing-agent.git
cd writing-agent

# 2. 复制配置模板
cp config.json.template config.json

# 3. 填写API配置
# 编辑 config.json 填入你的 API Key
```

## 使用方式

```
# 默认协作模式
帮我写一篇关于[主题]的文章

# 轻量模式
帮我用轻量模式写一篇关于[主题]的文章

# 从选题开始
帮我写一篇但我不知道写什么
```

## 配置说明

```json
{
  "model": {
    "provider": "minimax",
    "model_id": "MiniMax-M2.1",
    "api_key": "YOUR_API_KEY"
  }
}
```

## 开源许可

MIT License

## 致谢

原项目: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
