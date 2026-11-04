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
    { name: "Chicken Achari Tikka", spice: "", price: "$18.99", desc: "Chicken skewers marinated with tangy pickling spices.", veg: false },
    { name: "Chicken Haryali Tikka", spice: "", price: "$18.99", desc: "Chicken skewers in mint coriander green marinade.", veg: false },
    { name: "Chicken Sheekh Kabab", spice: "", price: "$18.99", desc: "Minced spiced chicken skewers char grilled until golden.", veg: false },
    { name: "Chicken Tikka Lasuni", spice: "", price: "$18.99", desc: "Chicken tikka roasted with aromatic garlic marinade.", veg: false }
  ]},

  // ===== PAGE 8 — Tandoor + Naan =====
  { page: 8, col: "L", name: "Tandoor", items: [
    { name: "Fish Tikka (Mahi Mahi)", spice: "", price: "$20.99", desc: "Mahi mahi steaks roasted with aromatic ajwain.", veg: false },
    { name: "Lamb Sheekh Kabab", spice: "", price: "$18.99", desc: "Minced spiced lamb skewers char grilled until succulent.", veg: false },
    { name: "Malai Chicken Tikka", spice: "", price: "$18.99", desc: "Chicken marinated in a creamy malai marinade.", veg: false },
    { name: "Tandoori Chicken (4 pcs / 8 pcs)", spice: "", price: "$18.99 | $24.99", desc: "Tandoor roasted chicken with aromatic Indian spices.", veg: false },
    { name: "Tandoori Shrimp", spice: "", price: "$20.99", desc: "King prawns marinated and cooked in a clay oven.", veg: false },
    { name: "Tandoori Vegetables", spice: "", price: "$15.99", desc: "Marinated vegetables charred in a traditional clay oven.", veg: true },
    { name: "Tandoori Pomfret", spice: "", price: "$25.99", desc: "Spiced pomfret grilled to achieve a smoky finish.", veg: false },
    { name: "Paneer Tikka", spice: "", price: "$16.99", desc: "Spiced paneer grilled to achieve a golden finish.", veg: true },
    { name: "Tandoor Mix Grill", spice: "", price: "$29.99", desc: "Tandoor grilled meats and paneer served together.", veg: "both" },
    { name: "Hariyali Paneer Tikka", spice: "", price: "$18.99", desc: "Mint marinated paneer grilled until lightly charred.", veg: true },
    { name: "Aloo Paratha", spice: "", price: "$4.99", desc: "Golden wheat flatbread stuffed with spiced potatoes.", veg: true },
    { name: "Bread Basket", spice: "", price: "$12.99", desc: "Assorted freshly baked Indian breads for sharing.", veg: true },
    { name: "Bullet Naan", spice: "", price: "$4.99", desc: "Classic clay oven baked naan with a golden finish.", veg: true },
    { name: "Butter Roti", spice: "", price: "$4.99", desc: "Clay oven baked whole wheat flatbread brushed with butter.", veg: true }
  ]},
  { page: 8, col: "R", name: "Naan", items: [
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
  { page: 9, col: "L", name: "Biryani", items: [
    { name: "Fish Biryani", spice: "🌶", price: "$18.99", desc: "Spiced fish fillets layered with fragrant basmati rice.", veg: false },
    { name: "Aahaa Special Boneless Biryani", spice: "🌶🌶", price: "$17.99", desc: "Spiced boneless chicken biryani with aromatic rice.", veg: false },
    { name: "Gongura Chicken Biryani", spice: "🌶🌶", price: "$17.99", desc: "Biryani layered with chicken and tangy gongura.", veg: false },
    { name: "Hyderabadi Dum Biryani (Chicken/Goat)", spice: "🌶🌶", price: "$15.99 | $17.99", desc: "Aromatic basmati rice slow cooked with spices.", veg: false },
    { name: "Chennai Dum Biryani (Chicken/Goat)", spice: "🌶🌶", price: "$15.99 | $17.99", desc: "Traditional Chennai style biryani layered with aromatic spices.", veg: false },
    { name: "Dindigul Biryani (Veg/Chicken/Goat)", spice: "🌶🌶", price: "$13.99 | $14.99 | $16.99", desc: "Short grain rice slow cooked with aromatic spices.", veg: "both" }
  ]},
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
let menuData = loadMenu();
let designData = loadDesign();
let editingContext = null; // { sectionIndex, itemIndex } or null for new item
let currentPageIndex = 0;
let totalPages = 0;

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
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { return normalizeMenuData(JSON.parse(saved)); } catch (e) { /* fall through */ }
  }
  return normalizeMenuData(JSON.parse(JSON.stringify(DEFAULT_MENU)));
}

function saveMenu() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData));
}

function loadDesign() {
  const saved = localStorage.getItem(DESIGN_STORAGE_KEY);
  if (saved) {
    try { return { ...DEFAULT_DESIGN, ...JSON.parse(saved) }; } catch (e) { /* fall through */ }
  }
  return { ...DEFAULT_DESIGN };
}

function saveDesign() {
  localStorage.setItem(DESIGN_STORAGE_KEY, JSON.stringify(designData));
}

function applyDesign() {
  const root = document.documentElement.style;
  root.setProperty("--heading-font", designData.headingFont);
  root.setProperty("--body-font", designData.bodyFont);
  root.setProperty("--accent", designData.accentColor);
  root.setProperty("--item-font-size", designData.itemFontSize + "px");
  root.setProperty("--column-count", designData.columnCount);

  document.getElementById("headingFont").value = designData.headingFont;
  document.getElementById("bodyFont").value = designData.bodyFont;
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
  const preset = THEME_PRESETS[presetKey];
  if (!preset) {
    designData.themePreset = "custom";
    saveDesign();
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
function buildPages() {
  const colsPerPage = designData.columnCount === 1 ? 1 : 2;
  const activeColumns = colsPerPage === 1 ? 1 : 2;
  const columnCapacity = colsPerPage === 1 ? 65 : 33;
  const sectionHeaderUnits = 2.7;

  const pages = [{ cols: [[], []], used: [0, 0] }];
  let position = { page: 0, col: 0 };

  menuData.forEach((section, sectionIndex) => {
    if (!section.items.length) return;

    const itemRefs = section.items.map((item, itemIdx) => ({ item, itemIdx }));
    let itemPointer = 0;
    let continued = false;

    while (itemPointer < itemRefs.length) {
      const page = pages[position.page];
      const used = page.used[position.col];
      const firstItemUnits = estimateItemUnits(itemRefs[itemPointer].item);
      const requiredUnits = (continued ? 0 : sectionHeaderUnits) + firstItemUnits;

      if (used + requiredUnits > columnCapacity) {
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

// ---- Rendering ----
function render() {
  const pages = buildPages();
  const colsPerPage = designData.columnCount === 1 ? 1 : 2;
  const container = document.getElementById("pagesContainer");
  container.innerHTML = "";

  pages.forEach((page, pageIdx) => {
    const pageEl = document.createElement("div");
    pageEl.className = "page";
    pageEl.id = `page-${pageIdx}`;
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
          <div class="legend-title">Spice Level</div>
          <div class="legend-row">
            <span class="legend-item"><span class="legend-chili">🌶</span> Mild</span>
            <span class="legend-item"><span class="legend-chili">🌶🌶</span> Medium</span>
            <span class="legend-item"><span class="legend-chili">🌶🌶🌶</span> Hot</span>
          </div>
          <div class="legend-row">
            <span class="legend-item"><span class="veg-icon"></span> Veg</span>
            <span class="legend-item"><span class="nonveg-icon"></span> Non-Veg</span>
          </div>
        </div>
        <div class="page-logo-wrap">
          <img src="assets/logo.png" alt="Aahaa Indian Kitchen" class="page-logo">
          <div class="page-tagline">Feel the Taste</div>
        </div>
      </div>
      <div class="page-body${colsPerPage === 1 ? " single-col" : ""}"></div>
      <div class="page-footer">Aahaa Indian Kitchen &middot; 1034 Weiland Rd, Buffalo Grove, IL 60089 &middot; (872) 872-2422</div>
    `;

    const bodyEl = pageEl.querySelector(".page-body");
    page.cols.forEach((colChunks, colIdx) => {
      const colEl = document.createElement("div");
      colEl.className = "page-col";

      colChunks.forEach(chunk => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section" + (chunk.continued ? " section-continued" : "");

        if (!chunk.continued) {
          const head = document.createElement("div");
          head.className = "section-head";
          head.innerHTML = `<h2>${escapeHtml(chunk.name)}</h2>
            <button class="section-del" title="Delete section" onclick="deleteSection(${chunk.sectionIndex})">✕ remove section</button>`;
          sectionDiv.appendChild(head);

          const flourish = document.createElement("div");
          flourish.className = "section-flourish " + (designData.headerStyle || "fl-diamond");
          flourish.innerHTML = flourishHtml(designData.headerStyle);
          sectionDiv.appendChild(flourish);
        }

        chunk.items.forEach(ref => {
          const item = ref.item;
          const row = document.createElement("div");
          row.className = "item";
          row.innerHTML = `
            <div class="item-top">
              <span class="name">${escapeHtml(item.name)}${vegIconHtml(item.veg)}${item.spice ? `&nbsp;<span class="spice">${item.spice}</span>` : ""}</span>
              <span class="price">${escapeHtml(item.price)}</span>
              <span class="item-actions">
                <button title="Edit" onclick="openItemModal(${chunk.sectionIndex}, ${ref.itemIdx})">✎</button>
                <button title="Delete" onclick="deleteItem(${chunk.sectionIndex}, ${ref.itemIdx})">✕</button>
              </span>
            </div>
            ${item.desc ? `<div class="item-desc">${escapeHtml(item.desc)}</div>` : ""}`;
          sectionDiv.appendChild(row);
        });

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
}

// ---- Page navigation (screen view) ----
function updatePageIndicator() {
  document.getElementById("pageIndicator").textContent = `Page ${totalPages === 0 ? 0 : currentPageIndex + 1} / ${totalPages}`;
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
  if (!confirm("Remove this item from the menu?")) return;
  menuData[sIdx].items.splice(iIdx, 1);
  saveMenu();
  render();
}

function deleteSection(sIdx) {
  if (!confirm(`Remove the entire "${menuData[sIdx].name}" section?`)) return;
  menuData.splice(sIdx, 1);
  saveMenu();
  render();
}

function openItemModal(sIdx, iIdx) {
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
  }
  modal.classList.remove("hidden");
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
    .map((s, idx) => `<option value="${idx}">${escapeHtml(s.name)}</option>`)
    .join("");
}

function saveItem() {
  const name = document.getElementById("itemName").value.trim();
  const desc = document.getElementById("itemDesc").value.trim();
  const price = document.getElementById("itemPrice").value.trim();
  const spice = document.getElementById("itemSpice").value;
  const veg = selectValueToVeg(document.getElementById("itemVeg").value);
  const sIdx = parseInt(document.getElementById("itemSection").value, 10);

  if (!name || !price) {
    alert("Please enter both a name and a price.");
    return;
  }

  if (editingContext && editingContext.iIdx !== undefined) {
    // editing existing item — if section changed, move it
    const { sIdx: oldS, iIdx: oldI } = editingContext;
    if (oldS === sIdx) {
      menuData[sIdx].items[oldI] = { name, price, spice, desc, veg };
    } else {
      menuData[oldS].items.splice(oldI, 1);
      menuData[sIdx].items.push({ name, price, spice, desc, veg });
    }
  } else {
    menuData[sIdx].items.push({ name, price, spice, desc, veg });
  }

  saveMenu();
  render();
  closeItemModal();
}

// ---- Section CRUD ----
function openSectionModal() {
  document.getElementById("newSectionName").value = "";
  document.getElementById("sectionModal").classList.remove("hidden");
}
function closeSectionModal() {
  document.getElementById("sectionModal").classList.add("hidden");
}
function saveSection() {
  const name = document.getElementById("newSectionName").value.trim();
  if (!name) { alert("Please enter a section name."); return; }
  menuData.push({ name, items: [] });
  saveMenu();
  render();
  closeSectionModal();
}

// ---- Reset ----
function resetMenu() {
  if (!confirm("Reset the menu back to the original default list? This will discard any changes you made.")) return;
  menuData = normalizeMenuData(JSON.parse(JSON.stringify(DEFAULT_MENU)));
  saveMenu();
  render();
}

// ---- Design modal ----
function openDesignModal() {
  document.getElementById("designModal").classList.remove("hidden");
}
function closeDesignModal() {
  document.getElementById("designModal").classList.add("hidden");
}
function handleDesignChange() {
  designData.headingFont = document.getElementById("headingFont").value;
  designData.bodyFont = document.getElementById("bodyFont").value;
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
  applyDesign();
  render();
}
function resetDesign() {
  if (!confirm("Reset fonts, colors and layout back to default?")) return;
  designData = { ...DEFAULT_DESIGN };
  saveDesign();
  applyDesign();
  render();
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
  const pages = Array.from(document.querySelectorAll("#pagesContainer .page"));
  if (pages.length === 0) return;

  document.body.classList.add("pdf-export");
  
  const pageWidth = 210;
  const pageHeight = 297;
  const filename = "Aahaa-Indian-Kitchen-Menu.pdf";
  const canvasOptions = {
    scale: 3,
    useCORS: true,
    backgroundColor: "#fffaf3",
    foreignObjectRendering: true
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
      const canvas = await html2pdf().set({ html2canvas: canvasOptions }).from(pageEl).toCanvas().get("canvas");

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
  } finally {
    document.body.classList.remove("pdf-export");
  }
}

function printMenu() {
  window.print();
}

// ---- Wire up events ----
document.getElementById("addItemBtn").addEventListener("click", () => openItemModal());
document.getElementById("addSectionBtn").addEventListener("click", openSectionModal);
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
document.getElementById("accentColor").addEventListener("input", handleDesignChange);
document.getElementById("itemFontSize").addEventListener("input", handleDesignChange);
document.getElementById("columnCount").addEventListener("change", handleDesignChange);
document.getElementById("headerStyle").addEventListener("change", handleDesignChange);
document.getElementById("themePreset").addEventListener("change", (e) => applyThemePreset(e.target.value));

document.getElementById("prevPageBtn").addEventListener("click", () => goToPage(currentPageIndex - 1));
document.getElementById("nextPageBtn").addEventListener("click", () => goToPage(currentPageIndex + 1));

applyDesign();
render();
