# Writing Agent 升级与 OpenClaw 适配方案

更新日期：2026-03-16
当前分支：`sync/upstream-v0.7.0-openclaw`
上游基线：`dongbeixiaohuo/writing-agent@v0.7.0`

---

## 1. 目标

本次升级目标分两层：

1. **功能层追平上游 v0.7.0**
   - 记忆装载（`memory-loader`）
   - 写作复盘（`edit-diff-learner`）
   - Hook 自动输出 `_clean.txt`
   - 工作流导演升级为 14 阶段 / 16 Subagent
   - skills progressive disclosure 结构升级

2. **运行层适配 OpenClaw**
   - 保持项目能力与上游一致
   - 不强绑定 Claude Code 专有运行机制
   - 在 OpenClaw 中可执行、可维护、可继续跟上游同步

---

## 2. 当前状态

### 已完成
- 已创建升级分支：`sync/upstream-v0.7.0-openclaw`
- 已将代码追平到上游 `origin/main` 最新提交 `ef54080`
- 已识别上游新增内容：
  - `.claude/agents/memory-loader.md`
  - `.claude/agents/edit-diff-learner.md`
  - `.claude/settings.json`
  - `scripts/auto_clean_hook.py`
  - `scripts/generate_clean.py`
  - skills references / scripts 拆分

### 结论
当前仓库 **已经具备上游 v0.7.0 文件形态**，但仍存在“运行机制默认依赖 Claude Code”的问题，需要补 OpenClaw 兼容层。

---

## 3. 上游能力中可直接复用的部分

以下内容原则上可以直接保留，不需要重写：

### 3.1 Subagent 规范与写作流程设计
- `.claude/agents/*.md`
- `.claude/skills/工作流导演/SKILL.md`
- `README.md` 中关于工作流阶段设计的主体思路

原因：
- 这些文件本质上是任务协议 / 写作 SOP / 提示词规则
- 它们不直接依赖 OpenClaw API
- 即使运行载体从 Claude Code 换成 OpenClaw，这些“写作方法论”仍然成立

### 3.2 纯净版生成脚本
- `scripts/generate_clean.py`

原因：
- 这是纯 Python 文本清洗逻辑
- 与宿主平台弱耦合
- 可直接在 OpenClaw 中调用

### 3.3 自进化记忆机制的文件约定
- `00_memory_packet.md`
- `99_episode.md`

原因：
- 这是产物约定，不是平台能力
- 适合保留为跨平台稳定接口

---

## 4. 需要适配的部分

### 4.1 Claude Code Hooks → OpenClaw 事件/脚本触发

#### 上游现状
`.claude/settings.json`：
- 在 `SubagentStop` 时，如果 matcher 命中 `humanizer|article-illustrator`
- 自动执行 `python scripts/auto_clean_hook.py`

#### 问题
OpenClaw 不会原生消费 Claude Code 的 `.claude/settings.json` Hook 配置。

#### OpenClaw 适配建议
不要删除上游 Hook 文件，而是采用“双轨兼容”：

- **保留** `.claude/settings.json`
  - 继续兼容 Claude Code 用户
- **新增 OpenClaw 等价触发方案**
  - 方案 A：在 OpenClaw 工作流编排层显式调用 `scripts/generate_clean.py`
  - 方案 B：封装为 OpenClaw skill / runner，在 humanizer 或 article-illustrator 后触发
  - 方案 C：由 orchestrator 在 Stage 12 主动执行 clean 输出，不依赖 Hook

#### 推荐
优先采用 **方案 C**：
- 最直接
- 最不依赖平台黑盒机制
- 逻辑可见、可调试
- 更适合 OpenClaw 的工具式编排

---

### 4.2 Claude Code 专属文档说明 → OpenClaw 文档分层

#### 上游现状
README / SKILL 里大量描述：
- 如何启动 `claude`
- Claude Code 如何加载 `.claude/skills/`
- Claude hooks / mcp 配置方式
- `ANTHROPIC_AUTH_TOKEN` 等环境变量配置

#### 问题
这些说明对 OpenClaw 使用者不准确，甚至会误导。

#### OpenClaw 适配建议
不直接删除 README 主体，而是：

1. 保留上游原 README（便于跟 upstream diff）
2. 新增一份 OpenClaw 文档，例如：
   - `README_OPENCLAW.md`
3. 在其中说明：
   - 如何在 OpenClaw 中调用本项目
   - 哪些 `.claude/` 文件是“协议层资产”而非运行时依赖
   - 如何替代 Claude Hook
   - 如何使用 OpenClaw 的子代理 / 工具完成相同流程

---

### 4.3 Agent 调用语法 → OpenClaw 执行映射

#### 上游现状
工作流导演文件里强调：
- 用 Agent 工具调用 Subagent
- `subagent_type` 参数

#### 问题
这是 Claude Code 的调度心智，不是 OpenClaw 的原生调用方式。

#### OpenClaw 适配建议
建立“概念映射表”：

| 上游概念 | OpenClaw 对应实现 |
|---|---|
| Skill | OpenClaw Skill / 主代理路由规则 |
| Subagent | `sessions_spawn(runtime="subagent")` 或本地编排子任务 |
| Hook | 明确的脚本调用 / 阶段后处理 |
| 文件传递 | 同样保留，继续使用 `articles/项目名/` |

建议新增文档：
- `OPENCLAW_EXECUTION_MAP.md`

---

### 4.4 公众号文章获取 Skill 中的本机绝对路径

发现以下高风险点：
- `.claude/skills/公众号文章获取/scripts/readability_loader.js`
- references 文档里多处出现：`~/.claude/skills/web-article-extractor/...`
- 某些说明直接绑定 Claude 环境与用户目录

#### 风险
- 在 OpenClaw 服务器环境中路径未必成立
- 不利于仓库自包含

#### 适配建议
后续整理为：
- 统一改成**相对于 skill 目录的相对路径解析**
- 避免 `/Users/...` 这类作者本机路径

这个属于 **代码卫生 + 可移植性修复**，建议纳入下一轮提交。

---

## 5. 推荐的目录与分层策略

为降低以后同步上游的冲突，建议遵循以下规则：

### 5.1 上游层（尽量不改）
- `.claude/agents/`
- `.claude/skills/`
- `scripts/generate_clean.py`
- `README.md`
- `CHANGELOG.md`
- `CLAUDE.MD`

### 5.2 OpenClaw 适配层（新增文件）
- `OPENCLAW_ADAPTATION_PLAN.md`（本文件）
- `README_OPENCLAW.md`
- `OPENCLAW_EXECUTION_MAP.md`
- 如有必要：`scripts/openclaw_stage12_runner.py`

### 5.3 必要时才 patch 上游文件
只有在以下情况才改上游文件：
- 明显路径 bug
- 明显运行错误
- 安全问题
- 会直接阻断 OpenClaw 使用

否则尽量通过“补充文件 + 补充编排层”解决。

---

## 6. 迁移执行结果

### 阶段 A：代码追平
- [x] 同步上游 v0.7.0

### 阶段 B：适配设计
- [x] 识别 Hook 依赖
- [x] 识别 OpenClaw / Claude Code 运行边界
- [x] 输出 OpenClaw 使用文档
- [x] 输出执行映射文档

### 阶段 C：最小可运行适配
- [x] 确定 Stage 12 在 OpenClaw 中的触发方式
- [x] 新增显式 clean runner：`scripts/openclaw_stage12_runner.py`
- [x] 验证 `generate_clean.py` 可独立工作
- [x] 验证 OpenClaw 下 `_clean.txt` 可实际产出

### 阶段 D：可移植性修复
- [x] 清理部分 skill 中的绝对路径
- [x] 清理部分过强的 Claude 专属说明
- [x] 将 README 与当前代码功能形态对齐

---

## 7. 下一步建议

下一步优先做这三件事：

1. **补 `README_OPENCLAW.md`**
   - 告诉 OpenClaw 用户如何真正使用这个项目

2. **补 `OPENCLAW_EXECUTION_MAP.md`**
   - 明确 stages / subagents / hooks 在 OpenClaw 中如何落地

3. **决定 Stage 12 触发策略**
   - 推荐：在 OpenClaw 编排层显式执行 `generate_clean.py`
   - 不依赖 Claude Hook 黑盒

---

## 8. 核心原则（以后继续升级时遵守）

1. **先同步 upstream，再叠 OpenClaw patch**
2. **OpenClaw patch 尽量写在新增文件里，不要污染上游主干文件**
3. **把“运行机制”与“写作规则”分开**
4. **把 Hook 黑盒逻辑改成可见的阶段动作**
5. **一切以未来继续跟 upstream 为第一优先级**

---

## 9. 一句话结论

这次升级已经完成“追平上游”；接下来的重点不再是抄代码，而是把 **Claude Code 专属运行假设** 拆出来，换成 **OpenClaw 可见、可调试、可持续同步** 的适配层。
��经完成“追平上游”；接下来的重点不再是抄代码，而是把 **Claude Code 专属运行假设** 拆出来，换成 **OpenClaw 可见、可调试、可持续同步** 的适配层。
