# Writing Agent - OpenClaw Adaptation

> 🚀 An "anti-AI flavor" writing system for OpenClaw, making AI-generated content read naturally like human writing.

## ⭐ Core Features

- 🤖 **Humanizer**: Identifies and fixes 24 types of AI writing patterns, injects human "soul"
- 🎨 **Image Generation**: Supports multiple image generation services, auto design visual style
- 📺 **Reader Simulation**: Simulates real reader psychological comments and social media previews
- ✍️ **Complete Workflow**: 14-stage deep writing mode

---

## Three Writing Modes

| Mode | Command Example | Use Case | Steps |
|------|-----------------|----------|-------|
| **Lightweight** | Write a lightweight article about xxx | Short posts (≤1000 words), essays | 3-4 steps |
| **Collaborative** | Write an article about xxx (default) | Long articles (>1500 words), deep analysis | 12 steps |
| **From Topic** | I want to write but don't know what | No inspiration, need topic ideas | 5 steps → Collaborative |

---

## Mode A: Lightweight (Quick Output)

### Use Case
- Short articles (≤1000 words)
- Essays, reflections
- Complete materials already available

### Complete Workflow

```
Step 1: Requirement Clarification
  ↓
  Use writing-clarifier subagent
  ↓
  Output: 01_theme.md (theme, target readers, core观点)
  ↓
Step 2: User Confirmation
  ↓
  Show clarification results
  ↓
  Wait for user confirmation
  ↓
Step 3: Writing Execution
  ↓
  Use writing-executor subagent
  ↓
  Output: draft.md
  ↓
Step 4: Simple Review (Optional)
  ↓
  Use editor-review for quick review
  ↓
  Output: review comments
  ↓
Step 5: Final Processing
  ↓
  Generate clean txt
  ↓
  Ask if images needed
```

---

## Mode B: Collaborative ⭐ (Deep Writing)

### Use Case
- Long articles (>1500 words)
- Deep analysis
- Content requiring data/case support

### Complete Workflow (12 Stages)

```
┌────────────────────────────────────────────────────────────────┐
│                Collaborative Mode - 12 Stages                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Stage 1: Requirement Clarification                            │
│    Subagent: writing-clarifier                                 │
│    Output: 01_theme.md                                        │
│    Content: Theme, target readers, core viewpoint             │
│    ↓                                                           │
│  Stage 2: Research                                            │
│    Subagent: research-expert                                 │
│    Output: 02_cases.md                                       │
│    Content: Industry data, case analysis                      │
│    ↓                                                           │
│  Stage 3: Outline Design                                       │
│    Subagent: outline-architect                               │
│    Output: 03_outline.md                                     │
│    Content: Article structure, chapter planning                │
│    ↓                                                           │
│  Stage 4: Empathy Design                                       │
│    Subagent: empathy-designer                                 │
│    Output: 04_empathy_map.md                                 │
│    Content: Reader pain points, emotional resonance           │
│    ↓                                                           │
│  Stage 5: Concretization                                      │
│    Subagent: concretizer                                       │
│    Output: 05_concrete_library.md                            │
│    Content: Specific cases, real stories, details             │
│    ↓                                                           │
│  Stage 5.5: Title Design                                      │
│    Subagent: title-designer                                   │
│    Output: 5 candidate titles + hook explanations             │
│    Content: 15 viral title formulas                           │
│    ↓                                                           │
│  Stage 6: Writing Execution                                   │
│    Subagent: writing-executor                                 │
│    Output: draft_v1.md                                       │
│    Content: Complete first draft                               │
│    ↓                                                           │
│  Stage 7: Editor Review                                       │
│    Subagent: editor-review (multiple rounds)                 │
│    Output: Review report + revisions                          │
│    Content: 12 AI flavor checks, structure optimization      │
│    ↓                                                           │
│  Stage 8: Pre-Publish Review                                  │
│    Subagent: pre-publish-review                              │
│    Output: Review report + suggestions                        │
│    Content: 5 pre-publish questions, red team checks         │
│    ↓                                                           │
│  Stage 9: Reader Simulation                                   │
│    Subagent: toutiao-reader-test                            │
│    Output: Reader feedback + spread prediction                │
│    Content: Psychological comments, social media preview       │
│    ↓                                                           │
│  Stage 10: Humanizer ⭐                                       │
│    Subagent: humanizer                                        │
│    Output: Final draft after de-AI                            │
│    Content: Remove empty adjectives, break formulaic structure │
│    ↓                                                           │
│  Stage 11: Article Illustration                               │
│    Subagent: article-illustrator (optional)                  │
│    Output: Images + inserted into article                   │
│    Content: Visual style design, cover/illustration           │
│    ↓                                                           │
│  Stage 12: Final Cleanup                                      │
│    Output: [filename]_clean.txt                             │
│    Content: Remove Markdown, no blank lines, clean text      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Mode C: From Topic

### Use Case
- Don't know what to write
- Have writing demand but no inspiration
- Need to leverage hot topics for topic ideas

### Complete Workflow

```
Step 1: Ask for Domain
  ↓
  Understand what field user wants to write about
  ↓
  Example: Tech, Career, Emotion, Parenting, Investment...
  ↓
Step 2: Topic Generation
  ↓
  Use topic-generator subagent
  ↓
  Based on three dimensions:
  - Current hot topics
  - Personal unique advantages
  - Competitor differentiation
  ↓
  Output: 5-10 candidate topics
  ↓
Step 3: User Selection
  ↓
  Display candidate topics
  ↓
  Let user select or modify
  ↓
Step 4: Topic Research
  ↓
  Use topic-research subagent
  ↓
  Validate topic feasibility:
  - Data support
  - Competitor coverage
  - Reader interest
  ↓
  Output: Topic validation report
  ↓
Step 5: Enter Collaborative Mode
  ↓
  After topic confirmed
  ↓
  Auto-enter Collaborative Mode Stage 1
  ↓
  Continue complete writing workflow
```

---

## Subagents Reference

| Subagent | Function | Output File |
|----------|----------|------------|
| `writing-clarifier` | Clarify requirements | 01_theme.md |
| `topic-generator` | Generate topics | topics.md |
| `topic-research` | Research topic | topic_report.md |
| `research-expert` | Gather materials | 02_cases.md |
| `outline-architect` | Design outline | 03_outline.md |
| `empathy-designer` | Design empathy | 04_empathy_map.md |
| `concretizer` | Concretize details | 05_concrete_library.md |
| `title-designer` | Design titles | titles.md |
| `writing-executor` | Execute writing | draft_*.md |
| `editor-review` | Editor review | review_*.md |
| `pre-publish-review` | Pre-publish review | publish_review.md |
| `toutiao-reader-test` | Reader simulation | reader_test.md |
| `humanizer` | De-AI flavor | final.md |
| `article-illustrator` | Article images | images/ |

---

## Configuration

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

### Supported Models

| Model | provider | Recommended | Features |
|-------|----------|-------------|----------|
| MiniMax | `minimax` | ⭐⭐⭐ | Cost-effective |
| DeepSeek | `deepseek` | ⭐⭐⭐ | Open source friendly |
| Alibaba Qwen | `qwen` | ⭐⭐ | Stable |
| Zhipu GLM | `glm` | ⭐⭐ | Chinese optimized |
| Google Gemini | `gemini` | ⭐⭐ | Multimodal |

---

## Usage Examples

### Example 1: Lightweight Mode
```
User: Write a lightweight article about side income

Agent:
🎬 Please select writing mode:
[A. Lightweight]...
[B. Collaborative]...
[C. From Topic]...

User: A

Agent:
OK, entering lightweight mode. Please describe your writing needs:
- What's the topic?
- Who is the target reader?
- What core message?
```

### Example 2: Collaborative Mode
```
User: Write an article about 35-year-old career crisis

Agent:
🎬 Please select writing mode:...

User: B

Agent:
OK, entering Collaborative Mode (recommended!)

Please describe your writing needs:
- What's the topic? (35-year-old career crisis)
- Who is the target reader? (30-40 year old professionals)
- Core viewpoint? (Mid-life crisis is not inevitable...)
- Style preference? (Analysis/Emotional/Case stories?)

📋 Progress: [1/12] Stage 1: Requirement Clarification
```

---

## Humanizer (De-AI Flavor)

This is the core feature - solves "AI writing too flat" problem:

### Detects 24 AI Patterns

**Content Level**:
- Empty adjectives ("very important")
- Generic statements ("we need to balance...")
- Lack of specific examples

**Language Level**:
- Overuse of connectors
- Uniform sentence length
- Lack of colloquial expressions

**Style Level**:
- Over-formatting
- Lack of personal opinion
- Too neutral

### De-AI Methods

1. Remove empty words
2. Break formulaic structures
3. Inject personal opinions
4. Use concrete stories
5. Add colloquial expressions

---

## Directory Structure

```
writing-agent/
├── agents/                       # 14 writing subagents
│   ├── writing-clarifier.md
│   ├── topic-generator.md
│   ├── topic-research.md
│   ├── research-expert.md
│   ├── outline-architect.md
│   ├── empathy-designer.md
│   ├── concretizer.md
│   ├── title-designer.md
│   ├── writing-executor.md
│   ├── editor-review.md
│   ├── pre-publish-review.md
│   ├── toutiao-reader-test.md
│   ├── humanizer.md
│   └── article-illustrator.md
│
├── workflow-director/
│   └── SKILL.md
│
├── styles/
│   └── README.md
│
├── config.json
├── config.json.template
└── SKILL.md
```

---

## Core Rules

1. **Must ask for mode first**: Never skip mode selection
2. **Never write directly**: Must clarify requirements first
3. **Use subagents**: Execute tasks through subagents
4. **Save outputs**: Each stage saves to file
5. **Show progress**: Let user know current stage
6. **Key confirmations**: Outline, titles need user confirmation
7. **Never quit early**: Must complete all stages in collaborative mode
8. **Generate clean version**: Final output as plain txt

---

## License

MIT License - See [LICENSE](./LICENSE)

## Acknowledgments

Original project: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
