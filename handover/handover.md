> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Handover: CC-Demo club system, all seven modules (full build v08, NEARCC look)

> KO-029 · Build: full-build v01 · imported from rapid-build-v09 · 2026-11-06

## What this is
A working, high-fidelity prototype of the whole CC-Demo club management system, a configuration-driven system for NSRCC, in its final version (7 of 7): **Membership** (v01: applications and every membership request, approval by a second person, the member's portal, communications, the lifecycle check), **Club Reporting** (v02: the report catalogue by role, runs, Excel and PDF export, club-defined reports, the management dashboard, the legacy finder), **Golf** (v03: tee sheets, booking, the waitlist, check-in, course control, rain checks, handicaps, the shift close), **Events** (v04: setup and publication, registration, waitlist, check-in and attendance, cancellations and authorised refunds, function rooms), **Facilities** (v05: availability and blocks, booking, refunds, no-shows, the waiting list, pool and Fitness Centre admission, the Bowling counter and its reconciliation), **Resorts** (v06: reservations, groups and holds, the 21-day rules, the waitlist, check-in and check-out with the folio, housekeeping, Night Audit; every rule a draft for validation) and **Finance** (FIN-OPS, new in v07: one financial event for every money step of the other six modules, validated and posted with Output GST; member accounts, receivables, payments and statements; GIRO; spending credit; refunds by two people; deferred revenue, recognition and amortisation; reconciliation and the cashier close; adjustments, overrides and periods; Yonyou posting runs; financial exceptions; dunning; General AR; configuration under maker-checker; 10 Finance reports). The Finance stub of v01 – v06 is gone: no module shows "Coming in v0N". Seven modules, 55 pages, one role tab per persona, from the launcher.
- **Built against:** PRD v9 (`prd/prd-v9.md`): the 141 stories and 177 business rules of PRD v8, unchanged (v08 is a look-only refine, D-395). Source version: v07 (Final approval SO-046).
- **Review status:** traceability review over the whole system (`review/review-report.md`): Must-haves 119 / 119, Should-haves 22 / 22, no Deferred stories, no gaps (D-409); full regression of all 57 page states in both themes (`review/a11y-responsive-check.md`): alignment 342 / 342, axe-core 114 / 114, static site pass, no sideways scrolling, no UI rule exceptions; 11 p4-02 fixes.
- **Signed off for build:** SO-047 (`documentation/decisions/signoff-v11.md`), after a mockup review of the launcher and one key screen per module (`design/mockup-review/v08/`).

## Changes since v07
- **Look (KO-037):** design system v4 (`design/design-system-v4.md`) from the *NEARCC Brand Guideline* design canvas, with no StarHub value, logo or kit token (D-393, D-402): `css/styles.css` rebuilt on the current house `base.css`; Lato + League Gothic (`assets/fonts/`, SIL OFL); the C monogram tile and the League Gothic footer watermark; Phosphor-style inline icons; canvas cards, radius 4 / 5 / 8 / pill, 1120 content width; the journey rail in the canvas stepper look; slot chips; `styleguide.html` (not linked).
- **Tables:** Layout-06 without exception (D-248 retired); cells wrap and `.table-wrap--cards` tables become cards below 992px, so nothing scrolls sideways; the tee-sheet Morning and Afternoon tables share their column widths (D-405).
- **One filled button per view:** repeated row actions are outline buttons; the Bowling import is secondary.
- **Unchanged:** every requirement, rule, workflow, data record, screen and label; `rules.js`, `workflow.js`, `store.js` (key `nsrcc_prototype-full-v08`).
- **Dropped:** none (keep list, D-391).

## Changes since v06 (v07)
- **New (Finance, FIN-OPS):** `finance.html`, `fin-events.html`, `fin-accounts.html`, `fin-collections.html`, `fin-refunds.html`, `fin-recognition.html`, `fin-recon.html`, `fin-posting.html`, `fin-dunning.html`, `fin-ar.html`, `fin-config.html`, `fin-approvals.html`; rules BR-133 – BR-170 with `makerChecker`; 28 Finance actions (`workflow.js` `FIN_TRANSITIONS`, `canFin`); the Finance Officer (maker) and Finance Approver (checker) roles; `finance`, `config.finance` and 31 Finance collections; the 10 Finance reports FIN-OPS-RR-002, 005 – 008, 011 – 013, 015, 017.
- **Finance stub replaced in every module:** Membership fee payments become FIN-OPS Payments (Approvals → *Fee payments*, **Confirm payment** / **Mark payment failed**), the goodwill refund and referral reward go to FIN-OPS, the credit check reads the FIN-OPS balance; golf charges, event payments and refunds, facility payments, refunds and bowling escalations, resort deposits, payments, charges, credit notes, refunds, no-shows and the Night Audit close (recognition per night) each raise a FIN-OPS event or refund. A refund approved in its module then needs the Finance Officer and the Finance Approver.
- **Changed where they connect:** launcher (all seven modules live, the Finance tab in Module details with 10 scenarios, 67 Start links in all, the two Finance roles), Approvals (Fee payments), Request (FIN-OPS panel), Member 360 (dunning escalation alert), Dashboard (escalations), Integration feed (target FIN-OPS), Report Catalogue and Report, the golf, event, facility, portal and resort pages (**Pay (simulated)**), Import (requires the Finance collections), every header (Finance links and menu) and footer ("Version 7").
- **Changed in p4-02 (D-380, D-381):** paired cards stacked on 6 Finance pages; Finance sub-navigation 44px on phones.
- **Changed in p5-01 (D-384):** an unknown financial event or member account says "Unknown …".
- **Dropped:** none (keep list, D-369).

## Changes since v05 (v06)
- **New (Resorts):** `resort-desk.html`, `resort-reservation.html`, `resort-stay.html`, `resort-rooms.html`, `resort-audit.html`, `resort-config.html`; rules BR-107 – BR-132; 26 resort transitions (`workflow.js` `RESORT_TRANSITIONS`, `canResort`); the Resort Front Desk and Housekeeping roles; 13 resort collections and `config.resorts`; the 5 reports HMS-RES-RR-001 – 005.
- **Changed where they connect:** launcher (Resorts live, its details tab, 9 scenarios, two roles), Approvals (Resort refunds, Resort exceptions, Resort configuration for the Manager), Portal (Resorts section and waitlist; a non-member tab shows Events, Facilities and Resorts), Admissions (a Resort guest enters the Fitness Centre on an in-house stay; Bungalow guest renamed), Report Catalogue and Report access (Resorts reports and role), Integration feed (resort records on the Finance stub), Import (requires the resort collections), the header and footer of every page.
- **Changed at the user's request (D-351):** the launcher's Scenarios section is removed; **Module details** follows Modules and has a Start link for every scenario (57), the launcher scenarios on a new *Launcher* tab.
- **Changed in p4-02:** tab buttons are at least 44px tall on phones on every page (D-358).
- **Guest data:** guests are the existing memberships (dependants by their own membership ID) and non-member account holders: resort records keep IDs only and read names, status, type, privileges and vehicles from Membership.
- **Dropped:** none.


## Changes since v04 (v05)
- **New (Facilities):** `facilities.html`, `facility-booking.html`, `facility-bookings.html`, `facility-admission.html`, `bowling.html`, `facility-admin.html`; rules BR-086 – BR-106; 29 facility transitions (`workflow.js` `FACILITY_TRANSITIONS`, `canFacility`); the Facilities Staff role; 14 facility collections and `config.facilities`; the 8 reports HMS-FAC-RR-001 – 008.
- **Changed where they connect:** launcher (Facilities live, its details tab, 9 scenarios, Facilities Staff), Events (venue chosen from the Facilities records; a published session blocks a bookable venue and flags a booking there; venue links), Approvals (Facility refunds and Facility configuration for the Manager), Portal (Facilities section and waiting list; a non-member tab shows Events and Facilities), Report Catalogue and Report access (Facilities reports and role), Integration feed (facility payments, refund instructions and escalations), Import (requires the facility collections), the header and footer of every page.
- **Changed at the user's request:** the Manager's and Administrator's golf links are grouped under one **Golf** dropdown so the header stays on one line; **Approve** before **Reject** on every Approvals tab (D-333, D-334); side-by-side cards keep their buttons on one line (p4-02 fix 10).
- **Customer data:** customers are the existing persons and memberships (dependants by their own membership ID), a non-member account holder, a SAFRA card number or a named guest: facility records keep IDs only and read names, status and privileges from Membership.
- **Dropped:** none.


## Changes since v03 (v04)
- **New (Events):** `events.html`, `event-edit.html`, `event.html`, `event-register.html`, `event-checkin.html`, `event-rooms.html`; rules BR-061 – BR-083; 13 event transitions (`workflow.js` `EVENT_TRANSITIONS`, `canEvent`); the Events Team role and non-member account tabs (NM-01 – 04); 9 event collections and `config.events`.
- **Changed where they connect:** launcher (Events live, its details tab, 9 scenarios, Events Team, non-member accounts), Approvals (Event refunds, Manager), Portal (Events; a non-member tab shows Events only), Integration feed (event and function-room messages; the Events Team may open it), the header and footer of every page, Import (requires the event collections).
- **Changed at the user's request:** the Report Catalogue's last column is headed **Export as** and holds a **PDF** and an **XLS** button per exportable report, each running the report with its defaults and exporting it, recorded as a run with source *catalogue* (the report page shows that run and prints it); "On screen" and "Coming in v0N" unchanged. Layout fixes in p4-02 (event summary as a label and value list, schedule actions as wrapping buttons, one-part cards keep their height, wider section gaps on the setup form, launcher intro full width).
- **Member data:** participants are the existing persons and memberships, or a non-member account holder: event records keep IDs only and read names, status and relationships from Membership; a guest added at the counter keeps only its typed name (`G-n`).
- **Dropped:** none.

## Changes since v02 (v03)
- **New (Golf):** `golf-teesheet.html`, `golf-booking.html`, `golf-waitlist.html`, `golf-course.html`, `golf-admin.html`, `golf-close.html`, `golfers.html`; rules BR-036 – BR-060; 25 golf transitions (`workflow.js` `GOLF_TRANSITIONS`, `canGolf`); the Golf Operations role; 13 golf collections and `config.golf`; the golf report builders GMS-RR-001 – 012.
- **Changed where they connect:** launcher (Golf live, its details tab, 10 scenarios, Golf Operations; the card button **Module details** now always opens and scrolls to its module's tab, D-285), Approvals (Golf approvals), Portal (Golf), Dashboard (Golf today), Configuration (Golf Operations in Report access), the report pages (golf reports runnable), Integration feed (golf hand-offs), the header and footer of every page, Import (requires the golf collections). The legacy finder no longer stops at a capability successor (v02 fault).
- **Member data:** golfers are the existing persons and memberships: golf records keep IDs only and read names, status and privileges from Membership.
- **Dropped:** none.

## Changes since v01 (v02)
- **New (Club Reporting):** `reports.html`, `report.html`, `report-definitions.html`, `report-dashboard.html`, `legacy-reports.html`; rules BR-031 – BR-035; transitions Open report, Run, Export, Save, Save new version, Inactivate, Grant (`workflow.js` `REPORT_TRANSITIONS`); collections `reports`, `accessRules`, `reportRuns`, `definitions`, `dashboards`, `legacyReports`; memberships keep `recruitmentSource` and `referrerMembershipId`.
- **Changed where they connect:** launcher (Club Reporting live, its details tab and 5 scenarios), Dashboard (links to MMS-RR-003, 005), Configuration (Report access tab), the header of every page (Reports link), Import (requires the reporting collections), applications carry their recruitment source into the membership (G-1).
- **Dropped:** none.

## How to run it
See [../HOW-TO-RUN.md](../HOW-TO-RUN.md).

## File map (`mockups/`)
| Path | What it holds |
|---|---|
| `index.html` | Launcher: role tabs (staff, members, non-member accounts), module cards (all seven modules live) with **Module details**, scenarios with Start links, module details, demo data (Export, Import, Reset) |
| `reports.html`, `report.html`, `report-definitions.html`, `report-dashboard.html`, `legacy-reports.html` | Club Reporting (v02): catalogue, one report (parameters, run, KPI tiles, chart, table, export, run history), definitions, management dashboard, legacy finder |
| `events.html`, `event-edit.html`, `event.html`, `event-register.html`, `event-checkin.html`, `event-rooms.html` | Events (v04): schedule, setup (publish, maintain, reschedule, cancel), one event (registrations, waitlist, attendance, viability, refunds), registration (portal and counter, hold and payment), check-in and personnel attendance, function rooms |
| `resort-desk.html`, `resort-reservation.html`, `resort-stay.html`, `resort-rooms.html`, `resort-audit.html`, `resort-config.html` | Resorts (v06): front desk (arrivals, departures, in-house, reservations, waitlist, rooms × nights grid), one reservation (reserve, group, hold, amend, cancel, no-show), stay and folio (check in and out, charges, discounts, corrections, vehicles, PIN, reversal), the room board, Night Audit and the audit log, configuration |
| `finance.html`, `fin-events.html`, `fin-accounts.html`, `fin-collections.html`, `fin-refunds.html`, `fin-recognition.html`, `fin-recon.html`, `fin-posting.html`, `fin-dunning.html`, `fin-ar.html`, `fin-config.html`, `fin-approvals.html` | Finance (v07): Finance home, financial events and the Validate queue with posting sets, member accounts (receivables, payments, statements), collections (GIRO, bank results, returned cheques), refunds, adjustments and overrides, revenue recognition and amortisation, reconciliation and the exception register, periods and Yonyou posting runs, dunning, General AR, configuration, Finance approvals |
| `facilities.html`, `facility-booking.html`, `facility-bookings.html`, `facility-admission.html`, `bowling.html`, `facility-admin.html` | Facilities (v05): availability grid and blocks, one booking (book, pay, amend, cancel, move, no-show, exceptional refund), bookings and the waiting list, pool and Fitness Centre admission with day passes and Personal Training, the Bowling counter and reconciliation, configuration and Fitness Centre lists |
| `golf-teesheet.html`, `golf-booking.html`, `golf-waitlist.html`, `golf-course.html`, `golf-admin.html`, `golf-close.html`, `golfers.html` | Golf (v03): tee sheet and blocks, one booking (book, amend, cancel, check in, late arrival, rain check, waiver, charges), waitlist and offers, course control and rain checks, golf administration, shift close, golfer enquiry |
| `dashboard.html`, `members.html`, `member.html`, `application.html`, `request-new.html`, `requests.html`, `request.html`, `approvals.html`, `communications.html`, `config.html`, `portal.html`, `integrations.html` | One page per screen (`design/screen-inventory.md`), joined by plain links |
| `checks.html` | Self-check page (not linked from the app) |
| `styleguide.html` *(v08)* | Every token and component in both themes (not linked from the app) |
| `js/store.js` | Persistence (option A): localStorage key `nsrcc_prototype-full-v08`, loaded from `data/seed.js`; Reset, Export, Import with a file check (v07: a file without the Finance collections is refused) |
| `js/rules.js` | One function per business rule (index below); no page inlines a rule |
| `js/workflow.js` | The request transitions as data, and `Workflow.can(role, request, action, user)` / `actions()`; (v02) the report transitions `REPORT_TRANSITIONS` and `canReport(role, action, state)`; (v03) `GOLF_TRANSITIONS`, `canGolf`; (v04) `EVENT_TRANSITIONS`, `canEvent`; (v05) `FACILITY_TRANSITIONS`, `canFacility`; (v06) `RESORT_TRANSITIONS`, `canResort`; (v07) `FIN_TRANSITIONS`, `canFin` |
| `js/app.js` | Shell (role tabs, role avatar, nav, theme, blocked panel, toasts, scenario guide panel), the request engine (create, submit, act, apply, lifecycle check, fee hand-offs to FIN-OPS), the journey rail, (v02) the report builders `BUILD["MMS-RR-001" … "MMS-RR-008"]`, runs and export (v04: from the catalogue too), (v03) the golf engine, (v04) the events engine (registration, holds, waitlist promotion, cancellation, refunds, function-room feed), (v05) the Facilities engine (slot checks, bookings, payments to FIN-OPS (v07), waiting-list offers, admissions, bowling reconciliation, configuration approvals), event venue blocks and the Facilities report builders, one renderer per page, (v06) the Resorts engine (eligibility and pricing, reservations, holds and groups, the folio and its FIN-OPS events (v07), check-in and check-out, room states, approvals, Night Audit) and the Resorts report builders; (v07) the FIN-OPS engine (`finOps`, `finValidate`, `finPost`, `finPay`, `finBill`, `finRefundIn`, `finEffect`) that every module money step calls, the 12 Finance page renderers and the 10 Finance report builders |
| `js/checks.js` | Asserts every rule function and every transition on a copy of the seed |
| `data/seed.json`, `data/seed.js` | Invented demo data (33 persons, 29 memberships, 18 requests, 20 reports, 147 legacy report names; golf: 2 courses, 28 tee sheets, 24 golfer profiles, 6 guests, 43 bookings, 63 charges; events: 9 events, 4 non-member account holders, 30 registrations, 14 attendance records, 20 settlements, 5 queued function-room messages; facilities: 15 facilities (4 event venues), 16 resources, 14 bookings, 8 admissions, 6 bowling sales and an 8-row sample export, 6 equipment items, 4 instructors; resorts: 2 resorts, 4 room types, 10 rooms, 14 reservations, 17 folio lines, 11 payments (one pending), 2 waitlist entries, a closed Night Audit; finance (v07): 127 financial events, 16 receivables, 3 posting batches, 3 financial exceptions, 3 refunds, 4 dunning cases, 3 General AR debtors and 3 documents, standing orders, GIRO collections, spending credits, deposits, deferred revenue, cashier sessions, periods and `config.finance` (mappings, runs, approval bands); 67 scenario guides with 298 steps); schema `artifacts/data-model/schema-v07.json` |
| `css/styles.css` | Design system v4 (`design/design-system-v4.md`): tokens from the NEARCC Brand Guideline canvas in three tiers (light and dark), the current house layout base (`agent/reference/ui/base.css`), the kit's component structure without StarHub looks, the project components *(v08)* |
| `vendor/` | Bootstrap 5.3.3, a local pinned copy (css, bundle, licence): ship it with the prototype |
| `assets/fonts/` | Lato 400 / 700 / 900 and League Gothic 400 *(v08)* (woff2) with their SIL Open Font Licences |

## Business logic index (`js/rules.js`)
| Rule | Function | What it checks or derives |
|---|---|---|
| BR-001 | `bizRule001` | unique Membership ID = 2 initials (surname, given name; or the sponsor's first two words) + 5-digit sequence |
| BR-002 | `bizRule002` | no second open application for the same Person and membership type |
| BR-003 | `bizRule003` | eligibility of the type (age range; corporate needs a Singapore-registered sponsor) |
| BR-004 | `bizRule004` | every mandatory document received before approval routing |
| BR-005 | `bizRule005` | only the routed role decides (the Manager may also take Approver work), never the person who created the request |
| BR-006 | `bizRule006` | a request with a fee completes only after the payment is confirmed |
| BR-007 | `bizRule007` | recruitment source required; a referral needs an active referring member |
| BR-008 | `bizRule008` | combined Associate + Ordinary duration at most 30 years, approved absent months excluded |
| BR-009 | `bizRule009` | renewal only on the member's request, from Active, Absent or Medical |
| BR-010 | `bizRule010` | Full → Basic doubles the remaining months; Basic → Full halves them, rounded down |
| BR-011 | `bizRule011` | transferable type and an eligible recipient |
| BR-012 | `bizRule012` | extension at most 24 months; over 12 months goes to the Manager |
| BR-013 | `bizRule013` | a voluntary withdrawal comes from the member; it completes only after the balance is cleared; no refund of the remaining term |
| BR-014 | `bizRule014Expired`, `bizRule014Rejoin` | expiry passed with no renewal → Expired; rejoin only from Expired or Withdrawn (original ID kept) |
| BR-015 | `bizRule015` | a goodwill refund on a deceased case is decided by the Manager |
| BR-016 | `bizRule016` | absent period 3 – 24 months, no overlap with an approved absent period |
| BR-017 | `bizRule017` | medical period at most 12 months; the expiry date does not change |
| BR-016, BR-017 | `periodEnded` | an absent or medical period whose end date has passed returns the membership to Active (lifecycle check) |
| BR-018 | `bizRule018` | one current status, changed only along the approved transition matrix |
| BR-019 | `bizRule019` | privileges and billing follow the status |
| BR-020 | `bizRule020` | supplementary needs an active principal; it ends when the principal is no longer active |
| BR-021 | `bizRule021`, `bizRule021Watch` | junior eligibility ends at the age limit; nothing converts automatically; watch list within 6 months |
| BR-022 | `bizRule022`, `bizRule022Corporate` | active nominees within the type's limit; new corporate memberships only by the Administrator |
| BR-023 | `bizRule023` | available credit = In-House Credit Limit − outstanding balance; derived, never stored; blocked when balances are unavailable |
| BR-024 | `bizRule024` | vehicles only for Active memberships, at most the configured limit |
| BR-025 | `bizRule025` | cards only for Active memberships; a replacement voids the previous card |
| BR-026 | `bizRule026` | marketing goes only to persons who gave marketing consent; service messages are not affected |
| BR-027 | `bizRule027` | mandatory member information stays complete |
| BR-028 | `bizRule028` | referenced master data is inactivated, never deleted |
| BR-029 | `bizRule029` | fee from the fee configuration, read only at approval |
| BR-030 | `bizRule030` | referral reward only under an active campaign |
| BR-031 *(v02)* | `bizRule031` | a role runs only the reports its access rule lists; planned reports run for no one; the audit review only for the Manager and Administrator (also checks a grant in Report access) |
| BR-032 *(v02)* | `bizRule032` | every required report parameter is given and valid; To on or after From |
| BR-033 *(v02)* | `bizRule033` | a run that matches nothing is a valid empty result, never an error |
| BR-034 *(v02)* | `bizRule034` | only a report designated for export is exported (MMS-RR-001 – 006, 008; not MMS-RR-007) |
| BR-035 *(v02)* | `bizRule035` | a definition builds on a runnable approved report, has a name and an effective date, and no role wider than the base report's access |
| BR-036 *(v03)* | `bizRule036`, `bizRule036Holes` | tee times are generated per course (Changi, Kranji), day type and session from the configuration, and 9-hole play is allowed only in the weekday 07:01 – 07:57 period, never on weekend or public-holiday mornings |
| BR-037 *(v03)* | `bizRule037` | the request must fall inside the booking window and at least 2 hours before tee-off; staff-assisted booking may go later |
| BR-038 *(v03)* | `bizRule038` | they hold no other session that day (an active waitlist entry counts); a second same-day 18-hole round needs Golf Manager approval with a reason |
| BR-039 *(v03)* | `bizRule039` | it has at most 4 golfers and at least 2 on weekdays or 3 on weekends and public holidays; a single golfer joins an existing flight instead of opening an invalid solo flight |
| BR-040 *(v03)* | `bizRule040` | their membership or nominee status from MMS must be Active with golf privilege; a suspended member cannot book or play |
| BR-041 *(v03)* | `bizRule041` | they play weekdays independently, and on weekends only in a flight whose main booker is an eligible Full Member |
| BR-042 *(v03)* | `bizRule042` | the introducer is at least 18 and plays in the same flight, brings at most 3 guests, each guest holds a recognised handicap, and no guest plays at Changi on Saturday afternoon without approval |
| BR-043 *(v03)* | `bizRule043`, `bizRule043Weekend`, `bizRule043Pc` | on weekends and public holidays male HI ≤ 24.4 and female HI ≤ 36.4 play at any time; male 24.5 – 36.4, female 36.5 – 40.4 and NSRCC PC holders play weekdays or from 16:30; an external PC does not count |
| BR-044 *(v03)* | `bizRule044` | it is offered first to the earliest waitlist entry whose party fits, held for 15 minutes; on decline or expiry the next entry gets it, and only then does it return to general availability |
| BR-045 *(v03)* | `bizRule045` | a player substitution carries the substitution fee, and a course change is allowed only with equivalent capacity at the other course and carries the course-change fee |
| BR-046 *(v03)* | `bizRule046` | the late-cancellation charge (based on the course green fee) is raised on the booking member |
| BR-047 *(v03)* | `bizRule047` | when an amendment, cancellation, no-show, fee or rain-check exception is waived or extended, then a Golf Manager approves it with a reason (and evidence where required); the requester cannot approve it |
| BR-048 *(v03)* | `bizRule048` | it is at least 15 minutes before tee-off; later arrivals go to the late-arrival treatment |
| BR-049 *(v03)* | `bizRule049` | membership or guest eligibility, handicap or NSRCC PC, insurance (existing, annual or MSIG day insurance) and the 9 / 18-hole declaration are all satisfied, and the charge outcome is accepted |
| BR-050 *(v03)* | `bizRule050` | the sign-in guest rate applies; proof produced within 7 working days allows an adjustment |
| BR-051 *(v03)* | `bizRule051` | they are rescheduled to a later free tee time if one exists, else joined by skipping holes if Golf Operations permits, else treated as a no-show with the no-show charge |
| BR-052 *(v03)* | `bizRule052` | only the Club Captain, Vice-Captain, Golf Manager or an approved executive may do it; golfers who had not teed off get the green and buggy fee refund path, not a rain check |
| BR-053 *(v03)* | `bizRule053` | when a qualifying suspension interrupts a golfer who has teed off before completing the first 9, or an 18-hole golfer who cannot cross over, then a 9-hole rain check is issued |
| BR-054 *(v03)* | `bizRule054`, `bizRule054Usable` | it is valid for 1 month, linked to the golfer, not transferable and has no cash value; an extension needs approval (BR-047) |
| BR-055 *(v03)* | `bizRule055` | the golfer pays the top-up; a cheaper booking gives no residual refund |
| BR-056 *(v03)* | `bizRule056` | it is staged and validated (identifier, gender, HI range) before it replaces the effective data; failing rows become exceptions and the prior values stay in history |
| BR-057 *(v03)* | `bizRule057`, `bizRule057Block` | when capacity is blocked for maintenance, an HMS event, private use, a programme or management, then those tee times cannot be booked, keep their reason and source reference, and on release go to the waitlist first |
| BR-058 *(v03)* | `bizRule058` | the rate comes from course, player category, 9 / 18 holes and day type, and every chargeable golfer has a responsible payer (member, introducing member for guests, corporate account, or self) |
| BR-059 *(v03)* | `bizRule059` | gMS keeps the Finance status (pending, accepted, rejected); member in-house credit needs Finance-derived eligibility (BR-023); GMS never stores a balance |
| BR-060 *(v03)* | `bizRule060` | counts and totals are compiled from GMS records, and unresolved exceptions and events without a Finance status stay flagged, never silently cleared |
| BR-061 *(v04)* | `bizRule061` | when an event is published, then it needs no approval but every item its configuration requires (venue, schedule, sessions, capacity where controlled, rates where paid, free / paid choice) must be complete; only the Events Team may configure and publish |
| BR-062 *(v04)* | `bizRule062` | when a registration is made online or at the counter, then the event or session registration window must be open (default: opens at publication, closes when the event starts) |
| BR-063 *(v04)* | `bizRule063` | when a participant is registered, then they must meet the event's eligibility (who may register: members only, members and dependants, or open to non-members; age category), with member status taken from MMS (only Active members get member privileges) |
| BR-064 *(v04)* | `bizRule064`, `bizRule064Category` | when a participant's rate is set, then it is the event rate for their qualifying category (member / non-member, adult / child); the member rate needs an Active member or responsible member; the rate and amount are frozen on the registration |
| BR-065 *(v04)* | `bizRule065` | when a registration has several participants, then it is confirmed only if every participant is eligible and the whole group fits; the group is never split automatically; at most the configured participants per registration |
| BR-066 *(v04)* | `bizRule066` | when capacity is checked, then confirmed places plus active holds and reserved offers may never exceed the event or session capacity |
| BR-067 *(v04)* | `bizRule067` | when a paid registration goes to settlement, then the whole group's places are held (online: 15 minutes; counter: while the transaction is open); a hold is not a confirmed booking and is released on failure, abandonment or expiry |
| BR-068 *(v04)* | `bizRule068` | when a registration needs payment, then it is confirmed only on a successful settlement outcome (online channel online, counter channel at the counter, or member account where Finance says the member is eligible, BR-023); a free event confirms without settlement |
| BR-069 *(v04)* | `bizRule069` | when an eligible group does not fit and the waitlist is enabled, then the whole group may join the waitlist, with no payment |
| BR-070 *(v04)* | `bizRule070` | when places become free, then the waitlist is read in FIFO order of join time, skipping (without losing priority) any group that does not fit in full or is no longer eligible; changing a waitlisted group's participants resets its join time |
| BR-071 *(v04)* | `bizRule071` | when a waitlist place is offered, then the places stay reserved for the offer window (default 24 hours) for acceptance and payment; on expiry or failed payment they go to the next entry |
| BR-072 *(v04)* | `bizRule072` | when a registration is confirmed, then each participant gets their own QR credential, linked to the registration and its sessions |
| BR-073 *(v04)* | `bizRule073` | when attendance is recorded, then the credential must match a confirmed registration for that session; unmatched, cancelled or wrong-session credentials are refused, and a participant is recorded at most once per session |
| BR-074 *(v04)* | `bizRule074` | when a participant cannot present a usable QR, then authorised Events staff may record attendance only against an existing confirmed registration, keeping the staff member and the reason |
| BR-075 *(v04)* | `bizRule075` | when event personnel attend, then their attendance is recorded apart from participants and never uses participant capacity |
| BR-076 *(v04)* | `bizRule076` | when an event misses its minimum participation, then the Events Team decides to proceed or cancel; it is never cancelled automatically |
| BR-077 *(v04)* | `bizRule077` | when a participant cancels a confirmed registration, then it is classified participant-initiated, the amount paid is forfeited, the QR stops being valid and the freed places go to the waitlist |
| BR-078 *(v04)* | `bizRule078`, `bizRule078Refundable` | when the club cancels an event or session, then affected registrations are cancelled; any refund or reversal, full or partial, needs Events Manager authorisation before it goes to Finance |
| BR-079 *(v04)* | `bizRule079` | when the club reschedules an event or session, then confirmed participants keep their place or decline; a declining participant's refund, full or partial, needs Events Manager authorisation, and the freed places go to the waitlist |
| BR-080 *(v04)* | `bizRule080` | when a function room update arrives from the Function Room Booking System, then HMS Events reflects its latest status; only a confirmed status counts as confirmed, tentative holds never do, and an update with an unknown reference changes nothing |
| BR-081 *(v04)* | `bizRule081` | when a published event is changed, then a new price or eligibility rule applies only to future registrations, a cancellation goes through BR-078 and a schedule change with confirmed registrations goes through BR-079 |
| BR-082 *(v04)* | `bizRule082` | when capacity is reduced, then it may not go below the confirmed places plus active holds and reserved offers |
| BR-083 *(v04)* | `bizRule083` | when an event's last session has ended, then the event is shown as Completed, with no manual close |
| BR-086 *(v05)* | `bizRule086` | when a facility booking or admission is requested, then the customer's category (Member, SAFRA member, Non-member, Guest, Bungalow guest) and entitlement must allow that facility; member privileges apply only to an Active member (status from MMS); if the category cannot be set, no entitlement or member rate applies |
| BR-087 *(v05)* | `bizRule087` | when a booking is confirmed, then the resource must be free for the whole period: no overlapping active booking on the same resource, and the customer may not hold two overlapping bookings |
| BR-088 *(v05)* | `bizRule088`, `bizRule088Flags` | when a resource is blocked (maintenance, event, lesson, operational closure) with a reason, then it cannot be booked in that period and no override is allowed; a block over an existing booking is flagged for resolution, never removing the booking silently |
| BR-089 *(v05)* | `bizRule089` | when a booking is made, then its date must be inside the facility's booking window for the customer's category; same-day bookings only where the facility allows them |
| BR-090 *(v05)* | `bizRule090` | when a booking is made, then its duration must fit the facility's minimum and maximum in whole slots; Billiards is 1 to 3 hours |
| BR-091 *(v05)* | `bizRule091` | when a booking is priced, then the rate comes from the facility, the customer category (SAFRA rate where the facility allows SAFRA) and the day type; a public holiday is a weekend day unless a separate rate is set; the amount is frozen at confirmation |
| BR-092 *(v05)* | `bizRule092` | when a booking is chargeable, then it is confirmed and gets its reference only after a successful payment; on failure or abandonment it stays unconfirmed and the slot is not reserved; a free facility confirms without payment |
| BR-093 *(v05)* | `bizRule093` | when a booking is amended, then the new details pass every booking rule again and the amount is recalculated; extra amounts must be paid first; if payment fails or the new slot is gone, the original booking stays; released time inside 24 hours follows the cancellation refund rule |
| BR-094 *(v05)* | `bizRule094` | when a booking is cancelled, then a reason is required and the resource is released at once (unless separately blocked) |
| BR-095 *(v05)* | `bizRule095` | when a cancellation is priced, then a customer cancelling at least 24 hours before the start gets a full refund and less than 24 hours none; a club-initiated cancellation gets a full refund unless the customer accepts an alternative slot |
| BR-096 *(v05)* | `bizRule096` | when a refund outside the standard policy is asked for, then it needs an Operations Manager's approval and a recorded reason before the refund instruction goes to Finance |
| BR-097 *(v05)* | `bizRule097` | when a confirmed booking is recorded as a no-show, then no standard refund is due (an exceptional refund follows BR-096) |
| BR-098 *(v05)* | `bizRule098` | when a customer is admitted to the Swimming Pool or Fitness Centre, then it is an admission, not a time slot: only during operating hours, within capacity, and after any admission or day-pass payment unless an entitlement covers access; attendance and occupancy are recorded |
| BR-099 *(v05)* | `bizRule099` | when a customer enters the Fitness Centre, then they need an Active membership, a valid bungalow visitor pass (complimentary) or a valid day pass; a non-member with neither buys a day pass first |
| BR-100 *(v05)* | `bizRule100` | when a day pass is issued, then it is valid for the whole operating day of issue and allows same-day re-entry; it is not valid on another day |
| BR-101 *(v05)* | `bizRule101` | when a bowling counter transaction is recorded, then it needs a receipt number and is paid at the Bowling counter before play, for members and non-members alike; no member-account charging |
| BR-102 *(v05)* | `bizRule102` | when a bowling export file is reconciled, then each record is matched to one CMS counter transaction by receipt number and checked on amount (tolerance S$0.00), date and payment method; unmatched, duplicate or mismatched records become exceptions; reconciled records are locked |
| BR-103 *(v05)* | `bizRule103` | when a bowling exception is worked, then it stays open until Bowling Operations records a disposition and reason; an amount, payment-method, refund or void issue is escalated to Finance; it closes only as reconciled or formally accepted |
| BR-104 *(v05)* | `bizRule104`, `bizRule104Next` | when no suitable slot is free and the facility's waiting list is enabled, then an eligible customer may join it; a freed slot is offered in FIFO order for the response window; it becomes a booking only on acceptance in time and any payment, otherwise it goes to the next entry; a request can be withdrawn before acceptance |
| BR-105 *(v05)* | `bizRule105` | when facility configuration is saved, then incomplete or unapproved values are not effective for new transactions (they stay Draft), and the Billiards 1 – 3 hour limit cannot be changed |
| BR-106 *(v05)* | `bizRule106` | when a Personal Training session is requested, then it is confirmed only for a participant who meets the PT eligibility policy; while the PT policy is TBC, scheduling, price and cancellation are not assumed and the session stays Pending policy where needed |
| BR-107 *(v06, Draft)* | `bizRule107`, `bizRule107Room` | when a resort reservation is created, then every night of the stay must have an available, eligible room (not Faulty or Maintenance Blocked, not already reserved) and the stay must be at least the minimum stay (2 consecutive nights, configured value) |
| BR-108 *(v06, Draft)* | `bizRule108` | when a member books, then the member must be Active in MMS, the arrival must be inside the category's reservation window and the stay within its maximum nights and privileges; a non-member uses the non-member window and rate |
| BR-109 *(v06, Draft)* | `bizRule109` | when a rate type is assigned by hand, then only staff may do it, from the permitted rate types |
| BR-110 *(v06, Draft)* | `bizRule110` | when a reservation is amended, then the booked guest cannot be changed: reservations are non-transferable |
| BR-111 *(v06, Draft)* | `bizRule111` | when a reservation is priced, then nightly rates by room type, day type and season apply; a Corporate member covered by a lease pays zero; Honorary members (20 %) and members flagged Committee (10 %) get their demo discount |
| BR-112 *(v06, Draft)* | `bizRule112` | when a group reservation is confirmed, then every requested room must be available; a smaller set is confirmed only when staff explicitly accept the revised set; all rooms share one master reference |
| BR-113 *(v06, Draft)* | `bizRule113` | when a reservation is placed on tentative hold, then the rooms are held for the hold period; paid in time it becomes Confirmed, otherwise it expires and the rooms are released |
| BR-114 *(v06, Draft)* | `bizRule114` | when stay dates or rooms are amended more than 21 days before arrival, then a Lost Opportunity Charge of 20 % of the original reservation value applies; at 21 days or less the amendment is processed as a cancellation |
| BR-115 *(v06, Draft)* | `bizRule115` | when a reservation is cancelled, then the charge is 50 % of the reservation value more than 21 days before arrival and 100 % at 21 days or less; the rest of the amount paid is refundable |
| BR-116 *(v06, Draft)* | `bizRule116` | when a confirmed reservation has not checked in by the no-show cutoff, then staff may process it as a no-show with a charge of 100 % of the reservation value; never before the cutoff |
| BR-117 *(v06, Draft)* | `bizRule117`, `bizRule117Allocate` | when no room is available, then the guest may join the resort waitlist; an entry never blocks inventory; when a room frees up, staff see the matching entries (oldest first) and choose one; the choice is audited and the entry closes when it becomes a reservation |
| BR-118 *(v06, Draft)* | `bizRule118` | when a payment is collected, then it counts only on a confirmed success from the payment service; every chargeable item is posted to the reservation or guest folio, and every payment, refund, adjustment and credit note is audited |
| BR-119 *(v06, Draft)* | `bizRule119` | when a resort refund is due, then it needs an Operations Manager's approval and keeps the original payment reference before the refund goes to FIN-OPS (v07) |
| BR-120 *(v06, Draft)* | `bizRule120` | when discounts are applied, then fixed and percentage discounts apply in the configured priority, and more than one only where the combination rule allows |
| BR-121 *(v06, Draft)* | `bizRule121` | when a transaction is corrected, then an unpaid one may be adjusted and a paid one only by a credit note; both need an Operations Manager's approval and keep the original reference |
| BR-122 *(v06, Draft)* | `bizRule122` | when a guest checks in, then the reservation must be Confirmed, it must be the arrival date between 3:00 and 6:00 PM (or an approved late-arrival exception), and the room must not be Faulty, Maintenance Blocked or Pending Cleaning |
| BR-123 *(v06, Draft)* | `bizRule123` | when a room changes state, then check-in makes it Occupied and opens the folio, check-out makes it Pending Cleaning, and housekeeping makes it Ready; every room status change is audited |
| BR-124 *(v06, Draft)* | `bizRule124` | when a stay is extended or moved, then the room (or the target room) must be available for every added night |
| BR-125 *(v06, Draft)* | `bizRule125`, `bizRule125Release` | when a room is marked Faulty or Maintenance Blocked, then it cannot be reserved or checked in, and it returns to service only after maintenance completion is recorded |
| BR-126 *(v06, Draft)* | `bizRule126`, `bizRule126Charge` | when a vehicle is registered to a reservation, then the registration number must be valid in the configured IU or OBU format; at most 2 vehicles per reservation, the first free and the second charged to the folio; only registered vehicles are whitelisted, for the stay period only, and revoked at check-out or cancellation |
| BR-127 *(v06, Draft)* | `bizRule127` | when an access credential is issued, then only for a Confirmed reservation and only for the stay period; a regenerated Salto PIN invalidates the previous one; check-out or cancellation deactivates it; every step is audited |
| BR-128 *(v06, Draft)* | `bizRule128` | when a guest checks out, then the folio must be settled first; check-out is due before 10:00 AM; access credentials and the vehicle whitelist are revoked |
| BR-129 *(v06, Draft)* | `bizRule129`, `bizRule129Approve` | when a check-in or check-out is reversed, then it needs an Operations Manager's approval and a reason, restores the prior states and keeps the original event |
| BR-130 *(v06, Draft)* | `bizRule130` | when the business day is closed, then Night Audit must run first; blocking exceptions stop the close; the day's posted transactions become one Night Audit record in FIN-OPS, which recognises each in-house night (v07) |
| BR-131 *(v06, Draft; changed in v07)* | `bizRule131` | when a resort financial event is raised, then it goes to FIN-OPS with its resort source reference and amount; Resorts never posts to Yonyou or holds a ledger |
| BR-132 *(v06, Draft)* | `bizRule132` | when a reservation or operational event occurs, then a notification is generated only if that event is configured; a failed notification never undoes the transaction |
| BR-133 *(v07, Interim design)* | `bizRule133` | a financial event is accepted only from an approved source, with a source identity not seen before, an amount, a tax code and a source reference; a duplicate or incomplete one becomes a financial exception |
| BR-134 *(v07, Proposed)* | `bizRule134` | a source-data error goes back to the owning module; a Finance error stays in FIN-OPS |
| BR-135 *(v07, TBC)* | `bizRule135` | an in-house member charge needs the upstream credit check; while Finance is unavailable it is not financially completed |
| BR-136 *(v07, Confirmed)* | `bizRule136` | an event posts only through an active, effective, approved mapping for its event type |
| BR-137 *(v07, Confirmed)* | `bizRule137` | every mapping leg in order, Output GST as its own leg on the GST-exclusive amount |
| BR-138 *(v07, Interim design)* | `bizRule138` | debits equal credits; up to S$0.01 goes to the rounding leg, more blocks the posting |
| BR-139 *(v07, Interim design)* | `bizRule139`, `makerChecker` | Finance configuration is Draft until a second person approves; no overlapping active mapping |
| BR-140 *(v07, Confirmed)* | `bizRule140` | one receivable per positive charge, none for credit lines, no duplicates |
| BR-141 *(v07, Interim design)* | `bizRule141` | a payment pays the named bill first, then the oldest due date, then the oldest bill; the excess is unapplied credit |
| BR-142 *(v07, Confirmed)* | `bizRule142` | a Payment is real money with one PaymentNo |
| BR-143 *(v07, Interim design)* | `bizRule143` | a cheque waits in Pending Clearance before it is allocated |
| BR-144 *(v07, Interim design)* | `bizRule144` | a standing order is collected only when Active and within its Maximum Debit Amount |
| BR-145 *(v07, Proposed)* | `bizRule145` | rejected or returned GIRO attempts are kept and never retried; an invalid mandate stops collection |
| BR-146 *(v07, Interim design)* | `bizRule146` | the second GIRO rejection in the same calendar month adds the rejection fee |
| BR-147 *(v07, Interim design)* | `bizRule147` | a returned cheque reopens what it paid |
| BR-148 *(v07, Interim design)* | `bizRule148` | spending credit expires after its months through a non-cash adjustment, never a refund |
| BR-149 *(v07, Confirmed)* | `bizRule149` | a deposit is refunded only after the outstanding balance is offset |
| BR-150 *(v07, Interim design)* | `bizRule150`, `makerChecker` | a refund needs the approval band of the refund matrix and a second person |
| BR-151 *(v07, Proposed)* | `bizRule151` | each refund part goes back to its source; in-house credit is restored to the member account, never paid as cash |
| BR-152 *(v07, Interim design)* | `bizRule152` | revenue is recognised per night (resort stays) or on delivery (events), with no second GST |
| BR-153 *(v07, Interim design)* | `bizRule153` | entrance-fee amortisation runs only with zero unexplained variance |
| BR-154 *(v07, Interim design)* | `bizRule154` | reconciliation has zero tolerance apart from S$0.01; a timing difference is recorded, not absorbed |
| BR-155 *(v07, Confirmed)* | `bizRule155` | a clearing flow must come back to zero |
| BR-156 *(v07, Interim design)* | `bizRule156` | the cashier close compares expected with counted by tender; a difference is an exception |
| BR-157 *(v07, Proposed)* | `bizRule157`, `makerChecker` | a Finance-owned adjustment only, linked to the original, which is never changed |
| BR-158 *(v07, Confirmed)* | `bizRule158` | a credit-limit override needs override authority and is audited |
| BR-159 *(v07, Proposed)* | `bizRule159` | post only into an Open period; a late item goes to the open period with its source date kept |
| BR-160 *(v07, Interim design)* | `bizRule160` | a posting run stages only posted lines with no open blocking exception, the controls rechecked |
| BR-161 *(v07, TBC)* | `bizRule161` | a scheduled run runs once a day; a later run never re-stages a line |
| BR-162 *(v07, Interim design)* | `bizRule162` | a Yonyou batch is finalised only when every line is accepted; otherwise Partial |
| BR-163 *(v07, Interim design)* | `bizRule163` | a financial exception closes only when resolved or recorded as a reconciling item |
| BR-164 *(v07, Interim design)* | `bizRule164` | the dunning stage follows the age of the oldest eligible overdue amount |
| BR-165 *(v07, Interim design)* | `bizRule165` | FIN-OPS escalates to Membership; it never changes a membership itself |
| BR-166 *(v07, Interim design)* | `bizRule166` | a General AR invoice needs an active debtor and a Finance-originated use case |
| BR-167 *(v07, Interim design)* | `bizRule167`, `makerChecker` | a credit note is linked, reasoned, at the original rate and never above what is open |
| BR-168 *(v07, Interim design)* | `bizRule168` | a recurring invoice is generated when its billing date is reached |
| BR-169 *(v07, Interim design)* | `bizRule169` | ageing buckets by due date; late-payment interest is off |
| BR-170 *(v07, Interim design)* | `bizRule170` | a reprint keeps the reference and is audited |
| BR-084 | `bizRule084` | a page renders only for the roles it lists (an empty list is open to all: the launcher); a tab without a role sees nothing |
| BR-085 | `bizRule085` | a Member tab reads only its own account |
| BR-171 | `bizRule171` | a valid e-mail and a Singapore mobile (+65, 8 digits starting 8 or 9) |
| BR-172 | `bizRule172` | a date of birth is not in the future; a period's end is after its start |
| BR-173 | `bizRule173` | a new or rejoining membership starts on the 1st of the month after the fee is paid |
| BR-174 | `bizRule174` | expiry = start + the type's term in months (the day before), moved out by approved absent months |
| BR-175 | `bizRule175` | only a Draft or Pending Documents request can be edited, and only by the person who created it |
| BR-176 | `bizRule176` | reject and return for correction need a reason |
| BR-177 | `bizRule177` | one append-only history entry per material action |
| BR-178 *(retired in v07)* | `bizRule006Confirm` | the Finance stub is gone; its guard stays as BR-006: only an Approver confirms a fee payment or records it failed, never on a request they created |
Workflow transitions are in `js/workflow.js` (submit, edit, docs, cancel, return, reject, approve, fail, pay), with their guards on BR-005, BR-175 and BR-006 (v07: the fee transitions are **Confirm payment** and **Mark payment failed**); (v02) the report transitions; (v03) the 25 golf transitions in `GOLF_TRANSITIONS`, checked by `canGolf(role, action, state)`; (v04) the 13 event transitions in `EVENT_TRANSITIONS`, checked by `canEvent(role, action, state)`; (v05) the 29 facility transitions in `FACILITY_TRANSITIONS`, checked by `canFacility(role, action, state)`; (v06) the 26 resort transitions in `RESORT_TRANSITIONS`, checked by `canResort(role, action, state)`; (v07) the 28 Finance actions in `FIN_TRANSITIONS`, checked by `canFin(role, action, state)`, with maker-checker on refunds, adjustments, overrides, invoices, credit notes and configuration.

## Simulated vs real
| Area | In this prototype | Real system |
|---|---|---|
| Authentication | No login: each role opens in its own browser tab from the launcher (BR-084, BR-085) | Single sign-on, roles from the identity provider |
| Payments *(v07)* | Every module money step is a FIN-OPS financial event, payment or refund (`FE-…`, `PN-…`, `RFD-…`) with a posting set; **Pay (simulated): Success / Decline** stands in for the card and PayNow provider; no money moves | The payment provider, the bank and Yonyou |
| Notifications | Written to an outbox (Communications) | E-mail / SMS provider |
| Integrations | Status feed entries to Access Control, HMS, GMS and FIN-OPS, marked as simulated feeds (Integration feed) | Real interfaces of those systems |
| Data | Invented (synthetic IDs `ID-nnnn`, e-mails on example.com, mobiles in the +65 8000 / 9000 blocks), one browser, localStorage | Database, many users, audit store |
| Date | Fixed demo date 28 Oct 2026 (`meta.today`); golf clock 11:55 (`config.golf.clock`), Let offer expire for the 15-minute hold | System clock |
| Golf money *(v03, v07)* | Golf charges and refunds raise FIN-OPS events; member-account charges become receivables; **Record payment** for a pending counter charge | FIN-OPS with the real POS and payment provider |
| Handicaps *(v03)* | A built-in sample SGA extract with 2 faulty rows | The SGA CHS feed (schema open at NSRCC) |
| Event money *(v04, v07)* | Event payments and member-account charges raise FIN-OPS events; authorised refunds arrive in FIN-OPS for the two Finance roles; **Pay (simulated): Success / Decline** | FIN-OPS, the online payment gateway |
| Function rooms *(v04)* | A queue of 5 messages from the Function Room Booking System, applied one by one on the Function Rooms page and listed in the Integration feed | The real Function Room Booking System interface |
| Venues *(v04, v05)* | Event venues are Facilities records (v05); a published session blocks a bookable venue | Facilities owns rooms and their bookings |
| Facility money *(v05, v07)* | Payments raise FIN-OPS events; refunds arrive in FIN-OPS; bowling escalations are FIN-OPS financial exceptions; **Pay (simulated)** online, Cash / Card / NETS at the counter | FIN-OPS, the payment gateway |
| Visitor passes *(v05, v06)* | The reservation number of an in-house resort stay (v06; the v05 simulated list is gone) | Resorts owns the stays |
| Resort money *(v06, v07)* | Deposits, payments, charges, credit notes and no-shows raise FIN-OPS events; refunds arrive in FIN-OPS after the Manager; the Night Audit close recognises each in-house night; **Pay (simulated)** | FIN-OPS, the payment gateway |
| Door access and carpark *(v06)* | Door PINs (6 invented digits, shown masked) and the carpark whitelist are integration-feed entries | Salto and Alphawave interfaces |
| Resort time *(v06)* | A **Front desk time** switch (09:30 / 15:30) on the fixed demo date; **Let hold expire** ends a hold | The system clock and a scheduler |
| Resort rules *(v06)* | Every value (rates, seasons, windows, maximum stays, discounts, hold hours, vehicle charge, no-show cutoff, Night Audit checks) is a demo value from a draft pack, labelled *Draft – for validation* | NSRCC's validated Resorts rules |
| Bowling *(v05)* | A built-in 8-row sample export of the lane system (or a local CSV in the same layout) | The Bowling Management System export |
| SAFRA *(v05)* | A typed card number `SF-nnnn`, not verified | SAFRA membership verification |
| QR credentials *(v04)* | `EQ-nnnn` codes typed or pasted at check-in | Scannable signed QR codes and a scanner |
| Yonyou *(v07)* | Posting runs stage batches; **Export file** and **Import response** with a built-in response (one line rejected) | The Yonyou interface |
| Bank and GIRO *(v07)* | **Run October collection**, **Apply bank results** and **Apply returned cheques** read built-in bank results | The bank's GIRO and cheque files |
| POS *(v07)* | A built-in external POS file in the intake | The POS interface |
| Finance time *(v07)* | The posting runs (13:00, 21:00), the GIRO collection, recognition and amortisation start from buttons on the fixed demo date | A scheduler and the system clock |
| Finance rules *(v07)* | Values from rules marked *Interim design* or TBC (mappings, tolerances, bands, dunning stages, fees) are demo values; late-payment interest is off | NSRCC Finance's validated rules |

## ⚠ Requirements kept against advice
None. No `Override-xxx` was raised in this build.

## Known gaps
v08: none found (D-409).

| ID | Severity | Description | Status |
|---|---|---|---|
| G-3 *(v07)* | Minor | Fee payment dialog on `request.html` still said "Record payment for RQ-…?" and "Simulated until the Finance module (v07): no money moves" (Story-030, 185); the same stub wording on the golf booking page ("the Finance side is a stub until v07"), the Integration feed intro, Report access ("the golf reports come in v03"), two `checks.html` labels, two `workflow.js` labels and the BR-131 comment | Fixed (D-385) |
| G-1 *(v07)* | Minor | `fin-events.html?id=FE-9999` (an unknown financial event) showed the register as if no ID were given (Story-181) | Fixed (D-384) |
| G-2 *(v07)* | Minor | `fin-accounts.html?member=XX99999` (an unknown member) showed an empty account with zero balances (Story-184) | Fixed (D-384) |
| G-1 *(v06)* | Minor | `resort-stay.html` opened with no ID showed "Unknown stay :" with a blank ID (Story-166) | Fixed (D-362) |
| G-1 *(v05)* | Minor | An unknown or non-bookable facility code (`facilities.html?facility=XYZ`, or POOL) left the availability grid empty (Story-137) | Fixed (D-339) |
| G-1 *(v04)* | Minor | An unknown event ID on the setup page (`event-edit.html?id=EV-99`) opened a blank New event form (Story-133) | Fixed (D-316) |
| G-2 *(v04)* | Minor | Non-member account holders were named "Guest …" in the seed, so they read as guests (Story-124) | Fixed (D-316) |
| G-1 *(v03)* | Minor | An unknown booking ID (`golf-booking.html?id=GB-9999`) opens the New golf booking form instead of saying it is not found (Story-121) | Fixed (D-296) |
| G-1 *(v02)* | Minor | A membership created from an application had no recruitment source, so MMS-RR-006 left it out (Story-101) | Fixed (D-276) |
| G-1 | Minor | No way to make a referral campaign inactive in the UI (Story-025) | Fixed (D-252) |
| G-2 | Minor | Manager's note on a request waiting for payment (Story-030) | Fixed (D-253) |

## Known limits (`shortcut:` comments in `mockups/`)
| File | Limit | When to upgrade |
|---|---|---|
| `js/app.js` | An absent period turns the status to Absent on approval, even when it starts in the future | Switch the status on the period's start date (scheduled job) |
| `js/app.js` | The digital card's QR code is a pattern for show, not a scannable code | Use a QR encoder and a signed credential |
| `js/store.js` | If browser storage is blocked (private window), changes last for one page only | A server-side store |
| (design) *(v07)* | Yonyou transport and responses, the bank files, the card and PayNow provider (**Pay (simulated)**) and the external POS file are simulated | The real interfaces (D-382) |
| (design) *(v07)* | Posting runs, the GIRO collection, recognition and amortisation run from buttons on the fixed demo clock | A scheduler and the system clock (D-382) |
| (design) *(v07)* | Values from rules marked *Interim design* or TBC are demo values; late-payment interest is off | NSRCC Finance's validated rules (D-371, D-382) |
| (design) *(v07)* | The 10 guide steps shared by two roles open on the first role's page | Unchanged from earlier versions (D-382) |
| `js/app.js` *(v02)* | Excel export is an HTML table saved as .xls; Excel opens it with a format notice | An XLSX writer on the server (D-273) |
| `js/app.js` *(v02)* | A report definition runs its latest saved version, whatever its effective date | Switch versions on their effective date (D-273) |
| `js/app.js` *(v06)* | Two fixed Front desk times on the demo date stand in for a clock and a scheduler (holds, no-shows, Night Audit) | A server clock (D-361) |
| `js/app.js` *(v06)* | Door PINs and the carpark whitelist are simulated feed entries, not Salto or Alphawave | The real interfaces (D-361) |
| (design) *(v06)* | Resort rules and values are demo values from a draft pack (*Draft – for validation*); the Accommodation Pass is not built | NSRCC's validated rules; the Accommodation Pass decision (D-348, D-361) |
| (design) *(v06)* | Observation kept, not changed: the Portal Facilities section shows "That time has passed (BR-089)" when it opens, because its first start time is before the demo clock | Facilities, a later version (D-361) |
| (design) *(v05)* | The Bowling export is a built-in sample (or a local CSV in its layout) | The Bowling Management System interface (D-338) |
| (design) *(v05)* | Waiting-list offers (2 hours) run on the fixed demo clock with Let offer expire; SAFRA card numbers are not verified; facility rates, windows, hours and capacities are demo values in `config.facilities` | A scheduler; SAFRA verification; NSRCC's confirmed values (D-338) |
| (design) *(v04)* | The function-room feed is a simulated queue in the integration feed | The Function Room Booking System interface (D-314) |
| (design) *(v04)* | Holds (15 minutes) and offers (24 hours) run on the fixed demo clock with Let hold expire / Let offer expire | The system clock and a scheduler (D-314) |
| (design) *(v03)* | Golf timers run on a fixed demo clock (Wed 28 Oct 2026 11:55) with Let offer expire | The system clock and a scheduler (D-294) |
| (design) *(v03)* | The handicap extract is a built-in sample; golf rates and windows are demo values in `config.golf` | The SGA CHS feed; NSRCC's confirmed rates (D-294) |
| (design) *(v02)* | User-defined reports and the management dashboard stand in for the BI tool NSRCC has not chosen (MMS-CFG-133) | The chosen BI tool (D-028) |

## Design system (v08)
`design/design-system-v4.md`: tokens in three tiers with light and dark values and their contrast, the status map, components and interaction states; `mockups/styleguide.html` shows them. To change the brand, edit section 1 of `css/styles.css` only.

## Self-check
Open `mockups/checks.html` in the browser (it is not linked from the app). It runs `js/checks.js` against a copy of the seed and never changes the stored data. Agent's run: **351 checks, 351 passed, 0 failed** (one pass and one fail case per rule function, one allowed and one blocked role or state per transition, including the v03 golf rules BR-036 – 060 and the 25 golf transitions, the v04 events rules BR-061 – 083 and the event transitions, the v05 facilities rules BR-086 – 106 and the 29 facility transitions, the v06 resort rules BR-107 – 132 and the 26 resort transitions, the v07 Finance rules BR-133 – 170 with the maker-checker and the Finance transitions, a seed with no Finance stub reference left, and the import file checks).

## Brief
`handover/brief.json` is the signed-off ASPL prototype brief, copied unchanged from `design/brief.json`: checker status **ready**, approved at **SO-047** (`signoff-v11.md`), PRD v9, decision type `validate` (*should the whole club system adopt the NEARCC Brand Guideline look … with no change in behaviour?*), scenarios S1 – S8 (unchanged from v07), design tokens from design system v4. The v01 – v07 briefs stay in their versions' `handover/brief.json`.

## Path to production
1. **Front end:** the UI is Bootstrap 5.3.3 with the house layer and tokens in `styles.css`; the components and tokens carry over to a production front end (the colours and type are the NSRCC Brand Guideline's).
2. **Backend and API:** derive the API contract and the database from `artifacts/data-model/schema.json` and `data-dictionary.md`; move each `rules.js` function to the server (keep the BR IDs); keep the assertions of `checks.js` as unit tests.
3. **Workflow:** turn the transition table of `workflow.js` into a workflow engine with the same guards (maker-checker BR-005, read-only after submit BR-175, fee payment confirmed by an Approver BR-006; the Finance maker-checker of `makerChecker`).
4. **Authentication and roles:** replace the role tabs with real sign-in and the same role-to-page map (BR-084).
5. **Finance (v07):** validate every rule marked *Interim design*, Proposed or TBC with NSRCC Finance first; move the FIN-OPS engine (`finOps`, validation, mapping and posting sets, receivables, allocation, refunds, recognition, reconciliation, periods, posting runs, dunning, General AR) to a server ledger service with the same BR IDs and maker-checker; keep every module raising one financial event per money step through an API, never posting itself; the Yonyou, bank, payment-provider and POS interfaces; a scheduler for the posting runs, GIRO and recognition; switch on interest only when Finance decides.
6. **Reporting (v02):** run the reports on the server over the module databases (keep `BUILD`'s columns and the BR-031 – 035 rules); real Excel and PDF output; the chosen BI tool for definitions and dashboards; each later module adds its reports to the catalogue (the golf reports in v03).
7. **Golf (v03):** move the golf rules and transitions to the server with the same guards; read member status and privileges from the Membership service (never copy them); replace the demo clock with the system clock and a scheduler for offer holds; the SGA CHS feed for handicaps; golf charges through FIN-OPS.
8. **Events (v04):** move the event rules and transitions to the server with the same guards (Events Team publishes, Manager authorises refunds, never the proposer); read member status and relationships from the Membership service; a scheduler for holds and offers; real QR credentials; the Function Room Booking System interface; venues from the Facilities module (v05); payments and refunds through FIN-OPS.
9. **Facilities (v05):** move the facility rules and transitions to the server with the same guards (the Operations Manager approves exceptional refunds and Draft configuration, never the requester); read member status, privileges and dependants from the Membership service; a scheduler for waiting-list offers and no-shows; SAFRA verification; the Bowling Management System export; visitor passes from Resorts (v06); payments and refunds through FIN-OPS.
10. **Resorts (v06):** validate every draft rule with NSRCC first (the pack is *Draft, For Validation*; 7 processes cannot be finalised); move the resort rules and transitions to the server with the same guards (the Operations Manager approves refunds, corrections, late arrivals, reversals and Draft configuration, never the requester); read member status, type and privileges from the Membership service; a server clock and scheduler for holds, no-shows and Night Audit; the Salto and Alphawave interfaces; the payment gateway; money through FIN-OPS.
11. **Open risks:** policy values (eligibility, documents, approval matrix) are confirmed for the prototype but still open at NSRCC (OD-001 – OD-003); the 30-year cap and fee amounts are configuration and must be checked with the club before go-live.

## Decision summary
Key entries in `documentation/decisions/decision-log.md` (full-prototype section): D-215 kickoff and import; D-221 Finance stub; D-224 business rules; D-226, D-229 requirement selection; D-230 PRD v1; D-231 – D-233 data model, persistence, seed; D-234 screens; D-243 – D-248 design phase redone (direction pass 3, Layout-06 exception); D-249 PRD v2 (Story-040 removed); D-250 tables; D-251 Phase 4 approved; D-252, D-253 gap fixes; sign-offs SO-030 – SO-033. **v02 (KO-030):** D-257 kickoff (refine of v01); D-259 keep list; D-260 decision to inform; D-262 – D-264 Phase 1 (RC-103 export designation); D-266 – D-268 workflow and PRD v3; D-269 – D-271 data, screens, design; SO-035 pre-build; D-272 – D-275 Phase 4; D-276 gap G-1. **v03 (KO-031):** D-281 kickoff (refine of v02); D-282, D-283 keep list and decision to inform; D-284 – D-286 Phase 1 (RC-104 – 108: Module details, responsive golf pages, Finance stub, Golf Operations and golf report access, demo clock); D-287, D-288 workflow and PRD v4; D-289 – D-291 data, screens, design; SO-037 pre-build; D-292 – D-295 Phase 4; D-296 gap G-1. **v04 (KO-032):** D-301 kickoff (refine of v03); D-302, D-303 keep list and decision to inform; D-304 – D-306 Phase 1 (RC-109 – 112); D-307, D-308 workflow and PRD v5; D-309 – D-311 data, screens, design; SO-039 pre-build; D-312 – D-315 Phase 4 (12 p4-02 fixes, Known limits); D-316, D-317 gaps G-1, G-2 and review; D-318 – D-321 Phase 5, Final approval SO-040. **v05 (KO-033):** D-322 kickoff (refine of v04); D-323, D-324 keep list and decision to inform; D-325 – D-327 Phase 1 (RC-113 – 118); D-328 – D-330 workflow, correction, PRD v6; D-331 – D-334 data, screens, design and the mockup review (RC-119); SO-041 pre-build; D-335 – D-338 Phase 4 (10 p4-02 fixes, as-built differences, Known limits); D-339, D-340 gap G-1 and review; D-341 – D-344 Phase 5, Final approval SO-042. **v06 (KO-034):** D-345 kickoff (refine of v05); D-346, D-347 keep list and decision to inform; D-348 – D-351 Phase 1 (RC-120 – 145, the launcher Design decision D-351); D-352 – D-354 workflow, PRD v7, Phase 2; D-355 – D-357 data, screens, design and the mockup review; SO-043 pre-build; D-358 – D-361 Phase 4 (7 p4-02 fixes, as-built differences, Known limits); D-362, D-363 gap G-1 and review. D-364 – D-367 Phase 5, Final approval SO-044. **v07 (KO-035, final version):** D-368 kickoff (refine of v06); D-369, D-370 keep list and decision to inform; D-371 – D-373 Phase 1 (RC-146 – 187: Interim Design and TBC items raised as clarifications, conflicts with existing rules flagged and settled, BR-178 retired); D-374 – D-376 Finance workflows, PRD v8, Phase 2; D-377 – D-379 data, screens, design and the mockup review; SO-045 pre-build; D-380 – D-383 Phase 4 (full regression, 8 p4-02 fixes, as-built differences, Known limits); D-384 gaps G-1 and G-2; D-385 – D-388 Phase 5 (gap G-3, test scenarios, handover, brief, testing server). **v08 (KO-037):** D-390 kickoff with the NEARCC canvas; D-391, D-392 keep list and decision; D-393 design restart, no StarHub branding; D-394, D-395 Phase 1 (RC-208 – 234, no scope change); D-396 – D-398 Phase 2 (PRD v9); D-399 – D-403 data unchanged, templates, League Gothic, design system v4 and the mockup review, brief; SO-047 pre-build (D-404); D-405 tee sheet alignment and no sideways scrolling; D-406 – D-408 Phase 4; D-409 review; D-410 onward Phase 5.

## Test scenarios
[test-scenarios.md](test-scenarios.md): 72 scenarios across all seven modules (62 kept from v01 – v06, the money steps of 18 changed for FIN-OPS, 10 new for Finance: happy paths, rule boundaries, negative paths, role permissions, maker-checker). Agent's run: **72 / 72 pass** (v08: unchanged scenarios, covered by the full regression and the click-through of changed controls; last run end to end in v01 – v07) (see the notes on which were re-run by hand).
