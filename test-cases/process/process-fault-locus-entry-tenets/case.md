# Case: process-fault-locus-entry-tenets

**Status:** problem case frozen (Step 1). Not a solution TC.  
**Governor:** skill-wiz  
**Chain:** Observe → Cases (this case) → Run base → …  
**Origin:** User signals in skill-wiz / diagrams session that failures were Wiz-process (mis-attribution, thrash, wrong residual class). See `fixtures/origin-signals/`.

## Obligation under test

When the origin signal marks **Wiz process** as the fault class, the process under test must identify:

1. **Locus** = Wiz process (not subject craft; not skill-testing process as substitute)  
2. **Entry** = correct deficient-path / workflow entry for that residual  
3. **Applicable tenets** = tenets in force for that entry (named set, not “all” and not none)

## Object conditions

| Residual open | Residual closed (for this case) |
|---|---|
| Act or claim progress while A/B/C wrong or unset under Wiz-process origin | A + B + C identified and held for that origin before control/apply/subject thrash |

## What this case does not grade

- Subject diagram quality  
- Whether dual-Wiz or any other control is implemented  
- Contamination-before-dispatch alone  
- Settlement-external residual definition alone  

## Evaluator-only

This file, `PLAIN-LANGUAGE.md`, `EVALUATOR-KEY.md` (when present), expected dispositions, path labels R1/R2 fail/pass. Never Worker-facing without contamination redesign.
