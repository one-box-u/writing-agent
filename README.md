# Writing Agent - OpenClaw 适配版

> 🚀 基于 OpenClaw 框架的智能写作系统，专注于生成具有"人类温度"的高质量内容。

## 🎯 核心能力矩阵

| 能力模块 | 功能描述 | 技术实现 |
|:---------|:---------|:---------|
| **Humanizer 去 AI 味** | 识别并修复 24 种 AI 写作痕迹，注入"人类灵魂" | 词汇层清洗 + 句法层断裂 + 观点层注入 + 感知层强化 |
| **配图生成器** | 自动分析文章情感，生成匹配封面/插图 | 情感分析 → 风格设计 → AI 生成 → 自动嵌入 |
| **读者模拟器** | 模拟真实读者的"心理弹幕"与社交媒体预览 | 心理曲线建模 + 弹幕生成 + 传播预测 |
| **协作工作流** | 12 阶段深度创作，确保内容质量 | 子代理矩阵 + 阶段门禁 + 产物落盘 |

---

## 🛠️ 创作模式体系

本系统提供三种差异化的创作模式，以平衡效率与深度：

| 模式 | 核心逻辑 | 适用场景 | 交互深度 |
|:--- |:---------|:---------|:---------|
| **轻量模式 (Lite)** | 需求澄清 → 快速执行 → 终态输出 | 短文、随笔、社交媒体动态 | 4 阶段快连 |
| **专业协作模式 (Pro)** | 调研 + 架构 + 情感设计 + 迭代审稿 | 深度行业分析、技术专栏、长篇报道 | 12 阶段闭环 |
| **灵感激发模式 (Ideation)** | 热点扫描 → 选题策划 → 确认后转 Pro | 缺乏切入点的命题创作、SEO 关键词获客 | 5 阶段引导 |

---

## 📐 系统架构与流程

### 专业协作模式（12 阶段全生命周期）

```
需求澄清 → 素材调研 → 大纲架构 → 共情点设计 → 具象化填充 
     ↓
标题设计 → 初稿执行 → 主编审稿 → 发布前评审 → 读者模拟 
     ↓
Humanizer去AI → 配图工坊 → 纯净版输出
```

---

## 🤖 子代理矩阵 (Sub-Agent Matrix)

| 组件名称 | 核心职责 | 关键产出 (Artifacts) |
|:---------|:---------|:---------------------|
| `writing-clarifier` | 挖掘写作意图，定义目标受众与风格倾向 | `01_theme.md` |
| `topic-generator` | 基于热点与个人优势生成选题候选 | `topics.md` |
| `topic-research` | 验证选题可行性（数据/竞品/兴趣度） | `topic_report.md` |
| `research-expert` | 实时检索行业数据、真实案例与参考资料 | `02_cases.md` |
| `outline-architect` | 构建金字塔结构，规划逻辑链路与段落权重 | `03_outline.md` |
| `empathy-designer` | 绘制读者心理曲线，定位情感共鸣点 | `04_empathy_map.md` |
| `concretizer` | 注入具体案例、真实故事与细节描写 | `05_concrete_library.md` |
| `title-designer` | 基于 15 种爆款逻辑生成高点击率标题 | `titles.md` |
| `writing-executor` | 执行初稿写作 | `draft_*.md` |
| `editor-review` | 总编级深度审稿，12 项 AI 味道检测 | `review_report.md` |
| `pre-publish-review` | 发布前合规/质量评审 | `publish_review.md` |
| `toutiao-reader-test` | 读者仿真测试，心理弹幕与传播预测 | `reader_test.md` |
| `humanizer` | 执行非线性重写，消除语法过度平滑 | `final.md` |
| `article-illustrator` | 视觉风格设计 + 配图生成 | `images/` |

---

## 🔬 Humanizer 核心算法逻辑

系统通过以下维度强制打破 LLM 的预测概率模型：

1. **词汇层**：强制剔除"总之"、"关键在于"、"协同作用"等 AI 高频填充词，替换为更具动作感的具象词汇。
2. **句法层**：引入长短句交替（Burstiness），打破 LLM 倾向于生成长度均衡句子的惯性。
3. **观点层**：要求代理基于素材提出具有争议性或独特视角见解，而非中庸的总结。
4. **感知层**：强制注入五感描述（听觉、视觉、触觉等）使文字具备"现场感"。

---

## ⚙️ 配置与快速开始

### 环境依赖

- OpenClaw Framework
- Python 3.10+
- API Keys: MiniMax / DeepSeek / 智谱 GLM（可选）

### 配置文件 (config.json)

```json
{
  "model": {
    "provider": "minimax",
    "model_id": "MiniMax-M2.1",
    "api_key": "YOUR_API_KEY"
  },
  "image": {
    "provider": "nano-banana",
    "model": "nano-banana"
  },
  "search": {
    "provider": "tavily",
    "api_key": "YOUR_TAVILY_KEY"
  }
}
```

### 支持的模型

| 模型 | Provider ID | 推荐度 | 适用场景 |
|:-----|:-----------|:------|:---------|
| MiniMax M2.1/M2.5 | `minimax` | ⭐⭐⭐ | 性价比最优 |
| DeepSeek | `deepseek` | ⭐⭐⭐ | 开源友好 |
| 阿里 Qwen | `qwen` | ⭐⭐ | 稳定可靠 |
| 智谱 GLM | `glm` | ⭐⭐ | 中文优化 |
| Google Gemini | `gemini` | ⭐⭐ | 多模态 |

---

## 📖 使用示例

### 轻量模式

```
用户：帮我用轻量模式写一篇关于副业变现的文章

Agent：
🎬 请选择创作模式：
[A] 轻量模式 - 快速产出（短文/随笔）
[B] 专业协作模式 - 深度创作（推荐）
[C] 灵感激发模式 - 从选题开始

用户：A

→ 进入 4 阶段快连流程
```

### 专业协作模式

```
用户：帮我写一篇关于35岁职业危机的文章

Agent：
🎬 请选择创作模式...（用户选B）

→ 进入 12 阶段闭环流程
  Stage 1: 需求澄清 → 01_theme.md
  Stage 2: 素材调研 → 02_cases.md
  ...
  Stage 12: 纯净版输出 → [文件名]_clean.txt
```

---

## 📂 产物结构

```
articles/
└── [项目名称]/
    ├── 01_theme.md              # 主题定义
    ├── 02_cases.md             # 素材调研
    ├── 03_outline.md           # 文章大纲
    ├── 04_empathy_map.md       # 共情图谱
    ├── 05_concrete_library.md   # 具象化库
    ├── titles.md               # 候选标题
    ├── draft_v1.md            # 初稿
    ├── draft_v2.md            # 修订稿
    ├── review_*.md             # 审稿记录
    ├── reader_test.md          # 读者模拟
    ├── final.md                # 最终稿
    └── [项目名]_clean.txt     # 纯净版
```

---

## 🔒 核心规则

1. **模式选择前置**：任何写作请求必须先引导用户选择创作模式
2. **子代理驱动**：通过子代理矩阵实现上下文隔离与专业分工
3. **产物落盘**：每个阶段产物自动持久化为 Markdown 文件
4. **进度可视化**：实时展示当前阶段与完成度
5. **关键门禁**：大纲、标题等关键节点需用户确认
6. **严禁早退**：协作模式必须走完全部 12 阶段
7. **纯净输出**：最终生成无 Markdown 语法的纯文本版

---

## 📜 开源许可

MIT License - See [LICENSE](./LICENSE)

## 🙏 致谢

- 原项目：[dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- 灵感来源：Wikipedia AI Cleanup Project
