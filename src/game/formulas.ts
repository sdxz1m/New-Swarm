import { resources } from "../data/resources";
import { units } from "../data/units";
import { upgrades } from "../data/upgrades";
import { D, Decimal, one } from "./decimal";
import type {
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

export function getUnitCost(unit: UnitDefinition, owned: Decimal): CostDefinition[] {
  const growth = D(unit.costGrowth);
  return unit.cost.map((cost) => ({
    ...cost,
    amount: D(cost.amount).times(Decimal.pow(growth, owned)).toString(),
  }));
}

export function hasCosts(state: GameState, costs: CostDefinition[]): boolean {
  return costs.every((cost) =>
    D(state.resources[cost.resourceId]).gte(cost.amount),
  );
}

export function meetsRequirements(
  state: GameState,
  requirements: RequirementDefinition[] = [],
): boolean {
  return requirements.every((requirement) => {
    if (requirement.resourceId) {
      return D(state.resources[requirement.resourceId]).gte(requirement.amount);
    }
    if (requirement.unitId) {
      return D(state.units[requirement.unitId]).gte(requirement.amount);
    }
    if (requirement.upgradeId) {
      return (state.upgrades[requirement.upgradeId] ?? 0) >= Number(requirement.amount);
    }
    return true;
  });
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

export function getResourceMultiplier(
  state: GameState,
  resourceId: ResourceId,
): Decimal {
  return upgrades.reduce((total, upgrade) => {
    const level = state.upgrades[upgrade.id] ?? 0;
    if (level <= 0) return total;

    return upgrade.effects.reduce((inner, effect) => {
      if (
        effect.type !== "multiplyResourceProduction" ||
        effect.resourceId !== resourceId
      ) {
        return inner;
      }
      return inner.times(Decimal.pow(D(effect.multiplier), level));
    }, total);
  }, one());
}

export function getProductionRates(state: GameState): Record<ResourceId, Decimal> {
  const rates = resources.reduce(
    (acc, resource) => ({ ...acc, [resource.id]: D(0) }),
    {} as Record<ResourceId, Decimal>,
  );

  for (const unit of units) {
    const owned = D(state.units[unit.id]);
    if (owned.lte(0)) continue;
    const unitMultiplier = getUnitMultiplier(state, unit.id);

    for (const production of unit.produces) {
      const resourceMultiplier = getResourceMultiplier(
        state,
        production.resourceId,
      );
      rates[production.resourceId] = rates[production.resourceId].plus(
        owned
          .times(production.amountPerSecond)
          .times(unitMultiplier)
          .times(resourceMultiplier),
      );
    }
  }

  return rates;
}

