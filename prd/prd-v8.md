> Build: full-build · Version: v08 · KO: KO-037 · from v07

> **In v08:** superseded by `prd-v9.md` (KO-037). Kept as the v07 contract.

# PRD: CC-Demo club management system — v8

**Date:** 2026-11-12 · **Status:** v8, Approved (D-375) · supersedes `prd-v7.md` (v06) · **Build:** full-build-v07 (from v06) · **KO:** KO-035 · lineage imported from rapid-build-v09

## 1. Overview
CC-Demo replaces a legacy club system with seven configuration-driven modules: Membership, Club Reporting, Golf, Events, Facilities, Resorts and Finance. This PRD covers all seven modules (Phases 1 – 2 of KO-029). **v01 built Membership and the launcher**; each other module was built in its own version, and **v07 completes the system**: no story is deferred. Problem statement, business context and constraints: `discovery-summary.md` (full-build sections and the imported module summaries).

**v07 (KO-035), the final version:** this version builds **Finance (FIN-OPS)** (§5.1g) as the one place every module's money is accounted for, and replaces every Finance stub hand-off in Membership, Golf, Events, Facilities and Resorts with real financial events: receivables, payments with a PaymentNo, deferred revenue and recognition, GL postings with Output GST and Yonyou staging (D-371 – D-373). Earlier modules change only where they connect to Finance; 7 conflicts with existing rules were flagged and settled (RC-147 – RC-153). The FIN-OPS pack is partly **Interim Design** (141 of 261 requirements) or **TBC** (6): each such rule is marked and was raised as its own clarification (RC-154 – RC-179); the values are demo values, never NSRCC policy. Two roles join: Finance Officer R. Tan and Finance Approver C. Lau. The 10 Finance reports switch on in the Report Catalogue (RC-183). No module is "Coming in v0N" any more (RC-184).

**Decision to inform (v07, D-370):** *Should we build Finance (FIN-OPS: event intake, postings with GST, receivables, payments and allocation, standing orders and bank results, spending credit, refunds, deferred revenue and entrance-fee amortisation, reconciliation and cashier close, adjustments, periods, Yonyou staging, exceptions, dunning, General AR and reports) as the one place every module's money is accounted for, completing the club system across all seven modules?* Type: `validate`.

**v06 (KO-034):** this version builds **Resorts** (§5.1f) on the Membership base, with Club Reporting, Golf, Events and Facilities kept unchanged except where they connect to Resorts (D-346). The Resorts source pack is **draft**: every resort rule is shown as *Draft – for validation*, and each TBC value is a demo value confirmed at D-349 (RC-120 – RC-144), never NSRCC policy. Guests are the existing persons, memberships and non-member account holders (no copy); eligibility, windows, maximum stays and discounts read Membership status and type (BR-108, Active only). Deposits, payments, refunds, adjustments and the Night Audit day go to the Finance stub (RC-141). The Facilities visitor pass becomes the reservation number of an in-house stay (*Resort guest*, RC-121). The 5 Resorts reports switch on in the Report Catalogue (RC-140). The launcher loses its Scenarios section; Module details takes its place with every Start link (D-351). Finance stays `Deferred to v07`.

**Decision to inform (v06, D-347):** *Should we build Resorts (configuration, rates and policy, reservations with groups, holds, amendment, cancellation, waitlist and no-shows, payment and folio, refunds and adjustments, check-in and check-out with access credentials and vehicles, housekeeping and maintenance blocks, Night Audit, reports, audit log and notifications) on the Membership base, with every draft rule confirmed or flagged?* Type: `validate`.

**v05 (KO-033):** this version builds **Facilities** (§5.1e) on the Membership base, with Club Reporting, Golf and Events kept unchanged except where they connect to Facilities (D-323). Customers are the existing persons, memberships and their dependants, and the non-member account holders (no copy); eligibility, entitlement and the member rate read Membership status and privileges (BR-086, Active only); SAFRA members are identified by a typed card number and guests come with a member host (RC-113); the bungalow visitor pass is a simulated list until Resorts (RC-114); payments, refund instructions and bowling escalations go to the Finance stub (RC-115). Events venues become Facilities records, and a published session blocks a bookable venue (RC-116). The 8 Facilities reports switch on in the Report Catalogue (RC-117). Resorts and Finance stay `Deferred to v0N`.

**Decision to inform (v05, D-324):** *Should we build Facilities (eligibility and entitlement, availability and blocks, bookings with amendment, cancellation, refunds and no-shows, swimming and fitness admission with day passes, bowling counter and reconciliation, waiting list, configuration, Fitness Centre and Personal Training, operational reports) on the Membership base, with Events venues linked to the Facilities records?* Type: `validate`.

**v04 (KO-032):** this version builds **Events** (§5.1d) on the Membership base, with Club Reporting and Golf kept unchanged except where they connect to Events (D-302). Participants are the existing persons and memberships, and their dependants (no copy); event eligibility and the member rate read Membership status and privileges; venues are configured names only (Facilities is v05); event payments and authorised refunds go to the Finance stub. One reporting change: the Report Catalogue's Export badge becomes a **PDF** and an **XLS** button (Story-102, 103, D-305). Facilities, Resorts and Finance stay `Deferred to v0N`.

**Decision to inform (v04, D-303):** *Should we build Events (event setup and publication, online and counter registration, waitlist with promotion, minimum participation, check-in and attendance, cancellation and refunds, rescheduling, function-room mirroring) on the Membership base, reusing member eligibility and relationships?* Type: `validate`.

**v03 (KO-031):** this version builds **Golf** (§5.1c) on the Membership module and Club Reporting, which are kept unchanged except where they connect to Golf (D-282). Golfers are the existing persons and memberships (no copy); golf eligibility reads Membership status, type and privileges; golf charges go to the Finance stub. One launcher change: the module card button **Module details** (Story-035, D-285). Events, Facilities, Resorts and Finance stay `Deferred to v0N`.

*v03 decision (kept in v03's brief):* *Should we build Golf (tee sheets, booking and waitlist, check-in, rain checks, eligibility imports, capacity blocks, shift close, golf reports) on the Membership and Club Reporting base, reusing member data and eligibility?* Type: `validate`.

**v02 (KO-030):** this version builds **Club Reporting** (§5.1b) on the v01 Membership module and launcher, which are kept unchanged except where they connect to Club Reporting (D-259). Golf, Events, Facilities, Resorts and Finance stay `Deferred to v0N`.

*v02 decision (kept in v02's brief):* *Should we build Club Reporting (role-governed catalogue, parameterised runs, export, user-defined reports and dashboards, legacy finder) on the Membership base, as the reporting layer each later module plugs into?* Type: `validate`.

*v01 decision (kept in v01's brief):* *Should we build CC-Demo's Membership module, with the request → approval → payment → activation flow shown for the Membership Officer, Approver, Manager, Administrator and Member, as the base for the other six modules?* Type: `validate`.

## 2. Goals & success metrics
| Goal | Metric | Target (prototype) |
|---|---|---|
| Every lifecycle event goes through its gates | Requests completed with every gate passed | 100 %: no gate can be skipped |
| Maker-checker | Requests decided by their submitter | 0 |
| Full traceability | Material actions with actor, role, time and from / to status | 100 % in the history (BR-177) |
| Configuration-driven policy | Policy values hard-coded in pages | 0: all read from configuration |
| One hand-off to Finance | Re-keying between Membership and Finance | 0: one hand-off, one confirmation (stub until v07; a FIN-OPS event and Payment from v07) |
| Reviewers can answer the decision | Scenarios SC-01 – SC-11, SC-34, SC-35, SC-63, SC-64 runnable end to end with the scenario guide | 15 / 15 |

| **(v02)** Reports follow access | Reports or audit rows shown to a role without an access rule | 0 (BR-031) |
| **(v02)** Reports are read-only | Source records changed by a run or export | 0 (BR-033) |
| **(v02)** Export matches the screen | Exported rows different from the on-screen result | 0 (BR-034) |
| **(v02)** Legacy names resolve | Legacy names with no successor, owner or retirement reason | 0 of 147 |
| **(v02)** Reviewers can answer the v02 decision | Scenarios SC-12, SC-13, SC-15, SC-16, SC-65 and the kept v01 scenarios runnable with the guide | 20 / 20 |

| **(v03)** Golf reuses member data | Member records created or copied by Golf | 0: golfers reference `persons` / `memberships` |
| **(v03)** Only eligible golfers book and play | Bookings or releases for a golfer failing BR-040 – 043 or BR-049 | 0 |
| **(v03)** Released capacity is fair | Offers made out of waitlist order or to a party that does not fit | 0 (BR-044) |
| **(v03)** GMS never holds money | Balances stored in GMS; golf charges without a Finance status at shift close left unflagged | 0 (BR-059, BR-060) |
| **(v03)** Reviewers can answer the v03 decision | Scenarios SC-14, SC-17 – SC-25 and the kept v01 – v02 scenarios runnable with the guide | 30 / 30 |

| **(v04)** Events reuse member data | Member records created or copied by Events | 0: participants reference `persons` / `memberships` |
| **(v04)** Only eligible groups register, never split | Registrations confirmed with an ineligible participant, or split automatically | 0 (BR-063, BR-065) |
| **(v04)** Capacity is never oversold | Confirmed + held + offered places above capacity | 0 (BR-066, BR-082) |
| **(v04)** Refunds are authorised | Refunds handed to Finance without Events Manager authorisation, or authorised by their proposer | 0 (BR-078, BR-079) |
| **(v04)** Reviewers can answer the v04 decision | Scenarios SC-26 – SC-33, SC-66 and the kept v01 – v03 scenarios runnable with the guide | 39 / 39 |

| **(v05)** Facilities reuse member data | Member records created or copied by Facilities | 0: customers reference `persons` / `memberships` / account holders |
| **(v05)** Only eligible customers book and enter | Bookings or admissions failing BR-086, 089, 090, 098 or 099 | 0 |
| **(v05)** Resources are never double-booked | Overlapping active bookings, or bookings inside an active block | 0 (BR-087, BR-088) |
| **(v05)** Money follows policy | Bookings confirmed before payment; exceptional refunds without the Operations Manager's approval or approved by their requester | 0 (BR-092, BR-096) |
| **(v05)** Bowling reconciles | Counter transactions reconciled without a match, or exceptions closed without a disposition and reason | 0 (BR-102, BR-103) |
| **(v05)** Reviewers can answer the v05 decision | Scenarios SC-36 – SC-43, SC-67 and the kept v01 – v04 scenarios runnable with the guide | 48 / 48 |

| **(v06)** Resorts reuse member data | Member records created or copied by Resorts | 0: guests reference `persons` / `memberships` / account holders |
| **(v06)** Rooms are never double-sold | Two reservations on one room for one night, or a reservation or check-in on a Faulty or Maintenance Blocked room | 0 (BR-107, BR-122, BR-125) |
| **(v06)** Money follows the draft policy | Reservations confirmed without a deposit (unless zero value); refunds, adjustments, credit notes or reversals without the Manager's approval or approved by their requester; check-outs with a balance | 0 (BR-118, 119, 121, 128, 129) |
| **(v06)** Draft rules are visible | Resort pages and rules without the *Draft – for validation* label | 0 (D-348) |
| **(v06)** Reviewers can answer the v06 decision | Scenarios SC-44 – SC-52 and the kept v01 – v05 scenarios pass in the prototype | 100 % |

| **(v07)** One ledger for every module | Module money steps without a FIN-OPS financial event, or still on a stub | 0 (BR-133, Story-202) |
| **(v07)** Postings balance | Posting sets released with debits ≠ credits beyond S$0.01, or without an approved mapping | 0 (BR-136, BR-138) |
| **(v07)** Two people move money | Refunds, configuration changes, adjustments, invoices, notes or overrides approved by their maker | 0 (BR-139, 150, 157, 166, 167) |
| **(v07)** Clean lines only reach Yonyou | Lines staged with a blocking exception, or a batch regenerated on retry | 0 (BR-160, BR-162) |
| **(v07)** In-house credit stays in-house | In-house credit paid out as cash, card or PayNow | 0 (BR-151) |
| **(v07)** Interim rules are visible | Finance pages using an Interim Design or TBC rule without the note | 0 (D-371) |
| **(v07)** Reviewers can answer the v07 decision | Scenarios SC-53 – SC-62, the changed money steps and the kept v01 – v06 scenarios pass in the prototype | 100 % |

## 3. Users & personas
| Role | Goal | Context (where and when) | Device | Built in |
|---|---|---|---|---|
| Membership Officer | Capture applications and requests correctly, first time; **(v02)** run operational membership reports, export them, find legacy names | Membership counter and back office, office hours | desktop | v01; reports v02 |
| Approver | Decide requests quickly with the evidence in front of them; record Finance-stub payments; **(v07)** Confirm payment records a FIN-OPS Payment, Mark payment failed a rejected attempt | Back office, from an inbox | desktop | v01 |
| Membership Manager (also Golf, Events and Operations Manager) | Authorise exceptions, long extensions, suspensions and goodwill refunds; read the dashboard; **(v02)** all Membership reports incl. the audit review, the management dashboard; **(v03)** as Golf Manager and Club Captain: golf waivers, extensions and second rounds, course suspension; all golf reports; **(v04)** as Events Manager: authorises event refunds; **(v05)** as Operations Manager: approves exceptional facility refunds and Draft facility configuration; Facilities reports; **(v06)** as Operations Manager: approves resort refunds, adjustments, credit notes, late arrivals, reversals and Draft resort configuration; closes the business day; reads the resort audit log | Office | desktop | v01 (Membership part); reports v02; golf v03 |
| Membership Administrator (also Golf and System Administrator) | Keep policy and master data right without code changes; create corporate memberships; **(v02)** report definitions, dashboards, report access rules; **(v03)** tee sheets, golf settings, handicap import and NSRCC PC; **(v05)** facility configuration (Draft until approved), Fitness Centre equipment and instructors; **(v06)** resort, room and add-on master data; Draft rates, seasons, discounts and reservation policy; reads the resort audit log | Office | desktop | v01 (Membership part); reports v02; golf v03 |
| Member (portal) | See their card and membership; renew, update their profile or withdraw; **(v03)** book tee times, answer waitlist offers, cancel, see rain checks; **(v04)** register themself and dependants for events, pay, cancel, see QR credentials; **(v05)** book, amend and cancel facilities, join and answer the facility waiting list; **(v06)** reserve resort rooms, pay the deposit (stub), amend, cancel, join the resort waitlist | Home or on the move | both | v01 (Membership part); golf v03 |
| Non-member account holder | Register for events open to non-members, pay, cancel; **(v05)** book, amend and cancel facilities open to non-members, join the waiting list; **(v06)** reserve resort rooms as a non-member (30 days, 4 nights) | Online | both | **v04** (Portal, own account, BR-085); facilities v05 |
| Golf Operations (counter / CSO) | Run the tee sheet, counter booking, waitlist, amendments, check-in, late arrivals, blocks, enquiry and the shift close; golf reports | Golf counter | desktop (responsive, D-285) | **v03** (role tab *Golf Ops G. Lim*); **(v04)** also the event counter Customer Service Officer |
| Events Team | Set up, publish and maintain events, review minimum participation, check in participants, cancel and reschedule, apply the function-room feed | Events office, venue | desktop (responsive, D-305) | **v04** (role tab *Events Team E. Koh*) |
| Facilities Staff | Book, amend, cancel and record no-shows; block resources; admit to the pool and Fitness Centre and sell day passes; run the Bowling counter, reconciliation and exceptions; waiting list and Personal Training | Facilities counter | desktop (responsive, D-326) | **v05** (role tab *Facilities Staff F. Tan*) |
| Resort Front Desk | Reserve (single, group, hold), amend, cancel, waitlist, no-show; check in and out; folio, payments (stub), charges, vehicles, PINs; request refunds, adjustments, late arrivals and reversals; run Night Audit; Resorts reports | Resort front desk | desktop (responsive, D-349) | **v06** (role tab *Resort Front Desk K. Wong*) |
| Housekeeping | Turn rooms round (Pending Cleaning → Cleaning → Ready); mark rooms Faulty or Maintenance Blocked and record completion | On the floor | both | **v06** (role tab *Housekeeping H. Ong*) |
| Finance Officer (maker) | Validate the intake, post, record and allocate payments, run GIRO and bank results, prepare refunds, adjustments and invoices, recognise revenue, amortise, reconcile and close cashier sessions, stage Yonyou runs, work exceptions and dunning; Finance reports | Finance office | desktop (responsive, D-372) | **v07** (role tab *Finance Officer R. Tan*) |
| Finance Approver (checker) | Approve refunds, configuration changes, adjustments, General AR invoices and notes; override credit limits; close and reopen periods; Finance reports | Finance office | desktop (responsive, D-372) | **v07** (role tab *Finance Approver C. Lau*) |

## 4. Scope
**In scope (v07, built):** features 129 – 149, 165, 29 (v07: the Finance stub replaced); features 3, 4, 8, 10, 20 (Membership fees, renewals, withdrawal clearance, goodwill refund, credit), 55, 56 (golf charges, shift close), 62, 67, 68 (event payments and refunds), 84, 86, 90, 91 (facility payments, refunds, bowling), 110, 111, 112, 121, 122 (resort payments, refunds, corrections, Night Audit, hand-off), 32, 37 (Finance reports in the catalogue, RC-183), 74 – 77, 166 – 168 (launcher with every module live, roles, guides, data file) linked; plus every v01 – v06 feature below (kept, D-369). Interim Design and TBC rules are marked (D-371).

**In scope (v06, built and kept):** features 101 – 125, 164; features 32, 37 (Resorts reports in the catalogue, RC-140), 80, 88 (Resort guest and visitor pass, RC-121), 74 – 77, 166 – 168 (launcher without the Scenarios section, roles, guides, data file, D-351) linked; plus every v01 – v05 feature below (kept, D-346). Every resort rule is *Draft – for validation* (D-348).

**In scope (v05, built and kept):** features 80 – 96, 163; features 32, 37 (Facilities reports in the catalogue, RC-117), 60, 70 (venue from Facilities, RC-116), 74, 75, 77, 166 – 168 (launcher, roles, guides, data file) linked; plus every v01 – v04 feature below (kept, D-323).

**In scope (v04, built and kept):** features 60 – 71, 162; features 32 and 37 changed (catalogue export buttons, D-305); plus every v01 – v03 feature below (kept, D-302).

**In scope (v03, built and kept):** features 40 (GMS-RR-001 – 012), 46 – 57, 150 (golf reports part), 161; feature 77 changed (Module details, D-285); plus every v01 and v02 feature below (kept, D-282).

**In scope (v02, built and kept):** features 25, 32, 37, 38, 39 (MMS-RR-001 – 008; 009, 010 as capabilities), 41, 42, 43, 150 (Club Reporting part), 160 (D-264), plus every v01 feature below (kept, D-259).

**In scope (v01, built and kept):** features 1 – 24, 26 – 31, 74 – 77, 150, 151 (amended: alternating row shading only, D-249), 157 – 159, 166, 167, 168 of `requirement-selection.md` (D-226, corrected by D-229: feature 25 is v02).

**In scope (this PRD, deferred):** none. Every story is built by v07 (RC-184).

**Out of scope:**
- Not selected (v07, D-371): 152 real Yonyou, bank and payment-provider links (simulated); 153 POS vendor specifics; 154 interest and late-payment charges (shown off); 155 the 9 FIN-OPS reports covered by screens; 156 statement suppression, the corporate entrance-fee variant, GST rate-change rebilling.
- Not selected: 33 bulk actions; 34 real e-mail / SMS, Yonyou, Access Control, HMS and GMS integrations; 35 portal sign-in, 2FA and Active Directory; 36 document upload and storage; 44 scheduled report delivery; 58 balloting, PC Test and Courtesy Round administration, tournaments, buggy fleet, driving range; 59 pace of play and marshal workflow; 72 kiosk registration and manual price override; 73 instructor and vendor payments, the function-room reservation lifecycle; 97 bowling lane control; 98 fitness equipment maintenance; 99 swimming lessons and Finance GL configuration in Facilities; 100 PT scheduling and pricing; 126 Accommodation Pass; 127 F&B, POS, kiosks, guest identity documents, pre-arrival registration, committee spending allowance; 128 resort GST and GL mapping; 152 real Yonyou, bank and payment-provider transport; 153 APTSYS / Epoint POS specifics; 154 interest and late-payment charges; 155 extra FIN-OPS catalogue reports; 156 statement suppression, corporate entrance-fee variant, GST rate-change rebilling.
- Dropped: 78 HTML module guides, 79 shareable demo folder (D-226).
- Always: real authentication, real notification delivery, real payments, any server, API or database.

## 5. User stories

### 5.1 Membership and launcher (built in v01, kept in v02)
Stories marked **v02 link** are kept and change only where they connect to Club Reporting.
| ID | As a… | I want… | So that… | Priority | Feature · rules | Acceptance scenarios (§5a) | Flag |
|---|---|---|---|---|---|---|---|
| Story-001 | Membership Officer | to search Persons and memberships by name, Membership ID, ID number or status and open one 360° page | I answer an enquiry from one screen | Must | 1 · — | Member search and 360° profile; No match changes nothing | |
| Story-002 | Membership Officer | to edit a member's contact, address and marketing consent | the record stays correct and the change is traceable | Must | 2 · BR-026, 027, 171, 177 | Profile change kept with before and after; Mandatory profile field blocks the save; Invalid mobile blocks the save | |
| Story-003 | Membership Officer | to capture a new application with type, recruitment source and referral, and submit it through the checks | only eligible, complete, unique applications reach approval | Must | 3 · BR-002, 003, 004, 007, 171, 172, 175 | Application saved as draft and edited; Duplicate application blocked; Under-age applicant blocked; Referral needs referrer details; Missing documents put the request in Pending Documents; Submitted request is read-only | v07 link: entrance fee and subscription raised in FIN-OPS |
| Story-004 | Approver | to approve an application and have the fee handed to Finance, the membership activating only once payment is recorded | no membership starts unpaid | Must | 3 · BR-001, 005, 006, 029, 030, 173, 174, 178 (retired v07), 140, 142 | Application approved with a fee waits for payment; Payment recorded activates the membership | **Changed in v07:** the fee is a FIN-OPS receivable; payment recorded = a FIN-OPS Payment with a PaymentNo (RC-147) |
| Story-005 | Member | to renew my membership in the portal for 1, 2 or 3 years | I keep my privileges without visiting the counter | Must | 4, 27 · BR-006, 008, 009, 029, 085 | Portal renewal completes after payment; Renewal over the 30-year cap is blocked; Failed payment keeps the renewal waiting | v07 link: renewal fee through FIN-OPS |
| Story-006 | Membership Officer | to convert a membership between Full and Basic | the remaining term is recalculated by policy | Must | 5 · BR-008, 010 | Full to Basic doubles the remaining months | |
| Story-007 | Membership Officer | to transfer a transferable membership to an eligible recipient | the holder changes with its lineage kept | Must | 6 · BR-004, 011 | Transfer changes the holder and keeps lineage; Corporate membership cannot be transferred | |
| Story-008 | Membership Officer | to request an extension that is routed by length | long extensions get the Manager's decision | Must | 7 · BR-008, 012 | Extension over 12 months goes to the Manager; Extension over 24 months is blocked | |
| Story-009 | Member | to withdraw my membership once Finance has cleared my balance | I leave the club with no balance left behind | Must | 8, 27 · BR-013, 178 | Withdrawal completes only after the balance is cleared | v07 link: clearance read from the FIN-OPS member account |
| Story-010 | Membership Officer | to run the lifecycle check and process rejoins | lapsed memberships expire on time and returning members keep their ID | Must | 9 · BR-014 | Lifecycle check expires a membership past its expiry; Rejoin keeps the original Membership ID | |
| Story-011 | Membership Officer | to record a deceased member, with an optional beneficiary transfer and goodwill refund | the case is closed with the right approvals | Must | 10 · BR-011, 015 | Goodwill refund goes to Finance only after the Manager approves | v07 link: goodwill refund to FIN-OPS refunds after the Manager (RC-148) |
| Story-012 | Membership Officer | to request an absent period of 3 – 24 months | a member overseas keeps the membership without using the term | Must | 11 · BR-016, 019, 174 | Absent period pushes the expiry out; Overlapping absent period blocked | |
| Story-013 | Membership Officer | to request a medical period of up to 12 months | a member who cannot play has privileges paused | Must | 12 · BR-017, 019 | Medical period keeps the expiry; Medical period over 12 months blocked | |
| Story-014 | Membership Officer | the lifecycle check to end absent and medical periods whose end date has passed | the member is active again without a manual step | Must | 11, 12 · BR-016, 017, 019 | Ended absent period returns the membership to Active | |
| Story-015 | Membership Manager | to approve suspensions and reinstatements | privileges stop while billing continues, and resume only with approval | Must | 13 · BR-005, 018, 019 | Suspension turns privileges off and billing on | |
| Story-016 | Membership Officer | every status change to follow the transition matrix | a membership never reaches an invalid status | Must | 14 · BR-018, 019 | Invalid status transition is blocked | |
| Story-017 | Membership Officer | to add supplementary memberships under an active principal | family members share the principal's lifecycle | Must | 15 · BR-020 | Supplementary needs an active principal; Supplementary ends with its principal | |
| Story-018 | Membership Officer | a watch list of juniors near 21 | eligibility ends on time with no automatic conversion | Should | 16 · BR-021 | Junior reaching 21 is ended by the lifecycle check | |
| Story-019 | Membership Administrator | to create corporate memberships and manage nominees within the limit | corporate rules and the nomination fee are applied | Must | 17 · BR-022 | Corporate creation is for the Administrator only; Nominee limit blocks one more nominee | |
| Story-020 | Membership Officer | to request a Committee or Honorary classification | entitlements and end date come from configuration | Should | 18 · BR-005 | Classification gets its end date from configuration | |
| Story-021 | Membership Officer | to see the membership contract and financial terms | the entrance fee, subscription and credit terms are clear | Must | 19 · BR-023, 174 | Contract shows terms and Spending Credit Granted never changes | |
| Story-022 | Membership Officer | to check a member's available credit | spending is allowed only within the limit | Must | 20 · BR-023 | Available credit is limit minus Finance outstanding; Credit check blocked when Finance is unavailable | **Changed in v07:** available credit = limit − the FIN-OPS outstanding balance; the availability switch on Finance home (RC-152) |
| Story-023 | Membership Officer | to register vehicles and car labels for an active membership | access control knows the member's cars | Must | 21 · BR-024 | Fifth vehicle is blocked | |
| Story-024 | Membership Officer | to issue and replace the digital card | the member always has one valid card | Must | 22 · BR-025 | Replacement voids the previous card | |
| Story-025 | Membership Officer | referral rewards raised only under an active campaign | rewards follow policy | Should | 23 · BR-007, 030 | Referral reward needs an active campaign | |
| Story-026 | Membership Officer | to send campaigns from approved templates and see every notice in the outbox | members who withheld consent get no marketing | Must | 24 · BR-026 | Marketing campaign excludes non-consenting persons | |
| Story-027 | Membership Administrator | to maintain membership types, fees, limits, documents and transitions as effective-dated configuration | policy changes need no code | Must | 26 · BR-028 | Referenced value can be inactivated but not deleted | |
| Story-028 | Member | to see my own membership and digital card in the portal | I can show my card and check my status | Must | 27 · BR-085 | Member tab shows only its own account | |
| Story-029 | Approver | one inbox of the decisions routed to me, with return for correction | I decide quickly and never on my own request | Must | 28 · BR-005, 175, 176 | Submitter cannot approve their own request; Return for correction needs a reason and reopens the request; Reject needs a reason | |
| Story-030 | Approver | to record a fee as paid or failed through the Finance stub until Finance is built (v07: in FIN-OPS) | the Membership flow completes end to end in v01 | Must | 29 · BR-006, 178 | Only an Approver records stub payments; Stub payment failure keeps the request waiting | **Changed in v07:** the Finance stub is retired: Confirm payment records a FIN-OPS Payment, Mark payment failed a rejected attempt (Story-202, RC-147) |
| Story-031 | Membership Manager | a dashboard of members by status, pending approvals, awaiting payment and expiring in 90 days, with charts | I see the workload at a glance | Should | 30, 150 · — | Dashboard tiles match the data | v02 link: panels link to the Membership reports · v07 link: awaiting payment and dunning escalations read from FIN-OPS (RC-174) |
| Story-032 | Membership Officer | to see what Membership published to Access Control, GMS, HMS and the notification service | I can trace what other systems were told | Should | 31 · BR-177 | Completed request writes status feed entries | v07 link: FIN-OPS events in the feed |
| Story-033 | Presenter | a launcher that opens each role and each member account in its own tab | the demo shows each role's view | Must | 74 · BR-084 | Launcher opens a role in its own tab | v07 link: Finance Officer and Finance Approver role entries |
| Story-034 | Presenter | each tab to keep its role and block pages that are not for it | reviewers see exactly what each role can do | Must | 75 · BR-084 | Page not for the tab's role shows no content; Page opened without the launcher asks to use it | v02 link: report pages in the role map · v07 link: Finance pages in the role map |
| Story-035 | Presenter | each module's steps, roles, scenarios and rules on the launcher | reviewers understand the module before running it | Should | 77 · — | Module details list the Membership scenarios with Start links | v02 link: Club Reporting scenarios · **Changed in v03:** Golf scenarios; the card button **Module details** always opens and scrolls to the module's details tab (D-285) · v04 link: Events scenarios · v07 link: Finance tab in Module details |
| Story-036 | Presenter | the six modules not built yet shown as "Coming in v0N" (**v07: all seven modules live**) | reviewers see the whole product and what this version covers | Must | 168 · — | Planned module cards have no links | v02 link: Club Reporting live, five planned · v03 link: Golf live, four planned · v04 link: Events live, three planned · **Changed in v07:** all seven modules live; no "Coming in v0N" badge or planned card left (RC-184) |
| Story-037 | Presenter | the launcher in the v09 design: CC-Demo name, collapsible sections with one-line summaries and the first visible section open, module cards with alt buttons; and the Membership pages refined visually (design pass 3, D-247) | the demo looks the same as the approved rapid version, refined in the NSRCC brand | Must | 157, 158, 159 · — | Launcher sections collapse with the first visible one open; CC-Demo name everywhere | v07 link: Finance card live (no planned card) |
| Story-038 | Presenter | a scenario guide side panel started from each Start link | anyone can run a scenario step by step | Must | 166 · — | Start link opens the guide at step 1 in the right tab | v07 link: guides for the Finance scenarios |
| Story-039 | Presenter | to export the data, import it back and reset it | a review state can be kept or restored | Must | 167 · — | Export then import restores the data; Wrong file is refused; Reset restores the seed | v07 link: Import requires the Finance collections (RC-185) |

### 5.1b Club Reporting (built in v02)
Moved from §5.2 (`Deferred to v02`, D-264). Wording kept, except that Story-101 now names its reports (MMS-RR-001 – 008). Acceptance in §5a (v02).

| ID | As a… | I want… | So that… | Priority | Feature · rules | Acceptance scenarios (§5a) | Flag |
|---|---|---|---|---|---|---|---|
| Story-101 | Membership Manager | membership reports (MMS-RR-001 – 008) and the audit review in the catalogue | I review listings, counts, expiry, transitions, juniors, recruitment, vehicles and actions by actor | Must | 25, 39 · BR-031 – 033 | Operational membership listing; Membership statistics and trends; Approaching expiry lists the memberships in the period; Status distribution and transitions; Juniors near the age limit; Recruitment and referral by source; Vehicles and credentials; Audit review shows actor, time and outcome | |
| Story-102 | Membership Officer | to export a report to Excel or PDF | I can share exactly what is on screen | Must | 32 · BR-034 | Excel export carries the same rows; PDF export opens the print layout; Audit review has no export | RC-103 (D-263) · **Changed in v04:** the Report Catalogue shows a PDF and an XLS button on each exportable report, running and exporting it (D-305) · v07 link: Finance reports exportable |
| Story-103 | Membership Officer | a report catalogue that shows only what my role may run | access follows the rules | Must | 37 · BR-031 | Catalogue shows only the role's reports; Golf reports are listed as coming in v03; Report pages are blocked for roles without reports · **Changed in v04:** Status column with the export buttons; "On screen" and "Coming in v0N" unchanged (D-305) · v07 link: the 10 Finance reports switched on (RC-183) |
| Story-104 | Membership Manager | parameterised report runs with a valid empty result | I can narrow reports safely | Must | 38 · BR-032, 033 | Output is limited to the criteria; Missing required parameter blocks the run; No match returns a valid empty result; A run changes nothing and is kept in the run history | |
| Story-105 | Membership Administrator | user-defined reports and dashboards on approved reports | I answer new questions without code | Should | 41 · BR-035 | New definition version keeps earlier runs on their version; Definition cannot widen access; Inactivated definition leaves the catalogue and keeps its history; Management dashboard shows KPI tiles and charts | |
| Story-106 | Membership Officer | to find a legacy report name and see what replaces it | the move from the old system is clear | Should | 42 · — | Legacy name resolves to its successor report; Golf successor is coming in v03; Finance-owned name points to the Finance module | |
| Story-107 | Membership Administrator | to maintain report access rules | data scope stays controlled | Must | 43 · BR-031 | Granting a report changes the role's catalogue; Audit review cannot be granted to the Officer | v07 link: Finance roles in the access rules |
| Story-108 | Presenter | the Club Reporting pages refined visually, with report visuals | reports read well in both themes | Should | 150, 160 · — | Each report shows KPI tiles and a chart in both themes; Club Reporting card is live with Start links; Dashboard panels link to the reports | |

### 5.1c Golf (built in v03)
Moved from §5.2 (`Deferred to v03`, D-286). Wording kept; the baseline scenario of each story corrected to the v03 scenarios (Story-114 – 121). Acceptance in §5a (v03). Finance hand-offs go to the Finance stub (D-285).

| ID | As a… | I want… | So that… | Priority | Feature · rules | Acceptance scenarios (§5a) | Flag |
|---|---|---|---|---|---|---|---|
| Story-109 | Golf Operations | golf reports GMS-RR-001 – 012 on live golf data | golf operations are reported from GMS | Must | 40 · BR-031 – 034 | Golf Operations runs the daily tee sheet and exports it; the override audit is Manager-only with no export; charge summary is labelled operational evidence (SC-14) | Changed in v03: Deferred → Selected |
| Story-110 | Membership Administrator | to set up and publish tee sheets | tee capacity follows the configuration | Must | 46 · BR-036 | Published tee sheet follows the configuration and 9-hole periods (SC-17) | Changed in v03: Deferred → Selected |
| Story-111 | Member | to book a tee time online or at the counter | I play when I want within the rules | Must | 47 · BR-037 – 039 | Member books a weekday flight with a guest; each rule refuses its case with a message (SC-18) | Changed in v03: Deferred → Selected |
| Story-112 | Member | an automated waitlist | a released slot reaches the next golfer | Must | 48 · golf rules BR-036 – 060 | Released capacity goes to the earliest fitting entry; an expired offer moves on (SC-19) | Changed in v03: Deferred → Selected |
| Story-113 | Golf Operations | to amend and cancel bookings | changes follow the substitution and cancellation rules | Must | 49 · BR-036 – 060 | Substitution and course change carry their fees; a late cancellation is charged; the requester cannot approve the waiver (SC-20) | Changed in v03: Deferred → Selected |
| Story-114 | Golf Operations | to check in golfers and release them to play | only eligible golfers tee off | Must | 50 · BR-036 – 060 | Release only when every golfer is eligible, insured, declared and charged; a suspended member is refused (SC-21) | Changed in v03: Deferred → Selected |
| Story-115 | Golf Operations | to handle late arrivals and no-shows | the tee sheet stays fair | Must | 51 · BR-036 – 060 | Late golfer rescheduled, else join-in, else no-show charge (SC-22) | Changed in v03: Deferred → Selected |
| Story-116 | Membership Manager | to suspend a course and issue rain checks | golfers are compensated by policy | Must | 52 · BR-036 – 060 | Suspension gives the refund path or 9-hole rain checks; extension needs approval; top-up on redemption (SC-23) | Changed in v03: Deferred → Selected |
| Story-117 | Membership Administrator | to import handicap and PC eligibility data | eligibility checks use current data | Must | 53 · BR-036 – 060 | Faulty extract rows become exceptions; external PC refused (SC-24) | Changed in v03: Deferred → Selected |
| Story-118 | Golf Operations | to block and release tee capacity | maintenance and events are protected | Must | 54 · BR-036 – 060 | Blocked tee times cannot be booked; a release goes to the waitlist first (SC-17) | Changed in v03: Deferred → Selected |
| Story-119 | Golf Operations | golf charges handed to Finance | golf money is accounted for | Must | 55 · BR-036 – 060 | Every charge has a rate, a payer and a Finance status; GMS holds no balance (SC-21) | Changed in v03: Deferred → Selected · v07 link: golf charges raised as FIN-OPS events, posted through mappings |
| Story-120 | Golf Operations | to close the shift and the day | the counter balances | Must | 56 · BR-036 – 060 | Shift close keeps unresolved exceptions and Finance statuses flagged (SC-25) | Changed in v03: Deferred → Selected · v07 link: the shift close feeds the FIN-OPS cashier close (RC-150) |
| Story-121 | Golf Operations | tee sheet and golfer enquiry | I answer golfers quickly | Should | 57 · — | Enquiry finds a golfer's bookings and the tee sheet of a day (SC-25) | Changed in v03: Deferred → Selected |
| Story-122 | Presenter | the Golf pages refined visually | golf reads well in both themes | Should | 161 · — | Golf pages read well in both themes; Golf card live (all v03) | Changed in v03: Deferred → Selected |

### 5.1d Events (built in v04)
Moved from §5.2 (`Deferred to v04`, D-306). Wording kept; the baseline scenario of Story-127 corrected to SC-31. Acceptance in §5a (v04). Payments and authorised refunds go to the Finance stub (D-305). HMS-EVT-RR-001 – 003 are shown on the Events pages, not in the report catalogue (D-305, RC-109).

| ID | As a… | I want… | So that… | Priority | Feature · rules | Acceptance scenarios (§5a) | Flag |
|---|---|---|---|---|---|---|---|
| Story-123 | Events Team | to set up and publish events | members see accurate events | Must | 60 · BR-061 – 083 | Publish refused until complete, then published with no approval; price changes only for new registrations; capacity floor (SC-26); **(v05)** venue picked from the Facilities records, a bookable venue blocked per session (SC-67) | Changed in v04: Deferred → Selected; v05 link |
| Story-124 | Non-member account holder | to register online for an event | I can join without visiting | Must | 61 · BR-061 – 083 | Member and junior dependant registered and paid with a QR each; ineligible participant refuses the group; non-member registers for an open event (SC-27) | Changed in v04: Deferred → Selected |
| Story-125 | Golf Operations (as CSO) | to register participants at the counter | walk-ins can join | Must | 62 · BR-061 – 083 | Counter registration on the member account when balances are available; declined payment releases the hold (SC-28) | Changed in v04: Deferred → Selected · v07 link: member-account charge as a FIN-OPS receivable |
| Story-126 | Member | an event waitlist with automatic promotion | freed places are offered in order | Must | 63 · BR-061 – 083 | Whole group waits free; fit-aware FIFO offer; Let offer expire passes it on; group change resets priority (SC-29) | Changed in v04: Deferred → Selected |
| Story-127 | Events Team | to review minimum participation | unviable events are decided on time | Must | 64 · BR-061 – 083 | Confirmed against the minimum shown; Events Team proceeds or cancels, never automatic (SC-31) | Changed in v04: Deferred → Selected |
| Story-128 | Events Team | event check-in and attendance | attendance is recorded per session | Must | 65 · BR-061 – 083 | QR check-in; duplicate, wrong-session and cancelled codes refused; manual fallback with reason; personnel separate (SC-30) | Changed in v04: Deferred → Selected |
| Story-129 | Member | to cancel my participation | forfeiture follows policy | Must | 66 · BR-061 – 083 | Participant cancellation forfeits, voids the QR and frees the place to the waitlist (SC-29) | Changed in v04: Deferred → Selected |
| Story-130 | Events Team | club-initiated cancellation with refunds | participants are refunded by policy | Must | 67 · BR-061 – 083 | Club cancellation; refunds go to the Finance stub only after the Events Manager authorises; the proposer cannot (SC-31) | Changed in v04: Deferred → Selected · v07 link: authorised refunds pass the Finance Approver (RC-148) |
| Story-131 | Events Team | club-initiated rescheduling | participants can accept or withdraw | Must | 68 · BR-061 – 083 | Reschedule; keep or decline; declined refund authorised; freed place to the waitlist (SC-32) | Changed in v04: Deferred → Selected · v07 link: authorised refunds pass the Finance Approver (RC-148) |
| Story-132 | Events Team | function-room bookings mirrored | events stay in step with the room system | Must | 69 · BR-061 – 083 | Only a confirmed feed message confirms the room; tentative and unknown references change nothing (SC-33) | Changed in v04: Deferred → Selected |
| Story-133 | Events Team | to maintain a published event | changes apply prospectively | Must | 70 · BR-061 – 083 | Prospective price and eligibility; capacity not below committed; automatic completion (SC-26) | Changed in v04: Deferred → Selected |
| Story-134 | Events Team | an events schedule and enquiry | I answer questions about events | Should | 71 · — | Schedule by date (RR-001), confirmed against minimum (RR-002), attendance by session (RR-003) on the Events pages (SC-26) | Changed in v04: Deferred → Selected |
| Story-135 | Presenter | the Events pages refined visually | events read well in both themes | Should | 162 · — | Events pages read well in both themes; Events card live (all v04) | Changed in v04: Deferred → Selected |

### 5.1e Facilities (built in v05)
Moved from §5.2 (`Deferred to v05`, D-327), one story per feature 80 – 96 in order, plus 163. Acceptance in §5a (v05). Payments, refund instructions and bowling escalations go to the Finance stub (D-326, RC-115); SAFRA and guest categories per RC-113; the bungalow visitor pass is simulated (RC-114). The Events venue link (RC-116) changes Story-123 and 133 only where they pick and show the venue.

| ID | As a… | I want… | So that… | Priority | Feature · rules | Acceptance scenarios (§5a) | Flag |
|---|---|---|---|---|---|---|---|
| Story-136 | Facilities Staff | the customer category and entitlement checked for every booking and admission | only eligible customers use a facility at the right rate | Must | 80 · BR-086 – 106 | Member rate only for an Active member; SAFRA by typed card number; ineligible category refused (SC-36, SC-40) | Changed in v05: Deferred → Selected |
| Story-137 | Facilities Staff | facility availability and resource blocks | nothing is booked over a closure | Must | 81 · BR-086 – 106 | Availability grid; block with type and reason; no booking in a block; a block over a booking flags it (SC-38, SC-67) | Changed in v05: Deferred → Selected |
| Story-138 | Member | to book a facility online or at the counter | I get a confirmed slot with a reference | Must | 82 · BR-086 – 106 | Window, duration, overlap and rate checked; confirmed only after payment (SC-36, SC-37) | Changed in v05: Deferred → Selected |
| Story-139 | Member | to amend a facility booking | I can change my plans without losing my slot | Must | 83 · BR-086 – 106 | Rules rechecked, extra paid first, original kept on failure (SC-37) | Changed in v05: Deferred → Selected |
| Story-140 | Member | to cancel a booking and know the refund | refunds follow the 24-hour policy | Must | 84 · BR-086 – 106 | Reason required; ≥ 24 h full refund instruction to the Finance stub, < 24 h none; club cancellation full refund or move; exceptional refund only after the Operations Manager approves (SC-37, SC-38) | Changed in v05: Deferred → Selected · v07 link: refunds to FIN-OPS refunds; in-house credit restored (RC-148, RC-149) |
| Story-141 | Facilities Staff | to record a no-show | no standard refund is paid for an unused slot | Must | 85 · BR-086 – 106 | No-show only after the start; no standard refund (SC-38) | Changed in v05: Deferred → Selected |
| Story-142 | Facilities Staff | payments recorded and handed to Finance | Finance gets one record per payment | Must | 86 · BR-086 – 106 | Pay (stub) Success / Decline online, Cash, Card or NETS at the counter; no member-account charging; payment to the Finance stub (SC-36) | Changed in v05: Deferred → Selected · v07 link: payments recorded as FIN-OPS Payments with a PaymentNo |
| Story-143 | Facilities Staff | to admit customers to the Swimming Pool | the pool stays within capacity and fees are paid | Must | 87 · BR-086 – 106 | Open hours, capacity 60, fee where due; lessons linked to Events (SC-40) | Changed in v05: Deferred → Selected |
| Story-144 | Facilities Staff | to admit customers to the Fitness Centre and sell day passes | only entitled customers use the gym | Must | 88 · BR-086 – 106 | Active member, **(v06)** a Resort guest with the reservation number of an in-house stay (RC-121; was a simulated visitor pass) or day pass; same-day re-entry; yesterday's pass refused (SC-40) | Changed in v05: Deferred → Selected |
| Story-145 | Facilities Staff | to record bowling counter transactions | every game is paid before play with a receipt | Must | 89 · BR-086 – 106 | Receipt number required; paid before play; no member account (SC-41) | Changed in v05: Deferred → Selected |
| Story-146 | Facilities Staff | to reconcile the Bowling export | counter records match the lane system | Must | 90 · BR-086 – 106 | Match by receipt number, amount, date and method; matched records locked; exceptions listed (SC-41) | Changed in v05: Deferred → Selected · v07 link: the reconciliation feeds the FIN-OPS cashier close (RC-150) |
| Story-147 | Facilities Staff | to resolve bowling exceptions | every difference is explained or escalated | Must | 91 · BR-086 – 106 | Disposition and reason required; escalation to the Finance stub; correct and re-run (SC-41) | Changed in v05: Deferred → Selected |
| Story-148 | Member | to join a facility waiting list | I get a freed slot fairly | Must | 92 · BR-086 – 106 | FIFO offers for 2 hours; accept and pay to book; Let offer expire moves on; withdraw (SC-39) | Changed in v05: Deferred → Selected |
| Story-149 | Administrator | to configure facilities, resources, rates and windows | policy changes need no code | Must | 93 · BR-086 – 106 | Saved as Draft, effective only after the Manager approves; Billiards 1 – 3 h locked (SC-42) | Changed in v05: Deferred → Selected |
| Story-150 | Administrator | Fitness Centre equipment and instructor lists | staff see what is available | Must | 94 · BR-086 – 106 | Active / inactive; inactive instructors not assignable (SC-42) | Changed in v05: Deferred → Selected |
| Story-151 | Facilities Staff | to record Personal Training sessions | PT is tracked while the policy is open | Should | 95 · BR-086 – 106 | Pending policy until eligibility confirmed; members only; no price or cancellation assumed (SC-42) | Changed in v05: Deferred → Selected |
| Story-152 | Operations Manager | Facilities operational reports | I can see bookings, use, sales and exceptions | Should | 96 · BR-086 – 106 | HMS-FAC-RR-001 – 008 in the Report Catalogue, exportable (SC-43) | Changed in v05: Deferred → Selected |
| Story-153 | Presenter | the Facilities pages refined visually | facilities read well in both themes | Should | 163 · — | Facilities pages read well in both themes; Facilities card live (all v05) | Changed in v05: Deferred → Selected |

### 5.1f Resorts (built in v06)
Moved from §5.2 (`Deferred to v06`, D-350), one story per feature 101 – 125 in order, plus 164. Acceptance in §5a (v06). Every resort rule is **Draft – for validation** (D-348); TBC values are the demo values of D-349 (RC-120 – RC-144). Finance hand-offs go to the Finance stub (RC-141).

| ID | As a… | I want… | So that… | Priority | Feature · rules | Acceptance scenarios (§5a) | Flag |
|---|---|---|---|---|---|---|---|
| Story-154 | Administrator | to configure resorts, room types, rooms and add-ons | inventory changes need no code | Must | 101 · BR-107 – 132 | Saved at once, end-dated never deleted; an end-dated room type keeps its past stays (SC-52) | Changed in v06: Deferred → Selected |
| Story-155 | Administrator | to set rates, seasons, discounts and reservation policy | pricing and policy follow the club's draft rules | Must | 102 · BR-107 – 132 | Saved as Draft, used only after the Manager approves; a rejected Draft changes nothing (SC-52) | Changed in v06: Deferred → Selected |
| Story-156 | Member | to reserve a resort room online or at the front desk | I get a confirmed stay at the right rate | Must | 103 · BR-107 – 132 | Minimum stay, window, maximum nights, Active membership and rate checked; confirmed on the deposit (Pay stub) or at zero value (SC-44, SC-45) | Changed in v06: Deferred → Selected · v07 link: deposit as a FIN-OPS Payment, held as deferred revenue |
| Story-157 | Resort Front Desk | to make a group reservation | several rooms share one reference and folio | Must | 104 · BR-107 – 132 | Every room free, or the revised set accepted; one master reference and group folio (SC-45) | Changed in v06: Deferred → Selected |
| Story-158 | Resort Front Desk | to place rooms on a tentative hold | a guest can pay later without losing the rooms | Must | 105 · BR-107 – 132 | Held 48 hours; paid in time → Confirmed; Let hold expire → released (SC-45) | Changed in v06: Deferred → Selected |
| Story-159 | Member | to amend a reservation | I can change my plans under the 21-day rule | Must | 106 · BR-107 – 132 | Same booked guest; > 21 days: Lost Opportunity Charge 20 %; ≤ 21 days: confirm "processed as a cancellation" (SC-46) | Changed in v06: Deferred → Selected |
| Story-160 | Member | to cancel a reservation and know the charge | refunds follow the 21-day rule | Must | 107 · BR-107 – 132 | Reason required; 50 % > 21 days, 100 % ≤ 21 days; rooms released; refundable amount for the Manager (SC-46) | Changed in v06: Deferred → Selected · v07 link: refund to FIN-OPS refunds; in-house credit restored (RC-149) |
| Story-161 | Resort Front Desk | a resort waitlist | a freed room goes to a guest I choose | Must | 108 · BR-107 – 132 | No room held; matching entries oldest first; choice and reason audited; entry closed on reservation (SC-44, SC-47) | Changed in v06: Deferred → Selected |
| Story-162 | Resort Front Desk | to process a no-show | an unarrived stay is charged by policy | Must | 109 · BR-107 – 132 | Only after 10:00 the day after arrival; 100 % charge (SC-51) | Changed in v06: Deferred → Selected |
| Story-163 | Resort Front Desk | payments and a guest folio | every charge and payment is on one record | Must | 110 · BR-107 – 132 | Pay (stub) Success / Decline; every item on the folio; Finance stub record per payment (SC-44, SC-50) | Changed in v06: Deferred → Selected · v07 link: Pay (simulated) success = a FIN-OPS Payment (RC-153) |
| Story-164 | Operations Manager | to approve resort refunds | no money leaves without my approval | Must | 111 · BR-107 – 132 | Every refund approved on *Resort refunds* (requester never approves), instruction to the Finance stub with the original payment reference (SC-46) | Changed in v06: Deferred → Selected · v07 link: approved refunds pass the Finance Approver (RC-148) |
| Story-165 | Resort Front Desk | discounts, credit notes and adjustments | corrections are controlled | Must | 112 · BR-107 – 132 | Discount priority and combination; an unpaid item adjusted, a paid one by credit note, both after the Manager approves (SC-49) | Changed in v06: Deferred → Selected · v07 link: credit notes and adjustments arrive as FIN-OPS events (RC-151) |
| Story-166 | Resort Front Desk | to check a guest in | the stay starts in a ready room | Must | 113 · BR-107 – 132 | 15:00 – 18:00 on the arrival date or an approved late arrival; room not Faulty, Blocked or Pending Cleaning; folio opens, PIN issued (SC-48) | Changed in v06: Deferred → Selected |
| Story-167 | Resort Front Desk | to manage an in-house stay | charges, extensions and moves are recorded | Must | 114 · BR-107 – 132 | Charges on the folio; extend or move only when free for every night (SC-49) | Changed in v06: Deferred → Selected |
| Story-168 | Resort Front Desk | to register vehicles for the stay | the carpark whitelists them | Must | 115 · BR-107 – 132 | IU or OBU format; at most 2; the second S$10 / night; revoked at check-out or cancellation; Membership vehicles shown read-only (SC-48) | Changed in v06: Deferred → Selected |
| Story-169 | Housekeeping | a room board | rooms are turned round in time | Must | 116 · BR-107 – 132 | Pending Cleaning → Cleaning → Ready; history line per change (SC-50) | Changed in v06: Deferred → Selected |
| Story-170 | Housekeeping | to block faulty rooms | no guest gets a room under repair | Must | 117 · BR-107 – 132 | Faulty or Maintenance Blocked with a reason; out of sale and check-in until completion (SC-50) | Changed in v06: Deferred → Selected |
| Story-171 | Resort Front Desk | access credentials for the stay | guests open their door only during the stay | Must | 118 · BR-107 – 132 | Simulated 6-digit PIN for a checked-in stay; regenerate invalidates the old one; deactivated at check-out or cancellation (SC-48, SC-49) | Changed in v06: Deferred → Selected |
| Story-172 | Resort Front Desk | to check a guest out | the stay ends settled | Must | 119 · BR-107 – 132 | Balance 0 first; room Checked-Out then Pending Cleaning; PIN and whitelist ended; receipt (SC-50) | Changed in v06: Deferred → Selected |
| Story-173 | Resort Front Desk | to reverse a check-in or check-out | a mistake can be undone with approval | Must | 120 · BR-107 – 132 | Same day, reason, Manager approves on *Resort exceptions*; prior states restored, both events kept (SC-50) | Changed in v06: Deferred → Selected |
| Story-174 | Operations Manager | Night Audit and the business-day close | the day closes only when clean | Must | 121 · BR-107 – 132 | Blocking exceptions stop the close; warnings listed; day record to the Finance stub (SC-51) | Changed in v06: Deferred → Selected · v07 link: the closed day goes to FIN-OPS and recognises that night's stays (RC-165) |
| Story-175 | Resort Front Desk | resort money handed to Finance | Finance gets one record per event | Must | 122 · BR-107 – 132 | Every deposit, payment, refund, charge, adjustment, credit note and Night Audit day is a Finance stub record `STUB-R…`; no GST or GL in Resorts (SC-46, SC-51) | Changed in v06: Deferred → Selected · **Changed in v07:** FIN-OPS events `FE-…` replace `STUB-R…`; rejections retried (RC-185) |
| Story-176 | Operations Manager | Resorts reports | I see arrivals, occupancy, collections and exceptions | Should | 123 · BR-107 – 132 | HMS-RES-RR-001 – 005 in the Report Catalogue on live data, exportable (SC-51) | Changed in v06: Deferred → Selected |
| Story-177 | Operations Manager | a resort audit log | every action can be traced | Should | 124 · BR-107 – 132 | Read-only search by reservation, room, vehicle, credential or money action; actor is the role tab persona (SC-47, SC-51) | Changed in v06: Deferred → Selected |
| Story-178 | Member | resort notifications | I hear about my reservation | Should | 125 · BR-107 – 132 | 6 configured events to the outbox; a failed notice never undoes the transaction (SC-44) | Changed in v06: Deferred → Selected |
| Story-179 | Presenter | the Resorts pages refined visually | resorts read well in both themes | Should | 164 · — | Resorts pages read well in both themes; Resorts card live (all v06) | Changed in v06: Deferred → Selected |

### 5.1g Finance (built in v07)
Moved from §5.2 (`Deferred to v07`, D-373), one story per feature 129 – 149 in order, plus 165 and 29 (v07). Acceptance in §5a (v07). Each rule keeps its source status (Interim Design, TBC, Proposed, Confirmed, D-371); Interim Design and TBC values are the demo values of D-372 (RC-154 – RC-179).

| ID | As a… | I want… | So that… | Priority | Feature · rules | Acceptance scenarios (§5a) | Flag |
|---|---|---|---|---|---|---|---|
| Story-180 | Finance Officer | a Finance home with the day's events, exceptions, unapplied cash, overdue receivables, the two posting runs and my work queues | I see what needs doing first | Must | 129 · BR-135, 023 | KPI tiles and charts; the 13:00 and 21:00 runs of the day; the Finance availability switch blocks credit checks and holds in-house charges (SC-53) | Changed in v07: Deferred → Selected |
| Story-181 | Finance Officer | one intake register of financial events from every module and the POS file | every event is checked once | Must | 130 · BR-133, 134, 135 | Approved source, new source identity, amount, tax code and reference; source errors returned to the module, Finance errors kept as exceptions (SC-53) | Changed in v07: Deferred → Selected |
| Story-182 | Finance Officer | accounting postings with GST | every accepted event posts balanced | Must | 131 · BR-136, 137, 138 | Approved mapping; every leg; Output GST 9 % as its own leg; debits = credits; up to S$0.01 rounding; unmapped or unbalanced blocked (SC-53) | Changed in v07: Deferred → Selected |
| Story-183 | Finance Officer | to change Finance configuration under maker-checker | no single person changes the money rules | Must | 132 · BR-139 | Draft until the Finance Approver approves; no overlap; prospective from the effective date (SC-62) | Changed in v07: Deferred → Selected |
| Story-184 | Finance Officer | member accounts and receivables | each charge is owed exactly once | Must | 133 · BR-140, 023 | One receivable per positive charge, none for credits, no duplicates; balance, available credit, ageing; Statement of Account with its issue history (SC-54) | Changed in v07: Deferred → Selected |
| Story-185 | Finance Officer | to record payments with a receipt and allocate them | the right bills are settled | Must | 134 · BR-141, 142, 143, 170 | PaymentNo; named bill first, then oldest due; partial; unapplied credit; cheque Pending Clearance; reprint keeps the number (SC-54) | Changed in v07: Deferred → Selected |
| Story-186 | Finance Officer | standing orders and the monthly GIRO collection | subscriptions are collected | Must | 135 · BR-144 | Active, effective, one per membership and type, within the Maximum Debit Amount; bank reference masked (SC-55) | Changed in v07: Deferred → Selected |
| Story-187 | Finance Officer | to apply bank results and recover failures | every collection ends correctly | Must | 136 · BR-145, 146, 147 | Accepted → Payment; rejected kept, not retried; S$10 fee on the second rejection in a month; invalid mandate cancels the order; returned cheque reopens the receivable (SC-55) | Changed in v07: Deferred → Selected |
| Story-188 | Finance Officer | spending credit on the member account | credit is used and expires by policy | Must | 137 · BR-148 | A member-account credit, never a Payment; 24 months; unused balance expires by a non-cash adjustment (SC-57) | Changed in v07: Deferred → Selected |
| Story-189 | Finance Approver | refunds prepared and approved by two people | no money leaves without a checker | Must | 138 · BR-149, 150, 151 | Deposit offsets first; preparer never approves; S$2,000 matrix; settled to each original source, in-house credit restored (SC-56) | Changed in v07: Deferred → Selected |
| Story-190 | Finance Officer | deferred revenue recognised when earned | revenue lands in the right period | Must | 139 · BR-152 | Resort stays per night when Night Audit closes the day; events on delivery; no second GST (SC-51, SC-57) | Changed in v07: Deferred → Selected |
| Story-191 | Finance Officer | entrance-fee amortisation | the fee is spread over the membership term | Must | 140 · BR-153, 154 | Monthly only after a zero-variance reconciliation; stops on death or termination; posted months never rewritten (SC-57) | Changed in v07: Deferred → Selected |
| Story-192 | Finance Officer | reconciliation, clearing and the cashier close | every dollar is accounted for | Must | 141 · BR-154, 155, 156 | Zero tolerance apart from S$0.01; timing items recorded; clearing at zero; cashier close by tender; bank-in batch (SC-58) | Changed in v07: Deferred → Selected |
| Story-193 | Finance Approver | adjustments, reversals and credit-limit overrides approved | corrections are controlled | Must | 142 · BR-157, 158 | Finance-owned errors only; never self-approved; reversal after Yonyou acceptance; override with authority, audited (SC-59) | Changed in v07: Deferred → Selected |
| Story-194 | Finance Approver | financial periods | postings land in the right month | Must | 143 · BR-159 | April – March year; a Closed period refuses postings; a late item goes to the open period with its source date; reopen with a reason (SC-59) | Changed in v07: Deferred → Selected |
| Story-195 | Finance Officer | Yonyou staging runs | only clean lines reach the ERP | Must | 144 · BR-160, 161 | Runs at 13:00 and 21:00 plus ad-hoc; controls rechecked; unique batch; a transport failure retries the same batch (SC-60) | Changed in v07: Deferred → Selected |
| Story-196 | Finance Officer | Yonyou responses | the ledger matches the ERP | Must | 145 · BR-162 | Matched to the batch; ERP document numbers kept; finalised only when reconciled; rejected lines become exceptions; no double resubmission (SC-60) | Changed in v07: Deferred → Selected |
| Story-197 | Finance Officer | one financial exceptions register | blocking issues get an owner and are closed | Must | 146 · BR-163 | Category, owner, age, history; closed only when resolved or recorded as a reconciling item (SC-53, SC-58) | Changed in v07: Deferred → Selected |
| Story-198 | Finance Officer | dunning and collection follow-up | overdue members are chased by policy | Must | 147 · BR-164, 165 | 30 / 60 / 90 / 120 days; a partial payment re-evaluates; hold with a reason; reminders to the outbox; escalation to Membership, never a suspension (SC-61) | Changed in v07: Deferred → Selected |
| Story-199 | Finance Officer | General Accounts Receivable | non-member debtors are invoiced properly | Must | 148 · BR-166, 167, 168, 169 | Active debtor; maker-checker; never edited once issued; linked credit and debit notes; recurring arrangement; due-date ageing; interest off (SC-61) | Changed in v07: Deferred → Selected |
| Story-200 | Finance Approver | Finance reports | I see reconciliation, collections, refunds, deferred revenue and ageing | Should | 149 · BR-031 – 035 | 10 FIN-OPS reports in the Report Catalogue for the Finance roles and the Manager, exportable (SC-62) | Changed in v07: Deferred → Selected |
| Story-201 | Presenter | the Finance pages refined visually | finance reads well in both themes | Should | 165 · — | Finance pages read well in both themes; Finance card live (all v07) | Changed in v07: Deferred → Selected |
| Story-202 | Approver | the Finance stub replaced by FIN-OPS for every module's money | money flows through Finance, never a stub | Must | 29 (v07) · BR-133 – 170; BR-178 retired | Confirm payment records a Payment, Mark payment failed a rejected attempt; every Golf, Events, Facilities and Resorts money step raises a FIN-OPS event with its status (SC-01, 03 – 05, 07, 09, 21, 28, 31, 36, 38, 41, 46, 49, 51) | Changed in v07: Deferred → Selected |

### 5.2 Deferred stories
None. Story-101 – 108 moved to §5.1b in v3; Story-109 – 122 to §5.1c in v4; Story-123 – 135 to §5.1d in v5; Story-136 – 153 to §5.1e in v6; Story-154 – 179 to §5.1f in v7; Story-180 – 202 to §5.1g in v8. No story is deferred (RC-184).

## 5a. Acceptance scenarios (v01, kept; v02 below)
The brief tags S1 – S8 now mark the v02 scenarios (v01's brief keeps its own S1 – S8, `output/full-build/handover/brief.json`).

```gherkin
Feature: CC-Demo Membership and launcher (v01)

Scenario: Member search and 360° profile (Story-001)
  Given member TA10001 exists
  When the Officer searches "TA10001"
  Then one result opens the 360° page with person, membership, contract, relationships, vehicles, cards and history

Scenario: No match changes nothing (Story-001)
  Given no Person is named "Zzz"
  When the Officer searches "Zzz"
  Then "No match" is shown and no record is created or changed

Scenario: Profile change kept with before and after (Story-002, BR-177)
  Given member LB10002 has mobile +65 9000 0002
  When the Officer changes it to +65 9000 0102 and saves
  Then the profile shows +65 9000 0102 and the history shows the old and new value with actor and time

Scenario: Mandatory profile field blocks the save (Story-002, BR-027)
  When the Officer clears the email of LB10002 and saves
  Then the save is refused with "Email is required" and nothing changes

Scenario: Invalid mobile blocks the save (Story-002, BR-171)
  When the Officer enters mobile "12345" and saves
  Then the save is refused with the mobile format message

Scenario: Application saved as draft and edited (Story-003, BR-175)
  Given the Officer starts an application for prospect P-021
  When the Officer saves a draft, then edits the recruitment source
  Then request RQ-xxxx is Draft and its history shows "Draft saved" and the edit

Scenario: Duplicate application blocked (Story-003, BR-002)
  Given P-020 has open application RQ-1001 for ORD-B
  When the Officer submits another ORD-B application for P-020
  Then submission is refused with the duplicate message

Scenario: Under-age applicant blocked (Story-003, BR-003)
  Given P-022 is 19
  When the Officer submits an Ordinary application for P-022
  Then submission is refused with the eligibility message

Scenario: Referral needs referrer details (Story-003, BR-007)
  When the Officer chooses recruitment source Referral without a referrer
  Then the application cannot be saved

Scenario: Missing documents put the request in Pending Documents (Story-003, BR-004)
  Given the photo is not ticked as received
  When the Officer submits the application
  Then the request is Pending Documents

Scenario: Submitted request is read-only (Story-003, BR-175)
  Given request RQ-xxxx is Pending Approval
  When the Officer opens it
  Then no field can be edited and Edit is not offered

Scenario: Application approved with a fee waits for payment (Story-004, BR-029)
  Given application RQ-xxxx for P-021 is Pending Approval with an entrance fee in configuration
  When the Approver, who did not submit it, approves
  Then the request is Awaiting Payment and a Finance stub hand-off is pending for the configured fee

Scenario: Payment recorded activates the membership (Story-004, BR-001, BR-173, BR-174)
  Given the request is Awaiting Payment on 28 Oct 2026
  When the Approver records payment through the Finance stub
  Then a new Active membership gets a Membership ID of 2 initials and 5 digits, starts on 1 Nov 2026, expires after the type's term, gets a contract and a digital card, and the referral reward is raised when CMP-01 is active

Scenario: Portal renewal completes after payment (Story-005, BR-009)
  Given member KD10004 is Active and expires in 40 days
  When the Member requests a 2-year renewal in the portal, an Approver approves and records payment
  Then the expiry moves out by 2 years

Scenario: Renewal over the 30-year cap is blocked (Story-005, BR-008)
  Given member TH10008 has 29 years of combined Associate and Ordinary duration
  When a 2-year renewal is submitted
  Then it is refused with the 30-year message

Scenario: Failed payment keeps the renewal waiting (Story-005, BR-006)
  Given a renewal is Awaiting Payment
  When the Approver records payment failed
  Then the request stays Awaiting Payment and the history shows "Payment failed – not completed"

Scenario: Full to Basic doubles the remaining months (Story-006, BR-010)
  Given WE10005 is Ordinary Full with 15 months left
  When the conversion to Basic completes
  Then 30 months remain

Scenario: Transfer changes the holder and keeps lineage (Story-007, BR-011)
  Given LG10007 is Ordinary Full and P-023 is eligible
  When the transfer completes
  Then P-023 holds the membership and transferredFrom shows the previous holder

Scenario: Corporate membership cannot be transferred (Story-007, BR-011)
  When the Officer starts a transfer of a Corporate membership
  Then submission is refused

Scenario: Extension over 12 months goes to the Manager (Story-008, BR-012)
  When the Officer submits an 18-month extension for CF10006
  Then it appears in the Manager's inbox and not the Approver's

Scenario: Extension over 24 months is blocked (Story-008, BR-012)
  When the Officer submits a 30-month extension
  Then it is refused

Scenario: Withdrawal completes only after the balance is cleared (Story-009, BR-013)
  Given SM10013 has S$420 outstanding and a withdrawal is approved
  When the Approver records the balance cleared through the Finance stub
  Then the status is Withdrawn and no refund is raised

Scenario: Lifecycle check expires a membership past its expiry (Story-010, BR-014)
  Given ON10014 is Active with an expiry before 28 Oct 2026
  When the Officer runs the lifecycle check
  Then ON10014 is Expired and its supplementary OO10015 is Ended

Scenario: Rejoin keeps the original Membership ID (Story-010, BR-014)
  Given ON10014 is Expired
  When a rejoin is approved and paid
  Then the membership is Active with Membership ID ON10014

Scenario: Goodwill refund goes to Finance only after the Manager approves (Story-011, BR-015)
  Given a deceased case for YL10012 proposes a goodwill refund
  When the Manager approves
  Then the case completes with status Deceased and a goodwill refund hand-off is pending

Scenario: Absent period pushes the expiry out (Story-012, BR-016)
  When a 6-month absent period for HJ10010 completes
  Then the status is Absent, privileges are off and the expiry is 6 months later

Scenario: Overlapping absent period blocked (Story-012, BR-016)
  Given GI10009 has an approved absent period
  When an overlapping period is submitted
  Then it is refused

Scenario: Medical period keeps the expiry (Story-013, BR-017)
  When a 6-month medical period completes
  Then the status is Medical and the expiry is unchanged

Scenario: Medical period over 12 months blocked (Story-013, BR-017)
  When a 14-month medical period is submitted
  Then it is refused

Scenario: Ended absent period returns the membership to Active (Story-014, BR-016)
  Given GI10009's absent period ended before 28 Oct 2026
  When the Officer runs the lifecycle check
  Then GI10009 is Active with privileges on

Scenario: Suspension turns privileges off and billing on (Story-015, BR-019)
  When the Manager approves a suspension of LK10011
  Then the status is Suspended, privileges are off and billing is on

Scenario: Invalid status transition is blocked (Story-016, BR-018)
  Given PA10023 is Expired
  When a suspension is submitted for PA10023
  Then it is refused by the transition matrix

Scenario: Supplementary needs an active principal (Story-017, BR-020)
  When a supplementary is submitted under an Expired principal
  Then it is refused

Scenario: Supplementary ends with its principal (Story-017, BR-020)
  Given OO10015's principal ON10014 has expired
  When the lifecycle check runs
  Then OO10015 is Ended

Scenario: Junior reaching 21 is ended by the lifecycle check (Story-018, BR-021)
  Given junior LP10016 is 21
  When the lifecycle check runs
  Then LP10016 is Ended and junior NQ10017 is on the watch list

Scenario: Corporate creation is for the Administrator only (Story-019, BR-022)
  When the Officer opens New corporate membership
  Then the action is not offered

Scenario: Nominee limit blocks one more nominee (Story-019, BR-022)
  Given SL10019 is Group D with 1 nominee
  When a second nominee is submitted
  Then it is refused

Scenario: Classification gets its end date from configuration (Story-020, BR-005)
  When an Honorary classification for CT10020 completes
  Then the classification ends on the date the configuration gives

Scenario: Contract shows terms and Spending Credit Granted never changes (Story-021, BR-023)
  When the Officer opens LB10002's contract
  Then entrance fee, subscription, In-House Credit Limit and Spending Credit Granted are shown in SGD, and Spending Credit Granted cannot be edited

Scenario: Available credit is limit minus Finance outstanding (Story-022, BR-023)
  Given LB10002 has a limit of S$5,000 and S$1,200 outstanding
  When the Officer checks credit
  Then available credit is S$3,800

Scenario: Credit check blocked when Finance is unavailable (Story-022, BR-023)
  Given the Finance stub is set to unavailable
  When the Officer checks credit
  Then the check is blocked with "Finance balance unavailable"

Scenario: Fifth vehicle is blocked (Story-023, BR-024)
  Given LB10002 has 4 active vehicles
  When a fifth vehicle is registered
  Then it is refused

Scenario: Replacement voids the previous card (Story-024, BR-025)
  When the Officer replaces LB10002's card
  Then the old card is Void and the new card is the digital primary

Scenario: Referral reward needs an active campaign (Story-025, BR-030)
  Given no referral campaign is active
  When a referred application completes
  Then no reward is raised

Scenario: Marketing campaign excludes non-consenting persons (Story-026, BR-026)
  Given 3 members withheld marketing consent
  When the Officer sends a marketing campaign
  Then the outbox has no message to those 3

Scenario: Referenced value can be inactivated but not deleted (Story-027, BR-028)
  Given membership type FAM is used by memberships
  When the Administrator deletes it
  Then deletion is refused and Inactivate is offered

Scenario: Member tab shows only its own account (Story-028, BR-085)
  Given a Member tab for KD10004 opened from the launcher
  When it opens the portal
  Then only KD10004's membership, requests and card are shown, with no picker

Scenario: Submitter cannot approve their own request (Story-029, BR-005)
  Given an Approver submitted request RQ-xxxx
  When the Approver opens it in the inbox
  Then Approve, Reject, Return and Record payment are not offered

Scenario: Return for correction needs a reason and reopens the request (Story-029, BR-176, BR-175)
  Given RQ-xxxx is Pending Approval
  When the Approver returns it without a reason
  Then it is refused; with a reason the request is Pending Documents and editable by its submitter

Scenario: Reject needs a reason (Story-029, BR-176)
  When the Approver rejects without a reason
  Then the rejection is refused

Scenario: Only an Approver records stub payments (Story-030, BR-178)
  Given a request is Awaiting Payment
  When the Officer opens it
  Then Record payment is not offered

Scenario: Stub payment failure keeps the request waiting (Story-030, BR-006)
  When the Approver records payment failed
  Then the hand-off is Failed and the request stays Awaiting Payment

Scenario: Dashboard tiles match the data (Story-031)
  When the Manager opens the dashboard
  Then the tiles show the counts of members by status, pending approvals, awaiting payment and expiring in 90 days that the lists show

Scenario: Completed request writes status feed entries (Story-032, BR-177)
  When a suspension completes
  Then the integration feed shows one entry each for Access Control, GMS and HMS, marked stub

Scenario: Launcher opens a role in its own tab (Story-033, BR-084)
  When the Presenter opens Approver from the launcher
  Then a tab named ccdemo-approver opens on the Approver's home

Scenario: Page not for the tab's role shows no content (Story-034, BR-084)
  Given a Member tab
  When it opens the approval inbox address
  Then the page shows only who it is for and a link to the launcher

Scenario: Page opened without the launcher asks to use it (Story-034, BR-084)
  When a page is opened directly from the file system
  Then it shows "Open this page from the launcher"

Scenario: Module details list the Membership scenarios with Start links (Story-035)
  When the Presenter opens the Membership module details
  Then its workflow steps, roles, rules and SC-01 – SC-11, SC-63, SC-64 are listed, each with Start

Scenario: Planned module cards have no links (Story-036)
  When the Presenter views the Golf card
  Then it is greyed out with "Coming in v03" and has no Start, guide or role links

Scenario: Launcher sections collapse with the first visible one open (Story-037)
  When the launcher opens
  Then each section shows its title and a one-line summary, and only the first visible section is open

Scenario: CC-Demo name everywhere (Story-037)
  When any page opens
  Then the header and tab title read CC-Demo and no visible text reads NSRCC

Scenario: Start link opens the guide at step 1 in the right tab (Story-038)
  When the Presenter clicks Start on SC-01
  Then the Officer tab opens the new application page with the guide panel at step 1 of SC-01

Scenario: Export then import restores the data (Story-039)
  Given the Presenter exported the data and then changed a member's mobile
  When the exported file is imported
  Then the mobile is back to its exported value

Scenario: Wrong file is refused (Story-039)
  When a JSON file with another storage key is imported
  Then it is refused and nothing changes

Scenario: Reset restores the seed (Story-039)
  When the Presenter resets the demo data
  Then every record equals seed.json
```

### 5a (v02). Club Reporting acceptance scenarios

```gherkin
Feature: CC-Demo Club Reporting (v02)

Scenario: Catalogue shows only the role's reports (Story-103, BR-031)
  Given the access rules of v02
  When the Officer opens Reports
  Then MMS-RR-001, 003, 004, 005, 006 and 008 are listed with what each answers and its owning module
  And MMS-RR-002 and the audit review MMS-RR-007 are not listed

Scenario: Golf reports are listed as coming in v03 (Story-103)
  When the Manager opens Reports
  Then all 8 Membership reports can be opened
  And the 12 golf reports GMS-RR-001 – 012 show "Coming in v03" with no Open

Scenario: Report pages are blocked for roles without reports (Story-103, Story-034, BR-084)
  Given a tab for the Approver
  When it opens the Reports page
  Then only the blocked panel is shown

Scenario: Output is limited to the criteria (Story-104, BR-032)
  Given memberships of several types
  When the Manager runs MMS-RR-001 with membership type ORD-F
  Then every row has type ORD-F and the row count matches

Scenario: Missing required parameter blocks the run (Story-104, BR-032)
  When the Manager runs MMS-RR-004 with the period From left empty
  Then the run is refused with the BR-032 message naming the period
  And no run is added to the run history

Scenario: No match returns a valid empty result (Story-104, BR-033)
  When the Manager runs MMS-RR-003 for a period in which no membership expires
  Then "No records match" is shown without an error

Scenario: A run changes nothing and is kept in the run history (Story-104, BR-033)
  When the Manager runs three reports
  Then the run history lists the three runs with report, parameters, run by, run at and row count
  And no membership, person or request has changed

Scenario: Operational membership listing (Story-101, MMS-RR-001)
  When the Officer runs MMS-RR-001 with status Active
  Then each active membership is listed with Membership ID, name, type, status and expiry

Scenario: Membership statistics and trends (Story-101, MMS-RR-002)
  When the Manager runs MMS-RR-002 for 2026
  Then counts by type and status and a monthly trend of joins and exits are shown with KPI tiles and a chart

Scenario: Approaching expiry lists the memberships in the period (Story-101, MMS-RR-003)
  Given the demo date 28 Oct 2026
  When the Manager runs MMS-RR-003 for the next 90 days
  Then TH10008 (1 Dec 2026), KD10004 (7 Dec 2026) and EE10018 (31 Dec 2026) are listed with renewal outcome so far

Scenario: Status distribution and transitions (Story-101, MMS-RR-004)
  When the Manager runs MMS-RR-004 from 1 Aug 2026
  Then current status counts and each transition in the period with from, to, date and actor are shown

Scenario: Juniors near the age limit (Story-101, MMS-RR-005, BR-021)
  When the Officer runs MMS-RR-005 with a 12-month look-ahead
  Then junior memberships whose holder turns 21 in the period are listed with the date

Scenario: Recruitment and referral by source (Story-101, MMS-RR-006)
  When the Officer runs MMS-RR-006 for 2026
  Then applications and members are grouped by recruitment source, with referrer where there is one

Scenario: Vehicles and credentials (Story-101, MMS-RR-008)
  When the Officer runs MMS-RR-008 for LB10002
  Then its current vehicles, car-label history and card issue and replacement history are shown

Scenario: Audit review shows actor, time and outcome (Story-101, MMS-RR-007, BR-031)
  When the Manager runs MMS-RR-007 for October 2026
  Then each material action is listed with action, actor, role, timestamp, record and outcome

Scenario: Excel export carries the same rows (Story-102, BR-034)
  Given the Officer has generated MMS-RR-003 for the next 90 days
  When the Officer exports it to Excel
  Then an .xls file downloads with the same columns and rows as the screen
  And the export is recorded with format, file name, by, at and row count

Scenario: PDF export opens the print layout (Story-102, BR-034)
  Given a generated MMS-RR-001
  When the Officer exports it to PDF
  Then the print layout of the same rows opens in the browser's print dialog

Scenario: Audit review has no export (Story-102, BR-034)
  Given the Manager has generated MMS-RR-007
  Then no Export action is shown

Scenario: Granting a report changes the role's catalogue (Story-107, BR-031)
  When the Administrator grants MMS-RR-002 to the Officer
  Then the Officer's catalogue lists MMS-RR-002
  And the change is in the audit trail with before and after

Scenario: Audit review cannot be granted to the Officer (Story-107, BR-031)
  When the Administrator grants MMS-RR-007 to the Officer
  Then the change is refused with the BR-031 message and nothing changes

Scenario: New definition version keeps earlier runs on their version (Story-105, BR-035)
  Given the Administrator saved "Expiring Ordinary members" v1 on MMS-RR-003 and the Manager ran it
  When the Administrator saves v2 with another filter and a new effective date
  Then the catalogue shows v2
  And the earlier run in the run history still shows v1

Scenario: Definition cannot widen access (Story-105, BR-035)
  When the Administrator grants "Expiring Ordinary members" to the Approver
  Then the save is refused with the BR-035 message, because the Approver cannot run MMS-RR-003

Scenario: Inactivated definition leaves the catalogue and keeps its history (Story-105, BR-035)
  Given "Expiring Ordinary members" is active with an earlier run
  When the Administrator inactivates it
  Then it is no longer in the catalogue
  And the definition and its earlier run stay in the history

Scenario: Management dashboard shows KPI tiles and charts (Story-105, feature 150)
  When the Manager opens the management dashboard
  Then 4 KPI tiles and its charts are drawn from the current data

Scenario: Legacy name resolves to its successor report (Story-106)
  When the Officer searches "Member Listing By Expiry Date"
  Then it shows MMS inventory, disposition "Approved requirement" and a link that opens MMS-RR-003

Scenario: Golf successor is coming in v03 (Story-106)
  When the Officer searches "Absentee List"
  Then it shows GMS-RR-005 with "Coming in v03" and no run link

Scenario: Finance-owned name points to the Finance module (Story-106)
  When the Officer searches "Billing Chit report"
  Then it shows "Finance-owned", owner Finance module (v07) and no report

Scenario: Each report shows KPI tiles and a chart in both themes (Story-108, feature 150)
  When any Membership report is generated in the light and in the dark theme
  Then up to 4 KPI tiles and one chart are shown and readable in both

Scenario: Club Reporting card is live with Start links (Story-108, Story-035, Story-036)
  When the Presenter opens the launcher
  Then the Club Reporting card is live with its scenarios and Start links
  And Golf, Events, Facilities, Resorts and Finance show "Coming in v0N"

Scenario: Dashboard panels link to the reports (Story-108, Story-031)
  Given a Manager tab
  When the Manager follows "Expiring in 90 days" on the Dashboard
  Then MMS-RR-003 opens with the 90-day period filled in
```

### 5a (v03). Golf acceptance scenarios

All times on the fixed demo clock, Wed 28 Oct 2026 11:55 (D-285). Golfers are existing members; the golfer profile adds gender, handicap index, NSRCC PC and insurance.

```gherkin
Feature: CC-Demo Golf (v03)

Scenario: Published tee sheet follows the configuration (Story-110, BR-036)
  Given the golf settings for Kranji (intervals, AM and PM sessions, 9-hole period)
  When the Administrator generates and publishes the Kranji tee sheet for a weekday
  Then tee times are listed per session at the configured interval
  And 9-hole play is offered only in the weekday 07:01 – 07:57 period

Scenario: No 9-hole play on a weekend morning (Story-110, BR-036)
  When the Administrator publishes a Saturday tee sheet
  Then no morning tee time offers 9 holes

Scenario: Blocked tee times cannot be booked (Story-118, BR-057)
  Given a Changi morning blocked for maintenance with its reason and source
  When Golf Operations or a Member tries to book a blocked tee time
  Then the booking is refused and the tee sheet shows the reason and source

Scenario: A released block goes to the waitlist first (Story-118, BR-057, BR-044)
  Given a waiting entry that fits a blocked tee time
  When Golf Operations releases the block
  Then the tee time is offered to that entry before it opens to everyone

Scenario: Member books a weekday flight with a guest (Story-111, BR-037 – 043)
  Given Member D. Koh (KD10004, Ordinary Basic, Active)
  When D. Koh books a weekday Changi tee time for a flight of 2 with a guest who holds a handicap
  Then the booking is Confirmed with D. Koh as the guest's responsible payer
  And a confirmation is in the outbox

Scenario: Basic Member cannot book a weekend independently (Story-111, BR-041)
  When D. Koh tries to book a Saturday tee time as main booker
  Then the booking is refused with the BR-041 message

Scenario: Flight size and guest limits are enforced (Story-111, BR-039, BR-042)
  When a flight of 1 or a 4th guest is booked
  Then each is refused with its rule message

Scenario: Online booking closes 2 hours before tee-off (Story-111, BR-037)
  When D. Koh tries to book a tee time less than 2 hours after the demo clock
  Then the booking is refused online
  And Golf Operations can still book it at the counter

Scenario: One session per golfer per day (Story-111, BR-038)
  Given a golfer with a booking today
  When another booking for the same day is made for that golfer
  Then it is refused unless a Manager approves a second 18-hole round with a reason

Scenario: Golfers are the existing members (Story-111, BR-040)
  When a booking is made for a member
  Then the booking references the member's person and membership
  And no new person or membership record is created

Scenario: Released capacity goes to the earliest entry that fits (Story-112, BR-044)
  Given a full tee time with waiting entries for a party of 4, then a party of 2
  When a 2-golfer booking is cancelled with more than 72 hours' notice
  Then no charge is raised
  And the party of 4 is skipped and the party of 2 gets a 15-minute offer

Scenario: An expired offer moves to the next entry (Story-112, BR-044)
  Given an open offer
  When Golf Operations uses Let offer expire
  Then the offer is Expired and the next fitting entry is offered, else the tee time opens

Scenario: Accepting an offer confirms the booking (Story-112)
  When the offered party accepts within the hold
  Then a Confirmed booking is created and the entry is Accepted

Scenario: Substitution and course change carry their fees (Story-113, BR-045)
  When Golf Operations substitutes an eligible player and moves a booking to Kranji with equivalent capacity
  Then the substitution fee and the course-change fee are raised as golf charges
  And the old tee time is released to the waitlist

Scenario: Late cancellation is charged (Story-113, BR-046)
  When a booking is cancelled with less than 72 hours' notice
  Then the late-cancellation charge is raised on the main booker

Scenario: The requester cannot approve their own waiver (Story-113, BR-047)
  Given a waiver request raised by Golf Operations
  When the Manager approves it with a reason
  Then the charge is waived and the reason kept
  And the requester has no Approve action

Scenario: Release to play only when every check passes (Story-114, BR-048, BR-049, BR-050)
  Given today's Changi flight checking in at least 15 minutes before tee-off
  When a golfer without insurance buys day insurance, a guest without proof pays the sign-in rate and each declares 9 or 18 holes
  Then the flight is released to play once every charge is accepted

Scenario: A suspended member cannot check in (Story-114, BR-040)
  Given YB10024 is Suspended in Membership
  When Golf Operations checks the golfer in
  Then check-in is refused with the BR-040 message

Scenario: Check-in closes 15 minutes before tee-off (Story-114, BR-048)
  When a golfer checks in less than 15 minutes before tee-off
  Then they go to the late-arrival treatment

Scenario: Late golfer is rescheduled (Story-115, BR-051)
  Given a late golfer and a free later tee time
  When Golf Operations handles the late arrival
  Then the golfer moves to the later tee time

Scenario: No later tee time and no join-in gives a no-show (Story-115, BR-051, BR-047)
  Given a late golfer, no free later tee time and join-in refused
  When Golf Operations records the outcome
  Then the booking is No-show with the no-show charge on the responsible payer
  And a waiver request rejected by the Manager keeps the charge

Scenario: Suspension issues rain checks or the refund path (Story-116, BR-052, BR-053, BR-054)
  Given golfers on Changi who had not teed off, who were mid front nine, and 18-hole golfers who cannot cross over
  When the Manager suspends Changi for lightning
  Then golfers who had not teed off get the refund path
  And the others get a 9-hole rain check valid 1 month, not transferable

Scenario: Only an authorised role suspends a course (Story-116, BR-052)
  When Golf Operations opens a course
  Then there is no Suspend action

Scenario: Rain check extension needs approval (Story-116, BR-047, BR-054)
  When the Manager extends a rain check with a reason
  Then the new expiry is kept with the approver and reason

Scenario: 9-hole rain check on an 18-hole booking pays the top-up (Story-116, BR-055)
  When a golfer applies a 9-hole rain check to an 18-hole booking
  Then only the top-up is charged and the rain check is Reserved, then Redeemed when played

Scenario: Faulty extract rows become exceptions (Story-117, BR-056)
  Given the sample handicap extract with 2 faulty rows
  When the Administrator stages and validates it
  Then the 2 rows are exceptions and the rest become effective
  And the previous values stay in history

Scenario: External PC does not count (Story-117, BR-043)
  When the Administrator adds a PC from another club
  Then it is refused; an NSRCC PC is accepted and changes the golfer's eligibility

Scenario: Every golf charge has a rate, a payer and a Finance status (Story-119, BR-058, BR-059)
  When charges are raised at check-in
  Then each comes from the rate table with a responsible payer
  And each is handed to the Finance stub with status pending, accepted or rejected
  And GMS stores no balance

Scenario: Shift close keeps open items flagged (Story-120, BR-060)
  Given the day's bookings, charges, a rejected Finance hand-off and a pending waiver
  When Golf Operations closes the day
  Then counts and totals come from GMS records
  And the rejected hand-off and the pending waiver stay flagged
  And GMS-RR-011 shows the same figures

Scenario: Golfer and tee sheet enquiry (Story-121)
  When Golf Operations searches a golfer
  Then their bookings, waitlist entries, rain checks and eligibility are shown read-only

Scenario: Golf reports run on the live golf records (Story-109, BR-031, BR-034)
  When Golf Operations runs GMS-RR-001 for Changi on 28 Oct 2026 and exports it
  Then the rows match the tee sheet and the Excel export carries the same rows
  And GMS-RR-010 is not listed for Golf Operations and has no Export for the Manager

Scenario: Golf card is live and Module details opens its tab (Story-122, Story-035, Story-036)
  When the Presenter clicks Module details on the Golf card
  Then the Golf tab of Module details is selected, the section is open and scrolled into view
  And clicking it again keeps the section open
  And Events, Facilities, Resorts and Finance show "Coming in v0N"

Scenario: Golf pages read well in both themes (Story-122, feature 161)
  When any golf page is shown in the light and in the dark theme
  Then text, badges and the tee sheet meet WCAG 2.2 AA contrast
```

### 5a (v04). Events acceptance scenarios

All times on the fixed demo clock, Wed 28 Oct 2026 11:55. Participants are existing members (and their dependants) or non-member account holders.

```gherkin
Feature: CC-Demo Events (v04)

Scenario: An incomplete event cannot be published (Story-123, BR-061)
  Given draft EV-08 without rates
  When the Events Team publishes it
  Then publishing is refused, naming the missing items
  And after completing it, it is published with no approval

Scenario: Only the Events Team configures and publishes (Story-123, BR-061)
  When a Golf Operations tab opens the event setup page
  Then only the blocked panel is shown

Scenario: A price change applies only to new registrations (Story-133, BR-081, BR-064)
  Given confirmed registrations at the old rate
  When the Events Team raises the member adult rate
  Then confirmed registrations keep their frozen rate and new ones get the new rate

Scenario: Capacity cannot go below committed places (Story-133, BR-082)
  When the Events Team sets the capacity below confirmed + held + offered places
  Then the change is refused with the committed count

Scenario: An event completes after its last session (Story-133, BR-083)
  Given an event whose last session ended before the demo clock
  Then the schedule shows it as Completed, with no manual close

Scenario: The schedule shows events by date with confirmed against minimum (Story-134)
  When the Events Team opens the schedule
  Then each event shows its sessions, status, confirmed / capacity and minimum

Scenario: Member registers themself and a junior dependant (Story-124, BR-063, BR-064, BR-072)
  Given Member A. Tan (TA10001) and a junior dependant
  When A. Tan registers both for the paid family workshop and pays (stub)
  Then the registration is Confirmed at the member adult and member child rates
  And each participant gets a QR credential
  And the payment is a Finance stub hand-off, Accepted

Scenario: An ineligible participant refuses the whole group (Story-124, BR-063, BR-065)
  When a member registers a group that includes someone not eligible for a members-only event
  Then the whole registration is refused and nothing is held

Scenario: A closed window refuses registration (Story-124, BR-062)
  When a member registers for an event whose window has closed
  Then registration is refused with the window

Scenario: A non-member registers for an open event (Story-124, BR-063)
  Given a non-member account holder
  When they register for an event open to non-members
  Then they pay the non-member rate and get a QR credential
  And a members-only event is refused

Scenario: An expired hold releases the places (Story-124, BR-067)
  Given a held paid registration
  When the hold is let expire
  Then the registration lapses and the places are free again

Scenario: Counter registration on the member account (Story-125, BR-068, BR-023)
  Given Finance balances are available
  When Golf Operations as CSO registers a member and a guest and charges the member account
  Then the registration is Confirmed and the charge is Accepted by the Finance stub

Scenario: A declined payment releases the held places (Story-125, BR-067, BR-068)
  When the counter payment is declined
  Then the registration lapses and the places are released

Scenario: Whole groups join the waitlist without payment (Story-126, BR-069)
  Given a full event with the waitlist on
  When a group of 3 and then a single join
  Then both are Waitlisted with no payment

Scenario: A freed place skips a group that does not fit (Story-126, BR-070)
  Given a group of 3 waiting before a single
  When one confirmed place frees up
  Then the group of 3 keeps its priority and the single is offered the place

Scenario: An offer passes on when it expires (Story-126, BR-071)
  Given an open offer
  When it is let expire
  Then the next fitting entry is offered, else the place returns to general registration

Scenario: Changing a waitlisted group resets its join time (Story-126, BR-070)
  When a waitlisted group changes its participants
  Then its join time is reset to now

Scenario: A participant cancellation forfeits the amount (Story-129, BR-077)
  Given a confirmed paid participant
  When they cancel
  Then the amount is forfeited, the QR credential is void and the place goes to the waitlist

Scenario: QR check-in records attendance once per session (Story-128, BR-073)
  Given today's EV-04 session with confirmed registrations
  When the Events Team checks in a participant's code, then the same code again
  Then the first is Attended and the second is refused as a duplicate
  And a cancelled or wrong-session code is refused

Scenario: Manual check-in only against a confirmed registration (Story-128, BR-074)
  When the Events Team checks in a participant without a code
  Then it needs a confirmed registration, and the staff member and reason are kept

Scenario: Personnel attendance is separate (Story-128, BR-075)
  When the instructor's attendance is recorded
  Then it is kept apart and does not use participant capacity

Scenario: Below the minimum, the Events Team decides (Story-127, BR-076)
  Given EV-05 with 3 confirmed against a minimum of 10
  Then it is flagged below minimum and is never cancelled automatically

Scenario: Club cancellation needs the Events Manager to authorise refunds (Story-130, BR-078)
  When the Events Team cancels EV-05 and proposes refunds
  Then the registrations are cancelled and the refunds wait for the Manager
  And the Manager authorises one full and one partial refund with a reason
  And only then do they go to the Finance stub
  And the proposer has no Authorise action

Scenario: Rescheduling lets participants keep or decline (Story-131, BR-079)
  When the Events Team moves a session of EV-06
  Then one participant keeps the place and one declines
  And the declining participant's refund needs the Manager's authorisation
  And the freed place is offered to the waitlist

Scenario: Only a confirmed function-room message confirms the room (Story-132, BR-080)
  When the Events Team applies the feed: tentative, confirmed, amended, unknown reference, cancelled
  Then tentative stays tentative, confirmed confirms the room, amended updates it, the unknown reference changes nothing and cancelled is reflected
  And each message appears in the integration feed

Scenario: Participants are the existing members (Story-124)
  When a member registers a dependant
  Then the registration references the existing person and membership
  And no new person or membership is created

Scenario: Export XLS from the Report Catalogue (Story-102, 103, BR-034)
  When the Officer clicks XLS on MMS-RR-003 in the catalogue
  Then the report runs with its default parameters, the .xls file downloads, and the run and its export are recorded

Scenario: Export PDF from the Report Catalogue (Story-102, 103, BR-034)
  When the Officer clicks PDF on MMS-RR-001 in the catalogue
  Then the report page opens with that run's result and the print dialog, and the export is recorded

Scenario: Reports not designated for export keep their badge (Story-103, BR-034)
  When the Manager opens the catalogue
  Then MMS-RR-007 and GMS-RR-010 show "On screen" with no export buttons

Scenario: Events card is live (Story-135, Story-036)
  When the Presenter opens the launcher
  Then the Events card is live with its scenarios, the Events Team role and the non-member accounts
  And Facilities, Resorts and Finance show "Coming in v0N"

Scenario: Events pages read well in both themes (Story-135, feature 162)
  When any event page is shown in the light and in the dark theme
  Then text and badges meet WCAG 2.2 AA contrast
```

### 5a (v05). Facilities acceptance scenarios

All times on the fixed demo clock, Wed 28 Oct 2026 11:55. Customers are existing members (and their dependants), non-member account holders, SAFRA members by card number, or guests with a member host.

```gherkin
Feature: CC-Demo Facilities (v05)

Scenario: Counter booking checks every rule, then confirms on payment (Story-136, 137, 138, 142, BR-086 – 092)
  Given Facilities Staff F. Tan and Member A. Tan (TA10001)
  When F. Tan books Tennis Court 1 on Saturday 31 Oct 2026 at 08:00 for 1 hour
  Then the weekend member rate is shown and frozen
  And the booking stays Pending payment until the card payment succeeds
  And then it is Confirmed with a reference FB-… and a receipt, and the payment is on the Finance stub

Scenario: A SAFRA member cannot book Billiards (Story-136, BR-086)
  When F. Tan books Billiards for SAFRA card SF-0001
  Then the booking is refused: SAFRA members may not book Billiards

Scenario: Booking limits are enforced (Story-138, BR-087, BR-089, BR-090)
  When F. Tan books beyond the member window, Billiards for 4 hours, or an occupied court
  Then each is refused with its rule

Scenario: A declined payment reserves nothing (Story-142, BR-092)
  When the payment is declined
  Then no booking is confirmed and the slot stays free

Scenario: Only an Active member gets the member rate (Story-136, BR-086)
  Given a member whose membership is Suspended
  When F. Tan books Tennis for them
  Then no member privilege or rate applies

Scenario: Member books online on a public holiday and extends it (Story-138, 139, BR-091, BR-093)
  Given Member A. Tan in the Portal
  When they book Squash on the public holiday
  Then the weekend rate applies
  When they extend it by one hour
  Then the difference is paid first and the booking keeps its reference

Scenario: An amendment that fails keeps the original (Story-139, BR-093)
  When the new slot is taken or the extra payment is declined
  Then the original booking stays unchanged

Scenario: Cancellation refund follows the 24-hour rule (Story-140, BR-094, BR-095)
  When A. Tan cancels Pickleball 3 days ahead with a reason
  Then a full refund instruction goes to the Finance stub
  When A. Tan cancels Karaoke starting in 5 hours
  Then no refund is due and the slot is released

Scenario: A block over a booking flags it; the club moves it (Story-137, 140, BR-088, BR-095)
  Given Tennis Court 2 booked tomorrow
  When F. Tan blocks Court 2 for maintenance with a reason
  Then the block is saved and the booking is flagged, never removed
  And no new booking is possible on Court 2 in that period
  When F. Tan moves the booking to Court 3 as club-initiated
  Then the flag clears and no refund is due

Scenario: An exceptional refund needs the Operations Manager (Story-140, BR-096)
  Given a booking cancelled less than 24 hours ahead
  When F. Tan requests an exceptional refund with a reason
  Then the Manager approves it in Approvals with a reason
  And only then does the refund instruction go to the Finance stub

Scenario: The requester cannot approve their own exceptional refund (Story-140, BR-096)
  When the Facilities Staff tab opens Approvals
  Then only the blocked panel is shown

Scenario: No-show after the start, no refund (Story-141, BR-097)
  Given a confirmed booking that started 2 hours ago
  When F. Tan records a no-show
  Then the booking is No-show with no standard refund

Scenario: Waiting list offers in join order (Story-148, BR-104)
  Given Saturday 19:00 Karaoke is full and J. Ho, B. Lim and P. Rao (NM-02) are waiting in that order
  When J. Ho withdraws and a Karaoke booking is cancelled
  Then B. Lim is offered the room for 2 hours
  When the offer is let expire
  Then P. Rao is offered it, accepts and pays (stub), and the booking is Confirmed

Scenario: Pool admission within capacity and fees (Story-143, BR-098)
  When F. Tan admits a member (free) and a guest (S$5 paid) to the pool
  Then occupancy rises by 2
  When occupancy is 60 / 60
  Then the next admission is refused

Scenario: Fitness Centre entitlement and day passes (Story-144, BR-099, BR-100)
  When F. Tan admits a member and a bungalow guest with visitor pass VP-01
  Then both are admitted, the guest free of charge, the pass shown as HMS Resorts (simulated)
  And the expired pass VP-02 is refused
  When a non-member buys a day pass, leaves and re-enters the same day
  Then re-entry needs no new charge, and yesterday's day pass DP-… is refused

Scenario: Swimming lessons are run by Events (Story-143)
  When F. Tan opens the lesson enquiry on the pool page
  Then a link opens the Events schedule

Scenario: Bowling sale needs a receipt number (Story-145, BR-101)
  When F. Tan records a bowling sale without a receipt number
  Then it is refused
  When the receipt number is added and the payment succeeds
  Then the transaction is Paid and on the Finance stub

Scenario: Reconciliation matches and lists exceptions (Story-146, 147, BR-102, BR-103)
  When F. Tan imports the sample Bowling export of 8 rows
  Then 4 records reconcile and lock, and 4 exceptions open: duplicate, no CMS record, amount mismatch, method mismatch
  And an exception closes only with a disposition and reason, or after escalation to the Finance stub, or after a correction and re-run

Scenario: Configuration is Draft until approved (Story-149, BR-105, BR-091)
  When the Administrator raises the Tennis weekend member rate
  Then it is saved as Draft and new bookings keep the old rate
  And the Billiards 1 – 3 hour limit cannot be changed
  When the Manager approves the change
  Then new bookings use the new rate and confirmed ones keep theirs

Scenario: Fitness Centre reference lists (Story-150)
  When the Administrator adds a treadmill and deactivates an instructor
  Then the instructor cannot be assigned to Personal Training

Scenario: Personal Training only for eligible members (Story-151, BR-106)
  When F. Tan creates a PT session for a member
  Then it is Pending policy, then Confirmed after the eligibility check, with "Policy TBC" for price and cancellation
  And a PT session for a non-member is refused

Scenario: Facilities reports run on live data and export (Story-152, BR-031 – 034)
  When the Manager runs HMS-FAC-RR-004 Facility utilisation and HMS-FAC-RR-002 Cancellations and no-shows for this week
  Then each shows the live Facilities records, or "No records" for an empty period
  And the Export as PDF and XLS buttons export them, recorded as runs

Scenario: Only permitted roles see the Facilities reports (Story-152, BR-031)
  When the Officer opens the Report Catalogue
  Then the Facilities reports are not listed

Scenario: Event venue from Facilities blocks the venue (Story-123, 137, BR-088)
  When the Events Team adds a published session at the Swimming Pool
  Then the pool has an Event block for that session and a booking in the slot is flagged
  And the event pages link the venue to its facility

Scenario: Customers see only their own bookings (Story-138, BR-085)
  When a Member tab opens another customer's booking
  Then it is not shown

Scenario: Facilities pages read well in both themes (Story-153, feature 163)
  When any Facilities page is shown in the light and in the dark theme
  Then text and badges meet WCAG 2.2 AA contrast
```

### 5a (v06). Resorts acceptance scenarios

Resort pages run on the **Front desk time** switch (15:30 arrivals, 09:30 departures) on Wed 28 Oct 2026; every resort rule is *Draft – for validation* (D-348). Guests are existing members, their dependants and non-member account holders.

```gherkin
Feature: CC-Demo Resorts (v06)

Scenario: Member reserves online within the limits (Story-156, 163, 178, BR-107, 108, 111, 118, 132)
  Given Member B. Lim (LB10002) in the Portal
  When they ask for 1 night, then 8 nights, then an arrival past the 90-day window
  Then each is refused with its rule
  When they reserve a Changi Chalet for 2 weekend nights
  Then the weekend member rate is shown and the 50 % deposit is paid with Pay (stub)
  And the reservation is Confirmed with a reference RR-…, a folio, a Finance stub record and a confirmation notice

Scenario: A declined deposit reserves nothing (Story-156, BR-118)
  When the deposit payment is declined
  Then no reservation is confirmed and the room stays free

Scenario: Only an Active member reserves at member terms (Story-156, BR-108)
  Given a member whose membership is Suspended, and a Junior member
  When the front desk reserves for them
  Then both are refused

Scenario: A non-member reserves within the non-member limits (Story-156, BR-108)
  Given non-member account P. Rao (NM-02)
  When they reserve 5 nights, then 31 days ahead
  Then both are refused, and 2 nights within 30 days at the non-member rate is accepted

Scenario: No room when full; the waitlist holds nothing (Story-161, BR-117)
  Given Kranji Villas fully reserved 13 – 15 Nov
  When B. Lim asks for a Kranji Villa those nights
  Then no room is offered and they join the resort waitlist, with no room held

Scenario: Group reservation with a revised set (Story-157, 156, BR-109, 111, 112)
  Given 2 Family Chalets free 20 – 22 Nov
  When K. Wong reserves 3 Family Chalets for Corporate Term member EE10018
  Then it is refused until "Accept revised set" is ticked
  And then 2 rooms share one master reference GR-… and one zero-value folio
  When K. Wong assigns the Complimentary rate type by hand
  Then it is allowed for staff only

Scenario: Tentative holds expire or convert (Story-158, BR-113)
  When K. Wong places a Honorary member's room on hold and lets the hold expire
  Then the room is released and a hold-expiry notice is in the outbox
  When another hold is paid in time
  Then it becomes Confirmed

Scenario: Amendment under the 21-day rule (Story-159, BR-110, BR-114)
  When K. Wong moves the December stay RR-0006 by a night (more than 21 days ahead)
  Then a Lost Opportunity Charge of 20 % is posted to the folio
  And changing the booked guest is refused
  When K. Wong tries to move the 5 Nov stay RR-0005
  Then the page says "processed as a cancellation (100 %)" and nothing changes unless confirmed

Scenario: Cancellation charge and the Manager's refund (Story-160, 164, 175, BR-115, BR-119)
  When K. Wong cancels D. Koh's stay RR-0009 (26 – 28 Dec, paid in full) with a reason
  Then 50 % is charged and the rest is a refund requested for the Manager
  When the Manager approves it on Approvals → Resort refunds with a reason
  Then a refund instruction with the original payment reference is on the Finance stub

Scenario: The requester cannot approve a resort refund (Story-164, BR-119, BR-084)
  When the Resort Front Desk tab opens Approvals
  Then only the blocked panel is shown

Scenario: Waitlist allocation by staff choice (Story-161, 177, BR-117)
  Given waiting entries RW-01 (older) and RW-02 for a Kranji Villa 26 – 28 Dec
  When a matching villa is freed
  Then both entries are listed oldest first
  When K. Wong allocates RW-02 with a reason and the guest declines
  Then RW-02 is waiting again with its join time
  When K. Wong allocates RW-01 and creates the reservation
  Then RW-01 is closed and the choices are in the audit log

Scenario: Check-in needs a ready room and the window (Story-166, 171, BR-122, 123, 127)
  Given Front desk time 15:30 and A. Tan's reservation RR-0001 arriving today in CC-04 (Pending Cleaning)
  When K. Wong checks A. Tan in
  Then it is refused until the stay is moved to Ready chalet CC-02
  And then the room is Occupied, the folio is open and a 6-digit PIN is active for the stay

Scenario: Vehicles for the stay (Story-168, BR-126)
  When K. Wong registers 3 vehicles for RR-0001
  Then the first is free, the second costs S$10 a night on the folio, the third is refused
  And an invalid IU or OBU number is refused
  And the member's Membership vehicles are shown read-only and do not count

Scenario: Late arrival needs the Manager (Story-166, BR-122)
  Given it is after 18:00 on RR-0010's arrival date
  When K. Wong checks in RR-0010
  Then a late-arrival exception is requested
  And check-in is allowed only after the Manager approves it on Resort exceptions

Scenario: The resort stay is a Facilities visitor pass (Story-144, 166, BR-099)
  When F. Tan admits A. Tan to the Fitness Centre with reservation number RR-0001
  Then A. Tan is admitted free as a Resort guest
  And the ended stay RR-0007 and the future stay RR-0005 are refused

Scenario: In-house charges and corrections (Story-165, 167, 171, BR-120, 121, 124, 127)
  Given RR-0002 in-house in CC-01
  When K. Wong posts a BBQ pit, extends the stay a night and moves room
  Then each is on the folio, and the extension is refused if the room is not free
  When K. Wong applies a 10 % promotion with the member discount
  Then they apply in the configured order
  When the guest disputes a paid extra bed
  Then the paid line is never edited: a credit note is requested and posted only after the Manager approves
  When K. Wong regenerates the PIN
  Then the old PIN is invalid

Scenario: Check-out needs a settled folio (Story-163, 172, BR-118, BR-128)
  Given Front desk time 09:30 and J. Ho's stay RR-0003 with a balance of S$283
  When K. Wong checks J. Ho out
  Then it is refused until the balance is paid (Pay stub)
  And then the room is Checked-Out, then Pending Cleaning, the PIN is deactivated and the vehicles revoked

Scenario: Reversal with approval (Story-173, BR-129)
  When K. Wong requests a reversal of that check-out with a reason
  And the Manager approves it on Resort exceptions
  Then the stay is checked in again, the folio reopened and a PIN reissued, and both events are kept

Scenario: Housekeeping turns rooms round and blocks faults (Story-169, 170, BR-123, BR-125)
  Given Housekeeping H. Ong
  When H. Ong moves CC-04 from Pending Cleaning to Cleaning to Ready
  Then each change is a room history line
  When H. Ong marks Pool Villa KV-04 Faulty with a reason
  Then it cannot be reserved or checked in until completion is recorded

Scenario: No-show only after the cutoff (Story-162, BR-116)
  Given RR-0004 arrived 27 Oct and not checked in
  When K. Wong processes a no-show
  Then it is No-show with a 100 % charge
  And a stay arriving today cannot be a no-show yet

Scenario: Night Audit blocks, then closes the day (Story-174, 175, BR-130, BR-131)
  Given an unconfirmed card payment
  When the Manager runs Night Audit
  Then it is blocked by that payment, with warnings for open waitlist entries and Faulty rooms
  When the payment is confirmed and Night Audit runs again
  Then the Manager closes the business day and the day record is on the Finance stub

Scenario: Resorts reports and the audit log (Story-176, 177, BR-031 – 034)
  When the Manager runs HMS-RES-RR-001 Arrivals and departures and HMS-RES-RR-002 Occupancy
  Then they show live resort data and export with the Export as PDF and XLS buttons
  And the Officer does not see the Resorts reports
  When the Manager searches the audit log of RR-0001
  Then every action is listed read-only with its actor

Scenario: Resort configuration is Draft until approved (Story-154, 155, BR-107, BR-111)
  When the Administrator adds a Late check-in pack add-on and end-dates the Pool Villa room type
  Then both are saved at once, and the Pool Villa's past stays keep their history
  When the Administrator raises the Changi Chalet weekend member rate and the minimum stay to 3 nights
  Then both are Draft and not used
  When the Manager approves the rate and rejects the minimum stay
  Then a new reservation uses the new rate and the minimum stay stays 2 nights

Scenario: Customers see only their own reservations (Story-156, BR-085)
  When a Member tab opens another guest's reservation
  Then it is not shown

Scenario: Launcher starts every scenario from Module details (Story-035, 037, 038)
  When the presenter opens the launcher
  Then there is no Scenarios section and Module details follows Modules
  And every scenario, the Launcher ones included, has a Start link that opens its guide

Scenario: Resorts pages read well in both themes (Story-179, feature 164)
  When any Resorts page is shown in the light and in the dark theme
  Then text and badges meet WCAG 2.2 AA contrast and the Draft – for validation note is shown
```

### 5a (v07). Finance acceptance scenarios

Finance pages run on the fixed demo clock, Wed 28 Oct 2026 11:55, in period P07 (Oct, Open; P06 Closed). Finance Officer R. Tan is the maker and Finance Approver C. Lau the checker. Rules marked *Interim design* show the note *Interim design – pending Finance validation* on their page (D-371). The kept v01 – v06 scenarios whose steps used the Finance stub now read their Finance step as a FIN-OPS event, Payment or refund (listed at the end).

```gherkin
Feature: CC-Demo Finance (v07)

Scenario: Validate queue sorts the day's events (Story-180, 181, 197, BR-133, 134)    # brief: S1
  Given 13 received events from Membership, Golf, Events, Facilities, Resorts and the POS file
  When Finance Officer R. Tan runs Validate queue
  Then the valid events are Accepted and posted
  And the duplicate golf event and the unmatched POS line become exceptions with an owner
  And the resort event without a tax code is Returned to Resorts with its reason
  And each source module shows the FIN-OPS status of its event

Scenario: An unmapped event is blocked (Story-182, BR-136)
  Given an accepted event of type EVT-SPONSOR with no approved mapping
  When it is posted
  Then the posting set is blocked as Unmapped and an exception is raised

Scenario: A posting set balances with Output GST (Story-182, BR-137, BR-138)    # brief: S2
  Given an accepted golf charge of S$109.00 including GST
  When it is posted
  Then the set has a receivable leg, a revenue leg of S$100.00 and an Output GST leg of S$9.00
  And total debits equal total credits

Scenario: Finance unavailable holds in-house charges (Story-180, 022, BR-135, BR-023)
  Given the Finance availability switch on Finance home is off
  When the golf counter charges a member account
  Then the credit check is blocked and the charge is held as not financially completed
  When the switch is back on and Validate queue runs
  Then the charge is accepted

Scenario: Configuration change needs a second person (Story-183, BR-139)
  Given R. Tan moves the 21:00 posting run to 20:00
  Then the change is Draft and the 21:00 run still applies
  When R. Tan tries to approve it
  Then approval is refused for the maker
  When C. Lau approves it in Finance approvals
  Then the 20:00 run applies from its effective date
  And a new mapping that overlaps an active version is refused

Scenario: One receivable per charge (Story-184, BR-140)
  Given an accepted positive member charge and a credit line
  When both are posted
  Then exactly one receivable line exists for the charge and none for the credit
  And posting the same bill line again creates no second receivable

Scenario: Payment allocation and receipt (Story-185, BR-141, BR-142, BR-170)    # brief: S3
  Given Member B. Lim (LB10002) owes S$450 on bill BL-0412 (Oct) and S$750 (Sep)
  When R. Tan records S$1,500 cash naming BL-0412
  Then BL-0412 is paid first, then the September bill, and S$300 stays as unapplied credit
  And the receipt carries a PaymentNo PN-…
  When the receipt is reprinted
  Then the same PaymentNo is shown and the reprint is audited

Scenario: A cheque counts only when cleared (Story-185, BR-143, BR-147)
  Given a cheque payment from GI10009
  Then it is Pending Clearance and does not count for credit or dunning
  When it is returned
  Then the failed Payment is kept, its allocations are released and the receivable reopens

Scenario: GIRO collection and bank results (Story-186, 187, BR-144, BR-145, BR-146)
  Given 5 Active standing orders and 1 Suspended
  When R. Tan runs the October GIRO collection
  Then the order above its Maximum Debit Amount is blocked and the Suspended one is skipped
  When the bank results are applied
  Then 3 accepted collections become Payments
  And CF10006's second rejection this month adds a S$10 fee
  And the invalid mandate cancels its order and nothing is retried automatically

Scenario: Spending credit expires without cash (Story-188, BR-148)
  Given award SC-03 granted 28 Oct 2024 with S$120 unused
  When R. Tan expires it at 24 months
  Then a non-cash adjustment removes the balance, the original award is unchanged and nothing is refunded

Scenario: Refunds need two people (Story-189, 164, BR-150, BR-151)    # brief: S4
  Given the resort refund RF-0001 approved by the Manager and a facility refund paid S$20 by card and S$15 by in-house credit
  When R. Tan prepares both and tries to approve one
  Then approval is refused for the preparer
  When C. Lau approves and R. Tan releases them
  Then the card part is refunded to the card and the S$15 is restored to the member account, never paid out as cash
  And the refund register shows each part with its source

Scenario: Deposit refund offsets the outstanding balance (Story-189, BR-149)
  Given withdrawn member SM10013 with a S$1,000 deposit and S$420 outstanding
  When the deposit refund is prepared
  Then S$420 is offset and S$580 is refundable

Scenario: Night Audit recognises the night's stays (Story-190, 174, BR-152, BR-130)    # brief: S5
  Given resort stays in-house on 27 Oct with deposits held as deferred revenue
  When the Manager closes the business day after a clean Night Audit
  Then the day goes to FIN-OPS as financial events
  And one night per stay is recognised as revenue with no second GST

Scenario: Amortisation waits for a clean reconciliation (Story-191, BR-153, BR-154)
  Given the entrance-fee reconciliation shows a S$12.50 unexplained variance
  Then October amortisation is blocked
  When the variance is recorded as a timing item and the run is repeated
  Then one month is posted per schedule and YL10012's schedule stops after death, its posted months unchanged

Scenario: Cashier close finds a shortage (Story-192, 120, BR-156, BR-155)
  Given the golf counter's cashier session CS-GOLF-1028, fed by the golf shift close
  When R. Tan closes it with S$5 less cash than expected
  Then a variance exception is raised and the cleared cash goes to a bank-in batch
  And the Operations-to-Finance clearing with a missing counterpart is an exception assigned to Golf

Scenario: Adjustments and overrides need a second person (Story-193, BR-157, BR-158)
  Given a mis-mapped accepted event
  When R. Tan prepares an adjustment and tries to approve it
  Then approval is refused for the maker
  When C. Lau approves it
  Then it is a separate movement linked to the original, which is unchanged
  And C. Lau's credit-limit override for B. Lim is recorded with authority and audited

Scenario: A closed period refuses postings (Story-194, BR-159)
  Given P06 (Sep) is Closed and P07 (Oct) Open
  When a late September golf charge arrives
  Then it posts to October with its source date 30 Sep kept
  And a posting dated into September is refused

Scenario: Posting runs stage clean lines only (Story-195, 196, BR-160, BR-161, BR-162)    # brief: S6
  Given posted events of 28 Oct, one with an open exception
  When R. Tan runs the 13:00 posting
  Then batch PB-… stages every posting-ready line and leaves the excepted line out
  When the file export fails and is retried
  Then the same batch is exported, not regenerated
  When the Yonyou response is imported with one rejected line
  Then the other lines keep their ERP document numbers and the rejected line becomes an exception
  When the 21:00 posting runs
  Then only lines not staged before are taken

Scenario: Dunning escalates to Membership, never suspends (Story-198, 031, BR-164, BR-165)    # brief: S7
  Given PA10023 overdue 125 days, WE10005 overdue 65 days and OO10015 in dispute
  When R. Tan evaluates dunning
  Then PA10023 is Escalated: the escalation shows on the Member 360 and the Membership dashboard with a link to the Suspension request, and the membership is unchanged
  And WE10005 pays part and drops to Reminder 1
  And OO10015 is put on hold with the reason Dispute
  And the reminders are in the Communications outbox

Scenario: General AR invoice under maker-checker (Story-199, BR-166, BR-167, BR-169)
  Given debtors GD-01 Alpha Logistics (Active) and GD-02 Harbour Hotel (inactive)
  When R. Tan creates an invoice for GD-02
  Then it is refused for an inactive debtor
  When R. Tan creates one for GD-01 and C. Lau approves it
  Then INV-… is issued and can no longer be edited
  And a partial credit note CN-… keeps the original GST rate and links to the invoice
  And the General Debtor statement ages by due date with no interest

Scenario: Recurring invoice from an arrangement (Story-199, BR-168)
  Given the sponsor's monthly arrangement RA-01 with its next billing date 28 Oct for November
  When R. Tan generates the due invoices
  Then the November invoice is created with the same controls as a manual one

Scenario: Finance reports in the catalogue (Story-200, 103, BR-031, BR-034)
  Given the Manager and C. Lau open the Report Catalogue
  Then the 10 FIN-OPS reports are listed and runnable for them, and not for the Membership Officer
  When the Manager runs Aged receivables and dunning and clicks XLS
  Then the file holds the same rows as the screen

Scenario: Confirm payment records a FIN-OPS Payment (Story-202, 004, 030, BR-006)    # brief: S8
  Given an approved application awaiting payment with its fee as a FIN-OPS receivable
  When the Approver clicks Mark payment failed
  Then a rejected attempt is recorded and the request stays Awaiting Payment
  When the Approver clicks Confirm payment
  Then a FIN-OPS Payment with a PaymentNo settles the receivable and the membership activates

Scenario: Every module's money reaches FIN-OPS (Story-202, 119, 142, 175)
  Given a golf charge, an event payment, a facility payment and a resort deposit made with Pay (simulated)
  Then each raises a FIN-OPS financial event FE-… shown in its module with its status
  And no page shows a Finance stub reference

Scenario: All seven modules are live (Story-036, 037, 201)
  When the presenter opens the launcher
  Then all seven module cards are live with Module details and Start links
  And no page shows a "Coming in v0N" badge, a planned card or a disabled module control
  And the Finance pages read well in the light and the dark theme

Scenario: Import requires the Finance data (Story-039)
  When a v06 export without the Finance collections is imported
  Then the import is refused and the current data is unchanged
```

**Kept scenarios read with FIN-OPS in v07 (RC-147 – RC-153):** *Application approved with a fee waits for payment*, *Payment recorded activates the membership*, *Only an Approver records stub payments*, *Stub payment failure keeps the request waiting* (Story-004, 030: the Finance step is a FIN-OPS Payment or rejected attempt); *Withdrawal completes only after the balance is cleared* (FIN-OPS balance); *Credit check blocked when Finance is unavailable* (switch on Finance home); *Every golf charge has a rate, a payer and a Finance status*; *Counter registration on the member account*; *Member registers themself and a junior dependant*; *Club cancellation needs the Events Manager to authorise refunds*; *Counter booking checks every rule, then confirms on payment*; *Cancellation refund follows the 24-hour rule*; *An exceptional refund needs the Operations Manager*; *Waiting list offers in join order*; *Bowling sale needs a receipt number*; *Reconciliation matches and lists exceptions*; *Member reserves online within the limits*; *Cancellation charge and the Manager's refund*; *Check-out needs a settled folio*; *Night Audit blocks, then closes the day*; *Completed request writes status feed entries* (FIN-OPS event and status in place of the stub reference; refunds then pass the Finance Approver). Their brief tags moved to the v07 scenarios.

## 6. Functional requirements
- **Request engine:** one workflow for the 17 request types, per `artifacts/diagrams/workflow-request-v2.md` (states, transitions, actors, guards, side effects, apply table).
- **Rules:** one function per BR-001 – 030, 084, 085, 171 – 178 in `js/rules.js`; each asserted in `js/checks.js` (`checks.html`, not linked from the app).
- **Transitions:** as data in `js/workflow.js`, each transition asserted in `checks.js`.
- **Data:** JSON, accessed only through `js/store.js`; `data/seed.json` and `data/seed.js`; Reset, Export and Import (Story-039).
- **Configuration:** membership types, fees, limits, document matrix, transition matrix, templates, campaigns, effective-dated (Story-027).
- **History:** every transition and material change writes an append-only history entry (BR-177).
- **Notifications:** every notice goes to a simulated outbox (Story-026).
- **Integration feed:** status entries for Access Control, GMS and HMS, marked stub (Story-032).
- **Launcher:** CC-Demo hero, collapsible sections with one-line summaries (first visible open), module cards with alt buttons, Membership live and six planned cards, role tabs for the v01 roles and member accounts, scenario guide panel (Stories 033 – 039).
- **(v02) Club Reporting:** report catalogue (20 entries: 8 runnable Membership reports, 12 golf "Coming in v03"), report page (parameters, run, no-data result, KPI tiles and chart, export), run history, report definitions, management dashboard, legacy report finder (147 names), report access rules; workflows Report run, Report definition, Report access rule in `artifacts/diagrams/workflow-request-full-v02.md`; rules BR-031 – 035 in `js/rules.js`.
- **(v03) Golf:** tee sheet (generate, publish, block, release), booking (portal and counter), waitlist with offers, amend and cancel, check-in and release to play, late arrival and no-show, course suspension and rain checks, handicap extract and NSRCC PC, golf charges to the Finance stub, shift close, golf enquiry; golfers are `persons` / `memberships` plus a golfer profile; workflows in `artifacts/diagrams/workflow-request-full-v03.md` (W15 – W21); rules BR-036 – 060 in `js/rules.js`; the 12 golf reports GMS-RR-001 – 012 run on these records.
- **(v04) Events:** event setup, publication and maintenance, the schedule (RR-001), online and counter registration with holds and Pay (stub), waitlist with offers, minimum participation (RR-002), QR and manual check-in with personnel attendance (RR-003), participant and club cancellation, refunds authorised by the Events Manager to the Finance stub, rescheduling, the simulated function-room feed; participants are `persons` / `memberships` (dependants through `responsibleMembershipId`) or non-member account holders; workflows in `artifacts/diagrams/workflow-request-full-v04.md` (W22 – W27); rules BR-061 – 083 in `js/rules.js`.
- **(v05) Facilities:** facility catalogue and resources, eligibility and entitlement (BR-086), availability grid and resource blocks, counter and online booking with Pay (stub), amendment, cancellation with the 24-hour refund rule, exceptional refunds approved by the Manager, no-shows, the facility waiting list with offers, pool and Fitness Centre admission with day passes and the simulated visitor pass, the Bowling counter, reconciliation and exceptions, configuration as Draft until approved, Fitness Centre reference lists, Personal Training; customers are `persons` / `memberships` (dependants through `responsibleMembershipId`), non-member account holders, SAFRA card numbers or guests with a host; workflows in `artifacts/diagrams/workflow-request-full-v08.md` (W28 – W34); rules BR-086 – 106 in `js/rules.js`; the 8 reports HMS-FAC-RR-001 – 008 run on these records in the Report Catalogue.
- **(v05) Events venue:** Event setup picks its venue from the Facilities records; a published session at a bookable venue is an *Event* block (BR-088); the event pages link the venue.
- **(v07) Finance (FIN-OPS):** Finance home (KPI tiles, charts, the day's two runs, the availability switch, work queues); intake register with Validate queue; posting sets with Output GST from approved mappings; Finance configuration with maker-checker; member accounts, receivables and Statements of Account; payments with PaymentNo, allocation, unapplied credit and cheques; standing orders and the GIRO run; bank results and recovery; spending credit; refunds prepared and approved by two people; deferred revenue and recognition; entrance-fee amortisation; reconciliation, clearing and cashier sessions; adjustments and credit-limit overrides; financial periods; Yonyou staging, export and response (simulated); financial exceptions; dunning with Membership escalation; General AR with debtors, invoices, notes and recurring arrangements; a Finance approvals queue for the Finance Approver; workflows in `artifacts/diagrams/workflow-request-full-v08.md` (W42 – W50); rules BR-133 – 170 in `js/rules.js`, each marked with its source status.
- **(v07) Finance reports** (RC-183), each with date or period parameters, on live data, exportable PDF and XLS: **FIN-OPS-RR-002 Daily reconciliation summary**, **005 Bank collection results**, **006 Refund register**, **007 Deferred revenue**, **008 Entrance fee amortisation**, **011 Yonyou batch status**, **012 Exception register**, **013 Aged receivables and dunning**, **015 General Debtor ageing**, **017 Cashier close**. Access: Finance Officer, Finance Approver, Manager.
- **(v07) Module connections:** every Membership, Golf, Events, Facilities and Resorts money step raises a FIN-OPS financial event `FE-…` and shows its status where `STUB-…` was; Confirm payment and **Pay (simulated)** success record a FIN-OPS Payment, a failure or decline a rejected attempt; module refunds pass the Finance Officer and Finance Approver after the module approval; module closes feed the cashier close; the Night Audit close recognises the night's stays; credit reads the FIN-OPS balance; dunning escalations on the Member 360 and the Membership dashboard; the Integration feed lists FIN-OPS events; Import requires the Finance collections.
- **(v07) Launcher:** all seven modules live; Finance card with its Module details tab and Start links; Finance Officer and Finance Approver roles and guides; no planned card or "Coming in v0N" badge.
- **(v06) Resorts:** resort, room type, room and add-on configuration (end-dated); Draft rates, seasons, discounts and policy approved by the Manager; reservations from the front desk and the Portal (single, group, hold) with the minimum stay, windows, maximum nights and price by membership type; amendment and cancellation under the 21-day rules; resort waitlist by staff choice; no-show after the cutoff; folio with Pay (stub), charges, discounts, adjustments and credit notes; check-in and check-out on the Front desk time switch; vehicles (max 2) and simulated PINs; room board for Housekeeping with Faulty and Maintenance Blocked rooms; reversals, late arrivals, refunds, adjustments and credit notes approved by the Manager on the Approvals tabs *Resort refunds*, *Resort exceptions* and *Resort configuration*; Night Audit and business-day close; resort audit log; 6 notification events to the outbox. Every resort rule is labelled *Draft – for validation*.
- **(v06) Resorts reports** (RC-140), each with date-range parameters, on live data, exportable PDF and XLS: **HMS-RES-RR-001 Arrivals and departures** (date, reservation, guest, room, nights, status, balance); **HMS-RES-RR-002 Occupancy** (date, resort, rooms available, rooms occupied, occupancy %); **HMS-RES-RR-003 Collections** (date, reservation, item, payment method, amount, Finance stub reference); **HMS-RES-RR-004 Resort operational summary** (reservations by status, no-shows, cancellations with charges, waitlist entries, Faulty and blocked rooms); **HMS-RES-RR-005 Resort audit** (time, actor, action, object, reason). Access: Resort Front Desk, Manager, Administrator.
- **(v06) Facilities link:** the Fitness Centre visitor pass is the reservation number of a checked-in stay (category *Resort guest*, RC-121).
- **(v06) Launcher:** Resorts live with its scenarios, the Resort Front Desk and Housekeeping roles and guides; Finance planned; the Scenarios section removed and Module details moved into its place, with a Start link for every scenario (new *Launcher* tab for SC-34, 35, 63; D-351).
- **(v05) Launcher:** Facilities live with its scenarios, the Facilities Staff role and guides; Resorts and Finance planned.
- **(v04) Report Catalogue:** a PDF and an XLS button on each exportable report, running it with its default parameters and recording the run with its export.
- **(v03) Launcher:** Golf live with its scenarios, roles (Golf Operations) and guides; **Module details** on each live card opens and scrolls to that module's details tab.
- **Deferred modules:** none from v07 (§5.2).

## 7. Non-functional requirements
- Static multi-page site, one HTML file per screen, opens from `file://`, works offline; no server, API, remote fetch or font service.
- Bootstrap 5.3.3 (local copy) is the only third-party code.
- Light and dark themes with a toggle on every page; prototypes open in light.
- Desktop-first, responsive to 375px (Member pages usable on a phone).
- Accessibility: WCAG 2.2 AA in both themes (contrast, keyboard reachable controls, visible focus, labelled form fields, 44px touch targets on phones).
- Tables: alternating row shading for readability (feature 151, amended by D-249); status is shown by the badge and the journey rail, never by row colour.
- Layout rules Layout-01 – Layout-13 checked by `align-check.js` on every page state.
- Content: en-SG, SGD, D MMM YYYY, clear and brief.
- Synthetic identifiers only: e-mails on `example.com`, mobiles in +65 8000 / 9000 blocks, ID numbers `ID-nnnn` (D-231, which replaced the D-022 masking), no real NRIC, card or token value.

## 8. Assumptions & open questions
- Assumptions: the confirmed carried assumptions (D-218) and the full-build answers D-217 – D-228. Policy values that are TBC at NSRCC (eligibility, documents, approval matrix, limits, fees) are demo values from configuration, never presented as NSRCC policy.
- **Prototype limitations:** roles come from the launcher (no sign-in); Finance is a stub until v07 (an Approver records payment; from v07 the payment is a FIN-OPS Payment); Access Control, GMS and HMS receive stub feed entries only; notifications go to an outbox; documents are ticked as received (no upload); the nightly job is the **Run lifecycle check** button on a fixed demo date of 28 Oct 2026; all data is invented.
- **Known limits (v07):** the Finance stub limits of v02 – v06 are **closed**: every hand-off is a FIN-OPS financial event (D-372). Still simulated: Yonyou transport and responses, bank files, the card / PayNow provider (**Pay (simulated)**) and the external POS file (features 152, 153); posting runs start from **Run 13:00 / 21:00 posting** buttons on the fixed demo clock; GST codes, the chart of accounts, mappings, matrices, dunning stages and fees are demo values; Interim Design and TBC rules are shown as such (D-371); interest is off (feature 154).
- **Known limits (v06, Finance stub part closed in v07):** resort deposits, payments, refund instructions, adjustments, credit notes and the Night Audit day go to the Finance stub (`STUB-R…`, Pay (stub) Success / Decline) until v07 (D-349); door PINs (Salto), the carpark whitelist (Alphawave) and the payment gateway are simulated; the Front desk time switch (09:30 / 15:30) and Let hold expire stand in for real time; resort rates, seasons, windows, maximum stays, discounts and the Night Audit checks are demo values for a draft source pack; the Accommodation Pass is not built.
- **Known limits (v05, Finance stub part closed in v07):** facility payments, refund instructions and bowling escalations go to the Finance stub (Pay (stub) Success / Decline; Cash, Card or NETS with Success / Decline) until v07 (D-326); the bungalow visitor pass is a simulated list until Resorts (v06; replaced by resort stays in v06); the Bowling export is a built-in sample (or a local CSV in the same layout); waiting-list offers run on the fixed demo clock with Let offer expire; SAFRA membership is not verified (typed card number); facility rates, windows, hours and capacities are demo values from configuration (D-106 – D-109).
- **Known limits (v04, Finance stub part closed in v07):** event payments and refunds go to the Finance stub (Pay (stub), member account when balances are available) until v07 (D-305); holds and offers run on the fixed demo clock with Let hold expire / Let offer expire; the QR is drawn for show and checked by its code; the function-room feed is simulated; venues are names only until Facilities (v05; linked in v05).
- **Known limits (v03, Finance stub part closed in v07):** golf charges and refunds go to the Finance stub (member account accepted at once, Record payment (stub)) until v07 (D-285); the handicap extract is a built-in sample (D-048); timers run on a fixed demo clock with Let offer expire (D-055, D-285); golf rates and windows are demo values from configuration (D-044, D-045); hand-offs to Events, Facilities and Resorts appear only as planned module cards.
- **Known limits (v02, Finance stub part closed in v07):** Finance stub (BR-178); status feed stubs; hand-offs to Golf, Events, Facilities and Resorts appear only as planned module cards; golf reports listed as "Coming in v03"; Excel export is an .xls file built in the browser and PDF is the browser print (D-031); user-defined reports and the dashboard stand in for the unchosen BI tool (D-028); scheduled delivery not built (feature 44).
- Open at NSRCC (not blocking): Club Reporting as a separate module (option A, demo choice), report role matrix (OD-003, demo matrix D-262), BI tool (MMS-CFG-133), report layout (GMS OI-05), OD-001 eligibility matrix, OD-002 document matrix, OD-003 approval matrix, Business Rules Catalogue entries MMS-BR-092 – 103.

## 8a. ⚠ Requirements kept against advice (user overrides)
None (0 open overrides).

## 9. Change history
| Version | Date | Change |
|---|---|---|
| v1 | 2026-11-06 | First PRD of the full build (KO-029): all 7 modules; v01 stories 001 – 040 with Gherkin; deferred stories 101 – 202 tagged by version |
| v2 | 2026-11-06 | RC-102 (D-249): Story-040 and its scenario removed (39 v01 stories, 65 scenarios); feature 151 amended for the whole build to alternating row shading only (no status tint, no left marker), now an NFR; feature 159 moved to Story-037 (delivered by design pass 3, D-247). Alignment corrections: synthetic ID rule now `ID-nnnn` (D-231); accessibility WCAG 2.2 AA as in the brief. S1 – S8 unchanged |
| v3 | 2026-11-10 | v02 (KO-030), compared with v2 (v01): Story-101 – 108 moved from §5.2 `Deferred to v02` to §5.1b (D-264); Story-101 names its reports MMS-RR-001 – 008, Story-102 export designation per RC-103 (D-263); 30 v02 scenarios added (95 in all); brief tags S1 – S8 moved to the v02 scenarios; decision to inform restated (D-260); goals, roles, scope, functional requirements and known limits updated for Club Reporting; Story-031, 034, 035, 036 marked v02 link (D-259). No story dropped, no new requirement |
| v4 | 2026-11-10 | v03 (KO-031), compared with v3 (v02): Story-109 – 122 moved from §5.2 `Deferred to v03` to §5.1c (D-286), wording kept, baseline scenarios corrected (Story-114 – 121); 33 v03 scenarios added (128 in all); brief tags S1 – S8 moved to the v03 scenarios; Story-035 changed (Module details, D-285), Story-036 v03 link; decision to inform restated (D-283); goals, roles (Golf Operations), scope, functional requirements and known limits updated for Golf. No story dropped |
| v5 | 2026-11-11 | v04 (KO-032), compared with v4 (v03): Story-123 – 135 moved from §5.2 `Deferred to v04` to §5.1d (D-306), wording kept, baseline scenario of Story-127 corrected; 31 v04 scenarios added (159 in all); brief tags S1 – S8 moved to the v04 scenarios; Story-102 and 103 changed (catalogue export buttons, D-305), Story-035, 036 v04 links; decision to inform restated (D-303); goals, roles (Events Team, non-member account holders, CSO), scope, functional requirements and known limits updated for Events. No story dropped |
| v6 | 2026-11-11 | v05 (KO-033), compared with v5 (v04): Story-136 – 153 moved from §5.2 `Deferred to v05` to §5.1e, one story per feature 80 – 96 and 163 (D-327); 26 v05 scenarios (§5a v05), brief tags S1 – S8 moved to the v05 scenarios; Story-123 gains the venue link (RC-116); §6 Facilities, Events venue and launcher lines; Facilities reports in the catalogue (RC-117); Known limits (v05); personas Facilities Staff, Operations Manager, Administrator, Member and non-member account holder extended. No other story changed (D-323) |
| v7 | 2026-11-11 | v06 (KO-034), compared with v6 (v05): Story-154 – 179 moved from §5.2 `Deferred to v06` to §5.1f, one story per feature 101 – 125 and 164 (D-350); 26 v06 scenarios (§5a v06), brief tags S1 – S8 moved to the v06 scenarios; Story-144 visitor pass from resort stays (RC-121); 5 Resorts reports with their columns; launcher without the Scenarios section (D-351); v06 goals, personas (Resort Front Desk, Housekeeping, Manager, Administrator, Member, non-member) and Known limits; every resort rule *Draft – for validation* (D-348) |
| v8 | 2026-11-12 | v07 (KO-035), the final version, compared with v7 (v06): Story-180 – 202 moved from §5.2 `Deferred to v07` to §5.1g, one story per feature 129 – 149, plus 165 and 29 (v07) (D-373); §5.2 now empty; 27 v07 scenarios (§5a v07), brief tags S1 – S8 moved to the v07 scenarios; 34 v01 – v06 stories marked v07 link or changed (Story-004, 022, 030, 036, 175 changed); 10 Finance reports with their columns; Finance Officer and Finance Approver personas; v07 goals; Known limits (v07) and the stub limits of v02 – v06 closed; Interim Design and TBC rules marked (D-371) |
