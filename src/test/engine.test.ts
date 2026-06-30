import { describe, expect, it } from "vitest";
import { buyUnit, createInitialState, tick } from "../game/engine";
import { D } from "../game/decimal";

describe("game engine", () => {
  it("creates the MVP starting resources", () => {
    const state = createInitialState(0);

    expect(state.resources.meat).toBe("35");
    expect(state.resources.larva).toBe("10");
    expect(state.resources.territory).toBe("0");
  });

  it("buys a drone with one larva", () => {
    const state = createInitialState(0);
    const next = buyUnit(state, "drone");

    expect(next.units.drone).toBe("1");
    expect(next.resources.larva).toBe("9");
  });

  it("ticks unit production forward", () => {
    const state = buyUnit(createInitialState(0), "drone");
    const next = tick(state, 10_000);

    expect(D(next.resources.meat).eq("35")).toBe(true);
  });
});
