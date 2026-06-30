import type { UnitDefinition } from "../game/types";

export const units: UnitDefinition[] = [
  {
    id: "drone",
    text: {
      name: "无人虫",
      description: "旧版 drone：持续采集肉的基础劳工。",
    },
    cost: [
      { amountId: "meat", amount: "10" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "meat", amountPerSecond: "1" }],
    requires: [{ amountId: "meat", amount: "0" }],
    sortOrder: 10,
  },
  {
    id: "queen",
    text: {
      name: "女王",
      description: "旧版 queen：统治工虫，并持续孵化无人虫。",
    },
    cost: [
      { amountId: "meat", amount: "810" },
      { amountId: "drone", amount: "100" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "drone", amountPerSecond: "2" }],
    requires: [{ amountId: "drone", amount: "10" }],
    sortOrder: 20,
  },
  {
    id: "nest",
    text: {
      name: "巢穴",
      description: "旧版 nest：为女王提供空间和支持，并持续产出女王。",
    },
    cost: [
      { amountId: "meat", amount: "72900" },
      { amountId: "queen", amount: "1000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "queen", amountPerSecond: "3" }],
    requires: [
      { amountId: "queen", amount: "5" },
      { amountId: "territory", amount: "1" },
    ],
    sortOrder: 30,
  },
  {
    id: "swarmling",
    text: {
      name: "虫群幼体",
      description: "旧版 swarmling：最弱小的战士，持续夺取领地。",
    },
    cost: [
      { amountId: "meat", amount: "750" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "0.07" }],
    requires: [
      { amountId: "meat", amount: "225" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 25,
  },
];
