"""
auto_clean_hook.py - 自动生成纯净版的 Hook 脚本
触发时机：由 Claude Code Hook 在 Subagent 结束时自动调用
功能：扫描 articles/ 目录，找到最近一次被修改的定稿文件，自动生成 _clean.txt
"""

import os
import sys
import json
from pathlib import Path

# 项目根目录（脚本在 scripts/ 下，向上一级）
PROJECT_ROOT = Path(__file__).parent.parent
ARTICLES_DIR = PROJECT_ROOT / 'articles'
GENERATE_CLEAN = PROJECT_ROOT / 'scripts' / 'generate_clean.py'


def find_latest_draft():
    """在 articles/ 下所有项目文件夹中，找到最近修改的定稿文件"""
    candidates = []

    if not ARTICLES_DIR.exists():
        return None

    for project_dir in ARTICLES_DIR.iterdir():
        if not project_dir.is_dir():
            continue
        # 跳过特殊目录
        if project_dir.name.startswith('_'):
            continue

        # 在项目目录中查找可能是定稿的文件
        for f in project_dir.glob('*.md'):
            name_lower = f.name.lower()
            # 匹配这些模式的文件被认为是定稿候选
            is_final = any(keyword in name_lower for keyword in [
                'final',        # draft_final.md
                'humanized',    # draft_v4_humanized.md
                '最终稿',       # xxx_最终稿.md
            ])
            if is_final:
                candidates.append(f)

    if not candidates:
        return None

    # 按修改时间排序，取最新的
    candidates.sort(key=lambda f: f.stat().st_mtime, reverse=True)
    return candidates[0]


def has_clean_version(draft_path: Path) -> bool:
    """检查是否已经有对应的 _clean.txt，且比原稿更新"""
    clean_path = draft_path.parent / (draft_path.stem + '_clean.txt')
    if not clean_path.exists():
        return False
    # 如果 clean.txt 比源稿新，说明已经处理过了，不重复
    return clean_path.stat().st_mtime >= draft_path.stat().st_mtime


def main():
    # 读取 hook 传入的事件信息（如果有的话）
    try:
        event_data = json.loads(sys.stdin.read()) if not sys.stdin.isatty() else {}
    except Exception:
        event_data = {}

    # 找到最新的定稿文件
    latest_draft = find_latest_draft()

    if latest_draft is None:
        # 没有找到定稿文件，静默退出
        sys.exit(0)

    if has_clean_version(latest_draft):
        # 已经有最新的 clean 版本了，不重复生成
        sys.exit(0)

    # 调用 generate_clean.py 生成纯净版
    import subprocess
    env = os.environ.copy()
    env['PYTHONIOENCODING'] = 'utf-8'
    result = subprocess.run(
        [sys.executable, str(GENERATE_CLEAN), str(latest_draft)],
        capture_output=True,
        text=True,
        encoding='utf-8',
        errors='replace',
        env=env
    )

    if result.returncode == 0:
        # 输出到 stderr（hook 的 stdout 可能被 Claude Code 拦截）
        print(result.stdout, file=sys.stderr)
    else:
        print(f"生成失败: {result.stderr}", file=sys.stderr)


if __name__ == '__main__':
    main()
