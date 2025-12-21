# Changelog

All notable changes to 写稿Agent will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-21

### Added
- 🎉 **首次公开发布**
- **5个核心 Skills**：
  - `writing-clarifier`（写作需求澄清 v1.3.0）
  - `research-expert`（调研资料 v1.0.0）
  - `style-modeler`（风格建模 v2.0.0）
  - `writing-executor`（写作执行 v1.6.0）
  - `editor-review`（主编审稿 v1.1.0）
- **反AI味道系统**：
  - 自动去除小标题病、排比上瘾、格式洁癖等AI典型特征
  - 默认启用反AI格式，无需每次确认
- **风格建模系统**：
  - 12维度深度解构
  - 招牌动作提取
  - 段落模板库
  - 示例风格：墨水怪风（173行完整配方）
- **字数精准控制**：
  - 强制外部工具统计（误差±20%以内）
  - 关键节点检查机制（开头/主体50%/主体80%）
  - 黄线/红线/死线机制
- **版本管理**：
  - 自动保存初稿、修订稿、最终稿
  - 文件命名规则：`[标题]_[版本号]稿.md`
- **标题设计模块**：
  - 3个候选标题（吸引型/信息型/情绪型）
- **信息交接模块**：
  - 写作前显式输出信息汇总表
- **工作流完整性**：
  - 强制询问是否需要调研
  - 防止跳过关键步骤
- **DeepSeek API 支持**：
  - 完美兼容 Anthropic API
  - 成本极低（一篇2000字文章约¥0.03）
  - 详细配置文档

### Documentation
- 完整的 README.md（中文）
- CHANGELOG.md（版本历史）
- CONTRIBUTING.md（贡献指南）
- LICENSE（MIT）
- docs/FAQ.md（24个常见问题）
- docs/DEEPSEEK_SETUP.md（DeepSeek配置指南）
- docs/PROJECT_STRUCTURE.md（项目结构说明）

---

## 版本号说明

- **Major (X.0.0)**: 重大架构变更或不兼容更新
- **Minor (0.X.0)**: 新功能添加
- **Patch (0.0.X)**: Bug 修复和小优化
