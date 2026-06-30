import type { UnitDefinition } from "../game/types";

export const units: UnitDefinition[] = [
  {
    id: "drone",
    text: {
      name: "无人虫",
      description: "采集肉的基础劳工，是第一条生产链的起点。",
    },
    cost: [{ resourceId: "larva", amount: "1" }],
    costGrowth: "1.18",
    produces: [{ resourceId: "meat", amountPerSecond: "1" }],
    sortOrder: 10,
  },
  {
    id: "queen",
    text: {
      name: "女王",
      description: "持续孵化幼虫，让虫群自动扩张。",
    },
    cost: [
      { resourceId: "meat", amount: "75" },
      { resourceId: "larva", amount: "2" },
    ],
    costGrowth: "1.24",
    produces: [{ resourceId: "larva", amountPerSecond: "0.12" }],
    requires: [{ resourceId: "meat", amount: "50" }],
    sortOrder: 20,
  },
  {
    id: "nest",
    text: {
      name: "巢穴",
      description: "稳固虫群的繁殖环境，并缓慢拓展领地。",
    },
    cost: [
      { resourceId: "meat", amount: "600" },
      { resourceId: "larva", amount: "8" },
    ],
    costGrowth: "1.32",
    produces: [{ resourceId: "territory", amountPerSecond: "0.02" }],
    requires: [{ unitId: "queen", amount: "4" }],
    sortOrder: 30,
  },
];

