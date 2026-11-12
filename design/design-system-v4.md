> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Design system v4: CC-Demo full build v08 (all seven modules)

> Replaces `design-system-v3.md` (v07 and before; kept as history). Source: the *NEARCC Brand Guideline* design canvas (`artifacts/design/design-canvas-v08.md`, https://claude.ai/artifact/96qARjYTtcrHiS4mzLDJg8, version 1794447591-58ee), applied under the updated house design skills after the design restart (D-393) and the Phase 1 clarifications RC-208 – RC-234 (D-394). Status: **for review** (mockup review, then the p3-06 sign-off).

**Kit:** the house kit (`agent/reference/ui/kit/`, reviewed 2026-11-12) for **structure only**: its page templates, component classes and style guide page. `tokens-starhub.css` is not loaded, and its StarHub looks (pill buttons, 24 / 16px cards, green hero, teal / mint / peach tags, the white secondary button, the 56px large button) are replaced by the canvas values (RC-209).

## Design direction (`product-ui-design`; `frontend-design` for `index.html` only)
- **Hierarchy:** one page title (Lato 32/40 Bold, Heading grey, −1 %), then 28 section titles and 20/30 panel titles; the role's queue or the record's journey is what the eye lands on first. One filled button per view (RC-228): the forward action in Brand strong; everything else outline or link.
- **Density:** work queues and registers dense (14px rows, 12px caption headers); records and forms breathe (24px panels, 52px between page sections).
- **Colour:** purple marks action, place and selection only (Brand strong buttons; Brand primary links, active nav, selected chips, the current journey step, icons beside headings). Everything else is Text primary on white cards on the off-white page. Status is text on its canvas tint, always with words.
- **Shape and depth:** soft and quiet: cards lift on a wide 5 % glow (9 % on hover) instead of borders; controls stay crisp at 4px; notices 5px; chips and badges pill.
- **Type:** Lato for the product; League Gothic only for the CC-Demo wordmark (with the C monogram tile), the footer watermark and the launcher headline (RC-208, RC-219).
- **Layout concept:** unchanged screens in their template (`screen-inventory.md`, *v08 page templates*): `list` = header with the primary action, KPI row (≤ 4), filters, table; `detail` = title with status badge, journey or facts, related items, timeline; `form` = labels above, errors under, actions at the end; `dashboard` = KPI groups, one or two charts, a short queue. The launcher keeps its layout (RC-211).
- **Motion:** only the card hover glow and Bootstrap's own panel and toast transitions, on the motion tokens; reduced motion respected.
- **Copy voice:** v07 wording kept (RC-229); glossary terms; `clear and brief`.
- **UI rule exceptions:** none. D-248 (Layout-06, tables left-aligned) is **retired**: every table follows Layout-06 (text left, numbers right, RC-223).

## Defaults used / overridden
`app_type: web`, `theme_modes: light+dark`, `locale: en-SG`, `currency: SGD`, `dateFormat: D MMM YYYY`, `tone: clear and brief`, `scenario_guide: on` (Kickoff D-390). **Overridden:** `color_theme: starhub` → **canvas: NEARCC Brand Guideline** (D-393, instruction during the run; D-394): no StarHub value, logo or kit token anywhere; what the canvas leaves open comes from the neutral `base.css` (chart series 2 – 5, motion, layers).

## UI library
Bootstrap 5.3.3, local copy in `mockups/vendor/` (kept from v07, not upgraded), JS bundle included on every page (the scenario guide panel is an offcanvas) (D-232).

## Layout
`--container-max` 1120px, gutter 24px (16px below 768px), 52px between page sections, 24px panel padding and card gap; forms 2 columns (1 below 768px); tables text left, numbers right with tabular figures, actions last (Layout-06); cards one fixed structure per type, KPI rows of at most 4 (Layout-07); charts 260px high, drawn at their real width (Layout-11); touch targets 44px on phones (Layout-14); running text ≤ 75ch (Layout-15).

## Fonts
Lato 400 / 700 / 900 (`assets/fonts/lato-*.woff2`, SIL OFL, kept from v07, D-240; Lato has no 600, so semibold roles use 700) and League Gothic 400 (`assets/fonts/league-gothic-latin-400.woff2`, SIL OFL `OFL-LeagueGothic.txt`, D-401). `--font-family` and `--font-display` end in the system stack. Nothing loads from outside the prototype.

## Tokens (section 1 of `mockups/css/styles.css`)
### Primitives (tier 1a)
| Name | Light | Source | Dark (derived) |
|---|---|---|---|
| violet-800 / 900 / 600 / 200 / 50 | `#250E62` / `#1F0B54` / `#4B2AA5` / `#CDB8EF` / `#F1EEFB` | canvas Brand strong / hover / primary / focus border / soft | lilac-300 `#B9A3F5`, lilac-100 `#CDBDF8`, lilac-200 `#C4B2F7`, `#6F5BB5`, lilac-900 `#2B2342` |
| gray-25 / 50 / 75 / 100 / 150 / 300 / 400 / 600 / 800 / 850 | `#FAF9FB` / `#F1F2F4` / `#EEEEEF` / `#DEDFE3` / `#E0E0E0` / `#C4C4C4` / `#9C9C9C` / `#727272` / `#3E3E3E` / `#34343A` | canvas page, surface 2, disabled, border subtle, divider, outline, label muted, text secondary, heading, text primary | night-950 `#16131F`, 900 `#211C2E`, 850 `#2A2438`, 800 `#2E2839`, 700 `#3A3448`, 500 `#8F88A0`, 300 `#ABA6B8`, 100 `#ECEAF2` |
| green-700 / 600 / 50 | `#077D3C` / `#078C43` / `#E6F9EE` | canvas success (700 darkened for AA, D-241) | `#5FD68A` on `#15301F` |
| amber-700 / 500 / 50 | `#895400` / `#E78C00` / `#FFF5E6` | canvas warning | `#F0B55A` on `#33280F` |
| red-700 / 600 / 50 | `#B42318` / `#D92D20` / `#FFE5E7` | canvas notice red / error / tint | `#FF8A80` on `#3A1E24` |
| blue-700 / 50 | `#156BB5` / `#E9F3FA` | canvas info | `#8CC4F5` on `#132A3D` |

### Semantic (tier 1b)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--brand-primary` / `-hover` / `--brand-on-primary` | `#250E62` / `#1F0B54` / `#FFFFFF` | `#B9A3F5` / `#CDBDF8` / `#16131F` | primary button |
| `--brand-accent`, `--brand-link` | `#4B2AA5` | `#C4B2F7` | links, active nav, selected, icons beside headings, card buttons |
| `--brand-soft` | `#F1EEFB` | `#2B2342` | selected fill, hover tint, role avatar |
| `--brand-secondary` / `--heading` | `#34343A` / `#3E3E3E` | `#ECEAF2` / `#F5F3FA` | body / headings |
| `--text-muted`, `--nav-text` | `#727272` | `#ABA6B8`, `#B8B4C2` | secondary text, nav (never on `--surface-3`) |
| `--surface` / `-2` / `-3` / `-overlay` | `#FAF9FB` / `#FFFFFF` / `#F1F2F4` / `#FFFFFF` | `#16131F` / `#211C2E` / `#1B1726` / `#2A2438` | page / cards, tables / secondary / menus, dialogs |
| `--border` / `--divider` / `--border-strong` | `#DEDFE3` / `#E0E0E0` / `#C4C4C4` | `#3A3448` / `#2E2839` / `#5A5268` | decorative |
| `--border-control` | `#727272` | `#8F88A0` | field, select, checkbox edges (RC-217) |
| `--focus-ring-color` | `#4B2AA5` | `#C4B2F7` | 2px ring, 2px offset (RC-218) |
| `--success` / `--warning` / `--danger` / `--info` / `--neutral` | `#077D3C` / `#895400` / `#B42318` / `#156BB5` / `#616161` | `#5FD68A` / `#F0B55A` / `#FF8A80` / `#8CC4F5` / `#B8B4C2` | status text on its `-bg` tint (RC-216) |
| `--success-strong` / `--warning-strong` / `--danger-strong` | `#078C43` / `#E78C00` / `#D92D20` | as the text colours | icons, borders, invalid field only |
| `--chart-1` … `-5` | `#4B2AA5`, `#C2510A`, `#007A5E`, `#A0527F`, `#8A6100` | `#B9A3F5`, `#E69F00`, `#2BC19A`, `#CC79A7`, `#F0E442` | chart series (RC-226) |
| `--footer-bg` / `-heading` / `-text` / `-watermark` | `#250E62` / white 80 % / white 60 % / white 10 % | the same (the band stays in both themes) | footer (RC-214) |
| `--font-family` / `--font-display` | Lato … system stack / League Gothic, Lato … | — | type |
| `--font-size` · `-xs` · `-sm` · `-md` · `-lg` · `-xl` · `-2xl` · `-lead` · `-display` | 16 · 12 · 14 · 20 · 20 · 28 · 32 · 20 · 64 px | — | canvas scale (RC-220) |
| `--shadow-1` / `-1-hover` / `-panel` / `-2` / `-3` / `-header` | `0 0 30px` 5 % / 9 % / `0 0 15px` 5 % / `0 10px 30px` 10 % / `0 20px 60px` 22 % / `0 2px 12px` 6 % | 40 – 60 % black; header a 1px rule; cards add a 1px border | canvas elevation (RC-224) |
| `--radius-button` / `-notice` / `-card` / `-pill` | 4 / 5 / 8 / 999 px | — | RC-225 |
| `--control-h-sm` / `--control-h` / `-lg` / `--target-min` | 32 / 40 / 48 / 44 px | — | canvas 40px controls |
| `--container-max` / `--gutter` / `--section-gap` / `--panel-pad` | 1120 / 24 (16 phone) / 52 / 24 px | — | RC-222 |

Tier 1c maps Bootstrap's `--bs-*` onto these, each `-rgb` triplet written from the same hex in both themes (`--bs-primary-rgb` 37, 14, 98 / dark 185, 163, 245; link 75, 42, 165 / 196, 178, 247; success 7, 125, 60 / 95, 214, 138; warning 137, 84, 0 / 240, 181, 90; danger 180, 35, 24 / 255, 138, 128; info 21, 107, 181 / 140, 196, 245; secondary 97, 97, 97 / 184, 180, 194).

### Contrast (WCAG 2.2 AA; text 4.5:1, non-text 3:1)
| Pair | Light | Dark |
|---|---|---|
| Body text on page / card | 11.8 / 12.4 | 15.4 / 13.9 |
| Heading on card | 10.7 | 16+ |
| Muted text on card / page | 4.8 / 4.6 | 7.0 / 7.7 |
| Muted text on `--surface-3` | 4.3: **not used** (neutral `#616161` there, 5.5) | — |
| Link / accent on page; on Brand soft | 9.2; 8.5 | 9.6; 7.8 |
| White on Brand strong (primary button, footer) | 15.9 | dark text on lilac 8.4 |
| Footer body (white 60 %) on Brand strong | 6.4 | 6.4 |
| Status text on its tint: success, warning, danger, info, neutral | 4.8, 5.8, 5.5, 4.9, 5.5 | 7.8, 7.9, 6.6, 7.9, 7.3 |
| Field edge (`--border-control`) on card / page | 4.8 / 4.6 | 4.9 / 5.4 |
| Focus ring on card | 9.7 | 8.7 |
| Chart series 1 – 5 on card | 9.7, 4.7, 5.3, 5.2, 5.5 | 7.6, 7.3, 7.2, 5.4, 12.5 |

## Status → colour
Unchanged from `design-system-v3.md` (*Status → colour*, with the v07 Finance rows), each tone now drawn from the v4 tokens: `success`, `warning`, `danger`, `info`, `secondary` (neutral) as text on their canvas tint, pill-shaped; `primary` chip = Brand primary on Brand soft; the hold chip (`.badge-hold`: Blocked, Interim design) = warning text on the warning tint with the warning-strong edge. The *Finance stub* tag is retired (v07). Rows are never coloured by status (D-249).

## Content · Platform · States
- **Content:** `en-SG`, `SGD`, `D MMM YYYY`, `clear and brief`.
- **Platform:** `desktop`, viewports 375, 1280.
- **States** (brief `design.states`): `empty`, `error`, `success`, `disabled` (no `loading`), as in v07.

## Components (usage; markup as v07 unless stated)
- **Shell:** sticky white 64px header with the canvas shadow; brand = `<a class="navbar-brand brand" href="index.html"><span class="brand__tile" aria-hidden="true">C</span><span class="brand__mark">CC-Demo</span></a>` *(v08: the tile is added on every page in p4-01)*; `.app-nav` grey 14px items, the current page Brand primary with a 1px underline; role avatar, Launcher, theme toggle on the right; menus radius 4 with the canvas shadow.
- **Footer:** `footer.site-footer` Brand strong band; the wordmark in League Gothic; the CC-Demo watermark is CSS (`::after`, decorative), so the markup is unchanged; text "Version 8" *(p4-01)*.
- **Buttons:** `.btn-primary` (Brand strong), `.btn-outline-secondary` (white, `--border-control` edge, Brand soft on hover), `.btn-alt` / `.btn-outline-alt` (card buttons, Brand primary), `.btn-danger`, `.btn-link`; 40px, 16px bold; one filled per view; primary last in its row.
- **Fields:** 40px, white, `--border-control` edge; focus = focus-border colour inside the 2px Brand primary ring; errors under the field in `--danger`; required mark in `--danger`.
- **Tables:** in `.table-wrap` on a white panel with the panel glow; caption headers (12px bold, muted) on the page tint; 1px dividers; alternating shading (D-249); Brand soft hover; text left, numbers right; record ID in bold as the link; phones: label-left, value-right cards.
- **Badges and chips:** pill, 12px bold, status text on its tint; `.slot-chip` (and the availability, tee-time and room picks) as canvas time-slot chips, selected = Brand soft with the Brand primary edge (RC-230).
- **Journey rail:** the canvas stepper: 28px numbered circles, done = filled Brand primary, current = Brand soft with the Brand primary edge, problem = danger tint with the danger-strong edge; compact dots in list columns.
- **Cards and KPIs:** `.card` white, radius 8, glow; `.kpi__label` / `.kpi__value` (28px black) / `.kpi__note`; at most 4 per row.
- **Notices:** `.alert-*` text on its tint, radius 5, no border; `.alert--strip` with a 4px status edge; `.blocked-panel` on the danger tint; toasts on the success or danger tint with the menu shadow.
- **Launcher (`custom`, `frontend-design` inside the canvas):** League Gothic headline (`.lead-title`); `.launch-acc` sections in the card look; module cards with the icon in Brand primary and `.btn-outline-alt` *Module details* + `.btn-alt` *Start first scenario*; no photos (RC-211, RC-212).
- **Scenario guide panel:** unchanged behaviour; the dialog shadow and 50 % scrim; the current step `.guide-step--here` (Brand primary edge on Brand soft) (RC-231).
- **Charts:** inline SVG, series tokens 1 – 5, the second line dashed, every series labelled; axis labels 12px muted, grid in the divider colour.
- **Icons (RC-221):** the house inline SVG set redrawn in the **Phosphor regular** style (1.5px-equivalent stroke on a 256 grid scaled to 20px, round caps and joins, `currentColor`, `aria-hidden="true"`; Phosphor is MIT-licensed: shapes drawn after it, no file or font loaded) in `p4-01`; Brand primary beside headings.

## Interaction states
| Component | Hover | Active / selected | Focus-visible | Disabled |
|---|---|---|---|---|
| Primary button | Brand hover `#1F0B54` | Brand hover | 2px Brand primary ring, 2px offset | Bootstrap 65 % opacity, with a line saying why |
| Outline button | Brand soft fill, Brand primary text and edge | the same | ring | 65 % opacity |
| Card button (`.btn-alt`) | Brand strong | Brand strong | ring | — |
| Nav link | Brand primary | Brand primary, bold, 1px underline | ring | — |
| Field | — | focus border inside the ring | ring | disabled fill `#EEEEEF` |
| Table row | Brand soft | `.is-selected` Brand soft | ring on the link | — |
| Card (linked) | glow 9 % | — | ring | — |
| Chip / option tile | Brand primary edge | Brand soft, Brand primary edge and text | ring | — |
| Accordion header | — | open: Heading text | ring | — |

## Changes during the build (p4-01, p4-02; D-405, cosmetic, no re-sign-off)
- **Tee sheet:** the Morning and Afternoon tables share fixed column widths (`.table--tee`).
- **No sideways scrolling:** table cells wrap (dates, status, actions); `.table-wrap--cards` tables are cards up to 991px; the Facilities availability grid and the resort rooms × nights grid use fixed compact columns; long report names wrap (`.table--names`); empty-table messages fill the table width.
- **Row actions:** inline buttons ending on the cell's right edge, wrapping whole; repeated row actions are outline buttons (one filled button per view).
- **Targets:** checkboxes and switches 24px; record links in tables 25px tall (WCAG 2.5.8).
- **Header:** for a role with 7+ menu items, the role name is visually hidden beside its initials at 1200px+ (still read out), so the header stays one row.
- **Labels:** form labels 16px bold (canvas).
