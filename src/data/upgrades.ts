import type { UpgradeDefinition } from "../game/types";

export const upgrades: UpgradeDefinition[] = [
  {
    id: "hatchery",
    unitId: "invisiblehatchery",
    text: {
      name: "孵化场",
      description: "增加孵化场的幼虫产量。",
    },
    cost: [{ amountId: "meat", amount: "300", factor: "10" }],
    maxLevel: 999999,
    effects: [
      { type: "addUnitProduction", unitId: "invisiblehatchery", addend: "1" },
    ],
    sortOrder: 5,
  },
  {
    id: "expansion",
    unitId: "invisiblehatchery",
    text: {
      name: "扩张",
      description: "利用领土扩张孵化场，使幼虫产量提高。",
    },
    cost: [{ amountId: "territory", amount: "10", factor: "2.45" }],
    maxLevel: 999999,
    effects: [
      {
        type: "multiplyUnitProduction",
        unitId: "invisiblehatchery",
        multiplier: "1.1",
      },
    ],
    sortOrder: 6,
  },
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
    id: "greaterqueenprod",
    unitId: "greaterqueen",
    text: {
      name: "更快的大虫后",
      description: "大虫后可以产生更多虫巢。",
    },
    cost: [{ amountId: "greaterqueen", amount: "66", factor: "666" }],
    requires: [{ amountId: "greaterqueen", amount: "67" }],
    maxLevel: 999999,
    effects: [
      {
        type: "multiplyUnitProduction",
        unitId: "greaterqueen",
        multiplier: "2",
      },
    ],
    sortOrder: 35,
  },
  {
    id: "hiveprod",
    unitId: "hive",
    text: {
      name: "更快的主巢",
      description: "主巢可以产生更多大虫后。",
    },
    cost: [{ amountId: "hive", amount: "66", factor: "666" }],
    requires: [{ amountId: "hive", amount: "67" }],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitProduction", unitId: "hive", multiplier: "2" },
    ],
    sortOrder: 36,
  },
  {
    id: "hivequeenprod",
    unitId: "hivequeen",
    text: {
      name: "更快的主巢虫后",
      description: "主巢虫后可以产生更多主巢。",
    },
    cost: [{ amountId: "hivequeen", amount: "66", factor: "666" }],
    requires: [{ amountId: "hivequeen", amount: "67" }],
    maxLevel: 999999,
    effects: [
      {
        type: "multiplyUnitProduction",
        unitId: "hivequeen",
        multiplier: "2",
      },
    ],
    sortOrder: 37,
  },
  {
    id: "empressprod",
    unitId: "empress",
    text: {
      name: "更快的主巢女皇",
      description: "主巢女皇可以产生更多主巢虫后。",
    },
    cost: [{ amountId: "empress", amount: "66", factor: "666" }],
    requires: [{ amountId: "empress", amount: "67" }],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitProduction", unitId: "empress", multiplier: "2" },
    ],
    sortOrder: 38,
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
    id: "greaterqueentwin",
    unitId: "greaterqueen",
    text: {
      name: "双重大虫后",
      description: "每只幼虫可以孵化更多大虫后。不影响主巢产量。",
    },
    cost: [{ amountId: "hive", amount: "1", factor: "10" }],
    requires: [{ amountId: "hive", amount: "1" }],
    maxLevel: 999999,
    effects: [
      {
        type: "multiplyUnitPurchase",
        unitId: "greaterqueen",
        multiplier: "2",
      },
    ],
    sortOrder: 55,
  },
  {
    id: "hivetwin",
    unitId: "hive",
    text: {
      name: "双重主巢",
      description: "每只幼虫可以建造更多主巢。不影响主巢虫后产量。",
    },
    cost: [{ amountId: "hivequeen", amount: "1", factor: "10" }],
    requires: [{ amountId: "hivequeen", amount: "1" }],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitPurchase", unitId: "hive", multiplier: "2" },
    ],
    sortOrder: 56,
  },
  {
    id: "hivequeentwin",
    unitId: "hivequeen",
    text: {
      name: "双重主巢虫后",
      description: "每只幼虫可以孵化更多主巢虫后。不影响主巢女皇产量。",
    },
    cost: [{ amountId: "empress", amount: "1", factor: "10" }],
    requires: [{ amountId: "empress", amount: "1" }],
    maxLevel: 999999,
    effects: [
      {
        type: "multiplyUnitPurchase",
        unitId: "hivequeen",
        multiplier: "2",
      },
    ],
    sortOrder: 57,
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
  {
    id: "stingertwin",
    unitId: "stinger",
    text: {
      name: "双重兵蜂",
      description: "每只幼虫可以孵化更多兵蜂。",
    },
    cost: [
      { amountId: "meat", amount: "100", factor: "500" },
      { amountId: "larva", amount: "1", factor: "50" },
    ],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitPurchase", unitId: "stinger", multiplier: "2" },
    ],
    sortOrder: 70,
  },
  {
    id: "spidertwin",
    unitId: "spider",
    text: {
      name: "双重蜘蛛",
      description: "每只幼虫可以孵化更多蜘蛛。",
    },
    cost: [
      { amountId: "meat", amount: "100", factor: "500" },
      { amountId: "larva", amount: "1", factor: "50" },
    ],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitPurchase", unitId: "spider", multiplier: "2" },
    ],
    sortOrder: 80,
  },
  {
    id: "mosquitotwin",
    unitId: "mosquito",
    text: {
      name: "双重飞蚊",
      description: "每只幼虫可以孵化更多飞蚊。",
    },
    cost: [
      { amountId: "meat", amount: "100", factor: "500" },
      { amountId: "larva", amount: "1", factor: "50" },
    ],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitPurchase", unitId: "mosquito", multiplier: "2" },
    ],
    sortOrder: 90,
  },
  {
    id: "locusttwin",
    unitId: "locust",
    text: {
      name: "双重蝗虫",
      description: "每只幼虫可以孵化更多蝗虫。",
    },
    cost: [
      { amountId: "meat", amount: "100", factor: "500" },
      { amountId: "larva", amount: "1", factor: "50" },
    ],
    maxLevel: 999999,
    effects: [
      { type: "multiplyUnitPurchase", unitId: "locust", multiplier: "2" },
    ],
    sortOrder: 100,
  },
];
