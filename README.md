# Writing Agent - OpenClaw 适配版

> 基于 OpenClaw 的多阶段智能写作系统。它不是一次性“吐一篇文章”的简单生成器，而是一套把**选题、调研、结构设计、写作、审稿、读者测试、去 AI 味、纯净导出、复盘记忆**串起来的完整工作流。

**English version:** [`README_EN.md`](./README_EN.md)

---

## 这是什么

这是 `writing-agent` 的 OpenClaw 适配版本，已经同步上游 `v0.7.0` 核心能力，并补齐了 OpenClaw 下真正可运行的关键链路。

它适合做的，不只是“写一篇文章”，而是：

- 写公众号文章
- 写长文分析
- 写观点型内容
- 写带情绪张力的内容
- 做从选题到定稿的完整写作流程
- 把每一阶段产物落盘保存，方便复盘、修改、断点续写

一句话说：

**它是一个“文件驱动 + 多代理分阶段执行 + 可复盘记忆”的写作系统。**

---

## 它具备哪些功能

当前 `main` 分支已经包含以下能力：

### 1. 多阶段写作工作流
不是直接一口气生成正文，而是按阶段推进：

- 需求澄清
- 素材调研
- 大纲设计
- 共情点设计
- 具象化细节补强
- 标题设计
- 初稿写作
- 主编审稿
- 发布前评审
- 读者模拟
- Humanizer 去 AI 味
- 可选配图
- clean 纯净版导出
- 写作复盘与记忆沉淀

### 2. 记忆闭环
当前版本已经引入：

- `memory-loader`
  - 在写作开始前读取历史复盘，生成 `00_memory_packet.md`
- `edit-diff-learner`
  - 在流程收尾阶段，对比初稿与定稿，生成 `99_episode.md`

这意味着它不是每次都“重新开始”，而是能逐步积累写作偏好和经验。

### 3. Humanizer 去 AI 味
当前仓库包含增强版 `humanizer`，用于：

- 清理典型 AI 高频词
- 打破等长句和机械排比
- 增强真人表达感
- 注入更具体、更有体感的细节
- 使用更像人写作的节奏和语气

### 4. 读者模拟与审稿
当前流程里不仅有写作，还有：

- `editor-review`
- `pre-publish-review`
- `toutiao-reader-test`

也就是说，它不只是“会写”，还会在发布前做多轮质量把关。

### 5. 可选配图
如果你配置了图片能力，还可以使用：

- `article-illustrator`

为文章设计视觉风格并生成配图。

### 6. OpenClaw 显式 clean 导出
这是这个分支非常关键的一点。

在 OpenClaw 中，当前版本**不再强依赖 Claude Code Hook 黑盒**来完成 clean 导出，而是提供了显式入口：

```bash
python scripts/openclaw_stage12_runner.py --project [项目名]
```

如果你知道定稿文件路径，也可以直接：

```bash
python scripts/generate_clean.py articles/[项目名]/[定稿文件].md
```

---

## 当前代码结构概览

### Agents（16 个）
当前仓库包含 16 个阶段代理：

- `article-illustrator`
- `concretizer`
- `edit-diff-learner`
- `editor-review`
- `empathy-designer`
- `humanizer`
- `memory-loader`
- `outline-architect`
- `pre-publish-review`
- `research-expert`
- `title-designer`
- `topic-generator`
- `topic-research`
- `toutiao-reader-test`
- `writing-clarifier`
- `writing-executor`

### Skills（3 个核心）
- `工作流导演`
- `风格建模`
- `公众号文章获取`

### Scripts（关键脚本）
- `scripts/auto_clean_hook.py`
- `scripts/generate_clean.py`
- `scripts/generate_image.ts`
- `scripts/openclaw_stage12_runner.py`

---

## 在 OpenClaw 上怎么使用

### 推荐使用方式

在 OpenClaw 中，推荐这样理解并使用这个项目：

#### 主代理负责什么
主代理负责：
- 接收用户写作请求
- 先让用户选模式
- 控制阶段推进
- 决定什么时候进入下一阶段
- 把阶段结果展示给用户

#### 阶段代理负责什么
阶段代理负责：
- 读取前序产物文件
- 只做当前阶段的事情
- 把本阶段产物写回 `articles/[项目名]/`

#### 脚本负责什么
脚本负责：
- clean 导出
- 图片生成
- 其他确定性的后处理

也就是说，**OpenClaw 最适合把它当成一个“主代理编排 + 阶段代理执行 + 文件产物驱动”的系统来用。**

---

## 支持哪些写作模式

当前推荐三种模式：

| 模式 | 适合场景 | 核心流程 |
|---|---|---|
| 轻量模式 Lite | 短文、随笔、已有素材 | 澄清 → 快速写作 → 可选审稿 |
| 协作模式 Pro | 长文、深度分析、完整产出 | 记忆 → 调研 → 结构 → 写作 → 审稿 → 去 AI 味 → clean 导出 → 复盘 |
| 选题模式 Ideation | 没有题目，先找方向 | 选题生成 → 选题验证 → 转协作模式 |

---

## 当前工作流阶段（代码对齐）

协作模式当前主链为：

- Stage 0：`memory-loader`
- Stage 1：`writing-clarifier`
- Stage 2：`research-expert`
- Stage 3：`outline-architect`
- Stage 4：`empathy-designer`
- Stage 5：`concretizer`
- Stage 5.5：`title-designer`
- Stage 6：`writing-executor`
- Stage 7：`editor-review`
- Stage 8：`pre-publish-review`
- Stage 9：`toutiao-reader-test`
- Stage 10：`humanizer`（强制）
- Stage 11：`article-illustrator`（可选）
- Stage 12：生成 `_clean.txt`
- Stage 13：`edit-diff-learner`

> 说明：早期常被概括成“12 阶段”，但当前代码形态实际上已经包含扩展后的 Stage 0 与 Stage 13。

---

## 需要配置什么

### 最基础配置
如果你要跑最基本的文本工作流，建议先具备：

- OpenClaw 运行环境
- Python 3.10+
- 可用的文本模型能力

### 进一步可选配置
如果你想把能力跑全，可以继续补：

- **搜索能力**
  - 用于调研素材和外部资料获取
- **浏览器能力**
  - 用于 `公众号文章获取`
- **图片能力**
  - 用于 `article-illustrator`
- **Node.js**
  - 用于图片脚本或部分 JS 工具链

### 配置文件
仓库中已有：

- `config.json`
- `config.json.template`

你可以从模板开始，根据自己的环境补配置。

> 注意：不同用户的 OpenClaw 环境能力不完全一样，所以最少配置和完整配置是两回事。最优先保证的是：文本模型 + OpenClaw 运行链路。

---

## 最关键命令

### 导出 clean 版本

```bash
python scripts/openclaw_stage12_runner.py --project [项目名]
```

或：

```bash
python scripts/generate_clean.py articles/[项目名]/[定稿文件].md
```

---

## 产物会保存到哪里

所有阶段产物默认都落到：

```text
articles/[项目名]/
```

典型结构包括：

```text
articles/
└── [项目名称]/
    ├── 00_memory_packet.md
    ├── 01_theme.md
    ├── 02_cases.md
    ├── 03_outline.md
    ├── 04_empathy_map.md
    ├── 05_concrete_library.md
    ├── titles.md
    ├── draft_v1.md
    ├── draft_v2.md ...
    ├── review_*.md
    ├── reader_test.md
    ├── *_humanized.md / final.md
    ├── [项目名]_clean.txt
    └── 99_episode.md
```

这也是它和“纯聊天式一次性生成”最大的不同：

**每个阶段都是可见、可改、可复盘的。**

---

## 推荐阅读

### 中文
- 中文详细说明：[`README_ZH.md`](./README_ZH.md)
- OpenClaw 使用说明：[`README_OPENCLAW.md`](./README_OPENCLAW.md)
- 执行映射：[`OPENCLAW_EXECUTION_MAP.md`](./OPENCLAW_EXECUTION_MAP.md)
- 适配设计：[`OPENCLAW_ADAPTATION_PLAN.md`](./OPENCLAW_ADAPTATION_PLAN.md)
- 更新记录：[`CHANGELOG.md`](./CHANGELOG.md)
- 发布说明：[`RELEASE_NOTES_ZH.md`](./RELEASE_NOTES_ZH.md)

### English
- Detailed guide: [`README_EN.md`](./README_EN.md)
- Release notes: [`RELEASE_NOTES_EN.md`](./RELEASE_NOTES_EN.md)

---

## 仓库定位

这个版本不是简单把上游项目“搬过来”，而是：

**在保留上游工作流协议的基础上，整理成了一个更适合 OpenClaw 编排执行、文档清晰、可维护、可持续升级的版本。**

---

## 致谢

- Upstream: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- Fork: [one-box-u/writing-agent](https://github.com/one-box-u/writing-agent)
