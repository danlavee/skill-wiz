# Contamination disposition — case qualify

**Case:** process-intake-choice  

## (1) Worker-facing

- worker-brief.md  
- user-message.md (from msg-continue or msg-reopen)  
- R1–R4  

## (2) Evaluator-only

- PLAIN-LANGUAGE, case, ORIGIN, EVALUATOR-KEY, SURFACE-SPLIT  
- This file’s preferred terminals  

## (3) Gates

| Gate | Result |
|---|---|
| Provenance | **pass** — ordinary message + behavior records; no key in Worker text |
| Stance neutrality | **pass** — brief asks dispositions; does not say R3/R4 is correct |
| Report/pass leak | **pass** — no “prefer handles” / “R3 is pass” in brief |

**Disposition: pass** (re-qualify after leak scrub: R3/R4 class labels removed) — dispatch-ready when re-confirmed at Run with assembled prompt.

**Prior fail:** R3/R4 parentheticals encoded message-class → correct choice; scrubbed.
