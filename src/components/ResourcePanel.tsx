import { resources } from "../data/resources";
import { D, Decimal } from "../game/decimal";
import { formatNumber, formatRate } from "../game/numberFormat";
import type { AmountId, GameState, NumberFormatMode } from "../game/types";

interface ResourcePanelProps {
  state: GameState;
  rates: Record<AmountId, Decimal>;
  numberFormat: NumberFormatMode;
}

export function ResourcePanel({
  state,
  rates,
  numberFormat,
}: ResourcePanelProps) {
  return (
    <section className="resource-panel">
      {resources.map((resource) => (
        <article className="resource-row" key={resource.id}>
          <div>
            <h2>{resource.text.name}</h2>
            <p>{resource.text.description}</p>
          </div>
          <div className="resource-values">
            <strong>{formatNumber(D(state.resources[resource.id]), numberFormat)}</strong>
            <span>{formatRate(rates[resource.id], numberFormat)}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
