import { useMemo } from "react";
import { tabs } from "../data/tabs";
import { upgrades } from "../data/upgrades";
import { D } from "../game/decimal";
import {
  amountName,
  getUnitCost,
  getUnitMultiplier,
  getUnitProductionAddend,
  getUpgradeCost,
  hasCosts,
  isUnitVisible,
  meetsRequirements,
} from "../game/formulas";
import { formatNumber, formatRate } from "../game/numberFormat";
import type {
  GameState,
  NumberFormatMode,
  TabId,
  UnitDefinition,
  UnitId,
  UpgradeId,
} from "../game/types";
import { zhCN } from "../i18n/zh-CN";

interface TargetWorkspaceProps {
  state: GameState;
  units: UnitDefinition[];
  activeTabId: TabId;
  selectedUnitId: UnitId;
  numberFormat: NumberFormatMode;
  onTabChange: (tabId: TabId) => void;
  onTargetChange: (unitId: UnitId) => void;
  onBuy: (unitId: UnitId) => void;
  onBuyMax: (unitId: UnitId) => void;
  onBuyUpgrade: (upgradeId: UpgradeId) => void;
}

export function TargetWorkspace({
  state,
  units,
  activeTabId,
  selectedUnitId,
  numberFormat,
  onTabChange,
  onTargetChange,
  onBuy,
  onBuyMax,
  onBuyUpgrade,
}: TargetWorkspaceProps) {
  const visibleUnits = useMemo(
    () =>
      units
        .filter((unit) => isUnitVisible(state, unit))
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [state, units],
  );
  const visibleTabs = useMemo(
    () =>
      tabs
        .filter((tab) => visibleUnits.some((unit) => unit.tabId === tab.id))
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [visibleUnits],
  );
  const activeTab =
    visibleTabs.find((tab) => tab.id === activeTabId) ?? visibleTabs[0];
  const tabUnits = useMemo(
    () =>
      activeTab
        ? visibleUnits
            .filter((unit) => unit.tabId === activeTab.id)
            .sort((a, b) => a.sortOrder - b.sortOrder)
        : [],
    [activeTab, visibleUnits],
  );
  const selectedUnit =
    tabUnits.find((unit) => unit.id === selectedUnitId) ?? tabUnits[0];

  if (!activeTab || !selectedUnit) {
    return null;
  }

  const unitCost = getUnitCost(selectedUnit);
  const unitUnlocked = meetsRequirements(state, selectedUnit.requires);
  const unitCanBuy =
    selectedUnit.isBuyable !== false && unitUnlocked && hasCosts(state, unitCost);
  const selectedUpgrades = upgrades
    .filter((upgrade) => upgrade.unitId === selectedUnit.id)
    .filter((upgrade) => {
      const level = state.upgrades[upgrade.id] ?? 0;
      return (
        level > 0 ||
        (level < upgrade.maxLevel && meetsRequirements(state, upgrade.requires))
      );
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="target-workspace">
      <nav className="tab-strip" aria-label="类型">
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeTab.id ? "tab-button active" : "tab-button"}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </nav>

      <div className="target-layout">
        <aside className="target-list" aria-label={`${activeTab.name}目标`}>
          <div className="target-list-header">
            <h3>{activeTab.name}</h3>
            <p>{activeTab.description}</p>
          </div>
          {tabUnits.map((unit) => (
            <button
              key={unit.id}
              className={
                unit.id === selectedUnit.id ? "target-button active" : "target-button"
              }
              onClick={() => onTargetChange(unit.id)}
            >
              <span>{unit.text.name}</span>
              <strong>{formatNumber(state.units[unit.id], numberFormat)}</strong>
            </button>
          ))}
        </aside>

        <section className="target-detail" aria-label={`${selectedUnit.text.name}详情`}>
          <header className="target-detail-header">
            <div>
              <span className="eyebrow">目标</span>
              <h2>{selectedUnit.text.name}</h2>
              <p>{selectedUnit.text.description}</p>
            </div>
            <div className="target-owned">
              <span>{zhCN.owned}</span>
              <strong>
                {formatNumber(state.units[selectedUnit.id], numberFormat)}
              </strong>
            </div>
          </header>

          <div className="target-sections">
            <section className="target-section">
              <h3>生产</h3>
              <div className="metric-grid">
                {selectedUnit.produces.map((production) => (
                  <div key={production.amountId} className="metric-box">
                    <span>{amountName(production.amountId)}</span>
                    <strong>
                      {formatRate(
                        D(production.amountPerSecond)
                          .plus(getUnitProductionAddend(state, selectedUnit.id))
                          .times(D(state.units[selectedUnit.id]).floor())
                          .times(getUnitMultiplier(state, selectedUnit.id)),
                        numberFormat,
                      )}
                    </strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="target-section">
              <h3>{zhCN.cost}</h3>
              <div className="cost-list">
                {selectedUnit.isBuyable === false
                  ? "不可直接购买"
                  : unitUnlocked
                  ? unitCost.map((item) => (
                      <span key={item.amountId}>
                        {amountName(item.amountId)}{" "}
                        {formatNumber(item.amount, numberFormat)}
                      </span>
                    ))
                  : zhCN.unavailable}
              </div>
              <div className="row-actions target-actions">
                {selectedUnit.isBuyable !== false && (
                  <>
                    <button disabled={!unitCanBuy} onClick={() => onBuy(selectedUnit.id)}>
                      {zhCN.buy}
                    </button>
                    <button
                      disabled={!unitCanBuy}
                      onClick={() => onBuyMax(selectedUnit.id)}
                    >
                      {zhCN.buyMax}
                    </button>
                  </>
                )}
              </div>
            </section>

            <section className="target-section">
              <h3>{zhCN.upgrades}</h3>
              <div className="embedded-upgrades">
                {selectedUpgrades.map((upgrade) => {
                  const level = state.upgrades[upgrade.id] ?? 0;
                  const cost = getUpgradeCost(upgrade, level);
                  const unlocked =
                    level < upgrade.maxLevel &&
                    meetsRequirements(state, upgrade.requires);
                  const canBuy = unlocked && hasCosts(state, cost);

                  return (
                    <article
                      className="upgrade-card"
                      key={upgrade.id}
                      aria-disabled={!unlocked}
                    >
                      <div>
                        <h4>{upgrade.text.name}</h4>
                        <p>{upgrade.text.description}</p>
                      </div>
                      <div className="upgrade-meta">
                        <span>等级 {level}</span>
                        <div className="cost-list">
                          {unlocked
                            ? cost.map((item) => (
                                <span key={item.amountId}>
                                  {amountName(item.amountId)}{" "}
                                  {formatNumber(item.amount, numberFormat)}
                                </span>
                              ))
                            : zhCN.unavailable}
                        </div>
                      </div>
                      <button disabled={!canBuy} onClick={() => onBuyUpgrade(upgrade.id)}>
                        {zhCN.buy}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
