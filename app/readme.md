# EverLedge Design System

> **EverLedge — protect your estate.** A modern, elegant, trustworthy design system for a digital estate & gifting platform serving high-net-worth UK individuals. The feel is a **digital family office**: closer to a private bank or premium wealth-management service than a fintech app.

This system was authored from a written brand brief (no prior codebase or Figma was supplied). Everything here — tokens, components, the signature PET Timeline, and the web-app UI kit — is original work derived from that brief. If you have a production codebase or Figma file, share it via the Import menu and this system can be reconciled against it.

---

## 1. Product context

EverLedge helps people record and manage their estate for the people who will inherit it. Core jobs:

- Record **lifetime gifts** (Potentially Exempt Transfers / *PETs*) and track their seven-year expiry toward IHT exemption.
- Estimate **inheritance tax (IHT) exposure** and net estate value.
- Record **executors** and store **estate documents** (wills, deeds, valuations, trust deeds).
- Maintain a clear, professional record for family and executors.

**Primary navigation:** Overview · Estate · Gifts · Executors · Documents · Reports · Settings.

**Brand personality:** sophisticated, calm, trustworthy, premium, professional, long-term, family- & legacy-oriented.
**Avoid:** startup aesthetics, crypto/trading vibes, bright gradients, gamification, dense dashboards, excessive charts.
**Inspiration blend:** ~70% Apple-style minimalism · ~20% private-banking sophistication · ~10% premium legal-document aesthetic.

---

## 2. Content fundamentals (voice & tone)

How EverLedge writes:

- **Address the user as "you" / "your".** Warm but composed: *"Your estate at a glance — organised and protected."* Never "we" lecturing the user; the product is a quiet steward.
- **Reassuring, never alarming.** IHT is anxiety-laden; copy emphasises control and progress. Prefer *"2 PETs nearing exemption"* over *"Tax liability warning"*.
- **British English & British terminology.** *organised*, *valuation*, *whilst*; £ sterling; dates as `14 Sep 2021` (day-month-year). Domain terms used precisely: *Potentially Exempt Transfer*, *taper relief*, *executor*, *estate*, *exemption*.
- **Sentence case** for headings and buttons (*"Record a gift"*, not "Record A Gift"). Labels above figures are **UPPERCASE, tracked** and small (eyebrow style) — *"NET ESTATE VALUE"*.
- **Concise & confident.** Short noun phrases for metrics; one calm supporting line beneath. No exclamation marks, no hype, no jargon-for-its-own-sake.
- **No emoji.** Status and emphasis come from the icon set, badges and the gold accent — never emoji. (The single ✦ in a couple of specimen cards is a typographic flourish, not product copy.)
- **Numbers are precise and human.** *£4.28M* in summaries; *£250,000* in records; *"1.4 years remaining"*. Figures are set in the mono typeface to read like a ledger.

Example microcopy:
- Empty/CTA: *"Record a gift"*, *"Add executor"*, *"Upload document"*.
- Status badges: *Exempt* · *Active PET* · *1.4 yrs left* · *In estate* · *Premium*.
- Action centre: *"Review 2 PETs nearing exemption"* / *"Refresh estate valuation — last updated 4 months ago"*.

---

## 3. Visual foundations

**Colour.** A single composed brand blue (`--blue-600 #2D6AA0`) for primary actions; deep navy (`--navy-800 #1A2734`) for ink, headers and the brand mark; a cool paper background (`--neutral-50 #F7F8FA`) with white cards (`#FFFFFF`) and hairline borders (`--neutral-200 #E4E7EB`). Semantic green/amber/red are muted and editorial, never neon. The **gold luxury accent** (`--gold-600 #B89B5E`) appears *sparingly* — milestones, premium features, completed estates, full PET exemption. Gold is never a primary button colour.

**Typography.** **Geist** for all UI and display; **Geist Mono** for figures, money and dates (tabular, ledger-like). Scale: H1 40 / H2 30 / H3 24 / H4 18 / Body 16 / Small 14. Weights 300–700; headings 600 with tight tracking (`-0.02em`); eyebrows uppercase with wide tracking. Generous line-height (1.5 body) and whitespace.

**Spacing & layout.** 4px base scale, but used *generously* — 24–48px gutters, roomy card padding (`--space-5/6`). Desktop-first, fixed **264px left sidebar**, content capped ~1180px. Card-based throughout; information grouped into clearly defined sections. Minimal clutter; readability and confidence over data density.

**Cards.** White, **14px radius** (`--radius-lg`), 1px hairline border, soft cool-grey shadow (`--shadow-sm` at rest). Interactive cards lift gently (`translateY(-2px)`, `--shadow-md/lg`). Premium/milestone cards get a thin gold top rule (`accent="gold"`) — never a coloured left border.

**Elevation.** Low-spread, soft, cool-toned shadows tinted with navy (`rgba(26,39,52,…)`). Five steps xs→xl; dialogs use `--shadow-xl`. Focus rings are a soft 3px blue glow (`--shadow-focus`).

**Borders & radii.** Hairlines everywhere (`1px solid --neutral-200`). Radii: inputs/buttons 10px (`md`), cards 14px (`lg`), pills/badges 999px. Nothing sharp, nothing bubbly.

**Backgrounds.** Calm flat fills only — cool paper grey or white. **No bright gradients.** The only gradients permitted are the subtle, same-hue progress fills (blue→blue, gold→gold) inside the PET Timeline and progress bars, and the 3px gold accent rule. No photography backgrounds, no textures, no noise.

**Imagery / illustration.** A refined **fine-line architectural** illustration system — country houses, colonnades, deeds & seals — on limited tinted grounds (paper, blue-50, gold-50), navy line work with an occasional dashed gold horizon accent. Editorial and premium; **never** generic fintech people-with-laptops. (See caveat 6 — these are placeholder line drawings; commission production artwork.)

**Motion.** Restrained and premium. `--ease-standard` (220ms) for hovers and colour; `--ease-emphasis` (420ms) for the timeline fill and toggles. Hover = gentle card lift + shadow deepen; press = 0.5px nudge (buttons). Number/timeline transitions glide rather than bounce. No flashy or looping decorative animation. Respect `prefers-reduced-motion` in production.

**Transparency / blur.** Used only for the modal scrim (`rgba(19,29,39,0.42)` + 2px backdrop blur). Surfaces themselves are opaque.

---

## 4. Iconography

- **Library: Lucide** (stroke icons), loaded from CDN (`window.lucide`). The `Icon` component reads Lucide's icon data and renders inline SVG at a refined **1.75 stroke weight** to match the calm, premium tone.
- **Core icon vocabulary:** `shield` (protection/IHT), `home` (overview/property), `users` (executors), `archive`/`folder` (documents/trusts), `file-text` (wills/reports), `landmark` (estate/institution), `calendar` (dates/PETs), `gift` (lifetime gifts). Plus utility: `search, bell, settings, plus, check, x, chevron-right, trending-up, download, sparkles`.
- **No emoji, no unicode glyphs as icons.** Status is communicated through `Badge` tones + the gold accent, not symbols.
- **Brand mark** is the supplied EverLedge logo — an interlocking double-E monogram in brand blue (`assets/everledge-mark.png`, with `assets/everledge-mark-light.png` knocked out for dark grounds). The full lockup is composed in markup: the mark PNG beside the "EverLedge" wordmark in Geist 600. Use the light variant on navy.
- If you swap to Phosphor or a self-hosted set, keep the thin, even stroke weight and rounded line caps.

---

## 5. Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this). `@import`s only.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css` (spacing, radii, shadows, motion, layout), `fonts.css` (Geist via Google Fonts CDN).
- `readme.md` — this guide. `SKILL.md` — Agent-Skills wrapper.
- `assets/` — the EverLedge logo (`everledge-mark.png`, `everledge-mark-light.png`) and fine-line illustrations (`illustration-house.svg`, `-landmark.svg`, `-document.svg`).

**Components** (`components/<group>/` — each has `.jsx` + `.d.ts` + `.prompt.md` + a `@dsCard` HTML)
- `core/` — **Button**, **Icon**, **Card**, **Badge**, **Avatar**
- `forms/` — **Input**, **Select**, **Checkbox**, **Switch**
- `navigation/` — **SidebarNav**, **Tabs**
- `estate/` — **PETTimeline** *(signature)*, **SummaryCard**, **GiftCard**

**Foundation specimen cards** (`guidelines/*.card.html`) — Colors (primary, neutrals, semantic, gold), Type (scale, weights, figures), Spacing (scale, radii, elevation), Brand (logo, illustration, motion).

**UI kits** (`ui_kits/`)
- `web-app/` — interactive EverLedge estate app: Overview, Gifts (+ record-gift dialog), Executors, Documents. See its `README.md`.

**Generated automatically — do not edit:** `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.

---

## 6. Caveats

- **Fonts via CDN.** Geist & Geist Mono load from Google Fonts rather than self-hosted binaries, so the compiler reports 0 bundled `@font-face` rules. Geist *is* the requested typeface — no substitution of design — but for fully offline/self-hosted use, supply the `.woff2` files and I'll swap `tokens/fonts.css` to `@font-face` rules.
- **Illustrations are placeholders.** The fine-line SVGs establish the *direction* (refined, architectural, limited palette) but are hand-built line art, not finished brand illustration. Commission production artwork in this style.
- **No source product.** Screens are an original interpretation of the brief, not a recreation of an existing EverLedge UI. Share the real app/Figma to reconcile.
