> Build: full-build · Version: v08 · KO: KO-037 · from v07

> Imported from rapid-build-v09 at KO-029

# Requirement Selection (full build v02)

## ✚ Changes in v08 (KO-037) *(confirmed: D-394, D-395)*
- None: a look-only refine (KO-037 prompt). Nothing new, changed or dropped (keep list D-391). **Dropped in v08:** none.

## ✚ Changes in v07 (KO-035) *(confirmed: D-373)*
The numbering is kept. v07 adds **no new requirement** (KO-035 prompt). Features **129 – 149** (Finance), **165** (Finance pages refined visually) and **29 (v07)** (the Finance stub replaced) move from `Deferred to v07` to **Selected (built in v07)**, marked *Changed in v07*. Features 150 and 151 keep their built parts (D-271, D-249 / D-250); 152 – 156 stay Not selected. After v07 no feature is Deferred (RC-184).

## ✚ Changes in v06 (KO-034) *(confirmed: D-350)*
The numbering is kept. v06 adds **no new requirement** (KO-034 prompt). Features **101 – 125** (Resorts) and **164** (Resorts pages refined visually) move from `Deferred to v06` to **Selected (built in v06)**, marked *Changed in v06*; their rapid v08 FIN-OPS wording (111, 122) does not apply (RC-141). Features 126 – 128 stay Not selected. Finance (129 – 149, 165, 29 v07) stays `Deferred to v07`.

## ✚ Changes in v05 (KO-033) *(confirmed: D-327)*
The numbering is kept. v05 adds **no new requirement** (KO-033 prompt). The Facilities items move from `Deferred to v05` to **Selected (built in v05)**, marked *Changed in v05*:

| # | Feature | v05 |
|---|---|---|
| 80 – 96 | Facilities (eligibility and entitlement, availability and blocks, create, amend, cancel, no-show, payment and hand-off, swimming, fitness and day passes, bowling counter, reconciliation, exceptions, waiting list, configuration, Fitness Centre information, Personal Training, reports) | Deferred to v05 → **Selected (built in v05)**; the v07 and v08 changes noted on 80, 84, 86 and 88 stay with Resorts (v06) and Finance (v07): Finance stub instead of FIN-OPS (RC-115), simulated visitor pass instead of a resort stay (RC-114) |
| 163 | Visual refinement: HMS Facilities | Deferred to v05 → **Selected (built in v05)** |
| 37, 32 | Report catalogue and export | *v05 link:* the 8 Facilities reports `HMS-FAC-RR-001 – 008` switch on in the catalogue with the **Export as** buttons (RC-117) |
| 42 | Legacy report finder | Unchanged: the legacy inventory (147 names) holds no Facilities report |
| 60, 70 | Event setup, maintain a published event | *v05 link:* venue picked from the Facilities records (RC-116) |
| 74, 75, 77, 166 – 168 | Launcher, role tabs, Module details, guides, data file | *v05 link:* Facilities live, Facilities Staff role, SC-36 – 43, facility collections |

Resorts (101 – 125, 164) and Finance (129 – 149, 165, 29 v07) stay `Deferred to v06` / `Deferred to v07`.

## ✚ Changes in v04 (KO-032) *(confirmed: D-306)*
The numbering is kept. v04 adds **no new requirement** (KO-032 prompt). The Events items move from `Deferred to v04` to **Selected (built in v04)**, marked *Changed in v04*; two reporting items change:

| # | Requirement | PRD story | Change in v04 |
|---|---|---|---|
| 60 | Event setup and publication | Story-123 | Changed in v04: Deferred → Selected |
| 61 | Online event registration | Story-124 | Changed in v04: Deferred → Selected (non-member accounts, RC-110) |
| 62 | Counter event registration | Story-125 | Changed in v04: Deferred → Selected (Golf Operations as CSO) |
| 63 | Event waitlist and automatic promotion | Story-126 | Changed in v04: Deferred → Selected (Let offer expire) |
| 64 | Minimum participation review | Story-127 | Changed in v04: Deferred → Selected |
| 65 | Event check-in and attendance | Story-128 | Changed in v04: Deferred → Selected |
| 66 | Participant cancellation | Story-129 | Changed in v04: Deferred → Selected |
| 67 | Club-initiated cancellation | Story-130 | Changed in v04: Deferred → Selected; refunds to the Finance stub after Events Manager authorisation (RC-111) |
| 68 | Club-initiated rescheduling | Story-131 | Changed in v04: Deferred → Selected |
| 69 | Function room booking synchronisation | Story-132 | Changed in v04: Deferred → Selected (simulated feed, RC-023) |
| 70 | Maintain a published event | Story-133 | Changed in v04: Deferred → Selected |
| 71 | Events schedule and enquiry (HMS-EVT-RR-001 – 003 on the Events pages, RC-109) | Story-134 | Changed in v04: Deferred → Selected |
| 162 | Visual refinement: HMS Events | Story-135 | Changed in v04: Deferred → Selected (design system v3 unchanged) |
| 32 | Export to Excel and PDF | Story-102 | Changed in v04: the catalogue's Export badge becomes a **PDF** and an **XLS** button that run the report and export it, recorded as a run with its export (RC-112) |
| 37 | Report catalogue and access | Story-103 | Changed in v04: Status column with the export buttons; "On screen" and "Coming in v0N" unchanged |

Kept items that change only where they connect to Events: see `keep-list-v04.md` (*v04 link*). Dropped in v04: none (D-302).

## ✚ Changes in v03 (KO-031) *(confirmed: D-286)*
The numbering is kept. v03 adds **no new requirement** (KO-031 prompt). The Golf items move from `Deferred to v03` to **Selected (built in v03)**, marked *Changed in v03*; one launcher item changes:

| # | Requirement | PRD story | Change in v03 |
|---|---|---|---|
| 40 | Golf reports GMS-RR-001 … 012 on the live golf records | Story-109 | Changed in v03: Deferred → Selected; 001 – 009, 011, 012 exportable, 010 not (D-035) |
| 46 | Tee sheet setup and publication | Story-110 | Changed in v03: Deferred → Selected |
| 47 | Golf booking (portal and counter) | Story-111 | Changed in v03: Deferred → Selected |
| 48 | Automated waitlist | Story-112 | Changed in v03: Deferred → Selected (offer timer: Let offer expire, D-055) |
| 49 | Amend and cancel a booking | Story-113 | Changed in v03: Deferred → Selected |
| 50 | Check-in and release to play | Story-114 | Changed in v03: Deferred → Selected |
| 51 | Late arrival and no-show | Story-115 | Changed in v03: Deferred → Selected |
| 52 | Course suspension and rain checks | Story-116 | Changed in v03: Deferred → Selected |
| 53 | Handicap and PC eligibility data | Story-117 | Changed in v03: Deferred → Selected (simulated extract, D-048) |
| 54 | Tee blocking | Story-118 | Changed in v03: Deferred → Selected |
| 55 | Golf charges and Finance hand-off | Story-119 | Changed in v03: Deferred → Selected; the Finance side stays a stub (RC-106) |
| 56 | Shift and end-of-day close | Story-120 | Changed in v03: Deferred → Selected |
| 57 | Golf enquiry | Story-121 | Changed in v03: Deferred → Selected |
| 150 | Report visuals: the golf reports part | Story-109 | Changed in v03: golf reports get KPI tiles and a chart |
| 161 | Visual refinement: Golf (GMS) | Story-122 | Changed in v03: Deferred → Selected (design system v3 unchanged) |
| 77 | Launcher module summary | Story-035 | Changed in v03: Golf details tab live; the module card button **Open guide** becomes **Module details**: it always opens (never closes) the Module details section on that module's tab and scrolls to it (RC-104) |

Kept items that change only where they connect to Golf: see `keep-list-v03.md` (*v03 link*). Dropped in v03: none (D-282).

## ✚ Changes in v02 (KO-030) *(confirmed: D-264)*
The numbering is kept. v02 adds **no new requirement** (KO-030 prompt). The Club Reporting items move from `Deferred to v02` to **Selected (built in v02)**, marked *Changed in v02*:

| # | Requirement | PRD story | Change in v02 |
|---|---|---|---|
| 25 | Reports and audit review (through 37 – 39) | Story-101 | Changed in v02: Deferred → Selected |
| 32 | Export to Excel and PDF | Story-102 | Changed in v02: Deferred → Selected; MMS-RR-001 – 006, 008 exportable (D-263) |
| 37 | Report catalogue and access (golf entries listed as "Coming in v03") | Story-103 | Changed in v02: Deferred → Selected |
| 38 | Parameterised report run | Story-104 | Changed in v02: Deferred → Selected |
| 39 | Membership reports MMS-RR-001 … 008 (009, 010 as capabilities) | Story-101 | Changed in v02: Deferred → Selected |
| 41 | User-defined reports and dashboards (simulated BI, D-028) | Story-105 | Changed in v02: Deferred → Selected |
| 42 | Legacy report finder (147 names) | Story-106 | Changed in v02: Deferred → Selected |
| 43 | Report access rules | Story-107 | Changed in v02: Deferred → Selected |
| 150 | Report visuals: the Club Reporting part (KPI tiles and a chart per report, the management dashboard) | Story-108 | Changed in v02: reports part selected |
| 160 | Visual refinement: Club Reporting | Story-108 | Changed in v02: Deferred → Selected |

Stays as it is: 40 (golf reports) `Deferred to v03`; 44 scheduled delivery **Not selected**; every other module `Deferred to v0N`.

## ✚ Selection record (v02)
Selected by: Jason Quek Ghee Khang · Method: Explicit · 2026-11-10 14:16 SGT · D-264 (imported lineage: no agree to all)

## ✚ Dropped in v02
None (keep list: every item kept, D-259).

## ✚ Full build v01 (KO-029): proposed selection, by module and version
The imported numbering (1 – 166) is kept. New full-build items start at 167. Every item needs an explicit answer (imported run). The build version follows the version plan (D-217).

| Batch item | Features | Module | Built in | Recommended | Answer |
|---|---|---|---|---|---|
| 1 | 1 – 27 | Membership: enquiry, profile, application, renewal, conversion, transfer, extension, withdrawal, expiry and rejoin, deceased, absent, medical, suspension, status matrix, supplementary, junior, corporate, classification, credit, vehicles, card, referral, notifications, membership reports source, configuration, member portal | v01 | Keep | As recommended (D-226) |
| 2 | 28, 29, 30, 31 | Approval inbox; Finance hand-off (v01: the Finance stub, D-221, BR-178; FIN-OPS in v07); management dashboard (Membership tiles); integration feed (Membership events) | v01 | Keep | As recommended (D-226) |
| 3 | 74, 75, 76, 157, 158, 166 | Launcher, role per tab, member tabs, CC-Demo name, launcher redesign, scenario guide (steps from the signed-off step table, which also fixes rapid gap 3) | v01 | Keep | As recommended (D-226) |
| 4 | 77; 78, 79 | 77 module details on the launcher: keep. 78 HTML module guides in `demo/` and 79 the shareable demo folder are rapid demo-pack items, replaced by the scenario guide (166) and `HOW-TO-RUN.md` | v01 | 77 keep; 78, 79 drop | As recommended (D-226) |
| 5 | 150, 151, 159; 160 – 165 | Report visuals, colour-coded rows and visual refinement: the Membership part in v01; each other module's refinement (160 – 165) in its own version | v01; v02 – v07 | Keep | As recommended (D-226) |
| 6 | 25, 32, 37 – 43 | Club Reporting: catalogue, parameterised runs, export, user-defined reports and dashboards, legacy finder, access rules, MMS reports (other modules' reports come with their module, D-220) | v02 | Keep, `Deferred to v02` | As recommended (D-226) |
| 7 | 46 – 57 | Golf | v03 | Keep, `Deferred to v03` | As recommended (D-226) |
| 8 | 60 – 71 | Events | v04 | Keep, `Deferred to v04` | As recommended (D-226) |
| 9 | 80 – 96 | Facilities | v05 | Keep, `Deferred to v05` | As recommended (D-226) |
| 10 | 101 – 125 | Resorts | v06 | Keep, `Deferred to v06` | As recommended (D-226) |
| 11 | 129 – 149 | Finance (FIN-OPS) | v07 | Keep, `Deferred to v07` → Selected (built in v07, D-373) | As recommended (D-226) |
| 12 | **167** *(Added in full build)* | **Data export and import**: export the whole data set to a local JSON file and import it back; Reset restores the seed. Justification: the full-build static-site baseline (Export/Import); lets a reviewer keep a state between sessions. Category A, Must, Real | v01 | ✅ Select | As recommended (D-226) |
| 13 | **168** *(Added in full build)* | **Planned-module cards**: the launcher shows the six modules not yet built as greyed-out cards marked "Coming in v0N", with no Start or role links. Justification: D-222, KO-029 prompt. Category B, Must, Real | v01 | ✅ Select | As recommended (D-226) |
| 14 | 33 – 36, 44, 58, 59, 72, 73, 97 – 100, 126 – 128, 152 – 156 | Offered again (not selected in rapid): bulk actions, real integrations, sign-in and 2FA, document storage, scheduled report delivery, golf and HMS out-of-scope items, real Yonyou / bank / POS, interest, extra FIN reports, edge cases | — | Keep not selected (reasons below) | As recommended (D-226) |

Over-cap items: none (every rapid cap was 999). Gaps from the rapid `demo/coverage-check.md`: gap 3 is fixed by 166 (step table); gaps 1 and 2 were test notes of the rapid run, not requirements.

---

> ✚ Correction D-229: feature 25 is built in v02 only; v01 builds 42 features.

## ✚ Dropped in full build v01
| # | Requirement | Reason | D-xxx |
|---|---|---|---|
| 78 | HTML module guides in `demo/guides/` | Rapid demo-pack item; replaced by the scenario guide (166) | D-226 |
| 79 | Shareable demo folder | Rapid demo-pack item; `HOW-TO-RUN.md` covers opening the prototype | D-226 |

## ✚ Selection record (full build)
Selected by: Jason Quek Ghee Khang · Method: Explicit · 2026-11-06 10:51 SGT · Decision ID D-226 (imported run: no agree to all)

# Imported rapid selection (rapid-build v01 – v09)

Caps used: `max_features` 999, `max_rules` 999, so nothing is over cap. Every one of the 25 PRD processes is covered by at least one feature. The demo uses **one request engine** (capture → validate → approve → Finance gate → apply → history) for all request types, so the processes share screens instead of each needing its own.

## v09 changes
Kept 134 (feature 74 changed: the launcher) · New 9 (157 – 165) · Dropped 0 (D-179) · Not selected 0 new. Caps: features 143 / 999, rules 170 / 999. RC-090 … RC-098 resolved (D-180 … D-188). Delivered one step at a time: step 1 the rename and the launcher, then one module per step (D-180)

## v08 changes
Kept 111 (features 3, 8, 19, 20, 29, 40, 41, 55, 56, 67, 84, 86, 111 and 122 changed) · New 23 (129 – 151) · Dropped 0 (D-153; only the D-150 UI-12 exception dropped) · Not selected 5 new (152 – 156). Caps: features 134 / 999, rules 170 / 999. RC-072 … RC-089 resolved (D-154 … D-171)

## v07 changes
Kept 75 (features 24, 27, 28, 29, 31, 37, 76, 77, 78, 80 and 88 changed) · New 25 (101 – 125) · Dropped 0 (D-127) · Not selected 3 new (126 – 128). Caps: features 111 / 999, rules 132 / 999. RC-055 … RC-071 resolved (D-128 … D-144); D-111 superseded by D-135.

## v06 changes
Kept 69 (features 27, 28, 29, 37, 76, 77 and 78 changed) · New 17 (80 – 96) · Dropped 0 (D-104) · Not selected 4 new (97 – 100). Caps: features 86 / 999, rules 106 / 999. RC-040 … RC-054 resolved (D-105 … D-119).

## v05 changes
Kept 63 (features 27 and 30 changed) · New 6 (74 – 79) · Dropped 0 (assumption D-064 dropped, D-083) · Not selected 0 new. Caps: features 69 / 999, rules 85 / 999.

## v04 changes
Kept 51 (features 24, 27, 28, 29 and 31 changed) · New 12 (60 – 71) · Dropped 0 · Not selected 2 new (72, 73). Caps: features 63 / 999, rules 83 / 999.

## v03 changes
Kept 39 (features 27 and 40 changed) · New 12 (46 – 57; #45 brought back as these) · Dropped 0 · Not selected 2 new (58, 59). Caps: features 51 / 999, rules 60 / 999.

## v02 changes
Kept 31 (feature 25 changed) · New 8 (32, 37 – 43) · Dropped 0 · Not selected 2 new (44, 45). Caps: features 39 / 999, rules 35 / 999.

## Selected

| # | Requirement | Category | Justification | Priority | Prototype treatment | Flag |
|---|---|---|---|---|---|---|
| 1 | **Member enquiry and 360° profile**: search by name, Membership ID, ID number or status; one page with person, membership, contract, relationships, vehicles, cards and history; "no match" changes nothing | A | P-002, P-024 (FR-012, FR-131, FR-133) | Must | Real | |
| 2 | **Profile and contact maintenance**: edit contact, address and marketing consent; mandatory fields enforced; before/after change kept in history | A | P-002 (FR-013 … 016), BR-027, BR-026 | Must | Real | |
| 3 | *(changed in v08: routes the entrance fee and subscription to FIN-OPS intake, receivable and payment (130, 133, 134))* **New membership application and onboarding**: capture type, recruitment source and referral; duplicate, eligibility and document checks; approval; fee and Finance payment gate; activation with a new Membership ID, contract and digital card | A | P-001, P-022 (FR-001 … 011, FR-122, 123), BR-001 … 007, BR-029 | Must | Real (Finance simulated) | |
| 4 | **Renewal**: member-requested, package (1 / 2 / 3 years), 30-year cap, payment gate, new expiry date | A | P-003 (FR-017 … 022), BR-006, BR-008, BR-009 | Must | Real | |
| 5 | **Conversion Full ↔ Basic**: remaining term doubled or halved (rounded down), admin fee, approval, payment gate | A | P-004 (FR-023 … 030), BR-010 | Must | Real | |
| 6 | **Transfer**: transferable type, eligible recipient, documents, approval, transfer fee, source-to-recipient lineage | A | P-005 (FR-031 … 037), BR-011 | Must | Real | |
| 7 | **Extension**: duration limit, 30-year cap, routing by threshold (Approver ≤ 12 months, Manager > 12) | A | P-006 (FR-038 … 042), BR-012 | Must | Real | |
| 8 | *(changed in v08: balance clearance read from the FIN-OPS member account (133))* **Withdrawal**: member-initiated, Finance balance clearance, no refund, status Withdrawn | A | P-007 (FR-043 … 046), BR-013 | Must | Real | |
| 9 | **Expiry, lapse and rejoin**: run the expiry check; rejoin keeps the original Membership ID after approval and payment | A | P-008 (FR-047 … 052), BR-014 | Must | Real ("Run expiry check" button stands in for the nightly job) | |
| 10 | **Deceased membership handling**: evidence, optional beneficiary transfer (transfer rules), optional goodwill refund approved by the Manager | A | P-009 (FR-053 … 056), BR-015 | Must | Real | |
| 11 | **Absent membership**: evidence, 3–24 months, no overlap, term suspended and excluded from the 30-year cap | A | P-010 (FR-057 … 063), BR-016 | Must | Real | |
| 12 | **Medical membership**: evidence, ≤ 12 months, expiry unchanged | A | P-011 (FR-064 … 069), BR-017 | Must | Real | |
| 13 | **Suspension and reinstatement**: only authorised roles; privileges off, billing on; reinstatement needs approval | A | P-012 (FR-070 … 074), BR-005, BR-019 | Must | Real | |
| 14 | **Status change through the transition matrix**: one current status; privilege and billing badges follow the status | A | P-013 (FR-075 … 078), BR-018, BR-019 | Must | Real | |
| 15 | **Supplementary memberships**: under an active principal only; end with the principal | A | P-014 (FR-079 … 084), BR-020 | Must | Real | |
| 16 | **Junior age-21 transition**: watch list of juniors near 21, reminder, eligibility ends at 21, no automatic conversion | A | P-015 (FR-085 … 089, NR-009, RR-005), BR-021 | Must | Real | |
| 17 | **Corporate membership and nominees**: creation by the Administrator only; nominee limit; nominee change approval; S$300 nomination fee gate; real fees sheet | A | P-016 (FR-090 … 095), BR-022 | Must | Real | |
| 18 | **Committee and honorary classification**: eligibility, duration and entitlements from configuration, approval | A | P-017 (FR-096 … 099), BR-005 | Should | Real | |
| 19 | *(changed in v08: spending credit award recorded by FIN-OPS as a non-payment credit with 24-month validity (137))* **Membership contract and financial terms**: entrance fee, subscription, In-House Credit Limit, Spending Credit Granted (never reduced), SGD | A | P-018 (FR-100 … 107), BR-023 | Must | Real | |
| 20 | *(changed in v08: available credit read from the FIN-OPS outstanding balance; credit-limit override in FIN-OPS (133, 142))* **Finance handoff and credit exposure check**: handoff log; available credit = limit − Finance outstanding; blocked when Finance is unavailable | A | P-019 (FR-108 … 112), BR-023 | Must | Simulated Finance | |
| 21 | **Vehicle registration and car labels**: Active only, up to 4 vehicles, retire and replace, label history | A | P-020 (FR-113 … 116), BR-024 | Must | Real | |
| 22 | **Digital membership card and QR**: digital primary, physical by exception, replacement voids the old card, history | A | P-021 (FR-117 … 121), BR-025 | Must | Real (QR drawn as an SVG pattern, not a scannable code) | |
| 23 | **Recruitment and referral**: source report; referral reward only under an active campaign | A | P-022 (FR-124, 125, RR-006), BR-030 | Should | Real | |
| 24 | *(changed in v07: resort notifications for configured events, 125)* *(changed in v04: also the 7 event notices HMS-EVT-NR-001 … 007)* **Communications and campaigns**: approved templates; marketing-consent exclusion; outbox of every notice the processes send | A | P-023, all NR-001 … 012, BR-026 | Must | Simulated delivery | |
| 25 | *(changed in v02: delivered through the report catalogue, 37 – 39)* **Reports and audit review**: counts by type and status, approaching expiry, junior watch list, status transitions, audit / workflow history by actor and date; empty result when nothing matches | A | P-024 (RR-001 … 010, FR-130, 132) | Must | Real (in-browser) | |
| 26 | **Master data and policy configuration**: membership types, fees, limits, document matrix, transitions, templates; effective-dated; inactivate, never delete referenced values | A | P-025 (FR-134 … 138), BR-028 | Must | Real (edits stored in the browser) | |
| 27 | *(changed in v07: members reserve resort rooms, join the resort waitlist and see their reservations online, 103, 108)* *(changed in v06: books, amends, cancels and wait-lists facility bookings online, 82, 83, 84, 92)* *(changed in v03: the member also books a tee time and sees their rain checks, 47; changed in v04: registers for events and sees their registrations and QR credentials, 61; changed in v05: a Member tab shows only its own account, chosen on the launcher, 76)* **Member Portal self-service**: a member sees their digital card and membership, and submits renewal, profile change or withdrawal under the same rules | A | IR-011, FR-016 | Should | Real (role switch, no login) | |
| 28 | *(changed in v07: resort refunds, adjustments, credit notes, reversals and resort configuration for the Operations Manager, 102, 111, 112, 120)* *(changed in v06: exceptional facility refunds for the Operations Manager, 84)* *(changed in v04: event refund and reversal authorisations for the Events Manager, 67, 68)* **Approval inbox (maker-checker)**: one inbox of pending decisions per role; the submitter cannot approve | B | Implied by every approval rule (BR-005) | Must | Real | |
| 29 | *(changed in v08: the simulated Finance desk is replaced by the Finance (FIN-OPS) module; its handoff lists become the intake register (129, 130))* *(changed in v07: resort payments, refund instructions and the FIN-OPS handoff, 110, 111, 122)* *(changed in v06: facility payments, refund instructions and bowling escalations, 86, 91)* *(changed in v04: event settlements and refund instructions, 61, 62, 67, 68)* **Finance desk (simulated)**: confirm or fail each pending handoff; set a member's outstanding balance or mark Finance unavailable | B | Implied by every payment gate (BR-006) and BR-023; Finance is external | Must | Simulated | |
| 30 | *(changed in v05: moves to `dashboard.html`; `index.html` is the launcher, 74)* **Membership dashboard**: KPIs (members by status, pending approvals, awaiting payment, expiring in 90 days) and quick links | C | Best practice; reuses RR-002 data | Should | Real | |
| 31 | *(changed in v07: Salto credential and Alphawave whitelist messages, 115, 118)* *(changed in v04: HMS Events is now in the app; the Function Room Booking System feed is added, 69)* **Integration feed**: what MMS published to Access Control, HMS, GMS and the notification service, per event | C | Best practice for a presales audience (IR-008 … 012); shows the ownership line | Should | Simulated | |
| 32 | **Export to Excel and PDF** *(new in v02, was deferred)*: a generated report designated for export downloads as Excel or prints to PDF with the same rows | A | RPT-P-003 (GMS-RR-013), BR-034 | Must | Simulated (.xls file, browser print) ⚑ D-031 | |
| 37 | *(changed in v07: the Resorts reports are added, 123)* *(changed in v06: the Facilities reports are added, 96)* **Report catalogue and access** *(new)*: the 23 approved reports, found by what they answer, each naming its owning module; only the reports the role may run are shown | A | RPT-P-001 (MMS-RR-001, 007, GMS-RR-010), BR-031 | Must | Real | ⚑ D-027 |
| 38 | **Parameterised report run** *(new)*: per-report parameters, output limited to the criteria, valid no-data result, read-only, run history | A | RPT-P-002 (MMS-RR-009, 010), BR-032, BR-033 | Must | Real | |
| 39 | **Membership reports MMS-RR-001 … 010** *(new)*: operational listing, statistics and trends, expiry and renewal outcomes, status transitions, junior watch, recruitment and referral, vehicles and credentials, audit history, on the live demo data | A | RPT-P-002 | Must | Real | |
| 40 | *(changed in v08: every report gets KPI tiles and a chart (150))* *(changed in v03: reads the live GMS records of 46 – 57 instead of invented data)* **Golf reports GMS-RR-001 … 012** *(new in v02)*: tee sheet, utilisation, booking activity, waitlist, cancellation / no-show, rain checks, handicap exceptions, guests, golf charges (labelled operational, not Finance), override audit, end-of-day summary, course blocks | A | RPT-P-002, RPT-P-001 (GMS-RR-010) | Must | Real (GMS records) | |
| 41 | *(changed in v08: dashboards draw line, stacked-bar and donut charts as well as bars (150))* **User-defined reports and dashboards** *(new)*: the Administrator defines a report on an approved base (fields, filters, layout), versioned and effective-dated; a management dashboard of KPI tiles and charts | A | RPT-P-004 (MMS-CFG-133), BR-035 | Must | Simulated BI ⚑ D-028 | |
| 42 | **Legacy report finder** *(new)*: search the 147 legacy names and see the disposition and the successor report or owner | A | RPT-P-006, `legacy-report-mapping.csv` | Must | Real (mapping as given) | |
| 43 | **Report access rules** *(new)*: the Administrator maintains which roles run which reports and their data scope | A | RPT-P-001 §8, BR-031 | Must | Real | ⚑ D-027 |
| 46 | **Tee sheet setup and publication** *(new in v03)*: the Administrator generates and publishes tee times per course, day type and session; 9-hole periods applied | A | GMS-P-001, BR-036 | Must | Real | |
| 47 | **Golf booking** *(new in v03)*: member (portal) or staff (counter) books a course, date and tee time for a flight with members and guests; every eligibility rule checked | A | GMS-P-002, BR-037 … 043 | Must | Real | |
| 48 | **Automated waitlist** *(new in v03)*: join when full; on release the earliest fitting entry gets a 15-minute offer; accept, decline or expire moves on | A | GMS-P-002, BR-044 | Must | Real (offer timer simulated) | |
| 49 | **Amend and cancel a booking** *(new in v03)*: player substitution, course change, cancellation with the 72-hour rule; waiver requests | A | GMS-P-003, BR-045 … 047 | Must | Real | |
| 50 | **Check-in and release to play** *(new in v03)*: revalidate eligibility, insurance or day insurance, 9 / 18 declaration, guest proof, responsible payer, charges to Finance | A | GMS-P-004, BR-048 … 050 | Must | Real | |
| 51 | **Late arrival and no-show** *(new in v03)*: reschedule, join by skipping holes, or no-show charge, with waiver | A | GMS-P-005, BR-051 | Must | Real | |
| 52 | **Course suspension and rain checks** *(new in v03)*: suspend and reopen a course; refunds before tee-off; 9-hole rain checks with validity, extension and redemption | A | GMS-P-006, BR-052 … 055 | Must | Real | |
| 53 | **Handicap and PC eligibility data** *(new in v03)*: import a handicap extract with validation and history; maintain NSRCC PC records | A | GMS-P-007, BR-056 | Must | Simulated import ⚑ D-048 | |
| 54 | **Tee blocking** *(new in v03)*: block or release capacity for maintenance, HMS events, private use, programmes or management | A | GMS-P-008, BR-057 | Must | Real | |
| 55 | *(changed in v08: golf charges arrive in FIN-OPS intake and post through mappings (130, 131))* **Golf charges and Finance handoff** *(new in v03)*: rate table, responsible payer, guest proof, rain-check offset, in-house credit, Finance status | A | GMS-P-009, BR-058, BR-059 | Must | Simulated Finance ⚑ D-046 | |
| 56 | *(changed in v08: the shift close stays operational; the Finance cashier batch close is the Finance control (141))* **Shift and end-of-day close** *(new in v03)*: operational summary, exception register, events missing a Finance status | A | GMS-P-010, BR-060 | Must | Real | |
| 57 | **Golf enquiry** *(new in v03)*: tee sheet and golfer enquiry for counter staff and marshals; the v02 golf reports read these live records | A | GMS-P-011 | Must | Real | |
| 60 | **Event setup and publication** *(new in v04)*: the Events Team configures an event (single or multi-session, registration scope, window, eligibility, member / non-member and adult / child rates or free, capacity, waitlist, minimum participants, personnel) and publishes it once complete, with no approval | A | HMS-EVT-P-001, BR-061 | Must | Real | |
| 61 | **Online event registration** *(new in v04)*: an account holder registers one or more participants in the portal; eligibility, rates, whole-group capacity, 15-minute hold, settlement, a QR per participant | A | HMS-EVT-P-002, BR-062 … 068, 072 | Must | Real (payment simulated) | |
| 62 | **Counter event registration** *(new in v04)*: a Customer Service Officer registers participants at the counter under the same rules, with counter settlement or member account | A | HMS-EVT-P-003, BR-062 … 068 | Must | Real (payment simulated) | |
| 63 | **Event waitlist and automatic promotion** *(new in v04)*: whole groups join free; fit-aware FIFO promotion; 24-hour offer; composition change resets priority | A | HMS-EVT-P-004, BR-069 … 071 | Must | Real (timer simulated) | |
| 64 | **Minimum participation review** *(new in v04)*: confirmed count against the minimum; the Events Team proceeds or cancels | A | HMS-EVT-P-005, BR-076 | Must | Real | |
| 65 | **Event check-in and attendance** *(new in v04)*: QR check-in per session, duplicate and wrong-session refusal, audited manual fallback, separate personnel attendance, attendance by session | A | HMS-EVT-P-006, BR-073 … 075 | Must | Real (QR simulated) | |
| 66 | **Participant cancellation** *(new in v04)*: participant-initiated, amount forfeited, QR void, places to the waitlist | A | HMS-EVT-P-007, BR-077 | Must | Real | |
| 67 | *(changed in v08: event refund instructions go to FIN-OPS refunds with maker-checker (138))* **Club-initiated cancellation** *(new in v04)*: cancel an event or session; Events Manager authorises a full or partial refund; refund instruction to Finance | A | HMS-EVT-P-008, BR-078 | Must | Real (Finance simulated) | |
| 68 | **Club-initiated rescheduling** *(new in v04)*: new schedule, participants keep or decline, authorised refunds, places to the waitlist | A | HMS-EVT-P-009, BR-079 | Must | Real (Finance simulated) | |
| 69 | **Function room booking synchronisation** *(new in v04)*: mirror confirmed, amended and cancelled bookings from the external system by reference; ignore tentative or unknown ones | A | HMS-EVT-P-010, BR-080 | Must | Simulated feed | |
| 70 | **Maintain a published event** *(new in v04)*: prospective price and eligibility changes, capacity floor, cancellations and schedule changes routed to 67 / 68, automatic completion | A | HMS-EVT-P-011, BR-081 … 083 | Must | Real | |
| 71 | **Events schedule and enquiry** *(new in v04)*: schedule by date, confirmed count against the minimum, attendance by session | A | HMS-EVT-RR-001 … 003 | Must | Real | |
| 74 | *(changed in v09: redesigned launcher, 158)* **Role launcher** *(new in v05)*: the demo opens on a launcher that opens each role (and each member account) in its own tab | B | Prompt (KO-023) | Must | Real | |
| 75 | **Role kept per tab, hard role blocking** *(new in v05)*: the role is set once from the launcher and kept per tab; a page not for the role shows no content; links to other roles' pages are not clickable | B | Prompt (KO-023), BR-084 | Must | Real | |
| 76 | *(changed in v07: also its own resort reservations and waitlist entries)* *(changed in v06: also its own facility bookings, waiting-list requests and day passes)* **Member tab scoped to its own account** *(new in v05)*: a Member tab sees only its own membership, registrations and bookings | B | Prompt (KO-023), BR-085 | Must | Real | |
| 77 | *(changed in v07: a sixth module, HMS Resorts)* *(changed in v06: a fifth module, HMS Facilities)* **Launcher module summary** *(new in v05)*: per module, its workflow steps, the roles involved (each opening that role's tab), its scenarios with a Start link to step 1, and the rules it shows | C | Prompt (KO-023) | Must | Real | |
| 78 | *(changed in v07: adds `demo/guides/resorts.html`)* *(changed in v06: adds `demo/guides/facilities.html`)* **Module guides and modules summary** *(new in v05)*: `demo/modules-summary.md` and one HTML guide per module in `demo/guides/` (workflow, roles, scenarios step by step with talking points), generated from `demo/demo-script.md`, styled with the prototype's vendor and css, opened in a new tab from the launcher's Module guides section | C | Prompt (KO-023) | Must | Real (generated) | |
| 79 | **Shareable demo folder** *(new in v05)*: the whole `rapid-build` folder is what is shared, so the launcher, prototype and guides travel together | C | Prompt (KO-023) | Must | Real (instructions) | |
| 80 | *(changed in v07: the Bungalow guest category becomes Resort guest, read from an in-house resort stay, 113)* **Customer eligibility and entitlement** *(new in v06)*: customer category (Member, SAFRA, Non-member, Guest, Bungalow guest) and the facility eligibility matrix; member status from MMS; no member rate unless Active | A | HMS-FAC-P-001, BR-086 | Must | Real (MMS from v01) | ⚑ D-105 … D-119 |
| 81 | **Facility availability and resource blocks** *(new in v06)*: availability grid per facility and day; block or unblock a resource with a type and reason; no booking override; block-over-booking conflict flagged | A | HMS-FAC-P-002, BR-087, 088 | Must | Real | ⚑ D-105 … D-119 |
| 82 | **Create and confirm a facility booking** *(new in v06)*: staff counter or online; booking window, duration (Billiards 1 – 3 h), rate by category and day type, pay before confirm, booking reference and receipt | A | HMS-FAC-P-003, BR-089 … 092 | Must | Real (payment simulated) | ⚑ D-105 … D-119 |
| 83 | **Amend a facility booking** *(new in v06)*: change date, time, resource or duration; rules rechecked, amount recalculated; extra paid first or difference refunded (24-hour rule); original kept on failure | A | HMS-FAC-P-004, BR-093 | Must | Real | |
| 84 | *(changed in v08: facility refund instructions go to FIN-OPS refunds with maker-checker (138))* **Cancel a booking and determine the refund** *(new in v06)*: reason required; full refund ≥ 24 h, none < 24 h; club-initiated full refund or alternative slot; exceptional refund needs the Operations Manager; refund instruction to Finance | A | HMS-FAC-P-005, BR-094 … 096 | Must | Real (Finance simulated) | ⚑ D-105 … D-119 |
| 85 | **Facility no-show** *(new in v06)*: record a confirmed booking as a no-show; no standard refund | A | HMS-FAC-P-006, BR-097 | Must | Real | |
| 86 | *(changed in v08: facility payments recorded as FIN-OPS Payments with a PaymentNo (134))* **Facilities payment and Finance handoff** *(new in v06)*: payment method, success or failure recorded against the transaction, receipt, operational evidence handed to the Finance desk (no GL or Yonyou in Facilities) | A | HMS-FAC-P-007, BR-092 | Must | Simulated | ⚑ D-105 … D-119 |
| 87 | **Swimming admission** *(new in v06)*: admit within hours and capacity, admission fee where due, attendance and live occupancy; lessons referred to HMS Events | A | HMS-FAC-P-008, BR-098 | Must | Real | ⚑ D-105 … D-119 |
| 88 | *(changed in v07: the visitor pass now comes from an in-house resort stay instead of the simulated pass list (D-111), 113)* **Fitness Centre admission and day passes** *(new in v06)*: membership, bungalow visitor pass (complimentary) or day pass; non-members buy a day pass; same-day re-entry; capacity and attendance | A | HMS-FAC-P-009, BR-098 … 100 | Must | Real (visitor pass simulated) | ⚑ D-105 … D-119 |
| 89 | **Bowling counter transaction** *(new in v06)*: CMS record with receipt number, amount and payment method, paid at the counter before play; replaces the pen-and-paper log; lanes stay in the external system | A | HMS-FAC-P-010, BR-101 | Must | Real | |
| 90 | **Bowling reconciliation** *(new in v06)*: import the external Bowling export, match by receipt number, check amount, date and method, lock matched records, list exceptions | A | HMS-FAC-P-011, BR-102 | Must | Simulated file | ⚑ D-105 … D-119 |
| 91 | **Bowling exception resolution** *(new in v06)*: review CMS and external evidence, record a disposition and reason, escalate financial issues to Finance, re-run after correction | A | HMS-FAC-P-012, BR-103 | Must | Real (Finance simulated) | |
| 92 | **Facility waiting list** *(new in v06)*: join when no slot is free; FIFO offer for the response window; accept and pay to book; decline or expiry moves to the next; withdraw | A | HMS-FAC-P-016, BR-104 | Must | Real (timer simulated) | ⚑ D-105 … D-119 |
| 93 | **Facility and booking configuration** *(new in v06)*: facilities and resources (active / inactive), hours, capacity, booking windows, durations, eligibility, rates by category and day type, waiting-list settings; Draft until approved | A | HMS-FAC-P-013, BR-105 | Must | Real | ⚑ D-105 … D-119 |
| 94 | **Fitness Centre reference information** *(new in v06)*: equipment and instructor lists with active / inactive status | A | HMS-FAC-P-014 | Must | Real | |
| 95 | **Personal Training** *(new in v06)*: PT session record for a participant and trainer; eligibility check; scheduling, price and cancellation not assumed while the policy is TBC | A | HMS-FAC-P-017, BR-106 | Must | Real (policy TBC) | ⚑ D-105 … D-119 |
| 96 | **Facilities operational reports** *(new in v06)*: bookings, cancellations and no-shows, waiting list, utilisation, pool and gym attendance, sales and day passes, bowling register and exceptions; export | A | HMS-FAC-P-015, RR-001 … 008 | Must | Real (export as in 32) | ⚑ D-105 … D-119 |
| 101 | **Resort, room and add-on configuration** *(new in v07)*: resorts and locations, room types, rooms (accommodation units) and add-ons with prices; active / end-dated, never deleted; changes audited | A | HMS-RES-P-001, FR-001, DR-001 | Must | Real | ⚑ D-128 … D-144 |
| 102 | **Rates, seasons, discounts and reservation policy** *(new in v07)*: rate types, nightly rates by room type and day type, seasons, promotions, fixed and percentage discounts with combination and priority, minimum and maximum stay and reservation windows by member category; Draft until the Operations Manager approves; history unchanged | A | HMS-RES-P-002, FR-002 … 004, DR-002, BR-111, 120 | Must | Real | ⚑ D-128 … D-144 |
| 103 | **Create a resort reservation** *(new in v07)*: staff or member portal; search availability by dates, member status from MMS, minimum stay, window, maximum stay, rate (staff may assign a rate type), non-transferable, corporate lease zero-value and Committee / Honorary discounts; reservation number | A | HMS-RES-P-003, FR-005 … 010, DR-003, BR-107 … 111 | Must | Real | ⚑ D-128 … D-144 |
| 104 | **Group reservation** *(new in v07)*: several rooms under one master reference; all rooms must be available, or staff accept a revised set; one group folio | A | HMS-RES-P-004, FR-011, 012, BR-112 | Must | Real | ⚑ D-128 … D-144 |
| 105 | **Tentative hold** *(new in v07)*: hold rooms for the hold period; paid in time becomes Confirmed, otherwise expires and releases the rooms | A | HMS-RES-P-005, FR-013, 014, BR-113 | Must | Real (timer simulated) | ⚑ D-128 … D-144 |
| 106 | **Amend a reservation** *(new in v07)*: change dates or rooms with the 21-day rule: Lost Opportunity Charge 20 % before, processed as a cancellation at 21 days or less; guest cannot change | A | HMS-RES-P-006, FR-015 … 017, BR-110, 114 | Must | Real | ⚑ D-128 … D-144 |
| 107 | **Cancel a reservation** *(new in v07)*: 50 % / 100 % charge by the 21-day rule, rooms released, credentials and vehicle whitelist revoked, refundable amount sent for approval | A | HMS-RES-P-007, FR-018 … 020, BR-115 | Must | Real | ⚑ D-128 … D-144 |
| 108 | **Resort waitlist** *(new in v07)*: join when no room is free (no inventory blocked); when a room frees up, staff choose from the matching entries; decision audited; entry closes on conversion | A | HMS-RES-P-008, FR-021 … 024, DR-004, 005, BR-117 | Must | Real | ⚑ D-128 … D-144 |
| 109 | **Resort no-show** *(new in v07)*: process an unarrived reservation after the cutoff with a 100 % charge | A | HMS-RES-P-009, FR-025, 026, BR-116 | Must | Real | ⚑ D-128 … D-144 |
| 110 | **Payment and guest folio** *(new in v07)*: collect a deposit or stay payment; success only on confirmation; every charge, payment, discount and credit on the folio; receipt | A | HMS-RES-P-010, FR-027, 028, IR-001, BR-118 | Must | Real (payment simulated) | ⚑ D-128 … D-144 |
| 111 | *(changed in v08: resort refund instruction released by FIN-OPS maker-checker after the Operations Manager's approval (138))* **Resort refund** *(new in v07)*: refund against the original payment, approved by the Operations Manager, instruction to Finance | A | HMS-RES-P-011, FR-029, DR-006, IR-002, BR-119 | Must | Real (Finance simulated) | ⚑ D-128 … D-144 |
| 112 | **Discounts, credit notes and adjustments** *(new in v07)*: fixed or percentage discount in priority order; adjust an unpaid item or issue a credit note for a paid one, each approved by the Operations Manager, keeping the original reference | A | HMS-RES-P-012, FR-030 … 034, DR-007, 008, BR-120, 121 | Must | Real | ⚑ D-128 … D-144 |
| 113 | **Check in a guest** *(new in v07)*: Confirmed reservation, arrival date 3 – 6 PM (or an approved late arrival), room ready; room Occupied, folio opened, Salto PIN issued; the stay counts as a resort guest for Facilities | A | HMS-RES-P-013, FR-035 … 039, BR-122, 123 | Must | Real | ⚑ D-128 … D-144 |
| 114 | **In-house stay and guest charges** *(new in v07)*: post an add-on or charge to the folio, extend the stay or move room when available | A | HMS-RES-P-014, FR-040 … 043, BR-124 | Must | Real | ⚑ D-128 … D-144 |
| 115 | **Vehicle registration and whitelist** *(new in v07)*: up to 2 vehicles per reservation (IU or OBU), first free, second charged to the folio; whitelist sent to Alphawave for the stay; revoked at check-out or cancellation | A | HMS-RES-P-015, FR-044 … 050, DR-009, IR-003, BR-126 | Must | Real (Alphawave simulated) | ⚑ D-128 … D-144 |
| 116 | **Housekeeping and room readiness** *(new in v07)*: room board of Pending Cleaning, Cleaning and Ready rooms; housekeeping updates the state; a fault found goes to a maintenance block | A | HMS-RES-P-016, FR-051, 052, DR-010, BR-123 | Must | Real | ⚑ D-128 … D-144 |
| 117 | **Maintenance room blocks** *(new in v07)*: mark a room Faulty or Maintenance Blocked with a reason; excluded from sale and check-in; returned only after completion is recorded | A | HMS-RES-P-017, FR-053, 054, DR-011, BR-125 | Must | Real | ⚑ D-128 … D-144 |
| 118 | **Accommodation access credentials** *(new in v07)*: Salto PIN generated for a Confirmed stay, valid for the stay only, regenerate (old one invalid), deactivated at check-out or cancellation; audited | A | HMS-RES-P-018, FR-055, 056, 058 … 060, DR-012, IR-004, BR-127 | Must | Real (Salto simulated) | ⚑ D-128 … D-144 |
| 119 | **Check out a guest** *(new in v07)*: folio settled first, due before 10 AM; room Pending Cleaning; credentials and vehicles revoked; receipt | A | HMS-RES-P-019, FR-061 … 064, BR-128 | Must | Real | ⚑ D-128 … D-144 |
| 120 | **Reverse check-in or check-out** *(new in v07)*: request with a reason, Operations Manager approves, prior states restored, original event kept | A | HMS-RES-P-020, FR-065, DR-013, BR-129 | Must | Real | ⚑ D-128 … D-144 |
| 121 | **Night Audit and business-day close** *(new in v07)*: run the checks for the demo business day, list blocking exceptions and warnings, close the day only when clear, hand the day's records to FIN-OPS | A | HMS-RES-P-021, FR-066, 067, DR-014, BR-130 | Must | Real | ⚑ D-128 … D-144 |
| 122 | *(changed in v08: FIN-OPS events now land in the Finance module's intake register (130))* **FIN-OPS handoff** *(new in v07)*: every resort financial event (charge, payment, refund, adjustment, cancellation or no-show charge, Night Audit) with its source reference and FIN-OPS status on the Finance desk; rejections kept for retry | A | HMS-RES-P-022, DR-015, IR-005, 006, BR-131 | Must | Simulated | ⚑ D-128 … D-144 |
| 123 | **Resorts reports** *(new in v07)*: arrivals and departures, occupancy, collections, operational and audit reports (RES-RR-001 … 005) in the Report Catalogue, with export | A | HMS-RES-P-023, RR-001 … 005 | Must | Real | ⚑ D-128 … D-144 |
| 124 | **Resort audit log** *(new in v07)*: search the audit trail of a reservation, room, vehicle, credential or financial action, read only | A | HMS-RES-P-024, FR-068, DR-016 | Must | Real | ⚑ D-128 … D-144 |
| 125 | **Resort notifications** *(new in v07)*: configured events (confirmation, hold expiry, cancellation, waitlist offer, check-in PIN, check-out receipt) go to the notification outbox; failures never undo the action | A | HMS-RES-P-025, NR-001, 002, IR-007, BR-132 | Must | Simulated | ⚑ D-128 … D-144 |
| 129 | **Finance home** *(new in v08)*: replaces the simulated Finance desk; KPI tiles (events today, open exceptions, unapplied cash, overdue receivables), charts of events by module and exceptions by category, the two posting runs of the day, the Finance availability switch and the work queues | A | P-001 … P-019 (README module boundary), BR-023 | Must | Real | |
| 130 | **Financial event intake** *(new in v08)*: one register of events from MMS, GMS, HMS Events, HMS Facilities, HMS Resorts and an external POS file; accept only approved sources, unique source identity, required amount, tax and source reference, classify; source errors go back to the module, Finance errors stay in FIN-OPS; in-house charges blocked without the upstream credit check | A | FIN-OPS-P-001, FR-001 … 007, 162; BR-001 … 003, 071, 072, 092 … 095, 145 | Must | Real | |
| 131 | **Accounting postings with GST** *(new in v08)*: resolve the active approved mapping, generate every debit and credit leg, Output GST 9 % as its own leg, debits = credits, rounding up to S$0.01 only, block an unmapped or unbalanced set | A | FIN-OPS-P-003, FR-015 … 022; BR-004, 006 … 019 | Must | Real | |
| 132 | **Finance configuration with maker-checker** *(new in v08)*: accounting mappings with legs and effective dates, tax rate, payment methods, posting run schedule, refund approval matrix, dunning policy and GIRO fee; a change is a Draft until a second person approves it; no overlap; prospective only | A | FIN-OPS-P-002, FR-008 … 014; BR-012, 013, 098; OD-012; 26 Oct cadence decision | Must | Real | |
| 133 | **Member account and receivables** *(new in v08)*: one receivable per positive charge, none for credit lines, no duplicates; outstanding balance, available credit and ageing; Statement of Account with its issue history | A | FIN-OPS-P-004, FR-023 … 028, 157, 158; BR-020, 021, 024 … 027, 052, 139, 140 | Must | Real | |
| 134 | **Payments, receipts and allocation** *(new in v08)*: record a Payment for real money only, with a PaymentNo receipt (reprint keeps the number); allocate to the referenced bill first, then oldest due first; partial payments; excess kept as unapplied credit; cheque Pending Clearance; cashier and session recorded | A | FIN-OPS-P-005, FR-029 … 034, 150 … 156, 159; BR-026, 029, 036, 127 … 130, 136 … 138, 142, 146 | Must | Real | |
| 135 | **Standing orders and collection run** *(new in v08)*: Active / Suspended / Cancelled instructions, one active per membership and type, Maximum Debit Amount per collection, masked bank reference; run the month's GIRO collection | A | FIN-OPS-P-006, FR-035 … 040; BR-030 … 034; OD-002, 003 | Must | Real | |
| 136 | **Bank results and recovery** *(new in v08)*: apply the bank's results; accepted becomes a Payment; rejected and returned attempts kept with reason, no automatic retry, invalid mandate stops collection; second GIRO rejection in a month adds the admin fee; returned cheque reopens the receivable | A | FIN-OPS-P-007, FR-041 … 047, 160; BR-078 … 083, 143; OD-007 | Must | Real | |
| 137 | **Spending credit** *(new in v08)*: award recorded as a member-account credit, never a payment or receivable; original award unchanged; 24-month validity; unused balance expires through a non-cash adjustment, never refunded | A | FIN-OPS-P-008, FR-048 … 052; BR-022 … 025, 028; OD-001 | Must | Real | |
| 138 | **Finance refunds** *(new in v08)*: deposit offsets first; prepared by the Finance Officer, approved by the Finance Approver (never the same person) through the approval matrix; settled to the original economic source; in-house credit restored to the member account, never paid out in cash; module refund instructions arrive here | A | FIN-OPS-P-009, FR-053 … 061, 166, 167; BR-035, 037 … 044, 063, 148, 149; OD-004 | Must | Real | |
| 139 | **Deferred revenue and recognition** *(new in v08)*: deposits and advance fees held as deferred revenue; resort stays recognised per night from HMS Resorts' stay dates; events when delivered; no second GST | A | FIN-OPS-P-010, FR-062 … 067; BR-017, 045 … 048; OD-010 | Must | Real | |
| 140 | **Entrance fee amortisation** *(new in v08)*: schedule from MMS's fee and term; the monthly run only after a zero-variance reconciliation; stops on termination or death, resumes on reinstatement, history never rewritten | A | FIN-OPS-P-011, FR-068 … 075; BR-049 … 055, 059; OD-006 | Must | Real | |
| 141 | **Reconciliation, clearing and cashier close** *(new in v08)*: profiles with auto-match; clearing accounts must reach zero; variances above S$0.01 block completion; timing items recorded; cashier session batch close (expected vs actual by tender) and bank-in | A | FIN-OPS-P-012, FR-076 … 083, 161, 163 … 165; BR-056 … 058, 060, 062, 144, 147 | Must | Real | |
| 142 | **Adjustments, reversals and overrides** *(new in v08)*: Finance-owned corrections only (source errors go back to the module), independent approval, no self-approval, Yonyou-accepted postings corrected by reversal; credit-limit override with authority, audited | A | FIN-OPS-P-013, FR-084 … 090; BR-063 … 068, 077, 096, 097 | Must | Real | |
| 143 | **Financial periods and month-end** *(new in v08)*: April – March financial year; periods Open, Closed or Reopened; prior-period posting only while open; a late item goes to the current open period with its source date kept | A | FIN-OPS-P-014, FR-091 … 096; BR-073 … 076 | Must | Real | |
| 144 | **Yonyou staging and release** *(new in v08)*: two scheduled runs per business day plus ad-hoc; only posting-ready lines with no blocking exception; revalidate every control; unique batch ID; file export (simulated); a transport failure retries the same staged batch | A | FIN-OPS-P-015, FR-097 … 103; BR-070, 084 … 090; OD-008, OD-011 (superseded by the 26 Oct decision) | Must | Real | |
| 145 | **Yonyou responses** *(new in v08)*: import the response (simulated), match to the batch, keep the ERP document numbers, finalise only when reconciled; rejected lines become exceptions; no duplicate resubmission | A | FIN-OPS-P-016, FR-104 … 109; BR-087, 100 | Must | Real | |
| 146 | **Financial exceptions** *(new in v08)*: one register and lifecycle for every blocking condition: category, owner (Finance, source module or external party), age, history; closed only when resolved or recorded as a reconciling item | A | FIN-OPS-P-017, FR-110 … 116; BR-069, 070 | Must | Real | |
| 147 | **Dunning and collection follow-up** *(new in v08)*: eligible overdue balance and age; stages by the active policy; partial payment re-evaluates, full clearance closes; hold with a reason pauses; reminders to the outbox; a stage needing a membership action creates an MMS escalation, never a direct suspension | A | FIN-OPS-P-018, FR-117 … 129; BR-101 … 110 | Must | Real | |
| 148 | **General Accounts Receivable** *(new in v08)*: General Debtor accounts (corporate and non-member); manual invoice only for a Finance-originated use case, prepared and approved by two people; recurring arrangements; credit notes and debit notes with lineage; due-date ageing; statements; corporate billing | A | FIN-OPS-P-019, FR-130 … 149, 168, 169; BR-111 … 136, 141, 150, 151; OD-013 … 020 | Must | Real | |
| 149 | **Finance reports** *(new in v08)*: 10 FIN-OPS reports in the Report Catalogue for Finance roles: daily reconciliation summary, bank collection results, refund register, deferred revenue, entrance fee amortisation, Yonyou batch status, exception register, aged receivables and dunning, General Debtor ageing, cashier close | A | FIN-OPS-RR-002, 005, 006, 007, 008, 011, 012, 013, 015, 017 | Must | Real | |
| 150 | **Report visuals** *(new in v08, from the prompt)*: every report shows up to 4 KPI tiles and a chart that fits its data (bar, stacked bar, line trend or donut), drawn in inline SVG in both themes; the management dashboard, Finance home and the module home pages show charts too | A | Prompt (KO-027) ⚑ RC-087 | Must | Real | |
| 151 | **Colour-coded table rows** *(new in v08, from the prompt)*: every table has alternating row shading, and a row with a status carries that status's colour as a left marker and a light tint | A | Prompt (KO-027) ⚑ RC-086 | Must | Real | |
| 157 | **CC-Demo name** *(new in v09, from the prompt)*: every visible "NSRCC" in the web app, the guides and the demo pack reads "CC-Demo" | A | Prompt (KO-028) ⚑ RC-091, RC-092 | Must | Real | |
| 158 | **Launcher redesign** *(new in v09, from the prompt; step 1)*: hero with a KPI row; one card per module with icon, a one-line summary of its guide, counts, **Open guide** and **Start first scenario**; roles grouped by area, each described in one line; module details in tabs; member tabs in an accordion; cards in one colour, card buttons in a second colour scheme | A | Prompt (KO-028) ⚑ RC-093 … RC-098 | Must | Real | |
| 159 | **Visual refinement: Membership (MMS)** *(new in v09; step 2)*: the module's pages refined visually; the detail is proposed and agreed in its own step | A | Prompt (KO-028), RC-090 | Must | Real | |
| 160 | **Visual refinement: Club Reporting** *(new in v09; step 3)*: the module's pages refined visually; the detail is proposed and agreed in its own step | A | Prompt (KO-028), RC-090 | Must | Real | |
| 161 | **Visual refinement: Golf (GMS)** *(new in v09; step 4)*: the module's pages refined visually; the detail is proposed and agreed in its own step | A | Prompt (KO-028), RC-090 | Must | Real | |
| 162 | **Visual refinement: HMS Events** *(new in v09; step 5)*: the module's pages refined visually; the detail is proposed and agreed in its own step | A | Prompt (KO-028), RC-090 | Must | Real | |
| 163 | **Visual refinement: HMS Facilities** *(new in v09; step 6)*: the module's pages refined visually; the detail is proposed and agreed in its own step | A | Prompt (KO-028), RC-090 | Must | Real | |
| 164 | **Visual refinement: HMS Resorts** *(new in v09; step 7)*: the module's pages refined visually; the detail is proposed and agreed in its own step | A | Prompt (KO-028), RC-090 | Must | Real | |
| 165 | **Visual refinement: Finance (FIN-OPS)** *(new in v09; step 8)*: the module's pages refined visually; the detail is proposed and agreed in its own step | A | Prompt (KO-028), RC-090 | Must | Real | |
| 166 | **Scenario guide side panel** *(new in v09, after SO-025; trial on SC-01 in D-207)*: every launcher Start link opens its scenario with `?guide=SC-xx`; every role tab then shows a Guide button and a right-hand panel listing the whole scenario (what to do, what you should see), with this tab's steps marked, the current step highlighted and an Open-role-tab link for other roles' steps; End guide clears it in every tab. Steps are data in the seed, taken from the module guides | A | User (KO-028 run, D-207) | Must | Real | ⚑ Scope change |

## Not selected (deferred – not in demo)

| # | Requirement | Reason |
|---|---|---|
| 33 | Bulk actions (bulk renewal reminders, bulk approvals) | D, Deferred – not in demo |
| 34 | Real email / SMS delivery, real Finance (Yonyou), Access Control, HMS, GMS integration | Not feasible in a static demo; simulated instead (29, 31, 24) |
| 35 | Portal sign-in, 2FA, Active Directory | Not feasible; a role switcher stands in |
| 36 | Document upload and storage | Not feasible offline; documents are ticked as received |
| 44 | Scheduled and subscription report delivery (RPT-P-005) | No approved requirement; the PRD says nothing may be built until confirmed ⚑ RC-005 |
| 45 | Golf operations screens | Brought back at the v03 keep list (D-042) and delivered as features 46 – 57 |
| 58 | Balloting, PC Test and Courtesy Round administration, tournaments (HMS Events), buggy fleet, driving range, private competitions | Outside native GMS scope (all GMS PRDs §4) |
| 59 | Pace of play, marshal directions, blue-tee approval | Information only; no tee-colour or marshal workflow in the demo (D-051) |
| 72 | Kiosk event registration and manual price override | Excluded from the HMS Events target-state baseline (all HMS-EVT PRDs §4) |
| 73 | Instructor and vendor payments; the function-room reservation lifecycle | Outside HMS Events scope; the room lifecycle stays with the Function Room Booking System (§4) |
| 97 | Bowling lane, game, scoring and equipment control | Stays in the external Bowling Management System (HMS-FAC-FR-052) |
| 98 | Fitness equipment maintenance and work orders | Out of the HMS Facilities baseline (HMS-FAC-FR-069) |
| 99 | Swimming lessons and programmes; Finance GL, tax and Yonyou configuration | Owned by HMS Events and Finance (HMS-FAC-BR-010, FR-066) |
| 100 | PT scheduling, trainer calendars, PT pricing, payment, cancellation and no-show policy | TBC in source (HMS-FAC-P-017 §12); not assumed |
| 126 | Accommodation Pass | HMS-RES-P-018 cannot be finalised: implementation, endpoint and eligibility TBC (HMS-RES-OI-014); Salto PIN only |
| 127 | F&B and restaurant POS, kiosks, guest identity documents, pre-arrival registration, committee spending allowance, card clearing fees | Outside HMS Resorts scope (all HMS-RES PRDs §4) |
| 128 | GST, GL and receivables mapping and Yonyou posting for resorts | Owned by FIN-OPS (IR-006); the demo keeps the FIN-OPS reference only |
| 152 | Real Yonyou API or file transport, bank and payment-provider files | Not feasible in a static demo; simulated (FR-103 TBC, OD-008) |
| 153 | APTSYS / Epoint POS vendor specifics | Vendor TBC (OD-009); a generic external POS file is simulated |
| 154 | Interest and late-payment charges | Disabled unless a policy enables them (OD-019); the setting is shown off |
| 155 | FIN-OPS reports RR-003, 004, 009, 010, 014, 016, 018, 019, 020 | Covered by their screens (postings, clearing, adjustments, periods, dunning actions, General AR listing, file matching, documents); not added as catalogue reports |
| 156 | Statement display suppression, corporate entrance-fee variant, GST rate-change rebilling | Edge cases with no demo story (FR-158, FR-075, BR-018) |

## Dropped in v08

No feature dropped (D-153). The D-150 UI-12 exception is dropped: the refreshed layout base lines field-and-button rows up by itself. #34 and #128 re-checked: FIN-OPS is now in the demo (129 – 149); the real Yonyou, bank and payment-provider links stay simulated (152).

## Dropped in v07

None: the keep list kept everything (D-127). #34 re-checked: Salto, Alphawave, the payment gateway, FIN-OPS and the notification service stay simulated.

## Dropped in v06

None: the keep list kept everything (D-104). #73 re-checked: the function-room reservation lifecycle is not in the HMS Facilities PRDs either, so it stays not selected.

## Not selected – over cap (rapid build only; a record, never built)

| # | Item | Type | Cap | Dropped at (skill) | D-xxx |
|---|---|---|---|---|---|
| — | None: every cap is 999 | — | — | — | — |

## Pending clarification

| # | Requirement | RC-xxx | Doubt |
|---|---|---|---|
| — | None (RC-090 … RC-098 resolved, D-180 … D-188) | — | — |

## Selection record
Selected by: Jason Quek Ghee Khang · Method: Auto (KO-007) · 2026-10-28 14:35 SGT · Decision ID D-015

v02 selected by: Jason Quek Ghee Khang · Method: Agree-to-all (RC-007 Explicit) · 2026-10-29 10:01 SGT · Decision ID D-033

v03 selected by: Jason Quek Ghee Khang · Method: Agree-to-all · 2026-11-02 10:00 SGT · Decision ID D-052

v04 selected by: Jason Quek Ghee Khang · Method: Agree-to-all · 2026-11-04 10:12 SGT · Decision ID D-076

v05 selected by: Jason Quek Ghee Khang · Method: Agree-to-all · 2026-11-04 15:14 SGT · Decision ID D-094

v06 selected by: Jason Quek Ghee Khang · Method: Agree-to-all · 2026-11-04 16:34 SGT · Decision ID D-120

v07 selected by: Jason Quek Ghee Khang · Method: Agree-to-all · 2026-11-05 10:37 SGT · Decision ID D-145

v08 selected by: Jason Quek Ghee Khang · Method: Agree-to-all · 2026-11-05 13:44 SGT · Decision ID D-172

v09 selected by: Jason Quek Ghee Khang · Method: Explicit · 2026-11-05 15:40 SGT · Decision ID D-189

## ✚ Change after the pre-build sign-off SO-032 (RC-102, D-249), 2026-11-06 14:52 SGT
| Feature | Before | Now |
|---|---|---|
| 151 Colour-coded table rows | v01 (Membership pages) and each later module: alternating shading **and** a status-coloured left marker and tint (Story-040) | **Amended for the whole build (v01 – v07):** alternating row shading only; no status tint and no left marker; status by the badge and the journey rail. Story-040 removed; held as an NFR in `prd-v2.md` §7 |
| 159 Visual refinement: Membership | Story-040 | Story-037 (delivered by design pass 3, D-247) |

v01 still builds 42 features (151 amended, not dropped). Decided by Jason Quek Ghee Khang, Explicit (replies "1. keep the alternative row shading", 2 – 6 "yes").
