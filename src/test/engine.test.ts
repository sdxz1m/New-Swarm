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

  it("supports original unit-producing-unit chains", () => {
    const state = {
      ...createInitialState(0),
      units: {
        drone: "0",
        queen: "0",
        nest: "0",
        greaterqueen: "1",
        hive: "0",
        hivequeen: "0",
        empress: "0",
        swarmling: "0",
        stinger: "0",
        spider: "0",
        mosquito: "0",
        locust: "0",
      },
    };

    const next = tick(state, 10_000);

    expect(D(next.units.nest).eq("40")).toBe(true);
  });

  it("supports migrated territory combat units", () => {
    const state = {
      ...createInitialState(0),
      units: {
        drone: "0",
        queen: "0",
        nest: "0",
        greaterqueen: "0",
        hive: "0",
        hivequeen: "0",
        empress: "0",
        swarmling: "0",
        stinger: "1",
        spider: "0",
        mosquito: "0",
        locust: "0",
      },
    };

    const next = tick(state, 10_000);

    expect(D(next.resources.territory).eq("31.5")).toBe(true);
  });
});
