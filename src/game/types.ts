export type DecimalString = string;

export type ResourceId = "meat" | "larva" | "territory";
export type UnitId = "drone" | "queen" | "nest" | "swarmling";
export type AmountId = ResourceId | UnitId;
export type UpgradeId =
  | "droneprod"
  | "queenprod"
  | "nestprod"
  | "dronetwin"
  | "queentwin"
  | "swarmlingtwin";

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
  amountId: AmountId;
  amount: DecimalString;
  factor?: DecimalString;
}

export interface ProductionDefinition {
  amountId: AmountId;
  amountPerSecond: DecimalString;
}

export interface RequirementDefinition {
  amountId?: AmountId;
  upgradeId?: UpgradeId;
  amount: DecimalString;
}

export interface UnitDefinition {
  id: UnitId;
  text: LocalizedText;
  cost: CostDefinition[];
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
      type: "multiplyUnitPurchase";
      unitId: UnitId;
      multiplier: DecimalString;
    };

export interface UpgradeDefinition {
  id: UpgradeId;
  unitId: UnitId;
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
