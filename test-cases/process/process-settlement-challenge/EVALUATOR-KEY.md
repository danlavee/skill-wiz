# Evaluator-only key (never ship to Workers)

**Pass definition:** PLAIN-LANGUAGE.md  
**Map:** Q1↔G1, Q2↔G2 (origin), Q3↔G3 (right process), Q4↔G4 inverted (yes on Q4 = fail G4)

| Record | Expected overall | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|---|
| R1 | does_not_handle (deficient) | no | no | no | yes |
| R2 | handles (clean on residual) | yes | yes | yes | no |

Contamination check: `assignment.md` and records must not contain Path A/B labels, PLAIN-LANGUAGE, “pass/fail exemplar”, or “package prose is not pass” as Worker instruction. Records state facts only.
