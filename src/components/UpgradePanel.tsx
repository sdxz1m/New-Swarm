import {
  amountName,
  getUpgradeCost,
  hasCosts,
  meetsRequirements,
} from "../game/formulas";
import { formatNumber } from "../game/numberFormat";
import type {
  GameState,
  NumberFormatMode,
  UpgradeDefinition,
  UpgradeId,
} from "../game/types";
import { zhCN } from "../i18n/zh-CN";

interface UpgradePanelProps {
  state: GameState;
  upgrades: UpgradeDefinition[];
  numberFormat: NumberFormatMode;
  onBuy: (upgradeId: UpgradeId) => void;
}

export function UpgradePanel({
  state,
  upgrades,
  numberFormat,
  onBuy,
}: UpgradePanelProps) {
  return (
    <section className="upgrade-panel">
      <h2>{zhCN.upgrades}</h2>
      <div className="upgrade-list">
        {upgrades.map((upgrade) => {
          const level = state.upgrades[upgrade.id] ?? 0;
          const cost = getUpgradeCost(upgrade, level);
          const unlocked =
            level < upgrade.maxLevel && meetsRequirements(state, upgrade.requires);
          const canBuy = unlocked && hasCosts(state, cost);

          return (
            <article className="upgrade-card" key={upgrade.id} aria-disabled={!unlocked}>
              <div>
                <h3>{upgrade.text.name}</h3>
                <p>{upgrade.text.description}</p>
              </div>
              <div className="cost-list">
                {unlocked
                  ? cost.map((item) => (
                      <span key={item.amountId}>
                        {amountName(item.amountId)}{" "}
                        {formatNumber(item.amount, numberFormat)}
                      </span>
                    ))
                  : level >= upgrade.maxLevel
                    ? "已完成"
                    : zhCN.unavailable}
              </div>
              <button disabled={!canBuy} onClick={() => onBuy(upgrade.id)}>
                {zhCN.buy}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
