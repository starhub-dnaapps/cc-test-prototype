/* store.js: the persistence contract (artifacts/data-model/persistence.md, option A, D-232).
   Data lives in localStorage under one key per version, loaded from data/seed.js the first time.
   Build: full-build-v08 · Version: v08 · KO: KO-037 · from v07 */
var Store = (function () {
  var KEY = "nsrcc_prototype-full-v08";
  var data = null;

  function load() {
    if (data) return data;
    try { data = JSON.parse(localStorage.getItem(KEY)); } catch (e) { data = null; }
    if (!data) data = JSON.parse(JSON.stringify(window.SEED));
    delete data.guides; // guides are read from window.SEED, so Reset never touches them
    return data;
  }

  function save() {
    // shortcut: storage blocked (private mode) keeps changes for this page only; a real build has a server
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }

  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) {}
    data = null;
    return load();
  }

  // Export: the whole data set as a local JSON file (Story-039)
  function exportFile() {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(load(), null, 2)], { type: "application/json" }));
    a.download = "ccdemo-data-" + load().meta.today + ".json";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); });
  }

  // Import: accepts only a CC-Demo v08 data file (same storage key, every collection present)
  function check(obj) {
    var need = ["meta", "modules", "config", "persons", "memberships", "requests", "handoffs", "finance", "vehicles", "cards", "outbox", "integrationEvents", "audit", "reports", "accessRules", "reportRuns", "definitions", "dashboards", "legacyReports",
      "courses", "teeSheets", "golfers", "guests", "golfBookings", "courseBlocks", "waitlist", "rainChecks", "golfApprovals", "golfExceptions", "handicapImports", "shiftCloses", "golfCharges",
      "events", "accountHolders", "eventRegistrations", "eventAttendance", "personnelAttendance", "eventSettlements", "eventRefunds", "roomBookings", "roomFeed",
      "facilityBookings", "facilityPayments", "facilityRefunds", "resourceBlocks", "facilityWaitlist", "admissions", "dayPasses", "bowlingTxns", "bowlingRuns", "bowlingExceptions", "fitnessEquipment", "fitnessInstructors", "ptSessions", "facilityConfigChanges",
      "resortClock", "resortReservations", "folioLines", "resortPayments", "resortRefunds", "resortApprovals", "stayVehicles", "credentials", "roomBlocks", "roomHistory", "resortWaitlist", "nightAudits", "resortConfigChanges",
      "finEvents", "finExceptions", "postingBatches", "receivables", "finPayments", "finStatements", "standingOrders", "giroCollections", "spendingCredits", "securityDeposits", "finRefunds", "deferredRevenue", "recognitionRuns",
      "efSchedules", "efRecon", "cashierSessions", "reconProfiles", "clearingFlows", "finPeriods", "finAdjustments", "creditOverrides", "finEscalations", "dunningCases", "debtors", "arDocs", "arRecurring", "finConfigChanges", "finSamples"];  // (v07) Finance
    if (!obj || !obj.meta || obj.meta.storageKey !== KEY) return { ok: false, msg: "Not a CC-Demo v08 data file: nothing was changed." };
    var missing = need.filter(function (k) { return !(k in obj); });
    return missing.length ? { ok: false, msg: "The file is missing " + missing.join(", ") + ": nothing was changed." } : { ok: true, msg: "" };
  }
  function importText(text) {
    var obj;
    try { obj = JSON.parse(text); } catch (e) { return { ok: false, msg: "Not a CC-Demo v08 data file: nothing was changed." }; }
    var x = check(obj);
    if (x.ok) { data = obj; delete data.guides; save(); }
    return x;
  }

  return { KEY: KEY, load: load, save: save, reset: reset, exportFile: exportFile, check: check, importText: importText };
})();
