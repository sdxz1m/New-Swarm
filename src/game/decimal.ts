import Decimal from "break_eternity.js";

export { Decimal };

export type DecimalInput = string | number | Decimal;

export function D(value: DecimalInput): Decimal {
  return new Decimal(value);
}

export function zero(): Decimal {
  return new Decimal(0);
}

export function one(): Decimal {
  return new Decimal(1);
}
