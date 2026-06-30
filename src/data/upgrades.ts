import type { UpgradeDefinition } from "../game/types";

export const upgrades: UpgradeDefinition[] = [
  {
    id: "droneprod",
    unitId: "drone",
    text: {
      name: "更快的工蜂",
      description: "工蜂可以收集更多肉。",
    },
    cost: [{ amountId: "drone", amount: "66", factor: "666" }],
    requires: [{ amountId: "drone", amount: "67" }],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitProduction", unitId: "drone", multiplier: "2" },
    ],
    sortOrder: 10,
  },
  {
    id: "queenprod",
    unitId: "queen",
    text: {
      name: "更快的虫后",
      description: "虫后可以产生更多工蜂。",
    },
    cost: [{ amountId: "queen", amount: "66", factor: "666" }],
    requires: [{ amountId: "queen", amount: "67" }],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitProduction", unitId: "queen", multiplier: "2" },
    ],
    sortOrder: 20,
  },
  {
    id: "nestprod",
    unitId: "nest",
    text: {
      name: "更快的虫巢",
      description: "虫巢可以产生更多虫后。",
    },
    cost: [{ amountId: "nest", amount: "66", factor: "666" }],
    requires: [{ amountId: "nest", amount: "67" }],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitProduction", unitId: "nest", multiplier: "2" },
    ],
    sortOrder: 30,
  },
  {
    id: "dronetwin",
    unitId: "drone",
    text: {
      name: "双重工蜂",
      description: "每只幼虫可以孵化更多工蜂。不影响虫后产量。",
    },
    cost: [{ amountId: "queen", amount: "1", factor: "10" }],
    requires: [{ amountId: "queen", amount: "1" }],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitPurchase", unitId: "drone", multiplier: "2" },
    ],
    sortOrder: 40,
  },
  {
    id: "queentwin",
    unitId: "queen",
    text: {
      name: "双重虫后",
      description: "每只幼虫可以孵化更多虫后。不影响虫巢产量。",
    },
    cost: [{ amountId: "nest", amount: "1", factor: "10" }],
    requires: [{ amountId: "nest", amount: "1" }],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitPurchase", unitId: "queen", multiplier: "2" },
    ],
    sortOrder: 50,
  },
  {
    id: "swarmlingtwin",
    unitId: "swarmling",
    text: {
      name: "双重跳虫",
      description: "每只幼虫可以孵化更多跳虫。",
    },
    cost: [
      { amountId: "meat", amount: "100", factor: "500" },
      { amountId: "larva", amount: "1", factor: "50" },
    ],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitPurchase", unitId: "swarmling", multiplier: "2" },
    ],
    sortOrder: 60,
  },
];
