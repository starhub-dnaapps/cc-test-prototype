> Build: full-build · Version: v08 · KO: KO-037 · from v07

> Imported from rapid-build-v09 at KO-029

# Glossary

## ✚ Changes in v08 (KO-037) *(confirmed: D-394, D-395)*
- None: a look-only refine (KO-037 prompt). Nothing new, changed or dropped (keep list D-391). **Dropped in v08:** none.

## ✚ Changes in v07 (KO-035) *(confirmed: D-373)*
The finance terms (financial event, intake register, accounting mapping, posting set, leg, Output GST, receivable, member account, Statement of Account, Payment and PaymentNo, allocation, unapplied credit, standing order, GIRO, bank result, Pending Clearance, spending credit, refund approval matrix, deferred revenue, recognition, entrance-fee amortisation, reconciliation, clearing account, cashier session, batch close, adjustment, reversal, financial period, Yonyou batch, ERP document number, financial exception, dunning stage, General Debtor, General AR invoice, Credit Note, Debit Note) are **built in v07**, code names unchanged. *Finance stub* is retired (RC-185). *Interim Design* is added: a FIN-OPS requirement pending Finance validation, shown on the page that uses it (RC-146).

## ✚ Changes in v06 (KO-034) *(confirmed: D-350)*
The resort terms (resort, room or accommodation unit, room type, add-on, reservation, group reservation, tentative hold, Lost Opportunity Charge, resort waitlist, folio, credit note, adjustment, check-in, check-out, room status, housekeeping, maintenance block, access credential (Salto PIN), vehicle whitelist, Night Audit, business day, Front desk time) are **built in v06**, code names unchanged. *Bungalow guest* is renamed **Resort guest** (RC-121). *Accommodation Pass* stays a term only (not built, RC-137).

## ✚ Changes in v05 (KO-033) *(confirmed: D-327)*
The Facilities terms (*v06 · HMS Facilities terms* and *v06 · Facility statuses*: facility, resource, facility booking, block, admission, day pass, bowling counter transaction, reconciliation, exception, facility waiting list, Personal Training, Facilities Staff …) are **built in v05**; every term and code name is kept unchanged. A **customer** is an existing person, member or non-member account holder, never a copied record. An Events **venue** is now a Facilities record (RC-116). *Bungalow guest* stays; *Resort guest* (v07 wording) is `Deferred to v06` (RC-114). No new term, no rename.

## ✚ Changes in v04 (KO-032) *(confirmed: D-306)*
The Events terms (event, session, registration, participant, hold, waitlist offer, credential, attendance, personnel, function room, account holder) are **built in v04**; every term and code name is kept unchanged. A **participant** is an existing person (`persons`) or a non-member account holder's person, never a copied member record. **Venue** names a place only (Facilities is v05). No new term, no rename.

## ✚ Changes in v03 (KO-031) *(confirmed: D-286)*
The Golf terms (Golf Operations … Golfer Profile, and the v03 golf booking statuses) are **built in v03**; every term and code name is kept unchanged. **Golfer** in this build is always an existing person (`persons`), never a copied record; a **Guest Golfer** is the only golfer without a membership. No new term, no rename.

## ✚ Changes in v02 (KO-030) *(confirmed: D-264)*
Every term and code name is kept (the copied schema, seed and pages use them). The Club Reporting terms (Report Catalogue … Disposition) are **built in v02**; Golf Operations and the golf data scope stay v03.

| Term | Definition | Avoid | Code name | UI label |
|---|---|---|---|---|
| Planned report **(v02)** | A catalogue entry whose owning module is not built yet: listed with what it answers, marked "Coming in v0N", with no Run | disabled report | `plannedIn` | Coming in v0N |
| Designated for export **(v02)** | A report that may be exported to Excel or PDF (BR-034) | downloadable | `exportable` | Export |

## ✚ Full build v01 (KO-029): new terms
The imported terms below are kept, with their code names. The data model (`p3-01`) uses these code names. The new terms were confirmed in D-225.

| Term | Definition | Avoid | Code name | UI label |
|---|---|---|---|---|
| CC-Demo | The product name shown in the header, the page titles and the launcher (D-181) | NSRCC (in the UI) | — | CC-Demo |
| Module | One of the seven parts of CC-Demo, with the version that builds it | Area, app | `modules` (`code`, `name`, `builtIn`, `status`: `live` / `planned`) | Module |
| Planned module | A module shown on the launcher but not built in this version | Disabled, beta | `status: "planned"` | Coming in v0N |
| Finance stub | The v01 stand-in for FIN-OPS: an Approver records a fee as paid or failed (BR-178) | Finance desk | `handoffs[].via: "stub"` | Record payment (Finance stub) |
| Deferred story | A PRD story that a later version builds; none left after v07 | Backlog, gap | `deferredTo` (PRD tag) | Deferred to v0N |
| Role tab | A browser tab opened from the launcher, fixed to one role or one member account (D-097) | Session, login | `window.name` | Open tab |

---

Terms are taken from the PRDs' own wording. Code names are used in `seed.json`, `store.js` and the page labels. Terms the agent chose itself are marked ⚑ (D-014).

## Terms

| Term | Definition | Avoid | Code name | UI label |
|---|---|---|---|---|
| Person | The identity root of an individual, independent of any membership | Customer, user | `Person` / `persons` | Person |
| Member | A Person who holds a Membership | Client | — | Member |
| Membership | The club relationship and lifecycle of a Person, with one current status | Account | `Membership` / `memberships` | Membership |
| Membership ID | The unique alphanumeric ID assigned at activation (2 initials + 5 digits) | Member no. | `membershipId` | Membership ID |
| Membership Type | The product: Ordinary Full, Ordinary Basic, Associate Full, Associate Basic, Family, Junior, Supplementary, Corporate Term (Group C), Corporate Flexi (Group D), Corporate Flexi Kranji (Group E), Honorary, Committee | Plan, tier | `MembershipType` / `membershipTypes`, `typeCode` | Membership Type |
| Membership Status | The single current lifecycle state of a Membership | State | `status` | Status |
| Membership Request | A controlled request that changes a Membership (or creates one), with header, requested change and current review | Ticket, case | `Request` / `requests` | Request |
| Request Type | Application, Renewal, Conversion, Transfer, Extension, Withdrawal, Rejoin, Deceased, Absent, Medical, Suspension, Reinstatement, Status Change, Supplementary, Nominee Change, Classification, Corporate Creation | — | `requestType` | Request Type |
| Application | A request for a new membership | Sign-up | `requestType: "application"` | New Application |
| Recruitment Source | How the applicant came to NSRCC (Referral, Website, Roadshow, Corporate Partner, Walk-in) | Lead source | `recruitmentSource` | Recruitment Source |
| Referral | The referrer recorded on a referral-based application | — | `referrerMembershipId` | Referred by |
| Supporting Document | A document a request type requires (document matrix) | Attachment | `documents` | Supporting Documents |
| Approver | The Membership Team role that records the decision (checker) | Supervisor | `approver` | Approver |
| Workflow History | The append-only list of material actions: action, actor, timestamp, outcome | Log | `history` | Workflow History |
| Membership Contract | The contract header with entrance fee, subscription and credit terms | Agreement | `contract` | Membership Contract |
| Entrance Fee | One-off contractual fee at joining (GST inclusive) | Joining fee | `entranceFee` | Entrance Fee |
| Monthly Subscription | Recurring subscription fee (plus GST) | Dues | `monthlySubscription` | Monthly Subscription |
| In-House Credit Limit | The contractual credit-limit amount (SGD) | Credit line | `creditLimit` | In-House Credit Limit |
| Spending Credit Granted | The original contractual spending-credit award; never reduced | Wallet, balance | `spendingCreditGranted` | Spending Credit Granted |
| Finance Outstanding Balance | The member's current outstanding balance, owned by Finance | MMS balance | `financeOutstanding` | Outstanding (Finance) |
| Available Credit | Derived: In-House Credit Limit − Finance Outstanding Balance; never stored | — | (derived) | Available Credit |
| Finance Handoff | Operational evidence MMS sends to Finance for a fee or a credit award | Invoice | `Handoff` / `handoffs` | Finance Handoff |
| Payment Confirmation | Finance's answer to a handoff: Confirmed or Failed | Receipt | `paymentStatus` | Payment |
| Principal Member | The responsible member of a supplementary, junior or family relationship | Main member | `responsibleMembershipId` | Principal |
| Supplementary Membership | A membership linked to an active Principal | Add-on | `typeCode: "SUP"` | Supplementary |
| Junior Membership | A membership for a child aged 5 to 20; ends at 21 | Child | `typeCode: "JUN"` | Junior |
| Corporate Sponsor | The Singapore-registered company holding a corporate membership | Company account | `sponsorName` | Corporate Sponsor |
| Nominee | A person nominated by a Corporate Sponsor to use a corporate membership | Delegate | `nominees` | Nominee |
| Classification | Committee or Honorary designation with a duration and entitlements | Title | `classification` | Classification |
| Absent Period | An approved period overseas (work / study) during which the term is suspended | Leave | `absentPeriods` | Absent Period |
| Medical Period | An approved medical period that does not change the expiry date | Sick leave | `medicalPeriods` | Medical Period |
| Vehicle | A member-registered vehicle with car-label history | Car | `Vehicle` / `vehicles` | Vehicle |
| Car Label | The issued label of a registered vehicle | Sticker | `carLabel` | Car Label |
| Membership Card | The digital (primary) or physical credential with a QR code | Pass | `Card` / `cards` | Membership Card |
| Marketing Consent | Whether the person accepts marketing communications | Opt-in | `marketingConsent` | Marketing Consent |
| Communication | A templated message to a recipient set; marketing or service | Blast | `Communication` / `communications` | Communication |
| Template | An approved communication template | — | `templates` | Template |
| Referral Campaign | An active, approved referral-reward policy | Promo | `campaigns` | Referral Campaign |
| Configuration | Effective-dated master data and policy values | Settings | `config` | Configuration |
| Integration Event | A message to Access Control, HMS, GMS or the notification service (simulated) | — | `integrationEvents` | Integration Feed |
| Report Catalogue | The list of the 23 approved reports (MMS-RR-001 … 010, GMS-RR-001 … 013), found by what each one answers | report list, menu | `reports` | Report Catalogue |
| Owning Module | The module whose data a report reads: MMS or GMS (Finance values stay Finance's) | source system | `module` | Owning module |
| Report Parameter | A criterion a report is run with (period, status, course …), required or optional | filter, prompt | `params` | Parameters |
| Report Run | One execution of a report with its parameter values, by whom, when, and its row count | job, query | `reportRuns` | Run history |
| No-data Result | A valid run that matches no records; shown as an empty state, never an error | error, blank report | — | No records match |
| Access Rule | Which reports a role may run, and its data scope ⚑ | permission | `accessRules` | Report access |
| Data Scope | The part of the data a role may see in reports (all, membership only, golf only) ⚑ | visibility | `scope` | Data scope |
| Report Definition | A user-defined report built on an approved report: fields, filters, layout, version, effective date ⚑ | custom report, template | `definitions` | Report definition |
| Dashboard | A set of KPI tiles and charts for a management view ⚑ | home page | `dashboards` | Dashboard |
| Export | The same report as an Excel or PDF file ⚑ | download, print | — | Export to Excel / PDF |
| Legacy Report | One of the 147 report names of the old MMS and GMS, with its disposition and successor | old report | `legacyReports` | Legacy report |
| Disposition | What happened to a legacy report: approved requirement, Finance-owned, out of scope, source-module output | status, mapping | `disposition` | Disposition |
| Golf Operations | The role running the golf reports day to day ⚑ | pro shop, starter | `golfops` | Golf Operations |
| Tee Time | A bookable start slot on a course, date and session | slot | `teeTimes` | Tee time |
| Flight | The group of golfers playing one tee time | group, four-ball | `flight` | Flight |
| Golf Booking | A reservation of a tee time by a main booker for a party | reservation | `golfBookings` | Booking |
| Waitlist Entry | A request queued for a full tee time, with offer and outcome | queue | `waitlist` | Waitlist |
| Rain Check | An entitlement issued after play is stopped, redeemed by a later booking | voucher | `rainChecks` | Rain check |
| Course Block | Capacity taken off the tee sheet for an event or maintenance, with reason and source | closure | `courseBlocks` | Course block |
| Guest Golfer | A non-member introduced by a member, with Guest Eligibility Proof and a rate | visitor | `guests` | Guest |
| Golf Charge | Operational charge evidence from golf play (green fee, buggy …), not Finance accounting | revenue, invoice | `golfCharges` | Golf charge |
| Golf Exception | A handicap import error or eligibility / override exception with its approval | error | `golfExceptions` | Exception |
| Course | A golf location: Changi or Kranji, each with its own tee sheet and rates | location | `courses` | Course |
| Tee Sheet | The published tee times of one course and day; the daily control of play | time-sheet, schedule | `teeTimes` | Tee sheet |
| Day Type | Weekday, or weekend / public holiday | — | `dayType` | Day type |
| Main Booker | The member who books the flight and is accountable for its cancellation charges | organiser | `mainBooker` | Main booker |
| Booking Channel | Portal (member internet booking), Counter or Phone (staff-assisted) | source | `channel` | Booking channel |
| Declared Holes | 9 or 18 holes, declared before play; play is limited to it | round type | `holes` | Holes |
| Handicap Index (HI) | The golfer's recognised handicap, imported from SGA CHS; computed outside GMS | handicap | `hi` | HI |
| Proficiency Certificate (PC) | An NSRCC-issued certificate allowing restricted play without a handicap | licence | `pc` | NSRCC PC |
| Waitlist Offer | A released tee time held for 15 minutes for the earliest fitting waitlist entry | invitation | `offer` | Offer |
| Late Cancellation | A cancellation with less than 72 hours' notice, which carries a charge | — | `lateCancellation` | Late cancellation |
| Waiver | An approved removal or reduction of a golf charge, with approver and reason | exemption | `waiver` | Waiver |
| Check-in | Registration at the golf counter at least 15 minutes before tee-off, after eligibility, insurance and charges pass | sign-in | `checkIn` | Check-in |
| Day Insurance | MSIG golfer day insurance for golfers without existing or annual cover | — | `dayInsurance` | Day insurance |
| Responsible Payer | Who pays a golfer's charges: the member, the introducing member, the corporate account or the golfer | payer | `payer` | Responsible payer |
| Course Status | Open, Suspended or Closed, set only by an authorised official | — | `courseStatus` | Course status |
| Golf Handoff | A golf charge or refund passed to Finance, with its Finance status (`finance`: pending, accepted, rejected) | invoice | `golfCharges` | Finance handoff |
| Shift Close | The end-of-shift or end-of-day operational summary with its exception register | EOD | `shiftCloses` | Shift close |
| Golfer Profile | A golfer's gender, handicap index, NSRCC PC and insurance on file | — | `golfers` | Golfer profile |
| Event | A club event or programme published by the Events Team, with its own structure, eligibility, pricing, capacity and waitlist settings (v04) | activity | `events` | Event |
| Session | One dated, timed occurrence of an event; an event has one or more (v04) | class, slot | `sessions` | Session |
| Registration Scope | Whether a multi-session event is booked as the whole programme, one session or selected sessions (v04) | — | `scope` | Registration by session |
| Registration Window | The opening and closing date and time for new registrations (v04) | booking period | `window` | Registration window |
| Event Registration | One booking of one or more participants for an event, with its account holder, payer, channel and status (v04) | booking, sign-up | `eventRegistrations` | Registration |
| Participant | A person attending an event under a registration; may differ from the payer (v04) | attendee | `participants` | Participant |
| Account Holder | The NSRCC online-account holder (member or non-member) who registers participants online (v04) | user | `accountHolders` (non-members) | Account holder |
| Rate Category | The pricing category that sets a participant's rate (member adult, member child, non-member adult, non-member child) (v04) | price type | `category` | Rate category |
| Capacity Hold | Places reserved during settlement; not a confirmed booking; online 15 minutes, counter while the transaction is open (v04) | reservation | `hold` | Hold |
| Event Waitlist | The FIFO queue of eligible groups waiting for places; whole groups only (v04) | queue | `eventWaitlist` | Event waitlist |
| Waitlist Offer (event) | Places reserved for a promoted waitlist group for the offer window (default 24 hours) (v04) | — | `offer` | Offer |
| Participant QR | A participant-specific credential used to record attendance (v04) | ticket | `qr` | QR credential |
| Attendance | A participant's check-in for one session, by QR or manual fallback (v04) | sign-in | `eventAttendance` (personnel: `personnelAttendance`) | Attendance |
| Manual Check-in | Attendance recorded by Events staff against a confirmed registration when the QR cannot be used, with staff and reason (v04) | override | `manual` | Manual check-in |
| Event Personnel | Instructors, trainers or other staff assigned to an event or session; their attendance is separate (v04) | staff | `personnel` | Event personnel |
| Minimum Participation | The confirmed count an event needs to be viable; missing it calls for an Events Team decision (v04) | quorum | `minParticipants` | Minimum participants |
| Club-initiated Cancellation | NSRCC cancels an event or session; refunds need Events Manager authorisation (v04) | — | `clubCancel` | Club cancellation |
| Club-initiated Rescheduling | NSRCC changes an event or session schedule; participants keep or decline their place (v04) | postponement | `reschedule` | Rescheduling |
| Forfeiture | The amount kept when a participant cancels a paid registration (v04) | penalty | `forfeit` | Forfeited |
| Refund Instruction | An Events Manager-authorised full or partial refund or reversal passed to Finance (v04) | credit note | `eventRefunds` | Refund instruction |
| Function Room Booking | A room booking owned by the external Function Room Booking System and mirrored in HMS Events by reference (v04) | room reservation | `roomBookings` | Function room booking |
| Event Settlement | The settlement of a paid registration handed to Finance, with its Finance status (v04) | payment | `eventSettlements` | Settlement |
| Room Feed | Messages from the Function Room Booking System waiting to be applied (simulated, D-069) (v04) | — | `roomFeed` | Feed |
| Launcher | The demo's start page (`index.html`): opens each role and member account in its own tab, summarises the modules and opens the module guides (v05) | home page | `launcher` | Launcher |
| Role tab | A browser tab bound to one role (and, for a Member, one account) from the launcher, for as long as the tab is open (v05) | session | `role` (sessionStorage) | Role |
| Module | One of the four demo modules: Membership (MMS), Club Reporting, Golf (GMS), HMS Events (v05) | — | `module` | Module |
| Module guide | The HTML presenter guide of one module, generated from the demo script (v05) | manual | `guides/<module>.html` | Module guide |
| Events Team | Staff who configure, publish, maintain and run events (v04) | organiser | `events` (role) | Events Team |
| Events Manager | The manager who authorises event refunds and reversals (v04) | — | `manager` (role) | Events Manager |

## Status values

| Entity | Status | Meaning | Terminal? |
|---|---|---|---|
| Membership | `active` (Active) | Privileges and billing on | No |
| Membership | `absent` (Absent) | Approved absent period; term suspended; privileges off | No |
| Membership | `medical` (Medical) | Approved medical period; expiry unchanged; privileges off | No |
| Membership | `suspended` (Suspended) | Authorised suspension; privileges off, billing on | No |
| Membership | `expired` (Expired) | Expiry passed without renewal; may rejoin | No |
| Membership | `withdrawn` (Withdrawn) | Voluntary withdrawal completed; may rejoin | No |
| Membership | `deceased` (Deceased) | Member deceased; records kept | Yes |
| Membership | `ended` (Ended) | Supplementary or junior eligibility ended | Yes |
| Request | `pendingDocuments` (Pending Documents) | Mandatory documents missing | No |
| Request | `pendingApproval` (Pending Approval) | Complete; waiting for the authorised decision | No |
| Request | `awaitingPayment` (Awaiting Payment) | Approved; Finance confirmation pending or failed | No |
| Request | `completed` (Completed) | All gates passed; change applied | Yes |
| Request | `rejected` (Rejected) | Decision: rejected; nothing applied | Yes |
| Request | `cancelled` (Cancelled) | Closed by the officer before a decision | Yes |
| Handoff | `pending` / `confirmed` / `failed` | Finance has not answered / confirmed / failed | `confirmed` Yes |

**Membership status transitions** (⚑ D-008): Active → Absent, Medical, Suspended, Expired, Withdrawn, Deceased, Ended · Absent → Active, Deceased · Medical → Active, Deceased · Suspended → Active, Withdrawn, Deceased · Expired → Active (rejoin), Deceased · Withdrawn → Active (rejoin), Deceased.

### v03 · Golf booking statuses
| Status | Meaning | Code |
|---|---|---|
| Confirmed | Booked on the tee sheet | `confirmed` |
| Checked in | Released to play after check-in | `checkedIn` |
| Played | Round finished | `played` |
| Cancelled | Cancelled, capacity released to the waitlist | `cancelled` |
| No-show | Did not play and could not be rescheduled or joined | `noShow` |

Waitlist entry: `waiting` → `offered` → `accepted` / `declined` / `expired` (or `cancelled`). Rain check: `available` → `reserved` → `redeemed`, or `expired`.

### v04 · Event and registration statuses
| Entity | Status | Meaning | Code |
|---|---|---|---|
| Event | Draft | Being configured, not visible for registration | `draft` |
| Event | Published | Open to its registration channels | `published` |
| Event | Cancelled | Cancelled by the club (BR-078) | `cancelled` |
| Event | Completed | Last session ended (BR-083) | `completed` |
| Registration | On hold | Places held during settlement | `held` |
| Registration | Confirmed | Settled or free; QR issued | `confirmed` |
| Registration | Waitlisted | Waiting as a whole group | `waitlisted` |
| Registration | Offered | Promoted; places reserved for the offer window | `offered` |
| Registration | Cancelled | By the participant (forfeited) or the club (refund decision) | `cancelled` |
| Registration | Not completed | Settlement failed, abandoned, hold or offer expired | `lapsed` |

Function room booking: `tentative` → `confirmed` → `amended` / `cancelled` (as reported by the external system). Refund instruction: `proposed` → `authorised` / `declined` → Finance `pending` / `accepted`.

### v06 · HMS Facilities terms
| Term | Definition | Avoid | Code name | UI label |
|---|---|---|---|---|
| Facility | A club facility run by HMS Facilities, with an operating model: booking, admission or external operation (v06) | venue (Events) | `facilities` | Facility |
| Resource | One bookable unit of a facility (a court, table or room) (v06) | slot, court | `resources` | Resource |
| Facility booking | A reservation of one resource for a date and time period, with its frozen amount and reference (v06) | reservation | `facilityBookings` | Booking |
| Customer category | Member, SAFRA member, Non-member, Guest or Bungalow guest; sets eligibility and rate (v06) ⚑ RC-041 | customer type | `category` | Customer category |
| Day type | Weekday or Weekend; a public holiday counts as Weekend (v06) | peak | `dayType` | Day type |
| Booking window | How many days ahead a category may book a facility (v06) ⚑ RC-043 | advance period | `windowDays` | Booking window |
| Resource block | A period a resource cannot be booked, with a type and reason: Maintenance, Event, Lesson, Operational closure (v06) | closure | `resourceBlocks` | Block |
| Admission | Entry to the Swimming Pool or Fitness Centre, recorded as attendance, never a time slot (v06) | check-in | `admissions` | Admission |
| Occupancy | People admitted and not yet left, against the facility's capacity (v06) | headcount | `occupancy` | Occupancy |
| Day pass | A Fitness Centre pass valid for the whole operating day of issue, with re-entry (v06) | ticket | `dayPasses` | Day pass |
| Visitor pass | The pass of an in-house resort stay that gives complimentary Fitness Centre access (v06; from a real stay in v07) ⚑ RC-046, RC-062 | guest pass | `visitorPasses` | Visitor pass |
| Bowling counter transaction | The CMS record of a Bowling counter sale, with receipt number, amount and payment method (v06) | pen-and-paper log | `bowlingTxns` | Counter transaction |
| Receipt number | The Bowling counter receipt reference, the reconciliation match key (v06) | — | `receiptNo` | Receipt no. |
| Reconciliation run | One import of the external Bowling export file and its match result (v06) | — | `bowlingRuns` | Reconciliation run |
| Reconciliation exception | An unmatched, duplicate or mismatched bowling record awaiting a disposition (v06) | error | `bowlingExceptions` | Exception |
| Disposition | The recorded outcome of an exception: Reconciled or Accepted, with a reason (v06) | — | `disposition` | Disposition |
| Facility waiting list | FIFO requests for a full facility slot, offered one at a time for the response window (v06) | queue | `facilityWaitlist` | Waiting list |
| Personal Training session | A Fitness Centre PT session for one participant with a trainer (v06) ⚑ RC-049 | class | `ptSessions` | PT session |
| Fitness equipment | Reference record of one Fitness Centre equipment item (v06) | asset | `fitnessEquipment` | Equipment |
| Fitness instructor | Reference record of one Fitness Centre instructor or trainer (v06) | coach | `fitnessInstructors` | Instructor |
| Facilities Staff | Staff who book, admit, record no-shows and blocks, and run the Bowling counter and reconciliation (v06) ⚑ RC-040 | front desk | `facilities` (role) | Facilities Staff |
| Operations Manager | The manager who approves exceptional facility refunds (v06; the existing Manager) ⚑ RC-040 | supervisor | `manager` (role) | Operations Manager |

### v06 · Facility statuses
| Entity | Status | Meaning | Code |
|---|---|---|---|
| Facility booking | Pending payment | Created, payment not yet successful; slot not reserved | `pendingPayment` |
| Facility booking | Confirmed | Paid or free; reference issued | `confirmed` |
| Facility booking | Cancelled | By the customer or the club; refund decided (BR-095) | `cancelled` |
| Facility booking | No-show | Customer did not attend; no standard refund (BR-097) | `noShow` |
| Facility booking | Completed | Booked period has passed with attendance | `completed` |
| Bowling counter transaction | Paid | Settled at the counter; play may start | `paid` |
| Bowling counter transaction | Reconciled | Matched to the export; locked | `reconciled` |
| Reconciliation exception | Open / Escalated / Closed | Awaiting review / sent to Finance / disposition recorded | `open` / `escalated` / `closed` |
| PT session | Pending policy / Confirmed / Cancelled | Policy detail TBC / eligible and booked / cancelled | `pendingPolicy` / `confirmed` / `cancelled` |
| Configuration item | Draft / Approved | Not yet effective / effective for new transactions (BR-105) | `draft` / `approved` |

Facility waiting list: `waiting` → `offered` → `booked` / `declined` / `expired`, or `withdrawn`. Exceptional refund: `requested` → `approved` / `rejected` → Finance `pending` / `accepted`.

### v07 · HMS Resorts terms
| Term | Definition | Avoid | Code name | UI label |
|---|---|---|---|---|
| Resort | A resort location of the club holding accommodation units (v07) ⚑ RC-066 | property | `resorts` | Resort |
| Room type | A kind of accommodation unit (Chalet, Family Chalet, Villa, Pool Villa) with its capacity and rates (v07) ⚑ RC-066 | category | `roomTypes` | Room type |
| Room | One accommodation unit (chalet or villa) that can be reserved (v07) | bungalow, unit | `rooms` | Room |
| Add-on | An extra item sold with a stay (extra bed, BBQ pit) (v07) ⚑ RC-066 | extra | `addOns` | Add-on |
| Rate type | A pricing basis for a reservation (Member, Non-member, Corporate lease, Complimentary) (v07) | tariff | `rateType` | Rate type |
| Season | A date range with a rate uplift (v07) ⚑ RC-066 | peak | `seasons` | Season |
| Resort reservation | A booking of one room for a stay period by a booked guest, with a reservation number (v07) | booking (Facilities), registration (Events) | `resortReservations` | Reservation |
| Group reservation | Several resort reservations under one master reference (v07) | block booking | `groupRef` | Group reservation |
| Tentative hold | A reservation holding rooms for the hold period until paid (v07) ⚑ RC-068 | provisional | `tentative` (status) | Tentative hold |
| Lost Opportunity Charge | 20 % of the original reservation value for an amendment more than 21 days before arrival (v07) | amendment fee | `locCharge` | Lost Opportunity Charge |
| Resort waitlist | Requests for an unavailable room and stay period; never blocks inventory; staff choose (v07) | queue | `resortWaitlist` | Resort waitlist |
| Stay | The in-house period of a checked-in reservation (v07) | visit | `stay` | Stay |
| Guest folio | The running account of a stay: charges, discounts, payments, credits and balance (v07) | bill | `folioLines` | Folio |
| Credit note | A correction of a paid folio item, referencing the original (v07) | refund | `creditNote` (line type) | Credit note |
| Adjustment | A correction of an unpaid folio item, referencing the original (v07) | edit | `adjustment` (line type) | Adjustment |
| Room status | Available, Occupied, Pending Cleaning, Cleaning, Ready, Faulty or Maintenance Blocked (v07) ⚑ RC-065 | — | `roomStatus` | Room status |
| Maintenance block | A period a room is Faulty or Maintenance Blocked, with a reason, until completion (v07) | closure | `roomBlocks` | Maintenance block |
| Registered vehicle | A vehicle registered to a resort reservation for the Alphawave whitelist (v07; not an MMS member vehicle) ⚑ RC-063 | car label | `stayVehicles` | Vehicle |
| Vehicle identifier type | IU or OBU (v07) | — | `idType` | Identifier type |
| Access credential | A Salto PIN for the room, valid for the stay only (v07) | key | `credentials` | Access credential |
| Night Audit | The end-of-day check before the HMS business day is closed (v07) | day end | `nightAudits` | Night Audit |
| Business day | The HMS Resorts operating date that Night Audit closes (v07) | — | `businessDate` | Business day |
| FIN-OPS event | A resort financial event handed to FIN-OPS with its source reference and FIN-OPS status (v07) | posting | `finOpsEvents` | FIN-OPS event |
| Resort Front Desk | Staff who reserve, check in and out, collect payments and register vehicles (Reservation Officer, Front Desk, Cashier, Security) (v07) ⚑ RC-055 | reception | `resortDesk` (role) | Resort Front Desk |
| Housekeeping | Staff who update cleaning and readiness and record maintenance blocks (Housekeeping and Maintenance) (v07) ⚑ RC-055 | cleaner | `housekeeping` (role) | Housekeeping |
| Resort guest | The Facilities customer category of a guest in an in-house resort stay (v07; was Bungalow guest) ⚑ RC-062 | bungalow guest | `resortGuest` | Resort guest |

### v07 · Resort statuses
| Entity | Status | Meaning | Code |
|---|---|---|---|
| Resort reservation | Tentative | Rooms held for the hold period, not yet paid | `tentative` |
| Resort reservation | Confirmed | Deposit or full payment received (or zero-value) | `confirmed` |
| Resort reservation | Checked in | In-house stay; folio open | `checkedIn` |
| Resort reservation | Checked out | Folio settled, room released to housekeeping | `checkedOut` |
| Resort reservation | Cancelled / Expired / No-show | Cancelled with its charge / hold lapsed / not arrived by the cutoff | `cancelled` / `expired` / `noShow` |
| Room | Available / Occupied / Pending Cleaning / Cleaning / Ready / Faulty / Maintenance Blocked | Room status (BR-123, BR-125) ⚑ RC-065 | `available` / `occupied` / `pendingCleaning` / `cleaning` / `ready` / `faulty` / `blocked` |
| Resort waitlist | Waiting / Allocated / Closed / Withdrawn | Open / chosen by staff / converted / left | `waiting` / `allocated` / `closed` / `withdrawn` |
| Access credential | Active / Invalidated / Deactivated | Valid PIN / replaced by a regenerated one / ended at check-out or cancellation | `active` / `invalidated` / `deactivated` |
| Vehicle whitelist | Pending / Whitelisted / Revoked / Failed | Sent / accepted by Alphawave / ended / sync failed | `pending` / `whitelisted` / `revoked` / `failed` |
| Night Audit | Blocked / Passed / Closed | Blocking exceptions open / checks clear / business day closed | `blocked` / `passed` / `closed` |

### v08 · Finance terms

| Term | Definition | Avoid | Code name | UI label |
|---|---|---|---|---|
| Finance module | FIN-OPS; the Finance pages that replace the simulated Finance desk | Finance desk | `finance` | Finance |
| Financial event | A financially relevant event raised by a module or Finance, with a unique source identity | Handoff | `finEvents` | Financial event |
| Source identity | The originating module and its own reference (for example MMS `RQ-1001`) | Source ref | `sourceId` | Source |
| Accounting mapping | The approved, effective-dated rule giving the debit and credit legs of an event type | GL map | `mappings` | Accounting mapping |
| Posting set | The legs generated for one financial event; debits equal credits | Journal | `legs` | Posting set |
| Output GST | The GST leg, separate from revenue (9 % in the demo) | Tax | `gst` | Output GST |
| Member receivable | An amount a member owes, one per positive charge | Invoice line | `receivables` | Receivable |
| Payment | Real money received or returned, with its PaymentNo | Receipt | `payments` | Payment |
| PaymentNo | The official receipt number of a Payment | Receipt no. | `paymentNo` | Receipt no. |
| Allocation | The part of a Payment applied to a receivable | Knock-off | `allocations` | Allocation |
| Unapplied credit | Money received beyond what is owed, held as a liability | Overpayment | `unapplied` | Unapplied credit |
| Standing order | A member's GIRO instruction with its Maximum Debit Amount | GIRO mandate | `standingOrders` | Standing order |
| Collection | One standing-order debit sent to the bank | Debit | `collections` | Collection |
| Spending credit award | Contractual credit given to a member, valid 24 months | Wallet top-up | `spendingCredits` | Spending credit |
| Finance refund | A refund prepared and approved in FIN-OPS and settled to the original source | Refund payment | `finRefunds` | Refund |
| Deferred revenue | Money collected before it is earned | Advance | `deferred` | Deferred revenue |
| Recognition schedule | When deferred revenue becomes earned | Release plan | `recognition` | Recognition |
| Entrance fee amortisation | Monthly recognition of the entrance fee over the membership term | EF release | `amortisation` | Amortisation |
| Reconciliation | A matching of two sources of totals with its variance | Recon | `reconciliations` | Reconciliation |
| Clearing account | The Operations-to-Finance account that must return to zero | Suspense | `clearing` | Clearing account |
| Reconciling item | A timing difference recorded to clear later, not a variance | Timing | `reconcilingItems` | Reconciling item |
| Cashier session | One cashier's collections at one location on one business day | Shift | `cashierSessions` | Cashier session |
| Batch close | The system close of a cashier session: expected vs actual by tender | EOD close | `batchClose` | Batch close |
| Adjustment | A Finance-owned correction recorded as its own movement | Journal edit | `adjustments` | Adjustment |
| Reversal | A movement that cancels an earlier posting | Undo | `reversals` | Reversal |
| Accounting period | One month of the April – March financial year | Month | `periods` | Period |
| Posting batch | The lines staged in one posting run for Yonyou | GL upload | `postingBatches` | Posting batch |
| Posting run | One scheduled or ad-hoc staging of a posting batch (two scheduled per day) | Run | `runSchedule` | Posting run |
| Yonyou response | Yonyou's accept or reject result for a posting batch | ERP result | `yonyouResponses` | Yonyou response |
| Financial exception | A blocking condition with category, owner and history | Error | `finExceptions` | Exception |
| Dunning case | The collection follow-up of one overdue account | Chase | `dunningCases` | Dunning case |
| Dunning stage | Current / Reminder 1 / Reminder 2 / Final notice / Escalated | Level | `stage` | Stage |
| General Debtor | A corporate or non-member account billed by Finance | Customer | `debtors` | General Debtor |
| General AR invoice | A Finance-originated invoice to a General Debtor | Bill | `arInvoices` | Invoice |
| Credit note | A document reducing an issued invoice, linked to it | CN | `creditNotes` | Credit note |
| Debit note | A document adding an approved charge, linked to the invoice | DN | `debitNotes` | Debit note |
| Recurring arrangement | An approved schedule that generates General AR invoices | Contract billing | `recurring` | Recurring arrangement |
| Finance Officer | Prepares Finance work (maker) | Finance (simulated) | `finance` | Finance Officer |
| Finance Approver | Approves Finance work prepared by someone else (checker) | Controller | `finApprover` | Finance Approver |

### v08 · Finance statuses

| Entity | Status | Meaning | Code |
|---|---|---|---|
| Financial event | Received / Accepted / Posted / Staged / Finalised / Exception / Returned to source | Arrived / validated / legs generated / in a batch / accepted by Yonyou / blocked / sent back to the module | `received` / `accepted` / `posted` / `staged` / `finalised` / `exception` / `returned` |
| Payment | Confirmed / Pending Clearance / Returned | Money received / cheque not cleared / bounced | `confirmed` / `pendingClearance` / `returned` |
| Standing order | Active / Suspended / Cancelled | Collectable / paused / ended | `active` / `suspended` / `cancelled` |
| Collection | Submitted / Accepted / Rejected / Returned | Sent / paid / refused / reversed later | `submitted` / `accepted` / `rejected` / `returned` |
| Finance refund | Prepared / Approved / Released / Rejected | Maker done / checker done / paid / refused | `prepared` / `approved` / `released` / `rejected` |
| Configuration change | Draft / Approved / Rejected | Waiting for a checker / effective from its date / current kept | `draft` / `approved` / `rejected` |
| Accounting period | Open / Closed / Reopened | Postable / hard-closed / reopened by authority | `open` / `closed` / `reopened` |
| Posting batch | Staged / Exported / Transport failed / Accepted / Partly rejected / Finalised | Ready / file sent / send failed / all accepted / some rejected / reconciled | `staged` / `exported` / `failed` / `accepted` / `partial` / `finalised` |
| Financial exception | Open / Assigned / Resolved / Closed | New / owner set / fixed, waiting reprocess / reprocessed or reconciling item | `open` / `assigned` / `resolved` / `closed` |
| Dunning case | Current / Reminder 1 / Reminder 2 / Final notice / Escalated / On hold / Closed | By overdue age; held with a reason; cleared | `current` / `r1` / `r2` / `final` / `escalated` / `hold` / `closed` |
| General AR invoice | Draft / Pending approval / Issued / Part paid / Paid / Credited | Prepared / waiting for checker / sent / some paid / settled / reduced by a credit note | `draft` / `pending` / `issued` / `partPaid` / `paid` / `credited` |
