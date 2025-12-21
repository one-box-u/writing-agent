# 写稿Agent v0.1.0

> 一个基于 Claude Code Skills 的"反AI味"写作系统，让AI写出的文章像人写的一样自然。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-v0.1.0-blue.svg)](https://github.com/dongbeixiaohuo/写稿Agent/releases)
[![Claude Code](https://img.shields.io/badge/Claude-Code%20Skills-blue)](https://code.claude.com)
[![DeepSeek](https://img.shields.io/badge/DeepSeek-Compatible-green)](https://platform.deepseek.com)

## 🎯 项目简介

写稿Agent 是一个工作流驱动的写作系统，通过强制性的需求澄清、风格建模、素材调研和主编审稿，帮助你写出**不像AI生成**的高质量文章。

### 核心特点

- ✅ **反AI味道**：自动去除小标题病、排比上瘾、格式洁癖等AI典型特征
- ✅ **风格建模**：12维度深度解构，提取任何文章的写作风格并复用
- ✅ **素材调研**：自动搜集真实数据、案例和观点，让文章有据可依
- ✅ **字数精准控制**：通过外部工具统计，误差控制在±20%以内
- ✅ **版本管理**：自动保存初稿、修订稿、最终稿，可追溯每次修改

## 📦 快速开始

### 前置要求

**方式一：使用 Claude Code（官方）**
- [Claude Code](https://code.claude.com) 账号
- 基本的命令行操作能力

**方式二：使用 DeepSeek API（推荐，更经济）**
- Claude Code 桌面应用（无需 Claude 账号）
- DeepSeek API Key（[获取地址](https://platform.deepseek.com)）
- 配置方法：参考 [DeepSeek 官方文档](https://api-docs.deepseek.com/zh-cn/guides/anthropic_api)

> **本项目所有测试均基于 DeepSeek-V3 模型通过 Anthropic API 适配完成。**

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/dongbeixiaohuo/写稿Agent.git
   cd 写稿Agent
   ```

2. **在 Claude Code 中打开**
   - 打开 Claude Code
   - File → Open Folder
   - 选择 `写稿Agent` 目录

3. **（可选）配置 DeepSeek API**
   
   如果使用 DeepSeek API，在 Claude Code 设置中：
   ```
   API Base URL: https://api.deepseek.com/v1
   API Key: 你的 DeepSeek API Key
   Model: deepseek-chat
   ```

4. **开始使用**
   ```
   直接对 Claude 说："帮我写一篇关于XXX的文章"
   系统会自动引导你完成整个写作流程
   ```

## 🚀 使用示例

### 基础写作流程

```
你："帮我写一篇关于35岁程序员危机的文章"
    ↓
Claude 会引导你：
1. 选择切入方向（A/B/C）
2. 确认受众、风格、字数
3. 询问是否需要调研素材
4. 设计3个候选标题让你选择
5. 分步写作（开头→主体→结尾）
6. 主编审稿（重点检查AI味道）
    ↓
最终输出：articles/你的标题_最终稿.md
```

### 风格建模详细教程

**方式一：直接贴文章内容**
```
你："帮我分析这篇文章的风格：

[直接粘贴文章全文]

以后按这个风格写。"
```

**方式二：使用 @ 引用文件**
```
你："帮我分析 @sample_article.md 的风格，以后按这个风格写"
```

**方式三：提供多篇参考文章（推荐，更准确）**
```
你："帮我分析这几篇文章的共同风格：
@article1.md
@article2.md
@article3.md

提取共性，保存为'XXX风格'"
```

**风格建模过程：**
```
提供样本文章
    ↓
Claude 会：
1. 深度解构12个维度：
   - 核心人格与立场
   - 思维模式与论证逻辑
   - 开头/过渡/结尾模式
   - 句式与节奏
   - 词汇指纹
   - 修辞手法
   - 格式与排版
   - 独特习惯与招牌动作（重点！）
   - 反AI特征
   - 典型段落模板
2. 提取"招牌动作"（最具辨识度的写作习惯）
3. 保存风格文件到 .claude/styles/XXX风格.md
    ↓
下次写作时可以直接调用这个风格
```

**最佳实践：**
- 样本文章建议 3000 字以上，效果更好
- 提供 3-5 篇同一作者的文章，提取的风格更准确
- 风格文件可以手动编辑，补充或调整特征

## 📚 核心 Skills 说明

| Skill | 功能 | 调用时机 |
|-------|------|---------|
| `writing-clarifier` | 澄清写作需求 | 用户发起写作请求时 |
| `research-expert` | 调研素材 | 需要真实数据支撑时 |
| `style-modeler` | 风格建模 | 需要提取/创建风格时 |
| `writing-executor` | 写作执行 | 实际写作阶段 |
| `editor-review` | 主编审稿 | 草稿完成后 |

## 🎨 风格库示例

项目自带一个"墨水怪风"风格示例（`.claude/styles/墨水怪风.md`），特点：
- 愤世嫉俗但真诚的语气
- 口语化长句 + 情绪短句
- 大量使用反问和自问自答
- 完全不用小标题和加粗

你可以基于任何文章创建自己的风格库。

## 📖 详细文档

- [完整工作流说明](CLAUDE.MD)
- [DeepSeek API 配置指南](docs/DEEPSEEK_SETUP.md) ⭐ 推荐
- [Skills 开发指南](.claude/skills/)
- [风格建模教程](.claude/skills/风格建模/SKILL.md)
- [常见问题 FAQ](docs/FAQ.md)
- [项目结构说明](docs/PROJECT_STRUCTURE.md)

## 🛠️ 高级配置

### 自定义反AI规则

编辑 `.claude/skills/写作执行/SKILL.md` 中的"反AI写作技巧"部分，添加你自己的规则。

### 调整字数控制精度

编辑 `.claude/skills/写作执行/SKILL.md` 中的"字数控制"部分，修改允许范围（默认±20%）。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本历史。

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 感谢 [Claude Code](https://code.claude.com) 提供的 Skills 系统
- 感谢所有贡献者和使用者的反馈

## 📮 联系方式

- 提交 Issue: [GitHub Issues](https://github.com/dongbeixiaohuo/写稿Agent/issues)
- 讨论区: [GitHub Discussions](https://github.com/dongbeixiaohuo/写稿Agent/discussions)

---

**如果这个项目对你有帮助，请给个 ⭐ Star！**
