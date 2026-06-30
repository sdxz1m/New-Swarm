import type { ResourceDefinition } from "../game/types";

export const resources: ResourceDefinition[] = [
  {
    id: "meat",
    text: {
      name: "肉",
      description: "肉相当美味可口。虫群中的所有生物都吃肉。",
    },
    initialAmount: "35",
    sortOrder: 10,
  },
  {
    id: "larva",
    text: {
      name: "幼虫",
      description: "虫群的幼生体。它们可以进化成其他的成熟单位。",
    },
    initialAmount: "10",
    sortOrder: 20,
  },
  {
    id: "territory",
    text: {
      name: "领土",
      description: "您的虫群的军队可以占领领土，帮助您进行扩张。",
    },
    initialAmount: "0",
    sortOrder: 30,
  },
];
