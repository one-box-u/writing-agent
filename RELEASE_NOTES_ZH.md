# Writing Agent OpenClaw 分支更新说明

发布日期：2026-03-16
分支：`openclaw`

## 本次更新概览

这次更新把 `one-box-u/writing-agent` 的 OpenClaw 分支同步到了上游 `writing-agent v0.7.0` 的核心能力，同时补齐了 OpenClaw 场景下真正可运行的执行链路。

## 主要更新

### 1. 同步上游 v0.7.0 核心能力
- 新增 `memory-loader`
- 新增 `edit-diff-learner`
- 引入 `00_memory_packet.md` / `99_episode.md` 记忆闭环
- 同步新版 `humanizer`、`writing-executor`、`outline-architect`、`title-designer` 等主力代理

### 2. 增强 OpenClaw 可运行性
- 新增 `scripts/openclaw_stage12_runner.py`
- 在 OpenClaw 中，Stage 12 不再依赖 Claude Code Hook 黑盒
- 现在可以显式生成 `_clean.txt`，更适合调试、编排和自动化

推荐命令：

```bash
python scripts/openclaw_stage12_runner.py --project [项目名]
```

### 3. 修复环境兼容问题
- 移除公众号文章提取技能中的作者本机绝对路径
- 将多处 `~/.claude/...` 示例替换为项目内相对路径
- 改善 OpenClaw / 非 Claude Code 宿主环境下的可移植性

### 4. 文档全面更新
- 中文首页：`README.md`
- 中文详细说明：`README_ZH.md`
- 英文详细说明：`README_EN.md`
- OpenClaw 使用说明：`README_OPENCLAW.md`
- 执行映射：`OPENCLAW_EXECUTION_MAP.md`
- 适配设计：`OPENCLAW_ADAPTATION_PLAN.md`
- 版本更新记录：`CHANGELOG.md`

## 当前功能形态

当前 `openclaw` 分支已经包含：
- 16 个 agents
- 3 个核心 skills
- 4 个关键脚本
- 记忆闭环
- OpenClaw 显式 Stage 12
- 对齐当前代码形态的中英文文档

## 一句话总结

这次更新之后，`openclaw` 分支已经不只是“跟上游接近”，而是：

**一个已同步上游核心能力、并完成 OpenClaw 关键运行适配的可用版本。**
