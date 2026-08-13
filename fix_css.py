import os
import re

root_dir = r"c:\Users\kusan\Desktop\工具站项目"

fixed_count = 0

def read_file(path):
    for encoding in ["utf-8", "gbk", "gb2312", "gb18030", "latin-1"]:
        try:
            with open(path, "r", encoding=encoding) as f:
                return f.read(), encoding
        except (UnicodeDecodeError, UnicodeError):
            continue
    raise ValueError(f"Cannot read file {path}")

for dirpath, dirnames, filenames in os.walk(root_dir):
    if "index.html" in filenames:
        html_path = os.path.join(dirpath, "index.html")
        content, encoding = read_file(html_path)

        original = content

        # 替换 <head> 中所有相对路径的 href 为 /style.css
        content = re.sub(
            r'href\s*=\s*["\'][^"\']*?style\.css["\']',
            'href="/style.css"',
            content
        )

        # 确保 <body> 和主容器 <div> 闭合
        body_open = len(re.findall(r'<body[^>]*>', content, re.IGNORECASE))
        body_close = len(re.findall(r'</body>', content, re.IGNORECASE))
        if body_open > body_close:
            content += "</body></html>"

        div_open = len(re.findall(r'<div(?:\s[^>]*)?>', content))
        div_close = len(re.findall(r'</div>', content))
        if div_open > div_close:
            content += "</div>" * (div_open - div_close) + "</body></html>"

        if content != original:
            with open(html_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Fixed: {html_path}")
            fixed_count += 1
        else:
            print(f"OK: {html_path}")

print(f"\nTotal fixed: {fixed_count}")
print("Done!")
