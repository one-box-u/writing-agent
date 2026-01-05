# 写稿Agent v0.3.0

> 一个基于 Claude Code Skills 的"反AI味"写作系统，让AI写出的文章像人写的一样自然。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-v0.3.1-blue.svg)](https://github.com/dongbeixiaohuo/writing-agent/releases)
[![Claude Code](https://img.shields.io/badge/Claude-Code%20Skills-blue)](https://code.claude.com)
[![DeepSeek](https://img.shields.io/badge/DeepSeek-Compatible-green)](https://platform.deepseek.com)

## 🎯 项目简介

写稿Agent 是一个**协作式写作工作流系统**，通过强制性的模式选择、需求澄清、风格建模、素材调研和主编审稿，帮助你写出**不像AI生成**的高质量文章。

### 核心特点

- ✅ **协作工作流**：8+2阶段深度创作模式，新增选题调研与发布评审
- ✅ **爆款能力增强**：内置5种爆款标题公式、4种开头钩子、前50字生死线检查 ✨ New
- ✅ **反AI味道**：自动去除小标题病、排比上瘾、格式洁癖等AI典型特征
- ✅ **风格建模 v3.1**：支持公众号链接一键提取、多篇批量建模、增量更新风格库
- ✅ **自动素材归档**：提取的文章自动保存为本地 Markdown，构建个人知识库 ✨ New
- ✅ **强制模式选择**：轻量模式（快速产出）vs 协作模式（深度创作）
- ✅ **标题设计师**：独立 Skill，设计3种候选标题 + 爆款公式加持
- ✅ **素材调研**：自动搜集真实数据，新增爆款拆解与痛点验证
- ✅ **字数精准控制**：通过外部工具统计，误差控制在±20%以内
- ✅ **发布前评审**：独创"发布前5问"机制，不达标不发布 ✨ New
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
   git clone https://github.com/dongbeixiaohuo/writing-agent.git
   cd writing-agent
   ```

2. **在 Claude Code 中打开**
   - 打开 Claude Code
   - File → Open Folder
   - 选择 `writing-agent` 目录

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

### 协作写作流程（8阶段）

```
你："我想写一篇关于35岁程序员危机的深度分析文章，3000字"
    ↓
Claude 会引导你：

🎬 请选择工作流模式：
【A. 轻量模式】快速产出
【B. 协作模式】深度创作 ⭐ 推荐

你选择 B（协作模式）后：

📋 完整工作流：
□ Stage 0: 选题调研（选题前置验证）✨ New
   - 热点扫描/爆款拆解/痛点验证
   
□ Stage 1: 主题与读者校准
   - 选择切入方向（A/B/C）
   - 确认受众、风格、字数
   
□ Stage 2: 案例与证据池
   - 搜集真实数据、案例
   
□ Stage 3: 逻辑骨架搭建
   - 设计文章结构
   - 标注每段功能
   
□ Stage 4: 共情点设计
   - 预测读者心理路径
   - ⚡ 强化开头钩子设计
   
□ Stage 5: 具象化翻译（按需）
   - 将抽象概念转化为具体表达
   
□ Stage 5.5: 标题设计 ⭐ 必须
   - 设计3个候选标题让你选择
   - ⚡ 植入爆款标题公式
   
□ Stage 6: 正式创作
   - 分步写作（开头→主体→结尾）
   - ⚡ 强制执行前50字生死线
   
□ Stage 7: 主编审稿与改稿
   - 重点检查AI味道
   - 输出修订稿

□ Stage 8: 发布前把关 ✨ New
   - 发布前5问评审（标题/开头/认同/出路/分享）
    ↓
最终输出：articles/[项目名]/draft_最终稿.md
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

**方式四：URL 一键学习（🔥 强力推荐）**
```
你："学一下这几篇公众号文章的风格：
https://mp.weixin.qq.com/s/xxxx
https://mp.weixin.qq.com/s/yyyy

如果作者已经在风格库里，就更新它的风格文件。"

👉 Claude 会自动：
1. 打开浏览器抓取正文（自动绕过微信反爬）
2. 将文章保存到 docs/ 文件夹归档
3. 如果是新作者 -> 建新档
4. 如果是老作者 -> 融合新特征，更新旧档
```

**风格建模过程（v3.0 - 15维度）：**
```
提供样本文章
    ↓
Claude 会：
1. 深度解构15个维度：
   - 作者画像与核心人格 ✨ 新增
   - 思维内核与论证逻辑 ✨ 升级
   - 创作路径还原 ✨ 新增
   - 互动设计 ✨ 新增
   - 开头/过渡/结尾模式
   - 句式与节奏
   - 词汇指纹（5类细分）✨ 升级
   - 修辞手法
   - 格式与排版
   - 独特习惯与招牌动作（5类细分）✨ 升级
   - 反AI特征
   - 典型段落模板
   - 禁忌清单
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
| `workflow-producer` | 工作流导演 | 所有写作请求的唯一入口 ⭐ |
| `topic-research` | 选题调研 | Stage 0: 动笔前的热点与痛点验证 ✨ New |
| `writing-clarifier` | 澄清写作需求 | Stage 1: 主题与读者校准 |
| `research-expert` | 调研素材 | Stage 2: 案例与证据池 |
| `outline-architect` | 大纲架构师 | Stage 3: 逻辑骨架搭建 |
| `empathy-designer` | 共情点设计师 | Stage 4: 共情点设计 |
| `concretizer` | 具象化专家 | Stage 5: 具象化翻译（按需）|
| `title-designer` | 标题设计师 | Stage 5.5: 标题设计（含爆款公式）✨ Upgrade |
| `writing-executor` | 写作执行 | Stage 6: 正式创作（含开头钩子）✨ Upgrade |
| `editor-review` | 主编审稿 | Stage 7: 主编审稿与改稿 |
| `pre-publish-review` | 发布前评审 | Stage 8: 发布前5问把关 ✨ New |
| `style-modeler` | 风格建模 | URL提取/批量建模/增量更新 ✨ Upgrade |

## 🎨 风格库示例

项目自带两个风格示例：

### 1. 墨水怪风（`.claude/styles/墨水怪风.md`）
- **核心人格**：愤世嫉俗但真诚的毒舌老哥
- **招牌动作**：悖论翻转、质疑打断、真诚骂人
- **特色词汇**：兽性、进化心理学、巴甫洛夫
- **适用场景**：观点文、批判性分析

### 2. 九边风（`.claude/styles/jiubian.md`）✨ 新增
- **核心人格**：职场老炮式人生导师
- **招牌动作**："那问题来了"、案例故事化、承认局限
- **分析模式**：现象→机制→人性→出路
- **适用场景**：职场分析、深度解读

你可以基于任何文章创建自己的风格库。

## 📖 详细文档

- [协作写作工作流快速参考](docs/WORKFLOW_QUICK_REFERENCE.md) ⭐ 新增
- [Skills 更新总结](docs/SKILLS_UPDATE_SUMMARY.md) ⭐ 新增
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

### 自定义工作流阶段

编辑 `.claude/skills/工作流导演/SKILL.md`，可以调整协作模式的阶段顺序或跳过某些阶段。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本历史。

**最新版本 v0.2.0 (2025-12-29)**
- ✨ 风格建模升级至 v3.0（15维度）
- ✨ 新增协作写作工作流（8阶段）
- ✨ 新增标题设计师 Skill
- ✨ 新增九边风、墨水怪风两套风格配方
- 🔧 强制模式选择机制
- 🔧 子 Skill 权限调整

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 感谢 [Claude Code](https://code.claude.com) 提供的 Skills 系统
- 感谢所有贡献者和使用者的反馈

## 📮 联系方式

- 提交 Issue: [GitHub Issues](https://github.com/dongbeixiaohuo/writing-agent/issues)
- 讨论区: [GitHub Discussions](https://github.com/dongbeixiaohuo/writing-agent/discussions)

---

**如果这个项目对你有帮助，请给个 ⭐ Star！**
