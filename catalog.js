function catalogSectionName(name) {
  if (name === "Noodles") return "Indo-Chinese";
  if (name === "Uthappam") return "Tiffin Corner";
  return name;
}

function catalogNameKey(name) {
  return name.toLowerCase().replace(/briyani/g, "biryani").replace(/panner/g, "paneer")
    .replace(/avacado/g, "avocado").replace(/rasamalai/g, "rasmalai")
    .replace(/sheekh|sheek/g, "seekh").replace(/uthappam|uttappam/g, "utappam")
    .replace(/pulov/g, "pulao").replace(/paani/g, "pani").replace(/salana/g, "salna")
    .replace(/\bchilli\b/g, "chili")
    .replace(/hyderbadi/g, "hyderabadi").replace(/lachcha/g, "lacha")
    .replace(/(\d)\s*pcs?\b/g, "$1").replace(/\bpcs?\b/g, "").replace(/\bweekend\s*(spl|special)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

const CATALOG_ALIASES = {
  "Snacks and Chaat": {
    "Egg Bonda": "Egg Bonda 2 pcs", "Medu Vada": "Medu Vada 3 pcs",
    "Mirchi Bhaji": "Stuffed Mirchi Bhaji 3 pcs", "Plantain Bhaji": "Plantain Bhaji 6 pcs",
    "Punjabi Samosa": "Punjabi Samosa 2 pcs", "Paani Puri": "Pani Puri 6 pcs",
    "Masala Vada": "Masala (Dhal) Vada 3 pcs", "Masala Vada 3 pcs": "Masala (Dhal) Vada 3 pcs",
    "Potato Bonda": "Potato Bonda 3 pcs", "Mysore Bonda": "Mysore Bonda 3 pcs",
    "Puran Poli": "Puran Poli 1 pcs", "Aloo Papdi Chaat": "Aloo/Avocado Papdi Chaat"
  },
  "Appetizers - Non Veg": {
    "Mutton Ghee Roast": "Mutton Ghee Roast Fry", "Chicken Ghee Roast": "Chicken Ghee Roast Fry",
    "Fish Tawa Fry": "Fish Tawa Fry 4 pcs", "Chilli Wings": "Chilli Wings 8 pcs",
    "Ulvacharu Kodi Wings": "Ulvacharu Kodi Wings 8 pcs"
  },
  "Appetizers - Veg": { "Mushroom Pepper": "Mushroom Pepper Fry" },
  "Curries - Veg": { "Palak Dal": "Palak Dhal" },
  "Tiffin Corner": {
    "Chola Bhatura": "Chole Batura", "Poori (2pcs)": "Poori Bhaji 2pcs",
    "Chole Bhatura": "Chole Batura", "Thattu Idly": "Thattu Idly 2 pcs",
    "Ghee Thattu Idly": "Ghee Thattu Idly 2 pcs",
    "Idly": "Idly 3pcs", "Idly (3 pcs)": "Idly 3pcs"
  },
  "Biryani": {
    "Gongura Chicken Biryani": "Gongura Chicken"
  },
  "Variety Rice": { "Plain Rice": "Steamed Rice" },
  "Combos": {
    "Idly Vada Combo": "Idly Vada Combo 2pc 1 Vada",
    "Idly Vada Combo (2 pcs Idly, 1 Vada)": "Idly Vada Combo 2pc 1 Vada",
    "Parotta, Chicken Salna & Omelette": "Parotta -Chicken Salna - Ommlette",
    "Parotta, Chicken Salna & Chukka": "Parotta- Chicken Salna - Chukka"
  },
  "Desserts": { "Gulab Jamun": "Gulab Jamun 3pcs", "Rasamalai": "Rasmalai 2pcs" },
  "Drinks": { "Masala Tea": "Masala Chai", "Sodas": "Sodas Pepsi Fanta Thumbsup" },
  "Lunch Specials": {
    "Non Veg Thali": "Maha Virundhu Non Veg", "Veg Thali": "Maha Virundhu Veg"
  }
};

function catalogItemKey(section, name) {
  const category = catalogSectionName(section === "Curries - Veg" && catalogNameKey(name) === "eggcurry" ?
    "Curries - Non Veg" : section);
  const aliases = CATALOG_ALIASES[category] || {};
  const normalized = catalogNameKey(name);
  const alias = Object.keys(aliases).find(key => catalogNameKey(key) === normalized);
  return `${category}:${catalogNameKey(alias ? aliases[alias] : name)}`;
}

function workbookCatalog() {
  const entries = new Map();
  for (const row of WORKBOOK_MENU) {
    const key = catalogItemKey(row.section, row.name);
    if (!entries.has(key)) entries.set(key, { ...row, key, sources: [], alternatives: [] });
    const entry = entries.get(key);
    entry.sources.push(row.source);
    if (!entry.price && row.price) Object.assign(entry, { price: row.price, portions: row.portions });
    else if (row.price && row.price !== entry.price) {
      entry.alternatives.push(`${row.source}: ${row.price}`);
    }
  }
  return [...entries.values()];
}

function itemHasPrice(item) {
  const amounts = item.portions?.length ? item.portions.map(portion => portion.price) : item.price.split("|");
  return amounts.length > 0 && amounts.every(amount =>
    /^\$?\d+(?:\.\d{1,2})?$/.test(amount.trim()) &&
    Number(amount.trim().replace(/^\$/, "")) <= 99999);
}

function reconcileWorkbookMenu() {
  if (workbookRevision === 1) return;
  const existing = new Map();
  menuData.forEach(section => section.items.forEach(item => {
    const key = catalogItemKey(section.name, item.name);
    if (!existing.has(key)) existing.set(key, []);
    existing.get(key).push(item);
  }));
  for (const entry of workbookCatalog()) {
    let matches = existing.get(entry.key);
    if (!matches) {
      let section = menuData.find(section => catalogSectionName(section.name) === entry.section);
      if (!section) {
        let page = menuPages.find(page => page.catalogPage);
        if (!page) {
          page = { id: newPageId(), title: "Additional menu items", catalogPage: true };
          menuPages.push(page);
        }
        section = { name: entry.section, pageId: page.id, column: 0, items: [] };
        menuData.push(section);
      }
      const item = {
        name: entry.name, price: entry.price || "", desc: "", spice: "", available: false,
        ...(entry.diet ? { veg: selectValueToVeg(entry.diet) } : {})
      };
      section.items.push(item);
      matches = [item];
      existing.set(entry.key, matches);
    }
    matches.forEach(item => {
      item.workbook = {
        key: entry.key, sources: entry.sources, price: entry.price || "",
        previousPrice: item.price, alternatives: entry.alternatives
      };
      if (entry.price) {
        item.price = entry.price;
        if (entry.portions) item.portions = entry.portions.map(portion => ({ ...portion }));
        else item.portions = [];
      }
      if (entry.prepTime) item.prepTime = entry.prepTime;
      if (!itemHasPrice(item)) item.available = false;
    });
  }
  workbookRevision = 1;
}

function catalogItems() {
  return menuData.flatMap((section, sectionIndex) => section.items.map((item, itemIndex) => ({
    section, sectionIndex, item, itemIndex, category: catalogSectionName(section.name)
  })));
}

function filteredCatalogItems() {
  const query = document.getElementById("catalogSearch").value.trim().toLowerCase();
  const category = document.getElementById("catalogCategory").value;
  const status = document.getElementById("catalogStatus").value;
  return catalogItems().filter(entry => (!query || `${entry.item.name} ${entry.category}`.toLowerCase().includes(query)) &&
    (!category || category === entry.category) &&
    (!status || (status === "enabled" && entry.item.available !== false) ||
      (status === "disabled" && entry.item.available === false) ||
      (status === "unpriced" && !itemHasPrice(entry.item))));
}

function setCatalogAvailability(sectionIndex, itemIndex, enabled) {
  if (!requireManager()) return;
  const item = menuData[sectionIndex]?.items[itemIndex];
  if (!item) { alert("This item no longer exists. Refresh the catalog."); return; }
  if (enabled && !itemHasPrice(item)) {
    alert("Enter a valid price with Edit before enabling this item.");
    renderCatalog();
    return;
  }
  item.available = enabled;
  saveMenu();
  render();
}

function setFilteredAvailability(enabled) {
  if (!requireManager()) return;
  const entries = filteredCatalogItems();
  const eligible = entries.filter(entry => !enabled || itemHasPrice(entry.item));
  if (!eligible.length) { alert("No eligible items match these filters. Add missing prices first."); return; }
  const skipped = entries.length - eligible.length;
  if (!confirm(`${enabled ? "Enable" : "Disable"} ${eligible.length} filtered items?${skipped ? ` ${skipped} unpriced items will stay disabled.` : ""}`)) return;
  eligible.forEach(entry => { entry.item.available = enabled; });
  saveMenu();
  render();
}

function showCatalog(show) {
  if (!requireManager()) return;
  document.body.classList.toggle("catalog-view", show);
  document.getElementById("catalogView").hidden = !show;
  document.getElementById("todayMenuBtn").setAttribute("aria-pressed", String(show));
  document.getElementById("menuHomeBtn").setAttribute("aria-pressed", String(!show));
  history.replaceState(null, "", show ? "#today-menu" : location.pathname + location.search);
  if (show) renderCatalog();
  else checkPageOverflow();
  window.scrollTo({ top: 0 });
}

function renderCatalog() {
  const all = catalogItems();
  const categorySelect = document.getElementById("catalogCategory");
  const selected = categorySelect.value;
  const categories = [...new Set(all.map(entry => entry.category))].sort();
  categorySelect.innerHTML = '<option value="">All sections</option>' +
    categories.map((category, index) => `<option value="${index}">${escapeHtml(category)}</option>`).join("");
  [...categorySelect.options].slice(1).forEach((option, index) => { option.value = categories[index]; });
  categorySelect.value = categories.includes(selected) ? selected : "";
  const rows = filteredCatalogItems();
  const enabled = all.filter(entry => entry.item.available !== false).length;
  const missing = all.filter(entry => !itemHasPrice(entry.item)).length;
  document.getElementById("catalogSummary").textContent =
    `${all.length} total items | ${enabled} enabled today | ${all.length - enabled} disabled | ${missing} need a price | Showing ${rows.length}`;
  document.getElementById("catalogList").innerHTML = rows.length ? categories.flatMap(category => {
    const entries = rows.filter(entry => entry.category === category);
    if (!entries.length) return [];
    return [`<section class="catalog-group"><h2>${escapeHtml(category)}</h2>${entries.map(entry => {
      const { item, sectionIndex, itemIndex } = entry;
      const priced = itemHasPrice(item);
      return `<article class="catalog-row${item.available === false ? " catalog-disabled" : ""}">
        <label class="catalog-toggle"><input type="checkbox" aria-labelledby="catalog-name-${sectionIndex}-${itemIndex}"
          ${item.available !== false ? "checked" : ""} ${!priced ? "disabled" : ""}
          onchange="setCatalogAvailability(${sectionIndex}, ${itemIndex}, this.checked)">
          <span>${item.available !== false ? "On" : "Off"}</span></label>
        <div class="catalog-item-info"><strong id="catalog-name-${sectionIndex}-${itemIndex}">${escapeHtml(item.name)}</strong>
          <div class="catalog-current-price">${item.portions?.length ? item.portions.map(portion =>
            `${escapeHtml(portion.label)} ${escapeHtml(portion.price)}`).join(" / ") : escapeHtml(item.price || "Price required before enabling")}</div>
        </div><button class="btn btn-light" onclick="openItemModal(${sectionIndex}, ${itemIndex})">Edit</button></article>`;
    }).join("")}</section>`];
  }).join("") : '<p class="help">No items match these filters.</p>';
}
