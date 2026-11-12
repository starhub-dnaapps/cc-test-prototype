/* workflow.js: (v07) also the Finance transitions (FIN_TRANSITIONS); (v05) also the Facilities transitions (FACILITY_TRANSITIONS); (v04) the Events transitions (EVENT_TRANSITIONS); (v03) the Golf transitions (GOLF_TRANSITIONS); the Membership Request transitions as data (artifacts/diagrams/workflow-request-v2.md, D-228), and (v02) the Club Reporting
   transitions (workflow-request-full-v08.md: Report run, Report definition, Report access rule).
   A button shows only when Workflow.can(role, request, action, user) is true. Asserted in js/checks.js.
   Build: full-build-v08 · Version: v08 · KO: KO-037 · from v07 */
var Workflow = (function () {
  // creator: only the person who created the request; decider: the routed role, never the creator (BR-005); stub: an Approver who is not the creator (BR-006; the Finance stub of BR-178 retired in v07)
  var TRANSITIONS = [
    { action: "submit", label: "Submit", from: ["draft"], to: "pendingDocuments | pendingApproval", roles: ["officer", "admin", "member"], creator: true, kind: "btn-primary" },
    { action: "edit", label: "Edit", from: ["draft", "pendingDocuments"], to: "same", roles: ["officer", "admin", "member"], creator: true, kind: "btn-outline-secondary" },
    { action: "docs", label: "Mark documents received", from: ["pendingDocuments"], to: "pendingApproval", roles: ["officer"], kind: "btn-primary" },
    { action: "cancel", label: "Cancel request", from: ["draft", "pendingDocuments", "pendingApproval"], to: "cancelled", roles: ["officer", "admin", "member"], creator: true, kind: "btn-outline-danger" },
    { action: "return", label: "Return for correction", from: ["pendingApproval"], to: "pendingDocuments", roles: ["approver", "manager"], decider: true, kind: "btn-outline-secondary" },
    { action: "reject", label: "Reject", from: ["pendingApproval"], to: "rejected", roles: ["approver", "manager"], decider: true, kind: "btn-outline-danger" },
    { action: "approve", label: "Approve", from: ["pendingApproval"], to: "awaitingPayment | completed", roles: ["approver", "manager"], decider: true, kind: "btn-primary" },
    { action: "fail", label: "Mark payment failed", from: ["awaitingPayment"], to: "awaitingPayment", roles: ["approver"], stub: true, kind: "btn-outline-danger" },
    { action: "pay", label: "Confirm payment", from: ["awaitingPayment"], to: "completed", roles: ["approver"], stub: true, kind: "btn-primary" }
  ];

  function rule(action) { return TRANSITIONS.filter(function (t) { return t.action === action; })[0]; }

  // Returns { ok, msg } for one action on one request by one role and user
  function can(role, request, action, userName) {
    var t = rule(action);
    if (!t) return { ok: false, msg: "Unknown action " + action + "." };
    if (t.from.indexOf(request.status) < 0) return { ok: false, msg: t.label + " is not possible from this status." };
    if (t.roles.indexOf(role) < 0) return { ok: false, msg: t.label + " is not for this role." };
    if (t.creator) return request.createdByName === userName ? { ok: true, msg: "" } : { ok: false, msg: "Only the person who created this request can " + t.label.toLowerCase() + " it (BR-175)." };
    if (t.decider) return Rules.bizRule005(request, role, userName);
    if (t.stub) return Rules.bizRule006Confirm(request, role, userName);
    return { ok: true, msg: "" };
  }

  // The actions this user may take now, primary last (Layout-04)
  function actions(role, request, userName) {
    return TRANSITIONS.filter(function (t) { return can(role, request, t.action, userName).ok; })
      .sort(function (a, b) { return (a.kind === "btn-primary") - (b.kind === "btn-primary"); });
  }

  // (v02) Club Reporting: state "none" is before the first action; the guards BR-031 – 035 are checked by the caller with their rule function
  var REPORT_TRANSITIONS = [
    { action: "open", label: "Open report", from: ["none"], to: "parameters", roles: ["officer", "golfops", "manager", "admin"] },
    { action: "run", label: "Run", from: ["parameters", "generated", "noData"], to: "generated | noData", roles: ["officer", "golfops", "manager", "admin"] },
    { action: "export", label: "Export", from: ["generated"], to: "generated", roles: ["officer", "golfops", "manager", "admin"] },
    { action: "save", label: "Save", from: ["none"], to: "active", roles: ["admin"] },
    { action: "version", label: "Save new version", from: ["active"], to: "active", roles: ["admin"] },
    { action: "inactivate", label: "Inactivate", from: ["active"], to: "retired", roles: ["admin"] },
    { action: "grant", label: "Save report access", from: ["none"], to: "none", roles: ["admin"] }
  ];
  function canReport(role, action, state) {
    var t = REPORT_TRANSITIONS.filter(function (x) { return x.action === action; })[0];
    if (!t) return { ok: false, msg: "Unknown action " + action + "." };
    if (t.from.indexOf(state) < 0) return { ok: false, msg: t.label + " is not possible from this state." };
    return t.roles.indexOf(role) >= 0 ? { ok: true, msg: "" } : { ok: false, msg: t.label + " is not for this role." };
  }

  // (v03) Golf (artifacts/diagrams/workflow-request-full-v08.md, W15 – W21): object, action, from states, to, roles; the guards BR-036 – 060 are checked by the caller with their rule function
  var GOLF_TRANSITIONS = [
    { object: "booking", action: "book", label: "Book", from: ["none"], to: "confirmed", roles: ["member", "golfops"] },
    { object: "booking", action: "substitute", label: "Substitute golfer", from: ["confirmed"], to: "confirmed", roles: ["golfops"] },
    { object: "booking", action: "changeCourse", label: "Change course", from: ["confirmed"], to: "confirmed", roles: ["golfops"] },
    { object: "booking", action: "cancel", label: "Cancel booking", from: ["confirmed"], to: "cancelled", roles: ["member", "golfops"] },
    { object: "booking", action: "checkIn", label: "Check in flight", from: ["confirmed"], to: "checkedIn", roles: ["golfops"] },
    { object: "booking", action: "late", label: "Late arrival", from: ["confirmed"], to: "confirmed", roles: ["golfops"] },
    { object: "booking", action: "noShow", label: "Mark no-show", from: ["confirmed"], to: "noShow", roles: ["golfops"] },
    { object: "booking", action: "applyRainCheck", label: "Apply rain check", from: ["confirmed"], to: "confirmed", roles: ["golfops"] },
    { object: "booking", action: "requestWaiver", label: "Request waiver", from: ["confirmed", "cancelled", "noShow", "checkedIn", "played"], to: "requested", roles: ["golfops"] },
    { object: "waitlist", action: "join", label: "Join waitlist", from: ["none"], to: "waiting", roles: ["member", "golfops"] },
    { object: "waitlist", action: "accept", label: "Accept", from: ["offered"], to: "accepted", roles: ["member", "golfops"] },
    { object: "waitlist", action: "decline", label: "Decline", from: ["offered"], to: "declined", roles: ["member", "golfops"] },
    { object: "waitlist", action: "expire", label: "Let offer expire", from: ["offered"], to: "expired", roles: ["golfops"] },
    { object: "waitlist", action: "cancelEntry", label: "Cancel entry", from: ["waiting"], to: "cancelled", roles: ["member", "golfops"] },
    { object: "teeSheet", action: "publish", label: "Publish", from: ["draft"], to: "published", roles: ["admin"] },
    { object: "teeTime", action: "block", label: "Block session", from: ["open"], to: "blocked", roles: ["golfops"] },
    { object: "teeTime", action: "release", label: "Release block", from: ["blocked"], to: "open", roles: ["golfops"] },
    { object: "course", action: "suspend", label: "Suspend", from: ["open"], to: "suspended", roles: ["manager"] },
    { object: "course", action: "reopen", label: "Reopen", from: ["suspended"], to: "open", roles: ["manager"] },
    { object: "rainCheck", action: "extend", label: "Request extension", from: ["available"], to: "available", roles: ["golfops"] },
    { object: "approval", action: "decide", label: "Approve / Reject", from: ["pending"], to: "approved | rejected", roles: ["manager"] },
    { object: "charge", action: "recordPayment", label: "Record payment", from: ["pending"], to: "accepted", roles: ["golfops"] },
    { object: "handicap", action: "makeEffective", label: "Make effective", from: ["staged"], to: "effective", roles: ["admin"] },
    { object: "pc", action: "addPc", label: "Add PC record", from: ["none"], to: "effective", roles: ["admin"] },
    { object: "shift", action: "close", label: "Close shift", from: ["open"], to: "closed", roles: ["golfops"] }
  ];
  function canGolf(role, action, state) {
    var t = GOLF_TRANSITIONS.filter(function (x) { return x.action === action; })[0];
    if (!t) return { ok: false, msg: "Unknown action " + action + "." };
    if (t.from.indexOf(state) < 0) return { ok: false, msg: t.label + " is not possible from this state." };
    return t.roles.indexOf(role) >= 0 ? { ok: true, msg: "" } : { ok: false, msg: t.label + " is not for this role." };
  }

  // (v04) Events (artifacts/diagrams/workflow-request-full-v08.md, W22 – W27); the guards BR-061 – 083 are checked by the caller with their rule function
  var EVENT_TRANSITIONS = [
    { object: "event", action: "publish", label: "Publish", from: ["draft"], to: "published", roles: ["events"] },
    { object: "event", action: "maintain", label: "Save changes", from: ["published"], to: "published", roles: ["events"] },
    { object: "event", action: "reschedule", label: "Reschedule session", from: ["published"], to: "published", roles: ["events"] },
    { object: "event", action: "cancelEvent", label: "Cancel event", from: ["published"], to: "cancelled", roles: ["events"] },
    { object: "registration", action: "register", label: "Register", from: ["none"], to: "held | confirmed | waitlisted", roles: ["member", "golfops"] },
    { object: "registration", action: "pay", label: "Pay (simulated)", from: ["held"], to: "confirmed", roles: ["member", "golfops"] },
    { object: "registration", action: "accept", label: "Accept offer", from: ["offered"], to: "confirmed", roles: ["member", "golfops"] },
    { object: "registration", action: "expire", label: "Let offer expire", from: ["offered"], to: "lapsed", roles: ["events", "golfops"] },
    { object: "registration", action: "cancelParticipant", label: "Cancel participant", from: ["confirmed"], to: "cancelled", roles: ["member", "golfops", "events"] },
    { object: "attendance", action: "checkIn", label: "Check in", from: ["confirmed"], to: "attended", roles: ["events"] },
    { object: "refund", action: "propose", label: "Propose refund", from: ["none"], to: "proposed", roles: ["events"] },
    { object: "refund", action: "authorise", label: "Authorise / Decline", from: ["proposed"], to: "authorised | declined", roles: ["manager"] },
    { object: "room", action: "applyFeed", label: "Apply message", from: ["none"], to: "tentative | confirmed | cancelled", roles: ["events"] }
  ];
  function canEvent(role, action, state) {
    var t = EVENT_TRANSITIONS.filter(function (x) { return x.action === action; })[0];
    if (!t) return { ok: false, msg: "Unknown action " + action + "." };
    if (t.from.indexOf(state) < 0) return { ok: false, msg: t.label + " is not possible from this state." };
    return t.roles.indexOf(role) >= 0 ? { ok: true, msg: "" } : { ok: false, msg: t.label + " is not for this role." };
  }

  // (v05) Facilities (artifacts/diagrams/workflow-request-full-v08.md, W28 – W34); the guards BR-086 – 106 are checked by the caller with their rule function
  var FACILITY_TRANSITIONS = [
    { object: "booking", action: "book", label: "Book", from: ["none"], to: "pendingPayment | confirmed", roles: ["member", "facilities"] },
    { object: "booking", action: "pay", label: "Pay", from: ["pendingPayment"], to: "confirmed", roles: ["member", "facilities"] },
    { object: "booking", action: "amend", label: "Amend", from: ["confirmed"], to: "confirmed", roles: ["member", "facilities"] },
    { object: "booking", action: "cancel", label: "Cancel booking", from: ["confirmed"], to: "cancelled", roles: ["member", "facilities"] },
    { object: "booking", action: "move", label: "Move (club)", from: ["confirmed"], to: "confirmed", roles: ["facilities"] },
    { object: "booking", action: "noShow", label: "Record no-show", from: ["confirmed"], to: "noShow", roles: ["facilities"] },
    { object: "booking", action: "requestRefund", label: "Request exceptional refund", from: ["cancelled", "noShow"], to: "requested", roles: ["facilities"] },
    { object: "refund", action: "decideRefund", label: "Approve / Reject", from: ["requested"], to: "approved | rejected", roles: ["manager"] },
    { object: "block", action: "block", label: "Block", from: ["none"], to: "active", roles: ["facilities"] },
    { object: "block", action: "unblock", label: "Remove block", from: ["active"], to: "removed", roles: ["facilities"] },
    { object: "waitlist", action: "join", label: "Join waiting list", from: ["none"], to: "waiting", roles: ["member", "facilities"] },
    { object: "waitlist", action: "accept", label: "Accept and pay", from: ["offered"], to: "booked", roles: ["member", "facilities"] },
    { object: "waitlist", action: "decline", label: "Decline", from: ["offered"], to: "declined", roles: ["member", "facilities"] },
    { object: "waitlist", action: "expire", label: "Let offer expire", from: ["offered"], to: "expired", roles: ["facilities"] },
    { object: "waitlist", action: "withdraw", label: "Withdraw", from: ["waiting", "offered"], to: "withdrawn", roles: ["member", "facilities"] },
    { object: "admission", action: "admit", label: "Admit", from: ["none"], to: "admitted", roles: ["facilities"] },
    { object: "admission", action: "exit", label: "Record exit", from: ["admitted"], to: "left", roles: ["facilities"] },
    { object: "dayPass", action: "sellPass", label: "Sell day pass", from: ["none"], to: "valid", roles: ["facilities"] },
    { object: "bowling", action: "recordSale", label: "Record and pay", from: ["none"], to: "paid", roles: ["facilities"] },
    { object: "bowling", action: "reconcile", label: "Import export file", from: ["none"], to: "completed", roles: ["facilities"] },
    { object: "exception", action: "escalate", label: "Escalate to Finance", from: ["open"], to: "escalated", roles: ["facilities"] },
    { object: "exception", action: "dispose", label: "Record disposition", from: ["open", "escalated"], to: "closed", roles: ["facilities"] },
    { object: "config", action: "saveDraft", label: "Save as Draft", from: ["none"], to: "draft", roles: ["admin"] },
    { object: "config", action: "decideConfig", label: "Approve / Reject", from: ["draft"], to: "approved | rejected", roles: ["manager"] },
    { object: "reference", action: "toggle", label: "Deactivate / reactivate", from: ["active", "inactive"], to: "inactive | active", roles: ["admin"] },
    { object: "pt", action: "createPt", label: "Create PT session", from: ["none"], to: "pendingPolicy", roles: ["facilities"] },
    { object: "pt", action: "confirmPt", label: "Confirm", from: ["pendingPolicy"], to: "confirmed", roles: ["facilities"] },
    { object: "pt", action: "cancelPt", label: "Cancel", from: ["pendingPolicy", "confirmed"], to: "cancelled", roles: ["facilities"] },
    { object: "event", action: "chooseVenue", label: "Choose venue", from: ["draft", "published"], to: "same", roles: ["events"] }
  ];
  function canFacility(role, action, state) {
    var t = FACILITY_TRANSITIONS.filter(function (x) { return x.action === action; })[0];
    if (!t) return { ok: false, msg: "Unknown action " + action + "." };
    if (t.from.indexOf(state) < 0) return { ok: false, msg: t.label + " is not possible from this state." };
    return t.roles.indexOf(role) >= 0 ? { ok: true, msg: "" } : { ok: false, msg: t.label + " is not for this role." };
  }

  // (v06) Resorts (artifacts/diagrams/workflow-request-full-v08.md, W35 – W41); the guards BR-107 – 132 are checked by the caller with their rule function
  var RESORT_TRANSITIONS = [
    { object: "reservation", action: "reserve", label: "Reserve", from: ["none"], to: "confirmed", roles: ["member", "resorts"] },
    { object: "reservation", action: "group", label: "Reserve group", from: ["none"], to: "confirmed", roles: ["resorts"] },
    { object: "reservation", action: "hold", label: "Place on hold", from: ["none"], to: "tentative", roles: ["resorts"] },
    { object: "reservation", action: "payHold", label: "Pay hold", from: ["tentative"], to: "confirmed", roles: ["resorts"] },
    { object: "reservation", action: "expire", label: "Let hold expire", from: ["tentative"], to: "expired", roles: ["resorts"] },
    { object: "reservation", action: "amend", label: "Amend", from: ["confirmed"], to: "confirmed", roles: ["member", "resorts"] },
    { object: "reservation", action: "cancel", label: "Cancel reservation", from: ["confirmed", "tentative"], to: "cancelled", roles: ["member", "resorts"] },
    { object: "reservation", action: "noShow", label: "Process no-show", from: ["confirmed"], to: "noShow", roles: ["resorts"] },
    { object: "reservation", action: "checkIn", label: "Check in", from: ["confirmed"], to: "checkedIn", roles: ["resorts"] },
    { object: "reservation", action: "stay", label: "Post, extend, move, vehicle, PIN", from: ["checkedIn"], to: "checkedIn", roles: ["resorts"] },
    { object: "reservation", action: "checkOut", label: "Check out", from: ["checkedIn"], to: "checkedOut", roles: ["resorts"] },
    { object: "reservation", action: "requestException", label: "Request late arrival, correction or reversal", from: ["confirmed", "checkedIn", "checkedOut"], to: "requested", roles: ["resorts"] },
    { object: "approval", action: "decideResort", label: "Approve / Reject", from: ["requested"], to: "approved | rejected", roles: ["manager"] },
    { object: "waitlist", action: "joinWait", label: "Join waitlist", from: ["none"], to: "waiting", roles: ["member", "resorts"] },
    { object: "waitlist", action: "allocate", label: "Allocate", from: ["waiting"], to: "allocated", roles: ["resorts"] },
    { object: "waitlist", action: "declineWait", label: "Declined", from: ["allocated"], to: "waiting", roles: ["resorts"] },
    { object: "waitlist", action: "closeWait", label: "Create reservation", from: ["allocated"], to: "closed", roles: ["resorts"] },
    { object: "waitlist", action: "withdrawWait", label: "Withdraw", from: ["waiting", "allocated"], to: "withdrawn", roles: ["member", "resorts"] },
    { object: "room", action: "housekeep", label: "Start cleaning / Mark ready", from: ["pendingCleaning", "cleaning"], to: "cleaning | ready", roles: ["housekeeping"] },
    { object: "room", action: "blockRoom", label: "Mark Faulty / Maintenance Blocked", from: ["ready", "pendingCleaning", "cleaning"], to: "faulty | blocked", roles: ["housekeeping"] },
    { object: "room", action: "completeRoom", label: "Record completion", from: ["faulty", "blocked"], to: "ready", roles: ["housekeeping"] },
    { object: "day", action: "runAudit", label: "Run Night Audit", from: ["open"], to: "blocked | passed", roles: ["resorts", "manager"] },
    { object: "day", action: "closeDay", label: "Close business day", from: ["passed"], to: "closed", roles: ["manager"] },
    { object: "resortConfig", action: "saveMaster", label: "Save master data", from: ["none"], to: "saved", roles: ["admin"] },
    { object: "resortConfig", action: "saveResortDraft", label: "Save as Draft", from: ["none"], to: "draft", roles: ["admin"] },
    { object: "resortConfig", action: "decideResortConfig", label: "Approve / Reject", from: ["draft"], to: "approved | rejected", roles: ["manager"] }
  ];
  function canResort(role, action, state) {
    var t = RESORT_TRANSITIONS.filter(function (x) { return x.action === action; })[0];
    if (!t) return { ok: false, msg: "Unknown action " + action + "." };
    if (t.from.indexOf(state) < 0) return { ok: false, msg: t.label + " is not possible from this state." };
    return t.roles.indexOf(role) >= 0 ? { ok: true, msg: "" } : { ok: false, msg: t.label + " is not for this role." };
  }

  // (v07) Finance (FIN-OPS) (artifacts/diagrams/workflow-request-full-v08.md, W42 – W50): the guards BR-133 – 170 are checked by the caller with their rule function; maker and checker are two people
  var FIN = ["finance", "finapprover"];
  var FIN_TRANSITIONS = [
    { object: "event", action: "validate", label: "Validate queue", from: ["received"], to: "accepted | returned | exception", roles: FIN },
    { object: "event", action: "post", label: "Post", from: ["accepted"], to: "posted | exception", roles: FIN },
    { object: "exception", action: "assign", label: "Assign", from: ["open"], to: "assigned", roles: FIN },
    { object: "exception", action: "resolve", label: "Resolve", from: ["open", "assigned"], to: "resolved", roles: FIN },
    { object: "exception", action: "closeException", label: "Reprocess and close", from: ["resolved"], to: "closed", roles: FIN },
    { object: "payment", action: "recordPayment", label: "Record payment", from: ["none"], to: "confirmed | pendingClearance", roles: FIN },
    { object: "payment", action: "clearCheque", label: "Clear cheque", from: ["pendingClearance"], to: "confirmed", roles: FIN },
    { object: "payment", action: "returnCheque", label: "Apply returned cheques", from: ["pendingClearance", "confirmed"], to: "returned", roles: ["finance"] },
    { object: "collection", action: "runCollection", label: "Run collection", from: ["none"], to: "submitted", roles: ["finance"] },
    { object: "collection", action: "bankResults", label: "Apply bank results", from: ["submitted"], to: "accepted | rejected", roles: ["finance"] },
    { object: "refund", action: "prepare", label: "Prepare", from: ["received"], to: "prepared", roles: ["finance"] },
    { object: "refund", action: "approveRefund", label: "Approve / Reject", from: ["prepared"], to: "approved | rejected", roles: ["finapprover"] },
    { object: "refund", action: "release", label: "Release", from: ["approved"], to: "released", roles: ["finance"] },
    { object: "adjustment", action: "prepareAdjustment", label: "Prepare adjustment", from: ["none"], to: "prepared", roles: ["finance"] },
    { object: "adjustment", action: "approveAdjustment", label: "Approve / Reject", from: ["prepared"], to: "approved | rejected", roles: ["finapprover"] },
    { object: "config", action: "saveFinDraft", label: "Save as Draft", from: ["none"], to: "draft", roles: ["finance"] },
    { object: "config", action: "approveFinConfig", label: "Approve / Reject", from: ["draft"], to: "approved | rejected", roles: ["finapprover"] },
    { object: "invoice", action: "createInvoice", label: "Submit for approval", from: ["none"], to: "pending", roles: ["finance"] },
    { object: "invoice", action: "issue", label: "Approve and issue", from: ["pending"], to: "issued | rejected", roles: ["finapprover"] },
    { object: "batch", action: "runPosting", label: "Run posting", from: ["none"], to: "staged", roles: ["finance"] },
    { object: "batch", action: "exportBatch", label: "Export file", from: ["staged", "failed"], to: "exported | failed", roles: ["finance"] },
    { object: "batch", action: "importResponse", label: "Import response", from: ["exported"], to: "finalised | partial", roles: ["finance"] },
    { object: "period", action: "closePeriod", label: "Close period", from: ["open", "reopened"], to: "closed", roles: ["finapprover"] },
    { object: "period", action: "reopenPeriod", label: "Reopen period", from: ["closed"], to: "reopened", roles: ["finapprover"] },
    { object: "dunning", action: "evaluate", label: "Evaluate dunning", from: ["any"], to: "stage", roles: ["finance"] },
    { object: "dunning", action: "hold", label: "Place on hold", from: ["current", "r1", "r2", "final"], to: "hold", roles: ["finance"] },
    { object: "dunning", action: "endHold", label: "End hold", from: ["hold"], to: "re-evaluated", roles: ["finance"] },
    { object: "session", action: "closeSession", label: "Close session", from: ["open"], to: "closed", roles: ["finance"] }
  ];
  function canFin(role, action, state) {
    var t = FIN_TRANSITIONS.filter(function (x) { return x.action === action; })[0];
    if (!t) return { ok: false, msg: "Unknown action " + action + "." };
    if (t.from.indexOf(state) < 0 && t.from.indexOf("any") < 0) return { ok: false, msg: t.label + " is not possible from this state." };
    return t.roles.indexOf(role) >= 0 ? { ok: true, msg: "" } : { ok: false, msg: t.label + " is for the " + (t.roles.length > 1 ? "Finance Officer or the Finance Approver" : t.roles[0] === "finance" ? "Finance Officer" : "Finance Approver") + "." };
  }

  return { TRANSITIONS: TRANSITIONS, can: can, actions: actions, REPORT_TRANSITIONS: REPORT_TRANSITIONS, canReport: canReport, GOLF_TRANSITIONS: GOLF_TRANSITIONS, canGolf: canGolf, EVENT_TRANSITIONS: EVENT_TRANSITIONS, canEvent: canEvent, FACILITY_TRANSITIONS: FACILITY_TRANSITIONS, canFacility: canFacility, RESORT_TRANSITIONS: RESORT_TRANSITIONS, canResort: canResort, FIN_TRANSITIONS: FIN_TRANSITIONS, canFin: canFin };
})();
