> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Keep list: CC-Demo full build v07 (from v06)

Built from v06 (`output/full-build-v06/`, Final approval SO-044). Every item is **keep** by default. This is an imported lineage, so every item needs an explicit answer (no "agree to all"). Items marked **v07 link** or **v07 change** are kept, then changed in v07 only where they connect to Finance or where the KO-035 prompt asks (no "Coming in v0N" left). Finance itself (Story-180 – 202, BR-133 – 170) is not on this list: it comes in through Phase 1 from PRD v7 §5.2 `Deferred to v07`.

Drop rule: a dropped item takes with it the pages, rule functions, transitions, seed records and test scenarios that only it uses.

## Requirements (PRD v7 §5.1 v01, §5.1b v02, §5.1c v03, §5.1d v04, §5.1e v05, §5.1f v06)
| # | Item | v07 |
|---|---|---|
| 1 | Story-001 Member search and 360° profile |  |
| 2 | Story-002 Profile edit with before/after |  |
| 3 | Story-003 New application through the checks | v07 link: entrance fee and subscription to FIN-OPS intake, receivable and payment |
| 4 | Story-004 Approve application, activate on payment | v07 link: fee raised in FIN-OPS; the membership activates on the FIN-OPS payment |
| 5 | Story-005 Portal renewal 1–3 years | v07 link: renewal fee through FIN-OPS |
| 6 | Story-006 Full/Basic conversion |  |
| 7 | Story-007 Transfer |  |
| 8 | Story-008 Extension routed by length |  |
| 9 | Story-009 Withdrawal after balance cleared | v07 link: balance clearance read from the FIN-OPS member account |
| 10 | Story-010 Lifecycle check and rejoin |  |
| 11 | Story-011 Deceased member, beneficiary, goodwill refund | v07 link: goodwill refund through FIN-OPS refunds |
| 12 | Story-012 Absent period 3–24 months |  |
| 13 | Story-013 Medical period up to 12 months |  |
| 14 | Story-014 Lifecycle check ends absent/medical periods |  |
| 15 | Story-015 Suspension and reinstatement |  |
| 16 | Story-016 Status transition matrix |  |
| 17 | Story-017 Supplementary memberships |  |
| 18 | Story-018 Junior watch list |  |
| 19 | Story-019 Corporate memberships and nominees |  |
| 20 | Story-020 Committee / Honorary classification |  |
| 21 | Story-021 Contract and financial terms |  |
| 22 | Story-022 Available credit check | v07 link: available credit from the FIN-OPS outstanding balance; override in FIN-OPS |
| 23 | Story-023 Vehicles and car labels |  |
| 24 | Story-024 Digital card issue and replace |  |
| 25 | Story-025 Referral reward under an active campaign |  |
| 26 | Story-026 Campaigns and outbox |  |
| 27 | Story-027 Effective-dated configuration |  |
| 28 | Story-028 Portal: own membership and card |  |
| 29 | Story-029 Approvals inbox, return for correction |  |
| 30 | Story-030 Finance stub payments | v07 change: the Finance stub is replaced by FIN-OPS (Story-202; BR-178 retired) (prompt) |
| 31 | Story-031 Membership dashboard with charts | v07 link: awaiting payment read from FIN-OPS |
| 32 | Story-032 Integration feed | v07 link: FIN-OPS events in the feed |
| 33 | Story-033 Launcher opens each role in its own tab | v07 link: Finance Officer and Finance Approver role entries |
| 34 | Story-034 Tab keeps its role, blocks other pages | v07 link: role-to-page map adds the Finance pages |
| 35 | Story-035 Module details on the launcher | v07 link: Finance tab in Module details |
| 36 | Story-036 Planned modules "Coming in v0N" | v07 change: no module left "Coming in v0N"; badge removed (prompt) |
| 37 | Story-037 v09 launcher design, refined pages (incl. 159) | v07 change: Finance card live; no disabled or planned card left (prompt) |
| 38 | Story-038 Scenario guide side panel | v07 link: guides for the Finance scenarios |
| 39 | Story-039 Export, import, reset | v07 link: Finance collections in the file check |
| 40 | Story-101 Membership reports MMS-RR-001 – 008 and the audit review |  |
| 41 | Story-102 Excel and PDF export | v07 link: Finance reports exportable |
| 42 | Story-103 Report catalogue by role | v07 link: Finance reports switched on in the catalogue (prompt) |
| 43 | Story-104 Parameterised runs, valid empty result |  |
| 44 | Story-105 User-defined reports and dashboards |  |
| 45 | Story-106 Legacy report finder |  |
| 46 | Story-107 Report access rules | v07 link: Finance roles in the access rules |
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
| 58 | Story-119 Golf charges and Finance hand-off *(v03)* | v07 link: golf charges to FIN-OPS intake and postings |
| 59 | Story-120 Shift and end-of-day close *(v03)* | v07 link: the Finance cashier batch close becomes the Finance control |
| 60 | Story-121 Golf enquiry *(v03)* |  |
| 61 | Story-122 Golf pages refined visually *(v03)* |  |
| 62 | Story-123 Event setup and publication *(v04)* |  |
| 63 | Story-124 Online registration (members, dependants, non-members) *(v04)* |  |
| 64 | Story-125 Counter registration *(v04)* |  |
| 65 | Story-126 Waitlist and promotion *(v04)* |  |
| 66 | Story-127 Minimum participation *(v04)* |  |
| 67 | Story-128 Check-in and attendance *(v04)* |  |
| 68 | Story-129 Participant cancellation *(v04)* |  |
| 69 | Story-130 Club cancellation with authorised refunds *(v04)* | v07 link: event refund instructions to FIN-OPS refunds (maker-checker) |
| 70 | Story-131 Club rescheduling *(v04)* | v07 link: reschedule refunds to FIN-OPS refunds |
| 71 | Story-132 Function-room mirroring *(v04)* |  |
| 72 | Story-133 Maintain a published event *(v04)* |  |
| 73 | Story-134 Events schedule and enquiry *(v04)* |  |
| 74 | Story-135 Events pages refined visually *(v04)* |  |
| 75 | Story-136 Customer category and entitlement *(v05)* · 80 · BR-086 – 106 |  |
| 76 | Story-137 Availability and resource blocks *(v05)* · 81 · BR-086 – 106 |  |
| 77 | Story-138 Book a facility online or at the counter *(v05)* · 82 · BR-086 – 106 | v07 link: facility payments as FIN-OPS Payments |
| 78 | Story-139 Amend a facility booking *(v05)* · 83 · BR-086 – 106 |  |
| 79 | Story-140 Cancel and refund (24-hour rule) *(v05)* · 84 · BR-086 – 106 | v07 link: facility refund instructions to FIN-OPS refunds |
| 80 | Story-141 No-show *(v05)* · 85 · BR-086 – 106 |  |
| 81 | Story-142 Facility payments to Finance (stub) *(v05)* · 86 · BR-086 – 106 | v07 link: facility payments recorded in FIN-OPS with a PaymentNo |
| 82 | Story-143 Swimming Pool admission *(v05)* · 87 · BR-086 – 106 |  |
| 83 | Story-144 Fitness Centre admission and day passes *(v05)* · 88 · BR-086 – 106 |  |
| 84 | Story-145 Bowling counter transactions *(v05)* · 89 · BR-086 – 106 |  |
| 85 | Story-146 Bowling reconciliation *(v05)* · 90 · BR-086 – 106 |  |
| 86 | Story-147 Bowling exceptions *(v05)* · 91 · BR-086 – 106 |  |
| 87 | Story-148 Facility waiting list *(v05)* · 92 · BR-086 – 106 |  |
| 88 | Story-149 Facility configuration (Draft until approved) *(v05)* · 93 · BR-086 – 106 |  |
| 89 | Story-150 Fitness Centre equipment and instructors *(v05)* · 94 · BR-086 – 106 |  |
| 90 | Story-151 Personal Training *(v05)* · 95 · BR-086 – 106 |  |
| 91 | Story-152 Facilities reports *(v05)* · 96 · BR-086 – 106 |  |
| 92 | Story-153 Facilities pages refined visually *(v05)* · 163 |  |
| 93 | Story-154 To configure resorts, room types, rooms and add-ons *(v06)* · 101 · BR-107 – 132 |  |
| 94 | Story-155 To set rates, seasons, discounts and reservation policy *(v06)* · 102 · BR-107 – 132 |  |
| 95 | Story-156 To reserve a resort room online or at the front desk *(v06)* · 103 · BR-107 – 132 | v07 link: deposit to FIN-OPS |
| 96 | Story-157 To make a group reservation *(v06)* · 104 · BR-107 – 132 |  |
| 97 | Story-158 To place rooms on a tentative hold *(v06)* · 105 · BR-107 – 132 |  |
| 98 | Story-159 To amend a reservation *(v06)* · 106 · BR-107 – 132 |  |
| 99 | Story-160 To cancel a reservation and know the charge *(v06)* · 107 · BR-107 – 132 | v07 link: cancellation refund to FIN-OPS refunds |
| 100 | Story-161 A resort waitlist *(v06)* · 108 · BR-107 – 132 |  |
| 101 | Story-162 To process a no-show *(v06)* · 109 · BR-107 – 132 |  |
| 102 | Story-163 Payments and a guest folio *(v06)* · 110 · BR-107 – 132 | v07 link: payments as FIN-OPS Payments; folio unchanged |
| 103 | Story-164 To approve resort refunds *(v06)* · 111 · BR-107 – 132 | v07 link: approved refunds to FIN-OPS refunds |
| 104 | Story-165 Discounts, credit notes and adjustments *(v06)* · 112 · BR-107 – 132 | v07 link: credit notes and adjustments to FIN-OPS |
| 105 | Story-166 To check a guest in *(v06)* · 113 · BR-107 – 132 |  |
| 106 | Story-167 To manage an in-house stay *(v06)* · 114 · BR-107 – 132 |  |
| 107 | Story-168 To register vehicles for the stay *(v06)* · 115 · BR-107 – 132 |  |
| 108 | Story-169 A room board *(v06)* · 116 · BR-107 – 132 |  |
| 109 | Story-170 To block faulty rooms *(v06)* · 117 · BR-107 – 132 |  |
| 110 | Story-171 Access credentials for the stay *(v06)* · 118 · BR-107 – 132 |  |
| 111 | Story-172 To check a guest out *(v06)* · 119 · BR-107 – 132 |  |
| 112 | Story-173 To reverse a check-in or check-out *(v06)* · 120 · BR-107 – 132 |  |
| 113 | Story-174 Night Audit and the business-day close *(v06)* · 121 · BR-107 – 132 | v07 link: the Night Audit day to FIN-OPS; deferred revenue per night (BR-152) |
| 114 | Story-175 Resort money handed to Finance *(v06)* · 122 · BR-107 – 132 | v07 link: FIN-OPS replaces the Finance stub (STUB-R) |
| 115 | Story-176 Resorts reports *(v06)* · 123 · BR-107 – 132 |  |
| 116 | Story-177 A resort audit log *(v06)* · 124 · BR-107 – 132 |  |
| 117 | Story-178 Resort notifications *(v06)* · 125 · BR-107 – 132 |  |
| 118 | Story-179 The Resorts pages refined visually *(v06)* · 164 |  |

## Business rules (140 built in v01 – v06, `prd/business-rules.md`)
| # | Item | v07 |
|---|---|---|
| 119 | BR-001 – BR-010 (application, eligibility, maker-checker, payment, referral, term, renewal, conversion) | v07 link: fee and payment steps through FIN-OPS |
| 120 | BR-011 – BR-020 (transfer, extension routing, withdrawal, lifecycle, deceased, absent, medical, status matrix, privileges, supplementary) |  |
| 121 | BR-021 – BR-030 (junior, corporate, credit, vehicles, card, consent, profile, configuration, fee, campaign) | v07 link: BR-023 credit from FIN-OPS; BR-029 fees raised in FIN-OPS |
| 122 | BR-031 – BR-035 (report access, parameters, no-data, export designation, definitions) *(v02)* | v07 link: Finance reports under the same rules |
| 123 | BR-036 – BR-060 (golf) *(v03)* | v07 link: golf charges to FIN-OPS |
| 124 | BR-061 – BR-083 (events: publication, eligibility, rates, holds, waitlist, check-in, cancellation, refunds, reschedule, function rooms, maintenance) *(v04)* | v07 link: event payments and refunds to FIN-OPS |
| 125 | BR-086 – BR-106 (facilities: category, availability, blocks, window, duration, rates, payment, amendment, cancellation, exceptional refund, no-show, admission, visitor pass, day pass, bowling, waiting list, configuration, Personal Training) *(v05)* | v07 link: facility payments and refunds to FIN-OPS |
| 126 | BR-107 – BR-132 (resorts: configuration, eligibility, window, stay limits, rates, discounts, holds, amendment, cancellation, waitlist, no-show, payment, refunds, adjustments, check-in, check-out, vehicles, room status, blocks, PINs, reversal, Night Audit, Finance hand-off, notifications; Draft – for validation) *(v06)* | v07 link: BR-118, 119, 121, 130, 131 hand money to FIN-OPS instead of the stub |
| 127 | BR-084 role tab and page map | v07 link: Finance pages in the map |
| 128 | BR-085 member tab sees only its own account |  |
| 129 | BR-171 – BR-178 (validation, derivation, read-only after submit, return reason, status feed, Finance stub) | v07 change: BR-178 (Finance stub) retired (Story-202) |

## Workflows (`artifacts/diagrams/workflow-request-full-v08.md`)
| # | Item | v07 |
|---|---|---|
| 130 | Membership Request (17 request types, 9 transitions) | v07 link: fee, refund and clearance steps through FIN-OPS |
| 131 | Membership status (transition matrix) |  |
| 132 | Role tab and launcher | v07 change: Finance roles and card live; every "Coming in v0N" badge and planned card removed (prompt) |
| 133 | Demo data (export, import, reset) | v07 link: Finance collections |
| 134 | Club Reporting: Report run, Report definition, Report access rule *(v02)*; catalogue export *(v04)* | v07 link: Finance reports added |
| 135 | Golf booking, Waitlist entry, Rain check, Tee capacity / course status / golf approvals *(v03)* | v07 link: golf charges to FIN-OPS |
| 136 | Event, Event registration, Event waitlist, Attendance, Refund instruction, Function room booking (13 transitions) *(v04)* | v07 link: refund instructions to FIN-OPS refunds |
| 137 | Facility booking, Resource block, Facility waiting list, Admission and day pass, Bowling transaction and reconciliation, Exceptional refund, Facility configuration, Personal Training (29 transitions, W28 – W34) *(v05)* | v07 link: payments and refunds to FIN-OPS |
| 138 | Resort reservation and stay (room status, resort approvals), Resort waitlist, Night Audit, resort configuration (W35 – W41) *(v06)* | v07 link: payments, refunds, adjustments and the Night Audit day to FIN-OPS |

## Data (`artifacts/data-model/schema-v07.json`)
| # | Item | v07 |
|---|---|---|
| 139 | meta |  |
| 140 | modules | v07 change: Finance set live (no planned module left) |
| 141 | config |  |
| 142 | persons |  |
| 143 | memberships | v07 link: balance and credit read from FIN-OPS |
| 144 | requests |  |
| 145 | handoffs |  |
| 146 | financeStub | v07 change: replaced by the FIN-OPS records (Story-202); kept as history or retired in Phase 1 |
| 147 | vehicles |  |
| 148 | cards |  |
| 149 | outbox |  |
| 150 | integrationEvents | v07 link: FIN-OPS events |
| 151 | audit |  |
| 152 | guides | v07 link: Finance scenario guides |
| 153 | reports *(v02)* | v07 link: Finance reports added |
| 154 | accessRules *(v02)* | v07 link: Finance roles |
| 155 | reportRuns *(v02)* |  |
| 156 | definitions *(v02)* |  |
| 157 | dashboards *(v02)* |  |
| 158 | legacyReports *(v02)* |  |
| 159 | courses *(v03)* |  |
| 160 | teeSheets *(v03)* |  |
| 161 | golfers *(v03)* |  |
| 162 | guests *(v03)* |  |
| 163 | golfBookings *(v03)* |  |
| 164 | courseBlocks *(v03)* |  |
| 165 | waitlist *(v03)* |  |
| 166 | rainChecks *(v03)* |  |
| 167 | golfApprovals *(v03)* |  |
| 168 | golfExceptions *(v03)* |  |
| 169 | handicapImports *(v03)* |  |
| 170 | shiftCloses *(v03)* | v07 link: Finance cashier close |
| 171 | golfCharges *(v03)* | v07 link: to FIN-OPS intake |
| 172 | config.golf *(v03)* |  |
| 173 | events *(v04)* |  |
| 174 | accountHolders *(v04)* |  |
| 175 | eventRegistrations *(v04)* |  |
| 176 | eventAttendance *(v04)* |  |
| 177 | personnelAttendance *(v04)* |  |
| 178 | eventSettlements *(v04)* | v07 link: to FIN-OPS |
| 179 | eventRefunds *(v04)* | v07 link: to FIN-OPS refunds |
| 180 | roomBookings *(v04)* |  |
| 181 | roomFeed *(v04)* |  |
| 182 | config.events *(v04)* |  |
| 183 | facilityBookings *(v05)* |  |
| 184 | facilityPayments *(v05)* | v07 link: FIN-OPS Payments |
| 185 | facilityRefunds *(v05)* | v07 link: to FIN-OPS refunds |
| 186 | resourceBlocks *(v05)* |  |
| 187 | facilityWaitlist *(v05)* |  |
| 188 | admissions *(v05)* |  |
| 189 | dayPasses *(v05)* |  |
| 190 | bowlingTxns *(v05)* |  |
| 191 | bowlingRuns *(v05)* |  |
| 192 | bowlingExceptions *(v05)* |  |
| 193 | fitnessEquipment *(v05)* |  |
| 194 | fitnessInstructors *(v05)* |  |
| 195 | ptSessions *(v05)* |  |
| 196 | facilityConfigChanges *(v05)* |  |
| 197 | config.facilities *(v05)* (facilities, resources, rates, windows, visitor passes) |  |
| 198 | resortClock *(v06)* |  |
| 199 | resortReservations *(v06)* |  |
| 200 | folioLines *(v06)* | v07 link: charges to FIN-OPS intake |
| 201 | resortPayments *(v06)* | v07 link: FIN-OPS Payments |
| 202 | resortRefunds *(v06)* | v07 link: to FIN-OPS refunds |
| 203 | resortApprovals *(v06)* |  |
| 204 | stayVehicles *(v06)* |  |
| 205 | credentials *(v06)* |  |
| 206 | roomBlocks *(v06)* |  |
| 207 | roomHistory *(v06)* |  |
| 208 | resortWaitlist *(v06)* |  |
| 209 | nightAudits *(v06)* | v07 link: the day to FIN-OPS |
| 210 | resortConfigChanges *(v06)* |  |
| 211 | config.resorts *(v06)* (resorts, room types, rooms, add-ons, rates, seasons, discounts, policy) |  |

## Screens (`design/screen-inventory.md`)
| # | Item | v07 |
|---|---|---|
| 212 | SCR-32 Launcher `index.html` | v07 change: Finance card and roles live; no "Coming in v0N" badge or planned card (prompt) |
| 213 | SCR-01 Dashboard `dashboard.html` | v07 link: awaiting payment from FIN-OPS |
| 214 | SCR-02 Members |  |
| 215 | SCR-03 Member 360 | v07 link: balance and credit from FIN-OPS |
| 216 | SCR-04 New application |  |
| 217 | SCR-05 New request |  |
| 218 | SCR-06 Requests |  |
| 219 | SCR-07 Request detail |  |
| 220 | SCR-08 Approvals | v07 link: Finance approvals (maker-checker), if Phase 1 maps them here (p3-04) |
| 221 | SCR-10 Communications |  |
| 222 | SCR-12 Configuration |  |
| 223 | SCR-13 Member Portal | v07 link: payments and statements in the portal, if Phase 1 maps them (p3-04) |
| 224 | SCR-14 Integration feed | v07 change: FIN-OPS events replace the Finance stub list |
| 225 | SCR-11 Report Catalogue *(v02)* | v07 link: Finance reports live (prompt) |
| 226 | SCR-15 Report *(v02)* | v07 link: Finance report builders |
| 227 | SCR-16 Report definitions *(v02)* |  |
| 228 | SCR-17 Management dashboard *(v02)* |  |
| 229 | SCR-18 Legacy report finder *(v02)* |  |
| 230 | SCR-19 Tee Sheet *(v03)* |  |
| 231 | SCR-20 Golf Booking *(v03)* |  |
| 232 | SCR-21 Waitlist *(v03)* |  |
| 233 | SCR-22 Course Control *(v03)* |  |
| 234 | SCR-23 Golf Administration *(v03)* |  |
| 235 | SCR-24 Shift Close *(v03)* | v07 link: Finance cashier close |
| 236 | SCR-25 Golfers *(v03)* |  |
| 237 | SCR-26 Events *(v04)* |  |
| 238 | SCR-27 Event setup *(v04)* |  |
| 239 | SCR-28 Event *(v04)* | v07 link: refunds to FIN-OPS |
| 240 | SCR-29 Event registration *(v04)* |  |
| 241 | SCR-30 Event check-in *(v04)* |  |
| 242 | SCR-31 Function rooms *(v04)* |  |
| 243 | SCR-33 Facilities `facilities.html` *(v05)* |  |
| 244 | SCR-34 Facility booking `facility-booking.html` *(v05)* | v07 link: payment to FIN-OPS |
| 245 | SCR-35 Bookings `facility-bookings.html` *(v05)* | v07 link: refunds to FIN-OPS |
| 246 | SCR-36 Admissions `facility-admission.html` *(v05)* |  |
| 247 | SCR-37 Bowling `bowling.html` *(v05)* |  |
| 248 | SCR-38 Facilities Admin `facility-admin.html` *(v05)* |  |
| 249 | SCR-39 Resort front desk `resort-desk.html` *(v06)* |  |
| 250 | SCR-40 Resort reservation `resort-reservation.html` *(v06)* | v07 link: deposit to FIN-OPS |
| 251 | SCR-41 Stay and folio `resort-stay.html` *(v06)* | v07 link: payments, credit notes and adjustments to FIN-OPS |
| 252 | SCR-42 Rooms and housekeeping `resort-rooms.html` *(v06)* |  |
| 253 | SCR-43 Night Audit and audit log `resort-audit.html` *(v06)* | v07 link: the day to FIN-OPS |
| 254 | SCR-44 Resort configuration `resort-config.html` *(v06)* |  |

## Design
| # | Item | v07 |
|---|---|---|
| 255 | Design system v3 and direction pass 3 (`design/design-system-v3.md`, `design-direction.md`; D-247): NSRCC Brand Guideline palette, Lato, journey rail, quiet launcher, role avatar |  |
| 256 | D-241 success colour `#077D3C` (adjusted for contrast) |  |
| 257 | D-248 Layout-06 exception: tables left-aligned per the guideline |  |
| 258 | D-249 / D-250 tables: alternating row shading only, ID as link, Lilac mist hover |  |
| 259 | Reporting components *(v02, D-271)*: line chart, report print layout |  |
| 260 | Golf components and golf status colours *(v03, D-291)*; launcher **Module details** button *(D-285)*; scroll padding below the sticky header | Finance pages reuse them |
| 261 | Events components *(v04)* and the p4-02 fixes (D-312 – 315): label and value list (`.facts--list`), wrapping action buttons (`.col-actions--wrap`), catalogue **Export as** column, wider form section gaps | Finance pages reuse them |
| 262 | Facilities components *(v05, D-333)*: availability grid, occupancy meter; header **Golf** dropdown for the Manager and Administrator; Approve before Reject on every Approvals tab (D-334); side-by-side cards keep their buttons on one line (p4-02 fix 10); Layout-06 exception extended to the Facilities tables (D-337) | Finance pages reuse them |
| 263 | Resorts components *(v06, D-357)*: *Draft – for validation* note, Front desk time switch, rooms × nights grid, room status badges, price list, folio, masked PIN, room board, Night Audit checks, Resorts dropdown; tabs at least 44px on phones (D-358) | Finance pages reuse them |
| 264 | D-351 launcher: Scenarios section removed; Module details after Modules holds a Start link for every scenario *(v06)* | v07 link: Finance tab in Module details |

## Brief
| # | Item | v07 |
|---|---|---|
| 265 | Decision to inform. v06: *should we build Resorts (configuration, rates and policy, reservations with groups, holds, amendment, cancellation, waitlist and no-shows, payment and folio, refunds and adjustments, check-in and check-out with access credentials and vehicles, housekeeping and maintenance blocks, Night Audit, reports, audit log and notifications) on the Membership base, with every draft rule confirmed or flagged?* | Restate for v07: *should we build Finance (FIN-OPS: event intake, postings with GST, receivables, payments and allocation, standing orders and bank results, spending credit, refunds, deferred revenue and entrance-fee amortisation, reconciliation and cashier close, adjustments, periods, Yonyou staging, exceptions, dunning, General AR and reports) as the one place every module's money is accounted for, completing the club system across all seven modules?* |

## ⚠ Open overrides
None (0 open `Override-xxx`).
