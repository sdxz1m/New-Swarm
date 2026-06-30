import type { UpgradeDefinition } from "../game/types";

export const upgrades: UpgradeDefinition[] = [
  {
    id: "droneInstinct",
    text: {
      name: "采集本能",
      description: "无人虫采集肉的效率翻倍。",
    },
    cost: [{ resourceId: "meat", amount: "120" }],
    requires: [{ unitId: "drone", amount: "10" }],
    maxLevel: 1,
    effects: [
      { type: "multiplyUnitProduction", unitId: "drone", multiplier: "2" },
    ],
    sortOrder: 10,
  },
  {
    id: "queenNursing",
    text: {
      name: "女王育幼",
      description: "女王产出幼虫的速度提升 75%。",
    },
    cost: [{ resourceId: "meat", amount: "900" }],
    requires: [{ unitId: "queen", amount: "5" }],
    maxLevel: 1,
    effects: [
      { type: "multiplyUnitProduction", unitId: "queen", multiplier: "1.75" },
    ],
    sortOrder: 20,
  },
  {
    id: "nestExpansion",
    text: {
      name: "巢穴扩张",
      description: "巢穴拓展领地的速度翻倍。",
    },
    cost: [{ resourceId: "territory", amount: "3" }],
    requires: [{ unitId: "nest", amount: "3" }],
    maxLevel: 1,
    effects: [
      { type: "multiplyUnitProduction", unitId: "nest", multiplier: "2" },
    ],
    sortOrder: 30,
  },
  {
    id: "territorySurvey",
    text: {
      name: "领地测绘",
      description: "所有领地产出提升 50%，用于验证资源倍率效果。",
    },
    cost: [
      { resourceId: "meat", amount: "2500" },
      { resourceId: "territory", amount: "5" },
    ],
    requires: [{ resourceId: "territory", amount: "5" }],
    maxLevel: 1,
    effects: [
      {
        type: "multiplyResourceProduction",
        resourceId: "territory",
        multiplier: "1.5",
      },
    ],
    sortOrder: 40,
  },
];

