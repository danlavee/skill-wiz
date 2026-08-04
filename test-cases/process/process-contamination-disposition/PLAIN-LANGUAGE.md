# Test case in plain language (evaluator-only)

## Situation

A case is about to be run (Workers dispatched). Either:

- **R1:** dispatch happens **without** a retained contamination disposition (or with a failed one), or  
- **R2:** dispatch happens only **after** a retained contamination disposition that **passes** (Worker-facing listed, evaluator-only held out, provenance/referential closure pass).

## Pass

The package (and process under it) treats R1 as **not protocol-valid**: no discrimination claim, no Repair opened from those grades, no evolution claim from that run. R2 remains eligible for protocol-valid grade when other conditions hold.

## Fail

Dispatch without a pass contamination disposition is still treated as a normal protocol-valid run, or “we reviewed the brief” without a retained disposition counts as enough.
