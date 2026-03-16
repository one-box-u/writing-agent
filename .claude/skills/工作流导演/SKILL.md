---
name: workflow-producer
description: |
  [MASTER ENTRY POINT] 写作工作流总导演 - 所有写作请求的唯一入口点。
  触发词：帮我写、写文章、写一篇、创作、写作、产出、起草
  第一步必须询问用户选择模式（A/B/C），禁止跳过，禁止自动判断。
---

# 工作流导演 (Workflow Producer)

## ⚠️ 第一条规则：必须先问模式

**无论用户说什么，只要涉及写作，第一步必须输出这个菜单：**

```
🎬 请选择工作流模式：

【A. 轻量模式】快速产出
   适用场景：短文（≤1000字）、随笔、已有完整素材
   流程：需求澄清 → 写作 → 简单审稿

【B. 协作模式】深度创作 ⭐ 推荐
   适用场景：长文（>1500字）、深度分析、需要数据/案例支撑
   流程：10阶段完整SOP

【C. 从选题开始】没有灵感
   适用场景：不知道写什么，需要帮忙生成选题
   流程：选题生成 → 选题验证 → 进入协作模式

请输入 A / B / C 选择模式：
```

**❌ 禁止**：
- 跳过模式选择
- 自动判断模式
- 直接开始写作
- 直接调用 Subagent
- 询问写作详情

**✅ 必须**：
- 先输出上面的菜单
- 等待用户回复 A/B/C
- 收到回复后再进入下一步

---

## 第二条规则：使用 Subagent 执行任务

用户选择模式后，根据模式调用对应的 Subagent。

### Subagent 调用语法

```
使用 [subagent-name] 子代理来 [任务描述]。
[详细参数]
```

**示例**：
```
使用 writing-clarifier 子代理来澄清写作需求。
用户请求：帮我写一篇关于35岁职业危机的文章
项目名称：35岁职业危机
```

### 可用 Subagent（16个）

| Subagent | 职责 |
|----------|------|
| `memory-loader` | 记忆装载（Stage 0） |
| `topic-generator` | 选题生成 |
| `topic-research` | 选题调研 |
| `writing-clarifier` | 澄清需求 |
| `research-expert` | 调研素材 |
| `outline-architect` | 设计大纲 |
| `empathy-designer` | 共情点设计 |
| `concretizer` | 具象化设计 |
| `title-designer` | 标题设计 |
| `writing-executor` | 写作执行 |
| `editor-review` | 主编审稿 |
| `pre-publish-review` | 发布前评审 |
| `toutiao-reader-test` | 读者模拟 |
| `humanizer` | 去AI味专家 |
| `article-illustrator` | 文章配图师 |
| `edit-diff-learner` | 写作复盘学习器 |

### Agent 工具调用示例

**重要**：必须使用 Agent 工具来调用 Subagent，而不是仅仅文字描述。

#### 示例 1：调用 writing-clarifier（澄清需求）

当用户选择模式后，使用以下方式调用 Subagent：

```
使用 Agent 工具，参数如下：
- description: "澄清写作需求"
- prompt: "使用 writing-clarifier 子代理来澄清写作需求。\n用户请求：帮我写一篇关于35岁职业危机的文章\n项目名称：35岁职业危机"
- subagent_type: "writing-clarifier"
```

#### 示例 2：调用 research-expert（调研素材）

```
使用 Agent 工具，参数如下：
- description: "调研素材"
- prompt: "使用 research-expert 子代理来调研素材。\n项目名称：35岁职业危机\n请先读取 articles/35岁职业危机/01_theme.md 获取调研方向。"
- subagent_type: "research-expert"
```

#### 示例 3：调用 writing-executor（写作执行）

```
使用 Agent 工具，参数如下：
- description: "执行写作"
- prompt: "使用 writing-executor 子代理来执行写作。\n项目名称：35岁职业危机\n标题：35岁，你的职场护城河在哪里？\n请先读取 articles/35岁职业危机/ 下的所有准备文件。"
- subagent_type: "writing-executor"
```

#### 关键要点

1. **必须使用 Agent 工具**：不能只是文字描述"使用 xxx 子代理"
2. **description 参数**：简短描述任务（3-5个字）
3. **prompt 参数**：包含完整的任务描述和必要参数
4. **subagent_type 参数**：指定要调用的 Subagent 名称
5. **提供上下文**：在 prompt 中说明需要读取哪些文件

---

## 轻量模式（A）流程

```
用户选择 A
    ↓
使用 writing-clarifier 子代理来澄清写作需求。
用户请求：[原始请求]
项目名称：[项目名]
    ↓
向用户展示澄清结果，确认后继续
    ↓
使用 writing-executor 子代理来执行写作。
项目名称：[项目名]
标题：[标题]
    ↓
向用户展示初稿，询问是否需要审稿
    ↓
（可选）使用 editor-review 子代理来进行审稿。
```

---

## 协作模式（B）流程

```
用户选择 B
    ↓
Stage 0: 使用 memory-loader 子代理 → 00_memory_packet.md（装载历史写作经验）
    ↓
Stage 1: 使用 writing-clarifier 子代理 → 01_theme.md
    ↓
Stage 2: 使用 research-expert 子代理 → 02_cases.md
    ↓
Stage 3: 使用 outline-architect 子代理 → 03_outline.md
    ↓
Stage 4: 使用 empathy-designer 子代理 → 04_empathy_map.md
    ↓
Stage 5: 使用 concretizer 子代理 → 05_concrete_library.md
    ↓
Stage 5.5: 使用 title-designer 子代理 → 标题确认
    ↓
Stage 6: 使用 writing-executor 子代理 → draft_v1.md
    ↓
Stage 7: 使用 editor-review 子代理 → 审稿循环
    ↓
Stage 8: 使用 pre-publish-review 子代理 → 评审报告
    ↓
Stage 9: 使用 toutiao-reader-test 子代理 → 读者测试
    ↓
    (自动进入，无需确认)
    ↓
Stage 10: 🤖 强制执行 → 使用 humanizer 子代理去AI味
    ↓
Stage 11: 🎨 询问用户 → 是否需要配图？
    ↓
Stage 12: 📤 终局必定触发 → 纯净排版 .txt 文件（由 Hook 自动生成）
    ↓
Stage 13: 🧠 自动复盘 → 使用 edit-diff-learner 对比初稿与定稿，提炼写作经验
```

---

## 选题模式（C）流程

```
用户选择 C
    ↓
询问用户想写什么领域
    ↓
使用 topic-generator 子代理来生成选题。
用户领域：[领域]
目标读者：[读者]
    ↓
向用户展示候选选题，让用户选择
    ↓
使用 topic-research 子代理来调研选题。
选题：[用户选择的选题]
    ↓
选题验证通过 → 进入协作模式 Stage 1
```

---

## 进度展示

每完成一个 Stage，输出进度：

```
═══════════════════════════════════════════════════
✅ Stage X 完成：[阶段名称]
═══════════════════════════════════════════════════

【产物】：articles/[项目名]/[文件名]
【摘要】：[关键信息]

📋 进度：[X/11] ████████░░ 80%

继续下一阶段？(是/调整/跳过)
```

## Stage 10: 🤖 强制去AI味处理（Humanizer）

Stage 9 (读者测试) 结束后，**自动进入 Stage 10**，无需用户确认。

你必须主动说明并立即执行：

```
✅ Stage 9 读者测试已完成！

📝 现在自动进入 Stage 10：去AI味处理

我将使用 Humanizer 专家对文章进行深度优化：
1. 删除所有空洞的形容词（如"至关重要"）
2. 打破公式化的句子结构
3. 注入更像真人的语气和观点

正在处理...
```

然后立即调用 humanizer 子代理，无需等待用户确认。

## Stage 11: 🎨 配图工坊 (Article Illustrator)

在文本最终定稿后（无论是否执行了 Humanizer），**必须**询问用户：

```
📝 文本已定稿。

🤔 想要来点视觉冲击力吗？
我是 Article Illustrator (配图师)，我可以：
1. 分析文章情感，设计视觉风格 (Flat/Lofi/Cyberpunk)
2. 自动生成 3-5 张高质量配图 (封面/插图/概念图)
3. 自动插入到文章中

请回复：
Y - 是，请为文章配图
N - 否，纯文字即可
```

## Stage 12: 📤 终极收尾动作（生成排版纯净版）

**Claude Code 环境**：纯净版 `_clean.txt`` 通常由 Hook 脚本 (`scripts/auto_clean_hook.py`) 在 Stage 10/11 的 Subagent 结束时自动生成。

**OpenClaw 环境**：不要依赖 Hook 黑盒，推荐显式执行 Stage 12：
```bash
python scripts/openclaw_stage12_runner.py --project [项目名]
```

如果你已经明确知道定稿文件名，也可以直接调用：
```bash
python scripts/generate_clean.py articles/[项目名]/[定稿文件名].md
```

## Stage 13: 🧠 写作复盘与经验提炼

Stage 12 完成后（纯净版已生成），**自动调用写作复盘学习器**。

**前提条件**：项目目录中至少存在 `draft_v1.md` 和另一个更新版本的定稿文件。如果初稿即定稿（用户没做过任何修改），则跳过。

```
使用 edit-diff-learner 子代理来复盘本次写作。
项目名称：[项目名]
```

复盘完成后输出：
```
═══════════════════════════════════════════════
🧠 Stage 13 完成：写作复盘与经验提炼
═══════════════════════════════════════════════

【产物】：articles/[项目名]/99_episode.md
【提取规则数】：X 条
【核心发现】：[一句话概括]

📋 进度：[13/13] █████████████ 100%

✅ 全部流程完成！
📄 纯净版：articles/[项目名]/[文件名]_clean.txt（可直接复制到微信公众号发布）
🧠 复盘报告：articles/[项目名]/99_episode.md（本次写作的经验教训）
```

---

## 核心规则总结

1. **第一步必须问模式**（A/B/C选择）
2. **禁止直接写作**
3. **必须使用 Subagent**（"使用 xxx 子代理来..."）
4. **每阶段产物落盘**（保存到 articles/[项目名]/）
5. **展示进度**
6. **关键节点用户确认**（大纲、标题、配图）
7. **🚨 严禁早退 + Stage 10 强制执行**：Stage 9 完成后，必须自动进入 Stage 10 (去AI味)，无需用户确认。Stage 10 完成后，才询问用户是否需要 Stage 11 (配图)。
8. **📤 纯净版自动生成**：由 Hook 在 Stage 10/11 结束时自动触发 `scripts/auto_clean_hook.py`。
9. **🧠 自动复盘**：Stage 12 后自动调用 `edit-diff-learner`，对比初稿与定稿提炼写作经验（初稿即定稿时跳过）。

---

## 版本
- v3.1.0 (2026-03-14): 新增 Stage 13 写作复盘与经验提炼（edit-diff-learner）；Stage 12 纯净版生成改为 Hook 自动触发。
- v3.0.3 (2026-02-21): 新增 Stage 12 终极收尾动作，确保无论在哪一步结束都会生成适合直接复制的无空行排版版 (clean.txt)。
