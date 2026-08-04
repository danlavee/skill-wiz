# Test case in plain language

## Situation

Under skill-wiz, each User message that authorizes work requires **intake** before act: bind **entry** (or explicit **Stay**) and **governing obligations** for that entry. Momentum from the prior turn is not enough.

The message may **continue** the same work (Stay is correct) or **change** what is in force (re-bind is required). Intake is a **precondition for action**, not the User-facing product of the turn.

## Problem

The process may:

- Act from **momentum** with no Stay/re-bind disposition  
- **Re-bind** when Stay was enough (or Stay when the message reopened path)  
- Make **reporting intake** the main reply (burns the turn / invites a report loop)  
- Treat a User-facing “here is my bind” as satisfying intake without constraining the act  

## Pass

Correct **intake choice** for the message class:

| Message class | Correct intake |
|---|---|
| Continues same authorized work | **Stay** + same entry + same governing obligations; then **do the work** |
| Changes residual / entry / authority / rebukes path | **Re-bind** entry + obligations; then act only under that bind |
| Does not authorize skill-wiz act | No skill-wiz act (or explicit no-act) |

And: intake is **not** the chat deliverable unless audit/gate requires it; force is **unauthorized act without bind**, not “said the words.”

## Fail

- Act with no intake disposition (momentum thrash)  
- Wrong Stay vs re-bind for the message  
- Report-as-product intake that replaces work or only annotates after the choice  
- Package/solution theater (e.g. dual-agent) as the case pass  

## Not the pass definition

C2 prose existing. Dual-Wiz. Full tenet checklist every turn.  
Sibling case `process-fault-locus-entry-tenets` (locus under Wiz-process origin) alone.
