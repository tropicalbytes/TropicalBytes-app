// ============================================================================
// CENTRAL BUSINESS CONFIGURATION
// Update this file to change brand details, contact info, menu, and pricing
// across the entire site without touching page code.
//
// MENU DATA SOURCE OF TRUTH: the client-provided CATERING.pdf. Names,
// categories, veg/non-veg splits, weekly structure, and prices below are
// transcribed exactly as given — including any inconsistencies in the
// source (e.g. Thursday's non-veg lunch dish differs between the
// lunch-only table and the combined lunch+dinner table in the PDF; both
// are preserved as given rather than reconciled).
// ============================================================================

export const business = {
  name: "TropicalBytes",
  tagline: "Good food, made simple.",
  description:
    "TropicalBytes delivers home-style lunch and dinner on a schedule that fits your routine: flexible plans, honest ingredients, no surprises.",
  phone: "+91 8792029951",
  phoneDisplay: "+91 8792029951",
  whatsapp: "918792029951", // digits only, with country code, for wa.me links
  email: "tropicalbytes.in@gmail.com",
  address: "Court Road, Udupi, Karnataka 576101",
  serviceAreas: ["Udupi", "Manipal", "Malpe", "Kaup"],
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0!2d74.7421!3d13.3409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sUdupi",
  social: {
    instagram: "https://instagram.com/mealshome.in",
    facebook: "https://facebook.com/mealshome.in",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Meal Plans", href: "/plans" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

// Decorative placeholder imagery for the homepage hero and About page banner.
// homeHero remains a generic picsum placeholder; aboutBanner is a real,
// freely-licensed Unsplash photo (spices/ingredients) matching the page's
// "Fresh ingredients. Cooked with care." caption. Swap either for local
// /public files once real brand photography is available.
export const placeholderImages = {
  homeHero: "https://picsum.photos/seed/mealshome-hero/900/1100",
  aboutBanner: "https://images.pexels.com/photos/5677717/pexels-photo-5677717.jpeg?auto=compress&cs=tinysrgb&w=1600&h=700&fit=crop",
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ----------------------------------------------------------------------------
// WEEKLY MEAL PLANS (Monday–Saturday, Sunday excluded)
// ----------------------------------------------------------------------------

export type FoodType = "Veg" | "Non-Veg";
export type MealTime = "Lunch" | "Dinner" | "Lunch & Dinner";
export const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

interface SingleMealDay {
  day: (typeof DAYS_OF_WEEK)[number];
  item: string;
}

interface CombinedMealDay {
  day: (typeof DAYS_OF_WEEK)[number];
  lunch: string;
  dinner: string;
}

export const weeklyMealPlans = {
  nonVeg: {
    lunch: {
      pricePerWeek: 999,
      days: [
        { day: "Monday", item: "GHEE RICE WITH CHICKEN KABAB" },
        { day: "Tuesday", item: "JEERA RICE OR ROTI WITH BUTTER CHICKEN" },
        { day: "Wednesday", item: "CHICKEN FRIED RICE" },
        { day: "Thursday", item: "THAI GREEN CURRY CHICKEN WITH RICE" },
        { day: "Friday", item: "CHICKEN GHEE ROAST WITH NEER DOSA" },
        { day: "Saturday", item: "CHICKEN BIRYANI" },
      ] as SingleMealDay[],
    },
    dinner: {
      pricePerWeek: 999,
      days: [
        { day: "Monday", item: "CAESAR SALAD CHICKEN" },
        { day: "Tuesday", item: "CHICKEN 65 WITH RICE" },
        { day: "Wednesday", item: "CHICKEN HAKKA NOODLES" },
        { day: "Thursday", item: "STROGANOFF CHICKEN WITH RICE" },
        { day: "Friday", item: "CHICKEN KURMA WITH ROTI" },
        { day: "Saturday", item: "ASIAN CHICKEN SALAD" },
      ] as SingleMealDay[],
    },
    lunchDinner: {
      pricePerWeek: 1750,
      days: [
        { day: "Monday", lunch: "GHEE RICE WITH CHICKEN KABAB", dinner: "CAESAR SALAD CHICKEN" },
        { day: "Tuesday", lunch: "JEERA RICE OR ROTI WITH BUTTER CHICKEN", dinner: "CHICKEN 65 WITH RICE" },
        { day: "Wednesday", lunch: "CHICKEN FRIED RICE", dinner: "CHICKEN HAKKA NOODLES" },
        { day: "Thursday", lunch: "NASI LEMAK CHICKEN WITH BUTTER GARLIC RICE", dinner: "STROGANOFF CHICKEN WITH RICE" },
        { day: "Friday", lunch: "CHICKEN GHEE ROAST WITH NEER DOSA", dinner: "CHICKEN KURMA WITH ROTI" },
        { day: "Saturday", lunch: "CHICKEN BIRYANI", dinner: "ASIAN CHICKEN SALAD" },
      ] as CombinedMealDay[],
    },
  },
  veg: {
    lunch: {
      pricePerWeek: 899,
      days: [
        { day: "Monday", item: "PANEER TIKKA WITH GHEE RICE" },
        { day: "Tuesday", item: "JEERA RICE OR ROTI WITH PANEER BUTTER MASALA" },
        { day: "Wednesday", item: "VEG FRIED RICE" },
        { day: "Thursday", item: "THAI GREEN CURRY VEG WITH RICE" },
        { day: "Friday", item: "CHANA MASALA WITH NEER DOSA" },
        { day: "Saturday", item: "VEG BIRYANI" },
      ] as SingleMealDay[],
    },
    dinner: {
      pricePerWeek: 899,
      days: [
        { day: "Monday", item: "CAESAR SALAD VEG" },
        { day: "Tuesday", item: "VEG PULAO" },
        { day: "Wednesday", item: "VEG HAKKA NOODLES" },
        { day: "Thursday", item: "STROGANOFF PANEER WITH RICE" },
        { day: "Friday", item: "VEG KURMA WITH ROTI" },
        { day: "Saturday", item: "ASIAN VEG SALAD" },
      ] as SingleMealDay[],
    },
    lunchDinner: {
      pricePerWeek: 1500,
      days: [
        { day: "Monday", lunch: "PANEER TIKKA WITH GHEE RICE", dinner: "CAESAR SALAD VEG" },
        { day: "Tuesday", lunch: "JEERA RICE OR ROTI WITH PANEER BUTTER MASALA", dinner: "VEG PULAO" },
        { day: "Wednesday", lunch: "VEG FRIED RICE", dinner: "VEG HAKKA NOODLES" },
        { day: "Thursday", lunch: "THAI GREEN CURRY VEG WITH RICE", dinner: "STROGANOFF PANEER WITH RICE" },
        { day: "Friday", lunch: "CHANA MASALA WITH NEER DOSA", dinner: "VEG KURMA WITH ROTI" },
        { day: "Saturday", lunch: "VEG BIRYANI", dinner: "ASIAN VEG SALAD" },
      ] as CombinedMealDay[],
    },
  },
};

// The six purchasable meal-plan combinations, matching the PDF exactly.
export interface ComboPricing {
  id: string;
  label: string;
  foodType: FoodType;
  mealTime: MealTime;
  pricePerWeek: number;
}

export const comboPricing: ComboPricing[] = [
  { id: "nonveg-lunch", label: "Non-Veg Lunch", foodType: "Non-Veg", mealTime: "Lunch", pricePerWeek: 999 },
  { id: "veg-lunch", label: "Veg Lunch", foodType: "Veg", mealTime: "Lunch", pricePerWeek: 899 },
  { id: "nonveg-dinner", label: "Non-Veg Dinner", foodType: "Non-Veg", mealTime: "Dinner", pricePerWeek: 999 },
  { id: "veg-dinner", label: "Veg Dinner", foodType: "Veg", mealTime: "Dinner", pricePerWeek: 899 },
  { id: "nonveg-lunch-dinner", label: "Non-Veg Lunch + Dinner", foodType: "Non-Veg", mealTime: "Lunch & Dinner", pricePerWeek: 1750 },
  { id: "veg-lunch-dinner", label: "Veg Lunch + Dinner", foodType: "Veg", mealTime: "Lunch & Dinner", pricePerWeek: 1500 },
];

export function findCombo(foodType: FoodType, mealTime: MealTime): ComboPricing | undefined {
  return comboPricing.find((c) => c.foodType === foodType && c.mealTime === mealTime);
}

// Subscription durations. Bi-Weekly and Monthly both carry the client's
// confirmed 5% discount, applied to the combo's weekly price × the number
// of weeks.
export interface Duration {
  id: string;
  name: string;
  weeks: number;
  discountPercent: number;
  badge?: string;
  description: string;
}

export const durations: Duration[] = [
  {
    id: "weekly",
    name: "Weekly",
    weeks: 1,
    discountPercent: 0,
    description: "Monday–Saturday meal plan for one week.",
  },
  {
    id: "bi-weekly",
    name: "Bi-Weekly",
    weeks: 2,
    discountPercent: 5,
    badge: "5% OFF",
    description: "The same weekly menu structure repeated for two weeks.",
  },
  {
    id: "monthly",
    name: "Monthly",
    weeks: 4,
    discountPercent: 5,
    badge: "5% OFF",
    description: "Monday–Saturday meal plan across the month, with Sunday excluded.",
  },
];

export function estimatePrice(foodType: FoodType, mealTime: MealTime, durationId: string) {
  const combo = findCombo(foodType, mealTime);
  const duration = durations.find((d) => d.id === durationId);
  if (!combo || !duration) return null;
  const gross = combo.pricePerWeek * duration.weeks;
  const discount = Math.round((gross * duration.discountPercent) / 100);
  return { gross, discount, total: gross - discount, combo, duration };
}

// ----------------------------------------------------------------------------
// SALADS — ₹1,250 (Lunch or Dinner)
// ----------------------------------------------------------------------------

export const salads = {
  priceLabel: "₹1,250 (Lunch or Dinner)",
  days: [
    {
      day: "Monday",
      nonVeg: {
        name: "GRILLED CHICKEN SALAD",
        description: "grilled chicken Strips, grilled corn, lettuce, tomatoes, red capsicum, cucumber, red onions, parmesan cheese",
      },
      veg: {
        name: "GRILLED PANEER SALAD",
        description: "grilled paneer Strips, grilled corn, lettuce, tomatoes, red capsicum, cucumber, red onions, parmesan cheese",
      },
    },
    {
      day: "Tuesday",
      nonVeg: {
        name: "CAESAR CHICKEN SALAD",
        description: "chicken strips, lettuce, tomato, corn, shredded cheddar cheese, croutons",
      },
      veg: {
        name: "CAESAR SALAD VEG",
        description: "paneer, lettuce, tomato, corn, shredded cheddar cheese, croutons",
      },
    },
    {
      day: "Wednesday",
      nonVeg: {
        name: "ASIAN CHICKEN SALAD",
        description: "shredded Chicken, chopped almonds, lettuce, carrots, crunchy noodles, cilantro, spring onion",
      },
      veg: {
        name: "ASIAN SALAD VEG",
        description: "Paneer, chopped almonds, lettuce, carrots, crunchy noodles, cilantro, spring onion",
      },
    },
    {
      day: "Thursday",
      nonVeg: {
        name: "TROPICAL CHICKEN SALAD",
        description: "shredded chicken, lettuce, capcicum, pineapple, spring onions, cashews, cucumber with special dressing",
      },
      veg: {
        name: "TROPICAL SALAD VEG",
        description: "paneer, lettuce, capcicum, pineapple, spring onions, cashews, cucumber with special dressing",
      },
    },
    {
      day: "Friday",
      nonVeg: {
        name: "BBQ CHICKEN SALAD",
        description: "chicken strips, lettuce, tomato, corn, shredded cheddar cheese, tortilla chips (1/2 cup ranch dressing, 2 table spoon BBQ sauce)",
      },
      veg: {
        name: "BBQ SALAD VEG",
        description: "paneer, lettuce, tomato, corn, shredded cheddar cheese, tortilla chips (1/2 cup ranch dressing, 2 table spoon BBQ sauce)",
      },
    },
    {
      day: "Saturday",
      nonVeg: {
        name: "TANDOORI CHICKEN SALAD",
        description: "Tandoori chicken chunks, lettuce, cucumber, tomato, onions with tandoori mayo dressing",
      },
      veg: {
        name: "CHICKPEA SALAD",
        description: "chickpeas, cucumber, tomato, onion, carrot, corn & lemon dressing",
      },
    },
  ],
};

// ----------------------------------------------------------------------------
// ADD-ONS
// ----------------------------------------------------------------------------

export interface AddOnItem {
  name: string;
  price?: number | string;
  type?: FoodType;
}

export interface AddOnCategory {
  category: string;
  items: AddOnItem[];
}

export const addOnCategories: AddOnCategory[] = [
  {
    category: "Breakfast",
    items: [
      { name: "ENGLISH BREAKFAST", price: 375, type: "Non-Veg" },
      { name: "VEG BREAKFAST", price: 350, type: "Veg" },
    ],
  },
  {
    category: "Chinese",
    items: [
      { name: "CHICKEN FRIED RICE", price: 250, type: "Non-Veg" },
      { name: "CHICKEN HAKKA NOODLES", price: 250, type: "Non-Veg" },
      { name: "CHICKEN CHILLY RICE COMBO", price: 300, type: "Non-Veg" },
      { name: "CHICKEN CHILLY NOODLES COMBO", price: 300, type: "Non-Veg" },
      { name: "VEG FRIED RICE", price: 200, type: "Veg" },
      { name: "VEG HAKKA NOODLES", price: 200, type: "Veg" },
      { name: "CHILLY PANEER / MUSHROOM RICE COMBO", price: "300 / 280", type: "Veg" },
      { name: "CHILLY PANEER / MUSHROOM NOODLES COMBO", price: "300 / 280", type: "Veg" },
    ],
  },
  {
    category: "Burgers",
    items: [
      { name: "CRUNCHY CHICKEN BURGER", price: 250, type: "Non-Veg" },
      { name: "BBQ CHICKEN BURGER", price: 250, type: "Non-Veg" },
      { name: "EGG & CHICKEN BACON BURGER", price: 300, type: "Non-Veg" },
      { name: "CRISPY PANEER BURGER", price: 250, type: "Veg" },
      { name: "BBQ VEG BURGER", price: 225, type: "Veg" },
      { name: "CLASSIC VEG BURGER", price: 200, type: "Veg" },
    ],
  },
  {
    category: "Pastas",
    items: [
      // Prices were not specified for pastas in the source menu — left blank
      // rather than invented. Confirm with the client before publishing.
      { name: "ALFREDO PASTA CHICKEN", price: 250, type: "Non-Veg" },
      { name: "CREAMY CILANTRO PASTA CHICKEN", price: 250, type: "Non-Veg" },
      { name: "CREAMY BASIL PASTA CHICKEN", price: 250, type: "Non-Veg" },
      { name: "ALFREDO PASTA VEG", price: 230, type: "Veg" },
      { name: "CREAMY CILANTRO PASTA VEG", price: 230, type: "Veg" },
      { name: "CREAMY BASIL PASTA VEG", price: 230, type: "Veg" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "BROWNIE WITH NUTS", price: 250 },
      { name: "TIRAMISU", price: 300 },
      { name: "SAN SEBASTIAN CHEESE CAKE", price: 350 },
      { name: "GULAB JAMUN (2PCS)", price: 100 },
    ],
  },
  {
    category: "Ice Creams",
    items: [
      { name: "UDUPI SPECIAL GUDBAD", price: 250 },
      { name: "TROPICAL GUDBAD", price: 275 },
      { name: "ARABIAN GUDBAD", price: 300 },
      { name: "DEATHBY CHOCOLATE", price: 300 },
    ],
  },
  {
    category: "Aerated Drinks",
    items: [
      { name: "DIET COKE", price: 60 },
      { name: "COKE", price: 50 },
      { name: "SPRITE", price: 50 },
      { name: "FANTA", price: 50 },
      { name: "BISLERI - 1L", price: 25 },
    ],
  },
];

// ----------------------------------------------------------------------------
// PARTY / BULK ORDERS (minimum order 1 kg) — priced per kg, not part of the
// regular subscription flow.
// ----------------------------------------------------------------------------

export interface PartyItem {
  name: string;
  pricePerKg: number | "Seasonal";
}

export const partyBulkOrders = {
  minimumOrderLabel: "Minimum order 1 kg",
  nonVeg: [
    { name: "CHICKEN CHILLY", pricePerKg: 1000 },
    { name: "CHICKEN SUKKA", pricePerKg: 1000 },
    { name: "PEPPER CHICKEN", pricePerKg: 1000 },
    { name: "CHICKEN GHEE ROAST", pricePerKg: 1250 },
    { name: "HYDERABADI CHICKEN", pricePerKg: 1100 },
    { name: "CHICKEN PUDINA", pricePerKg: 1000 },
    { name: "CHICKEN TIKKA MASALA", pricePerKg: 1000 },
    { name: "CHICKEN GREEN MASALA", pricePerKg: 1000 },
    { name: "KUNDAPURA CHICKEN CURRY", pricePerKg: 1000 },
    { name: "CHICKEN KEBAB WITH GHEE RICE", pricePerKg: 1500 },
    { name: "CHICKEN 65 WITH RICE", pricePerKg: 1500 },
    { name: "CHICKEN BIRYANI", pricePerKg: 1250 },
    { name: "CHICKEN FRIED RICE", pricePerKg: 1000 },
    { name: "CHICKEN BIRYANI", pricePerKg: 1250 },
    { name: "MUTTON GREEN MASALA", pricePerKg: 1800 },
    { name: "MUTTON SUKKA", pricePerKg: 1800 },
    { name: "MUTTON ROGAN GOSH", pricePerKg: 1800 },
    { name: "MUTTON PEPPER FRY", pricePerKg: 1800 },
    { name: "MUTTON BIRYANI", pricePerKg: 2000 },
    { name: "FISH CURRY RICE", pricePerKg: "Seasonal" },
    { name: "PRAWNS CURRY", pricePerKg: "Seasonal" },
    { name: "PRAWNS BIRYANI", pricePerKg: "Seasonal" },
  ] as PartyItem[],
  veg: [
    { name: "PANEER CHILLY", pricePerKg: 1000 },
    { name: "GOBI CHILLI", pricePerKg: 750 },
    { name: "PANEER GHEE ROAST", pricePerKg: 1250 },
    { name: "PANEER TIKKA MASALA", pricePerKg: 900 },
    { name: "PANEER CURRY PATTA", pricePerKg: 1000 },
    { name: "HOT GARLIC MUSHROOM", pricePerKg: 800 },
    { name: "BABYCORN MANCHURIAN", pricePerKg: 800 },
    { name: "SCHEZWAN MUSHROOM", pricePerKg: 800 },
    { name: "HONEY CHILLY PANEER", pricePerKg: 1000 },
    { name: "PANEER BUTTER MASALA", pricePerKg: 1250 },
    { name: "CHANA MASALA", pricePerKg: 750 },
    { name: "PALAK PANEER", pricePerKg: 1250 },
    { name: "VEG HYDERABADI", pricePerKg: 800 },
    { name: "MIXED VEGETABLE CURRY", pricePerKg: 900 },
    { name: "NAVARATHNA KURMA", pricePerKg: 1000 },
    { name: "VEG KURMA", pricePerKg: 800 },
    { name: "ALOO GOBI MASALA", pricePerKg: 800 },
    { name: "GHEE RICE", pricePerKg: 500 },
    { name: "VEG FRIED RICE", pricePerKg: 750 },
    { name: "VEG PULAV", pricePerKg: 750 },
    { name: "VEG BIRIYANI", pricePerKg: 1000 },
  ] as PartyItem[],
};

// ----------------------------------------------------------------------------
// DERIVED CATALOG HELPERS — used by the searchable multi-select components
// ----------------------------------------------------------------------------

export interface MenuOption {
  id: string;
  label: string;
  meta?: string;
}

export interface MenuOptionGroup {
  group: string;
  options: MenuOption[];
}

/** Unique dish names for a given food type + meal time, in weekly-menu order. */
export function weeklyDishOptions(foodType: FoodType, mealTime: "Lunch" | "Dinner"): MenuOption[] {
  const source = foodType === "Veg" ? weeklyMealPlans.veg : weeklyMealPlans.nonVeg;
  const week = mealTime === "Lunch" ? source.lunch : source.dinner;
  const seen = new Set<string>();
  const options: MenuOption[] = [];
  week.days.forEach((d) => {
    if (!seen.has(d.item)) {
      seen.add(d.item);
      options.push({ id: slugify(d.item), label: d.item });
    }
  });
  return options;
}

/** Salad options for a given food type, one per day. */
export function saladOptions(foodType: FoodType): MenuOption[] {
  return salads.days.map((d) => {
    const s = foodType === "Veg" ? d.veg : d.nonVeg;
    return { id: slugify(s.name), label: s.name };
  });
}

/** Grouped, searchable options for the "Select Your Meals" combobox, filtered by preferences. */
export function buildMealOptionGroups(foodType: FoodType, mealTime: MealTime): MenuOptionGroup[] {
  const groups: MenuOptionGroup[] = [];
  if (mealTime === "Lunch" || mealTime === "Lunch & Dinner") {
    groups.push({ group: "Lunch", options: weeklyDishOptions(foodType, "Lunch") });
  }
  if (mealTime === "Dinner" || mealTime === "Lunch & Dinner") {
    groups.push({ group: "Dinner", options: weeklyDishOptions(foodType, "Dinner") });
  }
  groups.push({ group: "Salads", options: saladOptions(foodType) });
  return groups;
}

/** Grouped, searchable options for the Add-ons combobox — every category. */
export function buildAddOnOptionGroups(): MenuOptionGroup[] {
  return addOnCategories.map((cat) => ({
    group: cat.category,
    options: cat.items.map((item) => ({
      id: slugify(`${cat.category}-${item.name}`),
      label: item.type ? `${item.name} (${item.type})` : item.name,
      meta: item.price !== undefined ? `₹${item.price}` : undefined,
    })),
  }));
}

// ----------------------------------------------------------------------------
// SITE CONTENT
// ----------------------------------------------------------------------------

export const faqs = [
  {
    question: "What meal plans are available?",
    answer:
      "We offer Weekly, Bi-Weekly (5% off), and Monthly (5% off) subscriptions, each available as Veg or Non-Veg, for Lunch, Dinner, or both.",
  },
  {
    question: "Do you offer lunch and dinner?",
    answer:
      "Yes. You can choose lunch only, dinner only, or both when you set up your plan or place an individual meal request.",
  },
  {
    question: "Are vegetarian and non-vegetarian meals available?",
    answer: "Yes, every plan lets you choose vegetarian or non-vegetarian meals, and you can switch anytime by letting our team know.",
  },
  {
    question: "Can I request an individual meal?",
    answer:
      "Yes, if you're not ready for a subscription, you can send a one-off meal request from our Menu page and we'll confirm availability with you directly.",
  },
  {
    question: "How does the subscription process work?",
    answer:
      "Choose a plan, tell us your preferences and delivery details, and submit your request. Our team reviews it and contacts you to confirm before your first delivery.",
  },
  {
    question: "Is online payment required?",
    answer:
      "No. Submitting a request does not charge you anything. Payment details are arranged directly with our team once your subscription is confirmed.",
  },
  {
    question: "How will my subscription be confirmed?",
    answer: "We'll call or WhatsApp you within one business day of your request to confirm meal details, delivery slots, and pricing.",
  },
  {
    question: "Do you take party or bulk orders?",
    answer:
      "Yes, see our Party & Bulk Orders menu, priced per kg with a 1 kg minimum. These are handled separately from meal subscriptions.",
  },
  {
    question: "Which locations do you currently serve?",
    answer: `We currently deliver across ${["Udupi", "Manipal", "Malpe", "Kaup"].join(", ")}. Let us know your area and we'll confirm coverage.`,
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Choose Your Plan",
    description: "Pick a duration, meal time, and Veg or Non-Veg preference that suits your routine.",
  },
  {
    step: "02",
    title: "Tell Us What You Need",
    description: "Choose your favourite dishes, quantity, add-ons, and delivery details.",
  },
  {
    step: "03",
    title: "Submit Your Request",
    description: "Send your subscription or meal request through the website. No payment needed yet.",
  },
  {
    step: "04",
    title: "We Contact You",
    description: "Our team reviews your request and contacts you to confirm the details.",
  },
];

export const GAS_WEB_APP_URL = process.env.NEXT_PUBLIC_GAS_WEB_APP_URL || "";
