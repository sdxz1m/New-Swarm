# New_swarm Agent Rules

This project is a modern Chinese implementation of Swarm Simulator. The user has explicitly set the following project rules. Follow them before making code or data changes.

## Source Of Truth

- `../Old_Swarm` is the source of truth for gameplay logic.
- Do not invent gameplay numbers, unlock requirements, purchase conditions, production rates, upgrade costs, upgrade effects, or progression rules.
- New_swarm may change implementation language, UI structure, and Chinese display text only.
- If Old logic is not yet supported by the New_swarm engine, add the needed engine capability first or mark the item as not migrated. Do not approximate hidden gameplay behavior with new balance.

## Migration Rules

- When migrating units, upgrades, resources, or requirements, read the corresponding Old data first.
- Preserve Old identifiers internally when practical, especially for migrated gameplay concepts.
- Preserve Old `cost`, `prod`, `requires`, `effect`, `init`, `unbuyable`, and related behavior.
- Old `requires` may contain `op: "OR"` branches. Keep the original logical structure instead of simplifying it away.
- Locked/unavailable content should not appear in the visible gameplay panel unless it is already owned or otherwise visible by Old rules.
- If a dependency system is not migrated yet, such as ascension, energy, mutagen, or nexus, keep the original requirement represented as external/pending rather than replacing it with made-up logic.

## Localization Rules

- Chinese text should use `docs/localization/g1tyx-chs-extracted.json` or `docs/localization/g1tyx-chs-extracted.md` as the first reference.
- A term is only "exact" if the extracted localization table has an independent exact entry or an unambiguous UI entry for it.
- Text inferred from descriptions, achievements, or regex replacements is only a phrase inference. Mark it as such in `docs/localization/current-term-audit.md` when used for a unit or upgrade name.
- Do not claim inferred wording is an exact localization-table unit name.
- If no reliable localization exists, add the term to the audit document as pending confirmation instead of inventing a polished translation.
- When correcting localized names or descriptions, prefer the extracted table's wording verbatim.

## Current Important Localization Caveat

- `empress` / `hive empress` currently displays as `主巢女皇`, but this is a phrase inference, not an independent exact unit-name entry in the localization table. See `docs/localization/current-term-audit.md`.

## UI Rules From The User

- The interface should be organized by categories/tabs.
- Each category tab should contain selectable targets.
- Upgrades should live under their related target rather than in one unrelated global list.
- Locked targets and upgrades should not be shown prematurely.

## Verification

- After gameplay or data changes, run:

```bash
./scripts/pnpm.sh test
./scripts/pnpm.sh build
```

- Keep commits scoped to the migration or fix being made.
