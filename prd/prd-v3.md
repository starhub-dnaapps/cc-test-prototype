> Build: full-build · Version: v08 · KO: KO-037 · from v07

# PRD: CC-Demo club management system — v3

> **In v03:** superseded by `prd-v4.md` (KO-031). Kept as the v02 contract.

**Date:** 2026-11-10 · **Status:** v3, Approved (D-268) · supersedes `prd-v2.md` (v01) · **Build:** full-build-v02 (from v01) · **KO:** KO-030 · lineage imported from rapid-build-v09

## 1. Overview
CC-Demo replaces a legacy club system with seven configuration-driven modules: Membership, Club Reporting, Golf, Events, Facilities, Resorts and Finance. This PRD covers all seven modules (Phases 1 – 2 of KO-029). **v01 builds Membership and the launcher**; each other module's stories are tagged `Deferred to v0N` and built in that version. Problem statement, business context and constraints: `discovery-summary.md` (full-build sections and the imported module summaries).

**v02 (KO-030):** this version builds **Club Reporting** (§5.1b) on the v01 Membership module and launcher, which are kept unchanged except where they connect to Club Reporting (D-259). Golf, Events, Facilities, Resorts and Finance stay `Deferred to v0N`.

**Decision to inform (v02, D-260):** *Should we build Club Reporting (role-governed catalogue, parameterised runs, export, user-defined reports and dashboards, legacy finder) on the Membership base, as the reporting layer each later module plugs into?* Type: `validate`.

*v01 decision (kept in v01's brief):* *Should we build CC-Demo's Membership module, with the request → approval → payment → activation flow shown for the Membership Officer, Approver, Manager, Administrator and Member, as the base for the other six modules?* Type: `validate`.

## 2. Goals & success metrics
| Goal | Metric | Target (prototype) |
|---|---|---|
| Every lifecycle event goes through its gates | Requests completed with every gate passed | 100 %: no gate can be skipped |
| Maker-checker | Requests decided by their submitter | 0 |
| Full traceability | Material actions with actor, role, time and from / to status | 100 % in the history (BR-177) |
| Configuration-driven policy | Policy values hard-coded in pages | 0: all read from configuration |
| One hand-off to Finance | Re-keying between Membership and Finance | 0: one hand-off, one confirmation (stub until v07) |
| Reviewers can answer the decision | Scenarios SC-01 – SC-11, SC-34, SC-35, SC-63, SC-64 runnable end to end with the scenario guide | 15 / 15 |

| **(v02)** Reports follow access | Reports or audit rows shown to a role without an access rule | 0 (BR-031) |
| **(v02)** Reports are read-only | Source records changed by a run or export | 0 (BR-033) |
| **(v02)** Export matches the screen | Exported rows different from the on-screen result | 0 (BR-034) |
| **(v02)** Legacy names resolve | Legacy names with no successor, owner or retirement reason | 0 of 147 |
| **(v02)** Reviewers can answer the v02 decision | Scenarios SC-12, SC-13, SC-15, SC-16, SC-65 and the kept v01 scenarios runnable with the guide | 20 / 20 |

Module goals of v03 – v07 are in the imported module summaries of `discovery-summary.md`, and are confirmed in each module's version.

## 3. Users & personas
| Role | Goal | Context (where and when) | Device | Built in |
|---|---|---|---|---|
| Membership Officer | Capture applications and requests correctly, first time; **(v02)** run operational membership reports, export them, find legacy names | Membership counter and back office, office hours | desktop | v01; reports v02 |
| Approver | Decide requests quickly with the evidence in front of them; record Finance-stub payments | Back office, from an inbox | desktop | v01 |
| Membership Manager (also Golf, Events and Operations Manager) | Authorise exceptions, long extensions, suspensions and goodwill refunds; read the dashboard; **(v02)** all Membership reports incl. the audit review, the management dashboard | Office | desktop | v01 (Membership part); reports v02 |
| Membership Administrator (also Golf and System Administrator) | Keep policy and master data right without code changes; create corporate memberships; **(v02)** report definitions, dashboards, report access rules | Office | desktop | v01 (Membership part); reports v02 |
| Member (portal) | See their card and membership; renew, update their profile or withdraw | Home or on the move | both | v01 (Membership part) |
| Non-member account holder | Book and register where allowed | Online | both | v04 |
| Golf Operations (counter / CSO) | Run the tee sheet, check-in and the shift close | Golf counter | desktop | v03 |
| Events Team | Publish events, run registration and check-in | Events office, venue | desktop | v04 |
| Facilities Staff | Book, admit and reconcile at the counter | Facilities counter | desktop | v05 |
| Resort Front Desk | Reserve, check in and out, take payment | Resort front desk | desktop | v06 |
| Housekeeping | Turn rooms round and report faults | On the floor | both | v06 |
| Finance Officer (maker) | Turn module events into receivables, postings and payments | Finance office | desktop | v07 |
| Finance Approver (checker) | Approve money movements above the maker's limit | Finance office | desktop | v07 |

## 4. Scope
**In scope (v02, built):** features 25, 32, 37, 38, 39 (MMS-RR-001 – 008; 009, 010 as capabilities), 41, 42, 43, 150 (Club Reporting part), 160 (D-264), plus every v01 feature below (kept, D-259).

**In scope (v01, built and kept):** features 1 – 24, 26 – 31, 74 – 77, 150, 151 (amended: alternating row shading only, D-249), 157 – 159, 166, 167, 168 of `requirement-selection.md` (D-226, corrected by D-229: feature 25 is v02).

**In scope (this PRD, deferred):**

| Version | Module | Features |
|---|---|---|
| v03 | Golf | 40, 46 – 57, 161 |
| v04 | Events | 60 – 71, 162 |
| v05 | Facilities | 80 – 96, 163 |
| v06 | Resorts | 101 – 125, 164 |
| v07 | Finance | 129 – 149, 165 |

**Out of scope:**
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
| Story-003 | Membership Officer | to capture a new application with type, recruitment source and referral, and submit it through the checks | only eligible, complete, unique applications reach approval | Must | 3 · BR-002, 003, 004, 007, 171, 172, 175 | Application saved as draft and edited; Duplicate application blocked; Under-age applicant blocked; Referral needs referrer details; Missing documents put the request in Pending Documents; Submitted request is read-only | |
| Story-004 | Approver | to approve an application and have the fee handed to Finance, the membership activating only once payment is recorded | no membership starts unpaid | Must | 3 · BR-001, 005, 006, 029, 030, 173, 174, 178 | Application approved with a fee waits for payment; Payment recorded activates the membership | |
| Story-005 | Member | to renew my membership in the portal for 1, 2 or 3 years | I keep my privileges without visiting the counter | Must | 4, 27 · BR-006, 008, 009, 029, 085 | Portal renewal completes after payment; Renewal over the 30-year cap is blocked; Failed payment keeps the renewal waiting | |
| Story-006 | Membership Officer | to convert a membership between Full and Basic | the remaining term is recalculated by policy | Must | 5 · BR-008, 010 | Full to Basic doubles the remaining months | |
| Story-007 | Membership Officer | to transfer a transferable membership to an eligible recipient | the holder changes with its lineage kept | Must | 6 · BR-004, 011 | Transfer changes the holder and keeps lineage; Corporate membership cannot be transferred | |
| Story-008 | Membership Officer | to request an extension that is routed by length | long extensions get the Manager's decision | Must | 7 · BR-008, 012 | Extension over 12 months goes to the Manager; Extension over 24 months is blocked | |
| Story-009 | Member | to withdraw my membership once Finance has cleared my balance | I leave the club with no balance left behind | Must | 8, 27 · BR-013, 178 | Withdrawal completes only after the balance is cleared | |
| Story-010 | Membership Officer | to run the lifecycle check and process rejoins | lapsed memberships expire on time and returning members keep their ID | Must | 9 · BR-014 | Lifecycle check expires a membership past its expiry; Rejoin keeps the original Membership ID | |
| Story-011 | Membership Officer | to record a deceased member, with an optional beneficiary transfer and goodwill refund | the case is closed with the right approvals | Must | 10 · BR-011, 015 | Goodwill refund goes to Finance only after the Manager approves | |
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
| Story-022 | Membership Officer | to check a member's available credit | spending is allowed only within the limit | Must | 20 · BR-023 | Available credit is limit minus Finance outstanding; Credit check blocked when Finance is unavailable | |
| Story-023 | Membership Officer | to register vehicles and car labels for an active membership | access control knows the member's cars | Must | 21 · BR-024 | Fifth vehicle is blocked | |
| Story-024 | Membership Officer | to issue and replace the digital card | the member always has one valid card | Must | 22 · BR-025 | Replacement voids the previous card | |
| Story-025 | Membership Officer | referral rewards raised only under an active campaign | rewards follow policy | Should | 23 · BR-007, 030 | Referral reward needs an active campaign | |
| Story-026 | Membership Officer | to send campaigns from approved templates and see every notice in the outbox | members who withheld consent get no marketing | Must | 24 · BR-026 | Marketing campaign excludes non-consenting persons | |
| Story-027 | Membership Administrator | to maintain membership types, fees, limits, documents and transitions as effective-dated configuration | policy changes need no code | Must | 26 · BR-028 | Referenced value can be inactivated but not deleted | |
| Story-028 | Member | to see my own membership and digital card in the portal | I can show my card and check my status | Must | 27 · BR-085 | Member tab shows only its own account | |
| Story-029 | Approver | one inbox of the decisions routed to me, with return for correction | I decide quickly and never on my own request | Must | 28 · BR-005, 175, 176 | Submitter cannot approve their own request; Return for correction needs a reason and reopens the request; Reject needs a reason | |
| Story-030 | Approver | to record a fee as paid or failed through the Finance stub until Finance is built | the Membership flow completes end to end in v01 | Must | 29 · BR-006, 178 | Only an Approver records stub payments; Stub payment failure keeps the request waiting | |
| Story-031 | Membership Manager | a dashboard of members by status, pending approvals, awaiting payment and expiring in 90 days, with charts | I see the workload at a glance | Should | 30, 150 · — | Dashboard tiles match the data | v02 link: panels link to the Membership reports |
| Story-032 | Membership Officer | to see what Membership published to Access Control, GMS, HMS and the notification service | I can trace what other systems were told | Should | 31 · BR-177 | Completed request writes status feed entries | |
| Story-033 | Presenter | a launcher that opens each role and each member account in its own tab | the demo shows each role's view | Must | 74 · BR-084 | Launcher opens a role in its own tab | |
| Story-034 | Presenter | each tab to keep its role and block pages that are not for it | reviewers see exactly what each role can do | Must | 75 · BR-084 | Page not for the tab's role shows no content; Page opened without the launcher asks to use it | v02 link: report pages in the role map |
| Story-035 | Presenter | each module's steps, roles, scenarios and rules on the launcher | reviewers understand the module before running it | Should | 77 · — | Module details list the Membership scenarios with Start links | v02 link: Club Reporting scenarios |
| Story-036 | Presenter | the six modules not built yet shown as "Coming in v0N" | reviewers see the whole product and what this version covers | Must | 168 · — | Planned module cards have no links | v02 link: Club Reporting live, five planned |
| Story-037 | Presenter | the launcher in the v09 design: CC-Demo name, collapsible sections with one-line summaries and the first visible section open, module cards with alt buttons; and the Membership pages refined visually (design pass 3, D-247) | the demo looks the same as the approved rapid version, refined in the NSRCC brand | Must | 157, 158, 159 · — | Launcher sections collapse with the first visible one open; CC-Demo name everywhere | |
| Story-038 | Presenter | a scenario guide side panel started from each Start link | anyone can run a scenario step by step | Must | 166 · — | Start link opens the guide at step 1 in the right tab | |
| Story-039 | Presenter | to export the data, import it back and reset it | a review state can be kept or restored | Must | 167 · — | Export then import restores the data; Wrong file is refused; Reset restores the seed | |

### 5.1b Club Reporting (built in v02)
Moved from §5.2 (`Deferred to v02`, D-264). Wording kept, except that Story-101 now names its reports (MMS-RR-001 – 008). Acceptance in §5a (v02).

| ID | As a… | I want… | So that… | Priority | Feature · rules | Acceptance scenarios (§5a) | Flag |
|---|---|---|---|---|---|---|---|
| Story-101 | Membership Manager | membership reports (MMS-RR-001 – 008) and the audit review in the catalogue | I review listings, counts, expiry, transitions, juniors, recruitment, vehicles and actions by actor | Must | 25, 39 · BR-031 – 033 | Operational membership listing; Membership statistics and trends; Approaching expiry lists the memberships in the period; Status distribution and transitions; Juniors near the age limit; Recruitment and referral by source; Vehicles and credentials; Audit review shows actor, time and outcome | |
| Story-102 | Membership Officer | to export a report to Excel or PDF | I can share exactly what is on screen | Must | 32 · BR-034 | Excel export carries the same rows; PDF export opens the print layout; Audit review has no export | RC-103 (D-263) |
| Story-103 | Membership Officer | a report catalogue that shows only what my role may run | access follows the rules | Must | 37 · BR-031 | Catalogue shows only the role's reports; Golf reports are listed as coming in v03; Report pages are blocked for roles without reports | |
| Story-104 | Membership Manager | parameterised report runs with a valid empty result | I can narrow reports safely | Must | 38 · BR-032, 033 | Output is limited to the criteria; Missing required parameter blocks the run; No match returns a valid empty result; A run changes nothing and is kept in the run history | |
| Story-105 | Membership Administrator | user-defined reports and dashboards on approved reports | I answer new questions without code | Should | 41 · BR-035 | New definition version keeps earlier runs on their version; Definition cannot widen access; Inactivated definition leaves the catalogue and keeps its history; Management dashboard shows KPI tiles and charts | |
| Story-106 | Membership Officer | to find a legacy report name and see what replaces it | the move from the old system is clear | Should | 42 · — | Legacy name resolves to its successor report; Golf successor is coming in v03; Finance-owned name points to the Finance module | |
| Story-107 | Membership Administrator | to maintain report access rules | data scope stays controlled | Must | 43 · BR-031 | Granting a report changes the role's catalogue; Audit review cannot be granted to the Officer | |
| Story-108 | Presenter | the Club Reporting pages refined visually, with report visuals | reports read well in both themes | Should | 150, 160 · — | Each report shows KPI tiles and a chart in both themes; Club Reporting card is live with Start links; Dashboard panels link to the reports | |

### 5.2 Deferred stories (built in later versions)
Each story is confirmed and its Gherkin is written in its version's PRD, from the baseline scenarios in `workflow-request-v09.md` (SC-xx) and the rules listed. They are not gaps in `p5-01` of v01 or v02. Story-101 – 108 moved to §5.1b in v3.

| ID | As a… | I want… | So that… | Priority | Feature · rules | Acceptance (baseline scenarios) | Tag |
|---|---|---|---|---|---|---|---|
| Story-109 | Golf Operations | golf reports GMS-RR-001 – 012 on live golf data | golf operations are reported from GMS | Must | 40 · BR-031 – 034 | SC-14 | Deferred to v03 |
| Story-110 | Membership Administrator | to set up and publish tee sheets | tee capacity follows the configuration | Must | 46 · BR-036 | SC-17 | Deferred to v03 |
| Story-111 | Member | to book a tee time online or at the counter | I play when I want within the rules | Must | 47 · BR-037 – 039 | SC-18 | Deferred to v03 |
| Story-112 | Member | an automated waitlist | a released slot reaches the next golfer | Must | 48 · golf rules BR-036 – 060 | SC-19 | Deferred to v03 |
| Story-113 | Golf Operations | to amend and cancel bookings | changes follow the substitution and cancellation rules | Must | 49 · BR-036 – 060 | SC-20 | Deferred to v03 |
| Story-114 | Golf Operations | to check in golfers and release them to play | only eligible golfers tee off | Must | 50 · BR-036 – 060 | SC-21 | Deferred to v03 |
| Story-115 | Golf Operations | to handle late arrivals and no-shows | the tee sheet stays fair | Must | 51 · BR-036 – 060 | SC-21 | Deferred to v03 |
| Story-116 | Membership Manager | to suspend a course and issue rain checks | golfers are compensated by policy | Must | 52 · BR-036 – 060 | SC-22 | Deferred to v03 |
| Story-117 | Membership Administrator | to import handicap and PC eligibility data | eligibility checks use current data | Must | 53 · BR-036 – 060 | SC-23 | Deferred to v03 |
| Story-118 | Golf Operations | to block and release tee capacity | maintenance and events are protected | Must | 54 · BR-036 – 060 | SC-23 | Deferred to v03 |
| Story-119 | Golf Operations | golf charges handed to Finance | golf money is accounted for | Must | 55 · BR-036 – 060 | SC-24 | Deferred to v03 |
| Story-120 | Golf Operations | to close the shift and the day | the counter balances | Must | 56 · BR-036 – 060 | SC-25 | Deferred to v03 |
| Story-121 | Golf Operations | tee sheet and golfer enquiry | I answer golfers quickly | Should | 57 · — | SC-25 | Deferred to v03 |
| Story-122 | Presenter | the Golf pages refined visually | golf reads well in both themes | Should | 161 · — | v03 | Deferred to v03 |
| Story-123 | Events Team | to set up and publish events | members see accurate events | Must | 60 · BR-061 – 083 | SC-26 | Deferred to v04 |
| Story-124 | Non-member account holder | to register online for an event | I can join without visiting | Must | 61 · BR-061 – 083 | SC-27 | Deferred to v04 |
| Story-125 | Golf Operations (as CSO) | to register participants at the counter | walk-ins can join | Must | 62 · BR-061 – 083 | SC-28 | Deferred to v04 |
| Story-126 | Member | an event waitlist with automatic promotion | freed places are offered in order | Must | 63 · BR-061 – 083 | SC-29 | Deferred to v04 |
| Story-127 | Events Team | to review minimum participation | unviable events are decided on time | Must | 64 · BR-061 – 083 | SC-30 | Deferred to v04 |
| Story-128 | Events Team | event check-in and attendance | attendance is recorded per session | Must | 65 · BR-061 – 083 | SC-31 | Deferred to v04 |
| Story-129 | Member | to cancel my participation | forfeiture follows policy | Must | 66 · BR-061 – 083 | SC-32 | Deferred to v04 |
| Story-130 | Events Team | club-initiated cancellation with refunds | participants are refunded by policy | Must | 67 · BR-061 – 083 | SC-32 | Deferred to v04 |
| Story-131 | Events Team | club-initiated rescheduling | participants can accept or withdraw | Must | 68 · BR-061 – 083 | SC-33 | Deferred to v04 |
| Story-132 | Events Team | function-room bookings mirrored | events stay in step with the room system | Must | 69 · BR-061 – 083 | SC-33 | Deferred to v04 |
| Story-133 | Events Team | to maintain a published event | changes apply prospectively | Must | 70 · BR-061 – 083 | SC-26 | Deferred to v04 |
| Story-134 | Events Team | an events schedule and enquiry | I answer questions about events | Should | 71 · — | SC-26 | Deferred to v04 |
| Story-135 | Presenter | the Events pages refined visually | events read well in both themes | Should | 162 · — | v04 | Deferred to v04 |
| Story-136 – Story-152 | Facilities Staff, Member, Non-member account holder, Operations Manager, Administrator | eligibility and entitlement, availability and blocks, create / amend / cancel bookings with refunds, no-show, payment and hand-off, swimming and fitness admission with day passes, bowling counter, reconciliation and exceptions, waiting list, configuration, Fitness Centre information, Personal Training, operational reports (one story per feature 80 – 96, in order) | facilities are booked, admitted and reconciled by policy | Must (95, 96 Should) | 80 – 96 · BR-086 – 106 | SC-36 – SC-43 | Deferred to v05 |
| Story-153 | Presenter | the Facilities pages refined visually | facilities read well in both themes | Should | 163 · — | v05 | Deferred to v05 |
| Story-154 – Story-178 | Resort Front Desk, Housekeeping, Member, Operations Manager, Administrator | configuration, rates and policy, create / group / hold / amend / cancel reservations, waitlist, no-show, payment and folio, refund, discounts and adjustments, check-in, in-house charges, vehicles, housekeeping, maintenance blocks, access credentials, check-out, reversal, Night Audit, FIN-OPS hand-off, reports, audit log, notifications (one story per feature 101 – 125, in order) | accommodation runs end to end with the draft rules shown | Must (123 – 125 Should) | 101 – 125 · BR-107 – 132 | SC-44 – SC-52 | Deferred to v06 |
| Story-179 | Presenter | the Resorts pages refined visually | resorts read well in both themes | Should | 164 · — | v06 | Deferred to v06 |
| Story-180 – Story-200 | Finance Officer, Finance Approver | Finance home, event intake, postings with GST, configuration with maker-checker, receivables, payments and allocation, standing orders, bank results, spending credit, refunds, deferred revenue, entrance-fee amortisation, reconciliation and cashier close, adjustments, periods, Yonyou staging and responses, exceptions, dunning, General AR, Finance reports (one story per feature 129 – 149, in order) | every module's money is accounted for in one place | Must (149 Should) | 129 – 149 · BR-133 – 170 | SC-53 – SC-62 | Deferred to v07 |
| Story-201 | Presenter | the Finance pages refined visually | finance reads well in both themes | Should | 165 · — | v07 | Deferred to v07 |
| Story-202 | Approver | the Finance stub replaced by FIN-OPS for every Membership fee, refund and clearance | Membership money flows through Finance | Must | 29 (v07) · BR-178 retired, BR-133 – 170 | SC-01, 03, 04, 05, 07, 09 Finance steps | Deferred to v07 |

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

Scenario: Catalogue shows only the role's reports (Story-103, BR-031)    # brief: S1
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

Scenario: Missing required parameter blocks the run (Story-104, BR-032)    # brief: S3
  When the Manager runs MMS-RR-004 with the period From left empty
  Then the run is refused with the BR-032 message naming the period
  And no run is added to the run history

Scenario: No match returns a valid empty result (Story-104, BR-033)    # brief: S4
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

Scenario: Approaching expiry lists the memberships in the period (Story-101, MMS-RR-003)    # brief: S2
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

Scenario: Audit review shows actor, time and outcome (Story-101, MMS-RR-007, BR-031)    # brief: S5
  When the Manager runs MMS-RR-007 for October 2026
  Then each material action is listed with action, actor, role, timestamp, record and outcome

Scenario: Excel export carries the same rows (Story-102, BR-034)    # brief: S6
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

Scenario: New definition version keeps earlier runs on their version (Story-105, BR-035)    # brief: S7
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

Scenario: Legacy name resolves to its successor report (Story-106)    # brief: S8
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
- **Deferred modules:** §5.2; workflows in `workflow-request-v09.md` (baseline) and the module summaries in `discovery-summary.md`.

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
- **Prototype limitations:** roles come from the launcher (no sign-in); Finance is a stub until v07 (an Approver records payment); Access Control, GMS and HMS receive stub feed entries only; notifications go to an outbox; documents are ticked as received (no upload); the nightly job is the **Run lifecycle check** button on a fixed demo date of 28 Oct 2026; all data is invented.
- **Known limits (v02):** Finance stub (BR-178); status feed stubs; hand-offs to Golf, Events, Facilities and Resorts appear only as planned module cards; golf reports listed as "Coming in v03"; Excel export is an .xls file built in the browser and PDF is the browser print (D-031); user-defined reports and the dashboard stand in for the unchosen BI tool (D-028); scheduled delivery not built (feature 44).
- Open at NSRCC (not blocking): Club Reporting as a separate module (option A, demo choice), report role matrix (OD-003, demo matrix D-262), BI tool (MMS-CFG-133), report layout (GMS OI-05), OD-001 eligibility matrix, OD-002 document matrix, OD-003 approval matrix, Business Rules Catalogue entries MMS-BR-092 – 103.

## 8a. ⚠ Requirements kept against advice (user overrides)
None (0 open overrides).

## 9. Change history
| Version | Date | Change |
|---|---|---|
| v1 | 2026-11-06 | First PRD of the full build (KO-029): all 7 modules; v01 stories 001 – 040 with Gherkin; deferred stories 101 – 202 tagged by version |
| v2 | 2026-11-06 | RC-102 (D-249): Story-040 and its scenario removed (39 v01 stories, 65 scenarios); feature 151 amended for the whole build to alternating row shading only (no status tint, no left marker), now an NFR; feature 159 moved to Story-037 (delivered by design pass 3, D-247). Alignment corrections: synthetic ID rule now `ID-nnnn` (D-231); accessibility WCAG 2.2 AA as in the brief. S1 – S8 unchanged |
| v3 | 2026-11-10 | v02 (KO-030), compared with v2 (v01): Story-101 – 108 moved from §5.2 `Deferred to v02` to §5.1b (D-264); Story-101 names its reports MMS-RR-001 – 008, Story-102 export designation per RC-103 (D-263); 30 v02 scenarios added (95 in all); brief tags S1 – S8 moved to the v02 scenarios; decision to inform restated (D-260); goals, roles, scope, functional requirements and known limits updated for Club Reporting; Story-031, 034, 035, 036 marked v02 link (D-259). No story dropped, no new requirement |
