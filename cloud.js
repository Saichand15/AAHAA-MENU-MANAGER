const cloudMenu = (() => {
  const sessionKey = "aahaaManagerSession";
  let session = null;
  let ready = false;
  let busy = false;
  let revision = 0;
  let sharedSnapshot = "";
  const pendingKey = () => `aahaaPendingSharedMenu:${session.user.id}`;
  const status = message => { document.getElementById("cloudStatus").textContent = message; };

  function lockWorkspace(locked) {
    const gate = document.getElementById("cloudGate");
    gate.hidden = !locked;
    for (const element of document.body.children) {
      if (element !== gate && element.tagName !== "SCRIPT") element.inert = locked;
    }
  }

  function canEdit() {
    if (ready && !busy) return true;
    alert(busy ? "Wait for the shared menu operation to finish." : "Sign in with an approved manager account first.");
    return false;
  }

  async function responseData(response) {
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : null; }
    catch { throw new Error("The server returned an invalid response. Try again."); }
    if (!response.ok) throw new Error(data?.msg || data?.message || data?.error_description || `Server error (${response.status}).`);
    return data;
  }

  async function authRequest(path, body) {
    return responseData(await fetch(`${CLOUD_CONFIG.url}/auth/v1/${path}`, {
      method: "POST",
      headers: { apikey: CLOUD_CONFIG.publicKey, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }));
  }

  function keepSession(value) {
    localStorage.setItem(sessionKey, JSON.stringify(value));
    session = value;
  }

  async function request(path, body) {
    if (!session) throw new Error("Sign in again to continue.");
    if (!session.expires_at || session.expires_at * 1000 < Date.now() + 60000) {
      keepSession(await authRequest("token?grant_type=refresh_token", { refresh_token: session.refresh_token }));
    }
    return responseData(await fetch(`${CLOUD_CONFIG.url}/rest/v1/${path}`, {
      method: body === undefined ? "GET" : "POST",
      headers: {
        apikey: CLOUD_CONFIG.publicKey, Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json"
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) })
    }));
  }

  function changed() {
    if (!ready || busy) return;
    const dirty = documentSnapshot() !== sharedSnapshot;
    try {
      if (dirty) localStorage.setItem(pendingKey(), JSON.stringify({ snapshot: documentSnapshot(), revision }));
      else localStorage.removeItem(pendingKey());
    } catch (error) {
      status("Could not save local recovery data. Download Backup before leaving this page.");
      console.error("Could not save pending changes", error.message);
      return;
    }
    status(dirty ? "Changes on this laptop only - click Save shared menu" : `Shared menu saved - version ${revision}`);
    document.getElementById("cloudSaveBtn").disabled = !dirty;
  }

  function acceptShared(row) {
    validateDocument(row.document);
    if (!Number.isSafeInteger(row.revision) || row.revision < 1) throw new Error("Invalid shared menu revision.");
    const snapshot = JSON.stringify(row.document);
    // Keep this laptop's previous menu recoverable before replacing it.
    persistMenuSnapshot(snapshot);
    restoreSnapshot(snapshot);
    lastSavedSnapshot = documentSnapshot();
    undoHistory = [];
    redoHistory = [];
    updateHistoryButtons();
    revision = row.revision;
    sharedSnapshot = documentSnapshot();
  }

  async function load() {
    const rows = await request("shared_menu?id=eq.main&select=document,revision");
    if (!Array.isArray(rows) || rows.length > 1) throw new Error("Invalid shared menu response.");
    if (rows.length) acceptShared(rows[0]);
    else { revision = 0; sharedSnapshot = ""; }
    return rows.length > 0;
  }

  function report(error) {
    console.error("Shared menu operation failed", error.message);
    status(`Not synced: ${error.message}`);
    document.getElementById("cloudError").textContent = error.message;
    alert(`Shared menu: ${error.message} Your local menu has not been uploaded. Keep a Download Backup copy.`);
  }

  async function connect() {
    const approvals = await request("menu_managers?select=user_id");
    if (!Array.isArray(approvals) || !approvals.some(row => row.user_id === session.user?.id)) {
      throw new Error("This account is not an approved manager. Ask the owner to approve it.");
    }
    const pending = localStorage.getItem(pendingKey());
    const found = await load();
    if (pending) {
      const previous = JSON.parse(pending);
      validateDocument(JSON.parse(previous.snapshot));
      if (!Number.isSafeInteger(previous.revision) || previous.revision < 0) throw new Error("Invalid pending menu revision.");
      if (previous.snapshot !== sharedSnapshot &&
          confirm("This laptop has changes that were not saved centrally. Resume them? Choose Cancel to use the shared menu; the local copy remains in Saved versions.")) {
        persistMenuSnapshot(previous.snapshot);
        restoreSnapshot(previous.snapshot);
        lastSavedSnapshot = documentSnapshot();
        revision = previous.revision;
      }
    }
    ready = true;
    lockWorkspace(false);
    document.getElementById("cloudAccount").textContent = session.user.email;
    if (!found) alert("No shared menu exists yet. On the laptop with the correct menu, restore its backup if needed, then click Save shared menu to publish it.");
  }

  async function signIn(event) {
    event.preventDefault();
    if (busy) return;
    busy = true;
    document.getElementById("cloudSignInBtn").disabled = true;
    document.getElementById("cloudError").textContent = "";
    try {
      keepSession(await authRequest("token?grant_type=password", {
        email: document.getElementById("cloudEmail").value.trim(),
        password: document.getElementById("cloudPassword").value
      }));
      document.getElementById("cloudPassword").value = "";
      await connect();
    } catch (error) { report(error); }
    finally { busy = false; document.getElementById("cloudSignInBtn").disabled = false; changed(); }
  }

  async function save() {
    if (!canEdit()) return;
    const snapshot = documentSnapshot();
    validateDocument(JSON.parse(snapshot));
    busy = true;
    let saved = false;
    status("Saving shared menu...");
    try {
      const rows = await request("rpc/save_shared_menu", {
        expected_revision: revision, menu_document: JSON.parse(snapshot)
      });
      if (!Array.isArray(rows) || rows.length !== 1) throw new Error("Could not confirm the shared save. Load shared menu before retrying.");
      if (!Number.isSafeInteger(rows[0].revision) || rows[0].revision <= revision) throw new Error("Invalid shared save confirmation. Reload before retrying.");
      revision = rows[0].revision;
      sharedSnapshot = snapshot;
      saved = true;
    } catch (error) { report(error); }
    finally {
      busy = false;
      // Do not replace an explicit failure with a success-looking status.
      if (saved) changed();
    }
  }

  async function reload() {
    if (!canEdit()) return;
    if (documentSnapshot() !== sharedSnapshot &&
        !confirm("Load the shared menu and replace this laptop's changes? Download a backup first. The current menu will also remain in Saved versions.")) return;
    busy = true;
    status("Loading shared menu...");
    try { await load(); }
    catch (error) { report(error); return; }
    finally { busy = false; }
    changed();
  }

  async function signOut() {
    if (busy) return;
    if (ready && documentSnapshot() !== sharedSnapshot && !confirm("There are changes not saved centrally. Sign out anyway? Download a backup first.")) return;
    try {
      if (session) {
        await responseData(await fetch(`${CLOUD_CONFIG.url}/auth/v1/logout`, {
          method: "POST",
          headers: { apikey: CLOUD_CONFIG.publicKey, Authorization: `Bearer ${session.access_token}` }
        }));
      }
    } catch (error) { report(error); }
    ready = false;
    localStorage.removeItem(sessionKey);
    session = null;
    lockWorkspace(true);
    document.getElementById("cloudAccount").textContent = "";
    status("Sign in to load the shared menu");
  }

  async function start() {
    lockWorkspace(true);
    document.getElementById("cloudSignInForm").addEventListener("submit", signIn);
    document.getElementById("cloudSaveBtn").addEventListener("click", save);
    document.getElementById("cloudLoadBtn").addEventListener("click", reload);
    document.getElementById("cloudSignOutBtn").addEventListener("click", signOut);
    window.addEventListener("beforeunload", event => {
      if (ready && documentSnapshot() !== sharedSnapshot) { event.preventDefault(); event.returnValue = ""; }
    });
    try {
      const saved = localStorage.getItem(sessionKey);
      if (!saved) return;
      session = JSON.parse(saved);
      busy = true;
      await connect();
    } catch (error) { report(error); }
    finally { busy = false; changed(); }
  }

  return { start, canEdit, changed, isReady: () => ready && !busy };
})();
cloudMenu.start();
