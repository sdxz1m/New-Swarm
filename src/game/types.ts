export type DecimalString = string;

export type ResourceId = "meat" | "larva" | "territory";
export type UnitId =
  | "invisiblehatchery"
  | "drone"
  | "queen"
  | "nest"
  | "greaterqueen"
  | "hive"
  | "hivequeen"
  | "empress"
  | "swarmling"
  | "stinger"
  | "spider"
  | "mosquito"
  | "locust"
  | "roach"
  | "giantspider"
  | "centipede"
  | "wasp"
  | "devourer"
  | "goon";
export type AmountId = ResourceId | UnitId;
export type TabId = "larva" | "meat" | "territory";
export type UpgradeId =
  | "hatchery"
  | "expansion"
  | "droneprod"
  | "queenprod"
  | "nestprod"
  | "greaterqueenprod"
  | "hiveprod"
  | "hivequeenprod"
  | "empressprod"
  | "dronetwin"
  | "queentwin"
  | "nesttwin"
  | "swarmlingtwin"
  | "greaterqueentwin"
  | "hivetwin"
  | "hivequeentwin"
  | "stingertwin"
  | "spidertwin"
  | "mosquitotwin"
  | "locusttwin"
  | "roachtwin"
  | "giantspidertwin"
  | "centipedetwin"
  | "wasptwin"
  | "devourertwin"
  | "goontwin";

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
  externalAmountId?: string;
  amount: DecimalString;
  op?: "OR";
}

export interface UnitDefinition {
  id: UnitId;
  tabId: TabId;
  text: LocalizedText;
  initialAmount?: DecimalString;
  isBuyable?: boolean;
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
      type: "addUnitProduction";
      unitId: UnitId;
      addend: DecimalString;
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
