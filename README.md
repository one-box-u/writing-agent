# 写作 Agent - OpenClaw 适配版

> 🚀 一个基于 OpenClaw 的"反AI味"写作系统，让AI写出的文章像人写的一样自然。

## ⭐ 核心特点

- 🤖 **Humanizer**: 识别并修复24种AI写作痕迹，注入人类"灵魂"
- 🎨 **配图生成**: 支持多种图片生成服务，自动设计视觉风格
- 📺 **读者模拟**: 模拟真实用户的心理弹幕与朋友圈转发
- ✍️ **完整工作流**: 14阶段深度创作模式

---

## 三种写作模式

| 模式 | 命令示例 | 适用场景 | 流程长度 |
|------|----------|----------|----------|
| **轻量模式** | 帮我用轻量模式写一篇xxx | 短文（≤1000字）、随笔、已有素材 | 3-4步 |
| **协作模式** | 帮我写一篇xxx（默认） | 长文（>1500字）、深度分析、数据支撑 | 12步 |
| **从选题开始** | 帮我写一篇但我不知道写什么 | 无灵感，需要AI生成选题 | 5步→协作模式 |

---

## 模式A：轻量模式（快速产出）

### 适用场景
- 短文（≤1000字）
- 随笔、感悟类
- 已有完整素材，只需整理

### 完整流程

```
Step 1: 需求澄清
  ↓
  使用 writing-clarifier 子代理
  ↓
  产出：01_theme.md（主题定义、目标读者、核心观点）
  ↓
Step 2: 用户确认
  ↓
  向用户展示澄清结果
  ↓
  等待用户确认后继续
  ↓
Step 3: 写作执行
  ↓
  使用 writing-executor 子代理
  ↓
  产出：draft.md（初稿）
  ↓
Step 4: 简单审稿（可选）
  ↓
  使用 editor-review 快速审稿
  ↓
  产出：审稿意见
  ↓
Step 5: 终态处理
  ↓
  生成纯净版 txt
  ↓
  询问是否需要配图
```

---

## 模式B：协作模式 ⭐（深度创作）

### 适用场景
- 长文（>1500字）
- 深度分析文章
- 需要数据/案例支撑的专业内容

### 完整流程（12阶段）

```
┌────────────────────────────────────────────────────────────────┐
│                      协作模式 - 12阶段流程                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Stage 1: 需求澄清                                            │
│    子代理: writing-clarifier                                   │
│    产物: 01_theme.md                                          │
│    内容: 主题定义、目标读者、核心观点、风格定位                  │
│    ↓                                                           │
│  Stage 2: 素材调研                                            │
│    子代理: research-expert                                     │
│    产物: 02_cases.md                                          │
│    内容: 行业数据、案例分析、竞品内容                           │
│    ↓                                                           │
│  Stage 3: 大纲设计                                            │
│    子代理: outline-architect                                   │
│    产物: 03_outline.md                                       │
│    内容: 文章结构、章节规划、段落分配                           │
│    ↓                                                           │
│  Stage 4: 共情点设计                                          │
│    子代理: empathy-designer                                    │
│    产物: 04_empathy_map.md                                   │
│    内容: 读者痛点、情感共鸣点、心理预期                         │
│    ↓                                                           │
│  Stage 5: 具象化设计                                           │
│    子代理: concretizer                                         │
│    产物: 05_concrete_library.md                               │
│    内容: 具体案例、真实故事、细节描写                           │
│    ↓                                                           │
│  Stage 5.5: 标题设计                                          │
│    子代理: title-designer                                     │
│    产物: 候选标题x5 + 钩子说明                                │
│    内容: 15种爆款公式、标题优化                                │
│    ↓                                                           │
│  Stage 6: 写作执行                                            │
│    子代理: writing-executor                                    │
│    产物: draft_v1.md                                         │
│    内容: 完整初稿                                              │
│    ↓                                                           │
│  Stage 7: 主编审稿                                            │
│    子代理: editor-review                                       │
│    产物: 审稿报告 + 修改                                      │
│    内容: 12项AI味道检测、结构优化、逻辑检查                    │
│    ↓                                                           │
│  Stage 8: 发布前评审                                           │
│    子代理: pre-publish-review                                  │
│    产物: 评审报告 + 修改建议                                  │
│    内容: 发布前5问、红队7项检查                                │
│    ↓                                                           │
│  Stage 9: 读者模拟                                            │
│    子代理: toutiao-reader-test                                │
│    产物: 读者反馈 + 传播预测                                   │
│    内容: 心理弹幕、朋友圈预览、槽点预测                         │
│    ↓                                                           │
│  Stage 10: Humanizer去AI味 ⭐                                  │
│    子代理: humanizer                                           │
│    产物: 去AI味终稿                                           │
│    内容: 删除空洞形容词、打破公式化结构、注入真人语气           │
│    ↓                                                           │
│  Stage 11: 配图工坊                                           │
│    子代理: article-illustrator (可选)                          │
│    产物: 配图 + 插入文章                                      │
│    内容: 视觉风格设计、封面/插图生成                           │
│    ↓                                                           │
│  Stage 12: 终态收尾                                           │
│    产物: [文件名]_clean.txt                                   │
│    内容: 去除Markdown语法、无空行排版、纯净文本                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 协作模式产出示例

```
articles/
└── 35岁职业危机/
    ├── 01_theme.md           # 主题定义
    ├── 02_cases.md           # 素材调研
    ├── 03_outline.md         # 文章大纲
    ├── 04_empathy_map.md     # 共情点
    ├── 05_concrete_library.md # 具象化案例
    ├── titles.md              # 候选标题
    ├── draft_v1.md           # 初稿
    ├── draft_v2.md           # 修订稿
    ├── review_*.md            # 审稿记录
    ├── reader_test.md         # 读者模拟
    ├── final.md               # 最终稿
    └── 35岁职业危机_clean.txt # 纯净版
```

---

## 模式C：从选题开始

### 适用场景
- 不知道写什么
- 有写作需求但缺乏灵感
- 需要借助热点生成选题

### 完整流程

```
Step 1: 询问领域
  ↓
  了解用户想写什么方向
  ↓
  例如：科技、职场、情感、育儿、投资...
  ↓
Step 2: 选题生成
  ↓
  使用 topic-generator 子代理
  ↓
  基于三个维度分析：
  - 当前热点话题
  - 个人独特优势
  - 竞品差异定位
  ↓
  产出：5-10个候选选题
  ↓
Step 3: 用户选择
  ↓
  展示候选选题列表
  ↓
  让用户选择或修改
  ↓
Step 4: 选题调研
  ↓
  使用 topic-research 子代理
  ↓
  验证选题可行性：
  - 数据支撑度
  - 竞品覆盖情况
  - 读者兴趣度
  ↓
  产出：选题验证报告
  ↓
Step 5: 进入协作模式
  ↓
  选题确认后
  ↓
  自动进入协作模式 Stage 1
  ↓
  继续完整写作流程
```

---

## 子代理说明

| 子代理 | 职责 | 产出文件 |
|--------|------|----------|
| `writing-clarifier` | 澄清写作需求 | 01_theme.md |
| `topic-generator` | 生成候选选题 | topics.md |
| `topic-research` | 调研选题可行性 | topic_report.md |
| `research-expert` | 搜集素材/数据 | 02_cases.md |
| `outline-architect` | 设计文章大纲 | 03_outline.md |
| `empathy-designer` | 设计读者共鸣点 | 04_empathy_map.md |
| `concretizer` | 具象化案例细节 | 05_concrete_library.md |
| `title-designer` | 设计爆款标题 | titles.md |
| `writing-executor` | 执行写作 | draft_*.md |
| `editor-review` | 主编审稿 | review_*.md |
| `pre-publish-review` | 发布前评审 | publish_review.md |
| `toutiao-reader-test` | 读者模拟测试 | reader_test.md |
| `humanizer` | 去AI味 | final.md |
| `article-illustrator` | 文章配图 | images/ |

---

## 配置说明

### config.json

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
    "provider": "tavily"
  }
}
```

### 环境变量

| 变量 | 说明 | 必需 |
|------|------|------|
| `MODEL_API_KEY` | 大模型API密钥 | 是 |
| `IMAGE_API_KEY` | 图片生成API密钥 | 否 |
| `SEARCH_API_KEY` | 搜索API密钥 | 否 |

### 支持的模型

| 模型 | provider值 | 推荐度 | 特点 |
|------|-----------|--------|------|
| MiniMax | `minimax` | ⭐⭐⭐ | 性价比高 |
| DeepSeek | `deepseek` | ⭐⭐⭐ | 开源友好 |
| 阿里Qwen | `qwen` | ⭐⭐ | 稳定 |
| 智谱GLM | `glm` | ⭐⭐ | 中文优化 |
| Google Gemini | `gemini` | ⭐⭐ | 多模态 |

---

## 使用示例

### 示例1：轻量模式
```
用户：帮我用轻量模式写一篇关于副业变现的文章

Agent：
🎬 请选择写作模式：
【A. 轻量模式】...
【B. 协作模式】...
【C. 从选题开始】...

用户：A

Agent：
好的，进入轻量模式。请描述您的写作需求：
- 主题是什么？
- 目标读者是谁？
- 需要传达什么核心观点？
```

### 示例2：协作模式
```
用户：帮我写一篇关于35岁职业危机的文章

Agent：
🎬 请选择写作模式：...

用户：B

Agent：
好的，进入协作模式（推荐！深度创作，更高质量）

请描述您的写作需求：
- 主题是什么？（35岁职业危机）
- 目标读者是谁？（30-40岁职场人）
- 核心观点？（中年危机不是必然...）
- 风格偏好？（理性分析/情感共鸣/案例故事？）

📋 进度：[1/12] Stage 1: 需求澄清
```

### 示例3：从选题开始
```
用户：我想写文章但不知道写什么

Agent：
🎬 请选择写作模式：...

用户：C

Agent：
好的，您想写什么领域的文章？

比如：
- 科技数码
- 职场成长
- 情感生活
- 育儿教育
- 投资理财
- 或者其他方向？

请告诉我您的领域 + 读者群体
```

---

## Humanizer 去AI味

这是本系统的核心功能，专门解决"AI写得太平淡"的问题：

### 检测24种AI痕迹

**内容层面**：
- 空洞的形容词（"非常重要"）
- 正确的废话（"我们需要平衡..."）
- 缺乏具体案例

**语言层面**：
- 过度使用连接词
- 句子长度过于均匀
- 缺乏口语化表达

**风格层面**：
- 过度格式化
- 缺乏个人观点
- 中立到冷漠

### 去AI味方法

1. **删除空洞词**：移除"至关重要"、"显而易见"等
2. **打破公式化**：调整句子长度，增加变化
3. **注入观点**：加入个人立场和态度
4. **具象化**：用具体故事替代抽象论述
5. **口语化**：增加口语表达和语气词

---

## 配图功能

### Article Illustrator

自动为文章设计视觉风格并生成配图：

1. **情感分析**：分析文章基调
2. **风格设计**：Flat/Lofi/Cyberpunk/极简等
3. **配图规划**：封面、插图、概念图
4. **自动生成**：调用图片生成API
5. **插入文章**：自动嵌入Markdown

---

## 目录结构

```
writing-agent/
├── agents/                       # 14个写作子代理
│   ├── writing-clarifier.md     # 需求澄清
│   ├── topic-generator.md        # 选题生成
│   ├── topic-research.md         # 选题调研
│   ├── research-expert.md        # 素材调研
│   ├── outline-architect.md      # 大纲设计
│   ├── empathy-designer.md       # 共情设计
│   ├── concretizer.md            # 具象化
│   ├── title-designer.md         # 标题设计
│   ├── writing-executor.md       # 写作执行
│   ├── editor-review.md          # 主编审稿
│   ├── pre-publish-review.md     # 发布前评审
│   ├── toutiao-reader-test.md    # 读者模拟
│   ├── humanizer.md              # 去AI味
│   └── article-illustrator.md    # 配图
│
├── workflow-director/             # 工作流导演
│   └── SKILL.md
│
├── styles/                       # 写作风格库
│   └── README.md
│
├── config.json                  # 配置文件
├── config.json.template         # 配置模板
└── SKILL.md                    # 本文件
```

---

## 核心规则

1. **第一步必须问模式**：禁止跳过模式选择
2. **禁止直接写作**：必须先澄清需求
3. **使用子代理执行**：通过子代理完成任务
4. **产物落盘**：每阶段产物保存到文件
5. **展示进度**：让用户知道当前阶段
6. **关键节点确认**：大纲、标题需用户确认
7. **严禁早退**：协作模式必须走完所有阶段
8. **生成纯净版**：最终生成无Markdown的txt

---

## 开源许可

MIT License - See [LICENSE](./LICENSE)

## 致谢

原项目: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
