> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Keep list: CC-Demo full build v03 (from v02)

Built from v02 (`output/full-build-v02/`, Final approval SO-036). Every item is **keep** by default. This is an imported lineage, so every item needs an explicit answer (no "agree to all"). Items marked **· v03 link** are kept, then changed in v03 only where they connect to Golf (KO-031 prompt). Golf itself (Story-109 – 122, BR-036 – 060) is not on this list: it comes in through Phase 1 from PRD v3 §5.2 `Deferred to v03`.

Drop rule: a dropped item takes with it the pages, rule functions, transitions, seed records and test scenarios that only it uses.

## Requirements (PRD v3 §5.1 built in v01, §5.1b built in v02)
| # | Story | Feature · rules | v03 |
|---|---|---|---|
| 1 | Story-001 Member search and 360° profile | 1 |  |
| 2 | Story-002 Profile edit with before/after | 2 · BR-026, 027, 171, 177 |  |
| 3 | Story-003 New application through the checks | 3 · BR-002, 003, … |  |
| 4 | Story-004 Approve application, activate on payment | 3 · BR-001, 005, 006, 029, 030, 173, 174, 178 |  |
| 5 | Story-005 Portal renewal 1–3 years | 4, 27 · BR-006, 008, 009, 029, 085 |  |
| 6 | Story-006 Full/Basic conversion | 5 · BR-008, 010 |  |
| 7 | Story-007 Transfer | 6 · BR-004, 011 |  |
| 8 | Story-008 Extension routed by length | 7 · BR-008, 012 |  |
| 9 | Story-009 Withdrawal after balance cleared | 8, 27 · BR-013, 178 |  |
| 10 | Story-010 Lifecycle check and rejoin | 9 · BR-014 |  |
| 11 | Story-011 Deceased member, beneficiary, goodwill refund | 10 · BR-011, 015 |  |
| 12 | Story-012 Absent period 3–24 months | 11 · BR-016, 019, 174 |  |
| 13 | Story-013 Medical period up to 12 months | 12 · BR-017, 019 |  |
| 14 | Story-014 Lifecycle check ends absent/medical periods | 11, 12 · BR-016, 017, 019 |  |
| 15 | Story-015 Suspension and reinstatement | 13 · BR-005, 018, 019 |  |
| 16 | Story-016 Status transition matrix | 14 · BR-018, 019 | v03 link: golf eligibility reads the membership status and privileges (no copy of member records) |
| 17 | Story-017 Supplementary memberships | 15 · BR-020 |  |
| 18 | Story-018 Junior watch list | 16 · BR-021 |  |
| 19 | Story-019 Corporate memberships and nominees | 17 · BR-022 |  |
| 20 | Story-020 Committee / Honorary classification | 18 · BR-005 |  |
| 21 | Story-021 Contract and financial terms | 19 · BR-023, 174 |  |
| 22 | Story-022 Available credit check | 20 · BR-023 |  |
| 23 | Story-023 Vehicles and car labels | 21 · BR-024 |  |
| 24 | Story-024 Digital card issue and replace | 22 · BR-025 |  |
| 25 | Story-025 Referral reward under an active campaign | 23 · BR-007, 030 |  |
| 26 | Story-026 Campaigns and outbox | 24 · BR-026 |  |
| 27 | Story-027 Effective-dated configuration | 26 · BR-028 | v03 link: golf settings (tee sheet, booking and waitlist limits) sit in Configuration |
| 28 | Story-028 Portal: own membership and card | 27 · BR-085 |  |
| 29 | Story-029 Approvals inbox, return for correction | 28 · BR-005, 175, 176 |  |
| 30 | Story-030 Finance stub payments | 29 · BR-006, 178 | v03 link: golf charges go to the Finance stub (stays a stub, Known limit) |
| 31 | Story-031 Membership dashboard with charts | 30, 150 | v03 link: links to the golf reports |
| 32 | Story-032 Integration feed | 31 · BR-177 |  |
| 33 | Story-033 Launcher opens each role in its own tab | 74 · BR-084 | v03 link: golf role entries |
| 34 | Story-034 Tab keeps its role, blocks other pages | 75 · BR-084 | v03 link: role-to-page map adds the golf pages |
| 35 | Story-035 Module details on the launcher | 77 | v03 link: Golf tab gets its scenarios; launcher fix (button renamed "Module details", always opens and scrolls) |
| 36 | Story-036 Planned modules "Coming in v0N" | 168 | v03 link: Golf goes live; four stay planned |
| 37 | Story-037 v09 launcher design, refined pages (incl. 159) | 157 – 159 | v03 link: live Golf card |
| 38 | Story-038 Scenario guide side panel | 166 | v03 link: guides for the golf scenarios |
| 39 | Story-039 Export, import, reset | 167 | v03 link: golf collections in the file check |
| 40 | Story-101 Membership reports MMS-RR-001 – 008 and the audit review | 25, 39 · BR-031 – 033 | v03 link: golf report builders GMS-RR-001 – 012 added (Story-109) |
| 41 | Story-102 Excel and PDF export | 32 · BR-034 | v03 link: export designation of the golf reports |
| 42 | Story-103 Report catalogue by role | 37 · BR-031 | v03 link: golf reports switch from "Coming in v03" to runnable |
| 43 | Story-104 Parameterised runs, valid empty result | 38 · BR-032, 033 |  |
| 44 | Story-105 User-defined reports and dashboards | 41 · BR-035 | v03 link: definitions may build on golf reports |
| 45 | Story-106 Legacy report finder | 42 | v03 link: GMS legacy names link to the live golf reports |
| 46 | Story-107 Report access rules | 43 · BR-031 | v03 link: golf reports in the access rules (Golf Operations role) |
| 47 | Story-108 Club Reporting pages refined, report visuals | 150, 160 |  |

## Business rules (45 built in v01 – v02, `prd/business-rules.md`)
| # | Rules | v03 |
|---|---|---|
| 48 | BR-001 – BR-010 (application, eligibility, maker-checker, payment, referral, term, renewal, conversion) |  |
| 49 | BR-011 – BR-020 (transfer, extension routing, withdrawal, lifecycle, deceased, absent, medical, status matrix, privileges, supplementary) | v03 link: BR-019 privileges read by golf eligibility |
| 50 | BR-021 – BR-030 (junior, corporate, credit, vehicles, card, consent, profile, configuration, fee, campaign) |  |
| 51 | BR-031 – BR-035 (report access, parameters, no-data, export designation, definitions) *(v02)* | v03 link: applied to the golf reports |
| 52 | BR-084 role tab and page map | v03 link: golf pages added |
| 53 | BR-085 member tab sees only its own account | v03 link: the member books only for their own account |
| 54 | BR-171 – BR-178 (validation, derivation, read-only after submit, return reason, status feed, Finance stub) | v03 link: BR-178 Finance stub takes golf charges |

## Workflows (`artifacts/diagrams/workflow-request-full-v03.md`)
| # | Workflow | v03 |
|---|---|---|
| 55 | Membership Request (17 request types, 9 transitions) |  |
| 56 | Membership status (transition matrix) |  |
| 57 | Role tab and launcher | v03 link: golf pages |
| 58 | Demo data (export, import, reset) | v03 link: golf collections |
| 59 | Club Reporting: Report run, Report definition, Report access rule *(v02)* | v03 link: golf reports |

## Data (`artifacts/data-model/schema-v03.json`)
| # | Entity | v03 |
|---|---|---|
| 60 | meta |  |
| 61 | modules | v03 link: Golf set live |
| 62 | config | v03 link: golf settings |
| 63 | persons | v03 link: golfers are these persons (no duplicate records) |
| 64 | memberships | v03 link: golf eligibility reads status and type |
| 65 | requests |  |
| 66 | handoffs | v03 link: golf hand-offs |
| 67 | financeStub | v03 link: golf charges |
| 68 | vehicles |  |
| 69 | cards |  |
| 70 | outbox |  |
| 71 | integrationEvents |  |
| 72 | audit | v03 link: golf actions audited |
| 73 | guides | v03 link: golf scenario guides |
| 74 | reports *(v02)* | v03 link: golf reports runnable (plannedIn removed) |
| 75 | accessRules *(v02)* | v03 link: golf reports and role |
| 76 | reportRuns *(v02)* |  |
| 77 | definitions *(v02)* |  |
| 78 | dashboards *(v02)* |  |
| 79 | legacyReports *(v02)* |  |

## Screens (`design/screen-inventory.md`)
| # | Screen | v03 |
|---|---|---|
| 80 | SCR-32 Launcher `index.html` | v03 link: live Golf card, details, roles; "Module details" button fix |
| 81 | SCR-01 Dashboard `dashboard.html` | v03 link: links to the golf reports |
| 82 | SCR-02 Members |  |
| 83 | SCR-03 Member 360 |  |
| 84 | SCR-04 New application |  |
| 85 | SCR-05 New request |  |
| 86 | SCR-06 Requests |  |
| 87 | SCR-07 Request detail |  |
| 88 | SCR-08 Approvals |  |
| 89 | SCR-10 Communications |  |
| 90 | SCR-12 Configuration | v03 link: golf settings; golf reports in Report access |
| 91 | SCR-13 Member Portal | v03 link: golf bookings (if a golf story needs it, decided in p3-04) |
| 92 | SCR-14 Integration feed | v03 link: golf events to the Finance stub |
| 93 | SCR-11 Report Catalogue *(v02)* | v03 link: golf reports live |
| 94 | SCR-15 Report *(v02)* | v03 link: golf report builders |
| 95 | SCR-16 Report definitions *(v02)* |  |
| 96 | SCR-17 Management dashboard *(v02)* |  |
| 97 | SCR-18 Legacy report finder *(v02)* | v03 link: GMS successors live |

## Design
| # | Item | v03 |
|---|---|---|
| 98 | Design system v3 and direction pass 3 (`design/design-system-v3.md`, `design-direction.md`; D-247): NSRCC Brand Guideline palette, Lato, journey rail, quiet launcher, role avatar | Golf pages use it unchanged |
| 99 | D-241 success colour `#077D3C` (adjusted for contrast) |  |
| 100 | D-248 Layout-06 exception: tables left-aligned per the guideline |  |
| 101 | D-249 / D-250 tables: alternating row shading only, ID as link, Lilac mist hover | applies to golf tables |
| 102 | Reporting components *(v02, D-271)*: line chart, report print layout |  |

## Brief
| # | Item | v03 |
|---|---|---|
| 103 | Decision to inform. v02: *should we build Club Reporting (role-governed catalogue, parameterised runs, export, definitions and dashboard) on the Membership base?* | Restate for v03: *should we build Golf (tee sheets, booking and waitlist, check-in, rain checks, eligibility imports, capacity blocks, shift close, golf reports) on the Membership and Club Reporting base, reusing member data and eligibility?* |

## ⚠ Open overrides
None (0 open `Override-xxx`).
