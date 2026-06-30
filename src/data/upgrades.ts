import type { UpgradeDefinition } from "../game/types";

export const upgrades: UpgradeDefinition[] = [
  {
    id: "droneprod",
    unitId: "drone",
    text: {
      name: "更快的无人虫",
      description: "旧版 droneprod：无人虫采集肉的效率翻倍。",
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
      name: "更快的女王",
      description: "旧版 queenprod：女王生产无人虫的效率翻倍。",
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
      name: "更快的巢穴",
      description: "旧版 nestprod：巢穴生产女王的效率翻倍。",
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
      name: "双生无人虫",
      description: "旧版 dronetwin：每次用幼虫孵化时获得多个无人虫，不影响女王生产。",
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
      name: "双生女王",
      description: "旧版 queentwin：每次用幼虫孵化时获得多个女王，不影响巢穴生产。",
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
      name: "双生虫群幼体",
      description: "旧版 swarmlingtwin：每次用幼虫孵化时获得多个虫群幼体。",
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
