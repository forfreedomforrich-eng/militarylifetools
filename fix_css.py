import os
import re

root_dir = r"c:\Users\kusan\Desktop\工具站项目"

fixed_count = 0

def read_file(path):
    """Try to read file with different encodings."""
    for encoding in ["utf-8", "gbk", "gb2312", "gb18030", "latin-1"]:
        try:
            with open(path, "r", encoding=encoding) as f:
                return f.read(), encoding
        except (UnicodeDecodeError, UnicodeError):
            continue
    raise ValueError(f"Cannot read file {path} with any supported encoding")

def write_file(path, content):
    """Write file with utf-8 encoding."""
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

for dirpath, dirnames, filenames in os.walk(root_dir):
    # 跳过 .chrome-profile 等目录
    dirnames[:] = [d for d in dirnames if not d.startswith('.')]
    
    if "index.html" in filenames:
        html_path = os.path.join(dirpath, "index.html")
        content, encoding = read_file(html_path)
        original = content

        # 1. 替换 <head> 中所有相对路径的 href 为 /css/v2.css
        content = re.sub(
            r'href\s*=\s*["\'][^"\']*?style\.css["\']',
            'href="/css/v2.css"',
            content
        )

        # 2. 删除空的 stylesheet 标签: <link rel="stylesheet" > 或 <link rel="stylesheet"/>
        content = re.sub(
            r'<link\s+rel\s*=\s*"stylesheet"\s*/?>',
            '',
            content
        )

        # 3. 确保 <body> 和主容器 <div> 闭合
        body_open = len(re.findall(r'<body[^>]*>', content, re.IGNORECASE))
        body_close = len(re.findall(r'</body>', content, re.IGNORECASE))
        if body_open > body_close:
            content += "</body></html>"

        div_open = len(re.findall(r'<div(?:\s[^>]*)?>', content))
        div_close = len(re.findall(r'</div>', content))
        if div_open > div_close:
            content += "</div>" * (div_open - div_close) + "</body></html>"

        if content != original:
            write_file(html_path, content)
            print(f"Fixed: {html_path}")
            fixed_count += 1
        else:
            print(f"OK: {html_path}")

print(f"\nTotal fixed: {fixed_count}")
print("Done!")


