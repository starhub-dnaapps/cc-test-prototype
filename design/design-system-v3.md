> Build: full-build · Version: v08 · KO: KO-037 · from v07

> **In v08:** superseded by `design-system-v4.md` (KO-037). Kept as history.

# Design System v3: CC-Demo full build v02

> **v07 (KO-035):** design pass 3 kept unchanged (D-369); Finance components (v07) added below, built from the Golf, Events, Facilities and Resorts patterns; no new colour or font; one new pattern, the *Interim design* note (D-371). *(confirmed: D-378, D-379)*

> **v06 (KO-034):** design pass 3 kept unchanged (D-346); Resorts components (v06) added below, built from the Golf, Events and Facilities patterns; no new colour or font; one new pattern, the *Draft – for validation* note (D-348). *(confirmed: D-357)*

> **v05 (KO-033):** design pass 3 kept unchanged (D-323); Facilities components (v05) added below, built from the Golf and Events patterns; two new rules in `styles.css` (the availability grid's sticky resource column; record IDs never wrap); no new colour or font. Mockup review round 1 (D-333): Golf dropdown in the Manager and Administrator headers, IDs on one line, multi-hour chips, Approve before Reject in Approvals.

> **v04 (KO-032):** design pass 3 kept unchanged (D-302); Events components (v04) and the catalogue export buttons added below; no new colour.

> **v03 (KO-031):** design pass 3 kept unchanged (D-282, keep list 98 – 102): tokens, type, shell, tables, reporting components. Layout base already current (`base.css` unchanged since v02); `vendor/` kept (Bootstrap 5.3.3, not upgraded). Golf components (v03) added below; no new colour. The launcher card button *Open guide* becomes **Module details** (D-285).

> **v02 (KO-030):** design pass 3 kept unchanged (D-259, keep list 77 – 80): tokens, type, shell, tables (D-250, alternating shading only), Layout-06 exception (D-248). The layout base (`base.css` sections 2 – 4) is current: `agent/reference/ui/base.css` has not changed since v01 was built. `vendor/` kept as copied (Bootstrap 5.3.3, never upgraded in a refine). v02 adds only the reporting components below, marked **(v02)**, built from existing tokens and classes; no new token.

> KO-029 · design pass 3 (RC-101, D-247, D-248) · the direction is `design-direction.md` (approved) · `mockups/css/styles.css` · every colour from the **NSRCC Brand Guideline** design canvas (claude.ai artifact) · replaces design systems v1 and v2 (archived in `_archive/2026-11-06-1424/design/`).

## Design direction
Summary of `design-direction.md` (approved, D-247; tables refined at RC-102, D-250): the membership back office of a club, where every change passes documents, a second person's approval and a payment. **Memorable element:** the request journey rail (the guideline's stepper) showing Draft → Documents → Approval → Payment → Done and who acts next, full width on request detail and compact in every request list. **Type:** Lato only, 32 / 24 / 20 / 16 / 14 / 12. **Colour principle:** purple marks action and place only; status is the guideline's text-on-tint pairs with words. **Layout:** quiet white launcher (Story-037 sections and cards), guideline shell (white header with the role avatar, Night footer), content on one left edge. **Copy voice:** plain, sentence case, the same action name through a flow, the journey line always says who acts next. **Review:** six defaults dropped (hero band, number-tile hero, eyebrows, dot-joined meta strings, one radius everywhere, centred tables).

**UI rule exceptions:** Layout-06, tables left-aligned with numbers right-aligned, following the guideline (D-248); `p4-02` records the matching `align-check.js` results as this exception.

**Defaults used / overridden:** `default-design.md` → `starhub` · `web` · `light+dark` · en-SG · SGD · D MMM YYYY · clear and brief · scenario guide on (KO-029). Colours, radii, shadows, type and components overridden by the NSRCC Brand Guideline canvas (instruction during the run, D-239 → D-247); Lato (D-240); two contrast adjustments (D-241, D-242); wordmark "CC-Demo" in text (no logo file). Dark theme derived.

**UI library:** Bootstrap 5.3.3, local copy in `mockups/vendor/` with `bootstrap.bundle.min.js` (offcanvas, modal, tabs, accordion, collapse, dropdown, toast).
**Fonts:** Lato 400 / 700 / 900, Latin woff2, `mockups/assets/fonts/` with `OFL.txt`; relative `@font-face`, `font-display: swap`, system stack fallback.

**Layout:** `--container-max` 1200px, gutter 24px (16px below 768px); 2-column `.form-grid` (1 below 768px); tables left-aligned (Layout-06 exception); card types *icon and title · summary · meta · buttons* (module), *role · description · Open tab* (role), *label · value · note* (KPI, at most 4 a row), *title · form* (portal); charts 260px (Layout-11); journey rail 5 columns (one column on phones); header and footer content on the page container (Layout-10).

**Content:** en-SG · SGD · D MMM YYYY · clear and brief. **Platform:** primary desktop, viewports 375 and 1280; the portal phone-first.

## Tokens
| Token | Light | Dark | Source |
|---|---|---|---|
| `--brand-primary` (Night: primary buttons, footer, digital card) | `#250E62` | `#B9A3F5` | Brand strong / derived |
| `--brand-primary-hover` (Dusk) | `#1F0B54` | `#CDBDF8` | Brand hover / derived |
| `--brand-on-primary` | `#FFFFFF` | `#16131F` | guideline / derived |
| `--brand-accent` (Iris: links, active nav, icons, selection, journey rail) | `#4B2AA5` | `#C4B2F7` | Brand primary / derived |
| `--brand-soft` (Lilac mist: selected tint, role avatar) | `#F1EEFB` | `#2B2342` | Brand soft / derived |
| `--brand-alt` / `-hover` (card buttons, Story-037) | `#4B2AA5` / `#250E62` | `#9F86F0` / `#B9A3F5` | Brand primary, strong / derived |
| `--brand-secondary` (Graphite: headings and body) | `#3E3E3E` | `#ECEAF2` | guideline / derived |
| `--surface` (Pearl: page, table header) / `--surface-2` (cards) / `--surface-3` (secondary) | `#FAF9FB` / `#FFFFFF` / `#F1F2F4` | `#16131F` / `#211C2E` / `#1B1726` | guideline / derived |
| `--text-muted` / `--text-planned` / `--nav-text` | `#6F7279` / `#5F6268` / `#727272` | `#ABA6B8` / `#ABA6B8` / `#B8B4C2` | guideline (planned D-241) / derived |
| `--border` / `--border-input` / `--border-strong` / `--row-divider` / `--focus-border` | `#DEDFE3` / `#E0E0E0` / `#C4C4C4` / `#EBEBEE` / `#CDB8EF` | `#3A3448` / `#4A4358` / `#5A5268` / `#2E2839` / `#9F86F0` | guideline / derived |
| `--footer-bg` / `--footer-text` / `--footer-muted` | `#250E62` / `#FFFFFF` / `#DCD6EC` | same | guideline footer / derived tint |
| `--success` / `--success-bg` | `#077D3C` / `#E6F9EE` | `#5FD68A` / `#15301F` | Success (D-241) / derived |
| `--warning` / `--warning-bg` | `#895400` / `#FFF5E6` | `#F0B55A` / `#33280F` | Warning / derived |
| `--danger` / `--danger-bg` | `#C4050F` / `#FFE7E9` | `#FF8A80` / `#3A1E24` | Error / derived |
| `--info` / `--info-bg` | `#156BB5` / `#E9F3FA` | `#8CC4F5` / `#132A3D` | Info / derived |
| `--neutral` / `--neutral-bg` | `#616161` / `#F1F2F4` | `#B8B4C2` / `#2A2536` | neutral / derived |
| `--chip-primary-bg` / `-border` | `#F0EBFB` / `#B994FF` | `#2B2342` / `#6F5BB5` | booking chip Online / Staff |
| `--chip-hold-bg` / `-border` | `#FFF3DF` / `#FFB45C` | `#33280F` / `#8A6A2E` | booking chip On hold |
| `--tag` / `--tag-bg` | `#B02561` / `#FDE8F0` | `#F28DB8` / `#3A2030` | Transaction tag |
| `--alert-bg` / `--alert-border` / `--alert-title` | `#FFE7E9` / `#FF1D2E` / `#C4050F` | `#3A1E24` / `#FF8A80` / `#FF8A80` | Maintenance banner |
| `--qr-bg` / `--qr-fg` | `#FFFFFF` / `#141414` | same | fixed so the QR reads |
| `--shadow-soft` / `--shadow-header` / `--shadow-toast` | 0 0 30px 5% / 0 2px 12px 6% / 0 8px 22px 12% black | 40% / 1px border line / 50% | guideline |
| `--font-family` | Lato, then the system stack | same | guideline (D-240) |
| `--radius-button` / `--radius-card` / `--radius-banner` | 4px / 8px / 12px | same | guideline |

**Contrast (WCAG AA, computed):** light: body 10.2:1 (page) and 10.7 (card); muted 4.6 – 4.8; nav 4.8; links and Iris text 9.7; primary button 15.9; card buttons 9.7; footer 15.9 / 11.3; badges on tints: success 4.8, warning 5.8, danger 5.3, info 4.9, neutral 5.5, primary chip 8.3, hold chip 5.7, Finance stub 5.5; avatar initials 8.5; journey numbers 9.7 (Iris) and 6.2 (error); planned card 5.5. Non-text: compact rail upcoming dots in `--text-muted` (4.8:1; the guideline's `#C4C4C4` is 1.7:1, kept only on the full rail, whose labels carry the state). Dark: every text pair 6.6:1 or more.

## Status → colour (badges and the journey rail only; rows are never coloured by status, D-249)
| Entity | Status | Tone | Journey step |
|---|---|---|---|
| Request | Draft | secondary | 1 Draft (current) |
| Request | Pending Documents (also after Return for correction) | warning | 2 Documents (current; returned: problem) |
| Request | Pending Approval | info | 3 Approval (current) |
| Request | Awaiting Payment (failed payment: problem) | warning | 4 Payment (current or problem) |
| Request | Completed | success | 5 Done (all done) |
| Request | Rejected | danger | 3 Approval (problem) |
| Request | Cancelled | secondary | the step reached (problem) |
| Membership | Active / Absent, Medical / Suspended / Expired, Withdrawn, Deceased, Ended | success / info / warning / secondary | — |
| Hand-off | Pending / Confirmed / Failed | warning / success / danger | — |
| Finance stub | "Finance stub" | transaction tag | — |
| Module card | Live / Coming in v0N | success / hold chip | — |
| Golf booking **(v03)** | Confirmed / Checked in / Played / No-show / Cancelled | info / success / secondary / danger / secondary | — |
| Tee time **(v03)** | Open / Booked / Blocked / Waitlist | (none, plain) / info / hold chip with reason / warning | — |
| Waitlist entry **(v03)** | Waiting / Offered / Accepted / Declined, Expired, Cancelled | info / warning / success / secondary | — |
| Rain check **(v03)** | Available / Reserved / Redeemed / Expired | success / info / secondary / secondary | — |
| Course **(v03)** | Open / Suspended | success / danger | — |
| Golf approval **(v03)** | Pending / Approved / Rejected | warning / success / danger | — |
| Event **(v04)** | Draft / Published / Completed / Cancelled | warning / success / secondary / danger | — |
| Registration **(v04)** | Held / Confirmed / Waitlisted / Offered / Lapsed / Cancelled | warning / success / info / warning / secondary / secondary | — |
| Refund **(v04)** | Proposed / Authorised / Declined | warning / success / danger | — |
| Function room **(v04)** | Tentative / Confirmed / Cancelled | warning / success / secondary | — |
| Facility booking **(v05)** | Pending payment / Confirmed / Completed / No-show / Cancelled | warning / success / secondary / danger / secondary | — |
| Slot **(v05)** | Free / Booked / Blocked / Flagged | (plain "Book" link) / info chip with reference / hold chip with type / danger chip "Flagged" | — |
| Facility waiting entry **(v05)** | Waiting / Offered / Booked / Declined, Expired, Withdrawn | info / warning / success / secondary | — |
| Facility refund **(v05)** | Instructed / Requested / Approved / Rejected | success / warning / success / danger | — |
| Admission **(v05)** | In / Left | success / secondary | — |
| Bowling **(v05)** | Paid / Reconciled; exception Open / Escalated / Closed | info / success; warning / danger / secondary | — |
| Configuration change **(v05)** | Draft / Approved / Rejected | warning / success / danger | — |
| PT session **(v05)** | Pending policy / Confirmed / Cancelled | warning / success / secondary | — |
| Golf charge Finance status **(v03)** | Pending / Accepted / Rejected (+ "Finance stub" tag) | warning / success / danger | — |
| Role, "Submitted by you" | — | primary chip | — |

## States (brief `design.states`)
`empty`, `error`, `success`, `disabled` (no `loading`), shown as in v1: empty rows with the next action, field and rule errors, blocked panel, toasts, credit result, disabled planned buttons and blocked decisions or edits.

## Components (usage)
- **Shell:** `header.app-header.navbar.navbar-expand-lg` with `.brand__mark` "CC-Demo", `.app-nav` (role links), `.navbar-toggler` below 992px, and on the right `<span class="role-avatar"><span class="role-avatar__initials" aria-hidden="true">OL</span>Membership Officer</span>`, Launcher, theme toggle. `footer.site-footer` (Night) on every page.
- **Journey rail:** `<ol class="journey" aria-label="Request journey"><li class="journey__step is-done"><span class="journey__num">1</span>Draft</li>… <li class="journey__step is-current" aria-current="step"><span class="journey__num">4</span>Payment</li><li class="journey__step"><span class="journey__num">5</span>Done</li></ol><p class="journey__next">Waiting for an Approver to record the payment through the Finance stub.</p>`; a returned, rejected, cancelled or failed step gets `is-problem`.
- **Compact rail (list column):** `<span class="journey--compact" role="img" aria-label="Step 4 of 5: Payment"><span class="journey__dot is-done"></span>…<span class="journey__dot is-current"></span><span class="journey__dot"></span></span>` with a `title` for hover.
- **Buttons:** `.btn-primary` (Night), `.btn-outline-secondary` (guideline white), `.btn-outline-danger`, `.btn-alt` / `.btn-outline-alt` (card buttons, Iris); primary last in a `.btn-row`.
- **Option tiles:** `<input type="radio" class="btn-check" name="years" id="y2" value="2" checked><label class="btn btn-option" for="y2">2 years<br>S$2,280</label>` in a `.grid`.
- **Fields:** `.field` > `.form-label` + `.form-control` / `.form-select` + `.invalid-feedback`; rule messages in `.alert-warning` (guideline inline warning) or `.alert-danger`.
- **Tables (redone at RC-102, D-250):** the guideline booking table. `.table-wrap.table-wrap--cards > .table`; rows 48px with `#EBEBEE` dividers; header on Pearl, 14px bold; **alternating row shading** (Pearl on white; dark: `--surface` on `--surface-2`), the only row colour (feature 151 amended, D-249); text left, `.num` right (Layout-06 exception, D-248); the first column's ID in bold Iris **is the link** that opens the record, so list tables have no Open column; row buttons (`.col-actions`, right) only for distinct actions (Retire, Record payment, Delete, Open tab); hover and keyboard focus inside a row: Lilac mist highlight; status only by the `.col-status` badge and the journey column; phones: each row a card, label above value.
- **Badges and chips:** `.badge.text-<c>-emphasis.bg-<c>-subtle`; `.badge.text-primary-emphasis.bg-primary-subtle` (role, submitted by you); `.badge.badge-hold` (Coming in v0N); `.badge.badge-stub` (Finance stub).
- **Notices:** `.blocked-panel` (maintenance banner); toasts in `.toast-host` (success, error).
- **Cards:** `.card.card-body`; KPI `.kpi__value`; digital card `.member-card` with `.member-card__label`, `.member-card__id` and `svg.qr`.
- **Launcher (Story-037):** `.accordion.launch-acc.page-acc` sections with `.launch-acc__title` and `.launch-acc__hint`, the first visible one open; `.module-card` (4 parts) with `.btn-outline-alt` *Open guide* and `.btn-alt` *Start first scenario*; `.module-card--planned` with a `.badge-hold` and a disabled button; role cards; `.member-tabs` panel; Demo data section.
- **Request detail:** facts card, gate checklist (`.gate--ok|fail|wait`), Finance stub card, `.timeline`, notices table.
- **Charts:** `svg.chart` bar (`.chart__bar`) and donut (`.chart__s1`–`s6`, `.chart__hole`).
- **Scenario guide panel:** offcanvas `.guide-panel`, the current step `.guide-step--here` (Iris edge on Lilac mist); the module shown as a chip, no eyebrow.
- **Icons:** the inline SVG house set (module icons, theme, open in new tab, gate ok / fail / wait, members), `aria-hidden="true"`, `currentColor`.

## Reporting components (v02)
Built with the frontend-design pass on the pass-3 direction: reports read like the guideline booking tables, calm and dense, with the answer first (KPI tiles and one chart) and the rows below. No new colour: Iris for the series, the status palette only in badges.
- **Catalogue (SCR-11):** the guideline table; ID as the bold Iris link; *what it answers* as the second line in `--text-muted`; owning module as `.badge.bg-primary-subtle` (MMS); an **Export** chip `.badge.text-success-emphasis.bg-success-subtle` on designated reports; planned golf rows show `.badge.badge-hold` "Coming in v03", plain text (no link), `aria-disabled` is not used because nothing is interactive.
- **Report header (SCR-15):** page title = report name; a meta line (`.cluster`) with the ID, owning module chip, definition and version chip, and "Replaces: …" legacy names in `--text-muted`.
- **Parameters:** `.card.card-body` with the form grid (`.field`), required fields marked with the label text "(required)"; **Run** `.btn-primary` last in the `.btn-row`; the BR-032 message as `.alert-warning` under the form.
- **Result:** KPI row `.grid.grid--kpi` (at most 4, Layout-07), one `svg.chart` (Layout-11): bar (`.chart__bar`), donut (`.chart__s1 – s6`) or line (`.chart__line`: Iris stroke 2px, `.chart__dot` points; the one new chart rule); table in `.table-wrap` (sideways scroll on phones, D-262 item 14); a footer line "N rows · generated by … at …".
- **No-data state:** the house empty state: "No records match" + the criteria used + Change parameters (`.btn-outline-secondary`); never an alert (BR-033).
- **Export:** `.btn-outline-alt` **Export Excel** and **Export PDF** in the result header, only on designated reports (BR-034); a success toast names the file.
- **Print (Export PDF):** `@media print`: hide the header, nav, guide panel, parameters card, buttons and toasts; result table full width with its header repeated, black text on white, the report name, criteria and "generated by … at …" at the top; both themes print light.
- **Run history:** a compact guideline table (run ID, report, definition/version, by, at, rows, exports as `.badge.bg-secondary-subtle` XLS / PDF).
- **Definitions (SCR-16):** table + form card; version history as the `.timeline`; status badge Active (success) / Retired (secondary).
- **Management dashboard (SCR-17):** 4 KPI tiles in one row (each tile a link to its report, focus ring as every link), then the three charts stacked full width (Layout-11).
- **Legacy finder (SCR-18):** 4 KPI tiles by disposition; search + filters row; disposition badges: Approved requirement (success), Finance-owned (info), Source-module output (secondary), Out of scope (secondary); successor as a link or `.badge-hold` "Coming in v03".
- **Report access (SCR-12 tab):** one card per role, checkbox list (`.form-check`) per runnable report, Save (primary); BR-031 refusal as `.alert-danger`.

## Golf components (v03)
Built on the pass-3 direction (frontend-design pass of D-247): golf pages read like the counter sheet staff already use, the tee sheet first and dense, with the day's numbers above it. No new colour or font; the status palette only in badges.
- **Demo clock eyebrow:** `.eyebrow` "Wed 28 Oct 2026 · 11:55 (demo clock)" above the page title on every golf page and the Portal golf section (D-285).
- **Tee sheet (SCR-19):** course and date pickers in the form grid; course status badge; 4 KPI tiles (tee times, booked, blocked, waiting); AM and PM tee-time tables in the guideline table: time (bold, tabular figures), flight (golfer names from Membership, guests marked *Guest*), holes, status badge; a blocked row shows `.badge-hold` with the purpose and the source in `--text-muted`; one bar chart (bookings by session, Layout-11).
- **Booking (SCR-20):** facts card (course, date, time, status, channel, main booker); players table with per-row check-in fields (insurance or day-insurance checkbox, 9 / 18 select, guest proof, payer); rule messages as `.alert-warning` naming the rule; charges table with Finance status badges, the `.badge-stub` tag and **Record payment (stub)** (`.btn-outline-secondary`) on a pending charge; actions in one `.btn-row` (primary last: Check in flight).
- **Waitlist (SCR-21):** guideline table grouped by tee time, join time, party, status badge; an open offer shows its hold end; "does not fit" as `--text-muted` note; **Let offer expire** `.btn-outline-secondary` (D-055).
- **Course Control (SCR-22):** two course cards side by side (`.grid`, Layout-03), each with status badge and Suspend / Reopen (Manager only); golfers-on-course table with play state; rain-check register table.
- **Golf Administration (SCR-23):** `.nav-tabs` (Tee sheets, Golf settings, Handicap import, NSRCC PC records); staged extract rows with an accepted / rejected badge and the reason.
- **Shift Close (SCR-24):** 4 KPI tiles, counts table, exception register with badges; Close shift primary, then a success toast and the past-closes table.
- **Golfers (SCR-25):** search + guideline table; weekend eligibility as text ("Any time", "Weekdays or from 16:30").
- **Portal golf (SCR-13):** a card "Book a tee time" with the form grid and the rule messages; *My golf bookings*, *Waitlist offers* (Accept primary, Decline secondary) and *My rain checks* as compact tables; usable at 375px.
- **Golf approvals (SCR-08):** a tab in Approvals: guideline table (kind, booking or rain check, amount, requester, reason) with Approve / Reject and a required reason; "Requested by you" chip when the Manager raised it (BR-047).
- **Launcher Module details:** the live cards' `.btn-outline-alt` reads **Module details**; it is a button that selects the module's tab, opens the section and scrolls to it (it no longer toggles the collapse); planned cards keep the disabled *Not in this version* (D-274).

## Events components (v04)
Same pass-3 direction and the golf patterns: the schedule first, then the event, with the counts above.
- **Schedule (SCR-26):** demo-clock eyebrow; 4 KPI tiles; guideline table by date with the status badge, confirmed / capacity, minimum (a *Below minimum* warning badge), waitlist count and room status; one bar chart (confirmed against capacity, Layout-11).
- **Event setup (SCR-27):** the form grid in cards (Event, Registration, Rates, Sessions); the completeness list as gate items (`.gate--ok|fail`) beside Publish; rule messages as `.alert-warning` naming the rule.
- **Event (SCR-28):** facts card and counts; `.nav-tabs` Registrations, Waitlist, Attendance, Viability, Refunds, Function room; participant names read from Membership.
- **Registration (SCR-29):** event summary card, session checkboxes, participant picker with dependants listed from Membership, rate per participant and total; the **hold banner** `.alert-info` with the time left and **Let hold expire**; settlement choice as option tiles; **Pay (stub)** Success (primary) / Decline (outline-danger).
- **QR credential:** the house `svg.qr` pattern with its code (EQ-nnnn) under it, as on the membership card.
- **Check-in (SCR-30):** code field with a datalist of confirmed codes; result line `.alert-success` / `.alert-warning`; attendance table and a separate personnel table.
- **Function rooms (SCR-31):** feed messages as a list with type badges and **Apply**; bookings table.
- **Catalogue export buttons (SCR-11, v04):** in the last column, headed **Export as** (right-aligned over the buttons; the Status column is gone, p4-02 fix 12), two small buttons `.btn.btn-sm.btn-outline-alt` labelled **PDF** and **XLS** (aria-label "Export MMS-RR-003 as PDF"); "On screen" and "Coming in v0N" badges unchanged.

## Facilities components (v05)
Same pass-3 direction as Golf and Events: the day's grid first, the numbers above it, the forms beside or under it. No new colour or font; the status palette only in badges; every page usable at 375px (RC-118).
- **Demo clock eyebrow:** "Wed 28 Oct 2026 · 11:55 (demo clock)" above the title on every Facilities page and the Portal Facilities section.
- **Availability grid (SCR-33):** a guideline table `.table-wrap > table.table.avail`: resources down the first column (sticky while the grid scrolls sideways, the one new CSS rule), hourly slots across (`td.slot`); a free slot is a plain link **Book** (opens SCR-34 prefilled); a booked slot an info chip with the reference as a link (`FB-0004`) in its first hour and "↳ FB-0004" in `--text-muted` in each following hour (no merged cells, so columns stay aligned for keyboard and screen readers, D-333); a blocked slot `.badge.badge-hold` with the block type; a flagged booking a danger chip "Flagged"; facility tabs (`.nav-tabs`) above, date picker in the form grid; a legend line in `--text-muted`.
- **Blocks:** guideline table (resource, from – to, type, reason, source as a link for an event block) with **Remove** `.btn-outline-secondary`; *New block* in a `.card.card-body` form grid, **Block** primary.
- **Booking (SCR-34):** the label and value list `.facts--list` for the summary (v04 pattern); the rate line as a `.alert-info` ("Weekend member rate S$14 / h · frozen at confirmation"); rule messages as `.alert-warning` naming the rule; payment as the v04 Pay (stub) pair (Success primary, Decline outline-danger) online, or method option tiles (Cash, Card, NETS) at the counter; the actions in one `.btn-row` (Amend, Cancel, Record no-show, Request exceptional refund; primary last); the refund line under Cancel ("≥ 24 h: full refund S$10" / "< 24 h: no refund"); history as the `.timeline`.
- **Bookings and waiting list (SCR-35):** filters row; guideline table; waiting list grouped by slot with join time, status badge, offer-until, **Let offer expire** `.btn-outline-secondary` and Withdraw.
- **Admissions (SCR-36):** `.nav-tabs` Swimming Pool, Fitness Centre; an occupancy meter = Bootstrap `.progress` with the count as text ("58 / 60") and `aria-valuenow`; the Admit form in a card; today's admissions table with **Record exit**; the day pass as a small card with its code DP-nnnn; the visitor pass result names "HMS Resorts (simulated)" as a `.badge-stub`-style tag; Personal Training as a card with "Policy TBC" in `--text-muted`.
- **Bowling (SCR-37):** *Record sale* card; transactions table; **Reconcile** card with the run summary as 3 KPI tiles (rows, matched, exceptions); exceptions table with type badges and the row actions in a wrapping action cell (`.col-actions--wrap`).
- **Facilities Admin (SCR-38):** `.nav-tabs` Facilities, Resources, Changes, Fitness Centre; the locked Billiards duration shown with a lock icon and "Locked (BR-105)"; Draft changes table with status badges.
- **Approvals tabs (SCR-08):** *Facility refunds* and *Facility configuration* as golf approvals: table, a required reason, "Requested by you" chip; the buttons read **Approve** (primary) first, then **Reject** (outline-danger) (user instruction, D-333), on every tab of the Approvals page (D-334).
- **Header, Manager and Administrator (v05, D-333):** the golf links Tee Sheet, Course Control, Golfers and Golf Admin are grouped under one Bootstrap dropdown **Golf** (`.nav-item.dropdown` > `.nav-link.dropdown-toggle` + `.dropdown-menu`) so the header stays on one line at 1440 px; Golf Operations keeps its flat links.
- **Record IDs:** an ID in the first table column never wraps (`white-space: nowrap`, D-333).
- **Portal Facilities (SCR-13):** a card "Book a facility" (facility, date, start, hours → Continue), *My facility bookings*, *My waiting list* (Accept and pay primary, Decline, Withdraw) as compact tables.
- **Cards side by side (v05, user request):** each column one card at full row height (`h-100`); a form fills its card (`stack flex-grow-1`, fields in a `.form-grid`) and its button row sits at the foot (`mt-auto`), so the buttons of a pair line up.
- **Venue link (SCR-26 – 28):** venue as a link to `facilities.html?facility=<code>` for a booking or admission facility; an event-only venue stays plain text; the Event setup venue `select` shows "code · name".

## Resorts components (v06)
Same pass-3 direction as Facilities: the day first, the numbers above it, forms beside or under it. No new colour or font; status colours only in badges; every resort page usable at 375px (RC-144).
- **Draft note (D-348):** under the page title of every resort page, the Resorts tab of Module details and the Portal Resorts section: `.alert.alert-light.border` with a `.badge.badge-hold` "Draft – for validation" and one line of text. Not dismissible.
- **Front desk time switch (D-349):** in the page-header button row, a Bootstrap `.btn-group` of two `.btn-check` radios, *09:30 departures* and *15:30 arrivals* (`.btn-outline-alt`); the eyebrow reads "Wed 28 Oct 2026 · Front desk time 15:30". Golf, Events and Facilities keep the 11:55 demo-clock eyebrow.
- **Availability grid (SCR-39):** the Facilities grid pattern (`table.avail`, sticky first column): rooms down, the next 7 nights across; a reservation as an info chip linking to it; Faulty / Blocked as a danger badge; free as muted text.
- **Room status → badge:** Ready success, Occupied info, Pending Cleaning and Cleaning warning, Faulty and Maintenance Blocked danger; reservation status: Tentative warning, Confirmed success, Checked in success, Checked out secondary, Cancelled, Expired secondary, No-show danger.
- **Price card (SCR-40):** a card with a compact table (night, rate, amount), the total and the deposit in bold; the Membership line under it ("Ordinary (family), Active · up to 90 days ahead, 7 nights").
- **Rule messages:** `.alert-warning` naming the rule, as Facilities; the 21-day amendment message needs a **Confirm** button before anything changes.
- **Folio (SCR-41):** guideline table (date, item, type, amount right-aligned, reference with the Finance stub badge, row action *Credit note* on a paid line or *Adjust* on an unpaid one), a bold balance row; never a colour by status.
- **Door PIN:** shown masked except the last 3 digits ("•••• 913 · valid 26 – 29 Oct (simulated)"); **Regenerate PIN** replaces it.
- **Room board (SCR-42):** a grid of room cards (`grid--subgrid grid--rows-4`: room and status badge, type, current or next stay, action buttons at the foot) so the buttons line up across a row.
- **Night Audit (SCR-43):** checks table with Blocking (danger) and Warning (warning) badges and links to the item; **Close business day** disabled until the run passes.
- **Approvals (SCR-08):** tabs *Resort refunds*, *Resort exceptions*, *Resort configuration*, as the Facilities tabs: Approve (primary) before Reject (outline-danger), required reason (D-334).
- **Header (Manager, Administrator):** resort links grouped under one Bootstrap dropdown **Resorts**, as Golf (D-333), so the header stays on one line at 1440 px.
- **Launcher (SCR-32, D-351):** accordion order Modules → **Module details** → Open a role → Demo data; module cards in `grid--subgrid grid--rows-3` so the **Module details** buttons line up; Module details tabs gain **Resorts** and **Launcher**; each tab's scenarios table carries a **Start** button (`.btn-alt`).
- **Cards side by side:** the v05 rule holds (one card per column at full height, form `stack flex-grow-1`, button row `mt-auto`), so paired cards on the stay page are built as one card per column.

## Finance components (v07)
Same pass-3 direction: the day first, the numbers above it, the work queue beside it. No new colour or font; status colours only in badges; every Finance page usable at 375px.
- **Interim design note (D-371):** under the page title of a Finance page that uses an Interim Design or TBC rule: `.alert.alert-light.border` with a `.badge.badge-hold` "Interim design" and one line "Pending Finance validation: values are demo values (BR-…)". The Resorts *Draft* note pattern, a different word. Not dismissible.
- **Finance sub-navigation:** under the page header, Bootstrap `.nav.nav-pills` (scrolls sideways on a phone: `flex-nowrap overflow-x-auto`), the current page `active` with `aria-current="page"`: Home, Events, Accounts, Collections, Refunds, Recognition, Reconciliation, Posting, Dunning, General AR, Configuration, Approvals.
- **Header:** Finance Officer and Finance Approver: *Finance home*, *Approvals* (Finance approvals), *Reports* and a **Finance** dropdown with every Finance page; Manager and Administrator: a **Finance** dropdown (read only), as Golf and Resorts (D-333), so the header stays on one line at 1440 px.
- **Read-only view (Manager, Administrator):** the same page with its action buttons removed and a `.text-muted` line "Read only: Finance actions are for the Finance Officer and Finance Approver."
- **Finance event status → badge:** Received info, Accepted and Posted success, Staged warning, Finalised secondary, Returned and Exception danger; payment: Confirmed success, Pending Clearance warning, Returned danger; refund: Received info, Prepared warning, Approved success, Released secondary, Rejected danger; dunning stage: Current secondary, Reminder 1 info, Reminder 2 and Final notice warning, Escalated danger, Hold secondary.
- **Posting set (SCR-46):** guideline table (side, account code and name, amount right-aligned) with a bold totals row "Debits S$x = Credits S$x"; an unbalanced or unmapped set shows `.alert-danger` with the rule.
- **Money:** always S$ with 2 decimals in Finance (`money2`), right-aligned; negative as "−S$".
- **Receipt (SCR-47):** after *Record payment*, a toast and a card "Receipt PN-nnnn" with the allocation table (bill, applied) and the unapplied remainder.
- **Maker-checker (SCR-56):** the maker sees "Waiting for a second person" (`.badge.badge-hold`); the checker sees **Approve** (primary) before *Reject* (outline-danger) with a required reason (D-334); approving one's own item shows the rule message.
- **Refund parts:** a compact list in the cell, one line per source ("Card S$16.00", "In-house credit S$40.00 → member account").
- **Charts:** the house inline-SVG bar chart (v02) for events by module (SCR-45) and ageing by stage (SCR-53); 4 KPI tiles at most per row.
- **Module money (changed pages):** *Pay (stub)* → **Pay (simulated)** (Success / Decline, outline buttons); the `badge-stub` "Finance stub" → a `.badge.text-success-emphasis.bg-success-subtle` "FIN-OPS" next to the event ID link `FE-nnnn` (opens SCR-46 for Finance roles, plain text for others, BR-084).
- **Launcher (SCR-32):** every module card live; Module details tabs gain **Finance**; no planned card remains, so the planned-card style is no longer used.
