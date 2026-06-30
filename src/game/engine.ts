import { resources } from "../data/resources";
import { units } from "../data/units";
import { upgrades } from "../data/upgrades";
import { D } from "./decimal";
import {
  getProductionRates,
  getUnitCost,
  hasCosts,
  meetsRequirements,
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
    units: Object.fromEntries(units.map((unit) => [unit.id, "0"])) as GameState["units"],
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

  for (const resource of resources) {
    nextResources[resource.id] = D(nextResources[resource.id])
      .plus(rates[resource.id].times(seconds))
      .toString();
  }

  return {
    ...state,
    resources: nextResources,
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
  return level < upgrade.maxLevel && meetsRequirements(state, upgrade.requires);
}

export function buyUnit(state: GameState, unitId: UnitId): GameState {
  const unit = units.find((item) => item.id === unitId);
  if (!unit || !isUnitUnlocked(state, unit)) return state;

  const cost = getUnitCost(unit, D(state.units[unit.id]));
  if (!hasCosts(state, cost)) return state;

  const nextResources = { ...state.resources };
  for (const item of cost) {
    nextResources[item.resourceId] = D(nextResources[item.resourceId])
      .minus(item.amount)
      .toString();
  }

  return {
    ...state,
    resources: nextResources,
    units: {
      ...state.units,
      [unit.id]: D(state.units[unit.id]).plus(1).toString(),
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
  if (!hasCosts(state, upgrade.cost)) return state;

  const nextResources = { ...state.resources };
  for (const item of upgrade.cost) {
    nextResources[item.resourceId] = D(nextResources[item.resourceId])
      .minus(item.amount)
      .toString();
  }

  return {
    ...state,
    resources: nextResources,
    upgrades: {
      ...state.upgrades,
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

