/* checks.js: self-check of the logic (CLAUDE.md, Coding rules). One pass and one fail case per BR-xxx function in rules.js,
   and one allowed and one blocked role per transition in workflow.js, on a copy of the seed (the stored data is never touched).
   Run from checks.html (not linked from the app). Build: full-build-v08 · Version: v08 · KO: KO-037 · from v07 */
var Checks = (function () {
  var S = JSON.parse(JSON.stringify(window.SEED)), C = S.config, T = S.meta.today, R = Rules, out = [];
  function check(id, name, cond) { out.push({ id: id, name: name, ok: !!cond }); }
  function mem(id) { return S.memberships.filter(function (m) { return m.membershipId === id; })[0]; }
  function per(id) { return S.persons.filter(function (p) { return p.id === id; })[0]; }
  function type(c) { return C.membershipTypes.filter(function (t) { return t.code === c; })[0]; }
  function rq(id) { return S.requests.filter(function (r) { return r.id === id; })[0]; }

  check("BR-001", "ID from the surname and given name initials", R.bizRule001({ fullName: "Applicant V. Seah" }, null, 10030) === "SV10030");
  check("BR-001", "ID from the sponsor's first two words", R.bizRule001(null, "Example Engineering Pte Ltd", 7) === "EE00007");
  check("BR-002", "open application for P-020 / ORD-B blocks a second", !R.bizRule002(S.requests, "P-020", "ORD-B").ok);
  check("BR-002", "another type is allowed", R.bizRule002(S.requests, "P-020", "ORD-F").ok);
  check("BR-003", "W. Pang (born 2007) is too young for Ordinary Full", !R.bizRule003(per("P-022"), type("ORD-F"), T).ok);
  check("BR-003", "V. Seah is eligible for Ordinary Full", R.bizRule003(per("P-021"), type("ORD-F"), T).ok);
  check("BR-004", "a missing document blocks", !R.bizRule004([{ name: "ID copy", received: false }]).ok);
  check("BR-004", "all documents received passes", R.bizRule004([{ name: "ID copy", received: true }]).ok);
  check("BR-005", "the Approver cannot decide RQ-1018, which the Approver created", !R.bizRule005(rq("RQ-1018"), "approver", "Approver P. Ng").ok);
  check("BR-005", "the Approver decides RQ-1001", R.bizRule005(rq("RQ-1001"), "approver", "Approver P. Ng").ok);
  check("BR-005", "an Approver cannot decide a Manager-routed request", !R.bizRule005({ route: "manager", createdByName: "x" }, "approver", "Approver P. Ng").ok);
  check("BR-006", "a pending payment blocks completion", !R.bizRule006({ status: "pending" }).ok);
  check("BR-006", "a confirmed payment passes", R.bizRule006({ status: "confirmed" }).ok);
  check("BR-007", "a referral without a referrer is blocked", !R.bizRule007("Referral", "", S.memberships).ok);
  check("BR-007", "a referral by active TA10001 passes", R.bizRule007("Referral", "TA10001", S.memberships).ok);
  check("BR-008", "TH10008 renewing 2 years goes over the 30-year cap", !R.bizRule008(mem("TH10008"), type(mem("TH10008").typeCode), R.addMonths(mem("TH10008").expiryDate, 24), 30).ok);
  check("BR-008", "LB10002 renewing 1 year is within the cap", R.bizRule008(mem("LB10002"), type("ORD-F"), R.addMonths(mem("LB10002").expiryDate, 12), 30).ok);
  check("BR-009", "a renewal not requested by the member is blocked", !R.bizRule009(mem("KD10004"), false).ok);
  check("BR-009", "KD10004 renewing on request passes", R.bizRule009(mem("KD10004"), true).ok);
  check("BR-010", "Full to Basic doubles 15 months to 30", R.bizRule010(15, "full", "basic") === 30);
  check("BR-010", "Basic to Full halves 15 months to 7", R.bizRule010(15, "basic", "full") === 7);
  check("BR-011", "a corporate type is not transferable", !R.bizRule011(type("CORP-C"), per("P-023"), T).ok);
  check("BR-011", "Ordinary Full to X. Lim passes", R.bizRule011(type("ORD-F"), per("P-023"), T).ok);
  check("BR-012", "an 18-month extension routes to the Manager", R.bizRule012(18, C.limits).route === "manager");
  check("BR-012", "a 30-month extension is blocked", !R.bizRule012(30, C.limits).ok);
  check("BR-013", "a withdrawal not from the member is blocked", !R.bizRule013(false).ok);
  check("BR-013", "a member's withdrawal passes with no refund", R.bizRule013(true).refund === 0);
  check("BR-014", "ON10014 is past its expiry", R.bizRule014Expired(mem("ON10014"), T));
  check("BR-014", "LB10002 is not expired", !R.bizRule014Expired(mem("LB10002"), T));
  check("BR-014", "only Expired or Withdrawn can rejoin", !R.bizRule014Rejoin(mem("LB10002")).ok && R.bizRule014Rejoin(mem("PA10023")).ok);
  check("BR-015", "a goodwill refund routes to the Manager", R.bizRule015(5000) === "manager" && R.bizRule015(0) === "approver");
  check("BR-016", "GI10009's 2025 period overlaps", !R.bizRule016(mem("GI10009"), "2025-06-01", "2025-12-31", C.limits).ok);
  check("BR-016", "a 30-month absent period is blocked", !R.bizRule016(mem("GI10009"), "2027-01-01", "2029-06-30", C.limits).ok);
  check("BR-016", "a 6-month absent period passes", R.bizRule016(mem("GI10009"), "2027-01-01", "2027-06-30", C.limits).months === 6);
  check("BR-016", "OC10027's absent period has ended", R.periodEnded(mem("OC10027"), T));
  check("BR-017", "a 13-month medical period is blocked", !R.bizRule017("2026-11-01", "2027-11-30", C.limits).ok);
  check("BR-017", "a 6-month medical period passes", R.bizRule017("2026-11-01", "2027-04-30", C.limits).ok);
  check("BR-018", "Expired to Suspended is not in the matrix", !R.bizRule018("expired", "suspended", C.transitions).ok);
  check("BR-018", "Active to Suspended is allowed", R.bizRule018("active", "suspended", C.transitions).ok);
  check("BR-019", "Suspended: privileges off, billing on", !R.bizRule019("suspended", C.privileges).privileges && R.bizRule019("suspended", C.privileges).billing);
  check("BR-020", "an inactive principal blocks a supplementary", !R.bizRule020(mem("PA10023")).ok && R.bizRule020(mem("LB10002")).ok);
  check("BR-021", "a junior aged 21 is ended; NQ10017 is on the watch list", R.bizRule021({ dateOfBirth: "2005-01-01" }, T, 21) && !!R.bizRule021Watch(per(mem("NQ10017").personId), T, 21, 6));
  check("BR-022", "SL10019 (Group D, 1 nominee) has no room", !R.bizRule022(mem("SL10019"), type("CORP-D")).ok);
  check("BR-022", "EE10018 (Group C, limit 2) has room; only the Administrator creates corporate", R.bizRule022(mem("EE10018"), type("CORP-C")).ok && !R.bizRule022Corporate("officer").ok && R.bizRule022Corporate("admin").ok);
  check("BR-023", "LB10002 available credit 5,000 − 1,200 = 3,800", R.bizRule023(mem("LB10002").contract, { available: S.finance.available, outstanding: { LB10002: S.receivables.filter(function (r) { return r.member === "LB10002"; }).reduce(function (a, r) { return a + r.open; }, 0) } }, "LB10002").available === 3800);  // (v07) the balance is the FIN-OPS receivables
  check("BR-023", "balances unavailable blocks the check", !R.bizRule023(mem("LB10002").contract, { available: false, outstanding: {} }, "LB10002").ok);
  check("BR-024", "LB10002 has 4 vehicles: a fifth is blocked", !R.bizRule024(mem("LB10002"), S.vehicles, C.limits.vehicleLimit).ok);
  check("BR-024", "KD10004 can register a vehicle", R.bizRule024(mem("KD10004"), S.vehicles, C.limits.vehicleLimit).ok);
  check("BR-025", "cards only for Active memberships", !R.bizRule025(mem("PA10023")).ok && R.bizRule025(mem("LB10002")).ok);
  var mk = R.bizRule026(S.persons, "marketing");
  check("BR-026", "marketing excludes the 6 persons without consent; service sends to all", mk.excluded.length === 6 && R.bizRule026(S.persons, "service").excluded.length === 0);
  check("BR-027", "an empty mobile is blocked", !R.bizRule027(Object.assign({}, per("P-002"), { mobile: "" })).ok && R.bizRule027(per("P-002")).ok);
  check("BR-028", "FAM is referenced, so it cannot be deleted", !R.bizRule028("FAM", S.memberships, S.requests).ok && R.bizRule028("XYZ", S.memberships, S.requests).ok);
  check("BR-029", "a 2-year renewal fee is S$2,280; an 18-month extension is S$1,800", R.bizRule029({ type: "renewal", details: { years: 2 } }, C) === 2280 && R.bizRule029({ type: "extension", details: { months: 18 } }, C) === 1800);
  check("BR-030", "CMP-01 is active on 28 Oct 2026, none in 2027", !!R.bizRule030(C.campaigns, T) && !R.bizRule030(C.campaigns, "2027-02-01"));
  // (v02) Club Reporting rules
  var AR = S.accessRules, rp = function (id) { return S.reports.filter(function (x) { return x.id === id; })[0]; };
  var LBL = { officer: "Membership Officer", approver: "Approver", manager: "Membership Manager", admin: "Membership Administrator" };
  check("BR-031", "the Officer runs MMS-RR-003 but not MMS-RR-002 or the audit review", R.bizRule031(AR, "officer", rp("MMS-RR-003")).ok && !R.bizRule031(AR, "officer", rp("MMS-RR-002")).ok && !R.bizRule031(AR, "officer", rp("MMS-RR-007")).ok);
  check("BR-031", "the Manager runs the audit review and the golf reports (v03); the Approver runs nothing", R.bizRule031(AR, "manager", rp("MMS-RR-007")).ok && R.bizRule031(AR, "manager", rp("GMS-RR-001")).ok && !R.bizRule031(AR, "approver", rp("MMS-RR-001")).ok);
  check("BR-031", "granting: MMS-RR-002 to the Officer passes, the audit review to the Officer is refused", R.bizRule031(AR, "officer", rp("MMS-RR-002"), true).ok && !R.bizRule031(AR, "officer", rp("MMS-RR-007"), true).ok);
  check("BR-032", "an empty required From is refused; the default passes", !R.bizRule032(rp("MMS-RR-004").params, { from: "" }).ok && R.bizRule032(rp("MMS-RR-004").params, { from: "2026-08-01" }).ok);
  check("BR-032", "0 days and To before From are refused", !R.bizRule032(rp("MMS-RR-003").params, { days: "0" }).ok && !R.bizRule032(rp("MMS-RR-007").params, { from: "2026-10-31", to: "2026-10-01" }).ok);
  check("BR-033", "no rows is a valid empty result; rows are a normal result", R.bizRule033([]).ok && R.bizRule033([]).empty && !R.bizRule033([1]).empty);
  check("BR-034", "MMS-RR-003 can be exported; the audit review cannot", R.bizRule034(rp("MMS-RR-003")).ok && !R.bizRule034(rp("MMS-RR-007")).ok);
  var def = { name: "Expiring Ordinary members", base: "MMS-RR-003", effectiveFrom: "2026-11-01", roles: ["manager", "admin"] };
  check("BR-035", "a definition for the Manager and Administrator passes; adding the Approver is refused", R.bizRule035(def, S.reports, AR, LBL).ok && !R.bizRule035(Object.assign({}, def, { roles: ["manager", "approver"] }), S.reports, AR, LBL).ok);
  check("BR-035", "a golf audit base opened to Golf Operations, or a missing effective date, is refused", !R.bizRule035(Object.assign({}, def, { base: "GMS-RR-010", roles: ["golfops"] }), S.reports, AR, LBL).ok && !R.bizRule035(Object.assign({}, def, { effectiveFrom: "" }), S.reports, AR, LBL).ok);
  check("BR-031", "(v03) Golf Operations runs GMS-RR-001 but not the golf audit GMS-RR-010 or a Membership report", R.bizRule031(AR, "golfops", rp("GMS-RR-001")).ok && !R.bizRule031(AR, "golfops", rp("GMS-RR-010")).ok && !R.bizRule031(AR, "golfops", rp("MMS-RR-001")).ok);
  check("BR-034", "(v03) GMS-RR-001 can be exported; the golf audit GMS-RR-010 cannot", R.bizRule034(rp("GMS-RR-001")).ok && !R.bizRule034(rp("GMS-RR-010")).ok);
  // (v03) Golf rules BR-036 – BR-060: one pass and one fail case each, on the seed's golf data at the demo clock
  var G = C.golf, CL = G.clock, gp = function (pid) { return S.golfers.filter(function (g) { return g.personId === pid; })[0]; }, gg = function (id) { return S.guests.filter(function (g) { return g.id === id; })[0]; };
  var tt = R.bizRule036(G);
  check("BR-036", "tee times every " + G.intervalMinutes + " minutes per session; 9 holes only on weekday mornings 07:01 – 07:57", tt.length > 20 && tt[0].time === "07:00" && R.bizRule036Holes(9, "Weekday", "07:16", G).ok && !R.bizRule036Holes(9, "Weekend", "07:16", G).ok && !R.bizRule036Holes(9, "Weekday", "08:08", G).ok);
  check("BR-037", "online booking closes 2 hours before tee-off; the counter may book later", !R.bizRule037(T, "13:04", "Portal", T, CL, G).ok && R.bizRule037(T, "13:04", "Counter", T, CL, G).ok && R.bizRule037("2026-11-03", "12:48", "Portal", T, CL, G).ok);
  var p1 = { kind: "member", personId: "P-001", membershipId: "TA10001", name: "A. Tan" };
  check("BR-038", "a golfer with a booking that day cannot hold a second session", !R.bizRule038([p1], "2026-10-28", S.golfBookings, S.waitlist).ok && R.bizRule038([p1], "2026-11-20", S.golfBookings, S.waitlist).ok);
  check("BR-039", "a weekday flight of 1 and a flight of 5 are refused; 2 on a weekday passes", !R.bizRule039(1, "Weekday", G).ok && !R.bizRule039(5, "Weekday", G).ok && R.bizRule039(2, "Weekday", G).ok && !R.bizRule039(2, "Weekend", G).ok);
  check("BR-040", "a suspended member (YB10024) cannot use golf privileges; an Active one can", !R.bizRule040(mem("YB10024"), "B. Yap", C.privileges).ok && R.bizRule040(mem("TA10001"), "A. Tan", C.privileges).ok);
  check("BR-041", "a Basic main booker is refused on a weekend; a Full main booker passes", !R.bizRule041([{ category: "Basic member" }], "Weekend").ok && R.bizRule041([{ category: "Full member" }, { category: "Basic member" }], "Weekend").ok && R.bizRule041([{ category: "Basic member" }], "Weekday").ok);
  check("BR-042", "4 guests or a guest without a handicap are refused; 1 guest with a handicap passes", !R.bizRule042([gg("GG-01"), gg("GG-02"), gg("GG-05"), gg("GG-06")], 46, "Kranji", "2026-11-03", "12:48", G).ok && !R.bizRule042([gg("GG-04")], 46, "Kranji", "2026-11-03", "12:48", G).ok && R.bizRule042([gg("GG-06")], 46, "Changi", "2026-11-03", "12:48", G).ok);
  check("BR-043", "a female HI 30 plays any time; no handicap and no PC is refused", R.bizRule043(gp("P-004"), "D. Koh", "2026-10-31", "Weekend", "08:00", G).ok && !R.bizRule043({ hi: null, pc: null }, "X", "2026-11-03", "Weekday", "12:48", G).ok);
  check("BR-043", "only a CC-Demo PC counts", R.bizRule043Pc("CC-Demo").ok && !R.bizRule043Pc("Another club").ok);
  var wl = [{ party: 4, status: "waiting", joinedAt: "1" }, { party: 2, status: "waiting", joinedAt: "2" }], nx = R.bizRule044(wl, 2);
  check("BR-044", "2 free places skip the party of 4 and offer the party of 2", nx.offer === wl[1] && nx.skipped.length === 1 && !R.bizRule044(wl, 1).offer);
  check("BR-045", "a course change needs equivalent capacity and no block", R.bizRule045(4, 2, null).ok && !R.bizRule045(1, 2, null).ok && !R.bizRule045(4, 2, { purpose: "Maintenance" }).ok);
  check("BR-046", "less than 72 hours is late; more is on time", R.bizRule046("2026-10-30", "07:08", T, CL, G).late && !R.bizRule046("2026-11-02", "07:24", T, CL, G).late);
  check("BR-047", "the requester cannot decide; only the Manager decides, with a reason", !R.bizRule047({ requestedBy: "Manager M. Koh" }, "Manager M. Koh", true, "ok").ok && !R.bizRule047({ requestedBy: "Golf Operations G. Lim" }, "Golf Operations G. Lim", false, "ok").ok && !R.bizRule047({ requestedBy: "Golf Operations G. Lim" }, "Manager M. Koh", true, " ").ok && R.bizRule047({ requestedBy: "Golf Operations G. Lim" }, "Manager M. Koh", true, "Medical certificate").ok);
  check("BR-048", "check-in 29 minutes before tee-off passes; 13 minutes is late", R.bizRule048("12:24", CL, G).ok && !R.bizRule048("12:08", CL, G).ok);
  check("BR-049", "no cover and no day insurance is refused; day insurance passes", !R.bizRule049("none", false, "F. Chua").ok && R.bizRule049("none", true, "F. Chua").ok && R.bizRule049("annual", false, "A. Tan").ok);
  check("BR-050", "an affiliated guest without proof pays the sign-in rate; with proof keeps the special rate", R.bizRule050(gg("GG-03"), G) === "Sign-in guest" && R.bizRule050(gg("GG-02"), G) === "Affiliated club guest");
  check("BR-051", "a late golfer moves to a free tee time within 30 minutes; with none, join-in or no-show", R.bizRule051("12:08", ["12:16"], G).option === "reschedule" && R.bizRule051("12:08", [], G).option !== "reschedule");
  check("BR-052", "only the Golf Manager controls a course", R.bizRule052(true).ok && !R.bizRule052(false).ok);
  check("BR-053", "front nine gives a rain check; not teed off gives the refund path; finished gives none", R.bizRule053("front9", 18) === "rainCheck" && R.bizRule053("notTeedOff", 18) === "refund" && R.bizRule053("finished", 18) !== "rainCheck");
  check("BR-054", "a rain check issued 28 Oct 2026 expires 28 Nov 2026; it cannot be used by another golfer", R.bizRule054(T, G) === "2026-11-28" && !R.bizRule054Usable({ id: "RCK-1", personId: "P-008", status: "available", expiry: "2026-11-28" }, "P-001", "2026-11-03").ok && R.bizRule054Usable({ id: "RCK-1", personId: "P-008", status: "available", expiry: "2026-11-28" }, "P-008", "2026-11-03").ok);
  check("BR-055", "a 9-hole rain check on an 18-hole round leaves the top-up only", R.bizRule055(55, 28) === 27 && R.bizRule055(28, 55) === 0);
  check("BR-056", "an unknown golfer or HI 58 is rejected; a known row with HI 22.1 passes", !R.bizRule056({ sgaNo: "SGA-19999", gender: "M", hi: 20 }, null).ok && !R.bizRule056({ sgaNo: "SGA-10008", gender: "M", hi: 58 }, {}).ok && R.bizRule056({ sgaNo: "SGA-10009", gender: "M", hi: 22.1 }, {}).ok);
  check("BR-057", "a blocked tee time cannot be booked; a session with bookings cannot be blocked", !R.bizRule057({ purpose: "Maintenance", source: "CC-0433" }).ok && R.bizRule057(null).ok && !R.bizRule057Block([{}], "Maintenance", "CC-0433").ok && R.bizRule057Block([], "Maintenance", "CC-0433").ok && !R.bizRule057Block([], "Maintenance", "").ok);
  check("BR-058", "the rate comes from course, category and holes", R.bizRule058(G, "Changi", "Full member", 18) === 60 && R.bizRule058(G, "Kranji", "Basic member", 9) === 19);
  check("BR-059", "(v07) FIN-OPS accepts member-account charges; unavailable Finance refuses them", R.bizRule059(true).status === "accepted" && !R.bizRule059(false).ok);
  check("BR-060", "(v07) the open items stay flagged at shift close (4 pending in FIN-OPS, 1 returned, 1 pending waiver)", R.bizRule060(S.golfCharges, S.golfApprovals, []) === 6);

  // (v04) Events rules BR-061 – BR-083: one pass and one fail case each, on the seed's event data at the demo clock
  var EC = C.events, NOWC = T + " " + G.clock, evx = function (id) { return S.events.filter(function (e) { return e.id === id; })[0]; }, er = function (id) { return S.eventRegistrations.filter(function (r) { return r.id === id; })[0]; };
  check("BR-061", "the draft EV-08 without rates or window is refused; only the Events Team publishes", !R.bizRule061(evx("EV-08"), "events").ok && !R.bizRule061(evx("EV-03"), "golfops").ok && R.bizRule061(evx("EV-03"), "events").ok);
  check("BR-062", "EV-01 is open at the demo clock; EV-04's window has closed", R.bizRule062(evx("EV-01"), NOWC).ok && !R.bizRule062(evx("EV-04"), NOWC).ok);
  check("BR-063", "a non-member is refused for a members-only event; an Active member passes; a suspended member is refused", !R.bizRule063(evx("EV-03"), { kind: "nonMember", name: "X" }).ok && R.bizRule063(evx("EV-03"), { kind: "member", status: "active", name: "A" }).ok && !R.bizRule063(evx("EV-03"), { kind: "member", status: "suspended", name: "B" }).ok);
  check("BR-064", "a child under 12 pays the member child rate; an adult the member adult rate", R.bizRule064Category({ kind: "member", dateOfBirth: "2017-03-14" }, "2026-10-31", EC.childUnder) === "memberChild" && R.bizRule064(evx("EV-01"), "memberChild") === 15 && R.bizRule064(evx("EV-01"), "memberAdult") === 25);
  check("BR-065", "one ineligible participant refuses the whole group; an all-eligible group passes", !R.bizRule065(evx("EV-01"), [{ ok: true }, { ok: false, msg: "x" }], 2).ok && R.bizRule065(evx("EV-01"), [{ ok: true }, { ok: true }], 2).ok);
  check("BR-066", "a full EV-03 refuses one more; spare places pass", !R.bizRule066(evx("EV-03"), 6, 1).ok && R.bizRule066(evx("EV-03"), 4, 2).ok);
  check("BR-067", "a hold at 11:55 lasts until 12:10", R.bizRule067(NOWC, EC.holdMinutes) === T + " 12:10");
  check("BR-068", "a declined payment refuses; a member account needs available credit", !R.bizRule068("online", false, null, 25).ok && R.bizRule068("online", true, null, 25).ok && !R.bizRule068("memberAccount", true, { ok: true, available: 10 }, 25).ok);
  check("BR-069", "a full event with a waitlist accepts the group; one without refuses", R.bizRule069(evx("EV-03")).ok && !R.bizRule069(evx("EV-01")).ok);
  var wq = [{ status: "waitlisted", joinedAt: "1", participants: [{ status: "w" }, { status: "w" }, { status: "w" }] }, { status: "waitlisted", joinedAt: "2", participants: [{ status: "w" }] }];
  check("BR-070", "one free place skips the group of 3 and offers the single", R.bizRule070(wq, 1, function () { return true; }) === wq[1]);
  check("BR-071", "an offer lasts 24 hours", R.bizRule071(NOWC, EC.offerHours) === "2026-10-29 11:55");
  check("BR-072", "a QR credential is EQ-nnnn", R.bizRule072(34) === "EQ-0034");
  check("BR-073", "a confirmed code checks in once; the second time is refused", R.bizRule073("EQ-0011", "EV-04-S3", S.eventRegistrations, []).ok && !R.bizRule073("EQ-0011", "EV-04-S3", S.eventRegistrations, [{ qr: "EQ-0011", sessionId: "EV-04-S3" }]).ok && !R.bizRule073("EQ-9999", "EV-04-S3", S.eventRegistrations, []).ok);
  var r15 = er("ER-0015");
  check("BR-074", "manual check-in needs a confirmed registration and a reason", R.bizRule074(r15, r15.participants[0], "Phone battery flat").ok && !R.bizRule074(r15, r15.participants[0], " ").ok);
  check("BR-075", "personnel attendance is recorded once per session", R.bizRule075([], "EV-04-S3", "PS-01").ok && !R.bizRule075([{ sessionId: "EV-04-S3", personnelId: "PS-01" }], "EV-04-S3", "PS-01").ok);
  check("BR-076", "EV-05 with 3 confirmed against a minimum of 10 is not met", !R.bizRule076(evx("EV-05"), 3).met && R.bizRule076(evx("EV-05"), 10).met);
  var r5 = er("ER-0005");
  check("BR-077", "a confirmed participant cancels and forfeits the amount; a waitlisted one cannot", R.bizRule077(r5, r5.participants[1]).ok && R.bizRule077(r5, r5.participants[1]).forfeit === r5.participants[1].rate && !R.bizRule077(er("ER-0010"), er("ER-0010").participants[0]).ok);
  var rf = { proposedBy: "Events Team E. Koh", paid: 60 };
  check("BR-078", "the Manager authorises within the paid amount; the proposer or another role cannot", R.bizRule078(rf, "manager", "Manager M. Koh", 30).ok && !R.bizRule078(rf, "events", "Events Team E. Koh", 30).ok && !R.bizRule078(Object.assign({}, rf, { proposedBy: "Manager M. Koh" }), "manager", "Manager M. Koh", 30).ok && !R.bizRule078(rf, "manager", "Manager M. Koh", 70).ok);
  check("BR-079", "a session with confirmed participants is rescheduled through the club path", R.bizRule079(evx("EV-06").sessions[0], "2026-11-14", "19:00", 8).ok && /BR-079/.test(R.bizRule079(evx("EV-06").sessions[0], "2026-11-14", "19:00", 8).msg));
  check("BR-080", "a confirmed message confirms a known booking; an unknown reference changes nothing", R.bizRule080({ type: "confirmed", ref: "FRB-2041", eventId: "EV-07" }, S.roomBookings[0]).status === "confirmed" && !R.bizRule080({ type: "confirmed", ref: "FRB-9999", eventId: null }, undefined).ok);
  check("BR-081", "a price change applies to new registrations only", /new registrations only/.test(R.bizRule081(["Price"]).msg) && R.bizRule081([]).ok);
  check("BR-082", "capacity cannot go below committed places", !R.bizRule082(4, 6).ok && R.bizRule082(6, 6).ok);
  check("BR-083", "EV-09 (24 Oct) is completed at the demo clock; EV-07 (8 Nov) is not", R.bizRule083(evx("EV-09"), NOWC) && !R.bizRule083(evx("EV-07"), NOWC));

  // (v05) Facilities rules BR-086 – BR-106: one pass and one fail case each, on the seed's facility data at the demo clock
  var FC = C.facilities, NOWF = T + " 11:55", HOL = FC.publicHolidays.map(function (h) { return h.date; });
  function fx(code) { return FC.facilities.filter(function (f) { return f.code === code; })[0]; }
  var memA = { category: "member", status: "active", name: "A" }, memS = { category: "member", status: "suspended", name: "S" };
  check("BR-086", "SAFRA may not book Billiards; an Active member may; a suspended member gets no member rate", !R.bizRule086(fx("BIL"), { category: "safra" }).ok && R.bizRule086(fx("BIL"), memA).ok && !R.bizRule086(fx("TEN"), memS).ok && !R.bizRule086(fx("TEN"), null).ok);
  check("BR-087", "Tennis Court 1 Sat 08:00 is taken by FB-0004; Court 2 is free", !R.bizRule087(S.facilityBookings, { resource: "RS-01", date: "2026-10-31", start: "09:00", hours: 1, customer: "TA10001" }).ok && R.bizRule087(S.facilityBookings, { resource: "RS-02", date: "2026-10-31", start: "08:00", hours: 1, customer: "TA10001" }).ok);
  check("BR-087", "the same customer cannot hold two overlapping bookings", !R.bizRule087(S.facilityBookings, { resource: "RS-03", date: "2026-10-31", start: "10:00", hours: 1, customer: "TA10001" }).ok);
  check("BR-088", "Squash Court 2 is blocked today; Court 1 at 15:00 is not", !R.bizRule088(S.resourceBlocks, "RS-09", T, "15:00", 1).ok && R.bizRule088(S.resourceBlocks, "RS-08", T, "15:00", 1).ok);
  check("BR-088", "a new block over FB-0003 flags it", R.bizRule088Flags(S.facilityBookings, { resource: "RS-02", from: "2026-10-29 07:00", to: "2026-10-29 12:00" }).map(function (b) { return b.id; }).join() === "FB-0003");
  check("BR-089", "12 Nov is beyond the 14-day member window; 31 Oct is inside; a past date is refused", !R.bizRule089(fx("TEN"), "member", "2026-11-12", T, true).ok && R.bizRule089(fx("TEN"), "member", "2026-10-31", T, true).ok && !R.bizRule089(fx("TEN"), "member", "2026-10-27", T, true).ok);
  check("BR-090", "Billiards for 4 hours is refused; 3 hours passes; outside opening hours is refused", !R.bizRule090(fx("BIL"), "10:00", 4).ok && R.bizRule090(fx("BIL"), "10:00", 3).ok && !R.bizRule090(fx("TEN"), "21:00", 2).ok);
  check("BR-091", "Saturday Tennis is the weekend member rate S$14; the 2 Nov holiday is a weekend day", R.bizRule091(fx("TEN"), "member", "2026-10-31", HOL, 1).amount === 14 && R.bizRule091(fx("SQU"), "member", "2026-11-02", HOL, 2).amount === 20 && R.bizRule091(fx("TEN"), "member", "2026-10-29", HOL, 1).amount === 10);
  check("BR-092", "a declined payment confirms nothing; a free facility needs no payment; no member account", !R.bizRule092(14, "Card", false).ok && R.bizRule092(0, "Card", false).ok && !R.bizRule092(14, "memberAccount", true).ok);
  check("BR-093", "an extra amount is paid first; a lower amount ≥ 24 h ahead is refunded, < 24 h not", R.bizRule093(10, 20, 100, 24).extra === 10 && R.bizRule093(20, 10, 100, 24).refund === 10 && R.bizRule093(20, 10, 5, 24).refund === 0);
  check("BR-094", "a cancellation without a reason is refused", !R.bizRule094(" ").ok && R.bizRule094("Travel").ok);
  check("BR-095", "≥ 24 h full refund, < 24 h none, club full, moved by the club none", R.bizRule095(10, 72, "customer", 24).refund === 10 && R.bizRule095(30, 5, "customer", 24).refund === 0 && R.bizRule095(10, 2, "club", 24).refund === 10 && R.bizRule095(10, 2, "club", 24, true).refund === 0);
  check("BR-096", "only the Manager approves, never the requester", !R.bizRule096({ requestedBy: "Facilities Staff F. Tan" }, "facilities", "Facilities Staff F. Tan").ok && R.bizRule096({ requestedBy: "Facilities Staff F. Tan" }, "manager", "Manager M. Koh").ok && !R.bizRule096({ requestedBy: "Manager M. Koh" }, "manager", "Manager M. Koh").ok);
  check("BR-097", "FB-0007 started at 10:00, so a no-show can be recorded; FB-0001 (Saturday) cannot", R.bizRule097(S.facilityBookings[6], NOWF).ok && !R.bizRule097(S.facilityBookings[0], NOWF).ok);
  check("BR-098", "the pool at 60 of 60 refuses; at 58 admits; after closing refuses", !R.bizRule098(fx("POOL"), 60, "11:55").ok && R.bizRule098(fx("POOL"), 58, "11:55").ok && !R.bizRule098(fx("POOL"), 10, "21:30").ok);
  check("BR-099", "(v06) in-house stay RR-0002 is a valid pass; ended RR-0007 and future RR-0005 are refused; a non-member without a pass is refused", R.bizRule099({ category: "resortGuest", pass: "RR-0002" }, S.resortReservations, T).ok && !R.bizRule099({ category: "resortGuest", pass: "RR-0007" }, S.resortReservations, T).ok && !R.bizRule099({ category: "resortGuest", pass: "RR-0005" }, S.resortReservations, T).ok && !R.bizRule099({ category: "nonMember" }, S.resortReservations, T).ok && R.bizRule099(memA, [], T).ok);
  check("BR-100", "yesterday's day pass DP-0001 is refused; one sold today passes", !R.bizRule100(S.dayPasses[0], T).ok && R.bizRule100({ code: "DP-0002", date: T }, T).ok);
  check("BR-101", "a sale without a receipt number is refused; with one it passes", !R.bizRule101({ receiptNo: "", amount: 18, method: "Card" }).ok && R.bizRule101({ receiptNo: "BWL-260107", amount: 18, method: "Card" }).ok);
  var rec = R.bizRule102(FC.bowlingSample, S.bowlingTxns, FC.tolerance);
  check("BR-102", "the sample export reconciles 4 and raises 4 exceptions (duplicate, no record, amount, method)", rec.matched.length === 4 && rec.exceptions.map(function (x) { return x.type; }).sort().join() === "amount,duplicate,method,noMatch");
  check("BR-103", "an exception closes only with a reason; a duplicate is not escalated", !R.bizRule103({ status: "open", type: "duplicate" }, "dispose", "").ok && R.bizRule103({ status: "open", type: "duplicate" }, "dispose", "Double scan").ok && !R.bizRule103({ status: "open", type: "duplicate" }, "escalate").ok && R.bizRule103({ status: "open", type: "amount" }, "escalate").ok);
  check("BR-104", "Karaoke has a waiting list when full; Billiards has none; FW-01 is next for Sat 19:00", R.bizRule104(fx("KAR"), true).ok && !R.bizRule104(fx("BIL"), true).ok && !R.bizRule104(fx("KAR"), false).ok && R.bizRule104Next(S.facilityWaitlist, "KAR", "2026-10-31", "19:00").id === "FW-01");
  check("BR-105", "the Billiards 1 – 3 hour limit is locked; a Tennis rate change is valid", !R.bizRule105(fx("BIL"), "maxH", 4).ok && R.bizRule105(fx("TEN"), "rates.member.1", 16).ok && !R.bizRule105(fx("TEN"), "rates.member.1", "").ok);
  check("BR-106", "Personal Training for an Active member only", R.bizRule106(memA).ok && !R.bizRule106({ category: "nonMember" }).ok && !R.bizRule106(memS).ok);
  check("BR-084", "a Member tab cannot open the approvals page", !R.bizRule084(["approver", "manager"], "member", { approver: "Approver", manager: "Membership Manager" }).ok);
  check("BR-084", "the launcher is open to every tab; a tab with no role sees nothing else", R.bizRule084([], null, {}).ok && !R.bizRule084(["officer"], null, {}).ok);
  check("BR-085", "a Member tab reads only its own account", R.bizRule085("KD10004", "KD10004").ok && !R.bizRule085("KD10004", "LB10002").ok);
  check("BR-171", "mobile +65 7000 0001 is blocked; +65 9000 0001 passes", !R.bizRule171({ mobile: "+65 7000 0001" }).ok && R.bizRule171({ mobile: "+65 9000 0001", email: "a@example.com" }).ok);
  check("BR-171", "an e-mail without a domain is blocked", !R.bizRule171({ email: "member01" }).ok);
  check("BR-172", "a future date of birth or an end before the start is blocked", !R.bizRule172("2030-01-01", T).ok && !R.bizRule172(null, T, "2027-01-01", "2026-12-01").ok && R.bizRule172("1990-01-01", T, "2027-01-01", "2027-06-30").ok);
  check("BR-173", "paid on 28 Oct 2026 starts on 1 Nov 2026", R.bizRule173(T) === "2026-11-01");
  check("BR-174", "a 10-year term from 1 Nov 2026 expires 31 Oct 2036; 3 absent months push it to 31 Jan 2037", R.bizRule174("2026-11-01", 10) === "2036-10-31" && R.bizRule174("2026-11-01", 10, 3) === "2037-01-31");
  check("BR-175", "a Pending Approval request is read-only; its creator edits a Pending Documents one", !R.bizRule175(rq("RQ-1001"), "Officer O. Lee").ok && R.bizRule175(rq("RQ-1017"), "Officer O. Lee").ok);
  check("BR-175", "someone else cannot edit a draft", !R.bizRule175(rq("RQ-1015"), "Approver P. Ng").ok);
  check("BR-176", "a blank reason is refused", !R.bizRule176("  ").ok && R.bizRule176("Upload a clearer ID copy").ok);
  var h = R.bizRule177("2026-10-28 10:00", "Approver P. Ng", "approver", "Returned for correction", "Pending Approval", "Pending Documents", "Confirm referrer");
  check("BR-177", "a history entry records actor, role, time, from, to and comment", h.actor && h.role && h.at && h.from && h.to && h.comment);
  check("BR-006", "(v07) only an Approver confirms a fee payment in FIN-OPS, never on their own request (BR-178 retired)", !R.bizRule006Confirm(rq("RQ-1011"), "officer", "Officer O. Lee").ok && R.bizRule006Confirm(rq("RQ-1011"), "approver", "Approver P. Ng").ok && !R.bizRule006Confirm(rq("RQ-1018"), "approver", "Approver P. Ng").ok);

  // Transitions (workflow.js): an allowed and a blocked role per action
  var W = Workflow, draft = rq("RQ-1015"), docs = rq("RQ-1017"), appr = rq("RQ-1001"), pay = rq("RQ-1011");
  check("submit", "the creator submits a Draft; another user cannot", W.can("officer", draft, "submit", "Officer O. Lee").ok && !W.can("approver", draft, "submit", "Approver P. Ng").ok);
  check("edit", "the creator edits a returned request; a submitted one is read-only", W.can("officer", docs, "edit", "Officer O. Lee").ok && !W.can("officer", appr, "edit", "Officer O. Lee").ok);
  check("docs", "the Officer marks documents received; the Approver cannot", W.can("officer", docs, "docs", "Officer O. Lee").ok && !W.can("approver", docs, "docs", "Approver P. Ng").ok);
  check("cancel", "the creator cancels; the Approver cannot", W.can("officer", appr, "cancel", "Officer O. Lee").ok && !W.can("approver", appr, "cancel", "Approver P. Ng").ok);
  check("return", "the Approver returns RQ-1001; the Officer cannot", W.can("approver", appr, "return", "Approver P. Ng").ok && !W.can("officer", appr, "return", "Officer O. Lee").ok);
  check("reject", "the Manager rejects RQ-1001; the Approver cannot reject RQ-1018 they created", W.can("manager", appr, "reject", "Manager M. Koh").ok && !W.can("approver", rq("RQ-1018"), "reject", "Approver P. Ng").ok);
  check("approve", "the Approver approves RQ-1001; the Member cannot", W.can("approver", appr, "approve", "Approver P. Ng").ok && !W.can("member", appr, "approve", "Member D. Koh").ok);
  check("fail", "the Approver records a failed payment on RQ-1011; the Manager cannot", W.can("approver", pay, "fail", "Approver P. Ng").ok && !W.can("manager", pay, "fail", "Manager M. Koh").ok);
  check("pay", "the Approver records payment on RQ-1011; not from Pending Approval", W.can("approver", pay, "pay", "Approver P. Ng").ok && !W.can("approver", appr, "pay", "Approver P. Ng").ok);
  // (v02) Club Reporting transitions: an allowed and a blocked role or state per action
  var WR = Workflow.canReport;
  check("open", "the Officer opens a report; the Approver cannot", WR("officer", "open", "none").ok && !WR("approver", "open", "none").ok);
  check("run", "the Manager runs from parameters; the Member cannot", WR("manager", "run", "parameters").ok && !WR("member", "run", "parameters").ok);
  check("export", "export from a generated result; not from a no-data result", WR("officer", "export", "generated").ok && !WR("officer", "export", "noData").ok);
  check("save", "the Administrator saves a definition; the Manager cannot", WR("admin", "save", "none").ok && !WR("manager", "save", "none").ok);
  check("version", "a new version of an active definition; not of a retired one", WR("admin", "version", "active").ok && !WR("admin", "version", "retired").ok);
  check("inactivate", "the Administrator inactivates an active definition; the Officer cannot", WR("admin", "inactivate", "active").ok && !WR("officer", "inactivate", "active").ok);
  check("grant", "the Administrator saves report access; the Manager cannot", WR("admin", "grant", "none").ok && !WR("manager", "grant", "none").ok);
  check("Store", "Import refuses a v02 file without the reporting collections", !Store.check({ meta: { storageKey: Store.KEY }, modules: [], config: {}, persons: [], memberships: [], requests: [], handoffs: [], finance: {}, vehicles: [], cards: [], outbox: [], integrationEvents: [], audit: [] }).ok);

  // (v03) Golf transitions: an allowed and a blocked role or state per action
  var WG = Workflow.canGolf;
  [["book", "none", "member", "approver"], ["substitute", "confirmed", "golfops", "member"], ["changeCourse", "confirmed", "golfops", "manager"], ["cancel", "confirmed", "member", "admin"],
   ["checkIn", "confirmed", "golfops", "member"], ["late", "confirmed", "golfops", "officer"], ["noShow", "confirmed", "golfops", "manager"], ["applyRainCheck", "confirmed", "golfops", "member"],
   ["requestWaiver", "noShow", "golfops", "manager"], ["join", "none", "member", "officer"], ["accept", "offered", "golfops", "approver"], ["decline", "offered", "member", "admin"],
   ["expire", "offered", "golfops", "member"], ["cancelEntry", "waiting", "golfops", "officer"], ["publish", "draft", "admin", "golfops"], ["block", "open", "golfops", "member"],
   ["release", "blocked", "golfops", "officer"], ["suspend", "open", "manager", "golfops"], ["reopen", "suspended", "manager", "golfops"], ["extend", "available", "golfops", "member"],
   ["decide", "pending", "manager", "golfops"], ["recordPayment", "pending", "golfops", "member"], ["makeEffective", "staged", "admin", "golfops"], ["addPc", "none", "admin", "manager"], ["close", "open", "golfops", "manager"]
  ].forEach(function (t) { check(t[0], (Workflow.GOLF_TRANSITIONS.filter(function (x) { return x.action === t[0]; })[0] || {}).label + ": " + t[2] + " allowed, " + t[3] + " blocked", WG(t[2], t[0], t[1]).ok && !WG(t[3], t[0], t[1]).ok); });
  check("checkIn", "check-in only from Confirmed, not after a no-show", WG("golfops", "checkIn", "confirmed").ok && !WG("golfops", "checkIn", "noShow").ok);
  var nog = JSON.parse(JSON.stringify(window.SEED)); delete nog.golfBookings;
  check("Store", "(v03) Import refuses a file without the golf collections", !Store.check(nog).ok);

  // (v04) Events transitions: an allowed and a blocked role or state per action
  var WE = Workflow.canEvent;
  [["publish", "draft", "events", "manager"], ["maintain", "published", "events", "golfops"], ["reschedule", "published", "events", "member"], ["cancelEvent", "published", "events", "manager"],
   ["register", "none", "member", "events"], ["pay", "held", "golfops", "officer"], ["accept", "offered", "member", "approver"], ["expire", "offered", "events", "member"],
   ["cancelParticipant", "confirmed", "member", "approver"], ["checkIn", "confirmed", "events", "golfops"], ["propose", "none", "events", "manager"], ["authorise", "proposed", "manager", "events"], ["applyFeed", "none", "events", "admin"]
  ].forEach(function (t) { check(t[0], (Workflow.EVENT_TRANSITIONS.filter(function (x) { return x.action === t[0]; })[0] || {}).label + ": " + t[2] + " allowed, " + t[3] + " blocked", WE(t[2], t[0], t[1]).ok && !WE(t[3], t[0], t[1]).ok); });
  check("authorise", "a refund is authorised only from Proposed", WE("manager", "authorise", "proposed").ok && !WE("manager", "authorise", "authorised").ok);
  var noev = JSON.parse(JSON.stringify(window.SEED)); delete noev.eventRegistrations;
  check("Store", "(v04) Import refuses a file without the event collections", !Store.check(noev).ok);
  // (v05) Facilities transitions: an allowed and a blocked role or state per action
  var WF = Workflow.canFacility;
  [["book", "none", "member", "officer"], ["pay", "pendingPayment", "facilities", "approver"], ["amend", "confirmed", "member", "golfops"], ["cancel", "confirmed", "facilities", "manager"],
   ["move", "confirmed", "facilities", "member"], ["noShow", "confirmed", "facilities", "member"], ["requestRefund", "cancelled", "facilities", "manager"], ["decideRefund", "requested", "manager", "facilities"],
   ["block", "none", "facilities", "events"], ["unblock", "active", "facilities", "admin"], ["join", "none", "member", "approver"], ["accept", "offered", "member", "officer"], ["decline", "offered", "member", "admin"],
   ["expire", "offered", "facilities", "member"], ["withdraw", "waiting", "member", "golfops"], ["admit", "none", "facilities", "member"], ["exit", "admitted", "facilities", "officer"], ["sellPass", "none", "facilities", "golfops"],
   ["recordSale", "none", "facilities", "golfops"], ["reconcile", "none", "facilities", "manager"], ["escalate", "open", "facilities", "admin"], ["dispose", "escalated", "facilities", "manager"],
   ["saveDraft", "none", "admin", "facilities"], ["decideConfig", "draft", "manager", "admin"], ["toggle", "active", "admin", "facilities"], ["createPt", "none", "facilities", "member"], ["confirmPt", "pendingPolicy", "facilities", "admin"],
   ["cancelPt", "confirmed", "facilities", "member"], ["chooseVenue", "draft", "events", "facilities"]
  ].forEach(function (t) { check(t[0], (Workflow.FACILITY_TRANSITIONS.filter(function (x) { return x.action === t[0]; })[0] || {}).label + ": " + t[2] + " allowed, " + t[3] + " blocked", WF(t[2], t[0], t[1]).ok && !WF(t[3], t[0], t[1]).ok); });
  check("pay", "payment only from Pending payment; a no-show only from Confirmed", WF("facilities", "pay", "pendingPayment").ok && !WF("facilities", "pay", "confirmed").ok && !WF("facilities", "noShow", "cancelled").ok);
  // (v06) Resorts rules BR-107 – BR-132 (Draft – for validation): one pass and one fail case each, on the seed's resort data
  var RC = C.resorts, P = RC.policy, NOWR = T + " 15:30";
  function rm(code) { return RC.rooms.filter(function (x) { return x.code === code; })[0]; }
  function rt(code) { return RC.roomTypes.filter(function (x) { return x.code === code; })[0]; }
  function dsc(code) { return RC.discounts.filter(function (x) { return x.code === code; })[0]; }
  check("BR-107", "1 night is under the 2-night minimum; 2 nights pass; a departure before arrival is refused", !R.bizRule107("2026-11-13", "2026-11-14", P.minNights).ok && R.bizRule107("2026-11-13", "2026-11-15", P.minNights).ok && !R.bizRule107("2026-11-15", "2026-11-13", P.minNights).ok);
  check("BR-107", "KV-01 is reserved 13 – 15 Nov (RR-0011); CC-02 is free then", !R.bizRule107Room(rm("KV-01"), "2026-11-13", "2026-11-15", S.resortReservations).ok && R.bizRule107Room(rm("CC-02"), "2026-11-13", "2026-11-15", S.resortReservations).ok);
  check("BR-108", "8 nights or past 90 days refused for an Ordinary member, 2 nights inside pass; a suspended member, a Junior and 5 non-member nights refused", !R.bizRule108("member", "ordinary", "active", "Ordinary", "2026-11-13", 8, T, RC.windows).ok && !R.bizRule108("member", "ordinary", "active", "Ordinary", "2027-01-30", 2, T, RC.windows).ok && R.bizRule108("member", "ordinary", "active", "Ordinary", "2026-11-13", 2, T, RC.windows).ok && !R.bizRule108("member", "ordinary", "suspended", "Ordinary", "2026-11-13", 2, T, RC.windows).ok && !R.bizRule108("member", "junior", "active", "Junior", "2026-11-13", 2, T, RC.windows).ok && !R.bizRule108("nonMember", null, null, "", "2026-11-13", 5, T, RC.windows).ok);
  check("BR-109", "staff may assign Complimentary; a member may not; an unknown rate type is refused", R.bizRule109(true, "Complimentary", RC.rateTypes).ok && !R.bizRule109(false, "Complimentary", RC.rateTypes).ok && !R.bizRule109(true, "Staff", RC.rateTypes).ok);
  check("BR-110", "the booked guest cannot change", R.bizRule110("NC10003", "NC10003").ok && !R.bizRule110("NC10003", "LB10002").ok);
  var nts = R.stayNights("2026-11-13", "2026-11-15").map(function (n) { return R.nightRate(rt("CH"), "member", n, RC, []); });
  check("BR-111", "Fri and Sat Chalet nights at the member weekend rate total S$440; a Corporate lease is zero; the Year-end season adds 20 %", R.bizRule111(nts, "Member", []).total === 440 && R.bizRule111(nts, "Corporate lease", []).total === 0 && R.nightRate(rt("CH"), "member", "2026-12-21", RC, []).rate === 216);
  check("BR-112", "3 rooms wanted, 2 free: refused unless the revised set is accepted", !R.bizRule112(3, 2, false).ok && R.bizRule112(3, 2, true).ok && R.bizRule112(2, 2, false).ok);
  check("BR-113", "a hold is payable until it ends", R.bizRule113("2026-10-30 15:30", NOWR).ok && !R.bizRule113("2026-10-27 15:30", NOWR).ok);
  check("BR-114", "more than 21 days ahead: 20 % charge; 8 days ahead: processed as a cancellation", R.bizRule114(1008, 53, P).loc === 201.6 && R.bizRule114(400, 8, P).asCancel);
  check("BR-115", "59 days ahead 50 % with the rest refundable; 8 days ahead 100 %", R.bizRule115(744, 59, 744, P).refund === 372 && R.bizRule115(400, 8, 200, P).charge === 400);
  check("BR-116", "RR-0004 (arrived 27 Oct) is past the 10:00 cutoff; an arrival today is not", R.bizRule116("confirmed", "2026-10-27", NOWR, P).ok && !R.bizRule116("confirmed", T, NOWR, P).ok && !R.bizRule116("checkedIn", "2026-10-27", NOWR, P).ok);
  check("BR-117", "joining is refused while a room is free; allocation needs a free room and a reason", !R.bizRule117(true).ok && R.bizRule117(false).ok && !R.bizRule117Allocate("x", false).ok && !R.bizRule117Allocate("", true).ok && R.bizRule117Allocate("Asked first", true).ok);
  check("BR-118", "only a successful payment counts", R.bizRule118(true).ok && !R.bizRule118(false).ok);
  check("BR-119", "only the Manager, never the requester, with the original payment and a reason", R.bizRule119({ requestedBy: "Resort Front Desk K. Wong", paymentRef: "RP-0009" }, "manager", "Manager M. Koh", "Policy").ok && !R.bizRule119({ requestedBy: "Resort Front Desk K. Wong", paymentRef: "RP-0009" }, "resorts", "Resort Front Desk K. Wong", "x").ok && !R.bizRule119({ requestedBy: "Manager M. Koh", paymentRef: "RP-0009" }, "manager", "Manager M. Koh", "x").ok && !R.bizRule119({ requestedBy: "K", paymentRef: null }, "manager", "Manager M. Koh", "x").ok);
  var dd = R.applyDiscounts(500, [dsc("VCH50"), dsc("WKD10")]);
  check("BR-120", "two promotions are refused; a promotion and a voucher pass, percentage first (S$500 → S$400)", !R.bizRule120([dsc("WKD10"), dsc("WKD10")]).ok && R.bizRule120([dsc("WKD10"), dsc("VCH50"), dsc("HON")]).ok && dd.total === 400 && dd.lines[0].code === "WKD10");
  check("BR-121", "a paid line only by credit note, an unpaid one only by adjustment, both with a reason", !R.bizRule121({ paid: true }, "adjustment", "x").ok && R.bizRule121({ paid: true }, "creditNote", "x").ok && !R.bizRule121({ paid: false }, "creditNote", "x").ok && R.bizRule121({ paid: false }, "adjustment", "x").ok && !R.bizRule121({ paid: false }, "adjustment", "").ok);
  var r1 = S.resortReservations[0];
  check("BR-122", "RR-0001 cannot check in to CC-04 (Pending Cleaning) but can to CC-02 at 15:30; at 18:30 only with an approved late arrival; not at 09:30", !R.bizRule122(r1, rm("CC-04"), T, "15:30", P).ok && R.bizRule122(r1, rm("CC-02"), T, "15:30", P).ok && !R.bizRule122(r1, rm("CC-02"), T, "18:30", P, false).ok && R.bizRule122(r1, rm("CC-02"), T, "18:30", P, true).ok && !R.bizRule122(r1, rm("CC-02"), T, "09:30", P).ok);
  check("BR-123", "check-out makes a room Pending Cleaning; a Ready room cannot start cleaning", R.bizRule123("occupied", "checkOut").to === "pendingCleaning" && R.bizRule123("cleaning", "markReady").to === "ready" && !R.bizRule123("ready", "startCleaning").ok);
  check("BR-124", "an in-house move to CC-04 (Pending Cleaning) is refused; KV-02 is free", !R.bizRule124(rm("CC-04"), T, "2026-10-29", S.resortReservations, "RR-0002", true).ok && R.bizRule124(rm("KV-02"), T, "2026-10-29", S.resortReservations, "RR-0002", true).ok);
  check("BR-125", "a block needs a reason and never an occupied room; release only after completion", !R.bizRule125(rm("KV-04"), "").ok && R.bizRule125(rm("KV-04"), "Aircon fault").ok && !R.bizRule125(rm("CC-01"), "x").ok && !R.bizRule125Release({ completedAt: null }).ok && R.bizRule125Release({ completedAt: NOWR }).ok);
  check("BR-126", "an invalid plate and a third vehicle are refused; the second costs S$10 a night", !R.bizRule126([], "ABC", P).ok && R.bizRule126([], "SKL1111B", P).ok && !R.bizRule126([{ plate: "A" }, { plate: "B" }], "SKL3333D", P).ok && R.bizRule126Charge(1, 2, P) === 20 && R.bizRule126Charge(0, 2, P) === 0);
  check("BR-127", "a PIN only for a confirmed or in-house stay", R.bizRule127({ status: "checkedIn" }).ok && !R.bizRule127({ status: "cancelled" }).ok);
  check("BR-128", "a stay cannot check out with S$283 due; with 0 it can", !R.bizRule128({ status: "checkedIn" }, 283).ok && R.bizRule128({ status: "checkedIn" }, 0).ok && !R.bizRule128({ status: "confirmed" }, 0).ok);
  check("BR-129", "a same-day reversal with a reason; approved by the Manager, not the requester", R.bizRule129(T + " 09:40", T, "x").ok && !R.bizRule129("2026-10-27 09:40", T, "x").ok && !R.bizRule129(T, T, "").ok && R.bizRule129Approve("manager", "K", "Manager M. Koh").ok && !R.bizRule129Approve("resorts", "K", "K2").ok && !R.bizRule129Approve("manager", "Manager M. Koh", "Manager M. Koh").ok);
  check("BR-130", "a blocking exception stops the close; warnings do not", !R.bizRule130([{ name: "Unconfirmed payments", blocking: true, count: 1 }]).ok && R.bizRule130([{ name: "Open waitlist", blocking: false, count: 2 }]).ok);
  check("BR-131", "(v07) a FIN-OPS financial event needs a source and an amount", R.bizRule131("RP-0001", 180).ok && !R.bizRule131("", 180).ok && !R.bizRule131("RP-0001", null).ok);
  check("BR-132", "only configured events notify", R.bizRule132("Reservation confirmed", RC.notifyEvents).ok && !R.bizRule132("Birthday", RC.notifyEvents).ok);
  var WR = Workflow.canResort;
  [["reserve", "none", "resorts", "housekeeping"], ["group", "none", "resorts", "member"], ["hold", "none", "resorts", "member"], ["payHold", "tentative", "resorts", "manager"], ["expire", "tentative", "resorts", "member"], ["amend", "confirmed", "member", "manager"],
   ["cancel", "confirmed", "member", "housekeeping"], ["noShow", "confirmed", "resorts", "member"], ["checkIn", "confirmed", "resorts", "manager"], ["stay", "checkedIn", "resorts", "housekeeping"], ["checkOut", "checkedIn", "resorts", "member"],
   ["requestException", "checkedOut", "resorts", "manager"], ["decideResort", "requested", "manager", "resorts"], ["joinWait", "none", "member", "housekeeping"], ["allocate", "waiting", "resorts", "member"], ["declineWait", "allocated", "resorts", "manager"],
   ["closeWait", "allocated", "resorts", "member"], ["withdrawWait", "waiting", "member", "admin"], ["housekeep", "pendingCleaning", "housekeeping", "resorts"], ["blockRoom", "ready", "housekeeping", "manager"], ["completeRoom", "faulty", "housekeeping", "resorts"],
   ["runAudit", "open", "resorts", "housekeeping"], ["closeDay", "passed", "manager", "resorts"], ["saveMaster", "none", "admin", "manager"], ["saveResortDraft", "none", "admin", "resorts"], ["decideResortConfig", "draft", "manager", "admin"]
  ].forEach(function (t) { check(t[0], (Workflow.RESORT_TRANSITIONS.filter(function (x) { return x.action === t[0]; })[0] || {}).label + ": " + t[2] + " allowed, " + t[3] + " blocked", WR(t[2], t[0], t[1]).ok && !WR(t[3], t[0], t[1]).ok); });
  check("checkIn", "check-in only from Confirmed; check-out only from Checked in; the day closes only after a passed audit", WR("resorts", "checkIn", "confirmed").ok && !WR("resorts", "checkIn", "tentative").ok && !WR("resorts", "checkOut", "confirmed").ok && !WR("manager", "closeDay", "open").ok);
  var nor = JSON.parse(JSON.stringify(window.SEED)); delete nor.resortReservations;
  check("Store", "(v06) Import refuses a file without the resort collections", !Store.check(nor).ok);
  var nof = JSON.parse(JSON.stringify(window.SEED)); delete nof.facilityBookings;
  check("Store", "(v05) Import refuses a file without the facility collections", !Store.check(nof).ok);
  check("Store", "Import refuses a file of another version", !Store.check({ meta: { storageKey: "nsrcc_prototype-v09" } }).ok && Store.check(window.SEED).ok);

  /* ---------- (v07) Finance (FIN-OPS): BR-133 – BR-170 and the Finance transitions ---------- */
  var F = C.finance, ev = function (id) { return S.finEvents.filter(function (e) { return e.id === id; })[0]; }, srcEv = function (src) { return S.finEvents.filter(function (e) { return e.sourceId === src; }); };
  var dup = srcEv("CH-0016");
  check("BR-133", "the second CH-0016 event is a duplicate; the first passes", !R.bizRule133(dup[1], S.finEvents, F.approvedSources).ok && R.bizRule133(dup[0], S.finEvents, F.approvedSources).ok);
  check("BR-133", "an unmatched POS line and an unknown source are refused", !R.bizRule133(srcEv("POS-88232")[0], S.finEvents, F.approvedSources).ok && !R.bizRule133({ module: "XYZ", sourceId: "A", amount: 1, tax: "SR" }, [], F.approvedSources).ok);
  check("BR-134", "a missing tax code returns the event to its module; with a code it stays", !R.bizRule134(srcEv("FL-0006")[0]).ok && R.bizRule134({ tax: "SR" }).ok);
  check("BR-135", "an in-house charge while Finance is unavailable is not financially completed", !R.bizRule135({ inHouse: true }, false).ok && R.bizRule135({ inHouse: true }, true).ok);
  check("BR-136", "EVT-SPONSOR has no mapping; GMS-CHARGE has MAP-02", !R.bizRule136("EVT-SPONSOR", F.mappings, T).ok && R.bizRule136("GMS-CHARGE", F.mappings, T).mapping.id === "MAP-02");
  var lg = R.bizRule137(40, R.bizRule136("GMS-CHARGE", F.mappings, T).mapping, 9);
  check("BR-137", "S$40 golf charge: Dr 40.00, Cr 36.70 revenue, Cr 3.30 Output GST", lg[0].amount === 40 && lg[1].amount === 36.7 && lg[2].amount === 3.3 && lg[2].account === "2100");
  check("BR-138", "balanced passes; 1 cent goes to rounding; 1 dollar blocks", R.bizRule138(lg.slice()).ok && R.bizRule138([{ side: "Dr", account: "1", amount: 10.01 }, { side: "Cr", account: "2", amount: 10 }]).ok && !R.bizRule138([{ side: "Dr", account: "1", amount: 11 }, { side: "Cr", account: "2", amount: 10 }]).ok);
  check("BR-139", "a mapping overlapping MAP-02 is refused; a new event type is not", !R.bizRule139({ kind: "mapping", value: { eventType: "GMS-CHARGE", from: "2026-11-01" } }, F.mappings).ok && R.bizRule139({ kind: "mapping", value: { eventType: "NEW-TYPE", from: "2026-11-01" } }, F.mappings).ok);
  check("BR-139", "maker-checker: the maker never approves; only the Finance Approver approves", !R.makerChecker("Finance Officer R. Tan", "Finance Officer R. Tan", "finance", "BR-139").ok && !R.makerChecker("Finance Officer R. Tan", "Officer O. Lee", "officer", "BR-139").ok && R.makerChecker("Finance Officer R. Tan", "Finance Approver C. Lau", "finapprover", "BR-139").ok);
  check("BR-140", "a credit line and a second receivable for BL-0412 are refused", !R.bizRule140(-10, "BL-9999", S.receivables).ok && !R.bizRule140(450, "BL-0412", S.receivables).ok && R.bizRule140(10, "BL-9999", S.receivables).ok);
  var al = R.bizRule141(1500, S.receivables.filter(function (r) { return r.member === "LB10002"; }), "BL-0412");
  check("BR-141", "S$1,500 for LB10002 naming BL-0412: BL-0412 first, then BL-0398, S$300 unapplied", al.allocations[0].rec === "BL-0412" && al.allocations[1].rec === "BL-0398" && al.unapplied === 300);
  check("BR-142", "a Payment needs an amount and a method", R.bizRule142(10, "Cash").ok && !R.bizRule142(0, "Cash").ok && !R.bizRule142(10, "").ok);
  check("BR-143", "a cheque is Pending Clearance; cash is Confirmed", R.bizRule143("Cheque") === "pendingClearance" && R.bizRule143("Cash") === "confirmed");
  var so = function (id) { return S.standingOrders.filter(function (o) { return o.id === id; })[0]; };
  check("BR-144", "SO-03 over its maximum and the Suspended SO-06 are not collected; SO-01 is", !R.bizRule144(so("SO-03"), 350).ok && !R.bizRule144(so("SO-06"), 100).ok && R.bizRule144(so("SO-01"), 1200).ok);
  check("BR-145", "an invalid mandate cancels the order; nothing is retried", R.bizRule145("rejected", "Mandate terminated by the payer").cancelOrder && !R.bizRule145("rejected", "Insufficient funds").retry && R.bizRule145("accepted", "").payment);
  check("BR-146", "CF10006's second October rejection adds the fee; one does not", R.bizRule146(S.giroCollections.concat([{ member: "CF10006", month: "2026-10", status: "rejected" }]), "CF10006", "2026-10") && !R.bizRule146(S.giroCollections, "CF10006", "2026-10"));
  check("BR-147", "a returned cheque reopens what it paid", R.bizRule147(S.finPayments.filter(function (p) { return p.paymentNo === "PN-0007"; })[0])[0].rec === "BL-0389");
  check("BR-148", "SCA-03 (28 Oct 2024) expires at 24 months; SCA-01 does not", R.bizRule148("2024-10-28", F.creditMonths, T) && !R.bizRule148("2025-06-01", F.creditMonths, T));
  check("BR-149", "SM10013 deposit S$1,000 less S$420 outstanding = S$580", R.bizRule149(1000, 420) === 580 && R.bizRule149(100, 420) === 0);
  check("BR-150", "S$500 and S$2,500 fall in their matrix bands", R.bizRule150(500, F.refundMatrix).upTo === 2000 && R.bizRule150(2500, F.refundMatrix).upTo === null);
  check("BR-151", "in-house credit is restored to the account, card refunded to the card", /member account/.test(R.bizRule151([{ source: "In-house credit", amount: 40 }])[0].settle) && /Card/.test(R.bizRule151([{ source: "Card", amount: 16 }])[0].settle));
  var dr1 = S.deferredRevenue.filter(function (d) { return d.ref === "RR-0002"; })[0];
  check("BR-152", "one night of RR-0002 is recognised; an event before delivery is not", R.bizRule152(dr1, T) === dr1.perUnit && R.bizRule152({ basis: "On delivery", total: 100, recognised: 0, delivered: "2026-11-14" }, T) === 0);
  check("BR-153", "a S$12.50 variance blocks amortisation; a timing item lets it run", !R.bizRule153(S.efRecon).ok && R.bizRule153({ status: "timing" }).ok);
  check("BR-154", "S$0.01 is within tolerance; a timing item explains S$218; S$5 is not", R.bizRule154(100, 99.99, 0, 0.01).ok && R.bizRule154(1310, 1092, 218, 0.01).ok && !R.bizRule154(420, 415, 0, 0.01).ok);
  check("BR-155", "CL-1028-02 has a residual; CL-1028-01 is at zero", !R.bizRule155(S.clearingFlows[1]).ok && R.bizRule155(S.clearingFlows[0]).ok);
  check("BR-156", "CS-GOLF-1028 is S$5.00 short in cash", R.bizRule156(S.cashierSessions[0].expected, S.cashierSessions[0].counted).filter(function (l) { return l.tender === "Cash"; })[0].variance === -5);
  check("BR-157", "a returned event is a source error, not a Finance adjustment", !R.bizRule157(ev("FE-0076")).ok && R.bizRule157(srcEv("CH-0001")[0]).ok && !R.bizRule157(null).ok);
  check("BR-158", "only the Finance Approver overrides a credit limit", R.bizRule158("finapprover").ok && !R.bizRule158("finance").ok);
  var lp = R.bizRule159("2026-09-30", S.finPeriods);
  check("BR-159", "a late September item posts to Oct 2026 (P06 Closed); October posts as itself", !lp.ok && lp.period.id === "P07" && R.bizRule159("2026-10-28", S.finPeriods).ok);
  check("BR-160", "a posted line stages; a line with an open blocking exception does not", R.bizRule160(srcEv("CH-0001")[0], S.finExceptions) && !R.bizRule160(Object.assign({}, srcEv("CH-0001")[0], { id: "FE-X" }), [{ ref: "FE-X", blocking: true, status: "open" }]));
  check("BR-161", "run 1 runs once a day; an ad-hoc run is always allowed", !R.bizRule161([{ date: T, run: 1 }], T, "1").ok && R.bizRule161([{ date: T, run: 1 }], T, "adhoc").ok && R.bizRule161([], T, "1").ok);
  check("BR-162", "one rejected line makes the batch Partial; none Finalised", R.bizRule162(["accepted", "rejected"]) === "partial" && R.bizRule162(["accepted"]) === "finalised");
  check("BR-163", "an exception closes only when resolved", !R.bizRule163({ id: "EX", status: "open" }).ok && R.bizRule163({ status: "resolved" }).ok);
  var rcv = function (m) { return S.receivables.filter(function (r) { return r.member === m; }); };
  check("BR-164", "PA10023 at 125 days is Escalated; WE10005 at 65 days is Reminder 2", R.bizRule164(rcv("PA10023"), T, F.dunning).stage === "escalated" && R.bizRule164(rcv("WE10005"), T, F.dunning).stage === "r2");
  check("BR-165", "FIN-OPS escalates and never changes a membership", R.bizRule165("escalated").escalate && !R.bizRule165("escalated").changeMembership && !R.bizRule165("r1").escalate);
  var dbt = function (id) { return S.debtors.filter(function (d) { return d.id === id; })[0]; };
  check("BR-166", "GD-02 (inactive) and a module charge are refused; GD-01 passes", !R.bizRule166(dbt("GD-02"), "roomblock", 100).ok && !R.bizRule166(dbt("GD-01"), "module", 100).ok && R.bizRule166(dbt("GD-01"), "golfday", 2000).ok);
  var inv = S.arDocs.filter(function (x) { return x.id === "INV-0041"; })[0];
  check("BR-167", "a credit note needs a reason and at most the open amount", R.bizRule167(inv, 545, "Fewer golfers").ok && !R.bizRule167(inv, 545, "").ok && !R.bizRule167(inv, 9999, "x").ok);
  check("BR-168", "RA-01 is due today", R.bizRule168(S.arRecurring[0], T) && !R.bizRule168(Object.assign({}, S.arRecurring[0], { next: "2026-11-28" }), T));
  check("BR-169", "INV-0041 due 15 Oct is 1 – 30 days overdue", R.bizRule169("2026-10-15", T) === "1 – 30" && R.bizRule169("2026-11-30", T) === "Not due");
  var rl = []; check("BR-170", "a reprint keeps the reference and is logged", R.bizRule170("PN-0001", rl, "X", T) === "PN-0001" && rl.length === 1);
  check("Seed", "(v07) no Finance stub reference is left; every module money record points to a FIN-OPS event", JSON.stringify(window.SEED).indexOf("STUB-") < 0 && !("financeStub" in window.SEED) && S.golfCharges.every(function (c) { return !c.financeRef || /^FE-/.test(c.financeRef); }));
  var WF = Workflow.canFin;
  [["validate", "received", "finance", "manager"], ["prepare", "received", "finance", "finapprover"], ["approveRefund", "prepared", "finapprover", "finance"], ["release", "approved", "finance", "finapprover"],
   ["approveAdjustment", "prepared", "finapprover", "finance"], ["approveFinConfig", "draft", "finapprover", "finance"], ["issue", "pending", "finapprover", "finance"], ["runPosting", "none", "finance", "admin"],
   ["closePeriod", "open", "finapprover", "finance"], ["evaluate", "any", "finance", "officer"], ["closeSession", "open", "finance", "golfops"], ["runCollection", "none", "finance", "manager"]
  ].forEach(function (t) { check(t[0], (Workflow.FIN_TRANSITIONS.filter(function (x) { return x.action === t[0]; })[0] || {}).label + ": " + t[2] + " allowed, " + t[3] + " blocked", WF(t[2], t[0], t[1]).ok && !WF(t[3], t[0], t[1]).ok); });
  check("release", "a refund is released only once approved; a period reopens only when Closed", !WF("finance", "release", "prepared").ok && !WF("finapprover", "reopenPeriod", "open").ok && WF("finapprover", "reopenPeriod", "closed").ok);
  var nofin = JSON.parse(JSON.stringify(window.SEED)); delete nofin.finEvents;
  check("Store", "(v07) Import refuses a file without the Finance collections (a v06 file)", !Store.check(nofin).ok);

  return { results: out, passed: out.filter(function (x) { return x.ok; }).length };
})();
