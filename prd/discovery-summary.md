> Build: full-build · Version: v08 · KO: KO-037 · from v07

> Imported from rapid-build-v09 at KO-029

# Discovery Summary: CC-Demo club management system (full build v02)

> **Full build, KO-029.** The sections *Full build v01* to *Changes since import* below are new (✚). The sections after them are the imported rapid-build-v09 summary (v01 – v09), kept as history and confirmed by items 1 – 8 of the p1-01 batch.

## ✚ Changes in v08 (KO-037) *(confirmed: D-394, D-395)*
- **Sources read (v08, KO-037):** the KO-037 prompt (look-only refine) and the design canvas *NEARCC Brand Guideline* (`artifacts/design/design-canvas-v08.md`); no `--input`, nothing else in `input/` read.
- **No change to the use case, actors, scope or requirements** (prompt). The canvas changes the look only; its conflicts with the prompt are RC-208 – RC-234 (re-raised after the design restart, D-393: no StarHub branding; RC-188 – RC-207 withdrawn).

## ✚ Changes in v07 (KO-035) *(confirmed: D-371, D-372)*
v07 builds **Finance (FIN-OPS)** and is the **final version**. Phases 1 – 2 move the PRD v7 stories tagged `Deferred to v07` (Story-180 – 202; features 129 – 149, 165 and 29 (v07); BR-133 – 170) to Selected. **No other requirement is added** (KO-035 prompt): features 152 – 156 stay Not selected (real Yonyou, bank and payment-provider links, POS vendor specifics, interest, the 9 FIN-OPS reports covered by screens, edge cases). After v07 no story is Deferred and no module is "Coming in v0N" (RC-184). Everything below this section is v01 – v06, kept (D-369).

**Sources read (v07, KO-035):** no new input (no `--input`; nothing in `input/` read). The Finance stories, rules and terms come from the v06 copy: PRD v7 §5.2, `business-rules.md` (BR-133 – 170 with their FIN-OPS sources and status), `requirement-selection.md` (features 129 – 149, 165), `glossary.md` (finance terms), and the import study material already cited in v01 (rapid v09 *v08: Finance (FIN-OPS)*, the rapid clarifications RC-072 – RC-089 and their decisions D-154 – D-171, confirmed for the PRD at D-218).

**Source status (prompt: mark Interim Design and TBC, raise each):** of 261 FIN-OPS requirements, 141 are *Interim Design* pending Finance validation and 6 are *TBC* pending vendor confirmation. Of the 38 rules, 7 are Confirmed, 5 Proposed and 26 Interim Design or TBC. Each Interim Design or TBC rule is marked as such and raised as its own clarification (RC-154 – RC-179), with the rapid value as the recommendation; none is assumed (RC-146).

**Decision to inform (v07, D-370):** *Should we build Finance (FIN-OPS) as the one place every module's money is accounted for, completing the club system across all seven modules?* (type `validate`)

**Actors in v07 (RC-180):** **Finance Officer** (*R. Tan*, maker) and **Finance Approver** (*C. Lau*, checker), new role tabs.

**Conflicts with existing rules (prompt: flag):** Finance clicks in the Membership scenarios vs automatic intake (RC-147; BR-006, BR-178); refund approval in the modules vs the FIN-OPS matrix (RC-148; BR-015, 078, 096, 119); refunds of in-house credit (RC-149; BR-095, 115); module closes vs the cashier batch close (RC-150; BR-060, 102, 130); resort credit notes (RC-151; BR-121); the credit check (RC-152; BR-023); the payment service and the Known limits (RC-153; BR-092, 118).

**Connections to earlier modules:** Membership (fees, renewals, withdrawal clearance, goodwill refund, credit, dunning escalation), Golf (charges, shift close), Events (payments, refunds), Facilities (payments, refunds, bowling), Resorts (deposits, payments, refunds, credit notes, Night Audit, revenue per night), Club Reporting (10 Finance reports, RC-183), launcher and role map (RC-180, RC-184), Integration feed and Import (RC-185), Portal (RC-186).

## ✚ Changes in v06 (KO-034) *(confirmed: D-348, D-349)*
v06 builds **Resorts (HMS Resorts)** only. Phases 1 – 2 move the PRD v6 stories tagged `Deferred to v06` (Story-154 – 179; features 101 – 125, 164; BR-107 – 132) to Selected. **No other requirement is added** (KO-034 prompt): features 126 – 128 (Accommodation Pass and the other rapid *Not selected* items) stay Not selected. Finance (Story-180 – 202) stays `Deferred to v07`. Everything below this section is v01 – v05, kept (D-346).

**Sources read (v06, KO-034):** no new input (no `--input`; nothing in `input/` read). The Resorts stories, rules and terms come from the v05 copy: PRD v6 §5.2, `business-rules.md` (BR-107 – 132 index), `requirement-selection.md` (features 101 – 125), `glossary.md` (resort terms), and the import study material already cited in v01 (rapid v09 `discovery/business-rules.md` BR-107 – 132 with their HMS-RES sources and status, `discovery-summary.md` *v07: HMS Resorts*, the rapid clarifications RC-055 – RC-071 and their decisions D-128 – D-148, confirmed for the PRD at D-218).

**Source status (prompt: raise every TBC or For Validation item):** the Resorts pack is **draft**: every rule, process and requirement is *Draft, For Validation*, priority TBC, and 7 of 25 processes are *Cannot finalize* (P-005 hold, P-009 no-show cutoff, P-011 refund threshold, P-018 Accommodation Pass, P-020 reversal, P-021 closure boundary, P-024 audit actors). The values D-218 confirmed in v01 are **not** assumed: each TBC item is raised again as RC-120 – RC-144, with that value as the recommendation.

**Decision to inform (v06, D-347):** *Should we build Resorts (configuration, rates and policy, reservations with groups, holds, amendment, cancellation, waitlist and no-shows, payment and folio, refunds and adjustments, check-in and check-out with access credentials and vehicles, housekeeping and maintenance blocks, Night Audit, reports, audit log and notifications) on the Membership base, with every draft rule confirmed or flagged?* (type `validate`)

**Actors in v06 (RC-142):** **Resort Front Desk** (new role tab, *K. Wong*) and **Housekeeping** (new role tab, *H. Ong*); the Manager as Operations Manager (resort refunds, adjustments, exceptions, reversals, Draft configuration); the Administrator (resort configuration); members and non-member account holders in the Portal (RC-143).

**Eligibility from Membership (prompt):** guests are existing `persons`, `memberships` (dependants by their own membership) and `accountHolders`, referenced by ID; only an Active membership reserves at member rates (BR-018 – 020, BR-108); windows, maximum stays, privileges and discounts by membership type (RC-126, RC-127).

**Conflicts with Facilities and Events (prompt):** visitor pass and *Bungalow guest* (RC-121, Facilities); waitlist rules (RC-122, Events and Facilities); refund policy (RC-123, Events and Facilities); configuration approval (RC-124, Facilities); vehicles (RC-125, Membership). No other conflict found with Events: Resorts excludes events and function rooms (HMS Events owns them).

**Connections to earlier modules:** launcher (Resorts live, its details tab, resort scenarios, the two roles; the Scenarios section removed and Module details moved into its place, RC-145), role map (BR-084), Portal (RC-143, BR-085), Approvals (Resort refunds, exceptions, configuration), Finance stub (RC-141), Integration feed, Communications outbox (RC-138), Facilities (visitor pass, RC-121), Report catalogue (5 Resorts reports, RC-140), Import file check (resort collections). Finance v07 stays "Coming in v07", its stories `Deferred to v07` (Deferred, not gaps, in p5-01).

## ✚ Changes in v05 (KO-033) *(confirmed: D-325, D-326)*
v05 builds **Facilities (HMS Facilities)** only. Phases 1 – 2 move the PRD v5 stories tagged `Deferred to v05` (Story-136 – 153; features 80 – 96, 163; BR-086 – 106) to Selected. **No other requirement is added** (KO-033 prompt). Everything below this section is v01 – v04, kept (D-323).

**Sources read (v05, KO-033):** no new input (no `--input`; nothing in `input/` read). The Facilities stories, rules and terms come from the v04 copy: PRD v5 §5.2, `business-rules.md` (BR-086 – 106), `glossary.md` (*v06 · HMS Facilities terms*), `requirement-selection.md` (features 80 – 96, 163), the facilities assumptions confirmed for the full build in v01 (D-105 – D-119, D-218: actors D-105, eligibility matrix D-106, catalogue D-107, windows D-108, rates D-109, payments D-110, visitor pass D-111, bowling file D-112, waiting list D-113, Personal Training D-114, configuration approval D-115, self-service D-116, reports D-117, swimming lessons D-118, launcher D-119), and the rapid v09 Facilities report list (`FAC-RR-001 – 008`, names only).

**Decision to inform (v05, D-324):** *Should we build Facilities (eligibility and entitlement, availability and blocks, bookings with amendment, cancellation, refunds and no-shows, swimming and fitness admission with day passes, bowling counter and reconciliation, waiting list, configuration, Fitness Centre and Personal Training, operational reports) on the Membership base, with Events venues linked to the Facilities records?* (type `validate`)

**Actors in v05 (D-105, D-115, D-116):** **Facilities Staff** (new role tab, *Facilities Staff F. Tan*: counter bookings, amendments and cancellations, no-shows, blocks, admissions and day passes, Bowling counter and reconciliation, exceptions, waiting list, Personal Training); the **Membership Manager** acts as Operations Manager (exceptional refunds, approval of Draft configuration); the **Membership Administrator** keeps facility configuration and the Fitness Centre reference lists; **members** and **non-member account holders** book, amend, cancel and join the waiting list in the Portal. Events Team, Golf Operations, Officer and Approver keep their v04 pages.

**Customer data and entitlement (prompt):** customers are the existing `persons`, `memberships` (and dependants through `responsibleMembershipId`) and `accountHolders`, referenced by ID; no member record is copied. Eligibility and entitlement (BR-086) read the membership status and privileges through the existing rules (BR-018 – 020): member rates only for an Active member. SAFRA members and guests are customer categories without a source module (RC-113); the bungalow visitor pass stays the simulated list of D-111, because Resorts is v06 (RC-114).

**Events venues (prompt, RC-116):** the six configured event venues become Facilities records; Event setup picks its venue from them, and the Events, Event and setup pages show the venue as a link to its facility. A published event session blocks its venue (block type *Event*, BR-088) where the venue is a bookable resource.

**Connections to earlier modules:** launcher (Facilities live, its details tab, scenarios SC-36 – 43, guides, the Facilities Staff role), role map (BR-084), Portal (facility bookings, waiting list and day passes, BR-085), Approvals (exceptional refunds and Draft configuration for the Manager), Finance stub (facility payments, refund instructions and bowling escalations, RC-115), Integration feed (facility payments and hand-offs), Events (venues, RC-116; swimming lessons link to Events, D-118), Report catalogue (8 Facilities reports switched on, RC-117), Import file check (facility collections). Resorts v06 and Finance v07 stay "Coming in v0N", their stories `Deferred to v0N` (Deferred, not gaps, in p5-01).

## ✚ Changes in v04 (KO-032) *(confirmed: D-304, D-305)*
v04 builds **Events (HMS Events)** only, plus one Report catalogue change. Phases 1 – 2 move the PRD v4 stories tagged `Deferred to v04` (Story-123 – 135; features 60 – 71, 162; BR-061 – 083) to Selected. **No other requirement is added** (KO-032 prompt), except the catalogue change the prompt asks for (features 32 and 37, Story-102 and 103: the green Export badge becomes one button per export format, RC-112). Everything below this section is v01 – v03, kept (D-302).

**Sources read (v04, KO-032):** no new input (no `--input`; nothing in `input/` read). The Events stories, rules and terms come from the v03 copy: PRD v4 §5.2, `business-rules.md` (BR-061 – 083), `glossary.md` (Events terms), `requirement-selection.md` (features 60 – 71, 162), and the events assumptions confirmed for the full build in v01 (D-063 – D-081, D-218: roles D-063, participants and non-member accounts RC-018, settlement RC-019, event catalogue and rates RC-020, hold and offer timers RC-021, QR RC-022, function-room feed RC-023, calendar RC-024, cancelling one participant RC-025, RR-001 – 003 placement RC-026, notifications RC-028, personnel RC-029). The keep list (`keep-list-v04.md`).

**Decision to inform (v04, D-303):** *Should we build Events (event setup and publication, online and counter registration, waitlist with promotion, minimum participation, check-in and attendance, cancellation and refunds, rescheduling, function-room mirroring) on the Membership base, reusing member eligibility and relationships?* (type `validate`)

**Actors in v04 (D-063):** **Events Team** (new role tab, *Events Team E. Koh*: set up, publish and maintain events, minimum participation, check-in and attendance, cancellation and rescheduling, function-room feed); the **Membership Manager** acts as Events Manager (authorises refunds before they go to Finance, BR-078, 079); **Golf Operations** acts as Customer Service Officer at the counter (Story-125); the **Member** and **non-member account holders** register online in the Portal (RC-018, RC-110).

**Member data and relationships (prompt):** participants are the existing `persons` and `memberships` (and their dependants: supplementary and junior memberships through `responsibleMembershipId`), referenced by ID; no member record is copied. Event eligibility (BR-063) and the member rate (BR-064) read the membership status and privileges through the existing rules (BR-019). Non-member account holders are their own records (RC-018).

**Venues:** an event names its venue from a configured list (Seletar Ballroom, Kranji Function Room, Lakeside Lawn, Aquatic Centre, Activity Room 2, Multi-purpose Court); these are references only, because Facilities (rooms, resources, blocks) is built in v05 (prompt).

**Connections to earlier modules:** launcher (Events live, its details tab, scenarios, guides, the Events Team role and non-member accounts), role map (BR-084), Portal (event registrations, BR-085), Approvals (event refund authorisations for the Manager), Finance stub (event payments and refunds, RC-111), Integration feed (event and function-room messages), Report catalogue (export buttons, RC-112; no Events report, RC-109), Import file check (event collections). Facilities v05, Resorts v06 and Finance v07 stay "Coming in v0N".

## ✚ Changes in v03 (KO-031) *(confirmed: D-284, D-285)*
v03 builds **Golf (GMS)** only, plus one launcher fix. Phases 1 – 2 move the PRD v3 stories tagged `Deferred to v03` (Story-109 – 122; features 40, 46 – 57, 161, and the golf part of 150; BR-036 – 060) to Selected. **No other requirement is added** (KO-031 prompt), except the launcher fix the prompt asks for (feature 77, Story-035, RC-104). Everything below this section is v01 and v02, kept (D-282).

**Sources read (v03, KO-031):** no new input (no `--input`; nothing in `input/` read). The Golf stories, rules and terms come from the v02 copy: PRD v3 §5.2, `business-rules.md` (BR-036 – 060), `glossary.md` (Golf terms), `requirement-selection.md` (features 40, 46 – 57, 161), and the golf assumptions confirmed for the full build in v01 (D-043 – D-057, D-218: rate table D-044, windows and intervals D-045, Finance hand-off D-046, staff pages D-047, handicap extract D-048, offer timer D-055). The keep list (`keep-list-v03.md`).

**Decision to inform (v03, D-283):** *Should we build Golf (tee sheets, booking and waitlist, check-in, rain checks, eligibility imports, capacity blocks, shift close, golf reports) on the Membership and Club Reporting base, reusing member data and eligibility?* (type `validate`)

**Actors in v03 (RC-107):** **Golf Operations** (new role tab, *Golf Ops G. Lim*: tee sheet, counter booking, check-in, late arrivals, blocks, shift close, golf reports); the **Membership Manager** acts as Golf Manager and Club Captain (approvals of waivers and extensions, course suspension, second same-day round); the **Membership Administrator** acts as Golf Administrator (tee-sheet setup and publication, handicap import, golf settings); the **Member** books online in the Portal. Officer and Approver: no golf work.

**Member data (prompt):** golfers are the existing `persons` and their `memberships`, referenced by ID; no member record is copied. A golfer profile holds only what Membership does not (handicap index, NSRCC PC, insurance). Guest golfers are their own records (non-members). Golf eligibility (BR-040, 041) reads the membership status, type and privileges through the existing rules (BR-019).

**Connections to earlier modules:** launcher (Golf live, its details tab, scenarios, guides, the Golf Operations role), role map (BR-084), Configuration (golf settings; golf reports in Report access), Finance stub (golf charges, stays a stub, RC-106), Integration feed (golf events), Dashboard and Report Catalogue (the 12 golf reports switch on over the live golf records), Legacy report finder (GMS successors live), Import file check (golf collections). Events v04, Facilities v05, Resorts v06 and Finance v07 stay "Coming in v0N".

## ✚ Changes in v02 (KO-030) *(confirmed: D-262, D-263)*
v02 builds **Club Reporting** only. Phases 1 – 2 move the PRD v2 stories tagged `Deferred to v02` (Story-101 – 108; features 25, 32, 37 – 39, 41 – 43, 160, and 150 for reports; BR-031 – 035) to Selected and confirm them against `input/GMS/`. **No other requirement is added** (KO-030 prompt). Everything below this section is v01, kept (D-259).

**Sources read (v02, KO-030):** `input/GMS/nsrcc-brand-guideline.md` (identical to the v01 copy); `input/GMS/Reporting-PRDs/prd-reporting/README.md`; RPT-P-001 … RPT-P-006 `PRD.md` (CMS-Prototype-037 … 042); `legacy-report-mapping.csv` (147 names: 84 MMS, 63 GMS; 70 approved requirement, 52 Finance-owned, 15 out of scope, 10 source-module output). The v01 output (source) and the keep list (`keep-list-v02.md`). Other `input/` folders not read (KR-015). The input matches the v01 PRD's v02 stories: no new approved requirement appears in it.

**Decision to inform (v02, D-260):** *Should we build Club Reporting (role-governed catalogue, parameterised runs, export, user-defined reports and dashboards, legacy finder) on the Membership base, as the reporting layer each later module plugs into?* (type `validate`)

**Actors in v02:** Membership Officer (runs operational membership reports, exports, legacy finder), Membership Manager (all Membership reports incl. statistics and the audit review), Membership Administrator (all reports, report definitions, dashboards, access rules). Approver and Member run no reports. Golf Operations, Golf Management / Audit come with v03; the source's Marketing Officer is not a CC-Demo role (recruitment and referral reporting is run by the Officer, as in rapid D-027).

**Confirmed against `input/GMS/` (one line each):**
- RPT-P-001 catalogue and access governance → features 37, 43; BR-031. GMS-RR-010 (override audit) reads golf data → v03.
- RPT-P-002 parameterisation and generation → feature 38 (MMS-RR-009, 010; BR-032, 033) and 39 (MMS-RR-001 … 008). GMS-RR-001 … 009, 011, 012 → v03 (D-220).
- RPT-P-003 export → feature 32 (GMS-RR-013; BR-034). RC-103 resolved (D-263): MMS-RR-001 – 006 and 008 are designated for export; MMS-RR-007 is not; golf reports from v03.
- RPT-P-004 user-defined reports and dashboards → feature 41 (MMS-CFG-133; BR-035); BI tool simulated (D-028).
- RPT-P-005 scheduled delivery → feature 44, stays **Not selected** (no approved requirement; the PRD forbids building it).
- RPT-P-006 legacy retirement and mapping → feature 42 (`legacy-report-mapping.csv`, as given).
- Feature 25 (Membership reports and audit review) is delivered through 37 – 39; 150 (report visuals) and 160 (visual refinement) apply to the Club Reporting pages.

**Superseded for v02:** rapid D-026 (invented golf data for golf reports) is replaced by D-220: golf reports are listed but run only from v03.

**Open questions at NSRCC (stay open, demo assumptions here):** module option A or B, role and data-scope matrix (MMS OD-003), BI tool (MMS-CFG-133), report layout and branding (GMS OI-05), phone treatment of dense tables.

## ✚ Full build v01: sources read (KO-029)
| Source | Used for |
|---|---|
| KO-029 prompt | Version plan (7 versions, one module each), v01 scope split, visual design to keep, deferred stories, stubs |
| `input/MMS/**` (25 PRDs + brand guide) | Membership: built in v01 (Phases 1 – 5) |
| `input/GMS/**` (6 RPT PRDs, `legacy-report-mapping.csv`, brand guide) | Club Reporting: Phases 1 – 2 in v01, built in v02 |
| `input/GMS-2/**` (11 GMS PRDs, brand guide) | Golf: Phases 1 – 2, built in v03 |
| `input/HMS-Event/**` (11 PRDs, brand guide) | Events: Phases 1 – 2, built in v04 |
| `input/HMS-Facility/**` (17 PRDs, brand guide) | Facilities: Phases 1 – 2, built in v05 |
| `input/HMS-Resort/**` (25 PRDs, brand guide) | Resorts: Phases 1 – 2, built in v06 |
| `input/Finance/**` (19 PRDs, brand guide) | Finance: Phases 1 – 2, built in v07 |
| `output/rapid-build-v09/discovery/*`, `design/*`, `demo/*`, `prototype/**`, `HOW-TO-RUN.md` | Study material (I1): rules, glossary, 166 features, 62 scenarios, 53 screens, 170 rules, seed, v09 look |
| `artifacts/diagrams/workflow-request-v09.md`, `sitemap-v09.md` | Workflow baseline for `p2-01`, screen map for `p3-04` |
| `documentation/chat-history/rapid-build-v09/*` (3) | Open items of v09 |
| Decision log, rapid-prototype rows of v01 – v09 (D-001 … D-214, RC-001 … RC-098, SO-001 … SO-029) | Carried flagged assumptions (table below), resolved clarifications, sign-offs |

Every file is listed with its size and time in `documentation/chat-history/full-build/01-discovery.md`. The 122 PRDs were distilled into the rapid summaries below over KO-007 … KO-028. This build re-reads each module's PRDs in full in the version that builds it (MMS now). Phases 1 – 2 of v01 take the other modules from the rapid summaries, rules and glossary, checked against the PRD indexes.

## ✚ Decision to inform
*Should we build CC-Demo's Membership module, with the request → approval → payment → activation flow shown for the Membership Officer, Approver, Manager, Administrator and Member, as the base for the other six modules?* (type `validate`; Q-001)

## ✚ Version plan (from the KO-029 prompt)
| Version | Module | Phases 1 – 2 (PRD) | Phases 3 – 5 (built) | PRD stories tagged |
|---|---|---|---|---|
| v01 | Membership (MMS) + launcher | all 7 modules | Membership and the launcher | — (built) |
| v02 | Club Reporting | in v01 PRD | Club Reporting | `Deferred to v02` |
| v03 | Golf (GMS) | in v01 PRD | Golf | `Deferred to v03` |
| v04 | Events (HMS Events) | in v01 PRD | Events | `Deferred to v04` |
| v05 | Facilities (HMS Facilities) | in v01 PRD | Facilities | `Deferred to v05` |
| v06 | Resorts (HMS Resorts) | in v01 PRD | Resorts | `Deferred to v06` |
| v07 | Finance (FIN-OPS) | in v01 PRD | Finance | Built in v07 (was `Deferred to v07`) |

- Deferred stories are not gaps in `p5-01`. The other six modules show on the launcher as "coming in a later version".
- Hand-offs from Membership to modules that are not built yet are stubs, logged as Known limits: the Finance fee hand-off, the GMS / HMS / Access Control status feed and report data.
- Keep v09's visual design: the CC-Demo name in the NSRCC palette (RC-092), collapsible sections with one-line summaries and the first visible section open (D-195), module cards with alt buttons (RC-095), the scenario guide side panel (D-209).

## ✚ Actors (full build: goal, context, device)
| Actor | Type | Module(s) | Goal | Context | Device | Built in |
|---|---|---|---|---|---|---|
| Membership Officer | human | MMS, Reporting | Capture applications and requests correctly, first time | Membership counter and back office, office hours | desktop | v01 |
| Approver | human | MMS | Decide requests quickly with the evidence in front of them | Back office, from an inbox | desktop | v01 |
| Membership Manager (also Golf, Events and Operations Manager) | human | all | Authorise exceptions and refunds; read reports | Office; approval inbox and dashboard | desktop | v01 (Membership part) |
| Membership Administrator (also Golf Admin, System Admin) | human | all | Keep policy and master data right, with no code change | Office | desktop | v01 (Membership part) |
| Member (portal) | human | MMS, Golf, Events, Facilities, Resorts | Self-serve renewals, profile, card, bookings | Home or on the move | both | v01 (Membership part) |
| Non-member account holder | human | Events, Facilities, Resorts | Book and register where allowed | Online | both | v04 |
| Golf Operations (counter / CSO) | human | Golf, Reporting, Events counter | Run the tee sheet, check-in and the shift close | Golf counter | desktop | v03 |
| Events Team | human | Events | Publish events, run registration and check-in | Events office, venue | desktop | v04 |
| Facilities Staff | human | Facilities | Book, admit and reconcile at the counter | Facilities counter | desktop | v05 |
| Resort Front Desk | human | Resorts | Reserve, check in and out, take payment | Resort front desk | desktop | v06 |
| Housekeeping | human | Resorts | Turn rooms round and report faults | On the floor | both | v06 |
| Finance Officer (maker) | human | Finance | Turn module events into receivables, postings and payments | Finance office | desktop | v07 |
| Finance Approver (checker) | human | Finance | Approve money movements above the maker's limit | Finance office | desktop | v07 |
| Finance (FIN-OPS) | system | all | Receives fee events, confirms payment | Stub until v07 | — | v07 |
| Notification service | system | all | Sends templated notices | Simulated outbox | — | v01 |
| Access Control, Salto, Alphawave | system | MMS, Resorts | Consume status, vehicles and credentials | Simulated feed | — | v01 (MMS feed) |
| SGA CHS, Function Room Booking System, Bowling Management System, Payment gateway, Yonyou, bank | system | Golf, Events, Facilities, Resorts, Finance | External sources and targets | Simulated in their module's version | — | v03 – v07 |

## ✚ Gap-fill for a working prototype (v01, Membership)
- **Data volume (Q-006):** the v09 MMS seed (28 persons, 24 memberships, all 12 types and 8 statuses, 13 requests, 6 vehicles, 7 cards) is the base, extended where a PRD story needs a record.
- **Persistence (Q-007):** browser storage behind `store.js`, with Reset and Export/Import (option A), decided in `p3-03`.
- **Demo date:** fixed at 28 Oct 2026 (D-020), so the expiry, renewal and start-date rules have dates to work on.
- **Stubs (Q-004):** the Finance fee hand-off waits at *Payment pending* with a labelled stub action. The status feed to GMS, HMS and Access Control is written to the integration log only.

## ✚ Carried ⚑ flagged assumptions (to confirm or replace, p1-01 items 10 – 19)
| Item | Group | Decisions | Recommended | Answer |
|---|---|---|---|---|
| 10 | Membership policy (v01) | D-004 approval matrix, D-005 / D-019 Membership ID, D-006 TBC policy values, D-007 document matrix, D-008 statuses, D-009 fees, D-010 start date, D-013 no grace period, D-014 glossary terms | Confirm | Confirmed (D-218) |
| 11 | Membership demo data and simulation | D-011 simulated systems (Finance now a stub until v07), D-012 / D-018 seed size, D-020 demo date | Confirm (D-011 as amended) | Confirmed (D-218) |
| 12 | Brand and v09 look | D-002 NSRCC palette, D-003 offline brand items, D-016 AA status colours, D-181 / D-182 CC-Demo rename, D-183 / D-184 / D-187 launcher, D-191 v09 design, D-195 collapsible sections, D-209 scenario guide | Confirm | Confirmed (D-218) |
| 13 | Launcher and per-tab roles | D-085 / D-097 role per tab, D-086 member tabs, D-087 role-blocked pages, D-088 module list, D-090 Start links | Confirm | Confirmed (D-218) |
| 14 | Club Reporting (v02) | D-026, D-027, D-028, D-031, D-035, D-036, D-037, D-040 | Confirm for the PRD | Confirmed (D-218) |
| 15 | Golf (v03) | D-043 … D-046, D-048 … D-050, D-054 … D-057 | Confirm for the PRD | Confirmed (D-218) |
| 16 | Events (v04) | D-063 … D-071, D-074, D-075, D-078, D-081 | Confirm for the PRD | Confirmed (D-218) |
| 17 | Facilities (v05) | D-105 … D-119 | Confirm for the PRD | Confirmed (D-218) |
| 18 | Resorts (v06) | D-128 … D-144, D-148 | Confirm for the PRD | Confirmed (D-218) |
| 19 | Finance (v07) | D-154 … D-171, D-174 | Confirm for the PRD | Confirmed (D-218) |
| 20 | Rapid-only, not carried | A-001 persona (D-001); test-gap acceptances D-022 (seed masking, kept as a rule), D-060, D-124, D-150, D-176 | Drop: not applicable to a full build | Dropped (D-219) |

## ✚ Open questions (full build)
| ID | Question | Blocking? | Recommended answer | Final answer |
|---|---|---|---|---|
| Q-001 | Decision to inform | yes | As stated above | As recommended (Explicit, D-217 – D-223) |
| Q-002 | Version-to-module map and `Deferred to v0N` tags | yes | As in the version plan | As recommended (Explicit, D-217 – D-223) |
| Q-003 | Club Reporting (v02) comes before the modules it reports on (RC-099) | yes | v02 builds the catalogue, governance, export, user-defined reports and the MMS reports. Each other module's reports are built with that module (golf in v03 …) and tagged to that version | As recommended (Explicit, D-217 – D-223) |
| Q-004 | Behaviour of the Finance stub in v01 | yes | The request stops at *Payment pending*. An Approver presses **Record payment (Finance stub)** to continue, labelled "Finance comes in v07". Known limit | As recommended (Explicit, D-217 – D-223) |
| Q-005 | The launcher in v01 | no | All 7 module cards: Membership live, the other six greyed out with "Coming in v0N". Only the Membership roles and the member tabs are listed | As recommended (Explicit, D-217 – D-223) |
| Q-006 | Seed size for v01 | no | v09 MMS seed as the base, extended per story | As recommended (Explicit, D-217 – D-223) |
| Q-007 | Persistence | no | Option A, decided in `p3-03` | As recommended (Explicit, D-217 – D-223) |
| Q-008 | Devices | no | Staff desktop; Member both (responsive to 375px) | As recommended (Explicit, D-217 – D-223) |

## ✚ Changes since import
- Title: "NSRCC MMS demo" → "CC-Demo club management system (full build v01)"
- New: full-build sources, decision to inform, version plan, actors with goal, context and device, gap-fill, carried-assumption table, open questions Q-001 … Q-008
- The rapid label is replaced by `Imported from rapid-build-v09 at KO-029`. The rapid sections below are unchanged history

---

# Imported rapid summary (rapid-build v01 – v09)

## Sources read
| File | Used for |
|---|---|
| `input/MMS-PRDs/prd/README.md` | Index of the 25 work orders (CMS-Prototype-001 … 025 / MMS-P-001 … 025) |
| `input/MMS-PRDs/prd/CMS-Prototype-001 … 025/PRD.md` (25 files) | Summary, main / alternative / exception flows, functional, data, notification and reporting requirements, business rules (MMS-BR-xxx), configured values, corporate fees sheet (016, 018) |
| `input/nsrcc-brand-guideline.md` | Colours, type, radius, components and voice of the NSRCC web pages (D-002, D-003) |
| `input/README.md` | Template readme, not read as input |

Not available: the NSRCC logo PNG and the saved web pages cited by the brand guide are not in `input/` (D-003); Business Rules Catalogue v1.2 (MMS-BR-092 … 103 are cited but not supplied).

## Problem statement
NSRCC (National Service Resort & Country Club) runs membership on a customised legacy system in use since about 2000, with duplicate manual steps, legacy sub-ledgers and obsolete processing. The club needs a digital-first, configuration-driven MMS that controls every membership lifecycle event through approval, document and payment gates, keeps full audit history, and hands financial values to Finance instead of owning them.

## Business context
- **Organisation:** NSRCC, club management system programme; MMS is one module beside Finance (Yonyou), HMS (hospitality), GMS (golf), Access Control and the Member Portal.
- **As-is:** legacy MMS with manual, duplicated handling (no detail in the input).
- **Ownership line:** MMS owns membership context (Person, Membership, requests, contracts, status, relationships, credentials). Finance owns receivables, payments, SOA, refunds and accounting; MMS only sends operational evidence and waits for payment confirmation.

## Actors
| Actor | Type | Description |
|---|---|---|
| Membership Officer | human | Captures applications and requests, maintains profiles, vehicles and cards (the "doer") |
| Approver (Membership Team / Authorised Approver) | human | Reviews and approves or rejects requests (the "checker") |
| Membership Manager | human | Approves goodwill refunds and large extensions, reads reports |
| Membership Administrator | human | Maintains master data and policy configuration; the designated administrator for new corporate memberships |
| Member | human | Self-service through the Member Portal: renewal, profile change, digital card |
| Applicant / Corporate Sponsor / Beneficiary | human | Represented by the officer in the demo |
| Finance | system (simulated) | Receives fee requests, confirms or fails payment, returns outstanding balance |
| Notification service | system (simulated) | Sends templated correspondence; delivery outcome recorded |
| Access Control, HMS, GMS | system (simulated) | Consume member status, vehicle and credential context |

## Goals & success metrics
| Goal | Metric | Target (demo) |
|---|---|---|
| Every lifecycle event goes through its gates | Requests completed with all gates passed | 100 % (a gate can never be skipped in the demo) |
| No duplicate manual handling | Re-keying between MMS and Finance | 0: one handoff, one confirmation |
| Full traceability | Material actions with actor, time and outcome | 100 % in the history |
| Configuration-driven policy | Policy values hard-coded in screens | 0: all read from the configuration page |

## Constraints
- Policies (eligibility, documents, approvals, fees, durations, limits, status transitions) are configuration, never hard-coded.
- Finance values are never held as an authoritative MMS balance; no mutable spending-credit wallet.
- Portal requests follow the same rules as staff requests.
- Unconfirmed external handoffs stay pending or failed, never successful.
- Historical records and referenced master data are never physically deleted.
- Demo: static site, browser storage, invented data, simulated integrations.

## To-be process (common pattern of all 25 processes)
1. Capture the request (application or lifecycle request) for a Person or membership.
2. Validate: duplicates, eligibility, mandatory documents, limits (30-year cap, extension, absent, medical, vehicles, nominees).
3. Route to the authorised approver; the approver records the decision (maker-checker).
4. If a fee applies, determine it from the fee configuration and hand it to Finance; wait for payment confirmation.
5. Apply the outcome: activate, change type / term / status / relationship, assign or keep the Membership ID.
6. Record the action in workflow history, send the templated notification, and publish the change to Access Control / HMS / GMS.

## Assumptions
| ID | Assumption | Confirmed? |
|---|---|---|
| A-001 | Persona presales: the demo stresses solution fit, gate logic, configuration and integration handoffs (D-001) | Given |
| A-002 | NSRCC brand replaces StarHub defaults; dark theme derived; system font and inline SVG icons (D-002, D-003) | ⚑ D-002, D-003 |
| A-003 | One approval level for every request type: officer submits, an Approver approves, and nobody approves their own request (config MMS-CFG-048 "2 levels (doer/checker)") | ⚑ D-004 |
| A-004 | Membership ID = 2 initials + 5 digits (workshop proposal, MMS-CFG-114), e.g. `TA10023` | ⚑ D-005 |
| A-005 | Policy values that are TBC in the PRDs take demo values: eligibility age ≥ 21 for adult types, junior 5–20; absent 3–24 months; medical ≤ 12 months; extension ≤ 24 months (≤ 12 months Approver, > 12 months Manager); vehicles ≤ 4; corporate Group C ≤ 2 nominees, Groups D/E 1 | ⚑ D-006 |
| A-006 | Document matrix per request type (ID copy + photo; transfer form; overseas letter; medical certificate; death certificate; relationship proof) | ⚑ D-007 |
| A-007 | Status set and transition matrix: Active, Absent, Medical, Suspended, Expired, Withdrawn, Deceased, Ended; transitions as in `glossary.md` | ⚑ D-008 |
| A-008 | Fees: the corporate fees sheet (1 Jan 2024) is used as given; every other fee is an invented demo value in configuration | ⚑ D-009 |
| A-009 | Start date: payment in the current month → membership starts on the 1st of the next month (workshop proposal, MMS-CFG-039) | ⚑ D-010 |
| A-010 | Finance, notification service, Access Control, HMS and GMS are simulated in the browser (a Finance desk page and an integration feed) | ⚑ D-011 |
| A-011 | Demo data: about 24 members, 30 requests, all invented; NSRCC's real membership is far larger | ⚑ D-012 |
| A-012 | No expiry grace period; supplementary memberships end with their principal unless converted or transferred (MMS-BR-026, 064 are TBC) | ⚑ D-013 |

## Open questions
None blocking: auto mode settled every gap with the assumptions above. Source open items that stay open for a real build: OD-001 eligibility matrix, OD-002 document matrix, OD-003 approval matrix, Business Rules Catalogue v1.2, NFR / device standards (FSD OI-001).

## v02: Club Reporting Module (KO-008)

**Sources read (v02):** `input/GMS/Reporting-PRDs/prd-reporting/README.md`, RPT-P-001 … RPT-P-006 `PRD.md` (work orders CMS-Prototype-037 … 042), `legacy-report-mapping.csv` (147 legacy names), `input/GMS/nsrcc-brand-guideline.md` (same brand as v01).

**Problem.** NSRCC's two legacy systems list 147 report names (84 MMS, 63 GMS), many duplicates, Finance outputs or dropped processes. The To-Be design replaces them with **23 approved parameterised reports** (MMS-RR-001 … 010, GMS-RR-001 … 013), but has no shared place to find, run, export, govern or define reports.

**What v02 adds.** A cross-module Reports area on top of the v01 MMS demo: catalogue and access governance, parameterised runs with a valid empty result, Excel / PDF export, user-defined reports and a dashboard, and a legacy report finder. Golf reports run on a small invented golf data set (RC-001).

**Actors (new).** Golf Operations (runs golf operational reports); Membership / Golf Manager (statistics, utilisation, trends, audit); Administrator (definitions, dashboards, access rules). Marketing reporting is run by the Membership Officer.

**Legacy disposition (from the mapping):** 70 covered by an approved requirement (33 MMS, 37 GMS), 52 Finance-owned, 15 out of scope, 10 source-module outputs. Six approved reports have no legacy equivalent (GMS-RR-004, 006, 013, MMS-RR-006, 007, 010).

**Constraints.** No report alters source data; MMS and GMS stay authoritative for their records and Finance for financial values. Out of scope: Finance reporting, tournaments, driving range, balloting, handicap administration, operational printables. The module and its breakdown are **derived, not approved**: business sign-off is needed (RC-004).

**Open questions (v02):** none; RC-001 … RC-007 resolved (D-026 … D-032). The PRD open questions (module option, role matrix, BI tool, layout, devices) stay open at NSRCC and are demo assumptions here.

## v03: Golf Management System (KO-017)

**Sources read (v03):** `input/GMS-2/GMS-PRDs/prd-gms/README.md` and GMS-P-001 … GMS-P-011 `PRD.md` (work orders CMS-Prototype-026 … 036, from the GMS FSD Stage 5 v1.0, To-Be Process Catalogue Stage 3, Requirements Catalogue Stage 4, Business Rules Catalogue Stage 2 v1.1); `input/GMS-2/nsrcc-brand-guideline.md` (same brand).

**Problem.** Golf at Changi and Kranji runs on manual tee-sheet slots, phone and counter bookings with no automated waitlist, eligibility checked by hand against the Bye-Laws, rain checks and no-show charges compiled manually, and end-of-day figures assembled outside the system.

**What v03 adds.** GMS as the operational system of record for tee capacity, bookings, golfers, waitlists, check-in, eligibility data, rain checks and golf charges: 11 processes (tee sheet setup, booking and FCFS waitlist, amend / cancel, check-in, late arrival / no-show, course suspension and rain checks, handicap / PC data, tee blocking, charges and Finance handoff, shift close, enquiry). It consumes member status from MMS (v01) and feeds the reports of v02, which now read live GMS records.

**Actors.** Member / main booker (portal); Golf Operations (counter, CSO, marshal); Golf Administration (tee sheet, handicap import, PC records); Golf Manager / Club Captain (waivers, second rounds, rain-check extensions, course closure); Finance (simulated); HMS Events (source of event blocks, simulated); SGA CHS (handicap extract, simulated).

**Ownership lines.** MMS owns membership and privilege status; Finance owns payment, receivables, GST and accounting (GMS hands off evidence); official handicap computation stays with SGA CHS; tournament administration stays with HMS Events.

**Constraints.** No balloting; Bye-Laws values are configuration; fee amounts, booking windows, notification channel (OI-02), SGA CHS schema (OI-03) and HMS handoff (OI-04) are not in the pack.

**Open questions (v03):** none; RC-008 … RC-016 resolved (D-043 … D-051). Fees, windows, channels and schemas stay open at NSRCC and are demo assumptions here.

## v04: HMS Events (KO-020)

**Sources read (v04):** `input/HMS-Event/prd-hms-events/README.md` and HMS-EVT-P-001 … HMS-EVT-P-011 `PRD.md` (work orders CMS-Prototype-085 … 095; Requirements Catalogue v1.2, 102 requirements, all Must and Confirmed; Business Rules Catalogue v1.4, 76 rules, all Confirmed; HMS_Events_Configuration_v1_0 defaults); `input/HMS-Event/nsrcc-brand-guideline.md` (same brand).

**Problem.** Club events and programmes need one configurable way to publish, register (online and at the counter), manage waitlists, check participants in and handle cancellations, rescheduling and refunds, with membership taken from MMS and money handled by Finance.

**What v04 adds.** HMS Events in the app, as one of the three HMS sub-modules (Facilities and Resorts stay simulated, D-011): 11 processes: configure and publish, online registration, counter registration, waitlist and automatic promotion, minimum-participation review, attendance and check-in, participant cancellation, club cancellation, club rescheduling, function-room booking synchronisation, maintenance of a published event. It reads member status and relationships from MMS (v01), hands settlements and refund instructions to the Finance desk, and sends notices to the outbox.

**Actors.** Events Team (configure, publish, maintain, check in, viability and cancellation decisions); Events Manager (refund and reversal authorisation); Customer Service Officer (counter registration); Online account holder, member or non-member (portal); Participants and payers; MMS, Finance / payment services, Security / Identity, Function Room Booking System (external, authoritative for rooms).

**Ownership lines.** MMS owns membership eligibility; Finance owns payment, credit exposure, refunds execution and accounting; the Function Room Booking System owns room availability, holds, confirmation, amendment and cancellation; HMS Events only mirrors them.

**Constraints.** No approval before publication; events complete automatically after the last session; manual check-in only against a confirmed registration, with audit; kiosk registration and manual price override are out of scope.

**Open questions (v04):** none in the source (Stage 3 closed). Demo gaps raised as RC-017 … RC-029.

## v05: Role launcher and module guides (KO-023)

**Sources read (v05):** the KO-023 prompt only (no `--input` folder).

**What v05 adds.** A launcher as the demo's entry point (`index.html`), opening each role, and each member account, in its own tab; the role is fixed per tab and set only from the launcher; pages block roles they are not for, links to other roles' pages are not clickable, and a Member tab sees only its own account. The launcher summarises the four modules (workflow steps, roles, scenarios with Start links, rules) and opens one HTML guide per module; `demo/modules-summary.md` gives the same summary in text. The whole `rapid-build-v05/` folder is what gets shared.

**No business process changes.** The 63 kept features, their rules and scenarios run unchanged; only how a presenter enters them changes.

**Open questions (v05):** RC-030 … RC-039.

## v06: HMS Facilities (KO-024) *(new in v06)*

**Sources read (v06):** `input/HMS-Facility/prd-hms-facilities/README.md` and HMS-FAC-P-001 … HMS-FAC-P-017 `PRD.md` (work orders CMS-Prototype-068 … 084; Stage 4 Requirements Catalogue rebased 28 Sep 2026, FR-002 … FR-077 and RR-001 … RR-008, all Must, Confirmed except one priority TBC; Stage 2 Business Rules Catalogue, HMS-FAC-BR-001 … 039, all Confirmed; Configuration Catalogue v1.0 baselines, most values TBC); `input/HMS-Facility/nsrcc-brand-guideline.md` (same brand, no change). The prompt: "read the prds and add the functions into the build."

**Problem.** Club facilities (courts, rooms, pool, gym, bowling) need one controlled way to check who may use them, book and pay for timed resources, admit people to the pool and gym, record bowling counter sales and reconcile them, with membership taken from MMS, bungalow passes from HMS Resorts and money handled by Finance.

**What v06 adds.** HMS Facilities in the app, the second of the three HMS sub-modules (HMS Resorts stays simulated, D-011): 17 processes in four groups:
- **Bookings** (8 bookable facilities: Tennis, Billiards, Squash, Basketball, Pickleball, Karaoke, Nintendo Switch Play Room, Games Room): eligibility and entitlement (P-001), availability and resource blocks (P-002), create and confirm (P-003), amend (P-004), cancel and refund (P-005), no-show (P-006), waiting list (P-016).
- **Admission** (no time slots): Swimming (P-008), Fitness Centre with membership, bungalow visitor pass or day pass (P-009), Personal Training (P-017, policy still TBC).
- **Bowling** (the external Bowling Management System stays): counter transaction (P-010), reconciliation by receipt number (P-011), exception resolution (P-012).
- **Common:** payment and Finance handoff (P-007), facility and booking configuration (P-013), Fitness Centre reference information (P-014), operational and utilisation reports (P-015).

**Actors.** Facilities Staff (counter bookings, admissions, no-shows, blocks); Customer online (member or non-member account, where self-service is enabled); Operations Manager / authorised Facilities supervisor (exceptional refunds); Bowling Operations (counter and first-line reconciliation); System Administrator (configuration); Fitness Centre Staff; MMS, HMS Resorts, Payment Service, Finance (supporting).

**Ownership lines.** MMS owns membership status and privileges; HMS Resorts owns bungalow accommodation and visitor-pass validity; Finance executes refunds and accounting (GL, tax, Yonyou); the Bowling Management System keeps lanes, games and scoring; HMS Events owns swimming lessons and programmes. Facilities never changes any of them.

**Confirmed values.** Billiards 1 – 3 hours; 24-hour cancellation cut-off (full refund before, none after; no refund for no-shows); facility-initiated cancellation = full refund unless an alternative is accepted; exceptional refunds need an Operations Manager and a reason; public holidays priced as weekend; no booking override against an active block; day pass valid for the whole operating day with re-entry; bowling paid at the counter before play, no member-account charging; receipt number is the reconciliation key, tolerance 0.00.

**TBC in source (filled for the demo, RC-040 … RC-054):** eligibility matrix, booking windows, durations (other than Billiards), rates, capacities, hours, wait-list response window, bowling file layout, PT policy, report columns.

**Open questions (v06):** RC-040 … RC-054, settled as flagged assumptions D-105 … D-119.

## v07: HMS Resorts (KO-026) *(new in v07)*

**Sources read (v07):** `input/HMS-Resort/prd-hms-resorts/README.md` and HMS-RES-P-001 … HMS-RES-P-025 `PRD.md` (work orders CMS-Prototype-043 … 067; Stage 2 Business Rules Catalogue Draft v0.1, HMS-RES-BR-001 … 083; Stage 3 To-Be Process Catalogue Draft v0.1; Stage 4 Requirements Catalogue Draft v0.1, FR-001 … 068, DR-001 … 016, IR-001 … 007, NR-001 … 002, RR-001 … 005; Stage 5 FSD v0.6 and Operations FSD v0.7); `input/HMS-Resort/nsrcc-brand-guideline.md` (identical to the v06 copy, no change). The prompt: "add the resort section, flag out any area of conflict".

**Source status.** The whole Resorts pack is **draft**: every rule, process and requirement is *Draft, For Validation*, priority TBC, and 7 of the 25 processes are marked *Cannot finalize* (P-005 hold policy, P-009 no-show cutoff, P-011 refund threshold, P-018 Accommodation Pass, P-020 reversal governance, P-021 closure boundary, P-024 audit actors). Rule texts HMS-RES-BR-003, 075 – 077 and 079 – 083 are cited but not quoted in the pack. Unlike the v06 Facilities pack (Confirmed), nothing here is signed off; the demo shows the draft rules and labels every TBC value as a demo value.

**Problem.** Accommodation at the resorts, chalets and villas runs on a legacy environment with manual tee-ups between front desk, housekeeping, maintenance, finance and the access and carpark systems. HMS Resorts is the operational system of record for accommodation inventory, reservations, waitlists, stays, folios, housekeeping and maintenance readiness, vehicle whitelisting, access credentials, business-day close and operational reporting; it takes member status from MMS and hands all money movement to FIN-OPS.

**What v07 adds.** HMS Resorts in the app, the third and last HMS sub-module (it replaces the "HMS Resorts (simulated)" answers of D-011 and D-111): 25 processes in five groups:
- **Configuration:** resorts, rooms and add-ons (P-001); rates, seasons, promotions, discounts and reservation policy (P-002).
- **Reservations:** create (P-003), group (P-004), tentative hold (P-005), amend (P-006), cancel (P-007), waitlist (P-008), no-show (P-009).
- **Money:** payment (P-010), refund (P-011), discounts, credit notes and adjustments (P-012), Finance handoff (P-022), Night Audit (P-021).
- **Stay:** check-in (P-013), in-house stay and charges (P-014), vehicles and Alphawave whitelist (P-015), housekeeping (P-016), maintenance blocks (P-017), Salto access credentials (P-018), check-out (P-019), reversal (P-020).
- **Oversight:** reports (P-023), audit log (P-024), notifications (P-025).

**Actors.** Reservation Officer, Front Desk Staff, Cashier and Security Personnel (one demo role, RC-055); Housekeeping and Maintenance Staff (one demo role); Operations Manager (the existing Manager); System Administrator; Guest / Member / Corporate Booker (portal); MMS, FIN-OPS, Payment Gateway, Salto, Alphawave and the Notification Service (simulated).

**Ownership lines.** MMS owns member profile, status and entitlement; FIN-OPS owns payment, refund, receivables, GST, GL and Yonyou posting (HMS Resorts raises operational financial events only); Salto owns door access; Alphawave owns carpark enforcement. Out of HMS Resorts scope: F&B and POS, kiosks, events (HMS Events), facilities (HMS Facilities), marketing, committee spending allowance, guest identity document storage, pre-arrival registration.

**Stated values (draft).** Minimum stay 2 consecutive nights; amendment more than 21 days before arrival: Lost Opportunity Charge 20 % of the original value; amendment 21 days or less: treated as a cancellation; cancellation more than 21 days: 50 %, 21 days or less: 100 %; no-show 100 %; check-in 3:00 – 6:00 PM on the arrival date; check-out before 10:00 AM; at most 2 vehicles per reservation, the first free, the second charged; IU or OBU identifier; every refund, adjustment and credit note needs a Manager; paid transactions are never edited; Night Audit before business-day close; a waitlist entry never blocks inventory and staff choose who gets a freed room.

**Areas of conflict (asked for in the prompt), RC-056 … RC-065:**
1. **Minimum stay:** fixed at 2 nights (BR-002) but also configurable (FR-002) (RC-056).
2. **Amendment and cancellation:** an amendment at ≤ 21 days becomes a 100 % cancellation, so a small change costs more than cancelling early; the PRD does not say which amendments count (RC-057).
3. **Arrival timing:** the 3 – 6 PM check-in window is hard, but late arrival and the no-show cutoff are TBC, so a 7 PM arrival can neither check in nor be a no-show (RC-058); the demo clock is fixed at 11:55, outside the window (RC-059).
4. **Waitlist across modules:** Resorts staff pick who gets a freed room; Golf, Events and Facilities offer in FIFO order with a timer (RC-060).
5. **Refund and cancellation policy across modules:** Resorts needs a Manager for every refund and counts in days; Facilities refunds automatically inside its 24-hour rule and needs a Manager only for exceptions; Events needs the Events Manager (RC-061).
6. **Visitor passes:** v06 seeded independent "HMS Resorts (simulated)" passes for Bungalow 1 – 5 (D-111); Resorts now holds the stays, and its own words are resort, chalet, villa and accommodation unit (RC-062).
7. **Vehicles:** MMS allows up to 4 vehicles per membership with car labels (BR-024); Resorts allows 2 per reservation for the Alphawave whitelist, the second charged (RC-063).
8. **Configuration governance:** TBC in Resorts; Facilities uses Draft → Manager approval (D-115) (RC-064).
9. **Room status:** BR-028 marks the room Checked-Out and BR-029 Pending Cleaning at the same moment (RC-065).

**TBC in source (filled for the demo, RC-066 … RC-071):** resort, room and add-on catalogue, rates and seasons; member-category windows, maximum stays, privileges and discounts (BR-079 … 083 not quoted); tentative-hold duration; second-vehicle charge; group partial allocation; reversal approver; Night Audit blocking checks; notification events; Accommodation Pass (not built); report columns.

**Open questions (v07):** RC-055 … RC-071.

## v08: Finance (FIN-OPS) and visuals (KO-027) *(new in v08)*

**Sources read (v08):** `input/Finance/prd-finance/README.md` and FIN-OPS-P-001 … FIN-OPS-P-019 `PRD.md` (work orders CMS-Prototype-096 … 114; Requirements Catalogue v3, Business Rules Catalogue v4), and the prompt: "replace this with the simulated finance page / beautify the application by adding some visuals, especially for reports, color code each lines of table for ease of readin".

**Source status.** Finance is the seventh and last module. Of 261 requirements, 141 are *Interim Design* pending Finance validation and 6 are *TBC* pending vendor confirmation; of 151 rules, 98 are Confirmed. 20 open decisions have interim working positions (FIN-OPS-OD-001 … 020). A decision of 26 Oct 2026 replaces daily-only posting with daily and twice-daily runs.

**Problem.** Finance runs on spreadsheets and a legacy ERP feed: modules hand over by e-mail and file, reconciliation is manual in Excel, and Yonyou has no AR, so receivables, dunning and corporate billing are tracked outside any system.

**What v08 adds.** The Finance module (FIN-OPS) replaces the simulated Finance desk (D-153, RC-072). FIN-OPS owns no commercial decision: every module raises financial events, and FIN-OPS turns them into receivables, payments, recognition and GL entries, and returns status. 19 processes in five groups:
- **Intake and accounting:** event intake (P-001), configuration (P-002), postings with GST (P-003).
- **Member money:** receivables (P-004), payments and allocation (P-005), standing orders (P-006), bank results (P-007), spending credit (P-008), refunds (P-009).
- **Recognition:** deferred revenue (P-010), entrance fee amortisation (P-011).
- **Control:** reconciliation and cashier close (P-012), adjustments and overrides (P-013), periods (P-014), Yonyou staging (P-015) and responses (P-016), exceptions (P-017).
- **Collection:** dunning (P-018), General Accounts Receivable (P-019).

The prompt also asks for **visuals** (charts and KPI tiles on every report, dashboards and home pages) and **colour-coded table rows** in all seven modules (features 150, 151).

**Actors.** Finance Officer (maker; also the Authorised Finance Maintainer), Finance Approver (checker), FIN-OPS (the system), the originating modules, the bank, Yonyou, an external POS, General Debtors.

**Ownership lines.** The originating module stays authoritative for the commercial event (FIN-OPS-BR-001); FIN-OPS owns its accounting consequence (BR-002). Source-data errors go back to the module; Finance never edits them (BR-071, 064). MMS owns membership status: dunning escalates, never suspends (BR-108). Yonyou is reached only through CMS staging (OD-008).

**Areas of conflict, RC-072 … RC-077 and RC-089:**
1. **What "this" is:** the Finance desk or the Resorts FIN-OPS stub (RC-072).
2. **Manual Finance clicks vs automatic intake:** 21 storyboard steps have Finance click Accept, Confirm payment or Mark payment failed (RC-073).
3. **Refund approvals:** module approvers already exist; FIN-OPS adds a matrix and maker-checker (RC-074).
4. **In-house credit refunds:** modules refund "to the original payment"; FIN-OPS never pays in-house credit out as cash (RC-075).
5. **Posting cadence:** daily (OD-011, BR-089) vs the 26 Oct twice-daily decision with TBC cut-offs (RC-076).
6. **Closes:** GMS shift close, Bowling reconciliation and Night Audit vs the FIN-OPS batch close as the Finance control (RC-077).
7. **Credit notes:** HMS Resorts raises folio credit notes; FIN-OPS restricts Credit Notes to General AR and exceptions (RC-089).

**Gaps and scope (RC-078 … RC-088):** approval matrix values and roles; GST and chart of accounts; GIRO fee and dunning thresholds; spending credit validity; periods and the demo date; amortisation basis; Yonyou and POS interfaces; demo scope; what the table colours and visuals mean; Finance roles and devices.

**Open questions (v08):** RC-072 … RC-089.

## v09: CC-Demo name and visual refinement, launcher first (KO-028) *(new in v09)*

**Sources read (v09):** the prompt only ("this version is to be focused on refining the visuals of each page, we start from launcher page and go module by module / first thing first, remove any nsrcc title in the webapp and change it to CC-Demo, then we start working on launcher page") and the v08 prototype as built.

**What v09 changes.** No new business behaviour. The web app is renamed **CC-Demo** everywhere a visitor sees "NSRCC", and the **launcher** (SCR-32) is redesigned: today it is one 9,524px page of 11 stacked sections (module guides, 11 role cards, a 22-row member table and seven module sections). Every page also gets the refreshed layout base (DA-101: Bootstrap components in the brand colours, Bootstrap validation, wider form spacing).

**Open questions (v09):** RC-090 (version scope, module by module), RC-091 (what the rename covers), RC-092 (CC-Demo vs the NSRCC brand guideline), RC-093 … RC-098 (launcher design).
