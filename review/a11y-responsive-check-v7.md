> Build: full-build · Version: v08 · KO: KO-037 · from v07

# Responsive, accessibility and alignment check: CC-Demo full build v07 (Finance, final version)

> p4-02 after SO-045 (`signoff-v10.md`) · 2026-11-12 SGT · served from the repo root (`python -m http.server`, testing only; the prototype itself opens from `file://`), checked in the browser pane with frames named for their role tab. **Full regression (KO-035 prompt): every page of every module**, not only the changed ones. The v06 record is in `a11y-responsive-check-v6.md` (history).

**Result:** no open failures. One accepted UI rule exception remains: Layout-06 (D-248, extended in D-360), the guideline's left-aligned tables, now also on the Finance tables. No disabled planned-card button is left (no planned module). 8 issues were found and fixed in this run.

## Changes since v06 (what this run covers)
- **New pages (12):** `finance.html` (SCR-45), `fin-events.html` (SCR-46), `fin-accounts.html` (SCR-47), `fin-collections.html` (SCR-48), `fin-refunds.html` (SCR-49), `fin-recognition.html` (SCR-50), `fin-recon.html` (SCR-51), `fin-posting.html` (SCR-52), `fin-dunning.html` (SCR-53), `fin-ar.html` (SCR-54), `fin-config.html` (SCR-55), `fin-approvals.html` (SCR-56).
- **Changed pages:** `approvals.html` (Fee payments tab: Confirm payment and Mark payment failed in FIN-OPS; refund texts), `request.html` (FIN-OPS panel), `member.html` (credit from FIN-OPS; dunning escalation alert), `dashboard.html` (escalations; awaiting payment in FIN-OPS), `integrations.html` (target FIN-OPS), `reports.html` and `report.html` (10 Finance reports), `golf-booking.html`, `event.html`, `event-register.html`, `facility-booking.html`, `portal.html`, `resort-reservation.html`, `resort-stay.html`, `resort-audit.html` (FIN-OPS references and Pay (simulated); Night Audit recognises the night), `index.html` (all seven modules live; Finance tab in Module details with 10 Start links; Finance Officer and Finance Approver; no planned card or "Coming in v0N"); every page header (Finance links and the Finance dropdown) and footer ("Version 7").
- **Logic:**
  - `rules.js`: BR-133 – BR-170 (38 functions plus `makerChecker` and `r2`); BR-178 retired, its Approver guard kept as `bizRule006Confirm` (RC-147).
  - `workflow.js`: `FIN_TRANSITIONS` and `canFin` (28 actions); the fee transitions renamed Confirm payment and Mark payment failed.
  - `store.js`: Import requires the 31 Finance collections; a v06 file is refused.
  - `app.js`: the FIN-OPS engine (`finOps`, `finValidate`, `finPost`, `finPay`, `finBill`, `finRefundIn`, `finEffect`), 12 page renderers, 10 report builders; the Finance stub replaced in Membership, Golf, Events, Facilities and Resorts.
  - Seed: guides SC-53 – SC-62 new; SC-01, 03, 05, 07, 10, 51, 63 and the money wording of 15 more changed.

## Fixes applied in this run
| # | Screen | Check | Found | Fix applied |
|---|---|---|---|---|
| 1 | Refunds, General AR, Configuration, Member accounts | Script error (browser) | A form for one Finance role is removed for the other roles, and the renderer still filled it (Finance Approver on Refunds, Manager on Member accounts) | Each form is bound only when it is on the page; on Member accounts only the form and the *Issue statement* button are for the Finance roles, the statements table is for every reader (`app.js`, `fin-accounts.html`) |
| 2 | Dunning, Reconciliation, General AR, Periods, Finance approvals | Behaviour | The confirmation dialog lost the record ID (toast "null on hold") because the click handler went on after opening it | The handler returns when it opens the dialog (`app.js`) |
| 3 | Member accounts, Revenue recognition, Periods and posting, General AR, Finance configuration, Financial events (one event) | Layout-07 | Side-by-side cards with different parts (a form beside a table, a list beside a table) | The pairs are stacked, one card per row, as the v06 Rooms and Resort configuration (D-359) |
| 4 | Financial events | Layout-13 at 375px | The filter fields in a wrapping row had different left edges | The filters are a `.form-grid` |
| 5 | Every Finance page at 375px | Touch target | The Finance sub-navigation pills were 37px tall | Pills are at least 44px on phones, with the tab buttons (`styles.css`, the touch-target rule) |
| 6 | Facility booking (cancel) | Data | A new facility refund took the ID FX-0002, already used by the seeded club cancellation | The seed's FX sequence starts at 3 (`seed.json`, `seed.js`) |
| 7 | Financial events | Wording | A returned event said "returned to RES" | The message names the module ("returned to Resorts") (`app.js`) |
| 8 | Step tables and guides | Accuracy | SC-51 recognised 2 in-house nights (not 3); SC-57's deceased-member stop applies only after SC-05 records the death | Step table and guide wording corrected (`screen-inventory.md`, guides) |

## Checks
| Check | Result |
|---|---|
| Alignment (`align-check.js`, frames named for their role tab), **76 page states × 1280 / 768 / 375 (228 runs)**: every page of every module with its first role (55 pages), plus Finance home, Financial events (register and 2 events), Member accounts and Dunning read only for the Manager and the Administrator; Finance approvals, Refunds, General AR, Configuration and Posting for the Finance Approver; the exception register tab; Approvals Fee payments; a request with its FIN-OPS panel; Member 360 with an escalation; the dashboard; Night Audit; a golf booking; the catalogue for the Finance Officer; a Finance report; the Integration feed; the Portal | Pass on every rule except **Layout-06 (exception, D-248)**: 48 runs pass outright, 180 fail only Layout-06, 0 fail anything else (after fixes 3 – 5, all states re-run) |
| Text contrast, 16 states (12 Finance pages, one event, Finance approvals, Fee payments, a request, the launcher) × light and dark, measured on the painted background | **32 / 32** |
| Phone width 375: no horizontal scroll, touch targets ≥ 44px, every visible field labelled | **15 / 15** states (after fix 5) |
| Scenario guide: 67 scenarios, 298 steps; every step page exists and opens for its role (the 10 steps shared by two roles open on the first role's page, as before); every scenario has a **Start** link in Module details (67) | Pass |
| No "Coming in v0N" (KO-035 prompt) | No badge, planned card, disabled module control or Deferred marker on any page; every module card live |
| Static site (no external URL, `fetch`, module or inline style; only `vendor/bootstrap*`; one HTML file per screen) | Clean (55 pages + `checks.html`) |
| Brief tags | S1 – S8 on the pages of the *Scenario → screen (v07)* table (`finance`, `fin-events`, `golf-booking`, `fin-accounts`, `fin-refunds`, `fin-approvals`, `resort-audit`, `fin-recognition`, `fin-posting`, `fin-recon`, `fin-dunning`, `member`, `fin-ar`, `portal`, `approvals`, `request`); the v06 tags removed from the resort pages; `data-state` populated, empty, error, success and disabled present |
| Self-check `checks.html` | **351 / 351** (296 v01 – v06, with BR-023 on the FIN-OPS balance, BR-060 with 6 open items and BR-178 replaced by BR-006 Confirm; + 55 v07: BR-133 – 170 and the maker-checker, 13 Finance transition checks, the seed without a stub reference, Import without the Finance collections) |
| Brief (`design/brief.json`) | ready |

## Scenario walkthrough (v07, in the browser)
| Scenario | Steps checked | Result |
|---|---|---|
| SC-53 intake and postings | Validate queue on 13 events: 9 posted; FE-0116 duplicate, POS-88232 no tender, SP-2611 unmapped → exceptions; FL-0006 returned to Resorts (no tax code). FE-0121 posting set: Dr 1100 S$1,962.00 = Cr 4100 S$1,800.00 + Cr 2100 S$162.00; receivable BL-0414 | Pass |
| SC-54 payment | LB10002 owes S$1,200; S$1,500 cash naming BL-0412: PN-0008 pays BL-0412 then BL-0398, S$300 unapplied; available credit S$5,000 | Pass |
| SC-55 GIRO | SO-03 over its maximum and SO-06 Suspended not collected; 5 submitted; bank results: CF10006 second rejection fee S$10.90, SO-04 cancelled (mandate), none retried; PN-0007 returned, BL-0389 reopened | Pass |
| SC-56 refunds | RFD-0002 and RFD-0003 prepared; the Finance Officer sees "Waiting for a second person"; the Finance Approver approves both; released: S$16 to the card, S$40 restored to the member account | Pass |
| SC-57 recognition | SCA-03 S$120 expired (non-cash); EV-04 S$450 recognised (FE, no GST); amortisation blocked by S$12.50, then run after the timing item (6 schedules) | Pass |
| SC-58 reconciliation | CS-GOLF-1028 closed with Cash −S$5.00 → exception, bank-in; card profile incomplete, then complete with the S$218 timing item; EX-0003 assigned, resolved, closed; CL-1028-02 back to zero | Pass |
| SC-59 adjustments and periods | Adjustment prepared, approved by the Finance Approver, posted in Oct 2026; credit-limit override recorded; posting into Sep 2026 refused; the late item posted to Oct with source date 30 Sep | Pass |
| SC-60 posting runs | Run 13:00: PB-1028-1 with 29 lines, FE-0111 (open exception) left out; export failed, retried the same batch; response: 28 accepted with ERP numbers, 1 FAC-BOOK rejected → exception; Partial | Pass |
| SC-61 dunning and General AR | PA10023 Escalated (ESC-0001), the Member 360 and dashboard show it, the membership unchanged; OO10015 and SM10013 on hold; GD-02 refused (inactive); INV-0045 and CN-0001 approved by the Finance Approver (CN linked to INV-0041); the November sponsorship invoice generated | Pass |
| SC-62 configuration | Mapping overlapping MAP-02 refused; run 2 → 20:00 saved as Draft, approved, applies from 1 Nov 2026 | Pass |
| Module money steps | RQ-1011: Mark payment failed (rejected attempt), then Confirm payment (PN, receivable settled, Completed). Golf CH-0046 Record payment → FE posted. Facility FB-0010 cancelled → FIN-OPS refund received. Event EV-05 club cancellation: refund proposed, authorised by the Manager → FIN-OPS refund. Resort RR-0009 cancelled, the Manager approves → FIN-OPS refund; RR-0004 no-show raised in FIN-OPS; Night Audit closed: 2 in-house nights recognised S$500.00 | Pass |
| Role map | The Manager and the Administrator read Finance home, events, accounts and dunning without actions; the Approver cannot open Finance pages (FE links shown as text, BR-084); the Finance Officer cannot approve (maker-checker) | Pass |

The demo data was reset after the run.
