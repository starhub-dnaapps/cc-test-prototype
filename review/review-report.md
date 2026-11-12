> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Review report (p5-01): CC-Demo full build v08 (NEARCC look, all seven modules)

> KO-037 · 2026-11-12 · against **PRD v9** (141 stories, 238 scenarios, unchanged from PRD v8; §5.2 empty) · matrix: `traceability-matrix.md` · p4-02: `a11y-responsive-check.md` (full regression of all 57 page states in both themes; no open failures; no UI rule exceptions). The v07 review (`output/full-build-v07/review/review-report.md`) is history; this report covers the whole club system across all seven modules, with the changes since v07 marked.

## Summary
| Measure | Result |
|---|---|
| Must-have stories met | **119 / 119 (100 %)**, unchanged from v07 |
| Should-have stories met | **22 / 22**, unchanged |
| Deferred stories | none |
| Business rules | 178, unchanged (`rules.js` not changed; self-check 351 / 351) |
| Workflow transitions | every v01 – v07 transition unchanged (`workflow.js` not changed); the controls whose markup changed were clicked through: Publish (Golf administration), Apply (Function rooms), Prepare (Refunds), Bowling import, the Facilities and tee-sheet slot chips, Open stay (Resort front desk): each still runs its transition or opens its page |
| Look (KO-037) | design system v4 from the NEARCC Brand Guideline canvas on every page, no StarHub value, logo or kit token (D-393, D-402); both themes |
| Layout and accessibility | alignment 342 / 342 (Layout-01 – 15, both themes, 1280 / 768 / 375); axe-core 114 / 114 (WCAG 2.2 A/AA); static site pass; no sideways scrolling at 1280 / 1024 / 768 / 375 (D-405); tee-sheet columns aligned (D-405) |
| Visual review | 8 key screens × light and dark × 1440 and 375 pass (`review/visual-v08/`) |
| ⚠ User overrides to check | none in this build |

## Changes since v07
- **Look:** `styles.css` rebuilt on the current `base.css` with the canvas tokens; Lato + League Gothic; the C monogram tile; the League Gothic footer watermark; Phosphor-style icons; canvas cards (glow), radius 4 / 5 / 8 / pill, 1120 content width; the journey rail as the canvas stepper; slot chips; `styleguide.html`.
- **Tables:** Layout-06 without exception (D-248 retired); cells wrap and tables become cards below 992px, so nothing scrolls sideways; tee-sheet Morning and Afternoon tables share their column widths.
- **One filled button per view:** repeated row actions are outline buttons; the Bowling import is secondary.
- **Unchanged:** every requirement, rule, workflow, data record, screen and label (D-395); the brief stays frozen at SO-047.
- **Dropped:** none (D-391).

## Gaps
None found. Every story, rule and transition is met as in v07, and p4-02 left no open failure.

## Deviations from the PRD
- None in behaviour. Known limits unchanged from v07 (D-382).
- Observation kept, not changed (v07, D-382): the Portal Facilities section shows "That time has passed (BR-089)" when it opens.
- Copy kept as in v07 (RC-229): date columns marked as numbers stay right-aligned; BR- references stay in rule messages.

## Recommendation
**Ready for demo.** No gaps; accept the review.
