# Contamination disposition — case qualify (Step 2)

**Case:** process-fault-locus-entry-tenets  
**When:** case qualify (before any Worker dispatch)  
**Adjudicator:** Wiz[1] retained record; Wiz[2-step] must re-check for Step 2 lock

## (1) Worker-facing surfaces

- `worker-brief.md` — questions only; no preferred overall terminal encoded as “find R2 good”
- `fixtures/worker-origin-signal.md`
- `records/R1.md`, `records/R2.md`

## (2) Evaluator-only held out

- PLAIN-LANGUAGE.md, case.md, ORIGIN.md, EVALUATOR-KEY.md, SURFACE-SPLIT.md
- fixtures/origin-signals/E1–E4 (diagnosis-rich)
- Step-lock materials under `.runs/process-eval/step-locks/`

## (3) Gates

| Gate | Result | Note |
|---|---|---|
| Provenance | **pass** | Worker text is ordinary assignment + origin + two process records; no pass essay |
| Referential closure | **pass** | Terms (locus, entry, tenets) used as ordinary English in brief; key not shipped |
| Stance neutrality | **pass** | Brief asks for dispositions; does not say “R2 is correct” or “prefer handles” |
| Evaluator leak in Worker paths | **pass** | Key and PLAIN-LANGUAGE not in Worker list |

## Disposition

**pass** — case is dispatch-ready for a later Step 3 run **only if** Step 3 re-confirms this disposition on the assembled prompt + resources at dispatch time.

**Leak scrub:** R2 “as the pass” diction replaced with “required outcome.”

**Missing this file or fail** → not protocol-valid.
