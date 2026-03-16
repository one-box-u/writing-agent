# Writing Agent - OpenClaw Adaptation

> An OpenClaw-oriented version of `writing-agent`, synced with upstream `v0.7.0` core capabilities and extended with a runnable OpenClaw execution path.

中文说明：[`README.md`](./README.md) / [`README_ZH.md`](./README_ZH.md)

---

## What This Is

This repository is an OpenClaw adaptation of `writing-agent`.

It preserves the core strengths of the upstream project, including:
- multi-stage writing workflow
- sub-agent collaboration
- Humanizer anti-AI-flavor rewriting
- reader simulation
- illustration workflow
- writing memory loop (`00_memory_packet.md` / `99_episode.md`)

At the same time, it fills in the key missing parts needed for real OpenClaw usage, especially:
- explicit Stage 12 clean export in OpenClaw
- clearer OpenClaw-oriented documentation and execution mapping
- more portable path handling

---

## Current Feature Shape

The current `main` branch includes:

- **16 agents**
  - including `memory-loader`, `edit-diff-learner`, `humanizer`, `article-illustrator`, etc.
- **3 core skills**
  - `workflow-producer`
  - `style-modeler`
  - `web-article-extractor`
- **4 key scripts**
  - `scripts/auto_clean_hook.py`
  - `scripts/generate_clean.py`
  - `scripts/generate_image.ts`
  - `scripts/openclaw_stage12_runner.py`
- **memory loop support**
  - `00_memory_packet.md` generated before writing
  - `99_episode.md` generated after writing
- **explicit OpenClaw Stage 12 execution**
  - `_clean.txt` can be produced without relying on Claude Code Hook behavior

---

## How to Use It on OpenClaw

### Recommended Mental Model

In OpenClaw, treat this repository as:

1. a writing workflow protocol
2. a set of stage-oriented agent prompt assets
3. a file-driven artifact structure
4. a workflow orchestrated by a main agent, executed stage by stage by sub-agents and scripts

In other words, it is not just “a project that runs inside Claude Code.”

It is:

**a writing system that can be orchestrated in OpenClaw using a main agent, stage agents, and deterministic scripts.**

### Recommended Runtime Pattern

When using this in OpenClaw:

- the main agent should:
  - receive the writing request
  - ask the user to choose a mode first
  - advance the workflow stage by stage
  - present stage results back to the user

- stage agents should:
  - read existing files from `articles/[project-name]/`
  - focus only on the current stage
  - write the artifact back to disk

- scripts should handle:
  - clean export
  - other deterministic post-processing tasks

---

## What Needs to Be Configured

### 1. Runtime Environment

You should at least have:

- an OpenClaw runtime environment
- Python 3.10+
- Node.js (if you want image generation scripts or JS-based tooling)

### 2. Model / Service Capabilities

Depending on what parts of the workflow you want to use, you will typically need:

- **text model capability**
  - e.g. DeepSeek / MiniMax / Qwen / GLM / Gemini
- **search capability**
  - for research and source gathering
- **image capability** (optional)
  - if you want to use `article-illustrator`
- **browser capability** (optional)
  - if you want to use `web-article-extractor`

### 3. Config Files

This repository includes:
- `config.json`
- `config.json.template`

You can start from the template and fill in your own environment-specific values.

> Note: the exact configuration you need depends on which parts of the workflow you plan to use.
> If you want to start with the text workflow only, prioritize text model access and a working OpenClaw runtime first.

---

## Most Important Command

### Stage 12: Explicit clean export

Recommended command:

```bash
python scripts/openclaw_stage12_runner.py --project [project-name]
```

If you already know the final markdown file path, you can also run:

```bash
python scripts/generate_clean.py articles/[project-name]/[final-file].md
```

This is the most important explicit execution path for OpenClaw usage right now.

---

## Recommended Reading

### Chinese
- Detailed feature and usage guide: [`README_ZH.md`](./README_ZH.md)
- OpenClaw guide: [`README_OPENCLAW.md`](./README_OPENCLAW.md)
- Execution mapping: [`OPENCLAW_EXECUTION_MAP.md`](./OPENCLAW_EXECUTION_MAP.md)
- Adaptation plan: [`OPENCLAW_ADAPTATION_PLAN.md`](./OPENCLAW_ADAPTATION_PLAN.md)
- Changelog: [`CHANGELOG.md`](./CHANGELOG.md)
- Release notes: [`RELEASE_NOTES_ZH.md`](./RELEASE_NOTES_ZH.md)

### English
- Release notes: [`RELEASE_NOTES_EN.md`](./RELEASE_NOTES_EN.md)

---

## Repository Positioning

This version is not a simple copy of Claude Code usage.

It is:

**an OpenClaw-oriented, documented, maintainable version that preserves upstream workflow logic while making it runnable in real OpenClaw usage.**

---

## Credits

- Upstream: [dongbeixiaohuo/writing-agent](https://github.com/dongbeixiaohuo/writing-agent)
- Fork: [one-box-u/writing-agent](https://github.com/one-box-u/writing-agent)
