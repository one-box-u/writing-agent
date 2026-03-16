# Writing Agent - OpenClaw Adaptation

> 🚀 An intelligent writing system built on the OpenClaw framework, dedicated to generating high-quality content with "human warmth."

## 🎯 Core Capability Matrix

| Capability | Description | Implementation |
|:-----------|:------------|:---------------|
| **Humanizer** | Identifies and fixes 24 AI writing patterns, injects "human soul" | Vocabulary cleansing + Syntactic breaking + Opinion injection + Sensory enhancement |
| **Image Generator** | Auto-analyzes article sentiment, generates matching covers/illustrations | Sentiment analysis → Style design → AI generation → Auto-embedding |
| **Reader Simulator** | Simulates real reader "psychological comments" & social media previews | Psychological curve modeling + Comment generation + Spread prediction |
| **Collaborative Workflow** | 12-stage deep creation ensuring content quality | Sub-agent matrix + Stage gates + Artifact persistence |

---

## 🛠️ Writing Mode System

This system provides three differentiated writing modes to balance efficiency and depth:

| Mode | Core Logic | Use Case | Interaction Depth |
|:-----|:-----------|:---------|:-----------------|
| **Lite Mode** | Clarify → Execute → Output | Short posts, essays, social media | 4-stage quick flow |
| **Pro Mode** | Research + Structure + Emotion + Review | In-depth analysis, tech columns, long-form | 12-stage闭环 |
| **Ideation Mode** | Hot topics → Topic planning → Convert to Pro | No inspiration, SEO-focused content | 5-stage guide |

---

## 📐 System Architecture & Workflow

### Professional Collaborative Mode (12-Stage Full Lifecycle)

```
Requirement Clarification → Material Research → Outline Architecture → Empathy Design → Concretization
     ↓
Title Design → Draft Execution → Editor Review → Pre-Publish Review → Reader Simulation
     ↓
Humanizer → Illustration → Clean Output
```

---

## 🤖 Sub-Agent Matrix

| Component | Core Responsibility | Key Artifacts |
|:----------|:-------------------|:--------------|
| `writing-clarifier` | Excavate writing intent, define audience & style | `01_theme.md` |
| `topic-generator` | Generate topic candidates based on trends & strengths | `topics.md` |
| `topic-research` | Validate topic feasibility (data/competitors/interest) | `topic_report.md` |
| `research-expert` | Real-time retrieval of industry data & cases | `02_cases.md` |
| `outline-architect` | Build pyramid structure, plan logic flow | `03_outline.md` |
| `empathy-designer` | Map reader psychology, locate emotional resonance | `04_empathy_map.md` |
| `concretizer` | Inject specific cases, real stories, details | `05_concrete_library.md` |
| `title-designer` | Generate high-CTR titles via 15 viral formulas | `titles.md` |
| `writing-executor` | Execute draft writing | `draft_*.md` |
| `editor-review` | Editor-level deep review, 12 AI-flavor checks | `review_report.md` |
| `pre-publish-review` | Pre-publish compliance & quality review | `publish_review.md` |
| `toutiao-reader-test` | Reader simulation, comments & spread prediction | `reader_test.md` |
| `humanizer` | Execute non-linear rewriting, eliminate AI smoothness | `final.md` |
| `article-illustrator` | Visual style design + image generation | `images/` |

---

## 🔬 Humanizer Core Algorithm

The system forces breaks from LLM's predictive probability model through:

1. **Vocabulary Layer**: Remove AI高频填充词 like "in conclusion", "key point is", replace with action-oriented concrete words.
2. **Syntax Layer**: Introduce sentence length variation (Burstiness) to break LLM's uniform sentence tendency.
3. **Opinion Layer**: Require agents to propose controversial or unique perspectives based on materials.
4. **Perception Layer**: Force inject five-sense descriptions (auditory, visual, tactile) to give text "on-site feeling."

---

## ⚙️ Configuration & Quick Start

### Environment Dependencies

- OpenClaw Framework
- Python 3.10+
- API Keys: MiniMax / DeepSeek / Zhipu GLM (optional)

### Configuration (config.json)

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

### Supported Models

| Model | Provider ID | Recommended | Use Case |
|:------|:-----------|:------------|:---------|
| MiniMax M2.1/M2.5 | `minimax` | ⭐⭐⭐ | Best cost-performance |
| DeepSeek | `deepseek` | ⭐⭐⭐ | Open source friendly |
| Alibaba Qwen | `qwen` | ⭐⭐ | Stable |
| Zhipu GLM | `glm` | ⭐⭐ | Chinese optimized |
| Google Gemini | `gemini` | ⭐⭐ | Multimodal |

---

## 🚀 Current Usage (OpenClaw)

### Option 1: Use it as an OpenClaw writing workflow repository

This is the recommended model for your current setup: treat this project as a writing workflow system running under OpenClaw, rather than depending on Claude Code runtime behavior.

Recommended mental model:

1. **The main agent orchestrates**
   - receives the user request
   - asks the user to choose a mode first
   - advances the workflow stage by stage

2. **Stage agents generate artifacts**
   - each stage reads existing files from `articles/[project-name]/`
   - produces the next stage output
   - persists results back to disk

3. **Stage 12 runs explicitly in OpenClaw**
   - recommended explicit command:

```bash
python scripts/openclaw_stage12_runner.py --project [project-name]
```

If you already know the final markdown file path, you can also run:

```bash
python scripts/generate_clean.py articles/[project-name]/[final-file].md
```

### Option 2: Read the OpenClaw-specific docs first

For deeper integration or further adaptation, start with:

- `README_OPENCLAW.md`
- `OPENCLAW_EXECUTION_MAP.md`
- `OPENCLAW_ADAPTATION_PLAN.md`

## 📖 Usage Examples

### Lite Mode

```
User: Write a lightweight article about side income

Agent:
🎬 Please select writing mode:
[A] Lite Mode - Quick output (short posts/essays)
[B] Pro Mode - Deep writing (recommended)
[C] Ideation Mode - Start from topic

User: A

→ Enter 4-stage quick flow
```

### Pro Mode

```
User: Write an article about 35-year-old career crisis

Agent:
🎬 Please select writing mode... (User selects B)

→ Enter 12-stage closed loop:
  Stage 1: Requirement → 01_theme.md
  Stage 2: Research → 02_cases.md
  ...
  Stage 12: Clean output → [filename]_clean.txt
```

---

## 📂 Output Structure

```
articles/
└── [project-name]/
    ├── 01_theme.md              # Theme definition
    ├── 02_cases.md             # Research materials
    ├── 03_outline.md           # Article outline
    ├── 04_empathy_map.md       # Empathy map
    ├── 05_concrete_library.md   # Concrete library
    ├── titles.md               # Candidate titles
    ├── draft_v1.md            # First draft
    ├── draft_v2.md            # Revised draft
    ├── review_*.md             # Review records
    ├── reader_test.md          # Reader simulation
    ├── final.md                # Final draft
    └── [name]_clean.txt       # Clean version
```

---

## 🔒 Core Rules

1. **Mode First**: Any writing request must guide user to select mode first
2. **Sub-Agent Driven**: Use sub-agent matrix for context isolation & specialization
3. **Artifact Persistence**: Each stage output auto-persisted as Markdown
4. **Progress Visualization**: Real-time display of current stage & completion
5. **Key Gatekeepers**: Outline, title and other key nodes require user confirmation
6. **No Early Exit**: Collaborative mode must complete all 12 stages
7. **Clean Output**: Generate plain text without Markdown syntax

---

## 📜 License

MIT License - See [LICENSE](./LICENSE)

## 🙏 Acknowledgments

- Original Project: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- Inspiration: Wikipedia AI Cleanup Project
er confirmation
6. **No Early Exit**: Collaborative mode must complete all 12 stages
7. **Clean Output**: Generate plain text without Markdown syntax

---

## 📜 License

MIT License - See [LICENSE](./LICENSE)

## 🙏 Acknowledgments

- Original Project: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- Inspiration: Wikipedia AI Cleanup Project
