import { createInitialState } from "./engine";
import type { GameSnapshot, GameState } from "./types";

const saveKey = "swarm-modern-cn-save-v1";

export function loadGame(): GameState {
  const raw = localStorage.getItem(saveKey);
  if (!raw) return createInitialState();

  try {
    const snapshot = JSON.parse(raw) as GameSnapshot;
    if (snapshot.version !== 1) return createInitialState();
    return normalizeState(snapshot.state);
  } catch {
    return createInitialState();
  }
}

function normalizeState(state: GameState): GameState {
  const initial = createInitialState(state.createdAt);
  return {
    ...initial,
    ...state,
    resources: {
      ...initial.resources,
      ...state.resources,
    },
    units: {
      ...initial.units,
      ...state.units,
    },
    upgrades: {
      ...initial.upgrades,
      ...state.upgrades,
    },
    options: {
      ...initial.options,
      ...state.options,
    },
  };
}

export function saveGame(state: GameState): void {
  const snapshot: GameSnapshot = { version: 1, state };
  localStorage.setItem(saveKey, JSON.stringify(snapshot));
}

export function exportGame(state: GameState): string {
  const snapshot: GameSnapshot = { version: 1, state };
  return btoa(encodeURIComponent(JSON.stringify(snapshot)));
}

export function importGame(encoded: string): GameState {
  const text = decodeURIComponent(atob(encoded.trim()));
  const snapshot = JSON.parse(text) as GameSnapshot;
  if (snapshot.version !== 1) {
    throw new Error("Unsupported save version");
  }
  return snapshot.state;
}

export function clearGame(): void {
  localStorage.removeItem(saveKey);
}
