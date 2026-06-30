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
    name: "肉链",
    description: "采肉、孵化工虫和扩张繁殖链。",
    sortOrder: 10,
  },
  {
    id: "territory",
    name: "领地链",
    description: "战斗单位夺取领地，解锁更高层建筑。",
    sortOrder: 20,
  },
];

