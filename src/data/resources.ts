import type { ResourceDefinition } from "../game/types";

export const resources: ResourceDefinition[] = [
  {
    id: "meat",
    text: {
      name: "肉",
      description: "虫群最基础的养分，用来孵化和供养早期单位。",
    },
    initialAmount: "35",
    sortOrder: 10,
  },
  {
    id: "larva",
    text: {
      name: "幼虫",
      description: "所有虫群单位的起点，会被转化为更专门的形态。",
    },
    initialAmount: "10",
    sortOrder: 20,
  },
  {
    id: "territory",
    text: {
      name: "领地",
      description: "虫群扩张后的活动空间，推动巢穴继续增长。",
    },
    initialAmount: "0",
    sortOrder: 30,
  },
];

