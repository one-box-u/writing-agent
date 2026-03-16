#!/usr/bin/env python3
"""
openclaw_stage12_runner.py - OpenClaw 显式执行 Stage 12

用途：
- 不依赖 Claude Code Hook
- 在 OpenClaw 编排层中显式生成 `_clean.txt`

用法：
  python scripts/openclaw_stage12_runner.py articles/项目名/draft_final.md
  python scripts/openclaw_stage12_runner.py --project 项目名
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
ARTICLES_DIR = PROJECT_ROOT / "articles"
GENERATE_CLEAN = PROJECT_ROOT / "scripts" / "generate_clean.py"


def find_latest_final_markdown(project_dir: Path) -> Path | None:
    candidates = []
    for f in project_dir.glob("*.md"):
        name = f.name.lower()
        if any(k in name for k in ["final", "humanized", "最终稿"]):
            candidates.append(f)

    if not candidates:
        draft_candidates = sorted(
            project_dir.glob("draft_v*.md"),
            key=lambda p: p.stat().st_mtime,
            reverse=True,
        )
        candidates.extend(draft_candidates)

    if not candidates:
        return None

    candidates.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    return candidates[0]


def run_generate_clean(markdown_file: Path) -> int:
    if not markdown_file.exists():
        print(f"错误：找不到文件 -> {markdown_file}", file=sys.stderr)
        return 1

    cmd = [sys.executable, str(GENERATE_CLEAN), str(markdown_file)]
    result = subprocess.run(cmd, cwd=str(PROJECT_ROOT))
    return result.returncode


def main() -> int:
    parser = argparse.ArgumentParser(description="OpenClaw Stage 12 clean runner")
    parser.add_argument("markdown_file", nargs="?", help="定稿 markdown 文件路径")
    parser.add_argument("--project", dest="project", help="项目名（位于 articles/ 下）")
    args = parser.parse_args()

    if args.markdown_file:
        return run_generate_clean((PROJECT_ROOT / args.markdown_file).resolve() if not Path(args.markdown_file).is_absolute() else Path(args.markdown_file))

    if args.project:
        project_dir = ARTICLES_DIR / args.project
        if not project_dir.exists():
            print(f"错误：项目目录不存在 -> {project_dir}", file=sys.stderr)
            return 1
        target = find_latest_final_markdown(project_dir)
        if not target:
            print(f"错误：项目目录下没有找到可导出的 markdown -> {project_dir}", file=sys.stderr)
            return 1
        print(f"已定位定稿文件 -> {target}")
        return run_generate_clean(target)

    print("错误：请提供 markdown 文件路径或 --project 项目名", file=sys.stderr)
    parser.print_help()
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
