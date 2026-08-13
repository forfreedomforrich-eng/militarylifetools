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

def fix_html(content):
    global fixed_count
    original = content
    
    # 1. 删除所有空标签: <link> <script> <style> 等空标签
    # 匹配 <tag> 或 <tag/> 其中tag是link, script, style, meta等常见空元素
    empty_tags = r'<(link|script|style|meta|br|hr|img|input|area|base|col|embed|param|source|track|wbr)\b[^>]*?/\s*>'
    content = re.sub(empty_tags, '', content, flags=re.IGNORECASE)
    
    # 匹配 <tag> </tag> 中间无任何内容的情况
    empty_blocks = r'<(link|script|style|meta)\b[^>]*>\s*</\1>'
    content = re.sub(empty_blocks, '', content, flags=re.IGNORECASE)
    
    # 2. 统一CSS引用：确保只有一个<link rel="stylesheet" href="/css/v2.css">
    # 先删除所有已有的stylesheet link标签
    content = re.sub(r'<link\s+rel\s*=\s*"stylesheet"[^>]*>', '', content, flags=re.IGNORECASE)
    # 在<head>后插入正确的CSS引用
    content = re.sub(r'<head>', '<head>\n    <link rel="stylesheet" href="/css/v2.css">', content, flags=re.IGNORECASE)
    
    # 3. 修复JS引用：确保路径以/开头，即绝对路径
    content = re.sub(r'src\s*=\s*["\'][^/][^"\']*\.js["\']', lambda m: m.group(0).replace('src="', 'src="/').replace("src='", "src='/"), content, flags=re.IGNORECASE)
    # 同理处理外部JS但相对路径的（如../../js/）
    content = re.sub(r'src\s*=\s*["\']\.\./[^"\']*\.js["\']', lambda m: m.group(0).replace('../../js/', '/js/').replace('../js/', '/js/'), content, flags=re.IGNORECASE)
    
    # 4. 确保<body>和<html>闭合
    body_open = len(re.findall(r'<body[^>]*>', content, re.IGNORECASE))
    body_close = len(re.findall(r'</body>', content, re.IGNORECASE))
    if body_open > body_close:
        content += "</body>"
    html_close = len(re.findall(r'</html>', content, re.IGNORECASE))
    if html_close == 0 and '<html' in content.lower():
        content += "</html>"
    
    if content != original:
        fixed_count += 1
        return content, True
    return content, False

for dirpath, dirnames, filenames in os.walk(root_dir):
    # 跳过无关目录
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d not in ['node_modules', '_build']]
    
    if "index.html" in filenames:
        html_path = os.path.join(dirpath, "index.html")
        content, encoding = read_file(html_path)
        new_content, changed = fix_html(content)
        
        if changed:
            write_file(html_path, new_content)
            print(f"Fixed: {html_path}")
        else:
            print(f"OK: {html_path}")

print(f"\nTotal fixed: {fixed_count}")
print("Done!")


