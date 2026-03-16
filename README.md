# Writing Agent - OpenClaw 适配版

> 基于 OpenClaw 的智能写作系统分支，已同步上游 `writing-agent v0.7.0` 核心能力，并补齐 OpenClaw 可运行适配。

英文说明请看：[`README_EN.md`](./README_EN.md)

---

## 当前功能形态

当前 `openclaw` 分支已经包含以下能力：

- **16 个阶段代理（agents）**
  - 包括 `memory-loader`、`edit-diff-learner`、`humanizer`、`article-illustrator` 等
- **3 个核心 skills**
  - `工作流导演`
  - `风格建模`
  - `公众号文章获取`
- **记忆闭环**
  - 启动前生成 `00_memory_packet.md`
  - 完成后产出 `99_episode.md`
- **Stage 12 纯净版导出**
  - 支持 Claude Code Hook
  - 也支持 OpenClaw 显式执行 `scripts/openclaw_stage12_runner.py`
- **OpenClaw 兼容修复**
  - 修复部分路径硬编码问题
  - 新增 OpenClaw 执行映射与适配说明

---

## 推荐阅读

### 中文
- 详细功能与使用方法：[`README_ZH.md`](./README_ZH.md)
- OpenClaw 使用说明：[`README_OPENCLAW.md`](./README_OPENCLAW.md)
- 执行映射：[`OPENCLAW_EXECUTION_MAP.md`](./OPENCLAW_EXECUTION_MAP.md)
- 适配设计：[`OPENCLAW_ADAPTATION_PLAN.md`](./OPENCLAW_ADAPTATION_PLAN.md)

### English
- Detailed guide: [`README_EN.md`](./README_EN.md)

---

## OpenClaw 下的关键用法

### Stage 12：显式导出 clean 版本

推荐命令：

```bash
python scripts/openclaw_stage12_runner.py --project [项目名]
```

如果你已知定稿文件路径，也可以直接执行：

```bash
python scripts/generate_clean.py articles/[项目名]/[定稿文件].md
```

---

## 仓库定位

这个分支不是简单照搬 Claude Code 用法，而是：

**在保留上游工作流协议的前提下，把它整理成适合 OpenClaw 编排执行的版本。**

---

## 致谢

- Upstream: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- Fork: [one-box-u/writing-agent](https://github.com/one-box-u/writing-agent)
