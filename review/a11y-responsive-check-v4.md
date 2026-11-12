> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Responsive, accessibility and alignment check v4: CC-Demo full build v01 (history: v01 review, copied unchanged) (tables redone)

> KO-029 · p4-02 after SO-033 (`signoff-v4.md`: PRD v2, tables redone, RC-102) · 2026-11-06 15:04 SGT · served from the repo root, checked in the browser pane (visible this run). Supersedes `a11y-responsive-check-v3.md`, whose scenario walkthrough (74 / 74) still stands for the parts not changed here.

**Result:** no open failures; one accepted UI rule exception (Layout-06, D-248). The real keyboard walkthrough was done this run. 5 issues found and fixed.

## What changed in the build
- **Tables (D-250):** status tint and left marker removed; alternating shading only (feature 151 amended, D-249); 48px rows; Lilac mist highlight on hover and keyboard focus inside a row; the ID is the link, so the Open / View columns are gone from the request lists (dashboard queue, Requests, Approvals, Member 360 Requests tab, portal My requests) and the Members list; row buttons stay where the action differs (Finance stub list, Vehicles, Configuration, launcher member tabs).
- Story-040 removed (PRD v2).

## Fixes applied in this run
| # | Screen | Check | Found | Fix applied (shared file) |
|---|---|---|---|---|
| 1 | Launcher (Module details), Member 360, Approvals, Configuration | Section spacing (user request) | Bootstrap shows the active tab pane with `display: block`, which cancelled the `.stack` gaps: Workflow, Roles, Rules and Scenarios touched | `.tab-content > .tab-pane.stack.active { display: flex }` in `styles.css`; Module details grouped heading + content, 32px between groups, 16px inside (measured) |
| 2 | Every page, 992 – 1199px | Header | The nav and the role avatar wrapped onto two lines | Menu collapses below 1200px (`navbar-expand-xl`) |
| 3 | Buttons, menu toggle, tabs, accordion | Visible focus | Bootstrap sets `outline: 0` on these, so the Iris ring did not show | The ring added for `.btn`, `.navbar-toggler`, `.nav-link`, `.accordion-button` |
| 4 | Configuration | Table rows | Row action buttons wrapped (97px rows) | Row action clusters stay on one line |
| 5 | Request detail | Copy | A stray comma after the status badge ("Pending Approval , …") | Badge and name separated by a space |

## Checks
| Check | Result |
|---|---|
| Alignment, 18 page states × 1280 / 768 / 375 (54 runs) | 54 / 54 pass on every rule except **Layout-06 (exception, D-248)**; the 4 tabbed pages re-run after fix 1: 18 / 18 |
| Text contrast, 14 states × light and dark, measured on the painted cell (alternating rows included) | **28 / 28** |
| Alternating shading present (light and dark) | Pass on every list table; rows 50px |
| Phone width 375: no horizontal scroll, menu button, touch targets ≥ 44px, Lato | 14 / 14 |
| Scenario guide, 19 role and page pairs × 1280 and 375 | **38 / 38** |
| Static site (no external URL, fonts only in `assets/fonts/`, no inline styles) | Clean |
| Brief (`design/brief.json`, PRD v2) | ready |
| Self-check `checks.html` | **77 / 77** |

## Scenario walkthrough (tables)
SC-01, SC-03 and SC-10 again, opening records through the ID links: **9 / 9 pass** (approvals list → request; Members → Member 360; portal My requests → request; dashboard queue IDs; Vehicles keep Retire; Member 360 Requests tab links; credit S$3,800; SV10030 with STUB-0004; KD10004 to 7 Dec 2028). The other scenarios use no list-table actions and stand from v3 (74 / 74).

## Keyboard (real key presses this run)
| Step | Result |
|---|---|
| Dashboard, Tab from the top: wordmark, menu button, Run lifecycle check, then the queue IDs and member links in reading order | Pass |
| Focus visible on links (3px Iris), on buttons (after fix 3), and the focused row highlighted in Lilac mist | Pass |
| Enter on a focused request ID opens the request | Pass |
| Request RQ-1001 as the Approver: Tab to Return for correction, Enter opens the dialog with focus inside, Escape closes it, focus back on the button | Pass |

## Evidence
`artifacts/screenshots/`: `full-build-v01-dashboard-keyboard-focus.jpg` (focus ring and row highlight), `full-build-v01-request-journey-rail.jpg` (journey rail, focused button), `full-build-v01-portal-375.jpg` (portal on a phone).
