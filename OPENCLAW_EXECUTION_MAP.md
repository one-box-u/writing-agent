# OpenClaw 执行映射表

更新日期：2026-03-16
适用仓库：`writing-agent`
目标：将上游 Claude Code 语义，映射为 OpenClaw 中可执行、可维护的实现方式。

---

## 1. 核心映射

| 上游概念 | 上游含义 | OpenClaw 中的推荐实现 |
|---|---|---|
| Skill | 自动语义触发的流程入口或工具 | 主代理路由规则 / 技能文档 / 任务模板 |
| Subagent | 独立上下文的阶段执行者 | `sessions_spawn(runtime="subagent")` 或显式阶段执行子任务 |
| Agent 工具 | Claude Code 调用子代理的接口 | OpenClaw 的子会话 / 子代理编排 |
| Hook | 阶段结束时自动执行后处理 | 显式脚本执行 / 编排层阶段动作 |
| `.claude/settings.json` | Claude Code 的运行配置 | 仅作兼容文件；不作为 OpenClaw 主依赖 |
| `.claude/agents/*.md` | Subagent 提示资产 | 可直接复用为阶段执行说明 |
| `.claude/skills/*.md` | 工作流 / 工具协议 | 可直接复用为路由或阶段规范 |

---

## 2. 运行时角色划分

### 2.1 主代理（OpenClaw）负责
- 接用户请求
- 要求用户选择模式（A/B/C）
- 决定当前阶段
- 调用阶段执行器
- 向用户展示摘要与产物
- 管理是否进入下一步

### 2.2 子代理 / 阶段执行器负责
- 读取前序文件
- 专注完成单阶段工作
- 写入该阶段产物
- 返回阶段摘要

### 2.3 脚本负责
- 纯文本清洗
- clean 版导出
- 其他无需 LLM 的 deterministic 处理

---

## 3. 模式映射

### A. 轻量模式
上游逻辑：
- 澄清需求
- 写作执行
- 可选审稿

OpenClaw 映射：
1. 主代理询问模式
2. 调用 `writing-clarifier`
3. 调用 `writing-executor`
4. 如用户需要，再调 `editor-review`

### B. 协作模式
上游逻辑：14 阶段 / 16 Subagent

OpenClaw 映射：
1. 主代理按阶段推进
2. 每阶段调用一个子代理 / 子任务
3. 每阶段结果写入 `articles/[项目名]/`
4. 关键节点停下来给用户确认
5. Stage 12 显式运行 clean 脚本
6. Stage 13 调用复盘学习器

### C. 从选题开始
上游逻辑：
- topic-generator
- topic-research
- 转协作模式

OpenClaw 映射：
保持不变，只是执行载体换成 OpenClaw 编排。

---

## 4. 阶段映射清单

| Stage | 上游执行单元 | OpenClaw 推荐实现 | 产物 |
|---|---|---|---|
| 0 | memory-loader | 子代理 / 子任务 | `00_memory_packet.md` |
| 1 | writing-clarifier | 子代理 / 子任务 | `01_theme.md` |
| 2 | research-expert | 子代理 / 子任务 | `02_cases.md` |
| 3 | outline-architect | 子代理 / 子任务 | `03_outline.md` |
| 4 | empathy-designer | 子代理 / 子任务 | `04_empathy_map.md` |
| 5 | concretizer | 子代理 / 子任务 | `05_concrete_library.md` |
| 5.5 | title-designer | 子代理 / 子任务 + 用户确认 | `titles.md` / 标题确认 |
| 6 | writing-executor | 子代理 / 子任务 | `draft_v1.md` |
| 7 | editor-review | 子代理 / 子任务 | `review_report.md` |
| 8 | pre-publish-review | 子代理 / 子任务 | `publish_review.md` |
| 9 | toutiao-reader-test | 子代理 / 子任务 | `reader_test.md` |
| 10 | humanizer | 子代理 / 子任务（强制） | `*_humanized.md` / 定稿 |
| 11 | article-illustrator | 子代理 / 子任务（可选） | 图片与插图落盘 |
| 12 | Hook / clean 导出 | **显式脚本调用** | `*_clean.txt` |
| 13 | edit-diff-learner | 子代理 / 子任务 | `99_episode.md` |

---

## 5. 最关键差异：Stage 12

### 上游做法
上游默认依赖 Claude Code Hook：
- 匹配到 `humanizer|article-illustrator`
- 自动执行 `scripts/auto_clean_hook.py`

### OpenClaw 做法
OpenClaw 推荐把 Stage 12 变成显式步骤：

```bash
python scripts/generate_clean.py articles/[项目名]/[定稿文件].md
```

### 原因
- 更透明
- 更好调试
- 不依赖 Claude Code 私有运行时
- 更符合 OpenClaw 的“显式编排”哲学

---

## 6. 子代理实现建议

### 推荐场景：使用 OpenClaw 子代理
适合这些阶段：
- research-expert
- outline-architect
- empathy-designer
- concretizer
- title-designer
- writing-executor
- editor-review
- pre-publish-review
- toutiao-reader-test
- humanizer
- edit-diff-learner

### 可不必强制子代理的场景
如果只是非常轻量的文件转换或脚本动作：
- Stage 12 clean 导出
- 文件检查
- 简单规则校验

这些更适合主代理直接调用脚本。

---

## 7. 文件传递约定继续保留

OpenClaw 下仍建议坚持：
- 所有阶段以文件为准，不以对话历史为准
- 所有阶段都优先读取 `articles/[项目名]/` 中已有文件
- 阶段摘要只给主代理，不把整篇文本在对话里来回传

这样做的好处：
- 降低上下文成本
- 便于断点续跑
- 更接近上游设计
- 更容易审计与调试

---

## 8. OpenClaw 中的推荐实现原则

1. **主代理负责编排，不负责长篇代写**
2. **阶段执行尽量文件化，而不是上下文堆叠**
3. **能脚本化的后处理，不让模型硬做**
4. **把平台专属能力收敛到适配层**
5. **未来升级优先考虑 upstream 可同步性**

---

## 9. 一句话总结

对 OpenClaw 来说，`writing-agent` 不是“Claude Code 专用仓库”，而是：

**一个可以被 OpenClaw 编排执行的多阶段写作协议。**
