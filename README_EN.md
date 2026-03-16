# Writing Agent - OpenClaw Adaptation

> A multi-stage writing system adapted for OpenClaw. This is not just a one-shot article generator — it is a full workflow that connects **topic ideation, research, outlining, drafting, review, reader simulation, humanization, clean export, and retrospective memory**.

**中文说明 / Chinese docs:** [`README.md`](./README.md) / [`README_ZH.md`](./README_ZH.md)

---

## What This Is

This repository is an OpenClaw-oriented version of `writing-agent`, synced with upstream `v0.7.0` core capabilities and extended with the key runtime pieces needed for actual OpenClaw usage.

It is suitable not only for “writing one article,” but for:

- newsletter / public-account style writing
- long-form analysis
- opinionated writing
- emotionally resonant writing
- full writing pipelines from topic to final draft
- file-persisted stage outputs for revision, checkpointing, and retrospective learning

In one sentence:

**this is a file-driven, multi-agent, stage-by-stage writing workflow with memory and retrospective learning.**

---

## What It Can Do

The current `main` branch includes the following capabilities:

### 1. Multi-stage writing workflow
Instead of generating everything in one shot, it works stage by stage:

- requirement clarification
- research
- outline design
- empathy design
- concretization / detail enrichment
- title design
- drafting
- editor review
- pre-publish review
- reader simulation
- Humanizer anti-AI-flavor rewriting
- optional illustration
- clean export
- retrospective learning

### 2. Memory loop
The current version includes:

- `memory-loader`
  - generates `00_memory_packet.md` before writing begins
- `edit-diff-learner`
  - compares early and final versions, then writes `99_episode.md`

So the system does not always start from zero — it can accumulate writing preferences and lessons over time.

### 3. Humanizer
The enhanced `humanizer` is used to:

- remove common AI wording patterns
- break mechanical rhythm and repetitive structures
- improve human texture and credibility
- inject more concrete, sensory details
- produce less generic, less formulaic prose

### 4. Review and reader simulation
This repository includes more than drafting. It also includes:

- `editor-review`
- `pre-publish-review`
- `toutiao-reader-test`

So it is designed not just to write, but to improve quality before publishing.

### 5. Optional illustration workflow
If image capability is available, you can also use:

- `article-illustrator`

for visual style planning and image generation.

### 6. Explicit OpenClaw clean export
This is one of the most important adaptations in this branch.

In OpenClaw, the current version no longer depends entirely on Claude Code Hook black-box behavior for clean export. Instead, it provides an explicit entry point:

```bash
python scripts/openclaw_stage12_runner.py --project [project-name]
```

If you already know the final markdown file path, you can also run:

```bash
python scripts/generate_clean.py articles/[project-name]/[final-file].md
```

---

## Current Code Structure

### Agents (16)
The repository currently includes 16 stage agents:

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

### Skills (3 core)
- `workflow-producer`
- `style-modeler`
- `web-article-extractor`

### Scripts (key scripts)
- `scripts/auto_clean_hook.py`
- `scripts/generate_clean.py`
- `scripts/generate_image.ts`
- `scripts/openclaw_stage12_runner.py`

---

## How to Use It on OpenClaw

### Recommended Runtime Model

In OpenClaw, the recommended way to think about this repository is:

#### What the main agent should do
The main agent should:
- receive the writing request
- ask the user to choose a mode first
- advance the workflow stage by stage
- present stage results back to the user

#### What stage agents should do
Stage agents should:
- read existing files from `articles/[project-name]/`
- focus only on the current stage
- write the new artifact back to disk

#### What scripts should do
Scripts should handle:
- clean export
- image generation
- other deterministic post-processing tasks

In short, **OpenClaw works best when this repository is treated as a system orchestrated by one main agent, multiple stage agents, and file-based artifacts.**

---

## Supported Writing Modes

The current recommended modes are:

| Mode | Best for | Core flow |
|---|---|---|
| Lite Mode | short posts, essays, existing material | clarify → quick draft → optional review |
| Pro / Collaborative Mode | long-form content, deep analysis, full workflow | memory → research → structure → writing → review → humanize → clean export → retrospective learning |
| Ideation Mode | when you do not yet have a topic | topic generation → topic validation → enter collaborative mode |

---

## Current Workflow Stages (Code-Aligned)

The collaborative path currently maps to:

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

> Note: older docs often summarized this as “12 stages,” but the current code shape already includes the extended Stage 0 and Stage 13 flow.

---

## What Needs to Be Configured

### Minimum setup
If you want the basic text workflow, you should at least have:

- an OpenClaw runtime environment
- Python 3.10+
- access to a usable text model

### Optional but recommended capabilities
If you want the full workflow, you may also want:

- **search capability**
  - for research and source gathering
- **browser capability**
  - for `web-article-extractor`
- **image capability**
  - for `article-illustrator`
- **Node.js**
  - for image scripts and some JS tooling

### Config files
The repository includes:

- `config.json`
- `config.json.template`

You can start from the template and adapt it to your own environment.

> Note: the exact configuration depends on which parts of the workflow you plan to use. The highest priority is a working OpenClaw runtime plus text-model capability.

---

## Most Important Commands

### Clean export

```bash
python scripts/openclaw_stage12_runner.py --project [project-name]
```

or:

```bash
python scripts/generate_clean.py articles/[project-name]/[final-file].md
```

---

## Where Outputs Are Stored

All workflow artifacts are written to:

```text
articles/[project-name]/
```

Typical structure:

```text
articles/
└── [project-name]/
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
    ├── [name]_clean.txt
    └── 99_episode.md
```

This is also what makes it very different from one-shot chat generation:

**every stage is visible, editable, and reviewable.**

---

## Recommended Reading

### Chinese
- Chinese homepage: [`README.md`](./README.md)
- Chinese detailed guide: [`README_ZH.md`](./README_ZH.md)
- OpenClaw guide: [`README_OPENCLAW.md`](./README_OPENCLAW.md)
- Execution mapping: [`OPENCLAW_EXECUTION_MAP.md`](./OPENCLAW_EXECUTION_MAP.md)
- Adaptation plan: [`OPENCLAW_ADAPTATION_PLAN.md`](./OPENCLAW_ADAPTATION_PLAN.md)
- Changelog: [`CHANGELOG.md`](./CHANGELOG.md)
- Release notes: [`RELEASE_NOTES_ZH.md`](./RELEASE_NOTES_ZH.md)

### English
- Release notes: [`RELEASE_NOTES_EN.md`](./RELEASE_NOTES_EN.md)

---

## Repository Positioning

This branch is not just a copy of the upstream project.

It is:

**an OpenClaw-oriented, documented, maintainable version that preserves upstream workflow logic while making it runnable in real OpenClaw usage.**

---

## Credits

- Upstream: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- Fork: [one-box-u/writing-agent](https://github.com/one-box-u/writing-agent)
