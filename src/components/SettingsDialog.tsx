import type { GameState, NumberFormatMode } from "../game/types";
import { zhCN } from "../i18n/zh-CN";

interface SettingsDialogProps {
  open: boolean;
  state: GameState;
  onClose: () => void;
  onNumberFormatChange: (value: NumberFormatMode) => void;
  onExport: () => string;
  onImport: (value: string) => void;
  onReset: () => void;
}

export function SettingsDialog({
  open,
  state,
  onClose,
  onNumberFormatChange,
  onExport,
  onImport,
  onReset,
}: SettingsDialogProps) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="settings-dialog" role="dialog" aria-modal="true">
        <header>
          <h2>{zhCN.settings}</h2>
          <button onClick={onClose}>{zhCN.close}</button>
        </header>

        <label className="field-row">
          <span>{zhCN.numberFormat}</span>
          <select
            value={state.options.numberFormat}
            onChange={(event) =>
              onNumberFormatChange(event.target.value as NumberFormatMode)
            }
          >
            <option value="zh">中文单位</option>
            <option value="short">英文缩写</option>
            <option value="scientific">科学计数法</option>
          </select>
        </label>

        <div className="save-tools">
          <button
            onClick={() => {
              void navigator.clipboard?.writeText(onExport());
            }}
          >
            {zhCN.export}
          </button>
          <button
            onClick={() => {
              const value = window.prompt("粘贴存档文本");
              if (value) onImport(value);
            }}
          >
            {zhCN.import}
          </button>
          <button
            className="danger"
            onClick={() => {
              if (window.confirm("确认重置当前存档？")) onReset();
            }}
          >
            {zhCN.reset}
          </button>
        </div>
      </section>
    </div>
  );
}

