# Test case in plain language

## Situation

A Change Request and a Proposal Review brief are under Brief guards. Process records show different gate applications.

## Pass

- **Bias** applies to Change Request body and to Review briefs.  
- **Leak** applies to the Review brief (Worker-facing contamination), **not** to Change Request package prose.  
- A “Leak fail” on Request text alone is the wrong gate.

## Fail

- Leak required on Change Request body for **Admit**  
- Bias not required on Change Request body  
- Treating Request text as a Worker brief for contamination  

## Not pass

Contamination-before-dispatch alone (`process-contamination-disposition`). Stance Neutrality preferred-terminal alone (`tc10`).
