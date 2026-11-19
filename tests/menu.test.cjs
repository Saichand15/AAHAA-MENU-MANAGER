const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { randomUUID } = require("node:crypto");

const source = fs.readFileSync(path.join(__dirname, "..", "assets", "menu-catalog.js"), "utf8") + "\n" +
  fs.readFileSync(path.join(__dirname, "..", "catalog.js"), "utf8") + "\n" +
  fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8")
  .split("// ---- Wire up events ----")[0];

function app(saved) {
  const storage = new Map(saved ? [["aahaaMenuData", JSON.stringify(saved)]] : []);
  const nodes = new Map();
  const alerts = [];
  const context = vm.createContext({
    crypto: { randomUUID },
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value)
    },
    document: {
      body: { classList: { contains: () => false } },
      getElementById: id => {
        if (!nodes.has(id)) nodes.set(id, {
          textContent: "", disabled: false, value: "", hidden: true,
          classList: { add() {}, remove() {}, contains: () => true }
        });
        return nodes.get(id);
      }
    },
    console: { ...console, error() {} },
    alert: message => alerts.push(message),
    confirm: () => true
  });
  vm.runInContext(source, context);
  vm.runInContext("render = () => {}; renderCatalog = () => {}; applyDesign = () => {}; escapeHtml = value => String(value ?? '');", context);
  return {
    run: code => vm.runInContext(code, context),
    json: code => JSON.parse(vm.runInContext(`JSON.stringify(${code})`, context)),
    alerts, storage
  };
}

test("all 13 biryani rows match the supplied four-size price sheet", () => {
  const menu = app();
  const items = menu.json("parseBiryaniSheet(BIRYANI_SHEET)");
  const prices = [
    ["11.99", "16.99", "35.99", "49.99"],
    ["12.99", "17.99", "37.99", "54.99"],
    ["13.99", "18.99", "44.99", "59.99"],
    ["12.99", "17.99", "37.99", "54.99"],
    ["13.99", "18.99", "44.99", "59.99"],
    ["12.99", "17.99", "37.99", "54.99"],
    ["13.99", "18.99", "44.99", "59.99"],
    ["12.99", "17.99", "37.99", "54.99"],
    ["12.99", "17.99", "36.99", "50.99"],
    ["11.99", "16.99", "35.99", "49.99"],
    ["12.99", "17.99", "37.99", "54.99"],
    ["12.99", "17.99", "37.99", "54.99"],
    ["11.99", "16.99", "35.99", "49.99"]
  ];
  assert.equal(items.length, 13);
  items.forEach((item, index) => {
    assert.deepEqual(item.portions.map(portion => portion.label), ["Single", "Regular", "Family Pack", "Jumbo"]);
    assert.deepEqual(item.portions.map(portion => portion.price), prices[index].map(price => `$${price}`));
    assert.equal(item.spiceOptions, "Medium, Spicy");
    assert.equal(item.spice, "🌶🌶");
  });
  assert.equal(items[0].name, "Veg Dum Biryani");
  assert.equal(items[12].name, "Aahaa Avakaya Biryani");
  assert.equal(items[12].veg, undefined);
});

test("A4 auto-fit keeps Biryani and Extras ordered on a full-width continuation", () => {
  const menu = app();
  menu.run(`
    menuPages = [{id:"p1",title:"Biryani",layout:"biryani"},{id:"p2",title:"Desserts"}];
    menuData = [
      {name:"Biryani",pageId:"p1",column:0,items:[
        {name:"A",price:"$10.99"},{name:"B",price:"$11.99"},{name:"C",price:"$12.99"}
      ]},
      {name:"Extras",pageId:"p1",column:0,items:[{name:"Raita",price:"$0.50"}]},
      {name:"Desserts",pageId:"p2",column:0,items:[{name:"Kulfi",price:"$4.99"}]}
    ];
    document.body.classList.add = document.body.classList.remove = () => {};
    document.querySelector = () => ({querySelector: () => ({getBoundingClientRect: () => ({height:40})})});
    overflowingColumns = () => {
      const count = menuData.filter(s => s.pageId === "p1").reduce((n,s) => n + s.items.length,0);
      return count > 2 ? [{pageIndex:0,pageNumber:1,column:0,excess:40*(count-2)}] : [];
    };
    fitPages();
  `);
  assert.deepEqual(menu.json("menuPages.map(p => [p.title,p.layout])"),
    [["Biryani", "biryani"], ["Biryani continued", "biryani"], ["Desserts", null]]);
  assert.deepEqual(menu.json("buildPages().map(p => p.cols.flat().map(s => [s.name, s.items.map(r => r.item.name)]))"),
    [[["Biryani", ["A", "B"]]], [["Biryani", ["C"]], ["Extras", ["Raita"]]], [["Desserts", ["Kulfi"]]]]);
  assert.deepEqual(menu.alerts, []);
});

test("legacy chunks consolidate and migrate without losing items or empty sections", () => {
  const menu = app([
    { page: 2, col: "L", name: "Soup", items: [{ name: "A", price: "$1.00" }] },
    { page: 3, col: "R", name: "Soup", items: [{ name: "B", price: "$2.00" }] },
    { page: 3, col: "L", name: "Empty", items: [] }
  ]);
  menu.run("initializePages()");
  assert.deepEqual(menu.json("menuData.flatMap(section => section.items.map(item => item.name))"), ["A", "B"]);
  assert.ok(menu.run("menuData.some(section => section.name === 'Empty')"));
  menu.run("validateDocument(JSON.parse(documentSnapshot()))");
});

test("very tall legacy items cannot trap automatic pagination in an infinite loop", () => {
  const menu = app([{ name: "Long item", items: [{ name: "A", price: "$1.00", desc: "x".repeat(10000) }] }]);
  menu.run("initializePages()");
  assert.equal(menu.run("menuData.flatMap(section => section.items).length"), 1);
  assert.equal(menu.run("menuPages.length"), 1);
});

test("persistent pages preserve blanks, placement and optional portions on reload", () => {
  const menu = app();
  menu.run("initializePages(); addPage(); lastSavedSnapshot = documentSnapshot()");
  const snapshot = menu.json("JSON.parse(documentSnapshot())");
  const reloaded = app(snapshot);
  reloaded.run("initializePages()");
  assert.deepEqual(reloaded.json("JSON.parse(documentSnapshot())"), snapshot);
  assert.equal(reloaded.run("buildPages().at(-1).cols.flat().length"), 0);
});

function movableMenu() {
  const menu = app();
  menu.run(`
    menuPages = [{id:"p1",title:"One"},{id:"p2",title:"Two"}];
    menuData = [
      {name:"Soup",pageId:"p1",column:0,items:[{name:"A",price:"$1.00"},{name:"B",price:"$2.00"},{name:"C",price:"$3.00"}]},
      {name:"Rice",pageId:"p2",column:1,items:[{name:"D",price:"$4.00"}]}
    ];
    lastSavedSnapshot = documentSnapshot();
  `);
  return menu;
}

test("moving an item between pages preserves its content and section name", () => {
  const menu = movableMenu();
  menu.run('moveContent({sectionIndex:0,itemIndex:0},{pageId:"p2",column:0})');
  assert.deepEqual(menu.json('menuData.find(s=>s.pageId==="p2" && s.name==="Soup").items.map(i=>i.name)'), ["A"]);
  assert.equal(menu.run("menuData.flatMap(s=>s.items).length"), 4);
  menu.run("validateDocument(JSON.parse(documentSnapshot()))");
});

test("item reorder supports forward, backward and cross-section insertion", () => {
  const menu = movableMenu();
  menu.run('moveContent({sectionIndex:0,itemIndex:0},{pageId:"p1",column:0,sectionIndex:0,itemIndex:2})');
  assert.deepEqual(menu.json("menuData[0].items.map(i=>i.name)"), ["B", "A", "C"]);
  menu.run('moveContent({sectionIndex:0,itemIndex:2},{pageId:"p1",column:0,sectionIndex:0,itemIndex:0})');
  assert.deepEqual(menu.json("menuData[0].items.map(i=>i.name)"), ["C", "B", "A"]);
  menu.run('moveContent({sectionIndex:0,itemIndex:0},{pageId:"p2",column:1,sectionIndex:1,itemIndex:0})');
  assert.deepEqual(menu.json("menuData[1].items.map(i=>i.name)"), ["C", "D"]);
});

test("moving a whole section and undo/redo restore exact placement and content", () => {
  const menu = movableMenu();
  const before = menu.json("JSON.parse(documentSnapshot())");
  menu.run('moveContent({sectionIndex:0},{pageId:"p2",column:1,sectionIndex:1})');
  assert.equal(menu.run('menuData[0].pageId'), "p2");
  menu.run("travelHistory()");
  assert.deepEqual(menu.json("JSON.parse(documentSnapshot())"), before);
  menu.run("travelHistory(true)");
  assert.equal(menu.run('menuData[0].pageId'), "p2");
});

test("preview hides unavailable items and empty sections without deleting them", () => {
  const menu = movableMenu();
  menu.run("menuData[0].items.forEach(item=>item.available=false); customerPreview=true");
  assert.equal(menu.run('buildPages().some(page=>page.id==="p1")'), false);
  assert.equal(menu.run("menuData[0].items.length"), 3);
});

test("single-column layout keeps both previous columns visible", () => {
  const menu = movableMenu();
  menu.run("designData.columnCount=1");
  assert.equal(menu.run("buildPages()[1].cols.length"), 1);
  assert.equal(menu.run("buildPages()[1].cols[0][0].items[0].item.name"), "D");
});

test("deleting a populated page is blocked and empty pages are deletable", () => {
  const menu = movableMenu();
  menu.run("deletePage(0)");
  assert.equal(menu.run("menuPages.length"), 2);
  assert.match(menu.alerts[0], /Move this page/);
  menu.run("addPage(); deletePage(2)");
  assert.equal(menu.run("menuPages.length"), 2);
});

test("import rejects malformed rows, invalid prices and duplicates; blank sizes are omitted", () => {
  const menu = app();
  assert.throws(() => menu.run('parseBiryaniSheet("Broken")'), /seven tab-separated/);
  assert.throws(() => menu.run('money("-1")'), /Invalid price/);
  assert.throws(() => menu.run('money("12.345")'), /Invalid price/);
  assert.throws(() => menu.run('parseBiryaniSheet(BIRYANI_SHEET+"\\n"+BIRYANI_SHEET.split("\\n")[0])'), /duplicate/);
  assert.equal(menu.run('parseBiryaniSheet("Custom\\t12\\t\\t\\t\\tMedium\\tveg")[0].portions.length'), 1);
});

test("backup validation rejects orphaned pages and malformed portions", () => {
  const menu = movableMenu();
  assert.throws(() => menu.run('validateDocument({version:2,pages:[],sections:[]})'), /supported menu backup/);
  assert.throws(() => menu.run('menuData[0].pageId="missing"; validateDocument(JSON.parse(documentSnapshot()))'), /Invalid section/);
  const other = movableMenu();
  assert.throws(() => other.run('menuData[0].items[0].portions=[{label:"Single",price:"oops"}]; validateDocument(JSON.parse(documentSnapshot()))'), /Invalid portion/);
});

test("biryani import replaces continuations once and leaves other sections untouched", () => {
  const menu = movableMenu();
  menu.run(`
    menuData[0].name = "Biryani";
    menuData.push({name:"Biryani",pageId:"p2",column:0,items:[{name:"Old continuation",price:"$9.00"}]});
    lastSavedSnapshot = documentSnapshot();
    document.getElementById("biryaniSection").value = "0";
    document.getElementById("biryaniSheet").value = BIRYANI_SHEET;
    importBiryani();
  `);
  assert.equal(menu.run('menuData.filter(s=>s.name==="Biryani").length'), 1);
  assert.equal(menu.run('menuData.find(s=>s.name==="Biryani").items.length'), 13);
  assert.equal(menu.run('menuData.find(s=>s.name==="Rice").items[0].name'), "D");
  menu.run("travelHistory()");
  assert.equal(menu.run('menuData.filter(s=>s.name==="Biryani").flatMap(s=>s.items).length'), 4);
});

test("malformed saved menus are not overwritten with defaults", () => {
  const menu = app({ version: 2, pages: [], sections: [] });
  const original = menu.storage.get("aahaaMenuData");
  menu.run("initializePages(); saveMenu()");
  assert.equal(menu.storage.get("aahaaMenuData"), original);
  assert.match(menu.alerts[0], /could not be loaded/);
});

test("customer preview blocks editor mutations", () => {
  const menu = movableMenu();
  const before = menu.json("JSON.parse(documentSnapshot())");
  menu.run('customerPreview=true; addPage(); moveContent({sectionIndex:0},{pageId:"p2",column:1}); deleteItem(0,0)');
  assert.deepEqual(menu.json("JSON.parse(documentSnapshot())"), before);
  assert.equal(menu.alerts.length, 3);
});

test("biryani gets one dedicated page with Combos immediately before and all items preserved", () => {
  const menu = app();
  menu.run("initializePages()");
  const before = menu.json("menuData.flatMap(section => section.items)");
  menu.run("arrangeBiryaniPage()");
  const pageIndex = menu.run('menuPages.findIndex(page => page.layout === "biryani")');
  assert.ok(pageIndex > 0);
  assert.deepEqual(menu.json('buildPages().find(page => page.layout === "biryani").cols.flat().map(chunk => chunk.name)'), ["Biryani"]);
  assert.equal(menu.run('menuData.filter(section => section.name === "Biryani").length'), 1);
  assert.equal(menu.run('menuData.find(section => section.name === "Biryani").items.length'), 13);
  assert.equal(menu.run('menuData.find(section => section.name === "Biryani").items[0].name'), "Veg Dum Biryani");
  assert.equal(menu.run('menuData.find(section => section.name === "Combos").pageId'), menu.run(`menuPages[${pageIndex - 1}].id`));
  assert.deepEqual(menu.json("menuData.flatMap(section => section.items).map(item => item.name).sort()"), before.map(item => item.name).sort());
  menu.run("validateDocument(JSON.parse(documentSnapshot()))");
  const arranged = menu.json("JSON.parse(documentSnapshot())");
  menu.run("arrangeBiryaniPage()");
  assert.deepEqual(menu.json("JSON.parse(documentSnapshot())"), arranged);
});

test("existing split biryani sections migrate without overwriting edited prices or unrelated pages", () => {
  const menu = movableMenu();
  menu.run(`
    menuPages.push({id:"blank",title:"Keep blank"});
    menuData.push({name:"Biryani",pageId:"p1",column:1,items:[{name:"Veg Dum Biryani",price:"$12.34",spice:"",spiceOptions:"Medium, Spicy"}]});
    menuData.push({name:"Biryani",pageId:"p2",column:0,items:[{name:"Custom Biryani",price:"$23.45",spice:"🌶"}]});
    menuData.push({name:"Combos",pageId:"p2",column:1,items:[{name:"Combo",price:"$5.00"}]});
    arrangeBiryaniPage();
  `);
  assert.deepEqual(menu.json('menuData.find(s=>s.name==="Biryani").items.map(item=>({name:item.name,price:item.price,spice:item.spice}))'), [
    { name: "Veg Dum Biryani", price: "$12.34", spice: "🌶🌶" },
    { name: "Custom Biryani", price: "$23.45", spice: "🌶" }
  ]);
  assert.equal(menu.run('menuPages.some(page=>page.id==="blank")'), true);
  assert.equal(menu.run('menuData.find(s=>s.name==="Rice").pageId'), "p2");
  assert.equal(menu.run('menuData.find(s=>s.name==="Combos").pageId'), "p1");
  const snapshot = menu.json("JSON.parse(documentSnapshot())");
  const reloaded = app(snapshot);
  assert.equal(reloaded.run("biryaniLayoutRevision"), 1);
  assert.deepEqual(reloaded.json("JSON.parse(documentSnapshot())"), snapshot);
});

test("biryani page uses its full-width layout independently of other page columns", () => {
  const menu = app();
  menu.run("initializePages(); arrangeBiryaniPage()");
  assert.equal(menu.run('buildPages().find(page=>page.layout==="biryani").cols.length'), 1);
  assert.equal(menu.run("buildPages()[0].cols.length"), 2);
  menu.run("designData.columnCount=1");
  assert.equal(menu.run('buildPages().find(page=>page.layout==="biryani").cols.length'), 1);
  assert.equal(menu.run("buildPages()[0].cols.length"), 1);
});

test("biryani can start a menu while Combos receive their own preceding page", () => {
  const menu = app([{name:"Biryani",items:[{name:"Biryani",price:"$9.00"}]},{name:"Combos",items:[{name:"Combo",price:"$5.00"}]}]);
  menu.run("initializePages(); arrangeBiryaniPage()");
  assert.equal(menu.run('menuPages[1].layout'), "biryani");
  assert.equal(menu.run('menuData.find(s=>s.name==="Combos").pageId'), menu.run("menuPages[0].id"));
});

test("spice choices map to the existing chilli legend without inventing unknown levels", () => {
  const menu = app();
  assert.equal(menu.run('spiceFromOptions("Mild")'), "🌶");
  assert.equal(menu.run('spiceFromOptions("Medium, Spicy")'), "🌶🌶");
  assert.equal(menu.run('spiceFromOptions("Spicy")'), "🌶🌶🌶");
  assert.equal(menu.run('spiceFromOptions("Chef choice")'), "");
});

test("Tandoor defaults match all 15 sheet entries, prices and preparation markers", () => {
  const menu = app();
  const items = menu.json('DEFAULT_MENU.filter(section=>section.name==="Tandoor").flatMap(section=>section.items)');
  const expected = [
    ["Chicken Achari Tikka", "$18.99"],
    ["Chicken Haryali Tikka", "$18.99"],
    ["Chicken Sheek Kabab", "$18.99"],
    ["Chicken Tikka Lasuni", "$18.99"],
    ["Fish Tikka (Mahi Mahi)", "$20.99"],
    ["Lamb Seekh Kabab", "$18.99"],
    ["Malai Chicken Tikka", "$18.99"],
    ["Tandoori Chicken 4 pc", "$18.99"],
    ["Tandoori Chicken 8 pc", "$24.99"],
    ["Tandoori Shrimp", "$20.99"],
    ["Tandoori Vegetables", "$15.99"],
    ["Tandoori Pomfret", "$25.99"],
    ["Paneer Tikka", "$16.99"],
    ["Tandoor Mix Grill", "$29.99"],
    ["Hariyali Paneer Tikka", "$16.99"]
  ];
  assert.deepEqual(items.map(item => [item.name, item.price]), expected);
  items.forEach(item => {
    assert.equal(item.prepTime, item.name === "Tandoori Pomfret" ? "30-40" : "20-30");
    assert.equal(item.spice, "🌶🌶");
    assert.ok(!item.name.includes("*"));
  });
  assert.equal(menu.run('DEFAULT_MENU.find(section=>section.name==="Naan").items.some(item=>item.name==="Butter Roti")'), true);
});

test("Tandoor migration replaces old entries once, preserves breads and other menu data", () => {
  const menu = movableMenu();
  menu.run(`
    menuData.push({name:"Tandoor",pageId:"p1",column:1,items:[
      {name:"Chicken Achari Tikka",price:"$18.99"},
      {name:"Butter Roti",price:"$6.25",desc:"Keep edited bread"}
    ]});
    menuData.push({name:"Tandoor",pageId:"p2",column:0,items:[
      {name:"Tandoori Chicken (4 pcs / 8 pcs)",price:"$18.99 | $24.99"},
      {name:"Hariyali Paneer Tikka",price:"$18.99"}
    ]});
    lastSavedSnapshot = documentSnapshot();
    updateTandoorMenu();
    saveMenu();
  `);
  assert.equal(menu.run('menuData.filter(s=>s.name==="Tandoor").flatMap(s=>s.items).length'), 15);
  assert.equal(menu.run('menuData.find(s=>s.name==="Naan").items[0].price'), "$6.25");
  assert.equal(menu.run('menuData.find(s=>s.name==="Naan").items[0].desc'), "Keep edited bread");
  assert.deepEqual(menu.json('menuData.find(s=>s.name==="Soup").items.map(item=>item.name)'), ["A", "B", "C"]);
  assert.equal(menu.run('menuData.find(s=>s.name==="Rice").items[0].price'), "$4.00");
  assert.equal(menu.run('menuData.filter(s=>s.name==="Tandoor")[0].pageId'), "p1");
  const updated = menu.json("JSON.parse(documentSnapshot())");
  menu.run("updateTandoorMenu()");
  assert.deepEqual(menu.json("JSON.parse(documentSnapshot())"), updated);
  menu.run("travelHistory()");
  assert.equal(menu.run('menuData.filter(s=>s.name==="Tandoor").flatMap(s=>s.items).length'), 4);
  menu.run("travelHistory(true)");
  assert.deepEqual(menu.json("JSON.parse(documentSnapshot())"), updated);
  const reloaded = app(updated);
  assert.equal(reloaded.run("tandoorRevision"), 1);
  reloaded.run("validateDocument(JSON.parse(documentSnapshot()))");
});

test("preparation notes use matching stars and follow moved items", () => {
  const menu = movableMenu();
  menu.run(`
    menuData[0].items[0].prepTime="20-30";
    menuData[0].items[1].prepTime="30-40";
    moveContent({sectionIndex:0,itemIndex:1},{pageId:"p2",column:1,sectionIndex:1});
  `);
  const sourceNotes = menu.run("preparationNotesHtml(menuData[0].items)");
  const destinationNotes = menu.run("preparationNotesHtml(menuData[1].items)");
  assert.match(sourceNotes, /<strong>\*<\/strong> Preparation time approximately 20 to 30 minutes/);
  assert.doesNotMatch(sourceNotes, /30–40/);
  assert.match(destinationNotes, /<strong>\*\*<\/strong> Preparation time approximately 30 to 40 minutes/);
  assert.equal(menu.run('prepTimeMarker({prepTime:"20-30"})'), "*");
  assert.equal(menu.run('prepTimeMarker({prepTime:"30-40"})'), "**");
  assert.equal(menu.run('prepTimeMarker({})'), "");
  assert.equal(menu.run("preparationNotesHtml([{name:'No preparation time'}])"), "");
  assert.equal(menu.run('preparationNotesHtml([{prepTime:"20-30"},{prepTime:"20-30"}]).split("<p>").length-1'), 1);
});

test("backup validates preparation times and retains their revision", () => {
  const menu = movableMenu();
  menu.run('menuData[0].items[0].prepTime="30-40"; tandoorRevision=1; validateDocument(JSON.parse(documentSnapshot()))');
  const reloaded = app(menu.json("JSON.parse(documentSnapshot())"));
  assert.equal(reloaded.run("menuData[0].items[0].prepTime"), "30-40");
  assert.equal(reloaded.run("tandoorRevision"), 1);
  assert.throws(() => menu.run('menuData[0].items[0].prepTime="anything"; validateDocument(JSON.parse(documentSnapshot()))'), /Invalid item/);
});

test("Tandoor migration does not resurrect a deliberately removed section", () => {
  const menu = movableMenu();
  menu.run("updateTandoorMenu()");
  assert.equal(menu.run("menuData.length"), 2);
  assert.equal(menu.run("tandoorRevision"), 1);
});

test("workbook catalog covers all 721 menu source rows from all three sheets", () => {
  const menu = app();
  assert.equal(menu.run("WORKBOOK_MENU.length"), 721);
  assert.deepEqual(menu.json("[...new Set(WORKBOOK_MENU.map(row=>row.source.split('!')[0]))]"), [
    "With pricing", "Version 1", "Spice Level"
  ]);
  assert.equal(menu.run("workbookCatalog().reduce((count,entry)=>count+entry.sources.length,0)"), 721);
  assert.equal(menu.run('WORKBOOK_MENU.some(row=>/^(Weekend Special|Preparation Time|Price|Non Veg|Veg)$/i.test(row.name))'), false);
  assert.equal(menu.run('workbookCatalog().find(entry=>entry.name==="Veggie Jalfrezi").section'), "Curries - Veg");
});

test("workbook reconciliation keeps enabled items, applies Excel prices and adds extras disabled", () => {
  const menu = app();
  menu.run("initializePages(); arrangeBiryaniPage()");
  const active = menu.json("menuData.flatMap(s=>s.items).filter(item=>item.available!==false).map(item=>item.name).sort()");
  menu.run("reconcileWorkbookMenu()");
  assert.deepEqual(menu.json("menuData.flatMap(s=>s.items).filter(item=>item.available!==false).map(item=>item.name).sort()"), active);
  assert.equal(menu.run('menuData.flatMap(s=>s.items).find(item=>item.name==="Bhel Puri").price'), "$10.99");
  assert.equal(menu.run('menuData.flatMap(s=>s.items).find(item=>item.name==="Gobi 555").price'), "$14.99");
  assert.equal(menu.run('menuData.flatMap(s=>s.items).find(item=>item.name==="Paneer Naan").price'), "$6.99");
  assert.equal(menu.run('menuData.flatMap(s=>s.items).find(item=>item.name==="Chicken/Goat Rogan Josh").price'), "$14.99 | $19.99");
  assert.equal(menu.run('menuData.flatMap(s=>s.items).find(item=>item.name==="Chicken 65").available'), false);
  assert.equal(menu.run("menuData.flatMap(s=>s.items).some(item=>!itemHasPrice(item)&&item.available!==false)"), false);
  assert.equal(menu.run("workbookCatalog().every(entry=>menuData.some(s=>s.items.some(item=>item.workbook?.key===entry.key)))"), true);
  menu.run("validateDocument(JSON.parse(documentSnapshot()))");
});

test("Excel price comparisons preserve old prices and flag conflicting Egg Curry prices", () => {
  const menu = app();
  menu.run("initializePages(); reconcileWorkbookMenu()");
  assert.deepEqual(menu.json('menuData.flatMap(s=>s.items).find(item=>item.name==="Bhel Puri").workbook.previousPrice'), "$11.99");
  const egg = menu.json('workbookCatalog().find(entry=>entry.name==="Egg Curry")');
  assert.equal(egg.price, "$14.99");
  assert.deepEqual(egg.alternatives, ["With pricing!Y27: $13.99"]);
  assert.ok(egg.sources.includes("With pricing!T8"));
});

test("workbook normalization matches spelling and quantities without merging different sizes", () => {
  const menu = app();
  assert.equal(menu.run('catalogItemKey("Tandoor","Tandoori Chicken 8pc*")===catalogItemKey("Tandoor","Tandoori Chicken 8 pc")'), true);
  assert.equal(menu.run('catalogItemKey("Snacks and Chaat","Paani Puri 6Pcs")===catalogItemKey("Snacks and Chaat","Pani Puri (6 pcs)")'), true);
  assert.equal(menu.run('catalogItemKey("Biryani","Mutton Ghee Roast Briyani")===catalogItemKey("Biryani","Mutton Ghee Roast Biryani")'), true);
  assert.equal(menu.run('catalogItemKey("Snacks and Chaat","Medu Vada 2pcs")===catalogItemKey("Snacks and Chaat","Medu Vada 3pcs")'), false);
});

test("catalog toggles sync home output, undo/redo and persisted availability", () => {
  const menu = movableMenu();
  menu.run("setCatalogAvailability(0,0,false)");
  assert.deepEqual(menu.json("buildPages()[0].cols[0][0].items.map(ref=>ref.item.name)"), ["B", "C"]);
  assert.equal(menu.run("buildPages(true)[0].cols[0][0].items.length"), 3);
  assert.equal(app(menu.json("JSON.parse(documentSnapshot())")).run("menuData[0].items[0].available"), false);
  menu.run("travelHistory()");
  assert.equal(menu.run("buildPages()[0].cols[0][0].items.length"), 3);
  menu.run("travelHistory(true); setCatalogAvailability(0,0,true)");
  assert.equal(menu.run("buildPages()[0].cols[0][0].items.length"), 3);
});

test("unpriced items cannot be enabled by individual or bulk catalog controls", () => {
  const menu = movableMenu();
  menu.run(`
    menuData[0].items[0].price=""; menuData[0].items[0].available=false;
    setCatalogAvailability(0,0,true);
  `);
  assert.equal(menu.run("menuData[0].items[0].available"), false);
  assert.match(menu.alerts[0], /valid price/);
  menu.run('document.getElementById("catalogCategory").value="Soup"; setFilteredAvailability(true)');
  assert.equal(menu.run("menuData[0].items[0].available"), false);
  assert.equal(menu.run("menuData[0].items[1].available"), true);
});

test("bulk actions respect search, section and availability filters together", () => {
  const menu = movableMenu();
  menu.run(`
    document.getElementById("catalogSearch").value="A";
    document.getElementById("catalogCategory").value="Soup";
    setFilteredAvailability(false);
  `);
  assert.equal(menu.run("menuData[0].items[0].available"), false);
  assert.equal(menu.run("menuData[1].items[0].available"), undefined);
  menu.run('document.getElementById("catalogStatus").value="disabled"');
  assert.deepEqual(menu.json("filteredCatalogItems().map(entry=>entry.item.name)"), ["A"]);
});

test("disabled-only pages and sections are absent from output, intentional blank pages remain", () => {
  const menu = movableMenu();
  menu.run(`
    menuData[1].items[0].available=false;
    menuPages.push({id:"blank",title:"Intentional blank"});
    menuPages.push({id:"catalog",title:"Catalog",catalogPage:true});
    menuData.push({name:"Mocktails",pageId:"catalog",column:0,items:[{name:"New drink",price:"",available:false}]});
  `);
  assert.deepEqual(menu.json("buildPages().map(page=>page.id)"), ["p1", "blank"]);
  assert.equal(menu.run("buildPages(true).length"), 4);
});

test("workbook import is one-time and does not overwrite subsequent daily edits on reload", () => {
  const menu = app();
  menu.run("initializePages(); reconcileWorkbookMenu()");
  menu.run('menuData.flatMap(s=>s.items).find(item=>item.name==="Bhel Puri").price="$12.34"');
  const snapshot = menu.json("JSON.parse(documentSnapshot())");
  const reloaded = app(snapshot);
  reloaded.run("reconcileWorkbookMenu()");
  assert.deepEqual(reloaded.json("JSON.parse(documentSnapshot())"), snapshot);
});

test("adding a page navigates to its visible index when disabled-only pages are omitted", () => {
  const menu = movableMenu();
  menu.run(`
    menuData[1].items[0].available=false;
    render = () => { totalPages = buildPages().length; };
    goToPage = index => { globalThis.lastNavigatedPage = index; };
    addPage();
  `);
  assert.equal(menu.run("menuPages.length"), 3);
  assert.equal(menu.run("lastNavigatedPage"), 1);
});

test("price checks accept existing multi-prices but reject invalid or empty amounts", () => {
  const menu = app();
  assert.equal(menu.run('itemHasPrice({price:"$7.99 | $8.99"})'), true);
  assert.equal(menu.run('itemHasPrice({price:"",portions:[{label:"Single",price:"$12.99"}]})'), true);
  for (const price of ["", "TBD", "-1", "$12.999", "$2.00 | ", "$100000"]) {
    assert.equal(menu.run(`itemHasPrice({price:${JSON.stringify(price)}})`), false);
  }
});

test("custom preparation times validate, render with stars and survive backup reload", () => {
  const menu = movableMenu();
  for (const value of ["", "1", "45", "45-60", "999"]) {
    assert.equal(menu.run(`validPrepTime(${JSON.stringify(value)})`), true);
  }
  for (const value of ["0", "60-45", "-1", "1000", "soon", "1.5", "20-"]) {
    assert.equal(menu.run(`validPrepTime(${JSON.stringify(value)})`), false);
  }
  menu.run('menuData[0].items[0].prepTime="45-60"; validateDocument(JSON.parse(documentSnapshot()))');
  assert.equal(menu.run('prepTimeMarker(menuData[0].items[0])'), "*");
  assert.match(menu.run("preparationNotesHtml(menuData[0].items)"), /<strong>\*<\/strong> A: please allow 45–60 minutes/);
  const reloaded = app(menu.json("JSON.parse(documentSnapshot())"));
  assert.equal(reloaded.run("menuData[0].items[0].prepTime"), "45-60");
});

test("saved versions retain ten prior states, ignore unchanged saves and survive reload", () => {
  const menu = movableMenu();
  menu.run('saveMenu(); globalThis.firstSnapshot=documentSnapshot(); menuData[0].items[0].name="Edited"; saveMenu()');
  assert.equal(menu.run("readSavedVersions().length"), 1);
  assert.equal(menu.run("readSavedVersions()[0].snapshot === firstSnapshot"), true);
  menu.run("saveMenu()");
  assert.equal(menu.run("readSavedVersions().length"), 1);
  menu.run('for(let i=0;i<15;i++){menuData[0].items[0].name="Edit "+i;saveMenu();}');
  assert.equal(menu.run("readSavedVersions().length"), 10);
  const reloaded = app(menu.json("JSON.parse(documentSnapshot())"));
  reloaded.storage.set("aahaaMenuSavedVersions", menu.storage.get("aahaaMenuSavedVersions"));
  assert.equal(reloaded.run("readSavedVersions().length"), 10);
  reloaded.run('document.getElementById("savedVersionSelect").value="0"; restoreSavedVersion()');
  assert.equal(reloaded.run("menuData[0].items[0].name"), "Edit 13");
  assert.equal(reloaded.run("JSON.parse(readSavedVersions()[0].snapshot).sections[0].items[0].name"), "Edit 14");
  assert.equal(reloaded.run("JSON.parse(localStorage.getItem(STORAGE_KEY)).sections[0].items[0].name"), "Edit 13");
});

test("corrupt saved versions and storage errors are reported without overwriting the current menu", () => {
  const menu = movableMenu();
  menu.run('saveMenu(); globalThis.before=localStorage.getItem(STORAGE_KEY)');
  menu.storage.set("aahaaMenuSavedVersions", '{"invalid":true}');
  assert.throws(() => menu.run("readSavedVersions()"), /Invalid saved versions/);
  menu.run('menuData[0].items[0].name="Unsaved"');
  assert.equal(menu.run("saveMenu()"), false);
  assert.equal(menu.run("localStorage.getItem(STORAGE_KEY)===before"), true);
  assert.match(menu.alerts.at(-1), /could not be saved/);
  menu.storage.set("aahaaMenuSavedVersions", "[]");
  menu.run('localStorage.setItem = () => { throw new Error("Storage full"); }');
  assert.equal(menu.run("saveMenu()"), false);
  assert.equal(menu.run("localStorage.getItem(STORAGE_KEY)===before"), true);
});

test("printed wording, page headings and item preparation messages persist through backup and history", () => {
  const menu = movableMenu();
  menu.run(`
    saveMenu();
    printedText.footer="Updated restaurant details";
    printedText.preparation="Ready in {minutes} minutes.";
    menuPages[0].heading="Today's specials";
    menuData[0].items[0].prepTime="20-30";
    menuData[0].items[1].prepNote="Freshly grilled; please allow extra time.";
    saveMenu();
    validateDocument(JSON.parse(documentSnapshot()));
  `);
  assert.match(menu.run("preparationNotesHtml(menuData[0].items)"), /Ready in 20 to 30 minutes/);
  assert.match(menu.run("preparationNotesHtml(menuData[0].items)"), /B: Freshly grilled; please allow extra time/);
  assert.equal(menu.run("prepTimeMarker(menuData[0].items[1])"), "*");
  const reloaded = app(menu.json("JSON.parse(documentSnapshot())"));
  assert.equal(reloaded.run("printedText.footer"), "Updated restaurant details");
  assert.equal(reloaded.run("menuPages[0].heading"), "Today's specials");
  assert.equal(reloaded.run("menuData[0].items[1].prepNote"), "Freshly grilled; please allow extra time.");
  menu.run("travelHistory()");
  assert.equal(menu.run("printedText.footer===DEFAULT_PRINTED_TEXT.footer"), true);
  assert.equal(menu.run("menuPages[0].heading"), undefined);
  menu.run("travelHistory(true)");
  assert.equal(menu.run("printedText.footer"), "Updated restaurant details");
});

test("item preparation wording replaces only that item's automatic message", () => {
  const menu = movableMenu();
  menu.run('menuData[0].items[0].prepTime="30-40";menuData[0].items[0].prepNote="Please ask your server."');
  const note = menu.run("preparationNotesHtml(menuData[0].items)");
  assert.match(note, /<strong>\*\*<\/strong> A: Please ask your server/);
  assert.doesNotMatch(note, /Maximum|30–40/);
  menu.run('menuData[0].items[0].prepNote=""');
  assert.match(menu.run("preparationNotesHtml(menuData[0].items)"), /approximately 30 to 40/);
});

test("older backups receive default printed text and malformed editable content is rejected", () => {
  const menu = movableMenu();
  const old = menu.json("JSON.parse(documentSnapshot())");
  delete old.printedText;
  assert.equal(app(old).run("printedText.legendTitle"), "Spice Level");
  menu.run(`restoreSnapshot(${JSON.stringify(JSON.stringify(old))})`);
  assert.equal(menu.run("printedText.preparation===DEFAULT_PRINTED_TEXT.preparation"), true);
  for (const printedText of [null, [], { footer: 10 }, { unexpected: "text" }, { footer: "x".repeat(1001) }]) {
    assert.throws(() => menu.run(`validateDocument(${JSON.stringify({ ...old, printedText })})`), /Invalid printed text/);
  }
  assert.throws(() => menu.run('menuPages[0].heading=12; validateDocument(JSON.parse(documentSnapshot()))'), /Invalid page heading/);
  assert.throws(() => menu.run('delete menuPages[0].heading; menuData[0].items[0].prepNote=12; validateDocument(JSON.parse(documentSnapshot()))'), /Invalid item/);
});

test("printed content form saves shared text and only the selected page heading", () => {
  const menu = movableMenu();
  menu.run(`
    editingPrintedPageId=menuPages[0].id;
    for (const key of Object.keys(DEFAULT_PRINTED_TEXT)) {
      document.getElementById("printed-"+key).value=DEFAULT_PRINTED_TEXT[key];
    }
    document.getElementById("printed-footer").value=" New contact details ";
    document.getElementById("printedPageHeading").value=" Chef specials ";
    savePrintedContent();
  `);
  assert.equal(menu.run("printedText.footer"), "New contact details");
  assert.equal(menu.run("menuPages[0].heading"), "Chef specials");
  assert.equal(menu.run("menuPages[1].heading"), undefined);
  assert.equal(app(menu.json("JSON.parse(documentSnapshot())")).run("printedText.footer"), "New contact details");
  menu.run('document.getElementById("printed-footer").value="x".repeat(1001); savePrintedContent()');
  assert.equal(menu.run("printedText.footer"), "New contact details");
  assert.match(menu.alerts.at(-1), /1,000 characters/);
});

test("updated preparation wording upgrades old defaults without replacing custom wording", () => {
  const menu = movableMenu();
  assert.equal(menu.run("printedText.generalPreparation"), "Please allow approximately 10–15 minutes for all other items. Preparation times may vary during busy periods.");
  assert.equal(menu.run('loadPrintedText({generalPreparation:"Note: All other items preparation time approximately 10 to 15 minutes based on timing."}).generalPreparation===DEFAULT_PRINTED_TEXT.generalPreparation'), true);
  assert.equal(menu.run('loadPrintedText({generalPreparation:"Please ask your server."}).generalPreparation'), "Please ask your server.");
  assert.equal(menu.run('loadPrintedText({preparation:"Preparation time: Maximum {minutes} minutes from the time the order is placed."}).preparation'),
    "Preparation time approximately {minutes} minutes");
  assert.equal(menu.run('loadPrintedText({preparation:"Ask your server about timing."}).preparation'), "Ask your server about timing.");
  assert.equal(menu.run('loadPrintedText({preparation:"Custom wording",generalPreparation:""}).generalPreparation'), "");
});

test("every page preparation block includes both star explanations and the general note", () => {
  const menu = movableMenu();
  const notes = menu.run("pagePreparationNotesHtml([])");
  assert.match(notes, /<strong>\*<\/strong> Preparation time approximately 20 to 30 minutes/);
  assert.match(notes, /<strong>\*\*<\/strong> Preparation time approximately 30 to 40 minutes/);
  assert.match(notes, /Please allow approximately 10–15 minutes for all other items/);
  assert.ok(notes.indexOf("<strong>**</strong>") < notes.indexOf("<strong>*</strong>"));
  assert.ok(notes.indexOf("<strong>*</strong>") < notes.indexOf("general-preparation-note"));
  assert.equal((notes.match(/<p(?: |>|$)/g) || []).length, 3);
  menu.run('menuData[0].items[0].prepNote="Freshly grilled."');
  assert.match(menu.run("pagePreparationNotesHtml(menuData[0].items)"), /A: Freshly grilled/);
  assert.doesNotMatch(menu.run("pagePreparationNotesHtml(menuData[1].items)"), /Freshly grilled/);
});
