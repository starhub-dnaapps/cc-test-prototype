> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Responsive, accessibility and alignment check: CC-Demo full build v08 (NEARCC look, all seven modules)

> p4-02 after SO-047 (`signoff-v11.md`) · 2026-11-12 SGT · served from the repo root (`python -m http.server`, testing only; the prototype itself opens from `file://`), checked in the browser pane with frames named for their role tab (`align-run.js` and `axeRun()` with the frame named from the role). **Full regression (KO-037 prompt): all 57 page states** (55 pages with their first role, one financial event, `styleguide.html`), both themes. The v07 record is in `a11y-responsive-check-v7.md` (history).

**Result:** no open failures and no UI rule exceptions (D-248 retired: every table follows Layout-06). 11 issues found and fixed in this run, two of them from your instructions during the build (D-405).

## Changes since v07 (what this run covers)
- **Look on every page:** design system v4 (`design-system-v4.md`): `styles.css` rebuilt on the current `base.css`; Lato + League Gothic; the C monogram tile in every header; footer "Version 8" with the League Gothic watermark; Phosphor-style icons (theme, open in new tab, 7 module icons, members, gate check / x / clock); slot chips on the Facilities availability grid and the tee sheet; one filled button per view (row actions as outline buttons on Golf administration, Function rooms, Resort front desk, Refunds; *Import the sample export* on Bowling as secondary); `styleguide.html` (new, not linked).
- **User instructions during the build (D-405):** the tee sheet's Morning and Afternoon tables share fixed column widths; content scales to the window with no sideways scrolling.
- **No logic change:** `rules.js`, `workflow.js`, `store.js` unchanged; `app.js` only class names and icon paths; self-check 351 / 351.

## Fixes applied in this run
| # | Where | Check | Found | Fix |
|---|---|---|---|---|
| 1 | Row actions with two buttons (Configuration, Events, Resort front desk, Portal and others) | Layout-06 | Buttons in a flex cluster ended 10 – 13px short of the cell edge (measured as text) and stacked | Row-action buttons are inline blocks ending on the right edge, wrapping whole |
| 2 | Mobile card view (375px) | Layout-06 | Long dates and amounts ran past the card edge; action buttons stayed left | Values wrap inside the card; actions end on the right |
| 3 | Facilities blocks | Layout-06 | *From – to* date marked as a number (right) | Text, left |
| 4 | Report definitions, Portal | Layout-07 | Card parts not lined up (a two-line legend; legend size) | Subgrid rows; labels 16px bold (canvas) |
| 5 | Portal events | Layout-13 | Two card-view tables as siblings measured against each other | Each table with its heading in its own group |
| 6 | Style guide | Layout-04, 13 | Primary not right-most when the row wrapped; chips measured as text | Buttons in two rows; chips inline |
| 7 | Member 360, Approvals, Facility bookings, Resort front desk | axe target-size (WCAG 2.5.8) | Checkbox 16px; record links 19px tall | Checkboxes and switches 24px; record links 25px tall |
| 8 | Officer and other long role menus at 1280px | Visual | Header wrapped to two rows | The role name is visually hidden beside its initials when the menu has 7+ items (still read out) |
| 9 | Golf tee sheet (user, D-405) | Visual | Morning and Afternoon columns different widths | Shared fixed column widths |
| 10 | 35 tables at 768 – 1280px (user, D-405) | Visual | Tables scrolled sideways | Cells wrap; card view up to 991px; availability and rooms grids with fixed compact columns; long legacy report names wrap |
| 11 | Empty tables | Visual | The empty message only 75ch wide inside a wide table | Fills the table width |

## Checks
| Check | Result |
|---|---|
| Alignment (`align-check.js`, Layout-01 – 15), **57 page states × 1280 / 768 / 375 × light and dark (342 runs)** | Pass (342 / 342) |
| Accessibility scan (axe-core 4.10.2, WCAG 2.2 A/AA), **57 page states × light and dark (114 runs)** | Pass (114 / 114, no violations) |
| No sideways scrolling: every `.table-wrap` and the page, 57 page states × 1280 / 1024 / 768 / 375 | Pass (0 overflowing) |
| Paired tables line up (same headers on one page) | Pass (tee sheet, admissions pool / gym, resort desk lists) |
| Static site (`static-check.mjs`): no inline styles or `<style>`, no external URL, `fetch`, module or font service, only `vendor/bootstrap*`; opens from `file://`; one HTML file per screen | Pass |
| Fonts | Lato and League Gothic from `assets/fonts/` only (SIL OFL), system stack behind them |
| Self-check (`checks.html`) | 351 / 351 |
| Contrast (token pairs, both themes) | Pass (`design-system-v4.md`); muted text never on `--surface-3` |
| Keyboard | Focus ring 2px Brand primary (dark: lilac) visible on every control, links included; tab order unchanged |
| Scenario guide | Unchanged steps (67 scenarios); panel restyled; opens beside the page at 1200px+ |
| Brief tags (`data-scenario`, `data-state`) | Unchanged from v07 |

## Visual review (`product-ui-design` checklist; `review/visual-v08/`, 8 key screens × light and dark × 1440 and 375)
| Screen | Hierarchy | One primary | Consistency | Alignment / density | States | Copy | Colour | Focus / touch | Mobile |
|---|---|---|---|---|---|---|---|---|---|
| Launcher | Pass | Pass (one per card) | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Request detail | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Report | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Tee sheet | Pass | Pass | Pass | Pass (fix 9) | Pass (fix 11) | Pass | Pass | Pass | Pass |
| Event | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Facility booking | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Resort front desk | Pass | Pass (fix: row actions outline) | Pass | Pass (fix 10) | Pass | Pass | Pass | Pass | Pass |
| Finance home | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Pass |

Copy observations, not changed (RC-229, v07 wording kept): date columns marked as numbers are right-aligned as in v07 (Layout-06 accepts them); BR- references stay visible in rule messages as in every earlier version.
