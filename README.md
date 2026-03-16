# Writing Agent - OpenClaw Branch

> 一个已同步上游核心能力、并完成 OpenClaw 运行适配的智能写作系统分支。
>
> This branch syncs core upstream capabilities while providing an OpenClaw-friendly execution path.

---

## 快速入口 / Quick Entry

### 中文用户
- 详细说明：[`README_ZH.md`](./README_ZH.md)
- OpenClaw 使用说明：[`README_OPENCLAW.md`](./README_OPENCLAW.md)
- 执行映射：[`OPENCLAW_EXECUTION_MAP.md`](./OPENCLAW_EXECUTION_MAP.md)
- 适配设计：[`OPENCLAW_ADAPTATION_PLAN.md`](./OPENCLAW_ADAPTATION_PLAN.md)

### English
- Detailed guide: [`README_EN.md`](./README_EN.md)
- OpenClaw guide: [`README_OPENCLAW.md`](./README_OPENCLAW.md)
- Execution map: [`OPENCLAW_EXECUTION_MAP.md`](./OPENCLAW_EXECUTION_MAP.md)
- Adaptation plan: [`OPENCLAW_ADAPTATION_PLAN.md`](./OPENCLAW_ADAPTATION_PLAN.md)

---

## 本分支当前状态 / Branch Status

本分支已完成以下工作：

- 同步上游 `writing-agent v0.7.0` 核心能力
- 引入记忆闭环：`memory-loader` / `edit-diff-learner`
- 引入 `00_memory_packet.md` / `99_episode.md` 工作流产物
- 为 OpenClaw 增加显式 Stage 12 导出入口：
  - `scripts/openclaw_stage12_runner.py`
- 修复部分宿主环境路径兼容问题
- 增补中英文更新说明与使用方法

This branch already includes:

- synced core upstream `writing-agent v0.7.0` capabilities
- memory-loop components: `memory-loader` / `edit-diff-learner`
- workflow artifacts: `00_memory_packet.md` / `99_episode.md`
- explicit OpenClaw Stage 12 runner:
  - `scripts/openclaw_stage12_runner.py`
- host-environment path compatibility fixes
- bilingual update notes and usage guides

---

## 推荐阅读顺序 / Recommended Reading Order

### 如果你想直接用
1. [`README_ZH.md`](./README_ZH.md) 或 [`README_EN.md`](./README_EN.md)
2. [`README_OPENCLAW.md`](./README_OPENCLAW.md)

### 如果你想继续开发或适配
1. [`README_OPENCLAW.md`](./README_OPENCLAW.md)
2. [`OPENCLAW_EXECUTION_MAP.md`](./OPENCLAW_EXECUTION_MAP.md)
3. [`OPENCLAW_ADAPTATION_PLAN.md`](./OPENCLAW_ADAPTATION_PLAN.md)

---

## Stage 12（OpenClaw）

在 OpenClaw 中，推荐显式执行 clean 导出，而不是依赖 Claude Code Hook：

```bash
python scripts/openclaw_stage12_runner.py --project [项目名]
```

如果你已经知道定稿文件路径，也可以直接运行：

```bash
python scripts/generate_clean.py articles/[项目名]/[定稿文件].md
```

---

## 致谢 / Credits

- Upstream project: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- Fork / OpenClaw branch: [one-box-u/writing-agent](https://github.com/one-box-u/writing-agent)
