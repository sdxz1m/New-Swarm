import {
  getResourceMultiplier,
  getUnitCost,
  getUnitMultiplier,
  hasCosts,
  meetsRequirements,
  resourceById,
} from "../game/formulas";
import { D } from "../game/decimal";
import { formatNumber, formatRate } from "../game/numberFormat";
import type {
  GameState,
  NumberFormatMode,
  UnitDefinition,
  UnitId,
} from "../game/types";
import { zhCN } from "../i18n/zh-CN";

interface UnitListProps {
  state: GameState;
  units: UnitDefinition[];
  numberFormat: NumberFormatMode;
  onBuy: (unitId: UnitId) => void;
  onBuyMax: (unitId: UnitId) => void;
}

export function UnitList({
  state,
  units,
  numberFormat,
  onBuy,
  onBuyMax,
}: UnitListProps) {
  return (
    <div className="unit-list">
      {units.map((unit) => {
        const unlocked = meetsRequirements(state, unit.requires);
        const cost = getUnitCost(unit, D(state.units[unit.id]));
        const canBuy = unlocked && hasCosts(state, cost);

        return (
          <article className="unit-row" key={unit.id} aria-disabled={!unlocked}>
            <div className="unit-copy">
              <h3>{unit.text.name}</h3>
              <p>{unit.text.description}</p>
            </div>
            <div className="unit-metrics">
              <span>{zhCN.owned}</span>
              <strong>{formatNumber(state.units[unit.id], numberFormat)}</strong>
            </div>
            <div className="unit-metrics">
              <span>{zhCN.production}</span>
              <strong>
                {unit.produces
                  .map((production) =>
                    formatRate(
                      D(production.amountPerSecond)
                        .times(state.units[unit.id])
                        .times(getUnitMultiplier(state, unit.id))
                        .times(getResourceMultiplier(state, production.resourceId)),
                      numberFormat,
                    ),
                  )
                  .join(" / ")}
              </strong>
            </div>
            <div className="cost-list">
              {unlocked
                ? cost.map((item) => (
                    <span key={item.resourceId}>
                      {resourceById[item.resourceId].text.name}{" "}
                      {formatNumber(item.amount, numberFormat)}
                    </span>
                  ))
                : zhCN.unavailable}
            </div>
            <div className="row-actions">
              <button disabled={!canBuy} onClick={() => onBuy(unit.id)}>
                {zhCN.buy}
              </button>
              <button disabled={!canBuy} onClick={() => onBuyMax(unit.id)}>
                {zhCN.buyMax}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
