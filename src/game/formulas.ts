import { resources } from "../data/resources";
import { units } from "../data/units";
import { upgrades } from "../data/upgrades";
import { D, Decimal, one } from "./decimal";
import type {
  AmountId,
  CostDefinition,
  GameState,
  RequirementDefinition,
  ResourceId,
  UnitDefinition,
  UnitId,
  UpgradeDefinition,
} from "./types";

export const resourceById = Object.fromEntries(
  resources.map((resource) => [resource.id, resource]),
) as Record<ResourceId, (typeof resources)[number]>;

export const unitById = Object.fromEntries(
  units.map((unit) => [unit.id, unit]),
) as Record<UnitId, UnitDefinition>;

export const upgradeById = Object.fromEntries(
  upgrades.map((upgrade) => [upgrade.id, upgrade]),
) as Record<UpgradeDefinition["id"], UpgradeDefinition>;

export function getAmount(state: GameState, amountId: AmountId): Decimal {
  if (amountId in state.resources) {
    return D(state.resources[amountId as ResourceId]);
  }
  return D(state.units[amountId as UnitId]);
}

export function setAmount(
  state: GameState,
  amountId: AmountId,
  value: Decimal,
): GameState {
  if (amountId in state.resources) {
    return {
      ...state,
      resources: {
        ...state.resources,
        [amountId]: value.toString(),
      },
    };
  }
  return {
    ...state,
    units: {
      ...state.units,
      [amountId]: value.toString(),
    },
  };
}

export function amountName(amountId: AmountId): string {
  if (amountId in resourceById) {
    return resourceById[amountId as ResourceId].text.name;
  }
  return unitById[amountId as UnitId].text.name;
}

export function getUnitCost(unit: UnitDefinition): CostDefinition[] {
  return unit.cost.map((cost) => ({
    ...cost,
    amount: D(cost.amount).toString(),
  }));
}

export function getUpgradeCost(
  upgrade: UpgradeDefinition,
  level: number,
): CostDefinition[] {
  return upgrade.cost.map((cost) => ({
    ...cost,
    amount: D(cost.amount)
      .times(Decimal.pow(D(cost.factor ?? "1"), level))
      .toString(),
  }));
}

export function hasCosts(state: GameState, costs: CostDefinition[]): boolean {
  return costs.every((cost) => getAmount(state, cost.amountId).gte(cost.amount));
}

export function meetsRequirements(
  state: GameState,
  requirements: RequirementDefinition[] = [],
): boolean {
  if (!requirements.some((requirement) => requirement.op === "OR")) {
    return requirements.every((requirement) => meetsRequirement(state, requirement));
  }

  const clauses: RequirementDefinition[][] = [];
  let clause: RequirementDefinition[] = [];
  for (const requirement of requirements) {
    clause.push(requirement);
    if (requirement.op === "OR") {
      clauses.push(clause);
      clause = [];
    }
  }
  if (clause.length > 0) {
    clauses.push(clause);
  }

  return clauses.some((items) =>
    items.every((requirement) => meetsRequirement(state, requirement)),
  );
}

function meetsRequirement(
  state: GameState,
  requirement: RequirementDefinition,
): boolean {
    if (requirement.amountId) {
      return getAmount(state, requirement.amountId).gte(requirement.amount);
    }
    if (requirement.upgradeId) {
      return (state.upgrades[requirement.upgradeId] ?? 0) >= Number(requirement.amount);
    }
    if (requirement.externalAmountId) {
      return false;
    }
    return true;
}

export function isUnitVisible(state: GameState, unit: UnitDefinition): boolean {
  return getAmount(state, unit.id).gt(0) || meetsRequirements(state, unit.requires);
}

export function getUnitMultiplier(state: GameState, unitId: UnitId): Decimal {
  return upgrades.reduce((total, upgrade) => {
    const level = state.upgrades[upgrade.id] ?? 0;
    if (level <= 0) return total;

    return upgrade.effects.reduce((inner, effect) => {
      if (effect.type !== "multiplyUnitProduction" || effect.unitId !== unitId) {
        return inner;
      }
      return inner.times(Decimal.pow(D(effect.multiplier), level));
    }, total);
  }, one());
}

export function getUnitProductionAddend(state: GameState, unitId: UnitId): Decimal {
  return upgrades.reduce((total, upgrade) => {
    const level = state.upgrades[upgrade.id] ?? 0;
    if (level <= 0) return total;

    return upgrade.effects.reduce((inner, effect) => {
      if (effect.type !== "addUnitProduction" || effect.unitId !== unitId) {
        return inner;
      }
      return inner.plus(D(effect.addend).times(level));
    }, total);
  }, D(0));
}

export function getResourceMultiplier(
  _state: GameState,
  _resourceId: ResourceId,
): Decimal {
  return one();
}

export function getPurchaseMultiplier(state: GameState, unitId: UnitId): Decimal {
  return upgrades.reduce((total, upgrade) => {
    const level = state.upgrades[upgrade.id] ?? 0;
    if (level <= 0) return total;

    return upgrade.effects.reduce((inner, effect) => {
      if (effect.type !== "multiplyUnitPurchase" || effect.unitId !== unitId) {
        return inner;
      }
      return inner.times(Decimal.pow(D(effect.multiplier), level));
    }, total);
  }, one());
}

export function getProductionRates(
  state: GameState,
): Record<ResourceId | UnitId, Decimal> {
  const rates = resources.reduce(
    (acc, resource) => ({ ...acc, [resource.id]: D(0) }),
    {} as Record<ResourceId | UnitId, Decimal>,
  );
  for (const unit of units) {
    rates[unit.id] = D(0);
  }

  for (const unit of units) {
    const owned = D(state.units[unit.id]).floor();
    if (owned.lte(0)) continue;
    const unitMultiplier = getUnitMultiplier(state, unit.id);
    const productionAddend = getUnitProductionAddend(state, unit.id);

    for (const production of unit.produces) {
      rates[production.amountId] = rates[production.amountId].plus(
        owned
          .times(D(production.amountPerSecond).plus(productionAddend))
          .times(unitMultiplier),
      );
    }
  }

  return rates;
}
