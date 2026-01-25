# 项目：写作 Agent（文章项目）v0.5.0

## 项目意图
本项目是一个工作流驱动的写作系统，采用 **Skills + Subagents 混合架构**。
目标**不是**快速协作，而是通过强制性的**需求澄清**、**风格执行**和**主编审稿**来实现可控的高质量输出。

Claude 必须严格遵守工作流。不允许跳过任何步骤。

---

## 🚨 重要：架构说明（v0.5.0 更新）

本项目使用 **Skills + Subagents 混合架构**：

### 可用 Skills（3个，语义触发）
位于 `.claude/skills/` 目录：

| Skill | 触发方式 | 职责 |
|-------|---------|------|
| `工作流导演` | 所有写作请求 | **总调度器**，通过显式调用 Subagent 完成任务 |
| `公众号文章获取` | 检测到 mp.weixin.qq.com 链接 | 提取公众号文章内容 |
| `风格建模` | "学习风格"、"提取风格" | 分析并创建风格文件 |

### 可用 Subagents（12个，显式调用）
位于 `.claude/agents/` 目录：

| Subagent | 职责 | 产物 |
|----------|------|------|
| `topic-generator` | 选题生成 | 候选选题列表 |
| `topic-research` | 选题调研 | 选题评分报告 |
| `writing-clarifier` | 澄清需求 | `01_theme.md` |
| `research-expert` | 调研素材 | `02_cases.md` |
| `outline-architect` | 设计大纲 | `03_outline.md` |
| `empathy-designer` | 共情点设计 | `04_empathy_map.md` |
| `concretizer` | 具象化设计 | `05_concrete_library.md` |
| `title-designer` | 标题设计 | 标题确认 |
| `writing-executor` | 写作执行 | `draft_v1.md` |
| `editor-review` | 主编审稿 | 审稿报告 + 新版稿件 |
| `pre-publish-review` | 发布前评审 | 评审报告 |
| `toutiao-reader-test` | 读者模拟 | 四关测试报告 |

---

## ⚠️ Subagent 调用语法

**必须使用以下格式调用 Subagent**：

```
使用 [subagent-name] 子代理来 [任务描述]。
项目名称：[项目名]
[其他必要参数]
```

**示例**：
```
使用 writing-clarifier 子代理来澄清写作需求。
用户请求：帮我写一篇关于35岁职业危机的文章
项目名称：35岁职业危机
```

**注意**：
- 必须使用"子代理"一词
- 必须提供项目名称
- 必须指明需要读取的前序文件

---

## 核心规则（非常重要）

### 规则1：必须先询问模式
**收到任何写作请求后，第一步必须输出模式选择菜单：**

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

**禁止自动判断模式，必须等待用户选择！**

### 规则2：严禁直接撰写文章内容
任何写作请求都**必须**先通过工作流导演调度。

### 规则3：信息通过文件传递
每个阶段的产物保存到 `articles/[项目名]/` 目录，后续 Subagent 从文件读取信息。

---

## 完整工作流

### 协作模式流程（10阶段）

```
用户选择协作模式
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
Stage 7: 使用 editor-review 子代理 → draft_v2.md（循环直到通过）
    ↓
Stage 8: 使用 pre-publish-review 子代理 → 评审报告
    ↓
Stage 9: 使用 toutiao-reader-test 子代理 → 读者测试
    ↓
完成
```

### 轻量模式流程（3阶段）

```
用户选择轻量模式
    ↓
Stage 1: 使用 writing-clarifier 子代理 → 01_theme.md
    ↓
Stage 2: 使用 writing-executor 子代理 → draft_v1.md
    ↓
Stage 3: 使用 editor-review 子代理 → 审稿（可选）
    ↓
完成
```

---

## 每个阶段的调用示例

### Stage 1: 澄清需求
```
使用 writing-clarifier 子代理来澄清写作需求。
用户请求：[用户的原始请求]
项目名称：[从主题生成]
```

### Stage 2: 调研素材
```
使用 research-expert 子代理来调研素材。
项目名称：[项目名]
请先读取 articles/[项目名]/01_theme.md 获取调研方向。
```

### Stage 3: 设计大纲
```
使用 outline-architect 子代理来设计大纲。
项目名称：[项目名]
请先读取 articles/[项目名]/01_theme.md 和 02_cases.md
```

### Stage 6: 写作执行
```
使用 writing-executor 子代理来执行写作。
项目名称：[项目名]
标题：[用户选择的标题]
请先读取 articles/[项目名]/ 下的所有准备文件。
```

---

## 失败定义
以下任何行为均被视为工作流执行失败：
- ❌ 没有先询问模式就开始工作
- ❌ 没有使用"子代理"语法调用 Subagent
- ❌ 在准入完成前撰写正文内容
- ❌ 跳过任何工作流阶段
- ❌ 一次性撰写全文
- ❌ 跳过主编审稿
- ❌ 输出带有明显AI味道的内容

发生失败时，Claude 应当承认错误并返回到正确的工作流步骤。

---

## 最终原则
本项目优先级排布：
**去AI味 > 清晰度 > 可控性 > 质量 > 速度**

写出看起来像人话的文章，远比写出"正确但AI味浓"的文章更重要。

---

## 版本记录
- v0.5.0 (2026-01-25): **重大架构升级**！改用 Skills + Subagents 混合架构。
- v0.4.0 (2026-01-20): 新增发布前评审和读者模拟。
- v0.3.0 (2026-01-15): 新增选题生成器。
