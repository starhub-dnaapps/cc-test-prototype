/* app.js: shell (role tabs, role avatar, nav, theme, blocked panel, toasts, scenario guide), the request journey rail (design pass 3), the Membership request engine
   (artifacts/diagrams/workflow-request-v2.md), the fee hand-offs to FIN-OPS ((v07) the Finance stub of BR-178 retired), (v02) the Club Reporting report builders, runs and export, (v03) the Golf engine and golf report builders,
   (v04) the Events engine and the Report Catalogue export buttons, (v05) the Facilities engine, event venue blocks and the Facilities report builders, (v06) the Resorts engine and the Resorts report builders, (v07) the Finance (FIN-OPS) engine that takes every module money step, its 12 pages and the Finance report builders, and one renderer per page (body[data-page]).
   Build: full-build-v08 · Version: v08 · KO: KO-037 · from v07 */
var App = (function () {
  var KEY = Store.KEY, TABKEY = "ccdemo";
  var db = Store.load(), cfg = db.config, TODAY = db.meta.today;

  /* ---------- Roles and labels ---------- */
  var ROLES = {
    officer: { name: "Officer O. Lee", label: "Membership Officer", home: "dashboard.html" },
    approver: { name: "Approver P. Ng", label: "Approver", home: "approvals.html" },
    manager: { name: "Manager M. Koh", label: "Membership Manager", home: "approvals.html" },
    admin: { name: "Administrator S. Teo", label: "Membership Administrator", home: "dashboard.html" },
    member: { name: "Member D. Koh", label: "Member", home: "portal.html", membershipId: "KD10004" },
    golfops: { name: "Golf Operations G. Lim", label: "Golf Operations", home: "golf-teesheet.html" },
    events: { name: "Events Team E. Koh", label: "Events Team", home: "events.html" },
    facilities: { name: "Facilities Staff F. Tan", label: "Facilities Staff", home: "facilities.html" },  // (v05)
    resorts: { name: "Resort Front Desk K. Wong", label: "Resort Front Desk", home: "resort-desk.html" },  // (v06)
    housekeeping: { name: "Housekeeping H. Ong", label: "Housekeeping", home: "resort-rooms.html" },  // (v06)
    finance: { name: "Finance Officer R. Tan", label: "Finance Officer", home: "finance.html" },  // (v07) maker
    finapprover: { name: "Finance Approver C. Lau", label: "Finance Approver", home: "finance.html" }  // (v07) checker
  };
  var LABELS = {}; Object.keys(ROLES).forEach(function (k) { LABELS[k] = ROLES[k].label; });
  // A tab's role (and a Member tab's account) comes from the tab name the launcher's links set: target="ccdemo-<role>[-<account>]" (BR-084, BR-085)
  var TAB = /^ccdemo-([a-z]+)(?:-([A-Z]{2}\d{5}|NM-\d{2}))?$/.exec(window.name || "");  // (v04) NM-nn: a non-member account tab (BR-085)
  var PAGE_ROLES = {
    "dashboard.html": ["officer", "approver", "manager", "admin"], "members.html": ["officer", "approver", "manager", "admin"], "member.html": ["officer", "approver", "manager", "admin"],
    "application.html": ["officer"], "request-new.html": ["officer", "admin"], "requests.html": ["officer", "approver", "manager", "admin"], "request.html": ["officer", "approver", "manager", "admin", "member"],
    "approvals.html": ["approver", "manager"], "communications.html": ["officer", "manager"], "config.html": ["admin"], "portal.html": ["member"], "integrations.html": ["officer", "admin", "events"], "index.html": [],
    "reports.html": ["officer", "golfops", "facilities", "resorts", "finance", "finapprover", "manager", "admin"], "report.html": ["officer", "golfops", "facilities", "resorts", "finance", "finapprover", "manager", "admin"], "legacy-reports.html": ["officer", "golfops", "facilities", "resorts", "manager", "admin"], "report-definitions.html": ["admin"], "report-dashboard.html": ["manager", "admin"],
    "golf-teesheet.html": ["golfops", "manager", "admin"], "golf-booking.html": ["golfops", "manager"], "golf-waitlist.html": ["golfops"], "golf-course.html": ["golfops", "manager"], "golf-admin.html": ["admin"], "golf-close.html": ["golfops"], "golfers.html": ["golfops", "manager", "admin"],
    "events.html": ["events", "manager", "golfops"], "event-edit.html": ["events"], "event.html": ["events", "manager", "golfops"], "event-register.html": ["member", "golfops"], "event-checkin.html": ["events"], "event-rooms.html": ["events"],
    "facilities.html": ["facilities", "manager", "events"], "facility-booking.html": ["facilities", "member"], "facility-bookings.html": ["facilities", "manager"], "facility-admission.html": ["facilities"], "bowling.html": ["facilities"], "facility-admin.html": ["admin"],
    "resort-desk.html": ["resorts", "manager"], "resort-reservation.html": ["resorts", "member"], "resort-stay.html": ["resorts"], "resort-rooms.html": ["housekeeping", "resorts", "manager"], "resort-audit.html": ["resorts", "manager", "admin"], "resort-config.html": ["admin"],  // (v06)
    // (v07) Finance: the Manager and the Administrator read Finance home, events, accounts and dunning (D-371)
    "finance.html": ["finance", "finapprover", "manager", "admin"], "fin-events.html": ["finance", "finapprover", "manager", "admin"], "fin-accounts.html": ["finance", "finapprover", "manager", "admin"], "fin-dunning.html": ["finance", "finapprover", "manager", "admin"],
    "fin-collections.html": ["finance", "finapprover"], "fin-refunds.html": ["finance", "finapprover"], "fin-recognition.html": ["finance", "finapprover"], "fin-recon.html": ["finance", "finapprover"], "fin-posting.html": ["finance", "finapprover"], "fin-ar.html": ["finance", "finapprover"], "fin-config.html": ["finance", "finapprover"], "fin-approvals.html": ["finance", "finapprover"]
  };
  var LABEL = { active: "Active", absent: "Absent", medical: "Medical", suspended: "Suspended", expired: "Expired", withdrawn: "Withdrawn", deceased: "Deceased", ended: "Ended",
    draft: "Draft", pendingDocuments: "Pending Documents", pendingApproval: "Pending Approval", awaitingPayment: "Awaiting Payment", completed: "Completed", rejected: "Rejected", cancelled: "Cancelled",
    pending: "Pending", confirmed: "Confirmed", failed: "Failed", live: "Live", planned: "Planned" };
  var TONE = { active: "success", completed: "success", confirmed: "success", live: "success", absent: "info", medical: "info", pendingApproval: "info",
    suspended: "warning", pendingDocuments: "warning", awaitingPayment: "warning", pending: "warning", rejected: "danger", failed: "danger" };
  var TYPES = { application: "New Application", renewal: "Renewal", conversion: "Conversion", transfer: "Transfer", extension: "Extension", withdrawal: "Withdrawal",
    rejoin: "Rejoin", deceased: "Deceased Membership", absent: "Absent Membership", medical: "Medical Membership", suspension: "Suspension", reinstatement: "Reinstatement",
    statusChange: "Status Change", supplementary: "Supplementary Membership", nomineeChange: "Nominee Change", classification: "Classification", corporateCreation: "Corporate Membership" };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  /* ---------- Helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function money(n) { return (n < 0 ? "−S$" : "S$") + Math.abs(n).toLocaleString("en-SG"); }
  function money2(n) { return (n < 0 ? "−S$" : "S$") + Math.abs(n).toLocaleString("en-SG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  // dateFormat D MMM YYYY (design-system Content); a time after the date is kept
  function fdate(v) { if (!v) return "—"; var s = String(v), p = s.slice(0, 10).split("-"); return p.length < 3 ? s : +p[2] + " " + MONTHS[+p[1] - 1] + " " + p[0] + s.slice(10); }
  function qs(k) { return new URLSearchParams(location.search).get(k); }
  function now() { var t = new Date(); return TODAY + " " + String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0"); }
  function seq(k, width) { var n = db.meta.seq[k]++; return width ? String(n).padStart(width, "0") : n; }
  function badge(s) { var t = TONE[s] || "secondary"; return '<span class="badge text-' + t + "-emphasis bg-" + t + '-subtle">' + esc(LABEL[s] || s) + "</span>"; }
  function onOff(on, what) { var t = on ? "success" : "secondary"; return '<span class="badge text-' + t + "-emphasis bg-" + t + '-subtle">' + what + (on ? " on" : " off") + "</span>"; }
  function person(id) { return db.persons.filter(function (p) { return p.id === id; })[0]; }
  function mem(id) { return db.memberships.filter(function (m) { return m.membershipId === id; })[0]; }
  function typeOf(code) { return cfg.membershipTypes.filter(function (t) { return t.code === code; })[0]; }
  function req(id) { return db.requests.filter(function (r) { return r.id === id; })[0]; }
  function handoffOf(r) { return db.handoffs.filter(function (h) { return h.requestId === r.id; }).slice(-1)[0]; }
  function holder(m) { return m.sponsorName || person(m.personId).fullName; }
  function role() { return TAB && ROLES[TAB[1]] ? TAB[1] : null; }
  function user() { return role() ? ROLES[role()].name : "Presenter"; }
  function rows(tbody, html, cols, empty) {
    tbody.innerHTML = html || '<tr><td colspan="' + cols + '" data-label=""><p class="empty-state" data-state="empty">' + esc(empty || "No records match these filters.") + "</p></td></tr>";
  }
  function td(label, html, cls) { return '<td data-label="' + esc(label) + '"' + (cls ? ' class="' + cls + '"' : "") + ">" + html + "</td>"; }
  function memberLink(id) { return id ? '<a href="member.html?id=' + esc(id) + '">' + esc(id) + "</a>" : "—"; }
  function reqLink(id) { return '<a href="request.html?id=' + esc(id) + '">' + esc(id) + "</a>"; }
  function options(list, value) { return list.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (o[0] === value ? " selected" : "") + ">" + esc(o[1]) + "</option>"; }).join(""); }
  function facts(list) { return list.map(function (f) { return "<div><dt>" + esc(f[0]) + "</dt><dd>" + (f[2] ? f[1] : esc(f[1])) + "</dd></div>"; }).join(""); }
  // Field or form error: the message under the control, and the control marked invalid (Bootstrap validation)
  function showError(el, msg) { el.textContent = msg || ""; el.hidden = !msg; }

  function save() { Store.save(); }
  function audit(action, ref, outcome, before, after) {
    db.audit.unshift({ id: "AU-" + seq("AU", 3), at: now(), actor: user(), role: role(), action: action, ref: ref, outcome: outcome, before: before == null ? null : before, after: after == null ? null : after });
  }
  function notify(template, recipient, ref, kind) { db.outbox.unshift({ id: "N-" + seq("N", 3), at: now(), template: template, kind: kind || "service", recipient: recipient, ref: ref, status: "delivered" }); }
  function publish(target, event, ref) { db.integrationEvents.unshift({ id: "IE-" + seq("IE", 3), at: now(), target: target, event: event, ref: ref, stub: ["FIN-OPS", "Membership", "Golf", "Events", "Facilities", "Resorts"].indexOf(target) < 0 }); }
  function publishStatus(m) {
    var g = Rules.bizRule019(m.status, cfg.privileges);
    ["Access Control", "HMS", "GMS"].forEach(function (t) { publish(t, "Member context: " + LABEL[m.status] + ", privileges " + (g.privileges ? "on" : "off"), m.membershipId); });
  }

  function toast(msg, tone) {
    var host = $(".toast-host") || document.body.appendChild(Object.assign(document.createElement("div"), { className: "toast-host" }));
    var el = document.createElement("div");
    el.className = "toast" + (tone === "danger" ? " text-danger-emphasis" : "");
    el.setAttribute("role", tone === "danger" ? "alert" : "status");
    el.setAttribute("data-state", tone === "danger" ? "error" : "success");
    el.innerHTML = '<div class="toast-body cluster cluster--between"><span>' + esc(msg) + '</span><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div>';
    host.setAttribute("aria-live", "polite");
    host.appendChild(el);
    bootstrap.Toast.getOrCreateInstance(el, { delay: 5000 }).show();
  }
  function flash(msg) { try { sessionStorage.setItem(KEY + "-flash", msg); } catch (e) {} }
  function go(url, msg) {
    if (msg) flash(msg);
    var same = url.split("#")[0] === location.pathname.split("/").pop() + location.search;
    location.href = url;
    if (same) location.reload(); // a hash-only change does not reload the page
  }

  // One confirmation modal for every irreversible action; with a reason field when the rule needs one (BR-176)
  function ask(o) {
    var el = document.createElement("div");
    el.className = "modal fade"; el.tabIndex = -1; el.setAttribute("aria-labelledby", "ask-title");
    el.innerHTML = '<div class="modal-dialog"><form class="modal-content" novalidate><div class="modal-header"><h2 class="modal-title h5" id="ask-title">' + esc(o.title) + '</h2><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
      '<div class="modal-body stack"><p>' + esc(o.body || "") + "</p>" + (o.reason ? '<div class="field"><label class="form-label required" for="ask-reason">' + esc(o.reason) + '</label><textarea class="form-control" id="ask-reason" rows="3" aria-describedby="ask-err"></textarea><div class="invalid-feedback" id="ask-err" data-state="error"></div></div>' : "") +
      '</div><div class="modal-footer btn-row"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Keep as is</button><button type="submit" class="btn ' + (o.danger ? "btn-danger" : "btn-primary") + '">' + esc(o.ok) + "</button></div></form></div>";
    document.body.appendChild(el);
    var modal = bootstrap.Modal.getOrCreateInstance(el), f = $("form", el), opener = document.activeElement;
    // the dialog is opened by script, so Bootstrap cannot return focus to its button: do it here (keyboard users)
    el.addEventListener("hidden.bs.modal", function () { el.remove(); if (opener && opener.isConnected) opener.focus(); });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var reason = o.reason ? $("#ask-reason", el).value.trim() : "", res = o.run(reason);
      if (res && !res.ok) { var ta = $("#ask-reason", el); if (ta) { ta.classList.add("is-invalid"); $("#ask-err", el).textContent = res.msg; } else toast(res.msg, "danger"); return; }
      modal.hide();
    });
    modal.show();
  }

  /* ---------- Membership status (BR-018, BR-019) ---------- */
  function setStatus(m, to, why) {
    var from = m.status;
    m.status = to;
    audit("Status changed", m.membershipId, LABEL[from] + " → " + LABEL[to] + (why ? " (" + why + ")" : ""), from, to);
    publishStatus(m);
  }

  /* ---------- Request engine ---------- */
  function docsFor(type, ticked) { return (cfg.documents[type] || []).map(function (n) { return { name: n, received: ticked.indexOf(n) >= 0, receivedAt: ticked.indexOf(n) >= 0 ? TODAY : null }; }); }
  function move(m, to) { return Rules.bizRule018(m.status, to, cfg.transitions); }

  // Validates a request before submission; returns { ok, msg, route, details, preview, documents, fee }
  function checkRequest(type, m, f) {
    var L = cfg.limits, tp = m && typeOf(m.typeCode), x, ne;
    var r = { ok: true, msg: "", route: "approver", details: {}, preview: [] };
    function stop(res) { return { ok: false, msg: res.msg || res }; }
    if (type !== "corporateCreation" && !m) return stop("Choose the membership.");
    if (f.from || f.to) { x = Rules.bizRule172(null, TODAY, f.from, f.to); if (!x.ok) return stop(x); }
    switch (type) {
      case "renewal":
        if (!(x = Rules.bizRule009(m, f.memberRequested)).ok) return stop(x);
        ne = Rules.addMonths(m.expiryDate, f.years * 12);
        if (!(x = Rules.bizRule008(m, tp, ne, L.maxCombinedYears)).ok) return stop(x);
        r.details = { years: +f.years, newExpiry: ne }; r.preview.push("New expiry " + fdate(ne));
        break;
      case "conversion":
        if (m.status !== "active") return stop("Only an Active membership can convert (BR-018).");
        var target = cfg.membershipTypes.filter(function (t) { return t.active && t.category === tp.category && t.plan && t.plan !== tp.plan; })[0];
        if (!target) return stop(tp.name + " has no Full / Basic counterpart to convert to (BR-010).");
        var rem = Rules.monthsBetween(TODAY, m.expiryDate), nm = Rules.bizRule010(rem, tp.plan, target.plan);
        ne = Rules.addMonths(TODAY, nm);
        if (!(x = Rules.bizRule008(m, target, ne, L.maxCombinedYears)).ok) return stop(x);
        r.details = { targetTypeCode: target.code, remaining: rem, newRemaining: nm, newExpiry: ne };
        r.preview.push(tp.name + " → " + target.name + ": remaining " + rem + " → " + nm + " months (BR-010)", "New expiry " + fdate(ne));
        break;
      case "transfer":
        if (!(x = Rules.bizRule011(tp, person(f.recipient), TODAY)).ok) return stop(x);
        r.details = { recipientPersonId: f.recipient, reason: f.reason };
        break;
      case "extension":
        if (!(x = Rules.bizRule012(+f.months, L)).ok) return stop(x);
        r.route = x.route; ne = Rules.addMonths(m.expiryDate, +f.months);
        if (!(x = Rules.bizRule008(m, tp, ne, L.maxCombinedYears)).ok) return stop(x);
        r.details = { months: +f.months, reason: f.reason, newExpiry: ne };
        r.preview.push("New expiry " + fdate(ne), "Routed to " + (r.route === "manager" ? "Membership Manager (over " + L.extensionApproverMaxMonths + " months)" : "Approver") + " (BR-012)");
        break;
      case "withdrawal":
        if (!(x = Rules.bizRule013(f.memberRequested)).ok) return stop(x);
        if (!(x = move(m, "withdrawn")).ok) return stop(x);
        r.details = { reason: f.reason, refund: 0 };
        r.preview.push("The balance is cleared first; no refund of the remaining term (BR-013)");
        break;
      case "rejoin":
        if (!(x = Rules.bizRule014Rejoin(m)).ok) return stop(x);
        r.details = { keepsId: m.membershipId }; r.preview.push("Keeps Membership ID " + m.membershipId + " (BR-014)");
        break;
      case "deceased":
        var ben = f.beneficiary ? person(f.beneficiary) : null;
        if (ben && !(x = Rules.bizRule011(tp, ben, TODAY)).ok) return stop(x);
        if (!ben && !(x = move(m, "deceased")).ok) return stop(x);
        r.details = { dateOfDeath: f.dateOfDeath, beneficiaryPersonId: f.beneficiary || null, refund: +f.refund || 0 };
        r.route = Rules.bizRule015(r.details.refund);
        if (r.details.refund) r.preview.push("Goodwill refund " + money(r.details.refund) + ": Manager approval required (BR-015)");
        r.preview.push(ben ? "Transfer to " + ben.fullName + " under the transfer rules" : "Membership closes as Deceased");
        break;
      case "absent":
        if (!(x = Rules.bizRule016(m, f.from, f.to, L)).ok) return stop(x);
        if (!(r.ok = move(m, "absent").ok)) return stop(move(m, "absent"));
        r.details = { from: f.from, to: f.to, months: x.months, reason: f.reason, newExpiry: Rules.addMonths(m.expiryDate, x.months) };
        r.preview.push(x.months + " months; term suspended, new expiry " + fdate(r.details.newExpiry) + " (BR-016, BR-174)");
        break;
      case "medical":
        if (!(x = Rules.bizRule017(f.from, f.to, L)).ok) return stop(x);
        if (!(r.ok = move(m, "medical").ok)) return stop(move(m, "medical"));
        r.details = { from: f.from, to: f.to, months: x.months };
        r.preview.push(x.months + " months; expiry stays " + fdate(m.expiryDate) + " (BR-017)");
        break;
      case "suspension":
        if (!(x = move(m, "suspended")).ok) return stop(x);
        if (!f.reason) return stop("Enter the suspension reason.");
        r.route = "manager"; r.details = { reason: f.reason };
        break;
      case "reinstatement":
        if (["suspended", "absent", "medical"].indexOf(m.status) < 0) return stop("Only a Suspended, Absent or Medical membership can be reinstated.");
        r.route = "manager"; r.details = { reason: f.reason };
        break;
      case "statusChange":
        if (!(x = move(m, f.target)).ok) return stop(x);
        r.details = { target: f.target, reason: f.reason };
        break;
      case "supplementary":
        if (!(x = Rules.bizRule020(m)).ok) return stop(x);
        var sp = person(f.person);
        if (!sp) return stop("Choose the supplementary member.");
        if (!(x = Rules.bizRule003(sp, typeOf("SUP"), TODAY)).ok) return stop(x);
        r.details = { personId: f.person, principalMembershipId: m.membershipId };
        break;
      case "nomineeChange":
        if (tp.category !== "corporate") return stop("Nominees apply to corporate memberships only (BR-022).");
        if (!f.outgoing && !(x = Rules.bizRule022(m, tp)).ok) return stop(x);
        if (!f.nominee) return stop("Choose the nominee.");
        if (!(x = Rules.bizRule003(person(f.nominee), tp, TODAY, m.sponsorName)).ok) return stop(x);
        r.details = { nomineePersonId: f.nominee, outgoingPersonId: f.outgoing || null };
        break;
      case "classification":
        var yrs = cfg.limits.classificationYears[f.kind];
        r.details = { kind: f.kind, years: yrs, until: Rules.addMonths(TODAY, yrs * 12) };
        r.preview.push((f.kind === "honorary" ? "Honorary" : "Committee") + " until " + fdate(r.details.until));
        break;
      case "corporateCreation":
        if (!(x = Rules.bizRule022Corporate(role())).ok) return stop(x);
        var ct = typeOf(f.corpType), np = person(f.nominee);
        if (!f.sponsor) return stop("Enter the sponsoring company (BR-003).");
        if (!np) return stop("Choose the first nominee.");
        if (!(x = Rules.bizRule003(np, ct, TODAY, f.sponsor)).ok) return stop(x);
        r.details = { typeCode: f.corpType, sponsorName: f.sponsor, nomineePersonId: f.nominee };
        break;
    }
    r.documents = docsFor(type, f.docs || []);
    r.fee = Rules.bizRule029({ type: type, details: r.details }, cfg, m);
    if (r.fee) r.preview.push((type === "deceased" ? "Refund " : "Fee ") + money(r.fee) + " from the fee configuration, requested after approval (BR-029)");
    return r;
  }

  function hist(r, action, from, to, comment) { r.history.push(Rules.bizRule177(now(), user(), role(), action, from ? LABEL[from] : null, to ? LABEL[to] : null, comment)); }

  // Creates a request as a Draft (form values kept for Edit), or submits it straight away
  function createRequest(type, m, personId, chk, form, asDraft) {
    var r = { id: "RQ-" + seq("RQ"), type: type, membershipId: m ? m.membershipId : null, personId: personId, status: "draft", createdBy: role(), createdByName: user(), createdAt: now(), submittedAt: null,
      route: chk.route || "approver", details: chk.details || {}, documents: chk.documents || docsFor(type, form.docs || []), fee: chk.fee || 0, decision: null, history: [], form: form };
    db.requests.unshift(r);
    if (asDraft) hist(r, "Draft saved", null, "draft"); else r.status = null;
    if (!asDraft) submit(r, chk);
    else { audit("Request draft saved", r.id, TYPES[type]); save(); }
    return r;
  }
  function submit(r, chk) {
    var from = r.status;
    if (chk) { r.route = chk.route; r.details = chk.details; r.documents = chk.documents; r.fee = chk.fee; }
    r.status = Rules.bizRule004(r.documents).ok ? "pendingApproval" : "pendingDocuments";
    r.submittedAt = now();
    hist(r, "Submitted" + (r.createdBy === "member" ? " (portal)" : ""), from, r.status);
    notify("ACK", person(r.personId).fullName, r.id);
    audit("Request submitted", r.id, TYPES[r.type] + ", " + LABEL[r.status]);
    save();
  }


  // Runs one workflow action on a request; returns { ok, msg }
  function act(r, action, reason) {
    var x = Workflow.can(role(), r, action, user()), m = mem(r.membershipId), who = person(r.personId).fullName, from = r.status, h;
    if (!x.ok) return x;
    if (action === "docs") {
      r.documents.forEach(function (d) { if (!d.received) { d.received = true; d.receivedAt = TODAY; } });
      r.status = "pendingApproval"; hist(r, "Documents received", from, r.status);
    } else if (action === "cancel") {
      r.status = "cancelled"; hist(r, "Cancelled", from, r.status, reason);
    } else if (action === "return" || action === "reject") {
      if (!(x = Rules.bizRule176(reason)).ok) return x;
      r.decision = { by: user(), role: role(), at: now(), outcome: action === "return" ? "returned" : "rejected", reason: reason };
      r.status = action === "return" ? "pendingDocuments" : "rejected";
      hist(r, action === "return" ? "Returned for correction" : "Rejected", from, r.status, reason);
      notify(action === "return" ? "ACK" : "REJECTED", who, r.id);
    } else if (action === "approve") {
      if (!(x = Rules.bizRule004(r.documents)).ok) return x;
      r.fee = Rules.bizRule029(r, cfg, m);
      r.decision = { by: user(), role: role(), at: now(), outcome: "approved", reason: "" };
      notify("APPROVED", who, r.id);
      if ((r.fee > 0 && r.type !== "deceased") || r.type === "withdrawal") {
        var kind = r.type === "withdrawal" ? "clearance" : "fee";
        h = { id: "HO-" + seq("HO"), requestId: r.id, membershipId: r.membershipId, kind: kind, description: TYPES[r.type] + (kind === "clearance" ? ": balance clearance (no refund of the remaining term)" : r.type === "renewal" ? " " + r.details.years + " years" : ""),
          amount: kind === "clearance" ? outstanding(r.membershipId) : r.fee, status: "pending", createdAt: now(), via: "FIN-OPS", financeRef: null, bill: null, attempts: [], recordedBy: null };
        db.handoffs.push(h);
        // (v07) the fee is a FIN-OPS financial event and its receivable (BR-140); a clearance reads the FIN-OPS balance (RC-147)
        if (kind === "fee") { var fe = finOps("MMS", h.id, "MMS-FEE", r.membershipId || r.personId, h.amount, { note: h.description }); h.financeRef = fe.id; h.bill = (db.receivables.filter(function (y) { return y.event === fe.id; })[0] || {}).id || null; }
        r.status = "awaitingPayment"; hist(r, "Approved", from, r.status, "Hand-off " + h.id + " " + money(h.amount));
      } else {
        hist(r, "Approved", from, "completed"); apply(r);
      }
    } else if (action === "fail") {
      h = handoffOf(r); h.status = "failed"; h.recordedBy = user(); (h.attempts = h.attempts || []).push({ at: now(), by: user(), result: "rejected" });
      hist(r, "Payment failed: a rejected attempt in FIN-OPS", from, r.status, "Not completed; " + (h.bill ? "receivable " + h.bill + " stays open" : "balance unchanged") + " (BR-006)");
      notify("REJECTED", who, r.id);
    } else if (action === "pay") {
      h = handoffOf(r);
      // (v07) Confirm payment records a FIN-OPS Payment with a PaymentNo against the receivable (BR-141, BR-142); a clearance settles the FIN-OPS balance first
      var owed = h.kind === "clearance" ? outstanding(r.membershipId) : h.amount, py = owed > 0 ? finPay(h.kind === "clearance" ? r.membershipId : (r.membershipId || r.personId), owed, "Card", h.bill, r.id) : null;
      h.status = "confirmed"; h.recordedBy = user(); h.paymentNo = py ? py.payment.paymentNo : null;
      if (!(x = Rules.bizRule006(h)).ok) return x;
      hist(r, (h.kind === "clearance" ? "Balance cleared" : "Payment recorded") + " in FIN-OPS" + (h.paymentNo ? " (" + h.paymentNo + ")" : ""), from, "completed");
      apply(r);
    }
    audit("Request " + action, r.id, LABEL[r.status]);
    save();
    return { ok: true, msg: TYPES[r.type] + " " + r.id + ": " + LABEL[r.status] };
  }


  function newMembership(p, tp, sponsor, extra) {
    var start = Rules.bizRule173(TODAY);
    var m = Object.assign({ membershipId: Rules.bizRule001(p, sponsor, seq("MID")), personId: p.id, typeCode: tp.code, status: "active", joinedDate: start, startDate: start,
      expiryDate: Rules.bizRule174(start, tp.termYears), absentPeriods: [], medicalPeriods: [], responsibleMembershipId: null, sponsorName: sponsor || null,
      nominees: [], classification: null, transferredFrom: null,
      contract: { entranceFee: tp.entranceFee, monthlySubscription: tp.monthlySubscription, creditLimit: tp.creditLimit, spendingCreditGranted: tp.spendingCreditGranted, currency: "SGD" } }, extra || {});
    db.memberships.push(m);
    db.cards.push({ id: "CD-" + seq("CD", 3), membershipId: m.membershipId, kind: "digital", issued: TODAY, status: "active" });
    if (tp.spendingCreditGranted) {
      // BR-023: the award is a negative credit line for Finance; the contract value itself never changes
      var sca = { id: "SCA-" + seq("SCA", 2), member: m.membershipId, granted: tp.spendingCreditGranted, used: 0, grantDate: TODAY, status: "active" }; db.spendingCredits.push(sca);  // (v07) a member-account credit in FIN-OPS, never a Payment (BR-148)
      db.handoffs.push({ id: "HO-" + seq("HO"), requestId: null, membershipId: m.membershipId, kind: "credit", description: "Spending Credit Award (contract): credit line", amount: -tp.spendingCreditGranted, status: "confirmed", createdAt: now(), via: "FIN-OPS", financeRef: sca.id, recordedBy: null });
    }
    audit("Membership activated", m.membershipId, tp.name + ", start " + fdate(start));
    publishStatus(m);
    return m;
  }

  // Applies a completed request to the membership (workflow-request-v2.md, Apply)
  function apply(r) {
    var m = mem(r.membershipId), x = r.details, p = person(r.personId), note = "";
    switch (r.type) {
      case "application":
        // (v02, G-1) the retained acquisition data goes with the membership, for MMS-RR-006
        var nm = newMembership(p, typeOf(x.typeCode), null, { recruitmentSource: x.recruitmentSource || null, referrerMembershipId: x.referrerMembershipId || null });
        r.membershipId = nm.membershipId; note = "Membership " + nm.membershipId + " activated";
        var camp = x.recruitmentSource === "Referral" && Rules.bizRule030(cfg.campaigns, TODAY);
        if (camp) {
          var amt = +(camp.reward.match(/\d[\d,]*/) || ["0"])[0].replace(/,/g, "");
          var rh = { id: "HO-" + seq("HO"), requestId: r.id, membershipId: x.referrerMembershipId, kind: "reward", description: "Referral reward " + camp.code + " for " + x.referrerMembershipId, amount: amt, status: "pending", createdAt: now(), via: "FIN-OPS", financeRef: null, recordedBy: null };
          db.handoffs.push(rh); rh.financeRef = finRefundIn("MMS", rh.id, x.referrerMembershipId, amt, [{ source: "In-house credit", amount: amt }], "Referral reward " + camp.code, { kind: "mms", id: rh.id }).id;
          x.reward = camp.reward + " to " + x.referrerMembershipId;
        }
        notify("WELCOME", p.fullName, nm.membershipId);
        break;
      case "renewal": case "extension": m.expiryDate = x.newExpiry; note = "Expiry " + fdate(x.newExpiry); break;
      case "conversion":
        var tt = typeOf(x.targetTypeCode); m.typeCode = tt.code; m.expiryDate = x.newExpiry; m.contract.monthlySubscription = tt.monthlySubscription;
        note = tt.name + ", expiry " + fdate(x.newExpiry); break;
      case "transfer":
        m.transferredFrom = m.personId; m.personId = x.recipientPersonId;
        note = "Holder now " + person(x.recipientPersonId).fullName; break;
      case "withdrawal": setStatus(m, "withdrawn", r.id); break;
      case "rejoin":
        var rs = Rules.bizRule173(TODAY); m.startDate = rs; m.expiryDate = Rules.bizRule174(rs, typeOf(m.typeCode).termYears);
        setStatus(m, "active", "rejoin " + r.id); note = "Same Membership ID " + m.membershipId; break;
      case "deceased":
        if (x.beneficiaryPersonId) { m.transferredFrom = m.personId; m.personId = x.beneficiaryPersonId; note = "Transferred to beneficiary " + person(x.beneficiaryPersonId).fullName; }
        else setStatus(m, "deceased", r.id);
        if (x.refund) { var gh = { id: "HO-" + seq("HO"), requestId: r.id, membershipId: m.membershipId, kind: "refund", description: "Goodwill refund (BR-015)", amount: -x.refund, status: "pending", createdAt: now(), via: "FIN-OPS", financeRef: null, recordedBy: null };
          db.handoffs.push(gh); gh.financeRef = finRefundIn("MMS", gh.id, m.membershipId, x.refund, [{ source: "Bank transfer", amount: x.refund }], "Goodwill refund (BR-015), approved by the Manager", { kind: "mms", id: gh.id }).id; }  // (v07) then the Finance Officer and Finance Approver (RC-148)
        break;
      // shortcut: the status turns Absent on approval even for a future period; a real build switches it on the start date
      case "absent": m.absentPeriods.push({ from: x.from, to: x.to, requestId: r.id }); m.expiryDate = x.newExpiry; setStatus(m, "absent", r.id); break;
      case "medical": m.medicalPeriods.push({ from: x.from, to: x.to, requestId: r.id }); setStatus(m, "medical", r.id); break;
      case "suspension": setStatus(m, "suspended", r.id); break;
      case "reinstatement": setStatus(m, "active", r.id); break;
      case "statusChange": setStatus(m, x.target, r.id); break;
      case "supplementary":
        var sm = newMembership(person(x.personId), typeOf("SUP"), null, { responsibleMembershipId: x.principalMembershipId });
        note = "Supplementary " + sm.membershipId; break;
      case "nomineeChange":
        if (x.outgoingPersonId) m.nominees.forEach(function (n) { if (n.personId === x.outgoingPersonId && !n.to) n.to = TODAY; });
        m.nominees.push({ personId: x.nomineePersonId, from: TODAY, to: null });
        publish("Access Control", "Nominee " + person(x.nomineePersonId).fullName + " active for " + m.membershipId, m.membershipId);
        note = "Nominee " + person(x.nomineePersonId).fullName + " active"; break;
      case "classification": m.classification = { kind: x.kind, to: x.until }; note = x.kind + " until " + fdate(x.until); break;
      case "corporateCreation":
        var cm = newMembership(person(x.nomineePersonId), typeOf(x.typeCode), x.sponsorName);
        cm.nominees.push({ personId: x.nomineePersonId, from: cm.startDate, to: null });
        r.membershipId = cm.membershipId; note = "Corporate membership " + cm.membershipId; break;
    }
    r.status = "completed";
    hist(r, "Completed" + (note ? ": " + note : ""), null, "completed");
    if (r.type !== "application") notify("COMPLETED", p.fullName, r.id);
    if (r.membershipId && mem(r.membershipId)) publishStatus(mem(r.membershipId)); // status feed stubs to Access Control, HMS, GMS
  }

  // Stands in for the nightly job: expiry (BR-014), supplementary end (BR-020), junior age limit (BR-021), end of absent and medical periods (BR-016, BR-017)
  function lifecycleCheck() {
    var changed = [];
    db.memberships.forEach(function (m) {
      if (Rules.bizRule014Expired(m, TODAY)) { setStatus(m, "expired", "expiry " + fdate(m.expiryDate) + " passed"); notify("COMPLETED", holder(m), m.membershipId); changed.push(m.membershipId + " Expired"); }
      else if (Rules.periodEnded(m, TODAY)) { setStatus(m, "active", LABEL[m.status].toLowerCase() + " period ended"); notify("COMPLETED", holder(m), m.membershipId); changed.push(m.membershipId + " Active"); }
    });
    db.memberships.forEach(function (m) {
      if (m.status !== "active") return;
      if (m.typeCode === "SUP" && !Rules.bizRule020(mem(m.responsibleMembershipId)).ok) { setStatus(m, "ended", "principal " + m.responsibleMembershipId + " not active"); changed.push(m.membershipId + " Ended"); }
      else if (m.typeCode === "JUN" && Rules.bizRule021(person(m.personId), TODAY, cfg.limits.juniorAgeLimit)) { setStatus(m, "ended", "junior age limit " + cfg.limits.juniorAgeLimit); changed.push(m.membershipId + " Ended"); }
    });
    audit("Lifecycle check", "Memberships", changed.length ? changed.join(", ") : "No changes");
    save();
    return changed;
  }

  /* ---------- Shell ---------- */
  function shell(page) {
    var r = role(), launcher = page === "index.html";
    $$(".app-nav [data-roles]").forEach(function (x) { x.hidden = !r || x.getAttribute("data-roles").split(" ").indexOf(r) < 0; });
    $$(".app-nav a").forEach(function (x) { if (x.getAttribute("href") === page) x.setAttribute("aria-current", "page"); });
    $("[data-role-label]").textContent = launcher ? "Launcher" : !r ? "No role" : r === "member" ? ROLES.member.name + " (Member)" : ROLES[r].label;
    // role avatar (guideline avatar): the initials of the tab's person, "CC" on the launcher
    $("[data-role-initials]").textContent = launcher || !r ? "CC" : user().replace(/\./g, "").split(/\s+/).slice(-2).map(function (w) { return w[0]; }).join("").toUpperCase();
    $("[data-theme-toggle]").addEventListener("click", function () {
      var t = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-bs-theme", t);
      try { localStorage.setItem(TABKEY + "-theme", t); } catch (e) {}
    });
    $$("[data-not-in-scope]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); toast("Not in prototype scope: built in " + b.getAttribute("data-not-in-scope")); }); });
    // a chart drawn inside a closed panel or tab has no width; redraw when it opens (charts redraw on resize, Layout-11)
    ["shown.bs.collapse", "shown.bs.tab"].forEach(function (ev) { document.addEventListener(ev, function () { window.dispatchEvent(new Event("resize")); }); });
    // (v04) Bootstrap leaves an empty style="" on a section it has opened; drop it so no page carries inline style (Layout-01/12)
    document.addEventListener("shown.bs.collapse", function (e) { if (e.target.getAttribute("style") === "") e.target.removeAttribute("style"); });
    $$("[data-guide]").forEach(function (a) { a.addEventListener("click", function () { try { localStorage.setItem(KEY + "-guide", a.getAttribute("data-guide")); sessionStorage.removeItem(KEY + "-guide-open"); } catch (e) {} }); });
    $$("[data-for-roles]").forEach(function (x) { if (x.getAttribute("data-for-roles").split(" ").indexOf(r) < 0) x.remove(); });
    $$("[data-golf-clock]").forEach(function (x) { x.textContent = "Wed " + fdate(TODAY) + " · " + cfg.golf.clock + " (demo clock)"; });  // (v03) D-285
    guide(r, page);
    var msg; try { msg = sessionStorage.getItem(KEY + "-flash"); sessionStorage.removeItem(KEY + "-flash"); } catch (e) {}
    if (msg) toast(msg);
    var ok = Rules.bizRule084(PAGE_ROLES[page] || [], r, LABELS);
    if (!ok.ok) $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">' + esc(ok.msg) + '</p><p><a href="index.html">Open the launcher</a> and open the page from a tab for that role.</p></div>';
    return ok.ok;
  }

  // Scenario guide side panel (agent/reference/ui/scenario-guide.md); the scenario is shared by every role tab, its open state is per tab
  function guide(r, page) {
    var GK = KEY + "-guide", OK = KEY + "-guide-open", id, open;
    try { id = localStorage.getItem(GK); open = sessionStorage.getItem(OK); } catch (e) {}
    window.addEventListener("storage", function (e) { if (e.key === GK) location.reload(); });
    var g = id && window.SEED.guides && window.SEED.guides[id];
    if (!g || page === "index.html") return;
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "btn btn-sm btn-alt"; btn.setAttribute("data-bs-toggle", "offcanvas"); btn.setAttribute("data-bs-target", "#guide-panel"); btn.setAttribute("aria-controls", "guide-panel");
    btn.textContent = "Guide " + id;
    $("[data-theme-toggle]").before(btn);
    var acct = TAB && TAB[2], mine = 0;
    var steps = g.steps.map(function (s, i) {
      var own = s.roles.indexOf(r) >= 0 && (r !== "member" || !s.acct || s.acct === (acct || ROLES.member.membershipId));
      var here = own && s.pages.indexOf(page) >= 0, r0 = s.roles[0];
      if (here && !mine) mine = i + 1;
      var tag = here ? '<span class="badge text-bg-secondary">On this page</span>' : own ? '<span class="badge text-bg-secondary">This tab</span>' :
        r0 ? '<a class="btn btn-sm btn-outline-alt" href="' + s.page + '" target="' + TABKEY + "-" + r0 + (r0 === "member" ? "-" + (s.acct || "KD10004") : "") + '">Open ' + esc(LABELS[r0]) + " tab</a>" : '<span class="badge bg-secondary-subtle text-secondary-emphasis">Presenter</span>';
      return '<li class="list-group-item guide-step' + (here ? " guide-step--here" : "") + '"' + (mine === i + 1 ? ' aria-current="step"' : "") + '><div class="cluster cluster--between"><strong>Step ' + (i + 1) + "</strong>" + tag +
        '</div><p class="mb-1">' + esc(s.do) + '</p><p class="text-muted small mb-0">You should see: ' + esc(s.see) + "</p></li>";
    }).join("");
    var p = document.createElement("div");
    p.className = "offcanvas offcanvas-end guide-panel"; p.id = "guide-panel"; p.tabIndex = -1; p.setAttribute("aria-labelledby", "guide-title"); p.setAttribute("data-bs-scroll", "true"); p.setAttribute("data-bs-backdrop", "false");
    p.innerHTML = '<div class="offcanvas-header"><div class="stack"><span class="badge text-primary-emphasis bg-primary-subtle align-self-start">' + esc(g.module) + '</span><h2 class="h5 mb-0" id="guide-title">' + esc(id) + ": " + esc(g.title) + '</h2></div><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close the guide"></button></div>' +
      '<div class="offcanvas-body stack"><ol class="list-group">' + steps + '</ol><button type="button" class="btn btn-outline-secondary" data-guide-end>End guide</button></div>';
    document.body.appendChild(p);
    p.addEventListener("shown.bs.offcanvas", function () { try { sessionStorage.setItem(OK, "1"); } catch (e) {} var c = $(".guide-step--here", p); if (c) c.scrollIntoView({ block: "nearest" }); });
    p.addEventListener("hidden.bs.offcanvas", function () { try { sessionStorage.setItem(OK, "0"); } catch (e) {} });
    $("[data-guide-end]", p).addEventListener("click", function () { try { localStorage.removeItem(GK); sessionStorage.removeItem(OK); } catch (e) {} location.reload(); });
    if (open === "1" || (open !== "0" && mine)) bootstrap.Offcanvas.getOrCreateInstance(p).show();
  }

  // BR-084: a link to a page the tab's role cannot open is shown as plain text (links that open another role's tab, target=…, stay)
  function plainLinks(root) {
    $$("a[href]:not([target])", root).forEach(function (x) {
      var f = x.getAttribute("href").split(/[?#]/)[0];
      if (PAGE_ROLES[f] && !Rules.bizRule084(PAGE_ROLES[f], role(), LABELS).ok) { var s = document.createElement("span"); s.className = "text-muted"; s.textContent = x.textContent; x.replaceWith(s); }
    });
  }

  /* ---------- Shared renderers ---------- */
  function timeline(items) {
    return items.length ? items.slice().reverse().map(function (h) {
      return '<li><div class="timeline__meta">' + esc(fdate(h.at)) + ", " + esc(h.actor) + (h.role ? ", " + esc(LABELS[h.role] || h.role) : "") + (h.from || h.to ? ", " + esc((h.from || "—") + " → " + (h.to || "—")) : "") + "</div><div><strong>" + esc(h.action) + "</strong>" + (h.comment ? ", " + esc(h.comment) : "") + (h.outcome ? ", " + esc(h.outcome) : "") + "</div></li>";
    }).join("") : '<li><div class="timeline__meta">No history yet</div></li>';
  }
  // The request journey rail (design pass 3): Draft, Documents, Approval, Payment, Done; the current step, a problem step and who acts next
  var STEPS = ["Draft", "Documents", "Approval", "Payment", "Done"], STEP_OF = { draft: 1, pendingDocuments: 2, pendingApproval: 3, awaitingPayment: 4, completed: 5 };
  function journeyState(r) {
    var h = handoffOf(r), returned = r.status === "pendingDocuments" && r.decision && r.decision.outcome === "returned", failed = r.status === "awaitingPayment" && h && h.status === "failed";
    var last = r.history.slice(-1)[0], fromStep = { Draft: 1, "Pending Documents": 2, "Pending Approval": 3, "Awaiting Payment": 4 }[last && last.from] || 1;
    var at = r.status === "rejected" ? 3 : r.status === "cancelled" ? fromStep : STEP_OF[r.status];
    var problem = r.status === "rejected" || r.status === "cancelled" || returned || failed;
    var who = r.route === "manager" ? "the Membership Manager" : "an Approver or the Manager";
    var next = { draft: "Waiting for " + r.createdByName + " to submit it.", pendingDocuments: returned ? "Returned for correction: waiting for " + r.createdByName + " to edit and resubmit it." : "Waiting for the Membership Officer to mark the documents received.",
      pendingApproval: "Waiting for " + who + " who did not submit it to decide.", awaitingPayment: failed ? "The payment failed: waiting for an Approver to confirm a new payment in FIN-OPS." : "Waiting for an Approver to confirm the payment in FIN-OPS.",
      completed: "Done: the change is applied.", rejected: "Rejected: nothing more happens.", cancelled: "Cancelled: nothing more happens." }[r.status];
    return { at: at, problem: problem, done: r.status === "completed", next: next };
  }
  function stepClass(j, i) { return j.done || i < j.at ? "is-done" : i === j.at ? (j.problem ? "is-problem" : "is-current") : ""; }
  function journeyFull(r) {
    var j = journeyState(r);
    return STEPS.map(function (s, k) { var c = stepClass(j, k + 1); return '<li class="journey__step ' + c + '"' + (c === "is-current" || c === "is-problem" ? ' aria-current="step"' : "") + '><span class="journey__num">' + (k + 1) + "</span>" + s + "</li>"; }).join("");
  }
  function journeyCompact(r) {
    var j = journeyState(r), n = Math.min(j.at, 5), name = "Step " + n + " of 5: " + STEPS[n - 1] + (j.problem ? " (" + LABEL[r.status] + ")" : "");
    return '<span class="journey--compact" role="img" aria-label="' + esc(name) + '" title="' + esc(name) + '">' + STEPS.map(function (s, k) { return '<span class="journey__dot ' + stepClass(j, k + 1) + '"></span>'; }).join("") + "</span>";
  }
  function requestRow(r, extra) {
    var m = mem(r.membershipId);
    return "<tr>" + td("Request", reqLink(r.id)) + td("Type", esc(TYPES[r.type])) + td("Member", esc(person(r.personId).fullName) + (m ? ", " + memberLink(m.membershipId) : "")) +
      td("Journey", journeyCompact(r)) + td("Status", badge(r.status), "col-status") + td("Created", esc(fdate(r.createdAt)), "num") + (extra || "") + "</tr>";  // the request ID is the link (D-250)
  }
  function qrSvg(text) {
    // shortcut: a deterministic QR-like pattern for show only, not a scannable code; a real build uses a QR encoder
    var n = 21, h = 0, out = "";
    for (var i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0;
    function finder(x, y) { return '<rect x="' + x + '" y="' + y + '" width="7" height="7"/><rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="5" height="5" class="qr__gap"/><rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3"/>'; }
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      if ((x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)) continue;
      h = (h * 1103515245 + 12345) >>> 0;
      if (h & 0x10000) out += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>';
    }
    return '<svg class="qr" viewBox="0 0 ' + n + " " + n + '" role="img" aria-label="QR credential for ' + esc(text) + '">' + finder(0, 0) + finder(14, 0) + finder(0, 14) + out + "</svg>";
  }
  function memberCard(m) {
    return '<div class="member-card stack"><span class="member-card__label">Digital membership card</span><span class="member-card__id">' + esc(m.membershipId) + "</span><span>" + esc(holder(m)) +
      ", " + esc(typeOf(m.typeCode).name) + "</span><span>Valid to " + esc(fdate(m.expiryDate)) + "</span>" + qrSvg(m.membershipId) + "</div>";
  }

  // Charts at the container's real width with a fixed height (Layout-11); redrawn on resize
  function drawOnResize(svg, draw) { draw(); window.addEventListener("resize", draw); }
  function barChart(svg, data) {
    drawOnResize(svg, function () {
      var w = svg.clientWidth, h = svg.clientHeight, max = Math.max.apply(null, data.map(function (d) { return d[1]; }).concat(1));
      var labelW = Math.min(140, w * 0.35), rowH = h / data.length, bar = Math.max(8, rowH * 0.55);
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.innerHTML = data.map(function (d, i) {
        var y = i * rowH + (rowH - bar) / 2, bw = Math.max(2, (w - labelW - 48) * d[1] / max);
        return '<text class="chart__label" x="0" y="' + (y + bar * 0.75) + '">' + esc(d[0]) + '</text><rect class="chart__bar" x="' + labelW + '" y="' + y + '" width="' + bw + '" height="' + bar + '" rx="2"><title>' + esc(d[0] + ": " + d[1]) + '</title></rect>' +
          '<text class="chart__value" x="' + (labelW + bw + 6) + '" y="' + (y + bar * 0.75) + '">' + d[1] + "</text>";
      }).join("");
    });
  }
  function donutChart(svg, data) {
    drawOnResize(svg, function () {
      var w = svg.clientWidth, h = svg.clientHeight, r = Math.min(h / 2 - 8, w / 4), cx = r + 8, cy = h / 2, sum = data.reduce(function (a, d) { return a + d[1]; }, 0), tot = sum || 1, a0 = -Math.PI / 2;
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      var arcs = data.map(function (d, k) {
        var a1 = a0 + 2 * Math.PI * d[1] / tot, large = a1 - a0 > Math.PI ? 1 : 0, ri = r * 0.6, p = "";
        if (d[1] / tot > 0.9999) p = '<circle class="chart__s' + (k % 6 + 1) + '" cx="' + cx + '" cy="' + cy + '" r="' + r + '"/><circle cx="' + cx + '" cy="' + cy + '" r="' + ri + '" class="chart__hole"/>';
        else if (d[1]) p = '<path class="chart__s' + (k % 6 + 1) + '" d="M' + (cx + r * Math.cos(a0)) + " " + (cy + r * Math.sin(a0)) + " A" + r + " " + r + " 0 " + large + " 1 " + (cx + r * Math.cos(a1)) + " " + (cy + r * Math.sin(a1)) +
          " L" + (cx + ri * Math.cos(a1)) + " " + (cy + ri * Math.sin(a1)) + " A" + ri + " " + ri + " 0 " + large + " 0 " + (cx + ri * Math.cos(a0)) + " " + (cy + ri * Math.sin(a0)) + 'Z"><title>' + esc(d[0] + ": " + d[1]) + "</title></path>";
        a0 = a1; return p;
      }).join("");
      var lx = cx + r + 24, rowH = Math.min(26, (h - 16) / Math.max(1, data.length));
      var legend = data.map(function (d, k) { var y = cy - rowH * data.length / 2 + k * rowH + rowH / 2; return '<rect class="chart__s' + (k % 6 + 1) + '" x="' + lx + '" y="' + (y - 6) + '" width="12" height="12" rx="2"/><text class="chart__label" x="' + (lx + 18) + '" y="' + (y + 5) + '">' + esc(d[0]) + ", " + d[1] + " (" + Math.round(100 * d[1] / tot) + " %)</text>"; }).join("");
      svg.innerHTML = arcs + '<text class="chart__total" x="' + cx + '" y="' + (cy + 6) + '" text-anchor="middle">' + sum + "</text>" + legend;
    });
  }

  function personOptions(filter, value, blank) {
    return (blank ? '<option value="">' + esc(blank) + "</option>" : "") + options(db.persons.filter(filter || function () { return true; }).map(function (p) { return [p.id, p.fullName + " (" + p.id + ")"]; }), value);
  }
  // Option tiles (guideline): the renewal package as radio tiles named "years"
  function packageTiles(prefix, value) {
    return Object.keys(cfg.fees.renewal).map(function (y) { var id = prefix + "-y" + y; return '<div class="option"><input type="radio" class="btn-check" name="years" id="' + id + '" value="' + y + '"' + (String(value || 2) === y ? " checked" : "") + '><label class="option-tile" for="' + id + '"><strong>' + y + " year" + (y > 1 ? "s" : "") + "</strong><span>" + money(cfg.fees.renewal[y]) + "</span></label></div>"; }).join("");
  }
  function membershipOptions(value) {
    return '<option value="">Choose a membership</option>' + options(db.memberships.map(function (m) { return [m.membershipId, m.membershipId + ", " + holder(m) + ", " + LABEL[m.status]]; }), value);
  }
  function formValues(form) {
    var f = { docs: [] };
    $$("input, select, textarea", form).forEach(function (el) {
      if (!el.name || el.closest("[hidden]") || (el.type === "radio" && !el.checked)) return;
      if (el.name === "docs") { if (el.checked) f.docs.push(el.value); }
      else f[el.name] = el.type === "checkbox" ? el.checked : el.value.trim();
    });
    return f;
  }
  // Puts saved values back into a form (Edit of a Draft or a returned request, BR-175)
  function fillForm(form, values) {
    Object.keys(values).forEach(function (k) {
      if (k === "docs") $$('input[name="docs"]', form).forEach(function (c) { c.checked = values.docs.indexOf(c.value) >= 0; });
      else if (form.elements[k] && form.elements[k].type === "checkbox") form.elements[k].checked = !!values[k];
      else if (form.elements[k] && values[k] != null) form.elements[k].value = values[k];
    });
  }
  function editValues(r) {
    return Object.assign({}, r.details, r.form || {}, { docs: r.documents.filter(function (d) { return d.received; }).map(function (d) { return d.name; }) });
  }
  // Saves an Edit back onto the same request; Submit re-runs every check
  function saveEdit(r, chk, form, asDraft) {
    var before = r.status;
    r.form = form;
    if (asDraft || !chk.ok) { if (chk.ok) { r.details = chk.details; r.documents = chk.documents; r.fee = chk.fee; } hist(r, "Edited", before, before); audit("Request edited", r.id, TYPES[r.type]); save(); return; }
    hist(r, "Edited", before, before);
    if (before === "draft") submit(r, chk);
    else { r.route = chk.route; r.details = chk.details; r.documents = chk.documents; r.fee = chk.fee; r.status = Rules.bizRule004(r.documents).ok ? "pendingApproval" : "pendingDocuments"; hist(r, "Resubmitted", before, r.status); audit("Request resubmitted", r.id, LABEL[r.status]); save(); }
  }

  /* ---------- Pages ---------- */
  var pages = {};

  pages.launcher = function () {
    var accounts = db.memberships.filter(function (m) { return m.status === "active" && !m.responsibleMembershipId; });
    rows($("#l-accounts tbody"), accounts.map(function (m) {
      return "<tr>" + td("Member", esc(person(m.personId).fullName)) + td("Membership ID", esc(m.membershipId)) + td("Type", esc(typeOf(m.typeCode).name)) +
        td("Actions", '<a class="btn btn-sm btn-alt" href="portal.html" target="' + TABKEY + "-member-" + m.membershipId + '">Open tab</a>', "col-actions") + "</tr>";
    }).join("") + db.accountHolders.map(function (a) {  // (v04) non-member online accounts (events)
      return "<tr>" + td("Member", esc(a.name)) + td("Membership ID", esc(a.id) + ' <span class="badge bg-secondary-subtle text-secondary-emphasis">Non-member</span>') + td("Type", "Online account (events, facilities)") +
        td("Actions", '<a class="btn btn-sm btn-alt" href="portal.html" target="' + TABKEY + "-member-" + a.id + '">Open tab</a>', "col-actions") + "</tr>";
    }).join(""), 4);
    var trs = $$("#l-accounts tbody tr"), f = $("#l-filter");
    $("#l-acc-count").textContent = trs.length;
    f.addEventListener("input", function () { var q = f.value.trim().toLowerCase(); trs.forEach(function (tr) { tr.hidden = !!q && tr.textContent.toLowerCase().indexOf(q) < 0; }); });
    f.form.addEventListener("submit", function (e) { e.preventDefault(); });
    // Demo data (Story-039): Export, Import, Reset
    $("[data-export]").addEventListener("click", function () { Store.exportFile(); toast("Data exported: ccdemo-data-" + TODAY + ".json"); });
    var file = $("#import-file");
    $("[data-import]").addEventListener("click", function () { file.click(); });
    file.addEventListener("change", function () {
      var picked = file.files[0]; if (!picked) return;
      var rd = new FileReader();
      rd.onload = function () { var x = Store.importText(rd.result); file.value = ""; if (!x.ok) return toast(x.msg, "danger"); go("index.html", "Data imported from " + picked.name); };
      rd.readAsText(picked);
    });
    // (v03) Module details: selects the module's tab, opens the section if it is closed (never closes it), then scrolls to it and moves focus to the tab (D-285)
    $$("[data-detail-tab]").forEach(function (a) {
      a.addEventListener("click", function () {
        var tab = document.getElementById(a.getAttribute("data-detail-tab")), sec = $("#sec-det");
        bootstrap.Tab.getOrCreateInstance(tab).show();
        function land() { $("#sec-det-h").scrollIntoView({ behavior: "instant", block: "start" }); }
        if (!sec.classList.contains("show")) { sec.addEventListener("shown.bs.collapse", land, { once: true }); bootstrap.Collapse.getOrCreateInstance(sec, { toggle: false }).show(); }
        // scroll now and again once open (the page grows as it opens); instant, because a smooth scroll can be cut short (the v02 bug left the section off-screen)
        land();
        tab.focus({ preventScroll: true });
      });
    });
    $("[data-reset-demo]").addEventListener("click", function () {
      ask({ title: "Reset demo data?", body: "Every change since the start is replaced by the demo data. Export first if you want to keep this state.", ok: "Reset demo data", danger: true, run: function () { Store.reset(); go("index.html", "Demo data reset"); return { ok: true }; } });
    });
  };

  pages.dashboard = function () {
    var ms = db.memberships, count = function (s) { return ms.filter(function (m) { return s.indexOf(m.status) >= 0; }).length; };
    var rq = function (s) { return db.requests.filter(function (r) { return r.status === s; }).length; };
    var soon = ms.filter(function (m) { return m.status === "active" && m.expiryDate >= TODAY && m.expiryDate <= Rules.addMonths(TODAY, 3); }).length;
    var vals = { active: count(["active"]), paused: count(["absent", "medical"]), suspended: count(["suspended"]), lapsed: count(["expired", "withdrawn", "deceased", "ended"]),
      pendingApproval: rq("pendingApproval"), pendingDocuments: rq("pendingDocuments"), awaitingPayment: rq("awaitingPayment"), expiring: soon };
    $$("[data-kpi]").forEach(function (el) { el.textContent = vals[el.getAttribute("data-kpi")]; });
    barChart($("#status-chart"), Object.keys(cfg.transitions).map(function (s) { return [LABEL[s], count([s])]; }));
    donutChart($("#request-chart"), ["draft", "pendingDocuments", "pendingApproval", "awaitingPayment"].map(function (s) { return [LABEL[s], rq(s)]; }));
    rows($("#queue tbody"), db.requests.filter(function (r) { return ["pendingDocuments", "pendingApproval", "awaitingPayment"].indexOf(r.status) >= 0; }).map(function (r) { return requestRow(r); }).join(""), 6, "No open requests.");
    var L = cfg.limits, watch = ms.filter(function (m) { return m.typeCode === "JUN" && m.status === "active"; }).map(function (m) { return [m, Rules.bizRule021Watch(person(m.personId), TODAY, L.juniorAgeLimit, L.juniorWatchMonths)]; }).filter(function (x) { return x[1]; });
    rows($("#juniors tbody"), watch.map(function (x) { return "<tr>" + td("Membership", memberLink(x[0].membershipId)) + td("Junior", esc(holder(x[0]))) + td("Turns " + L.juniorAgeLimit, esc(fdate(x[1])), "num") + td("Status", badge(x[0].status), "col-status") + "</tr>"; }).join(""), 4, "No junior turns " + L.juniorAgeLimit + " in the next " + L.juniorWatchMonths + " months.");
    $$("[data-report-link]").forEach(function (a) { var p = a.parentNode; if (!Rules.bizRule031(db.accessRules, role(), report(a.getAttribute("data-report-link"))).ok) { a.remove(); if (!p.textContent.trim()) p.remove(); } });  // (v02)
    var gt = { booked: db.golfBookings.filter(function (b) { return b.date === TODAY && live(b); }).length, checkedIn: gsum(db.golfBookings.filter(function (b) { return b.date === TODAY && b.status === "checkedIn"; }), function (b) { return b.players.length; }),
      rainChecks: db.rainChecks.filter(function (x) { return x.status === "available" || x.status === "reserved"; }).length };  // (v03) Golf today
    $$("[data-golf-kpi]").forEach(function (el) { el.textContent = gt[el.getAttribute("data-golf-kpi")]; });
    // (v07) dunning escalations from FIN-OPS for Membership to act on (BR-165)
    var es = db.finEscalations.filter(function (x) { return x.status === "open"; }); $("#dash-esc").hidden = !es.length;
    rows($("#dash-esc-list tbody"), es.map(function (x) { return "<tr>" + td("Escalation", esc(x.id)) + td("Member", memberLink(x.member)) + td("Overdue", money2(overdue(x.member)), "num") + td("Raised", esc(fdate(x.at)), "num") + "</tr>"; }).join(""), 4);
    var run = $("#run-lifecycle");
    run.hidden = role() !== "officer";
    run.addEventListener("click", function () {
      ask({ title: "Run the lifecycle check?", body: "Memberships past their expiry become Expired, supplementaries of inactive principals and juniors at " + L.juniorAgeLimit + " are Ended, and ended absent or medical periods return to Active.", ok: "Run lifecycle check",
        run: function () { var c = lifecycleCheck(); go("dashboard.html", c.length ? "Lifecycle check: " + c.join(", ") : "Lifecycle check: no changes"); return { ok: true }; } });
    });
  };

  pages.members = function () {
    var q = $("#q"), st = $("#f-status"), tp = $("#f-type");
    st.innerHTML = '<option value="">All statuses</option>' + options(Object.keys(cfg.transitions).map(function (s) { return [s, LABEL[s]]; }));
    tp.innerHTML = '<option value="">All types</option>' + options(cfg.membershipTypes.map(function (t) { return [t.code, t.name]; }));
    function draw() {
      var term = q.value.trim().toLowerCase();
      var list = db.memberships.filter(function (m) {
        var p = person(m.personId);
        return (!st.value || m.status === st.value) && (!tp.value || m.typeCode === tp.value) && (!term || [m.membershipId, holder(m), p.fullName, p.idNumber].join(" ").toLowerCase().indexOf(term) >= 0);
      });
      rows($("#member-list tbody"), list.map(function (m) {
        return "<tr>" + td("Membership ID", memberLink(m.membershipId)) + td("Name", esc(holder(m))) + td("Type", esc(typeOf(m.typeCode).name)) +
          td("Status", badge(m.status), "col-status") + td("Expiry", esc(fdate(m.expiryDate)), "num") + "</tr>";
      }).join(""), 5, "No member matches. Nothing was created or changed.");
      $("#member-count").textContent = list.length + " of " + db.memberships.length + " memberships";
    }
    [q, st, tp].forEach(function (el) { el.addEventListener("input", draw); });
    $("#member-search").addEventListener("submit", function (e) { e.preventDefault(); });
    draw();
  };

  pages.member = function () {
    var m = mem(qs("id")) || db.memberships[0], p = person(m.personId), tp = typeOf(m.typeCode), g = Rules.bizRule019(m.status, cfg.privileges), staff = role() === "officer";
    document.title = m.membershipId + " · Member 360 · CC-Demo";
    $("#m-title").textContent = holder(m);
    $("#m-sub").innerHTML = '<span class="cluster">' + esc(m.membershipId) + ", " + esc(tp.name) + " " + badge(m.status) + " " + onOff(g.privileges, "Privileges") + " " + onOff(g.billing, "Billing") + "</span>";
    var menu = $("#new-request");
    menu.hidden = role() !== "officer" && role() !== "admin";
    $("#new-request-menu").innerHTML = Object.keys(TYPES).filter(function (t) { return t !== "application" && t !== "corporateCreation"; })
      .map(function (t) { return '<li><a class="dropdown-item" href="request-new.html?type=' + t + "&member=" + m.membershipId + '">' + esc(TYPES[t]) + "</a></li>"; }).join("");
    var remaining = Math.max(0, Rules.monthsBetween(TODAY, m.expiryDate));
    $("#m-facts").innerHTML = facts([["Membership type", tp.name], ["Joined", fdate(m.joinedDate)], ["Current term", fdate(m.startDate) + " to " + fdate(m.expiryDate)], ["Remaining", remaining + " months"],
      ["Principal", memberLink(m.responsibleMembershipId), true], ["Sponsor", m.sponsorName || "—"], ["Classification", m.classification ? m.classification.kind + " until " + fdate(m.classification.to) : "—"],
      ["Transfer lineage", m.transferredFrom ? "From " + person(m.transferredFrom).fullName : "—"]]);

    // Profile (BR-027, BR-171, BR-026 consent); before and after kept in the history (BR-177)
    var pf = $("#profile-form");
    ["fullName", "idType", "idNumber", "dateOfBirth", "mobile", "email", "address"].forEach(function (k) { pf.elements[k].value = p[k]; });
    pf.elements.marketingConsent.checked = p.marketingConsent;
    $$("input, select, button", pf).forEach(function (el) { if (!staff && el.type !== "button") el.disabled = true; });
    $("#profile-actions").hidden = !staff;
    pf.addEventListener("submit", function (e) {
      e.preventDefault();
      var next = Object.assign({}, p, { mobile: pf.elements.mobile.value.trim(), email: pf.elements.email.value.trim(), address: pf.elements.address.value.trim(), marketingConsent: pf.elements.marketingConsent.checked });
      var x = Rules.bizRule027(next); if (x.ok) x = Rules.bizRule171(next);
      showError($("#profile-err"), x.msg); if (!x.ok) return;
      var changes = ["mobile", "email", "address", "marketingConsent"].filter(function (k) { return p[k] !== next[k]; });
      if (!changes.length) return toast("No changes to save");
      changes.forEach(function (k) { audit("Profile changed: " + k, m.membershipId, String(p[k]) + " → " + String(next[k]), p[k], next[k]); });
      Object.assign(p, next); save();
      ["Access Control", "HMS", "GMS"].forEach(function (t) { publish(t, "Contact details updated", m.membershipId); });
      go("member.html?id=" + m.membershipId + "#t-history", "Profile saved: " + changes.join(", "));
    });

    // Contract and credit (BR-023)
    var c = m.contract;
    $("#contract-facts").innerHTML = facts([["Entrance Fee", money(c.entranceFee)], ["Monthly Subscription", money(c.monthlySubscription) + " + GST"], ["In-House Credit Limit", money(c.creditLimit)],
      ["Spending Credit Granted", money(c.spendingCreditGranted) + " (never reduced)"], ["Currency", c.currency]]);
    $("#check-credit").addEventListener("click", function () {
      var x = Rules.bizRule023(c, finBal(), m.membershipId), out = $("#credit-result");
      out.className = "alert " + (x.ok ? "alert-info" : "alert-danger");
      out.setAttribute("data-state", x.ok ? "success" : "error");
      out.textContent = x.ok ? "Available credit " + money(x.available) + " = limit " + money(c.creditLimit) + " − outstanding " + money(x.outstanding) + " (FIN-OPS). Derived now, not stored (BR-023)." : x.msg;
      out.hidden = false;
    });
    rows($("#handoffs tbody"), db.handoffs.filter(function (h) { return h.membershipId === m.membershipId; }).map(function (h) {
      return "<tr>" + td("Hand-off", esc(h.id)) + td("Description", esc(h.description)) + td("Amount", money2(h.amount), "num") + td("Status", badge(h.status) + " " + finRef(h.financeRef), "col-status") + td("Created", esc(fdate(h.createdAt)), "num") + "</tr>";
    }).join(""), 5, "No hand-offs.");
    // (v07) a dunning escalation from FIN-OPS: Membership decides; FIN-OPS never changes the membership (BR-165)
    var esc1 = db.finEscalations.filter(function (x) { return x.member === m.membershipId && x.status === "open"; })[0], ea = $("#fin-escalation");
    if (ea && esc1) { ea.hidden = false; $("#fin-escalation-text").textContent = "Dunning escalation " + esc1.id + " from FIN-OPS: " + money2(overdue(m.membershipId)) + " overdue. " + esc1.note; $("#fin-escalation-link").href = "request-new.html?type=suspension&member=" + m.membershipId; }

    // Relationships (BR-020, BR-021, BR-022)
    var deps = db.memberships.filter(function (x) { return x.responsibleMembershipId === m.membershipId; });
    rows($("#relations tbody"), deps.map(function (x) { return "<tr>" + td("Membership", memberLink(x.membershipId)) + td("Name", esc(holder(x))) + td("Relationship", esc(typeOf(x.typeCode).name)) + td("Status", badge(x.status), "col-status") + "</tr>"; })
      .concat(m.nominees.map(function (n) { return "<tr>" + td("Membership", esc(m.membershipId)) + td("Name", esc(person(n.personId).fullName)) + td("Relationship", "Nominee since " + esc(fdate(n.from))) + td("Status", n.to ? badge("ended") : badge("active"), "col-status") + "</tr>"; })).join(""), 4, "No supplementary or nominee relationships.");

    // Vehicles (BR-024)
    function drawVehicles() {
      rows($("#vehicles tbody"), db.vehicles.filter(function (v) { return v.membershipId === m.membershipId; }).map(function (v) {
        return "<tr>" + td("Plate", esc(v.plate)) + td("Make", esc(v.make)) + td("Car label", esc(v.labelHistory.map(function (l) { return l.label + " (" + fdate(l.issued) + ")"; }).join(", "))) +
          td("Status", v.status === "active" ? badge("active") : '<span class="badge text-secondary-emphasis bg-secondary-subtle">Retired</span>', "col-status") +
          td("Actions", v.status === "active" && staff ? '<button type="button" class="btn btn-sm btn-outline-secondary" data-retire="' + v.id + '">Retire</button>' : "—", "col-actions") + "</tr>";
      }).join(""), 5, "No vehicles registered.");
    }
    drawVehicles();
    $("#vehicle-form").hidden = !staff;
    $("#vehicles").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-retire"); if (!id) return;
      var v = db.vehicles.filter(function (x) { return x.id === id; })[0];
      ask({ title: "Retire " + v.plate + "?", body: "Access Control stops recognising this car; its label history is kept.", ok: "Retire vehicle", danger: true, run: function () {
        v.status = "retired"; audit("Vehicle retired", m.membershipId, v.plate); publish("Access Control", "Vehicle " + v.plate + " retired", m.membershipId); save(); drawVehicles(); toast("Vehicle " + v.plate + " retired; history kept"); return { ok: true }; } });
    });
    $("#vehicle-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target, plate = f.elements.plate.value.trim().toUpperCase(), x = Rules.bizRule024(m, db.vehicles, cfg.limits.vehicleLimit);
      if (x.ok && !plate) x = { ok: false, msg: "Enter the plate number." };
      showError($("#vehicle-err"), x.msg); if (!x.ok) return;
      var label = "CL-" + TODAY.slice(0, 4) + "-" + String(200 + db.vehicles.length).padStart(4, "0");
      db.vehicles.push({ id: "V-" + seq("V", 3), membershipId: m.membershipId, plate: plate, make: f.elements.make.value.trim(), status: "active", labelHistory: [{ label: label, issued: TODAY }] });
      audit("Vehicle registered", m.membershipId, plate + ", car label " + label); publish("Access Control", "Vehicle " + plate + " registered", m.membershipId);
      save(); f.reset(); drawVehicles(); toast("Vehicle registered; car label " + label + " issued");
    });

    // Cards (BR-025)
    function drawCards() {
      rows($("#cards tbody"), db.cards.filter(function (k) { return k.membershipId === m.membershipId; }).map(function (k) {
        return "<tr>" + td("Card", esc(k.id)) + td("Form", esc(k.kind === "digital" ? "Digital (primary)" : "Physical (exception)")) + td("Issued", esc(fdate(k.issued)), "num") + td("Status", k.status === "active" ? badge("active") : '<span class="badge text-secondary-emphasis bg-secondary-subtle">Void</span>', "col-status") + "</tr>";
      }).join(""), 4, "No cards issued.");
    }
    drawCards();
    $("#card-preview").innerHTML = memberCard(m);
    $("#replace-card").hidden = !staff;
    $("#replace-card").addEventListener("click", function () {
      var x = Rules.bizRule025(m); showError($("#card-err"), x.msg); if (!x.ok) return;
      ask({ title: "Replace the digital card?", body: "The current digital card becomes void at once.", ok: "Replace card", run: function () {
        db.cards.forEach(function (k) { if (k.membershipId === m.membershipId && k.kind === "digital" && k.status === "active") k.status = "void"; });
        db.cards.push({ id: "CD-" + seq("CD", 3), membershipId: m.membershipId, kind: "digital", issued: TODAY, status: "active" });
        audit("Card replaced", m.membershipId, "Previous digital card void"); publish("Access Control", "Credential replaced; previous QR invalid", m.membershipId); save(); drawCards(); toast("New digital card issued; the previous one is void"); return { ok: true }; } });
    });

    rows($("#m-requests tbody"), db.requests.filter(function (r) { return r.membershipId === m.membershipId; }).map(function (r) { return requestRow(r); }).join(""), 6, "No requests.");
    $("#m-history").innerHTML = timeline(db.audit.filter(function (a) { return a.ref === m.membershipId; }).reverse());
    if (location.hash) { var tab = $('[data-bs-target="' + location.hash + '"]'); if (tab) bootstrap.Tab.getOrCreateInstance(tab).show(); }
  };

  pages.application = function () {
    var f = $("#app-form"), editing = req(qs("edit")), err = $("#app-err");
    var noActive = function (p) { return !db.memberships.some(function (m) { return m.personId === p.id && m.status === "active"; }); };
    f.elements.personId.innerHTML = personOptions(noActive, qs("person"), "Choose the applicant");
    f.elements.typeCode.innerHTML = '<option value="">Choose a type</option>' + options(cfg.membershipTypes.filter(function (t) { return t.active && ["ordinary", "associate", "family", "junior"].indexOf(t.category) >= 0; }).map(function (t) { return [t.code, t.name + ", entrance " + money(t.entranceFee)]; }));
    f.elements.recruitmentSource.innerHTML = '<option value="">Choose a source</option>' + options(cfg.recruitmentSources.map(function (s) { return [s, s]; }));
    $("#app-docs").innerHTML = cfg.documents.application.map(function (n, i) { return '<div class="form-check"><input class="form-check-input" type="checkbox" name="docs" value="' + esc(n) + '" id="doc' + i + '"><label class="form-check-label" for="doc' + i + '">' + esc(n) + "</label></div>"; }).join("");
    function sync() {
      var p = person(f.elements.personId.value);
      $("#referrer-field").hidden = f.elements.recruitmentSource.value !== "Referral";
      if (p && (!editing || !f.elements.mobile.value)) { f.elements.mobile.value = p.mobile; f.elements.email.value = p.email; }
    }
    f.elements.recruitmentSource.addEventListener("change", sync); f.elements.personId.addEventListener("change", sync);
    if (editing) {
      var own = Rules.bizRule175(editing, user());
      if (!own.ok) { showError(err, own.msg); $$("button", f).forEach(function (b) { b.disabled = true; b.setAttribute("data-state", "disabled"); }); }
      $("#app-title").textContent = "Edit " + editing.id; fillForm(f, editValues(editing)); f.elements.personId.value = editing.personId;
      if (!f.elements.personId.value) f.elements.personId.innerHTML = personOptions(null, editing.personId);
    }
    sync();
    function values() {
      var v = formValues(f), p = person(v.personId), t = typeOf(v.typeCode), x;
      if (!p) return { x: { ok: false, msg: "Choose the applicant." } };
      if (!t) return { x: { ok: false, msg: "Choose the membership type." } };
      x = Rules.bizRule171({ mobile: v.mobile, email: v.email });
      if (x.ok) x = Rules.bizRule172(p.dateOfBirth, TODAY);
      if (x.ok) x = Rules.bizRule002(db.requests, p.id, t.code, editing && editing.id);
      if (x.ok) x = Rules.bizRule007(v.recruitmentSource, v.referrerMembershipId, db.memberships);
      if (x.ok) x = Rules.bizRule003(p, t, TODAY);
      return { v: v, p: p, x: x, chk: { route: "approver", details: { typeCode: t.code, recruitmentSource: v.recruitmentSource, referrerMembershipId: v.recruitmentSource === "Referral" ? (v.referrerMembershipId || "").toUpperCase() : null }, documents: docsFor("application", v.docs), fee: 0, ok: true } };
    }
    function done(r, asDraft) {
      var p = person(r.personId), v = r.form;
      if (v.mobile && v.mobile !== p.mobile) { audit("Profile changed: mobile", p.id, p.mobile + " → " + v.mobile); p.mobile = v.mobile; }
      if (v.email && v.email !== p.email) { audit("Profile changed: email", p.id, p.email + " → " + v.email); p.email = v.email; }
      save();
      go("request.html?id=" + r.id, (asDraft ? "Draft " + r.id + " saved" : "Application " + r.id + " submitted: " + LABEL[r.status]));
    }
    $("#save-draft").addEventListener("click", function () {
      var s = values(); if (!s.p) return showError(err, "Choose the applicant before saving a draft.");
      var x = Rules.bizRule171({ mobile: s.v.mobile, email: s.v.email }); showError(err, x.msg); if (!x.ok) return;
      if (editing) { saveEdit(editing, s.chk, s.v, true); return done(editing, true); }
      done(createRequest("application", null, s.p.id, s.chk, s.v, true), true);
    });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var s = values(); showError(err, s.x.msg); if (!s.x.ok) return;
      if (editing) { saveEdit(editing, s.chk, s.v, false); return done(editing, false); }
      done(createRequest("application", null, s.p.id, s.chk, s.v, false), false);
    });
  };

  pages.requestNew = function () {
    var f = $("#req-form"), sel = f.elements.type, editing = req(qs("edit")), err = $("#req-err");
    var types = Object.keys(TYPES).filter(function (t) { return t !== "application" && (t !== "corporateCreation" || role() === "admin"); });
    sel.innerHTML = options(types.map(function (t) { return [t, TYPES[t]]; }), (editing && editing.type) || qs("type") || "renewal");
    f.elements.membershipId.innerHTML = membershipOptions((editing && editing.membershipId) || qs("member"));
    var adults = function (p) { return Rules.age(p.dateOfBirth, TODAY) >= 21; };
    ["recipient", "beneficiary", "person", "nominee"].forEach(function (n) { f.elements[n].innerHTML = personOptions(n === "beneficiary" ? null : adults, null, n === "beneficiary" ? "No transfer (close as Deceased)" : "Choose a person"); });
    f.elements.corpType.innerHTML = options(cfg.membershipTypes.filter(function (t) { return t.category === "corporate" && t.active; }).map(function (t) { return [t.code, t.name + ", entrance " + money(t.entranceFee)]; }));
    f.elements.target.innerHTML = options(Object.keys(cfg.transitions).map(function (s) { return [s, LABEL[s]]; }));
    $("#years-tiles").innerHTML = packageTiles("rn");
    function sync() {
      var t = sel.value, m = mem(f.elements.membershipId.value);
      $$("[data-for]", f).forEach(function (g) { g.hidden = g.getAttribute("data-for").split(" ").indexOf(t) < 0; });
      $("#membership-field").hidden = t === "corporateCreation";
      f.elements.outgoing.innerHTML = '<option value="">Add without replacing</option>' + (m ? options(m.nominees.filter(function (n) { return !n.to; }).map(function (n) { return [n.personId, "Replace " + person(n.personId).fullName]; })) : "");
      $("#req-docs").innerHTML = (cfg.documents[t] || []).map(function (n, i) { return '<div class="form-check"><input class="form-check-input" type="checkbox" name="docs" value="' + esc(n) + '" id="rdoc' + i + '"><label class="form-check-label" for="rdoc' + i + '">' + esc(n) + "</label></div>"; }).join("") || '<p class="text-muted">No documents needed for this request type.</p>';
      $("#req-title").textContent = (editing ? "Edit " + editing.id + ": " : "") + TYPES[t];
      preview();
    }
    function preview() {
      var m = mem(f.elements.membershipId.value), chk = checkRequest(sel.value, m, formValues(f));
      $("#req-current").innerHTML = m ? esc(holder(m)) + ", " + esc(typeOf(m.typeCode).name) + " " + badge(m.status) + ", expiry " + esc(fdate(m.expiryDate)) : "No membership chosen";
      $("#req-preview").innerHTML = chk.ok ? chk.preview.concat(["Decided by " + (chk.route === "manager" ? "Membership Manager" : "Approver")]).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") : '<li class="text-danger">' + esc(chk.msg) + "</li>";
      return chk;
    }
    sel.addEventListener("change", sync);
    f.addEventListener("input", preview);
    f.elements.membershipId.addEventListener("change", sync);
    sync();
    if (editing) {
      var own = Rules.bizRule175(editing, user());
      if (!own.ok) { showError(err, own.msg); $$("button", f).forEach(function (b) { b.disabled = true; b.setAttribute("data-state", "disabled"); }); }
      fillForm(f, editValues(editing)); preview();
    }
    function pid(v, m) { return sel.value === "corporateCreation" ? v.nominee : m.personId; }
    $("#save-draft").addEventListener("click", function () {
      var m = mem(f.elements.membershipId.value), v = formValues(f), chk = checkRequest(sel.value, m, v);
      if (!m && sel.value !== "corporateCreation") return showError(err, "Choose the membership before saving a draft.");
      if (sel.value === "corporateCreation" && !v.nominee) return showError(err, "Choose the first nominee before saving a draft.");
      var x = Rules.bizRule172(null, TODAY, v.from, v.to); showError(err, x.msg); if (!x.ok) return;
      if (editing) { saveEdit(editing, chk, v, true); return go("request.html?id=" + editing.id, "Draft " + editing.id + " saved"); }
      var r = createRequest(sel.value, m, pid(v, m), chk.ok ? chk : { documents: docsFor(sel.value, v.docs) }, v, true);
      go("request.html?id=" + r.id, "Draft " + r.id + " saved");
    });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = mem(f.elements.membershipId.value), v = formValues(f), chk = checkRequest(sel.value, m, v);
      showError(err, chk.ok ? "" : chk.msg); if (!chk.ok) return;
      if (editing) { saveEdit(editing, chk, v, false); return go("request.html?id=" + editing.id, TYPES[editing.type] + " " + editing.id + ": " + LABEL[editing.status]); }
      var r = createRequest(sel.value, m, pid(v, m), chk, v, false);
      go("request.html?id=" + r.id, TYPES[r.type] + " " + r.id + " submitted: " + LABEL[r.status]);
    });
  };

  pages.requests = function () {
    var ft = $("#f-rtype"), fs = $("#f-rstatus"), fc = $("#f-rby");
    ft.innerHTML = '<option value="">All types</option>' + options(Object.keys(TYPES).map(function (t) { return [t, TYPES[t]]; }));
    fs.innerHTML = '<option value="">All statuses</option>' + options(["draft", "pendingDocuments", "pendingApproval", "awaitingPayment", "completed", "rejected", "cancelled"].map(function (s) { return [s, LABEL[s]]; }), qs("status"));
    fc.innerHTML = '<option value="">Anyone</option><option value="me">Created by me</option>';
    function draw() {
      rows($("#req-list tbody"), db.requests.filter(function (r) { return (!ft.value || r.type === ft.value) && (!fs.value || r.status === fs.value) && (!fc.value || r.createdByName === user()); })
        .map(function (r) { return requestRow(r); }).join(""), 6);
    }
    [ft, fs, fc].forEach(function (el) { el.addEventListener("change", draw); });
    $("#clear-filters").addEventListener("click", function () { ft.value = fs.value = fc.value = ""; draw(); });
    draw();
  };

  pages.request = function () {
    var r = req(qs("id")) || db.requests[0], m = mem(r.membershipId), h = handoffOf(r), me = role();
    if (me === "member") { var own = Rules.bizRule085(ROLES.member.membershipId, r.membershipId); if (!own.ok) { $("main").innerHTML = '<div class="blocked-panel" role="alert" data-state="error"><p class="blocked-panel__title">' + esc(own.msg) + '</p><p><a href="portal.html">Back to my membership</a></p></div>'; return; } }
    document.title = r.id + " · Request · CC-Demo";
    $("#r-title").textContent = TYPES[r.type] + " " + r.id;
    $("#r-sub").innerHTML = '<span class="cluster">' + badge(r.status) + " " + esc(person(r.personId).fullName) + (m ? ", " + memberLink(m.membershipId) : "") + (r.createdByName === user() ? ' <span class="badge text-primary-emphasis bg-primary-subtle">Submitted by you</span>' : "") + "</span>";
    var list = [["Created by", r.createdByName + " (" + (LABELS[r.createdBy] || r.createdBy) + ")"], ["Created", fdate(r.createdAt)], ["Submitted", fdate(r.submittedAt)], ["Decided by", r.route === "manager" ? "Membership Manager" : "Approver"],
      [r.type === "deceased" ? "Goodwill refund (BR-015)" : "Fee (BR-029)", r.fee ? money(r.fee) : r.decision ? "None" : "Read from the fee configuration at approval"]];
    Object.keys(r.details).forEach(function (k) {
      var v = r.details[k]; if (v === null || v === "" || v === undefined) return;
      list.push([k.replace(/([A-Z])/g, " $1").replace(/^./, function (c) { return c.toUpperCase(); }).replace(/ Person Id$| Code$/, ""),
        /PersonId$/.test(k) || k === "personId" ? person(v).fullName : /TypeCode$|^typeCode$/.test(k) ? typeOf(v).name : /^\d{4}-\d{2}-\d{2}$/.test(v) ? fdate(v) : String(v)]);
    });
    $("#r-facts").innerHTML = facts(list);
    var docs = Rules.bizRule004(r.documents), dec = r.decision;
    var gates = [
      [r.documents.length ? (docs.ok ? "ok" : "fail") : "ok", r.documents.length ? (docs.ok ? "Mandatory documents complete: " + r.documents.map(function (d) { return d.name; }).join(", ") : docs.msg) : "No documents needed", "BR-004"],
      [dec ? (dec.outcome === "approved" ? "ok" : dec.outcome === "returned" ? "wait" : "fail") : "wait", dec ? { approved: "Approved by ", rejected: "Rejected by ", returned: "Returned for correction by " }[dec.outcome] + dec.by + " on " + fdate(dec.at) + (dec.reason ? ": " + dec.reason : "") : "Waiting for the " + (r.route === "manager" ? "Membership Manager" : "Approver") + " (maker-checker)", "BR-005"],
      [h ? (h.status === "confirmed" ? "ok" : h.status === "failed" ? "fail" : "wait") : !dec && r.type !== "deceased" && Rules.bizRule029(r, cfg, m) ? "wait" : "ok", h ? "Payment " + h.id + " " + money(Math.abs(h.amount)) + ": " + LABEL[h.status] : !dec && r.type !== "deceased" && Rules.bizRule029(r, cfg, m) ? "Fee " + money(Rules.bizRule029(r, cfg, m)) + " requested after approval" : r.type === "withdrawal" && !dec ? "Balance cleared after approval (BR-013)" : "No payment gate", "BR-006"]
    ];
    var icon = { ok: '<path d="M4.5 12.5l5 5 10-10"/>', fail: '<path d="M6 6l12 12M18 6L6 18"/>', wait: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12h4.5"/>' };  // (v08) Phosphor style: check, x, clock
    $("#gates").innerHTML = gates.map(function (g) { return '<li class="gate gate--' + g[0] + ' cluster"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + icon[g[0]] + "</svg><span>" + esc(g[1]) + ' <span class="text-muted">(' + g[2] + ")</span></span></li>"; }).join("");

    // (v07) FIN-OPS panel: the event, the receivable and the payment (RC-147)
    var hs = db.handoffs.filter(function (x) { return x.requestId === r.id; });
    $("#stub-panel").hidden = !hs.length;
    $("#stub-facts").innerHTML = hs.map(function (x) {
      var bill = x.bill && frec(x.bill), fr = db.finRefunds.filter(function (f) { return f.id === x.financeRef; })[0];
      return '<div class="stack"><div class="cluster">' + badge(x.status) + "</div>" + '<dl class="facts facts--list">' + facts([["Hand-off", x.id + " · " + x.kind], ["Amount", money2(x.amount)], [fr ? "FIN-OPS refund" : "Financial event", fr ? esc(fr.id) + " " + finbadge(fr.status) : finRef(x.financeRef), true], ["Receivable", bill ? bill.id + " · " + money2(bill.amount) + " · open " + money2(bill.open) : "—"], ["Payment", x.paymentNo || "—"], ["Rejected attempts", String((x.attempts || []).length)], ["Recorded by", x.recordedBy || "—"]]) + "</dl></div>";
    }).join("");

    var acts = Workflow.actions(me, r, user());
    $("#r-actions").innerHTML = acts.map(function (t) {
      var label = t.action === "pay" && h && h.kind === "clearance" ? "Confirm balance cleared" : t.label;
      return t.action === "edit" ? '<a class="btn ' + t.kind + '" href="' + (r.type === "application" ? "application.html" : "request-new.html") + "?edit=" + r.id + '">Edit</a>' : '<button type="button" class="btn ' + t.kind + '" data-act="' + t.action + '">' + esc(label) + "</button>";
    }).join("");
    var blocked = ["approve", "pay"].map(function (a) { return Workflow.can(me, r, a, user()); }).filter(function (x, i) { return !x.ok && r.status === (i ? "awaitingPayment" : "pendingApproval") && (i ? me === "approver" : me === "approver" || me === "manager"); })[0];  // only an Approver can be blocked from paying; other roles get the waiting note (G-2)
    var note = blocked ? blocked.msg
      : r.status === "awaitingPayment" && me !== "approver" ? "Waiting for an Approver to confirm the payment in FIN-OPS (BR-006)."
      : r.status === "pendingDocuments" && me !== "officer" && me !== "member" ? "The officer marks the documents received (BR-004)." : "";
    showError($("#r-note"), note);
    if (blocked) $("#r-note").setAttribute("data-state", "disabled");
    $("#r-actions").addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-act"); if (!a) return;
      function run(reason) { var res = act(r, a, reason); if (res.ok) go("request.html?id=" + r.id, res.msg); return res; }
      if (a === "reject") return ask({ title: "Reject " + r.id + "?", body: "The request ends as Rejected and the member is told.", reason: "Reason for rejecting", ok: "Reject", danger: true, run: run });
      if (a === "return") return ask({ title: "Return " + r.id + " for correction?", body: "The request goes back to Pending Documents and its submitter can edit it again (BR-175).", reason: "What needs correcting", ok: "Return for correction", run: run });
      if (a === "cancel") return ask({ title: "Cancel " + r.id + "?", body: "A cancelled request cannot be reopened.", ok: "Cancel request", danger: true, run: run });
      if (a === "pay" || a === "fail") return ask({ title: (a === "pay" ? (h && h.kind === "clearance" ? "Confirm balance cleared" : "Confirm payment") : "Mark payment failed") + " for " + r.id + "?", body: a === "pay" ? "FIN-OPS records the payment against the member's receivable (simulated payment provider: no real money moves)." : "FIN-OPS keeps the failed attempt; the request stays Awaiting Payment.", ok: a === "pay" ? (h && h.kind === "clearance" ? "Confirm balance cleared" : "Confirm payment") : "Mark payment failed", danger: a === "fail", run: run });
      var res = run();
      if (!res.ok) showError($("#r-note"), res.msg);
    });
    $("#r-journey").innerHTML = journeyFull(r);
    $("#r-next").textContent = journeyState(r).next;
    $("#r-history").innerHTML = timeline(r.history);
    rows($("#r-notices tbody"), db.outbox.filter(function (n) { return n.ref === r.id || (r.membershipId && n.ref === r.membershipId && r.type === "application"); }).map(function (n) {
      return "<tr>" + td("Sent", esc(fdate(n.at)), "num") + td("Template", esc(n.template)) + td("Recipient", esc(n.recipient)) + td("Delivery", esc(n.status)) + "</tr>";
    }).join(""), 4, "No notices yet.");
  };

  pages.approvals = function () {
    var me = role(), mine = db.requests.filter(function (q) { return q.status === "pendingApproval" && (me === "manager" || q.route === "approver"); });
    rows($("#approval-list tbody"), mine.map(function (q) {
      var own = q.createdByName === user();
      return requestRow(q, td("Decided by", q.route === "manager" ? "Manager" : "Approver") + td("Note", own ? '<span class="badge text-primary-emphasis bg-primary-subtle">Submitted by you</span>' : "—"));
    }).join(""), 8, "Nothing is waiting for your decision.");
    $("#approval-count").textContent = mine.length + " request" + (mine.length === 1 ? "" : "s") + " waiting for the " + ROLES[me].label;
    golfApprovals();  // (v03)
    eventRefundApprovals();  // (v04)
    facilityApprovals();  // (v05)
    resortApprovals();  // (v06)
    if (location.hash === "#t-evref" && me === "manager") bootstrap.Tab.getOrCreateInstance($("#t-evref-btn")).show();
    if (location.hash === "#t-golf" && me === "manager") bootstrap.Tab.getOrCreateInstance($("#t-golf-btn")).show();
    // (v07) Fee payments: an Approver confirms a fee as a FIN-OPS Payment or records a rejected attempt (RC-147); refunds and rewards go to FIN-OPS refunds
    $("#stub-tab-item").hidden = me !== "approver";
    if (me !== "approver") return;
    var open = db.handoffs.filter(function (x) { var q = x.requestId && req(x.requestId); return q && q.status === "awaitingPayment" && (x.kind === "fee" || x.kind === "clearance") && x.status !== "confirmed"; });
    rows($("#stub-list tbody"), open.map(function (x) {
      var r = req(x.requestId), can = Rules.bizRule006Confirm(r, me, user()), bill = x.bill && frec(x.bill);
      var btns = !can.ok ? '<span class="text-muted">' + esc(can.msg) + "</span>" : '<div class="cluster"><button type="button" class="btn btn-sm btn-outline-danger" data-stub="fail" data-req="' + r.id + '">Mark payment failed</button><button type="button" class="btn btn-sm btn-primary" data-stub="pay" data-req="' + r.id + '">' + (x.kind === "clearance" ? "Confirm balance cleared" : "Confirm payment") + "</button></div>";
      return "<tr>" + td("Request", reqLink(r.id)) + td("Member", memberLink(x.membershipId)) + td("Fee", esc(x.description)) + td("Amount", money2(x.amount), "num") +
        td("FIN-OPS", x.kind === "clearance" ? "Balance " + money2(outstanding(x.membershipId)) : finRef(x.financeRef) + (bill ? '<div class="text-muted small">Receivable ' + esc(bill.id) + " open " + money2(bill.open) + "</div>" : "")) + td("Status", badge(x.status), "col-status") + td("Actions", btns, "col-actions") + "</tr>";
    }).join(""), 7, "No fee payments waiting.");
    $("#stub-list").addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-stub"), res;
      if (!a) return;
      res = act(req(e.target.getAttribute("data-req")), a);
      if (!res.ok) return toast(res.msg, "danger");
      go("approvals.html#t-stub", res.msg);
    });
    if (location.hash) { var tab = $('[data-bs-target="' + location.hash + '"]'); if (tab) bootstrap.Tab.getOrCreateInstance(tab).show(); }
  };

  pages.communications = function () {
    var f = $("#comm-form");
    f.elements.template.innerHTML = options(cfg.templates.filter(function (t) { return t.active; }).map(function (t) { return [t.code, t.name + " (" + t.kind + ")"]; }), "MKT_GOLF");
    function audience() {
      var ms = db.memberships.filter(function (m) { return m.status === "active" && (f.elements.audience.value !== "expiring" || m.expiryDate <= Rules.addMonths(TODAY, 3)); });
      var ids = {}; return ms.map(function (m) { return person(m.personId); }).filter(function (p) { return !ids[p.id] && (ids[p.id] = true); });
    }
    function preview() {
      var tpl = cfg.templates.filter(function (t) { return t.code === f.elements.template.value; })[0], res = Rules.bizRule026(audience(), tpl.kind);
      $("#comm-preview").innerHTML = "<li>Will send to <strong>" + res.send.length + "</strong> recipients</li>" + (tpl.kind === "marketing" ? "<li>Excluded, no marketing consent (BR-026): <strong>" + res.excluded.length + "</strong>" + (res.excluded.length ? ", " + esc(res.excluded.map(function (p) { return p.fullName; }).join(", ")) : "") + "</li>" : "<li>Service message: the marketing-consent rule does not apply</li>");
      return { tpl: tpl, res: res };
    }
    f.addEventListener("change", preview); preview();
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var x = preview();
      ask({ title: "Send " + x.tpl.name + "?", body: x.res.send.length + " recipients; " + x.res.excluded.length + " excluded for no marketing consent.", ok: "Send", run: function () {
        x.res.send.forEach(function (p) { notify(x.tpl.code, p.fullName, "Campaign", x.tpl.kind); });
        audit("Communication sent", x.tpl.code, x.res.send.length + " sent, " + x.res.excluded.length + " excluded");
        publish("Notification", x.tpl.name + ": " + x.res.send.length + " messages", "Campaign");
        save(); go("communications.html", "Sent to " + x.res.send.length + "; " + x.res.excluded.length + " excluded (no marketing consent)"); return { ok: true }; } });
    });
    rows($("#outbox tbody"), db.outbox.slice(0, 40).map(function (n) {
      return "<tr>" + td("Sent", esc(fdate(n.at)), "num") + td("Template", esc(n.template)) + td("Kind", esc(n.kind)) + td("Recipient", esc(n.recipient)) + td("Reference", esc(n.ref)) + td("Delivery", esc(n.status)) + "</tr>";
    }).join(""), 6, "The outbox is empty.");
    rows($("#campaign-list tbody"), cfg.campaigns.map(function (c) { return "<tr>" + td("Code", esc(c.code)) + td("Campaign", esc(c.name)) + td("Reward", esc(c.reward)) + td("Period", esc(fdate(c.from) + " to " + fdate(c.to)), "num") + td("Status", Rules.bizRule030([c], TODAY) ? badge("active") : badge("ended"), "col-status") + "</tr>"; }).join(""), 5);
  };

  pages.config = function () {
    function drawTypes() {
      rows($("#types tbody"), cfg.membershipTypes.map(function (t) {
        return "<tr>" + td("Code", esc(t.code)) + td("Name", esc(t.name)) + td("Entrance Fee", money(t.entranceFee), "num") + td("Monthly", money(t.monthlySubscription), "num") + td("Term", t.termYears + " years", "num") +
          td("Effective from", esc(fdate(t.effectiveFrom)), "num") + td("Status", t.active ? badge("active") : '<span class="badge text-secondary-emphasis bg-secondary-subtle">Inactive</span>', "col-status") +
          td("Actions", '<div class="cluster"><button type="button" class="btn btn-sm btn-outline-secondary" data-toggle-type="' + t.code + '">' + (t.active ? "Inactivate" : "Activate") + '</button><button type="button" class="btn btn-sm btn-outline-danger" data-delete-type="' + t.code + '">Delete</button></div>', "col-actions") + "</tr>";
      }).join(""), 8);
    }
    drawTypes();
    $("#types").addEventListener("click", function (e) {
      var code = e.target.getAttribute("data-toggle-type"), del = e.target.getAttribute("data-delete-type");
      if (code) { var t = typeOf(code); t.active = !t.active; audit("Configuration changed", code, t.active ? "Activated" : "Inactivated (new applications cannot use it)"); save(); drawTypes(); toast(code + (t.active ? " activated" : " inactivated; existing records keep it")); }
      if (del) {
        var x = Rules.bizRule028(del, db.memberships, db.requests);
        if (!x.ok) return toast(x.msg, "danger");
        ask({ title: "Delete " + del + "?", body: "It is not referenced by any record.", ok: "Delete", danger: true, run: function () { cfg.membershipTypes = cfg.membershipTypes.filter(function (t) { return t.code !== del; }); audit("Configuration changed", del, "Deleted (unreferenced)"); save(); drawTypes(); toast(del + " deleted"); return { ok: true }; } });
      }
    });
    var lf = $("#limits-form"), L = cfg.limits, keys = ["maxCombinedYears", "absentMinMonths", "absentMaxMonths", "medicalMaxMonths", "extensionMaxMonths", "extensionApproverMaxMonths", "vehicleLimit", "juniorAgeLimit"];
    keys.forEach(function (k) { lf.elements[k].value = L[k]; });
    lf.elements.effectiveFrom.value = TODAY;
    lf.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = keys.filter(function (k) { return !(+lf.elements[k].value > 0); });
      if (!bad.length && +lf.elements.absentMinMonths.value > +lf.elements.absentMaxMonths.value) bad.push("absent minimum above maximum");
      showError($("#limits-err"), bad.length ? "Configuration is incomplete or inconsistent (" + bad.join(", ") + "); nothing was saved." : "");
      if (bad.length) return;
      var n = 0;
      keys.forEach(function (k) { if (L[k] !== +lf.elements[k].value) { audit("Configuration changed", k, L[k] + " → " + lf.elements[k].value + " from " + fdate(lf.elements.effectiveFrom.value), L[k], +lf.elements[k].value); L[k] = +lf.elements[k].value; n++; } });
      save(); toast(n ? "Limits saved, effective " + fdate(lf.elements.effectiveFrom.value) + "; existing records keep their values" : "No changes to save");
    });
    rows($("#docs-matrix tbody"), Object.keys(cfg.documents).map(function (k) { return "<tr>" + td("Request type", esc(TYPES[k])) + td("Mandatory documents", esc(cfg.documents[k].join(", "))) + "</tr>"; }).join(""), 2);
    rows($("#transitions tbody"), Object.keys(cfg.transitions).map(function (s) { var g = cfg.privileges[s]; return "<tr>" + td("From", badge(s), "col-status") + td("Allowed next", esc(cfg.transitions[s].map(function (x) { return LABEL[x]; }).join(", ") || "None (final)")) + td("Privileges", g.privileges ? "On" : "Off") + td("Billing", g.billing ? "On" : "Off") + "</tr>"; }).join(""), 4);
    rows($("#templates tbody"), cfg.templates.map(function (t) { return "<tr>" + td("Code", esc(t.code)) + td("Name", esc(t.name)) + td("Kind", esc(t.kind)) + td("Status", t.active ? badge("active") : "Inactive", "col-status") + "</tr>"; }).join(""), 4);
    // Campaigns can be switched on and off (BR-030), audited like membership types (G-1)
    function drawCampaigns() {
      rows($("#campaigns tbody"), cfg.campaigns.map(function (c) { return "<tr>" + td("Code", esc(c.code)) + td("Name", esc(c.name)) + td("Reward", esc(c.reward)) + td("Period", esc(fdate(c.from) + " to " + fdate(c.to)), "num") +
        td("Status", c.active ? badge("active") : '<span class="badge text-secondary-emphasis bg-secondary-subtle">Inactive</span>', "col-status") +
        td("Actions", '<button type="button" class="btn btn-sm btn-outline-secondary" data-toggle-campaign="' + esc(c.code) + '">' + (c.active ? "Inactivate" : "Activate") + "</button>", "col-actions") + "</tr>"; }).join(""), 6);
    }
    drawCampaigns();
    $("#campaigns").addEventListener("click", function (e) {
      var code = e.target.getAttribute("data-toggle-campaign"); if (!code) return;
      var c = cfg.campaigns.filter(function (x) { return x.code === code; })[0]; c.active = !c.active;
      audit("Configuration changed", code, c.active ? "Campaign activated" : "Campaign inactivated (no referral rewards, BR-030)"); save(); drawCampaigns();
      toast(code + (c.active ? " activated" : " inactivated: referrals earn no reward while it is off (BR-030)"));
    });
    // (v02) Report access (BR-031): one card per role; a grant the rule refuses is not saved
    var runnable = db.reports.filter(function (x) { return !x.plannedIn; });
    $("#access").innerHTML = ["officer", "golfops", "facilities", "resorts", "manager", "admin"].map(function (k) {
      return '<article class="card card-body stack"><h3 class="h5">' + esc(LABELS[k]) + '</h3><fieldset class="stack"><legend class="visually-hidden">Reports for ' + esc(LABELS[k]) + "</legend>" + runnable.map(function (x) {
        var id = "ac-" + k + "-" + x.id;
        return '<div class="form-check"><input class="form-check-input" type="checkbox" id="' + id + '" value="' + esc(x.id) + '"' + (db.accessRules[k].reports.indexOf(x.id) >= 0 ? " checked" : "") + '><label class="form-check-label" for="' + id + '">' + esc(x.id) + " " + esc(x.name) + "</label></div>";
      }).join("") + '</fieldset><div class="alert alert-danger" role="alert" hidden id="ac-err-' + k + '"></div><div class="btn-row"><button type="button" class="btn btn-primary" data-save-access="' + k + '">Save</button></div></article>';
    }).join("");
    $("#access").addEventListener("click", function (e) {
      var k = e.target.getAttribute("data-save-access"); if (!k) return;
      var card = e.target.closest("article"), before = db.accessRules[k].reports.slice(), after = $$("input:checked", card).map(function (i) { return i.value; });
      var bad = Workflow.canReport(role(), "grant", "none");
      after.filter(function (id) { return before.indexOf(id) < 0; }).forEach(function (id) { if (bad.ok) bad = Rules.bizRule031(db.accessRules, k, report(id), true); });
      showError($("#ac-err-" + k), bad.ok ? "" : bad.msg + " Nothing was saved.");
      if (!bad.ok) return;
      if (before.join() === after.join()) return toast("No changes to save");
      db.accessRules[k].reports = after;
      audit("Report access changed", LABELS[k], before.join(", ") + " → " + after.join(", "), before.join(", "), after.join(", ")); save();
      toast("Report access saved for the " + LABELS[k]);
    });
  };

  pages.portal = function () {
    var acct = (TAB && TAB[2]) || ROLES.member.membershipId, m = mem(acct);
    if (!m && nonMember(acct)) {  // (v04) a non-member account holder sees only the events, (v05) facilities and (v06) resorts sections (BR-085)
      $$("main > *").forEach(function (el) { if (["portal-events-section", "portal-facilities-section", "portal-facilities-wl", "portal-resorts-section", "portal-resorts-wl"].indexOf(el.id) < 0 && !el.classList.contains("page-header")) el.remove(); });
      $("#portal-name").textContent = "Welcome, " + nonMember(acct).name; portalEvents(acct); portalFacilities(acct); portalResorts(acct); return;
    }
    if (!m) { $("main").innerHTML = '<div class="blocked-panel" role="alert" data-state="error"><p class="blocked-panel__title">This Member tab has no account (BR-085).</p><p><a href="index.html">Open the launcher</a></p></div>'; return; }
    var p = person(m.personId), memberName = p.fullName;
    $("#portal-name").textContent = "Welcome, " + memberName;
    $("#portal-card").innerHTML = memberCard(m);
    $("#portal-facts").innerHTML = facts([["Membership ID", m.membershipId], ["Type", typeOf(m.typeCode).name], ["Status", badge(m.status), true], ["Expiry", fdate(m.expiryDate)]]);
    var mine = db.requests.filter(function (r) { return r.membershipId === m.membershipId && r.createdBy === "member"; });
    rows($("#portal-requests tbody"), mine.map(function (r) { return "<tr>" + td("Request", reqLink(r.id)) + td("Type", esc(TYPES[r.type])) + td("Journey", journeyCompact(r)) + td("Status", badge(r.status), "col-status") + td("Created", esc(fdate(r.createdAt)), "num") + "</tr>"; }).join(""), 5, "No requests yet. Renew or update your details below.");
    var rf = $("#renew-form");
    $("#years-tiles").innerHTML = packageTiles("pt");
    function renewPreview() { var chk = checkRequest("renewal", m, { years: rf.elements.years.value, memberRequested: true }); $("#renew-preview").textContent = chk.ok ? chk.preview.join(", ") : ""; return chk; }
    rf.addEventListener("change", renewPreview); renewPreview();
    rf.addEventListener("submit", function (e) {
      e.preventDefault();
      var chk = renewPreview(); showError($("#renew-err"), chk.ok ? "" : chk.msg); if (!chk.ok) return;
      var r = createRequest("renewal", m, p.id, chk, { years: rf.elements.years.value, memberRequested: true }, false);
      go("portal.html", "Renewal " + r.id + " submitted: we confirm after approval and payment");
    });
    var pf = $("#portal-profile");
    ["mobile", "email", "address"].forEach(function (k) { pf.elements[k].value = p[k]; });
    pf.elements.marketingConsent.checked = p.marketingConsent;
    pf.addEventListener("submit", function (e) {
      e.preventDefault();
      var next = Object.assign({}, p, { mobile: pf.elements.mobile.value.trim(), email: pf.elements.email.value.trim(), address: pf.elements.address.value.trim(), marketingConsent: pf.elements.marketingConsent.checked });
      var x = Rules.bizRule027(next); if (x.ok) x = Rules.bizRule171(next);
      showError($("#profile-err"), x.msg); if (!x.ok) return;
      var changes = ["mobile", "email", "address", "marketingConsent"].filter(function (k) { return p[k] !== next[k]; });
      if (!changes.length) return toast("No changes to save");
      changes.forEach(function (k) { audit("Profile changed (portal): " + k, m.membershipId, String(p[k]) + " → " + String(next[k]), p[k], next[k]); });
      Object.assign(p, next); save(); go("portal.html", "Your details are saved");
    });
    $("#withdraw-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var reason = e.target.elements.reason.value.trim(), chk = checkRequest("withdrawal", m, { memberRequested: true, reason: reason });
      showError($("#withdraw-err"), chk.ok ? "" : chk.msg); if (!chk.ok) return;
      ask({ title: "Withdraw your membership?", body: "Your balance is cleared first, and the unused term is not refunded (BR-013).", ok: "Submit withdrawal", danger: true, run: function () {
        var r = createRequest("withdrawal", m, p.id, chk, { memberRequested: true, reason: reason }, false); go("portal.html", "Withdrawal " + r.id + " submitted"); return { ok: true }; } });
    });
    portalGolf(m);  // (v03)
    portalEvents(m.membershipId);  // (v04)
    portalFacilities(m.membershipId);  // (v05)
    portalResorts(m.membershipId);  // (v06)
  };

  pages.integrations = function () {
    var ft = $("#f-target");
    ft.innerHTML = '<option value="">All targets</option>' + options(["FIN-OPS", "Membership", "Access Control", "HMS", "GMS", "Function Room Booking System", "Notification"].map(function (t) { return [t, t]; }));
    function draw() {
      rows($("#events tbody"), db.integrationEvents.filter(function (e) { return !ft.value || e.target === ft.value; }).map(function (e) {
        return "<tr>" + td("When", esc(fdate(e.at)), "num") + td("Target", esc(e.target) + (e.stub ? ' <span class="badge text-secondary-emphasis bg-secondary-subtle">stub</span>' : "")) + td("Event", esc(e.event)) +
          td("Reference", /^RQ-/.test(e.ref) ? reqLink(e.ref) : /^GB-/.test(e.ref) ? '<a href="golf-booking.html?id=' + esc(e.ref) + '">' + esc(e.ref) + "</a>" : /^[A-Z]{2}\d{5}$/.test(e.ref) ? memberLink(e.ref) : esc(e.ref)) + "</tr>";
      }).join(""), 4, "No events for this target.");
    }
    ft.addEventListener("change", draw); draw();
  };

  /* ---------- (v02) Club Reporting: report builders, runs, export, pages ---------- */
  // A cell is plain text, or { t: text for the export, h: html for the screen }
  function cellText(c) { return c && typeof c === "object" ? c.t : String(c == null ? "" : c); }
  function cellHtml(c) { return c && typeof c === "object" ? c.h : esc(c); }
  function memCell(id) { return { t: id || "—", h: memberLink(id) }; }
  function stat(s) { return { t: LABEL[s] || s, h: badge(s) }; }
  function report(id) { return db.reports.filter(function (r) { return r.id === id; })[0]; }
  function definition(id) { return db.definitions.filter(function (d) { return d.id === id; })[0]; }
  function latest(d) { return d.versions[d.versions.length - 1]; }
  function between(at, from, to) { var x = String(at).slice(0, 10); return (!from || x >= from) && (!to || x <= to); }
  function tally(list, key) { var o = {}; list.forEach(function (x) { var k = key(x); o[k] = (o[k] || 0) + 1; }); return Object.keys(o).map(function (k) { return [k, o[k]]; }); }
  function monthly(dates, year) { return MONTHS.map(function (mo, i) { var mm = String(i + 1).padStart(2, "0"); return [mo, dates.filter(function (d) { return d && d.slice(0, 7) === year + "-" + mm; }).length]; }); }
  var LAPSED = ["expired", "withdrawn", "deceased", "ended"];

  // One builder per runnable report: { cols: [[label, cls]], rows: [[cell…]], kpis: [[label, value, note]], chart: { kind, title, data } }
  var BUILD = {
    "MMS-RR-001": function (p) {
      var ms = db.memberships.filter(function (m) { return (!p.status || m.status === p.status) && (!p.type || m.typeCode === p.type); });
      return { cols: [["Membership ID"], ["Name"], ["Type"], ["Status", "col-status"], ["Expiry", "num"]],
        rows: ms.map(function (m) { return [memCell(m.membershipId), holder(m), typeOf(m.typeCode).name, stat(m.status), { t: fdate(m.expiryDate), h: esc(fdate(m.expiryDate)) }]; }), typeCodes: ms.map(function (m) { return m.typeCode; }),
        kpis: [["Memberships", ms.length, "Matching the criteria"], ["Active", ms.filter(function (m) { return m.status === "active"; }).length, "Privileges on"], ["Types", tally(ms, function (m) { return m.typeCode; }).length, "Membership types"]],
        chart: { kind: "bar", title: "Memberships by status", data: tally(ms, function (m) { return LABEL[m.status]; }) } };
    },
    "MMS-RR-002": function (p) {
      var y = String(p.year), ms = db.memberships, joins = ms.filter(function (m) { return m.joinedDate.slice(0, 4) === y; });
      var types = tally(ms, function (m) { return m.typeCode; });
      return { cols: [["Membership type"], ["Memberships", "num"], ["Active", "num"], ["Lapsed", "num"], ["Joined in " + y, "num"]],
        rows: types.map(function (t) { var of = ms.filter(function (m) { return m.typeCode === t[0]; }); return [typeOf(t[0]).name, String(of.length), String(of.filter(function (m) { return m.status === "active"; }).length), String(of.filter(function (m) { return LAPSED.indexOf(m.status) >= 0; }).length), String(joins.filter(function (m) { return m.typeCode === t[0]; }).length)]; }),
        kpis: [["Memberships", ms.length, "All statuses"], ["Active", ms.filter(function (m) { return m.status === "active"; }).length, "Privileges on"], ["Joined in " + y, joins.length, "New memberships"], ["Lapsed", ms.filter(function (m) { return LAPSED.indexOf(m.status) >= 0; }).length, "Expired, withdrawn, deceased, ended"]],
        chart: { kind: "line", title: "Joins by month, " + y, data: monthly(joins.map(function (m) { return m.joinedDate; }), y) } };
    },
    "MMS-RR-003": function (p) {
      var to = Rules.addDays(TODAY, +p.days), ms = db.memberships.filter(function (m) { return m.status === "active" && m.expiryDate >= TODAY && m.expiryDate <= to && (!p.type || m.typeCode === p.type); }).sort(function (a, b) { return a.expiryDate < b.expiryDate ? -1 : 1; });
      function outcome(m) { var r = db.requests.filter(function (x) { return x.membershipId === m.membershipId && x.type === "renewal"; }).slice(-1)[0]; return r ? { t: "Renewal " + LABEL[r.status], h: reqLink(r.id) + " " + badge(r.status) } : "Not renewed yet"; }
      return { cols: [["Membership ID"], ["Name"], ["Type"], ["Expiry", "num"], ["Renewal outcome"]],
        rows: ms.map(function (m) { return [memCell(m.membershipId), holder(m), typeOf(m.typeCode).name, fdate(m.expiryDate), outcome(m)]; }), typeCodes: ms.map(function (m) { return m.typeCode; }),
        kpis: [["Expiring", ms.length, "By " + fdate(to)], ["Renewal requested", ms.filter(function (m) { return typeof outcome(m) === "object"; }).length, "Any status"], ["Not renewed yet", ms.filter(function (m) { return typeof outcome(m) !== "object"; }).length, "Follow up"]],
        chart: { kind: "bar", title: "Expiring by month", data: tally(ms, function (m) { return MONTHS[+m.expiryDate.slice(5, 7) - 1] + " " + m.expiryDate.slice(0, 4); }) } };
    },
    "MMS-RR-004": function (p) {
      var tr = db.audit.filter(function (a) { return a.action === "Status changed" && between(a.at, p.from, p.to); });
      var ms = db.memberships, n = function (s) { return ms.filter(function (m) { return s.indexOf(m.status) >= 0; }).length; };
      return { cols: [["Date", "num"], ["Membership ID"], ["From", "col-status"], ["To", "col-status"], ["By"]],
        rows: tr.map(function (a) { return [fdate(a.at), memCell(a.ref), stat(a.before), stat(a.after), a.actor]; }),
        kpis: [["Active", n(["active"]), "Now"], ["Absent or medical", n(["absent", "medical"]), "Now"], ["Suspended", n(["suspended"]), "Now"], ["Transitions", tr.length, "In the period"]],
        chart: { kind: "donut", title: "Current status distribution", data: Object.keys(cfg.transitions).map(function (s) { return [LABEL[s], n([s])]; }).filter(function (d) { return d[1]; }) } };
    },
    "MMS-RR-005": function (p) {
      var L = cfg.limits, until = Rules.addMonths(TODAY, +p.months);
      var js = db.memberships.filter(function (m) { return m.typeCode === "JUN" && m.status === "active"; }).map(function (m) { return [m, Rules.addMonths(person(m.personId).dateOfBirth, L.juniorAgeLimit * 12)]; }).filter(function (x) { return x[1] <= until; });
      return { cols: [["Membership ID"], ["Junior"], ["Turns " + L.juniorAgeLimit, "num"], ["Status", "col-status"], ["Action"]],
        rows: js.map(function (x) { return [memCell(x[0].membershipId), holder(x[0]), fdate(x[1]), stat(x[0].status), x[1] <= TODAY ? "Past the limit: ended by the next lifecycle check (BR-021)" : "Contact before " + fdate(x[1])]; }),
        kpis: [["Juniors listed", js.length, "Within " + p.months + " months"], ["Past the limit", js.filter(function (x) { return x[1] <= TODAY; }).length, "Ended by the lifecycle check"], ["Active juniors", db.memberships.filter(function (m) { return m.typeCode === "JUN" && m.status === "active"; }).length, "All"]],
        chart: { kind: "bar", title: "Juniors by the month they turn " + L.juniorAgeLimit, data: tally(js, function (x) { return MONTHS[+x[1].slice(5, 7) - 1] + " " + x[1].slice(0, 4); }) } };
    },
    "MMS-RR-006": function (p) {
      var ms = db.memberships.filter(function (m) { return m.recruitmentSource && (!p.source || m.recruitmentSource === p.source); });
      var refs = ms.filter(function (m) { return m.referrerMembershipId; }), by = tally(ms, function (m) { return m.recruitmentSource; }).sort(function (a, b) { return b[1] - a[1]; });
      return { cols: [["Membership ID"], ["Name"], ["Recruitment source"], ["Referred by"], ["Joined", "num"]],
        rows: ms.map(function (m) { return [memCell(m.membershipId), holder(m), m.recruitmentSource, m.referrerMembershipId ? memCell(m.referrerMembershipId) : "—", fdate(m.joinedDate)]; }), typeCodes: ms.map(function (m) { return m.typeCode; }),
        kpis: [["Members", ms.length, "With a recruitment source"], ["Referrals", refs.length, "With a referring member"], ["Top source", by.length ? by[0][0] : "—", by.length ? by[0][1] + " members" : ""]],
        chart: { kind: "bar", title: "Members by recruitment source", data: by } };
    },
    "MMS-RR-007": function (p) {
      var act = (p.actor || "").toLowerCase(), list = db.audit.map(function (a) { return { at: a.at, actor: a.actor, role: a.role, action: a.action, ref: a.ref, outcome: a.outcome }; });
      db.requests.forEach(function (r) { r.history.forEach(function (h) { list.push({ at: h.at, actor: h.actor, role: h.role, action: h.action, ref: r.id, outcome: (LABEL[h.from] || h.from || "—") + " → " + (LABEL[h.to] || h.to || "—") + (h.comment ? ", " + h.comment : "") }); }); });
      list = list.filter(function (x) { return between(x.at, p.from, p.to) && (!act || String(x.actor).toLowerCase().indexOf(act) >= 0); }).sort(function (a, b) { return a.at < b.at ? 1 : -1; });
      return { cols: [["When", "num"], ["Actor"], ["Role"], ["Action"], ["Record"], ["Outcome"]],
        rows: list.map(function (x) { return [x.at.slice(0, 10) === x.at ? fdate(x.at) : fdate(x.at.slice(0, 10)) + " " + x.at.slice(11), x.actor, LABELS[x.role] || x.role || "—", x.action, /^RQ-/.test(x.ref) ? { t: x.ref, h: reqLink(x.ref) } : /^[A-Z]{2}\d{5}$/.test(x.ref) ? memCell(x.ref) : x.ref, x.outcome || "—"]; }),
        kpis: [["Actions", list.length, "In the period"], ["Actors", tally(list, function (x) { return x.actor; }).length, "People and jobs"], ["Requests touched", tally(list.filter(function (x) { return /^RQ-/.test(x.ref); }), function (x) { return x.ref; }).length, "With history"]],
        chart: { kind: "bar", title: "Actions by actor", data: tally(list, function (x) { return x.actor; }) } };
    },
    "MMS-RR-008": function (p) {
      var id = (p.member || "").trim().toUpperCase(), of = function (x) { return !id || x.membershipId === id; };
      var vs = db.vehicles.filter(of), cs = db.cards.filter(of), rowsV = vs.map(function (v) { return [memCell(v.membershipId), "Vehicle", v.plate + ", " + v.make, stat(v.status), v.labelHistory.map(function (l) { return l.label + " (" + fdate(l.issued) + ")"; }).join("; ")]; });
      var rowsC = cs.map(function (c) { return [memCell(c.membershipId), "Card", c.id + ", " + c.kind, stat(c.status), "Issued " + fdate(c.issued)]; });
      return { cols: [["Membership ID"], ["Kind"], ["Item"], ["Status", "col-status"], ["History"]], rows: rowsV.concat(rowsC),
        kpis: [["Vehicles", vs.filter(function (v) { return v.status === "active"; }).length, "Active"], ["Car labels", vs.reduce(function (a, v) { return a + v.labelHistory.length; }, 0), "Issued"], ["Cards", cs.filter(function (c) { return c.status === "active"; }).length, "Active"], ["Replaced", cs.filter(function (c) { return c.status !== "active"; }).length, "Void cards"]],
        chart: { kind: "bar", title: "Active vehicles by membership", data: tally(vs.filter(function (v) { return v.status === "active"; }), function (v) { return v.membershipId; }) } };
    }
  };

  // Applies a definition version: its type filter and its field list (the first column is always kept)
  function applyDefinition(out, v) {
    if (!v) return out;
    var types = v.filters.types || [], keep = out.cols.map(function (c, i) { return i === 0 || v.fields.indexOf(c[0]) >= 0; });
    var codes = (out.typeCodes || []).filter(function (c) { return !types.length || types.indexOf(c) >= 0; });
    var rows = out.rows.filter(function (r, i) { return !types.length || !out.typeCodes || types.indexOf(out.typeCodes[i]) >= 0; });
    return { cols: out.cols.filter(function (c, i) { return keep[i]; }), rows: rows.map(function (r) { return r.filter(function (c, i) { return keep[i]; }); }), kpis: [["Rows", rows.length, "Matching the definition"], ["Membership types", tally(codes, String).length, types.length ? "Filtered" : "Any type"]],
      chart: codes.length ? { kind: "bar", title: "Rows by membership type", data: tally(codes, function (c) { return typeOf(c).name; }) } : null };
  }
  function lineChart(svg, data) {
    drawOnResize(svg, function () {
      var w = svg.clientWidth, h = svg.clientHeight, pad = 28, max = Math.max.apply(null, data.map(function (d) { return d[1]; }).concat(1)), step = (w - pad * 2) / Math.max(1, data.length - 1);
      var pts = data.map(function (d, i) { return [pad + i * step, h - pad - (h - pad * 2.2) * d[1] / max]; });
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.innerHTML = '<polyline class="chart__line" points="' + pts.map(function (q) { return q.join(","); }).join(" ") + '"/>' + pts.map(function (q, i) {
        return '<circle class="chart__dot" cx="' + q[0] + '" cy="' + q[1] + '" r="4"><title>' + esc(data[i][0] + ": " + data[i][1]) + '</title></circle><text class="chart__value" x="' + q[0] + '" y="' + (q[1] - 9) + '" text-anchor="middle">' + data[i][1] + '</text><text class="chart__label" x="' + q[0] + '" y="' + (h - 6) + '" text-anchor="middle">' + esc(data[i][0]) + "</text>";
      }).join("");
    });
  }
  function kpiTiles(list) {
    return list.map(function (k) { return '<article class="card card-body"><span class="text-muted">' + esc(k[0]) + '</span><span class="kpi__value">' + esc(k[1]) + '</span><span class="text-muted">' + esc(k[2] || "") + "</span></article>"; }).join("");
  }
  function chartInto(svg, c) {
    if (!c || !c.data.length) return;
    svg.setAttribute("aria-label", { bar: "Bar", donut: "Donut", line: "Line" }[c.kind] + " chart: " + c.title);
    ({ bar: barChart, donut: donutChart, line: lineChart })[c.kind](svg, c.data);
  }
  function runRows(list) {
    return list.map(function (x) {
      var d = x.definition && definition(x.definition);
      return "<tr>" + td("Run", esc(x.id)) + td("Report", '<a href="report.html?id=' + esc(x.report) + (x.definition ? "&def=" + esc(x.definition) : "") + '">' + esc(d ? d.name : x.report) + "</a>" + (d ? ' <span class="badge bg-secondary-subtle text-secondary-emphasis">v' + x.version + "</span>" : "")) +
        td("By", esc(x.by)) + td("At", esc(fdate(x.at.slice(0, 10)) + " " + x.at.slice(11)), "num") + td("Rows", String(x.rows), "num") +
        td("Exports", x.exports.map(function (e) { return '<span class="badge bg-secondary-subtle text-secondary-emphasis">' + e.format.toUpperCase() + "</span>"; }).join(" ") || "—") + "</tr>";
    }).join("");
  }
  // The definitions a role may run: active, and the role is in the latest version's roles
  function myDefinitions(r) { return db.definitions.filter(function (d) { return d.status === "active" && latest(d).roles.indexOf(r) >= 0; }); }

  pages.reports = function () {
    var r = role(), q = $("#rq"), fa = $("#f-area");
    var areas = db.reports.map(function (x) { return x.area; }).filter(function (a, i, all) { return all.indexOf(a) === i; });
    fa.innerHTML = '<option value="">All areas</option>' + options(areas.map(function (a) { return [a, a]; }));
    $$("[data-for-roles]").forEach(function (x) { if (x.getAttribute("data-for-roles").split(" ").indexOf(r) < 0) x.remove(); });
    function draw() {
      var text = q.value.trim().toLowerCase();
      var list = db.reports.filter(function (x) { return (x.plannedIn || Rules.bizRule031(db.accessRules, r, x).ok) && (!fa.value || x.area === fa.value) && (!text || (x.id + " " + x.name + " " + x.answers).toLowerCase().indexOf(text) >= 0); });
      rows($("#catalogue tbody"), list.map(function (x) {
        var name = x.plannedIn ? '<span class="fw-bold">' + esc(x.id) + "</span>" : '<a class="fw-bold" href="report.html?id=' + esc(x.id) + '">' + esc(x.id) + "</a>";
        return "<tr>" + td("Report", name) + td("Name", "<strong>" + esc(x.name) + '</strong><br><span class="text-muted">' + esc(x.answers) + "</span>") +
          td("Module", '<span class="badge text-primary-emphasis bg-primary-subtle">' + esc(x.module) + "</span>") +
          td("Export as", x.plannedIn ? '<span class="badge badge-hold">Coming in ' + esc(x.plannedIn) + "</span>" : x.exportable ? '<div class="cluster">' + ["pdf", "xls"].map(function (f) { return '<button type="button" class="btn btn-sm btn-outline-alt" data-cexp="' + f + '" data-id="' + esc(x.id) + '" aria-label="Export ' + esc(x.id) + " as " + f.toUpperCase() + '">' + f.toUpperCase() + "</button>"; }).join("") + "</div>" : '<span class="badge bg-secondary-subtle text-secondary-emphasis">On screen</span>', "col-actions") + "</tr>";
      }).join(""), 4, "No report matches these filters.");
    }
    q.addEventListener("input", draw); fa.addEventListener("change", draw); q.form.addEventListener("submit", function (e) { e.preventDefault(); }); draw();
    // (v04) catalogue export (D-305): run with the report's default parameters, record the run (source catalogue) with its export; XLS here, PDF on the report page
    $("#catalogue").addEventListener("click", function (e) {
      var f = e.target.getAttribute("data-cexp"); if (!f) return;
      var x = report(e.target.getAttribute("data-id")), p = {};
      x.params.forEach(function (q) { p[q.key] = q.default || ""; });
      var ok = Workflow.canReport(r, "open", "none");
      if (ok.ok) ok = Rules.bizRule031(db.accessRules, r, x); if (ok.ok) ok = Rules.bizRule032(x.params, p); if (ok.ok) ok = Rules.bizRule034(x);
      if (!ok.ok) return toast(ok.msg, "danger");
      var out = BUILD[x.id](p), file = x.id + "-" + TODAY + "." + f;
      if (Rules.bizRule033(out.rows).empty) return toast("No records match the default criteria: open the report to change them (BR-033).", "danger");
      var run = { id: "RN-" + seq("RN", 4), report: x.id, definition: null, version: null, params: p, by: user(), role: r, at: now(), rows: out.rows.length, exports: [], source: "catalogue" };
      run.exports.push({ format: f, file: file, by: user(), at: now(), rows: out.rows.length });
      db.reportRuns.unshift(run); save();
      if (f === "pdf") return go("report.html?id=" + encodeURIComponent(x.id) + "&rn=" + run.id + "&export=pdf");
      xlsDownload(x.name, criteria(x, p), out, file);
      toast("Exported " + file + " (" + out.rows.length + " rows, " + run.id + ")");
      rows($("#runs tbody"), runRows(db.reportRuns.filter(function (y) { return r === "manager" || r === "admin" || y.role === r; }).slice(0, 10)), 6, "No runs yet.");
    });
    rows($("#my-defs tbody"), myDefinitions(r).map(function (d) { var v = latest(d); return "<tr>" + td("Report", '<a class="fw-bold" href="report.html?id=' + esc(d.base) + "&def=" + esc(d.id) + '">' + esc(d.name) + "</a>") + td("Based on", esc(d.base)) + td("Version", "v" + v.version, "num") + td("Effective from", esc(fdate(v.effectiveFrom)), "num") + "</tr>"; }).join(""), 4, "No club reports for your role yet.");
    rows($("#runs tbody"), runRows(db.reportRuns.filter(function (x) { return r === "manager" || r === "admin" || x.role === r; }).slice(0, 10)), 6, "No runs yet.");
  };

  // (v04) one .xls builder for the report page and the catalogue buttons
  // shortcut: an HTML table saved as .xls (Excel opens it with a format notice); a real build uses an XLSX writer on the server
  function xlsDownload(title, crit, o, file) {
    var html = '<html><head><meta charset="utf-8"></head><body><table border="1"><tr><th colspan="' + o.cols.length + '">' + esc(title) + " · " + esc(crit) + "</th></tr><tr>" + o.cols.map(function (c) { return "<th>" + esc(c[0]) + "</th>"; }).join("") + "</tr>" +
      o.rows.map(function (row) { return "<tr>" + row.map(function (c) { return "<td>" + esc(cellText(c)) + "</td>"; }).join("") + "</tr>"; }).join("") + "</table></body></html>";
    var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" })); a.download = file; a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); });
  }
  function criteria(x, p) { return x.params.filter(function (q) { return p[q.key]; }).map(function (q) { return q.label + " " + (q.type === "date" ? fdate(p[q.key]) : LABEL[p[q.key]] || p[q.key]); }).join(" · ") || "No criteria"; }

  pages.report = function () {
    var r = role(), x = report(qs("id")), d = qs("def") && definition(qs("def"));
    if (!x) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">Unknown report.</p><p><a href="reports.html">Back to Reports</a></p></div>'; return; }
    var ok = d ? (d.status === "active" && latest(d).roles.indexOf(r) >= 0 ? { ok: true } : { ok: false, msg: "This club report is not open to your role (BR-035)." }) : Rules.bizRule031(db.accessRules, r, x);
    if (!ok.ok) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">' + esc(ok.msg) + '</p><p><a href="reports.html">Back to Reports</a></p></div>'; return; }
    var v = d && latest(d);
    document.title = (d ? d.name : x.name) + " · CC-Demo";
    $("#r-title").textContent = d ? d.name : x.name;
    $("#r-meta").innerHTML = "<strong>" + esc(x.id) + '</strong><span class="badge text-primary-emphasis bg-primary-subtle">' + esc(x.module) + "</span>" + (d ? '<span class="badge bg-secondary-subtle text-secondary-emphasis">Definition v' + v.version + ", from " + esc(fdate(v.effectiveFrom)) + "</span>" : "") + '<span class="text-muted">' + esc(x.answers) + "</span>";
    $("#r-legacy").textContent = x.legacy.length ? "Replaces: " + x.legacy.join(", ") : "";
    var form = $("#params");
    form.querySelector(".form-grid").innerHTML = x.params.map(function (p) {
      var id = "p-" + p.key, val = qs(p.key) != null ? qs(p.key) : p.default || "", label = esc(p.label) + (p.required ? " (required)" : "");
      var input = p.type === "select" ? '<select class="form-select" id="' + id + '" name="' + p.key + '"><option value="">Any</option>' + options(p.options.map(function (o) { return [o, LABEL[o] || o]; }), val) + "</select>" :
        p.type === "type" ? '<select class="form-select" id="' + id + '" name="' + p.key + '"><option value="">Any</option>' + options(cfg.membershipTypes.map(function (t) { return [t.code, t.name]; }), val) + "</select>" :
        p.type === "source" ? '<select class="form-select" id="' + id + '" name="' + p.key + '"><option value="">Any</option>' + options(cfg.recruitmentSources.map(function (s) { return [s, s]; }), val) + "</select>" :
        '<input class="form-control" id="' + id + '" name="' + p.key + '" type="' + (p.type === "number" ? "number" : p.type === "date" ? "date" : "text") + '" value="' + esc(val) + '"' + (p.type === "number" ? ' min="1" step="1"' : "") + ">";
      return '<div class="field"><label class="form-label" for="' + id + '">' + label + "</label>" + input + "</div>";
    }).join("") || '<p class="text-muted">This report has no parameters.</p>';
    var exp = Rules.bizRule034(x).ok, last = null;
    $$("[data-export]").forEach(function (b) { b.hidden = !exp; });
    function history() { rows($("#r-runs tbody"), runRows(db.reportRuns.filter(function (y) { return y.report === x.id && (y.definition || null) === (d ? d.id : null); }).slice(0, 10)), 6, "No runs of this report yet."); }
    function values() { var o = {}; x.params.forEach(function (p) { o[p.key] = form.elements[p.key].value.trim(); }); return o; }
    function run(existing) {
      var p = existing ? existing.params : values(), chk = Rules.bizRule032(x.params, p);
      showError($("#r-err"), chk.ok ? "" : chk.msg);
      if (!chk.ok) return;
      var out = BUILD[x.id](p);
      if (d) out = applyDefinition(out, v);
      var res = Rules.bizRule033(out.rows);
      // (v04) a run made by a catalogue button is shown as it is, not recorded twice
      if (existing) last = existing;
      else { last = { id: "RN-" + seq("RN", 4), report: x.id, definition: d ? d.id : null, version: d ? v.version : null, params: p, by: user(), role: r, at: now(), rows: out.rows.length, exports: [], source: "report" }; db.reportRuns.unshift(last); save(); }
      last.out = out;
      $("#result").hidden = false;
      $("#r-empty").hidden = !res.empty; $("#r-data").hidden = res.empty;
      if (res.empty) $("#r-chart-slot").innerHTML = "";
      $("#r-crit").textContent = criteria(x, p);
      $("#r-foot").textContent = out.rows.length + (out.rows.length === 1 ? " row" : " rows") + " · generated by " + user() + " at " + fdate(TODAY) + " " + last.at.slice(11) + " · " + last.id;
      $$("[data-export]").forEach(function (b) { b.disabled = res.empty; });
      if (!res.empty) {
        $("#r-kpis").innerHTML = kpiTiles(out.kpis);
        var has = !!(out.chart && out.chart.data.length);
        $("#r-chart-box").hidden = !has;
        $("#r-chart-slot").innerHTML = has ? '<svg class="chart" id="r-chart" role="img"></svg>' : "";
        if (has) { $("#r-chart-title").textContent = out.chart.title; chartInto($("#r-chart"), out.chart); }
        $("#r-table thead").innerHTML = "<tr>" + out.cols.map(function (c) { return '<th scope="col"' + (c[1] ? ' class="' + c[1] + '"' : "") + ">" + esc(c[0]) + "</th>"; }).join("") + "</tr>";
        $("#r-table tbody").innerHTML = out.rows.map(function (row) { return "<tr>" + row.map(function (c, i) { return td(out.cols[i][0], cellHtml(c), out.cols[i][1]); }).join("") + "</tr>"; }).join("");
        plainLinks($("#r-table"));
      }
      history();
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); run(); });
    $("[data-change]").addEventListener("click", function () { var f = form.querySelector("input, select"); if (f) f.focus(); });
    // Export (BR-034): Excel as an .xls file built in the browser, PDF through the browser's print (D-031)
    function record(format, file) { var e = { format: format, file: file, by: user(), at: now(), rows: last.rows }; db.reportRuns.filter(function (y) { return y.id === last.id; })[0].exports.push(e); save(); history(); }
    $("[data-export='xls']").addEventListener("click", function () {
      var ok = Rules.bizRule034(x); if (!ok.ok || !last) return toast(ok.msg || "Run the report first.", "danger");
      var file = x.id + (d ? "-" + d.id + "-v" + v.version : "") + "-" + TODAY + ".xls";
      xlsDownload($("#r-title").textContent, $("#r-crit").textContent, last.out, file);
      record("xls", file); toast("Exported " + file + " (" + last.rows + " rows)");
    });
    $("[data-export='pdf']").addEventListener("click", function () {
      var ok = Rules.bizRule034(x); if (!ok.ok || !last) return toast(ok.msg || "Run the report first.", "danger");
      record("pdf", x.id + "-" + TODAY + ".pdf");
      var html = document.documentElement, t = html.getAttribute("data-bs-theme");
      html.setAttribute("data-bs-theme", "light"); window.print(); html.setAttribute("data-bs-theme", t);
    });
    history();
    if (qs("run") === "1") run();
    // (v04) from a catalogue PDF button: show that run's result and open the print dialog (the export is already recorded, D-305)
    var fromCat = qs("rn") && db.reportRuns.filter(function (y) { return y.id === qs("rn") && y.report === x.id; })[0];
    if (fromCat) {
      x.params.forEach(function (q) { if (form.elements[q.key] && fromCat.params[q.key] != null) form.elements[q.key].value = fromCat.params[q.key]; });
      run(fromCat);
      if (qs("export") === "pdf") { var html = document.documentElement, t = html.getAttribute("data-bs-theme"); html.setAttribute("data-bs-theme", "light"); setTimeout(function () { window.print(); html.setAttribute("data-bs-theme", t); }, 300); }
    }
  };

  pages.definitions = function () {
    var form = $("#def-form"), base = form.elements.base, editing = null, runnable = db.reports.filter(function (x) { return !x.plannedIn; });
    base.innerHTML = options(runnable.map(function (x) { return [x.id, x.id + " " + x.name]; }));
    $("#def-types").innerHTML = cfg.membershipTypes.map(function (t) { return '<div class="form-check"><input class="form-check-input" type="checkbox" name="types" value="' + esc(t.code) + '" id="dt-' + esc(t.code) + '"><label class="form-check-label" for="dt-' + esc(t.code) + '">' + esc(t.name) + "</label></div>"; }).join("");
    $("#def-roles").innerHTML = ["officer", "manager", "admin", "approver"].map(function (k) { return '<div class="form-check"><input class="form-check-input" type="checkbox" name="roles" value="' + k + '" id="dr-' + k + '"><label class="form-check-label" for="dr-' + k + '">' + esc(LABELS[k]) + "</label></div>"; }).join("");
    function fields() {
      var cols = BUILD[base.value]({ year: "2026", days: "90", from: "", to: "", months: "12" }).cols.slice(1), keep = editing ? latest(editing).fields : null;
      $("#def-fields").innerHTML = cols.map(function (c, i) { return '<div class="form-check"><input class="form-check-input" type="checkbox" name="fields" value="' + esc(c[0]) + '" id="df-' + i + '"' + (!keep || keep.indexOf(c[0]) >= 0 ? " checked" : "") + '><label class="form-check-label" for="df-' + i + '">' + esc(c[0]) + "</label></div>"; }).join("");
    }
    function picked(name) { return $$("input[name=" + name + "]:checked", form).map(function (i) { return i.value; }); }
    function draw() {
      rows($("#defs tbody"), db.definitions.map(function (d) { var v = latest(d); return "<tr>" + td("Definition", '<button type="button" class="btn btn-link p-0 fw-bold" data-edit="' + esc(d.id) + '">' + esc(d.id) + "</button>") + td("Name", esc(d.name)) + td("Based on", esc(d.base)) + td("Version", "v" + v.version, "num") +
        td("Effective from", esc(fdate(v.effectiveFrom)), "num") + td("Roles", esc(v.roles.map(function (k) { return LABELS[k]; }).join(", "))) + td("Status", d.status === "active" ? badge("active") : '<span class="badge bg-secondary-subtle text-secondary-emphasis">Retired</span>', "col-status") + "</tr>"; }).join(""), 7, "No definitions yet. Create the first one below.");
    }
    function load(d) {
      editing = d; form.reset(); base.disabled = !!d;
      $("#def-form-title").textContent = d ? "Edit " + d.id + ": saves version " + (latest(d).version + 1) : "New definition";
      $("#def-inactivate").hidden = !d || d.status !== "active";
      $("#def-history-box").hidden = !d;
      if (d) {
        var v = latest(d); form.elements.name.value = d.name; base.value = d.base; form.elements.effectiveFrom.value = v.effectiveFrom;
        $$("input[name=types]", form).forEach(function (i) { i.checked = (v.filters.types || []).indexOf(i.value) >= 0; });
        $$("input[name=roles]", form).forEach(function (i) { i.checked = v.roles.indexOf(i.value) >= 0; });
        $("#def-history").innerHTML = timeline(d.versions.map(function (y) { return { at: y.at, actor: y.by, role: "admin", action: "Version " + y.version, comment: "from " + fdate(y.effectiveFrom) + ", types " + ((y.filters.types || []).join(", ") || "any") + ", roles " + y.roles.map(function (k) { return LABELS[k]; }).join(", ") }; }));
      } else form.elements.effectiveFrom.value = TODAY;
      fields(); showError($("#def-err"), "");
    }
    base.addEventListener("change", fields);
    $("#defs").addEventListener("click", function (e) { var id = e.target.getAttribute("data-edit"); if (id) { load(definition(id)); form.scrollIntoView({ block: "start" }); } });
    $("[data-new-def]").addEventListener("click", function () { load(null); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var spec = { name: form.elements.name.value.trim(), base: base.value, effectiveFrom: form.elements.effectiveFrom.value, roles: picked("roles") };
      var chk = Workflow.canReport(role(), editing ? "version" : "save", editing ? editing.status : "none");
      if (chk.ok) chk = Rules.bizRule035(spec, db.reports, db.accessRules, LABELS);
      showError($("#def-err"), chk.ok ? "" : chk.msg);
      if (!chk.ok) return;
      var v = { version: editing ? latest(editing).version + 1 : 1, effectiveFrom: spec.effectiveFrom, fields: picked("fields"), filters: { types: picked("types") }, roles: spec.roles, by: user(), at: now() };
      // shortcut: the latest saved version is the one that runs, whatever its effective date; a real build switches versions on their effective date
      if (editing) { editing.name = spec.name; editing.versions.push(v); audit("Report definition saved", editing.id, "Version " + v.version + " from " + fdate(v.effectiveFrom)); }
      else { editing = { id: "UD-" + seq("UD", 2), name: spec.name, base: spec.base, status: "active", versions: [v] }; db.definitions.push(editing); audit("Report definition saved", editing.id, "Version 1 from " + fdate(v.effectiveFrom)); }
      save(); draw(); toast(editing.id + " saved as version " + v.version); load(editing);
    });
    $("#def-inactivate").addEventListener("click", function () {
      var d = editing;
      ask({ title: "Inactivate " + d.id + "?", body: "It leaves the catalogue. The definition, its versions and earlier runs stay in the history.", ok: "Inactivate", danger: true, run: function () {
        var chk = Workflow.canReport(role(), "inactivate", d.status); if (!chk.ok) return chk;
        d.status = "retired"; audit("Report definition inactivated", d.id, "Retired; history kept"); save(); draw(); load(null); toast(d.id + " inactivated"); return { ok: true }; } });
    });
    draw(); load(null);
  };

  pages.reportDashboard = function () {
    var ms = db.memberships, n = function (s) { return ms.filter(function (m) { return s.indexOf(m.status) >= 0; }).length; };
    var soon = BUILD["MMS-RR-003"]({ days: "90" }).rows.length, jun = BUILD["MMS-RR-005"]({ months: "12" }).rows.length, joins = ms.filter(function (m) { return m.joinedDate.slice(0, 4) === TODAY.slice(0, 4); });
    var tiles = { activeMemberships: n(["active"]), expiring90: soon, juniors12: jun, joins2026: joins.length };
    $$("[data-dash]").forEach(function (el) { el.textContent = tiles[el.getAttribute("data-dash")]; });
    donutChart($("#d-status"), Object.keys(cfg.transitions).map(function (s) { return [LABEL[s], n([s])]; }).filter(function (d) { return d[1]; }));
    lineChart($("#d-joins"), monthly(joins.map(function (m) { return m.joinedDate; }), TODAY.slice(0, 4)));
    barChart($("#d-source"), tally(ms.filter(function (m) { return m.recruitmentSource; }), function (m) { return m.recruitmentSource; }).sort(function (a, b) { return b[1] - a[1]; }));
  };

  pages.legacy = function () {
    var q = $("#lq"), fd = $("#f-disp"), fi = $("#f-inv"), L = db.legacyReports, r = role();
    var disp = ["Approved requirement", "Finance-owned", "Source-module output", "Out of scope"], tone = { "Approved requirement": "success", "Finance-owned": "info", "Source-module output": "secondary", "Out of scope": "secondary" };
    $$("[data-disp]").forEach(function (el) { var k = el.getAttribute("data-disp"); el.textContent = L.filter(function (x) { return x.disposition === k; }).length; });
    fd.innerHTML = '<option value="">All dispositions</option>' + options(disp.map(function (d) { return [d, d]; }));
    fi.innerHTML = '<option value="">MMS and GMS</option>' + options([["MMS", "MMS"], ["GMS", "GMS"]]);
    function successor(x) {
      if (!x.successor) return esc(x.owner);
      var rp = report(x.successor);
      // (v03) a successor such as MMS-RR-009 is a capability of other reports, not a catalogue entry (the v02 finder failed on it before any search)
      if (!rp) return esc(x.successor) + ' <span class="text-muted">(capability of the catalogue reports)</span>';
      if (rp.plannedIn) return esc(x.successor) + ' <span class="badge badge-hold">Coming in ' + esc(rp.plannedIn) + "</span>";
      return Rules.bizRule031(db.accessRules, r, rp).ok ? '<a class="fw-bold" href="report.html?id=' + esc(x.successor) + '">' + esc(x.successor) + "</a> " + esc(rp.name) : esc(x.successor) + " " + esc(rp.name) + ' <span class="text-muted">(not for your role)</span>';
    }
    function draw() {
      var t = q.value.trim().toLowerCase(), list = L.filter(function (x) { return (!fd.value || x.disposition === fd.value) && (!fi.value || x.inventory === fi.value) && (!t || x.name.toLowerCase().indexOf(t) >= 0); });
      $("#l-count").textContent = list.length + " of " + L.length + " legacy names";
      rows($("#legacy tbody"), list.map(function (x) {
        return "<tr>" + td("Legacy report", "<strong>" + esc(x.name) + "</strong>") + td("Inventory", esc(x.inventory)) + td("Output", esc(x.outputType)) + td("Disposition", '<span class="badge text-' + tone[x.disposition] + "-emphasis bg-" + tone[x.disposition] + '-subtle">' + esc(x.disposition) + "</span>", "col-status") +
          td("Successor or owner", successor(x)) + td("Note", '<span class="text-muted">' + esc(x.note) + "</span>") + "</tr>";
      }).join(""), 6, "No legacy name matches.");
    }
    q.addEventListener("input", draw); fd.addEventListener("change", draw); fi.addEventListener("change", draw); q.form.addEventListener("submit", function (e) { e.preventDefault(); }); draw();
  };

  /* ---------- (v03) Golf (GMS): artifacts/diagrams/workflow-request-full-v08.md W15 – W21, rules BR-036 – BR-060, ported from the rapid v09 golf engine.
     Golfers are the existing persons and memberships: golf records hold IDs only and every name is read from Membership (D-284). ---------- */
  var G = cfg.golf, CLOCK = G.clock, NOW = TODAY + " " + CLOCK;
  var GLABEL = { confirmed: "Confirmed", checkedIn: "Checked in", played: "Played", cancelled: "Cancelled", noShow: "No-show", waiting: "Waiting", offered: "Offered", accepted: "Accepted",
    declined: "Declined", expired: "Expired", available: "Available", reserved: "Reserved", redeemed: "Redeemed", released: "Released", published: "Published", draft: "Draft",
    open: "Open", suspended: "Suspended", approved: "Approved", rejected: "Rejected", waived: "Waived", pending: "Pending", active: "Active" };
  var GTONE = { confirmed: "info", checkedIn: "success", accepted: "success", available: "success", open: "success", published: "success", approved: "success",
    offered: "warning", reserved: "info", waiting: "info", pending: "warning", draft: "warning", active: "warning",
    suspended: "danger", noShow: "danger", rejected: "danger", cancelled: "secondary", played: "secondary", expired: "secondary", declined: "secondary", redeemed: "secondary", released: "secondary", waived: "secondary" };
  var PLAY = { notTeedOff: "Not teed off", front9: "Front nine", atTurn: "At the turn", back9: "Back nine", finished: "Finished" };
  function gbadge(s) { var t = GTONE[s] || "secondary"; return '<span class="badge text-' + t + "-emphasis bg-" + t + '-subtle">' + esc(GLABEL[s] || s) + "</span>"; }
  function gstat(s) { return { t: GLABEL[s] || s, h: gbadge(s) }; }
  function gsum(list, f) { return list.reduce(function (a, x) { return a + f(x); }, 0); }
  function dayType(date) { return Rules.dayType(date, G.publicHolidays); }
  function golferOf(personId) { return db.golfers.filter(function (g) { return g.personId === personId; })[0]; }
  function guestOf(id) { return db.guests.filter(function (g) { return g.id === id; })[0]; }
  function profile(x) { return x.guestId && !x.personId ? guestOf(x.guestId) : golferOf(x.personId); }
  // A golfer's name always comes from Membership (persons) or the guest record
  function pname(x) { return x.guestId && !x.personId ? guestOf(x.guestId).name : person(x.personId).fullName; }
  function short(n) { return n.replace(/^(Member|Nominee|Guest|Junior|Corporate) /, ""); }
  function memberName(mid) { var m = mem(mid); return m ? holder(m) : "—"; }
  function gbooking(id) { return db.golfBookings.filter(function (b) { return b.id === id; })[0]; }
  function live(b) { return b.status !== "cancelled" && b.status !== "noShow"; }
  function at(course, date, time) { return db.golfBookings.filter(function (b) { return b.course === course && b.date === date && b.time === time && live(b); }); }
  function seatsFree(course, date, time) { return G.maxPlayers - gsum(at(course, date, time), function (b) { return b.players.length; }); }
  function sessionOf(time) { return time < "12:00" ? "AM" : "PM"; }
  function blockAt(course, date, time) { return db.courseBlocks.filter(function (k) { return k.status === "active" && k.course === course && k.date === date && k.session === sessionOf(time); })[0]; }
  function sheet(course, date) { return db.teeSheets.filter(function (t) { return t.course === course && t.date === date; })[0]; }
  function courseOf(code) { return db.courses.filter(function (c) { return c.code === code; })[0]; }
  function category(m) { return /-B$/.test(m.typeCode) ? "Basic member" : "Full member"; }
  function playerOf(m, holes) { return { kind: "member", membershipId: m.membershipId, personId: m.personId, category: category(m), holes: +holes, payer: m.membershipId, checkIn: null, playState: null }; }
  function guestPlayer(g, intro, holes) { return { kind: "guest", guestId: g.id, category: g.category, introducedBy: intro, holes: +holes, payer: intro, checkIn: null, playState: null }; }
  function can(action, state) { return Workflow.canGolf(role(), action, state); }
  function gaudit(action, ref, outcome) { db.audit.unshift({ id: "AU-" + seq("AU", 3), at: NOW, actor: user(), role: role(), action: action, ref: ref, outcome: outcome, before: null, after: null }); }
  // BR-058, BR-059: a charge with its rate, payer and Finance status, raised as a FIN-OPS financial event (GMS keeps no balance; v07, RC-147)
  function charge(b, x, type, amount, finance) {
    x = x || b.players[0];
    var c = { id: "CH-" + seq("CH", 4), bookingId: b.id, course: b.course, date: b.date, personId: x.personId || null, guestId: x.personId ? null : x.guestId || null, category: x.category,
      type: type, amount: amount, payer: x.payer || b.mainBooker, finance: finance || "accepted", financeRef: null };
    db.golfCharges.push(c);
    if (c.finance !== "pending" && amount > 0) c.financeRef = finOps("GMS", c.id, "GMS-CHARGE", c.payer, amount, { inHouse: !!mem(c.payer), note: "Golf " + type.toLowerCase() + " for " + pname(x) }).id;
    return c;
  }
  function memberOptions(value, blank) {
    return (blank ? '<option value="">' + esc(blank) + "</option>" : "") + options(db.memberships.filter(function (m) { return golferOf(m.personId); }).map(function (m) { return [m.membershipId, holder(m) + " (" + m.membershipId + ")"]; }), value);
  }
  function teeLink(b) { return '<a href="golf-booking.html?id=' + esc(b.id) + '">' + esc(b.course + " · " + fdate(b.date) + " · " + b.time) + "</a>"; }

  // Validates a new flight against BR-036 … BR-043 and BR-057; returns { ok, msg, full }
  function checkBooking(x) {
    var dt = dayType(x.date), sh = sheet(x.course, x.date), all = x.players, r;
    if (!sh || sh.status !== "published") return { ok: false, msg: "The " + x.course + " tee sheet for " + fdate(x.date) + " is not published yet (BR-036)." };
    if (courseOf(x.course).status !== "open") return { ok: false, msg: x.course + " is suspended (BR-052)." };
    var intro = person(mem(all[0].membershipId).personId);
    var checks = [Rules.bizRule057(blockAt(x.course, x.date, x.time)), Rules.bizRule037(x.date, x.time, x.channel, TODAY, CLOCK, G),
      Rules.bizRule042(all.filter(function (p) { return p.kind === "guest"; }).map(function (p) { return guestOf(p.guestId); }), Rules.age(intro.dateOfBirth, TODAY), x.course, x.date, x.time, G), Rules.bizRule039(all.length, dt, G)];
    all.filter(function (p) { return p.kind === "member"; }).forEach(function (p) { checks.push(Rules.bizRule040(mem(p.membershipId), short(pname(p)), cfg.privileges)); });
    checks.push(Rules.bizRule038(all.map(function (p) { return Object.assign({ name: short(pname(p)) }, p); }), x.date, db.golfBookings, db.waitlist), Rules.bizRule041(all, dt));
    all.forEach(function (p) { checks.push(Rules.bizRule043(profile(p), short(pname(p)), x.date, dt, x.time, G), Rules.bizRule036Holes(p.holes, dt, x.time, G)); });
    r = checks.filter(function (c) { return !c.ok; })[0];
    if (r) return r;
    return seatsFree(x.course, x.date, x.time) < all.length ? { ok: false, full: true, msg: "Only " + seatsFree(x.course, x.date, x.time) + " place(s) left at " + x.time + ": join the waitlist instead (BR-044)." } : { ok: true };
  }
  function createBooking(x) {
    var b = { id: "GB-" + seq("GB", 4), course: x.course, date: x.date, time: x.time, session: sessionOf(x.time), dayType: dayType(x.date), mainBooker: x.players[0].membershipId,
      players: x.players, channel: x.channel, bookedAt: NOW, status: "confirmed", amendments: [], cancelledAt: null, lateCancellation: false, rainCheckId: null };
    db.golfBookings.push(b); notify("GOLF_CONFIRMED", memberName(b.mainBooker), b.id);
    gaudit("Golf booking confirmed", b.id, x.course + " " + fdate(x.date) + " " + x.time + ", " + x.players.length + " golfers");
    return b;
  }
  // BR-044: released places at a tee time go to the waitlist before general availability
  function releaseCapacity(course, date, time) {
    var entries = db.waitlist.filter(function (w) { return w.course === course && w.date === date && w.time === time; });
    if (entries.some(function (w) { return w.status === "offered"; })) return null;
    var n = Rules.bizRule044(entries, seatsFree(course, date, time));
    n.skipped.forEach(function (w) { w.note = "Skipped " + fdate(NOW) + ": party of " + w.party + " does not fit"; });
    if (!n.offer) return null;
    n.offer.status = "offered"; n.offer.offer = { at: NOW, result: null, minutes: null }; n.offer.note = null;
    notify("WAITLIST_OFFER", memberName(n.offer.mainBooker), n.offer.id); gaudit("Waitlist offer", n.offer.id, course + " " + fdate(date) + " " + time + " held " + G.offerMinutes + " min");
    return n.offer;
  }
  function freeTimes(course, date) { return Rules.bizRule036(G).map(function (t) { return t.time; }).filter(function (t) { return seatsFree(course, date, t) === G.maxPlayers && !blockAt(course, date, t); }); }

  function golfPlayerPicker(prefix, mainValue, mainFixed) {
    var html = '<div class="field"><label class="form-label required" for="' + prefix + '-main">Main booker</label><select class="form-select" id="' + prefix + '-main" name="main"' + (mainFixed ? " disabled" : "") + ">" + memberOptions(mainValue, "Choose a member") + "</select></div>";
    for (var i = 1; i <= 3; i++) html += '<div class="field"><label class="form-label" for="' + prefix + "-m" + i + '">Member golfer ' + (i + 1) + '</label><select class="form-select" id="' + prefix + "-m" + i + '" name="m' + i + '">' + memberOptions("", "None") + "</select></div>";
    html += '<fieldset class="field field--full"><legend class="form-label">Guests (introduced by the main booker)</legend><div class="grid">' + db.guests.map(function (g) {
      return '<div class="form-check"><input class="form-check-input" type="checkbox" id="' + prefix + "-g-" + g.id + '" value="' + g.id + '" data-guest><label class="form-check-label" for="' + prefix + "-g-" + g.id + '">' + esc(g.name) + " · " + esc(g.category) + "</label></div>";
    }).join("") + "</div></fieldset>";
    html += '<div class="field"><label class="form-label" for="' + prefix + '-holes">Holes</label><select class="form-select" id="' + prefix + '-holes" name="holes"><option value="18">18 holes</option><option value="9">9 holes</option></select></div>';
    return html;
  }
  function pickedPlayers(form, mainId) {
    var holes = form.elements.holes.value, main = mainId || form.elements.main.value, out = [];
    if (!main) return out;
    out.push(playerOf(mem(main), holes));
    [1, 2, 3].forEach(function (i) { var v = form.elements["m" + i].value; if (v && v !== main && !out.some(function (p) { return p.membershipId === v; })) out.push(playerOf(mem(v), holes)); });
    $$("[data-guest]:checked", form).forEach(function (c) { out.push(guestPlayer(guestOf(c.value), main, holes)); });
    return out;
  }
  function newBooking(portal, acct) {
    var f = $(portal ? "#tee-form" : "#gb-form");
    if (!portal) { $("#gb-existing").hidden = true; $("#pg-title").textContent = "New golf booking"; }
    f.elements.course.value = qs("course") || "Changi"; f.elements.date.value = qs("date") || (portal ? Rules.addDays(TODAY, 6) : TODAY);
    $("[data-players]", f).innerHTML = golfPlayerPicker(portal ? "pt" : "gb", portal ? acct : "", portal);
    f.elements.time.innerHTML = options(Rules.bizRule036(G).map(function (t) { return [t.time, t.time]; }), qs("time") || "12:48");
    var errEl = $(portal ? "#tee-err" : "#gb-form-err"), wlBtn = $(portal ? "#tee-wl" : "#gb-wl"), pending = null;
    function input() { return { course: f.elements.course.value, date: f.elements.date.value, time: f.elements.time.value, channel: portal ? "Portal" : "Counter", players: pickedPlayers(f, portal ? acct : null) }; }
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = can("book", "none"); if (!ok.ok) return showError(errEl, ok.msg);
      var x = input(); if (!x.players.length) return showError(errEl, "Choose the main booker.");
      var r = checkBooking(x); showError(errEl, r.ok ? "" : r.msg); wlBtn.hidden = !r.full; pending = r.full ? x : null;
      if (!r.ok) return;
      var b = createBooking(x); save();
      go(portal ? "portal.html#portal-golf-section" : "golf-booking.html?id=" + b.id, "Booking " + b.id + " confirmed: " + b.course + " " + fdate(b.date) + " " + b.time);
    });
    wlBtn.addEventListener("click", function () {
      var x = pending; if (!x) return;
      var ok = can("join", "none"); if (!ok.ok) return showError(errEl, ok.msg);
      var w = { id: "WL-" + seq("WL", 2), course: x.course, date: x.date, time: x.time, party: x.players.length, mainBooker: x.players[0].membershipId,
        players: x.players.map(function (p) { return p.personId; }).filter(Boolean), joinedAt: NOW, status: "waiting", offer: null };
      db.waitlist.push(w); gaudit("Waitlist joined", w.id, x.course + " " + fdate(x.date) + " " + x.time + ", party of " + w.party); save();
      go(portal ? "portal.html#portal-golf-section" : "golf-waitlist.html", w.id + " joined the waitlist; offers go first come, first served (BR-044)");
    });
  }
  // Waitlist actions shared by the Waitlist page and the Portal (BR-044)
  function waitlistAct(w, a) {
    var ok = can(a, w.status); if (!ok.ok) return ok;
    if (a === "accept") {
      var players = w.players.map(function (pid) { return playerOf(db.memberships.filter(function (m) { return m.personId === pid; })[0], 18); });
      players = players.filter(function (p) { return p.membershipId === w.mainBooker; }).concat(players.filter(function (p) { return p.membershipId !== w.mainBooker; }));
      var bad = players.map(function (p) { return Rules.bizRule040(mem(p.membershipId), short(pname(p)), cfg.privileges); })
        .concat([Rules.bizRule038(players.map(function (p) { return Object.assign({ name: short(pname(p)) }, p); }), w.date, db.golfBookings, db.waitlist, w.id)]).filter(function (r) { return !r.ok; })[0];
      if (bad) return { ok: false, msg: bad.msg + " The offer cannot be accepted (BR-044)." };
      if (seatsFree(w.course, w.date, w.time) < w.party) return { ok: false, msg: "The places are no longer free." };
      w.status = "accepted"; w.offer.result = "accepted"; w.offer.minutes = 6;
      var b = createBooking({ course: w.course, date: w.date, time: w.time, channel: role() === "member" ? "Portal" : "Counter", players: players });
      gaudit("Waitlist accept", w.id, b.id); return { ok: true, msg: w.id + " accepted: booking " + b.id + " confirmed" };
    }
    if (a === "cancelEntry") { w.status = "cancelled"; gaudit("Waitlist entry cancelled", w.id, ""); return { ok: true, msg: w.id + " cancelled" }; }
    w.status = a === "expire" ? "expired" : "declined"; w.offer.result = w.status; w.offer.minutes = a === "expire" ? G.offerMinutes : 4;
    gaudit("Waitlist " + w.status, w.id, w.course + " " + fdate(w.date) + " " + w.time);
    var o = releaseCapacity(w.course, w.date, w.time);
    return { ok: true, msg: w.id + " " + w.status + (o ? "; offered to " + o.id + " (BR-044)" : "; no fitting entry left: the places return to general booking") };
  }

  pages.golfTeesheet = function () {
    var fc = $("#ts-course"), fd = $("#ts-date");
    fc.value = qs("course") || "Changi"; fd.value = qs("date") || TODAY;
    function reload() { go("golf-teesheet.html?course=" + fc.value + "&date=" + fd.value); }
    fc.addEventListener("change", reload); fd.addEventListener("change", reload);
    var c = fc.value, dte = fd.value, sh = sheet(c, dte), crs = courseOf(c), ops = role() === "golfops";
    $("#pg-title").textContent = c + " tee sheet · " + fdate(dte) + " · " + dayType(dte);
    $("#ts-status").innerHTML = "Tee sheet " + (sh ? gbadge(sh.status) : gbadge("draft")) + " · Course " + gbadge(crs.status);
    var times = Rules.bizRule036(G), booked = 0, golfers = 0, blocked = 0, bySession = { AM: 0, PM: 0 };
    times.forEach(function (t) { var bs = at(c, dte, t.time); if (blockAt(c, dte, t.time)) blocked++; if (bs.length) booked++; var n = gsum(bs, function (b) { return b.players.length; }); golfers += n; bySession[t.session] += n; });
    var waiting = db.waitlist.filter(function (w) { return w.course === c && w.date === dte && (w.status === "waiting" || w.status === "offered"); }).length;
    $("#ts-kpis").innerHTML = kpiTiles([["Tee times", times.length, "Every " + G.intervalMinutes + " minutes"], ["Booked", booked, golfers + " golfers"], ["Blocked", blocked, "Not bookable (BR-057)"], ["Waiting", waiting, "Waitlist entries"]]);
    barChart($("#ts-chart"), [["Morning", bySession.AM], ["Afternoon", bySession.PM]]);
    var blocks = db.courseBlocks.filter(function (k) { return k.course === c && k.date === dte; });
    rows($("#ts-blocks tbody"), blocks.map(function (k) {
      return "<tr>" + td("Block", esc(k.id)) + td("Session", esc(k.session === "AM" ? "Morning" : "Afternoon")) + td("Purpose", esc(k.purpose)) + td("Reason", esc(k.reason)) + td("Source", '<span class="text-muted">' + esc(k.source) + "</span>") + td("Status", gbadge(k.status), "col-status") +
        td("Actions", k.status === "active" && ops ? '<button type="button" class="btn btn-sm btn-outline-secondary" data-release="' + k.id + '">Release</button>' : "—", "col-actions") + "</tr>";
    }).join(""), 7, "No blocks on this day.");
    $$("[data-release]").forEach(function (bt) {
      bt.addEventListener("click", function () {
        var k = db.courseBlocks.filter(function (x) { return x.id === bt.getAttribute("data-release"); })[0], offers = [], ok = can("release", "blocked");
        if (!ok.ok) return toast(ok.msg, "danger");
        k.status = "released"; gaudit("Tee block released", k.id, k.course + " " + fdate(k.date) + " " + k.session);
        db.waitlist.filter(function (w) { return w.course === k.course && w.date === k.date && sessionOf(w.time) === k.session && w.status === "waiting"; }).forEach(function (w) { var o = releaseCapacity(w.course, w.date, w.time); if (o) offers.push(o.id); });
        save(); go(location.pathname.split("/").pop() + location.search, k.id + " released" + (offers.length ? "; offered first to the waitlist: " + offers.join(", ") : "") + " (BR-044, BR-057)");
      });
    });
    var bf = $("#block-form");
    if (bf) {
      bf.elements.purpose.innerHTML = '<option value="">Choose a purpose</option>' + options(G.blockPurposes.map(function (p) { return [p, p]; }));
      bf.addEventListener("submit", function (e) {
        e.preventDefault();
        var s = bf.elements.session.value, inside = db.golfBookings.filter(function (b) { return b.course === c && b.date === dte && b.session === s && b.status === "confirmed"; });
        var x = can("block", "open"); if (x.ok) x = Rules.bizRule057Block(inside, bf.elements.purpose.value, bf.elements.source.value);
        showError($("#block-err"), x.ok ? "" : x.msg); if (!x.ok) return;
        var k = { id: "BLK-" + seq("BLK", 2), course: c, date: dte, session: s, purpose: bf.elements.purpose.value, reason: bf.elements.reason.value.trim() || bf.elements.purpose.value, source: bf.elements.source.value.trim(), status: "active", by: user(), at: NOW };
        db.courseBlocks.push(k); gaudit("Tee block created", k.id, c + " " + fdate(dte) + " " + s + ": " + k.purpose); save();
        go(location.pathname.split("/").pop() + location.search, k.id + ": " + c + " " + (s === "AM" ? "morning" : "afternoon") + " blocked for " + k.purpose + " (BR-057)");
      });
    }
    ["AM", "PM"].forEach(function (s) {
      rows($("#ts-" + s.toLowerCase() + " tbody"), times.filter(function (t) { return t.session === s; }).map(function (t) {
        var bs = at(c, dte, t.time), k = blockAt(c, dte, t.time), free = G.maxPlayers - gsum(bs, function (b) { return b.players.length; });
        var who = bs.map(function (b) { return '<a href="golf-booking.html?id=' + b.id + '">' + esc(b.players.map(function (x) { return short(pname(x)) + (x.guestId && !x.personId ? " (guest)" : ""); }).join(", ")) + "</a>"; }).join("<br>");
        var state = k ? '<span class="badge badge-hold">Blocked: ' + esc(k.purpose) + "</span>" : bs.length ? bs.map(function (b) { return gbadge(b.status); }).join(" ") : '<span class="text-muted">Free</span>';
        var act = ops && !k && free > 0 && sh && sh.status === "published" ? '<a class="slot-chip" href="golf-booking.html?course=' + c + "&date=" + dte + "&time=" + t.time + '">Book</a>' : "—";
        return "<tr>" + td("Tee time", "<strong>" + esc(t.time) + "</strong>", "num") + td("Flight", who || "—") + td("Holes", bs.length ? esc(bs[0].players.map(function (x) { return x.holes; }).join(" / ")) : "—") + td("Places free", String(free), "num") + td("Status", state, "col-status") + td("Actions", act, "col-actions") + "</tr>";
      }).join(""), 6);
    });
  };

  pages.golfBooking = function () {
    var b = qs("id") && gbooking(qs("id")), ops = role() === "golfops";
    // an ID that matches no booking says so, never falls through to a new booking (G-1, D-296)
    if (qs("id") && !b) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">Unknown booking ' + esc(qs("id")) + '.</p><p><a href="golf-teesheet.html">Back to the tee sheet</a></p></div>'; return; }
    if (!b) { if (!ops) { $("#gb-new").hidden = true; $("#gb-existing").hidden = true; $("#gb-sub").textContent = "Open a booking from the tee sheet."; return; } return newBooking(false); }
    $("#gb-new").hidden = true;
    $("#pg-title").textContent = b.course + " · " + fdate(b.date) + " · " + b.time;
    $("#gb-sub").innerHTML = gbadge(b.status) + " <span>" + esc(b.id) + " · " + esc(b.dayType) + " · booked " + esc(fdate(b.bookedAt)) + " by " + esc(b.channel) + "</span>";
    $("#gb-facts").innerHTML = facts([["Main booker", memberLink(b.mainBooker) + " " + esc(memberName(b.mainBooker)), true], ["Session", b.session === "AM" ? "Morning" : "Afternoon"], ["Golfers", String(b.players.length)], ["Rain check applied", b.rainCheckId || "—"]]);
    var checking = b.status === "confirmed" && ops;
    rows($("#gb-players tbody"), b.players.map(function (x, i) {
      var pr = profile(x) || {}, ins = pr.insurance === "annual" ? "Annual cover" : pr.insurance === "existing" ? "Existing cover" : "None on file", nm = pname(x);
      var cat = x.guestId && !x.personId ? Rules.bizRule050(pr, G) : x.category;
      var ctl = checking ? '<div class="stack"><div class="form-check"><input class="form-check-input" type="checkbox" id="di-' + i + '" data-dayins="' + i + '"' + (pr.insurance === "annual" ? " disabled" : "") + '><label class="form-check-label" for="di-' + i + '">Day insurance ' + money(G.fees.dayInsurance) + '</label></div><label class="visually-hidden" for="ho-' + i + '">Holes for ' + esc(nm) + '</label><select class="form-select form-select-sm" id="ho-' + i + '" data-holes="' + i + '"><option value="18"' + (x.holes === 18 ? " selected" : "") + '>18 holes</option><option value="9"' + (x.holes === 9 ? " selected" : "") + ">9 holes</option></select></div>" : (x.checkIn ? "Checked in " + esc(x.checkIn.at) : "—");
      return "<tr>" + td("Golfer", esc(nm) + (x.membershipId ? " · " + memberLink(x.membershipId) : ' <span class="badge bg-secondary-subtle text-secondary-emphasis">Guest</span>')) + td("Category", esc(cat) + (cat !== x.category ? ' <span class="text-muted">(no proof, BR-050)</span>' : "")) +
        td("HI / PC", pr.hi != null ? "HI " + pr.hi : pr.pc ? "CC-Demo PC" : "—") + td("Insurance", esc(ins)) + td("Payer", memberLink(x.payer)) + td("Check-in", ctl) + "</tr>";
    }).join(""), 6);
    var mine = db.golfCharges.filter(function (c) { return c.bookingId === b.id; });
    rows($("#gb-charges tbody"), mine.map(function (c) {
      return "<tr>" + td("Charge", esc(c.id)) + td("Golfer", esc(pname(c))) + td("Type", esc(c.type)) + td("Amount", money(c.amount), "num") + td("Payer", memberLink(c.payer)) + td("Finance", gbadge(c.finance) + " " + finRef(c.financeRef), "col-status") +
        td("Actions", c.finance === "pending" && ops && c.amount > 0 ? '<button type="button" class="btn btn-sm btn-outline-secondary" data-pay="' + c.id + '">Record payment</button>' : "—", "col-actions") + "</tr>";
    }).join(""), 7, "No charges yet.");
    $("#gb-charges").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-pay"); if (!id) return;
      var c = mine.filter(function (x) { return x.id === id; })[0], ok = can("recordPayment", c.finance); if (!ok.ok) return toast(ok.msg, "danger");
      var fe = finOps("GMS", c.id, "GMS-CHARGE", c.payer, c.amount, { note: "Golf " + c.type.toLowerCase() + " paid at the counter" }); c.financeRef = fe.id; c.finance = fe.status === "posted" ? "accepted" : "pending";
      gaudit("Golf payment recorded", c.id, money(c.amount) + " → " + fe.id); save(); go("golf-booking.html?id=" + b.id, c.id + " paid: FIN-OPS " + fe.id + " " + (fe.status === "posted" ? "posted" : fe.status));
    });
    rows($("#gb-approvals tbody"), db.golfApprovals.filter(function (a) { return a.ref === b.id || mine.some(function (c) { return c.id === a.ref; }); }).map(function (a) {
      return "<tr>" + td("Approval", esc(a.id)) + td("Kind", esc(a.kind)) + td("Reason", esc(a.reason)) + td("Requested by", esc(a.requestedBy)) + td("Status", gbadge(a.status), "col-status") + td("Decided by", esc(a.decidedBy || "—")) + "</tr>";
    }).join(""), 6, "No waiver or exception requests.");
    var waivable = mine.filter(function (c) { return c.finance !== "waived" && /cancellation|No-show|Substitution|Course change/.test(c.type) && !db.golfApprovals.some(function (a) { return a.ref === c.id && a.status === "pending"; }); });
    $("#gb-amend").hidden = $("#gb-checkin").hidden = !checking;
    $("#gb-waiver").hidden = !ops || !waivable.length;
    var self = "golf-booking.html?id=" + b.id;
    function bad(list) { var x = list.filter(function (r) { return !r.ok; }); return x.length ? x : null; }

    // Check-in and release to play (BR-040, BR-043, BR-048 … BR-050, BR-058, BR-059)
    $("#gb-checkin-btn").addEventListener("click", function () {
      var dt = b.dayType, errs = [can("checkIn", b.status), Rules.bizRule048(b.time, CLOCK, G)];
      if (courseOf(b.course).status !== "open") errs.push({ ok: false, msg: b.course + " is suspended (BR-052)." });
      b.players.forEach(function (x, i) {
        var pr = profile(x) || {}, nm = short(pname(x));
        if (x.kind === "member") errs.push(Rules.bizRule040(mem(x.membershipId), nm, cfg.privileges));
        errs.push(Rules.bizRule043(pr, nm, b.date, dt, b.time, G), Rules.bizRule049(pr.insurance, $("#di-" + i).checked, nm), Rules.bizRule036Holes($("#ho-" + i).value, dt, b.time, G));
      });
      var e = bad(errs);
      if (e) return showError($("#gb-err"), e.map(function (r) { return r.msg; }).join(" "));
      var fin = Rules.bizRule059(db.finance.available);
      b.players.forEach(function (x, i) {
        var pr = profile(x), cat = x.guestId && !x.personId ? Rules.bizRule050(pr, G) : x.category;
        x.holes = +$("#ho-" + i).value;
        charge(b, Object.assign({}, x, { category: cat }), "Green fee" + (cat !== x.category ? " (sign-in rate)" : ""), Rules.bizRule058(G, b.course, cat, x.holes), fin.status);
        charge(b, x, "Buggy", G.buggy[x.holes === 9 ? 1 : 0], fin.status);
        if ($("#di-" + i).checked) charge(b, x, "Day insurance", G.fees.dayInsurance, fin.status);
      });
      if (!fin.ok) { save(); return showError($("#gb-err"), fin.msg); }
      b.players.forEach(function (x, i) { x.checkIn = { at: CLOCK, insurance: $("#di-" + i).checked ? "day" : "annual", holesDeclared: true, by: user() }; x.playState = "notTeedOff"; });
      b.status = "checkedIn"; gaudit("Golf check-in", b.id, b.players.length + " golfers released to play");
      publish("Access Control", "Golfers released to play: " + b.course + " " + b.time, b.id);
      save(); go(self, "Flight checked in and released to play; charges raised in FIN-OPS");
    });
    // Late arrival (BR-051)
    $("#gb-late-btn").addEventListener("click", function () {
      var ok = can("late", b.status); if (!ok.ok) return showError($("#gb-err"), ok.msg);
      var r = Rules.bizRule051(b.time, freeTimes(b.course, b.date), G);
      if (r.option === "reschedule") {
        b.amendments.push({ at: NOW, kind: "Late arrival", detail: b.time + " → " + r.time, by: user() }); var old = b.time; b.time = r.time; b.session = sessionOf(r.time);
        gaudit("Late arrival rescheduled", b.id, old + " → " + r.time); save(); return go(self, "Late arrival: rescheduled to " + r.time + " (BR-051)");
      }
      $("#gb-late-choice").hidden = false;
      showError($("#gb-err"), "No tee time is free within " + G.rescheduleWithinMinutes + " minutes (BR-051). Join by skipping holes if Golf Operations permits it, or mark a no-show.");
    });
    $("#gb-join-btn").addEventListener("click", function () { b.amendments.push({ at: NOW, kind: "Late arrival", detail: "Joined by skipping holes", by: user() }); gaudit("Late arrival joined", b.id, "skipping holes"); save(); go(self, "Golfer joins by skipping holes (BR-051)"); });
    $("#gb-noshow-btn").addEventListener("click", function () {
      var ok = can("noShow", b.status); if (!ok.ok) return showError($("#gb-err"), ok.msg);
      var x = b.players[0], amt = Rules.bizRule058(G, b.course, x.category, 18); b.status = "noShow"; charge(b, x, "No-show charge", amt, "pending");
      gaudit("No-show", b.id, "No-show charge on " + b.mainBooker); notify("GOLF_NOSHOW", memberName(b.mainBooker), b.id);
      releaseCapacity(b.course, b.date, b.time); save(); go(self, "No-show recorded; charge " + money(amt) + " on " + b.mainBooker + " (BR-051)");
    });
    // Amend: substitution and course change (BR-045)
    var af = $("#amend-form");
    af.elements.out.innerHTML = options(b.players.filter(function (x) { return x.kind === "member"; }).map(function (x) { return [x.membershipId, short(pname(x))]; }));
    af.elements.inn.innerHTML = memberOptions("", "Choose the replacement");
    $("#sub-btn").addEventListener("click", function () {
      var out = af.elements.out.value, inn = af.elements.inn.value, ok = can("substitute", b.status);
      if (!ok.ok) return showError($("#amend-err"), ok.msg);
      if (!inn) return showError($("#amend-err"), "Choose the replacement member.");
      var old = b.players.filter(function (x) { return x.membershipId === out; })[0], np = playerOf(mem(inn), old.holes), nn = short(pname(np));
      var e = bad([Rules.bizRule040(mem(inn), nn, cfg.privileges), Rules.bizRule043(golferOf(np.personId), nn, b.date, b.dayType, b.time, G), Rules.bizRule038([Object.assign({ name: nn }, np)], b.date, db.golfBookings, db.waitlist)]);
      if (e) return showError($("#amend-err"), e[0].msg);
      b.players[b.players.indexOf(old)] = np; if (b.mainBooker === out) { b.mainBooker = inn; np.payer = inn; }
      b.amendments.push({ at: NOW, kind: "Substitution", detail: short(pname(old)) + " → " + nn, by: user() });
      charge(b, Object.assign({}, b.players[0], { payer: b.mainBooker }), "Substitution fee", G.fees.substitution); gaudit("Player substituted", b.id, short(pname(old)) + " → " + nn); save();
      go(self, "Substituted; fee " + money(G.fees.substitution) + " on " + b.mainBooker + " (BR-045)");
    });
    $("#move-btn").addEventListener("click", function () {
      var to = b.course === "Changi" ? "Kranji" : "Changi", sh = sheet(to, b.date), x = can("changeCourse", b.status);
      if (x.ok) x = sh && sh.status === "published" ? Rules.bizRule045(seatsFree(to, b.date, b.time), b.players.length, blockAt(to, b.date, b.time)) : { ok: false, msg: to + " tee sheet is not published (BR-036)." };
      if (!x.ok) return showError($("#amend-err"), x.msg);
      var from = b.course; b.course = to; b.amendments.push({ at: NOW, kind: "Course change", detail: from + " → " + to, by: user() });
      charge(b, Object.assign({}, b.players[0], { payer: b.mainBooker }), "Course change fee", G.fees.courseChange); gaudit("Course changed", b.id, from + " → " + to);
      var o = releaseCapacity(from, b.date, b.time); save(); go(self, "Moved to " + to + "; fee " + money(G.fees.courseChange) + (o ? "; " + from + " " + b.time + " offered to " + o.id : "") + " (BR-045)");
    });
    $("#cancel-btn").addEventListener("click", function () { cancelBooking(b, self); });
    // Rain check (BR-054, BR-055)
    var rcs = db.rainChecks.filter(function (r) { return b.players.some(function (x) { return x.personId === r.personId; }) && r.status === "available"; });
    $("#gb-rc").hidden = !rcs.length || !checking || !!b.rainCheckId;
    $("#rc-pick").innerHTML = options(rcs.map(function (r) { return [r.id, r.id + " · " + short(person(r.personId).fullName) + " · 9 holes to " + fdate(r.expiry)]; }));
    $("#rc-btn").addEventListener("click", function () {
      var r = db.rainChecks.filter(function (x) { return x.id === $("#rc-pick").value; })[0], x = b.players.filter(function (p) { return p.personId === r.personId; })[0];
      var ok = can("applyRainCheck", b.status); if (ok.ok) ok = Rules.bizRule054Usable(r, x.personId, b.date); if (!ok.ok) return toast(ok.msg, "danger");
      var top = x.holes === 18 ? Rules.bizRule055(Rules.bizRule058(G, b.course, x.category, 18), Rules.bizRule058(G, b.course, x.category, 9)) : 0;
      r.status = "reserved"; r.bookingId = b.id; b.rainCheckId = r.id; if (top) charge(b, x, "Rain-check top-up", top);
      gaudit("Rain check applied", r.id, b.id + (top ? ", top-up " + money(top) : "")); save(); go(self, r.id + " applied; top-up " + money(top) + " only, no cash refund (BR-055)");
    });
    // Waiver request (BR-047)
    var wf = $("#waiver-form");
    wf.elements.charge.innerHTML = options(waivable.map(function (c) { return [c.id, c.type + " " + money(c.amount) + " (" + c.payer + ")"]; }));
    wf.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = can("requestWaiver", b.status); if (!ok.ok) return showError($("#waiver-err"), ok.msg);
      if (!wf.elements.reason.value.trim()) return showError($("#waiver-err"), "Give the reason and evidence (BR-047).");
      var c = waivable.filter(function (x) { return x.id === wf.elements.charge.value; })[0];
      db.golfApprovals.push({ id: "GA-" + seq("GA", 2), kind: c.type + " waiver", ref: c.id, amount: c.amount, reason: wf.elements.reason.value.trim(), requestedBy: user(), at: NOW, status: "pending", decidedBy: null, decidedAt: null });
      gaudit("Golf waiver requested", c.id, wf.elements.reason.value.trim()); save(); go(self, "Waiver request sent to the Golf Manager (BR-047)");
    });
  };
  // BR-046: cancel with the 72-hour rule; the place goes to the waitlist first (BR-044)
  function cancelBooking(b, back) {
    var lc = Rules.bizRule046(b.date, b.time, TODAY, CLOCK, G);
    ask({ title: "Cancel " + b.id + "?", body: "Notice is " + lc.hours + " hours: " + (lc.late ? "the late-cancellation charge of " + money(Rules.bizRule058(G, b.course, b.players[0].category, 18)) + " applies on " + b.mainBooker + " (BR-046)." : "no charge (BR-046)."), ok: "Cancel booking", danger: true, run: function () {
      var ok = can("cancel", b.status); if (!ok.ok) return ok;
      b.status = "cancelled"; b.cancelledAt = NOW; b.lateCancellation = lc.late;
      if (lc.late) charge(b, Object.assign({}, b.players[0], { payer: b.mainBooker }), "Late cancellation", Rules.bizRule058(G, b.course, b.players[0].category, 18));
      gaudit("Golf booking cancelled", b.id, lc.late ? "late (" + lc.hours + " h)" : "on time (" + lc.hours + " h)"); notify("GOLF_CANCELLED", memberName(b.mainBooker), b.id);
      var o = releaseCapacity(b.course, b.date, b.time); save();
      go(back, "Cancelled" + (lc.late ? " with a late-cancellation charge on " + b.mainBooker + " (BR-046)" : ", no charge (BR-046)") + (o ? "; place offered to " + o.id + " (BR-044)" : ""));
      return { ok: true };
    } });
  }

  pages.golfWaitlist = function () {
    var list = db.waitlist.slice().sort(function (a, b) { return (a.date + a.time + a.joinedAt) < (b.date + b.time + b.joinedAt) ? -1 : 1; });
    rows($("#wl tbody"), list.map(function (w) {
      var act = w.status === "offered" ? '<div class="cluster"><button type="button" class="btn btn-sm btn-outline-secondary" data-wl="expire" data-id="' + w.id + '">Let offer expire</button><button type="button" class="btn btn-sm btn-outline-secondary" data-wl="decline" data-id="' + w.id + '">Decline</button><button type="button" class="btn btn-sm btn-primary" data-wl="accept" data-id="' + w.id + '">Accept</button></div>'
        : w.status === "waiting" ? '<button type="button" class="btn btn-sm btn-outline-secondary" data-wl="cancelEntry" data-id="' + w.id + '">Cancel entry</button>' : "—";
      var hold = w.status === "offered" && w.offer ? '<br><span class="text-muted">Held ' + G.offerMinutes + " min from " + esc(w.offer.at.slice(11)) + "</span>" : "";
      return "<tr>" + td("Tee time", esc(w.course + " · " + fdate(w.date) + " · " + w.time)) + td("Entry", esc(w.id)) + td("Main booker", memberLink(w.mainBooker) + " " + esc(short(memberName(w.mainBooker)))) + td("Party", String(w.party), "num") + td("Joined", esc(fdate(w.joinedAt)), "num") +
        td("Status", gbadge(w.status) + hold + (w.note ? '<br><span class="text-muted">' + esc(w.note) + "</span>" : ""), "col-status") + td("Actions", act, "col-actions") + "</tr>";
    }).join(""), 7, "Nobody is waiting.");
    $("#wl").addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-wl"); if (!a) return;
      var r = waitlistAct(db.waitlist.filter(function (x) { return x.id === e.target.getAttribute("data-id"); })[0], a);
      if (!r.ok) return toast(r.msg, "danger");
      save(); go("golf-waitlist.html", r.msg);
    });
  };

  pages.golfCourse = function () {
    var today = db.golfBookings.filter(function (b) { return b.date === TODAY; }), mgr = role() === "manager";
    $("#cc-courses").innerHTML = db.courses.map(function (c) {
      var btn = !mgr ? "" : c.status === "open" ? '<button type="button" class="btn btn-outline-danger" data-course="suspend" data-code="' + c.code + '">Suspend</button>' : '<button type="button" class="btn btn-primary" data-course="reopen" data-code="' + c.code + '">Reopen</button>';
      return '<article class="card card-body stack"><h3 class="h5">' + esc(c.name) + "</h3><p>" + gbadge(c.status) + (c.statusBy ? ' <span class="text-muted">by ' + esc(c.statusBy) + " at " + esc(c.statusAt.slice(11)) + (c.reason ? ": " + esc(c.reason) : "") + "</span>" : "") + "</p>" +
        (btn ? '<div class="btn-row btn-row--start">' + btn + "</div>" : '<p class="text-muted">Only the Golf Manager, Club Captain or an approved executive suspends or reopens a course (BR-052).</p>') + "</article>";
    }).join("");
    rows($("#cc-oncourse tbody"), today.filter(function (b) { return b.status === "checkedIn" || (b.lastOutcome && b.status !== "confirmed"); }).map(function (b) {
      return b.players.map(function (x) {
        return "<tr>" + td("Course", esc(b.course)) + td("Tee time", esc(b.time), "num") + td("Golfer", esc(short(pname(x)))) + td("Holes", String(x.holes), "num") + td("Play state", esc(PLAY[x.playState] || "—")) + td("Outcome", esc(x.outcome || "—")) + "</tr>";
      }).join("");
    }).join(""), 6, "Nobody is on the course.");
    $("#cc-courses").addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-course"); if (!a) return;
      var c = courseOf(e.target.getAttribute("data-code")), ok = Rules.bizRule052(mgr); if (ok.ok) ok = can(a, c.status);
      if (!ok.ok) return toast(ok.msg, "danger");
      if (a === "reopen") { c.status = "open"; c.statusBy = user(); c.statusAt = NOW; c.reason = null; gaudit("Course reopened", c.code, "Play may resume"); save(); return go("golf-course.html", c.code + " reopened: play resumes on the official signal (BR-052)"); }
      ask({ title: "Suspend " + c.code + "?", body: "Golfers who had not teed off get the refund path; golfers who qualify get a 9-hole rain check valid " + G.rainCheckMonths + " month (BR-053, BR-054).", reason: "Reason (for example Lightning)", ok: "Suspend course", danger: true, run: function (why) {
        if (!why) return { ok: false, msg: "Give the reason (BR-052)." };
        c.status = "suspended"; c.statusBy = user(); c.statusAt = NOW; c.reason = why; var rc = 0, refunds = 0;
        today.filter(function (b) { return b.course === c.code && b.status === "checkedIn"; }).forEach(function (b) {
          b.lastOutcome = true;
          b.players.forEach(function (x) {
            var o = Rules.bizRule053(x.playState, x.holes);
            if (o === "rainCheck" && x.personId) {
              var r = { id: "RCK-" + seq("RCK", 4), personId: x.personId, holes: 9, issued: TODAY, expiry: Rules.bizRule054(TODAY, G), source: c.code + " " + fdate(TODAY) + ", " + why, status: "available", extension: null, bookingId: null };
              db.rainChecks.push(r); x.outcome = "9-hole rain check " + r.id + " to " + fdate(r.expiry); rc++; notify("RAIN_CHECK", pname(x), r.id);
            } else if (o === "refund") {
              var paid = db.golfCharges.filter(function (ch) { return ch.bookingId === b.id && (ch.personId || ch.guestId) === (x.personId || x.guestId) && (/^Green fee/.test(ch.type) || ch.type === "Buggy"); });
              charge(b, x, "Refund before tee-off", -gsum(paid, function (ch) { return ch.amount; }), "pending"); x.outcome = "Refund path (not teed off)"; refunds++;
            } else x.outcome = "No rain check (round finished)";
          });
          b.status = b.players.every(function (x) { return x.playState === "notTeedOff"; }) ? "cancelled" : "played";
        });
        gaudit("Course suspended", c.code, why + ": " + rc + " rain checks, " + refunds + " refunds"); publish("Access Control", c.code + " suspended: " + why, c.code);
        save(); go("golf-course.html", c.code + " suspended: " + rc + " rain checks issued, " + refunds + " refunds started (BR-052, BR-053)"); return { ok: true };
      } });
    });
    rows($("#cc-rc tbody"), db.rainChecks.slice().reverse().map(function (r) {
      var asked = db.golfApprovals.some(function (a) { return a.ref === r.id && a.status === "pending"; });
      return "<tr>" + td("Rain check", esc(r.id)) + td("Golfer", esc(short(person(r.personId).fullName))) + td("Holes", String(r.holes), "num") + td("Issued", fdate(r.issued), "num") + td("Expiry", fdate(r.expiry), "num") + td("Source", '<span class="text-muted">' + esc(r.source) + "</span>") + td("Status", gbadge(r.status), "col-status") +
        td("Actions", r.status === "available" && !asked && role() === "golfops" ? '<button type="button" class="btn btn-sm btn-outline-secondary" data-extend="' + r.id + '">Request extension</button>' : asked ? "Extension pending" : "—", "col-actions") + "</tr>";
    }).join(""), 8);
    $$("[data-extend]").forEach(function (bt) {
      bt.addEventListener("click", function () {
        var r = db.rainChecks.filter(function (x) { return x.id === bt.getAttribute("data-extend"); })[0];
        ask({ title: "Request an extension of " + r.id + "?", body: "One more month, decided by the Golf Manager (BR-047, BR-054).", reason: "Reason", ok: "Request extension", run: function (why) {
          var ok = can("extend", r.status); if (!ok.ok) return ok;
          if (!why) return { ok: false, msg: "Give the reason (BR-047)." };
          db.golfApprovals.push({ id: "GA-" + seq("GA", 2), kind: "Rain-check extension", ref: r.id, amount: 0, reason: why, requestedBy: user(), at: NOW, status: "pending", decidedBy: null, decidedAt: null });
          gaudit("Rain-check extension requested", r.id, why); save(); go("golf-course.html", "Extension of " + r.id + " sent to the Golf Manager (BR-054)"); return { ok: true };
        } });
      });
    });
  };

  pages.golfAdmin = function () {
    rows($("#ga-sheets tbody"), db.teeSheets.slice().sort(function (a, b) { return (a.date + a.course) < (b.date + b.course) ? -1 : 1; }).map(function (t) {
      return "<tr>" + td("Course", esc(t.course)) + td("Date", fdate(t.date), "num") + td("Day type", esc(dayType(t.date))) + td("Tee times", String(Rules.bizRule036(G).length), "num") + td("Status", gbadge(t.status), "col-status") +
        td("Actions", t.status === "draft" ? '<button type="button" class="btn btn-sm btn-outline-alt" data-publish="' + t.course + "|" + t.date + '">Publish</button>' : "—", "col-actions") + "</tr>";
    }).join(""), 6);
    $$("[data-publish]").forEach(function (bt) {
      bt.addEventListener("click", function () {
        var k = bt.getAttribute("data-publish").split("|"), t = sheet(k[0], k[1]), ok = can("publish", t.status); if (!ok.ok) return toast(ok.msg, "danger");
        t.status = "published"; t.publishedBy = user(); gaudit("Tee sheet published", k[0] + " " + k[1], Rules.bizRule036(G).length + " tee times");
        save(); go("golf-admin.html", k[0] + " " + fdate(k[1]) + " published: " + Rules.bizRule036(G).length + " tee times; weekday 9-hole mornings only " + G.nineHoleWeekdayAM.join(" – ") + " (BR-036)");
      });
    });
    rows($("#ga-rates tbody"), Object.keys(G.rates.Changi).map(function (k) {
      return "<tr>" + td("Player category", esc(k)) + ["Changi", "Kranji"].map(function (c) { return td(c + " 18 / 9 holes", money(G.rates[c][k][0]) + " / " + money(G.rates[c][k][1]), "num"); }).join("") + "</tr>";
    }).join(""), 3);
    $("#ga-policy").innerHTML = facts([["Tee interval", G.intervalMinutes + " minutes"], ["Buggy 18 / 9", money(G.buggy[0]) + " / " + money(G.buggy[1])], ["Substitution fee", money(G.fees.substitution)], ["Course change fee", money(G.fees.courseChange)], ["Day insurance", money(G.fees.dayInsurance)],
      ["Online booking", G.onlineWindowDays + " days ahead, closes " + G.onlineCutoffHours + " h before tee-off"], ["Cancellation notice", G.cancelNoticeHours + " hours"], ["Waitlist offer", G.offerMinutes + " minutes"], ["Rain check", G.rainCheckMonths + " month, 9 holes, no cash value"]]);
    var staged = null;
    function known(row) { return row.personId && golferOf(row.personId); }
    $("#hi-load").addEventListener("click", function () {
      staged = G.sampleExtract.map(function (row) { return Object.assign({}, row, { check: Rules.bizRule056(row, known(row)) }); });
      rows($("#hi-staged tbody"), staged.map(function (row) {
        var g = known(row);
        return "<tr>" + td("SGA number", esc(row.sgaNo)) + td("Golfer", esc(g ? person(row.personId).fullName : "—")) + td("Gender", esc(row.gender || "—")) + td("HI now", g && g.hi != null ? String(g.hi) : "—", "num") + td("HI in extract", String(row.hi), "num") +
          td("Validation", row.check.ok ? '<span class="badge text-success-emphasis bg-success-subtle">Accepted</span>' : '<span class="badge text-danger-emphasis bg-danger-subtle">Rejected</span> ' + esc(row.check.msg)) + "</tr>";
      }).join(""), 6);
      $("#hi-summary").textContent = staged.length + " rows staged, " + staged.filter(function (r) { return !r.check.ok; }).length + " rejected: nothing is effective yet (BR-056)."; $("#hi-apply").hidden = false;
    });
    $("#hi-apply").addEventListener("click", function () {
      if (!staged) return;
      var ok = can("makeEffective", "staged"); if (!ok.ok) return toast(ok.msg, "danger");
      var good = staged.filter(function (r) { return r.check.ok; }), rej = staged.filter(function (r) { return !r.check.ok; });
      good.forEach(function (r) { var g = known(r); if (g.hi !== r.hi) { g.hiHistory.push({ at: NOW, from: g.hi, to: r.hi }); g.hi = r.hi; } g.sgaNo = r.sgaNo; });
      rej.forEach(function (r) { db.golfExceptions.push({ id: "GX-" + seq("GX", 2), personId: known(r) ? r.personId : null, guestId: null, type: "Handicap import error", basis: r.sgaNo + ": " + r.check.msg, raised: NOW, status: "Rejected row", approvedBy: null, approvedAt: null, reason: null }); });
      db.handicapImports.push({ id: "HI-" + seq("HI", 2), at: NOW, by: user(), rows: staged.length, accepted: good.length, rejected: rej.length, status: "effective" });
      gaudit("Handicap extract effective", "SGA CHS", good.length + " accepted, " + rej.length + " rejected"); save(); go("golf-admin.html#hi", good.length + " handicaps effective, " + rej.length + " rejected rows kept as exceptions (BR-056)");
    });
    rows($("#hi-history tbody"), db.handicapImports.slice().reverse().map(function (h) { return "<tr>" + td("Import", esc(h.id)) + td("When", esc(fdate(h.at)), "num") + td("By", esc(h.by)) + td("Rows", String(h.rows), "num") + td("Accepted", String(h.accepted), "num") + td("Rejected", String(h.rejected), "num") + "</tr>"; }).join(""), 6);
    var pf = $("#pc-form");
    pf.elements.person.innerHTML = options(db.golfers.map(function (g) { return [g.personId, person(g.personId).fullName]; }), "P-015");
    pf.elements.expiry.value = Rules.addMonths(TODAY, 12);
    pf.addEventListener("submit", function (e) {
      e.preventDefault();
      var x = can("addPc", "none"); if (x.ok) x = Rules.bizRule043Pc(pf.elements.issuer.value); showError($("#pc-err"), x.ok ? "" : x.msg); if (!x.ok) return;
      var g = golferOf(pf.elements.person.value); g.pc = { issuer: "CC-Demo", expiry: pf.elements.expiry.value };
      gaudit("CC-Demo PC recorded", g.personId, "valid to " + pf.elements.expiry.value); save(); go("golf-admin.html#ga-pc", "CC-Demo PC recorded for " + person(g.personId).fullName);
    });
    rows($("#pc-list tbody"), db.golfers.filter(function (g) { return g.pc; }).map(function (g) { return "<tr>" + td("Golfer", esc(person(g.personId).fullName)) + td("Issuer", esc(g.pc.issuer)) + td("Valid to", fdate(g.pc.expiry), "num") + "</tr>"; }).join(""), 3, "No CC-Demo PC records yet.");
    if (location.hash) { var tab = $('[data-bs-target="' + location.hash + '"]'); if (tab) bootstrap.Tab.getOrCreateInstance(tab).show(); }
  };

  function shiftFigures(date) {
    var bs = db.golfBookings.filter(function (b) { return b.date === date; }), ch = db.golfCharges.filter(function (c) { return c.date === date && c.finance !== "waived"; });
    return [["Tee times booked", bs.filter(function (b) { return b.status !== "cancelled"; }).length], ["Golfers checked in or played", gsum(bs.filter(function (b) { return b.status === "played" || b.status === "checkedIn"; }), function (b) { return b.players.length; })],
      ["No-shows", bs.filter(function (b) { return b.status === "noShow"; }).length], ["Cancellations", bs.filter(function (b) { return b.status === "cancelled"; }).length],
      ["Golf charges (S$)", gsum(ch, function (c) { return c.amount; })], ["Finance hand-offs accepted", ch.filter(function (c) { return c.finance === "accepted"; }).length],
      ["Finance hand-offs pending or rejected", ch.filter(function (c) { return c.finance !== "accepted"; }).length], ["Rain checks issued", db.rainChecks.filter(function (r) { return r.issued === date; }).length],
      ["Unresolved exceptions", Rules.bizRule060(db.golfCharges, db.golfApprovals, db.golfExceptions)]];
  }
  pages.golfClose = function () {
    var fig = shiftFigures(TODAY), byM = {};
    fig.forEach(function (r) { byM[r[0]] = r[1]; });
    $$("[data-kpi]").forEach(function (el) { var k = el.getAttribute("data-kpi"), v = byM[k]; el.textContent = /S\$/.test(k) ? money(v) : v; });
    rows($("#close-counts tbody"), fig.map(function (r) { return "<tr>" + td("Measure", esc(r[0])) + td("Value", /S\$/.test(r[0]) ? money(r[1]) : String(r[1]), "num") + "</tr>"; }).join(""), 2);
    var flagged = [].concat(
      db.golfCharges.filter(function (c) { return c.finance === "rejected" || c.finance === "pending"; }).map(function (c) { return [gbadge(c.finance) + " Finance hand-off", c.id + " · " + c.type + " " + money(c.amount) + " · " + pname(c), c.date]; }),
      db.golfApprovals.filter(function (a) { return a.status === "pending"; }).map(function (a) { return [gbadge("pending") + " Approval", a.id + " · " + a.kind + " · " + a.ref, a.at.slice(0, 10)]; }),
      db.golfExceptions.filter(function (x) { return x.status === "Rejected row"; }).map(function (x) { return ['<span class="badge text-danger-emphasis bg-danger-subtle">Rejected row</span> Handicap import', x.basis, x.raised.slice(0, 10)]; }),
      db.courses.filter(function (c) { return c.status !== "open"; }).map(function (c) { return [gbadge(c.status) + " Course", c.code, TODAY]; }));
    rows($("#close-flags tbody"), flagged.map(function (f) { return "<tr>" + td("Exception", f[0]) + td("Detail", esc(f[1])) + td("Date", fdate(f[2]), "num") + "</tr>"; }).join(""), 3, "No open exceptions.");
    rows($("#close-history tbody"), db.shiftCloses.slice().reverse().map(function (s) { return "<tr>" + td("Close", esc(s.id)) + td("Day", fdate(s.date), "num") + td("Closed by", esc(s.by)) + td("At", esc(s.at.slice(11)), "num") + td("Flagged", String(s.flagged), "num") + "</tr>"; }).join(""), 5);
    var done = db.shiftCloses.some(function (s) { return s.date === TODAY; }), btn = $("#close-btn");
    btn.disabled = done; if (done) btn.setAttribute("data-state", "disabled");
    btn.addEventListener("click", function () {
      var ok = can("close", "open"); if (!ok.ok) return toast(ok.msg, "danger");
      var n = Rules.bizRule060(db.golfCharges, db.golfApprovals, db.golfExceptions) + db.courses.filter(function (c) { return c.status !== "open"; }).length;
      db.shiftCloses.push({ id: "SH-" + seq("SH", 2), date: TODAY, by: user(), at: NOW, counts: byM, flagged: n });
      gaudit("Shift closed", fdate(TODAY), n + " exceptions kept flagged"); save(); go("golf-close.html", "Shift closed; " + n + " exceptions stay flagged for follow-up (BR-060)");
    });
  };

  pages.golfers = function () {
    var q = $("#gf-q");
    function draw() {
      var t = q.value.trim().toLowerCase();
      rows($("#gf tbody"), db.golfers.filter(function (g) { return !t || person(g.personId).fullName.toLowerCase().indexOf(t) >= 0; }).map(function (g) {
        var p = person(g.personId), m = db.memberships.filter(function (x) { return x.personId === g.personId; })[0], tb = db.golfBookings.filter(function (b) { return b.date === TODAY && live(b) && b.players.some(function (x) { return x.personId === g.personId; }); })[0];
        var rc = db.rainChecks.filter(function (r) { return r.personId === g.personId && (r.status === "available" || r.status === "reserved"); });
        return "<tr>" + td("Golfer", esc(p.fullName) + (m ? " · " + memberLink(m.membershipId) : "")) + td("Status", m ? badge(m.status) : "—", "col-status") + td("Gender", g.gender) + td("HI", g.hi != null ? g.hi + (g.hiHistory.length ? ' <span class="text-muted">(was ' + g.hiHistory.slice(-1)[0].from + ")</span>" : "") : "—", "num") +
          td("NSRCC PC", g.pc ? "To " + fdate(g.pc.expiry) : "—") + td("Insurance", g.insurance === "annual" ? "Annual" : g.insurance === "existing" ? "Existing" : "None") + td("Weekend play", esc(Rules.bizRule043Weekend(g, TODAY, G))) +
          td("Today", tb ? '<a href="golf-booking.html?id=' + tb.id + '">' + esc(tb.course + " " + tb.time) + "</a>" : "—") + td("Rain checks", String(rc.length), "num") + "</tr>";
      }).join(""), 9, "No golfer matches.");
      plainLinks($("#gf"));
    }
    q.addEventListener("input", draw); q.form.addEventListener("submit", function (e) { e.preventDefault(); }); draw();
  };

  // Portal golf (SCR-13): book, my bookings (cancel), waitlist offers, rain checks; one account per Member tab (BR-085)
  function portalGolf(m) {
    var pid = m.personId, acct = m.membershipId;
    newBooking(true, acct);
    var mine = db.golfBookings.filter(function (b) { return b.players.some(function (x) { return x.personId === pid; }); }).sort(function (a, b) { return (a.date + a.time) < (b.date + b.time) ? 1 : -1; });
    rows($("#portal-golf tbody"), mine.map(function (b) {
      var act = b.status === "confirmed" && b.mainBooker === acct ? '<button type="button" class="btn btn-sm btn-outline-danger" data-gcancel="' + b.id + '">Cancel</button>' : "—";
      return "<tr>" + td("Booking", esc(b.id)) + td("Tee time", esc(b.course + " · " + fdate(b.date) + " · " + b.time)) + td("Golfers", esc(b.players.map(function (x) { return short(pname(x)); }).join(", "))) + td("Status", gbadge(b.status), "col-status") + td("Actions", act, "col-actions") + "</tr>";
    }).join(""), 5, "No golf bookings yet.");
    $("#portal-golf").addEventListener("click", function (e) { var id = e.target.getAttribute("data-gcancel"); if (id) cancelBooking(gbooking(id), "portal.html#portal-golf-section"); });
    var wl = db.waitlist.filter(function (w) { return w.mainBooker === acct; });
    rows($("#portal-wl tbody"), wl.map(function (w) {
      var act = w.status === "offered" ? '<div class="cluster"><button type="button" class="btn btn-sm btn-outline-secondary" data-pwl="decline" data-id="' + w.id + '">Decline</button><button type="button" class="btn btn-sm btn-primary" data-pwl="accept" data-id="' + w.id + '">Accept</button></div>'
        : w.status === "waiting" ? '<button type="button" class="btn btn-sm btn-outline-secondary" data-pwl="cancelEntry" data-id="' + w.id + '">Cancel entry</button>' : "—";
      return "<tr>" + td("Entry", esc(w.id)) + td("Tee time", esc(w.course + " · " + fdate(w.date) + " · " + w.time)) + td("Party", String(w.party), "num") + td("Status", gbadge(w.status), "col-status") + td("Actions", act, "col-actions") + "</tr>";
    }).join(""), 5, "No waitlist entries.");
    $("#portal-wl").addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-pwl"); if (!a) return;
      var r = waitlistAct(db.waitlist.filter(function (x) { return x.id === e.target.getAttribute("data-id"); })[0], a);
      if (!r.ok) return toast(r.msg, "danger");
      save(); go("portal.html#portal-golf-section", r.msg);
    });
    rows($("#portal-rc tbody"), db.rainChecks.filter(function (r) { return r.personId === pid; }).map(function (r) {
      return "<tr>" + td("Rain check", esc(r.id)) + td("Holes", String(r.holes), "num") + td("Valid to", fdate(r.expiry), "num") + td("Status", gbadge(r.status), "col-status") + "</tr>";
    }).join(""), 4, "No rain checks.");
  }

  // Golf approvals (SCR-08 tab): the Manager decides, never their own request, always with a reason (BR-047)
  function golfApprovals() {
    var me = role(), list = db.golfApprovals.filter(function (a) { return a.status === "pending"; });
    $("#golf-tab-item").hidden = me !== "manager";
    if (me !== "manager") return;
    rows($("#golf-approvals tbody"), list.map(function (a) {
      var own = a.requestedBy === user();
      var acts = own ? '<span class="badge text-primary-emphasis bg-primary-subtle">Requested by you</span>' : '<div class="cluster"><button type="button" class="btn btn-sm btn-primary" data-golf="approved" data-id="' + a.id + '">Approve</button><button type="button" class="btn btn-sm btn-outline-danger" data-golf="rejected" data-id="' + a.id + '">Reject</button></div>';
      var c = db.golfCharges.filter(function (x) { return x.id === a.ref; })[0], forWhat = c ? '<a href="golf-booking.html?id=' + esc(c.bookingId) + '">' + esc(c.bookingId) + "</a> " + esc(c.type) : esc(a.ref);
      return "<tr>" + td("Approval", esc(a.id)) + td("Kind", esc(a.kind)) + td("For", forWhat) + td("Amount", a.amount ? money(a.amount) : "—", "num") + td("Requested by", esc(a.requestedBy)) + td("Reason", esc(a.reason)) + td("Actions", acts, "col-actions") + "</tr>";
    }).join(""), 7, "No golf exceptions waiting.");
    $("#golf-approvals").addEventListener("click", function (e) {
      var to = e.target.getAttribute("data-golf"); if (!to) return;
      var a = db.golfApprovals.filter(function (x) { return x.id === e.target.getAttribute("data-id"); })[0];
      ask({ title: (to === "approved" ? "Approve " : "Reject ") + a.id + "?", body: a.kind + ": " + a.reason, reason: "Reason for the decision", ok: to === "approved" ? "Approve" : "Reject", danger: to === "rejected", run: function (why) {
        var ok = can("decide", a.status); if (ok.ok) ok = Rules.bizRule047(a, user(), true, why); if (!ok.ok) return ok;
        a.status = to; a.decidedBy = user(); a.decidedAt = NOW; a.decisionReason = why;
        if (to === "approved") {
          var c = db.golfCharges.filter(function (x) { return x.id === a.ref; })[0], rc = db.rainChecks.filter(function (x) { return x.id === a.ref; })[0];
          if (c) { c.finance = "waived"; publish("FIN-OPS", "Golf charge " + c.id + " waived: no event raised", c.bookingId); }
          if (rc) { var to2 = Rules.addMonths(rc.expiry, 1); rc.extension = { from: rc.expiry, to: to2, approvedBy: user() }; rc.expiry = to2; }
        }
        gaudit("Golf " + a.kind + " " + to, a.ref, why); save(); go("approvals.html#t-golf", a.id + " " + to + " (BR-047)"); return { ok: true };
      } });
    });
  }

  // (v03) Golf report builders GMS-RR-001 … 012 on the live golf records (BR-031 – 034); names read from Membership
  function inR(date, p) { var x = String(date || "").slice(0, 10); return (!p.from || x >= p.from) && (!p.to || x <= p.to); }
  function utilisation(p) {
    var groups = {}, slots = Rules.bizRule036(G);
    db.teeSheets.filter(function (t) { return t.status === "published" && inR(t.date, p) && (!p.course || t.course === p.course); }).forEach(function (t) {
      var dt = dayType(t.date);
      slots.forEach(function (s) {
        var k = t.course + "|" + dt + "|" + s.session, g = groups[k] || (groups[k] = { course: t.course, dayType: dt, session: s.session, playable: 0, blocked: 0, booked: 0, golfers: 0 });
        if (db.courseBlocks.some(function (x) { return x.status === "active" && x.course === t.course && x.date === t.date && x.session === s.session; })) { g.blocked += G.maxPlayers; return; }
        g.playable += G.maxPlayers;
        var bs = db.golfBookings.filter(function (b) { return b.course === t.course && b.date === t.date && b.time === s.time && live(b); });
        if (bs.length) g.booked++; g.golfers += gsum(bs, function (b) { return b.players.length; });
      });
    });
    return Object.keys(groups).sort().map(function (k) { return groups[k]; });
  }
  function pct(a, b) { return b ? Math.round(100 * a / b) + "%" : "—"; }
  var N = function (v) { return String(v); };
  Object.assign(BUILD, {
    "GMS-RR-001": function (p) {
      var rowsOut = [], bs = db.golfBookings.filter(function (b) { return b.course === p.course && b.date === p.date && b.status !== "cancelled"; }).sort(function (a, b) { return a.time < b.time ? -1 : 1; });
      bs.forEach(function (b) { b.players.forEach(function (x) { var pr = profile(x) || {};
        rowsOut.push([{ t: b.time, h: "<strong>" + esc(b.time) + "</strong>" }, { t: b.id, h: '<a href="golf-booking.html?id=' + esc(b.id) + '">' + esc(b.id) + "</a>" }, pname(x), x.category, pr.hi != null ? "HI " + pr.hi : pr.pc ? "CC-Demo PC" : "—", N(x.holes),
          x.checkIn ? (x.checkIn.insurance === "day" ? "Day insurance" : "Annual cover") : pr.insurance === "annual" ? "Annual cover" : "None yet", gstat(b.status)]); }); });
      var golfers = gsum(bs, function (b) { return b.players.length; });
      return { cols: [["Tee time", "num"], ["Booking"], ["Golfer"], ["Category"], ["Handicap / PC"], ["Holes", "num"], ["Insurance"], ["Check-in / play", "col-status"]], rows: rowsOut,
        kpis: [["Golfers", golfers, (p.course || "") + " · " + fdate(p.date)], ["Flights", bs.length, "Tee times booked"], ["Guests", gsum(bs, function (b) { return b.players.filter(function (x) { return x.guestId && !x.personId; }).length; }), "Introduced by members"], ["Checked in", bs.filter(function (b) { return b.status === "checkedIn" || b.status === "played"; }).length, "Flights released"]],
        chart: { kind: "bar", title: "Golfers by session", data: [["Morning", gsum(bs.filter(function (b) { return b.session === "AM"; }), function (b) { return b.players.length; })], ["Afternoon", gsum(bs.filter(function (b) { return b.session === "PM"; }), function (b) { return b.players.length; })]] } };
    },
    "GMS-RR-002": function (p) {
      var u = utilisation(p), play = gsum(u, function (g) { return g.playable; }), gol = gsum(u, function (g) { return g.golfers; });
      return { cols: [["Course"], ["Day type"], ["Session"], ["Playable capacity", "num"], ["Blocked capacity", "num"], ["Booked tee times", "num"], ["Golfers", "num"], ["Utilisation", "num"]],
        rows: u.map(function (g) { return [g.course, g.dayType, g.session === "AM" ? "Morning" : "Afternoon", N(g.playable), N(g.blocked), N(g.booked), N(g.golfers), pct(g.golfers, g.playable)]; }),
        kpis: [["Utilisation", pct(gol, play), "Golfers of playable places"], ["Golfers", gol, "Booked in the period"], ["Playable places", play, "Published tee sheets"], ["Blocked places", gsum(u, function (g) { return g.blocked; }), "Maintenance, events, programmes"]],
        chart: { kind: "bar", title: "Utilisation (%) by course, day type and session", data: u.map(function (g) { return [g.course + " " + g.dayType.slice(0, 3) + " " + g.session, g.playable ? Math.round(100 * g.golfers / g.playable) : 0]; }) } };
    },
    "GMS-RR-003": function (p) {
      var bs = db.golfBookings.filter(function (b) { return inR(b.date, p) && (!p.channel || b.channel === p.channel); });
      return { cols: [["Booked at", "num"], ["Play date", "num"], ["Course"], ["Channel"], ["Party"], ["Main booker"], ["Golfers", "num"], ["Amendments", "num"], ["Status", "col-status"]],
        rows: bs.map(function (b) { return [fdate(b.bookedAt), fdate(b.date), b.course, b.channel, b.players.some(function (x) { return x.guestId && !x.personId; }) ? "Member + guest" : "Member", memCell(b.mainBooker), N(b.players.length), N((b.amendments || []).length), gstat(b.status)]; }),
        kpis: [["Bookings", bs.length, "Play in the period"], ["Online", bs.filter(function (b) { return b.channel === "Portal"; }).length, "Booked in the Portal"], ["Amended", bs.filter(function (b) { return (b.amendments || []).length; }).length, "Substitution, course, late"], ["Cancelled", bs.filter(function (b) { return b.status === "cancelled"; }).length, "With or without charge"]],
        chart: { kind: "donut", title: "Bookings by channel", data: tally(bs, function (b) { return b.channel; }) } };
    },
    "GMS-RR-004": function (p) {
      var ws = db.waitlist.filter(function (w) { return inR(w.date, p); });
      return { cols: [["Joined", "num"], ["Main booker"], ["Requested tee time"], ["Party", "num"], ["Offered", "num"], ["Status", "col-status"], ["Time to respond", "num"]],
        rows: ws.map(function (w) { return [fdate(w.joinedAt), memCell(w.mainBooker), w.course + " · " + fdate(w.date) + " " + w.time, N(w.party), w.offer ? fdate(w.offer.at) : "—", gstat(w.status), w.offer && w.offer.minutes ? w.offer.minutes + " min" : "—"]; }),
        kpis: [["Entries", ws.length, "Joined for the period"], ["Offered", ws.filter(function (w) { return w.offer; }).length, "Released places"], ["Accepted", ws.filter(function (w) { return w.status === "accepted"; }).length, "Converted to bookings"], ["Expired or declined", ws.filter(function (w) { return w.status === "expired" || w.status === "declined"; }).length, "Moved to the next entry"]],
        chart: { kind: "donut", title: "Waitlist entries by status", data: tally(ws, function (w) { return GLABEL[w.status]; }) } };
    },
    "GMS-RR-005": function (p) {
      var bs = db.golfBookings.filter(function (b) { var k = b.status === "noShow" ? "No-show" : b.status === "cancelled" && b.cancelledAt ? "Cancellation" : null; return k && (!p.kind || p.kind === k) && inR(b.date, p); });
      return { cols: [["Booking"], ["Golfers"], ["Responsible payer"], ["When", "num"], ["Type"], ["Notice"], ["Charge"], ["Waiver"]],
        rows: bs.map(function (b) {
          var c = db.golfCharges.filter(function (x) { return x.bookingId === b.id && (x.type === "Late cancellation" || x.type === "No-show charge"); })[0], w = c && db.golfApprovals.filter(function (a) { return a.ref === c.id; }).slice(-1)[0];
          return [{ t: b.id, h: '<a href="golf-booking.html?id=' + esc(b.id) + '">' + esc(b.id) + "</a>" }, b.players.map(function (x) { return short(pname(x)); }).join(", "), memCell(b.mainBooker), b.status === "noShow" ? fdate(b.date) + " " + b.time : fdate(b.cancelledAt),
            b.status === "noShow" ? "No-show" : "Cancellation", b.status === "noShow" ? "No-show" : b.lateCancellation ? "Late (< 72 h)" : "On time (≥ 72 h)", c ? c.type + " " + money(c.amount) : "None", w ? gstat(w.status) : c && c.finance === "waived" ? "Waived" : "—"];
        }),
        kpis: [["Cancellations", bs.filter(function (b) { return b.status === "cancelled"; }).length, "In the period"], ["Late", bs.filter(function (b) { return b.lateCancellation; }).length, "Less than 72 hours (BR-046)"], ["No-shows", bs.filter(function (b) { return b.status === "noShow"; }).length, "Charge on the payer (BR-051)"]],
        chart: { kind: "bar", title: "Cancellations and no-shows", data: [["On time", bs.filter(function (b) { return b.status === "cancelled" && !b.lateCancellation; }).length], ["Late", bs.filter(function (b) { return b.lateCancellation; }).length], ["No-show", bs.filter(function (b) { return b.status === "noShow"; }).length]] } };
    },
    "GMS-RR-006": function (p) {
      var rs = db.rainChecks.filter(function (r) { return !p.status || r.status === p.status; });
      return { cols: [["Rain check"], ["Golfer"], ["Source"], ["Issued", "num"], ["Expiry", "num"], ["Extension"], ["Status", "col-status"], ["Booking"]],
        rows: rs.map(function (r) { return [r.id, person(r.personId).fullName, r.source, fdate(r.issued), fdate(r.expiry), r.extension ? "To " + fdate(r.extension.to) : "—", gstat(r.status), r.bookingId || "—"]; }),
        kpis: [["Rain checks", rs.length, "9 holes each"], ["Available", rs.filter(function (r) { return r.status === "available"; }).length, "Valid 1 month"], ["Redeemed", rs.filter(function (r) { return r.status === "redeemed"; }).length, "Played"], ["Expired", rs.filter(function (r) { return r.status === "expired"; }).length, "No cash value"]],
        chart: { kind: "donut", title: "Rain checks by status", data: tally(rs, function (r) { return GLABEL[r.status]; }) } };
    },
    "GMS-RR-007": function (p) {
      var xs = db.golfExceptions.filter(function (x) { return !p.status || x.status === p.status; });
      return { cols: [["Golfer"], ["Exception"], ["Basis"], ["Raised", "num"], ["Status"], ["Approved by"]],
        rows: xs.map(function (x) { return [x.personId ? person(x.personId).fullName : x.guestId ? guestOf(x.guestId).name : "Unknown golfer", x.type, x.basis, fdate(x.raised), x.status, x.approvedBy || "—"]; }),
        kpis: [["Exceptions", xs.length, "Import errors and overrides"], ["Rejected rows", xs.filter(function (x) { return x.status === "Rejected row"; }).length, "Handicap import (BR-056)"], ["Approved", xs.filter(function (x) { return x.status === "Approved"; }).length, "By the Golf Manager"]],
        chart: { kind: "bar", title: "Exceptions by type", data: tally(xs, function (x) { return x.type; }) } };
    },
    "GMS-RR-008": function (p) {
      var out = [];
      db.golfBookings.filter(function (b) { return inR(b.date, p) && b.status !== "cancelled"; }).forEach(function (b) {
        b.players.filter(function (x) { return x.guestId && !x.personId; }).forEach(function (x) { var g = guestOf(x.guestId), cat = Rules.bizRule050(g, G);
          out.push({ cat: cat, row: [fdate(b.date), memCell(x.introducedBy), g.name, g.category, g.proof || (cat !== g.category ? "Not produced: sign-in rate" : "Not required"), money(Rules.bizRule058(G, b.course, cat, x.holes)), g.insurance === "annual" ? "Annual cover" : "Day insurance needed", memCell(x.payer)] }); });
      });
      return { cols: [["Play date", "num"], ["Introducing member"], ["Guest"], ["Guest category"], ["Guest Eligibility Proof"], ["Applied rate", "num"], ["Insurance"], ["Responsible payer"]], rows: out.map(function (o) { return o.row; }),
        kpis: [["Guest rounds", out.length, "In the period"], ["Sign-in rate", out.filter(function (o) { return o.cat === "Sign-in guest"; }).length, "No proof produced (BR-050)"], ["Introducers", out.map(function (o) { return o.row[1].t; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).length, "Members"]],
        chart: { kind: "bar", title: "Guest rounds by applied category", data: tally(out, function (o) { return o.cat; }) } };
    },
    "GMS-RR-009": function (p) {
      var groups = {}, cs = db.golfCharges.filter(function (c) { return inR(c.date, p) && (!p.course || c.course === p.course) && c.finance !== "waived"; });
      cs.forEach(function (c) { var k = c.course + "|" + c.category + "|" + c.type, g = groups[k] || (groups[k] = [c.course, c.category, c.type, 0, 0]); g[3]++; g[4] += c.amount; });
      var list = Object.keys(groups).sort().map(function (k) { return groups[k]; }), byType = {};
      cs.forEach(function (c) { byType[c.type] = (byType[c.type] || 0) + c.amount; });
      return { cols: [["Course"], ["Player category"], ["Charge type"], ["Charges", "num"], ["Total", "num"]], rows: list.map(function (g) { return [g[0], g[1], g[2], N(g[3]), money(g[4])]; }),
        kpis: [["Total", money(gsum(cs, function (c) { return c.amount; })), "Operational evidence, not Finance accounting"], ["Charges", cs.length, "Green fees, buggies, fees"], ["Accepted", cs.filter(function (c) { return c.finance === "accepted"; }).length, "Accepted in FIN-OPS"], ["Pending or rejected", cs.filter(function (c) { return c.finance !== "accepted"; }).length, "Flagged at shift close"]],
        chart: { kind: "bar", title: "Charges (S$) by type", data: Object.keys(byType).map(function (k) { return [k, byType[k]]; }).filter(function (d) { return d[1] > 0; }) } };
    },
    "GMS-RR-010": function (p) {
      var a1 = db.golfExceptions.filter(function (x) { return x.approvedAt && inR(x.approvedAt, p); }).map(function (x) { return ["Exception", x.personId ? person(x.personId).fullName : x.guestId ? guestOf(x.guestId).name : "—", x.type + ": " + x.basis, x.reason || "—", x.approvedBy, fdate(x.approvedAt)]; });
      var a2 = db.golfApprovals.filter(function (a) { return a.decidedAt && inR(a.decidedAt, p); }).map(function (a) { return [a.kind, a.ref, a.reason, a.decisionReason || "—", a.decidedBy + " (" + (GLABEL[a.status] || a.status) + ")", fdate(a.decidedAt)]; });
      var all = a1.concat(a2);
      return { cols: [["Kind"], ["Affected record"], ["Exception and basis"], ["Decision reason"], ["Approving authority"], ["Decided at", "num"]], rows: all,
        kpis: [["Decisions", all.length, "In the period"], ["Exceptions approved", a1.length, "Second rounds, overrides"], ["Waivers and extensions", a2.length, "Decided by the Golf Manager"]],
        chart: { kind: "bar", title: "Decisions by kind", data: tally(all, function (r) { return r[0]; }) } };
    },
    "GMS-RR-011": function (p) {
      var fig = shiftFigures(p.date);
      return { cols: [["Measure"], ["Value", "num"]], rows: fig.map(function (r) { return [r[0], /S\$/.test(r[0]) ? money(r[1]) : N(r[1])]; }),
        kpis: [["Tee times booked", fig[0][1], fdate(p.date)], ["Golfers checked in or played", fig[1][1], "Released to play"], ["Golf charges", money(fig[4][1]), "Operational evidence"], ["Unresolved exceptions", fig[8][1], "Stay flagged (BR-060)"]],
        chart: { kind: "bar", title: "Bookings by outcome", data: [["Booked", fig[0][1]], ["No-shows", fig[2][1]], ["Cancelled", fig[3][1]]] } };
    },
    "GMS-RR-012": function (p) {
      var ks = db.courseBlocks.filter(function (b) { return !p.status || b.status === p.status; });
      return { cols: [["Course"], ["Purpose"], ["Date", "num"], ["Session"], ["Tee times", "num"], ["Reason"], ["Source"], ["Status", "col-status"]],
        rows: ks.map(function (b) { return [b.course, b.purpose, fdate(b.date), b.session === "AM" ? "Morning" : "Afternoon", N(Rules.bizRule036(G).filter(function (t) { return t.session === b.session; }).length), b.reason, b.source, gstat(b.status)]; }),
        kpis: [["Blocks", ks.length, "Changi and Kranji"], ["Active", ks.filter(function (b) { return b.status === "active"; }).length, "Not bookable (BR-057)"], ["Released", ks.filter(function (b) { return b.status === "released"; }).length, "Offered to the waitlist first"]],
        chart: { kind: "bar", title: "Blocks by purpose", data: tally(ks, function (b) { return b.purpose; }) } };
    }
  });

  /* ---------- (v04) Events (HMS Events): artifacts/diagrams/workflow-request-full-v08.md W22 – W27, rules BR-061 – BR-083, ported from the rapid v09 events engine.
     Participants are the existing memberships (and dependants) or non-member account holders: event records hold IDs only, names are read here (D-304). ---------- */
  var E = cfg.events;
  var ELABEL = { draft: "Draft", published: "Published", cancelled: "Cancelled", completed: "Completed", held: "On hold", confirmed: "Confirmed", waitlisted: "Waitlisted", offered: "Offered",
    lapsed: "Not completed", proposed: "Proposed", authorised: "Authorised", declined: "Declined", tentative: "Tentative", amended: "Amended", pending: "Pending", accepted: "Accepted", attended: "Attended", "new": "New" };
  var ETONE = { published: "success", confirmed: "success", attended: "success", authorised: "success", accepted: "success", offered: "warning", held: "warning", amended: "info",
    draft: "warning", waitlisted: "info", tentative: "warning", proposed: "warning", pending: "warning", cancelled: "danger", declined: "danger", lapsed: "secondary", completed: "secondary" };
  var METHOD = { online: "Pay (simulated)", counter: "Card or cash at the counter", memberAccount: "Member account" };
  function ebadge(s) { var t = ETONE[s] || "secondary"; return '<span class="badge text-' + t + "-emphasis bg-" + t + '-subtle">' + esc(ELABEL[s] || s) + "</span>"; }
  function ev(id) { return db.events.filter(function (e) { return e.id === id; })[0]; }
  function ereg(id) { return db.eventRegistrations.filter(function (r) { return r.id === id; })[0]; }
  function regsOf(e) { return db.eventRegistrations.filter(function (r) { return r.eventId === e.id; }); }
  function evStatus(e) { return e.status === "published" && Rules.bizRule083(e, NOW) ? "completed" : e.status; }
  function people(r) { return r.participants.filter(function (p) { return p.status !== "cancelled" && p.status !== "lapsed"; }).length; }
  function committed(e) { return gsum(regsOf(e).filter(function (r) { return ["confirmed", "held", "offered"].indexOf(r.status) >= 0; }), people); }
  function confirmedCount(e) { return gsum(regsOf(e).filter(function (r) { return r.status === "confirmed"; }), people); }
  function waiting(e) { return regsOf(e).filter(function (r) { return r.status === "waitlisted"; }); }
  function nonMember(id) { return db.accountHolders.filter(function (a) { return a.id === id; })[0]; }
  // A participant's or account's name: from Membership, the account holder, or (counter guests only) the name typed at the counter
  function refName(ref, typed) { var a = nonMember(ref), m = mem(ref); return a ? a.name : m ? person(m.personId).fullName : typed || ref; }
  function pn(p) { return refName(p.ref, p.guestName); }
  function evNotify(template, r) { notify(template, refName(r.accountHolder), r.id); }
  function evDate(e) { return e.sessions.length ? e.sessions[0].date : ""; }
  function when(e) { return e.sessions.length ? fdate(e.sessions[0].date) + (e.sessions.length > 1 ? " – " + fdate(e.sessions[e.sessions.length - 1].date) : "") : "—"; }
  function partMember(mid) { var m = mem(mid), p = person(m.personId); return { ref: mid, kind: "member", name: p.fullName, dateOfBirth: p.dateOfBirth, status: m.status }; }
  function partOf(x) { if (x.kind === "member") return partMember(x.ref); var a = nonMember(x.ref); return { ref: x.ref, kind: "nonMember", name: pn(x), dateOfBirth: a ? a.dateOfBirth : null }; }
  function priced(e, x) {
    var c = Rules.bizRule064Category(x, evDate(e), E.childUnder), p = { ref: x.ref, kind: x.kind, category: c, rate: e.paid ? Rules.bizRule064(e, c) || 0 : 0, status: "new", qr: null };
    if (x.guestName) p.guestName = x.guestName;
    return p;
  }
  function allEligible(e, r) { return r.participants.every(function (p) { return p.status === "cancelled" || Rules.bizRule063(e, partOf(p)).ok; }); }
  function eventCan(action, state) { return Workflow.canEvent(role(), action, state); }

  // Validates a new registration (BR-062 … BR-066, BR-069); returns { ok, msg, full }
  function checkRegistration(e, parts) {
    var w = Rules.bizRule062(e, NOW); if (!w.ok) return w;
    var g = Rules.bizRule065(e, parts.map(function (x) { return Rules.bizRule063(e, x); }), parts.length); if (!g.ok) return g;
    var c = Rules.bizRule066(e, committed(e), parts.length); if (c.ok) return c;
    var wl = Rules.bizRule069(e);
    return { ok: false, full: wl.ok, msg: c.msg + (wl.ok ? " The group can join the waitlist (BR-069)." : " " + wl.msg) };
  }
  function createRegistration(e, acct, parts, channel, status) {
    var r = { id: "ER-" + seq("ER", 4), eventId: e.id, sessionIds: e.sessions.map(function (s) { return s.id; }), accountHolder: acct, payer: acct, channel: channel, status: status,
      participants: parts.map(function (x) { var p = priced(e, x); p.status = status; return p; }), amount: 0, createdAt: NOW, joinedAt: status === "waitlisted" ? NOW : null,
      heldUntil: status === "held" && channel === "portal" ? Rules.bizRule067(NOW, E.holdMinutes) : null, offerUntil: null, settlement: null, history: [] };
    r.amount = gsum(r.participants, function (p) { return p.rate; });
    r.history.push({ at: NOW, by: user(), action: ELABEL[status] + " (" + channel + ")" });
    db.eventRegistrations.push(r);
    gaudit("Event registration " + ELABEL[status].toLowerCase(), r.id, e.name + ", " + r.participants.length + " participant(s)");
    if (status === "waitlisted") evNotify("EVENT_WAITLIST", r);
    return r;
  }
  // BR-068, BR-072: confirm after a successful settlement, one QR per participant; the payment is a FIN-OPS financial event (v07, RC-153)
  function confirmRegistration(r, method) {
    var e = ev(r.eventId);
    r.status = "confirmed"; r.heldUntil = null; r.offerUntil = null;
    r.participants.forEach(function (p) { if (p.status !== "cancelled") { p.status = "confirmed"; p.qr = Rules.bizRule072(seq("EQ")); } });
    if (r.amount > 0) {
      var s = { id: "ES-" + seq("ES", 4), registrationId: r.id, eventId: e.id, payer: r.payer, method: method, amount: r.amount, finance: "accepted", financeRef: null, at: NOW };
      db.eventSettlements.unshift(s);
      s.financeRef = finOps("EVT", s.id, "EVT-REG", r.payer, r.amount, { inHouse: method === "memberAccount", note: "Event payment " + METHOD[method] }).id; r.settlement = { method: method, ref: s.financeRef };
    }
    r.history.push({ at: NOW, by: user(), action: "Confirmed" + (method ? " · " + METHOD[method] : "") });
    gaudit("Event registration confirmed", r.id, e.name + (r.amount ? ", " + money(r.amount) : ""));
    evNotify("EVENT_CONFIRMED", r);
  }
  function lapse(r, why) {
    r.status = "lapsed"; r.heldUntil = null; r.offerUntil = null;
    r.participants.forEach(function (p) { if (p.status !== "cancelled") p.status = "lapsed"; });
    r.history.push({ at: NOW, by: user(), action: "Not completed: " + why });
    gaudit("Event registration not completed", r.id, why);
    if (why === "offer expired") evNotify("EVENT_OFFER_EXPIRED", r);
    promote(ev(r.eventId));
  }
  // BR-070, BR-071: fit-aware FIFO promotion into the free places
  function promote(e) {
    if (!e.waitlist || evStatus(e) !== "published") return;
    var free = e.capacity - committed(e), next;
    while ((next = Rules.bizRule070(waiting(e), free, function (r) { return allEligible(e, r); }))) {
      next.status = "offered"; next.offerUntil = Rules.bizRule071(NOW, E.offerHours);
      next.participants.forEach(function (p) { if (p.status !== "cancelled") p.status = "offered"; });
      next.history.push({ at: NOW, by: "HMS Events", action: "Offered until " + next.offerUntil });
      evNotify("EVENT_WAITLIST_OFFER", next); free -= people(next);
    }
  }
  function cancelParticipant(r, ref, by) {
    var p = r.participants.filter(function (x) { return x.ref === ref; })[0], ok = Rules.bizRule077(r, p);
    if (!ok.ok) return ok;
    p.status = "cancelled"; p.cancelledBy = by; r.forfeited = (r.forfeited || 0) + (by === "participant" ? ok.forfeit : 0);
    if (!people(r)) { r.status = "cancelled"; r.cancelledBy = by; }
    r.history.push({ at: NOW, by: user(), action: pn(p) + " cancelled (" + by + ")" + (by === "participant" && ok.forfeit ? ", " + money(ok.forfeit) + " forfeited" : "") });
    evNotify(by === "participant" ? "EVENT_CANCELLED_PARTICIPANT" : "EVENT_CANCELLED_CLUB", r);
    gaudit("Event cancellation", r.id, pn(p) + " (" + by + ")");
    promote(ev(r.eventId));
    return { ok: true, msg: short(pn(p)) + " cancelled" + (by === "participant" ? "; " + money(ok.forfeit) + " forfeited, QR void (BR-077)" : "") };
  }
  function regRow(r, actions) {
    return "<tr>" + td("Registration", esc(r.id)) + td("Account holder", esc(short(refName(r.accountHolder)))) +
      td("Participants", r.participants.map(function (p) { return esc(short(pn(p))) + " · " + esc(E.categories[p.category]) + " · " + money(p.rate) + " " + ebadge(p.status === "new" ? r.status : p.status); }).join("<br>")) +
      td("Amount", money(r.amount), "num") + td("Channel", esc(r.channel === "portal" ? "Portal" : "Counter")) + td("Status", ebadge(r.status), "col-status") + (actions == null ? "" : td("Actions", actions || "—", "col-actions")) + "</tr>";
  }
  function ebtn(label, attrs, tone) { return '<button type="button" class="btn btn-sm btn-' + (tone || "outline-secondary") + '" ' + attrs + ">" + esc(label) + "</button>"; }
  function priceText(e) { return e.paid ? Object.keys(e.rates).filter(function (k) { return e.rates[k] != null; }).map(function (k) { return E.categories[k] + " " + money(e.rates[k]); }).join(" · ") : "Free"; }

  pages.events = function () {
    var r = role(), from = $("#ev-from"), to = $("#ev-to");
    var live = db.events.filter(function (e) { return evStatus(e) === "published"; });
    $("#ev-kpis").innerHTML = kpiTiles([["Published events", live.length, "Open or upcoming"], ["Confirmed participants", gsum(live, confirmedCount), "Across published events"],
      ["Waitlisted groups", gsum(live, function (e) { return waiting(e).length; }), "Whole groups, FIFO"], ["Below minimum", live.filter(function (e) { return !Rules.bizRule076(e, confirmedCount(e)).met; }).length, "Events Team decides (BR-076)"]]);
    barChart($("#ev-chart"), live.map(function (e) { return [e.name.split(" ").slice(0, 2).join(" "), confirmedCount(e)]; }));
    function draw() {
      var list = [];
      db.events.forEach(function (e) { e.sessions.forEach(function (s, i) { if ((!from.value || s.date >= from.value) && (!to.value || s.date <= to.value)) list.push({ e: e, s: s, i: i }); }); });
      list.sort(function (a, b) { return (a.s.date + a.s.start) < (b.s.date + b.s.start) ? -1 : 1; });
      rows($("#ev-schedule tbody"), list.map(function (x) {
        var e = x.e, room = e.roomRef && db.roomBookings.filter(function (b) { return b.ref === e.roomRef; })[0], v = Rules.bizRule076(e, confirmedCount(e));
        var btn = function (href, label) { return '<a class="btn btn-sm btn-outline-secondary" href="' + href + e.id + '">' + label + "</a>"; };
        var act = '<div class="cluster">' + btn("event.html?id=", "Open") + (r === "events" ? btn("event-edit.html?id=", "Setup") : "") + (r === "golfops" && evStatus(e) === "published" ? btn("event-register.html?id=", "Register at counter") : "") + "</div>";
        return "<tr>" + td("Date", "<strong>" + esc(fdate(x.s.date)) + "</strong> " + esc(x.s.start), "num") + td("Event", '<a href="event.html?id=' + e.id + '">' + esc(e.name) + "</a>" + (e.sessions.length > 1 ? ' <span class="text-muted">session ' + (x.i + 1) + " of " + e.sessions.length + "</span>" : "")) +
          td("Venue", venueLink(e)) + td("Status", ebadge(evStatus(e)) + (e.minParticipants && !v.met && evStatus(e) === "published" ? ' <span class="badge text-warning-emphasis bg-warning-subtle">Below minimum</span>' : ""), "col-status") +
          td("Confirmed / capacity", confirmedCount(e) + " / " + e.capacity, "num") + td("Minimum", e.minParticipants ? String(e.minParticipants) : "—", "num") +
          td("Waitlist", String(waiting(e).length), "num") + td("Function room", room ? esc(room.ref) + " " + ebadge(room.status) : "—") + td("Actions", act, "col-actions col-actions--wrap") + "</tr>";
      }).join(""), 9, "No sessions in this period.");
    }
    from.addEventListener("change", draw); to.addEventListener("change", draw); draw();
  };

  pages.eventEdit = function () {
    var e = ev(qs("id")), f = $("#ee-form");
    if (qs("id") && !e) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">Unknown event ' + esc(qs("id")) + '.</p><p><a href="events.html">Back to Events</a></p></div>'; return; }  // (v04) G-1
    if (!e) {
      e = { id: "EV-" + String(db.meta.seq.EV).padStart(2, "0"), name: "", category: "General", venue: "", venueId: "", status: "draft", paid: true, eligibility: "members", scope: "programme", windowOpen: "", windowClose: "",
        capacity: null, waitlist: false, minParticipants: null, maxPerRegistration: 1, rates: { memberAdult: null, memberChild: null, nonMemberAdult: null, nonMemberChild: null },
        sessions: [{ id: "", date: "", start: "", end: "", capacity: null, personnel: [] }], roomRef: null, createdBy: user(), publishedAt: null, history: [], isNew: true };
    }
    e.sessions.forEach(function (s, i) { if (!s.id) s.id = e.id + "-S" + (i + 1); });
    var st = evStatus(e);
    $("#pg-title").textContent = e.isNew ? "New event" : e.name;
    $("#ee-status").innerHTML = ebadge(st);
    // (v05) the venue is a Facilities record (RC-116)
    f.elements.venue.innerHTML = '<option value="">Choose a venue</option>' + options(F.facilities.filter(function (v) { return v.eventVenue && v.active; }).map(function (v) { return [v.code, v.code + " · " + v.name]; }), e.venueId);
    f.elements.eligibility.innerHTML = options(Object.keys(E.eligibility).map(function (k) { return [k, E.eligibility[k]]; }), e.eligibility);
    f.elements.scope.innerHTML = options(Object.keys(E.scopes).map(function (k) { return [k, E.scopes[k]]; }), e.scope);
    ["name", "category", "windowOpen", "windowClose", "capacity", "minParticipants", "maxPerRegistration"].forEach(function (k) { f.elements[k].value = e[k] == null ? "" : e[k]; });
    f.elements.paid.value = e.paid ? "paid" : "free"; f.elements.waitlist.checked = !!e.waitlist;
    Object.keys(e.rates).forEach(function (k) { f.elements[k].value = e.rates[k] == null ? "" : e.rates[k]; });
    var draft = e.status === "draft";
    rows($("#ee-sessions tbody"), e.sessions.map(function (s, i) {
      var pers = s.personnel.map(function (id) { return E.personnel.filter(function (p) { return p.id === id; })[0].name; }).join(", ") || "—";
      var cellv = function (k, ph) { return draft ? '<input class="form-control form-control-sm" data-s="' + i + '" data-k="' + k + '" value="' + esc(s[k]) + '" placeholder="' + ph + '" aria-label="Session ' + (i + 1) + " " + k + '">' : esc(k === "date" ? fdate(s[k]) : s[k]); };
      return "<tr>" + td("Session", "Session " + (i + 1)) + td("Date", cellv("date", "YYYY-MM-DD"), "num") + td("Start", cellv("start", "HH:MM"), "num") + td("End", cellv("end", "HH:MM"), "num") + td("Personnel", esc(pers)) +
        td("Actions", st === "published" ? ebtn("Reschedule", 'data-resched="' + i + '"') : "—", "col-actions") + "</tr>";
    }).join(""), 6);
    $("#ee-publish").hidden = !draft; $("#ee-savedraft").hidden = !draft; $("#ee-save").hidden = st !== "published"; $("#ee-cancel").hidden = st !== "published";
    function read() {
      var x = JSON.parse(JSON.stringify(e)); delete x.isNew;
      ["name", "category", "venue", "eligibility", "scope", "windowOpen", "windowClose"].forEach(function (k) { x[k] = f.elements[k].value.trim(); });
      ["capacity", "minParticipants", "maxPerRegistration"].forEach(function (k) { x[k] = f.elements[k].value === "" ? null : +f.elements[k].value; });
      x.paid = f.elements.paid.value === "paid"; x.waitlist = f.elements.waitlist.checked;
      Object.keys(x.rates).forEach(function (k) { x.rates[k] = f.elements[k].value === "" ? null : +f.elements[k].value; });
      $$("[data-s]").forEach(function (inp) { x.sessions[+inp.getAttribute("data-s")][inp.getAttribute("data-k")] = inp.value.trim(); });
      x.venueId = x.venue; x.venue = x.venueId ? fac(x.venueId).name : "";  // (v05) code kept, name for reading
      return x;
    }
    function store(x) { if (e.isNew) { db.events.push(x); seq("EV"); e = x; } else Object.assign(e, x); }
    $("#ee-savedraft").addEventListener("click", function () { var x = read(); store(x); gaudit("Event draft saved", x.id, x.name); save(); go("event-edit.html?id=" + x.id, x.name + " saved as draft"); });
    $("#ee-publish").addEventListener("click", function () {
      var x = read(), ok = eventCan("publish", "draft"); if (ok.ok) ok = Rules.bizRule061(x, role());
      showError($("#ee-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
      x.status = "published"; x.publishedAt = NOW; x.history.push({ at: NOW, by: user(), action: "Published (no approval, BR-061)" }); store(x);
      var vb = eventBlocks(e);  // (v05) a bookable venue is blocked per session (BR-088, RC-116)
      gaudit("Event published", x.id, x.name + (vb.msg ? "; " + vb.msg : "")); save(); go("events.html", x.name + " published (BR-061)" + (vb.msg ? "; " + vb.msg : ""));
    });
    $("#ee-save").addEventListener("click", function () {
      var x = read(), cap = eventCan("maintain", "published"); if (cap.ok) cap = Rules.bizRule082(x.capacity, committed(e));
      if (cap.ok && x.venueId !== e.venueId) cap = Workflow.canFacility(role(), "chooseVenue", "published");
      showError($("#ee-err"), cap.ok ? "" : cap.msg); if (!cap.ok) return;
      var changed = [];
      if (JSON.stringify(x.rates) !== JSON.stringify(e.rates)) changed.push("Price");
      if (x.eligibility !== e.eligibility) changed.push("Eligibility");
      var msg = Rules.bizRule081(changed).msg;
      x.history.push({ at: NOW, by: user(), action: "Maintained" + (changed.length ? ": " + changed.join(", ") : "") }); Object.assign(e, x);
      var vb2 = eventBlocks(e);  // (v05) blocks follow the venue
      gaudit("Event maintained", e.id, msg || "Details updated"); promote(e); save(); go("event-edit.html?id=" + e.id, (msg || "Changes saved") + (vb2.msg ? "; " + vb2.msg : ""));
    });
    $("#ee-cancel").addEventListener("click", function () {
      ask({ title: "Cancel " + e.name + "?", body: "Every registration is cancelled by the club; refunds are proposed afterwards and need the Events Manager (BR-078).", reason: "Reason", ok: "Cancel event", danger: true, run: function (why) {
        var ok = eventCan("cancelEvent", "published"); if (!ok.ok) return ok; if (!why) return { ok: false, msg: "Give the reason." };
        clubCancel(e, why); save(); go("event.html?id=" + e.id + "#e-refund-section", e.name + " cancelled by the club; propose refunds (BR-078)"); return { ok: true };
      } });
    });
    $("#ee-sessions").addEventListener("click", function (ev2) {
      var i = ev2.target.getAttribute("data-resched"); if (i == null) return;
      var s = e.sessions[+i];
      ask({ title: "Reschedule session " + (+i + 1) + "?", body: "Confirmed participants are told and may keep the place or decline (BR-079). Now " + fdate(s.date) + " " + s.start + ".", reason: "New date and start time (YYYY-MM-DD HH:MM)", ok: "Reschedule", run: function (v) {
        var ok = eventCan("reschedule", "published"); if (!ok.ok) return ok;
        var parts = String(v || "").trim().split(/\s+/);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(parts[0] || "") || !/^\d{2}:\d{2}$/.test(parts[1] || "")) return { ok: false, msg: "Use the form YYYY-MM-DD HH:MM." };
        var conf = regsOf(e).filter(function (r) { return r.status === "confirmed" && r.sessionIds.indexOf(s.id) >= 0; });
        ok = Rules.bizRule079(s, parts[0], parts[1], gsum(conf, people)); if (!ok.ok) return ok;
        var mins = function (t) { return +t.slice(0, 2) * 60 + +t.slice(3, 5); }, dur = mins(s.end) - mins(s.start), end = mins(parts[1]) + dur;
        var old = s.date + " " + s.start; s.date = parts[0]; s.start = parts[1]; s.end = String(Math.floor(end / 60)).padStart(2, "0") + ":" + String(end % 60).padStart(2, "0");
        conf.forEach(function (r) { r.reschedule = { sessionId: s.id, from: old, to: v.trim(), response: "pending" }; r.history.push({ at: NOW, by: user(), action: "Rescheduled " + old + " → " + v.trim() }); evNotify("EVENT_RESCHEDULED", r); });
        e.history.push({ at: NOW, by: user(), action: "Session " + (+i + 1) + " rescheduled " + old + " → " + v.trim() }); gaudit("Event rescheduled", e.id, old + " → " + v.trim()); eventBlocks(e);  // (v05) the block moves with the session
        save(); go("event.html?id=" + e.id, ok.msg); return { ok: true };
      } });
    });
  };
  function clubCancel(e, why) {
    regsOf(e).forEach(function (r) {
      if (r.status === "confirmed") r.participants.filter(function (p) { return p.status === "confirmed"; }).forEach(function (p) { cancelParticipant(r, p.ref, "club"); });
      else if (["held", "offered", "waitlisted"].indexOf(r.status) >= 0) { r.status = "cancelled"; r.cancelledBy = "club"; evNotify("EVENT_CANCELLED_CLUB", r); }
    });
    e.status = "cancelled"; e.cancelReason = why; e.history.push({ at: NOW, by: user(), action: "Cancelled by the club: " + why });
    eventBlocks(e);  // (v05) the venue's event blocks are removed
    gaudit("Event cancelled (club)", e.id, why);
  }

  pages.event = function () {
    var e = ev(qs("id")), r = role();
    if (!e) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">Unknown event ' + esc(qs("id") || "") + '.</p><p><a href="events.html">Back to Events</a></p></div>'; return; }
    var st = evStatus(e), room = e.roomRef && db.roomBookings.filter(function (b) { return b.ref === e.roomRef; })[0];
    $("#pg-title").textContent = e.name;
    $("#e-status").innerHTML = ebadge(st);
    $("#e-setup").hidden = r !== "events"; $("#e-setup").href = "event-edit.html?id=" + e.id;
    $("#e-checkin").hidden = r !== "events"; $("#e-checkin").href = "event-checkin.html?id=" + e.id;
    $("#e-counter").hidden = r !== "golfops" || st !== "published"; $("#e-counter").href = "event-register.html?id=" + e.id;
    $("#e-facts").innerHTML = facts([["When", when(e)], ["Venue", venueLink(e) + ' <span class="text-muted">' + esc(e.venueId) + " · Facilities</span>", true], ["Eligibility", E.eligibility[e.eligibility]], ["Registration by", E.scopes[e.scope]], ["Confirmed / capacity", confirmedCount(e) + " / " + e.capacity],
      ["Price", '<span class="d-flex flex-wrap column-gap-4 row-gap-1">' + priceText(e).split(" · ").map(function (p) { return "<span>" + esc(p) + "</span>"; }).join("") + "</span>", true], ["Function room", room ? room.ref + " (" + ELABEL[room.status] + ")" : "—"]]);
    var staff = r === "events" || r === "golfops";
    rows($("#e-regs tbody"), regsOf(e).filter(function (x) { return x.status !== "waitlisted" && x.status !== "offered"; }).map(function (x) {
      var acts = "";
      if (x.reschedule && x.reschedule.response === "pending" && r === "events") acts = ebtn("Keep new schedule", 'data-keep="' + x.id + '"') + " " + x.participants.filter(function (p) { return p.status === "confirmed"; }).map(function (p) { return ebtn("Decline " + short(pn(p)), 'data-decline="' + x.id + '" data-ref="' + p.ref + '"', "outline-danger"); }).join(" ");
      return regRow(x, staff ? acts : undefined);
    }).join(""), staff ? 7 : 6, "No registrations yet.");
    var free = e.capacity - committed(e);
    rows($("#e-wait tbody"), regsOf(e).filter(function (x) { return x.status === "waitlisted" || x.status === "offered"; }).sort(function (a, b) { return a.joinedAt < b.joinedAt ? -1 : 1; }).map(function (x, i) {
      var acts = x.status === "offered" ? ebtn("Let offer expire", 'data-expire="' + x.id + '"') : people(x) > 1 && r === "events" ? x.participants.map(function (p) { return ebtn("Remove " + short(pn(p)), 'data-remove="' + x.id + '" data-ref="' + p.ref + '"'); }).join(" ") : "—";
      return "<tr>" + td("Priority", String(i + 1), "num") + td("Registration", esc(x.id)) + td("Group", esc(x.participants.map(function (p) { return short(pn(p)); }).join(", "))) + td("Size", String(people(x)), "num") +
        td("Joined", esc(fdate(x.joinedAt)), "num") + td("Fits now", x.status === "offered" ? "Offered until " + esc(fdate(x.offerUntil)) : people(x) <= free ? "Yes" : "No (keeps priority)") + td("Status", ebadge(x.status), "col-status") + td("Actions", staff ? acts : "—", "col-actions") + "</tr>";
    }).join(""), 8, e.waitlist ? "Nobody is waiting." : "This event has no waitlist.");
    var v = Rules.bizRule076(e, confirmedCount(e));
    $("#e-viab").textContent = v.msg;
    $("#e-proceed").hidden = $("#e-cancel").hidden = v.met || r !== "events" || st !== "published";
    var due = [];
    regsOf(e).forEach(function (x) { x.participants.forEach(function (p) { if (p.status === "cancelled" && p.cancelledBy === "club" && p.rate > 0 && !db.eventRefunds.some(function (f) { return f.registrationId === x.id && f.ref === p.ref; })) due.push({ x: x, p: p }); }); });
    $("#e-refund-section").hidden = !due.length && !db.eventRefunds.some(function (f) { return f.eventId === e.id; });
    rows($("#e-refunds tbody"), due.map(function (d) {
      return "<tr>" + td("Registration", esc(d.x.id)) + td("Participant", esc(short(pn(d.p)))) + td("Paid", money(d.p.rate), "num") + td("Refund", r === "events" ? '<label class="visually-hidden" for="amt-' + esc(d.x.id + d.p.ref) + '">Refund for ' + esc(pn(d.p)) + '</label><input type="number" class="form-control form-control-sm" id="amt-' + esc(d.x.id + d.p.ref) + '" min="1" max="' + d.p.rate + '" value="' + d.p.rate + '" data-amt="' + d.x.id + "|" + d.p.ref + '">' : money(d.p.rate), "num") +
        td("Status", ebadge("pending"), "col-status") + td("Actions", r === "events" ? ebtn("Propose", 'data-propose="' + d.x.id + "|" + d.p.ref + '"', "primary") : "—", "col-actions") + "</tr>";
    }).concat(db.eventRefunds.filter(function (f) { return f.eventId === e.id; }).map(function (f) {
      return "<tr>" + td("Registration", esc(f.registrationId)) + td("Participant", esc(short(refName(f.ref)))) + td("Paid", money(f.paid), "num") + td("Refund", money(f.amount) + " (" + f.kind + ")", "num") + td("Status", ebadge(f.finance === "accepted" ? "accepted" : f.status), "col-status") + td("Actions", esc(f.id), "col-actions") + "</tr>";
    })).join(""), 6);
    rows($("#e-att tbody"), db.eventAttendance.filter(function (a) { return a.eventId === e.id; }).map(function (a) {
      var s = e.sessions.filter(function (x) { return x.id === a.sessionId; })[0];
      return "<tr>" + td("Session", s ? fdate(s.date) + " " + esc(s.start) : esc(a.sessionId), "num") + td("Participant", esc(short(refName(a.ref)))) + td("QR", esc(a.qr || "—")) + td("Recorded", esc(fdate(a.at)), "num") + td("By", esc(a.by)) + td("Path", a.manual ? "Manual: " + esc(a.reason) : "QR") + "</tr>";
    }).join(""), 6, "No attendance recorded yet.");
    rows($("#e-pers tbody"), db.personnelAttendance.filter(function (a) { return a.eventId === e.id; }).map(function (a) {
      var s = e.sessions.filter(function (x) { return x.id === a.sessionId; })[0], ps = E.personnel.filter(function (p) { return p.id === a.personnelId; })[0];
      return "<tr>" + td("Session", s ? fdate(s.date) + " " + esc(s.start) : "", "num") + td("Personnel", esc(ps ? ps.name : a.personnelId)) + td("Recorded", esc(fdate(a.at)), "num") + td("By", esc(a.by)) + "</tr>";
    }).join(""), 4, "No personnel attendance recorded.");
    $("main").addEventListener("click", function (x) {
      var t = x.target, id, ok;
      if ((id = t.getAttribute("data-expire"))) { ok = eventCan("expire", "offered"); if (!ok.ok) return toast(ok.msg, "danger"); lapse(ereg(id), "offer expired"); save(); return go("event.html?id=" + e.id, id + ": offer expired; the next fitting group is offered (BR-071)"); }
      if ((id = t.getAttribute("data-remove"))) {
        var w = ereg(id); w.participants = w.participants.filter(function (p) { return p.ref !== t.getAttribute("data-ref"); }); w.amount = gsum(w.participants, function (p) { return p.rate; });
        w.joinedAt = NOW; w.history.push({ at: NOW, by: user(), action: "Group changed: join time reset (BR-070)" }); gaudit("Waitlisted group changed", id, "join time reset"); promote(e); save(); return go("event.html?id=" + e.id, id + " changed: join time reset (BR-070)");
      }
      if ((id = t.getAttribute("data-keep"))) { var k = ereg(id); k.reschedule.response = "kept"; k.history.push({ at: NOW, by: user(), action: "Kept the new schedule" }); save(); return go("event.html?id=" + e.id, id + " keeps the new schedule"); }
      if ((id = t.getAttribute("data-decline"))) { var dr = ereg(id); cancelParticipant(dr, t.getAttribute("data-ref"), "club"); if (dr.status !== "confirmed" || !dr.participants.some(function (p) { return p.status === "confirmed"; })) dr.reschedule.response = "declined"; save(); return go("event.html?id=" + e.id + "#e-refund-section", "Declined the new schedule: propose the refund (BR-079)"); }
      if ((id = t.getAttribute("data-propose"))) {
        ok = eventCan("propose", "none"); if (!ok.ok) return toast(ok.msg, "danger");
        var ps = id.split("|"), rr = ereg(ps[0]), pp = rr.participants.filter(function (p) { return p.ref === ps[1]; })[0], amt = +$('[data-amt="' + id + '"]').value;
        if (!(amt > 0 && amt <= pp.rate)) return toast("The refund must be between S$1 and the S$" + pp.rate + " paid (BR-078).", "danger");
        db.eventRefunds.push({ id: "RF-" + seq("RF", 4), registrationId: rr.id, eventId: e.id, ref: pp.ref, payer: rr.payer, paid: pp.rate, amount: amt, kind: amt === pp.rate ? "full" : "partial",
          reason: rr.reschedule && rr.reschedule.response === "declined" ? "Declined the reschedule" : "Cancelled by the club", proposedBy: user(), at: NOW, status: "proposed", decidedBy: null, decidedAt: null, decisionReason: null, finance: null, financeRef: null });
        gaudit("Event refund proposed", rr.id, pn(pp) + " " + money(amt)); save(); return go("event.html?id=" + e.id + "#e-refund-section", "Refund proposed for " + short(pn(pp)) + ": waiting for the Events Manager (BR-078)");
      }
    });
    $("#e-proceed").addEventListener("click", function () { e.history.push({ at: NOW, by: user(), action: "Proceeds below minimum (BR-076)" }); gaudit("Event proceeds below minimum", e.id, v.msg); save(); go("event.html?id=" + e.id, e.name + " proceeds (BR-076)"); });
    $("#e-cancel").addEventListener("click", function () {
      ask({ title: "Cancel " + e.name + "?", body: v.msg + " Refunds are proposed afterwards and need the Events Manager (BR-078).", reason: "Reason", ok: "Cancel event", danger: true, run: function (why) {
        var ok = eventCan("cancelEvent", "published"); if (!ok.ok) return ok; if (!why) return { ok: false, msg: "Give the reason." };
        clubCancel(e, why); save(); go("event.html?id=" + e.id + "#e-refund-section", e.name + " cancelled by the club; propose refunds (BR-076, BR-078)"); return { ok: true };
      } });
    });
    if (location.hash) { var tb = $('[data-bs-target="' + location.hash + '"]'); if (tb) bootstrap.Tab.getOrCreateInstance(tb).show(); }
  };

  /* ---------- (v05) Facilities (HMS Facilities): artifacts/diagrams/workflow-request-full-v08.md W28 – W34, rules BR-086 – BR-106, ported from the rapid v09 facilities engine.
     Customers are the existing memberships, non-member account holders, SAFRA card numbers or named guests: facility records hold IDs only (D-325, D-326). ---------- */
  var F = cfg.facilities;
  var FLABEL = { pendingPayment: "Pending payment", confirmed: "Confirmed", cancelled: "Cancelled", noShow: "No-show", completed: "Completed", waiting: "Waiting", offered: "Offered", booked: "Booked",
    declined: "Declined", expired: "Expired", withdrawn: "Withdrawn", instructed: "Instructed", requested: "Requested", approved: "Approved", rejected: "Rejected", admitted: "In", left: "Left",
    paid: "Paid", reconciled: "Reconciled", open: "Open", escalated: "Escalated", closed: "Closed", draft: "Draft", pendingPolicy: "Pending policy", maintenance: "Maintenance", event: "Event",
    lesson: "Lesson", closure: "Operational closure", noMatch: "No CMS record", duplicate: "Duplicate", amount: "Amount", method: "Method", active: "Active", inactive: "Inactive", flagged: "Flagged" };
  var FTONE = { confirmed: "success", booked: "success", instructed: "success", approved: "success", admitted: "success", reconciled: "success", active: "success", completed: "secondary",
    pendingPayment: "warning", offered: "warning", requested: "warning", open: "warning", draft: "warning", pendingPolicy: "warning", maintenance: "warning", event: "warning", lesson: "warning", closure: "warning", duplicate: "warning", noMatch: "warning",
    waiting: "info", paid: "info", noShow: "danger", rejected: "danger", escalated: "danger", amount: "danger", method: "danger", flagged: "danger" };
  var CATS = F.categories;
  function fbadge(s) { var t = FTONE[s] || "secondary"; return '<span class="badge text-' + t + "-emphasis bg-" + t + '-subtle">' + esc(FLABEL[s] || s) + "</span>"; }
  function fac(code) { return F.facilities.filter(function (f) { return f.code === code; })[0]; }
  function rsc(id) { return F.resources.filter(function (r) { return r.id === id; })[0]; }
  function resOf(code) { return F.resources.filter(function (r) { return r.facility === code && r.active; }); }
  function fbk(id) { return db.facilityBookings.filter(function (b) { return b.id === id; })[0]; }
  function fcan(action, state) { return Workflow.canFacility(role(), action, state); }
  function bookable() { return F.facilities.filter(function (f) { return f.model === "booking" && f.active; }); }
  function where(b) { var r = rsc(b.resource); return fac(r.facility).name + " · " + r.name; }
  function slot(b) { return fdate(b.date) + ", " + b.start + " – " + Rules.endOf(b.start, b.hours); }
  // The customer behind a reference: a membership (status from Membership), a non-member account, a SAFRA card, a visitor pass or a typed guest name
  function custOf(ref) {
    ref = String(ref || "").trim();
    var m = mem(ref.toUpperCase());
    if (m) return { ref: m.membershipId, category: "member", status: m.status, name: person(m.personId).fullName };
    var a = nonMember(ref.toUpperCase());
    if (a) return { ref: a.id, category: "nonMember", name: a.name };
    if (/^SF-\d{4}$/i.test(ref)) return { ref: ref.toUpperCase(), category: "safra", name: "SAFRA " + ref.toUpperCase() };
    if (/^RR-\d{4}$/i.test(ref)) { var st = db.resortReservations.filter(function (x) { return x.id === ref.toUpperCase(); })[0], g = st && custOf(st.guest); return { ref: st ? st.guest : ref.toUpperCase(), category: "resortGuest", pass: ref.toUpperCase(), name: g ? g.name : ref.toUpperCase() }; }  // (v06) a resort stay is the visitor pass (RC-121)
    return ref ? { ref: ref, category: "guest", name: /^Guest /.test(ref) ? ref : "Guest " + ref } : null;
  }
  function custName(ref) { var c = custOf(ref); return c ? c.name : "—"; }
  function custOptions() {
    return db.memberships.filter(function (m) { return m.status === "active"; }).map(function (m) { return '<option value="' + m.membershipId + '">' + esc(person(m.personId).fullName) + "</option>"; }).join("") +
      db.accountHolders.map(function (a) { return '<option value="' + a.id + '">' + esc(a.name) + " (non-member)</option>"; }).join("");
  }
  function hist2(b, action) { b.history.push({ at: NOW, actor: user(), role: role(), action: action }); }
  // A payment raised as a FIN-OPS financial event (BR-092; v07, RC-153): the record and its event
  function fpay(ref, kind, payer, method, amount, success) {
    var p = { id: "FP-" + seq("FP", 4), ref: ref, kind: kind, payer: payer, method: method, amount: amount, result: success ? "success" : "declined", receipt: success ? "FR-" + seq("FR", 4) : null, finance: success ? "accepted" : null, financeRef: null, at: NOW };
    db.facilityPayments.unshift(p);
    if (success && amount > 0) p.financeRef = finOps("FAC", p.id, "FAC-BOOK", payer, amount, { note: "Facility " + kind + " " + ref + " (" + method + ")" }).id;
    return p;
  }
  function frefund(b, kind, amount, reason, status) {
    var x = { id: "FX-" + seq("FX", 4), bookingId: b.id, kind: kind, amount: amount, reason: reason, requestedBy: user(), at: NOW, status: status, decidedBy: null, decidedAt: null, decisionReason: null, finance: null, financeRef: null };
    db.facilityRefunds.unshift(x);
    if (status === "instructed") { var op = db.facilityPayments.filter(function (y) { return y.ref === b.id && y.result === "success"; })[0]; x.finance = "pending"; x.financeRef = finRefundIn("FAC", x.id, b.customer, amount, partsFor(op && op.method, amount), "Facility refund (" + (kind === "exceptional" ? "exceptional" : "24-hour rule") + ")", { kind: "fac", id: x.id }).id; }
    return x;
  }
  // Every rule a slot must pass, in the order staff meet them (BR-086, BR-089, BR-090, BR-088, BR-087, BR-091)
  function checkSlot(x) {
    var r = rsc(x.resource), f = r && fac(r.facility), c = custOf(x.customer);
    if (!f) return { ok: false, msg: "Choose a facility and a resource." };
    var ok = Rules.bizRule086(f, c); if (!ok.ok) return ok;
    if (x.guests && x.guests.length > F.guestLimit) return { ok: false, msg: "Up to " + F.guestLimit + " guests per booking (BR-086)." };
    ok = Rules.bizRule089(f, c.category, x.date, TODAY, F.sameDay); if (!ok.ok) return ok;
    ok = Rules.bizRule090(f, x.start, x.hours); if (!ok.ok) return ok;
    if (x.date === TODAY && x.start < CLOCK.slice(0, 2) + ":00") return { ok: false, msg: "That time has passed (BR-089)." };
    ok = Rules.bizRule088(db.resourceBlocks, x.resource, x.date, x.start, x.hours, r.name); if (!ok.ok) return ok;
    ok = Rules.bizRule087(db.facilityBookings, Object.assign({}, x, { customer: c.ref }), r.name); if (!ok.ok) return ok;
    var price = Rules.bizRule091(f, c.category, x.date, F.publicHolidays.map(function (h) { return h.date; }), x.hours); if (!price.ok) return price;
    return { ok: true, msg: "", f: f, c: c, price: price };
  }
  // A free resource of the facility for the slot, or none (the slot is full: the waiting list may take it, BR-104)
  function freeResource(code, x) {
    return resOf(code).filter(function (r) { var y = Object.assign({}, x, { resource: r.id }); return Rules.bizRule088(db.resourceBlocks, r.id, y.date, y.start, y.hours).ok && Rules.bizRule087(db.facilityBookings, Object.assign({}, y, { customer: "-" })).ok; })[0];
  }
  function rateLine(chk) {
    var hol = F.publicHolidays.filter(function (h) { return h.date === chk.date; })[0];
    return (hol ? hol.name + ": " : "") + chk.price.dayType + " " + CATS[chk.c.category].toLowerCase() + " rate " + money(chk.price.rate) + " / h · total " + money2(chk.price.amount) + " · frozen at confirmation (BR-091)";
  }
  function createBooking(x, chk, channel) {
    var b = { id: "FB-" + seq("FB", 4), customer: chk.c.ref, category: chk.c.category, resource: x.resource, date: x.date, start: x.start, hours: x.hours, status: chk.price.amount ? "pendingPayment" : "confirmed",
      amount: chk.price.amount, channel: channel, createdAt: NOW, createdBy: user(), receipt: null, guests: (x.guests || []).map(function (n) { return { name: n }; }), flag: null, history: [] };
    hist2(b, "Booked (" + channel + ")" + (b.amount ? ", " + money2(b.amount) + " due" : ", free"));
    db.facilityBookings.push(b); gaudit("Facility booking", b.id, where(b) + ", " + slot(b));
    if (b.status === "confirmed") notify("FACILITY_CONFIRMED", custName(b.customer), b.id);
    return b;
  }
  // The next waiting entry for a freed slot is offered for the response window (BR-104)
  function offerNext(code, date, start) {
    var w = Rules.bizRule104Next(db.facilityWaitlist, code, date, start);
    if (!w || !freeResource(code, w)) return null;
    w.status = "offered"; w.offeredAt = NOW; w.offerUntil = Rules.bizRule071(NOW, F.offerHours);
    notify("FACILITY_WAITLIST_OFFER", custName(w.customer), w.id); gaudit("Facility waiting-list offer", w.id, fac(code).name + " " + fdate(date) + " " + start);
    return w;
  }
  function freed(b) { var w = offerNext(rsc(b.resource).facility, b.date, b.start); return w ? " " + short(custName(w.customer)) + " is offered the slot for " + F.offerHours + " hours (BR-104)." : ""; }
  // (v05) Event venues: a published session at a bookable venue is an Event block on its resources; a booking already there is flagged, never removed (BR-088, RC-116)
  function eventBlocks(e) {
    db.resourceBlocks = db.resourceBlocks.filter(function (k) { return !(k.source && k.source.indexOf(e.id + "-") === 0); });
    var f = fac(e.venueId), n = 0, flagged = [];
    if (!f || f.model !== "booking" || e.status !== "published") return { sessions: 0, flagged: 0, msg: "" };
    e.sessions.forEach(function (s) {
      resOf(f.code).forEach(function (r) {
        var k = { id: "RB-" + seq("RB", 2), resource: r.id, from: s.date + " " + s.start, to: s.date + " " + s.end, type: "event", reason: e.name, source: s.id, by: user(), at: NOW, active: true };
        db.resourceBlocks.push(k); n++;
        Rules.bizRule088Flags(db.facilityBookings, k).forEach(function (b) { b.flag = { blockId: k.id, reason: "Event: " + e.name }; hist2(b, "Flagged by event block " + k.id); flagged.push(b.id); });
      });
    });
    return { sessions: e.sessions.length, flagged: flagged.length, msg: resOf(f.code).map(function (r) { return r.name; }).join(", ") + " blocked for " + e.sessions.length + " session" + (e.sessions.length === 1 ? "" : "s") + "; " + flagged.length + " booking" + (flagged.length === 1 ? "" : "s") + " flagged (BR-088)" };
  }
  function venueOf(e) { return fac(e.venueId) || { name: e.venue }; }
  function venueLink(e) { var f = venueOf(e); return f.model === "booking" || f.model === "admission" ? '<a href="' + (f.model === "admission" ? "facility-admission.html" : "facilities.html?facility=" + f.code) + '">' + esc(f.name) + "</a>" : esc(f.name); }
  function occupancy(code) { return fac(code).occupancyStart + db.admissions.filter(function (a) { return a.facility === code && a.date === TODAY && a.status === "admitted"; }).length; }
  function hoursOptions(f, v) { var o = []; for (var h = f.minH; h <= f.maxH; h++) o.push([String(h), h + " hour" + (h > 1 ? "s" : "")]); return options(o, String(v || f.minH)); }
  function startOptions(f, v) { var o = [], m = Rules.mins(f.open); for (; m + 60 * f.minH <= Rules.mins(f.close); m += F.slotMinutes) { var t = Rules.endOf("00:00", m / 60); o.push([t, t]); } return options(o, v); }
  function methodTiles(prefix, online) {
    var ms = online ? [["online", "Online (Pay (simulated))"]] : F.paymentMethods.map(function (m) { return [m, m]; });
    return ms.map(function (m, i) { var id = prefix + i; return '<div class="option"><input type="radio" class="btn-check" name="method" id="' + id + '" value="' + m[0] + '"' + (i === (online ? 0 : 1) ? " checked" : "") + '><label class="option-tile" for="' + id + '">' + esc(m[1]) + "</label></div>"; }).join("");
  }
  function blocked(msg) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">' + esc(msg) + '</p><p><a href="' + (role() === "member" ? "portal.html" : "facilities.html") + '">Back</a></p></div>'; }

  pages.facilities = function () {
    var me = role(), dt = $("#fa-date"), code = qs("facility") || "TEN";
    dt.value = qs("date") || TODAY;
    // (v05, G-1) a code that is not a bookable facility falls back to the first one and says so
    if (!bookable().some(function (f) { return f.code === code; })) { toast("Unknown facility " + code + ": showing " + bookable()[0].name + "."); code = bookable()[0].code; }
    $("#fa-kpis").innerHTML = kpiTiles([["Bookings today", db.facilityBookings.filter(function (b) { return b.date === TODAY && b.status === "confirmed"; }).length, db.facilityBookings.filter(function (b) { return b.date === TODAY && b.status === "confirmed"; }).map(function (b) { return fac(rsc(b.resource).facility).name + " " + b.start; }).join(", ") || "None"],
      ["Pool occupancy", occupancy("POOL") + " / " + fac("POOL").capacity, "Swimming Pool"], ["Gym occupancy", occupancy("GYM") + " / " + fac("GYM").capacity, "Fitness Centre"], ["Open bowling exceptions", db.bowlingExceptions.filter(function (x) { return x.status !== "closed"; }).length, db.bowlingRuns.length ? "Last run " + db.bowlingRuns[0].id : "No run today"]]);
    $("#fa-tabs").innerHTML = bookable().map(function (f) { return '<li class="nav-item" role="presentation"><button class="nav-link' + (f.code === code ? " active" : "") + '" type="button" role="tab" aria-selected="' + (f.code === code) + '" data-fac="' + f.code + '">' + esc(f.name.replace(" (Multi-purpose Court)", "")) + "</button></li>"; }).join("");
    function draw() {
      var f = fac(code), rs = resOf(code), hours = [];
      for (var m = Rules.mins(f.open); m < Rules.mins(f.close); m += 60) hours.push(Rules.endOf("00:00", m / 60));
      $("#fa-day-h").textContent = f.name + " · " + fdate(dt.value) + " (" + Rules.dayType(dt.value, F.publicHolidays.map(function (h) { return h.date; })) + ")";
      $("#fa-grid thead").innerHTML = '<tr><th scope="col">Resource</th>' + hours.map(function (h) { return '<th scope="col">' + h + "</th>"; }).join("") + "</tr>";
      rows($("#fa-grid tbody"), rs.map(function (r) {
        return '<tr><th scope="row">' + esc(r.name) + "</th>" + hours.map(function (h) {
          var b = db.facilityBookings.filter(function (x) { return x.resource === r.id && x.date === dt.value && x.status === "confirmed" && x.start <= h && h < Rules.endOf(x.start, x.hours); })[0];
          var k = db.resourceBlocks.filter(function (x) { return x.active && x.resource === r.id && x.from <= dt.value + " " + h && dt.value + " " + h < x.to; })[0];
          var c = k ? '<span class="badge badge-hold">' + esc(FLABEL[k.type]) + "</span>" : "";
          if (b) c = (b.start === h ? '<span class="badge text-info-emphasis bg-info-subtle"><a href="facility-booking.html?id=' + b.id + '">' + b.id + '</a></span> <span class="text-muted">' + esc(short(custName(b.customer))) + "</span>" : '<span class="text-muted">↳ ' + b.id + "</span>") + (b.flag && b.start === h ? ' <span class="badge text-danger-emphasis bg-danger-subtle">Flagged</span>' : "") + (k && b.start === h ? " " + c : "");
          else if (!k) c = me === "facilities" && (dt.value > TODAY || h >= CLOCK.slice(0, 2) + ":00") ? '<a class="slot-chip" href="facility-booking.html?resource=' + r.id + "&date=" + dt.value + "&start=" + h + '">Book</a>' : '<span class="text-muted">Free</span>';
          return '<td class="slot" data-label="' + h + '">' + c + "</td>";
        }).join("") + "</tr>";
      }).join(""), hours.length + 1);
    }
    $("#fa-tabs").addEventListener("click", function (e) { var c = e.target.getAttribute("data-fac"); if (!c) return; code = c; $$("#fa-tabs .nav-link").forEach(function (b) { b.classList.toggle("active", b === e.target); b.setAttribute("aria-selected", b === e.target); }); draw(); });
    dt.addEventListener("change", draw); draw();
    rows($("#fa-blocks tbody"), db.resourceBlocks.filter(function (k) { return k.active; }).map(function (k) {
      var src = k.source ? ev(k.source.split("-S")[0]) : null;
      return "<tr>" + td("Block", "<strong>" + esc(k.id) + "</strong>") + td("Resource", esc(rsc(k.resource).name)) + td("From – to", esc(fdate(k.from) + " – " + (k.to.slice(0, 10) === k.from.slice(0, 10) ? k.to.slice(11) : fdate(k.to)))) + td("Type", fbadge(k.type)) + td("Reason", esc(k.reason)) +
        td("Source", src ? '<a href="event.html?id=' + src.id + '">' + esc(src.name) + "</a>" : "—") + td("Actions", me === "facilities" && !k.source ? '<div class="cluster">' + ebtn("Remove", 'data-unblock="' + k.id + '"') + "</div>" : "—", "col-actions") + "</tr>";
    }).join(""), 7, "No active blocks.");
    var bf = $("#fa-block-form");
    if (!bf) return;
    bf.elements.resource.innerHTML = options(F.resources.filter(function (r) { return r.active; }).map(function (r) { return [r.id, fac(r.facility).name.split(" (")[0] + " · " + r.name]; }));
    bf.elements.type.innerHTML = options([["maintenance", "Maintenance"], ["lesson", "Lesson"], ["closure", "Operational closure"]]);
    bf.addEventListener("submit", function (e) {
      e.preventDefault();
      var x = { resource: bf.elements.resource.value, type: bf.elements.type.value, from: bf.elements.from.value.replace("T", " "), to: bf.elements.to.value.replace("T", " "), reason: bf.elements.reason.value.trim() }, ok = fcan("block", "none");
      if (ok.ok && (!x.from || !x.to || x.to <= x.from)) ok = { ok: false, msg: "Give a period whose end is after its start (BR-088)." };
      if (ok.ok && !x.reason) ok = { ok: false, msg: "Give the reason for the block (BR-088)." };
      showError($("#fa-block-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
      var k = Object.assign({ id: "RB-" + seq("RB", 2), source: null, by: user(), at: NOW, active: true }, x), fl = Rules.bizRule088Flags(db.facilityBookings, k);
      db.resourceBlocks.push(k); fl.forEach(function (b) { b.flag = { blockId: k.id, reason: FLABEL[k.type] + ": " + k.reason }; hist2(b, "Flagged by block " + k.id); notify("FACILITY_BLOCK_FLAG", custName(b.customer), b.id); });
      gaudit("Resource blocked", k.id, rsc(k.resource).name + " " + k.from + " – " + k.to); save();
      go("facilities.html?facility=" + rsc(k.resource).facility + "&date=" + k.from.slice(0, 10), k.id + " saved" + (fl.length ? "; " + fl.map(function (b) { return b.id; }).join(", ") + " flagged for the club to move or cancel (BR-088)" : ""));
    });
    $("#fa-blocks").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-unblock"); if (!id) return;
      var k = db.resourceBlocks.filter(function (x) { return x.id === id; })[0], ok = fcan("unblock", "active"); if (!ok.ok) return toast(ok.msg, "danger");
      k.active = false; db.facilityBookings.forEach(function (b) { if (b.flag && b.flag.blockId === id) { b.flag = null; hist2(b, "Block " + id + " removed"); } });
      gaudit("Block removed", id, rsc(k.resource).name); save(); go("facilities.html?facility=" + rsc(k.resource).facility, id + " removed: " + rsc(k.resource).name + " is free again");
    });
  };

  pages.facilityBooking = function () {
    var me = role(), counter = me === "facilities", acct = counter ? null : portalAccount(), id = qs("id"), b = id && fbk(id);
    $("#fbk-back").href = counter ? "facility-bookings.html" : "portal.html#portal-facilities-section";
    if (id && !b) return blocked("Unknown booking " + id + ".");
    if (b && !counter) { var own = Rules.bizRule085(acct, b.customer); if (!own.ok) return blocked(own.msg); }
    if (!b) return newForm();
    return view(b);

    function newForm() {
      var f = $("#fbk-form"), w = qs("wait") && db.facilityWaitlist.filter(function (x) { return x.id === qs("wait"); })[0];
      $("#fbk-new").hidden = false; $("#fbk-view").hidden = true; $("#pg-title").textContent = "New facility booking";
      $("#fbk-customers").innerHTML = custOptions();
      f.elements.category.innerHTML = options(Object.keys(CATS).map(function (k) { return [k, CATS[k]]; })); f.elements.category.disabled = true;
      f.elements.facility.innerHTML = options(bookable().map(function (x) { return [x.code, x.name]; }));
      var r0 = qs("resource") && rsc(qs("resource"));
      if (r0) f.elements.facility.value = r0.facility;
      if (w) f.elements.facility.value = w.facility;
      if (!counter) { f.elements.customer.value = acct; f.elements.customer.readOnly = true; f.elements.resource.closest(".field").hidden = true; f.elements.guests.closest(".field").hidden = !mem(acct); }
      f.elements.date.value = (w && w.date) || qs("date") || TODAY;
      function fill() {
        var fx = fac(f.elements.facility.value);
        f.elements.resource.innerHTML = options(resOf(fx.code).map(function (r) { return [r.id, r.name]; }), r0 && r0.facility === fx.code ? r0.id : undefined);
        f.elements.start.innerHTML = startOptions(fx, (w && w.start) || qs("start")); f.elements.hours.innerHTML = hoursOptions(fx, w && w.hours);
      }
      function read() {
        var fx = fac(f.elements.facility.value), x = { customer: f.elements.customer.value.trim(), resource: f.elements.resource.value, date: f.elements.date.value, start: f.elements.start.value, hours: +f.elements.hours.value,
          guests: f.elements.guests.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean) };
        if (!counter) { var fr = freeResource(fx.code, x); x.resource = fr ? fr.id : resOf(fx.code)[0].id; }
        return x;
      }
      function preview() {
        var x = read(), c = custOf(x.customer), chk = checkSlot(x);
        if (c) f.elements.category.value = c.category;
        $("#fbk-rate").textContent = chk.ok ? rateLine(Object.assign({ date: x.date }, chk)) : chk.msg;
        $("#fbk-rate").className = "alert field--full mb-0 " + (chk.ok ? "alert-info" : "alert-warning");
        var full = !freeResource(f.elements.facility.value, x), fx = fac(f.elements.facility.value);
        $("#fbk-join").hidden = !(full && fx.waitlist && /booked|full/.test(chk.msg || "x"));
        $("#fbk-sum").innerHTML = facts([["Reference", "Issued on confirmation"], ["When", fdate(x.date) + ", " + x.start + " – " + Rules.endOf(x.start, x.hours)], ["Where", fx.name + (counter ? " · " + (rsc(x.resource) || {}).name : "")], ["Customer", c ? c.name + " (" + c.ref + ")" : "—"],
          ["Category", c ? CATS[c.category] : "—"], ["Amount", chk.ok ? money2(chk.price.amount) : "—"], ["Status", fbadge("pendingPayment"), true]]);
        return chk;
      }
      f.elements.facility.addEventListener("change", function () { fill(); preview(); }); ["input", "change"].forEach(function (ev2) { f.addEventListener(ev2, preview); });
      fill(); preview();
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var x = read(), ok = fcan("book", "none"), chk = ok.ok ? checkSlot(x) : ok;
        if (!chk.ok && !counter && /booked/.test(chk.msg) && freeResource(f.elements.facility.value, x)) chk = checkSlot(Object.assign(x, { resource: freeResource(f.elements.facility.value, x).id }));
        showError($("#fbk-err"), chk.ok ? "" : chk.msg); if (!chk.ok) return;
        var nb = createBooking(x, chk, counter ? "counter" : "online");
        if (w) { w.bookingId = nb.id; }
        save(); go("facility-booking.html?id=" + nb.id + (w ? "&wait=" + w.id : ""), nb.status === "confirmed" ? nb.id + " confirmed (free facility)" : nb.id + ": " + money2(nb.amount) + " to pay before it is confirmed (BR-092)");
      });
      $("#fbk-join").addEventListener("click", function () {
        var x = read(), fx = fac(f.elements.facility.value), c = custOf(x.customer), ok = fcan("join", "none");
        if (ok.ok) ok = Rules.bizRule086(fx, c); if (ok.ok) ok = Rules.bizRule104(fx, !freeResource(fx.code, x));
        if (ok.ok && db.facilityWaitlist.some(function (y) { return y.customer === c.ref && y.facility === fx.code && y.date === x.date && y.start === x.start && (y.status === "waiting" || y.status === "offered"); })) ok = { ok: false, msg: c.name + " is already on this waiting list (BR-104)." };
        showError($("#fbk-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
        var y = { id: "FW-" + seq("FW", 2), customer: c.ref, category: c.category, facility: fx.code, date: x.date, start: x.start, hours: x.hours, joinedAt: NOW, status: "waiting", offeredAt: null, offerUntil: null, bookingId: null };
        db.facilityWaitlist.push(y); gaudit("Joined the facility waiting list", y.id, fx.name + " " + fdate(x.date) + " " + x.start); save();
        go(counter ? "facility-bookings.html#fl-1" : "portal.html#portal-facilities-section", y.id + ": " + c.name + " is on the waiting list for " + fx.name + " " + fdate(x.date) + " " + x.start + " (BR-104)");
      });
    }

    function view(b) {
      var f = fac(rsc(b.resource).facility), pend = b.pendingAmend, due = b.status === "pendingPayment" ? b.amount : pend ? pend.extra : 0, w = qs("wait") && db.facilityWaitlist.filter(function (x) { return x.id === qs("wait"); })[0];
      $("#fbk-new").hidden = true; $("#fbk-view").hidden = false; $("#pg-title").textContent = "Booking " + b.id;
      if (b.flag) { $("#fbk-flag").hidden = false; $("#fbk-flag").innerHTML = "<strong>Flagged:</strong> " + esc(b.flag.reason) + " (" + esc(b.flag.blockId) + ") covers this booking. Move it or cancel it as club-initiated (BR-088, BR-095)."; }
      $("#fbk-facts").innerHTML = facts([["Reference", "<strong>" + esc(b.id) + "</strong>", true], ["When", slot(b)], ["Where", where(b)], ["Customer", esc(custName(b.customer)) + " (" + (mem(b.customer) && counter ? memberLink(b.customer) : esc(b.customer)) + ")", true], ["Category", CATS[b.category]],
        ["Guests", b.guests.map(function (g) { return g.name; }).join(", ") || "—"], ["Amount", money2(b.amount) + (b.receipt ? " · receipt " + b.receipt : "")], ["Channel", b.channel === "online" ? "Online" : "Counter"], ["Status", fbadge(b.status) + (b.flag ? " " + fbadge("flagged") : ""), true]]);
      $("#fbk-hist").innerHTML = timeline(b.history.map(function (h) { return { at: h.at, actor: h.actor, role: h.role, action: h.action }; }));
      var live = b.status === "confirmed", started = b.date + " " + b.start <= NOW;
      $("#fbk-pay").hidden = !due; $("#fbk-change").hidden = !live || started || !!pend; $("#fbk-cancel-card").hidden = b.status === "pendingPayment" || !!pend;
      var none = $("#fbk-pay").hidden && $("#fbk-change").hidden && (!live && !(counter && ["cancelled", "noShow"].indexOf(b.status) >= 0));
      if (none) { $("#fbk-cancel-card").hidden = true; $("#fbk-none").hidden = false; $("#fbk-none").textContent = "Nothing more to do: this booking is " + FLABEL[b.status].toLowerCase() + "."; }
      $("#fbk-due").innerHTML = pend ? "Amendment to " + esc(fdate(pend.date) + " " + pend.start + ", " + pend.hours + " h") + ": <strong>" + money2(due) + "</strong> to pay first; the booking changes only when it is paid (BR-093)." : "<strong>" + money2(due) + "</strong> to pay; the slot is reserved only when the payment succeeds (BR-092).";
      $("#fbk-method-tiles").innerHTML = methodTiles("pm", !counter);
      var hb = Rules.hoursUntil(NOW, b.date, b.start), cancel = Rules.bizRule095(b.amount, hb, "customer", F.cancelCutoffHours);
      $("#fbk-refund-line").textContent = live ? (started ? "The booking has started: record a no-show, or cancel with no refund." : cancel.msg + (cancel.refund ? " " + money2(cancel.refund) + " goes to FIN-OPS refunds." : "")) : "This booking is " + FLABEL[b.status] + ".";
      // staff-only buttons are not on a Member tab (data-for-roles)
      if (counter) $("#fbk-noshow").hidden = !live || !started; $("#fbk-cancel").hidden = !live;
      var paidBack = db.facilityRefunds.filter(function (x) { return x.bookingId === b.id && x.status !== "rejected"; }).reduce(function (a, x) { return a + x.amount; }, 0);
      if (counter) $("#fbk-xrefund").hidden = ["cancelled", "noShow"].indexOf(b.status) < 0 || paidBack >= b.amount;
      if (counter && live && b.flag) { var cc = document.createElement("button"); cc.type = "button"; cc.className = "btn btn-outline-danger"; cc.id = "fbk-club"; cc.textContent = "Cancel (club)"; $("#fbk-cancel").before(cc); }
      // amendment form
      var af = $("#fbk-amend-form");
      af.elements.resource.innerHTML = options(resOf(f.code).map(function (r) { return [r.id, r.name]; }), b.resource); af.elements.resource.closest(".field").hidden = !counter;
      af.elements.date.value = b.date; af.elements.start.innerHTML = startOptions(f, b.start); af.elements.hours.innerHTML = hoursOptions(f, b.hours);
      function readA() { return { id: b.id, customer: b.customer, resource: counter ? af.elements.resource.value : b.resource, date: af.elements.date.value, start: af.elements.start.value, hours: +af.elements.hours.value, guests: b.guests.map(function (g) { return g.name; }) }; }
      function noteA() {
        var x = readA(), chk = checkSlot(x);
        if (!chk.ok && !counter && /booked/.test(chk.msg)) { var fr = freeResource(f.code, x); if (fr) { x.resource = fr.id; chk = checkSlot(x); } }
        if (!chk.ok) { $("#fbk-amend-note").textContent = chk.msg; return { x: x, chk: chk }; }
        var d = Rules.bizRule093(b.amount, chk.price.amount, hb, F.cancelCutoffHours);
        $("#fbk-amend-note").textContent = "New amount " + money2(chk.price.amount) + (d.extra ? ": " + money2(d.extra) + " to pay first" : d.refund ? ": " + money2(d.refund) + " refunded" : chk.price.amount < b.amount ? ": less than 24 hours before the start, nothing is refunded" : "") + " (BR-093).";
        return { x: x, chk: chk, d: d };
      }
      ["change", "input"].forEach(function (ev2) { af.addEventListener(ev2, noteA); }); if (live) noteA();
      af.addEventListener("submit", function (e) {
        e.preventDefault();
        var a = noteA(), ok = fcan("amend", b.status); if (ok.ok) ok = a.chk;
        showError($("#fbk-amend-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
        if (a.d.extra) { b.pendingAmend = { resource: a.x.resource, date: a.x.date, start: a.x.start, hours: a.x.hours, amount: a.chk.price.amount, extra: a.d.extra }; hist2(b, "Amendment started: " + money2(a.d.extra) + " to pay first"); save(); return go("facility-booking.html?id=" + b.id, money2(a.d.extra) + " to pay before the change (BR-093)"); }
        var old = { date: b.date, start: b.start, resource: b.resource };
        Object.assign(b, { resource: a.x.resource, date: a.x.date, start: a.x.start, hours: a.x.hours, amount: a.chk.price.amount, flag: null });
        if (a.d.refund) frefund(b, "standard", a.d.refund, "Amendment to a lower amount (BR-093)", "instructed");
        hist2(b, "Amended to " + slot(b) + (a.d.refund ? ", " + money2(a.d.refund) + " refunded" : "")); gaudit("Facility booking amended", b.id, slot(b));
        var msg = b.id + " amended (BR-093)" + (a.d.refund ? "; " + money2(a.d.refund) + " refund instructed" : "") + "." + freed(Object.assign({}, b, old)); save(); go("facility-booking.html?id=" + b.id, msg);
      });
      if (counter) $("#fbk-move").addEventListener("click", function () {
        var x = readA(), ok = fcan("move", b.status), chk = ok.ok ? checkSlot(x) : ok;
        showError($("#fbk-amend-err"), chk.ok ? "" : chk.msg); if (!chk.ok) return;
        var old = { date: b.date, start: b.start, resource: b.resource };
        Object.assign(b, { resource: x.resource, date: x.date, start: x.start, hours: x.hours, flag: null });
        hist2(b, "Moved by the club to " + where(b) + ", " + slot(b) + "; no refund due (BR-095)"); notify("FACILITY_MOVED", custName(b.customer), b.id); gaudit("Facility booking moved (club)", b.id, where(b));
        save(); go("facility-booking.html?id=" + b.id, b.id + " moved to " + rsc(b.resource).name + "; the flag is cleared and no refund is due (BR-095)." + freed(Object.assign({}, b, old)));
      });
      // payment
      function pay(success) {
        var method = ($("input[name=method]:checked") || {}).value, ok = fcan("pay", "pendingPayment");
        if (ok.ok) ok = Rules.bizRule092(due, method, success);
        fpay(b.id, pend ? "amendment" : "booking", b.customer, method, due, ok.ok);
        if (!ok.ok) { hist2(b, "Payment declined (" + method + ")"); save(); showError($("#fbk-pay-err"), ok.msg + (pend ? " The original booking stays (BR-093)." : " Try again or choose another method.")); if (pend && !success) { delete b.pendingAmend; save(); go("facility-booking.html?id=" + b.id, "Payment declined: the original booking stays (BR-093)"); } else if (w && !success) { w.status = "expired"; w.bookingId = null; b.status = "cancelled"; b.cancelReason = "Waiting-list payment failed"; offerNext(w.facility, w.date, w.start); save(); go("portal.html#portal-facilities-section", "Payment failed: the offer has ended and the next customer is offered (BR-104)"); } return; }
        if (pend) {
          var old = { date: b.date, start: b.start, resource: b.resource };
          Object.assign(b, { resource: pend.resource, date: pend.date, start: pend.start, hours: pend.hours, amount: pend.amount, flag: null }); delete b.pendingAmend;
          hist2(b, "Amended to " + slot(b) + ", " + money2(due) + " paid"); gaudit("Facility booking amended", b.id, slot(b)); save(); return go("facility-booking.html?id=" + b.id, b.id + " amended: " + money2(due) + " paid, same reference (BR-093)." + freed(Object.assign({}, b, old)));
        }
        var clash = Rules.bizRule087(db.facilityBookings, b, rsc(b.resource).name); if (!clash.ok) { showError($("#fbk-pay-err"), clash.msg + " Nothing was charged; choose another slot."); return; }
        b.status = "confirmed"; b.receipt = db.facilityPayments[0].receipt; hist2(b, "Confirmed: " + money2(due) + " " + method + ", receipt " + b.receipt);
        var wl = db.facilityWaitlist.filter(function (x) { return x.bookingId === b.id && x.status === "offered"; })[0]; if (wl) { wl.status = "booked"; }
        notify("FACILITY_CONFIRMED", custName(b.customer), b.id); gaudit("Facility booking confirmed", b.id, money2(due)); save();
        go(counter ? "facility-booking.html?id=" + b.id : "portal.html#portal-facilities-section", b.id + " confirmed: receipt " + b.receipt + "; payment raised in FIN-OPS (BR-092)");
      }
      $("#fbk-success").addEventListener("click", function () { pay(true); }); $("#fbk-decline").addEventListener("click", function () { pay(false); });
      function cancelAs(by) {
        ask({ title: "Cancel " + b.id + "?", body: by === "club" ? "Cancelled by the club: full refund " + money2(b.amount) + " to FIN-OPS refunds (BR-095)." : $("#fbk-refund-line").textContent, reason: "Reason (required)", ok: "Cancel booking", danger: true, run: function (why) {
          var ok = fcan("cancel", b.status); if (ok.ok) ok = Rules.bizRule094(why); if (!ok.ok) return ok;
          var rf = Rules.bizRule095(b.amount, hb, by, F.cancelCutoffHours);
          b.status = "cancelled"; b.cancelReason = why.trim(); b.cancelledAt = NOW; b.cancelledBy = by; b.refund = rf.refund; b.flag = null;
          if (rf.refund) frefund(b, "standard", rf.refund, (by === "club" ? "Club cancellation" : "Customer cancellation") + ": " + why.trim(), "instructed");
          hist2(b, "Cancelled (" + by + "): " + why.trim() + "; " + (rf.refund ? money2(rf.refund) + " refund instructed" : "no refund")); notify(by === "club" ? "FACILITY_CANCELLED_CLUB" : "FACILITY_CANCELLED", custName(b.customer), b.id); gaudit("Facility booking cancelled", b.id, by + ", " + why.trim());
          var msg = b.id + " cancelled. " + rf.msg + freed(b); save(); go(counter ? "facility-booking.html?id=" + b.id : "portal.html#portal-facilities-section", msg); return { ok: true };
        } });
      }
      $("#fbk-cancel").addEventListener("click", function () { cancelAs("customer"); });
      if ($("#fbk-club")) $("#fbk-club").addEventListener("click", function () { cancelAs("club"); });
      if (counter) $("#fbk-noshow").addEventListener("click", function () {
        var ok = fcan("noShow", b.status); if (ok.ok) ok = Rules.bizRule097(b, NOW); if (!ok.ok) return toast(ok.msg, "danger");
        b.status = "noShow"; b.noShowAt = NOW; b.noShowBy = user(); hist2(b, "No-show recorded; no standard refund (BR-097)"); gaudit("Facility no-show", b.id, where(b)); save(); go("facility-booking.html?id=" + b.id, ok.msg);
      });
      if (counter) $("#fbk-xrefund").addEventListener("click", function () {
        ask({ title: "Request an exceptional refund for " + b.id + "?", body: money2(b.amount - paidBack) + " outside the standard policy; the Operations Manager decides it in Approvals (BR-096).", reason: "Reason (required)", ok: "Request refund", run: function (why) {
          var ok = fcan("requestRefund", b.status); if (!ok.ok) return ok; if (!String(why || "").trim()) return { ok: false, msg: "Give the reason (BR-096)." };
          if (db.facilityRefunds.some(function (x) { return x.bookingId === b.id && x.status === "requested"; })) return { ok: false, msg: "A request for " + b.id + " is already waiting (BR-096)." };
          var x = frefund(b, "exceptional", b.amount - paidBack, why.trim(), "requested"); hist2(b, "Exceptional refund " + x.id + " requested"); gaudit("Exceptional refund requested", x.id, money2(x.amount)); save();
          go("facility-booking.html?id=" + b.id, x.id + " requested: waiting for the Operations Manager (BR-096)"); return { ok: true };
        } });
      });
    }
  };

  pages.facilityBookings = function () {
    var me = role(), fdt = $("#fl-date"), ff = $("#fl-facility"), fs = $("#fl-status"), fq = $("#fl-q");
    ff.innerHTML = '<option value="">All facilities</option>' + options(bookable().map(function (f) { return [f.code, f.name]; }));
    fs.innerHTML = '<option value="">All statuses</option>' + options(["pendingPayment", "confirmed", "completed", "noShow", "cancelled"].map(function (s) { return [s, FLABEL[s]]; }));
    function draw() {
      var q = fq.value.trim().toLowerCase();
      var list = db.facilityBookings.filter(function (b) { return (!fdt.value || b.date === fdt.value) && (!ff.value || rsc(b.resource).facility === ff.value) && (!fs.value || b.status === fs.value) && (!q || (b.customer + " " + custName(b.customer)).toLowerCase().indexOf(q) >= 0); })
        .sort(function (a, b) { return (a.date + a.start) < (b.date + b.start) ? -1 : 1; });
      rows($("#fl-list tbody"), list.map(function (b) {
        return "<tr>" + td("Booking", '<a href="facility-booking.html?id=' + b.id + '"><strong>' + b.id + "</strong></a>") + td("Facility · resource", esc(where(b))) + td("When", esc(slot(b)), "num") + td("Customer", esc(custName(b.customer)) + ' <span class="text-muted">' + esc(b.customer) + "</span>") +
          td("Category", esc(CATS[b.category])) + td("Amount", money2(b.amount), "num") + td("Status", fbadge(b.status) + (b.flag ? " " + fbadge("flagged") : ""), "col-status") + "</tr>";
      }).join(""), 7, "No bookings match these filters.");
    }
    [fdt, ff, fs].forEach(function (x) { x.addEventListener("change", draw); }); fq.addEventListener("input", draw); fq.form.addEventListener("submit", function (e) { e.preventDefault(); }); draw();
    rows($("#fw-list tbody"), db.facilityWaitlist.slice().sort(function (a, b) { return (a.date + a.start + a.joinedAt) < (b.date + b.start + b.joinedAt) ? -1 : 1; }).map(function (w) {
      var acts = me !== "facilities" ? "—" : '<div class="cluster">' + (w.status === "offered" ? ebtn("Let offer expire", 'data-wexp="' + w.id + '"') : "") + (w.status === "waiting" || w.status === "offered" ? ebtn("Withdraw", 'data-wwd="' + w.id + '"') : "") + "</div>";
      return "<tr>" + td("Entry", "<strong>" + w.id + "</strong>") + td("Slot", esc(fac(w.facility).name + " · " + fdate(w.date) + " " + w.start + " – " + Rules.endOf(w.start, w.hours))) + td("Customer", esc(custName(w.customer)) + ' <span class="text-muted">' + esc(w.customer) + "</span>") +
        td("Category", esc(CATS[w.category])) + td("Joined", esc(fdate(w.joinedAt)), "num") + td("Status", fbadge(w.status), "col-status") + td("Offer until", w.offerUntil ? esc(fdate(w.offerUntil)) : "—") + td("Actions", acts, "col-actions col-actions--wrap") + "</tr>";
    }).join(""), 8, "Nobody is waiting.");
    $("#fw-list").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-wexp") || e.target.getAttribute("data-wwd"); if (!id) return;
      var w = db.facilityWaitlist.filter(function (x) { return x.id === id; })[0], exp = !!e.target.getAttribute("data-wexp"), ok = fcan(exp ? "expire" : "withdraw", w.status); if (!ok.ok) return toast(ok.msg, "danger");
      var was = w.status; w.status = exp ? "expired" : "withdrawn";
      if (w.bookingId) { var pb = fbk(w.bookingId); if (pb && pb.status === "pendingPayment") { pb.status = "cancelled"; pb.cancelReason = "Waiting-list offer ended"; } w.bookingId = null; }
      gaudit(exp ? "Waiting-list offer expired" : "Waiting-list entry withdrawn", w.id, custName(w.customer));
      var nx = was === "offered" ? offerNext(w.facility, w.date, w.start) : null; save();
      go("facility-bookings.html#fl-1", w.id + (exp ? ": offer expired" : ": withdrawn") + (nx ? "; " + short(custName(nx.customer)) + " is offered the slot (BR-104)" : ""));
    });
    var jf = $("#fw-form");
    if (jf) {
      $$("#fbk-customers").forEach(function (d) { d.innerHTML = custOptions(); });
      jf.elements.facility.innerHTML = options(bookable().filter(function (f) { return f.waitlist; }).map(function (f) { return [f.code, f.name]; }), "KAR");
      jf.elements.date.value = "2026-10-31";
      function fillJ() { var f = fac(jf.elements.facility.value); jf.elements.start.innerHTML = startOptions(f, "19:00"); jf.elements.hours.innerHTML = hoursOptions(f, 2); }
      jf.elements.facility.addEventListener("change", fillJ); fillJ();
      jf.addEventListener("submit", function (e) {
        e.preventDefault();
        var f = fac(jf.elements.facility.value), c = custOf(jf.elements.customer.value), x = { date: jf.elements.date.value, start: jf.elements.start.value, hours: +jf.elements.hours.value }, ok = fcan("join", "none");
        if (ok.ok) ok = c ? Rules.bizRule086(f, c) : { ok: false, msg: "Enter the customer." }; if (ok.ok) ok = Rules.bizRule104(f, !freeResource(f.code, x));
        if (ok.ok && db.facilityWaitlist.some(function (y) { return y.customer === c.ref && y.facility === f.code && y.date === x.date && y.start === x.start && (y.status === "waiting" || y.status === "offered"); })) ok = { ok: false, msg: c.name + " is already on this waiting list (BR-104)." };
        showError($("#fw-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
        var y = { id: "FW-" + seq("FW", 2), customer: c.ref, category: c.category, facility: f.code, date: x.date, start: x.start, hours: x.hours, joinedAt: NOW, status: "waiting", offeredAt: null, offerUntil: null, bookingId: null };
        db.facilityWaitlist.push(y); gaudit("Joined the facility waiting list", y.id, f.name); save(); go("facility-bookings.html#fl-1", y.id + ": " + c.name + " is waiting for " + f.name + " " + fdate(x.date) + " " + x.start + " (BR-104)");
      });
    }
    if (location.hash === "#fl-1") bootstrap.Tab.getOrCreateInstance($("#fl-1-btn")).show();
  };

  pages.facilityAdmission = function () {
    $$("#fbk-customers").forEach(function (d) { d.innerHTML = custOptions(); });
    var time = CLOCK;
    ["pool", "gym"].forEach(function (k) {
      var code = k === "pool" ? "POOL" : "GYM", f = fac(code), af = $("#" + k + "-form"), occ = occupancy(code);
      $("#" + k + "-occ-t").textContent = occ + " / " + f.capacity;
      var pb = $("#" + k + "-occ"); pb.max = f.capacity; pb.value = occ; pb.textContent = occ + " / " + f.capacity;  // a native progress: no inline width (Layout-12)
      $("#" + k + "-info").textContent = "Open " + f.open + " – " + f.close + " · " + Object.keys(f.fees).map(function (c) { return CATS[c] + " " + (f.fees[c] ? money(f.fees[c]) : "free"); }).join(", ");
      af.elements.category.innerHTML = options(f.eligible.map(function (c) { return [c, CATS[c]]; }));
      af.elements.method.innerHTML = options(F.paymentMethods.map(function (m) { return [m, m]; }));
      af.elements.category.disabled = true;  // the category follows the customer (BR-086)
      function who() {
        var c = custOf(af.elements.customer.value);
        // in the gym a reservation number makes the customer a resort guest (v06, RC-121); anyone else who is not a member is a non-member on a day pass (BR-099)
        var code2 = k === "gym" ? af.elements.pass.value.trim().toUpperCase() : "";
        if (k === "gym" && /^RR-\d{4}$/.test(code2)) c = custOf(code2);
        else if (c && k === "gym" && c.category !== "member") { c.category = "nonMember"; c.dayPass = db.dayPasses.filter(function (d) { return d.code === code2; })[0] || (code2 ? { code: code2, date: "" } : null); }
        if (c && f.eligible.indexOf(c.category) >= 0) af.elements.category.value = c.category;
        return c;
      }
      // a non-member enters the gym on the day pass bought first, so the entry itself carries no second fee (BR-099, BR-100)
      function fee() { var c = who(); var x = c && !(k === "gym" && c.category === "nonMember") ? f.fees[c.category] || 0 : 0; $("#" + k + "-fee").textContent = c ? (x ? CATS[c.category] + " admission fee " + money2(x) + " · paid before entry" : CATS[c.category] + (k === "gym" && c.category === "nonMember" ? ": admitted on a day pass (S$" + F.dayPassRate + ", sold below)" : ": no admission fee")) : "Enter the customer."; return x; }
      ["input", "change"].forEach(function (e) { af.addEventListener(e, fee); }); fee();
      af.addEventListener("submit", function (e) {
        e.preventDefault();
        var c = who(), amount = fee(), ok = fcan("admit", "none");
        if (ok.ok) ok = c ? Rules.bizRule086(f, c) : { ok: false, msg: "Enter the customer." };
        if (ok.ok && k === "pool" && c.category === "guest") { var h = custOf(af.elements.host.value); ok = h && h.category === "member" && h.status === "active" ? OK2 : { ok: false, msg: "A guest needs an Active member as host (BR-086)." }; }
        if (ok.ok && k === "gym") ok = Rules.bizRule099(c, db.resortReservations, TODAY);
        if (ok.ok) ok = Rules.bizRule098(f, occupancy(code), time);
        showError($("#" + k + "-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
        var a = { id: "AD-" + seq("AD", 4), facility: code, customer: c.ref, category: c.category, date: TODAY, in: time, out: null, fee: amount, status: "admitted", pass: c.pass || (c.dayPass && c.dayPass.code) || null, by: user() };
        db.admissions.unshift(a); if (amount) fpay(a.id, "admission", c.ref, af.elements.method.value, amount, true);
        gaudit("Admission", a.id, f.name + ", " + c.name); save(); go("facility-admission.html" + (k === "gym" ? "#ad-1" : ""), short(c.name) + " admitted to the " + f.name.split(" (")[0] + (amount ? " (" + money2(amount) + " paid)" : "") + (c.category === "resortGuest" ? "; resort guest, in-house stay " + c.pass + " (BR-099)" : ""));
      });
      rows($("#" + k + "-list tbody"), db.admissions.filter(function (a) { return a.facility === code && a.date === TODAY; }).map(function (a) {
        var again = a.status === "left" && a.pass && /^DP-/.test(a.pass) && !db.admissions.some(function (x) { return x !== a && x.pass === a.pass && x.status === "admitted"; });
        var act = a.status === "admitted" ? ebtn("Record exit", 'data-exit="' + a.id + '"') : again ? ebtn("Re-enter", 'data-again="' + a.id + '"') : "—";
        return "<tr>" + td("Admission", "<strong>" + a.id + "</strong>") + td("In", esc(a.in) + (a.out ? " – " + esc(a.out) : ""), "num") + td("Customer", esc(custName(a.customer))) + td("Category", esc(CATS[a.category])) + td("Fee", money2(a.fee), "num") + td("Pass", esc(a.pass || "—")) +
          td("Status", fbadge(a.status), "col-status") + td("Actions", '<div class="cluster">' + act + "</div>", "col-actions") + "</tr>";
      }).join(""), 8, "Nobody admitted today.");
    });
    var ev4 = db.events.filter(function (e) { return e.venueId === "POOL" && evStatus(e) === "published"; }), today = [];
    ev4.forEach(function (e) { e.sessions.forEach(function (s) { if (s.date === TODAY) today.push('<a href="event.html?id=' + e.id + '">' + esc(e.name) + "</a> " + s.start + " – " + s.end); }); });
    $("#pool-lessons").innerHTML = "Lessons and programmes are run by Events (D-118)." + (today.length ? " Today at the pool: " + today.join(", ") + "." : "") + ' <a href="events.html">Open the Events schedule</a>';
    $("main").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-exit") || e.target.getAttribute("data-again"); if (!id) return;
      var a = db.admissions.filter(function (x) { return x.id === id; })[0], gym = a.facility === "GYM";
      if (e.target.getAttribute("data-exit")) { var ok = fcan("exit", a.status); if (!ok.ok) return toast(ok.msg, "danger"); a.status = "left"; a.out = CLOCK; gaudit("Admission exit", a.id, custName(a.customer)); save(); return go("facility-admission.html" + (gym ? "#ad-1" : ""), short(custName(a.customer)) + " left"); }
      var dp = db.dayPasses.filter(function (d) { return d.code === a.pass; })[0], chk = Rules.bizRule100(dp, TODAY); if (chk.ok) chk = Rules.bizRule098(fac(a.facility), occupancy(a.facility), CLOCK); if (!chk.ok) return toast(chk.msg, "danger");
      var n = Object.assign({}, a, { id: "AD-" + seq("AD", 4), in: CLOCK, out: null, fee: 0, status: "admitted" }); db.admissions.unshift(n); gaudit("Admission re-entry", n.id, a.pass); save();
      go("facility-admission.html#ad-1", short(custName(a.customer)) + " re-entered on day pass " + a.pass + ": no new charge (BR-100)");
    });
    var dpf = $("#dp-form"); dpf.elements.method.innerHTML = options(F.paymentMethods.map(function (m) { return [m, m]; }));
    dpf.addEventListener("submit", function (e) {
      e.preventDefault();
      var c = custOf(dpf.elements.holder.value), ok = fcan("sellPass", "none");
      if (ok.ok && (!c || c.category === "member")) ok = { ok: false, msg: c ? "Members enter the Fitness Centre on their membership: no day pass needed (BR-099)." : "Enter the non-member." };
      showError($("#dp-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
      var d = { code: "DP-" + seq("DP", 4), holder: c.category === "nonMember" ? c.ref : null, name: c.category === "nonMember" ? null : c.name, date: TODAY, amount: F.dayPassRate, receipt: null, by: user() };
      d.receipt = fpay(d.code, "dayPass", c.ref, dpf.elements.method.value, d.amount, true).receipt; db.dayPasses.unshift(d);
      gaudit("Day pass sold", d.code, c.name); save(); go("facility-admission.html#ad-1", "Day pass " + d.code + " for " + short(c.name) + ": valid today only (BR-100); admit with the pass code");
    });
    var pf = $("#pt-form"); pf.elements.trainer.innerHTML = options(db.fitnessInstructors.filter(function (i) { return i.active; }).map(function (i) { return [i.id, i.name + " · " + i.speciality]; }));
    pf.elements.date.value = Rules.addDays(TODAY, 7); pf.elements.start.value = "07:00";
    pf.addEventListener("submit", function (e) {
      e.preventDefault();
      var c = custOf(pf.elements.participant.value), ok = fcan("createPt", "none"); if (ok.ok) ok = Rules.bizRule106(c);
      showError($("#pt-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
      var s = { id: "PT-" + seq("PT", 2), participant: c.ref, trainer: pf.elements.trainer.value, date: pf.elements.date.value, start: pf.elements.start.value, status: "pendingPolicy", by: user(), at: NOW };
      db.ptSessions.unshift(s); gaudit("PT session created", s.id, c.name); save(); go("facility-admission.html#ad-1", s.id + " created: Pending policy (BR-106)");
    });
    rows($("#pt-list tbody"), db.ptSessions.map(function (s) {
      var tr = db.fitnessInstructors.filter(function (i) { return i.id === s.trainer; })[0];
      var acts = '<div class="cluster">' + (s.status === "pendingPolicy" ? ebtn("Confirm", 'data-ptc="' + s.id + '"', "primary") : "") + (s.status !== "cancelled" ? ebtn("Cancel", 'data-ptx="' + s.id + '"') : "") + "</div>";
      return "<tr>" + td("Session", "<strong>" + s.id + "</strong>") + td("Participant", esc(custName(s.participant))) + td("Trainer", esc(tr ? tr.name : s.trainer)) + td("When", esc(fdate(s.date) + " " + s.start), "num") + td("Status", fbadge(s.status), "col-status") + td("Actions", acts, "col-actions") + "</tr>";
    }).join(""), 6, "No Personal Training sessions.");
    $("#pt-list").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-ptc") || e.target.getAttribute("data-ptx"); if (!id) return;
      var s = db.ptSessions.filter(function (x) { return x.id === id; })[0], conf = !!e.target.getAttribute("data-ptc"), ok = fcan(conf ? "confirmPt" : "cancelPt", s.status);
      if (ok.ok && conf) ok = Rules.bizRule106(custOf(s.participant)); if (!ok.ok) return toast(ok.msg, "danger");
      s.status = conf ? "confirmed" : "cancelled"; gaudit("PT session " + s.status, s.id, custName(s.participant)); save(); go("facility-admission.html#ad-1", s.id + (conf ? " confirmed (BR-106)" : " cancelled: no charge or refund assumed"));
    });
    if (location.hash === "#ad-1") bootstrap.Tab.getOrCreateInstance($("#ad-1-btn")).show();
  };
  var OK2 = { ok: true, msg: "" };

  pages.bowling = function () {
    var bf = $("#bw-form");
    bf.elements.method.innerHTML = options(F.paymentMethods.map(function (m) { return [m, m]; }), "Card");
    bf.addEventListener("submit", function (e) {
      e.preventDefault();
      var t = { receiptNo: bf.elements.receipt.value.trim().toUpperCase(), amount: +bf.elements.amount.value, method: bf.elements.method.value, member: bf.elements.member.value.trim().toUpperCase() || null }, ok = fcan("recordSale", "none");
      if (ok.ok) ok = Rules.bizRule101(t);
      if (ok.ok && db.bowlingTxns.some(function (x) { return x.receiptNo === t.receiptNo; })) ok = { ok: false, msg: "Receipt " + t.receiptNo + " is already recorded (BR-101)." };
      showError($("#bw-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
      var x = Object.assign({ id: "BT-" + seq("BT", 2), date: TODAY, at: NOW, by: user(), status: "paid", runId: null }, t);
      db.bowlingTxns.push(x); fpay(x.id, "bowling", t.member || "Walk-in", t.method, t.amount, true); gaudit("Bowling sale", x.id, t.receiptNo); save(); go("bowling.html", x.id + " paid (" + t.receiptNo + "): play may start in the lane system (BR-101)");
    });
    function run(rowsIn, source) {
      var ok = fcan("reconcile", "none"); if (!ok.ok) return toast(ok.msg, "danger");
      var txns = db.bowlingTxns.filter(function (t) { return t.status === "paid"; }), res = Rules.bizRule102(rowsIn, txns, F.tolerance), r = { id: "BW-" + seq("BW", 2), at: NOW, by: user(), source: source, rows: rowsIn.length, matched: res.matched.length, exceptions: res.exceptions.length };
      db.bowlingRuns.unshift(r);
      res.matched.forEach(function (id) { var t = db.bowlingTxns.filter(function (x) { return x.id === id; })[0]; t.status = "reconciled"; t.runId = r.id; });
      res.exceptions.forEach(function (x) { db.bowlingExceptions.unshift(Object.assign({ id: "BE-" + seq("BE", 2), runId: r.id, status: "open", disposition: null, reason: null, by: null, at: null, financeRef: null }, x)); });
      gaudit("Bowling reconciliation", r.id, res.msg); save(); go("bowling.html", r.id + ": " + res.msg);
    }
    $("#bw-import").addEventListener("click", function () { run(F.bowlingSample, "sample export"); });
    var file = $("#bw-file");
    $("#bw-csv").addEventListener("click", function () { file.click(); });
    file.addEventListener("change", function () {
      var picked = file.files[0]; if (!picked) return;
      var rd = new FileReader();
      rd.onload = function () {
        // the sample's layout: receiptNo,date,amount,method; a file that does not read is held, never partly reconciled (D-112)
        var lines = String(rd.result).trim().split(/\r?\n/).filter(function (l) { return l && !/^receipt/i.test(l); }), out = [];
        for (var i = 0; i < lines.length; i++) { var c = lines[i].split(","); if (c.length < 4 || !/^\d{4}-\d{2}-\d{2}$/.test(c[1].trim()) || isNaN(+c[2])) return toast("The file does not read as receiptNo,date,amount,method: nothing was reconciled.", "danger"); out.push({ receiptNo: c[0].trim(), date: c[1].trim(), amount: +c[2], method: c[3].trim() }); }
        file.value = ""; run(out, picked.name);
      };
      rd.readAsText(picked);
    });
    var last = db.bowlingRuns[0];
    $("#bw-run").textContent = last ? "Run " + last.id + " · " + last.source + ", " + last.rows + " rows · " + fdate(last.at) + " · " + last.by : "No reconciliation run today.";
    $("#bw-kpis").innerHTML = last ? kpiTiles([["Rows in the export", last.rows, "Run " + last.id], ["Matched and locked", last.matched, "BR-102"], ["Exceptions", last.exceptions, "Need a disposition (BR-103)"]]) : "";
    rows($("#bw-ex tbody"), db.bowlingExceptions.slice().reverse().map(function (x) {  // oldest first, as raised
      var acts = x.status === "closed" ? esc(x.disposition + ": " + x.reason) : '<div class="cluster">' + ((x.type === "method" || x.type === "amount") && x.txnId && x.status === "open" ? ebtn("Correct and re-run", 'data-fix="' + x.id + '"') : "") +
        ebtn("Record disposition", 'data-disp="' + x.id + '"') + (x.status === "open" && x.type !== "duplicate" ? ebtn("Escalate to Finance", 'data-esc="' + x.id + '"') : "") + "</div>";
      return "<tr>" + td("Exception", "<strong>" + x.id + "</strong>") + td("Type", fbadge(x.type)) + td("Receipt", esc(x.receiptNo)) + td("Detail", esc(x.detail)) + td("Status", fbadge(x.status) + (x.financeRef ? " " + finRef(x.financeRef) : ""), "col-status") + td("Actions", acts, "col-actions col-actions--wrap") + "</tr>";
    }).join(""), 6, "No exceptions.");
    rows($("#bw-list tbody"), db.bowlingTxns.filter(function (t) { return t.date === TODAY; }).map(function (t) {
      return "<tr>" + td("Sale", "<strong>" + t.id + "</strong>") + td("Receipt", esc(t.receiptNo)) + td("Member", t.member ? esc(custName(t.member)) : "—") + td("Amount", money2(t.amount), "num") + td("Method", esc(t.method)) + td("Time", esc(t.at.slice(11)), "num") + td("Status", fbadge(t.status), "col-status") + "</tr>";
    }).join(""), 7, "No counter sales today.");
    $("#bw-ex").addEventListener("click", function (e) {
      var t = e.target, id = t.getAttribute("data-disp") || t.getAttribute("data-esc") || t.getAttribute("data-fix"); if (!id) return;
      var x = db.bowlingExceptions.filter(function (y) { return y.id === id; })[0];
      if (t.getAttribute("data-esc")) { var ok = fcan("escalate", x.status); if (ok.ok) ok = Rules.bizRule103(x, "escalate"); if (!ok.ok) return toast(ok.msg, "danger"); x.status = "escalated"; x.financeRef = finExc("Bowling reconciliation", "Finance", x.id, FLABEL[x.type] + ", receipt " + x.receiptNo + ": " + x.detail).id; publish("FIN-OPS", "Bowling exception " + x.id + " escalated: " + x.financeRef, x.id); gaudit("Bowling exception escalated", x.id, x.detail); save(); return go("bowling.html", x.id + " escalated to the FIN-OPS exception register " + x.financeRef + " (BR-103, BR-163)"); }
      if (t.getAttribute("data-fix")) {
        var tx = db.bowlingTxns.filter(function (y) { return y.id === x.txnId; })[0], row = F.bowlingSample.filter(function (r) { return r.receiptNo === x.receiptNo; }).slice(-1)[0];
        return ask({ title: "Correct " + tx.id + " and re-run?", body: "The CMS record takes the export's " + (x.type === "method" ? "method " + row.method : "amount S$" + row.amount) + ", then the match runs again for " + x.receiptNo + " (BR-103).", reason: "Reason (required)", ok: "Correct and re-run", run: function (why) {
          if (!String(why || "").trim()) return { ok: false, msg: "Give the reason (BR-103)." };
          if (x.type === "method") tx.method = row.method; else tx.amount = row.amount;
          var res = Rules.bizRule102([row], [tx], F.tolerance); if (!res.matched.length) return { ok: false, msg: "Still no match: " + res.exceptions[0].detail };
          tx.status = "reconciled"; tx.runId = x.runId; Object.assign(x, { status: "closed", disposition: "Reconciled", reason: "Corrected and re-run: " + why.trim(), by: user(), at: NOW });
          gaudit("Bowling exception corrected", x.id, why.trim()); save(); go("bowling.html", x.id + " reconciled after the correction (BR-103)"); return { ok: true };
        } });
      }
      ask({ title: "Record the disposition of " + x.id + "?", body: x.detail + ". The exception closes as Accepted with your reason (BR-103).", reason: "Reason (required)", ok: "Close as Accepted", run: function (why) {
        var ok = fcan("dispose", x.status); if (ok.ok) ok = Rules.bizRule103(x, "dispose", why); if (!ok.ok) return ok;
        Object.assign(x, { status: "closed", disposition: "Accepted", reason: why.trim(), by: user(), at: NOW }); gaudit("Bowling exception closed", x.id, why.trim()); save(); go("bowling.html", x.id + " closed: Accepted (BR-103)"); return { ok: true };
      } });
    });
  };

  // Facilities Admin (SCR-38): values change only through a Draft the Manager approves (BR-105)
  var FIELDS = [["rates.member", "Member rates (weekday, weekend)"], ["rates.member.1", "Member weekend rate (S$/h)"], ["rates.member.0", "Member weekday rate (S$/h)"], ["minH", "Minimum hours"], ["maxH", "Maximum hours"], ["windowDays.member", "Member booking window (days)"], ["capacity", "Capacity"], ["open", "Opens"], ["close", "Closes"]];
  function getPath(o, p) { return p.split(".").reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
  function setPath(o, p, v) { var k = p.split("."), last = k.pop(), t = k.reduce(function (a, x) { return a[x]; }, o); t[last] = v; }
  function fieldLabel(p) { return (FIELDS.filter(function (x) { return x[0] === p; })[0] || [p, p])[1]; }
  pages.facilityAdmin = function () {
    rows($("#fx-facs tbody"), F.facilities.map(function (f) {
      return "<tr>" + td("Facility", "<strong>" + f.code + "</strong> " + esc(f.name)) + td("Model", esc({ booking: "Booking", admission: "Admission", external: "External (lane system)", venue: "Event venue" }[f.model])) + td("Hours", f.open ? esc(f.open + " – " + f.close) : "—") +
        td("Window (member)", f.windowDays ? f.windowDays.member + " days" : "—", "num") + td("Duration", f.minH ? f.minH + " – " + f.maxH + " h" + (f.locked ? ' · <span class="text-muted">Locked (BR-105)</span>' : "") : f.capacity ? "Capacity " + f.capacity : "—") +
        td("Member rate weekday / weekend", f.rates && f.rates.member ? money(f.rates.member[0]) + " / " + money(f.rates.member[1]) : f.fees ? (f.fees.member ? money(f.fees.member) : "Free") : "—", "num") + td("Waiting list", f.model === "booking" ? (f.waitlist ? "On" : "Off") : "—") + td("Status", fbadge(f.active ? "active" : "inactive"), "col-status") + "</tr>";
    }).join(""), 8);
    rows($("#fx-res tbody"), F.resources.map(function (r) { return "<tr>" + td("Resource", "<strong>" + r.id + "</strong> " + esc(r.name)) + td("Facility", esc(fac(r.facility).name)) + td("Status", fbadge(r.active ? "active" : "inactive"), "col-status") + td("Actions", '<div class="cluster">' + ebtn(r.active ? "Deactivate" : "Reactivate", 'data-res="' + r.id + '"') + "</div>", "col-actions") + "</tr>"; }).join(""), 4);
    var cf = $("#fx-form"), editable = F.facilities.filter(function (f) { return f.model === "booking" || f.model === "admission"; });
    cf.elements.facility.innerHTML = options(editable.map(function (f) { return [f.code, f.name]; }));
    function fieldsFor() { var f = fac(cf.elements.facility.value); cf.elements.field.innerHTML = options(FIELDS.filter(function (x) { var v = getPath(f, x[0]); return v !== undefined && !Array.isArray(v); }), cf.elements.field.value); nowV(); }
    function nowV() { var f = fac(cf.elements.facility.value), v = getPath(f, cf.elements.field.value); cf.elements.now.value = v == null ? "—" : v; }
    cf.elements.facility.addEventListener("change", fieldsFor); cf.elements.field.addEventListener("change", nowV); fieldsFor();
    cf.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = fac(cf.elements.facility.value), field = cf.elements.field.value, raw = cf.elements.to.value.trim(), num = !/^(open|close)$/.test(field), ok = fcan("saveDraft", "none");
      if (ok.ok) ok = num ? Rules.bizRule105(f, field, raw) : /^\d{2}:\d{2}$/.test(raw) ? OK2 : { ok: false, msg: "Use HH:MM (BR-105)." };
      showError($("#fx-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
      var c = { id: "CC-" + seq("CC", 2), facility: f.code, field: field, from: getPath(f, field), to: num ? +raw : raw, status: "draft", savedBy: user(), savedAt: NOW, decidedBy: null, decidedAt: null, reason: null, effectiveFrom: null };
      db.facilityConfigChanges.unshift(c); gaudit("Facility configuration Draft", c.id, f.name + " " + fieldLabel(field) + " " + c.from + " → " + c.to); save(); go("facility-admin.html#fx-2", c.id + " saved as Draft: not used until the Manager approves it (BR-105)");
    });
    rows($("#fx-changes tbody"), db.facilityConfigChanges.map(function (c) { return "<tr>" + td("Change", "<strong>" + c.id + "</strong>") + td("Facility", esc(fac(c.facility).name)) + td("Value", esc(fieldLabel(c.field))) + td("From → to", esc(c.from + " → " + c.to)) + td("Saved by", esc(c.savedBy + " · " + fdate(c.savedAt))) + td("Status", fbadge(c.status), "col-status") + "</tr>"; }).join(""), 6, "No changes yet.");
    rows($("#fx-eq tbody"), db.fitnessEquipment.map(function (x) { return "<tr>" + td("Item", "<strong>" + x.id + "</strong> " + esc(x.name)) + td("Quantity", String(x.quantity), "num") + td("Status", fbadge(x.active ? "active" : "inactive"), "col-status") + td("Actions", '<div class="cluster">' + ebtn(x.active ? "Deactivate" : "Reactivate", 'data-eq="' + x.id + '"') + "</div>", "col-actions") + "</tr>"; }).join(""), 4);
    rows($("#fx-in tbody"), db.fitnessInstructors.map(function (x) { return "<tr>" + td("Instructor", "<strong>" + x.id + "</strong> " + esc(x.name)) + td("Speciality", esc(x.speciality)) + td("Status", fbadge(x.active ? "active" : "inactive"), "col-status") + td("Actions", '<div class="cluster">' + ebtn(x.active ? "Deactivate" : "Reactivate", 'data-in="' + x.id + '"') + "</div>", "col-actions") + "</tr>"; }).join(""), 4);
    $("#fx-eq-form").addEventListener("submit", function (e) {
      e.preventDefault(); var n = this.elements.name.value.trim(), q = +this.elements.qty.value; if (!n || !(q > 0)) return toast("Enter the equipment and a quantity.", "danger");
      var x = { id: "FE-" + seq("FE", 2), name: n, quantity: q, active: true }; db.fitnessEquipment.push(x); gaudit("Fitness equipment added", x.id, n); save(); go("facility-admin.html#fx-3", n + " added");
    });
    $("main").addEventListener("click", function (e) {
      var t = e.target, id = t.getAttribute("data-res") || t.getAttribute("data-eq") || t.getAttribute("data-in"); if (!id) return;
      var ok = fcan("toggle", "active"); if (!ok.ok) return toast(ok.msg, "danger");
      if (t.getAttribute("data-res")) {
        var r = rsc(id), fut = db.facilityBookings.filter(function (b) { return b.resource === id && b.status === "confirmed" && b.date >= TODAY; });
        if (r.active && fut.length) return toast(r.name + " has " + fut.length + " future booking(s): move them first.", "danger");
        r.active = !r.active; gaudit("Resource " + (r.active ? "reactivated" : "deactivated"), id, r.name); save(); return go("facility-admin.html#fx-1", r.name + (r.active ? " reactivated" : " deactivated: it cannot be booked"));
      }
      var list = t.getAttribute("data-eq") ? db.fitnessEquipment : db.fitnessInstructors, x = list.filter(function (y) { return y.id === id; })[0];
      x.active = !x.active; gaudit((list === db.fitnessEquipment ? "Equipment " : "Instructor ") + (x.active ? "reactivated" : "deactivated"), id, x.name); save();
      go("facility-admin.html#fx-3", x.name + (x.active ? " reactivated" : " deactivated" + (list === db.fitnessInstructors ? ": cannot be assigned to Personal Training" : "")));
    });
    if (/^#fx-[0-3]$/.test(location.hash)) bootstrap.Tab.getOrCreateInstance($(location.hash + "-btn")).show();
  };

  // Approvals (SCR-08): exceptional facility refunds and facility configuration, decided by the Manager as Operations Manager, never the requester (BR-096, BR-105)
  function facilityApprovals() {
    var me = role();
    $("#fxref-tab-item").hidden = $("#fxcfg-tab-item").hidden = me !== "manager";
    if (me !== "manager") return;
    rows($("#fx-refunds tbody"), db.facilityRefunds.filter(function (x) { return x.status === "requested"; }).map(function (x) {
      var b = fbk(x.bookingId), own = x.requestedBy === user();
      var acts = own ? '<span class="badge text-primary-emphasis bg-primary-subtle">Requested by you</span>' : '<div class="cluster">' + ebtn("Approve", 'data-fxr="approved" data-id="' + x.id + '"', "primary") + ebtn("Reject", 'data-fxr="rejected" data-id="' + x.id + '"', "outline-danger") + "</div>";
      return "<tr>" + td("Refund", "<strong>" + x.id + "</strong>") + td("Booking", esc(b.id) + ' <span class="text-muted">' + esc(where(b) + " · " + slot(b) + " · " + FLABEL[b.status]) + "</span>") + td("Customer", esc(custName(b.customer)) + " (" + esc(b.customer) + ")") + td("Amount", money2(x.amount), "num") + td("Reason", esc(x.reason)) + td("Requested by", esc(x.requestedBy + " · " + fdate(x.at))) + td("Actions", acts, "col-actions col-actions--wrap") + "</tr>";
    }).join(""), 7, "No facility refunds waiting.");
    rows($("#fx-configs tbody"), db.facilityConfigChanges.filter(function (c) { return c.status === "draft"; }).map(function (c) {
      var own = c.savedBy === user(), acts = own ? '<span class="badge text-primary-emphasis bg-primary-subtle">Saved by you</span>' : '<div class="cluster">' + ebtn("Approve", 'data-fxc="approved" data-id="' + c.id + '"', "primary") + ebtn("Reject", 'data-fxc="rejected" data-id="' + c.id + '"', "outline-danger") + "</div>";
      return "<tr>" + td("Change", "<strong>" + c.id + "</strong>") + td("Facility", esc(fac(c.facility).name)) + td("Value", esc(fieldLabel(c.field))) + td("From → to", esc(c.from + " → " + c.to)) + td("Saved by", esc(c.savedBy + " · " + fdate(c.savedAt))) + td("Actions", acts, "col-actions col-actions--wrap") + "</tr>";
    }).join(""), 6, "No configuration changes waiting.");
    $("main").addEventListener("click", function (e) {
      var to = e.target.getAttribute("data-fxr") || e.target.getAttribute("data-fxc"), refund = !!e.target.getAttribute("data-fxr"); if (!to) return;
      var id = e.target.getAttribute("data-id"), x = (refund ? db.facilityRefunds : db.facilityConfigChanges).filter(function (y) { return y.id === id; })[0];
      ask({ title: (to === "approved" ? "Approve " : "Reject ") + id + "?", body: refund ? money2(x.amount) + " to " + custName(fbk(x.bookingId).customer) + ". An approved refund then goes to FIN-OPS refunds for the Finance Officer and Finance Approver (BR-096, RC-148)." : fac(x.facility).name + ": " + fieldLabel(x.field) + " " + x.from + " → " + x.to + ". An approved value applies to new bookings and admissions only (BR-105).",
        reason: "Reason for the decision", ok: to === "approved" ? "Approve" : "Reject", danger: to === "rejected", run: function (why) {
          var ok = fcan(refund ? "decideRefund" : "decideConfig", refund ? "requested" : "draft"); if (ok.ok && refund) ok = Rules.bizRule096(x, me, user()); if (ok.ok && !refund && x.savedBy === user()) ok = { ok: false, msg: "You saved this change: another Manager decides it (BR-105)." }; if (!ok.ok) return ok;
          if (!String(why || "").trim()) return { ok: false, msg: "Give a reason (" + (refund ? "BR-096" : "BR-105") + ")." };
          if (refund) { x.status = to; x.decidedBy = user(); x.decidedAt = NOW; x.decisionReason = why.trim(); if (to === "approved") { var bk = fbk(x.bookingId), op = db.facilityPayments.filter(function (y) { return y.ref === x.bookingId && y.result === "success"; })[0]; x.finance = "pending"; x.financeRef = finRefundIn("FAC", x.id, bk.customer, x.amount, partsFor(op && op.method, x.amount), "Facility exceptional refund (approved by the Operations Manager)", { kind: "fac", id: x.id }).id; } }
          else { x.status = to; x.decidedBy = user(); x.decidedAt = NOW; x.reason = why.trim(); if (to === "approved") { setPath(fac(x.facility), x.field, x.to); x.effectiveFrom = TODAY; } }
          gaudit((refund ? "Facility refund " : "Facility configuration ") + to, id, why.trim()); save();
          go("approvals.html" + (refund ? "#t-fxref" : "#t-fxcfg"), id + " " + to + (refund && to === "approved" ? "; to FIN-OPS refunds " + x.financeRef + " (BR-096)" : !refund && to === "approved" ? ": new bookings use it (BR-105)" : "")); return { ok: true };
        } });
    });
    if (location.hash === "#t-fxref" || location.hash === "#t-fxcfg") bootstrap.Tab.getOrCreateInstance($(location.hash + "-btn")).show();
  }

  // Portal Facilities (SCR-13): book, my bookings, my waiting list (BR-085)
  function portalFacilities(acct) {
    var pf = $("#pf-form"), c = custOf(acct), open = bookable().filter(function (f) { return f.eligible.indexOf(c.category) >= 0; });
    pf.elements.facility.innerHTML = options(open.map(function (f) { return [f.code, f.name]; }));
    pf.elements.date.value = TODAY;
    function fill() { var f = fac(pf.elements.facility.value); pf.elements.start.innerHTML = startOptions(f); pf.elements.hours.innerHTML = hoursOptions(f); }
    function x0() { var f = fac(pf.elements.facility.value), x = { customer: acct, date: pf.elements.date.value, start: pf.elements.start.value, hours: +pf.elements.hours.value }, fr = freeResource(f.code, x); x.resource = fr ? fr.id : resOf(f.code)[0].id; return { f: f, x: x, full: !fr }; }
    function prev() {
      var s = x0(), chk = checkSlot(s.x);
      // a full slot says so in the customer's words; the portal never shows a resource clash it chose itself
      $("#pf-rate").textContent = chk.ok ? rateLine(Object.assign({ date: s.x.date }, chk)) : s.full && /BR-087/.test(chk.msg) ? s.f.name + " is fully booked at " + s.x.start + " on " + fdate(s.x.date) + (s.f.waitlist ? ": join the waiting list (BR-104)." : ": choose another time (BR-087).") : chk.msg; $("#pf-rate").className = "alert field--full mb-0 " + (chk.ok ? "alert-info" : "alert-warning");
      $("#pf-join").hidden = !(s.full && s.f.waitlist);
    }
    pf.elements.facility.addEventListener("change", function () { fill(); prev(); }); ["input", "change"].forEach(function (e) { pf.addEventListener(e, prev); }); fill(); prev();
    pf.addEventListener("submit", function (e) {
      e.preventDefault();
      var s = x0(), ok = fcan("book", "none"), chk = ok.ok ? checkSlot(s.x) : ok;
      showError($("#pf-err"), chk.ok ? "" : chk.msg); if (!chk.ok) return;
      var b = createBooking(s.x, chk, "online"); save(); go("facility-booking.html?id=" + b.id, b.status === "confirmed" ? b.id + " confirmed" : b.id + ": " + money2(b.amount) + " to pay (BR-092)");
    });
    $("#pf-join").addEventListener("click", function () {
      var s = x0(), ok = fcan("join", "none"); if (ok.ok) ok = Rules.bizRule086(s.f, c); if (ok.ok) ok = Rules.bizRule104(s.f, s.full);
      if (ok.ok && db.facilityWaitlist.some(function (y) { return y.customer === acct && y.facility === s.f.code && y.date === s.x.date && y.start === s.x.start && (y.status === "waiting" || y.status === "offered"); })) ok = { ok: false, msg: "You are already on this waiting list (BR-104)." };
      showError($("#pf-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
      var y = { id: "FW-" + seq("FW", 2), customer: acct, category: c.category, facility: s.f.code, date: s.x.date, start: s.x.start, hours: s.x.hours, joinedAt: NOW, status: "waiting", offeredAt: null, offerUntil: null, bookingId: null };
      db.facilityWaitlist.push(y); gaudit("Joined the facility waiting list", y.id, s.f.name); save(); go("portal.html#portal-facilities-section", "You are on the waiting list for " + s.f.name + " " + fdate(s.x.date) + " " + s.x.start + " (" + y.id + ", BR-104)");
    });
    rows($("#portal-fb tbody"), db.facilityBookings.filter(function (b) { return b.customer === acct; }).sort(function (a, b) { return (a.date + a.start) < (b.date + b.start) ? 1 : -1; }).map(function (b) {
      var live = b.status === "confirmed" && b.date + " " + b.start > NOW;
      var act = b.status === "pendingPayment" ? '<a class="btn btn-sm btn-primary" href="facility-booking.html?id=' + b.id + '">Pay</a>' : live ? '<a class="btn btn-sm btn-outline-secondary" href="facility-booking.html?id=' + b.id + '">Amend or cancel</a>' : "—";
      return "<tr>" + td("Booking", "<strong>" + b.id + "</strong>") + td("When", esc(slot(b)), "num") + td("Where", esc(where(b))) + td("Amount", money2(b.amount), "num") + td("Status", fbadge(b.status), "col-status") + td("Actions", '<div class="cluster">' + act + "</div>", "col-actions") + "</tr>";
    }).join(""), 6, "No facility bookings yet.");
    rows($("#portal-fw tbody"), db.facilityWaitlist.filter(function (w) { return w.customer === acct; }).map(function (w) {
      var act = w.status === "offered" ? ebtn("Accept and pay", 'data-wacc="' + w.id + '"', "primary") + ebtn("Decline", 'data-wdec="' + w.id + '"') : "";
      if (w.status === "waiting" || w.status === "offered") act += ebtn("Withdraw", 'data-wwd2="' + w.id + '"');
      return "<tr>" + td("Entry", "<strong>" + w.id + "</strong>") + td("Slot", esc(fac(w.facility).name + " · " + fdate(w.date) + " " + w.start + " – " + Rules.endOf(w.start, w.hours))) + td("Status", fbadge(w.status), "col-status") + td("Offer until", w.offerUntil ? esc(fdate(w.offerUntil)) : "—") + td("Actions", act ? '<div class="cluster">' + act + "</div>" : "—", "col-actions col-actions--wrap") + "</tr>";
    }).join(""), 5, "You are not on any waiting list.");
    $("#portal-fw").addEventListener("click", function (e) {
      var t = e.target, id = t.getAttribute("data-wacc") || t.getAttribute("data-wdec") || t.getAttribute("data-wwd2"); if (!id) return;
      var w = db.facilityWaitlist.filter(function (x) { return x.id === id; })[0], own = Rules.bizRule085(acct, w.customer); if (!own.ok) return toast(own.msg, "danger");
      if (t.getAttribute("data-wacc")) {
        var ok = fcan("accept", w.status), fr = freeResource(w.facility, w), x = { customer: acct, resource: fr ? fr.id : null, date: w.date, start: w.start, hours: w.hours }, chk = ok.ok ? (fr ? checkSlot(x) : { ok: false, msg: "The slot is no longer free (BR-104)." }) : ok;
        if (!chk.ok) return toast(chk.msg, "danger");
        var b = createBooking(x, chk, "online"); w.bookingId = b.id; save(); return go("facility-booking.html?id=" + b.id + "&wait=" + w.id, "Offer accepted: pay " + money2(b.amount) + " to confirm (BR-104)");
      }
      var dec = !!t.getAttribute("data-wdec"), ok2 = fcan(dec ? "decline" : "withdraw", w.status); if (!ok2.ok) return toast(ok2.msg, "danger");
      var was = w.status; w.status = dec ? "declined" : "withdrawn"; var nx = was === "offered" ? offerNext(w.facility, w.date, w.start) : null;
      gaudit(dec ? "Waiting-list offer declined" : "Waiting-list entry withdrawn", w.id, acct); save(); go("portal.html#portal-facilities-section", w.id + (dec ? " declined" : " withdrawn") + (nx ? "; the next customer is offered the slot (BR-104)" : ""));
    });
  }

  // (v05) Facilities reports HMS-FAC-RR-001 – 008 on the live facility records (RC-117); a period with nothing in it returns no rows (BR-033)
  function fRow(b) { return { t: b.id, h: '<a href="facility-booking.html?id=' + esc(b.id) + '">' + esc(b.id) + "</a>" }; }
  function fst(s) { return { t: FLABEL[s] || s, h: fbadge(s) }; }
  function fsum(list, k) { return list.reduce(function (a, x) { return a + (+x[k] || 0); }, 0); }
  function facOfB(b) { return rsc(b.resource).facility; }
  Object.assign(BUILD, {
    "HMS-FAC-RR-001": function (p) {
      var bs = db.facilityBookings.filter(function (b) { return inR(b.date, p) && (!p.facility || facOfB(b) === p.facility); }).sort(function (a, b) { return (a.date + a.start) < (b.date + b.start) ? -1 : 1; });
      return { cols: [["Booking"], ["When", "num"], ["Facility · resource"], ["Customer"], ["Category"], ["Channel"], ["Amount", "num"], ["Status", "col-status"]],
        rows: bs.map(function (b) { return [fRow(b), slot(b), where(b), custName(b.customer), CATS[b.category], b.channel === "online" ? "Online" : "Counter", money2(b.amount), fst(b.status)]; }),
        kpis: [["Bookings", bs.length, "In the period"], ["Confirmed", bs.filter(function (b) { return b.status === "confirmed" || b.status === "completed"; }).length, "Including completed"], ["Online", bs.filter(function (b) { return b.channel === "online"; }).length, "Booked in the Portal"], ["Value", money2(fsum(bs.filter(function (b) { return b.status !== "pendingPayment"; }), "amount")), "Frozen amounts"]],
        chart: { kind: "donut", title: "Bookings by status", data: tally(bs, function (b) { return FLABEL[b.status]; }) } };
    },
    "HMS-FAC-RR-002": function (p) {
      var bs = db.facilityBookings.filter(function (b) { return (b.status === "cancelled" || b.status === "noShow") && inR(b.date, p); });
      function refunded(b) { return fsum(db.facilityRefunds.filter(function (x) { return x.bookingId === b.id && (x.status === "instructed" || x.status === "approved"); }), "amount"); }
      return { cols: [["Booking"], ["When", "num"], ["Facility · resource"], ["Customer"], ["Type"], ["Reason"], ["Paid", "num"], ["Refunded", "num"]],
        rows: bs.map(function (b) { return [fRow(b), slot(b), where(b), custName(b.customer), b.status === "noShow" ? "No-show" : "Cancelled (" + (b.cancelledBy || "customer") + ")", b.cancelReason || "—", money2(b.amount), money2(refunded(b))]; }),
        kpis: [["Cancellations", bs.filter(function (b) { return b.status === "cancelled"; }).length, "In the period"], ["No-shows", bs.filter(function (b) { return b.status === "noShow"; }).length, "No standard refund (BR-097)"], ["Refunded", money2(gsum(bs, refunded)), "Standard and exceptional"], ["Exceptional", db.facilityRefunds.filter(function (x) { return x.kind === "exceptional" && bs.some(function (b) { return b.id === x.bookingId; }); }).length, "Operations Manager (BR-096)"]],
        chart: { kind: "bar", title: "Cancellations and no-shows", data: [["Customer", bs.filter(function (b) { return b.status === "cancelled" && b.cancelledBy !== "club"; }).length], ["Club", bs.filter(function (b) { return b.cancelledBy === "club"; }).length], ["No-show", bs.filter(function (b) { return b.status === "noShow"; }).length]] } };
    },
    "HMS-FAC-RR-003": function (p) {
      var ws = db.facilityWaitlist.filter(function (w) { return inR(w.date, p); });
      return { cols: [["Entry"], ["Slot"], ["Customer"], ["Joined", "num"], ["Offered", "num"], ["Status", "col-status"], ["Booking"]],
        rows: ws.map(function (w) { return [w.id, fac(w.facility).name + " · " + fdate(w.date) + " " + w.start, custName(w.customer), fdate(w.joinedAt), w.offeredAt ? fdate(w.offeredAt) : "—", fst(w.status), w.bookingId || "—"]; }),
        kpis: [["Entries", ws.length, "For slots in the period"], ["Waiting", ws.filter(function (w) { return w.status === "waiting"; }).length, "Join order (BR-104)"], ["Booked", ws.filter(function (w) { return w.status === "booked"; }).length, "Offer accepted and paid"], ["Ended", ws.filter(function (w) { return ["expired", "declined", "withdrawn"].indexOf(w.status) >= 0; }).length, "Expired, declined, withdrawn"]],
        chart: { kind: "donut", title: "Entries by status", data: tally(ws, function (w) { return FLABEL[w.status]; }) } };
    },
    "HMS-FAC-RR-004": function (p) {
      var days = 0, d0 = p.from; while (d0 <= p.to && days < 400) { days++; d0 = Rules.addDays(d0, 1); }
      var hol = F.publicHolidays.map(function (h) { return h.date; }), tot = { open: 0, booked: 0, blocked: 0 };
      var out = bookable().map(function (f) {
        var rs = resOf(f.code), open = rs.length * days * (Rules.mins(f.close) - Rules.mins(f.open)) / 60;
        var booked = gsum(db.facilityBookings.filter(function (b) { return facOfB(b) === f.code && ["confirmed", "completed", "noShow"].indexOf(b.status) >= 0 && inR(b.date, p); }), function (b) { return b.hours; });
        var blocked = gsum(db.resourceBlocks.filter(function (k) { return rs.some(function (r) { return r.id === k.resource; }) && inR(k.from, p); }), function (k) { return (Date.parse(k.to.replace(" ", "T") + ":00Z") - Date.parse(k.from.replace(" ", "T") + ":00Z")) / 3600000; });
        tot.open += open; tot.booked += booked; tot.blocked += blocked;
        return { f: f, rs: rs.length, open: open, booked: booked, blocked: blocked, u: open ? Math.round(1000 * booked / open) / 10 : 0 };
      });
      var top = out.slice().sort(function (a, b) { return b.u - a.u; })[0];
      return { cols: [["Facility"], ["Resources", "num"], ["Bookable hours", "num"], ["Booked hours", "num"], ["Blocked hours", "num"], ["Utilisation", "num"]],
        rows: out.map(function (x) { return [x.f.name, N(x.rs), N(x.open), N(x.booked), N(x.blocked), x.u.toFixed(1) + "%"]; }),
        kpis: [["Booked hours", tot.booked, "of " + tot.open.toLocaleString("en-SG") + " bookable"], ["Utilisation", tot.open ? (Math.round(1000 * tot.booked / tot.open) / 10).toFixed(1) + "%" : "—", "All bookable resources"], ["Busiest facility", top && top.booked ? top.f.name.split(" (")[0] : "—", top && top.booked ? top.u.toFixed(1) + "%" : "No bookings"], ["Blocked hours", tot.blocked, "Maintenance, lessons, events"]],
        chart: { kind: "bar", title: "Utilisation (%) by facility", data: out.map(function (x) { return [x.f.name.split(" (")[0], x.u]; }) } };
    },
    "HMS-FAC-RR-005": function (p) {
      var as = db.admissions.filter(function (a) { return inR(a.date, p); });
      return { cols: [["Admission"], ["Date", "num"], ["Facility"], ["Customer"], ["Category"], ["In – out", "num"], ["Fee", "num"]],
        rows: as.map(function (a) { return [a.id, fdate(a.date), fac(a.facility).name, custName(a.customer), CATS[a.category], a.in + (a.out ? " – " + a.out : ""), money2(a.fee)]; }),
        kpis: [["Pool admissions", as.filter(function (a) { return a.facility === "POOL"; }).length, "In the period"], ["Gym admissions", as.filter(function (a) { return a.facility === "GYM"; }).length, "In the period"], ["Fees", money2(fsum(as, "fee")), "Guests, SAFRA, non-members"], ["In now", as.filter(function (a) { return a.status === "admitted"; }).length, "Not yet left"]],
        chart: { kind: "bar", title: "Admissions by category", data: tally(as, function (a) { return CATS[a.category]; }) } };
    },
    "HMS-FAC-RR-006": function (p) {
      var ps = db.facilityPayments.filter(function (x) { return x.result === "success" && inR(x.at, p); });
      return { cols: [["Payment"], ["At", "num"], ["Kind"], ["Reference"], ["Payer"], ["Method"], ["Amount", "num"], ["FIN-OPS"]],
        rows: ps.map(function (x) { return [x.id, fdate(x.at), x.kind, x.ref, x.payer === "Walk-in" ? "Walk-in" : custName(x.payer), x.method, money2(x.amount), x.financeRef || "—"]; }),
        kpis: [["Takings", money2(fsum(ps, "amount")), "Successful payments"], ["Payments", ps.length, "Bookings, admissions, passes, bowling"], ["Day passes", ps.filter(function (x) { return x.kind === "dayPass"; }).length, "S$" + F.dayPassRate + " each"], ["Declined", db.facilityPayments.filter(function (x) { return x.result === "declined" && inR(x.at, p); }).length, "Nothing reserved (BR-092)"]],
        chart: { kind: "donut", title: "Takings by method", data: tally(ps, function (x) { return x.method === "online" ? "Online" : x.method; }).map(function (t) { return [t[0], fsum(ps.filter(function (x) { return (x.method === "online" ? "Online" : x.method) === t[0]; }), "amount")]; }) } };
    },
    "HMS-FAC-RR-007": function (p) {
      var ts = db.bowlingTxns.filter(function (t) { return inR(t.date, p); }), xs = db.bowlingExceptions.filter(function (x) { return db.bowlingRuns.some(function (r) { return r.id === x.runId && inR(r.at, p); }); });
      return { cols: [["Record"], ["Receipt"], ["Amount", "num"], ["Method"], ["Status", "col-status"], ["Detail"]],
        rows: ts.map(function (t) { return [t.id, t.receiptNo, money2(t.amount), t.method, fst(t.status), t.runId ? "Run " + t.runId : "Not reconciled yet"]; }).concat(xs.map(function (x) { return [x.id, x.receiptNo, "—", FLABEL[x.type], fst(x.status), x.detail + (x.reason ? " · " + x.reason : "")]; })),
        kpis: [["Counter sales", ts.length, money2(fsum(ts, "amount"))], ["Reconciled", ts.filter(function (t) { return t.status === "reconciled"; }).length, "Locked (BR-102)"], ["Exceptions", xs.length, "From the runs"], ["Open", xs.filter(function (x) { return x.status !== "closed"; }).length, "Need a disposition (BR-103)"]],
        chart: { kind: "bar", title: "Bowling records", data: [["Paid", ts.filter(function (t) { return t.status === "paid"; }).length], ["Reconciled", ts.filter(function (t) { return t.status === "reconciled"; }).length], ["Exceptions open", xs.filter(function (x) { return x.status !== "closed"; }).length], ["Exceptions closed", xs.filter(function (x) { return x.status === "closed"; }).length]] } };
    },
    "HMS-FAC-RR-008": function (p) {
      var bs = db.facilityBookings.filter(function (b) { return inR(b.date, p); }), as = db.admissions.filter(function (a) { return inR(a.date, p); }), ps = db.facilityPayments.filter(function (x) { return x.result === "success" && inR(x.at, p); });
      var fx = bookable().concat([fac("POOL"), fac("GYM"), fac("BWL")]);
      return { cols: [["Facility"], ["Bookings", "num"], ["Admissions", "num"], ["Takings", "num"]],
        rows: fx.map(function (f) { var mine = bs.filter(function (b) { return facOfB(b) === f.code; }); return [f.name, N(mine.length), N(as.filter(function (a) { return a.facility === f.code; }).length), money2(fsum(ps.filter(function (x) { return (x.kind === "bowling" && f.code === "BWL") || (x.kind === "admission" && as.some(function (a) { return a.id === x.ref && a.facility === f.code; })) || ((x.kind === "booking" || x.kind === "amendment") && mine.some(function (b) { return b.id === x.ref; })); }), "amount"))]; }),
        kpis: [["Bookings", bs.length, "All statuses"], ["Admissions", as.length, "Pool and gym"], ["Takings", money2(fsum(ps, "amount")), "Raised in FIN-OPS"], ["Refunds", money2(fsum(db.facilityRefunds.filter(function (x) { return (x.status === "instructed" || x.status === "approved") && inR(x.at, p); }), "amount")), "Instructed or approved"]],
        chart: { kind: "bar", title: "Bookings by facility", data: fx.filter(function (f) { return f.model === "booking"; }).map(function (f) { return [f.name.split(" (")[0], bs.filter(function (b) { return facOfB(b) === f.code; }).length]; }) } };
    }
  });

  /* ---------- (v06) Resorts (HMS Resorts): artifacts/diagrams/workflow-request-full-v08.md W35 – W41, rules BR-107 – BR-132 (Draft – for validation, D-348), ported from the rapid v09 resorts engine.
     Guests are the existing memberships and non-member account holders, by ID; money goes to FIN-OPS as financial events (v07, RC-147, RC-151). ---------- */
  var R = cfg.resorts, RP = R.policy, RHOL = cfg.facilities.publicHolidays.map(function (h) { return h.date; });
  var RLABEL = { tentative: "Tentative", confirmed: "Confirmed", checkedIn: "Checked in", checkedOut: "Checked out", cancelled: "Cancelled", expired: "Expired", noShow: "No-show",
    ready: "Ready", occupied: "Occupied", pendingCleaning: "Pending Cleaning", cleaning: "Cleaning", faulty: "Faulty", blocked: "Maintenance Blocked", checkedOutRoom: "Checked-Out",
    waiting: "Waiting", allocated: "Allocated", closed: "Closed", withdrawn: "Withdrawn", active: "Active", replaced: "Replaced", deactivated: "Deactivated",
    pending: "Pending", whitelisted: "Whitelisted", revoked: "Revoked", success: "Success", declined: "Declined", requested: "Requested", approved: "Approved", rejected: "Rejected",
    accepted: "Accepted", passed: "Passed", draft: "Draft", endDated: "End-dated", inactive: "Inactive", open: "Open", completed: "Completed", blockedDay: "Blocked" };
  var RTONE = { confirmed: "success", checkedIn: "success", ready: "success", whitelisted: "success", active: "success", passed: "success", success: "success", approved: "success", accepted: "success", closed: "secondary",
    tentative: "warning", pending: "warning", requested: "warning", waiting: "info", allocated: "info", draft: "warning", pendingCleaning: "warning", cleaning: "warning", endDated: "secondary", open: "warning",
    cancelled: "secondary", expired: "secondary", checkedOut: "secondary", noShow: "danger", rejected: "danger", declined: "danger", faulty: "danger", blocked: "danger", blockedDay: "danger", occupied: "info" };
  function rbadge(s) { var t = RTONE[s] || "secondary"; return '<span class="badge text-' + t + "-emphasis bg-" + t + '-subtle">' + esc(RLABEL[s] || s) + "</span>"; }
  function rnow() { return TODAY + " " + db.resortClock.time; }
  function rres(id) { return db.resortReservations.filter(function (r) { return r.id === id; })[0]; }
  function rroom(code) { return R.rooms.filter(function (r) { return r.code === code; })[0]; }
  function rtype(code) { return R.roomTypes.filter(function (t) { return t.code === code; })[0]; }
  function roomType(room) { return rtype(rroom(room).type); }
  function resortName(code) { return R.resorts.filter(function (x) { return x.code === code; })[0].name; }
  function rkind(id) { return mem(id) ? "member" : "nonMember"; }
  function rguest(id) { var m = mem(id); return m ? person(m.personId).fullName + " (" + id + ")" : nonMember(id) ? nonMember(id).name + " (" + id + ")" : id; }
  function rcan(action, state) { return Workflow.canResort(role(), action, state); }
  function raudit(action, ref, outcome) { db.audit.unshift({ id: "AU-" + seq("AU", 3), at: rnow(), actor: user(), role: role(), action: action, ref: ref, outcome: outcome || "", before: null, after: null, resort: true }); }
  function rhist(r, action, outcome) { (r.history = r.history || []).unshift({ at: rnow(), actor: user(), role: role(), action: action, comment: outcome || "" }); raudit(action, r.id, outcome); }
  function nightsOf(r) { return Rules.stayNights(r.arrival, r.departure).length; }
  function stayText(r) { return fdate(r.arrival) + " – " + fdate(r.departure) + " · " + nightsOf(r) + " night" + (nightsOf(r) === 1 ? "" : "s"); }
  function lines(id) { return db.folioLines.filter(function (l) { return l.res === id; }); }
  function balance(id) { return Math.round(lines(id).reduce(function (a, l) { return a + l.amount; }, 0) * 100) / 100; }
  function paidSoFar(id) { return -lines(id).filter(function (l) { return l.type === "payment" || l.type === "refund"; }).reduce(function (a, l) { return a + l.amount; }, 0); }
  function addLine(id, item, type, amount, o) { var l = Object.assign({ id: "FL-" + seq("FL", 4), res: id, date: TODAY, item: item, type: type, amount: Math.round(amount * 100) / 100, ref: null, by: user() }, o); db.folioLines.push(l); return l; }
  // Every resort financial event is one FIN-OPS event with its resort source reference (BR-131; v07, RC-151); a credit note or adjustment arrives as a RES-CREDIT event
  function rpayer(src) { if (/^RR-/.test(src)) return rres(src).guest; var p = db.resortPayments.filter(function (y) { return y.id === src; })[0] || db.folioLines.filter(function (y) { return y.id === src; })[0]; return p ? rres(p.res).guest : "—"; }
  function rstub(kind, src, amount) { var ok = Rules.bizRule131(src, amount); if (!ok.ok || !amount) return null; var p = db.resortPayments.filter(function (y) { return y.id === src; })[0];
    return finOps("RES", src, amount < 0 ? "RES-CREDIT" : p && p.at.slice(0, 10) < rres(p.res).arrival ? "RES-DEPOSIT" : "RES-FOLIO", rpayer(src), Math.abs(amount), { note: "Resort " + kind }).id; }
  function rnotify(event, id) { if (Rules.bizRule132(event, R.notifyEvents).ok) notify("RESORT " + event.toUpperCase(), rguest(rres(id).guest), id); }
  function live(r) { return ["tentative", "confirmed", "checkedIn"].indexOf(r.status) >= 0; }
  function setRoom(code, to, note) { var x = rroom(code), from = x.status; x.status = to === "checkedOutRoom" ? from : to; db.roomHistory.unshift({ at: rnow(), room: code, from: from, to: to, by: user(), note: note || "" }); raudit("Room " + (RLABEL[from] || from) + " → " + RLABEL[to], code, note); }
  function guestOptions(value) {
    return options(db.memberships.filter(function (m) { return m.status === "active"; }).map(function (m) { return [m.membershipId, person(m.personId).fullName + " · " + typeOf(m.typeCode).name + " · " + m.membershipId]; })
      .concat(db.accountHolders.map(function (a) { return [a.id, a.name + " · non-member account · " + a.id]; })), value);
  }
  function memberDiscounts(guest) {
    var m = mem(guest); if (!m) return [];
    return R.discounts.filter(function (x) { return x.active && (x.code === "HON" && m.typeCode === "HON" || x.code === "COM" && R.committee.indexOf(guest) >= 0); }).slice(0, 1);
  }
  function defaultRate(guest) { var m = mem(guest); return m && R.leaseTypes.indexOf(m.typeCode) >= 0 ? "Corporate lease" : m ? "Member" : "Non-member"; }
  // BR-111, BR-120: nightly rates, the rate type, the member discount and an optional promotion
  function quote(guest, typeCode, arrival, departure, rateType, promo) {
    var t = rtype(typeCode), kind = rkind(guest), nightly = Rules.stayNights(arrival, departure).map(function (n) { return Rules.nightRate(t, kind, n, R, RHOL); });
    var disc = memberDiscounts(guest).concat(R.discounts.filter(function (x) { return x.code === promo && x.active; })), rt = rateType || defaultRate(guest), p = Rules.bizRule111(nightly, rt, disc);
    return { nightly: nightly, rateType: rt, discounts: disc, base: p.base, lines: p.lines, total: p.total, deposit: Math.round(p.total * RP.depositPct) / 100 };
  }
  function freeRooms(typeCode, arrival, departure, excludeId) { return R.rooms.filter(function (x) { return x.type === typeCode && Rules.bizRule107Room(x, arrival, departure, db.resortReservations, excludeId).ok; }); }
  // BR-107, BR-108 (eligibility from Membership), BR-109 for one reservation, new or amended
  function checkRes(d, isStaff) {
    var t = rtype(d.type), m = mem(d.guest);
    if (!d.guest) return { ok: false, msg: "Choose a guest (BR-108)." };
    if (!t) return { ok: false, msg: "Choose a room type." };
    if (t.endDate && d.departure > t.endDate) return { ok: false, msg: t.name + " is end-dated from " + fdate(t.endDate) + "." };
    var r = Rules.bizRule107(d.arrival, d.departure, RP.minNights); if (!r.ok) return r;
    r = Rules.bizRule108(rkind(d.guest), m ? R.typeCategory[m.typeCode] : null, m ? m.status : null, m ? typeOf(m.typeCode).name : "", d.arrival, Rules.stayNights(d.arrival, d.departure).length, TODAY, R.windows); if (!r.ok) return r;
    if (d.rateType) { r = Rules.bizRule109(isStaff, d.rateType, R.rateTypes); if (!r.ok) return r; }
    if (d.room) { r = Rules.bizRule107Room(rroom(d.room), d.arrival, d.departure, db.resortReservations, d.excludeId); if (!r.ok) return Object.assign(r, { full: !freeRooms(d.type, d.arrival, d.departure, d.excludeId).length }); }
    var room = d.room || (freeRooms(d.type, d.arrival, d.departure, d.excludeId)[0] || {}).code;
    if (!room) return { ok: false, full: true, msg: "No " + t.name + " is free for " + fdate(d.arrival) + " – " + fdate(d.departure) + " (BR-107)." };
    return { ok: true, msg: "", room: room, q: quote(d.guest, d.type, d.arrival, d.departure, d.rateType, d.promo) };
  }
  function createRes(d, chk, status, groupRef) {
    var q = chk.q, r = { id: "RR-" + seq("RR", 4), guest: d.guest, guestKind: rkind(d.guest), room: chk.room, arrival: d.arrival, departure: d.departure, status: status, rateType: q.rateType, groupRef: groupRef || null,
      discounts: q.discounts.map(function (x) { return x.code; }), value: q.total, createdAt: rnow(), by: user(), history: [] };
    if (status === "tentative") r.holdUntil = Rules.addDays(TODAY, RP.holdHours / 24) + " " + db.resortClock.time;
    db.resortReservations.push(r);
    rhist(r, (status === "tentative" ? "Placed on hold " : "Reserved ") + r.room + " · " + stayText(r), money2(r.value) + " (" + q.rateType + (q.discounts.length ? ", " + q.discounts.map(function (x) { return x.name; }).join(", ") : "") + ")" + (r.holdUntil ? ", held until " + r.holdUntil : ""));
    return r;
  }
  // BR-118: a payment counts only on Pay (simulated): Success; its record and folio line raise a FIN-OPS event (v07)
  function payRes(r, amount, method, success, what) {
    var p = { id: "RP-" + seq("RP", 4), res: r.id, amount: amount, method: method, result: success ? "success" : "declined", receipt: null, finance: null, financeRef: null, at: rnow() };
    db.resortPayments.unshift(p);
    if (!success) { rhist(r, what + " declined (" + method + ")", "Nothing recorded as paid (BR-118)"); return Rules.bizRule118(false); }
    p.receipt = "RCP-" + seq("RCP", 4); p.finance = "accepted"; p.financeRef = rstub("payment", p.id, amount); addLine(r.id, what + " (" + method + ")", "payment", -amount, { ref: p.id });
    rhist(r, what + " paid " + money2(amount) + " (" + method + "), receipt " + p.receipt, "BR-118"); return { ok: true, msg: what + " " + money2(amount) + " paid, receipt " + p.receipt + " (BR-118)." };
  }
  function confirmNew(r) { r.status = "confirmed"; r.holdUntil = null; rnotify("Reservation confirmed", r.id); }
  function revokeAccess(r, why) {
    db.credentials.filter(function (c) { return c.res === r.id && c.status === "active"; }).forEach(function (c) { c.status = "deactivated"; publish("Door access (simulated)", "PIN " + c.id + " deactivated (" + why + ")", r.id); raudit("Door PIN deactivated", c.id, why); });
    db.stayVehicles.filter(function (v) { return v.res === r.id && v.whitelist !== "revoked"; }).forEach(function (v) { v.whitelist = "revoked"; publish("Carpark whitelist (simulated)", "Revoked " + v.plate + " (" + why + ")", r.id); raudit("Vehicle whitelist revoked", v.plate, why); });
  }
  // shortcut: door PINs and the carpark whitelist are simulated feed entries, not Salto or Alphawave; upgrade with the real interfaces
  function issuePin(r) {
    var c = { id: "AC-" + seq("AC", 2), res: r.id, pin: String(100000 + (parseInt(r.id.slice(3), 10) * 7919 + db.credentials.length * 104729) % 900000), validFrom: r.arrival, validTo: r.departure, status: "active" };
    db.credentials.push(c); publish("Door access (simulated)", "PIN " + c.id + " active " + fdate(c.validFrom) + " – " + fdate(c.validTo), r.id); raudit("Door PIN issued", c.id, "valid to " + c.validTo); return c;
  }
  function maskPin(p) { return "•••• " + p.slice(-3); }
  function waitMatches(typeCode, arrival, departure) { return db.resortWaitlist.filter(function (w) { return w.status === "waiting" && w.roomType === typeCode && w.arrival < departure && arrival < w.departure; }); }
  // BR-115: cancel with the 21-day charge; the refundable rest waits for the Manager (BR-119)
  function cancelRes(r, reason) {
    var paid = paidSoFar(r.id), cc = Rules.bizRule115(r.value, Rules.daysBefore(TODAY, r.arrival), paid, RP), type = roomType(r.room).code;
    r.status = "cancelled"; r.reason = reason; r.cancelledAt = rnow();
    addLine(r.id, "Cancellation charge " + cc.pct + " %", "cancellation", cc.charge); rstub("cancellation charge", r.id, cc.charge);
    revokeAccess(r, "reservation cancelled");
    var pay = db.resortPayments.filter(function (p) { return p.res === r.id && p.result === "success"; }).slice(-1)[0] || { id: (lines(r.id).filter(function (l) { return l.type === "payment"; })[0] || {}).ref };
    if (cc.refund) db.resortRefunds.unshift({ id: "RRF-" + seq("RRF", 4), res: r.id, amount: cc.refund, paymentRef: pay.id, reason: reason, status: "requested", requestedBy: user(), at: rnow(), decidedBy: null, decidedAt: null, decisionReason: null, financeRef: null });
    rhist(r, "Cancelled: " + reason, "Charge " + cc.pct + " % = " + money2(cc.charge) + (cc.refund ? "; refund " + money2(cc.refund) + " for the Manager's approval" : ""));
    rnotify("Reservation cancelled", r.id);
    var wm = waitMatches(type, r.arrival, r.departure);
    return { ok: true, msg: "Cancelled: charge " + cc.pct + " % = " + money2(cc.charge) + (cc.refund ? "; refund " + money2(cc.refund) + " waits for the Manager (BR-119)" : "") + (wm.length ? "; " + wm.length + " waitlist entr" + (wm.length > 1 ? "ies match" : "y matches") + " (BR-117)" : "") + " (BR-115)." };
  }
  // The Front desk time switch (D-349) and the eyebrow of every resort page
  // shortcut: two fixed front desk times on the demo date stand in for a clock and a scheduler (holds, no-shows, Night Audit); upgrade with a server clock
  function rclock() {
    var closed = db.resortClock.closed.indexOf(TODAY) >= 0;
    $$("[data-rclock]").forEach(function (el) { el.textContent = "Wed " + fdate(TODAY) + " · Front desk time " + db.resortClock.time + (closed ? " · business day closed" : ""); });
    $$("[data-fdt]").forEach(function (i) {
      i.checked = i.value === db.resortClock.time;
      i.addEventListener("change", function () { db.resortClock.time = i.value; save(); go(location.pathname.split("/").pop() + location.search, "Front desk time " + i.value + " (D-349)"); });
    });
  }
  function rblocked(msg) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">' + esc(msg) + '</p><p><a href="' + (role() === "member" ? "portal.html" : "resort-desk.html") + '">Back</a></p></div>'; }

  pages.resortDesk = function () {
    rclock(); var err = $("#rd-err"), rs = $("#rd-resort"), from = $("#rd-from"), me = role(), T = TODAY;
    rs.innerHTML = options(R.resorts.map(function (x) { return [x.code, x.name]; }), qs("resort") || "CHG"); from.value = qs("from") || TODAY;
    var inHouse = db.resortReservations.filter(function (r) { return r.status === "checkedIn"; }), tonight = db.resortReservations.filter(function (r) { return live(r) && r.arrival <= T && T < r.departure; });
    $("#rd-kpis").innerHTML = kpiTiles([["Arrivals today", db.resortReservations.filter(function (r) { return r.arrival === T && r.status === "confirmed"; }).length, "Check-in " + RP.checkIn.join(" – ")],
      ["Departures today", db.resortReservations.filter(function (r) { return r.departure === T && r.status === "checkedIn"; }).length, "Check-out by " + RP.checkOut], ["In-house", inHouse.length, inHouse.map(function (r) { return r.room; }).join(", ") || "Nobody"],
      ["Occupancy tonight", tonight.length + " / " + R.rooms.length, R.resorts.map(function (x) { return x.name.split(" ")[0] + " " + tonight.filter(function (r) { return roomType(r.room).resort === x.code; }).length + " / " + R.rooms.filter(function (y) { return rtype(y.type).resort === x.code; }).length; }).join(" · ")]]);
    function draw() {
      var nights = []; for (var i = 0; i < 7; i++) nights.push(Rules.addDays(from.value, i));
      var rooms = R.rooms.filter(function (x) { return rtype(x.type).resort === rs.value; });
      $("#rd-grid thead").innerHTML = '<tr><th scope="col">Room</th>' + nights.map(function (n) { return '<th scope="col" class="slot">' + esc(fdate(n).slice(0, -5)) + "</th>"; }).join("") + "</tr>";
      rows($("#rd-grid tbody"), rooms.map(function (x) {
        return "<tr>" + td("Room", "<strong>" + esc(x.code) + "</strong> " + esc(rtype(x.type).name)) + nights.map(function (n) {
          var r = db.resortReservations.filter(function (y) { return y.room === x.code && live(y) && y.arrival <= n && n < y.departure; })[0];
          return td(fdate(n), r ? '<span class="badge text-' + (r.status === "tentative" ? "warning" : "info") + "-emphasis bg-" + (r.status === "tentative" ? "warning" : "info") + '-subtle"><a href="resort-reservation.html?id=' + r.id + '">' + r.id + "</a></span>" :
            (x.status === "faulty" || x.status === "blocked") ? rbadge(x.status) : '<span class="text-muted">Free</span>', "slot");
        }).join("") + "</tr>";
      }).join(""), 8);
    }
    rs.addEventListener("change", draw); from.addEventListener("change", draw); draw();
    function act(r) {
      var a = [];
      if (["confirmed", "checkedIn", "checkedOut"].indexOf(r.status) >= 0 && me === "resorts") a.push('<a class="btn btn-sm btn-outline-alt" href="resort-stay.html?id=' + r.id + '">Open stay</a>');
      if (me === "resorts" && Rules.bizRule116(r.status, r.arrival, rnow(), RP).ok) a.push(ebtn("Process no-show", 'data-noshow="' + r.id + '"', "outline-danger"));
      return a.length ? '<div class="cluster">' + a.join("") + "</div>" : "—";
    }
    function row(r, bal) { return "<tr>" + td("Reservation", '<a href="resort-reservation.html?id=' + r.id + '"><strong>' + r.id + "</strong></a>") + td("Guest", esc(rguest(r.guest))) + td("Room", esc(r.room) + " " + rbadge(rroom(r.room).status)) + td("Stay", esc(stayText(r)), "num") + td("Balance", money2(balance(r.id)), "num") + td("Status", rbadge(r.status), "col-status") + td("Actions", act(r), "col-actions col-actions--wrap") + "</tr>"; }
    rows($("#rd-arrivals tbody"), db.resortReservations.filter(function (r) { return (r.arrival === T && ["tentative", "confirmed", "checkedIn"].indexOf(r.status) >= 0) || (r.arrival < T && r.status === "confirmed"); }).map(row).join(""), 7, "No arrivals today.");
    rows($("#rd-departures tbody"), db.resortReservations.filter(function (r) { return r.departure === T && (r.status === "checkedIn" || r.status === "checkedOut" && String(r.checkedOutAt).slice(0, 10) === T); }).map(row).join(""), 7, "No departures today.");
    rows($("#rd-inhouse tbody"), inHouse.map(row).join(""), 7, "Nobody in-house.");
    function all() {
      var q = $("#rd-q").value.trim().toLowerCase();
      rows($("#rd-all tbody"), db.resortReservations.filter(function (r) { return !q || (r.id + " " + rguest(r.guest) + " " + r.arrival + " " + RLABEL[r.status] + " " + (r.groupRef || "")).toLowerCase().indexOf(q) >= 0; }).slice().sort(function (a, b) { return a.arrival < b.arrival ? -1 : 1; }).map(row).join(""), 7);
    }
    $("#rd-q").addEventListener("input", all); all();
    rows($("#rd-wait tbody"), db.resortWaitlist.slice().sort(function (a, b) { return a.joinedAt < b.joinedAt ? -1 : 1; }).map(function (w) {
      var free = freeRooms(w.roomType, w.arrival, w.departure).length, a = me !== "resorts" ? "—" : w.status === "waiting" ? (free ? ebtn("Allocate", 'data-alloc="' + w.id + '"', "primary") : "") + ebtn("Withdraw", 'data-wwd="' + w.id + '"') :
        w.status === "allocated" ? '<a class="btn btn-sm btn-primary" href="resort-reservation.html?wait=' + w.id + '">Create reservation</a>' + ebtn("Declined", 'data-wdec="' + w.id + '"') : "—";
      return "<tr>" + td("Entry", "<strong>" + w.id + "</strong>") + td("Guest", esc(rguest(w.guest))) + td("Room type · dates", esc(rtype(w.roomType).name + " · " + fdate(w.arrival) + " – " + fdate(w.departure))) + td("Joined", esc(fdate(w.joinedAt)), "num") +
        td("Match", w.status === "waiting" || w.status === "allocated" ? (free ? '<span class="badge text-success-emphasis bg-success-subtle">' + free + " free</span>" : "None yet") : "—") + td("Status", rbadge(w.status) + (w.reason ? ' <span class="text-muted">' + esc(w.reason) + "</span>" : ""), "col-status") + td("Actions", a === "—" ? a : '<div class="cluster">' + a + "</div>", "col-actions col-actions--wrap") + "</tr>";
    }).join(""), 7, "Nobody is waiting.");
    $("#rd-new").hidden = $("#rd-group").hidden = $("#rd-hold").hidden = me !== "resorts";
    if (/^#rd-t-/.test(location.hash)) bootstrap.Tab.getOrCreateInstance($(location.hash + "-btn")).show();
    $("main").addEventListener("click", function (e) {
      var t = e.target, id, w, here = "resort-desk.html?resort=" + rs.value + "&from=" + from.value;
      if ((id = t.getAttribute("data-noshow"))) {
        var r = rres(id), ok = rcan("noShow", r.status); if (ok.ok) ok = Rules.bizRule116(r.status, r.arrival, rnow(), RP); if (!ok.ok) return showError(err, ok.msg);
        return ask({ title: "Process " + r.id + " as a no-show?", body: rguest(r.guest) + " · " + stayText(r) + ". The charge is " + RP.noShowPct + " % of " + money2(r.value) + "; the deposit is kept (BR-116).", ok: "Process no-show", danger: true, run: function () {
          var paid = paidSoFar(r.id); r.status = "noShow"; addLine(r.id, "No-show charge " + RP.noShowPct + " %", "noShow", r.value); var ref = rstub("no-show charge", r.id, r.value - paid); revokeAccess(r, "no-show");
          rhist(r, "Processed as a no-show", RP.noShowPct + " % = " + money2(r.value) + "; deposit " + money2(paid) + " kept, " + money2(r.value - paid) + " to FIN-OPS " + ref); save();
          go(here, r.id + " no-show: " + money2(r.value) + " charged; deposit " + money2(paid) + " kept, " + money2(r.value - paid) + " raised in FIN-OPS (BR-116)"); return { ok: true }; } });
      }
      if ((id = t.getAttribute("data-alloc"))) {
        w = db.resortWaitlist.filter(function (x) { return x.id === id; })[0];
        return ask({ title: "Allocate the free " + rtype(w.roomType).name + " to " + rguest(w.guest) + "?", body: "Staff choose who gets a freed room; the entries are listed oldest first as a guide only (BR-117).", reason: "Why this entry", ok: "Allocate", run: function (why) {
          var ok = rcan("allocate", w.status); if (ok.ok) ok = Rules.bizRule117Allocate(why, freeRooms(w.roomType, w.arrival, w.departure).length > 0); if (!ok.ok) return ok;
          w.status = "allocated"; w.reason = why; raudit("Waitlist allocation", w.id, rguest(w.guest) + ": " + why); save(); go(here + "#rd-t-wait", w.id + " allocated to " + rguest(w.guest) + " (BR-117)"); return { ok: true }; } });
      }
      if ((id = t.getAttribute("data-wdec"))) { w = db.resortWaitlist.filter(function (x) { return x.id === id; })[0]; var o = rcan("declineWait", w.status); if (!o.ok) return toast(o.msg, "danger"); w.status = "waiting"; w.reason = null; raudit("Waitlist allocation declined", w.id, rguest(w.guest) + "; join time kept"); save(); return go(here + "#rd-t-wait", w.id + " declined: waiting again, join time kept (BR-117)"); }
      if ((id = t.getAttribute("data-wwd"))) { w = db.resortWaitlist.filter(function (x) { return x.id === id; })[0]; var o2 = rcan("withdrawWait", w.status); if (!o2.ok) return toast(o2.msg, "danger"); w.status = "withdrawn"; raudit("Waitlist entry withdrawn", w.id, ""); save(); return go(here + "#rd-t-wait", w.id + " withdrawn"); }
    });
  };

  pages.resortReservation = function () {
    rclock(); var err = $("#rr-err"), id = qs("id"), r = id && rres(id), me = role(), isStaff = me === "resorts", acct = portalAccount();
    if (id && !r) return rblocked("Unknown reservation " + id + ": open it from the Resort front desk or the Portal.");
    if (r && !isStaff) { var own = Rules.bizRule085(acct, r.guest); if (!own.ok) return rblocked(own.msg); }
    if (!r) {
      var f = $("#rr-form"), mode = isStaff ? qs("mode") : null, wait = qs("wait") && db.resortWaitlist.filter(function (x) { return x.id === qs("wait"); })[0], pending = null;
      $("#pg-title").textContent = mode === "group" ? "Group reservation" : mode === "hold" ? "Tentative hold" : "Reserve a room";
      f.elements.guest.innerHTML = isStaff ? '<option value="">Choose a guest</option>' + guestOptions(wait ? wait.guest : "") : options([[acct, rguest(acct)]], acct); f.elements.guest.disabled = !isStaff;
      f.elements.resort.innerHTML = options(R.resorts.map(function (x) { return [x.code, x.name]; }), wait ? rtype(wait.roomType).resort : qs("resort") || "CHG");
      f.elements.arrival.value = wait ? wait.arrival : qs("arrival") || Rules.addDays(TODAY, 7); f.elements.departure.value = wait ? wait.departure : qs("departure") || Rules.addDays(f.elements.arrival.value, 2);
      f.elements.rateType.innerHTML = '<option value="">Standard for the guest</option>' + options(R.rateTypes.map(function (x) { return [x, x]; }));
      f.elements.promo.innerHTML = '<option value="">None</option>' + options(R.discounts.filter(function (x) { return x.active && x.kind !== "member"; }).map(function (x) { return [x.code, x.name]; }));
      $$("[data-staff-only]").forEach(function (el) { el.hidden = !isStaff; });
      $$("[data-group-only]").forEach(function (el) { el.hidden = mode !== "group"; });
      $("[data-rr=reserve]").hidden = mode === "group" || mode === "hold"; $("[data-rr=hold]").hidden = !isStaff || mode === "group"; $("[data-rr=group]").hidden = mode !== "group";
      function types() { f.elements.type.innerHTML = options(R.roomTypes.filter(function (t) { return t.resort === f.elements.resort.value && t.active; }).map(function (t) { return [t.code, t.name]; }), wait ? wait.roomType : qs("type") || ""); rooms(); }
      function rooms() { f.elements.room.innerHTML = '<option value="">Any free room</option>' + options(R.rooms.filter(function (x) { return x.type === f.elements.type.value; }).map(function (x) { return [x.code, x.code]; })); }
      f.elements.resort.addEventListener("change", types); f.elements.type.addEventListener("change", rooms); types();
      function draft() { return { guest: f.elements.guest.value, type: f.elements.type.value, room: f.elements.room.value, arrival: f.elements.arrival.value, departure: f.elements.departure.value, rateType: isStaff ? f.elements.rateType.value : "", promo: isStaff ? f.elements.promo.value : "" }; }
      function mms(g) {
        var v = db.vehicles.filter(function (x) { return x.membershipId === g && x.status === "active"; });
        $("#rr-mms").innerHTML = mem(g) ? (v.length ? esc(v.map(function (x) { return x.plate; }).join(", ")) : "None registered in Membership") + ' <span class="text-muted">· shown for reference: vehicles for the stay are registered at check-in, at most ' + RP.maxVehicles + " (RC-125)</span>" : g ? '<span class="text-muted">Non-member account: no Membership vehicles.</span>' : "—";
        var m = mem(g); $("#rr-member").textContent = m ? typeOf(m.typeCode).name + ", " + LABEL[m.status] + (R.windows[R.typeCategory[m.typeCode]] ? " · up to " + R.windows[R.typeCategory[m.typeCode]].days + " days ahead, " + R.windows[R.typeCategory[m.typeCode]].maxNights + " nights (BR-108)" : " · cannot reserve (BR-108)") : g ? "Non-member · up to " + R.windows.nonMember.days + " days ahead, " + R.windows.nonMember.maxNights + " nights (BR-108)" : "—";
      }
      function priceCard(chk, d) {
        var q = chk.q, L = q.nightly.map(function (n) { return [fdate(n.date) + " · " + n.dayType + (n.season ? " · " + n.season : ""), money2(n.rate)]; })
          .concat(q.lines.map(function (l) { return [l.name, money2(l.amount)]; }))
          .concat(q.rateType === "Corporate lease" || q.rateType === "Complimentary" ? [[q.rateType + " (zero value, BR-111)", money2(-q.base)]] : [])
          .concat([["Total · " + q.rateType, "<strong>" + money2(q.total) + "</strong>", true], ["Deposit due now · " + RP.depositPct + " %", "<strong>" + money2(q.deposit) + "</strong>", true]]);
        $("#rr-price-h").textContent = "Price · " + chk.room + " · " + rtype(d.type).name; $("#rr-price-card").innerHTML = facts(L); $("#rr-price-card").hidden = false; $("#rr-price-hint").hidden = true;
      }
      function check() {
        var d = draft(), chk = checkRes(d, isStaff); $("[data-rr=join]").hidden = true; $("#rr-pay").hidden = $("#rr-pay-btns").hidden = true; mms(d.guest);
        if (!chk.ok) { $("[data-rr=join]").hidden = !chk.full || mode === "group"; $("#rr-price-card").hidden = true; $("#rr-price-hint").hidden = false; showError(err, chk.msg + (chk.full && mode !== "group" ? " You can join the resort waitlist: it holds no room (BR-117)." : "")); return null; }
        showError(err, ""); priceCard(chk, d); return { d: d, chk: chk };
      }
      $("#rr-method-field").hidden = !isStaff; $("#rr-method").innerHTML = options(F.paymentMethods.map(function (m) { return [m, m]; }), "Card");
      f.addEventListener("submit", function (e) { e.preventDefault(); check(); });
      f.elements.guest.addEventListener("change", function () { mms(f.elements.guest.value); });
      $("main").addEventListener("click", function (e) {
        var a = e.target.getAttribute("data-rr"), p = e.target.getAttribute("data-pay"); if (p && pending) return pending(p === "success", isStaff ? $("#rr-method").value : "Online");
        if (!a) return;
        if (a === "join") {
          var d0 = draft(), ok0 = rcan("joinWait", "none"); if (ok0.ok) ok0 = Rules.bizRule117(freeRooms(d0.type, d0.arrival, d0.departure).length > 0); if (!ok0.ok) return showError(err, ok0.msg);
          var w = { id: "RW-" + seq("RW", 2), guest: d0.guest, guestKind: rkind(d0.guest), roomType: d0.type, arrival: d0.arrival, departure: d0.departure, joinedAt: rnow(), status: "waiting" };
          db.resortWaitlist.push(w); raudit("Joined the resort waitlist", w.id, rguest(w.guest) + " · " + rtype(w.roomType).name + " " + fdate(w.arrival)); save();
          return go(isStaff ? "resort-desk.html#rd-t-wait" : "portal.html#portal-resorts-section", w.id + ": on the resort waitlist; no room is held (BR-117)");
        }
        if (a === "group") {
          var d = draft(), n = +f.elements.count.value || 2, free = freeRooms(d.type, d.arrival, d.departure), ok = rcan("group", "none"); if (ok.ok) ok = Rules.bizRule112(n, free.length, f.elements.revised.checked);
          var base = checkRes(Object.assign({}, d, { room: free[0] ? free[0].code : "" }), true); if (!base.ok) return showError(err, base.msg);
          if (!ok.ok) return showError(err, ok.msg);
          var g = "GR-" + seq("GR", 2), made = free.slice(0, Math.min(n, free.length)).map(function (x) { var nr = createRes(Object.assign({}, d, { room: x.code }), checkRes(Object.assign({}, d, { room: x.code }), true), "confirmed", g); rnotify("Reservation confirmed", nr.id); return nr; });
          raudit("Group reservation", g, made.length + " rooms · " + made.map(function (x) { return x.room; }).join(", ") + " · " + made[0].rateType); save();
          return go("resort-reservation.html?id=" + made[0].id, g + ": " + made.length + " rooms confirmed (" + made[0].rateType + ", " + money2(gsum(made, function (x) { return x.value; })) + "), one group folio (BR-112)");
        }
        var c = check(); if (!c) return;
        if (a === "hold") { var oh = rcan("hold", "none"); if (!oh.ok) return showError(err, oh.msg); var h = createRes(c.d, c.chk, "tentative"); save(); return go("resort-reservation.html?id=" + h.id, h.id + " on hold until " + h.holdUntil + " (BR-113)"); }
        var orr = rcan("reserve", "none"); if (!orr.ok) return showError(err, orr.msg);
        if (!c.chk.q.deposit) { var z = createRes(c.d, c.chk, "confirmed", null); confirmNew(z); save(); return go("resort-reservation.html?id=" + z.id, z.id + " confirmed at zero value (BR-111)"); }
        $("#rr-pay").hidden = $("#rr-pay-btns").hidden = false; $("#rr-pay-h").textContent = "Pay the deposit: " + money2(c.chk.q.deposit);
        pending = function (success, method) {
          if (!success) return showError(err, Rules.bizRule118(false).msg);
          var nr = createRes(c.d, c.chk, "confirmed", null), res = payRes(nr, c.chk.q.deposit, method, true, "Deposit " + RP.depositPct + " %"); confirmNew(nr);
          if (wait) { wait.status = "closed"; wait.res = nr.id; raudit("Waitlist entry closed", wait.id, "Reservation " + nr.id); }
          save(); go("resort-reservation.html?id=" + nr.id, nr.id + " confirmed. " + res.msg + (wait ? " " + wait.id + " closed (BR-117)." : ""));
        };
      });
      if (wait) check(); else mms(f.elements.guest.value);
      return;
    }
    $("#rr-new").hidden = true; $("#rr-view").hidden = false; $("#pg-title").textContent = "Reservation " + r.id;
    var t0 = roomType(r.room), discNames = r.discounts.map(function (c) { return (R.discounts.filter(function (x) { return x.code === c; })[0] || { name: c }).name; });
    $("#rr-summary").innerHTML = facts([["Reservation", "<strong>" + r.id + "</strong>" + (r.groupRef ? " · group " + esc(r.groupRef) : ""), true], ["Guest", rguest(r.guest)], ["Room", r.room + " · " + t0.name + " · " + resortName(t0.resort)], ["Stay", stayText(r)],
      ["Value", money2(r.value) + " · " + esc(r.rateType) + (discNames.length ? " · " + esc(discNames.join(", ")) : ""), true], ["Paid", money2(paidSoFar(r.id)) + ' <span class="badge text-success-emphasis bg-success-subtle">FIN-OPS</span>', true], ["Status", rbadge(r.status) + (r.holdUntil ? " held until " + esc(r.holdUntil) : ""), true]].concat(r.reason ? [["Reason", r.reason]] : []));
    $("#rr-history").innerHTML = timeline(r.history || []);
    var A = $("#rr-actions");
    if (r.status === "tentative" && isStaff) A.innerHTML = '<article class="card card-body stack h-100"><h2 class="h5">Hold</h2><div class="field"><label class="form-label" for="pay-method">Payment method</label><select class="form-select" id="pay-method">' + options(F.paymentMethods.map(function (m) { return [m, m]; }), "Card") + '</select></div><div class="btn-row mt-auto">' + ebtn("Pay hold", 'data-ra="payhold"', "primary") + ebtn("Let hold expire", 'data-ra="expire"') + "</div></article>";
    else if (r.status === "confirmed") A.innerHTML = '<article class="card card-body stack h-100"><h2 class="h5">Amend</h2><form class="stack flex-grow-1" id="rr-amend" novalidate><div class="form-grid">' + (isStaff ? '<div class="field"><label class="form-label" for="am-guest">Booked guest</label><select class="form-select" id="am-guest" name="guest">' + guestOptions(r.guest) + "</select></div>" : "") +
      '<div class="field"><label class="form-label" for="am-arr">Arrival</label><input class="form-control" type="date" id="am-arr" name="arrival" value="' + r.arrival + '"></div><div class="field"><label class="form-label" for="am-dep">Departure</label><input class="form-control" type="date" id="am-dep" name="departure" value="' + r.departure + '"></div></div>' +
      '<p class="text-muted mb-0">More than ' + RP.amendDays + " days ahead a date or room change costs a Lost Opportunity Charge of " + RP.locPct + " %; at " + RP.amendDays + ' days or less it is processed as a cancellation and needs a confirm. Contact details, vehicles and add-ons change free (BR-114).</p><div class="btn-row mt-auto"><button type="submit" class="btn btn-outline-secondary">Check</button>' + ebtn("Confirm amendment", 'data-ra="amend" hidden', "primary") + ebtn("Back", 'data-ra="back" hidden') + "</div></form></article>" +
      '<article class="card card-body stack h-100"><h2 class="h5">Cancel</h2><p class="mb-0">' + Rules.daysBefore(TODAY, r.arrival) + " days before arrival: the charge is " + (Rules.daysBefore(TODAY, r.arrival) > RP.amendDays ? RP.cancelEarlyPct : RP.cancelLatePct) + " % of " + money2(r.value) + "; the rest of what was paid is refunded after the Manager approves (BR-115, BR-119).</p>" + '<div class="btn-row mt-auto">' + ebtn("Cancel reservation", 'data-ra="cancel"', "outline-danger") + (isStaff ? '<a class="btn btn-sm btn-outline-alt" href="resort-stay.html?id=' + r.id + '">Open stay</a>' : "") + "</div></article>";
    else A.innerHTML = '<p class="mb-0">' + (isStaff && ["checkedIn", "checkedOut"].indexOf(r.status) >= 0 ? '<a class="btn btn-alt" href="resort-stay.html?id=' + r.id + '">Open stay</a>' : '<span class="text-muted">No actions for a ' + esc(RLABEL[r.status].toLowerCase()) + " reservation.</span>") + "</p>";
    var amendOk = null;
    A.addEventListener("submit", function (e) {
      e.preventDefault(); var v = formValues(e.target), guest = v.guest || r.guest, ok = rcan("amend", r.status); if (ok.ok) ok = Rules.bizRule110(r.guest, guest); amendOk = null;
      $$("[data-ra=amend], [data-ra=back]").forEach(function (b) { b.hidden = true; });
      if (!ok.ok) return showError(err, ok.msg);
      if (v.arrival === r.arrival && v.departure === r.departure) return showError(err, "Nothing in the stay changed: changes that do not alter the stay are free (BR-114).");
      var ac = Rules.bizRule114(r.value, Rules.daysBefore(TODAY, r.arrival), RP);
      if (ac.asCancel) { showError(err, ac.msg + " Nothing changes unless you cancel."); $("[data-ra=back]").hidden = false; return; }
      var chk = checkRes({ guest: r.guest, type: t0.code, room: r.room, arrival: v.arrival, departure: v.departure, excludeId: r.id, rateType: r.rateType }, true);
      if (!chk.ok) chk = checkRes({ guest: r.guest, type: t0.code, room: "", arrival: v.arrival, departure: v.departure, excludeId: r.id, rateType: r.rateType }, true);
      if (!chk.ok) return showError(err, chk.msg + " The original reservation is kept.");
      amendOk = { v: v, chk: chk, loc: ac.loc }; showError(err, ""); toast(ac.msg + " New value " + money2(chk.q.total) + ": press Confirm amendment."); $("[data-ra=amend]").hidden = false;
    });
    A.addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-ra"); if (!a) return;
      if (a === "back") { showError(err, ""); e.target.hidden = true; return toast("Amendment not made: the reservation is unchanged."); }
      if (a === "amend" && amendOk) {
        var before = r.room + " " + stayText(r); r.arrival = amendOk.v.arrival; r.departure = amendOk.v.departure; r.room = amendOk.chk.room; r.value = amendOk.chk.q.total;
        addLine(r.id, "Lost Opportunity Charge " + RP.locPct + " %", "loc", amendOk.loc); rstub("Lost Opportunity Charge", r.id, amendOk.loc);
        rhist(r, "Amended", before + " → " + r.room + " " + stayText(r) + " · charge " + money2(amendOk.loc)); save(); return go("resort-reservation.html?id=" + r.id, "Amended: Lost Opportunity Charge " + money2(amendOk.loc) + " on the folio (BR-114)");
      }
      if (a === "cancel") {
        return ask({ title: "Cancel " + r.id + "?", body: stayText(r) + ". The charge follows the 21-day rule; any refund waits for the Manager (BR-115, BR-119).", reason: "Reason for the cancellation", ok: "Cancel reservation", danger: true, run: function (why) {
          var ok = rcan("cancel", r.status); if (!ok.ok) return ok; if (!String(why).trim()) return { ok: false, msg: "A cancellation needs a reason (BR-115)." };
          var res = cancelRes(r, why.trim()); save(); go(isStaff ? "resort-reservation.html?id=" + r.id : "portal.html#portal-resorts-section", res.msg); return { ok: true }; } });
      }
      if (a === "expire") { var o = rcan("expire", r.status); if (!o.ok) return toast(o.msg, "danger"); r.status = "expired"; r.holdUntil = null; rhist(r, "Hold expired", "Room " + r.room + " released (BR-113)"); rnotify("Hold expired", r.id); save(); return go("resort-reservation.html?id=" + r.id, r.id + " expired: " + r.room + " released (BR-113)"); }
      if (a === "payhold") {
        var ok = rcan("payHold", r.status); if (ok.ok) ok = Rules.bizRule113(r.holdUntil, rnow()); if (!ok.ok) return toast(ok.msg, "danger");
        var dep = Math.round(r.value * RP.depositPct) / 100, pr = dep ? payRes(r, dep, $("#pay-method").value, true, "Deposit " + RP.depositPct + " %") : { msg: "Zero value." }; confirmNew(r); rhist(r, "Hold converted", "Confirmed"); save();
        return go("resort-reservation.html?id=" + r.id, r.id + " confirmed after the hold (BR-113). " + pr.msg);
      }
    });
  };

  pages.resortStay = function () {
    rclock(); var err = $("#rs-err"), r = rres(qs("id"));
    if (!r) return rblocked(qs("id") ? "Unknown stay " + qs("id") + ": open a stay from the Resort front desk." : "Open a stay from the Resort front desk.");  // (G-1, D-362)
    var here = "resort-stay.html?id=" + r.id, room = rroom(r.room), late = db.resortApprovals.filter(function (a) { return a.res === r.id && a.kind === "lateArrival"; })[0];
    $("#pg-title").textContent = "Stay " + r.id; $("#pg-sub").textContent = rguest(r.guest) + " · " + r.room + " · " + RLABEL[r.status];
    var cred = db.credentials.filter(function (c) { return c.res === r.id && c.status === "active"; })[0];
    $("#rs-summary").innerHTML = facts([["Reservation", '<a href="resort-reservation.html?id=' + r.id + '"><strong>' + r.id + "</strong></a> · the visitor pass for Facilities while in-house", true], ["Guest", rguest(r.guest)], ["Room", esc(r.room + " · " + roomType(r.room).name) + " · " + rbadge(room.status), true], ["Stay", esc(stayText(r)) + " · " + rbadge(r.status), true],
      ["Door PIN", cred ? maskPin(cred.pin) + " · valid " + fdate(cred.validFrom) + " – " + fdate(cred.validTo) + " (simulated)" : "None yet: issued at check-in (BR-127)"], ["Balance", "<strong>" + money2(balance(r.id)) + "</strong>", true]].concat(late ? [["Late arrival", esc(late.time) + " · " + rbadge(late.status), true]] : []));
    var inHouse = r.status === "checkedIn";
    // Check in / late arrival
    $("#rs-in-card").hidden = r.status !== "confirmed";
    $("#rs-in-room").innerHTML = options(R.rooms.filter(function (x) { return x.type === room.type || true; }).map(function (x) { return [x.code, x.code + " · " + rtype(x.type).name + " · " + RLABEL[x.status]]; }), r.room);
    // Folio
    rows($("#rs-folio tbody"), lines(r.id).map(function (l) {
      return "<tr>" + td("Date", esc(fdate(l.date))) + td("Item", esc(l.item)) + td("Type", esc(l.type)) + td("Amount", money2(l.amount), "num") + td("Reference", l.ref ? esc(l.ref) + (/^RP-/.test(l.ref) ? " · " + finRef((db.resortPayments.filter(function (y) { return y.id === l.ref; })[0] || {}).financeRef) : "") : "—") + td("Paid", ["night", "addon", "charge", "vehicle"].indexOf(l.type) >= 0 ? (l.paid ? "Paid" : "Unpaid") : "—") + "</tr>";
    }).join("") + "<tr>" + td("Date", "") + td("Item", "<strong>Balance</strong>") + td("Type", "") + td("Amount", "<strong>" + money2(balance(r.id)) + "</strong>", "num") + td("Reference", "") + td("Paid", "") + "</tr>", 6);
    $("#rs-post-card").hidden = $("#rs-stay-card").hidden = $("#rs-out-card").hidden = $("#rs-veh-card").hidden = !inHouse;
    $("#rs-rev-card").hidden = r.status !== "checkedOut" && !inHouse;
    $("#rs-item").innerHTML = options(R.addOns.filter(function (x) { return x.active; }).map(function (x) { return [x.code, x.name + " · " + money(x.price) + " per " + x.per]; }).concat([["MINIBAR", "Minibar (amount below)"], ["OTHER", "Other charge (amount below)"]]));
    $("#rs-disc").innerHTML = options(R.discounts.filter(function (x) { return x.active && x.kind !== "member"; }).map(function (x) { return [x.code, x.name + (x.type === "pct" ? " " + x.value + " %" : "")]; }));
    var corrLines = lines(r.id).filter(function (l) { return ["night", "addon", "charge"].indexOf(l.type) >= 0 && l.amount > 0 && !db.resortApprovals.some(function (a) { return a.line === l.id && a.status === "requested"; }); });
    $("#rs-line").innerHTML = options(corrLines.map(function (l) { return [l.id, l.item + " · " + money2(l.amount) + (l.paid ? " · paid" : " · unpaid")]; }));
    $("#rs-move").innerHTML = options(R.rooms.filter(function (x) { return x.code !== r.room; }).map(function (x) { return [x.code, x.code + " · " + rtype(x.type).name + " · " + RLABEL[x.status]]; }));
    $("#rs-ext").value = Rules.addDays(r.departure, 1);
    $("#rs-idtype").innerHTML = options(RP.idTypes.map(function (x) { return [x, x]; }), RP.idType); $("#rs-method").innerHTML = options(F.paymentMethods.map(function (m) { return [m, m]; }), "Card");
    rows($("#rs-vehicles tbody"), db.stayVehicles.filter(function (v) { return v.res === r.id; }).map(function (v) { return "<tr>" + td("Plate", esc(v.plate)) + td("ID", esc(v.identifier)) + td("Charge", v.charge ? money2(v.charge) : "Free", "num") + td("Whitelist", rbadge(v.whitelist), "col-status") + "</tr>"; }).join(""), 4, "No vehicles for this stay.");
    $("#rs-mms").textContent = mem(r.guest) ? "Membership vehicles (read only, they do not count): " + (db.vehicles.filter(function (v) { return v.membershipId === r.guest && v.status === "active"; }).map(function (v) { return v.plate; }).join(", ") || "none") : "Non-member account: no Membership vehicles.";
    var pend = db.resortPayments.filter(function (p) { return p.res === r.id && p.result === "pending"; });
    $("#rs-pending").innerHTML = pend.map(function (p) { return '<p class="mb-0">' + esc(p.id + " · " + money2(p.amount) + " " + p.method + " · pending") + " " + ebtn("Pay (simulated): Success", 'data-rpc="' + p.id + '"', "primary") + "</p>"; }).join("");
    $("#rs-pending").hidden = !pend.length;
    $("#rs-history").innerHTML = timeline(r.history || []);
    function nightsLeft() { return Rules.stayNights(inHouse && TODAY > r.arrival ? TODAY : r.arrival, r.departure).length; }
    function priceNights(code, a, b) { var t = rtype(rroom(code).type); return Rules.stayNights(a, b).reduce(function (s, n) { return s + Rules.nightRate(t, rkind(r.guest), n, R, RHOL).rate; }, 0); }
    function stayOk() { var o = rcan("stay", r.status); if (!o.ok) showError(err, o.msg); return o.ok; }
    $("#rs-charge").addEventListener("submit", function (e) {
      e.preventDefault(); if (!stayOk()) return; var v = formValues(e.target), ad = R.addOns.filter(function (x) { return x.code === v.item; })[0], amt = ad ? ad.price * (ad.per === "night" ? nightsLeft() : 1) : +v.amount;
      if (!(amt > 0)) return showError(err, "Enter the amount of the charge (BR-118).");
      var name = ad ? ad.name : v.item === "MINIBAR" ? "Minibar" : "Other charge", l = addLine(r.id, name, ad ? "addon" : "charge", amt); rstub("charge", l.id, amt); rhist(r, "Charge posted: " + name, money2(amt)); save(); go(here, name + " " + money2(amt) + " posted to the folio (BR-118)");
    });
    $("#rs-disc-btn").addEventListener("click", function () {
      if (!stayOk()) return;
      var code = $("#rs-disc").value, list = memberDiscounts(r.guest).concat(r.discounts.filter(function (c) { return c !== "HON" && c !== "COM"; }).concat([code]).map(function (c) { return R.discounts.filter(function (x) { return x.code === c; })[0]; }));
      var ok = Rules.bizRule120(list); if (!ok.ok) return showError(err, ok.msg);
      var base = lines(r.id).filter(function (l) { return l.type === "night"; }).reduce(function (s, l) { return s + l.amount; }, 0), d = Rules.applyDiscounts(base, list);
      db.folioLines = db.folioLines.filter(function (l) { return !(l.res === r.id && l.type === "discount"); });
      d.lines.forEach(function (x) { addLine(r.id, x.name, "discount", x.amount); });
      r.discounts = list.map(function (x) { return x.code; }); rhist(r, "Discounts applied", d.lines.map(function (x) { return x.name + " " + money2(x.amount); }).join(", ") + " (percentage first, then fixed)"); save();
      go(here, "Discounts: " + d.lines.map(function (x) { return x.name + " " + money2(x.amount); }).join(", ") + " (BR-120)");
    });
    $("#rs-corr").addEventListener("click", function (e) {
      var kind = e.target.getAttribute("data-corr"); if (!kind || !stayOk()) return;
      var l = db.folioLines.filter(function (x) { return x.id === $("#rs-line").value; })[0], amt = +$("#rs-corr-amt").value, why = $("#rs-corr-why").value;
      if (!l) return showError(err, "Choose a folio line.");
      var ok = Rules.bizRule121(l, kind, why); if (!ok.ok) return showError(err, ok.msg);
      if (kind === "adjustment" && !(amt >= 0 && amt < l.amount)) return showError(err, "Enter the corrected amount, below " + money2(l.amount) + " (BR-121).");
      var ap = { id: "RA-" + seq("RA", 4), res: r.id, kind: kind, line: l.id, amount: kind === "creditNote" ? -l.amount : Math.round((amt - l.amount) * 100) / 100, reason: why.trim(), status: "requested", requestedBy: user(), at: rnow(), decidedBy: null, decidedAt: null, decisionReason: null };
      db.resortApprovals.unshift(ap); rhist(r, (kind === "creditNote" ? "Credit note" : "Adjustment") + " requested on " + l.item, money2(ap.amount) + ": " + ap.reason); save();
      go(here, ap.id + ": " + (kind === "creditNote" ? "credit note" : "adjustment") + " sent to the Manager; the line is unchanged until approved (BR-121)");
    });
    $("#rs-veh-form").addEventListener("submit", function (e) {
      e.preventDefault(); if (!stayOk()) return; var v = formValues(e.target), plate = String(v.plate || "").toUpperCase().replace(/\s+/g, ""), list = db.stayVehicles.filter(function (x) { return x.res === r.id; }), ok = Rules.bizRule126(list, plate, RP); if (!ok.ok) return showError(err, ok.msg);
      var idx = list.filter(function (x) { return x.whitelist !== "revoked"; }).length, charge = Rules.bizRule126Charge(idx, nightsOf(r), RP);
      var sv = { id: "SV-" + seq("SV", 2), res: r.id, plate: plate, idType: v.idType, identifier: v.idType + "-" + plate.slice(-5), charge: charge, whitelist: "whitelisted" };
      db.stayVehicles.push(sv); if (charge) { var l = addLine(r.id, "Second vehicle " + plate + " (S$" + RP.secondVehicle + " per night)", "vehicle", charge); rstub("vehicle charge", l.id, charge); }
      publish("Carpark whitelist (simulated)", "Whitelisted " + plate + " " + fdate(r.arrival) + " – " + fdate(r.departure), r.id); raudit("Vehicle registered and whitelisted", plate, r.id + (charge ? ", " + money2(charge) : ", no charge")); save();
      go(here, plate + " registered and whitelisted" + (charge ? "; second vehicle " + money2(charge) + " on the folio" : "; first vehicle free") + " (BR-126)");
    });
    $("main").addEventListener("click", function (e) {
      var t = e.target, a = t.getAttribute("data-rs"), pid = t.getAttribute("data-rpc"), ok;
      if (pid) { var p = db.resortPayments.filter(function (x) { return x.id === pid; })[0]; p.result = "success"; p.receipt = "RCP-" + seq("RCP", 4); p.finance = "accepted"; p.financeRef = rstub("payment", p.id, p.amount); addLine(r.id, "Payment (" + p.method + ")", "payment", -p.amount, { ref: p.id }); rhist(r, "Payment " + p.id + " confirmed", money2(p.amount) + " (BR-118)"); save(); return go(here, p.id + " confirmed: " + money2(p.amount) + " on the folio and raised in FIN-OPS (BR-118)"); }
      if (!a) return;
      if (a === "move") {
        var to = rroom($("#rs-move").value); ok = rcan(inHouse ? "stay" : "checkIn", r.status); if (ok.ok) ok = Rules.bizRule124(to, inHouse ? TODAY : r.arrival, r.departure, db.resortReservations, r.id, inHouse); if (!ok.ok) return showError(err, ok.msg);
        var old = r.room;
        if (inHouse) {
          var from = TODAY > r.arrival ? TODAY : r.arrival, delta = Math.round((priceNights(to.code, from, r.departure) - priceNights(old, from, r.departure)) * 100) / 100;
          setRoom(old, "pendingCleaning", "Guest moved to " + to.code); setRoom(to.code, "occupied", "Guest moved from " + old); r.room = to.code;
          if (delta) { var ml = addLine(r.id, "Room move " + old + " → " + to.code + ": " + Rules.stayNights(from, r.departure).length + " nights repriced", "night", delta); rstub("room move", ml.id, delta); r.value += delta; }
          rhist(r, "Moved room " + old + " → " + to.code, delta ? money2(delta) : "same rate"); save(); return go(here, "Moved to " + to.code + (delta ? ": " + money2(delta) + " for the remaining nights" : "") + " (BR-124)");
        }
        r.room = to.code; rhist(r, "Room changed " + old + " → " + to.code, "before check-in"); save(); return go(here, "Room changed to " + to.code);
      }
      if (a === "late") {
        var tm = $("#rs-late-time").value, why = $("#rs-late-why").value.trim(); ok = rcan("requestException", r.status); if (!ok.ok) return showError(err, ok.msg);
        if (!why || !tm) return showError(err, "A late arrival needs the expected time and a reason (BR-122).");
        db.resortApprovals.unshift({ id: "RA-" + seq("RA", 4), res: r.id, kind: "lateArrival", time: tm, amount: 0, reason: why, status: "requested", requestedBy: user(), at: rnow(), decidedBy: null, decidedAt: null, decisionReason: null }); rhist(r, "Late arrival " + tm + " requested", why); save();
        return go(here, "The late arrival at " + tm + " waits for the Manager's approval (BR-122)");
      }
      if (a === "checkin") {
        if (late && late.status === "requested") return showError(err, "The late arrival at " + late.time + " waits for the Manager's approval (BR-122).");
        var chosen = rroom($("#rs-in-room").value);
        ok = rcan("checkIn", r.status); if (ok.ok) ok = Rules.bizRule122(r, chosen, TODAY, db.resortClock.time, RP, late && late.status === "approved"); if (!ok.ok) return showError(err, ok.msg);
        if (chosen.code !== r.room) { ok = Rules.bizRule124(chosen, r.arrival, r.departure, db.resortReservations, r.id, true); if (!ok.ok) return showError(err, ok.msg); rhist(r, "Room changed " + r.room + " → " + chosen.code, "at check-in"); r.room = chosen.code; }
        var nx = Rules.bizRule123(chosen.status, "checkIn"); if (!nx.ok) return showError(err, nx.msg);
        r.status = "checkedIn"; r.checkedInAt = rnow(); setRoom(r.room, "occupied", "Check-in " + r.id);
        if (!lines(r.id).some(function (l) { return l.type === "night"; })) addLine(r.id, nightsOf(r) + " nights " + roomType(r.room).name + " (" + r.rateType + ")", "night", r.value);
        var c = issuePin(r); rhist(r, "Checked in to " + r.room + (late && late.status === "approved" ? " (approved late arrival " + late.time + ")" : ""), "Folio opened; door PIN " + maskPin(c.pin) + " until " + fdate(r.departure)); rnotify("Check-in PIN", r.id); save();
        return go(here, r.id + " checked in to " + r.room + ": folio opened, door PIN active until " + fdate(r.departure) + " (BR-122, BR-123, BR-127)");
      }
      if (a === "extend") {
        if (!stayOk()) return; var nd = $("#rs-ext").value; if (!nd || nd <= r.departure) return showError(err, "Choose a later departure date (BR-124).");
        ok = Rules.bizRule124(room, r.departure, nd, db.resortReservations, r.id, false); if (!ok.ok) return showError(err, ok.msg + " Consider a room move.");
        var add = priceNights(r.room, r.departure, nd), el = addLine(r.id, "Extension " + Rules.stayNights(r.departure, nd).length + " night(s) to " + fdate(nd), "night", add); rstub("extension", el.id, add);
        var od = r.departure; r.departure = nd; r.value += add; db.credentials.filter(function (x) { return x.res === r.id && x.status === "active"; }).forEach(function (x) { x.validTo = nd; });
        rhist(r, "Extended " + fdate(od) + " → " + fdate(nd), money2(add)); save(); return go(here, "Extended to " + fdate(nd) + ": + " + money2(add) + "; the PIN is valid until " + fdate(nd) + " (BR-124)");
      }
      if (a === "pay" || a === "paydecline") {
        if (!stayOk()) return; var due = balance(r.id); if (due <= 0) return showError(err, "Nothing to pay: the balance is " + money2(due) + ".");
        var pr = payRes(r, due, $("#rs-method").value, a === "pay", "Payment"); save(); return pr.ok ? go(here, pr.msg) : go(here, pr.msg);
      }
      if (a === "checkout") {
        ok = rcan("checkOut", r.status); if (ok.ok) ok = Rules.bizRule128(r, balance(r.id)); if (!ok.ok) return showError(err, ok.msg);
        r.status = "checkedOut"; r.checkedOutAt = rnow(); setRoom(r.room, "checkedOutRoom", "Check-out " + r.id); setRoom(r.room, "pendingCleaning", "Check-out " + r.id);  // both lines kept: Checked-Out, then Pending Cleaning (D-349)
        revokeAccess(r, "check-out"); var rc = (db.resortPayments.filter(function (p) { return p.res === r.id && p.result === "success"; })[0] || {}).receipt;
        rhist(r, "Checked out" + (db.resortClock.time > RP.checkOut ? " after " + RP.checkOut : ""), (rc ? "Receipt " + rc + "; " : "") + "room Pending Cleaning; PIN and whitelist ended"); rnotify("Check-out receipt", r.id); save();
        return go(here, r.id + " checked out: " + r.room + " Pending Cleaning; PIN deactivated and whitelist revoked (BR-128)");
      }
      if (a === "pin") { ok = rcan("stay", r.status); if (ok.ok) ok = Rules.bizRule127(r); if (!ok.ok) return showError(err, ok.msg); db.credentials.filter(function (x) { return x.res === r.id && x.status === "active"; }).forEach(function (x) { x.status = "replaced"; raudit("Door PIN replaced", x.id, "regenerated"); }); var n2 = issuePin(r); rhist(r, "PIN regenerated", "New PIN " + maskPin(n2.pin) + "; the old one is invalid"); save(); return go(here, "New door PIN " + maskPin(n2.pin) + ": the old one no longer opens the door (BR-127)"); }
      if (a === "revIn" || a === "revOut") {
        var kind = inHouse ? "reverseCheckIn" : "reverseCheckOut";
        return ask({ title: "Request a reversal of the " + (inHouse ? "check-in" : "check-out") + "?", body: "Same business day only; the Manager approves it, and the original event is kept (BR-129).", reason: "Reason for the reversal", ok: "Send to the Manager", run: function (why) {
          var o = rcan("requestException", r.status); if (o.ok) o = Rules.bizRule129(inHouse ? r.checkedInAt : r.checkedOutAt, TODAY, why); if (!o.ok) return o;
          db.resortApprovals.unshift({ id: "RA-" + seq("RA", 4), res: r.id, kind: kind, amount: 0, reason: why.trim(), status: "requested", requestedBy: user(), at: rnow(), decidedBy: null, decidedAt: null, decisionReason: null }); rhist(r, "Reversal of the " + (inHouse ? "check-in" : "check-out") + " requested", why.trim()); save();
          go(here, "Reversal sent to the Manager (BR-129)"); return { ok: true }; } });
      }
    });
  };

  pages.resortRooms = function () {
    rclock(); var err = $("#rm-err"), can = role() === "housekeeping";
    $("#rm-board").innerHTML = R.rooms.map(function (x) {
      var g = db.resortReservations.filter(function (r) { return r.room === x.code && r.status === "checkedIn"; })[0], nx = db.resortReservations.filter(function (r) { return r.room === x.code && ["confirmed", "tentative"].indexOf(r.status) >= 0 && r.arrival >= TODAY; }).sort(function (a, b) { return a.arrival < b.arrival ? -1 : 1; })[0], b = [];
      if (can && x.status === "pendingCleaning") b.push(ebtn("Start cleaning", 'data-rm="startCleaning" data-room="' + x.code + '"', "primary"));
      if (can && x.status === "cleaning") b.push(ebtn("Mark ready", 'data-rm="markReady" data-room="' + x.code + '"', "primary"));
      if (can && (x.status === "faulty" || x.status === "blocked")) b.push(ebtn("Record completion", 'data-rm="complete" data-room="' + x.code + '"', "primary"));
      return '<article class="card card-body stack"><div class="cluster cluster--between"><h2 class="h5 mb-0">' + esc(x.code) + "</h2>" + rbadge(x.status) + '</div><p class="mb-0">' + esc(rtype(x.type).name + " · " + resortName(rtype(x.type).resort)) + '</p><p class="text-muted mb-0">' + esc(g ? rguest(g.guest) + " until " + fdate(g.departure) : nx ? "Next: " + nx.id + " on " + fdate(nx.arrival) : "No stay booked") + '</p><div class="btn-row mt-auto">' + (b.join("") || ebtn("No action", "disabled")) + "</div></article>";
    }).join("");
    $("#rm-room").innerHTML = options(R.rooms.filter(function (x) { return ["ready", "pendingCleaning", "cleaning"].indexOf(x.status) >= 0; }).map(function (x) { return [x.code, x.code + " · " + rtype(x.type).name + " · " + RLABEL[x.status]]; }));
    $("#rm-block-card").hidden = !can;
    rows($("#rm-blocks tbody"), db.roomBlocks.slice().reverse().map(function (k) { return "<tr>" + td("Block", "<strong>" + k.id + "</strong>") + td("Room", esc(k.room)) + td("Kind", rbadge(k.kind)) + td("Reason", esc(k.reason)) + td("Since", esc(fdate(k.at)), "num") + td("Status", rbadge(k.status), "col-status") + "</tr>"; }).join(""), 6, "No maintenance blocks.");
    rows($("#rm-history tbody"), db.roomHistory.slice(0, 30).map(function (h) { return "<tr>" + td("When", esc(fdate(h.at)), "num") + td("Room", esc(h.room)) + td("From → to", esc((RLABEL[h.from] || h.from) + " → " + (RLABEL[h.to] || h.to))) + td("By", esc(h.by)) + td("Note", esc(h.note)) + "</tr>"; }).join(""), 5, "No room status changes.");
    $("#rm-block-form").addEventListener("submit", function (e) {
      e.preventDefault(); var v = formValues(e.target), x = rroom(v.room); if (!x) return showError(err, "Choose a room."); var ok = rcan("blockRoom", x.status); if (ok.ok) ok = Rules.bizRule125(x, v.reason); if (!ok.ok) return showError(err, ok.msg);
      var k = { id: "MB-" + seq("MB", 2), room: x.code, kind: v.kind, reason: v.reason.trim(), status: "open", by: user(), at: rnow(), completedAt: null }; db.roomBlocks.push(k); setRoom(x.code, v.kind, v.reason.trim()); save();
      go("resort-rooms.html", x.code + " is " + RLABEL[v.kind] + ": off sale and no check-in until completion (BR-125)");
    });
    $("#rm-board").addEventListener("click", function (e) {
      var a = e.target.getAttribute("data-rm"); if (!a) return; var x = rroom(e.target.getAttribute("data-room"));
      if (a === "complete") {
        var ok = rcan("completeRoom", x.status), k = db.roomBlocks.filter(function (y) { return y.room === x.code && y.status === "open"; }).slice(-1)[0]; if (!ok.ok) return showError(err, ok.msg);
        if (k) { k.completedAt = rnow(); k.status = "completed"; } ok = Rules.bizRule125Release(k); if (!ok.ok) return showError(err, ok.msg);
        setRoom(x.code, "ready", "Maintenance completed (" + k.id + ")"); save(); return go("resort-rooms.html", x.code + " back in service after completion (BR-125)");
      }
      var o = rcan("housekeep", x.status); if (!o.ok) return showError(err, o.msg);
      var nx = Rules.bizRule123(x.status, a); if (!nx.ok) return showError(err, nx.msg); setRoom(x.code, nx.to, a === "markReady" ? "Cleaning complete" : "Cleaning started"); save(); go("resort-rooms.html", x.code + " " + RLABEL[nx.to] + " (BR-123)");
    });
  };

  function auditChecks() {
    var now = rnow();
    return [
      { name: "Arrivals past the no-show cutoff", blocking: true, list: db.resortReservations.filter(function (r) { return Rules.bizRule116(r.status, r.arrival, now, RP).ok; }).map(function (r) { return r.id; }) },
      { name: "Checked-out stays with a balance", blocking: true, list: db.resortReservations.filter(function (r) { return r.status === "checkedOut" && balance(r.id) > 0.004; }).map(function (r) { return r.id; }) },
      { name: "Unconfirmed payments", blocking: true, list: db.resortPayments.filter(function (p) { return p.result === "pending"; }).map(function (p) { return p.id + " (" + p.res + ")"; }) },
      { name: "Open waitlist entries", blocking: false, list: db.resortWaitlist.filter(function (w) { return w.status === "waiting" || w.status === "allocated"; }).map(function (w) { return w.id; }) },
      { name: "Faulty or blocked rooms", blocking: false, list: R.rooms.filter(function (x) { return x.status === "faulty" || x.status === "blocked"; }).map(function (x) { return x.code; }) }
    ].map(function (c) { c.count = c.list.length; return c; });
  }
  pages.resortAudit = function () {
    rclock(); var err = $("#na-err"), me = role(), day = TODAY, closed = db.resortClock.closed.indexOf(day) >= 0, last = db.nightAudits.filter(function (a) { return a.businessDay === day; })[0];
    $("#na-run-card").hidden = me === "admin";
    $("#na-facts").innerHTML = facts([["Business day", fdate(day)], ["Status", closed ? rbadge("closed") : last ? rbadge(last.result === "passed" ? "passed" : "blockedDay") : "Not run yet", true], ["Last run", last ? last.id + " · " + fdate(last.at) : "—"]]);
    var checks = auditChecks();
    rows($("#na-checks tbody"), last || closed ? checks.map(function (c) { return "<tr>" + td("Check", esc(c.name)) + td("Items", esc(c.list.join(", ") || "None")) + td("Kind", c.count ? (c.blocking ? rbadge("blockedDay") : '<span class="badge text-warning-emphasis bg-warning-subtle">Warning</span>') : rbadge("passed"), "col-status") + "</tr>"; }).join("") : "", 3, "Run Night Audit to see the checks for " + fdate(day) + ".");
    $("#na-close-btn").hidden = me !== "manager"; $("#na-close-btn").disabled = closed || !last || last.result !== "passed";
    $("#na-run-btn").addEventListener("click", function () {
      var ok = rcan("runAudit", closed ? "closed" : "open"); if (!ok.ok) return showError(err, ok.msg);
      var c2 = auditChecks(), res = Rules.bizRule130(c2), a = { id: "NA-" + seq("NA", 2), businessDay: day, at: rnow(), result: res.ok ? "passed" : "blocked", blocking: c2.filter(function (c) { return c.blocking && c.count; }).length, warnings: c2.filter(function (c) { return !c.blocking && c.count; }).length, by: user(), financeRef: null };
      db.nightAudits.unshift(a); raudit("Night Audit run", a.id, res.ok ? "Passed" : res.msg); save(); go("resort-audit.html", res.ok ? "Night Audit passed: the business day can be closed (BR-130)" : res.msg);
    });
    $("#na-close-btn").addEventListener("click", function () {
      var ok = rcan("closeDay", last && last.result === "passed" ? "passed" : "open"); if (ok.ok) ok = Rules.bizRule130(auditChecks()); if (!ok.ok) return showError(err, ok.msg);
      ask({ title: "Close the business day " + fdate(day) + "?", body: "The day goes to FIN-OPS: tonight's in-house stays are recognised as revenue, one night each (BR-130, BR-152).", ok: "Close business day", run: function () {
        // (v07) recognition per occupied night on the Night Audit close, no second GST (BR-152, RC-165)
        var amt = 0, n = 0; db.deferredRevenue.filter(function (d) { var x = rres(d.ref); return d.source === "RES" && x && x.status === "checkedIn"; }).forEach(function (d) { var a = Rules.bizRule152(d, day); if (a) { d.recognised = Rules.r2(d.recognised + a); d.nights = (d.nights || 0) + 1; d.last = day; amt += a; n++; } });
        last.result = "closed"; last.financeRef = amt ? finOps("RES", last.id, "RECOGNITION", "—", Rules.r2(amt), { tax: "ES", note: "Night Audit " + fdate(day) + ": " + n + " nights recognised" }).id : null; db.resortClock.closed.push(day);
        if (amt) db.recognitionRuns.unshift({ date: day, amount: Rules.r2(amt), by: "FIN-OPS (Night Audit " + last.id + ")" });
        raudit("Business day closed", last.id, fdate(day) + ": " + n + " nights recognised " + money2(amt) + (last.financeRef ? " (" + last.financeRef + ")" : "")); save();
        go("resort-audit.html", "Business day " + fdate(day) + " closed; the day to FIN-OPS: " + n + " in-house nights recognised " + money2(amt) + (last.financeRef ? " (" + last.financeRef + ")" : "") + " (BR-130, BR-152)"); return { ok: true }; } });
    });
    rows($("#na-days tbody"), db.nightAudits.map(function (a) { return "<tr>" + td("Run", "<strong>" + a.id + "</strong>") + td("Business day", esc(fdate(a.businessDay)), "num") + td("At", esc(fdate(a.at)), "num") + td("Result", rbadge(a.result === "blocked" ? "blockedDay" : a.result), "col-status") + td("By", esc(a.by)) + td("FIN-OPS", finRef(a.financeRef)) + "</tr>"; }).join(""), 6);
    $("#na-log-item").hidden = me === "resorts";
    function log() {
      var q = $("#na-q").value.trim().toLowerCase();
      rows($("#na-audit tbody"), db.audit.filter(function (a) { return a.resort && (!q || (a.ref + " " + a.action + " " + a.outcome + " " + a.actor).toLowerCase().indexOf(q) >= 0); }).slice(0, 80).map(function (a) { return "<tr>" + td("When", esc(fdate(a.at)), "num") + td("Actor", esc(a.actor)) + td("Action", esc(a.action)) + td("Object", esc(a.ref)) + td("Reason or outcome", esc(a.outcome)) + "</tr>"; }).join(""), 5, "No resort audit records match.");
    }
    $("#na-q").value = qs("q") || ""; $("#na-q").addEventListener("input", log); log();
    if (qs("q") || location.hash === "#na-t-log") bootstrap.Tab.getOrCreateInstance($("#na-t-log-btn")).show();
  };

  // Resort configuration: master data saved at once and end-dated; rates and policy as Draft until the Manager approves (D-349)
  function resFields() {
    var out = [["policy.minNights", "Minimum stay (nights)"], ["policy.holdHours", "Tentative hold (hours)"], ["policy.depositPct", "Deposit (%)"], ["policy.secondVehicle", "Second vehicle (S$ per night)"]];
    R.roomTypes.forEach(function (t, i) { [["member", "member"], ["nonMember", "non-member"]].forEach(function (k) { out.push(["roomTypes." + i + ".rates." + k[0] + ".0", t.name + " · " + k[1] + " weekday rate"], ["roomTypes." + i + ".rates." + k[0] + ".1", t.name + " · " + k[1] + " weekend rate"]); }); });
    Object.keys(R.windows).forEach(function (k) { if (R.windows[k]) out.push(["windows." + k + ".days", "Window, " + k + " (days ahead)"], ["windows." + k + ".maxNights", "Maximum stay, " + k + " (nights)"]); });
    return out;
  }
  function resFieldLabel(p) { return (resFields().filter(function (x) { return x[0] === p; })[0] || [p, p])[1]; }
  pages.resortConfig = function () {
    var err = $("#rc-err");
    rows($("#rc-types tbody"), R.roomTypes.map(function (t) {
      return "<tr>" + td("Code", "<strong>" + t.code + "</strong>") + td("Room type", esc(t.name)) + td("Resort", esc(resortName(t.resort))) + td("Rooms", R.rooms.filter(function (x) { return x.type === t.code; }).length, "num") + td("Capacity", t.capacity, "num") +
        td("Rates", esc("member " + money(t.rates.member[0]) + " / " + money(t.rates.member[1]) + " · non-member " + money(t.rates.nonMember[0]) + " / " + money(t.rates.nonMember[1])), "num") + td("Status", t.endDate ? rbadge("endDated") + " " + esc(fdate(t.endDate)) : rbadge("active"), "col-status") + "</tr>";
    }).join(""), 7);
    $("#rc-end-type").innerHTML = options(R.roomTypes.filter(function (t) { return !t.endDate; }).map(function (t) { return [t.code, t.name]; }));
    rows($("#rc-addons tbody"), R.addOns.map(function (x) { return "<tr>" + td("Add-on", esc(x.name)) + td("Price", money2(x.price), "num") + td("Per", esc(x.per)) + td("Status", rbadge(x.active ? "active" : "inactive"), "col-status") + "</tr>"; }).join(""), 4);
    $("#rc-field").innerHTML = options(resFields().map(function (x) { return [x[0], x[1] + " · now " + getPath(R, x[0])]; }));
    rows($("#rc-pending tbody"), db.resortConfigChanges.slice().reverse().map(function (c) { return "<tr>" + td("Change", "<strong>" + c.id + "</strong>") + td("Setting", esc(resFieldLabel(c.field))) + td("From → to", esc(c.from + " → " + c.to)) + td("Saved by", esc(c.savedBy + " · " + fdate(c.savedAt))) + td("Status", rbadge(c.status) + (c.reason ? ' <span class="text-muted">' + esc(c.reason) + "</span>" : ""), "col-status") + "</tr>"; }).join(""), 5, "No resort configuration changes yet.");
    $("#rc-notify").textContent = R.notifyEvents.join(" · ");
    $("#rc-draft-form").addEventListener("submit", function (e) {
      e.preventDefault(); var v = formValues(e.target), ok = rcan("saveResortDraft", "none"), old = getPath(R, v.field); if (!ok.ok) return showError(err, ok.msg);
      if (v.value === "" || isNaN(+v.value) || +v.value < 0) return showError(err, "Enter a number.");
      if (v.field === "policy.minNights" && +v.value < 1) return showError(err, "The minimum stay is never below 1 night (RC-128).");
      if (String(+v.value) === String(old)) return showError(err, "That is the current value.");
      var c = { id: "RCC-" + seq("RCC", 2), target: "resorts", field: v.field, from: String(old), to: String(+v.value), status: "draft", savedBy: user(), savedAt: rnow(), decidedBy: null, decidedAt: null, reason: null };
      db.resortConfigChanges.push(c); raudit("Resort configuration saved as Draft", c.id, resFieldLabel(c.field) + " " + c.from + " → " + c.to); save(); go("resort-config.html#rc-t-rates", c.id + " saved as Draft: not used until the Manager approves it");
    });
    $("#rc-addon-form").addEventListener("submit", function (e) {
      e.preventDefault(); var v = formValues(e.target), ok = rcan("saveMaster", "none"); if (!ok.ok) return showError(err, ok.msg); if (!String(v.name || "").trim() || !(+v.price >= 0) || v.price === "") return showError(err, "Name the add-on and give its price.");
      var x = { code: "AO" + (R.addOns.length + 1), name: v.name.trim(), price: +v.price, per: v.per, active: true }; R.addOns.push(x); raudit("Add-on saved", x.code, x.name + " " + money2(x.price) + " per " + x.per); save(); go("resort-config.html#rc-t-addons", x.name + " saved and available at once");
    });
    $("#rc-end-form").addEventListener("submit", function (e) {
      e.preventDefault(); var v = formValues(e.target), ok = rcan("saveMaster", "none"), t = rtype(v.type); if (!ok.ok) return showError(err, ok.msg); if (!t || !v.date) return showError(err, "Choose a room type and a date.");
      t.endDate = v.date; raudit("Room type end-dated", t.code, t.name + " from " + v.date); save(); go("resort-config.html", t.name + " end-dated from " + fdate(v.date) + "; its past stays keep their history");
    });
    if (/^#rc-t-/.test(location.hash)) bootstrap.Tab.getOrCreateInstance($(location.hash + "-btn")).show();
  };

  // Approvals: resort refunds, exceptions and configuration for the Manager as Operations Manager (Approve before Reject, D-334)
  function resortApprovals() {
    var me = role();
    $("#raref-tab-item").hidden = $("#raexc-tab-item").hidden = $("#racfg-tab-item").hidden = me !== "manager";
    if (me !== "manager") return;
    var KIND = { creditNote: "Credit note", adjustment: "Adjustment", lateArrival: "Late arrival", reverseCheckIn: "Reversal of check-in", reverseCheckOut: "Reversal of check-out" };
    function acts(attr, x, by) { return by === user() ? '<span class="badge text-primary-emphasis bg-primary-subtle">Requested by you</span>' : '<div class="cluster">' + ebtn("Approve", attr + '="approved" data-id="' + x.id + '"', "primary") + ebtn("Reject", attr + '="rejected" data-id="' + x.id + '"', "outline-danger") + "</div>"; }
    rows($("#ra-refunds tbody"), db.resortRefunds.filter(function (x) { return x.status === "requested"; }).map(function (x) {
      return "<tr>" + td("Refund", "<strong>" + x.id + "</strong>") + td("Reservation", '<a href="resort-reservation.html?id=' + x.res + '">' + x.res + "</a>") + td("Guest", esc(rguest(rres(x.res).guest))) + td("Amount", money2(x.amount), "num") + td("Original payment", esc(x.paymentRef || "—")) + td("Reason", esc(x.reason)) + td("Requested by", esc(x.requestedBy + " · " + fdate(x.at))) + td("Actions", acts("data-rar", x, x.requestedBy), "col-actions col-actions--wrap") + "</tr>";
    }).join(""), 8, "No resort refunds waiting.");
    rows($("#ra-exceptions tbody"), db.resortApprovals.filter(function (x) { return x.status === "requested"; }).map(function (x) {
      var l = x.line && db.folioLines.filter(function (y) { return y.id === x.line; })[0];
      var det = x.kind === "lateArrival" ? "Check-in at " + x.time : l ? l.item + " " + money2(l.amount) + (x.kind === "adjustment" ? " → " + money2(l.amount + x.amount) : " credited") + (l.paid ? " (paid)" : " (unpaid)") : "—";
      return "<tr>" + td("Request", "<strong>" + x.id + "</strong>") + td("Kind", esc(KIND[x.kind])) + td("Reservation", '<a href="resort-reservation.html?id=' + x.res + '">' + x.res + "</a>") + td("Detail", esc(det)) + td("Reason", esc(x.reason)) + td("Requested by", esc(x.requestedBy + " · " + fdate(x.at))) + td("Actions", acts("data-rax", x, x.requestedBy), "col-actions col-actions--wrap") + "</tr>";
    }).join(""), 7, "No resort exceptions waiting.");
    rows($("#ra-configs tbody"), db.resortConfigChanges.filter(function (c) { return c.status === "draft"; }).map(function (c) {
      return "<tr>" + td("Change", "<strong>" + c.id + "</strong>") + td("Setting", esc(resFieldLabel(c.field))) + td("From → to", esc(c.from + " → " + c.to)) + td("Saved by", esc(c.savedBy + " · " + fdate(c.savedAt))) + td("Actions", acts("data-rac", c, c.savedBy), "col-actions col-actions--wrap") + "</tr>";
    }).join(""), 5, "No resort configuration changes waiting.");
    $("main").addEventListener("click", function (e) {
      var t = e.target, kind = t.getAttribute("data-rar") ? "ref" : t.getAttribute("data-rax") ? "exc" : t.getAttribute("data-rac") ? "cfg" : null; if (!kind) return;
      var to = t.getAttribute("data-rar") || t.getAttribute("data-rax") || t.getAttribute("data-rac"), id = t.getAttribute("data-id");
      var x = (kind === "ref" ? db.resortRefunds : kind === "exc" ? db.resortApprovals : db.resortConfigChanges).filter(function (y) { return y.id === id; })[0], r = x.res && rres(x.res), tab = kind === "ref" ? "#t-raref" : kind === "exc" ? "#t-raexc" : "#t-racfg";
      ask({ title: (to === "approved" ? "Approve " : "Reject ") + id + "?", body: kind === "ref" ? money2(x.amount) + " to " + rguest(r.guest) + " against " + x.paymentRef + ". An approved refund then goes to FIN-OPS refunds for the Finance Officer and Finance Approver (BR-119, RC-148)." : kind === "exc" ? KIND[x.kind] + " on " + x.res + ": " + x.reason : resFieldLabel(x.field) + " " + x.from + " → " + x.to + ". An approved value applies to new reservations only.",
        reason: "Reason for the decision", ok: to === "approved" ? "Approve" : "Reject", danger: to === "rejected", run: function (why) {
          var ok = rcan(kind === "cfg" ? "decideResortConfig" : "decideResort", kind === "cfg" ? x.status : x.status);
          if (ok.ok && kind === "ref") ok = Rules.bizRule119(x, me, user(), why);
          if (ok.ok && kind === "exc" && /^reverse/.test(x.kind)) ok = Rules.bizRule129Approve(me, x.requestedBy, user());
          if (ok.ok && kind !== "ref" && (x.requestedBy || x.savedBy) === user()) ok = { ok: false, msg: "You raised this: another Manager decides it." };
          if (!ok.ok) return ok; if (!String(why || "").trim()) return { ok: false, msg: "Give a reason for the decision." };
          x.status = to; x.decidedBy = user(); x.decidedAt = rnow(); if (kind === "cfg") x.reason = why.trim(); else x.decisionReason = why.trim();
          var msg = id + " " + to;
          if (to === "approved" && kind === "ref") { var op = db.resortPayments.filter(function (y) { return y.id === x.paymentRef; })[0]; x.finance = "pending"; x.financeRef = finRefundIn("RES", x.id, r.guest, x.amount, partsFor(op && op.method, x.amount), "Resort refund (approved by the Operations Manager)", { kind: "res", id: x.id }).id; addLine(r.id, "Refund " + x.id + " (against " + x.paymentRef + ")", "refund", x.amount, { ref: x.id }); msg += "; to FIN-OPS refunds " + x.financeRef + " for the Finance Officer and Finance Approver (BR-119)"; }
          if (to === "approved" && kind === "exc") {
            if (x.kind === "creditNote" || x.kind === "adjustment") { var l = db.folioLines.filter(function (y) { return y.id === x.line; })[0], nl = addLine(r.id, (x.kind === "creditNote" ? "Credit note: " : "Adjustment: ") + l.item, x.kind, x.amount, { ref: l.id }); rstub(x.kind === "creditNote" ? "credit note" : "adjustment", nl.id, x.amount); msg += ": a line with the original reference " + l.id + " (BR-121)"; }
            if (x.kind === "reverseCheckOut") { r.status = "checkedIn"; r.checkedOutAt = null; setRoom(r.room, "occupied", "Check-out reversed (" + x.id + ")"); issuePin(r); db.stayVehicles.filter(function (v) { return v.res === r.id && v.whitelist === "revoked"; }).forEach(function (v) { v.whitelist = "whitelisted"; }); msg += ": the stay is in-house again, both events kept (BR-129)"; }
            if (x.kind === "reverseCheckIn") { r.status = "confirmed"; r.checkedInAt = null; setRoom(r.room, "ready", "Check-in reversed (" + x.id + ")"); revokeAccess(r, "check-in reversed"); msg += ": back to confirmed, both events kept (BR-129)"; }
            if (x.kind === "lateArrival") msg += ": check-in allowed at " + x.time + " (BR-122)";
          }
          if (to === "approved" && kind === "cfg") { setPath(R, x.field, +x.to); msg += ": new reservations use it"; }
          if (r) rhist(r, (kind === "ref" ? "Refund " : KIND[x.kind] + " ") + to + " by " + user(), why.trim()); else raudit("Resort configuration " + to, x.id, resFieldLabel(x.field) + " " + x.from + " → " + x.to + ": " + why.trim());
          save(); go("approvals.html" + tab, msg); return { ok: true };
        } });
    });
    if (["#t-raref", "#t-raexc", "#t-racfg"].indexOf(location.hash) >= 0) bootstrap.Tab.getOrCreateInstance($(location.hash + "-btn")).show();
  }

  // Portal Resorts (SCR-13): own reservations and waitlist entries (BR-085)
  function portalResorts(acct) {
    rows($("#portal-rres tbody"), db.resortReservations.filter(function (r) { return r.guest === acct; }).sort(function (a, b) { return a.arrival < b.arrival ? 1 : -1; }).map(function (r) {
      return "<tr>" + td("Reservation", '<a href="resort-reservation.html?id=' + r.id + '"><strong>' + r.id + "</strong></a>") + td("Room", esc(r.room + " · " + roomType(r.room).name)) + td("Stay", esc(stayText(r)), "num") + td("Balance", money2(balance(r.id)), "num") + td("Status", rbadge(r.status), "col-status") +
        td("Actions", r.status === "confirmed" ? '<div class="cluster"><a class="btn btn-sm btn-outline-secondary" href="resort-reservation.html?id=' + r.id + '">Amend or cancel</a></div>' : "—", "col-actions") + "</tr>";
    }).join(""), 6, "No resort reservations yet.");
    rows($("#portal-rwait tbody"), db.resortWaitlist.filter(function (w) { return w.guest === acct; }).map(function (w) {
      return "<tr>" + td("Entry", "<strong>" + w.id + "</strong>") + td("Room type · dates", esc(rtype(w.roomType).name + " · " + fdate(w.arrival) + " – " + fdate(w.departure))) + td("Joined", esc(fdate(w.joinedAt)), "num") + td("Status", rbadge(w.status), "col-status") + td("Actions", w.status === "waiting" ? '<div class="cluster">' + ebtn("Withdraw", 'data-rwd="' + w.id + '"') + "</div>" : "—", "col-actions") + "</tr>";
    }).join(""), 5, "You are not on a resort waitlist.");
    $("#portal-rwait").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-rwd"); if (!id) return; var w = db.resortWaitlist.filter(function (x) { return x.id === id; })[0], own = Rules.bizRule085(acct, w.guest); if (own.ok) own = rcan("withdrawWait", w.status); if (!own.ok) return toast(own.msg, "danger");
      w.status = "withdrawn"; raudit("Waitlist entry withdrawn", w.id, acct); save(); go("portal.html#portal-resorts-section", w.id + " withdrawn");
    });
  }

  // (v06) Resorts reports HMS-RES-RR-001 – 005 on the live resort records (RC-140); a period with nothing in it returns no rows (BR-033)
  function rRow(r) { return { t: r.id, h: '<a href="resort-reservation.html?id=' + esc(r.id) + '">' + esc(r.id) + "</a>" }; }
  function rst(s) { return { t: RLABEL[s] || s, h: rbadge(s) }; }
  Object.assign(BUILD, {
    "HMS-RES-RR-001": function (p) {
      var rs = db.resortReservations.filter(function (r) { return ["cancelled", "expired"].indexOf(r.status) < 0 && (inR(r.arrival, p) || inR(r.departure, p)); }).sort(function (a, b) { return a.arrival < b.arrival ? -1 : 1; });
      return { cols: [["Reservation"], ["Guest"], ["Room"], ["Arrival", "num"], ["Departure", "num"], ["Nights", "num"], ["Balance", "num"], ["Status", "col-status"]],
        rows: rs.map(function (r) { return [rRow(r), rguest(r.guest), r.room, fdate(r.arrival), fdate(r.departure), nightsOf(r), money2(balance(r.id)), rst(r.status)]; }),
        kpis: [["Arrivals", rs.filter(function (r) { return inR(r.arrival, p); }).length, "In the period"], ["Departures", rs.filter(function (r) { return inR(r.departure, p); }).length, "In the period"], ["In-house", rs.filter(function (r) { return r.status === "checkedIn"; }).length, "Now"], ["Open balances", money2(gsum(rs, function (r) { return Math.max(0, balance(r.id)); })), "On these folios"]],
        chart: { kind: "donut", title: "Reservations by status", data: tally(rs, function (r) { return RLABEL[r.status]; }) } };
    },
    "HMS-RES-RR-002": function (p) {
      var out = [], by = {};
      for (var n = p.from; n <= p.to; n = Rules.addDays(n, 1)) R.resorts.forEach(function (x) {
        var rooms = R.rooms.filter(function (y) { return rtype(y.type).resort === x.code; }), used = db.resortReservations.filter(function (r) { return ["confirmed", "checkedIn", "checkedOut", "tentative"].indexOf(r.status) >= 0 && r.arrival <= n && n < r.departure && roomType(r.room).resort === x.code; }).length;
        out.push([fdate(n), x.name, rooms.length, used, pct(used, rooms.length)]); by[n] = (by[n] || 0) + used;
      });
      var sold = gsum(out, function (r) { return r[3]; }), avail = gsum(out, function (r) { return r[2]; });
      return { cols: [["Night", "num"], ["Resort"], ["Rooms", "num"], ["Occupied", "num"], ["Occupancy", "num"]], rows: out,
        kpis: [["Room nights sold", sold, "of " + avail], ["Average occupancy", pct(sold, avail), Object.keys(by).length + " nights"], ["Rooms", R.rooms.length, R.resorts.length + " resorts"]],
        chart: { kind: "bar", title: "Rooms occupied by night", data: Object.keys(by).map(function (k) { return [fdate(k).slice(0, -5), by[k]]; }) } };
    },
    "HMS-RES-RR-003": function (p) {
      var ps = db.resortPayments.filter(function (x) { return x.result === "success" && inR(x.at, p); }), fs = db.resortRefunds.filter(function (f) { return f.status === "approved" && inR(f.decidedAt || f.at, p); });
      return { cols: [["Date", "num"], ["Reference"], ["Reservation"], ["Kind"], ["Method"], ["Amount", "num"], ["FIN-OPS"]],
        rows: ps.map(function (x) { return [fdate(x.at), x.id, x.res, "Payment", x.method, money2(x.amount), x.financeRef || "—"]; }).concat(fs.map(function (f) { return [fdate(f.decidedAt || f.at), f.id, f.res, "Refund instruction", "Original method", money2(-f.amount), f.financeRef || "—"]; })),
        kpis: [["Collected", money2(gsum(ps, function (x) { return x.amount; })), ps.length + " payments"], ["Refunded", money2(gsum(fs, function (f) { return f.amount; })), fs.length + " refunds"], ["Net", money2(gsum(ps, function (x) { return x.amount; }) - gsum(fs, function (f) { return f.amount; })), "Operational only; Finance from v07"]],
        chart: { kind: "bar", title: "Collected by method", data: tally(ps, function (x) { return x.method; }) } };
    },
    "HMS-RES-RR-004": function (p) {
      var rs = db.resortReservations.filter(function (r) { return inR(r.arrival, p) || inR(r.createdAt, p); }), bl = db.roomBlocks.filter(function (k) { return inR(k.at, p); });
      return { cols: [["Kind"], ["Reference"], ["Guest or room"], ["Date", "num"], ["Detail"]],
        rows: rs.filter(function (r) { return ["noShow", "cancelled", "expired"].indexOf(r.status) >= 0; }).map(function (r) { return [RLABEL[r.status], r.id, rguest(r.guest), fdate(r.arrival), r.reason || "—"]; })
          .concat(bl.map(function (k) { return ["Maintenance block", k.id, k.room, fdate(k.at), RLABEL[k.kind] + ": " + k.reason + (k.completedAt ? " (completed)" : "")]; }))
          .concat(db.resortWaitlist.filter(function (w) { return w.status === "waiting" || w.status === "allocated"; }).map(function (w) { return ["Waitlist", w.id, rguest(w.guest), fdate(w.arrival), rtype(w.roomType).name + " · " + RLABEL[w.status]]; })),
        kpis: [["Reservations", rs.length, "In the period"], ["No-shows", rs.filter(function (r) { return r.status === "noShow"; }).length, "100 % charged (BR-116)"], ["Cancellations", rs.filter(function (r) { return r.status === "cancelled"; }).length, "21-day rule (BR-115)"], ["Out of order", R.rooms.filter(function (x) { return x.status === "faulty" || x.status === "blocked"; }).length, "Rooms now"]],
        chart: { kind: "bar", title: "Reservations by status", data: tally(rs, function (r) { return RLABEL[r.status]; }) } };
    },
    "HMS-RES-RR-005": function (p) {
      var a = db.audit.filter(function (x) { return x.resort && inR(x.at, p); });
      return { cols: [["When", "num"], ["Actor"], ["Action"], ["Object"], ["Reason or outcome"]], rows: a.map(function (x) { return [fdate(x.at), x.actor, x.action, x.ref, x.outcome]; }),
        kpis: [["Actions", a.length, "In the period"], ["Actors", tally(a, function (x) { return x.actor; }).length, "Role tab personas"]], chart: { kind: "bar", title: "Actions by actor", data: tally(a, function (x) { return x.actor; }) } };
    }
  });

  // The account acting in a Member tab: a membership or a non-member online account (BR-085)
  function portalAccount() { return (TAB && TAB[2]) || ROLES.member.membershipId; }
  pages.eventRegister = function () {
    var r = role(), counter = r === "golfops", x = qs("reg") && ereg(qs("reg")), e = ev(x ? x.eventId : qs("id"));
    if (!e) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">Unknown event.</p><p><a href="' + (counter ? "events.html" : "portal.html") + '">Back</a></p></div>'; return; }
    $("#pg-title").textContent = e.name;
    $("#er-facts").innerHTML = facts([["When", when(e)], ["Venue", venueOf(e).name], ["Eligibility", E.eligibility[e.eligibility]], ["Places left", Math.max(0, e.capacity - committed(e)) + " of " + e.capacity], ["Price", priceText(e)]]);
    var back = counter ? "event.html?id=" + e.id : "portal.html#portal-events-section";
    $("#er-new").hidden = !!x; $("#er-pay").hidden = !x;
    if (x) return settle(x);
    var acct = counter ? null : portalAccount(), picked = [], opts = [];
    if (!counter) {
      if (nonMember(acct)) opts.push({ ref: acct, kind: "nonMember", name: nonMember(acct).name, dateOfBirth: nonMember(acct).dateOfBirth });
      else { opts.push(partMember(acct)); db.memberships.filter(function (m) { return m.responsibleMembershipId === acct; }).forEach(function (m) { opts.push(partMember(m.membershipId)); }); }
    }
    var pf = $("#er-form");
    $("#er-pick-wrap").hidden = counter; $("#er-member-wrap").hidden = !counter; $("#er-guest-wrap").hidden = !counter;
    pf.elements.pick.innerHTML = options(opts.map(function (o, i) { return [String(i), o.name + (o.ref === acct ? " (me)" : " (dependant)")]; }));
    pf.elements.member.innerHTML = '<option value="">Choose a member</option>' + options(db.memberships.filter(function (m) { return m.status === "active"; }).map(function (m) { return [m.membershipId, m.membershipId + " · " + person(m.personId).fullName]; }));
    function draw() {
      rows($("#er-parts tbody"), picked.map(function (p, i) { var q = priced(e, p); return "<tr>" + td("Participant", esc(p.name)) + td("Kind", p.kind === "member" ? "Member" : "Non-member") + td("Rate category", esc(E.categories[q.category])) + td("Rate", money(q.rate), "num") + td("Actions", ebtn("Remove", 'data-rm="' + i + '"'), "col-actions") + "</tr>"; }).join(""), 5, "No participants yet.");
      $("#er-total").textContent = money(gsum(picked, function (p) { return priced(e, p).rate; }));
    }
    function add(p) { if (picked.some(function (q) { return q.ref === p.ref; })) return; picked.push(p); showError($("#er-err"), ""); $("#er-wl").hidden = true; draw(); }
    $("#er-add").addEventListener("click", function () { var o = opts[+pf.elements.pick.value]; if (o) add(o); });
    $("#er-add-member").addEventListener("click", function () { if (pf.elements.member.value) add(partMember(pf.elements.member.value)); });
    // a guest at the counter is a new non-member participant: only its typed name is kept (it is not a club record)
    $("#er-add-guest").addEventListener("click", function () { var n = pf.elements.guest.value.trim(); if (!n) return; add({ ref: "G-" + seq("EQ"), kind: "nonMember", name: "Guest " + n, guestName: "Guest " + n, dateOfBirth: null }); pf.elements.guest.value = ""; });
    $("#er-parts").addEventListener("click", function (v) { var i = v.target.getAttribute("data-rm"); if (i != null) { picked.splice(+i, 1); draw(); } });
    function holderOf() { return counter ? (picked.filter(function (p) { return p.kind === "member"; })[0] || picked[0] || {}).ref : acct; }
    pf.addEventListener("submit", function (v) {
      v.preventDefault();
      var chk = eventCan("register", "none"); if (chk.ok) chk = checkRegistration(e, picked);
      showError($("#er-err"), chk.ok ? "" : chk.msg); $("#er-wl").hidden = !chk.full; if (!chk.ok) return;
      var reg = createRegistration(e, holderOf(), picked, counter ? "counter" : "portal", e.paid ? "held" : "confirmed");
      if (!e.paid) { confirmRegistration(reg, null); save(); return go(back, reg.id + " confirmed: " + people(reg) + " QR credential(s) issued"); }
      save(); go("event-register.html?reg=" + reg.id, reg.id + ": places held (BR-067)");
    });
    $("#er-wl").addEventListener("click", function () {
      var chk = checkRegistration(e, picked); if (!chk.full) return;
      var reg = createRegistration(e, holderOf(), picked, counter ? "counter" : "portal", "waitlisted"); save(); go(back, reg.id + " joined the waitlist; no payment taken (BR-069)");
    });
    draw();

    function settle(reg) {
      var own = counter ? { ok: true } : Rules.bizRule085(portalAccount(), reg.accountHolder);
      if (!own.ok) { $("#er-pay").innerHTML = '<div class="alert alert-danger" role="alert">' + esc(own.msg) + "</div>"; return; }
      var payer = reg.payer, m = mem(payer), offered = reg.status === "offered";
      if (offered) { reg.participants.forEach(function (p) { if (p.status !== "cancelled") { var q = priced(e, partOf(p)); p.category = q.category; p.rate = q.rate; } }); reg.amount = gsum(reg.participants.filter(function (p) { return p.status !== "cancelled"; }), function (p) { return p.rate; }); }
      rows($("#er-pay-parts tbody"), reg.participants.filter(function (p) { return p.status !== "cancelled"; }).map(function (p) { return "<tr>" + td("Participant", esc(pn(p))) + td("Rate category", esc(E.categories[p.category])) + td("Rate", money(p.rate), "num") + "</tr>"; }).join(""), 3);
      $("#er-pay-total").textContent = money(reg.amount);
      var live = reg.status === "held" || offered;
      $("#er-hold").textContent = !live ? "This registration is " + (ELABEL[reg.status] || reg.status) + "." : offered ? "Waitlist offer: places reserved until " + fdate(reg.offerUntil) + " (24 hours, BR-071)." :
        reg.heldUntil ? "Places held until " + reg.heldUntil.slice(11) + " (15 minutes, BR-067)." : "Places held while this counter transaction is open (BR-067).";
      $("#er-expire").textContent = offered ? "Let offer expire" : reg.channel === "portal" ? "Let hold expire" : "Abandon";
      $("#er-pay-form").hidden = !live; $("#er-expire").hidden = !live;
      var methods = [counter ? ["counter", METHOD.counter] : ["online", METHOD.online]];
      if (m) methods.push(["memberAccount", METHOD.memberAccount + " (" + m.membershipId + ")"]);
      $("#er-pay-form").elements.method.innerHTML = options(methods);
      function pay(success) {
        var method = $("#er-pay-form").elements.method.value, credit = m && Rules.bizRule023(m.contract, finBal(), m.membershipId);
        var ok = eventCan(offered ? "accept" : "pay", reg.status); if (ok.ok) ok = Rules.bizRule068(method, success, credit, reg.amount);
        if (!ok.ok) { showError($("#er-pay-err"), ok.msg); if (!success) { lapse(reg, offered ? "payment failed" : "payment declined"); save(); go(back, reg.id + ": " + ok.msg); } return; }
        confirmRegistration(reg, method); save(); go(back, reg.id + " confirmed: " + people(reg) + " QR credential(s) issued (BR-072)");
      }
      $("#er-success").addEventListener("click", function () { pay(true); });
      $("#er-decline").addEventListener("click", function () { pay(false); });
      $("#er-expire").addEventListener("click", function () { lapse(reg, offered ? "offer expired" : reg.channel === "portal" ? "hold expired" : "abandoned"); save(); go(back, reg.id + ": places released (" + (offered ? "BR-071" : "BR-067") + ")"); });
    }
  };

  pages.eventCheckin = function () {
    var e = ev(qs("id"));
    if (!e) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">Unknown event.</p><p><a href="events.html">Back to Events</a></p></div>'; return; }
    $("#pg-title").textContent = "Check-in · " + e.name;
    var sel = $("#ci-session"), today = e.sessions.filter(function (s) { return s.date === TODAY; })[0] || e.sessions[0];
    sel.innerHTML = options(e.sessions.map(function (s, i) { return [s.id, "Session " + (i + 1) + " · " + fdate(s.date) + " " + s.start]; }), qs("s") || today.id);
    var confirmed = regsOf(e).filter(function (r) { return r.status === "confirmed"; });
    $("#ci-codes").innerHTML = confirmed.map(function (r) { return r.participants.filter(function (p) { return p.qr && p.status === "confirmed"; }).map(function (p) { return '<option value="' + esc(p.qr) + '">' + esc(pn(p)) + "</option>"; }).join(""); }).join("");
    var mf = $("#ci-manual");
    mf.elements.reg.innerHTML = '<option value="">Choose a registration</option>' + options(confirmed.map(function (r) { return [r.id, r.id + " · " + r.participants.map(function (p) { return short(pn(p)); }).join(", ")]; }));
    function fillParts() { var r = ereg(mf.elements.reg.value); mf.elements.part.innerHTML = r ? options(r.participants.filter(function (p) { return p.status === "confirmed"; }).map(function (p) { return [p.ref, pn(p)]; })) : ""; }
    mf.elements.reg.addEventListener("change", fillParts); fillParts();
    function record(r, p, manual, reason) {
      db.eventAttendance.unshift({ eventId: e.id, sessionId: sel.value, registrationId: r.id, qr: p.qr, ref: p.ref, at: NOW, by: user(), manual: manual, reason: reason || null });
      gaudit(manual ? "Manual check-in" : "QR check-in", r.id, pn(p) + (manual ? " · " + reason : ""));
    }
    function draw() {
      var s = sel.value;
      rows($("#ci-att tbody"), db.eventAttendance.filter(function (a) { return a.eventId === e.id && a.sessionId === s; }).map(function (a) {
        return "<tr>" + td("Participant", esc(short(refName(a.ref)))) + td("QR", esc(a.qr || "—")) + td("Recorded", esc(fdate(a.at)), "num") + td("By", esc(a.by)) + td("Path", a.manual ? "Manual: " + esc(a.reason) : "QR") + "</tr>";
      }).join(""), 5, "Nobody checked in for this session yet.");
      var sess = e.sessions.filter(function (x) { return x.id === s; })[0];
      rows($("#ci-pers tbody"), sess.personnel.map(function (id) {
        var ps = E.personnel.filter(function (p) { return p.id === id; })[0], done = db.personnelAttendance.filter(function (a) { return a.sessionId === s && a.personnelId === id; })[0];
        return "<tr>" + td("Personnel", esc(ps.name)) + td("Role", esc(ps.role)) + td("Attendance", done ? "Recorded " + esc(fdate(done.at)) : "—", "num") + td("Actions", done ? "—" : ebtn("Record attendance", 'data-pers="' + id + '"', "primary"), "col-actions") + "</tr>";
      }).join(""), 4, "No personnel assigned to this session.");
    }
    sel.addEventListener("change", draw);
    $("#ci-form").addEventListener("submit", function (v) {
      v.preventDefault();
      var code = this.elements.code.value.trim().toUpperCase(), ok = eventCan("checkIn", "confirmed"); if (ok.ok) ok = Rules.bizRule073(code, sel.value, db.eventRegistrations, db.eventAttendance);
      showError($("#ci-err"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
      record(ok.reg, ok.participant, false); this.elements.code.value = ""; save(); toast(short(pn(ok.participant)) + " checked in"); draw();
    });
    mf.addEventListener("submit", function (v) {
      v.preventDefault();
      var r = ereg(mf.elements.reg.value), p = r && r.participants.filter(function (x) { return x.ref === mf.elements.part.value; })[0], ok = Rules.bizRule074(r, p, mf.elements.reason.value);
      if (ok.ok && db.eventAttendance.some(function (a) { return a.sessionId === sel.value && a.registrationId === r.id && a.ref === p.ref; })) ok = { ok: false, msg: short(pn(p)) + " is already recorded for this session (BR-073)." };
      showError($("#ci-merr"), ok.ok ? "" : ok.msg); if (!ok.ok) return;
      record(r, p, true, mf.elements.reason.value.trim()); mf.elements.reason.value = ""; save(); toast(short(pn(p)) + " checked in manually (reason kept, BR-074)"); draw();
    });
    $("#ci-pers").addEventListener("click", function (v) {
      var id = v.target.getAttribute("data-pers"); if (!id) return;
      var ok = Rules.bizRule075(db.personnelAttendance, sel.value, id); if (!ok.ok) return toast(ok.msg, "danger");
      var ps = E.personnel.filter(function (p) { return p.id === id; })[0];
      db.personnelAttendance.unshift({ eventId: e.id, sessionId: sel.value, personnelId: id, at: NOW, by: user() }); gaudit("Personnel attendance", e.id, ps.name); save(); toast(ps.name + ": attendance recorded separately (BR-075)"); draw();
    });
    draw();
  };

  pages.eventRooms = function () {
    rows($("#rm-feed tbody"), db.roomFeed.map(function (f) {
      var e = f.eventId && ev(f.eventId);
      return "<tr>" + td("Message", esc(f.id)) + td("Type", ebadge(f.type)) + td("Reference", esc(f.ref)) + td("Room", esc(f.room || "—")) + td("When", (f.date ? fdate(f.date) + " " : "") + esc((f.start || "") + (f.end ? " – " + f.end : "")), "num") +
        td("Event", e ? '<a href="event.html?id=' + e.id + '">' + esc(e.name) + "</a>" : "—") + td("Result", f.applied ? esc(f.applied) : '<span class="text-muted">Queued</span>') + td("Actions", f.applied ? "—" : ebtn("Apply", 'data-apply="' + f.id + '"', "outline-alt"), "col-actions") + "</tr>";
    }).join(""), 8, "No messages from the Function Room Booking System.");
    rows($("#rm-bookings tbody"), db.roomBookings.map(function (b) {
      var e = b.eventId && ev(b.eventId);
      return "<tr>" + td("Reference", esc(b.ref)) + td("Room", esc(b.room)) + td("When", fdate(b.date) + " " + esc(b.start) + " – " + esc(b.end), "num") + td("Event", e ? esc(e.name) : "—") + td("Status", ebadge(b.status), "col-status") + td("Updated", esc(fdate(b.updatedAt)), "num") + "</tr>";
    }).join(""), 6, "No linked bookings.");
    $("#rm-feed").addEventListener("click", function (v) {
      var id = v.target.getAttribute("data-apply"); if (!id) return;
      var f = db.roomFeed.filter(function (x) { return x.id === id; })[0], b = db.roomBookings.filter(function (x) { return x.ref === f.ref; })[0], ok = eventCan("applyFeed", "none");
      if (!ok.ok) return toast(ok.msg, "danger");
      ok = Rules.bizRule080(f, b);
      if (ok.ok && ok.create) { b = { ref: f.ref, room: f.room, date: f.date, start: f.start, end: f.end, eventId: f.eventId, status: "tentative", updatedAt: NOW }; db.roomBookings.push(b); var ce = ev(f.eventId); if (ce && !ce.roomRef) ce.roomRef = f.ref; }
      else if (ok.ok) { if (f.type === "amended") { b.room = f.room; b.date = f.date; b.start = f.start; b.end = f.end; } b.status = ok.status; b.updatedAt = NOW; }
      f.applied = ok.msg; f.result = ok.ok ? "applied" : "ignored";
      publish("Function Room Booking System", f.type + " " + f.ref + (ok.ok ? "" : " (ignored)"), f.eventId || f.ref);
      gaudit("Function room message applied", f.ref, ok.msg); save(); go("event-rooms.html", ok.msg);
    });
  };

  // Event refunds (SCR-08 tab): the Manager as Events Manager authorises, never the proposer, with a reason (BR-078, BR-079)
  function eventRefundApprovals() {
    var me = role();
    $("#evref-tab-item").hidden = me !== "manager";
    if (me !== "manager") return;
    var list = db.eventRefunds.filter(function (f) { return f.status === "proposed"; });
    rows($("#ev-refunds tbody"), list.map(function (f) {
      var e = ev(f.eventId), own = f.proposedBy === user();
      var acts = own ? '<span class="badge text-primary-emphasis bg-primary-subtle">Proposed by you</span>' : '<div class="cluster">' + ebtn("Authorise", 'data-evref="authorised" data-id="' + f.id + '"', "primary") + ebtn("Decline", 'data-evref="declined" data-id="' + f.id + '"', "outline-danger") + "</div>";
      return "<tr>" + td("Refund", esc(f.id)) + td("Event", '<a href="event.html?id=' + esc(f.eventId) + '">' + esc(e ? e.name : f.eventId) + "</a>") + td("Participant", esc(short(refName(f.ref)))) + td("Amount", money(f.amount) + " of " + money(f.paid) + " (" + f.kind + ")", "num") +
        td("Proposed by", esc(f.proposedBy)) + td("Reason", esc(f.reason)) + td("Actions", acts, "col-actions") + "</tr>";
    }).join(""), 7, "No event refunds waiting.");
    $("#ev-refunds").addEventListener("click", function (x) {
      var to = x.target.getAttribute("data-evref"); if (!to) return;
      var f = db.eventRefunds.filter(function (y) { return y.id === x.target.getAttribute("data-id"); })[0];
      ask({ title: (to === "authorised" ? "Authorise " : "Decline ") + f.id + "?", body: money(f.amount) + " to " + refName(f.ref) + ". An authorised refund then goes to FIN-OPS refunds for the Finance Officer and Finance Approver (BR-078, RC-148).", reason: "Reason for the decision", ok: to === "authorised" ? "Authorise" : "Decline", danger: to === "declined", run: function (why) {
        var ok = Workflow.canEvent(me, "authorise", f.status); if (ok.ok) ok = Rules.bizRule078(f, me, user(), f.amount); if (!ok.ok) return ok;
        if (!String(why || "").trim()) return { ok: false, msg: "Give a reason (BR-078)." };
        f.status = to; f.decidedBy = user(); f.decidedAt = NOW; f.decisionReason = why;
        if (to === "authorised") { var st0 = db.eventSettlements.filter(function (y) { return y.registrationId === f.registrationId; })[0]; f.finance = "pending"; f.financeRef = finRefundIn("EVT", f.id, f.payer, f.amount, partsFor(st0 && st0.method, f.amount), "Event refund (authorised by the Events Manager)", { kind: "evt", id: f.id }).id; }
        gaudit("Event refund " + to, f.id, why); save(); go("approvals.html#t-evref", f.id + " " + to + (to === "authorised" ? "; to FIN-OPS refunds " + f.financeRef + " for the Finance Officer and Finance Approver" : "") + " (BR-078)"); return { ok: true };
      } });
    });
  }

  // Portal events (SCR-13): open events I may join, my registrations with QR credentials, cancel, offers (BR-085)
  function portalEvents(acct) {
    var own = function (r) { return r.accountHolder === acct; };
    var openEv = db.events.filter(function (e) { return evStatus(e) === "published" && (e.eligibility === "open" || !nonMember(acct)); });
    rows($("#portal-ev-open tbody"), openEv.map(function (e) {
      return "<tr>" + td("Event", "<strong>" + esc(e.name) + "</strong>") + td("When", esc(when(e)), "num") + td("Price", esc(priceText(e))) + td("Places left", String(Math.max(0, e.capacity - committed(e))), "num") +
        td("Actions", '<a class="btn btn-sm btn-outline-alt" href="event-register.html?id=' + e.id + '">Register</a>', "col-actions") + "</tr>";
    }).join(""), 5, "No open events for this account.");
    var mine = db.eventRegistrations.filter(own).sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; });
    rows($("#portal-ev tbody"), mine.map(function (r) {
      var e = ev(r.eventId);
      var acts = r.status === "offered" || r.status === "held" ? '<a class="btn btn-sm btn-primary" href="event-register.html?reg=' + r.id + '">' + (r.status === "offered" ? "Accept offer" : "Pay") + "</a>" :
        r.status === "confirmed" ? r.participants.filter(function (p) { return p.status === "confirmed"; }).map(function (p) { return ebtn("Cancel " + short(pn(p)), 'data-pcancel="' + r.id + '" data-ref="' + p.ref + '"', "outline-danger"); }).join(" ") : "—";
      var qrs = r.participants.filter(function (p) { return p.qr && p.status === "confirmed"; }).map(function (p) { return '<span class="badge bg-secondary-subtle text-secondary-emphasis">' + esc(p.qr) + "</span> " + esc(short(pn(p))); }).join("<br>");
      return "<tr>" + td("Registration", esc(r.id)) + td("Event", esc(e ? e.name : r.eventId)) + td("Participants", esc(r.participants.map(function (p) { return short(pn(p)); }).join(", "))) + td("QR credentials", qrs || "—") + td("Status", ebadge(r.status), "col-status") + td("Actions", acts, "col-actions") + "</tr>";
    }).join(""), 6, "No event registrations yet.");
    $("#portal-ev").addEventListener("click", function (x) {
      var id = x.target.getAttribute("data-pcancel"); if (!id) return;
      var r = ereg(id), ref = x.target.getAttribute("data-ref");
      ask({ title: "Cancel " + short(refName(ref)) + "?", body: "A participant cancellation forfeits the amount paid and voids the QR credential (BR-077).", ok: "Cancel participant", danger: true, run: function () {
        var ok = Rules.bizRule085(acct, r.accountHolder); if (ok.ok) ok = Workflow.canEvent(role(), "cancelParticipant", r.status); if (!ok.ok) return ok;
        var res = cancelParticipant(r, ref, "participant"); if (!res.ok) return res;
        save(); go("portal.html#portal-events-section", res.msg); return { ok: true };
      } });
    });
  }


  /* ---------- (v07) Finance (FIN-OPS): artifacts/diagrams/workflow-request-full-v08.md W42 – W50, rules BR-133 – BR-170 (Interim design and TBC marked, D-371), ported from the rapid v09 Finance pages.
     Every module money step raises one financial event here; the Finance stub (BR-178) is retired (RC-147, RC-185). ---------- */
  var FC = cfg.finance;
  var FINLABEL = { received: "Received", accepted: "Accepted", posted: "Posted", staged: "Staged", finalised: "Finalised", returned: "Returned", exception: "Exception",
    confirmed: "Confirmed", pendingClearance: "Pending Clearance", prepared: "Prepared", approved: "Approved", released: "Released", rejected: "Rejected", open: "Open", assigned: "Assigned",
    resolved: "Resolved", closed: "Closed", reopened: "Reopened", exported: "Exported", failed: "Failed", partial: "Partial", current: "Current", r1: "Reminder 1", r2: "Reminder 2", final: "Final notice",
    escalated: "Escalated", hold: "Hold", pending: "Waiting for a second person", issued: "Issued", paid: "Paid", credited: "Credited", active: "Active", suspended: "Suspended", cancelled: "Cancelled",
    submitted: "Submitted", blocked: "Blocked", used: "Used", expired: "Expired", held: "Held", refunded: "Refunded", stopped: "Stopped", variance: "Variance", timing: "Timing item", clean: "Reconciled",
    complete: "Complete", incomplete: "Incomplete", draft: "Draft", inactive: "Inactive", invoice: "Invoice", creditNote: "Credit note", debitNote: "Debit note", partPaid: "Part paid", overdue: "Overdue" };
  var FINTONE = { received: "info", accepted: "success", posted: "success", staged: "warning", finalised: "secondary", returned: "danger", exception: "danger", confirmed: "success", pendingClearance: "warning",
    prepared: "warning", approved: "success", released: "secondary", rejected: "danger", open: "warning", assigned: "warning", resolved: "info", closed: "secondary", reopened: "warning", exported: "info",
    failed: "danger", partial: "warning", current: "secondary", r1: "info", r2: "warning", final: "warning", escalated: "danger", hold: "secondary", issued: "success", paid: "secondary", credited: "secondary",
    active: "success", suspended: "warning", cancelled: "secondary", submitted: "info", blocked: "danger", used: "secondary", expired: "secondary", held: "info", refunded: "secondary", stopped: "secondary",
    variance: "danger", timing: "info", clean: "success", complete: "success", incomplete: "danger", draft: "warning", inactive: "secondary", partPaid: "warning", overdue: "danger" };
  var MODNAME = { MMS: "Membership", GMS: "Golf", EVT: "Events", FAC: "Facilities", RES: "Resorts", POS: "POS file", FIN: "Finance" };
  function finbadge(s) { if (s === "pending") return '<span class="badge badge-hold">' + esc(FINLABEL.pending) + "</span>"; var t = FINTONE[s] || "secondary"; return '<span class="badge text-' + t + "-emphasis bg-" + t + '-subtle">' + esc(FINLABEL[s] || s) + "</span>"; }
  function fid(k) { return k + "-" + seq(k, 4); }
  function fevent(id) { return db.finEvents.filter(function (e) { return e.id === id; })[0]; }
  function frec(id) { return db.receivables.filter(function (r) { return r.id === id; })[0]; }
  function payerName(id) { var dbt = db.debtors.filter(function (x) { return x.id === id; })[0]; return dbt ? dbt.name : mem(id) ? holder(mem(id)) : nonMember(id) ? nonMember(id).name : id || "—"; }
  function openPeriod() { return db.finPeriods.filter(function (x) { return x.status !== "closed"; })[0]; }
  function outstanding(m) { return Rules.r2(db.receivables.filter(function (r) { return r.member === m; }).reduce(function (a, r) { return a + r.open; }, 0)); }
  function overdue(m) { return Rules.r2(db.receivables.filter(function (r) { return (!m || r.member === m) && r.open > 0 && r.due < TODAY; }).reduce(function (a, r) { return a + r.open; }, 0)); }
  // BR-023 inputs from FIN-OPS: the availability switch and each member's outstanding balance (was financeStub, RC-152)
  function finBal() { var o = {}; db.receivables.forEach(function (r) { o[r.member] = Rules.r2((o[r.member] || 0) + r.open); }); return { available: db.finance.available, outstanding: o }; }
  function accountCredit(m) { return Rules.r2(db.finPayments.filter(function (p) { return p.payer === m && p.status === "confirmed"; }).reduce(function (a, p) { return a + (p.unapplied || 0); }, 0) + ((db.finance.credits || {})[m] || 0)); }
  function finRef(id) { return id ? (/^FE-/.test(id) ? '<a href="fin-events.html?id=' + esc(id) + '">' + esc(id) + "</a>" : esc(id)) + ' <span class="badge text-success-emphasis bg-success-subtle">FIN-OPS</span>' : "—"; }
  function finExc(category, owner, ref, reason) { var x = { id: fid("EX"), at: now(), category: category, owner: owner, ref: ref, blocking: true, status: "open", reason: reason, history: [{ at: now(), by: "FIN-OPS", what: "Raised: " + reason }] }; db.finExceptions.unshift(x); return x; }
  // BR-140: a posted member charge on account 1100 creates its one receivable
  function finBill(member, desc, amount, event, id, due) {
    var r = { id: id || "BL-" + seq("BL", 4), member: member, desc: desc, amount: Rules.r2(amount), due: due || Rules.addDays(TODAY, 30), open: Rules.r2(amount), source: "MMS", event: event || null, opening: false };
    if (!Rules.bizRule140(amount, r.id, db.receivables).ok) return frec(r.id);
    db.receivables.push(r); return r;
  }
  function finPost(e) { // BR-136 – BR-138
    var m = Rules.bizRule136(e.type, FC.mappings, TODAY); if (!m.ok) { e.status = "exception"; e.reason = m.msg; finExc("Unmapped", "Finance", e.id, m.msg); return; }
    var rate = (FC.gst.filter(function (g) { return g.code === (e.tax || m.mapping.tax); })[0] || { rate: 0 }).rate;
    e.legs = Rules.bizRule137(e.amount, m.mapping, rate); var b = Rules.bizRule138(e.legs);
    if (!b.ok) { e.status = "exception"; e.reason = b.msg; finExc("Unbalanced", "Finance", e.id, b.msg); return; }
    e.status = "posted"; e.mapping = m.mapping.id; e.period = e.period || openPeriod().id; e.reason = "";
    if (e.legs.some(function (l) { return l.side === "Dr" && l.account === "1100"; }) && (mem(e.payer) || nonMember(e.payer))) finBill(e.payer, e.note || e.type + " " + e.sourceId, e.amount, e.id, /^BL-/.test(e.sourceId) ? e.sourceId : e.bill);
    finAccepted(e);
  }
  function finValidate(e) { // BR-133 – BR-135
    var x = Rules.bizRule133(e, db.finEvents, FC.approvedSources);
    if (!x.ok) { e.status = "exception"; e.reason = x.msg; finExc(/Duplicate/.test(x.msg) ? "Duplicate" : e.module === "POS" ? "File matching" : "Source data", "Finance", e.id, x.msg); return; }
    x = Rules.bizRule134(Object.assign({}, e, { module: MODNAME[e.module] })); if (!x.ok) { e.status = "returned"; e.reason = x.msg; e.owner = x.owner; publish(MODNAME[e.module], "FIN-OPS returned " + e.sourceId + ": " + x.msg, e.id); return; }
    x = Rules.bizRule135(e, db.finance.available); if (!x.ok) { e.status = "exception"; e.reason = x.msg; finExc("Credit check", MODNAME[e.module], e.id, x.msg); return; }
    e.status = "accepted"; finPost(e);
  }
  // The module record behind an accepted event shows Accepted (a pending resort payment is confirmed, SC-51)
  function finAccepted(e) {
    var p = db.resortPayments.filter(function (y) { return y.id === e.sourceId && y.finance === "pending"; })[0];
    if (p) { p.result = "success"; p.receipt = "RCP-" + seq("RCP", 4); p.finance = "accepted"; addLine(p.res, "Payment (" + p.method + ")", "payment", -p.amount, { ref: p.id }); }
    var c = db.golfCharges.filter(function (y) { return y.id === e.sourceId && y.finance === "pending"; })[0]; if (c) c.finance = "accepted";
  }
  // One financial event per module money step, validated on arrival (RC-147); returns the event
  function finOps(module, sourceId, type, payer, amount, extra) {
    var e = Object.assign({ id: fid("FE"), at: now(), module: module, sourceId: sourceId, type: type, payer: payer || "—", amount: Rules.r2(amount), tax: "SR", status: "received", period: null, legs: [], batch: null, erp: null, reason: null, creditChecked: true }, extra || {});
    db.finEvents.push(e); finValidate(e); publish("FIN-OPS", MODNAME[module] + " " + type + " " + sourceId + " " + money2(e.amount) + " → " + e.id + " " + FINLABEL[e.status], sourceId); return e;
  }
  function finPay(payer, amount, method, named, ref) { // BR-141 – BR-143
    var x = Rules.bizRule142(amount, method); if (!x.ok) return x;
    var st = Rules.bizRule143(method), p = { id: fid("PY"), paymentNo: fid("PN"), payer: payer, amount: Rules.r2(amount), method: method, status: st, at: now(), cashier: user(), session: "CS-FIN-" + TODAY.slice(5).replace("-", ""), allocations: [], unapplied: 0, reprints: [], ref: ref || "" };
    if (st === "confirmed") { var a = Rules.bizRule141(p.amount, db.receivables.filter(function (r) { return r.member === payer; }), named); a.allocations.forEach(function (y) { var r = frec(y.rec); r.open = Rules.r2(r.open - y.amount); }); p.allocations = a.allocations; p.unapplied = a.unapplied; }
    db.finPayments.unshift(p); audit("Payment " + p.paymentNo, payer, money2(p.amount) + " " + method + (p.unapplied ? ", unapplied " + money2(p.unapplied) : ""));
    return { ok: true, payment: p, msg: p.paymentNo + ": " + money2(p.amount) + " " + method + (st === "confirmed" ? (p.allocations.length ? " allocated to " + p.allocations.map(function (y) { return y.rec + " " + money2(y.amount); }).join(", ") : "") + (p.unapplied ? "; " + money2(p.unapplied) + " unapplied credit" : "") + " (BR-141)" : ": Pending Clearance, not allocated (BR-143)") };
  }
  // A module refund arrives in FIN-OPS after the module's own approval; the Finance Officer prepares it and the Finance Approver approves it (RC-148)
  function finRefundIn(module, sourceRef, member, amount, parts, kind, effect) {
    var f = { id: fid("RFD"), at: now(), module: module, sourceRef: sourceRef, payee: payerName(member), member: member, amount: Rules.r2(amount), parts: parts, status: "received", preparedBy: null, approvedBy: null, kind: kind, effect: effect || null };
    db.finRefunds.unshift(f); publish("FIN-OPS", kind + " " + sourceRef + " " + money2(amount) + " → " + f.id + " (for the Finance Officer and Finance Approver)", sourceRef); return f;
  }
  function partsFor(method, amount) { return [{ source: /member|in-house|account/i.test(method || "") ? "In-house credit" : /cash/i.test(method || "") ? "Cash" : /nets/i.test(method || "") ? "NETS" : "Card", amount: Rules.r2(amount) }]; }
  // On release the module's own refund record shows the FIN-OPS outcome; in-house credit goes back to the member account (BR-151)
  function finEffect(f) {
    var e = f.effect || {}, x;
    if (e.kind === "evt") { x = db.eventRefunds.filter(function (y) { return y.id === e.id; })[0]; if (x) x.finance = "accepted"; }
    if (e.kind === "fac") { x = db.facilityRefunds.filter(function (y) { return y.id === e.id; })[0]; if (x) x.finance = "accepted"; }
    if (e.kind === "res") { x = db.resortRefunds.filter(function (y) { return y.id === e.id; })[0]; if (x) x.finance = "accepted"; }
    if (e.kind === "mms") { x = db.handoffs.filter(function (y) { return y.id === e.id; })[0]; if (x) { x.status = "confirmed"; x.recordedBy = user(); } }
    if (e.kind === "deposit") { var dp = db.securityDeposits.filter(function (y) { return y.member === e.member; })[0]; dp.status = "refunded"; db.receivables.filter(function (r) { return r.member === e.member && r.open > 0; }).forEach(function (r) { r.open = 0; }); }
    f.parts.forEach(function (pt) { if (pt.source === "In-house credit" && f.member) { db.finance.credits = db.finance.credits || {}; db.finance.credits[f.member] = Rules.r2((db.finance.credits[f.member] || 0) + pt.amount); } });
  }
  function finRole() { return role() === "finance" || role() === "finapprover"; }
  function fbtn(label, attr, kind) { return finRole() ? '<button type="button" class="btn btn-sm btn-' + (kind || "outline-secondary") + '" ' + attr + ">" + esc(label) + "</button>" : ""; }
  function finNav() {
    var host = $("#fin-nav"); if (!host) return;
    var here = location.pathname.split("/").pop(), list = [["finance.html", "Home"], ["fin-events.html", "Events"], ["fin-accounts.html", "Accounts"], ["fin-collections.html", "Collections"], ["fin-refunds.html", "Refunds"], ["fin-recognition.html", "Recognition"], ["fin-recon.html", "Reconciliation"], ["fin-posting.html", "Posting"], ["fin-dunning.html", "Dunning"], ["fin-ar.html", "General AR"], ["fin-config.html", "Config"], ["fin-approvals.html", "Approvals"]];
    host.innerHTML = '<ul class="nav nav-pills flex-nowrap overflow-x-auto small">' + list.filter(function (l) { return Rules.bizRule084(PAGE_ROLES[l[0]], role(), LABELS).ok; }).map(function (l) {
      return '<li class="nav-item"><a class="nav-link text-nowrap' + (l[0] === here ? " active" : "") + '" href="' + l[0] + '"' + (l[0] === here ? ' aria-current="page"' : "") + ">" + l[1] + "</a></li>";
    }).join("") + "</ul>";
    $$("[data-fin-clock]").forEach(function (x) { x.textContent = "Wed " + fdate(TODAY) + " · " + cfg.golf.clock + " (demo clock) · " + openPeriod().name; });
    if (!finRole()) $$("[data-fin-actions]").forEach(function (x) { x.innerHTML = '<p class="text-muted mb-0">Read only: Finance actions are for the Finance Officer and Finance Approver.</p>'; });
  }
  // (v07, G-1, G-2) an unknown ID typed into a Finance URL says so, as the other modules do
  function finBlocked(msg, back) { $("main").innerHTML = '<div class="blocked-panel stack" role="alert" data-state="error"><p class="blocked-panel__title">' + esc(msg) + '</p><p><a href="' + back + '">Back</a></p></div>'; }
  function openEx() { return db.finExceptions.filter(function (x) { return x.status !== "closed"; }); }
  function finTab(hash) { var t = hash && $('[data-bs-target="' + hash + '"]'); if (t) bootstrap.Tab.getOrCreateInstance(t).show(); }

  pages.finance = function () {
    finNav();
    var today = db.finEvents.filter(function (e) { return e.at.slice(0, 10) === TODAY; }), recv = today.filter(function (e) { return e.status === "received"; }).length;
    var unapplied = Rules.r2(db.finPayments.reduce(function (a, p) { return a + (p.status === "confirmed" ? p.unapplied || 0 : 0); }, 0));
    $("#fh-kpis").innerHTML = kpiTiles([["Events today", today.length, recv + " to validate"], ["Open exceptions", openEx().length, "Blocking release (BR-160)"], ["Unapplied cash", money2(unapplied), "Credit not yet allocated"], ["Overdue receivables", money2(overdue()), "Past due date"]]);
    var mods = {}; today.forEach(function (e) { mods[MODNAME[e.module]] = (mods[MODNAME[e.module]] || 0) + 1; });
    barChart($("#fh-chart"), Object.keys(mods).sort().map(function (k) { return [k, mods[k]]; }));
    rows($("#fh-runs tbody"), FC.runSchedule.map(function (s) {
      var b = db.postingBatches.filter(function (x) { return x.date === TODAY && x.run === s.run; })[0];
      return "<tr>" + td("Run", "Run " + s.run) + td("Time", esc(s.time + (s.next ? " (" + s.next + " from " + fdate(s.from) + ")" : "")), "num") + td("Batch", b ? esc(b.id) : "—") + td("Status", b ? finbadge(b.status) : '<span class="badge text-secondary-emphasis bg-secondary-subtle">Not run</span>', "col-status") + "</tr>";
    }).join(""), 4);
    var sw = $("#fh-available"); sw.checked = db.finance.available; sw.disabled = !finRole();
    sw.addEventListener("change", function () { db.finance.available = sw.checked; audit("Finance availability", "FIN-OPS", sw.checked ? "Available" : "Unavailable"); save(); toast(sw.checked ? "Finance available: credit checks and in-house charges proceed" : "Finance unavailable: credit checks are blocked (BR-023) and in-house charges are held (BR-135)"); });
    var waiting = db.finRefunds.filter(function (f) { return f.status === "prepared"; }).length + db.finAdjustments.filter(function (a) { return a.status === "prepared"; }).length + db.finConfigChanges.filter(function (c) { return c.status === "draft"; }).length + db.arDocs.filter(function (d) { return d.status === "pending"; }).length;
    rows($("#fh-queues tbody"), [["Events to validate", recv, "fin-events.html"], ["Open exceptions", openEx().length, "fin-recon.html#rn-t-ex"], ["Refunds to prepare", db.finRefunds.filter(function (f) { return f.status === "received"; }).length, "fin-refunds.html"], ["Approvals waiting (checker)", waiting, "fin-approvals.html"], ["Dunning cases open", db.dunningCases.filter(function (c) { return c.stage !== "closed"; }).length, "fin-dunning.html"]].map(function (q) {
      return "<tr>" + td("Work queue", esc(q[0])) + td("Waiting", String(q[1]), "num") + td("Open", '<a href="' + q[2] + '">Open</a>', "col-actions") + "</tr>";
    }).join(""), 3);
  };

  pages.finEvents = function () {
    if (qs("id") && !fevent(qs("id"))) return finBlocked("Unknown financial event " + qs("id") + ": open it from the register.", "fin-events.html");
    finNav();
    var fmod = $("#fe-module"), fst = $("#fe-status"), fdt = $("#fe-date");
    fmod.innerHTML = '<option value="">All modules</option>' + options(Object.keys(MODNAME).map(function (m) { return [m, MODNAME[m]]; }));
    fst.innerHTML = '<option value="">All statuses</option>' + options(["received", "accepted", "posted", "staged", "finalised", "exception", "returned"].map(function (s) { return [s, FINLABEL[s]]; }));
    fdt.value = TODAY;
    function draw() {
      rows($("#fe-list tbody"), db.finEvents.filter(function (e) { return (!fmod.value || e.module === fmod.value) && (!fst.value || e.status === fst.value) && (!fdt.value || e.at.slice(0, 10) === fdt.value); }).slice().reverse().map(function (e) {
        return "<tr>" + td("Event", '<a href="fin-events.html?id=' + e.id + '">' + e.id + "</a>") + td("Received", esc(fdate(e.at)), "num") + td("Module", esc(MODNAME[e.module])) + td("Source", esc(e.sourceId)) + td("Type", '<span class="text-nowrap">' + esc(e.type) + "</span>") + td("Payer", esc(e.payer)) + td("Amount", money2(e.amount), "num") + td("Tax", esc(e.tax || "—")) + td("Status", finbadge(e.status) + (e.reason ? '<div class="text-muted small">' + esc(e.reason) + "</div>" : ""), "col-status") + td("Batch", esc(e.batch || "—")) + "</tr>";
      }).join(""), 10, "No financial events match these filters.");
    }
    [fmod, fst, fdt].forEach(function (x) { x.addEventListener("change", draw); }); draw();
    var vb = $("#fe-validate"); if (vb) vb.addEventListener("click", function () {
      var list = db.finEvents.filter(function (e) { return e.status === "received"; }); if (!list.length) return toast("Nothing is waiting for validation.");
      var ok = Workflow.canFin(role(), "validate", "received"); if (!ok.ok) return toast(ok.msg, "danger");
      list.forEach(finValidate); var c = {}; list.forEach(function (e) { c[e.status] = (c[e.status] || 0) + 1; });
      audit("Validate queue", "FIN-OPS", list.length + " events"); save();
      go("fin-events.html", list.length + " validated: " + Object.keys(c).map(function (k) { return c[k] + " " + FINLABEL[k]; }).join(", ") + " (BR-133 – BR-138)");
    });
    var e = qs("id") && fevent(qs("id")); $("#fe-panel").hidden = !e; $("#fe-register").hidden = !!e; if (!e) return;
    $("#pg-title").textContent = e.id + " · " + e.type + " · " + money2(e.amount);
    $("#fe-facts").innerHTML = facts([["Status", finbadge(e.status), true], ["Module", MODNAME[e.module]], ["Source", e.sourceId], ["Payer", e.payer + (e.payer !== "—" ? " · " + payerName(e.payer) : "")], ["Tax code", e.tax || "—"], ["Period", e.period || "—"], ["Mapping", e.mapping || "—"], ["Yonyou batch", e.batch || "—"], ["ERP document", e.erp || "—"], ["Reason", e.reason || "—"]]);
    var dr = 0, cr = 0;
    rows($("#fe-legs tbody"), e.legs.map(function (l) { if (l.side === "Dr") dr += l.amount; else cr += l.amount; var a = FC.accounts.filter(function (x) { return x.code === l.account; })[0];
      return "<tr>" + td("Side", l.side) + td("Account", esc(l.account + " " + (a ? a.name : "")) + (l.account === "2100" ? " (Output GST)" : l.account === "6900" ? " (rounding)" : "")) + td("Debit", l.side === "Dr" ? money2(l.amount) : "", "num") + td("Credit", l.side === "Cr" ? money2(l.amount) : "", "num") + "</tr>"; }).join("") +
      (e.legs.length ? "<tr>" + td("Side", "") + td("Account", "<strong>Totals: debits " + money2(Rules.r2(dr)) + (Rules.r2(dr - cr) ? " ≠ " : " = ") + "credits " + money2(Rules.r2(cr)) + "</strong>") + td("Debit", "<strong>" + money2(Rules.r2(dr)) + "</strong>", "num") + td("Credit", "<strong>" + money2(Rules.r2(cr)) + "</strong>", "num") + "</tr>" : ""), 4, "No posting set: the event is not posted.");
    var xs = db.finExceptions.filter(function (x) { return x.ref === e.id; });
    rows($("#fe-ex tbody"), xs.map(function (x) { return "<tr>" + td("Exception", esc(x.id)) + td("Category", esc(x.category)) + td("Owner", esc(x.owner)) + td("Status", finbadge(x.status), "col-status") + td("Reason", esc(x.reason)) + "</tr>"; }).join(""), 5, "No exception on this event.");
  };

  pages.finAccounts = function () {
    if (qs("member") && !mem(qs("member")) && !nonMember(qs("member"))) return finBlocked("Unknown member account " + qs("member") + ": choose a member.", "fin-accounts.html");
    finNav();
    var pick = $("#fa-member"), ids = {}; db.receivables.forEach(function (r) { ids[r.member] = 1; }); db.finPayments.forEach(function (p) { ids[p.payer] = 1; });
    var id = qs("member") || "LB10002"; pick.innerHTML = options(Object.keys(ids).filter(function (k) { return mem(k) || nonMember(k); }).sort().map(function (k) { return [k, k + " · " + payerName(k)]; }), id);
    pick.addEventListener("change", function () { go("fin-accounts.html?member=" + pick.value); });
    var m = mem(id), c = m && m.contract, av = c && Rules.bizRule023(c, finBal(), id), mine = db.receivables.filter(function (r) { return r.member === id; });
    $("#fa-kpis").innerHTML = kpiTiles([["Outstanding", money2(outstanding(id)), "Open receivables (BR-140)"], ["Overdue", money2(overdue(id)), "Past their due date"], ["Account credit", money2(accountCredit(id)), "Unapplied cash and restored credit"], ["Available credit", av && av.ok ? money2(av.available) : "—", av && av.ok ? "Limit " + money(c.creditLimit) + " − outstanding (BR-023)" : av ? av.msg : "No credit limit"]]);
    rows($("#fa-recs tbody"), mine.map(function (r) {
      var st = r.open <= 0 ? "paid" : r.open < r.amount ? "partPaid" : r.due < TODAY ? "overdue" : "open";
      return "<tr>" + td("Bill", esc(r.id)) + td("Description", esc(r.desc)) + td("Due", esc(fdate(r.due)), "num") + td("Amount", money2(r.amount), "num") + td("Open", money2(r.open), "num") + td("Status", finbadge(st), "col-status") + "</tr>";
    }).join(""), 6, "No receivables.");
    if ($("#fa-pay")) $("#fa-named").innerHTML = '<option value="">No bill named (oldest first)</option>' + options(mine.filter(function (r) { return r.open > 0; }).map(function (r) { return [r.id, r.id + " · " + money2(r.open)]; }));
    if ($("#fa-pay")) $("#fa-pay").addEventListener("submit", function (e) {
      e.preventDefault(); var f = e.target, ok = Workflow.canFin(role(), "recordPayment", "none"); if (!ok.ok) return showError($("#fa-err"), ok.msg);
      var r = finPay(id, +f.elements.amount.value, f.elements.method.value, f.elements.named.value);
      if (!r.ok) return showError($("#fa-err"), r.msg); save(); go("fin-accounts.html?member=" + id, r.msg);
    });
    rows($("#fa-pays tbody"), db.finPayments.filter(function (p) { return p.payer === id; }).map(function (p) {
      return "<tr>" + td("PaymentNo", "<strong>" + esc(p.paymentNo) + "</strong>") + td("At", esc(fdate(p.at)), "num") + td("Method", esc(p.method)) + td("Amount", money2(p.amount), "num") + td("Status", finbadge(p.status), "col-status") + td("Allocations", esc(p.allocations.map(function (a) { return a.rec + " " + money2(a.amount); }).join(" · ") || "—") + (p.unapplied ? " · unapplied " + money2(p.unapplied) : "") + (p.reprints.length ? '<div class="text-muted small">' + p.reprints.length + " reprint(s)</div>" : "")) +
        td("Actions", '<div class="cluster">' + fbtn("Reprint", 'data-rp="' + p.id + '"') + (p.status === "pendingClearance" ? fbtn("Clear cheque", 'data-clr="' + p.id + '"', "primary") : "") + "</div>", "col-actions") + "</tr>";
    }).join(""), 7, "No payments.");
    rows($("#fa-stmts tbody"), db.finStatements.filter(function (s) { return s.member === id; }).map(function (s) { return "<tr>" + td("Statement", esc(s.id)) + td("Period", esc(s.period)) + td("Version", "v" + s.version, "num") + td("Issued", esc(fdate(s.issued)), "num") + td("Closing balance", money2(s.closing), "num") + "</tr>"; }).join(""), 5, "No statements issued.");
    rows($("#fa-credits tbody"), db.spendingCredits.filter(function (s) { return s.member === id; }).map(function (s) { return "<tr>" + td("Award", esc(s.id)) + td("Granted", money2(s.granted), "num") + td("Unused", money2(Rules.r2(s.granted - s.used)), "num") + td("Valid to", esc(fdate(Rules.addMonths(s.grantDate, FC.creditMonths))), "num") + td("Status", finbadge(s.status), "col-status") + "</tr>"; }).join(""), 5, "No spending credit awards.");
    $("main").addEventListener("click", function (e) {
      var t = e.target, x;
      if ((x = t.getAttribute("data-rp"))) { var p = db.finPayments.filter(function (y) { return y.id === x; })[0]; Rules.bizRule170(p.paymentNo, p.reprints, user(), now()); audit("Receipt reprinted", p.paymentNo, "Same PaymentNo (BR-170)"); save(); return go("fin-accounts.html?member=" + id, "Receipt " + p.paymentNo + " reprinted: same number, reprint audited (BR-170)"); }
      if ((x = t.getAttribute("data-clr"))) { var q = db.finPayments.filter(function (y) { return y.id === x; })[0]; q.status = "confirmed"; var a = Rules.bizRule141(q.amount, db.receivables.filter(function (r) { return r.member === q.payer; })); a.allocations.forEach(function (y) { frec(y.rec).open = Rules.r2(frec(y.rec).open - y.amount); }); q.allocations = a.allocations; q.unapplied = a.unapplied; audit("Cheque cleared", q.paymentNo, money2(q.amount)); save(); return go("fin-accounts.html?member=" + id, q.paymentNo + " cleared and allocated (BR-143)"); }
      if (t.id === "fa-stmt") {
        var prev = db.finStatements.filter(function (s) { return s.member === id && s.period === "Oct 2026"; });
        db.finStatements.unshift({ id: "ST-" + id + "-2610", member: id, period: "Oct 2026", version: prev.length + 1, issued: TODAY, closing: outstanding(id) });
        audit("Statement " + (prev.length ? "reissued" : "issued"), id, "Oct 2026 v" + (prev.length + 1)); save(); go("fin-accounts.html?member=" + id, "Statement Oct 2026 v" + (prev.length + 1) + " issued; earlier versions kept");
      }
    });
  };

  pages.finCollections = function () {
    finNav();
    var month = TODAY.slice(0, 7);
    rows($("#co-orders tbody"), db.standingOrders.map(function (o) { return "<tr>" + td("Order", esc(o.id)) + td("Member", memberLink(o.member)) + td("Type", esc(o.type)) + td("Maximum debit", money2(o.max), "num") + td("Account", esc(o.account)) + td("Status", finbadge(o.status), "col-status") + "</tr>"; }).join(""), 6);
    rows($("#co-list tbody"), db.giroCollections.slice().reverse().map(function (c) { return "<tr>" + td("Line", esc(c.id)) + td("Member", memberLink(c.member)) + td("Month", esc(c.month), "num") + td("Amount", money2(c.amount), "num") + td("Status", finbadge(c.status), "col-status") + td("Reason", esc(c.reason || (c.payment ? "→ Payment " + c.payment : "—"))) + "</tr>"; }).join(""), 6, "No collection lines yet.");
    var bl = db.finance.collectionBlocks || []; $("#co-blocked").innerHTML = bl.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join(""); $("#co-blocked-wrap").hidden = !bl.length;
    $("main").addEventListener("click", function (e) {
      var t = e.target, ok;
      if (t.id === "co-run") {
        if (!(ok = Workflow.canFin(role(), "runCollection", "none")).ok) return toast(ok.msg, "danger");
        if (db.giroCollections.some(function (c) { return c.month === month && c.run; })) return toast("The " + month + " collection has already run.", "danger");
        var blocks = [], n = 0;
        db.standingOrders.forEach(function (o) {
          var due = Rules.r2(db.receivables.filter(function (r) { return r.member === o.member && r.open > 0; }).reduce(function (a, r) { return a + r.open; }, 0)), x = Rules.bizRule144(o, due);
          if (!x.ok) return blocks.push(x.msg);
          db.giroCollections.push({ id: fid("COL"), order: o.id, member: o.member, month: month, amount: due, status: "submitted", reason: "", at: now(), run: true }); n++;
        });
        db.finance.collectionBlocks = blocks; audit("GIRO collection run", month, n + " submitted, " + blocks.length + " not collected"); save();
        return go("fin-collections.html", n + " collections submitted; " + blocks.length + " not collected (BR-144)");
      }
      if (t.id === "co-results") {
        if (!(ok = Workflow.canFin(role(), "bankResults", "submitted")).ok) return toast(ok.msg, "danger");
        var sub = db.giroCollections.filter(function (c) { return c.status === "submitted"; }); if (!sub.length) return toast("No submitted collections wait for bank results.", "danger");
        var msg = [];
        sub.forEach(function (c) {
          var r = db.finSamples.bankResults[c.member] || ["accepted", ""], out = Rules.bizRule145(r[0], r[1]); c.status = r[0]; c.reason = r[1];
          if (out.payment) { var p = finPay(c.member, c.amount, "GIRO"); c.payment = p.payment.paymentNo; return; }
          if (Rules.bizRule146(db.giroCollections, c.member, month)) { var fee = Rules.r2(FC.giroFee * 1.09), fe = finOps("FIN", "GIRO-FEE-" + c.member + "-" + month, "FIN-FEE", c.member, fee, { note: "Second GIRO rejection fee " + month }); msg.push(c.member + " second rejection: fee " + money2(fee) + " (" + fe.id + ", BR-146)"); }
          if (out.cancelOrder) { var o = db.standingOrders.filter(function (y) { return y.id === c.order; })[0]; o.status = "cancelled"; msg.push(o.id + " cancelled: mandate invalid (BR-145)"); }
        });
        audit("Bank results applied", month, sub.length + " results"); save();
        return go("fin-collections.html", sub.length + " bank results applied, none retried. " + msg.join("; "));
      }
      if (t.id === "co-cheques") {
        if (!(ok = Workflow.canFin(role(), "returnCheque", "confirmed")).ok) return toast(ok.msg, "danger");
        var done = [];
        db.finSamples.returnedCheques.forEach(function (no) {
          var p = db.finPayments.filter(function (y) { return y.paymentNo === no && y.status !== "returned"; })[0]; if (!p) return;
          Rules.bizRule147(p).forEach(function (a) { var r = frec(a.rec); if (r) r.open = Rules.r2(r.open + a.amount); }); p.status = "returned"; p.allocations = []; done.push(no + " returned: " + p.payer + " reopened");
        });
        db.finSamples.returnedCheques = []; save(); return go("fin-collections.html", done.length ? done.join("; ") + "; no Debit Note (BR-147)" : "No returned cheques in the bank file.");
      }
    });
  };

  pages.finRefunds = function () {
    finNav();
    rows($("#rf-list tbody"), db.finRefunds.map(function (f) {
      var act = f.status === "received" ? fbtn("Prepare", 'data-prep="' + f.id + '"', "outline-alt") : f.status === "approved" ? fbtn("Release", 'data-rrel="' + f.id + '"', "outline-alt") : f.status === "prepared" ? '<span class="badge badge-hold">Waiting for a second person</span>' : "—";
      return "<tr>" + td("Refund", "<strong>" + esc(f.id) + "</strong>") + td("From", esc(MODNAME[f.module] + " " + f.sourceRef) + '<div class="text-muted small">' + esc(f.kind) + "</div>") + td("Payee", esc(f.payee)) + td("Amount", money2(f.amount), "num") +
        td("Parts", Rules.bizRule151(f.parts).map(function (p) { return esc(p.source + " " + money2(p.amount)) + (p.source === "In-house credit" ? " → member account" : ""); }).join("<br>")) + td("Status", finbadge(f.status), "col-status") + td("Prepared / approved", esc((f.preparedBy || "—") + " / " + (f.approvedBy || "—"))) + td("Actions", act, "col-actions") + "</tr>";
    }).join(""), 8, "No refunds.");
    if ($("#dp-form")) {
    $("#dp-member").innerHTML = options(db.securityDeposits.filter(function (d) { return d.status === "held"; }).map(function (d) { return [d.member, d.member + " · deposit " + money2(d.amount) + " · owes " + money2(outstanding(d.member))]; }), "SM10013");
    $("#dp-member").addEventListener("change", dpShow); dpShow();
    function dpShow() { var id = $("#dp-member").value, d = db.securityDeposits.filter(function (x) { return x.member === id; })[0]; if (!d) return; $("#dp-facts").innerHTML = facts([["Deposit held", money2(d.amount)], ["Outstanding offset first", money2(-outstanding(id))], ["Refundable", "<strong>" + money2(Rules.bizRule149(d.amount, outstanding(id))) + "</strong>", true]]); }
    $("#dp-form").addEventListener("submit", function (e) {
      e.preventDefault(); var ok = Workflow.canFin(role(), "prepare", "received"); if (!ok.ok) return showError($("#dp-err"), ok.msg);
      var id = $("#dp-member").value, d = db.securityDeposits.filter(function (x) { return x.member === id; })[0];
      if (db.finRefunds.some(function (f) { return f.effect && f.effect.kind === "deposit" && f.effect.member === id && f.status !== "rejected"; })) return showError($("#dp-err"), "A deposit refund for " + id + " is already in the queue.");
      var owed = outstanding(id), amt = Rules.bizRule149(d.amount, owed), f = finRefundIn("FIN", "Deposit " + id, id, amt, [{ source: "Bank transfer", amount: amt }], "Security deposit refund (" + money2(d.amount) + " − " + money2(owed) + " offset)", { kind: "deposit", member: id });
      f.status = "prepared"; f.preparedBy = user(); save(); go("fin-refunds.html", "Deposit refund " + f.id + " " + money2(amt) + " prepared after offsetting " + money2(owed) + " (BR-149)");
    });
    }
    var evs = db.finEvents.filter(function (e) { return ["posted", "staged", "finalised"].indexOf(e.status) >= 0; }).slice(-30).reverse();
    if ($("#adj-form")) $("#adj-event").innerHTML = options(evs.map(function (e) { return [e.id, e.id + " · " + e.type + " · " + money2(e.amount)]; }));
    if ($("#adj-form")) $("#adj-form").addEventListener("submit", function (e) {
      e.preventDefault(); var f = e.target, ok = Workflow.canFin(role(), "prepareAdjustment", "none"); if (!ok.ok) return showError($("#adj-err"), ok.msg);
      var ev2 = fevent(f.elements.event.value), x = Rules.bizRule157(ev2); if (!x.ok) return showError($("#adj-err"), x.msg);
      if (!f.elements.reason.value.trim() || !+f.elements.amount.value) return showError($("#adj-err"), "Enter the amount and the reason (BR-157).");
      var a = { id: fid("ADJ"), event: ev2.id, amount: +f.elements.amount.value, reason: f.elements.reason.value.trim(), status: "prepared", preparedBy: user(), approvedBy: null, at: now() };
      db.finAdjustments.unshift(a); audit("Adjustment prepared", a.id, ev2.id + " " + money2(a.amount)); save();
      go("fin-refunds.html", a.id + " prepared on " + ev2.id + "; the original event is unchanged; a second person approves it (BR-157)");
    });
    rows($("#adj-list tbody"), db.finAdjustments.map(function (a) { return "<tr>" + td("Adjustment", esc(a.id)) + td("Event", /^FE-/.test(a.event) ? '<a href="fin-events.html?id=' + a.event + '">' + a.event + "</a>" : esc(a.event)) + td("Amount", money2(a.amount), "num") + td("Reason", esc(a.reason)) + td("Prepared / approved", esc(a.preparedBy + " / " + (a.approvedBy || "—"))) + td("Status", finbadge(a.status === "prepared" ? "pending" : a.status), "col-status") + "</tr>"; }).join(""), 6, "No adjustments.");
    if ($("#ov-form")) $("#ov-member").innerHTML = options(db.memberships.filter(function (m) { return m.status === "active" && m.contract && m.contract.creditLimit; }).map(function (m) { return [m.membershipId, m.membershipId + " · " + holder(m)]; }), "LB10002");
    if ($("#ov-form")) $("#ov-form").addEventListener("submit", function (e) {
      e.preventDefault(); var f = e.target, x = Rules.bizRule158(role()); if (!x.ok) return showError($("#ov-err"), x.msg);
      if (!f.elements.reason.value.trim() || !(+f.elements.amount.value > 0)) return showError($("#ov-err"), "Enter the amount and the reason (BR-158).");
      db.creditOverrides.unshift({ id: fid("OVR"), member: f.elements.member.value, amount: +f.elements.amount.value, reason: f.elements.reason.value.trim(), by: user(), at: now() }); audit("Credit-limit override", f.elements.member.value, money2(+f.elements.amount.value) + ": " + f.elements.reason.value.trim()); save();
      go("fin-refunds.html", "Override recorded with authority and audited (BR-158)");
    });
    rows($("#ov-list tbody"), db.creditOverrides.map(function (o) { return "<tr>" + td("Override", esc(o.id)) + td("Member", memberLink(o.member)) + td("Amount", money2(o.amount), "num") + td("Reason", esc(o.reason)) + td("By", esc(o.by)) + td("At", esc(fdate(o.at)), "num") + "</tr>"; }).join(""), 6, "No overrides.");
    $("#rf-list").addEventListener("click", function (e) {
      var t = e.target, id, f, ok;
      if ((id = t.getAttribute("data-prep"))) { if (!(ok = Workflow.canFin(role(), "prepare", "received")).ok) return toast(ok.msg, "danger"); f = db.finRefunds.filter(function (y) { return y.id === id; })[0]; f.status = "prepared"; f.preparedBy = user(); audit("Refund prepared", f.id, money2(f.amount)); save(); return go("fin-refunds.html", id + " prepared by " + user() + ": a second person approves it in Finance approvals (BR-150)"); }
      if ((id = t.getAttribute("data-rrel"))) { if (!(ok = Workflow.canFin(role(), "release", "approved")).ok) return toast(ok.msg, "danger"); f = db.finRefunds.filter(function (y) { return y.id === id; })[0]; f.status = "released"; f.releasedAt = now(); finEffect(f);
        audit("Refund released", f.id, Rules.bizRule151(f.parts).map(function (p) { return money2(p.amount) + " " + p.settle; }).join("; ")); save();
        return go("fin-refunds.html", id + " released: " + Rules.bizRule151(f.parts).map(function (p) { return money2(p.amount) + " " + p.settle; }).join("; ") + " (BR-151)"); }
    });
  };

  pages.finRecognition = function () {
    finNav();
    rows($("#rc-deferred tbody"), db.deferredRevenue.map(function (d) { return "<tr>" + td("Deferred", esc(d.id)) + td("Source", esc(MODNAME[d.source] + " " + d.ref)) + td("Basis", esc(d.basis)) + td("Total", money2(d.total), "num") + td("Recognised", money2(d.recognised), "num") + td("Remaining", money2(Rules.r2(d.total - d.recognised)), "num") + "</tr>"; }).join(""), 6);
    rows($("#rc-runs tbody"), db.recognitionRuns.map(function (r) { return "<tr>" + td("Date", esc(fdate(r.date)), "num") + td("Amount", money2(r.amount), "num") + td("By", esc(r.by)) + "</tr>"; }).join(""), 3);
    var R0 = db.efRecon; $("#rc-recon").innerHTML = facts([["Period", R0.period], ["MMS entrance fees", money2(R0.mms)], ["Schedules", money2(R0.schedule)], ["Variance", money2(R0.variance) + (R0.timing ? " (timing item: " + R0.timing + ")" : "")], ["Status", finbadge(R0.status), true], ["Last amortised", R0.lastAmortised]]);
    rows($("#rc-sched tbody"), db.efSchedules.map(function (s) { return "<tr>" + td("Member", memberLink(s.member)) + td("Entrance fee", money2(s.fee), "num") + td("Months", String(s.months), "num") + td("Posted", String(s.posted), "num") + td("Monthly", money2(Rules.r2(s.fee / s.months)), "num") + td("Status", finbadge(s.status), "col-status") + "</tr>"; }).join(""), 6);
    rows($("#rc-credits tbody"), db.spendingCredits.map(function (s) { var due = s.status === "active" && Rules.bizRule148(s.grantDate, FC.creditMonths, TODAY);
      return "<tr>" + td("Award", esc(s.id)) + td("Member", memberLink(s.member)) + td("Granted", money2(s.granted), "num") + td("Unused", money2(Rules.r2(s.granted - s.used)), "num") + td("Valid to", esc(fdate(Rules.addMonths(s.grantDate, FC.creditMonths))), "num") + td("Status", finbadge(s.status), "col-status") + td("Actions", due ? fbtn("Expire unused", 'data-exp="' + s.id + '"', "primary") : "—", "col-actions") + "</tr>"; }).join(""), 7);
    $("main").addEventListener("click", function (e) {
      var t = e.target, id;
      if (!finRole() && (t.id || t.getAttribute("data-exp"))) return;
      if ((id = t.getAttribute("data-exp"))) { var s = db.spendingCredits.filter(function (y) { return y.id === id; })[0], left = Rules.r2(s.granted - s.used); s.status = "expired";
        db.finAdjustments.unshift({ id: fid("ADJ"), event: s.id, amount: -left, reason: "Spending credit expiry (non-cash, BR-148)", status: "approved", preparedBy: "FIN-OPS", approvedBy: "Policy (24 months)", at: now() }); audit("Spending credit expired", s.id, money2(left)); save();
        return go("fin-recognition.html", id + ": " + money2(left) + " expired through a non-cash adjustment; not refundable (BR-148)"); }
      if (t.id === "rc-run") {
        var total = 0, done = [];
        db.deferredRevenue.filter(function (d) { return d.basis === "On delivery"; }).forEach(function (d) { var a = Rules.bizRule152(d, TODAY); if (a) { d.recognised = Rules.r2(d.recognised + a); total += a; done.push(d.ref + " " + money2(a)); } });
        if (!total) return toast("Nothing delivered is waiting for recognition (resort nights are recognised when Night Audit closes the day).");
        var ev = finOps("FIN", "REC-" + TODAY + "-EVT", "RECOGNITION", "—", Rules.r2(total), { tax: "ES", note: "Events delivered " + fdate(TODAY) });
        db.recognitionRuns.unshift({ date: TODAY, amount: Rules.r2(total), by: user() + " (events delivered)" }); audit("Revenue recognition", TODAY, money2(total)); save();
        return go("fin-recognition.html", "Recognised " + money2(total) + ": " + done.join(", ") + "; no second GST (" + ev.id + ", BR-152)");
      }
      if (t.id === "rc-timing") { return ask({ title: "Record a timing item", body: "What explains the S$" + db.efRecon.variance.toFixed(2) + " variance?", reason: "Timing item", ok: "Record timing item", run: function (why) { if (!why) return { ok: false, msg: "Describe the timing item (BR-154)." }; db.efRecon.timing = why; db.efRecon.status = "timing"; audit("Timing item recorded", "Entrance fees", why); save(); go("fin-recognition.html", "Timing item recorded: the reconciliation is explained (BR-154)"); return { ok: true }; } }); }
      if (t.id === "rc-amort") {
        var x = Rules.bizRule153(db.efRecon); if (!x.ok) return toast(x.msg, "danger");
        if (db.efRecon.lastAmortised === "Oct 2026") return toast("October 2026 is already amortised.", "danger");
        var n = 0, stopped = [];
        db.efSchedules.forEach(function (s) { var m = mem(s.member); if (s.status !== "active") return; if (m && ["deceased", "withdrawn", "ended"].indexOf(m.status) >= 0) { s.status = "stopped"; stopped.push(s.member); return; } s.posted++; n++; });
        var amt = Rules.r2(db.efSchedules.filter(function (s) { return s.status === "active"; }).reduce(function (a, s) { return a + s.fee / s.months; }, 0));
        var ev2 = finOps("FIN", "AMORT-2610", "AMORTISATION", "—", amt, { tax: "ES", note: "Entrance fee amortisation Oct 2026" });
        db.efRecon.lastAmortised = "Oct 2026"; audit("Entrance fee amortisation", "Oct 2026", n + " schedules"); save();
        return go("fin-recognition.html", "October amortised on " + n + " schedules (" + ev2.id + ")" + (stopped.length ? "; stopped: " + stopped.join(", ") + ", posted months unchanged" : "") + " (BR-153)");
      }
    });
  };

  pages.finRecon = function () {
    finNav();
    rows($("#rn-sessions tbody"), db.cashierSessions.map(function (s) { var ls = Rules.bizRule156(s.expected, s.counted), v = Rules.r2(ls.reduce(function (a, l) { return a + l.variance; }, 0));
      return "<tr>" + td("Session", esc(s.id)) + td("Location", esc(s.location + " · " + s.cashier)) + td("By tender (expected / counted)", ls.map(function (l) { return esc(l.tender + " " + money2(l.expected) + " / " + money2(l.counted)); }).join("<br>")) + td("Variance", money2(v), "num") + td("Status", finbadge(s.status), "col-status") + td("Actions", s.status === "open" ? fbtn("Close session", 'data-cls="' + s.id + '"', "primary") : esc(s.bankIn || "—"), "col-actions") + "</tr>"; }).join(""), 6);
    rows($("#rn-profiles tbody"), db.reconProfiles.map(function (p) { var r = p.result;
      return "<tr>" + td("Profile", esc(p.name)) + td("Expected", money2(p.expected), "num") + td("Actual", money2(p.actual), "num") + td("Timing item", r && r.timing ? money2(r.timing) + " · " + esc(p.timing.note) : "—") + td("Result", r ? finbadge(r.ok ? "complete" : "incomplete") : esc("Last: " + fdate(p.last.date) + " " + p.last.status), "col-status") +
        td("Actions", '<div class="cluster">' + fbtn("Run", 'data-run="' + p.id + '"') + (r && !r.ok && p.timing ? fbtn("Record timing item", 'data-tim="' + p.id + '"', "primary") : "") + "</div>", "col-actions") + "</tr>"; }).join(""), 6);
    rows($("#rn-clearing tbody"), db.clearingFlows.map(function (c) { return "<tr>" + td("Flow", esc(c.id)) + td("Description", esc(c.flow)) + td("Expected", String(c.expected), "num") + td("Matched", String(c.matched), "num") + td("Residual", money2(c.residual), "num") + td("Status", finbadge(c.residual ? "variance" : "clean"), "col-status") + "</tr>"; }).join(""), 6);
    rows($("#rn-ex tbody"), db.finExceptions.map(function (x) {
      var act = x.status === "closed" || !finRole() ? "—" : '<div class="cluster">' + (x.status === "open" ? fbtn("Assign", 'data-asg="' + x.id + '"') : "") + (x.status !== "resolved" ? fbtn("Resolve", 'data-rsv="' + x.id + '"') : fbtn("Reprocess and close", 'data-xcl="' + x.id + '"', "primary")) + "</div>";
      return "<tr>" + td("Exception", esc(x.id)) + td("Category", esc(x.category)) + td("Owner", esc(x.owner)) + td("Reference", /^FE-/.test(x.ref) ? '<a href="fin-events.html?id=' + x.ref + '">' + x.ref + "</a>" : esc(x.ref)) + td("Reason", esc(x.reason)) + td("Age", Math.max(0, Math.round((Date.parse(TODAY) - Date.parse(x.at.slice(0, 10))) / 864e5)) + " d", "num") + td("Status", finbadge(x.status), "col-status") + td("Actions", act, "col-actions") + "</tr>";
    }).join(""), 8, "No financial exceptions.");
    finTab(location.hash);
    $("main").addEventListener("click", function (e) {
      var t = e.target, id, x;
      if ((id = t.getAttribute("data-cls"))) { var s = db.cashierSessions.filter(function (y) { return y.id === id; })[0], ls = Rules.bizRule156(s.expected, s.counted); s.status = "closed"; s.bankIn = "BI-" + TODAY.slice(5).replace("-", "") + "-" + seq("BI", 2);
        var bad = ls.filter(function (l) { return l.variance; }), xs = bad.map(function (l) { return finExc("Cashier variance", "Finance", s.id, l.tender + " " + money2(l.variance) + " against expected " + money2(l.expected)).id; }); audit("Cashier session closed", s.id, bad.length ? "Variance" : "Balanced"); save();
        return go("fin-recon.html", s.id + " closed" + (bad.length ? ": " + bad.map(function (l) { return l.tender + " " + money2(l.variance); }).join(", ") + " → exception " + xs.join(", ") + " (BR-156)" : ", balanced") + "; cash and cleared cheques to bank-in " + s.bankIn); }
      if ((id = t.getAttribute("data-run"))) { var p = db.reconProfiles.filter(function (y) { return y.id === id; })[0]; p.result = Rules.bizRule154(p.expected, p.actual, 0, p.tolerance); save(); return go("fin-recon.html", p.name + ": " + (p.result.ok ? "complete" : p.result.msg)); }
      if ((id = t.getAttribute("data-tim"))) { var q = db.reconProfiles.filter(function (y) { return y.id === id; })[0]; q.result = Rules.bizRule154(q.expected, q.actual, q.timing.amount, q.tolerance); q.result.timing = q.timing.amount; save(); return go("fin-recon.html", "Timing item " + money2(q.timing.amount) + " recorded, not absorbed: " + (q.result.ok ? "complete" : q.result.msg) + " (BR-154)"); }
      if ((id = t.getAttribute("data-asg"))) { x = db.finExceptions.filter(function (y) { return y.id === id; })[0];
        return ask({ title: "Assign " + id, body: "Owner: Finance, a module (Golf, Events, Facilities, Resorts, Membership) or an external party.", reason: "Owner", ok: "Assign", run: function (who) { if (!who) return { ok: false, msg: "Name the owner (BR-163)." }; x.owner = who; x.status = "assigned"; x.history.push({ at: now(), by: user(), what: "Assigned to " + who }); save(); go("fin-recon.html#rn-t-ex", id + " assigned to " + who); return { ok: true }; } }); }
      if ((id = t.getAttribute("data-rsv"))) { x = db.finExceptions.filter(function (y) { return y.id === id; })[0];
        return ask({ title: "Resolve " + id, body: x.reason, reason: "How was it resolved?", ok: "Resolve", run: function (how) { if (!how) return { ok: false, msg: "Record how it was resolved (BR-163)." }; x.status = "resolved"; x.resolution = how; x.history.push({ at: now(), by: user(), what: "Resolved: " + how }); save(); go("fin-recon.html#rn-t-ex", id + " resolved; reprocess to close it"); return { ok: true }; } }); }
      if ((id = t.getAttribute("data-xcl"))) { x = db.finExceptions.filter(function (y) { return y.id === id; })[0]; var ok = Rules.bizRule163(x); if (!ok.ok) return toast(ok.msg, "danger");
        var ev2 = fevent(x.ref), out = "";
        if (ev2 && x.category === "Yonyou rejection") { ev2.status = "posted"; ev2.prevBatch = ev2.batch; ev2.batch = null; ev2.resubmitted = true; ev2.reason = ""; out = ev2.id + " posted again for the next run"; }
        else if (ev2 && ["Unmapped", "Source data", "Credit check", "File matching", "Tax-invalid"].indexOf(x.category) >= 0) { ev2.status = "received"; ev2.reason = null; if (x.category === "File matching") ev2.matched = true; if (x.category === "Credit check") ev2.creditChecked = true; if (x.category === "Tax-invalid") ev2.tax = "SR"; x.status = "closed"; finValidate(ev2); out = ev2.id + " reprocessed: " + FINLABEL[ev2.status]; }
        var cl = db.clearingFlows.filter(function (c) { return c.id === x.ref; })[0]; if (cl) { cl.residual = 0; cl.matched = cl.expected; out = cl.id + " back to zero (BR-155)"; }
        x.status = "closed"; x.history.push({ at: now(), by: user(), what: "Reprocessed and closed" + (out ? ": " + out : "") }); save(); return go("fin-recon.html#rn-t-ex", id + " closed" + (out ? "; " + out : "") + " (BR-163)"); }
    });
  };

  pages.finPosting = function () {
    finNav();
    rows($("#ps-periods tbody"), db.finPeriods.map(function (p) { return "<tr>" + td("Period", esc(p.id)) + td("Month", esc(p.name)) + td("Status", finbadge(p.status), "col-status") + td("Actions", role() === "finapprover" ? (p.status === "closed" ? fbtn("Reopen", 'data-reo="' + p.id + '"') : fbtn("Close", 'data-pcl="' + p.id + '"')) : "—", "col-actions") + "</tr>"; }).join(""), 4);
    rows($("#ps-runs tbody"), FC.runSchedule.map(function (s) { return "<tr>" + td("Run", "Run " + s.run) + td("Time", esc(s.time), "num") + "</tr>"; }).join(""), 2);
    var late = db.finSamples.lateEvent; $("#ps-late").textContent = late ? MODNAME[late.module] + " " + late.sourceId + " · " + payerName(late.payer) + " · " + money2(late.amount) + " · source date " + fdate(late.sourceDate) : "No late items."; $("#ps-late-act").hidden = !late || !finRole();
    rows($("#ps-batches tbody"), db.postingBatches.slice().reverse().map(function (b) {
      var act = b.status === "staged" || b.status === "failed" ? fbtn(b.status === "failed" ? "Retry export" : "Export file", 'data-exf="' + b.id + '"', "primary") : b.status === "exported" ? fbtn("Import response", 'data-imp="' + b.id + '"', "primary") : "—";
      return "<tr>" + td("Batch", "<strong>" + esc(b.id) + "</strong>") + td("Run", esc(b.label || ("Run " + b.run + " · " + b.time + " (" + fdate(b.date) + ")"))) + td("Lines", String(b.events.length), "num") + td("Status", finbadge(b.status), "col-status") + td("Actions", act, "col-actions") + "</tr>";
    }).join(""), 5, "No posting batches yet.");
    var ready = db.finEvents.filter(function (e) { return Rules.bizRule160(e, db.finExceptions); }).length, held = db.finEvents.filter(function (e) { return (e.status === "posted" && !e.batch && !Rules.bizRule160(e, db.finExceptions)) || e.status === "exception"; }).length;
    $("#ps-ready").textContent = ready + " posting-ready lines; " + held + " held back by an open exception (BR-160).";
    $("main").addEventListener("click", function (e) {
      var t = e.target, id, b, ok, run = t.getAttribute("data-prun");
      if (run) {
        if (!(ok = Workflow.canFin(role(), "runPosting", "none")).ok) return toast(ok.msg, "danger");
        if (!(ok = Rules.bizRule161(db.postingBatches, TODAY, run)).ok) return toast(ok.msg, "danger");
        var list = db.finEvents.filter(function (x) { return Rules.bizRule160(x, db.finExceptions); }); if (!list.length) return toast("No posting-ready lines (BR-160).", "danger");
        var n = db.postingBatches.filter(function (x) { return x.date === TODAY; }).length + 1, s = FC.runSchedule.filter(function (x) { return x.run === +run; })[0];
        b = { id: "PB-" + TODAY.slice(5).replace("-", "") + "-" + n, date: TODAY, run: run === "adhoc" ? 9 : +run, time: s ? s.time : "ad-hoc", label: run === "adhoc" ? "Ad-hoc run (" + fdate(TODAY) + ")" : null, events: list.map(function (x) { return x.id; }), status: "staged", exports: 0 };
        list.forEach(function (x) { x.status = "staged"; x.batch = b.id; }); db.postingBatches.push(b); audit("Posting run", b.id, list.length + " lines"); save();
        return go("fin-posting.html", b.id + " staged with " + list.length + " lines; lines with an open exception left out (BR-160, BR-161)");
      }
      if ((id = t.getAttribute("data-exf"))) { b = db.postingBatches.filter(function (x) { return x.id === id; })[0]; b.exports = (b.exports || 0) + 1;
        if (FC.failNextExport) { FC.failNextExport = false; b.status = "failed"; publish("FIN-OPS", "Yonyou export of " + b.id + " failed (transport, simulated)", b.id); save(); return go("fin-posting.html", b.id + ": transport failed; the same staged batch is kept for retry, never regenerated (BR-160)"); }
        b.status = "exported"; publish("FIN-OPS", "Yonyou file export " + b.id + " (" + b.events.length + " lines, simulated)", b.id); save(); return go("fin-posting.html", b.id + " exported: same batch, same lines"); }
      if ((id = t.getAttribute("data-imp"))) { b = db.postingBatches.filter(function (x) { return x.id === id; })[0]; var rej = 0, res = [];
        b.events.map(fevent).forEach(function (x) {
          if (x.type === db.finSamples.yonyouReject.type && !x.resubmitted && !rej) { x.status = "exception"; x.reason = "Yonyou: " + db.finSamples.yonyouReject.reason; finExc("Yonyou rejection", "Finance", x.id, db.finSamples.yonyouReject.reason); rej++; res.push("rejected"); }
          else { x.status = "finalised"; x.erp = "YON-" + (2620000 + db.finEvents.indexOf(x)); res.push("accepted"); }
        });
        b.status = Rules.bizRule162(res); publish("FIN-OPS", "Yonyou response for " + b.id + ": " + FINLABEL[b.status], b.id); save();
        return go("fin-posting.html", b.id + ": " + (b.events.length - rej) + " lines accepted with ERP document numbers" + (rej ? "; " + rej + " rejected → exception, resubmitted once after it is resolved" : "") + " (BR-162)"); }
      if ((id = t.getAttribute("data-pcl") || t.getAttribute("data-reo"))) { var p = db.finPeriods.filter(function (y) { return y.id === id; })[0], reo = !!t.getAttribute("data-reo");
        ok = Workflow.canFin(role(), reo ? "reopenPeriod" : "closePeriod", p.status); if (!ok.ok) return toast(ok.msg, "danger");
        if (!reo && db.finExceptions.some(function (x) { return x.status !== "closed" && x.blocking; }) && p.status !== "closed") return toast("Open blocking exceptions: close them before closing " + p.name + " (BR-159).", "danger");
        return ask({ title: (reo ? "Reopen " : "Close ") + p.name + "?", body: reo ? "A reopened period accepts late postings again." : "A Closed period refuses new postings; late items go to the next open period.", reason: reo ? "Reason to reopen" : null, ok: reo ? "Reopen" : "Close period", run: function (why) { if (reo && !why) return { ok: false, msg: "A reason is needed to reopen (BR-159)." }; p.status = reo ? "reopened" : "closed"; audit("Period " + p.status, p.id, why || "close"); save(); go("fin-posting.html", p.name + " " + FINLABEL[p.status]); return { ok: true }; } }); }
      if (t.id === "ps-late-sep") return toast("Sep 2026 is Closed: no new posting into it unless it is reopened (BR-159).", "danger");
      if (t.id === "ps-late-post") {
        var L = db.finSamples.lateEvent, per = Rules.bizRule159(L.sourceDate, db.finPeriods);
        var ev3 = finOps(L.module, L.sourceId + "-LATE", L.type, L.payer, L.amount, { sourceDate: L.sourceDate, period: per.period.id, note: "Late item, source date " + L.sourceDate }); db.finSamples.lateEvent = null; save();
        return go("fin-posting.html", ev3.id + ": " + (per.ok ? "posted in " + per.period.name : per.msg));
      }
    });
  };

  pages.finDunning = function () {
    finNav();
    var P = FC.dunning, by = {}; db.dunningCases.forEach(function (c) { by[c.stage] = (by[c.stage] || 0) + 1; });
    $("#dn-kpis").innerHTML = kpiTiles([["Open cases", db.dunningCases.filter(function (c) { return c.stage !== "closed"; }).length, "Members being followed up"], ["Overdue", money2(overdue()), "Eligible overdue balance (BR-164)"], ["Escalated", db.finEscalations.length, "To Membership, no suspension (BR-165)"], ["On hold", by.hold || 0, "With a documented reason"]]);
    barChart($("#dn-chart"), ["current", "r1", "r2", "final", "escalated", "hold"].map(function (s) { return [FINLABEL[s], by[s] || 0]; }));
    rows($("#dn-cases tbody"), db.dunningCases.map(function (c) { var st = Rules.bizRule164(db.receivables.filter(function (r) { return r.member === c.member; }), TODAY, P);
      return "<tr>" + td("Case", esc(c.id)) + td("Member", memberLink(c.member) + " " + esc(payerName(c.member))) + td("Overdue", money2(overdue(c.member)), "num") + td("Age (days)", String(st.days), "num") + td("Stage", finbadge(c.stage), "col-status") + td("Last action", esc(c.hold ? "On hold: " + c.hold.reason + " until " + fdate(c.hold.until) : c.last)) +
        td("Actions", c.stage === "closed" ? "—" : c.stage === "hold" ? fbtn("End hold", 'data-hend="' + c.id + '"') : fbtn("Place on hold", 'data-hold="' + c.id + '"'), "col-actions") + "</tr>"; }).join(""), 7);
    rows($("#dn-esc tbody"), db.finEscalations.map(function (x) { return "<tr>" + td("Escalation", esc(x.id)) + td("Member", memberLink(x.member)) + td("Case", esc(x.case)) + td("Raised", esc(fdate(x.at)), "num") + td("Status", finbadge(x.status), "col-status") + "</tr>"; }).join(""), 5, "No escalations.");
    $("main").addEventListener("click", function (e) {
      var t = e.target, id, c, ok;
      if (t.id === "dn-eval") { if (!(ok = Workflow.canFin(role(), "evaluate", "any")).ok) return toast(ok.msg, "danger"); var changes = [], members = {};
        db.receivables.forEach(function (r) { if (r.open > 0) members[r.member] = 1; }); db.dunningCases.forEach(function (x) { members[x.member] = 1; });
        Object.keys(members).filter(function (m) { return mem(m); }).forEach(function (m) {
          c = db.dunningCases.filter(function (x) { return x.member === m; })[0]; var st = Rules.bizRule164(db.receivables.filter(function (r) { return r.member === m; }), TODAY, P);
          if (c && c.stage === "hold") return;
          if (!c) { if (st.stage === "current" || st.stage === "closed") return; c = { id: "DC-" + String(db.dunningCases.length + 1).padStart(2, "0"), member: m, stage: "current", hold: null, last: "", history: [] }; db.dunningCases.push(c); }
          if (c.stage === st.stage) return;
          var from = c.stage; c.stage = st.stage; c.last = fdate(TODAY) + " " + FINLABEL[st.stage] + (st.days ? " (" + st.days + " days)" : ""); c.history.push({ at: now(), from: from, to: st.stage });
          if (["r1", "r2", "final"].indexOf(st.stage) >= 0) notify("DUNNING " + FINLABEL[st.stage].toUpperCase(), payerName(m), m);
          if (Rules.bizRule165(st.stage).escalate && !db.finEscalations.some(function (x) { return x.member === m && x.status !== "closed"; })) { var x = { id: "ESC-" + seq("ESC", 4), member: m, case: c.id, at: now(), status: "open", note: "Overdue " + st.days + " days: a membership action for Membership to decide (BR-165)" }; db.finEscalations.push(x); publish("Membership", "FIN-OPS escalation " + x.id + " for " + m + " (no change to the membership)", m); }
          changes.push(m + " " + FINLABEL[from] + " → " + FINLABEL[st.stage]);
        });
        audit("Dunning evaluated", "FIN-OPS", changes.length + " changes"); save(); return go("fin-dunning.html", changes.length ? changes.join("; ") + " (BR-164, BR-165)" : "No stage changes."); }
      if ((id = t.getAttribute("data-hold"))) { c = db.dunningCases.filter(function (x) { return x.id === id; })[0];
        return ask({ title: "Place " + id + " on hold", body: "Permitted reasons: " + P.holdReasons.join(", ") + ". The hold ends on 30 Nov 2026.", reason: "Hold reason", ok: "Place on hold", run: function (why) { var r0 = P.holdReasons.filter(function (h) { return h.toLowerCase() === String(why).trim().toLowerCase(); })[0]; if (!r0) return { ok: false, msg: "Use a permitted hold reason: " + P.holdReasons.join(", ") + " (BR-164)." };
          c.history.push({ at: now(), from: c.stage, to: "hold" }); c.prevStage = c.stage; c.stage = "hold"; c.hold = { reason: r0, until: "2026-11-30" }; c.last = fdate(TODAY) + " On hold: " + r0; save(); go("fin-dunning.html", id + " on hold until 30 Nov 2026: " + r0); return { ok: true }; } }); }
      if ((id = t.getAttribute("data-hend"))) { c = db.dunningCases.filter(function (x) { return x.id === id; })[0]; c.stage = c.prevStage || "current"; c.hold = null; c.last = fdate(TODAY) + " Hold ended"; save(); return go("fin-dunning.html", id + " hold ended: evaluate dunning to re-check the stage"); }
    });
  };

  pages.finAr = function () {
    finNav();
    var docs = db.arDocs;
    function debtor(id) { return db.debtors.filter(function (d) { return d.id === id; })[0]; }
    rows($("#ar-debtors tbody"), db.debtors.map(function (d) { var bal = Rules.r2(docs.filter(function (x) { return x.debtor === d.id && x.kind === "invoice" && x.status !== "pending"; }).reduce(function (a, x) { return a + x.open; }, 0));
      return "<tr>" + td("Debtor", esc(d.id + " " + d.name)) + td("Category", esc(d.category)) + td("Terms", d.terms + " days", "num") + td("Status", finbadge(d.status), "col-status") + td("Balance", money2(bal), "num") + "</tr>"; }).join(""), 5);
    var dopts = options(db.debtors.map(function (d) { return [d.id, d.id + " " + d.name + (d.status === "inactive" ? " (inactive)" : "")]; }), "GD-01");
    $("#ar-stmt-debtor").innerHTML = dopts;
    if ($("#ar-form")) $("#ar-debtor").innerHTML = dopts;
    if ($("#ar-form")) $("#ar-form").addEventListener("submit", function (e) {
      e.preventDefault(); var f = e.target, ok = Workflow.canFin(role(), "createInvoice", "none"); if (!ok.ok) return showError($("#ar-err"), ok.msg);
      var d = debtor(f.elements.debtor.value), net = +f.elements.net.value, x = Rules.bizRule166(d, f.elements.useCase.value, net); if (!x.ok) return showError($("#ar-err"), x.msg);
      var gross = Rules.r2(net * 1.09), n = fid("INV");
      docs.unshift({ id: n, kind: "invoice", debtor: d.id, desc: f.elements.useCase.options[f.elements.useCase.selectedIndex].text, gross: gross, net: net, gst: Rules.r2(gross - net), issued: null, due: null, open: gross, status: "pending", ref: null, preparedBy: user(), approvedBy: null, reprints: [] }); audit("Invoice prepared", n, money2(gross)); save();
      go("fin-ar.html", n + " prepared for " + d.name + " (" + money2(gross) + "): a second person approves and issues it (BR-166)");
    });
    rows($("#ar-docs tbody"), docs.map(function (x) {
      var act = x.status === "pending" ? '<span class="badge badge-hold">Waiting for a second person</span>' : x.kind === "invoice" && x.open > 0 ? '<div class="cluster">' + fbtn("Credit note", 'data-cn="' + x.id + '"') + fbtn("Debit note", 'data-dn="' + x.id + '"') + fbtn("Reprint", 'data-arp="' + x.id + '"') + "</div>" : fbtn("Reprint", 'data-arp="' + x.id + '"');
      return "<tr>" + td("Document", "<strong>" + esc(x.id) + "</strong>") + td("Kind", esc(FINLABEL[x.kind])) + td("Debtor", esc(x.debtor)) + td("Description", esc(x.desc) + (x.ref ? " · against " + esc(x.ref) : "")) + td("Gross", money2(x.kind === "creditNote" ? -x.gross : x.gross), "num") + td("Open", x.kind === "invoice" ? money2(x.open) : "—", "num") + td("Due", esc(x.due ? fdate(x.due) : "—"), "num") + td("Status", x.status === "pending" ? finbadge("draft") : finbadge(x.status), "col-status") + td("Actions", act, "col-actions") + "</tr>";
    }).join(""), 9);
    rows($("#ar-rec tbody"), db.arRecurring.map(function (r) { return "<tr>" + td("Arrangement", esc(r.id)) + td("Debtor", esc(r.debtor)) + td("Description", esc(r.desc)) + td("Net", money2(r.net) + " + GST", "num") + td("Next billing", esc(fdate(r.next)), "num") + td("Status", finbadge(r.status), "col-status") + "</tr>"; }).join(""), 6);
    function stmt() { var id = $("#ar-stmt-debtor").value, mine = docs.filter(function (x) { return x.debtor === id && x.status !== "pending" && x.status !== "rejected"; }).slice().reverse(), bal = 0;
      rows($("#ar-stmt tbody"), mine.map(function (x) { var v = x.kind === "creditNote" ? -x.gross : x.gross, paid = x.kind === "invoice" ? Rules.r2(x.gross - x.open - (x.credited || 0)) : 0; bal = Rules.r2(bal + v - paid);
        return "<tr>" + td("Date", esc(x.issued ? fdate(x.issued) : "—"), "num") + td("Document", esc(x.id)) + td("Charges / credits", money2(v), "num") + td("Paid", money2(paid), "num") + td("Ageing", x.kind === "invoice" && x.open > 0 && x.due ? esc(Rules.bizRule169(x.due, TODAY)) : "—") + td("Balance", money2(bal), "num") + "</tr>"; }).join(""), 6, "No issued documents.");
      $("#ar-stmt-close").textContent = "Closing balance " + money2(bal) + "; ageing by due date; interest off (BR-169)."; }
    $("#ar-stmt-debtor").addEventListener("change", stmt); stmt();
    $("main").addEventListener("click", function (e) {
      var t = e.target, id, x;
      if ((id = t.getAttribute("data-cn") || t.getAttribute("data-dn"))) { x = docs.filter(function (z) { return z.id === id; })[0]; var cn = !!t.getAttribute("data-cn");
        return ask({ title: (cn ? "Credit note" : "Debit note") + " against " + id, body: "Gross amount at the original GST rate, with the reason. A second person approves it.", reason: "Amount (S$) and reason, e.g. \"545 Fewer golfers\"", ok: "Submit for approval", run: function (txt) {
          var mm = /^\s*([\d.]+)\s+(.+)$/.exec(txt || ""); if (!mm) return { ok: false, msg: "Give the amount, then the reason (BR-167)." };
          var amt = +mm[1], chk = cn ? Rules.bizRule167(x, amt, mm[2]) : amt > 0 ? { ok: true } : { ok: false, msg: "Enter the amount (BR-167)." }; if (!chk.ok) return chk;
          var n = fid(cn ? "CN" : "DN"), net = Rules.r2(amt / 1.09);
          docs.unshift({ id: n, kind: cn ? "creditNote" : "debitNote", debtor: x.debtor, desc: mm[2], gross: amt, net: net, gst: Rules.r2(amt - net), issued: null, due: null, open: 0, status: "pending", ref: x.id, preparedBy: user(), approvedBy: null, reprints: [] }); save();
          go("fin-ar.html", n + " prepared against " + x.id + ": a second person approves it (BR-167)"); return { ok: true }; } }); }
      if ((id = t.getAttribute("data-arp"))) { x = docs.filter(function (z) { return z.id === id; })[0]; Rules.bizRule170(x.id, x.reprints, user(), now()); audit("Document reprinted", x.id, "Same reference (BR-170)"); save(); return go("fin-ar.html", x.id + " reprinted: same reference, no new evidence (BR-170)"); }
      if (t.id === "ar-gen") { var made = [];
        db.arRecurring.forEach(function (r) { if (!Rules.bizRule168(r, TODAY)) return; var gross = Rules.r2(r.net * 1.09), n = fid("INV"); docs.unshift({ id: n, kind: "invoice", debtor: r.debtor, desc: r.desc + " (" + r.id + ", November 2026)", gross: gross, net: r.net, gst: Rules.r2(gross - r.net), issued: null, due: null, open: gross, status: "pending", ref: null, preparedBy: user() + " (" + r.id + ")", approvedBy: null, reprints: [] }); r.next = Rules.addMonths(r.next, 1); made.push(n); });
        save(); return go("fin-ar.html", made.length ? made.join(", ") + " generated with the same controls as a manual invoice (BR-168)" : "No arrangement is due."); }
    });
  };

  pages.finConfig = function () {
    finNav();
    rows($("#cf-maps tbody"), FC.mappings.map(function (x) { return "<tr>" + td("Mapping", esc(x.id)) + td("Event type", '<span class="text-nowrap">' + esc(x.eventType) + "</span>") + td("Tax", esc(x.tax)) + td("Legs", esc(x.legs.map(function (l) { return l.side + " " + l.account + " (" + l.basis + ")"; }).join(" · "))) + td("From", esc(fdate(x.from)), "num") + td("Status", finbadge(x.status), "col-status") + "</tr>"; }).join(""), 6);
    $("#cf-policy").innerHTML = facts([["Posting runs", FC.runSchedule.map(function (s) { return "Run " + s.run + " " + s.time + (s.next ? " (" + s.next + " from " + fdate(s.from) + ")" : ""); }).join(", ")], ["Refund matrix", FC.refundMatrix.map(function (b) { return b.band + ": " + b.approver; }).join("; ")], ["Dunning", FC.dunning.r1 + " / " + FC.dunning.r2 + " / " + FC.dunning.final + " / " + FC.dunning.escalated + " days"], ["GIRO fee", money2(FC.giroFee)], ["Spending credit", FC.creditMonths + " months"], ["Tolerance", money2(FC.tolerance)], ["Interest", FC.interest ? "On" : "Off"], ["GST", FC.gst.map(function (g) { return g.code + " " + g.rate + " %"; }).join(", ")]]);
    if ($("#cf-map-form")) $("#cf-type").innerHTML = options(FC.mappings.map(function (m) { return [m.eventType, m.eventType]; }), "GMS-CHARGE");
    rows($("#cf-changes tbody"), db.finConfigChanges.map(function (c) { return "<tr>" + td("Change", esc(c.id)) + td("What", esc(c.target)) + td("From → to", esc(c.from + " → " + c.to + ", from " + fdate(c.effective))) + td("Saved by", esc(c.savedBy)) + td("Status", finbadge(c.status === "draft" ? "pending" : c.status), "col-status") + "</tr>"; }).join(""), 5, "No changes.");
    if ($("#cf-run-form")) $("#cf-run-form").addEventListener("submit", function (e) {
      e.preventDefault(); var f = e.target, ok = Workflow.canFin(role(), "saveFinDraft", "none"); if (!ok.ok) return showError($("#cf-err"), ok.msg);
      var run = +f.elements.run.value, s = FC.runSchedule.filter(function (x) { return x.run === run; })[0], to = f.elements.time.value;
      if (!/^\d{2}:\d{2}$/.test(to) || to === s.time) return showError($("#cf-err"), "Enter a new time for run " + run + ".");
      db.finConfigChanges.unshift({ id: "FCC-" + seq("FCC", 2), kind: "run", target: "Posting run " + run, run: run, from: s.time, to: to, effective: "2026-11-01", status: "draft", savedBy: user(), savedAt: now() }); audit("Finance configuration Draft", "Posting run " + run, s.time + " → " + to); save();
      go("fin-config.html", "Posting run " + run + " " + s.time + " → " + to + " saved as Draft; the current time applies until a second person approves (BR-139)");
    });
    if ($("#cf-map-form")) $("#cf-map-form").addEventListener("submit", function (e) {
      e.preventDefault(); var f = e.target, ok = Workflow.canFin(role(), "saveFinDraft", "none"); if (!ok.ok) return showError($("#cf-err2"), ok.msg);
      var ch = { kind: "mapping", value: { eventType: f.elements.type.value, from: f.elements.from.value || TODAY } }, x = Rules.bizRule139(ch, FC.mappings); if (!x.ok) return showError($("#cf-err2"), x.msg);
      db.finConfigChanges.unshift({ id: "FCC-" + seq("FCC", 2), kind: "mapping", target: "Mapping " + ch.value.eventType, from: "—", to: "new version", effective: ch.value.from, status: "draft", savedBy: user(), savedAt: now() }); save(); go("fin-config.html", "Mapping saved as Draft (BR-139)");
    });
  };

  pages.finApprovals = function () {
    finNav();
    var me = user(), checker = role() === "finapprover";
    function acts(kind, id, maker) { return !checker ? '<span class="badge badge-hold">Waiting for a second person</span>' : maker === me ? '<span class="text-muted">You prepared this: a second person approves it</span>' : '<div class="cluster"><button type="button" class="btn btn-sm btn-primary" data-ap="' + kind + '" data-id="' + id + '">Approve</button><button type="button" class="btn btn-sm btn-outline-danger" data-rj="' + kind + '" data-id="' + id + '">Reject</button></div>'; }
    var rf = db.finRefunds.filter(function (f) { return f.status === "prepared"; }), ad = db.finAdjustments.filter(function (a) { return a.status === "prepared"; }), cf = db.finConfigChanges.filter(function (c) { return c.status === "draft"; }), ar = db.arDocs.filter(function (d) { return d.status === "pending"; });
    [["rf", rf.length], ["ad", ad.length], ["cf", cf.length], ["ar", ar.length]].forEach(function (k) { $("#ap-" + k[0] + "-n").textContent = k[1]; });
    rows($("#ap-rf tbody"), rf.map(function (f) { var band = Rules.bizRule150(f.amount, FC.refundMatrix); return "<tr>" + td("Item", esc(f.id + " " + f.kind)) + td("Maker", esc(f.preparedBy)) + td("Amount", money2(f.amount) + " · " + esc(f.parts.map(function (p) { return p.source; }).join(", ")), "num") + td("Band", esc(band.band + ": " + band.approver)) + td("Actions", acts("rf", f.id, f.preparedBy), "col-actions") + "</tr>"; }).join(""), 5, "No refunds wait for approval.");
    rows($("#ap-ad tbody"), ad.map(function (a) { return "<tr>" + td("Item", esc(a.id + " on " + a.event)) + td("Maker", esc(a.preparedBy)) + td("Amount", money2(a.amount), "num") + td("Reason", esc(a.reason)) + td("Actions", acts("ad", a.id, a.preparedBy), "col-actions") + "</tr>"; }).join(""), 5, "No adjustments wait for approval.");
    rows($("#ap-cf tbody"), cf.map(function (c) { return "<tr>" + td("Item", esc(c.id + " " + c.target)) + td("Maker", esc(c.savedBy)) + td("Change", esc(c.from + " → " + c.to + ", from " + fdate(c.effective))) + td("Saved", esc(fdate(c.savedAt)), "num") + td("Actions", acts("cf", c.id, c.savedBy), "col-actions") + "</tr>"; }).join(""), 5, "No configuration changes wait for approval.");
    rows($("#ap-ar tbody"), ar.map(function (d) { return "<tr>" + td("Item", esc(d.id + " " + FINLABEL[d.kind] + (d.ref ? " against " + d.ref : ""))) + td("Maker", esc(d.preparedBy)) + td("Amount", money2(d.gross), "num") + td("Debtor", esc(d.debtor + " " + payerName(d.debtor))) + td("Actions", acts("ar", d.id, d.preparedBy), "col-actions") + "</tr>"; }).join(""), 5, "No documents wait for approval.");
    finTab(location.hash);
    $("main").addEventListener("click", function (e) {
      var t = e.target, kind = t.getAttribute("data-ap") || t.getAttribute("data-rj"), id = t.getAttribute("data-id"), ok = !!t.getAttribute("data-ap"); if (!kind) return;
      var x = (kind === "rf" ? db.finRefunds : kind === "ad" ? db.finAdjustments : kind === "cf" ? db.finConfigChanges : db.arDocs).filter(function (y) { return y.id === id; })[0];
      var chk = Rules.makerChecker(x.preparedBy || x.savedBy, me, role(), { rf: "BR-150", ad: "BR-157", cf: "BR-139", ar: x.kind === "invoice" ? "BR-166" : "BR-167" }[kind]); if (!chk.ok) return toast(chk.msg, "danger");
      return ask({ title: (ok ? "Approve " : "Reject ") + id + "?", body: ok ? "Approve as the second person." : "A rejection keeps everything as it was.", reason: ok ? null : "Reason (required)", ok: ok ? "Approve" : "Reject", danger: !ok, run: function (why) {
        if (!ok && !why) return { ok: false, msg: "A reason is needed (BR-176)." };
        var msg = id + (ok ? " approved" : " rejected") + " by " + me;
        if (kind === "rf") { x.status = ok ? "approved" : "rejected"; x.approvedBy = me; if (ok) msg += "; the Finance Officer releases it (BR-150)"; }
        if (kind === "ad") { x.status = ok ? "approved" : "rejected"; x.approvedBy = me; if (ok) { x.period = openPeriod().name; msg += ": posted in " + x.period + " as its own movement linked to " + x.event + " (BR-157)"; } }
        if (kind === "cf") { x.status = ok ? "approved" : "rejected"; x.decidedBy = me; if (ok && x.kind === "run") { var s = FC.runSchedule.filter(function (r) { return r.run === x.run; })[0]; s.next = x.to; s.from = x.effective; msg += ": " + x.to + " applies from " + fdate(x.effective) + " (BR-139)"; } }
        if (kind === "ar") { x.approvedBy = me;
          if (!ok) x.status = "rejected";
          else if (x.kind === "invoice") { var dbt = db.debtors.filter(function (d) { return d.id === x.debtor; })[0]; x.status = "issued"; x.issued = TODAY; x.due = Rules.addDays(TODAY, dbt.terms); var fe = finOps("FIN", x.id, "AR-INVOICE", x.debtor, x.gross, { note: x.desc }); msg += ": issued (" + fe.id + "); it can no longer be edited (BR-166)"; }
          else { var inv = db.arDocs.filter(function (z) { return z.id === x.ref; })[0]; x.status = "issued"; x.issued = TODAY; if (x.kind === "creditNote") { inv.open = Rules.r2(inv.open - x.gross); inv.credited = Rules.r2((inv.credited || 0) + x.gross); } else { inv.open = Rules.r2(inv.open + x.gross); } msg += ": linked to " + inv.id + " at the original GST rate (BR-167)"; } }
        audit("Finance approval", id, ok ? "Approved" : "Rejected: " + why); save(); go("fin-approvals.html#ap-t-" + kind, msg); return { ok: true };
      } });
    });
  };

  // (v07) Finance reports (FIN-OPS-RR-…) for the Report Catalogue: one builder per report, on live FIN-OPS data
  Object.assign(BUILD, {
    "FIN-OPS-RR-002": function () { return { cols: [["Profile"], ["Expected", "num"], ["Actual", "num"], ["Status"]], rows: db.reconProfiles.map(function (p) { return [p.name, money2(p.expected), money2(p.actual), p.result ? (p.result.ok ? "Complete" : "Incomplete") : "Last " + fdate(p.last.date) + ": " + p.last.status]; }), kpis: [["Profiles", db.reconProfiles.length, "Reconciliations"], ["Open exceptions", openEx().length, "Blocking"]] }; },
    "FIN-OPS-RR-005": function () { return { cols: [["Line"], ["Member"], ["Month", "num"], ["Amount", "num"], ["Result"], ["Reason"]], rows: db.giroCollections.map(function (c) { return [c.id, c.member, c.month, money2(c.amount), FINLABEL[c.status], c.reason || "—"]; }), kpis: [["Lines", db.giroCollections.length, "GIRO"], ["Rejected", db.giroCollections.filter(function (c) { return c.status === "rejected"; }).length, "Kept, not retried"]] }; },
    "FIN-OPS-RR-006": function () { return { cols: [["Refund"], ["From"], ["Payee"], ["Amount", "num"], ["Parts"], ["Status"], ["Prepared / approved"]], rows: db.finRefunds.map(function (f) { return [f.id, MODNAME[f.module] + " " + f.sourceRef, f.payee, money2(f.amount), f.parts.map(function (p) { return p.source + " " + money2(p.amount); }).join(" + "), FINLABEL[f.status], (f.preparedBy || "—") + " / " + (f.approvedBy || "—")]; }), kpis: [["Refunds", db.finRefunds.length, "All statuses"], ["Released", db.finRefunds.filter(function (f) { return f.status === "released"; }).length, "Money returned"]] }; },
    "FIN-OPS-RR-007": function () { return { cols: [["Deferred"], ["Source"], ["Basis"], ["Total", "num"], ["Recognised", "num"], ["Remaining", "num"]], rows: db.deferredRevenue.map(function (d) { return [d.id, MODNAME[d.source] + " " + d.ref, d.basis, money2(d.total), money2(d.recognised), money2(Rules.r2(d.total - d.recognised))]; }), kpis: [["Deferred", money2(db.deferredRevenue.reduce(function (a, d) { return a + d.total - d.recognised; }, 0)), "Not yet earned"]] }; },
    "FIN-OPS-RR-008": function () { return { cols: [["Member"], ["Fee", "num"], ["Months", "num"], ["Posted", "num"], ["Status"]], rows: db.efSchedules.map(function (s) { return [s.member, money2(s.fee), s.months, s.posted, FINLABEL[s.status]]; }), kpis: [["Schedules", db.efSchedules.length, "Entrance fees"], ["Variance", money2(db.efRecon.variance), FINLABEL[db.efRecon.status]]] }; },
    "FIN-OPS-RR-011": function () { return { cols: [["Batch"], ["Date", "num"], ["Run"], ["Lines", "num"], ["Status"]], rows: db.postingBatches.map(function (b) { return [b.id, fdate(b.date), b.label || "Run " + b.run + " " + b.time, b.events.length, FINLABEL[b.status]]; }), kpis: [["Batches", db.postingBatches.length, "Yonyou"], ["Partial or failed", db.postingBatches.filter(function (b) { return b.status === "partial" || b.status === "failed"; }).length, "Need follow-up"]] }; },
    "FIN-OPS-RR-012": function () { return { cols: [["Exception"], ["Category"], ["Owner"], ["Reference"], ["Status"], ["Reason"]], rows: db.finExceptions.map(function (x) { return [x.id, x.category, x.owner, x.ref, FINLABEL[x.status], x.reason]; }), kpis: [["Open", openEx().length, "Blocking"], ["Closed", db.finExceptions.length - openEx().length, "With history"]] }; },
    "FIN-OPS-RR-013": function () { return { cols: [["Member"], ["Overdue", "num"], ["Age (days)", "num"], ["Stage"]], rows: db.dunningCases.map(function (c) { return [c.member, money2(overdue(c.member)), Rules.bizRule164(db.receivables.filter(function (r) { return r.member === c.member; }), TODAY, FC.dunning).days, FINLABEL[c.stage]]; }), kpis: [["Overdue", money2(overdue()), "Members"], ["Escalated", db.dunningCases.filter(function (c) { return c.stage === "escalated"; }).length, "To Membership"]] }; },
    "FIN-OPS-RR-015": function () { return { cols: [["Document"], ["Debtor"], ["Open", "num"], ["Due", "num"], ["Ageing"]], rows: db.arDocs.filter(function (x) { return x.kind === "invoice" && x.open > 0 && x.due; }).map(function (x) { return [x.id, x.debtor, money2(x.open), fdate(x.due), Rules.bizRule169(x.due, TODAY)]; }), kpis: [["Open General AR", money2(db.arDocs.filter(function (x) { return x.kind === "invoice" && x.status !== "pending"; }).reduce(function (a, x) { return a + x.open; }, 0)), "By due date, no interest"]] }; },
    "FIN-OPS-RR-017": function () { return { cols: [["Session"], ["Location"], ["Expected", "num"], ["Counted", "num"], ["Status"]], rows: db.cashierSessions.map(function (s) { var ls = Rules.bizRule156(s.expected, s.counted); return [s.id, s.location, money2(ls.reduce(function (a, l) { return a + l.expected; }, 0)), money2(ls.reduce(function (a, l) { return a + l.counted; }, 0)), FINLABEL[s.status]]; }), kpis: [["Sessions", db.cashierSessions.length, "Cashier close"]] }; }
  });

  var page = location.pathname.split("/").pop() || "index.html";
  if (role() === "member" && TAB[2] && mem(TAB[2])) { ROLES.member.membershipId = TAB[2]; ROLES.member.name = person(mem(TAB[2]).personId).fullName; }
  if (role() === "member" && TAB[2] && nonMember(TAB[2])) { ROLES.member.membershipId = null; ROLES.member.name = nonMember(TAB[2]).name; }  // (v04)
  if (shell(page) && pages[document.body.getAttribute("data-page")]) {
    pages[document.body.getAttribute("data-page")]();
    // the first visible collapsible section starts open, the rest closed (v09 launcher)
    var first = $$("section.page-acc").filter(function (x) { return !x.hidden && !x.closest("[hidden]"); })[0];
    if (first) { first.querySelector(".accordion-collapse").classList.add("show"); var b = first.querySelector(".accordion-button"); b.classList.remove("collapsed"); b.setAttribute("aria-expanded", "true"); }
    plainLinks($("main"));
  }
  return { db: db };
})();
