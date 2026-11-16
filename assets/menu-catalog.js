// Extracted from Biryani Included.xlsx; pricing sheet takes precedence.
const WORKBOOK_MENU = [
  {
    "section": "Soups",
    "name": "Mutton Pepper Soup",
    "source": "With pricing!B3",
    "price": "$10.99"
  },
  {
    "section": "Soups",
    "name": "Chicken Pepper Soup",
    "source": "With pricing!B4",
    "price": "$9.99"
  },
  {
    "section": "Soups",
    "name": "Cream of mushroom soup",
    "source": "With pricing!B5",
    "price": "$7.99"
  },
  {
    "section": "Soups",
    "name": "Hot & sour soup Veg/ Chicken",
    "source": "With pricing!B6",
    "price": "$7.99 | $8.99"
  },
  {
    "section": "Soups",
    "name": "Lentil (Mulligatawny) Soup",
    "source": "With pricing!B7",
    "price": "$7.99"
  },
  {
    "section": "Soups",
    "name": "Manchow soup Veg/ Chicken",
    "source": "With pricing!B8",
    "price": "$7.99 | $8.99"
  },
  {
    "section": "Soups",
    "name": "Sweet Corn Veg / Chicken",
    "source": "With pricing!B9",
    "price": "$7.99 | $8.99"
  },
  {
    "section": "Soups",
    "name": "Mutton nalli soup (Weekend spl)",
    "source": "With pricing!B11",
    "price": "$12.99"
  },
  {
    "section": "Soups",
    "name": "Crab Soup (Weekend spl)",
    "source": "With pricing!B12",
    "price": "$12.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Cut Mirchi",
    "source": "With pricing!B14",
    "price": "$9.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Egg Bonda 2 pcs",
    "source": "With pricing!B15",
    "price": "$6.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Stuffed Egg Bonda 2 Pcs",
    "source": "With pricing!B16",
    "price": "$8.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Medu Vada 3 pcs",
    "source": "With pricing!B17",
    "price": "$12.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Sambar Vada 3pcs",
    "source": "With pricing!B18",
    "price": "$14.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Stuffed Mirchi Bhaji 3 pcs",
    "source": "With pricing!B19",
    "price": "$10.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Mix Vegetable Pakoras",
    "source": "With pricing!B20",
    "price": "$10.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Onion Pakora Chennai Style",
    "source": "With pricing!B21",
    "price": "$9.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Paneer Pakora",
    "source": "With pricing!B22",
    "price": "$13.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Plantain Bhaji 6 pcs",
    "source": "With pricing!B23",
    "price": "$8.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Punugulu",
    "source": "With pricing!B24",
    "price": "$7.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Punjabi Samosa 2Pcs",
    "source": "With pricing!B25",
    "price": "$3.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Onion Samosa 4 Pcs",
    "source": "With pricing!B26",
    "price": "$4.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Mysore Bonda 3 pcs",
    "source": "With pricing!B27",
    "price": "$9.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Potato Bonda 3 pcs",
    "source": "With pricing!B28",
    "price": "$10.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Masala (Dhal) Vada 3 pcs",
    "source": "With pricing!B29",
    "price": "$10.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Aloo/Avacado Papdi Chaat",
    "source": "With pricing!B30",
    "price": "$9.99 | $10.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Dahi Papdi Chaat",
    "source": "With pricing!B31",
    "price": "$11.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Aloo Tikki Chaat",
    "source": "With pricing!B32",
    "price": "$11.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Bhel Puri",
    "source": "With pricing!B33",
    "price": "$10.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Paani Puri 6 Pcs",
    "source": "With pricing!B34",
    "price": "$8.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Dahi Puri 6Pcs",
    "source": "With pricing!B35",
    "price": "$10.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Samosa Chaat",
    "source": "With pricing!B36",
    "price": "$11.99"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Puran Poli 1pcs",
    "source": "With pricing!B38",
    "price": "$4.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Apollo Fish",
    "source": "With pricing!I3",
    "diet": "nonveg",
    "price": "$17.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken 555",
    "source": "With pricing!I4",
    "diet": "nonveg",
    "price": "$17.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken podimas",
    "source": "With pricing!I5",
    "diet": "nonveg",
    "price": "$13.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken 65",
    "source": "With pricing!I6",
    "diet": "nonveg",
    "price": "$13.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Curry leaf chicken fry",
    "source": "With pricing!I7",
    "diet": "nonveg",
    "price": "$15.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Curry leaf Shrimp",
    "source": "With pricing!I8",
    "diet": "nonveg",
    "price": "$18.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chennai Chicken Pakoda",
    "source": "With pricing!I9",
    "diet": "nonveg",
    "price": "$13.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Fish Tawa Fry 4pcs",
    "source": "With pricing!I10",
    "diet": "nonveg",
    "price": "$20.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Goat Chukka",
    "source": "With pricing!I11",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken Chukka",
    "source": "With pricing!I12",
    "diet": "nonveg",
    "price": "$16.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Goat pepper dry",
    "source": "With pricing!I13",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Mutton Ghee Roast Fry",
    "source": "With pricing!I14",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken Ghee Roast Fry",
    "source": "With pricing!I15",
    "diet": "nonveg",
    "price": "$16.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Nalla Karam Chicken",
    "source": "With pricing!I16",
    "diet": "nonveg",
    "price": "$17.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Nalla Karam Shrimp",
    "source": "With pricing!I17",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Pallipalayam Chicken",
    "source": "With pricing!I18",
    "diet": "nonveg",
    "price": "$16.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Pepper chicken dry",
    "source": "With pricing!I19",
    "diet": "nonveg",
    "price": "$14.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Shrimp 65",
    "source": "With pricing!I20",
    "diet": "nonveg",
    "price": "$18.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Fish 65",
    "source": "With pricing!I21",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Ulvacharu Kodi Wings 8 pcs",
    "source": "With pricing!I22",
    "diet": "nonveg",
    "price": "$20.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chilli Wings 8 Pcs",
    "source": "With pricing!I23",
    "diet": "nonveg",
    "price": "$20.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chilli Wings 8 Pcs",
    "source": "With pricing!I24",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Crab lolipop ( Weekend Spl)",
    "source": "With pricing!I25",
    "diet": "nonveg",
    "price": "$22.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Crab Pepperfry ( Weekend Spl)",
    "source": "With pricing!I26",
    "diet": "nonveg",
    "price": "$20.99"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Kari Meen Polichathu ( Weekend Spl)",
    "source": "With pricing!I27",
    "diet": "nonveg",
    "price": "$22.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Chili Paneer",
    "source": "With pricing!N3",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Curry Leaf Gobi",
    "source": "With pricing!N4",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Gobi 555",
    "source": "With pricing!N5",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Gobi Manchurian",
    "source": "With pricing!N6",
    "diet": "veg",
    "price": "$13.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Mushroom Pepper Fry",
    "source": "With pricing!N7",
    "diet": "veg",
    "price": "$13.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Nalla Karam Gobi",
    "source": "With pricing!N8",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Nalla Karam Paneer",
    "source": "With pricing!N9",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Nalla Karam Impossible",
    "source": "With pricing!N10",
    "diet": "veg",
    "price": "$16.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Panner 65",
    "source": "With pricing!N11",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Impossible 65",
    "source": "With pricing!N12",
    "diet": "veg",
    "price": "$16.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Gobi 65",
    "source": "With pricing!N13",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Baby Corn 65",
    "source": "With pricing!N14",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Panner Manchurian",
    "source": "With pricing!N15",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Veggie Manchurian",
    "source": "With pricing!N16",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Crunchy Spiced Corn",
    "source": "With pricing!N17",
    "diet": "veg",
    "price": "$11.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Babycorn Manchurian",
    "source": "With pricing!N18",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Chilli Babycorn",
    "source": "With pricing!N19",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Butter Chicken",
    "source": "With pricing!T3",
    "diet": "nonveg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Chettinad",
    "source": "With pricing!T4",
    "diet": "nonveg",
    "price": "$16.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Chili Masala",
    "source": "With pricing!T5",
    "diet": "nonveg",
    "price": "$16.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Tikka Masala",
    "source": "With pricing!T6",
    "diet": "nonveg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Vindaloo",
    "source": "With pricing!T7",
    "diet": "nonveg",
    "price": "$16.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Egg Curry",
    "source": "With pricing!T8",
    "diet": "nonveg",
    "price": "$14.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Goat Chill Masala",
    "source": "With pricing!T9",
    "diet": "nonveg",
    "price": "$18.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Gongura Goat Curry",
    "source": "With pricing!T10",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Gongura Shrimp Curry",
    "source": "With pricing!T11",
    "diet": "nonveg",
    "price": "$18.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Andhra Chicken/Goat Curry",
    "source": "With pricing!T12",
    "diet": "nonveg",
    "price": "$16.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Hyderbadi Chicken/Goat Curry",
    "source": "With pricing!T13",
    "diet": "nonveg",
    "price": "$16.99 | $19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kadhai Chicken",
    "source": "With pricing!T14",
    "diet": "nonveg",
    "price": "$16.99 | $19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kadhai Lamb",
    "source": "With pricing!T15",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Aahaa Spl Chicken Curry",
    "source": "With pricing!T16",
    "diet": "nonveg",
    "price": "$16.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Aahaa Spl Goat Curry",
    "source": "With pricing!T17",
    "diet": "nonveg",
    "price": "$18.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Chettinad",
    "source": "With pricing!T18",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Chili Masala",
    "source": "With pricing!T19",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Rogan Josh",
    "source": "With pricing!T20",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Saag",
    "source": "With pricing!T21",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Madras Fish Curry",
    "source": "With pricing!T22",
    "diet": "nonveg",
    "price": "$18.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Goan Shrimp/Fish Curry",
    "source": "With pricing!T23",
    "diet": "nonveg",
    "price": "$16.99 | $19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Malabar Fish Curry",
    "source": "With pricing!T24",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mango Fish Curry",
    "source": "With pricing!T25",
    "diet": "nonveg",
    "price": "$19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken/Goat Kurma",
    "source": "With pricing!T26",
    "diet": "nonveg",
    "price": "$16.99 | $19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken/Goat Rogan Josh",
    "source": "With pricing!T27",
    "diet": "nonveg",
    "price": "$14.99 | $19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Rotu Kadai Salna",
    "source": "With pricing!T28",
    "diet": "nonveg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken/Mutton Saag",
    "source": "With pricing!T29",
    "diet": "nonveg",
    "price": "$16.99 | $19.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Pepper chicken Masala",
    "source": "With pricing!T30",
    "diet": "nonveg",
    "price": "$16.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chennai Shrimp Masala",
    "source": "With pricing!T31",
    "diet": "nonveg",
    "price": "$17.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Shrimp Tikka Masala",
    "source": "With pricing!T32",
    "diet": "nonveg",
    "price": "$18.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Kheema Masala",
    "source": "With pricing!T34",
    "diet": "nonveg",
    "price": "$20.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kerala Crab Curry",
    "source": "With pricing!T35",
    "diet": "nonveg",
    "price": "$21.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Paya",
    "source": "With pricing!T36",
    "diet": "nonveg",
    "price": "$20.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Aloo Gobi",
    "source": "With pricing!Y3",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Guttivankaya Curry",
    "source": "With pricing!Y4",
    "diet": "veg",
    "price": "$13.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Baingan Bharta",
    "source": "With pricing!Y5",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Dal Makhani",
    "source": "With pricing!Y6",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Jeera Aloo",
    "source": "With pricing!Y7",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Kadai Paneer",
    "source": "With pricing!Y8",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Malai Kofta",
    "source": "With pricing!Y9",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Mutter Paneer",
    "source": "With pricing!Y10",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Navaratan Korma",
    "source": "With pricing!Y11",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Palak Paneer",
    "source": "With pricing!Y12",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Paneer Bhurji",
    "source": "With pricing!Y13",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Paneer Makhani",
    "source": "With pricing!Y14",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Paneer Tikka Masala",
    "source": "With pricing!Y15",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Sambar",
    "source": "With pricing!Y16",
    "diet": "veg",
    "price": "$9.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Shahi Paneer",
    "source": "With pricing!Y17",
    "diet": "veg",
    "price": "$15.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Palak Dhal",
    "source": "With pricing!Y18",
    "diet": "veg",
    "price": "$13.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Vegetable Chettinad",
    "source": "With pricing!Y19",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Veggie Jalfrezi",
    "source": "With pricing!Y20",
    "diet": "veg",
    "price": "$13.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Yellow Dal Tadka",
    "source": "With pricing!Y21",
    "diet": "veg",
    "price": "$12.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Veg Korma",
    "source": "With pricing!Y22",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Impossible Kheema Masala",
    "source": "With pricing!Y23",
    "diet": "veg",
    "price": "$16.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Rotu Kadai Salna",
    "source": "With pricing!Y24",
    "diet": "veg",
    "price": "$12.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Channa Masala",
    "source": "With pricing!Y25",
    "diet": "veg",
    "price": "$12.99"
  },
  {
    "section": "Curries - Veg",
    "name": "Soya Chaps Curry",
    "source": "With pricing!Y26",
    "diet": "veg",
    "price": "$14.99"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Egg Curry",
    "source": "With pricing!Y27",
    "diet": "nonveg",
    "price": "$13.99"
  },
  {
    "section": "Indo-Chinese",
    "name": "Chicken Fried Rice",
    "source": "With pricing!AD3",
    "diet": "nonveg",
    "price": "$15.99"
  },
  {
    "section": "Indo-Chinese",
    "name": "Chicken Noodles",
    "source": "With pricing!AD4",
    "diet": "nonveg",
    "price": "$15.99"
  },
  {
    "section": "Indo-Chinese",
    "name": "Shrimp Fried Rice",
    "source": "With pricing!AD5",
    "diet": "nonveg",
    "price": "$17.99"
  },
  {
    "section": "Indo-Chinese",
    "name": "Mixed Fried Rice",
    "source": "With pricing!AD6",
    "diet": "nonveg",
    "price": "$18.99"
  },
  {
    "section": "Indo-Chinese",
    "name": "Egg Fried Rice",
    "source": "With pricing!AI3",
    "price": "$13.99"
  },
  {
    "section": "Indo-Chinese",
    "name": "Egg Noodles",
    "source": "With pricing!AI4",
    "price": "$13.99"
  },
  {
    "section": "Indo-Chinese",
    "name": "Veg Fried Rice",
    "source": "With pricing!AI5",
    "price": "$12.99"
  },
  {
    "section": "Indo-Chinese",
    "name": "Paneer Fried Rice",
    "source": "With pricing!AI6",
    "price": "$14.99"
  },
  {
    "section": "Indo-Chinese",
    "name": "Panner Noodles",
    "source": "With pricing!AI7",
    "price": "$14.99"
  },
  {
    "section": "Variety Rice",
    "name": "Jeera Rice",
    "source": "With pricing!AD9",
    "price": "$10.99"
  },
  {
    "section": "Variety Rice",
    "name": "Lemon Rice",
    "source": "With pricing!AD10",
    "price": "$10.99"
  },
  {
    "section": "Variety Rice",
    "name": "Coconut Rice",
    "source": "With pricing!AD11",
    "price": "$10.99"
  },
  {
    "section": "Variety Rice",
    "name": "Gongura Rice",
    "source": "With pricing!AD12",
    "price": "$10.99"
  },
  {
    "section": "Variety Rice",
    "name": "Tamarind Rice",
    "source": "With pricing!AD13",
    "price": "$10.99"
  },
  {
    "section": "Variety Rice",
    "name": "Peas Pulao",
    "source": "With pricing!AD14",
    "price": "$10.99"
  },
  {
    "section": "Variety Rice",
    "name": "Steamed Rice",
    "source": "With pricing!AD15",
    "price": "$4.99"
  },
  {
    "section": "Variety Rice",
    "name": "Nei Soru",
    "source": "With pricing!AD18",
    "price": "$13.99"
  },
  {
    "section": "Variety Rice",
    "name": "Dindigul Kuska",
    "source": "With pricing!AD19",
    "price": "$12.99"
  },
  {
    "section": "Variety Rice",
    "name": "Bhagara Rice",
    "source": "With pricing!AD20",
    "price": "$10.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Ghee Idly",
    "source": "With pricing!AL3",
    "price": "$12.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Idly (3pcs)",
    "source": "With pricing!AL4",
    "price": "$8.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mini Podi Idly",
    "source": "With pricing!AL5",
    "price": "$10.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Podi Idly",
    "source": "With pricing!AL6",
    "price": "$12.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Poori Bhaji 2pcs",
    "source": "With pricing!AL7",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Thattu Idly 2Pcs",
    "source": "With pricing!AL8",
    "price": "$10.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Thattu Podi Idly 2Pcs",
    "source": "With pricing!AL9",
    "price": "$12.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Ghee Thattu Idly 2pcs",
    "source": "With pricing!AL10",
    "price": "$11.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Sambar Idly",
    "source": "With pricing!AL11",
    "price": "$12.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Chole Batura",
    "source": "With pricing!AL12",
    "price": "$14.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Butter Dosa",
    "source": "With pricing!AN3",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Butter Masala Dosa",
    "source": "With pricing!AN4",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Chettinad Dosa",
    "source": "With pricing!AN5",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Egg Dosa",
    "source": "With pricing!AN6",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Masala Dosa",
    "source": "With pricing!AN7",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mix Veg Uttappam",
    "source": "With pricing!AN8",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mysore Dosa",
    "source": "With pricing!AN9",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Onion Dosa",
    "source": "With pricing!AN10",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Onion Rava Dosa",
    "source": "With pricing!AN11",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Onion Uttappam",
    "source": "With pricing!AN12",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Paneer Dosa",
    "source": "With pricing!AN13",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Paper Dosa",
    "source": "With pricing!AN14",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Paper Masala Dosa",
    "source": "With pricing!AN15",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Plain Dosa",
    "source": "With pricing!AN16",
    "price": "$12.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Podi Dosa",
    "source": "With pricing!AN17",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Rava Dosa",
    "source": "With pricing!AN18",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Rava Masala Dosa",
    "source": "With pricing!AN19",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Special Masala Dosa",
    "source": "With pricing!AN20",
    "price": "$15.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Spinach Masala Dosa",
    "source": "With pricing!AN21",
    "price": "$13.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mutton Kari Dosa",
    "source": "With pricing!AN23",
    "price": "$18.99"
  },
  {
    "section": "Tiffin Corner",
    "name": "Chicken Kari Dosa",
    "source": "With pricing!AN24",
    "price": "$16.99"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Achari Tikka",
    "source": "With pricing!AQ3",
    "price": "$18.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Haryali Tikka",
    "source": "With pricing!AQ4",
    "price": "$18.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Sheekh Kabab",
    "source": "With pricing!AQ5",
    "price": "$18.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Tikka Lasuni",
    "source": "With pricing!AQ6",
    "price": "$18.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Fish Tikka (Mahi Mahi)",
    "source": "With pricing!AQ7",
    "price": "$20.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Lamb Seekh Kabab",
    "source": "With pricing!AQ8",
    "price": "$18.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Malai Chicken Tikka",
    "source": "With pricing!AQ9",
    "price": "$18.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Chicken 4 pc",
    "source": "With pricing!AQ10",
    "price": "$18.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Chicken 8pc",
    "source": "With pricing!AQ11",
    "price": "$24.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Shrimp",
    "source": "With pricing!AQ12",
    "price": "$20.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Vegetables",
    "source": "With pricing!AQ13",
    "price": "$15.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori pomfret",
    "source": "With pricing!AQ14",
    "price": "$25.99",
    "prepTime": "30-40"
  },
  {
    "section": "Tandoor",
    "name": "Paneer Tikka",
    "source": "With pricing!AQ15",
    "price": "$16.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Tandoor Mix Grill",
    "source": "With pricing!AQ16",
    "price": "$29.99",
    "prepTime": "20-30"
  },
  {
    "section": "Tandoor",
    "name": "Hariyali Paneer Tikka",
    "source": "With pricing!AQ17",
    "price": "$16.99",
    "prepTime": "20-30"
  },
  {
    "section": "Naan",
    "name": "Aloo Paratha",
    "source": "With pricing!AV3",
    "price": "$4.99"
  },
  {
    "section": "Naan",
    "name": "Bread Basket",
    "source": "With pricing!AV4",
    "price": "$12.99"
  },
  {
    "section": "Naan",
    "name": "Bullet Naan",
    "source": "With pricing!AV5",
    "price": "$4.99"
  },
  {
    "section": "Naan",
    "name": "Butter Roti",
    "source": "With pricing!AV6",
    "price": "$4.99"
  },
  {
    "section": "Naan",
    "name": "Cauliflower Naan",
    "source": "With pricing!AV7",
    "price": "$4.99"
  },
  {
    "section": "Naan",
    "name": "Garlic Naan",
    "source": "With pricing!AV8",
    "price": "$5.99"
  },
  {
    "section": "Naan",
    "name": "Khurmi Naan",
    "source": "With pricing!AV9",
    "price": "$5.99"
  },
  {
    "section": "Naan",
    "name": "Lamb Keema Naan",
    "source": "With pricing!AV10",
    "price": "$6.99"
  },
  {
    "section": "Naan",
    "name": "Onion Kulcha",
    "source": "With pricing!AV11",
    "price": "$5.99"
  },
  {
    "section": "Naan",
    "name": "Paneer Naan",
    "source": "With pricing!AV12",
    "price": "$6.99"
  },
  {
    "section": "Naan",
    "name": "Peshwari Naan",
    "source": "With pricing!AV13",
    "price": "$5.99"
  },
  {
    "section": "Naan",
    "name": "Plain Naan",
    "source": "With pricing!AV14",
    "price": "$3.99"
  },
  {
    "section": "Naan",
    "name": "Pulkha",
    "source": "With pricing!AV15",
    "price": "$5.99"
  },
  {
    "section": "Naan",
    "name": "Sesame Naan",
    "source": "With pricing!AV16",
    "price": "$5.99"
  },
  {
    "section": "Naan",
    "name": "Tandoori Roti",
    "source": "With pricing!AV17",
    "price": "$5.99"
  },
  {
    "section": "Naan",
    "name": "Chapathi 2pcs",
    "source": "With pricing!AV18",
    "price": "$5.99"
  },
  {
    "section": "Naan",
    "name": "Batura 1 pcs",
    "source": "With pricing!AV19",
    "price": "$4.99"
  },
  {
    "section": "Naan",
    "name": "Cheese Naan",
    "source": "With pricing!AV20",
    "price": "$4.99"
  },
  {
    "section": "Naan",
    "name": "Lacha Paratha",
    "source": "With pricing!AV21",
    "price": "$5.99"
  },
  {
    "section": "Biryani",
    "name": "Veg Dum Biryani",
    "source": "With pricing!AY3",
    "portions": [
      {
        "label": "Single",
        "price": "$11.99"
      },
      {
        "label": "Regular",
        "price": "$16.99"
      },
      {
        "label": "Family Pack",
        "price": "$35.99"
      },
      {
        "label": "Jumbo",
        "price": "$49.99"
      }
    ],
    "price": "$11.99 | $16.99 | $35.99 | $49.99"
  },
  {
    "section": "Biryani",
    "name": "Hyderabadi Chicken Dum",
    "source": "With pricing!AY4",
    "portions": [
      {
        "label": "Single",
        "price": "$12.99"
      },
      {
        "label": "Regular",
        "price": "$17.99"
      },
      {
        "label": "Family Pack",
        "price": "$37.99"
      },
      {
        "label": "Jumbo",
        "price": "$54.99"
      }
    ],
    "price": "$12.99 | $17.99 | $37.99 | $54.99"
  },
  {
    "section": "Biryani",
    "name": "Hyderabadi Goat Dum",
    "source": "With pricing!AY5",
    "portions": [
      {
        "label": "Single",
        "price": "$13.99"
      },
      {
        "label": "Regular",
        "price": "$18.99"
      },
      {
        "label": "Family Pack",
        "price": "$44.99"
      },
      {
        "label": "Jumbo",
        "price": "$59.99"
      }
    ],
    "price": "$13.99 | $18.99 | $44.99 | $59.99"
  },
  {
    "section": "Biryani",
    "name": "Vijayawada Dum Chicken",
    "source": "With pricing!AY6",
    "portions": [
      {
        "label": "Single",
        "price": "$12.99"
      },
      {
        "label": "Regular",
        "price": "$17.99"
      },
      {
        "label": "Family Pack",
        "price": "$37.99"
      },
      {
        "label": "Jumbo",
        "price": "$54.99"
      }
    ],
    "price": "$12.99 | $17.99 | $37.99 | $54.99"
  },
  {
    "section": "Biryani",
    "name": "Mutton Ghee Roast Briyani",
    "source": "With pricing!AY7",
    "portions": [
      {
        "label": "Single",
        "price": "$13.99"
      },
      {
        "label": "Regular",
        "price": "$18.99"
      },
      {
        "label": "Family Pack",
        "price": "$44.99"
      },
      {
        "label": "Jumbo",
        "price": "$59.99"
      }
    ],
    "price": "$13.99 | $18.99 | $44.99 | $59.99"
  },
  {
    "section": "Biryani",
    "name": "Nattu Kodi Chicken Fry Piece Biryani",
    "source": "With pricing!AY8",
    "portions": [
      {
        "label": "Single",
        "price": "$12.99"
      },
      {
        "label": "Regular",
        "price": "$17.99"
      },
      {
        "label": "Family Pack",
        "price": "$37.99"
      },
      {
        "label": "Jumbo",
        "price": "$54.99"
      }
    ],
    "price": "$12.99 | $17.99 | $37.99 | $54.99"
  },
  {
    "section": "Biryani",
    "name": "Nizam Briyani (Cashew ) Chicken Biryani",
    "source": "With pricing!AY9",
    "portions": [
      {
        "label": "Single",
        "price": "$13.99"
      },
      {
        "label": "Regular",
        "price": "$18.99"
      },
      {
        "label": "Family Pack",
        "price": "$44.99"
      },
      {
        "label": "Jumbo",
        "price": "$59.99"
      }
    ],
    "price": "$13.99 | $18.99 | $44.99 | $59.99"
  },
  {
    "section": "Biryani",
    "name": "Chicken 65 Briyani",
    "source": "With pricing!AY10",
    "portions": [
      {
        "label": "Single",
        "price": "$12.99"
      },
      {
        "label": "Regular",
        "price": "$17.99"
      },
      {
        "label": "Family Pack",
        "price": "$37.99"
      },
      {
        "label": "Jumbo",
        "price": "$54.99"
      }
    ],
    "price": "$12.99 | $17.99 | $37.99 | $54.99"
  },
  {
    "section": "Biryani",
    "name": "Aahaa Spl Paneer",
    "source": "With pricing!AY11",
    "portions": [
      {
        "label": "Single",
        "price": "$12.99"
      },
      {
        "label": "Regular",
        "price": "$17.99"
      },
      {
        "label": "Family Pack",
        "price": "$36.99"
      },
      {
        "label": "Jumbo",
        "price": "$50.99"
      }
    ],
    "price": "$12.99 | $17.99 | $36.99 | $50.99"
  },
  {
    "section": "Biryani",
    "name": "Aahaa Spl Egg",
    "source": "With pricing!AY12",
    "portions": [
      {
        "label": "Single",
        "price": "$11.99"
      },
      {
        "label": "Regular",
        "price": "$16.99"
      },
      {
        "label": "Family Pack",
        "price": "$35.99"
      },
      {
        "label": "Jumbo",
        "price": "$49.99"
      }
    ],
    "price": "$11.99 | $16.99 | $35.99 | $49.99"
  },
  {
    "section": "Biryani",
    "name": "Gongura Chicken",
    "source": "With pricing!AY13",
    "portions": [
      {
        "label": "Single",
        "price": "$12.99"
      },
      {
        "label": "Regular",
        "price": "$17.99"
      },
      {
        "label": "Family Pack",
        "price": "$37.99"
      },
      {
        "label": "Jumbo",
        "price": "$54.99"
      }
    ],
    "price": "$12.99 | $17.99 | $37.99 | $54.99"
  },
  {
    "section": "Biryani",
    "name": "Aahaa Avakaya Chicken Briyani",
    "source": "With pricing!AY14",
    "portions": [
      {
        "label": "Single",
        "price": "$12.99"
      },
      {
        "label": "Regular",
        "price": "$17.99"
      },
      {
        "label": "Family Pack",
        "price": "$37.99"
      },
      {
        "label": "Jumbo",
        "price": "$54.99"
      }
    ],
    "price": "$12.99 | $17.99 | $37.99 | $54.99"
  },
  {
    "section": "Biryani",
    "name": "Aahaa Avakaya Briyani",
    "source": "With pricing!AY15",
    "portions": [
      {
        "label": "Single",
        "price": "$11.99"
      },
      {
        "label": "Regular",
        "price": "$16.99"
      },
      {
        "label": "Family Pack",
        "price": "$35.99"
      },
      {
        "label": "Jumbo",
        "price": "$49.99"
      }
    ],
    "price": "$11.99 | $16.99 | $35.99 | $49.99"
  },
  {
    "section": "Biryani",
    "name": "Hari Mirchi Paneer Biryani",
    "source": "With pricing!AY16"
  },
  {
    "section": "Biryani",
    "name": "Hari Mirchi Chicken Biryani",
    "source": "With pricing!AY17"
  },
  {
    "section": "Biryani",
    "name": "Hari Mirchi Egg Biryani",
    "source": "With pricing!AY18"
  },
  {
    "section": "Biryani",
    "name": "Hari Mirchi Goat Biryani",
    "source": "With pricing!AY19"
  },
  {
    "section": "Parotta Specials",
    "name": "Chicken Kothu Parotta",
    "source": "With pricing!BG3",
    "price": "$17.99"
  },
  {
    "section": "Parotta Specials",
    "name": "Egg Kothu Parotta",
    "source": "With pricing!BG4",
    "price": "$16.99"
  },
  {
    "section": "Parotta Specials",
    "name": "Kizhi Parotta - Chicken",
    "source": "With pricing!BG5",
    "price": "$18.99"
  },
  {
    "section": "Parotta Specials",
    "name": "Kizhi Parotta - Mutton",
    "source": "With pricing!BG6",
    "price": "$20.99"
  },
  {
    "section": "Parotta Specials",
    "name": "Kizhi Parotta - Shrimp",
    "source": "With pricing!BG7",
    "price": "$21.99"
  },
  {
    "section": "Parotta Specials",
    "name": "Parotta 2 pcs with Veg /Chicken Curry",
    "source": "With pricing!BG8",
    "price": "$12.99 | $13.99"
  },
  {
    "section": "Parotta Specials",
    "name": "Nest Parotta Chicken/Mutton",
    "source": "With pricing!BG11",
    "price": "$16.99 | $20.99"
  },
  {
    "section": "Parotta Specials",
    "name": "Nool Parotta 2pcs",
    "source": "With pricing!BG12",
    "price": "$14.99"
  },
  {
    "section": "Parotta Specials",
    "name": "Coin Parotta 2pcs",
    "source": "With pricing!BG13",
    "price": "$13.99"
  },
  {
    "section": "Combos",
    "name": "Idly Vada Combo 2pc 1 Vada",
    "source": "With pricing!AY60"
  },
  {
    "section": "Combos",
    "name": "Poori Vada Combo",
    "source": "With pricing!AY61"
  },
  {
    "section": "Combos",
    "name": "Parotta -Chicken Salna - Ommlette",
    "source": "With pricing!AY62"
  },
  {
    "section": "Combos",
    "name": "Parotta- Chicken Salna - Chukka",
    "source": "With pricing!AY63"
  },
  {
    "section": "Lunch Specials",
    "name": "Maha Virundhu - Non Veg",
    "source": "With pricing!AY66"
  },
  {
    "section": "Lunch Specials",
    "name": "Maha Virundhu - Veg",
    "source": "With pricing!AY67"
  },
  {
    "section": "Desserts",
    "name": "Apricot Delight",
    "source": "With pricing!AY69"
  },
  {
    "section": "Desserts",
    "name": "Carrot Halwa",
    "source": "With pricing!AY70"
  },
  {
    "section": "Desserts",
    "name": "Gulab Jamun 3pcs",
    "source": "With pricing!AY71"
  },
  {
    "section": "Desserts",
    "name": "Rasamalai 2 pcs",
    "source": "With pricing!AY72"
  },
  {
    "section": "Drinks",
    "name": "Badam Milk",
    "source": "With pricing!AY74"
  },
  {
    "section": "Drinks",
    "name": "Butter Milk",
    "source": "With pricing!AY75"
  },
  {
    "section": "Drinks",
    "name": "Chiku Shake",
    "source": "With pricing!AY76"
  },
  {
    "section": "Drinks",
    "name": "Lime Soda",
    "source": "With pricing!AY77"
  },
  {
    "section": "Drinks",
    "name": "Madras Coffee",
    "source": "With pricing!AY78"
  },
  {
    "section": "Drinks",
    "name": "Mango Lassi",
    "source": "With pricing!AY79"
  },
  {
    "section": "Drinks",
    "name": "Mango Shake",
    "source": "With pricing!AY80"
  },
  {
    "section": "Drinks",
    "name": "Irani Chai Regular/Small",
    "source": "With pricing!AY81"
  },
  {
    "section": "Drinks",
    "name": "Masala Chai",
    "source": "With pricing!AY82"
  },
  {
    "section": "Drinks",
    "name": "Kettle Chai - Masala/Irani Serves 8 to 10 people",
    "source": "With pricing!AY83"
  },
  {
    "section": "Drinks",
    "name": "Rose Milk",
    "source": "With pricing!AY84"
  },
  {
    "section": "Drinks",
    "name": "Sodas ( Pepsi/Fanta/Thumbsup",
    "source": "With pricing!AY85"
  },
  {
    "section": "Drinks",
    "name": "Sweet Lassi",
    "source": "With pricing!AY86"
  },
  {
    "section": "Mocktails",
    "name": "Minnal Mango",
    "source": "With pricing!AY88"
  },
  {
    "section": "Mocktails",
    "name": "Orange Mint Spritzer",
    "source": "With pricing!AY89"
  },
  {
    "section": "Mocktails",
    "name": "Kiwi Cooler",
    "source": "With pricing!AY90"
  },
  {
    "section": "Mocktails",
    "name": "Pineapple Coconut Fizz",
    "source": "With pricing!AY91"
  },
  {
    "section": "Mocktails",
    "name": "Honey Lemon Refreshner",
    "source": "With pricing!AY92"
  },
  {
    "section": "Mocktails",
    "name": "Blue lemon Pink Soda",
    "source": "With pricing!AY93"
  },
  {
    "section": "Mocktails",
    "name": "Sunset Mock tail",
    "source": "With pricing!AY94"
  },
  {
    "section": "Mocktails",
    "name": "Spicy Cucumber Lemondae",
    "source": "With pricing!AY95"
  },
  {
    "section": "Mocktails",
    "name": "Strawberry Stranger",
    "source": "With pricing!AY96"
  },
  {
    "section": "Mocktails",
    "name": "Caramel cinammon cooler",
    "source": "With pricing!AY97"
  },
  {
    "section": "Soups",
    "name": "Mutton Pepper Soup",
    "source": "Version 1!A2"
  },
  {
    "section": "Soups",
    "name": "Chicken Pepper Soup",
    "source": "Version 1!A3"
  },
  {
    "section": "Soups",
    "name": "Cream of mushroom soup",
    "source": "Version 1!A4"
  },
  {
    "section": "Soups",
    "name": "CreamyTomato soup",
    "source": "Version 1!A5"
  },
  {
    "section": "Soups",
    "name": "Hot & sour soup Veg/ Chicken",
    "source": "Version 1!A6"
  },
  {
    "section": "Soups",
    "name": "Lentil (Mulligatawny) Soup",
    "source": "Version 1!A7"
  },
  {
    "section": "Soups",
    "name": "Manchow soup Veg/ Chicken",
    "source": "Version 1!A8"
  },
  {
    "section": "Soups",
    "name": "Sweet Corn Veg / Chicken",
    "source": "Version 1!A9"
  },
  {
    "section": "Soups",
    "name": "Veg clear soup",
    "source": "Version 1!A10"
  },
  {
    "section": "Soups",
    "name": "Mutton nalli soup (Weekend spl)",
    "source": "Version 1!A12"
  },
  {
    "section": "Soups",
    "name": "Crab Soup (Weekend spl)",
    "source": "Version 1!A13"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Butter Chicken",
    "source": "Version 1!A25",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Chettinad",
    "source": "Version 1!A26",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Chili Masala",
    "source": "Version 1!A27",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Rotu Kadai Salana",
    "source": "Version 1!A28",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Tikka Masala",
    "source": "Version 1!A29",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Vindaloo",
    "source": "Version 1!A30",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Egg Curry",
    "source": "Version 1!A31",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Goat Chill Masala",
    "source": "Version 1!A32",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Gongura Chicken Curry",
    "source": "Version 1!A33",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Gongura Mutton Curry",
    "source": "Version 1!A34",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Gongura Shrimp Curry",
    "source": "Version 1!A35",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kadhai Chicken",
    "source": "Version 1!A36",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kadhai Lamb",
    "source": "Version 1!A37",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kerala Chicken Curry",
    "source": "Version 1!A38",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kerala Shrimp Curry",
    "source": "Version 1!A39",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Chettinad",
    "source": "Version 1!A40",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Chili Masala",
    "source": "Version 1!A41",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Rogan Josh",
    "source": "Version 1!A42",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Saag",
    "source": "Version 1!A43",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mango Fish Curry",
    "source": "Version 1!A44",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Kozhambu",
    "source": "Version 1!A45",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Kurma",
    "source": "Version 1!A46",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton RoganJosh",
    "source": "Version 1!A47",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Stew",
    "source": "Version 1!A48",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Palak Chicken Curry",
    "source": "Version 1!A49",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Pepper chicken Masala",
    "source": "Version 1!A50",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Shrimp Tikka Masala",
    "source": "Version 1!A51",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Chops Curry",
    "source": "Version 1!A54",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Kheema Masala",
    "source": "Version 1!A55",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kerala Crab Curry",
    "source": "Version 1!A56",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Paya",
    "source": "Version 1!A57",
    "diet": "nonveg"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Aloo Papdi Chaat",
    "source": "Version 1!B2"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Aloo Tikki Chaat",
    "source": "Version 1!B3"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Bhel Puri",
    "source": "Version 1!B4"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Cut Mirchi",
    "source": "Version 1!B5"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Egg Bonda",
    "source": "Version 1!B6"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Medu Vada",
    "source": "Version 1!B7"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Mirchi Bhaji",
    "source": "Version 1!B8"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Mix Vegetable Pakoras",
    "source": "Version 1!B9"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Onion Pakora Chennai Style",
    "source": "Version 1!B10"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Paani Puri",
    "source": "Version 1!B11"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Paneer Pakora",
    "source": "Version 1!B12"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Plantain Bhaji",
    "source": "Version 1!B13"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Punugulu",
    "source": "Version 1!B14"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Railway Samosa",
    "source": "Version 1!B15"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Samosa ( Veg/Chicken/Lamb)",
    "source": "Version 1!B16"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Samosa Chaat",
    "source": "Version 1!B17"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Masala Vada",
    "source": "Version 1!B19"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Puran Poli",
    "source": "Version 1!B20"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Mysore Bonda",
    "source": "Version 1!B21"
  },
  {
    "section": "Curries - Veg",
    "name": "Aloo Gobi",
    "source": "Version 1!B25",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Rotu Kadai Salana",
    "source": "Version 1!B26",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Baingan Bharta",
    "source": "Version 1!B27",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Chana Masala",
    "source": "Version 1!B28",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Dal Makhani",
    "source": "Version 1!B29",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Jeera Aloo",
    "source": "Version 1!B30",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Kadai Paneer",
    "source": "Version 1!B31",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Malai Kofta",
    "source": "Version 1!B32",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Mushroom Masala",
    "source": "Version 1!B33",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Mutter Paneer",
    "source": "Version 1!B34",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Navaratan Korma",
    "source": "Version 1!B35",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Palak Paneer",
    "source": "Version 1!B36",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Paneer Bhurji",
    "source": "Version 1!B37",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Paneer Makhani",
    "source": "Version 1!B38",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Paneer Tikka Masala",
    "source": "Version 1!B39",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Sambar",
    "source": "Version 1!B40",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Shahi Paneer",
    "source": "Version 1!B41",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Vatha Kuzhambu",
    "source": "Version 1!B42",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Vegetable Chettinad",
    "source": "Version 1!B43",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Veggie Jalfrezi",
    "source": "Version 1!B44",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Yellow Dal Tadka",
    "source": "Version 1!B45",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Crispy Vegetables",
    "source": "Version 1!C3",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Chili Paneer",
    "source": "Version 1!C4",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Curry Leaf Gobi",
    "source": "Version 1!C5",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Gobi 555",
    "source": "Version 1!C6",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Gobi 65",
    "source": "Version 1!C7",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Gobi Manchurian",
    "source": "Version 1!C8",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Mushroom Pepper",
    "source": "Version 1!C9",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Nalla Karam Gobi",
    "source": "Version 1!C10",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Nalla Karam Paneer",
    "source": "Version 1!C11",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Paneer 555",
    "source": "Version 1!C12",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Panner 65",
    "source": "Version 1!C13",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Panner Manchurian",
    "source": "Version 1!C14",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken 65",
    "source": "Version 1!D3",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Apollo Fish",
    "source": "Version 1!D4",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken 555",
    "source": "Version 1!D5",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken podimas",
    "source": "Version 1!D6",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chilli Shrimp",
    "source": "Version 1!D7",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Crispy Lamb",
    "source": "Version 1!D8",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Curry leaf chicken fry",
    "source": "Version 1!D9",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Fish Finger",
    "source": "Version 1!D10",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Fish Tawa Fry",
    "source": "Version 1!D11",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Goan Fish Fry",
    "source": "Version 1!D12",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Mutton chukka",
    "source": "Version 1!D13",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Mutton pepper dry",
    "source": "Version 1!D14",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Nalla Karam Chicken",
    "source": "Version 1!D15",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Nalla Karam Shrimp",
    "source": "Version 1!D16",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Pallipalayam Chicken",
    "source": "Version 1!D17",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Pepper chicken dry",
    "source": "Version 1!D18",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Shrimp 65",
    "source": "Version 1!D19",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Shrimp chukka",
    "source": "Version 1!D20",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Shrimp masala (thokku/dry)",
    "source": "Version 1!D21",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Shrimp tempura",
    "source": "Version 1!D22",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Crab lolipop ( Weekend Spl)",
    "source": "Version 1!D24",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Crab Pepperfry ( Weekend Spl)",
    "source": "Version 1!D25",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Meen polichathu ( Weekend Spl)",
    "source": "Version 1!D26",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Ulvacharu Kodi Wings",
    "source": "Version 1!D27",
    "diet": "nonveg"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Achari Tikka",
    "source": "Version 1!D37"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Haryali Tikka",
    "source": "Version 1!D38"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Sheekh Kabab",
    "source": "Version 1!D39"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Tikka",
    "source": "Version 1!D40"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Tikka Lasuni",
    "source": "Version 1!D41"
  },
  {
    "section": "Tandoor",
    "name": "Fish Tikka (Mahi Mahi)",
    "source": "Version 1!D42"
  },
  {
    "section": "Tandoor",
    "name": "Lamb Seekh Kabab",
    "source": "Version 1!D43"
  },
  {
    "section": "Tandoor",
    "name": "Malai Chicken Tikka",
    "source": "Version 1!D44"
  },
  {
    "section": "Tandoor",
    "name": "Paneer Tikka",
    "source": "Version 1!D45"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Chicken",
    "source": "Version 1!D46"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Shrimp",
    "source": "Version 1!D47"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Vegetables",
    "source": "Version 1!D48"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori pomfret",
    "source": "Version 1!D50"
  },
  {
    "section": "Indo-Chinese",
    "name": "Chicken Fried Rice",
    "source": "Version 1!E3",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Chicken Noodles",
    "source": "Version 1!E4",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Shrimp Fried Rice",
    "source": "Version 1!E5",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Shrimp Noodles",
    "source": "Version 1!E6",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Mixed Fried Rice",
    "source": "Version 1!E7",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Egg Fried Rice",
    "source": "Version 1!F3"
  },
  {
    "section": "Indo-Chinese",
    "name": "Egg Noodles",
    "source": "Version 1!F4"
  },
  {
    "section": "Indo-Chinese",
    "name": "Veg Fried Rice",
    "source": "Version 1!F5"
  },
  {
    "section": "Indo-Chinese",
    "name": "Veg Noodles",
    "source": "Version 1!F6"
  },
  {
    "section": "Indo-Chinese",
    "name": "Paneer Fried Rice",
    "source": "Version 1!F7"
  },
  {
    "section": "Indo-Chinese",
    "name": "Panner Noodles",
    "source": "Version 1!F8"
  },
  {
    "section": "Variety Rice",
    "name": "Jeera Rice",
    "source": "Version 1!E10"
  },
  {
    "section": "Variety Rice",
    "name": "Peas Pulov",
    "source": "Version 1!E11"
  },
  {
    "section": "Variety Rice",
    "name": "Lemon Rice",
    "source": "Version 1!E13"
  },
  {
    "section": "Variety Rice",
    "name": "Coconut Rice",
    "source": "Version 1!E14"
  },
  {
    "section": "Variety Rice",
    "name": "Gongura Rice",
    "source": "Version 1!E15"
  },
  {
    "section": "Variety Rice",
    "name": "Tamarind Rice",
    "source": "Version 1!E16"
  },
  {
    "section": "Tiffin Corner",
    "name": "Chola Bhatura",
    "source": "Version 1!E18"
  },
  {
    "section": "Tiffin Corner",
    "name": "Ghee Idly",
    "source": "Version 1!E19"
  },
  {
    "section": "Tiffin Corner",
    "name": "Idly (3pcs)",
    "source": "Version 1!E20"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mini Podi Idly",
    "source": "Version 1!E21"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mini Sambar Idly",
    "source": "Version 1!E22"
  },
  {
    "section": "Tiffin Corner",
    "name": "Podi Idly",
    "source": "Version 1!E23"
  },
  {
    "section": "Tiffin Corner",
    "name": "Pongal",
    "source": "Version 1!E24"
  },
  {
    "section": "Tiffin Corner",
    "name": "Poori (2pcs)",
    "source": "Version 1!E25"
  },
  {
    "section": "Tiffin Corner",
    "name": "Sambar Idly",
    "source": "Version 1!E26"
  },
  {
    "section": "Tiffin Corner",
    "name": "Sambar Vada",
    "source": "Version 1!E27"
  },
  {
    "section": "Tiffin Corner",
    "name": "Appam",
    "source": "Version 1!E29"
  },
  {
    "section": "Tiffin Corner",
    "name": "Idyappam",
    "source": "Version 1!E30"
  },
  {
    "section": "Tiffin Corner",
    "name": "Rava Kichadi",
    "source": "Version 1!E31"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mini Tiffen",
    "source": "Version 1!E32"
  },
  {
    "section": "Tiffin Corner",
    "name": "Idly Uppma",
    "source": "Version 1!E33"
  },
  {
    "section": "Tiffin Corner",
    "name": "Andhra spicy Masala Dosa",
    "source": "Version 1!F18"
  },
  {
    "section": "Tiffin Corner",
    "name": "Butter Dosa",
    "source": "Version 1!F19"
  },
  {
    "section": "Tiffin Corner",
    "name": "Butter Masala Dosa",
    "source": "Version 1!F20"
  },
  {
    "section": "Tiffin Corner",
    "name": "Chettinad Dosa",
    "source": "Version 1!F21"
  },
  {
    "section": "Tiffin Corner",
    "name": "Chicken Dosa",
    "source": "Version 1!F22"
  },
  {
    "section": "Tiffin Corner",
    "name": "Egg Dosa",
    "source": "Version 1!F23"
  },
  {
    "section": "Tiffin Corner",
    "name": "Masala Dosa",
    "source": "Version 1!F24"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mix Veg Uttappam",
    "source": "Version 1!F25"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mysore Dosa",
    "source": "Version 1!F26"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mysore Masala Dosa",
    "source": "Version 1!F27"
  },
  {
    "section": "Tiffin Corner",
    "name": "Onion Dosa",
    "source": "Version 1!F28"
  },
  {
    "section": "Tiffin Corner",
    "name": "Onion Rava Dosa",
    "source": "Version 1!F29"
  },
  {
    "section": "Tiffin Corner",
    "name": "Onion Uttappam",
    "source": "Version 1!F30"
  },
  {
    "section": "Tiffin Corner",
    "name": "Paneer Dosa",
    "source": "Version 1!F31"
  },
  {
    "section": "Tiffin Corner",
    "name": "Paper Dosa",
    "source": "Version 1!F32"
  },
  {
    "section": "Tiffin Corner",
    "name": "Paper Masala Dosa",
    "source": "Version 1!F33"
  },
  {
    "section": "Tiffin Corner",
    "name": "Plain Dosa",
    "source": "Version 1!F34"
  },
  {
    "section": "Tiffin Corner",
    "name": "Podi Dosa",
    "source": "Version 1!F35"
  },
  {
    "section": "Tiffin Corner",
    "name": "Rava Dosa",
    "source": "Version 1!F36"
  },
  {
    "section": "Tiffin Corner",
    "name": "Rava Masala Dosa",
    "source": "Version 1!F37"
  },
  {
    "section": "Tiffin Corner",
    "name": "Special Masala Dosa",
    "source": "Version 1!F38"
  },
  {
    "section": "Tiffin Corner",
    "name": "Spinach Masala Dosa",
    "source": "Version 1!F39"
  },
  {
    "section": "Tiffin Corner",
    "name": "Mutton Kari Dosa",
    "source": "Version 1!F41"
  },
  {
    "section": "Tiffin Corner",
    "name": "Chicken Kari Dosa",
    "source": "Version 1!F42"
  },
  {
    "section": "Tiffin Corner",
    "name": "Kal Dosa",
    "source": "Version 1!F43"
  },
  {
    "section": "Tiffin Corner",
    "name": "Egg Appam",
    "source": "Version 1!F44"
  },
  {
    "section": "Tiffin Corner",
    "name": "Set Dosa Vadacurry",
    "source": "Version 1!F45"
  },
  {
    "section": "Naan",
    "name": "Aloo Paratha",
    "source": "Version 1!E37"
  },
  {
    "section": "Naan",
    "name": "Bread Basket",
    "source": "Version 1!E38"
  },
  {
    "section": "Naan",
    "name": "Bullet Naan",
    "source": "Version 1!E39"
  },
  {
    "section": "Naan",
    "name": "Butter naan",
    "source": "Version 1!E40"
  },
  {
    "section": "Naan",
    "name": "Butter Roti",
    "source": "Version 1!E41"
  },
  {
    "section": "Naan",
    "name": "Cauliflower Naan",
    "source": "Version 1!E42"
  },
  {
    "section": "Naan",
    "name": "Garlic Naan",
    "source": "Version 1!E43"
  },
  {
    "section": "Naan",
    "name": "Khurmi Naan",
    "source": "Version 1!E44"
  },
  {
    "section": "Naan",
    "name": "Lachcha Paratha",
    "source": "Version 1!E45"
  },
  {
    "section": "Naan",
    "name": "Lamb Keema Naan",
    "source": "Version 1!E46"
  },
  {
    "section": "Naan",
    "name": "Onion Kulcha",
    "source": "Version 1!E47"
  },
  {
    "section": "Naan",
    "name": "Paneer Naan",
    "source": "Version 1!E48"
  },
  {
    "section": "Naan",
    "name": "Peshwari Naan",
    "source": "Version 1!E49"
  },
  {
    "section": "Naan",
    "name": "Plain Naan",
    "source": "Version 1!E50"
  },
  {
    "section": "Naan",
    "name": "Pulkha",
    "source": "Version 1!E51"
  },
  {
    "section": "Naan",
    "name": "Sesame Naan",
    "source": "Version 1!E52"
  },
  {
    "section": "Naan",
    "name": "Tandoori Roti",
    "source": "Version 1!E53"
  },
  {
    "section": "Biryani",
    "name": "Ambur Briyani",
    "source": "Version 1!G2"
  },
  {
    "section": "Biryani",
    "name": "Fish Briyani",
    "source": "Version 1!G3"
  },
  {
    "section": "Biryani",
    "name": "Gongura Chicken Briyani",
    "source": "Version 1!G4"
  },
  {
    "section": "Biryani",
    "name": "Hyderabadi Style Briyani",
    "source": "Version 1!G5"
  },
  {
    "section": "Biryani",
    "name": "Prawn Briyani",
    "source": "Version 1!G6"
  },
  {
    "section": "Biryani",
    "name": "Vijayawada Chicken Briyani",
    "source": "Version 1!G7"
  },
  {
    "section": "Biryani",
    "name": "Veg Briyani",
    "source": "Version 1!G8"
  },
  {
    "section": "Biryani",
    "name": "Aahaa - Spl Chicken Pulov",
    "source": "Version 1!G10"
  },
  {
    "section": "Biryani",
    "name": "Thalapkati Briyani ( Chicken & Mutton)",
    "source": "Version 1!G11"
  },
  {
    "section": "Biryani",
    "name": "Chennai Style Briyani \u2013 Bhai Briyani",
    "source": "Version 1!G12"
  },
  {
    "section": "Biryani",
    "name": "Donnai Briyani",
    "source": "Version 1!G13"
  },
  {
    "section": "Biryani",
    "name": "Thalassery chicken biryani",
    "source": "Version 1!G14"
  },
  {
    "section": "Combos",
    "name": "Idly Vada Combo",
    "source": "Version 1!G16"
  },
  {
    "section": "Combos",
    "name": "Pongal Vada Combo",
    "source": "Version 1!G17"
  },
  {
    "section": "Combos",
    "name": "Poori Vada Combo",
    "source": "Version 1!G18"
  },
  {
    "section": "Combos",
    "name": "Parotta -Chicken Salana - Ommlette",
    "source": "Version 1!G19"
  },
  {
    "section": "Combos",
    "name": "Parotta- Chicken Salana - Chukka",
    "source": "Version 1!G20"
  },
  {
    "section": "Lunch Specials",
    "name": "Non Veg Quick Lunch",
    "source": "Version 1!G21"
  },
  {
    "section": "Lunch Specials",
    "name": "Veg Lunch Quick Lunch",
    "source": "Version 1!G22"
  },
  {
    "section": "Lunch Specials",
    "name": "Weekend Lunch Specails",
    "source": "Version 1!G23"
  },
  {
    "section": "Lunch Specials",
    "name": "Non Veg Thali",
    "source": "Version 1!G24"
  },
  {
    "section": "Lunch Specials",
    "name": "Veg Thali",
    "source": "Version 1!G25"
  },
  {
    "section": "Desserts",
    "name": "Apricot Delight",
    "source": "Version 1!G27"
  },
  {
    "section": "Desserts",
    "name": "Carrot Halwa",
    "source": "Version 1!G28"
  },
  {
    "section": "Desserts",
    "name": "Gulab Jamun",
    "source": "Version 1!G29"
  },
  {
    "section": "Desserts",
    "name": "Rasamalai",
    "source": "Version 1!G30"
  },
  {
    "section": "Desserts",
    "name": "Rava Laddu",
    "source": "Version 1!G31"
  },
  {
    "section": "Desserts",
    "name": "Sahi Thukda",
    "source": "Version 1!G32"
  },
  {
    "section": "Drinks",
    "name": "Badam Milk",
    "source": "Version 1!G34"
  },
  {
    "section": "Drinks",
    "name": "Butter Milk",
    "source": "Version 1!G35"
  },
  {
    "section": "Drinks",
    "name": "Chiku Shake",
    "source": "Version 1!G36"
  },
  {
    "section": "Drinks",
    "name": "Lime Soda",
    "source": "Version 1!G37"
  },
  {
    "section": "Drinks",
    "name": "Madras Coffee",
    "source": "Version 1!G38"
  },
  {
    "section": "Drinks",
    "name": "Mango Lassi",
    "source": "Version 1!G39"
  },
  {
    "section": "Drinks",
    "name": "Mango Shake",
    "source": "Version 1!G40"
  },
  {
    "section": "Drinks",
    "name": "Masala Tea",
    "source": "Version 1!G41"
  },
  {
    "section": "Drinks",
    "name": "Rose Milk",
    "source": "Version 1!G42"
  },
  {
    "section": "Drinks",
    "name": "Sodas",
    "source": "Version 1!G43"
  },
  {
    "section": "Drinks",
    "name": "Sweet Lassi",
    "source": "Version 1!G44"
  },
  {
    "section": "Parotta Specials",
    "name": "Ceylon parotta",
    "source": "Version 1!H2"
  },
  {
    "section": "Parotta Specials",
    "name": "Chicken Kothu Parotta",
    "source": "Version 1!H3"
  },
  {
    "section": "Parotta Specials",
    "name": "Chicken Veechu Parotta",
    "source": "Version 1!H4"
  },
  {
    "section": "Parotta Specials",
    "name": "Egg Kothu Parotta",
    "source": "Version 1!H5"
  },
  {
    "section": "Parotta Specials",
    "name": "Egg Veechu Parotta",
    "source": "Version 1!H6"
  },
  {
    "section": "Parotta Specials",
    "name": "Kizhi Parotta - Chicken",
    "source": "Version 1!H7"
  },
  {
    "section": "Parotta Specials",
    "name": "Kizhi Parotta - Mutton",
    "source": "Version 1!H8"
  },
  {
    "section": "Parotta Specials",
    "name": "Kizhi Parotta - Shrimp",
    "source": "Version 1!H9"
  },
  {
    "section": "Parotta Specials",
    "name": "Parotta 2 pcs",
    "source": "Version 1!H10"
  },
  {
    "section": "Parotta Specials",
    "name": "Veg Kothu Parrota",
    "source": "Version 1!H11"
  },
  {
    "section": "Parotta Specials",
    "name": "Nest Parotta Chicken/Mutton",
    "source": "Version 1!H13"
  },
  {
    "section": "Parotta Specials",
    "name": "Laywer Parotta",
    "source": "Version 1!H14"
  },
  {
    "section": "Parotta Specials",
    "name": "Coin Parotta",
    "source": "Version 1!H15"
  },
  {
    "section": "Parotta Specials",
    "name": "Bun Parotta",
    "source": "Version 1!H16"
  },
  {
    "section": "Parotta Specials",
    "name": "Poricha Parotta",
    "source": "Version 1!H17"
  },
  {
    "section": "Parotta Specials",
    "name": "Nool Parotta",
    "source": "Version 1!H18"
  },
  {
    "section": "Parotta Specials",
    "name": "Coconut Milk Parotta Chicken/Mutton",
    "source": "Version 1!H19"
  },
  {
    "section": "Parotta Specials",
    "name": "Dindugal Set Parotta",
    "source": "Version 1!H20"
  },
  {
    "section": "Soups",
    "name": "Mutton Pepper Soup",
    "source": "Spice Level!B4"
  },
  {
    "section": "Soups",
    "name": "Chicken Pepper Soup",
    "source": "Spice Level!B5"
  },
  {
    "section": "Soups",
    "name": "Cream of mushroom soup",
    "source": "Spice Level!B6"
  },
  {
    "section": "Soups",
    "name": "CreamyTomato soup",
    "source": "Spice Level!B7"
  },
  {
    "section": "Soups",
    "name": "Hot & sour soup Veg",
    "source": "Spice Level!B8"
  },
  {
    "section": "Soups",
    "name": "Hot & sour soup Chicken",
    "source": "Spice Level!B9"
  },
  {
    "section": "Soups",
    "name": "Lentil (Mulligatawny) Soup",
    "source": "Spice Level!B10"
  },
  {
    "section": "Soups",
    "name": "Manchow soup Chicken",
    "source": "Spice Level!B11"
  },
  {
    "section": "Soups",
    "name": "Manchow soup Veg",
    "source": "Spice Level!B12"
  },
  {
    "section": "Soups",
    "name": "Sweet Corn Veg",
    "source": "Spice Level!B13"
  },
  {
    "section": "Soups",
    "name": "Sweet Corn Chicken",
    "source": "Spice Level!B14"
  },
  {
    "section": "Soups",
    "name": "Veg clear soup",
    "source": "Spice Level!B15"
  },
  {
    "section": "Soups",
    "name": "Mutton nalli soup",
    "source": "Spice Level!B17"
  },
  {
    "section": "Soups",
    "name": "Crab Soup",
    "source": "Spice Level!B18"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Aloo Papdi Chaat",
    "source": "Spice Level!B20"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Avacado Papdi Chaat",
    "source": "Spice Level!B21"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Aloo Tikki Chaat",
    "source": "Spice Level!B22"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Bhel Puri",
    "source": "Spice Level!B23"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Cut Mirchi",
    "source": "Spice Level!B24"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Egg Bonda 3 pcs",
    "source": "Spice Level!B25"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Medu Vada 2pcs",
    "source": "Spice Level!B26"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Mirchi Bhaji 3 pcs",
    "source": "Spice Level!B27"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Mix Vegetable Pakoras",
    "source": "Spice Level!B28"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Onion Pakora Chennai Style",
    "source": "Spice Level!B29"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Paani Puri 6 pcs",
    "source": "Spice Level!B30"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Paneer Pakora",
    "source": "Spice Level!B31"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Plantain Bhaji 3 pcs",
    "source": "Spice Level!B32"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Punugulu",
    "source": "Spice Level!B33"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Railway Samosa 4 pcs",
    "source": "Spice Level!B34"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Samosa Veg",
    "source": "Spice Level!B35"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Samosa Chicken",
    "source": "Spice Level!B36"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Samosa Lamb",
    "source": "Spice Level!B37"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Samosa Chaat",
    "source": "Spice Level!B38"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Mysore Bonda 3 pcs",
    "source": "Spice Level!B39"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Potato Bonda 3 pcs",
    "source": "Spice Level!B40"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Masala Vada 3 pcs",
    "source": "Spice Level!B41"
  },
  {
    "section": "Snacks and Chaat",
    "name": "Puran Poli 1pcs",
    "source": "Spice Level!B43"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken 65",
    "source": "Spice Level!B45",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Apollo Fish",
    "source": "Spice Level!B46",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken 555",
    "source": "Spice Level!B47",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chicken podimas",
    "source": "Spice Level!B48",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Curry leaf chicken fry",
    "source": "Spice Level!B49",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chennai Chicken Pakoda",
    "source": "Spice Level!B50",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Fish Tawa Fry 4pcs",
    "source": "Spice Level!B51",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Mutton chukka",
    "source": "Spice Level!B52",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Mutton pepper dry",
    "source": "Spice Level!B53",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Nalla Karam Chicken",
    "source": "Spice Level!B54",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Nalla Karam Shrimp",
    "source": "Spice Level!B55",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Pallipalayam Chicken",
    "source": "Spice Level!B56",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Pepper chicken dry",
    "source": "Spice Level!B57",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Shrimp 65",
    "source": "Spice Level!B58",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Crab lolipop ( Weekend Spl)",
    "source": "Spice Level!B60",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Crab Pepperfry ( Weekend Spl)",
    "source": "Spice Level!B61",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Meen polichathu ( Weekend Spl)",
    "source": "Spice Level!B62",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Ulvacharu Kodi Wings 8 pcs",
    "source": "Spice Level!B63",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Non Veg",
    "name": "Chilli Wings",
    "source": "Spice Level!B64",
    "diet": "nonveg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Chili Paneer",
    "source": "Spice Level!B65",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Curry Leaf Gobi",
    "source": "Spice Level!B66",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Gobi 555",
    "source": "Spice Level!B67",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Gobi 65",
    "source": "Spice Level!B68",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Gobi Manchurian",
    "source": "Spice Level!B69",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Mushroom Pepper",
    "source": "Spice Level!B70",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Nalla Karam Gobi",
    "source": "Spice Level!B71",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Nalla Karam Paneer",
    "source": "Spice Level!B72",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Paneer 555",
    "source": "Spice Level!B73",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Panner 65",
    "source": "Spice Level!B74",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Panner Manchurian",
    "source": "Spice Level!B75",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Veggie Manchurian",
    "source": "Spice Level!B76",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Crunchy Spiced Corn",
    "source": "Spice Level!B77",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Babycorn Manchurian",
    "source": "Spice Level!B78",
    "diet": "veg"
  },
  {
    "section": "Appetizers - Veg",
    "name": "Chilli Babycorn",
    "source": "Spice Level!B79",
    "diet": "veg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Butter Chicken",
    "source": "Spice Level!G4",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Chettinad",
    "source": "Spice Level!G5",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Chili Masala",
    "source": "Spice Level!G6",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Tikka Masala",
    "source": "Spice Level!G7",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Vindaloo",
    "source": "Spice Level!G8",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Egg Curry",
    "source": "Spice Level!G9",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Goat Chill Masala",
    "source": "Spice Level!G10",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Gongura Goat Curry",
    "source": "Spice Level!G11",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Gongura Shrimp Curry",
    "source": "Spice Level!G12",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kadhai Chicken",
    "source": "Spice Level!G13",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kadhai Lamb",
    "source": "Spice Level!G14",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kadhai Goat",
    "source": "Spice Level!G15",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Aahaa Spl Chicken Curry",
    "source": "Spice Level!G16",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Aahaa Spl Goat Curry",
    "source": "Spice Level!G17",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Chettinad",
    "source": "Spice Level!G18",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Chili Masala",
    "source": "Spice Level!G19",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Rogan Josh",
    "source": "Spice Level!G20",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Lamb Saag",
    "source": "Spice Level!G21",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mango Fish Curry",
    "source": "Spice Level!G22",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Goat Kurma",
    "source": "Spice Level!G23",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Goat RoganJosh",
    "source": "Spice Level!G24",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Rotu Kadai Salana",
    "source": "Spice Level!G25",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Chicken Saag",
    "source": "Spice Level!G26",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Pepper chicken Masala",
    "source": "Spice Level!G27",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Shrimp Tikka Masala",
    "source": "Spice Level!G28",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Kheema Masala",
    "source": "Spice Level!G31",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Kerala Crab Curry",
    "source": "Spice Level!G32",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Non Veg",
    "name": "Mutton Paya",
    "source": "Spice Level!G33",
    "diet": "nonveg"
  },
  {
    "section": "Curries - Veg",
    "name": "Aloo Gobi",
    "source": "Spice Level!K4",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Rotu Kadai Salana",
    "source": "Spice Level!K5",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Baingan Bharta",
    "source": "Spice Level!K6",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Chana Masala",
    "source": "Spice Level!K7",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Dal Makhani",
    "source": "Spice Level!K8",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Jeera Aloo",
    "source": "Spice Level!K9",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Kadai Paneer",
    "source": "Spice Level!K10",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Malai Kofta",
    "source": "Spice Level!K11",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Mushroom Masala",
    "source": "Spice Level!K12",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Mutter Paneer",
    "source": "Spice Level!K13",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Navaratan Korma",
    "source": "Spice Level!K14",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Palak Paneer",
    "source": "Spice Level!K15",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Paneer Bhurji",
    "source": "Spice Level!K16",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Paneer Makhani",
    "source": "Spice Level!K17",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Paneer Tikka Masala",
    "source": "Spice Level!K18",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Sambar",
    "source": "Spice Level!K19",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Shahi Paneer",
    "source": "Spice Level!K20",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Veg Korma",
    "source": "Spice Level!K21",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Vegetable Chettinad",
    "source": "Spice Level!K22",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Veggie Jalfrezi",
    "source": "Spice Level!K23",
    "diet": "veg"
  },
  {
    "section": "Curries - Veg",
    "name": "Yellow Dal Tadka",
    "source": "Spice Level!K24",
    "diet": "veg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Chicken Fried Rice",
    "source": "Spice Level!P5",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Chicken Noodles",
    "source": "Spice Level!P6",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Shrimp Fried Rice",
    "source": "Spice Level!P7",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Shrimp Noodles",
    "source": "Spice Level!P8",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Mixed Fried Rice",
    "source": "Spice Level!P9",
    "diet": "nonveg"
  },
  {
    "section": "Indo-Chinese",
    "name": "Egg Fried Rice",
    "source": "Spice Level!T5"
  },
  {
    "section": "Indo-Chinese",
    "name": "Egg Noodles",
    "source": "Spice Level!T6"
  },
  {
    "section": "Indo-Chinese",
    "name": "Veg Fried Rice",
    "source": "Spice Level!T7"
  },
  {
    "section": "Indo-Chinese",
    "name": "Veg Noodles",
    "source": "Spice Level!T8"
  },
  {
    "section": "Indo-Chinese",
    "name": "Paneer Fried Rice",
    "source": "Spice Level!T9"
  },
  {
    "section": "Indo-Chinese",
    "name": "Panner Noodles",
    "source": "Spice Level!T10"
  },
  {
    "section": "Variety Rice",
    "name": "Jeera Rice",
    "source": "Spice Level!P12"
  },
  {
    "section": "Variety Rice",
    "name": "Peas Pulov",
    "source": "Spice Level!P13"
  },
  {
    "section": "Variety Rice",
    "name": "Lemon Rice",
    "source": "Spice Level!P15"
  },
  {
    "section": "Variety Rice",
    "name": "Coconut Rice",
    "source": "Spice Level!P16"
  },
  {
    "section": "Variety Rice",
    "name": "Gongura Rice",
    "source": "Spice Level!P17"
  },
  {
    "section": "Variety Rice",
    "name": "Tamarind Rice",
    "source": "Spice Level!P18"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Achari Tikka",
    "source": "Spice Level!P21"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Haryali Tikka",
    "source": "Spice Level!P22"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Sheekh Kabab",
    "source": "Spice Level!P23"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Tikka",
    "source": "Spice Level!P24"
  },
  {
    "section": "Tandoor",
    "name": "Chicken Tikka Lasuni",
    "source": "Spice Level!P25"
  },
  {
    "section": "Tandoor",
    "name": "Fish Tikka (Mahi Mahi)",
    "source": "Spice Level!P26"
  },
  {
    "section": "Tandoor",
    "name": "Lamb Seekh Kabab",
    "source": "Spice Level!P27"
  },
  {
    "section": "Tandoor",
    "name": "Malai Chicken Tikka",
    "source": "Spice Level!P28"
  },
  {
    "section": "Tandoor",
    "name": "Paneer Tikka",
    "source": "Spice Level!P29"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Chicken 4 pc",
    "source": "Spice Level!P30"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Chicken 8pc",
    "source": "Spice Level!P31"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Shrimp",
    "source": "Spice Level!P32"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori Vegetables",
    "source": "Spice Level!P33"
  },
  {
    "section": "Tandoor",
    "name": "Tandoori pomfret",
    "source": "Spice Level!P34"
  },
  {
    "section": "Biryani",
    "name": "Ambur Briyani",
    "source": "Spice Level!T21"
  },
  {
    "section": "Biryani",
    "name": "Fish Briyani",
    "source": "Spice Level!T22"
  },
  {
    "section": "Biryani",
    "name": "Gongura Chicken Briyani",
    "source": "Spice Level!T23"
  },
  {
    "section": "Biryani",
    "name": "Hyderabadi Style Briyani",
    "source": "Spice Level!T24"
  },
  {
    "section": "Biryani",
    "name": "Prawn Briyani",
    "source": "Spice Level!T25"
  },
  {
    "section": "Biryani",
    "name": "Vijayawada Chicken Briyani",
    "source": "Spice Level!T26"
  },
  {
    "section": "Biryani",
    "name": "Veg Briyani",
    "source": "Spice Level!T27"
  },
  {
    "section": "Biryani",
    "name": "Aahaa - Spl Chicken Pulov",
    "source": "Spice Level!T29"
  },
  {
    "section": "Biryani",
    "name": "Thalapkati Briyani ( Chicken & Mutton)",
    "source": "Spice Level!T30"
  },
  {
    "section": "Biryani",
    "name": "Chennai Style Briyani \u2013 Bhai Briyani",
    "source": "Spice Level!T31"
  },
  {
    "section": "Biryani",
    "name": "Donnai Briyani",
    "source": "Spice Level!T32"
  },
  {
    "section": "Biryani",
    "name": "Thalassery chicken biryani",
    "source": "Spice Level!T33"
  },
  {
    "section": "Parotta Specials",
    "name": "Ceylon parotta",
    "source": "Spice Level!Y5"
  },
  {
    "section": "Parotta Specials",
    "name": "Chicken Kothu Parotta",
    "source": "Spice Level!Y6"
  },
  {
    "section": "Parotta Specials",
    "name": "Chicken Veechu Parotta",
    "source": "Spice Level!Y7"
  },
  {
    "section": "Parotta Specials",
    "name": "Egg Kothu Parotta",
    "source": "Spice Level!Y8"
  },
  {
    "section": "Parotta Specials",
    "name": "Egg Veechu Parotta",
    "source": "Spice Level!Y9"
  },
  {
    "section": "Parotta Specials",
    "name": "Kizhi Parotta - Chicken",
    "source": "Spice Level!Y10"
  },
  {
    "section": "Parotta Specials",
    "name": "Kizhi Parotta - Mutton",
    "source": "Spice Level!Y11"
  },
  {
    "section": "Parotta Specials",
    "name": "Kizhi Parotta - Shrimp",
    "source": "Spice Level!Y12"
  },
  {
    "section": "Parotta Specials",
    "name": "Parotta 2 pcs",
    "source": "Spice Level!Y13"
  },
  {
    "section": "Parotta Specials",
    "name": "Veg Kothu Parrota",
    "source": "Spice Level!Y14"
  },
  {
    "section": "Parotta Specials",
    "name": "Nest Parotta Chicken/Mutton",
    "source": "Spice Level!Y16"
  },
  {
    "section": "Parotta Specials",
    "name": "Laywer Parotta",
    "source": "Spice Level!Y17"
  },
  {
    "section": "Parotta Specials",
    "name": "Coin Parotta",
    "source": "Spice Level!Y18"
  },
  {
    "section": "Parotta Specials",
    "name": "Bun Parotta",
    "source": "Spice Level!Y19"
  },
  {
    "section": "Parotta Specials",
    "name": "Poricha Parotta",
    "source": "Spice Level!Y20"
  },
  {
    "section": "Parotta Specials",
    "name": "Nool Parotta",
    "source": "Spice Level!Y21"
  },
  {
    "section": "Parotta Specials",
    "name": "Coconut Milk Parotta Chicken/Mutton",
    "source": "Spice Level!Y22"
  },
  {
    "section": "Parotta Specials",
    "name": "Dindugal Set Parotta",
    "source": "Spice Level!Y23"
  }
];
