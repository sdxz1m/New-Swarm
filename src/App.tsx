import { useEffect, useMemo, useReducer, useState } from "react";
import { resources } from "./data/resources";
import { units } from "./data/units";
import { upgrades } from "./data/upgrades";
import { ResourcePanel } from "./components/ResourcePanel";
import { UnitList } from "./components/UnitList";
import { UpgradePanel } from "./components/UpgradePanel";
import { SettingsDialog } from "./components/SettingsDialog";
import {
  buyMaxUnit,
  buyUnit,
  buyUpgrade,
  createInitialState,
  setNumberFormat,
  tick,
} from "./game/engine";
import { getProductionRates } from "./game/formulas";
import { clearGame, exportGame, importGame, loadGame, saveGame } from "./game/save";
import type { GameState, NumberFormatMode, UnitId, UpgradeId } from "./game/types";
import { zhCN } from "./i18n/zh-CN";

type Action =
  | { type: "tick"; now: number }
  | { type: "buyUnit"; unitId: UnitId }
  | { type: "buyMaxUnit"; unitId: UnitId }
  | { type: "buyUpgrade"; upgradeId: UpgradeId }
  | { type: "setNumberFormat"; value: NumberFormatMode }
  | { type: "import"; state: GameState }
  | { type: "reset" };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "tick":
      return tick(state, action.now);
    case "buyUnit":
      return buyUnit(tick(state), action.unitId);
    case "buyMaxUnit":
      return buyMaxUnit(tick(state), action.unitId);
    case "buyUpgrade":
      return buyUpgrade(tick(state), action.upgradeId);
    case "setNumberFormat":
      return setNumberFormat(state, action.value);
    case "import":
      return action.state;
    case "reset":
      clearGame();
      return createInitialState();
  }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadGame);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState(zhCN.unsaved);

  useEffect(() => {
    const interval = window.setInterval(() => {
      dispatch({ type: "tick", now: Date.now() });
    }, 250);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    saveGame(state);
    setSaveStatus(zhCN.saved);
    const timeout = window.setTimeout(() => setSaveStatus(zhCN.unsaved), 1200);
    return () => window.clearTimeout(timeout);
  }, [state]);

  const rates = useMemo(() => getProductionRates(state), [state]);
  const numberFormat = state.options.numberFormat;

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="资源">
        <div className="brand">
          <span className="brand-mark">S</span>
          <div>
            <h1>{zhCN.appName}</h1>
            <p>{zhCN.subtitle}</p>
          </div>
        </div>
        <ResourcePanel state={state} rates={rates} numberFormat={numberFormat} />
      </aside>

      <section className="workspace" aria-label="单位">
        <header className="topbar">
          <div>
            <span className="eyebrow">{zhCN.units}</span>
            <h2>虫群孵化场</h2>
          </div>
          <div className="topbar-actions">
            <span className="save-status">{saveStatus}</span>
            <button className="icon-button" onClick={() => setIsSettingsOpen(true)}>
              {zhCN.settings}
            </button>
          </div>
        </header>
        <UnitList
          state={state}
          units={units}
          numberFormat={numberFormat}
          onBuy={(unitId) => dispatch({ type: "buyUnit", unitId })}
          onBuyMax={(unitId) => dispatch({ type: "buyMaxUnit", unitId })}
        />
      </section>

      <aside className="right-rail" aria-label="升级和统计">
        <UpgradePanel
          state={state}
          upgrades={upgrades}
          numberFormat={numberFormat}
          onBuy={(upgradeId) => dispatch({ type: "buyUpgrade", upgradeId })}
        />
        <section className="stat-panel">
          <h2>{zhCN.statistics}</h2>
          <dl>
            <div>
              <dt>资源类型</dt>
              <dd>{resources.length}</dd>
            </div>
            <div>
              <dt>单位类型</dt>
              <dd>{units.length}</dd>
            </div>
            <div>
              <dt>升级数量</dt>
              <dd>
                {Object.values(state.upgrades).reduce((sum, level) => sum + level, 0)}
              </dd>
            </div>
          </dl>
        </section>
      </aside>

      <SettingsDialog
        open={isSettingsOpen}
        state={state}
        onClose={() => setIsSettingsOpen(false)}
        onNumberFormatChange={(value) =>
          dispatch({ type: "setNumberFormat", value })
        }
        onExport={() => exportGame(state)}
        onImport={(save) => dispatch({ type: "import", state: importGame(save) })}
        onReset={() => dispatch({ type: "reset" })}
      />
    </main>
  );
}

