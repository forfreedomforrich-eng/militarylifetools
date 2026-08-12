import re
from pathlib import Path

BASE = Path(r"c:\Users\kusan\Desktop\工具站项目")

EMOJI_MAP = {
    "moving boxes": "📦",
    "apartment essentials": "🏠",
    "tool kit": "🔧",
    "smart door lock": "🔐",
    "moving labels": "🏷️",
    "va claims guide": "📋",
    "medical evidence": "📁",
    "fireproof document": "🔒",
    "symptoms journal": "📓",
    "veterans law": "⚖️",
    "college success": "🎓",
    "laptop for college": "💻",
    "backpack": "🎒",
    "note-taking": "📝",
    "study planner": "📅",
    "before you retire": "📖",
    "tsp investing": "📈",
    "budget planner": "💰",
    "retirement planning": "🏦",
    "personal finance": "📊",
    "casio g-shock": "⌚",
    "marathon military": "🕐",
    "atomic digital": "🕰️",
    "world clock": "🌍",
    "tsp investing handbook": "📈",
    "retirement income": "💵",
    "tax-smart retirement": "🧾",
    "financial calculator": "🔢",
    "army ocp": "🪖",
    "navy nwu": "⚓",
    "air force ocp": "✈️",
    "marine corps marpat": "🎖️",
    "tactical combat boots": "🥾",
    "tactical watch": "⌚",
    "luggage lock": "🔒",
    "toiletry bottles": "🧴",
    "heavy-duty moving": "📦",
}

def get_emoji(title):
    t = title.lower()
    for kw, emoji in EMOJI_MAP.items():
        if kw in t:
            return emoji
    return "🛒"

def fix_file(fp):
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    original = content
    changed = False
    filename = fp.name

    # Fix 1: Replace ??/??? in amazon-card-img with emoji
    # Match the full card div so we can find the h3 title
    def replace_img(match):
        nonlocal changed
        card_block = match.group(0)
        title_match = re.search(r'<h3[^>]*>([^<]+)</h3>', card_block)
        if title_match:
            title = title_match.group(1).strip()
            emoji = get_emoji(title)
            new_div = '<div class="amazon-card-img">' + emoji + '</div>'
            old_div = match.group(1)
            if old_div != new_div:
                changed = True
                return match.group(2) + new_div + match.group(3)
        # fallback: use the matched img div as-is but replace content
        old_div = match.group(1)
        return match.group(2) + '<div class="amazon-card-img">🛒</div>' + match.group(3)

    # Match full card div to get context
    content = re.sub(
        r'(.*?)(<div class="amazon-card-img">\?{2,}</div>)(.*)',
        replace_img, content, flags=re.DOTALL
    )

    # Fix 2: Fix price dashes
    content_old = content
    content = re.sub(
        r'(\$\d[\d,]*\.?\d*)\s+C\s+(\$\d[\d,]*\.?\d*)',
        r'\1 – \2', content
    )
    if content != content_old:
        changed = True

    # Fix 3: uniform-size special case
    if "uniform-size" in filename:
        price_fixes = {
            "Army OCP Uniform Set": "$89.99 – $199.99",
            "Navy NWU Type III Coverall": "$79.99 – $159.99",
            "Air Force OCP Uniform Set": "$89.99 – $199.99",
            "Marine Corps MARPAT Combat Utility": "$94.99 – $189.99",
            "Tactical Military Combat Boots": "$69.99 – $149.99",
        }
        def fix_uniform_card(match):
            nonlocal changed
            card = match.group(0)
            title_m = re.search(r'<h3[^>]*>([^<]+)</h3>', card)
            if title_m:
                title = title_m.group(1).strip()
                for prod_title, price in price_fixes.items():
                    if prod_title in title:
                        old = re.search(r'<div class="amazon-card-price">[^<]*</div>', card)
                        if old:
                            new = '<div class="amazon-card-price">' + price + '</div>'
                            if old.group(0) != new:
                                changed = True
                                return card.replace(old.group(0), new)
            return card

        content_old = content
        content = re.sub(
            r'<div class="amazon-card">.*?</div>\s*</div>',
            fix_uniform_card, content, flags=re.DOTALL
        )
        if content != content_old:
            changed = True

    # Fix 4: Fix garbled h2 titles
    def fix_h2(match):
        nonlocal changed
        tag = match.group(0)
        text_m = re.search(r'<h2[^>]*>(.+?)</h2>', tag, re.DOTALL)
        if text_m:
            text = text_m.group(1).strip()
            cleaned = re.sub(r'^[^\w\s\u2600-\u26FF\u2700-\u27BF\U0001F000-\U0001FFFF]+', '', text)
            if cleaned != text:
                changed = True
                return '<h2>' + cleaned + '</h2>'
        return tag

    content = re.sub(r'<h2[^>]*>.*?</h2>', fix_h2, content, flags=re.DOTALL)

    if changed:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False


files_to_fix = [
    "bah-calculator/index.html",
    "gi-bill-calculator/index.html",
    "pay-calculator/index.html",
    "retirement-calculator/index.html",
    "time-converter/index.html",
    "tsp-withdrawal-calculator/index.html",
    "uniform-size/index.html",
    "va-disability-calculator/index.html",
    "blog/military-travel-hacking/index.html",
    "blog/pcs-move-timeline-checklist-2026/index.html",
]

fixed_count = 0
for rel_path in files_to_fix:
    full_path = BASE / rel_path
    if not full_path.exists():
        print("SKIP: " + rel_path)
        continue
    if fix_file(full_path):
        print("FIXED: " + rel_path)
        fixed_count += 1
    else:
        print("NO CHANGE: " + rel_path)

print("\nTotal fixed: " + str(fixed_count))
