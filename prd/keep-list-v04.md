> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Keep list: CC-Demo full build v04 (from v03)

Built from v03 (`output/full-build-v03/`, Final approval SO-038). Every item is **keep** by default. This is an imported lineage, so every item needs an explicit answer (no "agree to all"). Items marked **· v04 link** are kept, then changed in v04 only where they connect to Events (KO-032 prompt); **v04 change** marks the Report catalogue change the prompt asks for. Events itself (Story-123 – 135, BR-061 – 083) is not on this list: it comes in through Phase 1 from PRD v4 §5.2 `Deferred to v04`.

Drop rule: a dropped item takes with it the pages, rule functions, transitions, seed records and test scenarios that only it uses.


## Requirements (PRD v4 §5.1 v01, §5.1b v02, §5.1c v03)
| # | Story | Feature · rules | v04 |
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
| 16 | Story-016 Status transition matrix | 14 · BR-018, 019 | v04 link: event eligibility reads status and privileges (BR-063) |
| 17 | Story-017 Supplementary memberships | 15 · BR-020 | v04 link: dependants (supplementary members) registered as participants by relationship |
| 18 | Story-018 Junior watch list | 16 · BR-021 |  |
| 19 | Story-019 Corporate memberships and nominees | 17 · BR-022 |  |
| 20 | Story-020 Committee / Honorary classification | 18 · BR-005 |  |
| 21 | Story-021 Contract and financial terms | 19 · BR-023, 174 |  |
| 22 | Story-022 Available credit check | 20 · BR-023 |  |
| 23 | Story-023 Vehicles and car labels | 21 · BR-024 |  |
| 24 | Story-024 Digital card issue and replace | 22 · BR-025 |  |
| 25 | Story-025 Referral reward under an active campaign | 23 · BR-007, 030 |  |
| 26 | Story-026 Campaigns and outbox | 24 · BR-026 |  |
| 27 | Story-027 Effective-dated configuration | 26 · BR-028 |  |
| 28 | Story-028 Portal: own membership and card | 27 · BR-085 |  |
| 29 | Story-029 Approvals inbox, return for correction | 28 · BR-005, 175, 176 |  |
| 30 | Story-030 Finance stub payments | 29 · BR-006, 178 | v04 link: event fees and refunds to the Finance stub (stays a stub, Known limit) |
| 31 | Story-031 Membership dashboard with charts | 30, 150 | v04 link: events today on the Dashboard (if a story needs it, p3-04) |
| 32 | Story-032 Integration feed | 31 · BR-177 |  |
| 33 | Story-033 Launcher opens each role in its own tab | 74 · BR-084 | v04 link: Events Team role entry; Golf Operations also acts as the event counter CSO (Story-125) |
| 34 | Story-034 Tab keeps its role, blocks other pages | 75 · BR-084 | v04 link: role-to-page map adds the event pages |
| 35 | Story-035 Module details on the launcher | 77 | v04 link: Events tab gets its scenarios |
| 36 | Story-036 Planned modules "Coming in v0N" | 168 | v04 link: Events goes live; three stay planned |
| 37 | Story-037 v09 launcher design, refined pages (incl. 159) | 157 – 159 | v04 link: live Events card |
| 38 | Story-038 Scenario guide side panel | 166 | v04 link: guides for the event scenarios |
| 39 | Story-039 Export, import, reset | 167 | v04 link: event collections in the file check |
| 40 | Story-101 Membership reports MMS-RR-001 – 008 and the audit review | 25, 39 · BR-031 – 033 |  |
| 41 | Story-102 Excel and PDF export | 32 · BR-034 | **v04 change:** the catalogue's Export badge becomes one button per format (PDF, XLS) that runs and exports, recorded as a run with its export (prompt) |
| 42 | Story-103 Report catalogue by role | 37 · BR-031 | v04 link: event reports in the catalogue, if any (Phase 1); **v04 change:** Status column export buttons |
| 43 | Story-104 Parameterised runs, valid empty result | 38 · BR-032, 033 |  |
| 44 | Story-105 User-defined reports and dashboards | 41 · BR-035 |  |
| 45 | Story-106 Legacy report finder | 42 | v04 link: event legacy names, if any |
| 46 | Story-107 Report access rules | 43 · BR-031 | v04 link: Events Team in the access rules |
| 47 | Story-108 Club Reporting pages refined, report visuals | 150, 160 |  |
| 48 | Story-109 Golf reports GMS-RR-001 – 012 *(v03)* | 40 · BR-031 – 034 |  |
| 49 | Story-110 Tee sheet setup and publication *(v03)* | 46 · BR-036 |  |
| 50 | Story-111 Golf booking (portal and counter) *(v03)* | 47 · BR-037 – 043 |  |
| 51 | Story-112 Automated waitlist *(v03)* | 48 · BR-044 |  |
| 52 | Story-113 Amend and cancel a booking *(v03)* | 49 · BR-045 – 047 |  |
| 53 | Story-114 Check-in and release to play *(v03)* | 50 · BR-048 – 050 |  |
| 54 | Story-115 Late arrival and no-show *(v03)* | 51 · BR-051 |  |
| 55 | Story-116 Course suspension and rain checks *(v03)* | 52 · BR-052 – 055 |  |
| 56 | Story-117 Handicap and PC eligibility data *(v03)* | 53 · BR-056 |  |
| 57 | Story-118 Tee blocking *(v03)* | 54 · BR-057 |  |
| 58 | Story-119 Golf charges and Finance hand-off *(v03)* | 55 · BR-058, 059 |  |
| 59 | Story-120 Shift and end-of-day close *(v03)* | 56 · BR-060 |  |
| 60 | Story-121 Golf enquiry *(v03)* | 57 |  |
| 61 | Story-122 Golf pages refined visually *(v03)* | 161 |  |

## Business rules (70 built in v01 – v03, `prd/business-rules.md`)
| # | Rules | v04 |
|---|---|---|
| 62 | BR-001 – BR-010 (application, eligibility, maker-checker, payment, referral, term, renewal, conversion) |  |
| 63 | BR-011 – BR-020 (transfer, extension routing, withdrawal, lifecycle, deceased, absent, medical, status matrix, privileges, supplementary) |  |
| 64 | BR-021 – BR-030 (junior, corporate, credit, vehicles, card, consent, profile, configuration, fee, campaign) |  |
| 65 | BR-031 – BR-035 (report access, parameters, no-data, export designation, definitions) *(v02)* | v04 link: BR-034 export from the catalogue buttons |
| 66 | BR-036 – BR-060 (golf: tee sheet, booking, waitlist, fees, check-in, rain checks, handicap, blocks, rates, Finance stub, shift close) *(v03)* |  |
| 67 | BR-084 role tab and page map |  |
| 68 | BR-085 member tab sees only its own account |  |
| 69 | BR-171 – BR-178 (validation, derivation, read-only after submit, return reason, status feed, Finance stub) |  |

## Workflows (`artifacts/diagrams/workflow-request-full-v04.md`)
| # | Workflow | v04 |
|---|---|---|
| 70 | Membership Request (17 request types, 9 transitions) |  |
| 71 | Membership status (transition matrix) |  |
| 72 | Role tab and launcher |  |
| 73 | Demo data (export, import, reset) |  |
| 74 | Club Reporting: Report run, Report definition, Report access rule *(v02)* |  |
| 75 | Golf booking, Waitlist entry, Rain check, Tee capacity / course status / golf approvals *(v03)* |  |

## Data (`artifacts/data-model/schema-v04.json`)
| # | Entity | v04 |
|---|---|---|
| 76 | meta |  |
| 77 | modules | v04 link: Events set live |
| 78 | config |  |
| 79 | persons | v04 link: participants are these persons (no duplicate records) |
| 80 | memberships |  |
| 81 | requests |  |
| 82 | handoffs |  |
| 83 | financeStub |  |
| 84 | vehicles |  |
| 85 | cards |  |
| 86 | outbox |  |
| 87 | integrationEvents |  |
| 88 | audit |  |
| 89 | guides |  |
| 90 | reports *(v02)* | v04 link: event reports, if any |
| 91 | accessRules *(v02)* |  |
| 92 | reportRuns *(v02)* | v04 change: catalogue exports recorded as runs |
| 93 | definitions *(v02)* |  |
| 94 | dashboards *(v02)* |  |
| 95 | legacyReports *(v02)* |  |
| 96 | courses *(v03)* |  |
| 97 | teeSheets *(v03)* |  |
| 98 | golfers *(v03)* |  |
| 99 | guests *(v03)* |  |
| 100 | golfBookings *(v03)* |  |
| 101 | courseBlocks *(v03)* |  |
| 102 | waitlist *(v03)* |  |
| 103 | rainChecks *(v03)* |  |
| 104 | golfApprovals *(v03)* |  |
| 105 | golfExceptions *(v03)* |  |
| 106 | handicapImports *(v03)* |  |
| 107 | shiftCloses *(v03)* |  |
| 108 | golfCharges *(v03)* |  |
| 109 | config.golf *(v03)* |  |

## Screens (`design/screen-inventory.md`)
| # | Screen | v04 |
|---|---|---|
| 110 | SCR-32 Launcher `index.html` | v04 link: live Events card, details, Events Team |
| 111 | SCR-01 Dashboard `dashboard.html` |  |
| 112 | SCR-02 Members |  |
| 113 | SCR-03 Member 360 |  |
| 114 | SCR-04 New application |  |
| 115 | SCR-05 New request |  |
| 116 | SCR-06 Requests |  |
| 117 | SCR-07 Request detail |  |
| 118 | SCR-08 Approvals | v04 link: event refund authorisations for the Manager (p3-04) |
| 119 | SCR-10 Communications |  |
| 120 | SCR-12 Configuration |  |
| 121 | SCR-13 Member Portal | v04 link: member event registration (p3-04) |
| 122 | SCR-14 Integration feed |  |
| 123 | SCR-11 Report Catalogue *(v02)* | **v04 change:** Status column: PDF and XLS buttons on exportable reports (prompt) |
| 124 | SCR-15 Report *(v02)* |  |
| 125 | SCR-16 Report definitions *(v02)* |  |
| 126 | SCR-17 Management dashboard *(v02)* |  |
| 127 | SCR-18 Legacy report finder *(v02)* |  |
| 128 | SCR-19 Tee Sheet *(v03)* |  |
| 129 | SCR-20 Golf Booking *(v03)* |  |
| 130 | SCR-21 Waitlist *(v03)* |  |
| 131 | SCR-22 Course Control *(v03)* |  |
| 132 | SCR-23 Golf Administration *(v03)* |  |
| 133 | SCR-24 Shift Close *(v03)* |  |
| 134 | SCR-25 Golfers *(v03)* |  |

## Design
| # | Item | v04 |
|---|---|---|
| 135 | Design system v3 and direction pass 3 (`design/design-system-v3.md`, `design-direction.md`; D-247): NSRCC Brand Guideline palette, Lato, journey rail, quiet launcher, role avatar |  |
| 136 | D-241 success colour `#077D3C` (adjusted for contrast) |  |
| 137 | D-248 Layout-06 exception: tables left-aligned per the guideline |  |
| 138 | D-249 / D-250 tables: alternating row shading only, ID as link, Lilac mist hover |  |
| 139 | Reporting components *(v02, D-271)*: line chart, report print layout |  |
| 140 | Golf components and golf status colours *(v03, D-291)*; launcher **Module details** button *(D-285)*; scroll padding below the sticky header | Events pages use them unchanged |

## Brief
| # | Item | v04 |
|---|---|---|
| 141 | Decision to inform. v03: *should we build Golf … on the Membership and Club Reporting base, reusing member data and eligibility?* | Restate for v04: *should we build Events (event setup and publication, online and counter registration, waitlist with promotion, minimum participation, check-in and attendance, cancellation and refunds, rescheduling, function-room mirroring) on the Membership base, reusing member eligibility and relationships?* |

## ⚠ Open overrides
None (0 open `Override-xxx`).
