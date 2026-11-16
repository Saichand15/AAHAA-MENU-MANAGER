const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { randomUUID } = require("node:crypto");

const source = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8")
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
          textContent: "", disabled: false, value: "",
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
  vm.runInContext("render = () => {}; applyDesign = () => {}; escapeHtml = value => String(value ?? '');", context);
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
  assert.equal(menu.run("buildPages()[0].cols.flat().length"), 0);
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

test("preparation notes use distinct matching stars and follow moved items", () => {
  const menu = movableMenu();
  menu.run(`
    menuData[0].items[0].prepTime="20-30";
    menuData[0].items[1].prepTime="30-40";
    moveContent({sectionIndex:0,itemIndex:1},{pageId:"p2",column:1,sectionIndex:1});
  `);
  const sourceNotes = menu.run("preparationNotesHtml(menuData[0].items)");
  const destinationNotes = menu.run("preparationNotesHtml(menuData[1].items)");
  assert.match(sourceNotes, /<strong>\*<\/strong> Preparation time: Maximum 20–30 minutes from the time the order is placed/);
  assert.doesNotMatch(sourceNotes, /30–40/);
  assert.match(destinationNotes, /<strong>\*\*<\/strong> Preparation time: Maximum 30–40 minutes from the time the order is placed/);
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
