import { resources } from "../data/resources";
import { units } from "../data/units";
import { upgrades } from "../data/upgrades";
import { D } from "./decimal";
import {
  getAmount,
  getPurchaseMultiplier,
  getProductionRates,
  getUnitCost,
  getUpgradeCost,
  hasCosts,
  isUnitVisible,
  meetsRequirements,
  setAmount,
} from "./formulas";
import type {
  GameState,
  ResourceId,
  UnitDefinition,
  UnitId,
  UpgradeDefinition,
  UpgradeId,
} from "./types";

export function createInitialState(now = Date.now()): GameState {
  return {
    resources: Object.fromEntries(
      resources.map((resource) => [resource.id, resource.initialAmount]),
    ) as GameState["resources"],
    units: Object.fromEntries(
      units.map((unit) => [unit.id, unit.initialAmount ?? "0"]),
    ) as GameState["units"],
    upgrades: {},
    options: { numberFormat: "zh" },
    createdAt: now,
    updatedAt: now,
  };
}

export function tick(state: GameState, now = Date.now()): GameState {
  const seconds = Math.max(0, (now - state.updatedAt) / 1000);
  if (seconds <= 0) return state;

  const rates = getProductionRates(state);
  const nextResources = { ...state.resources };
  const nextUnits = { ...state.units };

  for (const resource of resources) {
    nextResources[resource.id] = D(nextResources[resource.id])
      .plus(rates[resource.id].times(seconds))
      .toString();
  }
  for (const unit of units) {
    nextUnits[unit.id] = D(nextUnits[unit.id])
      .plus(rates[unit.id].times(seconds))
      .toString();
  }

  return {
    ...state,
    resources: nextResources,
    units: nextUnits,
    updatedAt: now,
  };
}

export function isUnitUnlocked(state: GameState, unit: UnitDefinition): boolean {
  return meetsRequirements(state, unit.requires);
}

export function isUpgradeUnlocked(
  state: GameState,
  upgrade: UpgradeDefinition,
): boolean {
  const level = state.upgrades[upgrade.id] ?? 0;
  const unit = units.find((item) => item.id === upgrade.unitId);
  return (
    level < upgrade.maxLevel &&
    (!unit || isUnitVisible(state, unit)) &&
    meetsRequirements(state, upgrade.requires)
  );
}

export function buyUnit(state: GameState, unitId: UnitId): GameState {
  const unit = units.find((item) => item.id === unitId);
  if (!unit || unit.isBuyable === false || !isUnitUnlocked(state, unit)) {
    return state;
  }

  const cost = getUnitCost(unit);
  if (!hasCosts(state, cost)) return state;

  let next = state;
  for (const item of cost) {
    next = setAmount(
      next,
      item.amountId,
      getAmount(next, item.amountId).minus(item.amount),
    );
  }

  return {
    ...next,
    units: {
      ...next.units,
      [unit.id]: D(next.units[unit.id])
        .plus(getPurchaseMultiplier(state, unit.id))
        .toString(),
    },
  };
}

export function buyMaxUnit(state: GameState, unitId: UnitId): GameState {
  let next = state;
  for (let index = 0; index < 1000; index += 1) {
    const bought = buyUnit(next, unitId);
    if (bought === next) return next;
    next = bought;
  }
  return next;
}

export function buyUpgrade(state: GameState, upgradeId: UpgradeId): GameState {
  const upgrade = upgrades.find((item) => item.id === upgradeId);
  if (!upgrade || !isUpgradeUnlocked(state, upgrade)) return state;
  const level = state.upgrades[upgrade.id] ?? 0;
  const cost = getUpgradeCost(upgrade, level);
  if (!hasCosts(state, cost)) return state;

  let next = state;
  for (const item of cost) {
    next = setAmount(
      next,
      item.amountId,
      getAmount(next, item.amountId).minus(item.amount),
    );
  }

  return {
    ...next,
    upgrades: {
      ...next.upgrades,
      [upgrade.id]: (state.upgrades[upgrade.id] ?? 0) + 1,
    },
  };
}

export function setNumberFormat(
  state: GameState,
  numberFormat: GameState["options"]["numberFormat"],
): GameState {
  return {
    ...state,
    options: {
      ...state.options,
      numberFormat,
    },
  };
}

export function resourceAmount(state: GameState, resourceId: ResourceId) {
  return D(state.resources[resourceId]);
}
