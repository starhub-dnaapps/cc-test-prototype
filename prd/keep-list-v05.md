> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Keep list: CC-Demo full build v05 (from v04)

Built from v04 (`output/full-build-v04/`, Final approval SO-040). Every item is **keep** by default. This is an imported lineage, so every item needs an explicit answer (no "agree to all"). Items marked **v05 link** are kept, then changed in v05 only where they connect to Facilities (KO-033 prompt). Facilities itself (Story-136 – 153, BR-086 – 106) is not on this list: it comes in through Phase 1 from PRD v5 §5.2 `Deferred to v05`.

Drop rule: a dropped item takes with it the pages, rule functions, transitions, seed records and test scenarios that only it uses.

## Requirements (PRD v5 §5.1 v01, §5.1b v02, §5.1c v03, §5.1d v04)
| # | Story | Feature · rules | v05 |
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
| 16 | Story-016 Status transition matrix | 14 · BR-018, 019 | v05 link: facility eligibility and entitlement read status and privileges |
| 17 | Story-017 Supplementary memberships | 15 · BR-020 | v05 link: dependants book and are admitted by relationship (entitlement from Membership) |
| 18 | Story-018 Junior watch list | 16 · BR-021 | |
| 19 | Story-019 Corporate memberships and nominees | 17 · BR-022 | |
| 20 | Story-020 Committee / Honorary classification | 18 · BR-005 | |
| 21 | Story-021 Contract and financial terms | 19 · BR-023, 174 | |
| 22 | Story-022 Available credit check | 20 · BR-023 | — (no member-account charging in Facilities, D-326) |
| 23 | Story-023 Vehicles and car labels | 21 · BR-024 | |
| 24 | Story-024 Digital card issue and replace | 22 · BR-025 | |
| 25 | Story-025 Referral reward under an active campaign | 23 · BR-007, 030 | |
| 26 | Story-026 Campaigns and outbox | 24 · BR-026 | |
| 27 | Story-027 Effective-dated configuration | 26 · BR-028 | |
| 28 | Story-028 Portal: own membership and card | 27 · BR-085 | |
| 29 | Story-029 Approvals inbox, return for correction | 28 · BR-005, 175, 176 | |
| 30 | Story-030 Finance stub payments | 29 · BR-006, 178 | v05 link: facility fees, refunds and bowling sales to the Finance stub (stays a stub, Known limit) |
| 31 | Story-031 Membership dashboard with charts | 30, 150 | |
| 32 | Story-032 Integration feed | 31 · BR-177 | |
| 33 | Story-033 Launcher opens each role in its own tab | 74 · BR-084 | v05 link: Facilities Staff role entry (Operations Manager as the Manager, Phase 1) |
| 34 | Story-034 Tab keeps its role, blocks other pages | 75 · BR-084 | v05 link: role-to-page map adds the facility pages |
| 35 | Story-035 Module details on the launcher | 77 | v05 link: Facilities details tab gets its scenarios |
| 36 | Story-036 Planned modules "Coming in v0N" | 168 | v05 link: Facilities goes live; Resorts and Finance stay planned |
| 37 | Story-037 v09 launcher design, refined pages (incl. 159) | 157 – 159 | v05 link: live Facilities card |
| 38 | Story-038 Scenario guide side panel | 166 | v05 link: guides for the facility scenarios |
| 39 | Story-039 Export, import, reset | 167 | v05 link: facility collections in the file check |
| 40 | Story-101 Membership reports MMS-RR-001 – 008 and the audit review | 25, 39 · BR-031 – 033 | |
| 41 | Story-102 Excel and PDF export | 32 · BR-034 | v05 link: Facilities reports exportable from the catalogue |
| 42 | Story-103 Report catalogue by role | 37 · BR-031 | v05 link: Facilities reports switched on in the catalogue (prompt) |
| 43 | Story-104 Parameterised runs, valid empty result | 38 · BR-032, 033 | |
| 44 | Story-105 User-defined reports and dashboards | 41 · BR-035 | |
| 45 | Story-106 Legacy report finder | 42 | — (no Facilities names in the legacy inventory, D-326) |
| 46 | Story-107 Report access rules | 43 · BR-031 | v05 link: Facilities roles in the access rules |
| 47 | Story-108 Club Reporting pages refined, report visuals | 150, 160 | |
| 48 | Story-109 Golf reports GMS-RR-001 – 012 *(v03)* | 40 · BR-031 – 034 | |
| 49 | Story-110 Tee sheet setup and publication *(v03)* | 46 · BR-036 | |
| 50 | Story-111 Golf booking (portal and counter) *(v03)* | 47 · BR-037 – 043 | |
| 51 | Story-112 Automated waitlist *(v03)* | 48 · BR-044 | |
| 52 | Story-113 Amend and cancel a booking *(v03)* | 49 · BR-045 – 047 | |
| 53 | Story-114 Check-in and release to play *(v03)* | 50 · BR-048 – 050 | |
| 54 | Story-115 Late arrival and no-show *(v03)* | 51 · BR-051 | |
| 55 | Story-116 Course suspension and rain checks *(v03)* | 52 · BR-052 – 055 | |
| 56 | Story-117 Handicap and PC eligibility data *(v03)* | 53 · BR-056 | |
| 57 | Story-118 Tee blocking *(v03)* | 54 · BR-057 | |
| 58 | Story-119 Golf charges and Finance hand-off *(v03)* | 55 · BR-058, 059 | |
| 59 | Story-120 Shift and end-of-day close *(v03)* | 56 · BR-060 | |
| 60 | Story-121 Golf enquiry *(v03)* | 57 | |
| 61 | Story-122 Golf pages refined visually *(v03)* | 161 | |
| 62 | Story-123 Event setup and publication *(v04)* | 60 · BR-061, 062, 081 | v05 link: venue chosen from the Facilities records (prompt) |
| 63 | Story-124 Online registration (members, dependants, non-members) *(v04)* | 61 · BR-062 – 068, 072 |  |
| 64 | Story-125 Counter registration *(v04)* | 62 · BR-023, 063, 065, 068 |  |
| 65 | Story-126 Waitlist and promotion *(v04)* | 63 · BR-069 – 071 |  |
| 66 | Story-127 Minimum participation *(v04)* | 64 · BR-076 |  |
| 67 | Story-128 Check-in and attendance *(v04)* | 65 · BR-072 – 075 |  |
| 68 | Story-129 Participant cancellation *(v04)* | 66 · BR-077 |  |
| 69 | Story-130 Club cancellation with authorised refunds *(v04)* | 67 · BR-076, 078 |  |
| 70 | Story-131 Club rescheduling *(v04)* | 68 · BR-079 |  |
| 71 | Story-132 Function-room mirroring *(v04)* | 69 · BR-080 |  |
| 72 | Story-133 Maintain a published event *(v04)* | 70 · BR-081 – 083 | v05 link: a venue change picks a Facilities record |
| 73 | Story-134 Events schedule and enquiry *(v04)* | 71 | v05 link: venue shown as a link to its facility |
| 74 | Story-135 Events pages refined visually *(v04)* | 162 |  |

## Business rules (93 built in v01 – v04, `prd/business-rules.md`)
| # | Rules | v05 |
|---|---|---|
| 75 | BR-001 – BR-010 (application, eligibility, maker-checker, payment, referral, term, renewal, conversion) |  |
| 76 | BR-011 – BR-020 (transfer, extension routing, withdrawal, lifecycle, deceased, absent, medical, status matrix, privileges, supplementary) | v05 link: BR-018 – 020 feed facility eligibility and entitlement |
| 77 | BR-021 – BR-030 (junior, corporate, credit, vehicles, card, consent, profile, configuration, fee, campaign) | — (D-326) |
| 78 | BR-031 – BR-035 (report access, parameters, no-data, export designation, definitions) *(v02)* | v05 link: Facilities reports under the same rules |
| 79 | BR-036 – BR-060 (golf) *(v03)* |  |
| 80 | BR-061 – BR-083 (events: publication, eligibility, rates, holds, waitlist, check-in, cancellation, refunds, reschedule, function rooms, maintenance) *(v04)* | v05 link: venue from Facilities |
| 81 | BR-084 role tab and page map | v05 link: facility pages in the map |
| 82 | BR-085 member tab sees only its own account |  |
| 83 | BR-171 – BR-178 (validation, derivation, read-only after submit, return reason, status feed, Finance stub) |  |

## Workflows (`artifacts/diagrams/workflow-request-full-v08.md`)
| # | Workflow | v05 |
|---|---|---|
| 84 | Membership Request (17 request types, 9 transitions) |  |
| 85 | Membership status (transition matrix) |  |
| 86 | Role tab and launcher | v05 link: Facilities roles and card |
| 87 | Demo data (export, import, reset) | v05 link: facility collections |
| 88 | Club Reporting: Report run, Report definition, Report access rule *(v02)*; catalogue export *(v04)* |  |
| 89 | Golf booking, Waitlist entry, Rain check, Tee capacity / course status / golf approvals *(v03)* |  |
| 90 | Event, Event registration, Event waitlist, Attendance, Refund instruction, Function room booking (13 transitions) *(v04)* |  |

## Data (`artifacts/data-model/schema-v05.json`)
| # | Entity | v05 |
|---|---|---|
| 91 | meta |  |
| 92 | modules | v05 link: Facilities set live |
| 93 | config |  |
| 94 | persons | v05 link: facility bookers and admitted persons are these persons |
| 95 | memberships | v05 link: entitlement read from the membership |
| 96 | requests |  |
| 97 | handoffs |  |
| 98 | financeStub | v05 link: facility payments and refunds |
| 99 | vehicles |  |
| 100 | cards |  |
| 101 | outbox |  |
| 102 | integrationEvents |  |
| 103 | audit |  |
| 104 | guides | v05 link: facility scenario guides |
| 105 | reports *(v02)* | v05 link: Facilities reports added |
| 106 | accessRules *(v02)* | v05 link: Facilities roles |
| 107 | reportRuns *(v02)* |  |
| 108 | definitions *(v02)* |  |
| 109 | dashboards *(v02)* |  |
| 110 | legacyReports *(v02)* | — (D-326) |
| 111 | courses *(v03)* |  |
| 112 | teeSheets *(v03)* |  |
| 113 | golfers *(v03)* |  |
| 114 | guests *(v03)* |  |
| 115 | golfBookings *(v03)* |  |
| 116 | courseBlocks *(v03)* |  |
| 117 | waitlist *(v03)* |  |
| 118 | rainChecks *(v03)* |  |
| 119 | golfApprovals *(v03)* |  |
| 120 | golfExceptions *(v03)* |  |
| 121 | handicapImports *(v03)* |  |
| 122 | shiftCloses *(v03)* |  |
| 123 | golfCharges *(v03)* |  |
| 124 | config.golf *(v03)* |  |
| 125 | events *(v04)* | v05 link: venue holds a facility ID |
| 126 | accountHolders *(v04)* | v05 link: non-member account holders book facilities |
| 127 | eventRegistrations *(v04)* |  |
| 128 | eventAttendance *(v04)* |  |
| 129 | personnelAttendance *(v04)* |  |
| 130 | eventSettlements *(v04)* |  |
| 131 | eventRefunds *(v04)* |  |
| 132 | roomBookings *(v04)* |  |
| 133 | roomFeed *(v04)* |  |
| 134 | config.events *(v04)* | v05 link: the venues list replaced by Facilities records |

## Screens (`design/screen-inventory.md`)
| # | Screen | v05 |
|---|---|---|
| 135 | SCR-32 Launcher `index.html` | v05 link: live Facilities card, details, Facilities roles |
| 136 | SCR-01 Dashboard `dashboard.html` |  |
| 137 | SCR-02 Members |  |
| 138 | SCR-03 Member 360 |  |
| 139 | SCR-04 New application |  |
| 140 | SCR-05 New request |  |
| 141 | SCR-06 Requests |  |
| 142 | SCR-07 Request detail |  |
| 143 | SCR-08 Approvals | v05 link: facility approvals (exceptional refunds), if Phase 1 maps them (p3-04) |
| 144 | SCR-10 Communications |  |
| 145 | SCR-12 Configuration |  |
| 146 | SCR-13 Member Portal | v05 link: facility booking in the portal (p3-04) |
| 147 | SCR-14 Integration feed | v05 link: facility payments and hand-offs |
| 148 | SCR-11 Report Catalogue *(v02)* | v05 link: Facilities reports live |
| 149 | SCR-15 Report *(v02)* | v05 link: Facilities report builders |
| 150 | SCR-16 Report definitions *(v02)* |  |
| 151 | SCR-17 Management dashboard *(v02)* |  |
| 152 | SCR-18 Legacy report finder *(v02)* | — (D-326) |
| 153 | SCR-19 Tee Sheet *(v03)* |  |
| 154 | SCR-20 Golf Booking *(v03)* |  |
| 155 | SCR-21 Waitlist *(v03)* |  |
| 156 | SCR-22 Course Control *(v03)* |  |
| 157 | SCR-23 Golf Administration *(v03)* |  |
| 158 | SCR-24 Shift Close *(v03)* |  |
| 159 | SCR-25 Golfers *(v03)* |  |
| 160 | SCR-26 Events *(v04)* | v05 link: venue as a link to its facility |
| 161 | SCR-27 Event setup *(v04)* | v05 link: venue picker from Facilities records |
| 162 | SCR-28 Event *(v04)* | v05 link: venue as a link |
| 163 | SCR-29 Event registration *(v04)* |  |
| 164 | SCR-30 Event check-in *(v04)* |  |
| 165 | SCR-31 Function rooms *(v04)* |  |

## Design
| # | Item | v05 |
|---|---|---|
| 166 | Design system v3 and direction pass 3 (`design/design-system-v3.md`, `design-direction.md`; D-247): NSRCC Brand Guideline palette, Lato, journey rail, quiet launcher, role avatar |  |
| 167 | D-241 success colour `#077D3C` (adjusted for contrast) |  |
| 168 | D-248 Layout-06 exception: tables left-aligned per the guideline |  |
| 169 | D-249 / D-250 tables: alternating row shading only, ID as link, Lilac mist hover |  |
| 170 | Reporting components *(v02, D-271)*: line chart, report print layout |  |
| 171 | Golf components and golf status colours *(v03, D-291)*; launcher **Module details** button *(D-285)*; scroll padding below the sticky header | Facilities pages use them unchanged |
| 172 | Events components *(v04)* and the p4-02 fixes (D-312 – 315): label and value list (`.facts--list`), wrapping action buttons (`.col-actions--wrap`), catalogue **Export as** column, wider form section gaps | Facilities pages reuse them |

## Brief
| # | Item | v05 |
|---|---|---|
| 173 | Decision to inform. v04: *should we build Events (event setup and publication, online and counter registration, waitlist, check-in, cancellation and refunds, rescheduling, function-room mirroring) on the Membership base, reusing member eligibility and relationships?* | Restate for v05: *should we build Facilities (eligibility and entitlement, availability and blocks, bookings with amendment, cancellation, refunds and no-shows, swimming and fitness admission with day passes, bowling counter and reconciliation, waiting list, configuration, Fitness Centre and Personal Training, operational reports) on the Membership base, with Events venues linked to the Facilities records?* |

## ⚠ Open overrides
None (0 open `Override-xxx`).
