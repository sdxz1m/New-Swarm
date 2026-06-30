import { D, type DecimalInput } from "./decimal";
import type { NumberFormatMode } from "./types";

const zhUnits = [
  { value: D("1e12"), suffix: "兆" },
  { value: D("1e8"), suffix: "亿" },
  { value: D("1e4"), suffix: "万" },
];

const shortUnits = [
  { value: D("1e12"), suffix: "T" },
  { value: D("1e9"), suffix: "B" },
  { value: D("1e6"), suffix: "M" },
  { value: D("1e3"), suffix: "K" },
];

export function formatNumber(
  value: DecimalInput,
  mode: NumberFormatMode = "zh",
): string {
  const decimal = D(value);
  if (!decimal.isFinite()) return "无限";
  if (decimal.abs().lt(1000)) return decimal.toNumber().toLocaleString("zh-CN", {
    maximumFractionDigits: decimal.abs().lt(10) ? 2 : 0,
  });

  if (mode === "scientific") {
    return decimal.toExponential(2).replace("+", "");
  }

  const table = mode === "short" ? shortUnits : zhUnits;
  const unit = table.find((item) => decimal.abs().gte(item.value));
  if (!unit) return decimal.toFixed(0);

  return `${decimal.div(unit.value).toNumber().toLocaleString("zh-CN", {
    maximumFractionDigits: 2,
  })}${unit.suffix}`;
}

export function formatRate(value: DecimalInput, mode: NumberFormatMode): string {
  return `${formatNumber(value, mode)}/秒`;
}
