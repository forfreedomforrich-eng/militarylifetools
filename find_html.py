import os
base = r"c:\Users\kusan\Desktop\工具站项目"
# Check all directories for HTML files
for root, dirs, files in os.walk(base):
    dirs[:] = [d for d in dirs if not d.startswith(".") and d not in ["node_modules", ".git"]]
    for f in files:
        if f == "index.html":
            fp = os.path.join(root, f)
            rel = os.path.relpath(fp, base)
            size = os.path.getsize(fp)
            print(rel + "  (" + str(size) + " bytes)")
