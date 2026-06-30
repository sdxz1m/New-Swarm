import type { UnitDefinition } from "../game/types";

export const units: UnitDefinition[] = [
  {
    id: "drone",
    tabId: "meat",
    text: {
      name: "工蜂",
      description: "工蜂是虫群最基础的工人单位。它们持续收集肉以维持虫群的温饱。",
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
    tabId: "meat",
    text: {
      name: "虫后",
      description: "虫后管理着虫群的工人。",
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
    tabId: "meat",
    text: {
      name: "虫巢",
      description: "虫巢为虫后提供空间和支持。",
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
    tabId: "territory",
    text: {
      name: "跳虫",
      description: "虫群最小，也是最弱的战士。它们使用爪子和利齿攻击敌人，成群结队时相当凶猛。",
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
