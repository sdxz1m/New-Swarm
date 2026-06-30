import type { TabId } from "../game/types";

export interface TabDefinition {
  id: TabId;
  name: string;
  description: string;
  sortOrder: number;
}

export const tabs: TabDefinition[] = [
  {
    id: "meat",
    name: "肉面板",
    description: "工蜂、虫后和虫巢构成虫群的肉相关生产链。",
    sortOrder: 10,
  },
  {
    id: "territory",
    name: "领土面板",
    description: "军事单位占领领土，帮助虫群进行扩张。",
    sortOrder: 20,
  },
];
