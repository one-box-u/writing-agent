"""
generate_clean.py - 纯净版文本生成器
用途：将 Markdown 格式的文章定稿转为可直接复制到微信公众号的纯文本版本
使用方式：python scripts/generate_clean.py articles/职场边界与协作智慧/draft_final.md
"""

import sys
import re
from pathlib import Path


def clean_markdown(text: str) -> str:
    """将 Markdown 文本转为纯净排版文本"""
    lines = text.split('\n')
    cleaned_lines = []

    for line in lines:
        stripped = line.strip()

        # 跳过图片引用 ![xxx](xxx)
        if re.match(r'!\[.*?\]\(.*?\)', stripped):
            continue

        # 跳过纯 Markdown 装饰行（分割线 ---、===、***）
        if re.match(r'^[-=*]{3,}$', stripped):
            continue

        # 跳过写作备注、元数据（> 开头的元信息行）
        if re.match(r'^>\s*(创建时间|版本|风格|字数|项目|写作备注)', stripped):
            continue

        # 跳过末尾常见的非正文块关键词行
        if stripped.startswith('## 写作备注') or stripped.startswith('## 修改记录'):
            continue

        # 跳过空行
        if not stripped:
            continue

        # 去除 Markdown 标题符号 # ## ### 等
        line_clean = re.sub(r'^#{1,6}\s+', '', stripped)

        # 去除加粗 **xxx** 和 __xxx__
        line_clean = re.sub(r'\*\*(.*?)\*\*', r'\1', line_clean)
        line_clean = re.sub(r'__(.*?)__', r'\1', line_clean)

        # 去除斜体 *xxx* 和 _xxx_（注意不要误删列表项）
        line_clean = re.sub(r'(?<!\w)\*([^*]+)\*(?!\w)', r'\1', line_clean)

        # 去除行内代码 `xxx`
        line_clean = re.sub(r'`([^`]+)`', r'\1', line_clean)

        # 去除引用符号 >
        line_clean = re.sub(r'^>\s*', '', line_clean)

        # 去除无序列表符号 - 和 *（行首）
        line_clean = re.sub(r'^[-*]\s+', '', line_clean)

        # 去除有序列表编号 1. 2. 等
        line_clean = re.sub(r'^\d+\.\s+', '', line_clean)

        # 去除链接格式 [文字](url) → 文字
        line_clean = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', line_clean)

        # 最终清理
        line_clean = line_clean.strip()
        if line_clean:
            cleaned_lines.append(line_clean)

    # 段落间单换行（不是双换行）
    return '\n'.join(cleaned_lines)


def main():
    if len(sys.argv) < 2:
        print("用法: python scripts/generate_clean.py <markdown文件路径>")
        print("示例: python scripts/generate_clean.py articles/职场边界与协作智慧/draft_final.md")
        sys.exit(1)

    input_path = Path(sys.argv[1])

    if not input_path.exists():
        print(f"错误：文件不存在 → {input_path}")
        sys.exit(1)

    # 读取源文件
    text = input_path.read_text(encoding='utf-8')

    # 生成纯净版
    clean_text = clean_markdown(text)

    # 输出文件名：原文件名_clean.txt（放在同目录下）
    output_name = input_path.stem + '_clean.txt'
    output_path = input_path.parent / output_name

    output_path.write_text(clean_text, encoding='utf-8')
    print(f"✅ 纯净版已生成 → {output_path}")
    print(f"   字数：{len(clean_text)} 字符")


if __name__ == '__main__':
    main()
