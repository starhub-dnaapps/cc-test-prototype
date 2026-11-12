> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Keep list: CC-Demo full build v06 (from v05)

Built from v05 (`output/full-build-v05/`, Final approval SO-042). Every item is **keep** by default. This is an imported lineage, so every item needs an explicit answer (no "agree to all"). Items marked **v06 link** or **v06 change** are kept, then changed in v06 only where they connect to Resorts or where the KO-034 prompt asks (the launcher). Resorts itself (Story-154 – 179, BR-107 – 132) is not on this list: it comes in through Phase 1 from PRD v6 §5.2 `Deferred to v06`. Finance (Story-180 – 202) stays `Deferred to v07`.

Drop rule: a dropped item takes with it the pages, rule functions, transitions, seed records and test scenarios that only it uses.

## Requirements (PRD v6 §5.1 v01, §5.1b v02, §5.1c v03, §5.1d v04, §5.1e v05)
| # | Item | v06 |
|---|---|---|
| 1 | Story-001 Member search and 360° profile |  |
| 2 | Story-002 Profile edit with before/after |  |
| 3 | Story-003 New application through the checks |  |
| 4 | Story-004 Approve application, activate on payment |  |
| 5 | Story-005 Portal renewal 1–3 years |  |
| 6 | Story-006 Full/Basic conversion |  |
| 7 | Story-007 Transfer |  |
| 8 | Story-008 Extension routed by length |  |
| 9 | Story-009 Withdrawal after balance cleared |  |
| 10 | Story-010 Lifecycle check and rejoin |  |
| 11 | Story-011 Deceased member, beneficiary, goodwill refund |  |
| 12 | Story-012 Absent period 3–24 months |  |
| 13 | Story-013 Medical period up to 12 months |  |
| 14 | Story-014 Lifecycle check ends absent/medical periods |  |
| 15 | Story-015 Suspension and reinstatement |  |
| 16 | Story-016 Status transition matrix | v06 link: resort eligibility reads member status and privileges |
| 17 | Story-017 Supplementary memberships | v06 link: dependants reserve by relationship (from Membership) |
| 18 | Story-018 Junior watch list |  |
| 19 | Story-019 Corporate memberships and nominees |  |
| 20 | Story-020 Committee / Honorary classification |  |
| 21 | Story-021 Contract and financial terms |  |
| 22 | Story-022 Available credit check |  |
| 23 | Story-023 Vehicles and car labels | v06 link: member vehicles vs the resort vehicle whitelist (Phase 1) |
| 24 | Story-024 Digital card issue and replace |  |
| 25 | Story-025 Referral reward under an active campaign |  |
| 26 | Story-026 Campaigns and outbox |  |
| 27 | Story-027 Effective-dated configuration |  |
| 28 | Story-028 Portal: own membership and card |  |
| 29 | Story-029 Approvals inbox, return for correction |  |
| 30 | Story-030 Finance stub payments | v06 link: resort payments, refunds and FIN-OPS events to the Finance stub (stays a stub, Known limit) |
| 31 | Story-031 Membership dashboard with charts |  |
| 32 | Story-032 Integration feed |  |
| 33 | Story-033 Launcher opens each role in its own tab | v06 link: Resort Front Desk and Housekeeping role entries |
| 34 | Story-034 Tab keeps its role, blocks other pages | v06 link: role-to-page map adds the resort pages |
| 35 | Story-035 Module details on the launcher | v06 link: Resorts details tab; Module details moves into the Scenarios section's place, with a start link for every scenario (prompt) |
| 36 | Story-036 Planned modules "Coming in v0N" | v06 link: Resorts goes live; Finance stays planned |
| 37 | Story-037 v09 launcher design, refined pages (incl. 159) | v06 link: live Resorts card; Scenarios section removed (prompt) |
| 38 | Story-038 Scenario guide side panel | v06 link: guides for the resort scenarios, started from Module details (prompt) |
| 39 | Story-039 Export, import, reset | v06 link: resort collections in the file check |
| 40 | Story-101 Membership reports MMS-RR-001 – 008 and the audit review |  |
| 41 | Story-102 Excel and PDF export | v06 link: Resorts reports exportable from the catalogue |
| 42 | Story-103 Report catalogue by role | v06 link: Resorts reports switched on in the catalogue (prompt) |
| 43 | Story-104 Parameterised runs, valid empty result |  |
| 44 | Story-105 User-defined reports and dashboards |  |
| 45 | Story-106 Legacy report finder |  |
| 46 | Story-107 Report access rules | v06 link: Resorts roles in the access rules |
| 47 | Story-108 Club Reporting pages refined, report visuals |  |
| 48 | Story-109 Golf reports GMS-RR-001 – 012 *(v03)* |  |
| 49 | Story-110 Tee sheet setup and publication *(v03)* |  |
| 50 | Story-111 Golf booking (portal and counter) *(v03)* |  |
| 51 | Story-112 Automated waitlist *(v03)* |  |
| 52 | Story-113 Amend and cancel a booking *(v03)* |  |
| 53 | Story-114 Check-in and release to play *(v03)* |  |
| 54 | Story-115 Late arrival and no-show *(v03)* |  |
| 55 | Story-116 Course suspension and rain checks *(v03)* |  |
| 56 | Story-117 Handicap and PC eligibility data *(v03)* |  |
| 57 | Story-118 Tee blocking *(v03)* |  |
| 58 | Story-119 Golf charges and Finance hand-off *(v03)* |  |
| 59 | Story-120 Shift and end-of-day close *(v03)* |  |
| 60 | Story-121 Golf enquiry *(v03)* |  |
| 61 | Story-122 Golf pages refined visually *(v03)* |  |
| 62 | Story-123 Event setup and publication *(v04)* |  |
| 63 | Story-124 Online registration (members, dependants, non-members) *(v04)* |  |
| 64 | Story-125 Counter registration *(v04)* |  |
| 65 | Story-126 Waitlist and promotion *(v04)* |  |
| 66 | Story-127 Minimum participation *(v04)* |  |
| 67 | Story-128 Check-in and attendance *(v04)* |  |
| 68 | Story-129 Participant cancellation *(v04)* |  |
| 69 | Story-130 Club cancellation with authorised refunds *(v04)* |  |
| 70 | Story-131 Club rescheduling *(v04)* |  |
| 71 | Story-132 Function-room mirroring *(v04)* |  |
| 72 | Story-133 Maintain a published event *(v04)* |  |
| 73 | Story-134 Events schedule and enquiry *(v04)* |  |
| 74 | Story-135 Events pages refined visually *(v04)* |  |
| 75 | Story-136 Customer category and entitlement *(v05)* · 80 · BR-086 – 106 | v06 link: bungalow guest category from resort stays |
| 76 | Story-137 Availability and resource blocks *(v05)* · 81 · BR-086 – 106 |  |
| 77 | Story-138 Book a facility online or at the counter *(v05)* · 82 · BR-086 – 106 |  |
| 78 | Story-139 Amend a facility booking *(v05)* · 83 · BR-086 – 106 |  |
| 79 | Story-140 Cancel and refund (24-hour rule) *(v05)* · 84 · BR-086 – 106 |  |
| 80 | Story-141 No-show *(v05)* · 85 · BR-086 – 106 |  |
| 81 | Story-142 Facility payments to Finance (stub) *(v05)* · 86 · BR-086 – 106 |  |
| 82 | Story-143 Swimming Pool admission *(v05)* · 87 · BR-086 – 106 |  |
| 83 | Story-144 Fitness Centre admission and day passes *(v05)* · 88 · BR-086 – 106 | v06 link: visitor pass from resort in-house stays, replacing the simulated list (D-338) |
| 84 | Story-145 Bowling counter transactions *(v05)* · 89 · BR-086 – 106 |  |
| 85 | Story-146 Bowling reconciliation *(v05)* · 90 · BR-086 – 106 |  |
| 86 | Story-147 Bowling exceptions *(v05)* · 91 · BR-086 – 106 |  |
| 87 | Story-148 Facility waiting list *(v05)* · 92 · BR-086 – 106 |  |
| 88 | Story-149 Facility configuration (Draft until approved) *(v05)* · 93 · BR-086 – 106 |  |
| 89 | Story-150 Fitness Centre equipment and instructors *(v05)* · 94 · BR-086 – 106 |  |
| 90 | Story-151 Personal Training *(v05)* · 95 · BR-086 – 106 |  |
| 91 | Story-152 Facilities reports *(v05)* · 96 · BR-086 – 106 |  |
| 92 | Story-153 Facilities pages refined visually *(v05)* · 163 |  |

## Business rules (114 built in v01 – v05, `prd/business-rules.md`)
| # | Item | v06 |
|---|---|---|
| 93 | BR-001 – BR-010 (application, eligibility, maker-checker, payment, referral, term, renewal, conversion) |  |
| 94 | BR-011 – BR-020 (transfer, extension routing, withdrawal, lifecycle, deceased, absent, medical, status matrix, privileges, supplementary) | v06 link: BR-018 – 020 feed resort eligibility |
| 95 | BR-021 – BR-030 (junior, corporate, credit, vehicles, card, consent, profile, configuration, fee, campaign) | v06 link: BR-024 vehicles vs the resort whitelist (Phase 1) |
| 96 | BR-031 – BR-035 (report access, parameters, no-data, export designation, definitions) *(v02)* | v06 link: Resorts reports under the same rules |
| 97 | BR-036 – BR-060 (golf) *(v03)* |  |
| 98 | BR-061 – BR-083 (events: publication, eligibility, rates, holds, waitlist, check-in, cancellation, refunds, reschedule, function rooms, maintenance) *(v04)* |  |
| 99 | BR-086 – BR-106 (facilities: category, availability, blocks, window, duration, rates, payment, amendment, cancellation, exceptional refund, no-show, admission, visitor pass, day pass, bowling, waiting list, configuration, Personal Training) *(v05)* | v06 link: BR-086 bungalow guest and BR-099 visitor pass read resort stays |
| 100 | BR-084 role tab and page map | v06 link: resort pages in the map |
| 101 | BR-085 member tab sees only its own account |  |
| 102 | BR-171 – BR-178 (validation, derivation, read-only after submit, return reason, status feed, Finance stub) | v06 link: BR-178 Finance stub takes the resort hand-offs |

## Workflows (`artifacts/diagrams/workflow-request-full-v08.md`)
| # | Item | v06 |
|---|---|---|
| 103 | Membership Request (17 request types, 9 transitions) |  |
| 104 | Membership status (transition matrix) |  |
| 105 | Role tab and launcher | v06 link: Resorts roles and card; Scenarios section removed (prompt) |
| 106 | Demo data (export, import, reset) | v06 link: resort collections |
| 107 | Club Reporting: Report run, Report definition, Report access rule *(v02)*; catalogue export *(v04)* |  |
| 108 | Golf booking, Waitlist entry, Rain check, Tee capacity / course status / golf approvals *(v03)* |  |
| 109 | Event, Event registration, Event waitlist, Attendance, Refund instruction, Function room booking (13 transitions) *(v04)* |  |
| 110 | Facility booking, Resource block, Facility waiting list, Admission and day pass, Bowling transaction and reconciliation, Exceptional refund, Facility configuration, Personal Training (29 transitions, W28 – W34) *(v05)* | v06 link: admission reads the resort visitor pass |

## Data (`artifacts/data-model/schema-v06.json`)
| # | Item | v06 |
|---|---|---|
| 111 | meta |  |
| 112 | modules | v06 link: Resorts set live |
| 113 | config |  |
| 114 | persons | v06 link: resort guests are these persons |
| 115 | memberships | v06 link: eligibility read from the membership |
| 116 | requests |  |
| 117 | handoffs |  |
| 118 | financeStub | v06 link: resort payments and refunds |
| 119 | vehicles | v06 link: resort vehicle whitelist (Phase 1) |
| 120 | cards |  |
| 121 | outbox | v06 link: resort notifications |
| 122 | integrationEvents |  |
| 123 | audit |  |
| 124 | guides | v06 link: resort scenario guides |
| 125 | reports *(v02)* | v06 link: Resorts reports added |
| 126 | accessRules *(v02)* | v06 link: Resorts roles |
| 127 | reportRuns *(v02)* |  |
| 128 | definitions *(v02)* |  |
| 129 | dashboards *(v02)* |  |
| 130 | legacyReports *(v02)* |  |
| 131 | courses *(v03)* |  |
| 132 | teeSheets *(v03)* |  |
| 133 | golfers *(v03)* |  |
| 134 | guests *(v03)* |  |
| 135 | golfBookings *(v03)* |  |
| 136 | courseBlocks *(v03)* |  |
| 137 | waitlist *(v03)* |  |
| 138 | rainChecks *(v03)* |  |
| 139 | golfApprovals *(v03)* |  |
| 140 | golfExceptions *(v03)* |  |
| 141 | handicapImports *(v03)* |  |
| 142 | shiftCloses *(v03)* |  |
| 143 | golfCharges *(v03)* |  |
| 144 | config.golf *(v03)* |  |
| 145 | events *(v04)* |  |
| 146 | accountHolders *(v04)* | v06 link: non-member eligibility for resorts (Phase 1) |
| 147 | eventRegistrations *(v04)* |  |
| 148 | eventAttendance *(v04)* |  |
| 149 | personnelAttendance *(v04)* |  |
| 150 | eventSettlements *(v04)* |  |
| 151 | eventRefunds *(v04)* |  |
| 152 | roomBookings *(v04)* |  |
| 153 | roomFeed *(v04)* |  |
| 154 | config.events *(v04)* |  |
| 155 | facilityBookings *(v05)* |  |
| 156 | facilityPayments *(v05)* |  |
| 157 | facilityRefunds *(v05)* |  |
| 158 | resourceBlocks *(v05)* |  |
| 159 | facilityWaitlist *(v05)* |  |
| 160 | admissions *(v05)* |  |
| 161 | dayPasses *(v05)* |  |
| 162 | bowlingTxns *(v05)* |  |
| 163 | bowlingRuns *(v05)* |  |
| 164 | bowlingExceptions *(v05)* |  |
| 165 | fitnessEquipment *(v05)* |  |
| 166 | fitnessInstructors *(v05)* |  |
| 167 | ptSessions *(v05)* |  |
| 168 | facilityConfigChanges *(v05)* |  |
| 169 | config.facilities *(v05)* (facilities, resources, rates, windows, visitor passes) | v06 link: visitor passes from resort stays (Phase 1) |

## Screens (`design/screen-inventory.md`)
| # | Item | v06 |
|---|---|---|
| 170 | SCR-32 Launcher `index.html` | v06 change: live Resorts card and roles; Scenarios section removed, Module details in its place (prompt) |
| 171 | SCR-01 Dashboard `dashboard.html` |  |
| 172 | SCR-02 Members |  |
| 173 | SCR-03 Member 360 |  |
| 174 | SCR-04 New application |  |
| 175 | SCR-05 New request |  |
| 176 | SCR-06 Requests |  |
| 177 | SCR-07 Request detail |  |
| 178 | SCR-08 Approvals | v06 link: resort approvals (refunds, adjustments, reversals), if Phase 1 maps them (p3-04) |
| 179 | SCR-10 Communications |  |
| 180 | SCR-12 Configuration |  |
| 181 | SCR-13 Member Portal | v06 link: resort reservations in the portal (p3-04) |
| 182 | SCR-14 Integration feed | v06 link: resort FIN-OPS and system events |
| 183 | SCR-11 Report Catalogue *(v02)* | v06 link: Resorts reports live |
| 184 | SCR-15 Report *(v02)* | v06 link: Resorts report builders |
| 185 | SCR-16 Report definitions *(v02)* |  |
| 186 | SCR-17 Management dashboard *(v02)* |  |
| 187 | SCR-18 Legacy report finder *(v02)* |  |
| 188 | SCR-19 Tee Sheet *(v03)* |  |
| 189 | SCR-20 Golf Booking *(v03)* |  |
| 190 | SCR-21 Waitlist *(v03)* |  |
| 191 | SCR-22 Course Control *(v03)* |  |
| 192 | SCR-23 Golf Administration *(v03)* |  |
| 193 | SCR-24 Shift Close *(v03)* |  |
| 194 | SCR-25 Golfers *(v03)* |  |
| 195 | SCR-26 Events *(v04)* |  |
| 196 | SCR-27 Event setup *(v04)* |  |
| 197 | SCR-28 Event *(v04)* |  |
| 198 | SCR-29 Event registration *(v04)* |  |
| 199 | SCR-30 Event check-in *(v04)* |  |
| 200 | SCR-31 Function rooms *(v04)* |  |
| 201 | SCR-33 Facilities `facilities.html` *(v05)* |  |
| 202 | SCR-34 Facility booking `facility-booking.html` *(v05)* |  |
| 203 | SCR-35 Bookings `facility-bookings.html` *(v05)* |  |
| 204 | SCR-36 Admissions `facility-admission.html` *(v05)* | v06 link: visitor pass from resort stays |
| 205 | SCR-37 Bowling `bowling.html` *(v05)* |  |
| 206 | SCR-38 Facilities Admin `facility-admin.html` *(v05)* |  |

## Design
| # | Item | v06 |
|---|---|---|
| 207 | Design system v3 and direction pass 3 (`design/design-system-v3.md`, `design-direction.md`; D-247): NSRCC Brand Guideline palette, Lato, journey rail, quiet launcher, role avatar |  |
| 208 | D-241 success colour `#077D3C` (adjusted for contrast) |  |
| 209 | D-248 Layout-06 exception: tables left-aligned per the guideline |  |
| 210 | D-249 / D-250 tables: alternating row shading only, ID as link, Lilac mist hover |  |
| 211 | Reporting components *(v02, D-271)*: line chart, report print layout |  |
| 212 | Golf components and golf status colours *(v03, D-291)*; launcher **Module details** button *(D-285)*; scroll padding below the sticky header | Resorts pages use them unchanged |
| 213 | Events components *(v04)* and the p4-02 fixes (D-312 – 315): label and value list (`.facts--list`), wrapping action buttons (`.col-actions--wrap`), catalogue **Export as** column, wider form section gaps | Resorts pages reuse them |
| 214 | Facilities components *(v05, D-333)*: availability grid, occupancy meter; header **Golf** dropdown for the Manager and Administrator; Approve before Reject on every Approvals tab (D-334); side-by-side cards keep their buttons on one line (p4-02 fix 10); Layout-06 exception extended to the Facilities tables (D-337) | Resorts pages reuse them |

## Brief
| # | Item | v06 |
|---|---|---|
| 215 | Decision to inform. v05: *should we build Facilities (eligibility and entitlement, availability and blocks, bookings with amendment, cancellation, refunds and no-shows, swimming and fitness admission with day passes, bowling counter and reconciliation, waiting list, configuration, Fitness Centre and Personal Training, operational reports) on the Membership base, with Events venues linked to the Facilities records?* | Restate for v06: *should we build Resorts (configuration, rates and policy, reservations with groups, holds, amendment, cancellation, waitlist and no-shows, payment and folio, refunds and adjustments, check-in and check-out with access credentials and vehicles, housekeeping and maintenance blocks, Night Audit, reports, audit log and notifications) on the Membership base, with every draft rule confirmed or flagged?* |

## ⚠ Open overrides
None (0 open `Override-xxx`).
