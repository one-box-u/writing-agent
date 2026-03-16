# Writing Agent - OpenClaw Adaptation

> 🚀 An intelligent writing system built on OpenClaw, focused on generating high-quality content with real human texture.

中文说明：[`README.md`](./README.md) / [`README_ZH.md`](./README_ZH.md)

---

## 🆕 Update Notes (2026-03-16)

This branch has been synced with the core capabilities of upstream `writing-agent v0.7.0`, while also being adapted into a runnable OpenClaw-oriented flow.

### What was upgraded

- **Synced upstream v0.7.0 core capabilities**
  - Added `memory-loader`
  - Added `edit-diff-learner`
  - Added the `00_memory_packet.md` / `99_episode.md` memory loop
  - Synced newer versions of `humanizer`, `writing-executor`, `outline-architect`, `title-designer`, and other major agents

- **Added explicit OpenClaw execution path**
  - Added `scripts/openclaw_stage12_runner.py`
  - OpenClaw no longer has to depend on Claude Code Hook behavior to generate `_clean.txt`
  - Stage 12 can now be executed explicitly for better orchestration and debugging

- **Fixed host-environment compatibility issues**
  - Removed author-machine absolute paths from the web article extraction skill
  - Replaced multiple `~/.claude/...` examples with project-relative paths
  - Preserved upstream protocol-layer structure while improving OpenClaw portability

- **Added OpenClaw-specific documentation**
  - `README_OPENCLAW.md`
  - `OPENCLAW_EXECUTION_MAP.md`
  - `OPENCLAW_ADAPTATION_PLAN.md`

---

## 🎯 Current Code Shape

### 1. Current agents included

This branch currently contains **16 agent files**:

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

### 2. Current skills included

This branch currently contains **3 core skills**:

- `workflow-producer`
- `style-modeler`
- `web-article-extractor`

### 3. Current scripts included

- `scripts/auto_clean_hook.py`
- `scripts/generate_clean.py`
- `scripts/generate_image.ts`
- `scripts/openclaw_stage12_runner.py`

---

## 🛠️ Writing Modes

The current branch supports three modes:

| Mode | Core Logic | Use Case |
|:-----|:-----------|:---------|
| **Lite Mode** | Clarify → Quick writing → Optional review | Short-form writing, essays, existing material |
| **Pro / Collaborative Mode** | Memory load → Research → Structure → Writing → Review → Reader test → Humanize → Optional illustration → Clean export → Retrospective | Long-form, deep analysis, full workflow |
| **Ideation Mode** | Topic generation → Topic validation → Enter collaborative mode | No topic yet, needs direction first |

---

## 📐 Current Workflow Stages (Code-Aligned)

The collaborative path in the current `workflow-producer` can be understood as:

- Stage 0: `memory-loader`
- Stage 1: `writing-clarifier`
- Stage 2: `research-expert`
- Stage 3: `outline-architect`
- Stage 4: `empathy-designer`
- Stage 5: `concretizer`
- Stage 5.5: `title-designer`
- Stage 6: `writing-executor`
- Stage 7: `editor-review`
- Stage 8: `pre-publish-review`
- Stage 9: `toutiao-reader-test`
- Stage 10: `humanizer` (mandatory)
- Stage 11: `article-illustrator` (optional)
- Stage 12: generate `_clean.txt`
- Stage 13: `edit-diff-learner`

> Note: older docs may still say “12 stages”, but the current code shape already includes the extended Stage 0 and Stage 13 flow.

---

## 🚀 Current Usage (OpenClaw)

### Option 1: Use it as an OpenClaw writing workflow repository

Recommended mental model:

1. **The main agent orchestrates**
   - receives the user request
   - asks the user to choose a mode first
   - advances the workflow stage by stage

2. **Stage agents generate artifacts**
   - each stage reads existing files from `articles/[project-name]/`
   - produces the next-stage output
   - persists results back to disk

3. **Stage 12 runs explicitly in OpenClaw**

Recommended command:

```bash
python scripts/openclaw_stage12_runner.py --project [project-name]
```

If you already know the final markdown path, you can also run:

```bash
python scripts/generate_clean.py articles/[project-name]/[final-file].md
```

### Option 2: Read OpenClaw-specific docs first

For deeper integration or further adaptation, start with:

- `README_OPENCLAW.md`
- `OPENCLAW_EXECUTION_MAP.md`
- `OPENCLAW_ADAPTATION_PLAN.md`

---

## 📂 Artifact Structure

The current workflow artifact convention is:

```text
articles/
└── [project-name]/
    ├── 00_memory_packet.md       # auto-generated writing preference packet
    ├── 01_theme.md               # theme definition
    ├── 02_cases.md               # research materials
    ├── 03_outline.md             # outline
    ├── 04_empathy_map.md         # empathy map
    ├── 05_concrete_library.md    # concrete detail library
    ├── titles.md                 # candidate titles
    ├── draft_v1.md               # first draft
    ├── draft_v2.md ...           # later revisions
    ├── review_*.md               # review artifacts
    ├── reader_test.md            # reader simulation
    ├── *_humanized.md / final.md # humanized / final version
    ├── [name]_clean.txt          # clean export
    └── 99_episode.md             # retrospective learning artifact
```

---

## 🔒 Core Rules

1. **Mode selection comes first**
2. **The workflow is file-driven**
3. **Key nodes require confirmation**
4. **Stage 10 humanization is mandatory**
5. **Stage 12 must produce a clean version**
6. **Stage 13 performs retrospective learning when meaningful diffs exist**

---

## 📜 License

MIT License - See [LICENSE](./LICENSE)

## 🙏 Credits

- Upstream project: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- Inspiration: Wikipedia AI Cleanup Project
