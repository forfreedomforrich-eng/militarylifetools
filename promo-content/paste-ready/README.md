# Paste-Ready Pack — 12 Cross-Posts

These files are ready to paste into the four target platforms. Each article is
provided in four platform-specific formats so the platform's editor picks up the
right categories or tags automatically.

## Files

| Article | Blogger | Medium | WordPress.com | Tumblr |
|---|---|---|---|---|
| VA Disability | `va-disability-blogger-paste-ready.txt` | `va-disability-medium-paste-ready.txt` | `va-disability-wordpress-paste-ready.txt` | `va-disability-tumblr-paste-ready.txt` |
| GI Bill | `gi-bill-blogger-paste-ready.txt` | `gi-bill-medium-paste-ready.txt` | `gi-bill-wordpress-paste-ready.txt` | `gi-bill-tumblr-paste-ready.txt` |
| Retirement | `retirement-blogger-paste-ready.txt` | `retirement-medium-paste-ready.txt` | `retirement-wordpress-paste-ready.txt` | `retirement-tumblr-paste-ready.txt` |

Plus the existing `bah-2026-paste-ready.txt` (re-use next cycle for the BAH cross-post).

## Title format (every file has it at the top)

The first line of every file is `TITLE: ...`. Copy the text after `TITLE: ` into the platform's title field.

For Medium files, the second line is `SUBTITLE: ...` — copy that into Medium's "Subtitle" field.

### Titles per platform

| Article | Blogger | Medium (different, more Medium-friendly) | WordPress.com | Tumblr |
|---|---|---|---|---|
| VA Disability | VA Disability Compensation Explained: What Veterans Should Know in 2026 | VA Disability Compensation in 2026: How to Estimate Your Benefits Before You File | VA Disability Compensation Explained: What Veterans Should Know in 2026 | VA Disability Compensation Explained: What Veterans Should Know in 2026 |
| GI Bill | GI Bill Calculator: How to Estimate Education Benefits Before You Choose a School | The GI Bill Calculator Every Service Member Should Use Before Picking a School | GI Bill Calculator: How to Estimate Education Benefits Before You Choose a School | GI Bill Calculator: How to Estimate Education Benefits Before You Choose a School |
| Retirement | Military Retirement Planning in 2026: Legacy vs BRS, TSP, and What to Know Before You Leave | Military Retirement Planning in 2026: How to Choose Between Legacy, BRS, and Your TSP | Military Retirement Planning in 2026: Legacy vs BRS, TSP, and What to Know Before You Leave | Military Retirement Planning in 2026: Legacy vs BRS, TSP, and What to Know Before You Leave |

## Tags / Categories / Labels (also at the bottom of every file)

The last line of every file is the tag/category line. Below is the full reference:

### VA Disability

| Platform | Field | Values |
|---|---|---|
| Blogger | Labels | `VA Disability`, `VA Claims`, `Veterans Benefits`, `2026` |
| Medium | Tags | `VA Disability`, `Veterans Benefits`, `VA Claims`, `2026` |
| WordPress.com | Categories | `Veterans`, `Benefits` |
| WordPress.com | Tags | `VA Disability`, `VA Claims`, `2026` |
| Tumblr | Tags | `VA Disability`, `Veterans`, `2026` |

### GI Bill

| Platform | Field | Values |
|---|---|---|
| Blogger | Labels | `GI Bill`, `Education Benefits`, `Veterans`, `2026` |
| Medium | Tags | `GI Bill`, `Education Benefits`, `Veterans`, `2026` |
| WordPress.com | Categories | `Education`, `Veterans` |
| WordPress.com | Tags | `GI Bill`, `Education Benefits`, `2026` |
| Tumblr | Tags | `GI Bill`, `Education`, `Veterans`, `2026` |

### Retirement

| Platform | Field | Values |
|---|---|---|
| Blogger | Labels | `Military Retirement`, `BRS`, `TSP`, `2026` |
| Medium | Tags | `Military Retirement`, `BRS`, `TSP`, `2026` |
| WordPress.com | Categories | `Retirement`, `Veterans` |
| WordPress.com | Tags | `Military Retirement`, `BRS`, `TSP`, `2026` |
| Tumblr | Tags | `Retirement`, `BRS`, `TSP`, `Veterans`, `2026` |

## Publishing cadence (2 days per article, 2 platforms per day)

Each article is split across 2 days so we don't blast 4 backlinks to the same URL
on the same day (which can look like a PBN to Google). Each day = 2 platforms.

| Day | Article | Platforms to publish |
|---|---|---|
| Day 1 (today) | VA Disability | Blogger + Medium |
| Day 2 | VA Disability | WordPress.com + Tumblr |
| Day 3 | GI Bill | Blogger + Medium |
| Day 4 | GI Bill | WordPress.com + Tumblr |
| Day 5 | Retirement | Blogger + Medium |
| Day 6 | Retirement | WordPress.com + Tumblr |

Order rationale: Blogger + Medium first (lowest friction, instant publish), then
WordPress + Tumblr (slower moderation on WordPress, Tumblr has been finicky with
tags since 2024). This pattern repeats for all 3 articles so the timing looks
uniform across the campaign in Analytics.

## How to publish (5 minutes per file)

1. Open the file for the platform you want to publish on.
2. Copy the `TITLE:` line text → paste into the platform's title field.
3. Copy the **body** (everything from the platform intro line through the tags line) → paste into the platform editor:
   - **Blogger** → "Compose view" (NOT HTML view, so the editor auto-formats). Then click the Labels sidebar and add the labels.
   - **Medium** → Editor, paste as plain text. Copy the `SUBTITLE:` line text into the "Subtitle" field. Add the tags in the tag input.
   - **WordPress.com** → "Add block → Paragraph" first, then paste. Use the Categories / Tags line for the right sidebar fields.
   - **Tumblr** → Create a "Text" post. The "Source" field at the bottom of the file goes into Tumblr's "Source" field. Add tags after the post body.
4. Add the labels/tags/categories from the table above (also at the bottom of each file).
5. Publish.

## After publishing all 12 posts

1. Add the 12 post URLs to `scripts/submit-indexnow.js` URL list (or extend the file to auto-discover from a `paste-ready/published.json` log you keep).
2. Run `node scripts/submit-indexnow.js` to push all 12 to Bing + Yandex for instant indexing.
3. (Optional) Add the 12 post URLs to a tracked spreadsheet so you can monitor referral traffic from each platform after 7 / 14 / 30 days.

## Source articles

- `../va-disability-compensation-explained-publish-ready.md`
- `../gi-bill-calculator-education-benefits-publish-ready.md`
- `../military-retirement-planning-guide-publish-ready.md`
