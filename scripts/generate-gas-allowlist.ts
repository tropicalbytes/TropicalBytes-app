/**
 * Generates google-apps-script/generated-allowlist.gs directly from this
 * project's lib/config.ts — the single source of truth for menu data.
 *
 * Run this after any change to durations, comboPricing, the weekly menu,
 * salads, add-ons, or party/bulk items, then copy the output file into the
 * Apps Script project as a second .gs file (Apps Script merges all files in
 * a project into one global scope, so no manual merging is needed).
 *
 *   npm run generate:gas
 */
import {
  durations,
  comboPricing,
  weeklyDishOptions,
  saladOptions,
  buildAddOnOptionGroups,
  partyBulkOrders,
  slugify,
} from "../lib/config";
import { MEAL_PREFERENCE_OPTIONS, FOOD_PREFERENCE_OPTIONS } from "../lib/constants";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function buildMealIdMap(): Record<string, string> {
  const map: Record<string, string> = {};
  const foodTypes = ["Veg", "Non-Veg"] as const;
  const mealTimes = ["Lunch", "Dinner"] as const;
  for (const foodType of foodTypes) {
    for (const mealTime of mealTimes) {
      for (const opt of weeklyDishOptions(foodType, mealTime)) {
        map[opt.id] = opt.label;
      }
    }
    for (const opt of saladOptions(foodType)) {
      map[opt.id] = opt.label;
    }
  }
  return map;
}

function buildAddOnIdMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const group of buildAddOnOptionGroups()) {
    for (const opt of group.options) {
      map[opt.id] = opt.label;
    }
  }
  return map;
}

function buildPartyIdMap(): Record<string, string> {
  const map: Record<string, string> = {};
  partyBulkOrders.nonVeg.forEach((item, idx) => {
    map[slugify(`nonveg-${item.name}-${idx}`)] = item.name;
  });
  partyBulkOrders.veg.forEach((item, idx) => {
    map[slugify(`veg-${item.name}-${idx}`)] = item.name;
  });
  return map;
}

const durationMap: Record<string, { weeks: number; discountPercent: number }> = {};
durations.forEach((d) => {
  durationMap[d.id] = { weeks: d.weeks, discountPercent: d.discountPercent };
});

const comboMap: Record<string, { foodType: string; mealTime: string; pricePerWeek: number; label: string }> = {};
comboPricing.forEach((c) => {
  comboMap[c.id] = { foodType: c.foodType, mealTime: c.mealTime, pricePerWeek: c.pricePerWeek, label: c.label };
});

const output = `/**
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
  MEAL_PREFERENCES: ${JSON.stringify(MEAL_PREFERENCE_OPTIONS)},
  FOOD_PREFERENCES: ${JSON.stringify(FOOD_PREFERENCE_OPTIONS)},
  DURATIONS: ${JSON.stringify(durationMap, null, 2)},
  COMBOS: ${JSON.stringify(comboMap, null, 2)},
  MEAL_IDS: ${JSON.stringify(buildMealIdMap(), null, 2)},
  ADDON_IDS: ${JSON.stringify(buildAddOnIdMap(), null, 2)},
  PARTY_ITEM_IDS: ${JSON.stringify(buildPartyIdMap(), null, 2)}
};
`;

const outPath = path.join(__dirname, "../google-apps-script/generated-allowlist.gs");
writeFileSync(outPath, output, "utf-8");
console.log(`Wrote ${outPath}`);
