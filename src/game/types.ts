export type DecimalString = string;

export type ResourceId = "meat" | "larva" | "territory";
export type UnitId = "drone" | "queen" | "nest";
export type UpgradeId =
  | "droneInstinct"
  | "queenNursing"
  | "nestExpansion"
  | "territorySurvey";

export type NumberFormatMode = "zh" | "short" | "scientific";

export interface LocalizedText {
  name: string;
  description: string;
}

export interface ResourceDefinition {
  id: ResourceId;
  text: LocalizedText;
  initialAmount: DecimalString;
  sortOrder: number;
}

export interface CostDefinition {
  resourceId: ResourceId;
  amount: DecimalString;
}

export interface ProductionDefinition {
  resourceId: ResourceId;
  amountPerSecond: DecimalString;
}

export interface RequirementDefinition {
  resourceId?: ResourceId;
  unitId?: UnitId;
  upgradeId?: UpgradeId;
  amount: DecimalString;
}

export interface UnitDefinition {
  id: UnitId;
  text: LocalizedText;
  cost: CostDefinition[];
  costGrowth: DecimalString;
  produces: ProductionDefinition[];
  requires?: RequirementDefinition[];
  sortOrder: number;
}

export type UpgradeEffect =
  | {
      type: "multiplyUnitProduction";
      unitId: UnitId;
      multiplier: DecimalString;
    }
  | {
      type: "multiplyResourceProduction";
      resourceId: ResourceId;
      multiplier: DecimalString;
    };

export interface UpgradeDefinition {
  id: UpgradeId;
  text: LocalizedText;
  cost: CostDefinition[];
  requires?: RequirementDefinition[];
  maxLevel: number;
  effects: UpgradeEffect[];
  sortOrder: number;
}

export interface GameOptions {
  numberFormat: NumberFormatMode;
}

export interface GameState {
  resources: Record<ResourceId, DecimalString>;
  units: Record<UnitId, DecimalString>;
  upgrades: Partial<Record<UpgradeId, number>>;
  options: GameOptions;
  createdAt: number;
  updatedAt: number;
}

export interface GameSnapshot {
  version: 1;
  state: GameState;
}

