# Changelog

All notable changes to 写稿Agent will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-12-29

### Added
- ✨ **协作写作工作流系统**：
  - 新增 `workflow-producer`（工作流导演）作为所有写作请求的唯一入口
  - 强制模式选择：轻量模式 vs 协作模式（8阶段）
  - 8阶段完整 SOP：主题校准 → 调研 → 大纲 → 共情 → 具象化 → 标题设计 → 创作 → 审稿
  - 每阶段完成后显示进度条和产物保存路径
  
- ✨ **标题设计师 Skill**（`title-designer`）：
  - 独立的标题设计环节（Stage 5.5）
  - 设计3种候选标题：吸引型/信息型/情绪型
  - 禁止 AI 套路标题（如"深度解读XXX"）
  - 用户确认后才能进入正式写作
  
- ✨ **风格建模系统升级至 v3.0**：
  - **12维度 → 15维度深度解构框架**
  - 新增维度：
    - 作者画像与核心人格（基础特征、知识结构、经历痕迹）
    - 思维内核与论证逻辑（核心世界观、价值判断、分析模式）
    - 创作路径还原（痛点捕捉、共情设计、出路探索）
    - 互动设计（读者预设、互动技巧、引导策略）
  - 扩展维度：
    - 词汇指纹（5类细分：口语连接词、高频动词、程度副词、情感词汇、网络流行语）
    - 招牌动作（5类细分：悖论翻转、质疑打断、情绪短句、自问自答、务实建议）
    
- ✨ **新增风格配方**：
  - **九边风**（`jiubian.md`）：职场老炮式人生导师
    - 招牌动作："那问题来了"、案例故事化、承认局限
    - 分析模式：现象→机制→人性→出路
  - **墨水怪风**（`墨水怪风.md`）更新：基于新样本重新解构
    - 招牌动作：悖论翻转、质疑打断、真诚骂人
    - 特色词汇：兽性、进化心理学、巴甫洛夫
    
- 📚 **新增协作 Skills**：
  - `outline-architect`（大纲架构师）
  - `empathy-designer`（共情点设计师）
  - `concretizer`（具象化专家）
  
- 📖 **新增文档**：
  - `docs/WORKFLOW_QUICK_REFERENCE.md`（协作写作工作流快速参考）
  - `docs/SKILLS_UPDATE_SUMMARY.md`（Skills 更新总结）
  - `docs/jiubiancank.md`（九边风格分析参考）
  - `docs/墨水怪.md`（墨水怪风格样本）

### Changed
- 🔧 **子 Skill 权限调整**：
  - 将 `writing-clarifier`、`writing-executor` 等标记为 `INTERNAL UTILITY ONLY`
  - 防止跳过工作流导演直接调用
  - 所有写作请求必须经过 `workflow-producer` 统一调度
  
- 🔧 **标题设计流程优化**：
  - 从 `writing-executor` 的第5步提升至第2.5步
  - 在信息汇总确认后立即设计标题
  - 用户确认标题后才能进入字数规划和正式写作
  
- 🔧 **风格检查防幻觉**：
  - 强制使用 `list_dir` 工具检查 `.claude/styles/` 目录
  - 禁止 AI 编造不存在的风格名称
  - 只能列出工具返回的真实文件名

### Fixed
- 🐛 修复风格建模可能跳过标题设计的问题
- 🐛 修复 AI 可能编造不存在风格的问题
- 🐛 修复协作模式下可能跳过某些阶段的问题

---

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
