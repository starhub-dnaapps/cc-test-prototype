> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Responsive, accessibility and alignment check: CC-Demo full build v05 (Facilities)

> p4-02 after SO-041 (`signoff-v8.md`) · 2026-11-11 SGT · served from the repo root (`python -m http.server`, testing only; the prototype itself opens from `file://`), checked in the browser pane with frames named for their role tab. Covers **every** page of v05, not only the changed ones. The v04 record is in `output/full-build-v04/review/a11y-responsive-check.md` (history).

**Result:** no open failures; one accepted UI rule exception (Layout-06, D-248, the guideline's left-aligned tables, now also on the Facilities tables and the availability grid) and one exempt control (the disabled *Not in this version* button on planned cards, D-274). 10 issues found and fixed in this run (fix 10 at the user's request at the Phase 4 gate).

## Changes since v04 (what this run covers)
- **New pages:** `facilities.html` (SCR-33), `facility-booking.html` (SCR-34), `facility-bookings.html` (SCR-35), `facility-admission.html` (SCR-36), `bowling.html` (SCR-37), `facility-admin.html` (SCR-38).
- **Changed:** `approvals.html` (Facility refunds and Facility configuration tabs; Approve before Reject on every tab, D-333, D-334), `portal.html` (Facilities section and waiting list; a non-member tab shows Events and Facilities), `reports.html` / `report.html` (HMS-FAC-RR-001 – 008, the Facilities Staff role), `integrations.html` (facility payments, refund instructions and escalations reach the feed), `events.html`, `event-edit.html`, `event.html`, `event-register.html` (venue from the Facilities records, venue links, event blocks), `config.html` (Facilities Staff in Report access), `index.html` (Facilities live, its details tab, the Facilities Staff role, 9 scenario rows), the header of every page (Facilities links; a **Golf** dropdown for the Manager and Administrator, D-333) and the footer ("Version 5: Membership, Club Reporting, Golf, Events and Facilities.").
- **Logic:** `rules.js` BR-086 – BR-106 (21 rule functions, 2 rule variants and 3 time helpers); `workflow.js` facility transitions (`FACILITY_TRANSITIONS`, `canFacility`, 29 actions); `store.js` Import requires the 14 facility collections; `app.js` Facilities engine, 6 page renderers, Portal facilities, facility approvals, event venue blocks, 8 report builders; seed guides SC-36 – 43, SC-67, SC-35 and SC-63 updated.

## Fixes applied in this run
| # | Screen | Check | Found | Fix applied (shared file) |
|---|---|---|---|---|
| 1 | Facility booking (Member tab) | Script error | The staff-only buttons (no-show, exceptional refund, move) are removed on a Member tab, and the page stopped when it set them | Set and wired only on a staff tab (`app.js`) |
| 2 | Facility booking | Content | The refund line repeated the rule tag ("… BR-095). … (BR-095).") | One tag; the amount and "goes to the Finance stub" (`app.js`) |
| 3 | Fitness Centre | Money | A non-member admitted on a day pass was charged the S$20 fee a second time | No entry fee on a day pass; the fee line says "admitted on a day pass" (`app.js`) |
| 4 | Bowling | Content | Exceptions listed newest first (BE-04 before BE-01) | Oldest first, as raised (`app.js`) |
| 5 | Portal (Facilities) | Content | A full slot showed the resource clash it had chosen itself ("Karaoke Room 1 is booked …") | "Karaoke is fully booked at 19:00 on 31 Oct 2026: join the waiting list (BR-104)" (`app.js`) |
| 6 | Events schedule | Navigation | The venue link turned into plain text for the Events Team (no access to the Facilities page) | The Events Team may open `facilities.html` read-only (no Book links, no block form; `app.js` page map; guide SC-67 step 3) |
| 7 | Admissions | Layout-01/12 | The occupancy bar's width was an inline style | A native `progress` element in the brand colour (`facility-admission.html`, `styles.css` `.occupancy`) |
| 8 | Booking, Admissions, Bowling, Facilities Admin | Layout-07, Layout-13 | Side-by-side cards of different shape and height (booking summary beside stacked cards; filters in a wrapping cluster) | Each column one card (title, then body) at full row height (`h-100`); the booking's actions in one *Next step* card; the Changes tab stacked; the bookings filters on the form grid (6 pages) |
| 9 | Admissions | Contrast | The lessons note sat on a grey alert, where its muted links measured 4.3:1 | Plain paragraph on the card (`facility-admission.html`) |
| 10 | Bowling, Admissions | Layout (user request at the Phase 4 gate) | In side-by-side cards the action buttons sat at different heights (Record and pay 58px below Import the sample export; Sell day pass 113px above Create PT session) | The form fills its card and its button row sits at the card's foot (Bootstrap `flex-grow-1`, `mt-auto`; fields in a `.form-grid` inside the form); the pairs now line up (509 / 509, 1215 / 1215 px). Re-checked at 1280 / 768 / 375: pass; both forms still validate |

## Checks
| Check | Result |
|---|---|
| Alignment (`align-check.js`, frames named for their role tab), 56 page states × 1280 / 768 / 375 (168 runs: every page; Facilities × 2 roles, booking new / existing / Member tab, bookings and waiting list, both Admissions tabs, Bowling, the 4 Facilities Admin tabs, Approvals × 4 tabs, Portal member and non-member, catalogue × 2 roles, 2 Facilities reports run, Integration feed, Events schedule, setup, event, launcher, Configuration, and every unchanged Membership, Reporting, Golf and Events page) | Pass on every rule except **Layout-06 (exception, D-248)**; after fixes 7 and 8 the affected states re-ran: pass |
| Text contrast, 12 v05 states × light and dark, measured on the painted background | **24 / 24** (after fix 9) |
| Phone width 375: no horizontal scroll, touch targets ≥ 44px, every visible field labelled | **12 / 12** states |
| Scenario guide: the panel opens, titled with its id, with an *On this page* step, for every step of SC-35 – 43 and SC-67 in its role tab (39 steps); no step page is blocked for its role (BR-084) | Pass (0 problems) |
| Static site (no external URL, `fetch`, module or inline style; only `vendor/bootstrap*`; Lato from `assets/fonts/`; one HTML file per screen) | Clean (37 pages + `checks.html`) |
| Brief tags | S1 – S8 on the pages of the *Scenario → screen* table (`facilities`, `facility-booking`, `facility-bookings`, `facility-admission`, `bowling`, `facility-admin`, `approvals`, `portal`, `reports`, `report`); the v04 tags removed from the event pages; `data-state` empty, error, success, disabled present |
| Self-check `checks.html` | **241 / 241** (187 v01 – v04 + 54 v05: BR-086 – 106, 30 facility transition checks, Import without the facility collections) |
| Brief (`design/brief.json`) | ready |

## Scenario walkthrough (v05, in the browser)
| Scenario | Steps checked | Result |
|---|---|---|
| SC-36 counter booking | Court 1 08:00 refused (FB-0004, BR-087); SAFRA SF-0001 on Billiards refused (BR-086); 12 Nov outside the window (BR-089); Billiards 4 h refused (BR-090); Court 2 Sat 08:00 at the weekend member rate S$14, Pending payment; Pay (stub) Decline → nothing reserved; Success → FB-0015 confirmed, receipt, Finance stub Accepted in the feed | Pass |
| SC-37 online booking | A. Tan books Squash on the 2 Nov holiday (weekend rate S$10), amends to 2 h and pays S$10 first (same reference); cancels FB-0001 (full refund instructed) and FB-0002 (< 24 h, no refund) | Pass |
| SC-38 block and refunds | Block RB-03 flags FB-0003; moved to Court 3 (flag cleared, no refund); exceptional refund FX-0002 requested for FB-0008; the Manager approves with a reason (Approve shown before Reject) → Finance stub Accepted; FB-0007 no-show | Pass |
| SC-39 waiting list | FW-01 withdrawn; B. Lim and P. Rao (portal) join; FB-0005 cancelled → B. Lim offered; Let offer expire → P. Rao offered; P. Rao accepts and pays (non-member weekend S$120) → FB-0016 confirmed, FW-03 Booked | Pass |
| SC-40 admission | Pool 58 → 60 with A. Tan and guest A. Ng (S$5), KD10004 refused at 60 / 60; lessons note lists Aqua Fitness; gym B. Lim, VP-02 expired, VP-01 free; day pass DP-0002 sold, admitted (fix 3), exit and re-entry with no charge; DP-0001 refused | Pass |
| SC-41 bowling | Missing receipt refused; BWL-260107 paid; sample export: 4 reconciled, 4 exceptions; duplicate closed as Accepted; amount escalated to the Finance stub; method corrected and re-run → reconciled | Pass |
| SC-42 configuration and PT | Billiards 4 h refused (locked); Tennis weekend member 14 → 16 saved as Draft; Trainer P. Kaur deactivated; the Manager approves → new bookings use S$16; PT-02 for A. Tan Pending policy → Confirmed; NM-02 refused (BR-106) | Pass |
| SC-43 reports | HMS-FAC-RR-004 utilisation on live data; HMS-FAC-RR-002 lists cancellations and no-shows with refunds; December returns "No records match" (BR-033) | Pass |
| SC-67 event venue | EV-08 published at BAS: "Basketball Court blocked for 3 sessions; 1 booking flagged (BR-088)"; the Basketball grid shows the Event block 09:00 – 11:00 and FB-0011 flagged; the schedule's venue link opens the facility | Pass |
| SC-35 launcher | Facilities card live; Module details opens on the Facilities tab | Pass (alignment run, guide check) |

The demo data was reset after the run.
