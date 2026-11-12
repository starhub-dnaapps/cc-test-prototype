> Build: full-build · Version: v08 · KO: KO-037 · from v07

> **In v08:** superseded by the *Design direction* section of `design-system-v4.md` (KO-037, D-393, D-394). Kept as the v07 direction (history).

# Design direction (pass 3): CC-Demo full build v02

> KO-029 · RC-101 (D-243, D-245) · the `frontend-design` skill run from scratch, plan then review against the brief · **brief:** the NSRCC Brand Guideline design canvas (claude.ai artifact: boards *Logo and Colour*, *Components*, *Bootstrap mapping*), the PRD v1 roles and stories (Story-037 keeps the CC-Demo name, collapsible launcher sections with the first visible one open, module cards with alt buttons, the scenario guide panel), `default-design.md` (light and dark, en-SG, SGD, D MMM YYYY, clear and brief). Status: **for approval** before any CSS is written.

## 1. Subject, audience, primary job
- **Subject:** the membership back office of a country club: every membership change goes through documents, a second person's approval and a payment before it takes effect.
- **Audience:** membership staff at a counter and in the back office (desktop, all day), approvers working an inbox, and members on their phones in the portal.
- **Primary job of the design:** show at a glance *where each request is in its journey and who acts next*, and make the one right action obvious. Product, design and tech reviewers use it to decide whether to build this module as the base for the other six.

## 2. Palette (from the guideline; dark theme derived)
| Name | Hex | Role |
|---|---|---|
| Night | `#250E62` | guideline Brand strong: primary buttons, footer band, the digital card |
| Iris | `#4B2AA5` | guideline Brand primary: links, active nav, icons, selected states, the journey rail |
| Dusk | `#1F0B54` | guideline Brand hover |
| Lilac mist | `#F1EEFB` | guideline Brand soft: selected and hover tint, the role avatar |
| Pearl | `#FAF9FB` | guideline page background and table header |
| Graphite | `#3E3E3E` | guideline headings and body text |

Supporting values, all from the guideline: card white `#FFFFFF`, secondary surface `#F1F2F4`, borders `#DEDFE3` / `#E0E0E0` / `#C4C4C4`, row divider `#EBEBEE`, nav text `#727272`, muted `#6F7279`, focus `#CDB8EF`; semantic text on tint: info `#156BB5` / `#E9F3FA`, success `#077D3C` / `#E6F9EE` (D-241), warning `#895400` / `#FFF5E6`, error `#C4050F` / `#FFE7E9`, transaction tag `#B02561` / `#FDE8F0`; booking chips (Online / Staff `#F0EBFB` + `#B994FF`, On hold `#FFF3DF` + `#FFB45C`, Blocked `#FFE5E7` + `#FF8990`); maintenance banner `#FFE7E9` + `#FF1D2E`. Dark theme: derived, as in pass 2 (every text pair ≥ 6.6:1).

**Colour principle:** purple marks *action and place* only (the next action, where you are, what is selected). Everything else is Graphite on white cards on Pearl. Status is the guideline's text-on-tint pairs, always with words.

## 3. Type (Lato only, local files, D-240)
| Use | Size / weight | Note |
|---|---|---|
| Page title | 32px / 900, tight leading | one per page; the guideline's H1 |
| Section title | 24px / 700 | guideline H2 scaled for dense pages |
| Card title | 20px / 700 | guideline H3 |
| Body | 16px / 400, line height 1.5, lines under 80 characters | |
| Label, table header | 14px / 700 | guideline form labels and table header |
| Badge, journey step label | 12px / 700 | |
| IDs, dates, amounts | tabular figures | `RQ-1019`, `SV10030`, `S$60,000` |

No eyebrows above headings, no all-caps labels, no monospace (the skill's "template chrome" tells); the one exception is none.

## 4. The memorable element: the request journey rail
The guideline's own **stepper** (numbered circles joined by a line, Iris for done and current, `#C4C4C4` for next) becomes the spine of the product: every request shows its journey **Draft → Documents → Approval → Payment → Done**, with the current step filled, a returned or failed step in the error colour, and one line under it saying **who acts next** ("Waiting for an Approver who did not submit it"). It is a real sequence, so numbering is right.
- **Request detail:** the full rail across the top of the page, under the title, with the next action's button right beside it.
- **Lists (Requests, Approvals, Dashboard queue, Member 360 Requests tab, Portal My requests):** a compact rail in its own column (five small dots, the current one Iris, with the step's name as text for screen readers and on hover).
- Nothing else competes: no gradients, no hero imagery, quiet launcher. Boldness is spent here, because this is the thing the reviewers must judge.

## 5. Layout concept of the key screens (desktop; phones stack in the same order)

**Launcher (`index.html`)**: quiet, white, task-first. The title is large; the module cards carry the colour.
```
┌ header: CC-Demo (Iris, 900) ··········································· [Launcher] [◐] ┐
│ CC-Demo                                                                          │  32→48px, 900
│ A working demo of the Membership module of a club management system: …          │  one paragraph
│ Quick start: click Start on a scenario …                                         │
│ ┌ Modules (open) ─────────────────────────────────────────────────────── ▾ ┐     │  collapsible, Story-037
│ │ [Membership ●live]  [Club Reporting v02] [Golf v03] [Events v04] …        │     │  cards: icon·title / summary / status chip / buttons
│ │  Open guide  Start first scenario  (Iris buttons)   planned cards quiet   │     │
│ └───────────────────────────────────────────────────────────────────────────┘     │
│ ┌ Scenarios ▸ ┐ ┌ Open a role ▸ ┐ ┌ Module details ▸ ┐ ┌ Demo data ▸ ┐  (closed)   │
└ footer band (Night): CC-Demo · Version 1 · invented data ────────────────────────┘
```

**Dashboard**: work first, numbers second.
```
│ Dashboard                                              [Run lifecycle check]     │
│ My work queue ─ table: Request | Type | Member | Journey ●●●○○ | Status | Open   │  the rail column
│ Memberships  [Active 22][Absent or medical 2][Suspended 1][Ended 4]              │  KPI cards, max 4 a row
│ Work         [Pending approval 3][Pending docs 2][Awaiting payment 1][Expiring 3]│
│ Memberships by status (bars)        │ Open requests by status (donut)            │  stacked on phones
│ Juniors near 21 ─ table                                                          │
```

**Member 360**: the member as a card, then the record.
```
│ ┌ digital card (Night) ┐  Member B. Lim                         [New request ▾]   │
│ │ LB10002  QR          │  Ordinary Full · Active · Privileges on · Billing on      │  chips, not a dot string
│ └──────────────────────┘  facts: type, joined, term, remaining, principal …       │
│ tabs: Profile | Membership & Contract | Relationships | Vehicles | Cards | Requests | History
│ (tab content: form grid / tables / timeline)                                     │
```

**Request detail**: the journey rail is the page.
```
│ Renewal RQ-1011                                  [Record payment failed] [Record payment] │
│ ① Draft ── ② Documents ── ③ Approval ── ④ Payment ── ⑤ Done                      │  rail, ④ current (Iris)
│ Waiting for an Approver to record the payment through the Finance stub.         │  who acts next
│ ┌ facts card ┐                                                                    │
│ ┌ Gates ┐ (documents · decision · payment, with the rule IDs)                    │
│ ┌ Finance stub (transaction-tag chip) ┐ hand-off, amount, stub ref, recorded by   │
│ History timeline · Notices sent                                                   │
```

**Approvals**: an inbox.
```
│ Approvals                                   3 requests waiting for the Approver  │
│ tabs: Decisions | Finance stub                                                    │
│ table: Request | Type | Member | Journey | Created | Note ("Submitted by you" chip) | Open │
```

**Member Portal (phone first)**: card, then what to do.
```
│ ☰ CC-Demo            │
│ Welcome, Member D. Koh│
│ ┌ digital card ┐      │
│ Membership facts      │
│ My requests (rail)    │
│ Renew: [1 yr][2 yr][3 yr]  option tiles (guideline)  [Submit renewal] │
│ My details · Withdraw │
```

**Shell on every page:** guideline header: white, 64px, soft shadow; the CC-Demo wordmark in Iris 900; nav 16px `#727272`, the active link Iris with a 1.5px underline; on the right the **role avatar** (guideline avatar: Lilac mist circle with initials, e.g. "OL", and the role name), Launcher, theme toggle; a menu button below 992px. Guideline footer band (Night) on every page.

**Alignment:** content left-aligned on one container edge (1200px). **Tables follow the guideline (left-aligned text, numbers right-aligned)**, not the house rule of centring every cell (Layout-06): a listed UI rule exception if you approve it (item 6 of the batch).

## 6. Components (all Bootstrap underneath, styled by tokens)
- **Buttons:** primary Night; secondary white with the `#C4C4C4` border (guideline "Cancel"); danger outline in error red; card buttons (Story-037 alt buttons) Iris; 40px high, 44px on phones; 4px radius; bold.
- **Fields:** 40px, `#E0E0E0` border, lavender focus; labels above, 14px bold; errors under the field.
- **Option tiles** (guideline "Credit card · selected"): for choosing one value from a few, such as the renewal package (1, 2 or 3 years) in the portal and on New request. Actions such as Approve or Return stay buttons.
- **Badges and chips:** semantic pairs; the role and "Submitted by you" as the guideline's Online / Staff chip; Finance stub as the transaction tag; "Coming in v0N" as the On hold chip.
- **Notices:** rule messages in the guideline's inline warning; the blocked page as the maintenance banner (12px radius); success and error toasts in the guideline's toast style.
- **Cards:** white, 8px, the guideline's soft shadow; the KPI card *label · value · note*.
- **Journey rail** (section 4), **digital card** (Night, white text, QR on white), **timeline**, **gate checklist**, **charts** (Iris bars, semantic donut), **scenario guide panel** (Story-037), **launcher accordions** (Story-037), **planned module cards** (secondary surface, quiet).

## 7. Copy voice
Plain and short, sentence case, glossary terms. An action keeps its name through the flow ("Record payment" → toast "Payment recorded"). The journey line always says who acts next. Errors say what failed and how to fix it, with the rule ID. Empty states invite the next action ("No requests match these filters. Clear filters").

## 8. Review against the brief (the skill's second pass)
| First idea | Why it read as a default | Revised to |
|---|---|---|
| Purple hero band with a version stepper on the launcher (pass 2) | A big coloured hero is the default opener; it spent the boldness on the page reviewers see least | Quiet white launcher; boldness spent on the journey rail where the decision is judged |
| Row of 4 number tiles at the top of the launcher | "Big number, small label" hero, the skill's named default | Removed from the launcher; KPI cards stay only on the Dashboard, where they are work |
| All-caps eyebrow above sections and in the guide panel | Template chrome (trait 5) | No eyebrows; the guide panel shows the module as a chip |
| Meta strings joined by middle dots ("12 scenarios · 5 roles") | Template chrome (trait 5) | Separate chips or facts |
| Identical cards everywhere, one radius | SaaS card kit (trait 4) | The guideline's own radius hierarchy: 4px controls, 8px cards, 12px banners; tables and timelines are not cards |
| Centred table cells (house rule) | Not in the guideline; harder to scan text columns | Guideline table style, as an exception for your approval |

**Kept on purpose:** white cards with the soft shadow and the purple footer band: they are the guideline's own components, not a habit.

## 9. What changes from the archived build (for the record)
New: journey rail, role avatar, option tiles, left-aligned tables (if approved), quiet launcher. Gone: the launcher hero band and stepper (pass 2), number tiles on the launcher, eyebrows, dot-joined meta strings. Same: screens, roles, actions, data, the scenario guide, Story-037 elements, Lato, every guideline colour.
