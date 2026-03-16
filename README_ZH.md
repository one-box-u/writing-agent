# Writing Agent - OpenClaw 适配版

> 🚀 基于 OpenClaw 框架的智能写作系统，专注于生成具有“人类温度”的高质量内容。

英文版本：[`README_EN.md`](./README_EN.md)

---

## 🆕 更新说明（2026-03-16）

本次更新已将你的 OpenClaw 分支同步到上游 `writing-agent v0.7.0` 的核心能力，并补齐 OpenClaw 实际可运行的链路。

### 本次升级包含

- **同步上游 v0.7.0 核心能力**
  - 新增 `memory-loader`
  - 新增 `edit-diff-learner`
  - 引入 `00_memory_packet.md` / `99_episode.md` 记忆闭环
  - 同步新版 `humanizer`、`writing-executor`、`outline-architect`、`title-designer` 等主力代理

- **补齐 OpenClaw 显式运行链路**
  - 新增 `scripts/openclaw_stage12_runner.py`
  - 在 OpenClaw 下不再依赖 Claude Code Hook 黑盒来生成 `_clean.txt`
  - Stage 12 现在可以显式执行，便于调试与编排

- **修复路径与宿主环境兼容问题**
  - 去除公众号文章提取技能中的作者本机绝对路径
  - 将多处 `~/.claude/...` 示例改为项目内相对路径
  - 保留上游协议层设计，同时增强 OpenClaw 可移植性

- **新增 OpenClaw 专用说明文档**
  - `README_OPENCLAW.md`
  - `OPENCLAW_EXECUTION_MAP.md`
  - `OPENCLAW_ADAPTATION_PLAN.md`

---

## 🎯 当前代码功能形态

### 1. 当前实际包含的代理（agents）

当前仓库下共有 **16 个代理文件**：

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

### 2. 当前实际包含的 skills

当前仓库下共有 **3 个核心 skills**：

- `工作流导演`
- `风格建模`
- `公众号文章获取`

### 3. 当前实际包含的脚本

- `scripts/auto_clean_hook.py`
- `scripts/generate_clean.py`
- `scripts/generate_image.ts`
- `scripts/openclaw_stage12_runner.py`

---

## 🛠️ 创作模式体系

本系统当前支持三种模式：

| 模式 | 核心逻辑 | 适用场景 |
|:---|:---|:---|
| **轻量模式 (Lite)** | 澄清 → 快速写作 → 可选审稿 | 短文、随笔、已有素材 |
| **协作模式 (Pro)** | 记忆装载 → 调研 → 结构 → 写作 → 审稿 → 读者测试 → 去 AI 味 → 可选配图 → clean 导出 → 复盘 | 长文、深度分析、完整工作流 |
| **选题模式 (Ideation)** | 选题生成 → 选题验证 → 转入协作模式 | 没有题目、需要先找方向 |

---

## 📐 当前工作流阶段（以代码为准）

当前 `工作流导演` 对应的协作模式主链可理解为：

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

> 注意：虽然早期文档里常说“12 阶段”，但当前代码形态实际上已经包含 **Stage 0 + Stage 13** 的扩展链路。

---

## 🚀 当前使用方法（OpenClaw）

### 方式一：作为 OpenClaw 中的写作工作流仓库使用

推荐理解方式：

1. **主代理负责调度**
   - 接收用户写作需求
   - 先要求选择模式（轻量 / 协作 / 选题）
   - 按阶段推进

2. **阶段代理负责产出文件**
   - 每个阶段读取 `articles/[项目名]/` 下已有文件
   - 生成对应阶段产物
   - 把结果继续落盘

3. **Stage 12 显式执行 clean 导出**

OpenClaw 下推荐命令：

```bash
python scripts/openclaw_stage12_runner.py --project [项目名]
```

如果你已经知道定稿文件路径，也可以直接：

```bash
python scripts/generate_clean.py articles/[项目名]/[定稿文件名].md
```

### 方式二：查看 OpenClaw 专用文档

如果你要进一步接入或改造，请优先看：

- `README_OPENCLAW.md`：OpenClaw 总说明
- `OPENCLAW_EXECUTION_MAP.md`：上游概念到 OpenClaw 的执行映射
- `OPENCLAW_ADAPTATION_PLAN.md`：升级与适配设计思路

---

## 📂 产物结构

当前工作流产物约定为：

```text
articles/
└── [项目名称]/
    ├── 00_memory_packet.md      # 自动生成的写作偏好备忘
    ├── 01_theme.md              # 主题定义
    ├── 02_cases.md              # 素材调研
    ├── 03_outline.md            # 文章大纲
    ├── 04_empathy_map.md        # 共情图谱
    ├── 05_concrete_library.md   # 具象化库
    ├── titles.md                # 候选标题
    ├── draft_v1.md              # 初稿
    ├── draft_v2.md ...          # 修订稿
    ├── review_*.md              # 审稿记录
    ├── reader_test.md           # 读者模拟
    ├── *_humanized.md / final.md # 去 AI 味后版本 / 定稿
    ├── [项目名]_clean.txt       # 纯净版
    └── 99_episode.md            # 写作复盘
```

---

## 🔒 核心规则

1. **模式选择前置**：写作请求先选模式
2. **文件驱动工作流**：每阶段优先读写 `articles/[项目名]/`
3. **关键节点需要确认**：如标题、配图等
4. **Stage 10 强制去 AI 味**
5. **Stage 12 必须产出 clean 版本**
6. **Stage 13 自动复盘（有差异时）**

---

## 📜 开源许可

MIT License - See [LICENSE](./LICENSE)

## 🙏 致谢

- 原项目：[dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- 灵感来源：Wikipedia AI Cleanup Project
