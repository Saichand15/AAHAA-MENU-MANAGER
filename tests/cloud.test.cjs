const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "..", "cloud.js"), "utf8").replace("cloudMenu.start();", "");

function app(shared = null, approved = true) {
  const nodes = new Map();
  const storage = new Map();
  const alerts = [];
  let documentValue = { version: 2, sections: [], pages: [{ id: "p1", title: "Local" }] };
  let server = shared;
  let offline = false;
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, { value: "", hidden: false, textContent: "", disabled: false,
      handlers: {}, addEventListener(event, handler) { this.handlers[event] = handler; } });
    return nodes.get(id);
  };
  const context = vm.createContext({
    CLOUD_CONFIG: { url: "https://example.test", publicKey: "public-test-key" },
    document: { getElementById: node, body: { children: [] } }, window: { addEventListener() {} },
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
    console: { error() {} }, alert: message => alerts.push(message), confirm: () => true,
    documentSnapshot: () => JSON.stringify(documentValue),
    validateDocument: value => { if (value?.version !== 2) throw new Error("Invalid document"); },
    restoreSnapshot: snapshot => { documentValue = JSON.parse(snapshot); },
    persistMenuSnapshot: snapshot => { storage.set("menu", snapshot); },
    lastSavedSnapshot: "", undoHistory: [], redoHistory: [], updateHistoryButtons() {},
    fetch: async (url, options) => {
      if (offline) throw new Error("Network unavailable");
      let data;
      let status = 200;
      if (url.includes("/token")) data = { access_token: "test-token", refresh_token: "test-refresh",
        expires_at: Math.floor(Date.now() / 1000) + 3600, user: { id: "manager", email: "manager@example.test" } };
      else if (url.includes("menu_managers")) data = approved ? [{ user_id: "manager" }] : [];
      else if (url.includes("rpc/save_shared_menu")) {
        const body = JSON.parse(options.body);
        if (body.expected_revision !== (server?.revision || 0)) { status = 409; data = { message: "Another manager saved a newer menu." }; }
        else { server = { document: body.menu_document, revision: (server?.revision || 0) + 1 }; data = [server]; }
      } else data = server ? [server] : [];
      return { ok: status === 200, status, text: async () => JSON.stringify(data) };
    }
  });
  vm.runInContext(source, context);
  return {
    node, storage, alerts,
    start: () => vm.runInContext("cloudMenu.start()", context),
    signIn: () => node("cloudSignInForm").handlers.submit({ preventDefault() {} }),
    edit: title => { documentValue.pages[0].title = title; vm.runInContext("cloudMenu.changed()", context); },
    server: () => server, replaceServer: value => { server = value; }, value: () => documentValue,
    setOffline: value => { offline = value; }
  };
}

test("approved manager loads shared menu and centrally saves changes", async () => {
  const menu = app({ revision: 1, document: { version: 2, sections: [], pages: [{ id: "p1", title: "Shared" }] } });
  await menu.start();
  await menu.signIn();
  assert.equal(menu.node("cloudGate").hidden, true);
  assert.equal(menu.value().pages[0].title, "Shared");
  menu.edit("Updated");
  assert.match(menu.node("cloudStatus").textContent, /laptop only/);
  await menu.node("cloudSaveBtn").handlers.click();
  assert.equal(menu.server().document.pages[0].title, "Updated");
  assert.equal(menu.server().revision, 2);
  assert.match(menu.node("cloudStatus").textContent, /Shared menu saved/);
});

test("unapproved accounts cannot open or save the manager workspace", async () => {
  const menu = app(null, false);
  await menu.start();
  await menu.signIn();
  assert.equal(menu.node("cloudGate").hidden, false);
  assert.match(menu.node("cloudError").textContent, /not an approved manager/);
  await menu.node("cloudSaveBtn").handlers.click();
  assert.equal(menu.server(), null);
});

test("sign-out saves pending changes and the next login loads them", async () => {
  const menu = app();
  await menu.start();
  await menu.signIn();
  menu.edit("Manager edits");
  await menu.node("cloudSignOutBtn").handlers.click();
  assert.equal(menu.server().document.pages[0].title, "Manager edits");
  assert.equal(menu.node("cloudGate").hidden, false);
  assert.equal(menu.storage.has("aahaaPendingSharedMenu:manager"), false);
  await menu.signIn();
  assert.equal(menu.value().pages[0].title, "Manager edits");
  assert.equal(menu.node("cloudSaveBtn").disabled, true);
});

test("a failed save prevents sign-out and keeps the local draft", async () => {
  const menu = app();
  await menu.start();
  await menu.signIn();
  menu.edit("Offline edits");
  menu.setOffline(true);
  await menu.node("cloudSignOutBtn").handlers.click();
  assert.equal(menu.server(), null);
  assert.equal(menu.node("cloudGate").hidden, true);
  assert.ok(menu.storage.has("aahaaPendingSharedMenu:manager"));
  assert.match(menu.node("cloudStatus").textContent, /Not synced/);
});

test("first shared save preserves the complete menu for another laptop", async () => {
  const first = app();
  await first.start();
  await first.signIn();
  Object.assign(first.value(), {
    sections: [{ id: "biryani", name: "Biryani", items: [
      { name: "Chicken Biryani", available: true, portions: [{ label: "Single", price: "12.99" }], prepTime: "20-30", prepNote: "Freshly prepared" },
      { name: "Seasonal Biryani", available: false, price: "" }
    ] }],
    pages: [{ id: "p1", title: "Biryani", layout: "biryani", heading: "Our Biryani" }],
    design: { headerStyle: "fl-none" },
    printedText: { generalPrepNote: "Please allow 10-15 minutes." }
  });
  first.edit("Biryani menu");
  const expected = JSON.stringify(first.value());
  await first.node("cloudSaveBtn").handlers.click();
  assert.equal(first.server().revision, 1);
  const second = app(first.server());
  await second.start();
  await second.signIn();
  assert.equal(JSON.stringify(second.value()), expected);
  assert.equal(second.node("cloudSaveBtn").disabled, true);
});

test("stale laptop cannot overwrite a newer menu", async () => {
  const menu = app();
  await menu.start();
  await menu.signIn();
  menu.edit("Laptop edit");
  menu.replaceServer({ revision: 1, document: { version: 2, sections: [], pages: [{ id: "p1", title: "Other laptop" }] } });
  await menu.node("cloudSaveBtn").handlers.click();
  assert.equal(menu.server().document.pages[0].title, "Other laptop");
  assert.equal(menu.value().pages[0].title, "Laptop edit");
  assert.match(menu.node("cloudStatus").textContent, /Not synced/);
});

test("unsaved local edits survive refresh and keep their original revision for conflict checks", async () => {
  const menu = app({ revision: 2, document: { version: 2, sections: [], pages: [{ id: "p1", title: "Central" }] } });
  await menu.start();
  await menu.signIn();
  menu.edit("Pending");
  menu.replaceServer({ revision: 3, document: { version: 2, sections: [], pages: [{ id: "p1", title: "New central" }] } });
  await menu.start();
  assert.equal(menu.value().pages[0].title, "Pending");
  await menu.node("cloudSaveBtn").handlers.click();
  assert.equal(menu.server().document.pages[0].title, "New central");
  assert.match(menu.node("cloudStatus").textContent, /Not synced/);
});

test("offline saves show failure, preserve local edits and can be retried", async () => {
  const menu = app();
  await menu.start();
  await menu.signIn();
  menu.edit("Local work");
  menu.setOffline(true);
  await menu.node("cloudSaveBtn").handlers.click();
  assert.equal(menu.server(), null);
  assert.equal(menu.value().pages[0].title, "Local work");
  assert.match(menu.node("cloudStatus").textContent, /Not synced: Network unavailable/);
  assert.ok(menu.storage.has("aahaaPendingSharedMenu:manager"));
  menu.setOffline(false);
  await menu.node("cloudSaveBtn").handlers.click();
  assert.equal(menu.server().document.pages[0].title, "Local work");
  assert.equal(menu.storage.has("aahaaPendingSharedMenu:manager"), false);
});
