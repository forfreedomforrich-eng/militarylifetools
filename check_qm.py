import os, re
base = r"c:\Users\kusan\Desktop\工具站项目"
for root, dirs, files in os.walk(base):
    dirs[:] = [d for d in dirs if not d.startswith(".")]
    for f in files:
        if f == "index.html":
            fp = os.path.join(root, f)
            rel = os.path.relpath(fp, base)
            with open(fp, "rb") as fh:
                c = fh.read()
            qm = len(re.findall(rb"amazon-card-img\">\?+</div>", c))
            if qm > 0:
                print("HAS QM: " + rel + " (" + str(qm) + ")")
print("Check complete")
