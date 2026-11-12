> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Keep list: CC-Demo full build v02 (from v01)

Built from v01 (`output/full-build/`, Final approval SO-034). Every item is **keep** by default. This is an imported lineage, so every item needs an explicit answer (no "agree to all"). Items marked **· v02 link** are kept, then changed in v02 only where they connect to Club Reporting (as the KO-030 prompt asks); everything else stays as in v01.

Drop rule: a dropped item takes with it the pages, rule functions, transitions, seed records and test scenarios that only it uses.

## Requirements (PRD v2, §5.1: built in v01)
| # | Story | Feature · rules | v02 |
|---|---|---|---|
| 1 | Story-001 Member search and 360° profile | 1 | |
| 2 | Story-002 Profile edit with before/after | 2 · BR-026, 027, 171, 177 | |
| 3 | Story-003 New application through the checks | 3 · BR-002, 003, … | |
| 4 | Story-004 Approve application, activate on payment | 3 · BR-001, 005, 006, 029, 030, 173, 174, 178 | |
| 5 | Story-005 Portal renewal 1–3 years | 4, 27 · BR-006, 008, 009, 029, 085 | |
| 6 | Story-006 Full/Basic conversion | 5 · BR-008, 010 | |
| 7 | Story-007 Transfer | 6 · BR-004, 011 | |
| 8 | Story-008 Extension routed by length | 7 · BR-008, 012 | |
| 9 | Story-009 Withdrawal after balance cleared | 8, 27 · BR-013, 178 | |
| 10 | Story-010 Lifecycle check and rejoin | 9 · BR-014 | |
| 11 | Story-011 Deceased member, beneficiary, goodwill refund | 10 · BR-011, 015 | |
| 12 | Story-012 Absent period 3–24 months | 11 · BR-016, 019, 174 | |
| 13 | Story-013 Medical period up to 12 months | 12 · BR-017, 019 | |
| 14 | Story-014 Lifecycle check ends absent/medical periods | 11, 12 · BR-016, 017, 019 | |
| 15 | Story-015 Suspension and reinstatement | 13 · BR-005, 018, 019 | |
| 16 | Story-016 Status transition matrix | 14 · BR-018, 019 | |
| 17 | Story-017 Supplementary memberships | 15 · BR-020 | |
| 18 | Story-018 Junior watch list | 16 · BR-021 | |
| 19 | Story-019 Corporate memberships and nominees | 17 · BR-022 | |
| 20 | Story-020 Committee / Honorary classification | 18 · BR-005 | |
| 21 | Story-021 Contract and financial terms | 19 · BR-023, 174 | |
| 22 | Story-022 Available credit check | 20 · BR-023 | |
| 23 | Story-023 Vehicles and car labels | 21 · BR-024 | |
| 24 | Story-024 Digital card issue and replace | 22 · BR-025 | |
| 25 | Story-025 Referral reward under an active campaign | 23 · BR-007, 030 | |
| 26 | Story-026 Campaigns and outbox | 24 · BR-026 | |
| 27 | Story-027 Effective-dated configuration | 26 · BR-028 | v02 link: report access rules (feature 43) sit in Configuration |
| 28 | Story-028 Portal: own membership and card | 27 · BR-085 | |
| 29 | Story-029 Approvals inbox, return for correction | 28 · BR-005, 175, 176 | |
| 30 | Story-030 Finance stub payments | 29 · BR-006, 178 | |
| 31 | Story-031 Membership dashboard with charts | 30, 150 | v02 link: links to the Membership reports |
| 32 | Story-032 Integration feed | 31 · BR-177 | |
| 33 | Story-033 Launcher opens each role in its own tab | 74 · BR-084 | v02 link: reporting role entries |
| 34 | Story-034 Tab keeps its role, blocks other pages | 75 · BR-084 | v02 link: role-to-page map adds the report pages |
| 35 | Story-035 Module details on the launcher | 77 | v02 link: Club Reporting tab gets its scenarios with Start links |
| 36 | Story-036 Planned modules "Coming in v0N" | 168 | v02 link: Club Reporting goes live; five stay planned |
| 37 | Story-037 v09 launcher design, refined pages (incl. 159) | 157 – 159 | v02 link: live Club Reporting card |
| 38 | Story-038 Scenario guide side panel | 166 | v02 link: guides for the new scenarios |
| 39 | Story-039 Export, import, reset | 167 | v02 link: new collections in the file check |

## Business rules (40 built in v01, `prd/business-rules.md`)
| # | Rules | v02 |
|---|---|---|
| 40 | BR-001 – BR-010 (application, eligibility, maker-checker, payment, referral, term, renewal, conversion) | |
| 41 | BR-011 – BR-020 (transfer, extension routing, withdrawal, lifecycle, deceased, absent, medical, status matrix, privileges, supplementary) | |
| 42 | BR-021 – BR-030 (junior, corporate, credit, vehicles, card, consent, profile, configuration, fee, campaign) | |
| 43 | BR-084 role tab and page map | v02 link: report pages added |
| 44 | BR-085 member tab sees only its own account | |
| 45 | BR-171 – BR-178 (validation, derivation, read-only after submit, return reason, status feed, Finance stub) | |

(BR-031 – BR-035, the report rules, are deferred to v02 and come in through Phase 1, not this list.)

## Workflows (`artifacts/diagrams/workflow-request-full-v02.md`)
| # | Workflow | v02 |
|---|---|---|
| 46 | Membership Request (17 request types, 9 transitions) | |
| 47 | Membership status (transition matrix) | |
| 48 | Role tab and launcher | v02 link: reporting pages |
| 49 | Demo data (export, import, reset) | |

## Data (`artifacts/data-model/schema-v02.json`)
| # | Entity | v02 |
|---|---|---|
| 50 | meta | |
| 51 | modules | v02 link: Club Reporting set live |
| 52 | config | v02 link: report access rules |
| 53 | persons | |
| 54 | memberships | |
| 55 | requests | |
| 56 | handoffs | |
| 57 | financeStub | |
| 58 | vehicles | |
| 59 | cards | |
| 60 | outbox | |
| 61 | integrationEvents | |
| 62 | audit | v02 link: read by the audit review report |
| 63 | guides | v02 link: new scenario guides |

## Screens (`design/screen-inventory.md`)
| # | Screen | v02 |
|---|---|---|
| 64 | SCR-32 Launcher `index.html` | v02 link: live card, module details, roles |
| 65 | SCR-01 Dashboard `dashboard.html` | v02 link: links to the Membership reports |
| 66 | SCR-02 Members | |
| 67 | SCR-03 Member 360 | |
| 68 | SCR-04 New application | |
| 69 | SCR-05 New request | |
| 70 | SCR-06 Requests | |
| 71 | SCR-07 Request detail | |
| 72 | SCR-08 Approvals | |
| 73 | SCR-10 Communications | |
| 74 | SCR-12 Configuration | v02 link: report access rules |
| 75 | SCR-13 Member Portal | |
| 76 | SCR-14 Integration feed | |

## Design
| # | Item | v02 |
|---|---|---|
| 77 | Design system v3 and direction pass 3 (`design/design-system-v3.md`, `design-direction.md`; D-247): NSRCC Brand Guideline palette, Lato, journey rail, quiet launcher, role avatar | Club Reporting pages use it unchanged |
| 78 | D-241 success colour `#077D3C` (adjusted for contrast) | |
| 79 | D-248 Layout-06 exception: tables left-aligned per the guideline | |
| 80 | D-249 / D-250 tables: alternating row shading only, ID as link, Lilac mist hover (Story-040 removed) | applies to report tables |

## Brief
| # | Item | v02 |
|---|---|---|
| 81 | Decision to inform. v01: *should we build the Membership module, with the request, approval, payment and activation flow, as the base for the other six modules?* | Restate for v02: *should we build Club Reporting (role-governed catalogue, parameterised runs, export, user-defined reports and dashboards, legacy finder) on the Membership base, as the reporting layer each later module plugs into?* |

## ⚠ Open overrides
None (0 open `Override-xxx`).
