> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Responsive, accessibility and alignment check: CC-Demo full build v06 (Resorts)

> p4-02 after SO-043 (`signoff-v9.md`) · 2026-11-11 SGT · served from the repo root (`python -m http.server`, testing only; the prototype itself opens from `file://`), checked in the browser pane with frames named for their role tab. Covers **every** page of v06, not only the changed ones. The v05 record is in `a11y-responsive-check-v5.md` (history).

**Result:** no open failures. One accepted UI rule exception remains: Layout-06 (D-248), the guideline's left-aligned tables, now also on the Resorts tables and the rooms × nights grid. One control is exempt: the disabled buttons *Not in this version* on the planned card (D-274) and *No action* on room cards (v06). 7 issues were found and fixed in this run.

## Changes since v05 (what this run covers)
- **New pages:** `resort-desk.html` (SCR-39), `resort-reservation.html` (SCR-40), `resort-stay.html` (SCR-41), `resort-rooms.html` (SCR-42), `resort-audit.html` (SCR-43), `resort-config.html` (SCR-44).
- **Changed pages:**
  - `approvals.html`: Resort refunds, Resort exceptions and Resort configuration tabs, with Approve before Reject.
  - `portal.html`: Resorts section and resort waitlist; a non-member tab shows Events, Facilities and Resorts.
  - `facility-admission.html`: a Resort guest is admitted on the reservation number of an in-house stay.
  - `reports.html` and `report.html`: HMS-RES-RR-001 to 005, and the Resort Front Desk role.
  - `integrations.html`: resort records on the Finance stub.
  - `index.html`: the Scenarios section is removed, and Module details sits after Modules with Resorts and Launcher tabs (D-351).
  - Every page header: Resort Front Desk and Housekeeping links, a Resorts dropdown for the Manager and Administrator, and the footer "Version 6".
- **Logic:**
  - `rules.js`: BR-107 to BR-132 (26 rule functions plus 5 variants and 4 helpers), with BR-086 and BR-099 changed for the Resort guest.
  - `workflow.js`: `RESORT_TRANSITIONS` and `canResort` (26 actions).
  - `store.js`: Import requires the 13 resort collections.
  - `app.js`: the Resorts engine, 6 page renderers, resort approvals, the Portal resorts section and 5 report builders.
  - Seed: guides SC-44 to SC-52, and SC-35, SC-40 and SC-63 changed.

## Fixes applied in this run
| # | Screen | Check | Found | Fix applied |
|---|---|---|---|---|
| 1 | Stay and folio | Layout-04, Layout-13 | Two primary buttons in *Pay and check out* (Take payment, Check out); the primary not right-most | Take payment is a secondary button; **Check out** is the one primary, right-most (`resort-stay.html`) |
| 2 | Stay and folio | Layout-07 | Side-by-side cards had different parts: a heading, then a body *and* a separate button row | Every card body is one `stack flex-grow-1` with its button row at the foot (`mt-auto`), as in v05 fix 10; the vehicles table now sits below the fields, so the paired cards both start with a field (`resort-stay.html`) |
| 3 | Resort reservation | Layout-04 | Reserve and Pay (stub): Success were not right-most | Button order: Join waitlist, Place on hold, Check, then **Reserve and pay deposit**; Decline, then **Pay (stub): Success** (`resort-reservation.html`) |
| 4 | Resort reservation | Layout-07, Layout-13 | The price table beside a paragraph and the payment fields: content edges 7 – 12px apart | The price is a label and value list (`.facts--list`, the summary pattern), and the hint hides once a price shows (`app.js`, `resort-reservation.html`) |
| 5 | Rooms, Resort configuration | Layout-07 | A form card beside a table card: first lines at different heights; room cards without an action had an empty button row | The pairs are stacked (one card per row); a room with no action shows a disabled *No action* button, so the card parts line up (`resort-rooms.html`, `resort-config.html`, `app.js`) |
| 6 | Night Audit | Layout-04 | Run Night Audit (primary) before Close business day | **Run Night Audit** right-most (`resort-audit.html`) |
| 7 | Portal (Resorts); every page with tabs at 375px | Layout-13; touch target | Two resort tables in one section had different content edges at 375px; tab buttons were 42px tall at phone width (also the existing Approvals, Admissions and Facilities Admin tabs) | The resort waitlist is its own section, as the facility waiting list (`portal.html`); tab buttons are at least 44px on phones (`styles.css`, the touch-target rule) |

## Checks
| Check | Result |
|---|---|
| Alignment (`align-check.js`, frames named for their role tab), 68 page states × 1280 / 768 / 375 (204 runs). Covers every page with its first role; Resort front desk × 2 roles and the waitlist tab; reservation new (checked, deposit shown), group, Portal new, existing and checked out; stay in-house, arriving and checked out; Rooms × 2 roles; Night Audit after a run and its audit log; the 4 Resort configuration tabs; Approvals × 3 resort tabs; Portal member and non-member; Admissions Fitness Centre; catalogue for the Resort Front Desk; 2 Resorts reports run; the launcher's Resorts and Launcher tabs | Pass on every rule except **Layout-06 (exception, D-248)**. The states touched by fixes 1 – 7 were run again: pass |
| Text contrast, 12 v06 states × light and dark, measured on the painted background | **24 / 24** |
| Phone width 375: no horizontal scroll, touch targets ≥ 44px, every visible field labelled | **12 / 12** states (after fix 7) |
| Scenario guide: the panel opens with its steps in the right role tab, for SC-44 – 52 and SC-40 (45 + 5 steps); no step page is blocked for its role (BR-084); the launcher scenarios (SC-34, 35, 63) start from Module details and run on the launcher, which shows no panel by design | Pass |
| Start links (D-351) | 57 scenarios, each with a **Start** link in Module details; no Scenarios section; order Modules → Module details → Open a role → Demo data |
| Static site (no external URL, `fetch`, module or inline style; only `vendor/bootstrap*`; Lato from `assets/fonts/`; one HTML file per screen) | Clean (43 pages + `checks.html`) |
| Brief tags | S1 – S8 on the pages of the *Scenario → screen (v06)* table (`portal`, `resort-desk`, `resort-reservation`, `resort-stay`, `resort-rooms`, `resort-audit`, `approvals`, `facility-admission`, `reports`, `report`); the v05 tags removed from the facility pages; `data-state` populated, empty, error, success and disabled present |
| Self-check `checks.html` | **296 / 296** (241 v01 – v05, BR-099 changed for v06; + 55 v06: BR-107 – 132, 27 resort transition checks, Import without the resort collections) |
| Brief (`design/brief.json`) | ready |

## Scenario walkthrough (v06, in the browser)
| Scenario | Steps checked | Result |
|---|---|---|
| SC-44 online reservation | Each refusal fires on the right rule: 1 night (BR-107); 8 nights and the 90-day window (BR-108); villas full 13 – 15 Nov, so a waitlist entry (RW-03, no room held). Then a Chalet for 2 weekend nights: S$440, deposit S$220 (Pay (stub)), RR-0015 confirmed with a receipt; Membership vehicles shown read only | Pass |
| SC-45 group and holds | 3 Family Chalets for EE10018 refused (2 free), then accepted as a revised set: GR-01, Corporate lease S$0. Honorary hold S$352 (20 % off) held 48 h, then Let hold expire (room released). Complimentary hold paid | Pass |
| SC-46 amend and cancel | RR-0006: Lost Opportunity Charge S$201.60. Guest change refused (BR-110). RR-0005 at 8 days: "processed as a cancellation", nothing changed. RR-0009 cancelled at 50 %, refund S$372 requested; the Manager approves; instruction STUB-R… with the original payment | Pass |
| SC-47 waitlist | Entries oldest first with a match; RW-02 allocated with a reason, then declined (join time kept); RW-01 allocated, reservation created, entry closed | Pass |
| SC-48 check-in | Check-in to CC-04 (Pending Cleaning) refused; checked in to CC-02 with a PIN. Vehicles: "ABC" refused, the first free, the second S$20, the third refused. Late arrival requested, then approved; RR-0010 checked in. Facilities admits RR-0001 as a Resort guest; RR-0007 (ended) and RR-0005 (future) refused | Pass |
| SC-49 in-house | BBQ pit posted; extended to 30 Oct; move to CC-04 refused (Pending Cleaning, BR-124); moved to KV-02 (repriced). Promotion then voucher applied, percentage first; a second promotion refused. Credit note and adjustment approved by the Manager with the original references; PIN regenerated | Pass |
| SC-50 departure and housekeeping | At 09:30, check-out refused with S$283 due; paid and checked out (room Pending Cleaning, PIN and whitelist ended). Reversal approved: in-house again with a new PIN. CC-04 cleaned to Ready; KV-04 Faulty and refused at the desk, then completed | Pass |
| SC-51 no-show and Night Audit | RR-0004 no-show S$800 (deposit S$400 kept). Night Audit blocked by RP-0011; RP-0011 confirmed; passed, and the Manager closed the day (record on the Finance stub). Occupancy report run; RR-0003 audit trail read only | Pass |
| SC-52 configuration | Add-on saved at once; Pool Villa end-dated; the Chalet member weekend rate (240) and minimum stay (3) saved as Draft and not used (still S$220). The Manager approves the rate and rejects the minimum stay: new price S$240, 2 nights still allowed | Pass |
| Role map | The Officer is blocked on the Resort front desk (BR-084) and does not see the Resorts reports (BR-031). A Member tab is blocked on another guest's reservation (BR-085) | Pass |

The demo data was reset after the run.
