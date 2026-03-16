# Writing Agent OpenClaw Branch Release Notes

Release date: 2026-03-16
Branch: `openclaw`

## Overview

This update syncs the OpenClaw branch of `one-box-u/writing-agent` with the core capabilities of upstream `writing-agent v0.7.0`, while also adding a genuinely runnable execution path for OpenClaw-based usage.

## Main Updates

### 1. Synced upstream v0.7.0 core capabilities
- Added `memory-loader`
- Added `edit-diff-learner`
- Introduced the `00_memory_packet.md` / `99_episode.md` memory loop
- Synced newer versions of `humanizer`, `writing-executor`, `outline-architect`, `title-designer`, and related major agents

### 2. Improved OpenClaw runtime usability
- Added `scripts/openclaw_stage12_runner.py`
- In OpenClaw, Stage 12 no longer depends on Claude Code Hook black-box behavior
- `_clean.txt` can now be generated explicitly, making orchestration, debugging, and automation easier

Recommended command:

```bash
python scripts/openclaw_stage12_runner.py --project [project-name]
```

### 3. Fixed environment compatibility issues
- Removed author-machine absolute paths from the web article extraction skill
- Replaced multiple `~/.claude/...` examples with project-relative paths
- Improved portability for OpenClaw and other non-Claude-Code host environments

### 4. Fully refreshed documentation
- Chinese homepage: `README.md`
- Chinese detailed guide: `README_ZH.md`
- English detailed guide: `README_EN.md`
- OpenClaw guide: `README_OPENCLAW.md`
- Execution mapping: `OPENCLAW_EXECUTION_MAP.md`
- Adaptation plan: `OPENCLAW_ADAPTATION_PLAN.md`
- Version history: `CHANGELOG.md`

## Current Feature Shape

The current `openclaw` branch now includes:
- 16 agents
- 3 core skills
- 4 key scripts
- the memory loop
- explicit OpenClaw Stage 12 execution
- bilingual documentation aligned with the current code shape

## One-line Summary

After this update, the `openclaw` branch is no longer just “close to upstream.” It is now:

**a usable branch that syncs upstream core capabilities and completes the key runtime adaptations for OpenClaw.**
