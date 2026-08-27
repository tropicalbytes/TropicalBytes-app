/**
 * AUTO-GENERATED — do not edit by hand.
 * Produced by scripts/generate-gas-allowlist.ts from lib/config.ts.
 * Re-run "npm run generate:gas" after changing menu/pricing data, then
 * re-paste this file's contents into the Apps Script project.
 *
 * This is the backend's authoritative allowlist: Code.gs validates every
 * submitted duration id, combo (food+meal) combination, and selected
 * meal/add-on/party-item id against these maps rather than trusting
 * anything the browser sends.
 */

var GENERATED_ALLOWLIST = {
  MEAL_PREFERENCES: ["Lunch","Dinner","Lunch & Dinner"],
  FOOD_PREFERENCES: ["Veg","Non-Veg"],
  DURATIONS: {
  "weekly": {
    "weeks": 1,
    "discountPercent": 0
  },
  "bi-weekly": {
    "weeks": 2,
    "discountPercent": 5
  },
  "monthly": {
    "weeks": 4,
    "discountPercent": 5
  }
},
  COMBOS: {
  "nonveg-lunch": {
    "foodType": "Non-Veg",
    "mealTime": "Lunch",
    "pricePerWeek": 999,
    "label": "Non-Veg Lunch"
  },
  "veg-lunch": {
    "foodType": "Veg",
    "mealTime": "Lunch",
    "pricePerWeek": 899,
    "label": "Veg Lunch"
  },
  "nonveg-dinner": {
    "foodType": "Non-Veg",
    "mealTime": "Dinner",
    "pricePerWeek": 999,
    "label": "Non-Veg Dinner"
  },
  "veg-dinner": {
    "foodType": "Veg",
    "mealTime": "Dinner",
    "pricePerWeek": 899,
    "label": "Veg Dinner"
  },
  "nonveg-lunch-dinner": {
    "foodType": "Non-Veg",
    "mealTime": "Lunch & Dinner",
    "pricePerWeek": 1750,
    "label": "Non-Veg Lunch + Dinner"
  },
  "veg-lunch-dinner": {
    "foodType": "Veg",
    "mealTime": "Lunch & Dinner",
    "pricePerWeek": 1500,
    "label": "Veg Lunch + Dinner"
  }
},
  MEAL_IDS: {
  "paneer-tikka-with-ghee-rice": "PANEER TIKKA WITH GHEE RICE",
  "jeera-rice-or-roti-with-paneer-butter-masala": "JEERA RICE OR ROTI WITH PANEER BUTTER MASALA",
  "veg-fried-rice": "VEG FRIED RICE",
  "thai-green-curry-veg-with-rice": "THAI GREEN CURRY VEG WITH RICE",
  "chana-masala-with-neer-dosa": "CHANA MASALA WITH NEER DOSA",
  "veg-biryani": "VEG BIRYANI",
  "caesar-salad-veg": "CAESAR SALAD VEG",
  "veg-pulao": "VEG PULAO",
  "veg-hakka-noodles": "VEG HAKKA NOODLES",
  "stroganoff-paneer-with-rice": "STROGANOFF PANEER WITH RICE",
  "veg-kurma-with-roti": "VEG KURMA WITH ROTI",
  "asian-veg-salad": "ASIAN VEG SALAD",
  "grilled-paneer-salad": "GRILLED PANEER SALAD",
  "asian-salad-veg": "ASIAN SALAD VEG",
  "tropical-salad-veg": "TROPICAL SALAD VEG",
  "bbq-salad-veg": "BBQ SALAD VEG",
  "chickpea-salad": "CHICKPEA SALAD",
  "ghee-rice-with-chicken-kabab": "GHEE RICE WITH CHICKEN KABAB",
  "jeera-rice-or-roti-with-butter-chicken": "JEERA RICE OR ROTI WITH BUTTER CHICKEN",
  "chicken-fried-rice": "CHICKEN FRIED RICE",
  "thai-green-curry-chicken-with-rice": "THAI GREEN CURRY CHICKEN WITH RICE",
  "chicken-ghee-roast-with-neer-dosa": "CHICKEN GHEE ROAST WITH NEER DOSA",
  "chicken-biryani": "CHICKEN BIRYANI",
  "caesar-salad-chicken": "CAESAR SALAD CHICKEN",
  "chicken-65-with-rice": "CHICKEN 65 WITH RICE",
  "chicken-hakka-noodles": "CHICKEN HAKKA NOODLES",
  "stroganoff-chicken-with-rice": "STROGANOFF CHICKEN WITH RICE",
  "chicken-kurma-with-roti": "CHICKEN KURMA WITH ROTI",
  "asian-chicken-salad": "ASIAN CHICKEN SALAD",
  "grilled-chicken-salad": "GRILLED CHICKEN SALAD",
  "caesar-chicken-salad": "CAESAR CHICKEN SALAD",
  "tropical-chicken-salad": "TROPICAL CHICKEN SALAD",
  "bbq-chicken-salad": "BBQ CHICKEN SALAD",
  "tandoori-chicken-salad": "TANDOORI CHICKEN SALAD"
},
  ADDON_IDS: {
  "breakfast-english-breakfast": "ENGLISH BREAKFAST (Non-Veg)",
  "breakfast-veg-breakfast": "VEG BREAKFAST (Veg)",
  "chinese-chicken-fried-rice": "CHICKEN FRIED RICE (Non-Veg)",
  "chinese-chicken-hakka-noodles": "CHICKEN HAKKA NOODLES (Non-Veg)",
  "chinese-chicken-chilly-rice-combo": "CHICKEN CHILLY RICE COMBO (Non-Veg)",
  "chinese-chicken-chilly-noodles-combo": "CHICKEN CHILLY NOODLES COMBO (Non-Veg)",
  "chinese-veg-fried-rice": "VEG FRIED RICE (Veg)",
  "chinese-veg-hakka-noodles": "VEG HAKKA NOODLES (Veg)",
  "chinese-chilly-paneer-mushroom-rice-combo": "CHILLY PANEER / MUSHROOM RICE COMBO (Veg)",
  "chinese-chilly-paneer-mushroom-noodles-combo": "CHILLY PANEER / MUSHROOM NOODLES COMBO (Veg)",
  "burgers-crunchy-chicken-burger": "CRUNCHY CHICKEN BURGER (Non-Veg)",
  "burgers-bbq-chicken-burger": "BBQ CHICKEN BURGER (Non-Veg)",
  "burgers-egg-chicken-bacon-burger": "EGG & CHICKEN BACON BURGER (Non-Veg)",
  "burgers-crispy-paneer-burger": "CRISPY PANEER BURGER (Veg)",
  "burgers-bbq-veg-burger": "BBQ VEG BURGER (Veg)",
  "burgers-classic-veg-burger": "CLASSIC VEG BURGER (Veg)",
  "pastas-alfredo-pasta-chicken": "ALFREDO PASTA CHICKEN (Non-Veg)",
  "pastas-creamy-cilantro-pasta-chicken": "CREAMY CILANTRO PASTA CHICKEN (Non-Veg)",
  "pastas-creamy-basil-pasta-chicken": "CREAMY BASIL PASTA CHICKEN (Non-Veg)",
  "pastas-alfredo-pasta-veg": "ALFREDO PASTA VEG (Veg)",
  "pastas-creamy-cilantro-pasta-veg": "CREAMY CILANTRO PASTA VEG (Veg)",
  "pastas-creamy-basil-pasta-veg": "CREAMY BASIL PASTA VEG (Veg)",
  "desserts-brownie-with-nuts": "BROWNIE WITH NUTS",
  "desserts-tiramisu": "TIRAMISU",
  "desserts-san-sebastian-cheese-cake": "SAN SEBASTIAN CHEESE CAKE",
  "desserts-gulab-jamun-2pcs": "GULAB JAMUN (2PCS)",
  "ice-creams-udupi-special-gudbad": "UDUPI SPECIAL GUDBAD",
  "ice-creams-tropical-gudbad": "TROPICAL GUDBAD",
  "ice-creams-arabian-gudbad": "ARABIAN GUDBAD",
  "ice-creams-deathby-chocolate": "DEATHBY CHOCOLATE",
  "aerated-drinks-diet-coke": "DIET COKE",
  "aerated-drinks-coke": "COKE",
  "aerated-drinks-sprite": "SPRITE",
  "aerated-drinks-fanta": "FANTA",
  "aerated-drinks-bisleri-1l": "BISLERI - 1L"
},
  PARTY_ITEM_IDS: {
  "nonveg-chicken-chilly-0": "CHICKEN CHILLY",
  "nonveg-chicken-sukka-1": "CHICKEN SUKKA",
  "nonveg-pepper-chicken-2": "PEPPER CHICKEN",
  "nonveg-chicken-ghee-roast-3": "CHICKEN GHEE ROAST",
  "nonveg-hyderabadi-chicken-4": "HYDERABADI CHICKEN",
  "nonveg-chicken-pudina-5": "CHICKEN PUDINA",
  "nonveg-chicken-tikka-masala-6": "CHICKEN TIKKA MASALA",
  "nonveg-chicken-green-masala-7": "CHICKEN GREEN MASALA",
  "nonveg-kundapura-chicken-curry-8": "KUNDAPURA CHICKEN CURRY",
  "nonveg-chicken-kebab-with-ghee-rice-9": "CHICKEN KEBAB WITH GHEE RICE",
  "nonveg-chicken-65-with-rice-10": "CHICKEN 65 WITH RICE",
  "nonveg-chicken-biryani-11": "CHICKEN BIRYANI",
  "nonveg-chicken-fried-rice-12": "CHICKEN FRIED RICE",
  "nonveg-chicken-biryani-13": "CHICKEN BIRYANI",
  "nonveg-mutton-green-masala-14": "MUTTON GREEN MASALA",
  "nonveg-mutton-sukka-15": "MUTTON SUKKA",
  "nonveg-mutton-rogan-gosh-16": "MUTTON ROGAN GOSH",
  "nonveg-mutton-pepper-fry-17": "MUTTON PEPPER FRY",
  "nonveg-mutton-biryani-18": "MUTTON BIRYANI",
  "nonveg-fish-curry-rice-19": "FISH CURRY RICE",
  "nonveg-prawns-curry-20": "PRAWNS CURRY",
  "nonveg-prawns-biryani-21": "PRAWNS BIRYANI",
  "veg-paneer-chilly-0": "PANEER CHILLY",
  "veg-gobi-chilli-1": "GOBI CHILLI",
  "veg-paneer-ghee-roast-2": "PANEER GHEE ROAST",
  "veg-paneer-tikka-masala-3": "PANEER TIKKA MASALA",
  "veg-paneer-curry-patta-4": "PANEER CURRY PATTA",
  "veg-hot-garlic-mushroom-5": "HOT GARLIC MUSHROOM",
  "veg-babycorn-manchurian-6": "BABYCORN MANCHURIAN",
  "veg-schezwan-mushroom-7": "SCHEZWAN MUSHROOM",
  "veg-honey-chilly-paneer-8": "HONEY CHILLY PANEER",
  "veg-paneer-butter-masala-9": "PANEER BUTTER MASALA",
  "veg-chana-masala-10": "CHANA MASALA",
  "veg-palak-paneer-11": "PALAK PANEER",
  "veg-veg-hyderabadi-12": "VEG HYDERABADI",
  "veg-mixed-vegetable-curry-13": "MIXED VEGETABLE CURRY",
  "veg-navarathna-kurma-14": "NAVARATHNA KURMA",
  "veg-veg-kurma-15": "VEG KURMA",
  "veg-aloo-gobi-masala-16": "ALOO GOBI MASALA",
  "veg-ghee-rice-17": "GHEE RICE",
  "veg-veg-fried-rice-18": "VEG FRIED RICE",
  "veg-veg-pulav-19": "VEG PULAV",
  "veg-veg-biriyani-20": "VEG BIRIYANI"
}
};
