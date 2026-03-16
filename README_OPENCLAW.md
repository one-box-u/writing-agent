# Writing Agent for OpenClaw

更新日期：2026-03-16
适配基线：上游 `dongbeixiaohuo/writing-agent@v0.7.0`

---

## 1. 这份文档是干什么的

上游 `writing-agent` 默认面向 **Claude Code** 运行环境，仓库中的 `.claude/skills/`、`.claude/agents/`、`.claude/settings.json` 也都是按 Claude Code 的加载方式组织的。

但这个项目的真正价值不在于“只能在 Claude Code 跑”，而在于它背后的：

- 写作工作流设计
- 多阶段产物落盘机制
- 去 AI 味规则
- 自进化记忆闭环（`00_memory_packet.md` / `99_episode.md`）
- 纯净版导出（`_clean.txt`）

这份文档的目的，就是告诉你：

**如何在 OpenClaw 中复用这套能力，而不被 Claude Code 专属运行机制卡死。**

---

## 2. OpenClaw 下，哪些是“核心资产”

下面这些内容，在 OpenClaw 中依然是核心：

### 2.1 写作协议层资产
- `.claude/agents/*.md`
- `.claude/skills/工作流导演/SKILL.md`
- `.claude/skills/风格建模/SKILL.md`
- `.claude/skills/公众号文章获取/SKILL.md`

它们虽然放在 `.claude/` 目录下，但本质上是：
- 工作流说明
- Subagent 提示词
- 文件产物规范
- 写作约束

这些都可以被 OpenClaw 当作“可复用提示资产”继续使用。

### 2.2 文件式工作流约定
项目的核心闭环依赖这些产物：

- `articles/[项目名]/00_memory_packet.md`
- `articles/[项目名]/01_theme.md`
- `articles/[项目名]/02_cases.md`
- `articles/[项目名]/03_outline.md`
- `articles/[项目名]/04_empathy_map.md`
- `articles/[项目名]/05_concrete_library.md`
- `articles/[项目名]/draft_v1.md`
- `articles/[项目名]/...`
- `articles/[项目名]/[定稿]_clean.txt`
- `articles/[项目名]/99_episode.md`

OpenClaw 可以完整保留这套产物结构，不需要另起炉灶。

---

## 3. OpenClaw 下，哪些不能照搬

### 3.1 `.claude/settings.json` Hook 机制
上游通过 Claude Code Hook：
- 在 `humanizer` 或 `article-illustrator` 结束后
- 自动触发 `scripts/auto_clean_hook.py`
- 再生成 `_clean.txt`

在 OpenClaw 中，这个 Hook 不会天然生效。

**结论：**
- 可以保留 `.claude/settings.json` 兼容上游
- 但在 OpenClaw 里，应该把 Stage 12 设计成**显式步骤**，主动调用：

```bash
python scripts/generate_clean.py articles/[项目名]/[定稿文件].md
```

### 3.2 Claude Code 的 Skill / Agent 装载方式
README 里大量出现：
- `claude`
- Claude Code 自动加载 `.claude/skills/`
- Agent 工具 / `subagent_type`
- Anthropic 环境变量配置

这些都属于 Claude Code 专有运行假设。

在 OpenClaw 里，不要照搬“运行方式”，只吸收“工作流逻辑”。

---

## 4. OpenClaw 推荐运行方式

### 4.1 推荐原则
在 OpenClaw 里，建议把这个项目视为：

- 一个**写作工作流协议仓库**
- 一套**多阶段提示词与产物规范**
- 一套**可由主代理 + 子代理编排执行**的流程

而不是“必须启动 claude 命令才能用”的单一工具。

### 4.2 推荐执行架构
建议用 OpenClaw 按下面思路落地：

1. **主代理（orchestrator）** 负责：
   - 接收用户需求
   - 选择模式（A/B/C）
   - 决定当前阶段
   - 展示阶段结果给用户
   - 决定是否进入下一阶段

2. **子代理 / 阶段执行器** 负责：
   - 读取前序文件
   - 处理单一阶段任务
   - 写出阶段产物
   - 返回摘要给主代理

3. **脚本后处理** 负责：
   - `_clean.txt` 生成
   - 其他可 deterministic 完成的转换动作

---

## 5. OpenClaw 下的推荐阶段实现

### 协作模式（B）建议实现为：

- Stage 0：memory-loader
- Stage 1：writing-clarifier
- Stage 2：research-expert
- Stage 3：outline-architect
- Stage 4：empathy-designer
- Stage 5：concretizer
- Stage 5.5：title-designer
- Stage 6：writing-executor
- Stage 7：editor-review
- Stage 8：pre-publish-review
- Stage 9：toutiao-reader-test
- Stage 10：humanizer（强制）
- Stage 11：article-illustrator（可选）
- Stage 12：显式调用 `generate_clean.py`
- Stage 13：edit-diff-learner

### 关键差异
与上游不同的是：
- **Stage 12 在 OpenClaw 中不要依赖 Hook，改为显式执行。**
- 当前仓库已提供可直接使用的入口：

```bash
python scripts/openclaw_stage12_runner.py --project [项目名]
```

这是最重要的适配点。

---

## 6. 推荐的 OpenClaw 最小适配策略

### 策略 1：上游文件尽量不改
尽量保留：
- `.claude/agents/`
- `.claude/skills/`
- `README.md`
- `CHANGELOG.md`
- `CLAUDE.MD`

这样以后继续同步上游最省事。

### 策略 2：适配逻辑写到新增文件里
建议新增 / 维护：
- `README_OPENCLAW.md`（本文件）
- `OPENCLAW_EXECUTION_MAP.md`
- `OPENCLAW_ADAPTATION_PLAN.md`

### 策略 3：把平台专属动作显式化
例如：
- Hook → 显式脚本调用
- Agent 工具 → OpenClaw 子任务编排
- Claude 环境变量配置 → OpenClaw 自己的模型 / 工具配置

---

## 7. 一个现实建议

如果你的目标是：
- **能力与上游保持一致**
- **同时服务 OpenClaw 生态**

那最好的做法不是“把 `.claude/` 改成 `.openclaw/`”，而是：

**把 `.claude/` 当成上游协议层，OpenClaw 负责解释和执行。**

这样你既不会失去 upstream 兼容性，也不会被 Claude Code 的运行假设绑死。

---

## 8. 当前已知重点适配点清单

### 已确认
- `memory-loader` / `edit-diff-learner`：可直接保留
- `generate_clean.py`：可直接保留
- `scripts/openclaw_stage12_runner.py`：作为 OpenClaw 的显式 Stage 12 执行入口
- `auto_clean_hook.py`：可保留，但 OpenClaw 不应依赖它自动触发
- `.claude/settings.json`：保留兼容，不作为 OpenClaw 主机制

### 后续建议检查
- `公众号文章获取` skill 中的绝对路径
- Claude Code 专属命令示例是否需要额外补充 OpenClaw 示例
- 图片生成链路是否依赖 Claude Code 生态中的特定工具

---

## 9. 一句话结论

在 OpenClaw 里，`writing-agent` 应该被当成：

**一套可执行的写作工作流协议 + 一套阶段化提示资产 + 一套文件产物约定。**

不要照搬 Claude Code 的运行方式，重点是把它的工作流逻辑完整复用出来。 
