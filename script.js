/* =========================================================
   AAHAA INDIAN KITCHEN - Menu Manager
   - Renders menu from data (localStorage-backed)
   - Allows add / edit / delete of items & sections
   - Exports the #menu element to a PDF (menu book ready)
   ========================================================= */

const STORAGE_KEY = "aahaaMenuData";
const DESIGN_STORAGE_KEY = "aahaaMenuDesign";

const DEFAULT_DESIGN = {
  headingFont: "'Poppins', sans-serif",
  bodyFont: "'Merriweather', serif",
  headingWeight: 700,
  itemNameWeight: 500,
  priceWeight: 700,
  descStyle: "normal",
  accentColor: "#d84727",
  itemFontSize: 16,
  columnCount: 2,
  headerStyle: "fl-diamond",
  themePreset: "classic-spice"
};

const THEME_PRESETS = {
  "classic-spice": {
    headingFont: "'Poppins', sans-serif",
    bodyFont: "'Merriweather', serif",
    accentColor: "#d84727",
    headerStyle: "fl-diamond"
  },
  "royal-saffron": {
    headingFont: "'Playfair Display', serif",
    bodyFont: "'Lora', serif",
    accentColor: "#b35a00",
    headerStyle: "fl-ribbon"
  },
  "emerald-garden": {
    headingFont: "'Cinzel', serif",
    bodyFont: "'Merriweather', serif",
    accentColor: "#1f7a4a",
    headerStyle: "fl-leaf"
  },
  "coastal-blue": {
    headingFont: "'Montserrat', sans-serif",
    bodyFont: "'Open Sans', sans-serif",
    accentColor: "#1f5f8b",
    headerStyle: "fl-double"
  },
  "midnight-gold": {
    headingFont: "'Oswald', sans-serif",
    bodyFont: "'Nunito', sans-serif",
    accentColor: "#8b6a18",
    headerStyle: "fl-star"
  }
};

const PORTION_LABELS = ["Single", "Regular", "Family Pack", "Jumbo"];
const BIRYANI_SHEET = [
  ["Veg Dum Biryani", "11.99", "16.99", "35.99", "49.99", "Medium, Spicy", "veg"],
  ["Hyderabadi Chicken Dum", "12.99", "17.99", "37.99", "54.99", "Medium, Spicy", "nonveg"],
  ["Hyderabadi Goat Dum", "13.99", "18.99", "44.99", "59.99", "Medium, Spicy", "nonveg"],
  ["Vijayawada Dum Chicken", "12.99", "17.99", "37.99", "54.99", "Medium, Spicy", "nonveg"],
  ["Mutton Ghee Roast Biryani", "13.99", "18.99", "44.99", "59.99", "Medium, Spicy", "nonveg"],
  ["Nattu Kodi Chicken Fry Piece Biryani", "12.99", "17.99", "37.99", "54.99", "Medium, Spicy", "nonveg"],
  ["Nizam Biryani (Cashew) Chicken Biryani", "13.99", "18.99", "44.99", "59.99", "Medium, Spicy", "nonveg"],
  ["Chicken 65 Biryani", "12.99", "17.99", "37.99", "54.99", "Medium, Spicy", "nonveg"],
  ["Aahaa Spl Paneer", "12.99", "17.99", "36.99", "50.99", "Medium, Spicy", "veg"],
  ["Aahaa Spl Egg", "11.99", "16.99", "35.99", "49.99", "Medium, Spicy", "nonveg"],
  ["Gongura Chicken", "12.99", "17.99", "37.99", "54.99", "Medium, Spicy", "nonveg"],
  ["Aahaa Avakaya Chicken Biryani", "12.99", "17.99", "37.99", "54.99", "Medium, Spicy", "nonveg"],
  ["Aahaa Avakaya Biryani", "11.99", "16.99", "35.99", "49.99", "Medium, Spicy", "none"]
].map(row => row.join("\t")).join("\n");

// ---- Default menu data (only items that were kept / ticked) ----
// Structured to replicate the ORIGINAL physical menu pages, in the exact
// page order handwritten on the printed sheets (pages 2 through 10).
// Each entry is one "chunk" placed on a specific page + column.
// continued:true means it keeps adding to the column directly below the
// previous chunk with NO new header, exactly like the original print.
const DEFAULT_MENU = [

  // ===== PAGE 2 — Soups + Snacks and Chaat =====
  { page: 2, col: "L", name: "Soups", items: [
    { name: "Mutton Pepper Soup", spice: "🌶🌶", price: "$10.99", desc: "Pepper seasoned broth with tender mutton pieces.", veg: false },
    { name: "Chicken Pepper Soup", spice: "🌶🌶", price: "$9.99", desc: "Pepper seasoned broth with tender chicken pieces.", veg: false },
    { name: "Cream of Mushroom Soup", spice: "", price: "$7.99", desc: "Creamy mushroom soup with earthy mushroom notes.", veg: true },
    { name: "Hot & Sour Soup Veg/Chicken", spice: "🌶🌶", price: "$7.99 | $8.99", desc: "Tangy, spicy broth with a balanced blend of flavors.", veg: "both" },
    { name: "Lentil (Mulligatawny) Soup", spice: "🌶🌶", price: "$7.99", desc: "Spiced lentil soup with warm herbal notes.", veg: true },
    { name: "Manchow Soup Veg/Chicken", spice: "🌶🌶", price: "$7.99 | $8.99", desc: "Spicy soup topped with crispy fried noodles.", veg: "both" },
    { name: "Sweet Corn Veg/Chicken", spice: "🌶🌶", price: "$7.99 | $8.99", desc: "A light, comforting soup with delicate sweetness.", veg: "both" }
  ]},
  { page: 2, col: "L", name: "Snacks and Chaat", items: [
    { name: "Egg Bonda (2 pcs)", spice: "", price: "$6.99", desc: "Hard boiled eggs coated in spiced batter.", veg: false },
    { name: "Medu Vada (3 pcs)", spice: "🌶🌶", price: "$12.99", desc: "Crispy lentil fritters with a savory center.", veg: true },
    { name: "Sambar Vada (3 pcs)", spice: "🌶🌶", price: "$14.99", desc: "Crispy vadas soaked in tangy sambar.", veg: true },
    { name: "Stuffed Mirchi Bhaji (3 pcs)", spice: "🌶🌶", price: "$10.99", desc: "Crispy green chilies stuffed with spiced filling.", veg: true },
    { name: "Mix Vegetable Pakoras", spice: "🌶🌶", price: "$10.99", desc: "Crisp assorted vegetables dipped in chickpea batter.", veg: true },
    { name: "Onion Pakora Chennai Style", spice: "🌶🌶", price: "$9.99", desc: "Crispy fried onion slices with aromatic spices.", veg: true }
  ]},
  { page: 2, col: "R", name: "Snacks and Chaat", items: [
    { name: "Punjabi Samosa (2 pcs)", spice: "", price: "$3.99", desc: "Crispy samosas filled with spiced potatoes.", veg: true },
    { name: "Potato Bonda (3 pcs)", spice: "", price: "$10.99", desc: "Crispy potato fritters with a spiced filling.", veg: true },
    { name: "Masala (Dhal) Vada (3 pcs)", spice: "🌶🌶", price: "$10.99", desc: "Crispy lentil fritters with spices and herbs.", veg: true },
    { name: "Aloo/Avocado Papdi Chaat", spice: "🌶🌶", price: "$9.99 | $10.99", desc: "Crispy lentil crackers with aromatic toppings.", veg: true },
    { name: "Dahi Papdi Chaat", spice: "", price: "$11.99", desc: "Crispy papdi topped with yogurt and chutneys.", veg: true },
    { name: "Aloo Tikki Chaat", spice: "🌶🌶", price: "$11.99", desc: "Crispy potato patties topped with chickpea curry.", veg: true },
    { name: "Bhel Puri", spice: "🌶🌶", price: "$11.99", desc: "Puffed rice mixed with sev and chutneys.", veg: true },
    { name: "Pani Puri (6 pcs)", spice: "🌶🌶", price: "$8.99", desc: "Crispy puris filled with tangy mint water.", veg: true },
    { name: "Dahi Puri (6 pcs)", spice: "🌶🌶", price: "$10.99", desc: "Crispy puris topped with yogurt and chutneys.", veg: true },
    { name: "Samosa Chaat", spice: "🌶🌶", price: "$11.99", desc: "Crushed samosas topped with chickpea curry.", veg: true }
  ]},

  // ===== PAGE 3 — Appetizers Non-Veg + Appetizers Veg =====
  { page: 3, col: "L", name: "Appetizers - Non Veg", items: [
    { name: "Apollo Fish", spice: "🌶🌶", price: "$17.99", desc: "Crispy fish tossed in a spicy yogurt marinade.", veg: false },
    { name: "Chicken 555", spice: "🌶🌶", price: "$17.99", desc: "Crispy chicken tossed in creamy garlic sauce.", veg: false },
    { name: "Curry Leaf Chicken Fry", spice: "🌶🌶", price: "$15.99", desc: "Chicken deep fried with curry leaves and spices.", veg: false },
    { name: "Curry Leaf Shrimp", spice: "🌶🌶", price: "$18.99", desc: "Shrimp tossed with curry leaves and spices.", veg: false },
    { name: "Chennai Chicken Pakoda", spice: "🌶🌶", price: "$13.99", desc: "Crispy spiced chicken bites with aromatic seasoning.", veg: false },
    { name: "Fish Tawa Fry (4 pcs)", spice: "🌶🌶", price: "$20.99", desc: "Griddle fried fish fillets with coastal spices.", veg: false },
    { name: "Goat Chukka", spice: "🌶🌶", price: "$19.99", desc: "Tender goat roasted with bold spices and herbs.", veg: false },
    { name: "Chicken Chukka", spice: "🌶🌶", price: "$16.99", desc: "Chicken roasted with spices and aromatic herbs.", veg: false },
    { name: "Mutton Ghee Roast", spice: "", price: "$19.99", desc: "Mutton roasted in ghee with bold spices.", veg: false },
    { name: "Chicken Ghee Roast", spice: "", price: "$16.99", desc: "Chicken roasted in ghee with aromatic spices.", veg: false },
    { name: "Nalla Karam Shrimp", spice: "🌶🌶🌶", price: "$19.99", desc: "Shrimp tossed in fiery roasted podi.", veg: false },
    { name: "Pepper Chicken Dry", spice: "🌶🌶", price: "$14.99", desc: "Boneless chicken dry tossed in black pepper.", veg: false },
    { name: "Shrimp 65", spice: "🌶🌶", price: "$18.99", desc: "Crispy fried shrimp marinated in spices.", veg: false },
    { name: "Fish 65", spice: "🌶🌶", price: "$19.99", desc: "Crispy fish tossed in South Indian masala.", veg: false }
  ]},
  { page: 3, col: "R", name: "Appetizers - Veg", items: [
    { name: "Chili Paneer", spice: "🌶🌶", price: "$15.99", desc: "Crispy paneer tossed in chili sauce and onions.", veg: true },
    { name: "Curry Leaf Gobi", spice: "🌶🌶", price: "$14.99", desc: "Crispy curry leaf fried cauliflower with spices.", veg: true },
    { name: "Gobi 555", spice: "🌶🌶", price: "$13.99", desc: "Crispy cauliflower tossed in spiced fusion glaze.", veg: true },
    { name: "Gobi Manchurian", spice: "🌶🌶", price: "$13.99", desc: "Crispy cauliflower fritters tossed in garlic sauce.", veg: true },
    { name: "Mushroom Pepper Fry", spice: "", price: "$13.99", desc: "Mushrooms sautéed with black pepper and spices.", veg: true },
    { name: "Nalla Karam Impossible", spice: "", price: "$16.99", desc: "Impossible meat tossed in intense, spicy podi.", veg: true },
    { name: "Paneer 65", spice: "🌶🌶", price: "$15.99", desc: "Crispy paneer cubes tossed in spicy masala.", veg: true },
    { name: "Impossible 65", spice: "", price: "$16.99", desc: "Crispy plant based bites tossed in Indian spices.", veg: true },
    { name: "Gobi 65", spice: "🌶🌶", price: "$14.99", desc: "Crispy cauliflower florets tossed in Indian spices.", veg: true }
  ]},

  // ===== PAGE 4 — Appetizers Veg (small list) + Curries Non-Veg (regional) =====
  { page: 4, col: "L", name: "Appetizers - Veg", items: [
    { name: "Baby Corn 65", spice: "", price: "$14.99", desc: "Crispy baby corn tossed with spices.", veg: true },
    { name: "Paneer Manchurian", spice: "🌶🌶", price: "$15.99", desc: "Paneer tossed in a tangy Manchurian sauce.", veg: true },
    { name: "Veggie Manchurian", spice: "🌶🌶", price: "$14.99", desc: "Vegetable dumplings tossed in Manchurian sauce.", veg: true },
    { name: "Babycorn Manchurian", spice: "🌶🌶", price: "$14.99", desc: "Crispy baby corn coated in Manchurian sauce.", veg: true },
    { name: "Chilli Babycorn", spice: "🌶🌶", price: "$14.99", desc: "Crispy baby corn tossed with chilies and peppers.", veg: true }
  ]},
  { page: 4, col: "L", name: "Curries - Non Veg", items: [
    { name: "Butter Chicken", spice: "🌶🌶", price: "$15.99", desc: "Tandoori chicken simmered in velvety tomato butter gravy.", veg: false },
    { name: "Chicken Chettinad", spice: "🌶🌶", price: "$16.99", desc: "Chicken simmered with poppy seeds and coconut.", veg: false },
    { name: "Chicken Chilli Masala", spice: "🌶🌶", price: "$16.99", desc: "Chicken cooked in spicy chili gravy.", veg: false },
    { name: "Chicken Tikka Masala", spice: "🌶🌶", price: "$15.99", desc: "Roasted chicken in creamy tomato masala sauce.", veg: false },
    { name: "Chicken Vindaloo", spice: "🌶🌶🌶", price: "$16.99", desc: "Fiery Goan curry with malt vinegar.", veg: false },
    { name: "Goat Chilli Masala", spice: "🌶🌶", price: "$18.99", desc: "Tender goat in fiery chili gravy.", veg: false },
    { name: "Gongura Goat Curry", spice: "🌶🌶", price: "$19.99", desc: "Tender goat simmered with sorrel leaves.", veg: false },
    { name: "Gongura Shrimp Curry", spice: "🌶🌶", price: "$16.99", desc: "Juicy shrimp cooked in sorrel gravy.", veg: false }
  ]},
  { page: 4, col: "R", name: "Curries - Non Veg", continued: true, items: [
    { name: "Andhra Chicken/Goat Curry", spice: "🌶🌶", price: "$16.99 | $19.99", desc: "Spicy Andhra style chicken or goat curry.", veg: false },
    { name: "Hyderabadi Chicken/Goat Curry", spice: "🌶🌶", price: "$16.99 | $19.99", desc: "Spiced Hyderabadi style chicken or goat curry.", veg: false },
    { name: "Kadai Chicken/Goat (no lamb)", spice: "🌶🌶", price: "$16.99 | $19.99", desc: "Meat cooked with aromatic Indian spices.", veg: false },
    { name: "Aahaa Spicy Chicken Curry", spice: "🌶🌶🌶", price: "$16.99", desc: "Chef's special house-blend spiced chicken curry.", veg: false },
    { name: "Aahaa Spicy Goat Curry", spice: "🌶🌶🌶", price: "$18.99", desc: "Tender goat simmered in a signature spice blend.", veg: false },
    { name: "Lamb Chettinad", spice: "🌶🌶", price: "$19.99", desc: "Tender lamb with coconut and fennel.", veg: false },
    { name: "Lamb Chilli Masala", spice: "🌶🌶", price: "$19.99", desc: "Tender lamb in spicy green chilies.", veg: false },
    { name: "Lamb Rogan Josh", spice: "🌶🌶", price: "$19.99", desc: "Tender lamb simmered with Kashmiri spices.", veg: false },
    { name: "Lamb Saag", spice: "🌶🌶", price: "$19.99", desc: "Tender lamb simmered in rich spinach curry.", veg: false },
    { name: "Madras Fish Curry", spice: "🌶🌶", price: "$18.99", desc: "Fish cooked in tangy, spicy South Indian curry.", veg: false },
    { name: "Goan Shrimp / Fish Curry", spice: "🌶🌶", price: "$16.99 | $19.99", desc: "Coastal curry with coconut and tangy spices.", veg: false },
    { name: "Malabar Fish Curry", spice: "🌶", price: "$19.99", desc: "Fish in creamy coconut curry with Malabar spices.", veg: false },
    { name: "Mango Fish Curry", spice: "🌶", price: "$19.99", desc: "Fish simmered with raw mango and coconut.", veg: false },
    { name: "Chicken/Goat Kurma", spice: "", price: "$16.99 | $19.99", desc: "Chicken or goat cooked in creamy kurma gravy.", veg: false },
    { name: "Chicken/Goat Rogan Josh", spice: "", price: "$14.99 | $18.99", desc: "Chicken or goat in aromatic Kashmiri gravy.", veg: false }
  ]},

  // ===== PAGE 5 — Curries Non-Veg (basic) + Curries Veg (full) =====
  { page: 5, col: "L", name: "Curries - Non Veg", items: [
    { name: "Chicken/Mutton Saag", spice: "🌶🌶", price: "$16.99 | $19.99", desc: "Chicken or mutton cooked in spinach gravy.", veg: false },
    { name: "Pepper Chicken Masala", spice: "🌶🌶", price: "$16.99", desc: "Chicken cooked in black pepper gravy.", veg: false },
    { name: "Chennai Shrimp Masala", spice: "🌶🌶🌶", price: "$17.99", desc: "Shrimp tossed in spicy Chennai style masala.", veg: false },
    { name: "Shrimp Tikka Masala", spice: "🌶🌶", price: "$18.99", desc: "Tandoori shrimp in creamy tomato curry.", veg: false }
  ]},
  { page: 5, col: "L", name: "Curries - Veg", items: [
    { name: "Aloo Gobi", spice: "🌶🌶", price: "$14.99", desc: "Potatoes and cauliflower cooked with spices.", veg: true },
    { name: "Baingan Bharta", spice: "🌶", price: "$14.99", desc: "Smoky eggplant mashed with aromatic spices.", veg: true },
    { name: "Jeera Aloo", spice: "🌶🌶", price: "$14.99", desc: "Potatoes tossed with cumin seeds.", veg: true },
    { name: "Kadai Paneer", spice: "🌶🌶", price: "$15.99", desc: "Paneer with peppers and aromatic spices.", veg: true },
    { name: "Malai Kofta", spice: "🌶🌶", price: "$15.99", desc: "Cheese dumplings in rich cashew sauce.", veg: true },
    { name: "Mutter Paneer", spice: "🌶🌶", price: "$15.99", desc: "Paneer and peas in creamy gravy.", veg: true },
    { name: "Navaratan Korma", spice: "🌶🌶", price: "$15.99", desc: "Nine vegetables in velvety cashew sauce.", veg: true },
    { name: "Palak Paneer", spice: "🌶🌶", price: "$15.99", desc: "Paneer cooked in creamy spinach gravy.", veg: true }
  ]},
  { page: 5, col: "R", name: "Curries - Veg", continued: true, items: [
    { name: "Paneer Bhurji", spice: "🌶🌶", price: "$15.99", desc: "Buttery scrambled paneer with aromatic spices.", veg: true },
    { name: "Paneer Makhani", spice: "🌶", price: "$15.99", desc: "Buttery tomato paneer in creamy sauce.", veg: true },
    { name: "Paneer Tikka Masala", spice: "🌶🌶", price: "$15.99", desc: "Paneer tikka simmered in spiced tomato gravy.", veg: true },
    { name: "Sambar", spice: "🌶🌶", price: "$9.99", desc: "Traditional lentil stew with mixed vegetables.", veg: true },
    { name: "Shahi Paneer", spice: "🌶🌶", price: "$15.99", desc: "Paneer in royal cashew makhani cream.", veg: true },
    { name: "Palak Dal", spice: "🌶", price: "$13.99", desc: "Tempered yellow lentils with spinach.", veg: true },
    { name: "Vegetable Chettinad", spice: "🌶🌶", price: "$14.99", desc: "Garden vegetables in spicy coconut curry.", veg: true },
    { name: "Veggie Jalfrezi", spice: "🌶🌶", price: "$13.99", desc: "Stir fried vegetables in tangy tomato sauce.", veg: true },
    { name: "Yellow Dal Tadka", spice: "🌶", price: "$12.99", desc: "Tempered yellow lentils with aromatic spices.", veg: true },
    { name: "Veg Korma", spice: "🌶", price: "$14.99", desc: "Vegetables in mild almond coconut cream sauce.", veg: true },
    { name: "Impossible Kheema Masala", spice: "🌶🌶", price: "$16.99", desc: "Plant based kheema in spicy masala gravy.", veg: true },
    { name: "Rotu Kadai Salna", spice: "🌶🌶", price: "$12.99", desc: "South Indian street style salna with spices.", veg: true },
    { name: "Egg Curry", spice: "", price: "$14.99", desc: "Boiled eggs simmered in spiced gravy.", veg: false },
    { name: "Channa Masala", spice: "🌶", price: "$12.99", desc: "Chickpeas simmered in tomato onion gravy.", veg: true }
  ]},

  // ===== PAGE 6 — Indo-Chinese + Noodles + Tiffin Corner (Idly varieties) =====
  { page: 6, col: "L", name: "Indo-Chinese", items: [
    { name: "Chicken Fried Rice", spice: "🌶🌶", price: "$16.99", desc: "Wok fried rice tossed with tender chicken pieces.", veg: false },
    { name: "Shrimp Fried Rice", spice: "🌶🌶", price: "$17.99", desc: "Stir fried rice with shrimp and vegetables.", veg: false },
    { name: "Mixed Fried Rice", spice: "🌶🌶", price: "$18.99", desc: "Rice stir fried with chicken, shrimp, and egg.", veg: false },
    { name: "Impossible Biryani", spice: "🌶🌶", price: "$17.99", desc: "Flavorful biryani with rich spices.", veg: true },
    { name: "Schezwan Fried Rice (Veg/Egg/Chicken)", spice: "🌶🌶", price: "$14.99 | $15.99 | $16.99", desc: "Stir fried rice tossed in spicy Schezwan sauce.", veg: "both" },
    { name: "Veg Fried Rice", spice: "🌶🌶", price: "$12.99", desc: "Wok tossed rice with crisp vegetables and seasonings.", veg: true },
    { name: "Paneer Fried Rice", spice: "🌶🌶", price: "$14.99", desc: "Wok fried rice with paneer and vegetables.", veg: true }
  ]},
  { page: 6, col: "L", name: "Noodles", items: [
    { name: "Chicken Noodles", spice: "🌶🌶", price: "$15.99", desc: "Noodles stir fried with chicken and seasonings.", veg: false }
  ]},
  { page: 6, col: "L", name: "Tiffin Corner", items: [
    { name: "Ghee Idly", spice: "", price: "$12.99", desc: "Soft steamed idlies finished with clarified ghee.", veg: true },
    { name: "Idly (3 pcs)", spice: "", price: "$8.99", desc: "Steamed rice and lentil cakes served soft.", veg: true }
  ]},
  { page: 6, col: "R", name: "Tiffin Corner", continued: true, items: [
    { name: "Mini Podi Idly", spice: "🌶🌶", price: "$10.99", desc: "Mini idlies tossed with aromatic spiced lentil powder.", veg: true },
    { name: "Podi Idly", spice: "🌶🌶", price: "$12.99", desc: "Steamed idlies tossed with spiced lentil powder.", veg: true },
    { name: "Poori (2 pcs)", spice: "", price: "$13.99", desc: "Deep fried wheat breads served with potato masala.", veg: true },
    { name: "Thattu Idly", spice: "", price: "$10.99", desc: "Large, soft steamed idly served with chutneys.", veg: true },
    { name: "Ghee Thattu Idly", spice: "", price: "$11.99", desc: "Large idly topped with ghee and spiced podi.", veg: true },
    { name: "Ghee Podi Thattu Idly", spice: "🌶🌶", price: "$12.99", desc: "Soft steamed idlies coated with flavorful, spicy podi.", veg: true },
    { name: "Ghee Thattu Idly (2 pc)", spice: "", price: "$11.99", desc: "Soft, fluffy idlis drizzled with aromatic ghee.", veg: true },
    { name: "Sambar Idly", spice: "", price: "$12.99", desc: "Soft steamed idlies soaked in warm sambar.", veg: true },
    { name: "Chole Bhatura", spice: "🌶🌶", price: "$14.99", desc: "Fluffy fried bread served with spiced chickpeas.", veg: true },
    { name: "Butter Dosa", spice: "", price: "$13.99", desc: "Crisp dosa roasted with butter until golden.", veg: true },
    { name: "Butter Masala Dosa", spice: "", price: "$13.99", desc: "Butter roasted dosa filled with seasoned potato masala.", veg: true },
    { name: "Chettinad Dosa", spice: "🌶🌶", price: "$13.99", desc: "Dosa prepared with aromatic Chettinad spices.", veg: true },
    { name: "Egg Dosa", spice: "🌶🌶", price: "$13.99", desc: "Dosa topped with egg and seasoned spices.", veg: false },
    { name: "Masala Dosa", spice: "", price: "$13.99", desc: "Crisp dosa filled with seasoned potato masala.", veg: true },
    { name: "Mix Veg Uttappam", spice: "", price: "$13.99", desc: "Savory uttappam topped with fresh vegetables and spices.", veg: true }
  ]},

  // ===== PAGE 7 — Tiffin Corner (Dosas) + Uthappam + Tandoor (chicken tikka) =====
  { page: 7, col: "L", name: "Tiffin Corner", items: [
    { name: "Mysore Dosa", spice: "", price: "$13.99", desc: "Crisp dosa spread with spicy Mysore chutney.", veg: true },
    { name: "Onion Dosa", spice: "", price: "$13.99", desc: "Crisp dosa topped with finely chopped onions.", veg: true },
    { name: "Onion Rava Dosa", spice: "", price: "$13.99", desc: "Crispy semolina crepe topped with chopped onions.", veg: true },
    { name: "Paneer Dosa", spice: "", price: "$13.99", desc: "Crisp dosa filled with seasoned paneer.", veg: true },
    { name: "Paper Dosa", spice: "", price: "$13.99", desc: "Extra thin, crisp dosa served without filling.", veg: true },
    { name: "Paper Masala Dosa", spice: "", price: "$13.99", desc: "Extra thin, crisp dosa filled with potato masala.", veg: true },
    { name: "Plain Dosa", spice: "", price: "$12.99", desc: "Thin, crisp rice and lentil crepe.", veg: true },
    { name: "Podi Dosa", spice: "🌶🌶", price: "$13.99", desc: "Crisp dosa sprinkled with spiced lentil powder.", veg: true },
    { name: "Rava Masala Dosa", spice: "", price: "$13.99", desc: "Crispy semolina crepe filled with potato masala.", veg: true },
    { name: "Special Masala Dosa", spice: "", price: "$15.99", desc: "Crisp dosa with the house's special masala filling.", veg: true },
    { name: "Spinach Masala Dosa", spice: "", price: "$13.99", desc: "Dosa filled with potato masala and spinach.", veg: true },
    { name: "Ghee Roast", spice: "", price: "$13.99", desc: "Crisp dosa roasted generously with clarified butter.", veg: true },
    { name: "Adai", spice: "", price: "$11.99", desc: "Thick lentil crepe with rice and spices.", veg: true }
  ]},
  { page: 7, col: "R", name: "Tiffin Corner", continued: true, items: [
    { name: "Kavuni Dosa", spice: "", price: "$15.99", desc: "Dosa prepared with traditional black rice.", veg: true },
    { name: "Mapillai Samba Dosa", spice: "", price: "$15.99", desc: "Dosa prepared with traditional Mapillai Samba rice.", veg: true },
    { name: "Pesarattu", spice: "", price: "$14.99", desc: "Green gram crepe with a savory finish.", veg: true }
  ]},
  { page: 7, col: "R", name: "Uthappam", items: [
    { name: "Onion Uttappam", spice: "", price: "$12.99", desc: "Soft rice pancake topped with chopped onions.", veg: true },
    { name: "Onion Podi Uthappam", spice: "🌶🌶", price: "$13.99", desc: "Onion topped pancake sprinkled with spiced podi.", veg: true },
    { name: "Mix Veg Uthappam", spice: "", price: "$13.99", desc: "Soft rice pancake topped with mixed vegetables.", veg: true }
  ]},
  { page: 7, col: "R", name: "Tandoor", items: [
    { name: "Chicken Achari Tikka", spice: "🌶🌶", price: "$18.99", prepTime: "20-30", desc: "Chicken skewers marinated with tangy pickling spices.", veg: false },
    { name: "Chicken Haryali Tikka", spice: "🌶🌶", price: "$18.99", prepTime: "20-30", desc: "Chicken skewers in mint coriander green marinade.", veg: false },
    { name: "Chicken Sheek Kabab", spice: "🌶🌶", price: "$18.99", prepTime: "20-30", desc: "Minced spiced chicken skewers char grilled until golden.", veg: false },
    { name: "Chicken Tikka Lasuni", spice: "🌶🌶", price: "$18.99", prepTime: "20-30", desc: "Chicken tikka roasted with aromatic garlic marinade.", veg: false }
  ]},

  // ===== PAGE 8 — Tandoor + Naan =====
  { page: 8, col: "L", name: "Tandoor", items: [
    { name: "Fish Tikka (Mahi Mahi)", spice: "🌶🌶", price: "$20.99", prepTime: "20-30", desc: "Mahi mahi steaks roasted with aromatic ajwain.", veg: false },
    { name: "Lamb Seekh Kabab", spice: "🌶🌶", price: "$18.99", prepTime: "20-30", desc: "Minced spiced lamb skewers char grilled until succulent.", veg: false },
    { name: "Malai Chicken Tikka", spice: "🌶🌶", price: "$18.99", prepTime: "20-30", desc: "Chicken marinated in a creamy malai marinade.", veg: false },
    { name: "Tandoori Chicken 4 pc", spice: "🌶🌶", price: "$18.99", prepTime: "20-30", desc: "Tandoor roasted chicken with aromatic Indian spices.", veg: false },
    { name: "Tandoori Chicken 8 pc", spice: "🌶🌶", price: "$24.99", prepTime: "20-30", desc: "Tandoor roasted chicken with aromatic Indian spices.", veg: false },
    { name: "Tandoori Shrimp", spice: "🌶🌶", price: "$20.99", prepTime: "20-30", desc: "King prawns marinated and cooked in a clay oven.", veg: false },
    { name: "Tandoori Vegetables", spice: "🌶🌶", price: "$15.99", prepTime: "20-30", desc: "Marinated vegetables charred in a traditional clay oven.", veg: true },
    { name: "Tandoori Pomfret", spice: "🌶🌶", price: "$25.99", prepTime: "30-40", desc: "Spiced pomfret grilled to achieve a smoky finish.", veg: false },
    { name: "Paneer Tikka", spice: "🌶🌶", price: "$16.99", prepTime: "20-30", desc: "Spiced paneer grilled to achieve a golden finish.", veg: true },
    { name: "Tandoor Mix Grill", spice: "🌶🌶", price: "$29.99", prepTime: "20-30", desc: "Tandoor grilled meats and paneer served together.", veg: "both" },
    { name: "Hariyali Paneer Tikka", spice: "🌶🌶", price: "$16.99", prepTime: "20-30", desc: "Mint marinated paneer grilled until lightly charred.", veg: true }
  ]},
  { page: 8, col: "R", name: "Naan", items: [
    { name: "Aloo Paratha", spice: "", price: "$4.99", desc: "Golden wheat flatbread stuffed with spiced potatoes.", veg: true },
    { name: "Bread Basket", spice: "", price: "$12.99", desc: "Assorted freshly baked Indian breads for sharing.", veg: true },
    { name: "Bullet Naan", spice: "", price: "$4.99", desc: "Classic clay oven baked naan with a golden finish.", veg: true },
    { name: "Butter Roti", spice: "", price: "$4.99", desc: "Clay oven baked whole wheat flatbread brushed with butter.", veg: true },
    { name: "Cauliflower Naan", spice: "", price: "$4.99", desc: "Golden naan stuffed with spiced cauliflower filling.", veg: true },
    { name: "Garlic Naan", spice: "", price: "$5.99", desc: "Golden naan topped with fragrant garlic.", veg: true },
    { name: "Lamb Keema Naan", spice: "", price: "$6.99", desc: "Naan stuffed with spiced minced lamb.", veg: false },
    { name: "Onion Kulcha", spice: "", price: "$5.99", desc: "Golden baked flatbread stuffed with spiced onions.", veg: true },
    { name: "Paneer Naan", spice: "", price: "$5.99", desc: "Soft naan stuffed with flavorful spiced paneer filling.", veg: true },
    { name: "Peshwari Naan", spice: "", price: "$5.99", desc: "Soft naan stuffed with coconut and dried fruits.", veg: true },
    { name: "Plain Naan", spice: "", price: "$3.99", desc: "Classic clay oven baked leavened flatbread.", veg: true },
    { name: "Sesame Naan", spice: "", price: "$5.99", desc: "Flatbread dotted with toasted sesame seeds.", veg: true },
    { name: "Tandoori Roti", spice: "", price: "$5.99", desc: "Whole wheat bread baked in a tandoor.", veg: true },
    { name: "Batura (1 pc)", spice: "", price: "$4.99", desc: "Large, fluffy deep fried leavened bread.", veg: true },
    { name: "Cheese Naan", spice: "", price: "$4.99", desc: "Naan stuffed with melted cheese and baked golden.", veg: true },
    { name: "Lacha Paratha", spice: "", price: "$5.99", desc: "Flaky, buttery layered Indian flatbread.", veg: true }
  ]},

  // ===== PAGE 9 — Biryani + Variety Rice + Combos + Lunch Specials + Parotta Specials =====
  { page: 9, col: "L", name: "Biryani", items: parseBiryaniSheet(BIRYANI_SHEET) },
  { page: 9, col: "L", name: "Combos", items: [
    { name: "Idly Vada Combo (2 pcs Idly, 1 Vada)", spice: "", price: "$12.99", desc: "Steamed idlies and crispy vada served with accompaniments.", veg: true },
    { name: "Parotta, Chicken Salna & Omelette", spice: "🌶🌶", price: "$18.99", desc: "Flaky parotta served with chicken salna and omelette.", veg: false },
    { name: "Parotta, Chicken Salna & Chukka", spice: "🌶🌶", price: "$21.99", desc: "Flaky parotta layered with chicken salna and chukka.", veg: false }
  ]},
  { page: 9, col: "R", name: "Variety Rice", items: [
    { name: "Jeera Rice", spice: "", price: "$10.99", desc: "Fragrant basmati rice tossed with toasted cumin seeds.", veg: true },
    { name: "Lemon Rice", spice: "🌶", price: "$10.99", desc: "Tangy lemon rice with crunchy peanuts.", veg: true },
    { name: "Coconut Rice", spice: "🌶", price: "$10.99", desc: "Basmati rice tossed with fresh coconut.", veg: true },
    { name: "Gongura Rice", spice: "🌶🌶", price: "$10.99", desc: "Basmati rice mixed with tangy sorrel paste.", veg: true },
    { name: "Tamarind Rice", spice: "🌶🌶", price: "$10.99", desc: "Traditional tangy tamarind rice with aromatic spices.", veg: true },
    { name: "Peas Pulao", spice: "🌶", price: "$10.99", desc: "Fragrant basmati pilaf with green peas.", veg: true },
    { name: "Plain Rice", spice: "", price: "$4.99", desc: "Steamed rice, light and fluffy.", veg: true }
  ]},
  { page: 9, col: "R", name: "Lunch Specials", items: [
    { name: "Maha Virundhu (Non-Veg)", spice: "", price: "$16.99", desc: "Grand non vegetarian feast with rice, meats, and sides.", veg: false },
    { name: "Maha Virundhu (Veg)", spice: "", price: "$14.99", desc: "Traditional vegetarian feast with rice, curries, and sides.", veg: true }
  ]},
  { page: 9, col: "R", name: "Parotta Specials", items: [
    { name: "Chicken Kothu Parotta", spice: "🌶🌶", price: "$17.99", desc: "Chopped parotta stir fried with chicken and spices.", veg: false },
    { name: "Egg Kothu Parotta", spice: "🌶🌶", price: "$16.99", desc: "Chopped parotta stir fried with egg and spices.", veg: false },
    { name: "Kizhi Parotta (Chicken/Mutton/Shrimp)", spice: "🌶🌶🌶", price: "$18.99 | $20.99 | $21.99", desc: "Parotta layered with spiced filling and wrapped for dum cooking.", veg: false },
    { name: "Parotta 2 pcs with Veg/Chicken Curry", spice: "🌶🌶", price: "$12.99 | $13.99", desc: "Parotta served with your choice of curry.", veg: "both" }
  ]},

  // ===== PAGE 10 — Desserts + Drinks =====
  { page: 10, col: "L", name: "Desserts", items: [
    { name: "Carrot Halwa", spice: "", price: "$7.99", desc: "Grated carrots slowly cooked with milk and nuts.", veg: true },
    { name: "Gulab Jamun (3 pcs)", spice: "", price: "$6.99", desc: "Soft milk dumplings soaked in fragrant cardamom syrup.", veg: true },
    { name: "Rasmalai (2 pcs)", spice: "", price: "$8.99", desc: "Spongy milk patties soaked in saffron milk.", veg: true }
  ]},
  { page: 10, col: "L", name: "Drinks", items: [
    { name: "Badam Milk", spice: "", price: "$5.99", desc: "Warm almond milk scented with saffron.", veg: true },
    { name: "Butter Milk", spice: "", price: "$5.99", desc: "Traditional spiced yogurt drink, creamy and refreshing.", veg: true },
    { name: "Chiku Shake", spice: "", price: "$5.99", desc: "Creamy milkshake blended with sweet sapodilla.", veg: true },
    { name: "Lime Soda", spice: "", price: "$4.99", desc: "Fizzy citrus quencher with tangy zest.", veg: true },
    { name: "Madras Coffee", spice: "", price: "$3.49", desc: "Authentic South Indian filtered coffee.", veg: true },
    { name: "Mango Lassi", spice: "", price: "$6.99", desc: "Rich yogurt blended with ripe mangoes.", veg: true },
    { name: "Mango Shake", spice: "", price: "$5.99", desc: "Refreshing shake blended with mango.", veg: true },
    { name: "Masala Chai", spice: "", price: "$2.99", desc: "Spiced Indian tea with milk and sugar.", veg: true }
  ]},
  { page: 10, col: "R", name: "Drinks", continued: true, items: [
    { name: "Rose Milk", spice: "", price: "$5.99", desc: "Chilled milk infused with fragrant rose.", veg: true },
    { name: "Sodas (Pepsi/Fanta/Thumbsup)", spice: "", price: "$3.99", desc: "Chilled selection of popular fizzy sodas.", veg: true },
    { name: "Sweet Lassi", spice: "", price: "$5.99", desc: "Classic thick and sweetened yogurt cooler.", veg: true }
  ]}
];

// ---- State ----
const DEFAULT_PRINTED_TEXT = {
  legendTitle: "Spice Level", mild: "Mild", medium: "Medium", hot: "Hot",
  veg: "Veg", nonveg: "Non-Veg", tagline: "Feel the Taste",
  footer: "Aahaa Indian Kitchen · 1034 Weiland Rd, Buffalo Grove, IL 60089 · (872) 872-2422",
  biryaniSubtitle: "Freshly prepared biryani",
  preparation: "Preparation time approximately {minutes} minutes",
  generalPreparation: "Please allow approximately 10–15 minutes for all other items. Preparation times may vary during busy periods.",
  customPreparation: "{items}: please allow {minutes} minutes after ordering."
};
const PRINTED_TEXT_LABELS = {
  legendTitle: "Legend heading", mild: "Mild label", medium: "Medium label", hot: "Hot label",
  veg: "Vegetarian label", nonveg: "Non-vegetarian label", tagline: "Logo tagline",
  footer: "Footer (all pages)", biryaniSubtitle: "Biryani table subtitle",
  preparation: "Standard preparation message ({minutes} inserts the time)",
  generalPreparation: "General preparation note (below every menu page)",
  customPreparation: "Custom-time message ({items} inserts dish names; {minutes} inserts the time)"
};
let menuReadFailed = false;
const storedMenu = loadMenu();
let printedText = loadPrintedText(storedMenu.printedText);
let editingPrintedPageId = null;
let menuData = normalizeMenuData(Array.isArray(storedMenu) ? storedMenu : storedMenu.sections);
let designData = loadDesign();
let menuPages = Array.isArray(storedMenu.pages) ? storedMenu.pages : [];
let biryaniLayoutRevision = storedMenu.biryaniLayoutRevision || 0;
let tandoorRevision = storedMenu.tandoorRevision || 0;
let workbookRevision = storedMenu.workbookRevision || 0;
let editingContext = null; // { sectionIndex, itemIndex } or null for new item
let currentPageIndex = 0;
let totalPages = 0;
let editingSectionIndex = null;
let movingContext = null;
let draggedContent = null;
let customerPreview = false;
let undoHistory = [];
let redoHistory = [];
let lastSavedSnapshot = "";
let layoutCheckFrame = 0;
const needsBiryaniUpdate = !menuReadFailed && storedMenu.biryaniRevision !== 1;

function normalizeMenuData(rawData) {
  if (!Array.isArray(rawData)) return [];

  // New format: section-based [{ name, items }]
  const looksNormalized = rawData.every(section =>
    section &&
    typeof section === "object" &&
    typeof section.name === "string" &&
    Array.isArray(section.items) &&
    !Object.prototype.hasOwnProperty.call(section, "page")
  );
  if (looksNormalized) {
    return rawData.map(section => ({
      ...section,
      name: section.name,
      items: section.items.map(item => ({ ...item }))
    }));
  }

  // Legacy format: page/column chunks -> consolidate by section name.
  const sectionMap = new Map();
  const sections = [];
  rawData.forEach(chunk => {
    if (!chunk || typeof chunk.name !== "string" || !Array.isArray(chunk.items)) return;
    if (!sectionMap.has(chunk.name)) {
      const section = { name: chunk.name, items: [] };
      sectionMap.set(chunk.name, section);
      sections.push(section);
    }
    const target = sectionMap.get(chunk.name);
    chunk.items.forEach(item => target.items.push({ ...item }));
  });

  return sections;
}

function loadMenu() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        if (!parsed.every(section => section && typeof section.name === "string" && Array.isArray(section.items) &&
          section.items.every(item => item && typeof item.name === "string" && typeof item.price === "string"))) {
          throw new Error("Invalid legacy menu data.");
        }
      } else validateDocument(parsed);
      return parsed;
    }
  } catch (error) {
    menuReadFailed = true;
    console.error("Could not load saved menu", error);
    alert("Your saved menu could not be loaded. Defaults are shown. The stored copy has not been overwritten; restore a backup before editing.");
  }
  return JSON.parse(JSON.stringify(DEFAULT_MENU));
}

const SAVED_VERSIONS_KEY = "aahaaMenuSavedVersions";

function readSavedVersions() {
  const versions = JSON.parse(localStorage.getItem(SAVED_VERSIONS_KEY) || "[]");
  if (!Array.isArray(versions) || versions.length > 10) throw new Error("Invalid saved versions.");
  versions.forEach(version => {
    if (!version || typeof version.snapshot !== "string" ||
        typeof version.savedAt !== "string" || !Number.isFinite(Date.parse(version.savedAt))) {
      throw new Error("Invalid saved version.");
    }
    validateDocument(JSON.parse(version.snapshot));
  });
  return versions;
}

function persistMenuSnapshot(snapshot) {
  const previous = localStorage.getItem(STORAGE_KEY);
  if (previous && previous !== snapshot) {
    const data = JSON.parse(previous);
    if (data.version === 2) {
      validateDocument(data);
      const versions = readSavedVersions();
      versions.unshift({ savedAt: new Date().toISOString(), snapshot: previous });
      localStorage.setItem(SAVED_VERSIONS_KEY, JSON.stringify(versions.slice(0, 10)));
    }
  }
  localStorage.setItem(STORAGE_KEY, snapshot);
}

function openSavedVersions() {
  if (!requireManager()) return;
  try {
    const versions = readSavedVersions();
    const select = document.getElementById("savedVersionSelect");
    select.innerHTML = versions.map((version, index) =>
      `<option value="${index}">${index + 1}. ${escapeHtml(new Date(version.savedAt).toLocaleString())}</option>`).join("");
    if (!versions.length) select.innerHTML = '<option value="">No previous versions yet</option>';
    document.getElementById("savedVersionsRestoreBtn").disabled = !versions.length;
    document.getElementById("savedVersionsModal").classList.remove("hidden");
  } catch (error) {
    console.error("Could not load saved versions", error);
    alert("Saved versions could not be loaded. Download a backup of your current menu.");
  }
}

function restoreSavedVersion() {
  if (!requireManager()) return;
  try {
    const value = document.getElementById("savedVersionSelect").value;
    const version = value === "" ? null : readSavedVersions()[Number(value)];
    if (!version) throw new Error("Choose an existing saved version.");
    if (!confirm("Restore this menu version? Your current menu will be kept in Saved versions.")) return;
    persistMenuSnapshot(version.snapshot);
    undoHistory.push(documentSnapshot());
    if (undoHistory.length > 40) undoHistory.shift();
    redoHistory = [];
    restoreSnapshot(version.snapshot);
    lastSavedSnapshot = version.snapshot;
    saveDesign();
    document.getElementById("saveStatus").textContent = "Saved in this browser";
    document.getElementById("savedVersionsModal").classList.add("hidden");
  } catch (error) {
    console.error("Could not restore saved version", error);
    alert(`Could not restore version: ${error.message}. Download a backup before continuing.`);
  }
}

function saveMenu() {
  if (menuReadFailed) {
    document.getElementById("saveStatus").textContent = "Not saved - restore a backup or reset first";
    return false;
  }
  const snapshot = documentSnapshot();
  try {
    persistMenuSnapshot(snapshot);
  } catch (error) {
    console.error("Could not save menu", error);
    alert("The menu could not be saved in this browser. Download a backup now to avoid losing these changes.");
    document.getElementById("saveStatus").textContent = "Not saved - download a backup";
    return false;
  }
  if (lastSavedSnapshot && lastSavedSnapshot !== snapshot) {
    undoHistory.push(lastSavedSnapshot);
    if (undoHistory.length > 40) undoHistory.shift();
    redoHistory = [];
  }
  lastSavedSnapshot = snapshot;
  document.getElementById("saveStatus").textContent = "Saved in this browser";
  updateHistoryButtons();
  return true;
}

function loadDesign() {
  if (storedMenu.design) return { ...DEFAULT_DESIGN, ...storedMenu.design };
  const saved = localStorage.getItem(DESIGN_STORAGE_KEY);
  if (saved) {
    try { return { ...DEFAULT_DESIGN, ...JSON.parse(saved) }; } catch (e) { /* fall through */ }
  }
  return { ...DEFAULT_DESIGN };
}

function saveDesign() {
  try {
    localStorage.setItem(DESIGN_STORAGE_KEY, JSON.stringify(designData));
  } catch (error) {
    console.error("Could not save menu design", error);
    alert("The design could not be saved. Download a backup before closing this page.");
  }
}

function applyDesign() {
  const root = document.documentElement.style;
  root.setProperty("--heading-font", designData.headingFont);
  root.setProperty("--body-font", designData.bodyFont);
  root.setProperty("--heading-weight", designData.headingWeight);
  root.setProperty("--item-name-weight", designData.itemNameWeight);
  root.setProperty("--price-weight", designData.priceWeight);
  root.setProperty("--desc-style", designData.descStyle);
  root.setProperty("--accent", designData.accentColor);
  root.setProperty("--item-font-size", designData.itemFontSize + "px");
  root.setProperty("--column-count", designData.columnCount);

  document.getElementById("headingFont").value = designData.headingFont;
  document.getElementById("bodyFont").value = designData.bodyFont;
  document.getElementById("headingWeight").value = String(designData.headingWeight);
  document.getElementById("itemNameWeight").value = String(designData.itemNameWeight);
  document.getElementById("priceWeight").value = String(designData.priceWeight);
  document.getElementById("descStyle").value = designData.descStyle;
  document.getElementById("accentColor").value = designData.accentColor;
  document.getElementById("itemFontSize").value = designData.itemFontSize;
  document.getElementById("itemFontSizeLabel").textContent = designData.itemFontSize + "px";
  document.getElementById("columnCount").value = designData.columnCount;
  document.getElementById("headerStyle").value = designData.headerStyle || "fl-diamond";
  document.getElementById("themePreset").value = designData.themePreset || detectThemePreset(designData) || "custom";
}

function detectThemePreset(design) {
  const keys = Object.keys(THEME_PRESETS);
  for (const key of keys) {
    const preset = THEME_PRESETS[key];
    if (
      preset.headingFont === design.headingFont &&
      preset.bodyFont === design.bodyFont &&
      preset.accentColor.toLowerCase() === String(design.accentColor || "").toLowerCase() &&
      preset.headerStyle === design.headerStyle
    ) {
      return key;
    }
  }
  return "custom";
}

function applyThemePreset(presetKey) {
  if (!requireManager()) return;
  const preset = THEME_PRESETS[presetKey];
  if (!preset) {
    designData.themePreset = "custom";
    saveDesign();
    saveMenu();
    applyDesign();
    render();
    return;
  }

  designData.headingFont = preset.headingFont;
  designData.bodyFont = preset.bodyFont;
  designData.accentColor = preset.accentColor;
  designData.headerStyle = preset.headerStyle;
  designData.themePreset = presetKey;

  saveDesign();
  saveMenu();
  applyDesign();
  render();
}

function estimateItemUnits(item) {
  let units = 1.15;
  const nameLength = (item?.name || "").length;
  const descLength = (item?.desc || "").length;

  if (nameLength > 34) units += 0.25;
  if (nameLength > 55) units += 0.25;
  if (item?.veg === "both") units += 0.15;
  if (item.portions?.length) units += Math.ceil(item.portions.length / 2) * 0.8;

  if (descLength > 0) {
    units += 0.55;
    units += Math.ceil(descLength / 54) * 0.45;
  }

  return units;
}

function nextColumnPosition(position, activeColumns) {
  const nextCol = position.col + 1;
  if (nextCol >= activeColumns) {
    return { page: position.page + 1, col: 0 };
  }
  return { page: position.page, col: nextCol };
}

// ---- Pagination: auto-flow sections by estimated content height ----
function buildAutoPages(sections = menuData, design = designData) {
  const colsPerPage = design.columnCount === 1 ? 1 : 2;
  const activeColumns = colsPerPage === 1 ? 1 : 2;
  const columnCapacity = colsPerPage === 1 ? 65 : 33;
  const sectionHeaderUnits = 2.7;

  const pages = [{ cols: [[], []], used: [0, 0] }];
  let position = { page: 0, col: 0 };

  sections.forEach((section, sectionIndex) => {
    if (!section.items.length) return;

    const itemRefs = section.items.map((item, itemIdx) => ({ item, itemIdx }));
    let itemPointer = 0;
    let continued = false;

    while (itemPointer < itemRefs.length) {
      const page = pages[position.page];
      const used = page.used[position.col];
      const firstItemUnits = estimateItemUnits(itemRefs[itemPointer].item);
      const requiredUnits = (continued ? 0 : sectionHeaderUnits) + firstItemUnits;

      if (used > 0 && used + requiredUnits > columnCapacity) {
        position = nextColumnPosition(position, activeColumns);
        if (!pages[position.page]) {
          pages.push({ cols: [[], []], used: [0, 0] });
        }
        continue;
      }

      const chunk = {
        sectionIndex,
        name: section.name,
        continued,
        items: []
      };

      if (!continued) {
        page.used[position.col] += sectionHeaderUnits;
      }

      while (itemPointer < itemRefs.length) {
        const ref = itemRefs[itemPointer];
        const units = estimateItemUnits(ref.item);
        const remaining = columnCapacity - page.used[position.col];

        if (chunk.items.length > 0 && units > remaining) break;

        chunk.items.push(ref);
        page.used[position.col] += units;
        itemPointer += 1;

        // Force at least one item per chunk even if it is tall.
        if (chunk.items.length === 1 && page.used[position.col] > columnCapacity) break;
      }

      page.cols[position.col].push(chunk);
      continued = true;

      if (itemPointer < itemRefs.length) {
        position = nextColumnPosition(position, activeColumns);
        if (!pages[position.page]) {
          pages.push({ cols: [[], []], used: [0, 0] });
        }
      }
    }
  });

  return pages.map(p => ({ cols: p.cols }));
}

function convertLegacyDocument(rawSections, design = designData) {
  const oldSections = normalizeMenuData(rawSections);
  const pages = buildAutoPages(oldSections, design);
  const convertedPages = pages.map((_, index) => ({ id: newPageId(), title: `Page ${index + 1}` }));
  const convertedSections = [];
  pages.forEach((page, pageIndex) => page.cols.forEach((chunks, column) => {
    chunks.forEach(chunk => convertedSections.push({
      name: chunk.name,
      pageId: convertedPages[pageIndex].id,
      column,
      items: chunk.items.map(ref => ref.item)
    }));
  }));
  oldSections.filter(section => !section.items.length).forEach(section => {
    convertedSections.push({ ...section, pageId: convertedPages[0].id, column: 0 });
  });
  return { version: 2, biryaniRevision: 1, sections: convertedSections, pages: convertedPages, design };
}

function initializePages() {
  if (menuPages.length) return;
  const converted = convertLegacyDocument(menuData);
  menuData = converted.sections;
  menuPages = converted.pages;
}

function updateTandoorMenu() {
  if (tandoorRevision === 1) return;
  const sections = menuPages.flatMap(page => menuData
    .filter(section => section.pageId === page.id && section.name.toLowerCase() === "tandoor")
    .sort((left, right) => left.column - right.column));
  if (sections.length) {
    const breadNames = new Set(["Aloo Paratha", "Bread Basket", "Bullet Naan", "Butter Roti"]);
    const breads = sections.flatMap(section => section.items.filter(item => breadNames.has(item.name)));
    if (breads.length) {
      let naan = menuData.find(section => section.name.toLowerCase() === "naan");
      if (!naan) {
        naan = { name: "Naan", pageId: sections.at(-1).pageId, column: sections.at(-1).column, items: [] };
        menuData.push(naan);
      }
      breads.forEach(item => {
        if (!naan.items.some(existing => existing.name === item.name)) naan.items.push(item);
      });
    }
    const items = DEFAULT_MENU.filter(section => section.name === "Tandoor")
      .flatMap(section => section.items.map(item => ({ ...item })));
    let offset = 0;
    sections.forEach((section, index) => {
      const count = index === sections.length - 1 ? items.length - offset :
        Math.min(section.items.filter(item => !breadNames.has(item.name)).length, items.length - offset);
      section.items = items.slice(offset, offset + count);
      offset += count;
    });
  }
  tandoorRevision = 1;
}

function loadPrintedText(saved) {
  const text = { ...DEFAULT_PRINTED_TEXT, ...saved };
  if (text.generalPreparation === "Note: All other items preparation time approximately 10 to 15 minutes based on timing.") {
    text.generalPreparation = DEFAULT_PRINTED_TEXT.generalPreparation;
  }
  if (saved && !Object.hasOwn(saved, "generalPreparation") &&
      saved.preparation === "Preparation time: Maximum {minutes} minutes from the time the order is placed.") {
    text.preparation = DEFAULT_PRINTED_TEXT.preparation;
  }
  return text;
}

function prepTimeMarker(item) {
  return item.prepTime === "30-40" ? "**" : item.prepTime || item.prepNote ? "*" : "";
}

function validPrepTime(value) {
  if (typeof value !== "string") return false;
  if (!value) return true;
  if (!/^[1-9]\d{0,2}(?:-[1-9]\d{0,2})?$/.test(value)) return false;
  const [minimum, maximum] = value.split("-").map(Number);
  return maximum === undefined || maximum >= minimum;
}

function preparationNotesHtml(items) {
  const automatic = items.filter(item => !item.prepNote);
  const times = new Set(automatic.map(item => item.prepTime));
  const standard = ["20-30", "30-40"].filter(time => times.has(time)).map(time =>
    `<p><strong>${prepTimeMarker({ prepTime: time })}</strong> ${escapeHtml(printedText.preparation.replaceAll("{minutes}", time.replace("-", " to ")))}</p>`
  ).join("");
  const custom = [...times].filter(time => time && !["20-30", "30-40"].includes(time)).map(time =>
    `<p><strong>*</strong> ${escapeHtml(printedText.customPreparation.replaceAll("{minutes}", time.replace("-", "–")).replaceAll("{items}", automatic.filter(item => item.prepTime === time).map(item => item.name).join(", ")))}</p>`
  ).join("");
  return standard + custom + items.filter(item => item.prepNote).map(item =>
    `<p><strong>${prepTimeMarker(item)}</strong> ${escapeHtml(item.name)}: ${escapeHtml(item.prepNote)}</p>`).join("");
}

function openPrintedContent(pageIndex) {
  if (!requireManager()) return;
  editingPrintedPageId = Number.isInteger(pageIndex) ? menuPages[pageIndex]?.id : null;
  document.getElementById("printedTextFields").innerHTML = "";
  for (const key of Object.keys(DEFAULT_PRINTED_TEXT)) {
    const label = document.createElement("label");
    label.textContent = PRINTED_TEXT_LABELS[key];
    const input = document.createElement("textarea");
    input.id = `printed-${key}`;
    input.rows = key === "footer" || key.includes("reparation") ? 2 : 1;
    input.maxLength = 1000;
    input.value = printedText[key];
    label.appendChild(input);
    document.getElementById("printedTextFields").appendChild(label);
  }
  const page = menuPages.find(page => page.id === editingPrintedPageId);
  document.getElementById("printedPageHeadingLabel").hidden = !page;
  document.getElementById("printedPageHeading").value = page?.heading || "";
  document.getElementById("printedContentModal").classList.remove("hidden");
}

function savePrintedContent() {
  if (!requireManager()) return;
  const updated = Object.fromEntries(Object.keys(DEFAULT_PRINTED_TEXT).map(key =>
    [key, document.getElementById(`printed-${key}`).value.trim()]));
  if (Object.values(updated).some(value => value.length > 1000)) {
    alert("Keep each text field within 1,000 characters.");
    return;
  }
  const page = menuPages.find(page => page.id === editingPrintedPageId);
  const heading = document.getElementById("printedPageHeading").value.trim();
  if (heading.length > 200) { alert("Keep the page heading within 200 characters."); return; }
  printedText = updated;
  if (page) page.heading = heading;
  const saved = saveMenu();
  render();
  if (!saved) return;
  document.getElementById("printedContentModal").classList.add("hidden");
}

function arrangeBiryaniPage() {
  const sections = menuPages.flatMap(page => menuData
    .filter(section => section.pageId === page.id && section.name.toLowerCase() === "biryani")
    .sort((left, right) => left.column - right.column));
  biryaniLayoutRevision = 1;
  menuData.forEach(section => section.items.forEach(item => {
    if (!item.spice && item.spiceOptions) item.spice = spiceFromOptions(item.spiceOptions);
  }));
  if (!sections.length) return;
  const first = sections[0];
  const startIndex = menuPages.findIndex(page => page.id === first.pageId);
  const sourcePages = new Set(sections.map(section => section.pageId));
  const combos = menuData.filter(section => section.name.toLowerCase() === "combos");
  combos.forEach(section => sourcePages.add(section.pageId));
  const items = sections.flatMap(section => section.items);
  menuData = menuData.filter(section => !sections.includes(section));
  const startPage = menuPages[startIndex];
  const hasOtherContent = menuData.some(section => section.pageId === startPage.id && !combos.includes(section));
  let featuredPage;
  let previousPage;
  if (hasOtherContent) {
    previousPage = startPage;
    featuredPage = { id: newPageId(), title: "Biryani", layout: "biryani" };
    menuPages.splice(startIndex + 1, 0, featuredPage);
  } else {
    featuredPage = startPage;
    featuredPage.title = "Biryani";
    featuredPage.layout = "biryani";
    previousPage = menuPages[startIndex - 1];
    if (!previousPage && combos.length) {
      previousPage = { id: newPageId(), title: "Combos" };
      menuPages.splice(startIndex, 0, previousPage);
    }
  }
  combos.forEach(section => {
    section.pageId = previousPage.id;
    section.column = designData.columnCount === 1 ? 0 : 1;
  });
  menuData.push({ ...first, pageId: featuredPage.id, column: 0, items });
  menuPages = menuPages.filter(page => page === featuredPage || page === previousPage ||
    !sourcePages.has(page.id) || menuData.some(section => section.pageId === page.id));
}

function pageColumnCount(pageId) {
  return menuPages.find(page => page.id === pageId)?.layout === "biryani" ? 1 :
    designData.columnCount === 1 ? 1 : 2;
}

function buildPages(includeUnavailable = false) {
  const cleanView = customerPreview || document.body.classList.contains("pdf-export") || document.body.classList.contains("printing");
  return menuPages.map(page => {
    const columns = pageColumnCount(page.id);
    return {
      ...page,
      cols: Array.from({ length: columns }, (_, column) => menuData.flatMap((section, sectionIndex) => {
        if (section.pageId !== page.id || (columns === 1 ? 0 : section.column) !== column) return [];
        const items = section.items.map((item, itemIdx) => ({ item, itemIdx }))
          .filter(ref => includeUnavailable || (ref.item.available !== false && itemHasPrice(ref.item)));
        if (!items.length && (cleanView || section.items.length > 0) && !includeUnavailable) return [];
        return [{ sectionIndex, name: section.name, items }];
      }))
    };
  }).filter(page => includeUnavailable || page.cols.some(col => col.some(chunk => chunk.items.length)) ||
    !menuData.some(section => section.pageId === page.id && section.items.length));
}

// ---- Rendering ----
function render() {
  const pages = buildPages();
  const container = document.getElementById("pagesContainer");
  container.innerHTML = "";

  pages.forEach((page, pageIdx) => {
    const colsPerPage = pageColumnCount(page.id);
    const featured = page.layout === "biryani";
    const portionLabels = [...new Set(page.cols.flatMap(chunks => chunks.flatMap(chunk =>
      chunk.items.flatMap(ref => (ref.item.portions || []).map(portion => portion.label)))))];
    const pageEl = document.createElement("div");
    pageEl.className = "page" + (featured ? " featured-biryani" : "");
    if (featured) pageEl.style.setProperty("--portion-count", Math.max(1, portionLabels.length));
    pageEl.id = `page-${pageIdx}`;
    pageEl.dataset.pageId = page.id;
    pageEl.dataset.sourcePageIndex = menuPages.findIndex(entry => entry.id === page.id);
    if (pageIdx < pages.length - 1) pageEl.style.pageBreakAfter = "always";

    pageEl.innerHTML = `
      <div class="page-frame">
        <span class="corner tl">❖</span>
        <span class="corner tr">❖</span>
        <span class="corner bl">❖</span>
        <span class="corner br">❖</span>
      </div>
      <div class="page-header">
        <div class="page-legend">
          <div class="legend-title">${escapeHtml(printedText.legendTitle)}</div>
          <div class="legend-row">
            <span class="legend-item"><span class="legend-chili">🌶</span> ${escapeHtml(printedText.mild)}</span>
            <span class="legend-item"><span class="legend-chili">🌶🌶</span> ${escapeHtml(printedText.medium)}</span>
            <span class="legend-item"><span class="legend-chili">🌶🌶🌶</span> ${escapeHtml(printedText.hot)}</span>
          </div>
          <div class="legend-row">
            <span class="legend-item"><span class="veg-icon"></span> ${escapeHtml(printedText.veg)}</span>
            <span class="legend-item"><span class="nonveg-icon"></span> ${escapeHtml(printedText.nonveg)}</span>
          </div>
        </div>
        <div class="page-logo-wrap">
          <img src="assets/logo.png" alt="Aahaa Indian Kitchen" class="page-logo">
          <div class="page-tagline">${escapeHtml(printedText.tagline)}</div>
        </div>
      </div>
      ${page.heading ? `<h1 class="printed-page-heading">${escapeHtml(page.heading)}</h1>` : ""}
      <div class="page-body${colsPerPage === 1 ? " single-col" : ""}"></div>
      ${printedText.generalPreparation ? `<p class="general-preparation-note">${escapeHtml(printedText.generalPreparation)}</p>` : ""}
      <div class="page-footer">${escapeHtml(printedText.footer)}</div>
    `;

    const bodyEl = pageEl.querySelector(".page-body");
    const pageTools = document.createElement("div");
    pageTools.className = "page-tools manager-only";
    pageTools.textContent = `${pageIdx + 1}. ${page.title}`;
    const contentButton = document.createElement("button");
    contentButton.className = "btn btn-light";
    contentButton.textContent = "Edit heading, legend & footer";
    contentButton.addEventListener("click", () => openPrintedContent(menuPages.findIndex(entry => entry.id === page.id)));
    pageTools.appendChild(contentButton);
    pageEl.insertBefore(pageTools, pageEl.firstChild);
    page.cols.forEach((colChunks, colIdx) => {
      const colEl = document.createElement("div");
      colEl.className = "page-col";
      wireDropTarget(colEl, { pageId: page.id, column: colIdx });

      colChunks.forEach(chunk => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section" + (chunk.continued ? " section-continued" : "");
        sectionDiv.dataset.sectionIndex = chunk.sectionIndex;
        if (!chunk.items.some(ref => ref.item.available !== false)) sectionDiv.classList.add("empty-for-customers");
        wireDropTarget(sectionDiv, { pageId: page.id, column: colIdx, sectionIndex: chunk.sectionIndex });

        if (!chunk.continued) {
          const head = document.createElement("div");
          head.className = "section-head";
          head.innerHTML = `<h2>${escapeHtml(chunk.name)}</h2>
            <span class="section-controls manager-only">
              <button onclick="openSectionModal(${chunk.sectionIndex})" title="Edit section">Edit</button>
              <button onclick="openMoveModal(${chunk.sectionIndex})" title="Move section">Move</button>
              <button class="section-del" title="Delete section" onclick="deleteSection(${chunk.sectionIndex})">✕</button>
            </span>`;
          wireDragSource(head, { sectionIndex: chunk.sectionIndex });
          sectionDiv.appendChild(head);

          const flourish = document.createElement("div");
          flourish.className = "section-flourish " + (designData.headerStyle || "fl-diamond");
          flourish.innerHTML = flourishHtml(designData.headerStyle);
          sectionDiv.appendChild(flourish);
        }
        if (featured && portionLabels.length) {
          const priceHeader = document.createElement("div");
          priceHeader.className = "featured-price-header";
          priceHeader.innerHTML = `<span>${escapeHtml(printedText.biryaniSubtitle)}</span><div>${portionLabels.map(label => `<span>${escapeHtml(label)}</span>`).join("")}</div>`;
          sectionDiv.appendChild(priceHeader);
        }

        chunk.items.forEach(ref => {
          const item = ref.item;
          const row = document.createElement("div");
          row.className = "item" + (item.available === false ? " unavailable" : "");
          row.dataset.itemIndex = ref.itemIdx;
          wireDragSource(row, { sectionIndex: chunk.sectionIndex, itemIndex: ref.itemIdx });
          wireDropTarget(row, { pageId: page.id, column: colIdx, sectionIndex: chunk.sectionIndex, itemIndex: ref.itemIdx });
          row.innerHTML = `
            <div class="item-top">
              <span class="name">${escapeHtml(item.name)}${prepTimeMarker(item) ? `<sup class="prep-marker" aria-label="Preparation information">${prepTimeMarker(item)}</sup>` : ""}<span class="item-markers">${vegIconHtml(item.veg)}${item.spice ? `&nbsp;<span class="spice">${escapeHtml(item.spice)}</span>` : ""}</span></span>
              ${item.portions?.length ? "" : `<span class="price">${escapeHtml(item.price)}</span>`}
              <span class="item-actions">
                <button title="Edit" onclick="openItemModal(${chunk.sectionIndex}, ${ref.itemIdx})">✎</button>
                <button title="Move item" onclick="openMoveModal(${chunk.sectionIndex}, ${ref.itemIdx})">Move</button>
                <button title="Delete" onclick="deleteItem(${chunk.sectionIndex}, ${ref.itemIdx})">✕</button>
              </span>
            </div>
            ${item.portions?.length ? `<div class="portion-prices">${(featured ? portionLabels.map(label =>
              item.portions.find(portion => portion.label === label) || { label, price: "-" }) : item.portions)
              .map(portion => `<div><span>${escapeHtml(portion.label)}</span><strong>${escapeHtml(portion.price)}</strong></div>`).join("")}</div>` : ""}
            ${item.available === false ? '<div class="availability-label manager-only">Unavailable - hidden from customers</div>' : ""}
            ${item.desc ? `<div class="item-desc">${escapeHtml(item.desc)}</div>` : ""}`;
          sectionDiv.appendChild(row);
        });
        const notesHtml = preparationNotesHtml(chunk.items.map(ref => ref.item));
        if (notesHtml) {
          const notes = document.createElement("aside");
          notes.className = "preparation-notes";
          notes.setAttribute("aria-label", "Preparation times");
          notes.innerHTML = notesHtml;
          const noteTools = document.createElement("details");
          noteTools.className = "preparation-edit-tools manager-only";
          const noteSummary = document.createElement("summary");
          noteSummary.textContent = "Edit preparation info";
          noteTools.appendChild(noteSummary);
          const editWording = document.createElement("button");
          editWording.className = "btn btn-light";
          editWording.textContent = "Edit preparation wording";
          editWording.addEventListener("click", () => openPrintedContent());
          noteTools.appendChild(editWording);
          chunk.items.filter(ref => prepTimeMarker(ref.item)).forEach(ref => {
            const editItem = document.createElement("button");
            editItem.className = "btn btn-light";
            editItem.textContent = `Edit ${ref.item.name} note`;
            editItem.addEventListener("click", () => openItemModal(chunk.sectionIndex, ref.itemIdx));
            noteTools.appendChild(editItem);
          });
          notes.appendChild(noteTools);
          sectionDiv.appendChild(notes);
        }
        colEl.appendChild(sectionDiv);
      });

      bodyEl.appendChild(colEl);
      if (colIdx === 0 && colsPerPage === 2) {
        const divider = document.createElement("div");
        divider.className = "col-divider";
        bodyEl.appendChild(divider);
      }
    });

    container.appendChild(pageEl);
  });

  totalPages = pages.length;
  if (currentPageIndex >= totalPages) currentPageIndex = Math.max(0, totalPages - 1);
  updatePageIndicator();
  populateSectionDropdown();
  if (!document.getElementById("organizeModal").classList.contains("hidden")) renderPageBoard();
  updateHistoryButtons();
  if (!document.getElementById("catalogView").hidden) renderCatalog();
  cancelAnimationFrame(layoutCheckFrame);
  layoutCheckFrame = requestAnimationFrame(checkPageOverflow);
}

// ---- Page navigation (screen view) ----
function updatePageIndicator() {
  document.getElementById("pageIndicator").textContent = `Page ${totalPages === 0 ? 0 : currentPageIndex + 1} / ${totalPages}`;
  document.getElementById("prevPageBtn").disabled = currentPageIndex <= 0;
  document.getElementById("nextPageBtn").disabled = currentPageIndex >= totalPages - 1;
}
function goToPage(idx) {
  if (idx < 0 || idx >= totalPages) return;
  currentPageIndex = idx;
  const el = document.getElementById(`page-${idx}`);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  updatePageIndicator();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function vegIconHtml(veg) {
  if (veg === true) return ' <span class="veg-icon" title="Veg"></span>';
  if (veg === false) return ' <span class="nonveg-icon" title="Non-Veg"></span>';
  if (veg === "both") return ' <span class="veg-icon" title="Veg option"></span><span class="nonveg-icon" title="Non-Veg option"></span>';
  return "";
}

// Returns the center ornament markup for the section header divider,
// based on the currently selected header divider theme.
function flourishHtml(style) {
  switch (style) {
    case "fl-leaf": return "<span>❦</span>";
    case "fl-star": return "<span>✦</span>";
    case "fl-double": return "<span>❖</span>";
    case "fl-dots": return "<span>• • •</span>";
    case "fl-ribbon": return "<span>⟨ ❖ ⟩</span>";
    case "fl-none": return "";
    case "fl-diamond":
    default: return "<span>❖</span>";
  }
}

// ---- Item CRUD ----
function deleteItem(sIdx, iIdx) {
  if (!requireManager()) return;
  if (!confirm("Remove this item from the menu?")) return;
  menuData[sIdx].items.splice(iIdx, 1);
  saveMenu();
  render();
}

function deleteSection(sIdx) {
  if (!requireManager()) return;
  if (!confirm(`Remove the entire "${menuData[sIdx].name}" section?`)) return;
  menuData.splice(sIdx, 1);
  saveMenu();
  render();
}

function openItemModal(sIdx, iIdx) {
  if (!requireManager()) return;
  if (!menuData.length) {
    alert("Create a section first, then add its items.");
    openSectionModal();
    return;
  }
  document.getElementById("organizeModal").classList.add("hidden");
  editingContext = (sIdx === undefined) ? null : { sIdx, iIdx };
  const modal = document.getElementById("itemModal");
  const title = document.getElementById("modalTitle");
  const nameInput = document.getElementById("itemName");
  const descInput = document.getElementById("itemDesc");
  const priceInput = document.getElementById("itemPrice");
  const spiceInput = document.getElementById("itemSpice");
  const vegInput = document.getElementById("itemVeg");
  const sectionSelect = document.getElementById("itemSection");

  if (iIdx !== undefined && sIdx !== undefined) {
    title.textContent = "Edit Item";
    const item = menuData[sIdx].items[iIdx];
    nameInput.value = item.name;
    descInput.value = item.desc || "";
    priceInput.value = item.price;
    spiceInput.value = item.spice || "";
    vegInput.value = vegToSelectValue(item.veg);
    sectionSelect.value = sIdx;
  } else {
    title.textContent = "Add Item";
    nameInput.value = "";
    descInput.value = "";
    priceInput.value = "";
    spiceInput.value = "";
    vegInput.value = "none";
    if (sIdx !== undefined) sectionSelect.value = sIdx;
  }
  const item = editingContext ? menuData[sIdx].items[iIdx] : null;
  document.getElementById("usePortions").checked = Boolean(item?.portions?.length);
  document.getElementById("portionRows").innerHTML = "";
  (item?.portions || PORTION_LABELS.map(label => ({ label, price: "" }))).forEach(addPortionRow);
  document.getElementById("itemAvailable").checked = item?.available !== false;
  const prepTime = item?.prepTime || "";
  document.getElementById("itemPrepTime").value = ["", "20-30", "30-40"].includes(prepTime) ? prepTime : "custom";
  document.getElementById("customPrepTime").value = prepTime;
  document.getElementById("itemPrepNote").value = item?.prepNote || "";
  document.getElementById("customPrepTimeLabel").hidden = document.getElementById("itemPrepTime").value !== "custom";
  updatePortionEditor();
  modal.classList.remove("hidden");
  nameInput.focus();
}

function vegToSelectValue(veg) {
  if (veg === true) return "veg";
  if (veg === false) return "nonveg";
  if (veg === "both") return "both";
  return "none";
}

function selectValueToVeg(value) {
  if (value === "veg") return true;
  if (value === "nonveg") return false;
  if (value === "both") return "both";
  return undefined;
}

function closeItemModal() {
  document.getElementById("itemModal").classList.add("hidden");
  editingContext = null;
}

function populateSectionDropdown() {
  const sectionSelect = document.getElementById("itemSection");
  sectionSelect.innerHTML = menuData
    .map((s, idx) => `<option value="${idx}">${escapeHtml(s.name)} - ${escapeHtml(menuPages.find(page => page.id === s.pageId)?.title || "")} (${s.column === 1 ? "Right" : "Left"})</option>`)
    .join("");
}

function saveItem() {
  if (!requireManager()) return;
  const name = document.getElementById("itemName").value.trim();
  const desc = document.getElementById("itemDesc").value.trim();
  const price = document.getElementById("itemPrice").value.trim();
  const spice = document.getElementById("itemSpice").value;
  const veg = selectValueToVeg(document.getElementById("itemVeg").value);
  const sIdx = parseInt(document.getElementById("itemSection").value, 10);

  let portions;
  try { portions = readPortions(); } catch (error) { alert(error.message); return; }
  if (!name) {
    alert("Please enter an item name.");
    return;
  }
  if (!Number.isInteger(sIdx) || !menuData[sIdx]) { alert("Choose a section first."); return; }
  const previous = editingContext ? menuData[editingContext.sIdx].items[editingContext.iIdx] : {};
  const prepTimeChoice = document.getElementById("itemPrepTime").value;
  const prepTime = prepTimeChoice === "custom" ? document.getElementById("customPrepTime").value.trim() : prepTimeChoice;
  const prepNote = document.getElementById("itemPrepNote").value.trim();
  if (prepNote.length > 1000) { alert("Keep the preparation message within 1,000 characters."); return; }
  if (!validPrepTime(prepTime) || (prepTimeChoice === "custom" && !prepTime)) {
    alert("Enter preparation minutes from 1 to 999, such as 45 or 45-60. The end time must not be less than the start.");
    return;
  }
  const updated = {
    ...previous, name, price: portions.length ? portions.map(portion => portion.price).join(" | ") : price,
    spice, desc, veg, portions,
    spiceOptions: "",
    prepTime, prepNote,
    available: document.getElementById("itemAvailable").checked
  };
  if (updated.available && !itemHasPrice(updated)) {
    alert("Enter valid numeric prices before enabling this item, or uncheck Available to keep it as an unpriced catalog item.");
    return;
  }

  if (editingContext && editingContext.iIdx !== undefined) {
    // editing existing item — if section changed, move it
    const { sIdx: oldS, iIdx: oldI } = editingContext;
    if (oldS === sIdx) {
      menuData[sIdx].items[oldI] = updated;
    } else {
      menuData[oldS].items.splice(oldI, 1);
      menuData[sIdx].items.push(updated);
    }
  } else {
    menuData[sIdx].items.push(updated);
  }

  saveMenu();
  render();
  closeItemModal();
}

// ---- Section CRUD ----
function openSectionModal(sectionIndex) {
  if (!requireManager()) return;
  document.getElementById("organizeModal").classList.add("hidden");
  editingSectionIndex = Number.isInteger(sectionIndex) ? sectionIndex : null;
  const section = editingSectionIndex === null ? null : menuData[editingSectionIndex];
  document.getElementById("sectionModalTitle").textContent = section ? "Edit Section" : "Add Section";
  document.getElementById("newSectionName").value = section?.name || "";
  fillPageSelect("sectionPage", section?.pageId || buildPages()[currentPageIndex]?.id || menuPages[0].id);
  document.getElementById("sectionColumn").value = String(section?.column || 0);
  document.getElementById("sectionColumn").disabled = pageColumnCount(selectedPageId("sectionPage")) === 1;
  if (document.getElementById("sectionColumn").disabled) document.getElementById("sectionColumn").value = "0";
  document.getElementById("sectionModal").classList.remove("hidden");
}
function closeSectionModal() {
  document.getElementById("sectionModal").classList.add("hidden");
}
function saveSection() {
  if (!requireManager()) return;
  const name = document.getElementById("newSectionName").value.trim();
  if (!name) { alert("Please enter a section name."); return; }
  const placement = {
    name, pageId: selectedPageId("sectionPage"),
    column: pageColumnCount(selectedPageId("sectionPage")) === 1 ? 0 : Number(document.getElementById("sectionColumn").value)
  };
  if (editingSectionIndex === null) menuData.push({ ...placement, items: [] });
  else Object.assign(menuData[editingSectionIndex], placement);
  saveMenu();
  render();
  closeSectionModal();
}

// ---- Reset ----
function resetMenu() {
  if (!requireManager()) return;
  if (!confirm("Reset the menu back to the original default list? This will discard any changes you made.")) return;
  menuReadFailed = false;
  menuData = normalizeMenuData(JSON.parse(JSON.stringify(DEFAULT_MENU)));
  printedText = { ...DEFAULT_PRINTED_TEXT };
  workbookRevision = 0;
  menuPages = [];
  initializePages();
  updateTandoorMenu();
  arrangeBiryaniPage();
  reconcileWorkbookMenu();
  saveMenu();
  render();
}

// ---- Design modal ----
function openDesignModal() {
  if (!requireManager()) return;
  document.getElementById("designModal").classList.remove("hidden");
}
function closeDesignModal() {
  document.getElementById("designModal").classList.add("hidden");
}
function handleDesignChange() {
  if (!requireManager()) return;
  designData.headingFont = document.getElementById("headingFont").value;
  designData.bodyFont = document.getElementById("bodyFont").value;
  designData.headingWeight = parseInt(document.getElementById("headingWeight").value, 10);
  designData.itemNameWeight = parseInt(document.getElementById("itemNameWeight").value, 10);
  designData.priceWeight = parseInt(document.getElementById("priceWeight").value, 10);
  designData.descStyle = document.getElementById("descStyle").value;
  designData.accentColor = document.getElementById("accentColor").value;
  designData.itemFontSize = parseInt(document.getElementById("itemFontSize").value, 10);
  designData.columnCount = parseInt(document.getElementById("columnCount").value, 10);
  designData.headerStyle = document.getElementById("headerStyle").value;
  document.getElementById("itemFontSizeLabel").textContent = designData.itemFontSize + "px";
  document.getElementById("columnCount").value = designData.columnCount;
  document.getElementById("headerStyle").value = designData.headerStyle || "fl-diamond";
  designData.themePreset = detectThemePreset(designData);
  document.getElementById("themePreset").value = designData.themePreset;
  saveDesign();
  saveMenu();
  applyDesign();
  render();
}
function resetDesign() {
  if (!requireManager()) return;
  if (!confirm("Reset fonts, colors and layout back to default?")) return;
  designData = { ...DEFAULT_DESIGN };
  saveDesign();
  saveMenu();
  applyDesign();
  render();
}

function newPageId() {
  return crypto.randomUUID();
}

function documentSnapshot() {
  return JSON.stringify({ version: 2, biryaniRevision: 1, biryaniLayoutRevision, tandoorRevision, workbookRevision, sections: menuData, pages: menuPages, design: designData, printedText });
}

function validateDocument(data) {
  if (!data || data.version !== 2 || !Array.isArray(data.sections) ||
      !Array.isArray(data.pages) || !data.pages.length) throw new Error("Not a supported menu backup.");
  const ids = new Set();
  for (const page of data.pages) {
    if (!page || typeof page.id !== "string" || ids.has(page.id) || typeof page.title !== "string") {
      throw new Error("Invalid or duplicate page in backup.");
    }
    if (page.layout !== undefined && page.layout !== "biryani") throw new Error("Invalid page layout in backup.");
    if (page.heading !== undefined && (typeof page.heading !== "string" || page.heading.length > 200)) throw new Error("Invalid page heading in backup.");
    ids.add(page.id);
  }
  for (const section of data.sections) {
    if (!section || typeof section.name !== "string" || !ids.has(section.pageId) ||
        ![0, 1].includes(section.column) || !Array.isArray(section.items)) throw new Error("Invalid section in backup.");
    for (const item of section.items) {
      if (!item || typeof item.name !== "string" || typeof item.price !== "string" ||
          (item.desc !== undefined && typeof item.desc !== "string") ||
          (item.spice !== undefined && typeof item.spice !== "string") ||
          (item.spiceOptions !== undefined && typeof item.spiceOptions !== "string") ||
          (item.prepTime !== undefined && !validPrepTime(item.prepTime)) ||
          (item.prepNote !== undefined && (typeof item.prepNote !== "string" || item.prepNote.length > 1000)) ||
          (item.available !== undefined && typeof item.available !== "boolean") ||
          (item.veg !== undefined && ![true, false, "both"].includes(item.veg))) throw new Error("Invalid item in backup.");
      if (item.workbook !== undefined) {
        const source = item.workbook;
        if (!source || typeof source.key !== "string" || typeof source.price !== "string" ||
            typeof source.previousPrice !== "string" || !Array.isArray(source.sources) ||
            source.sources.some(value => typeof value !== "string") || !Array.isArray(source.alternatives) ||
            source.alternatives.some(value => typeof value !== "string")) throw new Error("Invalid menu source data in backup.");
      }
      if (item.portions !== undefined && (!Array.isArray(item.portions) || item.portions.some(portion =>
        !portion || typeof portion.label !== "string" || !portion.label.trim() ||
        typeof portion.price !== "string" || !/^\$\d+\.\d{2}$/.test(portion.price)))) {
        throw new Error("Invalid portion prices in backup.");
      }
    }
  }
  if (data.printedText !== undefined && (!data.printedText || typeof data.printedText !== "object" ||
      Array.isArray(data.printedText) || Object.entries(data.printedText).some(([key, value]) =>
        !Object.hasOwn(DEFAULT_PRINTED_TEXT, key) || typeof value !== "string" || value.length > 1000))) {
    throw new Error("Invalid printed text in backup.");
  }
  if (data.design !== undefined) {
    for (const [key, value] of Object.entries(data.design)) {
      if (!(key in DEFAULT_DESIGN) || typeof value !== typeof DEFAULT_DESIGN[key]) throw new Error("Invalid design in backup.");
    }
    const design = { ...DEFAULT_DESIGN, ...data.design };
    if (![1, 2].includes(design.columnCount) || design.itemFontSize < 14 || design.itemFontSize > 26 ||
        !/^#[0-9a-f]{6}$/i.test(design.accentColor)) throw new Error("Invalid layout in backup.");
  }
}

function requireManager() {
  if (!customerPreview && !document.body.classList.contains("pdf-export")) return true;
  alert("Return to the manager workspace to edit the menu.");
  return false;
}

function updateHistoryButtons() {
  document.getElementById("undoBtn").disabled = !undoHistory.length;
  document.getElementById("redoBtn").disabled = !redoHistory.length;
}

function restoreSnapshot(snapshot) {
  const data = JSON.parse(snapshot);
  validateDocument(data);
  menuReadFailed = false;
  menuData = data.sections;
  menuPages = data.pages;
  biryaniLayoutRevision = data.biryaniLayoutRevision || 0;
  tandoorRevision = data.tandoorRevision || 0;
  workbookRevision = data.workbookRevision || 0;
  designData = { ...DEFAULT_DESIGN, ...data.design };
  printedText = loadPrintedText(data.printedText);
  applyDesign();
  render();
}

function travelHistory(redo = false) {
  if (!requireManager()) return;
  const from = redo ? redoHistory : undoHistory;
  const to = redo ? undoHistory : redoHistory;
  if (!from.length) return;
  const snapshot = from[from.length - 1];
  try {
    persistMenuSnapshot(snapshot);
  } catch (error) {
    console.error("Could not save history", error);
    alert("Could not save this change. Download a backup before continuing.");
    return;
  }
  to.push(documentSnapshot());
  from.pop();
  lastSavedSnapshot = snapshot;
  restoreSnapshot(snapshot);
  saveDesign();
}

function fillPageSelect(id, selectedId) {
  const select = document.getElementById(id);
  select.innerHTML = menuPages.map((page, index) => `<option value="${index}">${index + 1}. ${escapeHtml(page.title)}</option>`).join("");
  select.value = String(Math.max(0, menuPages.findIndex(page => page.id === selectedId)));
}

function selectedPageId(id) {
  return menuPages[Number(document.getElementById(id).value)]?.id;
}

function addPage() {
  if (!requireManager()) return;
  menuPages.push({ id: newPageId(), title: `Page ${menuPages.length + 1}` });
  saveMenu();
  render();
  if (document.body.classList.contains("catalog-view")) showCatalog(false);
  goToPage(totalPages - 1);
}

function renamePage(index, title) {
  if (!requireManager()) return;
  if (!title.trim()) { alert("Enter a page title."); renderPageBoard(); return; }
  menuPages[index].title = title.trim();
  saveMenu();
  render();
}

function reorderPage(index, direction) {
  if (!requireManager()) return;
  const destination = index + direction;
  if (destination < 0 || destination >= menuPages.length) return;
  [menuPages[index], menuPages[destination]] = [menuPages[destination], menuPages[index]];
  saveMenu();
  render();
}

function deletePage(index) {
  if (!requireManager()) return;
  if (menuPages.length === 1) { alert("Keep at least one menu page."); return; }
  const page = menuPages[index];
  if (menuData.some(section => section.pageId === page.id && section.items.length)) {
    alert("Move this page's items to another page first. This prevents accidental menu loss.");
    return;
  }
  if (!confirm(`Delete empty page "${page.title}" and its empty sections?`)) return;
  menuData = menuData.filter(section => section.pageId !== page.id);
  menuPages.splice(index, 1);
  saveMenu();
  render();
}

function wireDragSource(element, source) {
  element.draggable = !customerPreview;
  element.addEventListener("dragstart", event => {
    if (!requireManager() || event.target.closest("button,input,select")) { event.preventDefault(); return; }
    event.stopPropagation();
    draggedContent = source;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", "aahaa-menu-content");
    element.classList.add("dragging");
  });
  element.addEventListener("dragend", () => {
    draggedContent = null;
    document.querySelectorAll(".drop-target,.dragging").forEach(node => node.classList.remove("drop-target", "dragging"));
  });
}

function wireDropTarget(element, destination) {
  element.addEventListener("dragover", event => {
    if (!draggedContent || customerPreview) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    element.classList.add("drop-target");
  });
  element.addEventListener("dragleave", () => element.classList.remove("drop-target"));
  element.addEventListener("drop", event => {
    if (!draggedContent || customerPreview) return;
    event.preventDefault();
    event.stopPropagation();
    const source = draggedContent;
    draggedContent = null;
    moveContent(source, destination);
  });
}

function moveContent(source, destination) {
  if (!requireManager()) return;
  const sourceSection = menuData[source.sectionIndex];
  if (!sourceSection || !menuPages.some(page => page.id === destination.pageId)) {
    alert("The selected content or destination no longer exists.");
    return;
  }
  const column = pageColumnCount(destination.pageId) === 1 ? 0 : destination.column;
  let targetSection = menuData[destination.sectionIndex];
  if (source.itemIndex === undefined) {
    if (sourceSection === targetSection) return;
    menuData.splice(source.sectionIndex, 1);
    sourceSection.pageId = destination.pageId;
    sourceSection.column = column;
    const targetIndex = targetSection ? menuData.indexOf(targetSection) : menuData.length;
    menuData.splice(targetIndex, 0, sourceSection);
  } else {
    const item = sourceSection.items[source.itemIndex];
    if (!item) { alert("The selected item no longer exists."); return; }
    if (!targetSection) {
      targetSection = menuData.find(section => section !== sourceSection &&
        section.pageId === destination.pageId &&
        (pageColumnCount(destination.pageId) === 1 ? 0 : section.column) === column &&
        section.name === sourceSection.name);
    }
    if (!targetSection) {
      targetSection = { name: sourceSection.name, pageId: destination.pageId, column, items: [] };
      menuData.push(targetSection);
    }
    let targetIndex = destination.itemIndex === undefined ? targetSection.items.length : destination.itemIndex;
    if (sourceSection === targetSection && source.itemIndex < targetIndex) targetIndex--;
    sourceSection.items.splice(source.itemIndex, 1);
    targetSection.items.splice(targetIndex, 0, item);
  }
  saveMenu();
  render();
}

function openMoveModal(sectionIndex, itemIndex) {
  if (!requireManager()) return;
  movingContext = { sectionIndex, itemIndex };
  const section = menuData[sectionIndex];
  document.getElementById("moveTitle").textContent = `Move ${itemIndex === undefined ? section.name : section.items[itemIndex].name}`;
  fillPageSelect("movePage", section.pageId);
  document.getElementById("moveColumn").value = String(section.column);
  updateMoveSections();
  document.getElementById("moveSectionLabel").hidden = itemIndex === undefined;
  document.getElementById("moveModal").classList.remove("hidden");
}

function updateMoveSections() {
  const pageId = selectedPageId("movePage");
  const singleColumn = pageColumnCount(pageId) === 1;
  document.getElementById("moveColumn").disabled = singleColumn;
  if (singleColumn) document.getElementById("moveColumn").value = "0";
  const column = singleColumn ? 0 : Number(document.getElementById("moveColumn").value);
  document.getElementById("moveSection").innerHTML = '<option value="">Keep section name (append)</option>' +
    menuData.flatMap((section, index) => section.pageId === pageId &&
      (singleColumn ? 0 : section.column) === column ?
      [`<option value="${index}">${escapeHtml(section.name)}</option>`] : []).join("");
}

function renderPageBoard() {
  const board = document.getElementById("pageBoard");
  board.innerHTML = "";
  buildPages(true).forEach((page, pageIndex) => {
    const card = document.createElement("section");
    card.className = "board-page";
    card.innerHTML = `<div class="board-page-head"><strong>Page ${pageIndex + 1}</strong>
      <input aria-label="Page ${pageIndex + 1} title" class="page-title-input">
      <button onclick="reorderPage(${pageIndex}, -1)" ${pageIndex === 0 ? "disabled" : ""} title="Move page earlier">Earlier</button>
      <button onclick="reorderPage(${pageIndex}, 1)" ${pageIndex === menuPages.length - 1 ? "disabled" : ""} title="Move page later">Later</button>
      <button onclick="deletePage(${pageIndex})">Delete empty page</button></div><div class="board-columns"></div>`;
    const title = card.querySelector("input");
    title.value = page.title;
    title.addEventListener("change", () => renamePage(pageIndex, title.value));
    page.cols.forEach((chunks, column) => {
      const col = document.createElement("div");
      col.className = "board-column";
      col.innerHTML = `<p class="drop-hint">${pageColumnCount(page.id) === 1 ? "Single column" : column === 0 ? "Left column" : "Right column"} - drop here</p>`;
      wireDropTarget(col, { pageId: page.id, column });
      chunks.forEach(chunk => {
        const section = document.createElement("div");
        section.className = "board-section";
        const index = chunk.sectionIndex;
        section.innerHTML = `<div class="board-section-head"><strong>${escapeHtml(chunk.name)}</strong>
          <button onclick="openMoveModal(${index})">Move section</button>
          <button onclick="openSectionModal(${index})">Edit</button></div>`;
        wireDragSource(section.querySelector(".board-section-head"), { sectionIndex: index });
        wireDropTarget(section, { pageId: page.id, column, sectionIndex: index });
        chunk.items.forEach(ref => {
          const item = document.createElement("div");
          item.className = "board-item";
          item.innerHTML = `<span>${escapeHtml(ref.item.name)}${ref.item.available === false ? " (unavailable)" : ""}</span><button onclick="openMoveModal(${index}, ${ref.itemIdx})">Move</button>`;
          wireDragSource(item, { sectionIndex: index, itemIndex: ref.itemIdx });
          wireDropTarget(item, { pageId: page.id, column, sectionIndex: index, itemIndex: ref.itemIdx });
          section.appendChild(item);
        });
        if (!chunk.items.length) section.insertAdjacentHTML("beforeend", '<p class="help">Empty section - add an item or drop one here.</p>');
        col.appendChild(section);
      });
      card.querySelector(".board-columns").appendChild(col);
    });
    board.appendChild(card);
  });
}

function addPortionRow(portion = { label: "", price: "" }) {
  const row = document.createElement("div");
  row.className = "portion-row";
  row.innerHTML = '<input aria-label="Portion name" placeholder="Size name"><input aria-label="Portion price" inputmode="decimal" placeholder="12.99"><button type="button" aria-label="Remove portion">Remove</button>';
  row.children[0].value = portion.label;
  row.children[1].value = portion.price;
  row.querySelector("button").addEventListener("click", () => row.remove());
  document.getElementById("portionRows").appendChild(row);
}

function updatePortionEditor() {
  const enabled = document.getElementById("usePortions").checked;
  document.getElementById("portionEditor").hidden = !enabled;
  document.getElementById("basePriceLabel").hidden = enabled;
}

function money(value) {
  const cleaned = value.trim().replace(/^\$/, "");
  if (!/^\d+(?:\.\d{1,2})?$/.test(cleaned) || !Number.isFinite(Number(cleaned)) || Number(cleaned) > 99999) {
    throw new Error(`Invalid price "${value}". Use a positive amount with up to two decimals.`);
  }
  return `$${Number(cleaned).toFixed(2)}`;
}

function readPortions() {
  if (!document.getElementById("usePortions").checked) return [];
  const portions = [];
  const labels = new Set();
  document.querySelectorAll("#portionRows .portion-row").forEach(row => {
    const label = row.children[0].value.trim();
    const rawPrice = row.children[1].value.trim();
    if (!label || !rawPrice) throw new Error("Each portion needs a name and a price. Remove unused rows.");
    if (labels.has(label.toLowerCase())) throw new Error("Portion names must be unique for this item.");
    labels.add(label.toLowerCase());
    portions.push({ label, price: money(rawPrice) });
  });
  if (!portions.length) throw new Error("Add at least one portion, or turn off named portions.");
  return portions;
}

function spiceFromOptions(options) {
  const first = options.split(",")[0].trim().toLowerCase();
  if (first === "mild") return "🌶";
  if (first === "medium") return "🌶🌶";
  if (first === "hot" || first === "spicy") return "🌶🌶🌶";
  return "";
}

function parseBiryaniSheet(text) {
  const lines = text.trim().split(/\r?\n/);
  const names = new Set();
  return lines.map((line, index) => {
    const cells = line.split("\t").map(cell => cell.trim());
    const [name, ...values] = cells;
    if (cells.length !== 7 || !name) throw new Error(`Row ${index + 1}: use the seven tab-separated columns described above.`);
    if (names.has(name.toLowerCase())) throw new Error(`Row ${index + 1}: duplicate item name.`);
    names.add(name.toLowerCase());
    const portions = PORTION_LABELS.flatMap((label, i) => values[i] ? [{ label, price: money(values[i]) }] : []);
    if (!portions.length) throw new Error(`Row ${index + 1}: enter at least one portion price.`);
    if (!["veg", "nonveg", "none"].includes(cells[6])) throw new Error(`Row ${index + 1}: diet must be veg, nonveg, or none (unspecified).`);
    return { name, price: portions.map(portion => portion.price).join(" | "), portions,
      spice: spiceFromOptions(cells[5]), spiceOptions: cells[5], veg: selectValueToVeg(cells[6]), desc: "", available: true };
  });
}

function openBiryaniImport() {
  if (!requireManager()) return;
  const select = document.getElementById("biryaniSection");
  select.innerHTML = document.getElementById("itemSection").innerHTML;
  const index = menuData.findIndex(section => section.name.toLowerCase() === "biryani");
  if (!menuData.length) { alert("Create a section before importing."); return; }
  if (index >= 0) select.value = String(index);
  document.getElementById("biryaniSheet").value = BIRYANI_SHEET;
  document.getElementById("biryaniReview").textContent = "";
  document.getElementById("biryaniModal").classList.remove("hidden");
}

function reviewBiryaniImport() {
  const items = parseBiryaniSheet(document.getElementById("biryaniSheet").value);
  const review = document.getElementById("biryaniReview");
  review.innerHTML = `<strong>${items.length} items ready</strong><ul>${items.map(item =>
    `<li>${escapeHtml(item.name)}: ${item.portions.map(portion => `${escapeHtml(portion.label)} ${escapeHtml(portion.price)}`).join(" / ")}</li>`).join("")}</ul>`;
  return items;
}

function importBiryani() {
  if (!requireManager()) return;
  let items;
  try { items = reviewBiryaniImport(); } catch (error) { alert(error.message); return; }
  const section = menuData[Number(document.getElementById("biryaniSection").value)];
  if (!section) { alert("Choose a destination section."); return; }
  const matchingSections = menuData.filter(entry => entry.name === section.name);
  const oldCount = matchingSections.reduce((count, entry) => count + entry.items.length, 0);
  if (!confirm(`Replace all ${oldCount} items in "${section.name}", including its continuations, with ${items.length} reviewed items? Undo and backups can restore the old list.`)) return;
  section.items = items;
  menuData = menuData.filter(entry => entry === section || entry.name !== section.name);
  saveMenu();
  render();
  document.getElementById("biryaniModal").classList.add("hidden");
}

function downloadBackup(previous = false) {
  let content = documentSnapshot();
  if (previous) {
    try {
      const workbookBackup = localStorage.getItem("aahaaMenuBeforeWorkbookUpdate");
      const tandoorBackup = localStorage.getItem("aahaaMenuBeforeTandoorUpdate");
      const saved = workbookBackup || tandoorBackup || localStorage.getItem("aahaaMenuBeforeBiryaniUpdate");
      if (!saved) { alert("No pre-update copy exists in this browser."); return; }
      const data = JSON.parse(saved);
      const converted = Array.isArray(data) ? convertLegacyDocument(data) : { ...data, biryaniRevision: 1 };
      converted.tandoorRevision = 1;
      converted.workbookRevision = 1;
      validateDocument(converted);
      content = JSON.stringify(converted);
    } catch (error) {
      console.error("Could not read pre-update backup", error);
      alert("The pre-update copy could not be read. The current menu has not been changed.");
      return;
    }
  }
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Aahaa-Menu-${previous ? "Pre-Update-" : ""}Backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function restoreBackup(event) {
  const file = event.target.files[0];
  if (!file || !requireManager()) return;
  try {
    const data = JSON.parse(await file.text());
    validateDocument(data);
    if (!confirm("Replace this browser's menu and design with this backup? You can Undo afterwards.")) return;
    restoreSnapshot(JSON.stringify(data));
    saveMenu();
    saveDesign();
  } catch (error) {
    console.error("Backup restore failed", error);
    alert(`Could not restore backup: ${error.message}`);
  } finally {
    event.target.value = "";
  }
}

function togglePreview() {
  if (!customerPreview && document.body.classList.contains("catalog-view")) showCatalog(false);
  customerPreview = !customerPreview;
  document.body.classList.toggle("customer-preview", customerPreview);
  document.getElementById("previewBtn").textContent = customerPreview ? "Back to Manager" : "Customer Preview";
  render();
}

function overflowingColumns() {
  document.body.classList.add("measure-layout");
  const overflowing = [];
  document.querySelectorAll("#pagesContainer .page").forEach(page => {
    const pageIndex = Number(page.dataset.sourcePageIndex);
    const style = getComputedStyle(page);
    const outerHeight = element => {
      const css = getComputedStyle(element);
      if (css.display === "none") return 0;
      return element.getBoundingClientRect().height + parseFloat(css.marginTop) + parseFloat(css.marginBottom);
    };
    const available = 297 * 96 / 25.4 - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) -
      outerHeight(page.querySelector(".page-header")) - outerHeight(page.querySelector(".page-footer"));
    const headingHeight = page.querySelector(".printed-page-heading") ? outerHeight(page.querySelector(".printed-page-heading")) : 0;
    const noteHeight = page.querySelector(".general-preparation-note") ? outerHeight(page.querySelector(".general-preparation-note")) : 0;
    page.querySelectorAll(".page-col").forEach((col, column) => {
      const needed = Array.from(col.children).reduce((height, section) => height + outerHeight(section), 0);
      if (needed > available - headingHeight - noteHeight + 1) overflowing.push({
        pageIndex, pageNumber: Number(page.id.slice(5)) + 1, column, excess: needed - available + headingHeight + noteHeight
      });
    });
  });
  document.body.classList.remove("measure-layout");
  return overflowing;
}

function checkPageOverflow() {
  const overflowing = overflowingColumns();
  const warning = document.getElementById("layoutWarning");
  warning.hidden = !overflowing.length;
  warning.innerHTML = overflowing.length ?
    `Content exceeds A4 on page(s) ${[...new Set(overflowing.map(entry => entry.pageNumber))].join(", ")}. Move items or <button onclick="fitPages()" class="btn btn-light">Auto-fit pages</button>. Export is blocked until it fits.` : "";
  return overflowing.length;
}

function fitPages() {
  if (!requireManager()) return;
  const columns = designData.columnCount === 1 ? 1 : 2;
  const itemCount = menuData.reduce((count, section) => count + section.items.length, 0);
  const limit = Math.max(10, itemCount * (itemCount + menuPages.length) * columns);
  let steps = 0;
  while (steps++ < limit) {
    const overflow = overflowingColumns()[0];
    if (!overflow) break;
    const page = menuPages[overflow.pageIndex];
    if (page.layout === "biryani") {
      alert("The dedicated biryani page is too tall. Reduce the font size or shorten descriptions to keep all biryanis together.");
      break;
    }
    const sections = menuData.filter(section => section.pageId === page.id &&
      (columns === 1 ? 0 : section.column) === overflow.column && section.items.some(item => item.available !== false && itemHasPrice(item)));
    const section = sections[sections.length - 1];
    if (!section) break;
    const visibleItems = sections.reduce((count, entry) => count + entry.items.filter(item => item.available !== false && itemHasPrice(item)).length, 0);
    if (visibleItems === 1) {
      alert("One item is taller than a page. Shorten its text, reduce the font size, or use one column.");
      break;
    }
    document.body.classList.add("measure-layout");
    const sectionElement = document.querySelector(`.page[data-source-page-index="${overflow.pageIndex}"] .section[data-section-index="${menuData.indexOf(section)}"]`);
    let removedHeight = 0;
    let cutIndex = section.items.length;
    for (let index = section.items.length - 1; index >= 0; index--) {
      if (section.items[index].available !== false && itemHasPrice(section.items[index])) {
        const row = sectionElement.querySelector(`.item[data-item-index="${index}"]`);
        removedHeight += row.getBoundingClientRect().height;
      }
      cutIndex = index;
      if (removedHeight >= overflow.excess) break;
    }
    const firstVisibleIndex = section.items.findIndex(item => item.available !== false && itemHasPrice(item));
    const moveWholeSection = sections.length > 1 && cutIndex <= firstVisibleIndex;
    if (!moveWholeSection && cutIndex <= firstVisibleIndex) {
      cutIndex = section.items.findIndex((item, index) => index > firstVisibleIndex && item.available !== false && itemHasPrice(item));
    }
    document.body.classList.remove("measure-layout");
    const next = nextColumnPosition({ page: overflow.pageIndex, col: overflow.column }, columns);
    if (menuPages[next.page]?.layout === "biryani") {
      menuPages.splice(next.page, 0, { id: newPageId(), title: "Menu continued" });
    }
    if (!menuPages[next.page]) menuPages.push({ id: newPageId(), title: `Page ${menuPages.length + 1}` });
    const destinationId = menuPages[next.page].id;
    const firstSection = menuData.find(entry => entry.pageId === destinationId && (columns === 1 ? 0 : entry.column) === next.col);
    let destination = firstSection?.name === section.name ? firstSection : null;
    if (moveWholeSection && !destination) {
      menuData.splice(menuData.indexOf(section), 1);
      section.pageId = destinationId;
      section.column = next.col;
      menuData.splice(firstSection ? menuData.indexOf(firstSection) : menuData.length, 0, section);
      render();
      continue;
    }
    if (!destination) {
      destination = { name: section.name, pageId: destinationId, column: next.col, items: [] };
      menuData.splice(firstSection ? menuData.indexOf(firstSection) : menuData.length, 0, destination);
    }
    destination.items.unshift(...section.items.splice(moveWholeSection ? 0 : cutIndex));
    if (!section.items.length) menuData.splice(menuData.indexOf(section), 1);
    render();
  }
  saveMenu();
  render();
  if (checkPageOverflow()) alert("Some content still exceeds A4. Adjust the highlighted pages before exporting.");
}

// ---- PDF export ----
// Capture each rendered .page and fit it into exactly one A4 PDF page.
// This avoids html auto-pagination side effects and avoids cropping content.
async function waitForCaptureReadiness() {
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (e) { /* continue */ }
  }

  const pending = Array.from(document.images).filter(img => !img.complete);
  await Promise.all(pending.map(img => new Promise(resolve => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  })));
}

async function downloadPDF() {
  if (!menuData.some(section => section.items.some(item => item.available !== false && itemHasPrice(item)))) {
    alert("Enable at least one priced item in Today's Menu before exporting.");
    return;
  }
  await waitForCaptureReadiness();
  if (checkPageOverflow()) { alert("Some content exceeds A4. Return to Manager and use Auto-fit pages before exporting."); return; }
  document.body.classList.add("pdf-export");
  render();
  const pages = Array.from(document.querySelectorAll("#pagesContainer .page"));
  
  const pageWidth = 210;
  const pageHeight = 297;
  const filename = "Aahaa-Indian-Kitchen-Menu.pdf";
  const canvasOptions = {
    scale: 3,
    useCORS: true,
    backgroundColor: "#fffaf3",
    foreignObjectRendering: false
  };

  try {
    await waitForCaptureReadiness();
    if (typeof html2pdf !== "function") {
      alert("PDF library failed to load. Please refresh and try again.");
      return;
    }

    const placeholder = document.createElement("div");
    placeholder.style.width = "1px";
    placeholder.style.height = "1px";
    const pdf = await html2pdf().set({
      margin: 0,
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    }).from(placeholder).toPdf().get("pdf");

    for (let i = 0; i < pages.length; i++) {
      const pageEl = pages[i];
      const canvas = await html2pdf().set({
        html2canvas: canvasOptions,
        pagebreak: { mode: [] }
      }).from(pageEl).toCanvas().get("canvas");

      if (i > 0) {
        pdf.addPage("a4", "portrait");
      } else {
        pdf.setPage(1);
      }

      const imgData = canvas.toDataURL("image/png");
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const scale = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);
      const drawWidth = canvasWidth * scale;
      const drawHeight = canvasHeight * scale;
      const offsetX = (pageWidth - drawWidth) / 2;
      const offsetY = (pageHeight - drawHeight) / 2;

      pdf.addImage(imgData, "PNG", offsetX, offsetY, drawWidth, drawHeight, undefined, "SLOW");
    }

    pdf.save(filename);
  } catch (error) {
    console.error("PDF export failed", error);
    alert("PDF export failed. Your menu is unchanged. Try Print / Save as PDF instead.");
  } finally {
    document.body.classList.remove("pdf-export");
    render();
  }
}

function printMenu() {
  if (!menuData.some(section => section.items.some(item => item.available !== false && itemHasPrice(item)))) {
    alert("Enable at least one priced item in Today's Menu before printing.");
    return;
  }
  if (checkPageOverflow()) { alert("Some content exceeds A4. Use Auto-fit pages before printing."); return; }
  window.print();
}

// ---- Wire up events ----
document.getElementById("printedContentBtn").addEventListener("click", () => openPrintedContent());
document.getElementById("printedContentCancelBtn").addEventListener("click", () => document.getElementById("printedContentModal").classList.add("hidden"));
document.getElementById("printedContentSaveBtn").addEventListener("click", savePrintedContent);
document.getElementById("todayMenuBtn").addEventListener("click", () => showCatalog(true));
document.getElementById("menuHomeBtn").addEventListener("click", () => showCatalog(false));
document.getElementById("catalogPreviewBtn").addEventListener("click", togglePreview);
document.getElementById("catalogSearch").addEventListener("input", renderCatalog);
document.getElementById("catalogCategory").addEventListener("change", renderCatalog);
document.getElementById("catalogStatus").addEventListener("change", renderCatalog);
document.getElementById("catalogEnableBtn").addEventListener("click", () => setFilteredAvailability(true));
document.getElementById("catalogDisableBtn").addEventListener("click", () => setFilteredAvailability(false));
document.getElementById("catalogFitBtn").addEventListener("click", fitPages);
document.getElementById("addItemBtn").addEventListener("click", () => openItemModal());
document.getElementById("addSectionBtn").addEventListener("click", () => openSectionModal());
document.getElementById("addPageBtn").addEventListener("click", addPage);
document.getElementById("organizerAddPageBtn").addEventListener("click", addPage);
document.getElementById("organizeBtn").addEventListener("click", () => {
  if (!requireManager()) return;
  renderPageBoard();
  document.getElementById("organizeModal").classList.remove("hidden");
});
document.getElementById("organizeCloseBtn").addEventListener("click", () => document.getElementById("organizeModal").classList.add("hidden"));
document.getElementById("previewBtn").addEventListener("click", togglePreview);
document.getElementById("undoBtn").addEventListener("click", () => travelHistory());
document.getElementById("redoBtn").addEventListener("click", () => travelHistory(true));
document.getElementById("usePortions").addEventListener("change", updatePortionEditor);
document.getElementById("addPortionBtn").addEventListener("click", () => addPortionRow());
document.getElementById("movePage").addEventListener("change", updateMoveSections);
document.getElementById("sectionPage").addEventListener("change", () => {
  const singleColumn = pageColumnCount(selectedPageId("sectionPage")) === 1;
  document.getElementById("sectionColumn").disabled = singleColumn;
  if (singleColumn) document.getElementById("sectionColumn").value = "0";
});
document.getElementById("moveColumn").addEventListener("change", updateMoveSections);
document.getElementById("moveCancelBtn").addEventListener("click", () => document.getElementById("moveModal").classList.add("hidden"));
document.getElementById("moveSaveBtn").addEventListener("click", () => {
  const section = document.getElementById("moveSection").value;
  moveContent(movingContext, {
    pageId: selectedPageId("movePage"),
    column: Number(document.getElementById("moveColumn").value),
    sectionIndex: movingContext.itemIndex !== undefined && section !== "" ? Number(section) : undefined
  });
  document.getElementById("moveModal").classList.add("hidden");
});
document.getElementById("biryaniBtn").addEventListener("click", openBiryaniImport);
document.getElementById("biryaniCancelBtn").addEventListener("click", () => document.getElementById("biryaniModal").classList.add("hidden"));
document.getElementById("biryaniReviewBtn").addEventListener("click", () => {
  try { reviewBiryaniImport(); } catch (error) { alert(error.message); }
});
document.getElementById("biryaniSaveBtn").addEventListener("click", importBiryani);
document.getElementById("backupBtn").addEventListener("click", () => downloadBackup());
document.getElementById("savedVersionsBtn").addEventListener("click", openSavedVersions);
document.getElementById("savedVersionsCloseBtn").addEventListener("click", () => document.getElementById("savedVersionsModal").classList.add("hidden"));
document.getElementById("savedVersionsRestoreBtn").addEventListener("click", restoreSavedVersion);
document.getElementById("itemPrepTime").addEventListener("change", () => {
  document.getElementById("customPrepTimeLabel").hidden = document.getElementById("itemPrepTime").value !== "custom";
});
document.getElementById("previousBackupBtn").addEventListener("click", () => downloadBackup(true));
document.getElementById("restoreBtn").addEventListener("click", () => document.getElementById("restoreFile").click());
document.getElementById("restoreFile").addEventListener("change", restoreBackup);
window.addEventListener("beforeprint", () => { document.body.classList.add("printing"); render(); });
window.addEventListener("afterprint", () => { document.body.classList.remove("printing"); render(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => modal.classList.add("hidden"));
    const more = document.getElementById("moreOptions");
    if (more.open) {
      more.open = false;
      more.querySelector("summary").focus();
    }
  }
});
document.addEventListener("click", event => {
  const more = document.getElementById("moreOptions");
  if (!more.contains(event.target) || event.target.closest(".more-options-panel button")) more.open = false;
});
document.getElementById("resetBtn").addEventListener("click", resetMenu);
document.getElementById("downloadBtn").addEventListener("click", downloadPDF);
document.getElementById("printBtn").addEventListener("click", printMenu);
document.getElementById("itemCancelBtn").addEventListener("click", closeItemModal);
document.getElementById("itemSaveBtn").addEventListener("click", saveItem);
document.getElementById("sectionCancelBtn").addEventListener("click", closeSectionModal);
document.getElementById("sectionSaveBtn").addEventListener("click", saveSection);

document.getElementById("designBtn").addEventListener("click", openDesignModal);
document.getElementById("designCloseBtn").addEventListener("click", closeDesignModal);
document.getElementById("designResetBtn").addEventListener("click", resetDesign);
document.getElementById("headingFont").addEventListener("change", handleDesignChange);
document.getElementById("bodyFont").addEventListener("change", handleDesignChange);
document.getElementById("headingWeight").addEventListener("change", handleDesignChange);
document.getElementById("itemNameWeight").addEventListener("change", handleDesignChange);
document.getElementById("priceWeight").addEventListener("change", handleDesignChange);
document.getElementById("descStyle").addEventListener("change", handleDesignChange);
document.getElementById("accentColor").addEventListener("input", handleDesignChange);
document.getElementById("itemFontSize").addEventListener("input", handleDesignChange);
document.getElementById("columnCount").addEventListener("change", handleDesignChange);
document.getElementById("headerStyle").addEventListener("change", handleDesignChange);
document.getElementById("themePreset").addEventListener("change", (e) => applyThemePreset(e.target.value));

document.getElementById("prevPageBtn").addEventListener("click", () => goToPage(currentPageIndex - 1));
document.getElementById("nextPageBtn").addEventListener("click", () => goToPage(currentPageIndex + 1));

if (needsBiryaniUpdate) {
  const biryaniSections = menuData.filter(section => section.name.toLowerCase() === "biryani");
  if (biryaniSections.length) {
    try {
      localStorage.setItem("aahaaMenuBeforeBiryaniUpdate", JSON.stringify(storedMenu));
    } catch (error) {
      console.error("Could not preserve pre-update menu", error);
      alert("The pre-update menu could not be backed up in this browser. Download a backup before making further changes.");
    }
    biryaniSections[0].items = parseBiryaniSheet(BIRYANI_SHEET);
    menuData = menuData.filter(section => section === biryaniSections[0] || !biryaniSections.includes(section));
  }
}
initializePages();
const needsTandoorUpdate = !menuReadFailed && tandoorRevision !== 1;
if (needsTandoorUpdate) {
  try {
    localStorage.setItem("aahaaMenuBeforeTandoorUpdate", documentSnapshot());
    updateTandoorMenu();
  } catch (error) {
    console.error("Could not preserve pre-update Tandoor menu", error);
    alert("The Tandoor update was not applied because the previous menu could not be backed up. Download a backup and free browser storage, then reload.");
  }
}
const needsBiryaniLayout = !menuReadFailed && biryaniLayoutRevision !== 1;
if (needsBiryaniLayout) arrangeBiryaniPage();
const needsWorkbookUpdate = !menuReadFailed && workbookRevision !== 1;
if (needsWorkbookUpdate) {
  try {
    localStorage.setItem("aahaaMenuBeforeWorkbookUpdate", documentSnapshot());
    reconcileWorkbookMenu();
  } catch (error) {
    console.error("Could not apply menu update", error);
    alert("The menu update could not be completed. Download a backup, check browser storage and reload.");
  }
}
lastSavedSnapshot = documentSnapshot();
applyDesign();
render();
saveMenu();
if (needsBiryaniUpdate || needsBiryaniLayout || needsTandoorUpdate || needsWorkbookUpdate) {
  waitForCaptureReadiness().then(() => {
    fitPages();
  }).catch(error => {
    console.error("Could not fit the updated menu", error);
    alert("Check page sizes and use Auto-fit pages before exporting the updated menu.");
  });
}
if (document.fonts?.ready) document.fonts.ready.then(checkPageOverflow);
if (location.hash === "#today-menu") showCatalog(true);
