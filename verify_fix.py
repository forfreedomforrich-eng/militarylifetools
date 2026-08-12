import re
from pathlib import Path
BASE = Path(r"c:\Users\kusan\Desktop\工具站项目")
files = [
    "bah-calculator/index.html",
    "gi-bill-calculator/index.html",
    "pay-calculator/index.html",
    "uniform-size/index.html",
    "va-disability-calculator/index.html",
    "time-converter/index.html",
]
for rel in files:
    fp = BASE / rel
    with open(fp, "r", encoding="utf-8") as f:
        c = f.read()
    prices = re.findall(r'amazon-card-price">[^<]+</div>', c)
    imgs = re.findall(r'amazon-card-img">[^<]+</div>', c)
    print("\n=== " + rel + " ===")
    print("Images:", [m.replace('amazon-card-img">','').replace('</div>','') for m in imgs[:3]])
    print("Prices:", [m.replace('amazon-card-price">','').replace('</div>','') for m in prices[:3]])
