---
name: everledge-design
description: Use this skill to generate well-branded interfaces and assets for EverLedge, a premium digital estate & gifting platform for high-net-worth UK individuals, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **Brand:** EverLedge — "protect your estate". A digital family office. Calm, sophisticated, trustworthy, premium. ~70% Apple minimalism, 20% private banking, 10% legal-document.
- **Tokens:** `styles.css` → `tokens/` (colors, typography, spacing, fonts). Link `styles.css`; use CSS custom properties (`--color-primary`, `--surface-card`, `--text-strong`, `--space-5`, `--radius-lg`, `--shadow-sm`, etc.).
- **Type:** Geist (UI/display) + Geist Mono (figures, money, dates). H1 40 / H2 30 / H3 24 / H4 18 / Body 16 / Small 14.
- **Colour:** one blue (`#2D6AA0`), navy ink (`#1A2734`), cool paper bg (`#F7F8FA`), white cards, hairline borders. Gold (`#B89B5E`) ONLY for milestones/premium/exemption. No bright gradients, no emoji.
- **Icons:** Lucide, 1.75 stroke. `shield, home, users, archive, file-text, landmark, calendar, folder, gift`.
- **Signature component:** the **PET Timeline** (seven-year Potentially Exempt Transfer tracker). Make it the hero of estate/gift views.
- **Components:** see `components/` (core, forms, navigation, estate) and `ui_kits/web-app/` for full screens.

## Using components in an artifact
Link `styles.css`, load React + Babel + Lucide + `_ds_bundle.js`, then `const { Button, Card, PETTimeline, ... } = window.<Namespace>` (run check_design_system for the exact namespace). The `ui_kits/web-app/index.html` is a complete, copyable example.
