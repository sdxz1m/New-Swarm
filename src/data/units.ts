import type { UnitDefinition } from "../game/types";

export const units: UnitDefinition[] = [
  {
    id: "invisiblehatchery",
    tabId: "larva",
    text: {
      name: "孵化场",
      description: "孵化场是虫群幼虫的主要来源。它会持续产生幼虫。",
    },
    initialAmount: "1",
    isBuyable: false,
    cost: [],
    produces: [{ amountId: "larva", amountPerSecond: "1" }],
    sortOrder: 5,
  },
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
    requires: [
      { externalAmountId: "ascension", amount: "1", op: "OR" },
      { amountId: "drone", amount: "10" },
    ],
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
      { externalAmountId: "ascension", amount: "1", op: "OR" },
      { amountId: "queen", amount: "5" },
      { amountId: "territory", amount: "1" },
    ],
    sortOrder: 30,
  },
  {
    id: "greaterqueen",
    tabId: "meat",
    text: {
      name: "大虫后",
      description: "大虫后管理着较大的虫群中低阶的虫后。",
    },
    cost: [
      { amountId: "meat", amount: "6561000" },
      { amountId: "nest", amount: "10000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "nest", amountPerSecond: "4" }],
    requires: [{ amountId: "nest", amount: "1" }],
    sortOrder: 40,
  },
  {
    id: "hive",
    tabId: "meat",
    text: {
      name: "主巢",
      description: "主巢由大量肉和虫后构建而成。它们可以使虫群更快地成长。",
    },
    cost: [
      { amountId: "meat", amount: "590490000" },
      { amountId: "greaterqueen", amount: "100000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "greaterqueen", amountPerSecond: "5" }],
    requires: [{ amountId: "greaterqueen", amount: "1" }],
    sortOrder: 50,
  },
  {
    id: "hivequeen",
    tabId: "meat",
    text: {
      name: "主巢虫后",
      description: "主巢虫后监管着最大的虫群中主巢的生产流程。",
    },
    cost: [
      { amountId: "meat", amount: "53144100000" },
      { amountId: "hive", amount: "1000000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "hive", amountPerSecond: "6" }],
    requires: [{ amountId: "hive", amount: "1" }],
    sortOrder: 60,
  },
  {
    id: "empress",
    tabId: "meat",
    text: {
      name: "主巢女皇",
      description: "目前为止最强大的虫群管理者。",
    },
    cost: [
      { amountId: "meat", amount: "4782969000000" },
      { amountId: "hivequeen", amount: "10000000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "hivequeen", amountPerSecond: "7" }],
    requires: [{ amountId: "hivequeen", amount: "1" }],
    sortOrder: 70,
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
  {
    id: "stinger",
    tabId: "territory",
    text: {
      name: "兵蜂",
      description: "弱小的飞行战士。它们成群结队行动，使用毒刺攻击敌人。",
    },
    cost: [
      { amountId: "meat", amount: "337500" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "3.15" }],
    requires: [
      { amountId: "meat", amount: "101250" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 35,
  },
  {
    id: "spider",
    tabId: "territory",
    text: {
      name: "蜘蛛",
      description: "可怕的八脚野兽，它们会扑向猎物，将猎物用丝包裹，最后把猎物变为美味的饮料。",
    },
    cost: [
      { amountId: "meat", amount: "151875000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "141.75" }],
    requires: [
      { amountId: "meat", amount: "45562500" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 45,
  },
  {
    id: "mosquito",
    tabId: "territory",
    text: {
      name: "飞蚊",
      description: "这些讨厌的生物会享用猎物的血液，对于更大的猎物，还会向对方传播疾病。",
    },
    cost: [
      { amountId: "meat", amount: "68343750000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "6378.75" }],
    requires: [
      { amountId: "meat", amount: "20503125000" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 55,
  },
  {
    id: "locust",
    tabId: "territory",
    text: {
      name: "蝗虫",
      description: "饥饿的蝗虫群将吞噬任何不小心挡在它们面前的生物。",
    },
    cost: [
      { amountId: "meat", amount: "30754687500000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "287043.75" }],
    requires: [
      { amountId: "meat", amount: "9226406250000" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 65,
  },
  {
    id: "roach",
    tabId: "territory",
    text: {
      name: "蟑螂",
      description: "没有谁想要面对可怕的蟑螂，它们的外壳太坚硬了，几乎无法被杀死。",
    },
    cost: [
      { amountId: "meat", amount: "13839600000000000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "12916968.75" }],
    requires: [
      { amountId: "meat", amount: "4151880000000000" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 75,
  },
  {
    id: "giantspider",
    tabId: "territory",
    text: {
      name: "巨蜘蛛",
      description: "蜘蛛更巨大、更可怕的近亲。",
    },
    cost: [
      { amountId: "meat", amount: "6227820000000000000" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "581263593.8" }],
    requires: [
      { amountId: "meat", amount: "1868350000000000000" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 85,
  },
  {
    id: "centipede",
    tabId: "territory",
    text: {
      name: "蜈蚣",
      description: "行动迅捷的蠕虫状生物，拥有数百条腿和剧毒的咬击。",
    },
    cost: [
      { amountId: "meat", amount: "2.80252e+21" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "26156861719" }],
    requires: [
      { amountId: "meat", amount: "840756000000000000000" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 95,
  },
  {
    id: "wasp",
    tabId: "territory",
    text: {
      name: "黄蜂",
      description: "兵蜂的高级表亲，黄蜂更凶猛，更强大。",
    },
    cost: [
      { amountId: "meat", amount: "1.26113e+24" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "1177058777344" }],
    requires: [
      { amountId: "meat", amount: "3.7834e+23" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 105,
  },
  {
    id: "devourer",
    tabId: "territory",
    text: {
      name: "吞噬者",
      description: "吞噬者是巨大的埋地蠕虫，它们从地底接近猎物，并在猎物还没反应过来之前就将其吞噬。",
    },
    cost: [
      { amountId: "meat", amount: "5.6751e+26" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "52967644980469" }],
    requires: [
      { amountId: "meat", amount: "1.70253e+26" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 115,
  },
  {
    id: "goon",
    tabId: "territory",
    text: {
      name: "暴徒",
      description: "暴徒自己无法飞行，但它们使用金属构造了强大的飞行装甲，这使它们成为了天空之主。",
    },
    cost: [
      { amountId: "meat", amount: "2.5538e+29" },
      { amountId: "larva", amount: "1" },
    ],
    produces: [{ amountId: "territory", amountPerSecond: "2383540000000000" }],
    requires: [
      { amountId: "meat", amount: "7.66139e+28" },
      { amountId: "queen", amount: "5" },
    ],
    sortOrder: 125,
  },
];
