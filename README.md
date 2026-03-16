# Writing Agent - OpenClaw 适配版

> 基于 OpenClaw 的智能写作系统，已同步上游 `writing-agent v0.7.0` 核心能力，并补齐 OpenClaw 下的可运行执行链路。

英文说明请看：[`README_EN.md`](./README_EN.md)

---

## 这是什么

这是 `writing-agent` 的 OpenClaw 适配版本。

它保留了上游项目的核心写作工作流能力，包括：
- 多阶段写作流程
- 子代理协作
- Humanizer 去 AI 味
- 读者模拟
- 配图流程
- 写作记忆闭环（`00_memory_packet.md` / `99_episode.md`）

同时，它补齐了在 OpenClaw 中真正落地时最关键的执行链路，尤其是：
- OpenClaw 场景下的 Stage 12 显式 clean 导出
- 更适合 OpenClaw 的文档说明与执行映射
- 更可移植的路径处理方式

---

## 当前功能形态

当前 `main` 分支已经包含：

- **16 个 agents**
  - 包括 `memory-loader`、`edit-diff-learner`、`humanizer`、`article-illustrator` 等
- **3 个核心 skills**
  - `工作流导演`
  - `风格建模`
  - `公众号文章获取`
- **4 个关键脚本**
  - `scripts/auto_clean_hook.py`
  - `scripts/generate_clean.py`
  - `scripts/generate_image.ts`
  - `scripts/openclaw_stage12_runner.py`
- **记忆闭环**
  - 启动前生成 `00_memory_packet.md`
  - 完成后生成 `99_episode.md`
- **OpenClaw 显式 Stage 12**
  - 不依赖 Claude Code Hook 黑盒也能产出 `_clean.txt`

---

## 在 OpenClaw 上怎么使用

### 推荐理解方式

在 OpenClaw 中，建议把这个仓库理解为：

1. **一套写作工作流协议**
2. **一组阶段化代理提示资产**
3. **一套文件驱动的产物结构**
4. **一套可由主代理编排、子代理分阶段执行的工作流**

也就是说，它不是“只能在 Claude Code 里跑的项目”，而是：

**可以在 OpenClaw 中由主代理 + 子代理 + 脚本共同执行的写作系统。**

### 推荐运行方式

在 OpenClaw 中使用时，建议：

- 主代理负责：
  - 接收用户写作需求
  - 要求先选模式
  - 控制阶段推进
  - 向用户展示阶段结果

- 阶段代理负责：
  - 读取 `articles/[项目名]/` 中已有文件
  - 只完成当前阶段任务
  - 把产物继续写回文件系统

- 脚本负责：
  - clean 导出
  - 其他确定性后处理

---

## 需要配置什么

### 1. 运行环境

建议至少具备：

- OpenClaw 运行环境
- Python 3.10+
- Node.js（如果要用图片脚本或部分 JS 工具）

### 2. 模型 / 服务配置

根据你的使用范围，通常需要配置以下几类能力：

- **文本模型**
  - 例如 DeepSeek / MiniMax / Qwen / GLM / Gemini
- **搜索能力**
  - 用于调研素材、外部资料获取
- **图片能力**（可选）
  - 如果你要用 `article-illustrator`
- **浏览器能力**（可选）
  - 如果你要使用 `公众号文章获取`

### 3. 配置文件

当前仓库包含：
- `config.json`
- `config.json.template`

你可以按模板补你自己的配置。

> 注意：实际所需配置取决于你打算使用哪些能力。
> 如果你只先跑文本工作流，最优先配置的是文本模型与 OpenClaw 运行环境。

---

## 最关键的命令

### Stage 12：显式导出 clean 版本

推荐命令：

```bash
python scripts/openclaw_stage12_runner.py --project [项目名]
```

如果你已经知道定稿文件路径，也可以直接执行：

```bash
python scripts/generate_clean.py articles/[项目名]/[定稿文件].md
```

这是当前 OpenClaw 场景下最关键的一条显式执行链路。

---

## 推荐阅读

### 中文
- 详细功能与使用方法：[`README_ZH.md`](./README_ZH.md)
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

这个版本不是简单照搬 Claude Code 用法，而是：

**在保留上游工作流协议的前提下，把它整理成适合 OpenClaw 编排执行、文档清晰、可维护的版本。**

---

## 致谢

- Upstream: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- Fork: [one-box-u/writing-agent](https://github.com/one-box-u/writing-agent)
