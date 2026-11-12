/* rules.js: one function per business rule built in v01 – v07 (prd/business-rules.md: BR-001 … BR-170, BR-084, BR-085, BR-171 … BR-177; BR-178 retired in v07).
   Each check returns { ok, msg }; pages call these and never inline the logic. Asserted in js/checks.js.
   Build: full-build-v08 · Version: v08 · KO: KO-037 · from v07 */
var Rules = (function () {
  var OK = { ok: true, msg: "" };
  function fail(msg) { return { ok: false, msg: msg }; }
  var OPEN = ["draft", "pendingDocuments", "pendingApproval", "awaitingPayment"];

  // Dates are ISO "YYYY-MM-DD" strings, handled in UTC so no time zone shifts a day
  function d(iso) { var p = iso.split("-"); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])); }
  function iso(dt) { return dt.toISOString().slice(0, 10); }
  function addMonths(isoDate, n) {
    var t = d(isoDate), day = t.getUTCDate();
    t.setUTCDate(1); t.setUTCMonth(t.getUTCMonth() + n);
    var last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
    t.setUTCDate(Math.min(day, last));
    return iso(t);
  }
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fdateR(isoDate) { var p = isoDate.split("-"); return +p[2] + " " + MON[+p[1] - 1] + " " + p[0]; }  // D MMM YYYY in messages
  function addDays(isoDate, n) { var t = d(isoDate); t.setUTCDate(t.getUTCDate() + n); return iso(t); }
  function monthsBetween(from, to) {
    var a = d(from), b = d(to);
    var m = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + b.getUTCMonth() - a.getUTCMonth();
    return b.getUTCDate() < a.getUTCDate() ? m - 1 : m;
  }
  function mins(t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; }
  function hhmm(m) { return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); }
  function age(dob, today) { return Math.floor(monthsBetween(dob, today) / 12); }
  function eligible(person, type, today, sponsorName) {
    if (type.category === "corporate" && !sponsorName) return fail("Corporate membership needs a Singapore-registered company as sponsor (BR-003).");
    var a = age(person.dateOfBirth, today);
    if (type.minAge && a < type.minAge) return fail(person.fullName + " is " + a + "; " + type.name + " needs age " + type.minAge + " or over (BR-003).");
    if (type.maxAge && a > type.maxAge) return fail(person.fullName + " is " + a + "; " + type.name + " is for ages " + type.minAge + " – " + type.maxAge + " (BR-003).");
    return OK;
  }

  return {
    addMonths: addMonths, addDays: addDays, monthsBetween: monthsBetween, age: age, OPEN: OPEN,

    // BR-001: unique Membership ID = 2 initials (surname, given name; or the sponsor's first two words) + 5-digit sequence
    bizRule001: function (person, sponsorName, seq) {
      var initials;
      if (sponsorName) initials = sponsorName.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join("");
      else { var w = person.fullName.replace(/\./g, "").split(/\s+/); initials = w[w.length - 1][0] + w[w.length - 2][0]; }
      return initials.toUpperCase() + String(seq).padStart(5, "0");
    },

    // BR-002: no second open application for the same Person and membership type
    bizRule002: function (requests, personId, typeCode, exceptId) {
      var dup = requests.filter(function (r) { return r.id !== exceptId && r.type === "application" && r.personId === personId && r.details.typeCode === typeCode && OPEN.indexOf(r.status) >= 0; })[0];
      return dup ? fail("An open application " + dup.id + " already exists for this person and membership type (BR-002).") : OK;
    },

    // BR-003: eligibility of the type (age range; corporate needs a Singapore-registered sponsor)
    bizRule003: eligible,

    // BR-004: every mandatory document received before approval routing
    bizRule004: function (documents) {
      var missing = documents.filter(function (x) { return !x.received; }).map(function (x) { return x.name; });
      return missing.length ? fail("Missing mandatory documents: " + missing.join(", ") + " (BR-004).") : OK;
    },

    // BR-005: only the routed role decides (the Manager may also take Approver work), never the person who created the request
    bizRule005: function (request, role, userName) {
      var allowed = request.route === "manager" ? ["manager"] : ["approver", "manager"];
      if (allowed.indexOf(role) < 0) return fail("Only the " + (request.route === "manager" ? "Membership Manager" : "Approver or Manager") + " can decide this request (BR-005).");
      if (request.createdByName === userName) return fail("You submitted this request: the submitter cannot decide it (BR-005).");
      return OK;
    },

    // BR-006: a request with a fee completes only after the payment is confirmed
    bizRule006: function (handoff) {
      return !handoff || handoff.status === "confirmed" ? OK : fail("Waiting for payment confirmation; the change is not applied (BR-006).");
    },

    // BR-007: recruitment source required; a referral needs an active referring member
    bizRule007: function (source, referrerId, memberships) {
      if (!source) return fail("Recruitment source is required (BR-007).");
      if (source !== "Referral") return OK;
      var ref = memberships.filter(function (m) { return m.membershipId === (referrerId || "").trim().toUpperCase(); })[0];
      return ref && ref.status === "active" ? OK : fail("A referral needs the Membership ID of an active referring member (BR-007).");
    },

    // BR-008: combined Associate + Ordinary duration at most 30 years, approved absent months excluded
    bizRule008: function (membership, type, newExpiry, maxYears) {
      if (!type.countsTowardCap) return OK;
      var absent = membership.absentPeriods.reduce(function (s, p) { return s + (p.months || monthsBetween(p.from, addDays(p.to, 1))); }, 0);
      var months = monthsBetween(membership.joinedDate, newExpiry) - absent;
      return months <= maxYears * 12 ? OK : fail("The new expiry gives " + (months / 12).toFixed(1) + " combined years, over the " + maxYears + "-year limit (BR-008).");
    },

    // BR-009: renewal only on the member's request, from Active, Absent or Medical
    bizRule009: function (membership, memberRequested) {
      if (!memberRequested) return fail("A renewal is processed only on the member's request (BR-009).");
      return ["active", "absent", "medical"].indexOf(membership.status) >= 0 ? OK : fail("This membership is " + membership.status + ": it cannot be renewed; use Rejoin (BR-009).");
    },

    // BR-010: Full → Basic doubles the remaining months; Basic → Full halves them, rounded down
    bizRule010: function (remaining, fromPlan, toPlan) {
      if (fromPlan === "full" && toPlan === "basic") return remaining * 2;
      if (fromPlan === "basic" && toPlan === "full") return Math.floor(remaining / 2);
      return null;
    },

    // BR-011: transferable type and an eligible recipient
    bizRule011: function (type, recipient, today) {
      if (!type.transferable) return fail(type.name + " is not transferable (BR-011).");
      if (!recipient) return fail("Choose the recipient (BR-011).");
      var e = eligible(recipient, type, today);
      return e.ok ? OK : fail("Recipient not eligible: " + e.msg.replace(" (BR-003).", "") + " (BR-011).");
    },

    // BR-012: extension at most 24 months; over 12 months goes to the Manager
    bizRule012: function (months, limits) {
      if (!(months > 0)) return fail("Enter the extension in months (BR-012).");
      if (months > limits.extensionMaxMonths) return fail("Extensions are limited to " + limits.extensionMaxMonths + " months (BR-012).");
      return { ok: true, msg: "", route: months > limits.extensionApproverMaxMonths ? "manager" : "approver" };
    },

    // BR-013: a voluntary withdrawal comes from the member; it completes only after the balance is cleared; no refund of the remaining term
    bizRule013: function (memberRequested) {
      return memberRequested ? { ok: true, msg: "", refund: 0 } : fail("A voluntary withdrawal must be initiated by the member (BR-013).");
    },

    // BR-014: expiry passed with no renewal → Expired; rejoin only from Expired or Withdrawn (original ID kept)
    bizRule014Expired: function (membership, today) { return membership.status === "active" && membership.expiryDate < today; },
    bizRule014Rejoin: function (membership) {
      return ["expired", "withdrawn"].indexOf(membership.status) >= 0 ? OK : fail("Only an Expired or Withdrawn membership can rejoin (BR-014).");
    },

    // BR-015: a goodwill refund on a deceased case is decided by the Manager
    bizRule015: function (refund) { return refund > 0 ? "manager" : "approver"; },

    // BR-016: absent period 3 – 24 months, no overlap with an approved absent period
    bizRule016: function (membership, from, to, limits) {
      if (!from || !to || to < from) return fail("Enter a valid absent period (BR-016).");
      var months = monthsBetween(from, addDays(to, 1));
      if (months < limits.absentMinMonths || months > limits.absentMaxMonths) return fail("An absent period must be " + limits.absentMinMonths + " – " + limits.absentMaxMonths + " months; this one is " + months + " (BR-016).");
      var clash = membership.absentPeriods.filter(function (p) { return from <= p.to && to >= p.from; })[0];
      return clash ? fail("Overlaps the approved absent period " + clash.from + " to " + clash.to + " (BR-016).") : { ok: true, msg: "", months: months };
    },

    // BR-017: medical period at most 12 months; the expiry date does not change
    bizRule017: function (from, to, limits) {
      if (!from || !to || to < from) return fail("Enter a valid medical period (BR-017).");
      var months = monthsBetween(from, addDays(to, 1));
      return months > limits.medicalMaxMonths ? fail("A medical period is limited to " + limits.medicalMaxMonths + " months; this one is " + months + " (BR-017).") : { ok: true, msg: "", months: months };
    },
    // BR-016 / BR-017: an absent or medical period whose end date has passed returns the membership to Active (lifecycle check)
    periodEnded: function (membership, today) {
      var list = membership.status === "absent" ? membership.absentPeriods : membership.status === "medical" ? membership.medicalPeriods : [];
      var last = list[list.length - 1];
      return !!last && last.to < today;
    },

    // BR-018: one current status, changed only along the approved transition matrix
    bizRule018: function (from, to, transitions) {
      var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
      return (transitions[from] || []).indexOf(to) >= 0 ? OK : fail("Status change " + cap(from) + " → " + cap(to) + " is not in the approved transition matrix (BR-018).");
    },

    // BR-019: privileges and billing follow the status
    bizRule019: function (status, privileges) { return privileges[status] || { privileges: false, billing: false }; },

    // BR-020: supplementary needs an active principal; it ends when the principal is no longer active
    bizRule020: function (principal) {
      return principal && principal.status === "active" ? OK : fail("The principal membership must be Active (BR-020).");
    },

    // BR-021: junior eligibility ends at the age limit; nothing converts automatically; watch list within 6 months
    bizRule021: function (person, today, limit) { return age(person.dateOfBirth, today) >= limit; },
    bizRule021Watch: function (person, today, limit, watchMonths) {
      var turns = addMonths(person.dateOfBirth, limit * 12);
      return turns > today && turns <= addMonths(today, watchMonths) ? turns : null;
    },

    // BR-022: active nominees within the type's limit; new corporate memberships only by the Administrator
    bizRule022: function (membership, type) {
      var active = membership.nominees.filter(function (n) { return !n.to; }).length;
      return active < type.nomineeLimit ? OK : fail(type.name + " allows " + type.nomineeLimit + " active nominee" + (type.nomineeLimit > 1 ? "s" : "") + "; " + active + " already active (BR-022).");
    },
    bizRule022Corporate: function (role) { return role === "admin" ? OK : fail("Only the Administrator can create a corporate membership (BR-022)."); },

    // BR-023: available credit = In-House Credit Limit − outstanding balance; derived, never stored; blocked when balances are unavailable
    bizRule023: function (contract, financeStub, membershipId) {
      if (!financeStub.available) return fail("Finance balance is unavailable: the credit check cannot be completed (BR-023).");
      var out = financeStub.outstanding[membershipId] || 0;
      return { ok: true, msg: "", outstanding: out, available: contract.creditLimit - out };
    },

    // BR-024: vehicles only for Active memberships, at most the configured limit
    bizRule024: function (membership, vehicles, limit) {
      if (membership.status !== "active") return fail("Vehicles can be registered only for an Active membership (BR-024).");
      var n = vehicles.filter(function (v) { return v.membershipId === membership.membershipId && v.status === "active"; }).length;
      return n < limit ? OK : fail(n + " vehicles already registered; the limit is " + limit + ". Retire one first (BR-024).");
    },

    // BR-025: cards only for Active memberships; a replacement voids the previous card
    bizRule025: function (membership) { return membership.status === "active" ? OK : fail("Cards are issued only for an Active membership (BR-025)."); },

    // BR-026: marketing goes only to persons who gave marketing consent; service messages are not affected
    bizRule026: function (persons, kind) {
      return { send: persons.filter(function (p) { return kind !== "marketing" || p.marketingConsent; }), excluded: kind === "marketing" ? persons.filter(function (p) { return !p.marketingConsent; }) : [] };
    },

    // BR-027: mandatory member information stays complete
    bizRule027: function (p) {
      var missing = [["fullName", "Name"], ["idNumber", "ID number"], ["dateOfBirth", "Date of birth"], ["mobile", "Mobile"], ["email", "Email"], ["address", "Address"]]
        .filter(function (f) { return !String(p[f[0]] || "").trim(); }).map(function (f) { return f[1]; });
      return missing.length ? fail(missing.join(", ") + (missing.length > 1 ? " are" : " is") + " required (BR-027).") : OK;
    },

    // BR-028: referenced master data is inactivated, never deleted
    bizRule028: function (code, memberships, requests) {
      var used = memberships.some(function (m) { return m.typeCode === code; }) || requests.some(function (r) { return r.details.typeCode === code || r.details.targetTypeCode === code; });
      return used ? fail(code + " is referenced by membership records: inactivate it instead (BR-028).") : OK;
    },

    // BR-029: fee from the fee configuration, read only at approval
    bizRule029: function (request, config, membership) {
      var t = function (c) { return config.membershipTypes.filter(function (x) { return x.code === c; })[0]; };
      var f = config.fees, x = request.details;
      switch (request.type) {
        case "application": case "corporateCreation": return t(x.typeCode).entranceFee;
        case "renewal": return f.renewal[x.years] || 0;
        case "conversion": return f.conversion;
        case "transfer": return f.transfer;
        case "extension": return x.months * f.extensionPerMonth;
        case "rejoin": return f.rejoin;
        case "supplementary": return t("SUP").entranceFee;
        case "nomineeChange": return t(membership.typeCode).nomineeLimit > 1 ? f.nomination : 0;
        case "deceased": return x.refund || 0;
        default: return 0;
      }
    },

    // BR-030: referral reward only under an active campaign
    bizRule030: function (campaigns, today) {
      return campaigns.filter(function (c) { return c.active && c.from <= today && c.to >= today; })[0] || null;
    },

    // BR-031 (v02): a role runs only the reports its access rule lists; a planned report runs for no one; the audit reports are for the Manager and Administrator only.
    // granting = true checks a grant in Report access (the access rule itself is being changed)
    bizRule031: function (accessRules, role, report, granting) {
      if (!report) return fail("Unknown report (BR-031).");
      if (report.plannedIn) return fail(report.id + " comes with its module in " + report.plannedIn + " (BR-031).");
      if (report.audit && role !== "manager" && role !== "admin") return fail("The audit review is for the Manager and Administrator only (BR-031).");
      if (granting) return OK;
      var a = accessRules[role];
      return a && a.reports.indexOf(report.id) >= 0 ? OK : fail("Your role cannot run " + report.id + " (BR-031).");
    },

    // BR-032 (v02): every required parameter is given and valid before a run
    bizRule032: function (params, values) {
      for (var i = 0; i < params.length; i++) {
        var p = params[i], v = String(values[p.key] == null ? "" : values[p.key]).trim();
        if (p.required && !v) return fail(p.label + " is required (BR-032).");
        if (v && p.type === "number" && !(/^\d+$/.test(v) && +v > 0)) return fail(p.label + " must be a whole number above 0 (BR-032).");
        if (v && p.type === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return fail(p.label + " must be a date (BR-032).");
      }
      if (values.from && values.to && values.to < values.from) return fail("To must be on or after From (BR-032).");
      return OK;
    },

    // BR-033 (v02): a run that matches nothing is a valid empty result, never an error (and a run never changes a source record)
    bizRule033: function (rows) { return { ok: true, empty: !rows.length, msg: rows.length ? "" : "No records match (BR-033)." }; },

    // BR-034 (v02): only a report designated for export is exported, with the rows shown on screen
    bizRule034: function (report) { return report.exportable ? OK : fail(report.name + " is not designated for export (BR-034)."); },

    // BR-035 (v02): a definition builds on a runnable approved report, has a name, an effective date and roles no wider than the base report's access
    bizRule035: function (def, reports, accessRules, labels) {
      var base = reports.filter(function (r) { return r.id === def.base; })[0];
      if (!base || base.plannedIn) return fail("A definition builds on a runnable approved report (BR-035).");
      if (!String(def.name || "").trim()) return fail("A name is required (BR-035).");
      if (!def.effectiveFrom) return fail("An effective date is required (BR-035).");
      if (!def.roles.length) return fail("Choose at least one role (BR-035).");
      var wider = def.roles.filter(function (r) { return !accessRules[r] || accessRules[r].reports.indexOf(base.id) < 0; });
      return wider.length ? fail("The " + wider.map(function (r) { return labels[r] || r; }).join(" and ") + " cannot run " + base.id + " (BR-035).") : OK;
    },

    // BR-084: a page renders only for the roles it lists (an empty list is open to all: the launcher); a tab without a role sees nothing
    /* ---------- (v03) Golf: BR-036 … BR-060 (GMS), ported from the rapid v09 golf rules, the golfer always read from Membership ---------- */
    dayType: function (date, holidays) { return d(date).getUTCDay() % 6 === 0 || (holidays || []).indexOf(date) >= 0 ? "Weekend" : "Weekday"; },

    // BR-036: tee times per course, day and session from the configuration; weekday 9-hole mornings only 07:01 – 07:57, none on weekend mornings
    bizRule036: function (G) {
      var out = [];
      G.sessions.forEach(function (s) { for (var m = mins(s.from); m <= mins(s.to); m += G.intervalMinutes) out.push({ time: hhmm(m), session: s.code }); });
      return out;
    },
    bizRule036Holes: function (holes, dayType, time, G) {
      if (+holes !== 9 || time >= "12:00") return OK;
      if (dayType === "Weekend") return fail("9-hole play is not allowed on weekend or public-holiday mornings (BR-036).");
      return time >= G.nineHoleWeekdayAM[0] && time <= G.nineHoleWeekdayAM[1] ? OK : fail("Weekday morning 9-hole play is only from " + G.nineHoleWeekdayAM[0] + " to " + G.nineHoleWeekdayAM[1] + " (BR-036).");
    },

    // BR-037: booking window by channel; online booking closes 2 hours before tee-off
    bizRule037: function (date, time, channel, today, clock, G) {
      var days = Math.round((d(date) - d(today)) / 864e5), left = days * 1440 + mins(time) - mins(clock);
      if (left <= 0) return fail("That tee time has already passed (BR-037).");
      if (channel === "Portal") {
        if (days > G.onlineWindowDays) return fail("Members can book online up to " + G.onlineWindowDays + " days ahead (BR-037).");
        if (left < G.onlineCutoffHours * 60) return fail("Online booking closes " + G.onlineCutoffHours + " hours before tee-off; ask the golf counter (BR-037).");
      } else if (days > G.staffWindowDays) return fail("Staff can book up to " + G.staffWindowDays + " days ahead (BR-037).");
      return OK;
    },

    // BR-038: one session per golfer per day; an active waitlist entry counts too
    bizRule038: function (golfers, date, bookings, waitlist, skipId) {
      var busy = golfers.filter(function (g) {
        return g.personId && (bookings.some(function (b) { return b.id !== skipId && b.date === date && b.status !== "cancelled" && b.status !== "noShow" && b.players.some(function (x) { return x.personId === g.personId; }); }) ||
          waitlist.some(function (w) { return w.id !== skipId && w.date === date && (w.status === "waiting" || w.status === "offered") && w.players.indexOf(g.personId) >= 0; }));
      });
      return busy.length ? fail(busy.map(function (g) { return g.name; }).join(", ") + " already holds a session that day; a second round needs Golf Manager approval (BR-038).") : OK;
    },

    // BR-039: 2 – 4 golfers on weekdays, 3 – 4 on weekends and public holidays
    bizRule039: function (n, dayType, G) {
      if (n > G.maxPlayers) return fail("A flight has at most " + G.maxPlayers + " golfers (BR-039).");
      return n < G.minPlayers[dayType] ? fail("A " + dayType.toLowerCase() + " flight needs at least " + G.minPlayers[dayType] + " golfers; join an existing flight instead (BR-039).") : OK;
    },

    // BR-040: member privileges need an Active membership (status from MMS)
    bizRule040: function (m, name, privileges) { return m && (privileges ? (privileges[m.status] || {}).privileges : m.status === "active") ? OK : fail(name + " cannot use golf privileges: membership is " + (m ? m.status : "unknown") + " (BR-040)."); },

    // BR-041: a Basic Member plays weekends only in a flight whose main booker is a Full Member
    bizRule041: function (players, dayType) {
      if (dayType !== "Weekend" || !players.some(function (x) { return x.category === "Basic member"; })) return OK;
      return players[0].category === "Full member" ? OK : fail("A Basic Member plays on weekends only in a flight booked by a Full Member (BR-041).");
    },

    // BR-042: at most 3 guests, introducer 18 or over in the same flight, guests hold a handicap, no guests at Changi on Saturday afternoon
    bizRule042: function (guests, introducerAge, course, date, time, G) {
      if (!guests.length) return OK;
      if (guests.length > G.guestLimit) return fail("A member may introduce at most " + G.guestLimit + " guests (BR-042).");
      if (introducerAge < G.introducerMinAge) return fail("A member introducing guests must be at least " + G.introducerMinAge + " (BR-042).");
      var noHi = guests.filter(function (g) { return g.hi == null; });
      if (noHi.length) return fail(noHi.map(function (g) { return g.name; }).join(", ") + " has no recognised handicap (BR-042).");
      return course === "Changi" && d(date).getUTCDay() === 6 && time >= "12:00" ? fail("Guests do not play at Changi on Saturday afternoons without Golf Manager approval (BR-042).") : OK;
    },

    // BR-043: handicap or CC-Demo PC eligibility by gender, day type and time
    bizRule043: function (g, name, date, dayType, time, G) {
      var pc = g && g.pc && g.pc.issuer === "CC-Demo" && g.pc.expiry >= date;
      if (!g || (g.hi == null && !pc)) return fail(name + " has no recognised handicap or current CC-Demo Proficiency Certificate (BR-043).");
      if (dayType === "Weekday") return OK;
      var lim = G.handicap[g.gender === "F" ? "female" : "male"];
      if (g.hi != null && g.hi <= lim.open) return OK;
      if ((g.hi != null && g.hi <= lim.restricted) || pc) return time >= G.restrictedFrom ? OK : fail(name + " (" + (g.hi != null ? "HI " + g.hi : "CC-Demo PC") + ") may play weekends only from " + G.restrictedFrom + " (BR-043).");
      return fail(name + " (HI " + g.hi + ") is above the weekend handicap limit (BR-043).");
    },
    bizRule043Weekend: function (g, date, G) {
      return this.bizRule043(g, "", date, "Weekend", "07:00", G).ok ? "Any time" : this.bizRule043(g, "", date, "Weekend", G.restrictedFrom, G).ok ? "From " + G.restrictedFrom : "Not eligible";
    },
    bizRule043Pc: function (issuer) { return issuer === "CC-Demo" ? OK : fail("Only a Proficiency Certificate issued by CC-Demo counts for course play (BR-043)."); },

    // BR-044: released places go to the earliest waiting entry whose party fits
    bizRule044: function (entries, free) {
      var waiting = entries.filter(function (w) { return w.status === "waiting"; }).sort(function (a, b) { return a.joinedAt < b.joinedAt ? -1 : 1; });
      return { offer: waiting.filter(function (w) { return w.party <= free; })[0] || null, skipped: waiting.filter(function (w) { return w.party > free; }) };
    },

    // BR-045: a course change needs equivalent capacity at the other course (the fees come from the configuration)
    bizRule045: function (free, party, block) { return block ? fail("That tee time is blocked (BR-057).") : free >= party ? OK : fail("No equivalent capacity at the other course at that time (BR-045)."); },

    // BR-046: less than 72 hours' notice is a late cancellation
    bizRule046: function (date, time, today, clock, G) {
      var hours = (Math.round((d(date) - d(today)) / 864e5) * 1440 + mins(time) - mins(clock)) / 60;
      return { late: hours < G.cancelNoticeHours, hours: Math.floor(hours) };
    },

    // BR-047: a golf exception is decided by the Golf Manager, never by its requester, with a reason
    bizRule047: function (a, userName, isManager, reason) {
      if (!isManager) return fail("Only the Golf Manager decides golf waivers and extensions (BR-047).");
      if (a.requestedBy === userName) return fail("You requested this: someone else must decide it (BR-047).");
      return reason === undefined || String(reason).trim() ? OK : fail("Give a reason (BR-047).");
    },

    // BR-048: check in at least 15 minutes before tee-off
    bizRule048: function (time, clock, G) { return mins(time) - mins(clock) >= G.checkInMinutes ? OK : fail("Check-in closes " + G.checkInMinutes + " minutes before tee-off: use Late arrival (BR-048)."); },

    // BR-049: insurance before release (existing or annual cover, or MSIG day insurance)
    bizRule049: function (cover, dayInsurance, name) { return cover === "annual" || dayInsurance ? OK : fail(name + " has no golfer insurance: tick MSIG day insurance (BR-049)."); },

    // BR-050: a special guest rate needs Guest Eligibility Proof, else the sign-in guest rate
    bizRule050: function (g, G) { return G.proofCategories.indexOf(g.category) >= 0 && !g.proof ? "Sign-in guest" : g.category; },

    // BR-051: late golfer → a later free tee time within 30 minutes, else join by skipping holes, else no-show
    bizRule051: function (time, freeTimes, G) {
      var later = freeTimes.filter(function (t) { return mins(t) > mins(time) && mins(t) - mins(time) <= G.rescheduleWithinMinutes; })[0];
      return later ? { option: "reschedule", time: later } : { option: "joinOrNoShow" };
    },

    // BR-052: only the Golf Manager (or Captain / approved executive) suspends or reopens a course
    bizRule052: function (isManager) { return isManager ? OK : fail("Only the Golf Manager, Club Captain or an approved executive may suspend or reopen a course (BR-052)."); },

    // BR-053: outcome per golfer of a qualifying suspension
    bizRule053: function (playState, holes) {
      if (playState === "notTeedOff") return "refund";
      if (playState === "finished") return "none";
      return playState === "front9" || (+holes === 18 && (playState === "atTurn" || playState === "back9")) ? "rainCheck" : "none";
    },

    // BR-054: a rain check is valid 1 month, stays with its golfer and has no cash value
    bizRule054: function (issued, G) { return addMonths(issued, G.rainCheckMonths); },
    bizRule054Usable: function (rc, personId, date) {
      if (rc.personId !== personId) return fail("A rain check stays with its golfer and cannot be transferred (BR-054).");
      return rc.status === "available" && rc.expiry >= date ? OK : fail(rc.id + " is " + (rc.expiry < date ? "expired" : rc.status) + " (BR-054).");
    },

    // BR-055: a 9-hole rain check on an 18-hole booking leaves a top-up; never a cash refund
    bizRule055: function (rate18, rate9) { return Math.max(0, rate18 - rate9); },

    // BR-056: an extract row is accepted only with a known golfer, a gender and an HI from 0 to 54
    bizRule056: function (row, known) {
      if (!known) return fail("Unknown SGA number " + row.sgaNo + ": not matched to a golfer (BR-056).");
      if (row.gender !== "M" && row.gender !== "F") return fail("Missing gender (BR-056).");
      return row.hi >= 0 && row.hi <= 54 ? OK : fail("Handicap index " + row.hi + " is outside 0 – 54 (BR-056).");
    },

    // BR-057: a blocked session cannot be booked; a session with bookings cannot be blocked
    bizRule057: function (block) { return block ? fail("That tee time is blocked for " + block.purpose + " (" + block.source + ") (BR-057).") : OK; },
    bizRule057Block: function (bookings, purpose, source) {
      if (!purpose || !String(source || "").trim()) return fail("Give the purpose and the source reference (BR-057).");
      return bookings.length ? fail(bookings.length + " confirmed booking(s) in that session: move them first (BR-057).") : OK;
    },

    // BR-058: rate by course, player category and holes
    bizRule058: function (G, course, category, holes) { return G.rates[course][category][+holes === 9 ? 1 : 0]; },

    // BR-059: member-account charges are accepted at once unless Finance is unavailable (simulated Finance)
    bizRule059: function (financeAvailable) { return financeAvailable ? { ok: true, status: "accepted" } : { ok: false, status: "rejected", msg: "Finance is unavailable: the charges were not accepted, so the flight cannot be released (BR-059)." }; },

    // BR-060: what a shift close keeps flagged
    bizRule060: function (charges, approvals, exceptions) {
      return charges.filter(function (c) { return c.finance === "rejected" || c.finance === "pending"; }).length + approvals.filter(function (a) { return a.status === "pending"; }).length +
        exceptions.filter(function (x) { return x.status === "Rejected row"; }).length;
    },

    /* ---------- (v04) Events: BR-061 … BR-083 (HMS Events), ported from the rapid v09 event rules, participants always read from Membership ---------- */
    // BR-061: no approval to publish, but every item the configuration needs must be there; only the Events Team publishes
    bizRule061: function (e, role) {
      if (role !== "events") return fail("Only the Events Team configures and publishes events (BR-061).");
      var miss = [];
      if (!e.name) miss.push("name");
      if (!e.venue) miss.push("venue");
      if (!e.sessions.length || e.sessions.some(function (s) { return !s.date || !s.start || !s.end; })) miss.push("session dates and times");
      if (!e.capacity) miss.push("capacity");
      if (!e.windowOpen || !e.windowClose) miss.push("registration window");
      if (e.paid && (e.eligibility === "open" ? !(e.rates.memberAdult && e.rates.nonMemberAdult) : !e.rates.memberAdult)) miss.push("rates");
      return miss.length ? fail("Cannot publish yet: " + miss.join(", ") + " missing (BR-061).") : OK;
    },

    // BR-062: registrations only while the window is open
    bizRule062: function (e, now) {
      return e.windowOpen && now >= e.windowOpen && now <= e.windowClose ? OK : fail("Registration for " + e.name + " is " + (now < e.windowOpen ? "not open yet" : "closed") + " (window " + e.windowOpen + " – " + e.windowClose + ") (BR-062).");
    },

    // BR-063: each participant must meet the event's eligibility; member privileges need an Active membership (MMS)
    bizRule063: function (e, x) {
      if (x.kind === "member" && x.status !== "active") return fail(x.name + " is not an Active member, so cannot take part as a member (BR-063).");
      if (e.eligibility === "members" && x.kind !== "member") return fail(x.name + ": " + e.name + " is for members only (BR-063).");
      if (e.eligibility === "membersDependants" && x.kind !== "member") return fail(x.name + ": " + e.name + " is for members and their dependants only (BR-063).");
      return OK;
    },

    // BR-064: rate by qualifying category; child = under the configured age on the event date
    bizRule064Category: function (x, eventDate, childUnder) {
      var age = x.dateOfBirth ? +eventDate.slice(0, 4) - +x.dateOfBirth.slice(0, 4) - (eventDate.slice(5) < x.dateOfBirth.slice(5) ? 1 : 0) : 99;
      return (x.kind === "member" ? "member" : "nonMember") + (age < childUnder ? "Child" : "Adult");
    },
    bizRule064: function (e, cat) { var r = e.rates[cat]; return r == null ? e.rates[cat.replace("Child", "Adult")] : r; },

    // BR-065: the whole group is checked together and never split
    bizRule065: function (e, results, n) {
      if (!n) return fail("Pick at least one participant (BR-065).");
      if (n > e.maxPerRegistration) return fail("At most " + e.maxPerRegistration + " participants per registration (BR-065).");
      var bad = results.filter(function (r) { return !r.ok; });
      return bad.length ? fail(bad.map(function (r) { return r.msg; }).join(" ") + " The group is not split: change the participants (BR-065).") : OK;
    },

    // BR-066: confirmed + held + offered places never exceed capacity
    bizRule066: function (e, committed, n) { return committed + n <= e.capacity ? OK : fail("Only " + Math.max(0, e.capacity - committed) + " place(s) left for a group of " + n + " (BR-066)."); },

    // BR-067: paid registrations hold the whole group's places while settlement runs (online 15 minutes)
    bizRule067: function (now, minutes) { var h = +now.slice(11, 13), m = +now.slice(14, 16) + minutes; h += Math.floor(m / 60); return now.slice(0, 11) + String(h).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); },

    // BR-068: confirm only on a successful settlement; member account only where Finance says the member is eligible
    bizRule068: function (method, success, credit, amount) {
      if (!success) return fail("Payment declined: the registration is not confirmed and the places are released (BR-068).");
      if (method === "memberAccount") {
        if (!credit || !credit.ok) return fail((credit && credit.msg) || "The member account is not available for this payer (BR-068).");
        if (credit.available < amount) return fail("Available credit " + credit.available + " is below " + amount + ": the member account is not authorised (BR-068).");
        return OK;
      }
      return OK;
    },

    // BR-069: a full event with a waitlist takes the whole group, no payment
    bizRule069: function (e) { return e.waitlist ? OK : fail(e.name + " is full and has no waitlist (BR-069)."); },

    // BR-070: fit-aware FIFO by join time; a group that does not fit or is no longer eligible keeps its priority
    bizRule070: function (waiting, free, eligible) {
      return waiting.slice().sort(function (a, b) { return a.joinedAt < b.joinedAt ? -1 : 1; })
        .filter(function (r) { return r.participants.length <= free && eligible(r); })[0] || null;
    },

    // BR-071: an offer reserves the places for the offer window (default 24 hours)
    bizRule071: function (now, hours) { var t = new Date(now.replace(" ", "T") + ":00Z"); t.setUTCHours(t.getUTCHours() + hours); return t.toISOString().slice(0, 16).replace("T", " "); },

    // BR-072: one QR credential per confirmed participant
    bizRule072: function (seq) { return "EQ-" + String(seq).padStart(4, "0"); },

    // BR-073: the credential must match a confirmed participant of this session, once per session
    bizRule073: function (code, sessionId, regs, attendance) {
      var hit = null;
      regs.forEach(function (r) { r.participants.forEach(function (p) { if (p.qr === code) hit = { r: r, p: p }; }); });
      if (!hit) return fail("Unknown or invalid QR " + code + ": attendance not recorded (BR-073).");
      if (hit.r.status !== "confirmed" || hit.p.status !== "confirmed") return fail("QR " + code + " belongs to a cancelled registration (BR-073).");
      if (hit.r.sessionIds.indexOf(sessionId) < 0) return fail("QR " + code + " is not registered for this session (BR-073).");
      if (attendance.some(function (a) { return a.qr === code && a.sessionId === sessionId; })) return fail("QR " + code + " is already recorded for this session (BR-073).");
      return { ok: true, msg: "", reg: hit.r, participant: hit.p };
    },

    // BR-074: manual check-in only against a confirmed registration, with a reason
    bizRule074: function (r, p, reason) {
      if (!r || r.status !== "confirmed" || !p || p.status !== "confirmed") return fail("Manual check-in needs an existing confirmed registration (BR-074).");
      return String(reason || "").trim() ? OK : fail("Give the reason for the manual check-in (BR-074).");
    },

    // BR-075: personnel attendance is separate and recorded once per session
    bizRule075: function (list, sessionId, personnelId) { return list.some(function (a) { return a.sessionId === sessionId && a.personnelId === personnelId; }) ? fail("Already recorded for this session (BR-075).") : OK; },

    // BR-076: below the minimum the Events Team decides; nothing is cancelled automatically
    bizRule076: function (e, confirmed) {
      if (!e.minParticipants) return { ok: true, met: true, msg: "No minimum participation set." };
      return { ok: true, met: confirmed >= e.minParticipants, msg: confirmed + " confirmed against a minimum of " + e.minParticipants + (confirmed >= e.minParticipants ? ": the event proceeds." : ": the Events Team decides to proceed or cancel (BR-076).") };
    },

    // BR-077: a participant cancellation forfeits the amount paid
    bizRule077: function (r, p) { return r.status === "confirmed" && p.status === "confirmed" ? { ok: true, msg: "", forfeit: p.rate } : fail("Only a confirmed participant can be cancelled (BR-077)."); },

    // BR-078: club refunds need Events Manager authorisation, full or partial, never by the proposer
    bizRule078: function (rf, role, by, amount) {
      if (role !== "manager") return fail("Only the Events Manager authorises event refunds (BR-078).");
      if (rf.proposedBy === by) return fail("The proposer cannot authorise their own refund (BR-078).");
      return amount > 0 && amount <= rf.paid ? OK : fail("The refund must be between S$1 and the S$" + rf.paid + " paid (BR-078).");
    },
    bizRule078Refundable: function (r) { return r.cancelledBy === "club" ? OK : fail("Participant cancellations are forfeited: no refund (BR-077, BR-078)."); },

    // BR-079: a schedule change with confirmed registrations is a club rescheduling
    bizRule079: function (session, date, start, confirmed) {
      if (!date || !start) return fail("Give the new date and start time (BR-079).");
      return { ok: true, msg: confirmed ? confirmed + " confirmed participant(s) are told and may keep or decline (BR-079)." : "No confirmed registrations: the session moves directly." };
    },

    // BR-080: mirror the Function Room Booking System; tentative never counts; unknown references change nothing
    bizRule080: function (msg, booking) {
      if (!booking && !msg.eventId) return fail("Unknown reference " + msg.ref + ": nothing changed (BR-080).");
      if (!booking) return msg.type === "tentative" ? { ok: true, msg: msg.ref + " recorded as tentative, not confirmed (BR-080).", status: "tentative", create: true } : fail("Unknown reference " + msg.ref + ": nothing changed (BR-080).");
      var to = { confirmed: "confirmed", amended: booking.status, cancelled: "cancelled", tentative: "tentative" }[msg.type];
      return { ok: true, msg: msg.ref + " " + msg.type + (msg.type === "tentative" ? ": not treated as confirmed" : "") + " (BR-080).", status: to };
    },

    // BR-081: price and eligibility changes apply to future registrations only (confirmed ones keep their frozen rate)
    bizRule081: function (changed) { return changed.length ? { ok: true, msg: changed.join(", ") + " changed for new registrations only; confirmed registrations keep their price (BR-081)." } : OK; },

    // BR-082: capacity never below committed places
    bizRule082: function (cap, committed) { return cap >= committed ? OK : fail("Capacity cannot go below the " + committed + " confirmed, held or offered places (BR-082)."); },

    // BR-083: an event is completed once its last session has ended
    bizRule083: function (e, now) { var last = e.sessions.map(function (s) { return s.date + " " + s.end; }).sort().slice(-1)[0]; return !!last && last < now; },

    /* ---------- (v05) Facilities: BR-086 … BR-106 (HMS Facilities), ported from the rapid v09 facility rules; customers are always read from Membership ---------- */
    // Minutes since midnight of "HH:MM"; hours from a "YYYY-MM-DD HH:MM" moment to a slot start
    mins: function (t) { return +t.slice(0, 2) * 60 + +t.slice(3, 5); },
    hoursUntil: function (now, date, start) { return (Date.parse(date + "T" + start + ":00Z") - Date.parse(now.replace(" ", "T") + ":00Z")) / 3600000; },

    // BR-086: the category must be eligible for the facility; member privileges and rates only for an Active member (status from MMS)
    bizRule086: function (f, c) {
      if (!c || !c.category) return fail("The customer's category cannot be set, so no entitlement or member rate applies (BR-086).");
      if (c.category === "member" && c.status !== "active") return fail((c.name || "This member") + " is not an Active member: no member privileges or rate (BR-086).");
      var label = { member: "Members", safra: "SAFRA members", nonMember: "Non-members", guest: "Guests", resortGuest: "Resort guests" }[c.category];
      return (f.eligible || []).indexOf(c.category) >= 0 ? OK : fail(label + " may not " + (f.model === "admission" ? "enter the " : "book ") + f.name + " (BR-086).");
    },

    // BR-087: the resource is free for the whole period, and the customer holds no other overlapping booking
    bizRule087: function (bookings, x, resName) {
      var a = Rules.mins(x.start), b = a + 60 * x.hours;
      function clash(k) { return k.id !== x.id && k.status === "confirmed" && k.date === x.date && Rules.mins(k.start) < b && a < Rules.mins(k.start) + 60 * k.hours; }
      var r = bookings.filter(function (k) { return k.resource === x.resource && clash(k); })[0];
      if (r) return fail((resName || x.resource) + " is booked " + r.start + " – " + Rules.endOf(r.start, r.hours) + " (" + r.id + ") (BR-087).");
      var own = bookings.filter(function (k) { return k.customer === x.customer && clash(k); })[0];
      return own ? fail(x.customer + " already holds " + own.id + " at that time (BR-087).") : OK;
    },
    endOf: function (start, hours) { var m = Rules.mins(start) + 60 * hours; return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); },

    // BR-088: no booking inside an active block (no override); a new block over a confirmed booking flags it, never removes it
    bizRule088: function (blocks, resource, date, start, hours, resName) {
      var a = date + " " + start, b = date + " " + Rules.endOf(start, hours);
      var k = blocks.filter(function (x) { return x.active && x.resource === resource && x.from < b && a < x.to; })[0];
      return k ? fail((resName || resource) + " is blocked " + k.from.slice(11) + " – " + k.to.slice(11) + " (" + k.type + ": " + k.reason + ") (BR-088).") : OK;
    },
    bizRule088Flags: function (bookings, block) {
      return bookings.filter(function (x) { return x.status === "confirmed" && x.resource === block.resource && x.date + " " + x.start < block.to && block.from < x.date + " " + Rules.endOf(x.start, x.hours); });
    },

    // BR-089: the date is inside the facility's booking window for the category (a guest books on the member window); same-day only where allowed
    bizRule089: function (f, category, date, today, sameDay) {
      var days = (f.windowDays || {})[category === "guest" ? "member" : category];
      if (date < today) return fail("The date has passed (BR-089).");
      if (date === today && !sameDay) return fail(f.name + " takes no same-day bookings (BR-089).");
      return days != null && date <= addDays(today, days) ? OK : fail(fdateR(date) + " is outside the " + (days || 0) + "-day booking window for " + f.name + " (BR-089).");
    },

    // BR-090: whole slots inside the facility's minimum and maximum and its opening hours; Billiards 1 – 3 hours
    bizRule090: function (f, start, hours) {
      if (!(hours >= f.minH && hours <= f.maxH)) return fail(f.name + " is " + f.minH + " to " + f.maxH + " hours per booking (BR-090).");
      return start >= f.open && Rules.endOf(start, hours) <= f.close ? OK : fail(f.name + " is open " + f.open + " – " + f.close + " (BR-090).");
    },

    // BR-091: rate from the facility, category and day type (a public holiday is a weekend day); frozen at confirmation
    bizRule091: function (f, category, date, holidays, hours) {
      var day = Rules.dayType(date, holidays), r = (f.rates || {})[category];
      if (!r) return fail("No " + category + " rate is set for " + f.name + " (BR-091).");
      var each = r[day === "Weekend" ? 1 : 0];
      return { ok: true, msg: "", dayType: day, rate: each, amount: each * hours };
    },

    // BR-092: a chargeable booking confirms only after a successful payment; a free one confirms at once; no member-account charging
    bizRule092: function (amount, method, success) {
      if (method === "memberAccount") return fail("Facilities takes no member-account charges: pay online or at the counter (BR-092).");
      if (!amount) return OK;
      return success ? OK : fail("Payment declined: nothing is reserved (BR-092).");
    },

    // BR-093: an amendment passes every rule again (checked by the caller); extra is paid first; a lower amount ≥ 24 h before start is refunded
    bizRule093: function (oldAmount, newAmount, hoursBefore, cutoff) {
      var d = newAmount - oldAmount;
      return { ok: true, msg: "", extra: Math.max(0, d), refund: d < 0 && hoursBefore >= cutoff ? -d : 0 };
    },

    // BR-094: a cancellation needs a reason; the resource is released at once
    bizRule094: function (reason) { return String(reason || "").trim() ? OK : fail("Give the reason for the cancellation (BR-094)."); },

    // BR-095: customer ≥ 24 h before start: full refund, < 24 h: none; club: full unless an alternative slot is accepted
    bizRule095: function (amount, hoursBefore, by, cutoff, alternative) {
      if (by === "club") return { ok: true, refund: alternative ? 0 : amount, msg: alternative ? "Moved by the club: no refund due (BR-095)." : "Cancelled by the club: full refund (BR-095)." };
      return hoursBefore >= cutoff ? { ok: true, refund: amount, msg: "Full refund (at least " + cutoff + " hours before the start, BR-095)." } : { ok: true, refund: 0, msg: "Less than " + cutoff + " hours before the start: no refund (BR-095)." };
    },

    // BR-096: a refund outside the policy needs the Operations Manager (the Manager), never the requester
    bizRule096: function (rf, role, userName) {
      if (role !== "manager") return fail("Only the Operations Manager approves an exceptional refund (BR-096).");
      return rf.requestedBy === userName ? fail("You requested this refund: another Manager decides it (BR-096).") : OK;
    },

    // BR-097: a no-show only once the start has passed; no standard refund
    bizRule097: function (b, now) { return b.status === "confirmed" && b.date + " " + b.start <= now ? { ok: true, msg: "No-show recorded: no standard refund (BR-097).", refund: 0 } : fail("A no-show can be recorded only after the booking has started (BR-097)."); },

    // BR-098: an admission is within operating hours and capacity
    bizRule098: function (f, occupancy, time) {
      if (time < f.open || time >= f.close) return fail(f.name + " is open " + f.open + " – " + f.close + " (BR-098).");
      return occupancy < f.capacity ? OK : fail("The " + f.name.split(" (")[0].toLowerCase() + " is full (" + occupancy + " / " + f.capacity + ", BR-098).");
    },

    // BR-099: Fitness Centre entry needs an Active membership, an in-house resort stay (v06: the reservation number is the visitor pass, RC-121) or a valid day pass
    bizRule099: function (c, stays, today) {
      if (c.category === "member") return c.status === "active" ? OK : fail((c.name || "This member") + " is not an Active member (BR-099).");
      if (c.category === "resortGuest") {
        var st = stays.filter(function (x) { return x.id === c.pass; })[0];
        if (!st) return fail("Unknown reservation number " + (c.pass || "") + " (BR-099).");
        if (st.status === "checkedOut" || st.departure < today) return fail("Stay " + st.id + " ended on " + fdateR(st.departure) + " (BR-099).");
        return st.status === "checkedIn" ? OK : fail("Stay " + st.id + " is not in-house" + (st.arrival > today ? ": it starts on " + fdateR(st.arrival) : "") + " (BR-099).");
      }
      return c.dayPass ? Rules.bizRule100(c.dayPass, today) : fail("A non-member needs a day pass first (BR-099).");
    },

    // BR-100: a day pass is valid for the whole operating day of issue only
    bizRule100: function (dp, today) { return dp.date === today ? OK : fail("Day pass " + dp.code + " was for " + fdateR(dp.date) + " (BR-100)."); },

    // BR-101: a bowling counter sale needs a receipt number, an amount and a method; paid at the counter, never a member account
    bizRule101: function (t) {
      if (!String(t.receiptNo || "").trim()) return fail("Receipt number required (BR-101).");
      if (!(t.amount > 0)) return fail("Enter the amount (BR-101).");
      return t.method && t.method !== "memberAccount" ? OK : fail("Bowling is paid at the counter: Cash, Card or NETS (BR-101).");
    },

    // BR-102: each export row matches one paid CMS sale by receipt number, with amount (tolerance), date and method equal; anything else is an exception
    bizRule102: function (rows, txns, tolerance) {
      var seen = {}, matched = [], ex = [];
      rows.forEach(function (r) {
        var t = txns.filter(function (x) { return x.receiptNo === r.receiptNo; })[0];
        if (seen[r.receiptNo]) ex.push({ type: "duplicate", receiptNo: r.receiptNo, txnId: t ? t.id : null, detail: "Twice in the export" + (t ? "; one CMS record (" + t.id + ")" : "") });
        else if (!t) ex.push({ type: "noMatch", receiptNo: r.receiptNo, txnId: null, detail: "S$" + r.amount + " " + r.method + "; no counter sale" });
        else if (Math.abs(t.amount - r.amount) > tolerance) ex.push({ type: "amount", receiptNo: r.receiptNo, txnId: t.id, detail: "Export S$" + r.amount + " · CMS S$" + t.amount + " (" + t.id + ")" });
        else if (t.method !== r.method || t.date !== r.date) ex.push({ type: "method", receiptNo: r.receiptNo, txnId: t.id, detail: "Export " + r.method + " · CMS " + t.method + " (" + t.id + ")" });
        else matched.push(t.id);
        seen[r.receiptNo] = true;
      });
      return { ok: true, msg: matched.length + " reconciled, " + ex.length + " exception(s) (BR-102).", matched: matched, exceptions: ex };
    },

    // BR-103: an exception closes only with a disposition and a reason; amount and method issues may go to Finance
    bizRule103: function (x, action, reason) {
      if (action === "escalate") return ["amount", "method", "noMatch"].indexOf(x.type) >= 0 && x.status === "open" ? OK : fail("Only an open amount, method or missing-record exception goes to Finance (BR-103).");
      if (x.status === "closed") return fail(x.id + " is already closed (BR-103).");
      return String(reason || "").trim() ? OK : fail("Record the disposition with a reason (BR-103).");
    },

    // BR-104: an eligible customer may join only when the slot is full and the facility's waiting list is on
    bizRule104: function (f, full) {
      if (!f.waitlist) return fail(f.name + " has no waiting list (BR-104).");
      return full ? OK : fail("A slot is free: book it instead of joining the waiting list (BR-104).");
    },
    // the next entry for a freed slot: the first still waiting by join time
    bizRule104Next: function (entries, facility, date, start) {
      return entries.filter(function (w) { return w.status === "waiting" && w.facility === facility && w.date === date && w.start === start; }).sort(function (a, b) { return a.joinedAt < b.joinedAt ? -1 : 1; })[0] || null;
    },

    // BR-105: configuration is saved as Draft until approved; the Billiards 1 – 3 hour limit cannot change
    bizRule105: function (f, field, value) {
      if (f.locked && (field === "minH" || field === "maxH")) return fail(f.name + " 1 – 3 hours is locked (BR-105).");
      return value === "" || value == null || isNaN(+value) || +value < 0 ? fail("Enter a valid value (BR-105).") : OK;
    },

    // BR-106: Personal Training only for a participant who meets the PT eligibility policy (demo: an Active member, D-114)
    bizRule106: function (c) { return c && c.category === "member" && c.status === "active" ? OK : fail("Personal Training is for Active members only (BR-106)."); },

    /* ---------- (v06) Resorts: BR-107 … BR-132 (HMS Resorts), ported from the rapid v09 resort rules; every rule is Draft – for validation (D-348); guests are read from Membership ---------- */
    stayNights: function (arrival, departure) { var out = []; for (var x = arrival; x < departure; x = addDays(x, 1)) out.push(x); return out; },
    daysBefore: function (today, arrival) { return Math.round((d(arrival) - d(today)) / 86400000); },
    // Night price: Friday and Saturday nights and the eve of a public holiday are weekend nights; a season adds its uplift
    nightRate: function (type, kind, date, R, holidays) {
      var we = R.weekendNights.indexOf(d(date).getUTCDay()) >= 0 || (holidays || []).indexOf(addDays(date, 1)) >= 0, s = R.seasons.filter(function (x) { return date >= x.from && date <= x.to; })[0], base = type.rates[kind][we ? 1 : 0];
      return { date: date, dayType: we ? "Weekend" : "Weekday", season: s ? s.name : "", rate: Math.round(base * (s ? 1 + s.upliftPct / 100 : 1) * 100) / 100 };
    },
    // percentage discounts first, then fixed; configured priority within each (BR-120)
    applyDiscounts: function (base, list) {
      var t = base, lines = list.slice().sort(function (a, b) { return (a.type === "pct" ? 0 : 1) - (b.type === "pct" ? 0 : 1) || a.priority - b.priority; }).map(function (x) {
        var off = Math.min(t, x.type === "pct" ? Math.round(t * x.value) / 100 : x.value); t = Math.round((t - off) * 100) / 100; return { code: x.code, name: x.name + (x.type === "pct" ? " " + x.value + " %" : ""), amount: -off };
      });
      return { lines: lines, total: t };
    },

    // BR-107: an arrival before the departure and at least the minimum stay
    bizRule107: function (arrival, departure, minNights) {
      var n = Rules.stayNights(arrival || "", departure || "").length;
      return !arrival || !departure || n < 1 ? fail("Choose an arrival and a later departure date (BR-107).") : n < minNights ? fail("The minimum stay is " + minNights + " nights (BR-107).") : OK;
    },
    // BR-107 (with BR-125): the room is not Faulty or Blocked and holds no other live reservation on any of the nights
    bizRule107Room: function (room, arrival, departure, reservations, excludeId) {
      if (room.status === "faulty" || room.status === "blocked") return fail(room.code + " is " + (room.status === "faulty" ? "Faulty" : "Maintenance Blocked") + " and cannot be reserved (BR-107, BR-125).");
      var hit = reservations.filter(function (r) { return r.id !== excludeId && r.room === room.code && ["tentative", "confirmed", "checkedIn"].indexOf(r.status) >= 0 && r.arrival < departure && arrival < r.departure; })[0];
      return hit ? fail(room.code + " is not available: reserved " + fdateR(hit.arrival) + " – " + fdateR(hit.departure) + " (BR-107).") : OK;
    },

    // BR-108: an Active membership (from Membership), the category's window and maximum nights; a non-member uses the non-member limits
    bizRule108: function (kind, category, status, typeName, arrival, nights, today, windows) {
      if (kind === "member" && status !== "active") return fail("Member privileges need an Active membership; this one is " + status + " (BR-108).");
      var w = windows[kind === "member" ? category : "nonMember"], who = kind === "member" ? typeName + " members" : "Non-members";
      if (!w) return fail(who + " cannot reserve resort rooms (BR-108).");
      if (nights > w.maxNights) return fail(who + " may stay up to " + w.maxNights + " nights (BR-108).");
      if (arrival < today) return fail("The arrival date has passed (BR-108).");
      return Rules.daysBefore(today, arrival) > w.days ? fail(who + " can reserve up to " + w.days + " days ahead (until " + fdateR(addDays(today, w.days)) + ") (BR-108).") : OK;
    },

    // BR-109: only staff assign a rate type by hand, from the permitted rate types
    bizRule109: function (isStaff, rateType, permitted) { return !isStaff ? fail("Rate types are assigned by staff only (BR-109).") : permitted.indexOf(rateType) < 0 ? fail(rateType + " is not a permitted rate type (BR-109).") : OK; },

    // BR-110: the booked guest never changes
    bizRule110: function (before, after) { return before === after ? OK : fail("Reservations cannot be transferred to another guest (BR-110)."); },

    // BR-111: nightly rates (season uplift), zero value for a lease or Complimentary rate type, then the discounts (BR-120)
    bizRule111: function (nightly, rateType, discounts) {
      var base = nightly.reduce(function (a, n) { return a + n.rate; }, 0);
      if (rateType === "Corporate lease" || rateType === "Complimentary") return { ok: true, base: base, lines: [], total: 0 };
      var x = Rules.applyDiscounts(base, discounts);
      return { ok: true, base: base, lines: x.lines, total: x.total };
    },

    // BR-112: a group is confirmed only when every room is free, or staff accept the revised set
    bizRule112: function (wanted, free, acceptRevised) { return free >= wanted ? OK : free > 0 && acceptRevised ? OK : fail("Only " + free + " of " + wanted + " rooms are free; tick Accept revised set to confirm " + free + " (BR-112)."); },

    // BR-113: a hold keeps the rooms until it ends; then it expires unless paid
    bizRule113: function (holdUntil, now) { return now <= holdUntil ? OK : fail("The hold ended at " + holdUntil + "; the rooms are released (BR-113)."); },

    // BR-114: a date or room change > 21 days before arrival pays 20 % of the original value; at 21 days or less it is a cancellation (only after a confirm, D-349)
    bizRule114: function (value, daysBefore, P) {
      var loc = Math.round(value * P.locPct) / 100;
      return daysBefore > P.amendDays ? { ok: true, asCancel: false, loc: loc, msg: "More than " + P.amendDays + " days before arrival: Lost Opportunity Charge " + P.locPct + " % = S$" + loc.toFixed(2) + " (BR-114)." }
        : { ok: false, asCancel: true, loc: 0, msg: daysBefore + " days before arrival: this change is processed as a cancellation (100 % = S$" + value.toFixed(2) + ") (BR-114)." };
    },

    // BR-115: 50 % more than 21 days before arrival, 100 % at 21 days or less; the rest of what was paid is refundable
    bizRule115: function (value, daysBefore, paid, P) {
      var p = daysBefore > P.amendDays ? P.cancelEarlyPct : P.cancelLatePct, charge = Math.round(value * p) / 100;
      return { ok: true, pct: p, charge: charge, refund: Math.max(0, Math.round((paid - charge) * 100) / 100), due: Math.max(0, Math.round((charge - paid) * 100) / 100) };
    },

    // BR-116: a no-show only for a confirmed stay after the cutoff (10:00 the day after arrival)
    bizRule116: function (status, arrival, now, P) {
      if (status !== "confirmed") return fail("Only a confirmed reservation that has not checked in can be a no-show (BR-116).");
      var cut = addDays(arrival, 1) + " " + P.noShowCutoff;
      return now >= cut ? OK : fail("Not before the no-show cutoff, " + fdateR(addDays(arrival, 1)) + " " + P.noShowCutoff + " (BR-116).");
    },

    // BR-117: the waitlist never holds a room; staff choose an entry, with a reason, once a room is free
    bizRule117: function (anyFree) { return anyFree ? fail("A room is free for those dates: reserve it instead (BR-117).") : OK; },
    bizRule117Allocate: function (reason, roomFree) { return !roomFree ? fail("No matching room is free yet (BR-117).") : String(reason || "").trim() ? OK : fail("Record why this entry was chosen (BR-117)."); },

    // BR-118: a payment counts only on a confirmed success
    bizRule118: function (success) { return success ? OK : fail("Payment declined: nothing is recorded as paid (BR-118)."); },

    // BR-119: a resort refund needs the Operations Manager (never its requester), a reason and the original payment reference
    bizRule119: function (x, role, userName, reason) {
      if (role !== "manager") return fail("Only the Operations Manager can approve a resort refund (BR-119).");
      if (x.requestedBy === userName) return fail("You requested this refund: another Manager decides it (BR-119).");
      return !x.paymentRef ? fail("A refund must reference the original payment (BR-119).") : String(reason || "").trim() ? OK : fail("Give a reason (BR-119).");
    },

    // BR-120: at most one member discount, one promotion and one voucher
    bizRule120: function (list) {
      var n = function (k) { return list.filter(function (x) { return x.kind === k; }).length; };
      return n("member") > 1 || n("promotion") > 1 || n("voucher") > 1 ? fail("Only one member discount, one promotion and one voucher may be combined (BR-120).") : OK;
    },

    // BR-121: an unpaid line may be adjusted, a paid one only credited; both need a reason (and the Manager's approval)
    bizRule121: function (line, kind, reason) {
      if (!String(reason || "").trim()) return fail("A correction needs a reason (BR-121).");
      if (kind === "adjustment" && line.paid) return fail("This item is paid: it is never edited; issue a credit note (BR-121).");
      return kind === "creditNote" && !line.paid ? fail("This item is unpaid: adjust it instead of a credit note (BR-121).") : OK;
    },

    // BR-122: Confirmed, the arrival date, 15:00 – 18:00 (or an approved late arrival), a room that is Ready
    bizRule122: function (res, room, today, time, P, lateApproved) {
      if (res.status !== "confirmed") return fail("Only a confirmed reservation can check in (BR-122).");
      if (res.arrival !== today) return fail("Check-in is on the arrival date, " + fdateR(res.arrival) + " (BR-122).");
      if (["faulty", "blocked", "pendingCleaning", "cleaning"].indexOf(room.status) >= 0) return fail(room.code + " is " + { faulty: "Faulty", blocked: "Maintenance Blocked", pendingCleaning: "Pending Cleaning", cleaning: "being cleaned" }[room.status] + ": choose a Ready room (BR-122).");
      if (room.status === "occupied") return fail(room.code + " is occupied (BR-122).");
      if (time < P.checkIn[0] && !lateApproved) return fail("Check-in opens at " + P.checkIn[0] + " (BR-122).");
      return time > P.checkIn[1] && !lateApproved ? fail("After " + P.checkIn[1] + " a late arrival needs the Manager's approval (BR-122).") : OK;
    },

    // BR-123: room status transitions (check-out records Checked-Out, then Pending Cleaning, D-349)
    bizRule123: function (from, action) {
      var T = { checkIn: [["ready"], "occupied"], checkOut: [["occupied"], "pendingCleaning"], startCleaning: [["pendingCleaning"], "cleaning"], markReady: [["cleaning"], "ready"], reverseIn: [["occupied"], "ready"], reverseOut: [["pendingCleaning", "cleaning", "ready"], "occupied"] }[action];
      return T && T[0].indexOf(from) >= 0 ? { ok: true, msg: "", to: T[1] } : fail("A room that is " + from + " cannot " + action + " (BR-123).");
    },

    // BR-124: an extension or a room move needs the room free for every added night
    bizRule124: function (room, from, to, reservations, excludeId, inHouse) {
      var r = Rules.bizRule107Room(room, from, to, reservations, excludeId);
      if (!r.ok) return fail(r.msg.replace("(BR-107, BR-125)", "(BR-124, BR-125)").replace("(BR-107)", "(BR-124)"));
      return inHouse && room.status !== "ready" && room.status !== "occupied" ? fail(room.code + " is not available: it is " + { pendingCleaning: "Pending Cleaning", cleaning: "being cleaned" }[room.status] + " (BR-124).") : OK;
    },

    // BR-125: a Faulty or Blocked room leaves sale; it returns only after completion is recorded
    bizRule125: function (room, reason) { return room.status === "occupied" ? fail(room.code + " is occupied: move the guest first (BR-125).") : String(reason || "").trim() ? OK : fail("A maintenance block needs a reason (BR-125)."); },
    bizRule125Release: function (block) { return block && block.completedAt ? OK : fail("Record the maintenance completion first (BR-125)."); },

    // BR-126: a valid number (IU or OBU format), at most 2 per reservation; the first free, the second charged per night
    bizRule126: function (list, plate, P) {
      if (!/^S[A-Z]{1,2}\d{1,4}[A-Z]$/.test(plate || "")) return fail("\"" + (plate || "") + "\" is not a valid registration number (BR-126).");
      var live = list.filter(function (v) { return v.whitelist !== "revoked"; });
      if (live.some(function (v) { return v.plate === plate; })) return fail(plate + " is already registered (BR-126).");
      return live.length >= P.maxVehicles ? fail("At most " + P.maxVehicles + " vehicles per reservation (BR-126).") : OK;
    },
    bizRule126Charge: function (index, nights, P) { return index === 0 ? 0 : P.secondVehicle * nights; },

    // BR-127: a door PIN only for a confirmed or in-house stay, valid for the stay only
    bizRule127: function (res) { return ["confirmed", "checkedIn"].indexOf(res.status) >= 0 ? OK : fail("Access credentials are issued only for a confirmed stay (BR-127)."); },

    // BR-128: the folio is settled before check-out
    bizRule128: function (res, balance) { return res.status !== "checkedIn" ? fail("Only an in-house stay can check out (BR-128).") : balance > 0.004 ? fail("Balance S$" + balance.toFixed(2) + " must be settled first (BR-128).") : OK; },

    // BR-129: a reversal is same-day, with a reason; the Manager (never its requester) approves it
    bizRule129: function (eventAt, today, reason) { return String(eventAt || "").slice(0, 10) !== today ? fail("Only a same-day check-in or check-out can be reversed (BR-129).") : String(reason || "").trim() ? OK : fail("A reversal needs a reason (BR-129)."); },
    bizRule129Approve: function (role, requestedBy, userName) { return role !== "manager" ? fail("Only the Operations Manager can approve a reversal (BR-129).") : requestedBy === userName ? fail("You requested this: another Manager decides it (BR-129).") : OK; },

    // BR-130: Night Audit before the close; a blocking exception stops it
    bizRule130: function (checks) { var b = checks.filter(function (c) { return c.blocking && c.count; }); return b.length ? fail("Night Audit is blocked: " + b.map(function (c) { return c.name + " (" + c.count + ")"; }).join("; ") + " (BR-130).") : OK; },

    // BR-131: a resort financial event goes to FIN-OPS with its source reference and amount
    bizRule131: function (src, amount) { return src && amount != null && !isNaN(amount) ? OK : fail("A FIN-OPS financial event needs its source reference and amount (BR-131)."); },

    // BR-132: notify only for a configured event
    bizRule132: function (event, configured) { return configured.indexOf(event) >= 0 ? OK : fail(event + " is not a configured notification (BR-132)."); },
    /* ---------- (v07) Finance (FIN-OPS): BR-133 – BR-170, each with its source status (Interim design, TBC, Proposed, Confirmed; D-371) ---------- */
    r2: function (n) { return Math.round((n + Number.EPSILON) * 100) / 100; },

    // BR-133 (Interim design): an approved source, a source identity not seen before, amount, tax code and source reference
    bizRule133: function (e, seen, sources) {
      if (sources.indexOf(e.module) < 0) return fail(e.module + " is not an approved financial source (BR-133).");
      if (e.module === "POS" && e.matched === false) return fail("POS line " + e.sourceId + " has no matching tender (BR-133).");
      if (seen.some(function (x) { return x.module === e.module && x.sourceId === e.sourceId && x.type === e.type && x.id < e.id && x.status !== "exception"; })) return fail("Duplicate: " + e.module + " " + e.sourceId + " was already received (BR-133).");
      if (!(e.amount > 0) || !e.sourceId) return fail("Amount and source reference are required (BR-133).");
      return OK;
    },
    // BR-134 (Proposed): a source-data error goes back to the module, a Finance error stays in FIN-OPS
    bizRule134: function (e) { return !e.tax ? { ok: false, owner: e.module, msg: "Tax code missing: returned to " + e.module + " to resend (BR-134)." } : OK; },
    // BR-135 (TBC): an in-house member charge needs the upstream credit check; while Finance is unavailable it is not financially completed
    bizRule135: function (e, available) { return e.inHouse && !available || e.creditChecked === false ? fail("In-house member charge without the credit check: not financially completed (BR-135).") : OK; },
    // BR-136 (Confirmed): an active, effective, approved mapping for the event type
    bizRule136: function (type, mappings, date) {
      var m = mappings.filter(function (x) { return x.eventType === type && x.status === "active" && x.from <= date && (!x.to || x.to >= date); })[0];
      return m ? { ok: true, msg: "", mapping: m } : fail("Unmapped: no approved mapping for " + type + " (BR-136).");
    },
    // BR-137 (Confirmed): every mapping leg in order, Output GST as its own leg on the GST-exclusive amount
    bizRule137: function (gross, mapping, rate) {
      var net = this.r2(gross / (1 + rate / 100)), gst = this.r2(gross - net);
      return mapping.legs.map(function (l) { return { side: l.side, account: l.account, amount: l.basis === "gross" ? gross : l.basis === "net" ? (rate ? net : gross) : gst }; }).filter(function (l) { return l.amount; });
    },
    // BR-138 (Interim design): debits = credits; up to S$0.01 goes to the rounding leg, more blocks
    bizRule138: function (legs) {
      var dr = 0, cr = 0; legs.forEach(function (l) { if (l.side === "Dr") dr += l.amount; else cr += l.amount; });
      var diff = this.r2(dr - cr);
      if (!diff) return OK;
      if (Math.abs(diff) <= 0.01) { legs.push({ side: diff > 0 ? "Cr" : "Dr", account: "6900", amount: Math.abs(diff) }); return { ok: true, msg: "Rounding S$" + Math.abs(diff).toFixed(2) + " absorbed (BR-138)." }; }
      return fail("Unbalanced by S$" + Math.abs(diff).toFixed(2) + " (BR-138).");
    },
    // BR-139 (Interim design): configuration is Draft until a second person approves; no overlapping active mapping
    bizRule139: function (change, mappings) {
      var clash = change.kind === "mapping" && mappings.filter(function (m) { return m.eventType === change.value.eventType && m.status === "active" && (!m.to || m.to >= change.value.from); })[0];
      return clash ? fail("Overlaps the active " + clash.id + " for " + clash.eventType + ": end-date it first (BR-139).") : OK;
    },
    // Maker-checker (BR-139, 150, 157, 166, 167): the checker is a Finance Approver who did not make it
    makerChecker: function (maker, checker, role, rule) {
      if (maker === checker) return fail("You prepared this: a second person must approve it (" + rule + ").");
      return role === "finapprover" ? OK : fail("Only the Finance Approver approves this (" + rule + ").");
    },
    // BR-140 (Confirmed): one receivable per positive charge, none for credit lines, no duplicates
    bizRule140: function (amount, billRef, receivables) {
      if (amount <= 0) return fail("A credit line creates no receivable (BR-140).");
      return receivables.some(function (r) { return r.id === billRef; }) ? fail("Bill " + billRef + " already has its receivable (BR-140).") : OK;
    },
    // BR-141 (Interim design): the named bill first, then oldest due date, then oldest bill; the excess is unapplied credit
    bizRule141: function (amount, open, named) {
      var R2 = this.r2, list = open.filter(function (r) { return r.open > 0; }).sort(function (a, b) { return a.id === named ? -1 : b.id === named ? 1 : a.due < b.due ? -1 : a.due > b.due ? 1 : a.id < b.id ? -1 : 1; });
      var left = amount, out = [];
      list.forEach(function (r) { if (left <= 0) return; var x = Math.min(left, r.open); out.push({ rec: r.id, amount: R2(x) }); left = R2(left - x); });
      return { allocations: out, unapplied: R2(left) };
    },
    // BR-142 (Confirmed): a Payment is real money with one PaymentNo
    bizRule142: function (amount, method) { return amount > 0 && method ? OK : fail("A Payment needs an amount above zero and a payment method (BR-142)."); },
    // BR-143 (Interim design): a cheque waits in Pending Clearance
    bizRule143: function (method) { return method === "Cheque" ? "pendingClearance" : "confirmed"; },
    // BR-144 (Interim design): an Active order; the amount within its Maximum Debit Amount
    bizRule144: function (order, amount) {
      if (order.status !== "active") return fail(order.id + " is " + order.status + ": skipped (BR-144).");
      if (amount <= 0) return fail("Nothing due on " + order.id + " (BR-144).");
      return amount > order.max ? fail(order.id + " (" + order.member + "): S$" + amount.toFixed(2) + " is over its Maximum Debit Amount S$" + order.max.toFixed(2) + " (BR-144).") : OK;
    },
    // BR-145 (Proposed): rejected or returned attempts are kept, never retried; an invalid mandate stops collection
    bizRule145: function (result, reason) { return { payment: result === "accepted", retry: false, cancelOrder: /mandate/i.test(reason || "") }; },
    // BR-146 (Interim design): the second GIRO rejection in the same calendar month adds the fee
    bizRule146: function (history, member, month) { return history.filter(function (c) { return c.member === member && c.month === month && c.status === "rejected"; }).length >= 2; },
    // BR-147 (Interim design): a returned cheque reopens what it paid
    bizRule147: function (payment) { return payment.allocations.map(function (a) { return { rec: a.rec, amount: a.amount }; }); },
    // BR-148 (Interim design): spending credit expires after its months through a non-cash adjustment, never a refund
    bizRule148: function (grantDate, months, today) { return addMonths(grantDate, months) <= today; },
    // BR-149 (Confirmed): a deposit refund after the outstanding is offset
    bizRule149: function (deposit, outstanding) { return this.r2(Math.max(0, deposit - outstanding)); },
    // BR-150 (Interim design): the approval band of the refund matrix
    bizRule150: function (amount, matrix) { return matrix.filter(function (b) { return b.upTo === null || amount <= b.upTo; })[0]; },
    // BR-151 (Proposed): each part back to its source; in-house credit restored to the member account, never cash
    bizRule151: function (parts) { return parts.map(function (p) { return { source: p.source, amount: p.amount, settle: p.source === "In-house credit" ? "restored to the member account" : "refunded to " + p.source }; }); },
    // BR-152 (Interim design): recognise per night (resort stays) or on delivery (events); no second GST
    bizRule152: function (dr, date) {
      if (dr.basis === "Per night") return dr.recognised < dr.total ? this.r2(Math.min(dr.total - dr.recognised, dr.perUnit || dr.total / dr.units)) : 0;
      return dr.delivered && dr.delivered <= date ? this.r2(dr.total - dr.recognised) : 0;
    },
    // BR-153 (Interim design): amortise only with zero unexplained variance
    bizRule153: function (recon) { return recon.status === "variance" ? fail("The entrance-fee reconciliation shows S$" + recon.variance.toFixed(2) + " unexplained: amortisation cannot run (BR-153).") : OK; },
    // BR-154 (Interim design): zero tolerance apart from S$0.01; a timing difference is recorded, not absorbed
    bizRule154: function (expected, actual, timing, tol) { var v = this.r2(expected - actual - (timing || 0)); return Math.abs(v) <= tol ? { ok: true, msg: "", variance: v } : { ok: false, variance: v, msg: "Unexplained variance S$" + Math.abs(v).toFixed(2) + ": not complete (BR-154)." }; },
    // BR-155 (Confirmed): a clearing flow must reach zero
    bizRule155: function (flow) { return flow.residual ? fail(flow.id + ": residual S$" + flow.residual.toFixed(2) + ", " + flow.missing + " (BR-155).") : OK; },
    // BR-156 (Interim design): the batch close compares expected with counted by tender
    bizRule156: function (expected, counted) { var R2 = this.r2; return Object.keys(expected).map(function (k) { return { tender: k, expected: expected[k], counted: counted[k] || 0, variance: R2((counted[k] || 0) - expected[k]) }; }); },
    // BR-157 (Proposed): a Finance-owned correction only, linked to the original
    bizRule157: function (e) { return !e ? fail("Choose the financial event to adjust (BR-157).") : e.status === "returned" ? fail(e.id + " is a source error: " + e.module + " corrects it (BR-157).") : OK; },
    // BR-158 (Confirmed): a credit-limit override needs override authority
    bizRule158: function (role) { return role === "finapprover" ? OK : fail("Only the Finance Approver has credit-limit override authority (BR-158)."); },
    // BR-159 (Proposed): post into an Open period; a late item goes to the open period with its source date kept
    bizRule159: function (sourceDate, periods) {
      var name = MON[+sourceDate.slice(5, 7) - 1] + " " + sourceDate.slice(0, 4), p = periods.filter(function (x) { return x.name === name; })[0];
      if (p && p.status !== "closed") return { ok: true, msg: "", period: p, late: false };
      var open = periods.filter(function (x) { return x.status !== "closed"; })[0];
      return { ok: false, period: open, late: true, msg: name + " is Closed: posted to " + open.name + " with source date " + fdateR(sourceDate) + " kept (BR-159)." };
    },
    // BR-160 (Interim design): only posted lines with no open blocking exception, controls rechecked
    bizRule160: function (e, exceptions) { return e.status === "posted" && !e.batch && !exceptions.some(function (x) { return x.ref === e.id && x.blocking && x.status !== "closed"; }) && this.bizRule138(e.legs.slice()).ok; },
    // BR-161 (TBC): a scheduled run runs once a day; a later run never re-stages
    bizRule161: function (batches, date, run) { return run !== "adhoc" && batches.some(function (b) { return b.date === date && b.run === +run; }) ? fail("Run " + run + " already ran today: use the next run or an ad-hoc run (BR-161).") : OK; },
    // BR-162 (Interim design): a batch is finalised only when every line is accepted
    bizRule162: function (results) { var rej = results.filter(function (r) { return r === "rejected"; }).length; return rej ? (rej === results.length ? "rejected" : "partial") : "finalised"; },
    // BR-163 (Interim design): an exception closes only when resolved or recorded as a reconciling item
    bizRule163: function (x) { return x.status === "resolved" || x.reconciling ? OK : fail(x.id + " is still " + x.status + ": resolve it first (BR-163)."); },
    // BR-164 (Interim design): the stage by the age of the oldest eligible overdue amount
    bizRule164: function (open, today, P) {
      var due = open.filter(function (r) { return r.open > 0 && r.due < today; }).map(function (r) { return r.due; }).sort()[0];
      if (!due) return { stage: open.some(function (r) { return r.open > 0; }) ? "current" : "closed", days: 0 };
      var days = Math.round((d(today) - d(due)) / 864e5);
      return { stage: days >= P.escalated ? "escalated" : days >= P.final ? "final" : days >= P.r2 ? "r2" : days >= P.r1 ? "r1" : "current", days: days };
    },
    // BR-165 (Interim design): FIN-OPS escalates to Membership; it never changes a membership
    bizRule165: function (stage) { return { escalate: stage === "escalated", changeMembership: false }; },
    // BR-166 (Interim design): an active debtor and a Finance-originated use case
    bizRule166: function (debtor, useCase, amount) {
      if (!debtor) return fail("Choose the General Debtor (BR-166).");
      if (debtor.status !== "active") return fail(debtor.name + " is inactive: no new invoice (BR-166).");
      if (useCase === "module") return fail("This charge has an operational source: bill it in its module (BR-166).");
      return amount > 0 ? OK : fail("Enter the invoice amount (BR-166).");
    },
    // BR-167 (Interim design): a credit note is linked, reasoned, at the original rate and never above what is open
    bizRule167: function (inv, amount, reason) {
      if (!inv || inv.kind !== "invoice") return fail("A credit note must reference an issued invoice (BR-167).");
      if (!String(reason || "").trim()) return fail("Record the reason for the note (BR-167).");
      return amount > 0 && amount <= inv.open ? OK : fail("The credit note must be above zero and at most the open S$" + inv.open.toFixed(2) + " (BR-167).");
    },
    // BR-168 (Interim design): generate when the billing date is reached
    bizRule168: function (ra, today) { return ra.status === "active" && ra.next <= today && (!ra.end || ra.next <= ra.end); },
    // BR-169 (Interim design): the ageing bucket by due date; interest is off
    bizRule169: function (due, today) { var n = Math.round((d(today) - d(due)) / 864e5); return n <= 0 ? "Not due" : n <= 30 ? "1 – 30" : n <= 60 ? "31 – 60" : n <= 90 ? "61 – 90" : "Over 90"; },
    // BR-170 (Interim design): a reprint keeps the reference and is audited
    bizRule170: function (docRef, list, by, at) { list.push({ at: at, by: by }); return docRef; },


    bizRule084: function (roles, role, labels) {
      if (!roles.length) return OK;
      if (!role) return fail("This tab has no role. Open this page from the launcher (BR-084).");
      return roles.indexOf(role) >= 0 ? OK : fail("This page is for " + roles.map(function (k) { return labels[k]; }).join(" and ") + ".");
    },

    // BR-085: a Member tab reads only its own account
    bizRule085: function (tabAccount, ref) { return tabAccount && tabAccount === ref ? OK : fail("This Member tab can only see its own account (BR-085)."); },

    // BR-171: a valid e-mail and a Singapore mobile (+65, 8 digits starting 8 or 9)
    bizRule171: function (p) {
      if (p.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) return fail("Email must be a valid address (BR-171).");
      if (p.mobile && !/^\+65 ?[89]\d{3} ?\d{4}$/.test(p.mobile)) return fail("Mobile must be +65 and 8 digits starting 8 or 9 (BR-171).");
      return OK;
    },

    // BR-172: a date of birth is not in the future; a period's end is after its start
    bizRule172: function (dob, today, from, to) {
      if (dob && dob > today) return fail("Date of birth cannot be in the future (BR-172).");
      if (from && to && to <= from) return fail("The end date must be after the start date (BR-172).");
      return OK;
    },

    // BR-173: a new or rejoining membership starts on the 1st of the month after the fee is paid
    bizRule173: function (paidOn) { return addMonths(paidOn.slice(0, 8) + "01", 1); },

    // BR-174: expiry = start + the type's term in months (the day before), moved out by approved absent months
    bizRule174: function (start, termYears, absentMonths) { return addDays(addMonths(start, termYears * 12 + (absentMonths || 0)), -1); },

    // BR-175: only a Draft or Pending Documents request can be edited, and only by the person who created it
    bizRule175: function (request, userName) {
      if (["draft", "pendingDocuments"].indexOf(request.status) < 0) return fail("A submitted request is read-only until it is returned for correction (BR-175).");
      return request.createdByName === userName ? OK : fail("Only the person who created this request can edit it (BR-175).");
    },

    // BR-176: reject and return for correction need a reason
    bizRule176: function (reason) { return String(reason || "").trim() ? OK : fail("A reason is needed (BR-176)."); },

    // BR-177: one append-only history entry per material action
    bizRule177: function (at, actor, role, action, from, to, comment) { return { at: at, actor: actor, role: role, action: action, from: from || null, to: to || null, comment: comment || "" }; },

    // BR-006 (v07): only an Approver confirms a fee payment or records it failed, never on a request they created (the Finance stub of BR-178 is retired: the payment is a FIN-OPS Payment, RC-147)
    bizRule006Confirm: function (request, role, userName) {
      if (role !== "approver") return fail("Only an Approver confirms a fee payment (BR-006).");
      return request.createdByName === userName ? fail("You submitted this request: another Approver confirms its payment (BR-005).") : OK;
    }
  };
})();
