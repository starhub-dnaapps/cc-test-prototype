> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Responsive, accessibility and alignment check v3: CC-Demo full build v01 (history: v01 review, copied unchanged) (design pass 3)

> KO-029 · p4-02 on the build made after SO-032 (`signoff-v3.md`) · 2026-11-06 14:47 SGT · `output/full-build/mockups/` served from the repo root, checked in the browser pane. Runs 1 and 2 (the archived build) are in `_archive/2026-11-06-1424/review/`.

**Result:** no open failures. One accepted UI rule exception (Layout-06, D-248). 4 issues found and fixed in place. One check could not be run as written (real key presses), see *Keyboard*.

## Fixes applied
| # | Screen | Check | Found | Fix applied (shared file) |
|---|---|---|---|---|
| 1 | New request (renewal), Portal | Layout-07, Layout-04 | Option tiles: the hidden radios were grid items (13px "cards"), and the tiles were `.btn`, so they were measured against the 40px buttons | Each radio and label wrapped in one `.option`; tiles styled as `.option-tile` (not `.btn`) in `styles.css`; `packageTiles()` in `app.js` |
| 2 | Every dialog | Keyboard (focus return) | After Escape, focus did not go back to the button that opened the dialog (dialogs are opened by script) | `ask()` in `app.js` remembers the opener and focuses it when the dialog is hidden |
| 3 | Every page | Keyboard (focus visible) | Focus ring relied on Bootstrap's own styles only | One `:focus-visible` ring in Iris (3px, 2px offset) for every control and option tile in `styles.css` |
| 4 | Every page | Copy (design direction) | 17 dot-joined strings in `app.js` (meta lines, timeline, previews) | Commas instead; page titles keep "<Screen> · CC-Demo" (feature 157) |

## Scenario walkthrough (all 15 demo scenarios; S1 – S8 inside them)
Driven page by page in the browser (forms filled, buttons and dialogs used), fresh data before each scenario, each step in its own role tab.

| Scenario | Checks | Result | Covers |
|---|---|---|---|
| SC-01 New application, return, payment | 12 | 12 pass: RQ-1019 Pending Documents → docs → Return refused without a reason (BR-176) → returned (journey problem step) → edited and resubmitted → approved → S$60,000 hand-off → STUB-0004 → SV10030 active from 1 Nov 2026 with a card → found in Members → referral reward and member events in the feed | S1, S2, S6 |
| SC-02 Application gates | 5 | 5 pass: BR-002, BR-003, BR-007, BR-171 blocked; RQ-1018 shows no decision buttons for its creator (BR-005) | S5 |
| SC-03 Portal renewal | 5 | 5 pass: 2-year tile → Pending Approval → S$2,280 → failed payment keeps 7 Dec 2026 (problem step) → recorded → 7 Dec 2028; TH10008 over the 30-year cap, 1 year previews 1 Dec 2027 | S3 |
| SC-04 Conversion, extension routing | 5 | 5 pass | |
| SC-05 Transfer, deceased refund | 5 | 5 pass | |
| SC-06 Absent and medical | 4 | 4 pass | |
| SC-07 Suspension, reinstatement, withdrawal | 7 | 7 pass (badges rechecked on Member 360) | |
| SC-08 Lifecycle, junior watch, rejoin | 3 | 3 pass | S4 |
| SC-09 Nominees, classification | 4 | 4 pass | |
| SC-10 Member 360 | 8 | 8 pass | |
| SC-11 Communications, configuration, feed | 5 | 5 pass | |
| SC-34 Launcher and role tabs | 3 | 3 pass (Member tab on Approvals sees only the blocked panel) | S7 |
| SC-35 Module details and Start | 3 | 3 pass (Start SC-01 opens the Officer tab with the guide at step 1) | S8 |
| SC-63 Planned modules and demo data | 4 | 4 pass (export taken from the store, import restores, wrong file refused, reset) | |
| SC-64 End of absent period | 1 | 1 pass | |

**Total: 74 / 74 checks pass.** Two harness mistakes (a selector and a test address equal to the seed value) were re-run correctly; neither was a prototype fault. The Export button's file download itself was not clicked (it saves a file); its content was taken from the same store call it uses.

## Responsive (375, 768, 1280px)
| Screens | No horizontal scroll at 375 | Menu below 992 | Touch targets ≥ 44px at 375 (buttons, toggler, option tiles) | Lato loaded |
|---|---|---|---|---|
| All 13 screens and a returned request (14 states) | Pass | Pass | Pass (0 smaller) | Pass |

## Accessibility (WCAG 2.2 AA)
| Check | Result |
|---|---|
| Landmarks `header`, `nav`, `main`, `footer`; native `button`, `a`, `input` only (0 clickable divs); `th scope` | Pass |
| Labels on every input; option tiles are real radios with labels inside a `fieldset` with a `legend` | Pass |
| Errors under their field, `role="alert"`; dialog reason errors with `aria-describedby` | Pass |
| One `h1` per page, no skipped level; the request page's rail has a hidden `h2` "Request journey" | Pass |
| Journey rail: an `ol` with `aria-current="step"`; the compact rail `role="img"` with an `aria-label` ("Step 4 of 5: Payment") and a `title` | Pass |
| Status never by colour alone (badges and the journey line carry words) | Pass |
| Decorative icons `aria-hidden`; charts and QR `role="img"` with labels | Pass |

### Keyboard
| Check | Result |
|---|---|
| Tab order follows the reading order (wordmark, nav links, Launcher, theme toggle, then the page's actions); no positive `tabindex` | Pass (request detail, Approver) |
| Dialogs: focus moves into the dialog, Escape closes it, focus returns to the opening button | Pass after fix 2 |
| Visible focus on every control | Pass after fix 3 (rule present: 3px Iris outline) |
| Real key-press walkthrough (Tab through a whole scenario) | **Not run:** the browser pane was hidden and cannot take key presses; the checks above were made by script. A manual Tab-through is recommended before the review |

## Light and dark themes
| Check | Result |
|---|---|
| Toggle in every header; opens light; remembered in `ccdemo-theme` | Pass |
| Text contrast of every visible text element, 14 states × light and dark | **28 / 28 pass** |
| Every colour in `styles.css` is a `design.tokens.color` value of `design/brief.json` | Pass |

## Static site
No external `src`/`href`, `@import` or remote `fetch`; `@font-face` only from `../assets/fonts/`; no font file elsewhere; no inline styles; no router. `vendor/`: Bootstrap 5.3.3 (css, bundle, LICENSE, VERSION.md). `assets/fonts/`: Lato 400 / 700 / 900, OFL.txt. One file per screen; data from `data/seed.js`.

## Brief tags (`design/brief.json`, checker **ready**)
S1 – S8 each on the pages of the step table (S1 application, approvals, request; S2 members, member, request; S3 portal, approvals, request; S4 dashboard, member; S5 approvals, request; S6 requests, request; S7 approvals; S8 index, application). States `empty`, `error`, `success`, `disabled` tagged in pages and `app.js`.

## Scenario guide
19 role and page pairs × 1280 and 375px = **38 / 38 pass** (panel open, title `<id>:`, a step *On this page*, `align-check.js` passes with the panel open apart from the Layout-06 exception).

## Alignment (Layout-01 to Layout-13)
18 page states × 1280, 768 and 375px = 54 runs (index, dashboard, members, member 360, new application, new request renewal and absent, requests, request detail RQ-1011 and RQ-1001, approvals and its Finance stub tab, communications, configuration, portal, integration feed, blocked panel, `checks.html`).
- **Every rule except Layout-06: 54 / 54 pass** (after fix 1).
- **Layout-06: exception (D-248)** on every page with a table: cells are left-aligned and numbers right-aligned by design (guideline tables), so `align-check.js` reports them "off centre".

## Self-check
`checks.html`: **77 run, 77 passed, 0 failed** (logic files reused from the archive, unchanged).

## Evidence
Screenshots could not be taken this run (the browser pane was hidden). The walkthrough and measurements above are the evidence; screenshots can be added when the pane is visible.
