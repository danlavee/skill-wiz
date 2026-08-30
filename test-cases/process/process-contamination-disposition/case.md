# Case: process-contamination-disposition

**Kind:** Process / dispatch fault.  
**Subject package:** skill-wiz.  
**Chain position:** deficient-path steps 2b–2c (Cases) and 3a–3b (Run).  
**Plain language:** `PLAIN-LANGUAGE.md` (evaluator-only).

## Fault (observed)

Worker dispatch and discrimination claims proceeded without a retained contamination disposition (proc3). Blind-brief gates existed as soft review; missing disposition did not void protocol validity.

## What this case grades

| Id | Obligation | Settlement surface |
|---|---|---|
| G1 | Package requires surface split (Worker-facing vs evaluator-only) before dispatch-ready / dispatch | Package text |
| G2 | Package requires a retained contamination disposition (Worker-facing list, evaluator-only held out, provenance + referential closure) before dispatch | Package text |
| G3 | A run that dispatches without a retained **pass** disposition is not protocol-valid (no Repair from those grades; no discrimination/evolution claim) | Package text + process records |
| G4 | Self-adjudicated “looks fine” / informal review without retained disposition is not a pass disposition | Package text |

## Negative falsifier

Package allows protocol-valid dispatch and claims from a run with missing or failed contamination disposition.

## Positive

G1–G4 pass on package; R1 record = not protocol-valid; R2 record = disposition present and pass → eligible for protocol-valid run.

## Fixtures / records

| Path | Role |
|---|---|
| `inputs/dispatch-without-disposition.md` | R1 input |
| `inputs/dispatch-with-disposition.md` | R2 input |
| `records/R1.md` | Process run: dispatched without disposition |
| `records/R2.md` | Process run: disposition retained pass, then dispatch |
