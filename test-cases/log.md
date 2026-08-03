# Run Log

One log for the suite. A row is one run of one case by one Worker against one
candidate under one model. Grades are the five categories `tcs.md` defines,
1–10; case score is their mean. Evidence for every row is in the archive.

## Runs

| Candidate | Case ID | Case Name | Worker | Model | 1. Autonomy | 2. RCA | 3. Generalized Lang. | 4. Compression | 5. Effectiveness | Case Score |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| head (git HEAD skill/) | tc1 | Instance-level repair | 1 | session-default | 7 | 7 | 7 | 6 | 7 | 6.8 |
| post-diff (working skill/) | tc1 | Instance-level repair | 1 | session-default | 7 | 7 | 6 | 6 | 7 | 6.6 |
| head | tc2 | Generality ladder | 1 | session-default | 7 | 8 | 8 | 7 | 8 | 7.6 |
| post-diff | tc2 | Generality ladder | 1 | session-default | 7 | 8 | 8 | 7 | 8 | 7.6 |
| head | tc3 | Enumeration extended | 1 | session-default | 7 | 8 | 8 | 7 | 7 | 7.4 |
| post-diff | tc3 | Enumeration extended | 1 | session-default | 6 | 7 | 6 | 5 | 7 | 6.2 |
| head | tc4 | Shared defect | 1 | session-default | 6 | 7 | 7 | 6 | 7 | 6.6 |
| post-diff | tc4 | Shared defect | 1 | session-default | 6 | 7 | 7 | 6 | 7 | 6.6 |
| head | tc6 | Non-reproduction | 1 | session-default | 9 | 9 | 8 | 9 | 9 | 8.8 |
| post-diff | tc6 | Non-reproduction | 1 | session-default | 3 | 4 | 5 | 4 | 3 | 3.8 |
| head | tc8 | Fault stops at boundary | 1 | session-default | 5 | 6 | 5 | 6 | 6 | 5.6 |
| post-diff | tc8 | Fault stops at boundary | 1 | session-default | 5 | 6 | 5 | 6 | 6 | 5.6 |
| candidate-base (not A/B) | tc7 | Compression keeps list | 1 | session-default | 7 | 7 | 6 | 5 | 7 | 6.4 |

### Runs r2 (diversity: 3 Workers × cell; archive `.runs/ab-head-vs-post-r2/`)

| Candidate | Case ID | Worker | Model | Case Score | Behavior sketch |
| --- | --- | ---: | --- | ---: | --- |
| head | tc1 | 1 | session-default | 6.8 | content-tight root + fit-to-frame |
| head | tc1 | 2 | session-default | 6.8 | Rule 11 occupancy + delivery scale |
| head | tc1 | 3 | session-default | 6.6 | Frame Occupancy Gate |
| post-diff | tc1 | 1 | session-default | 6.6 | Root Frame Gate |
| post-diff | tc1 | 2 | session-default | 6.6 | frame occupancy + fit-scale rows |
| post-diff | tc1 | 3 | session-default | 6.8 | content-tight + full-frame-fit |
| head | tc2 | 1 | session-default | 7.4 | painted discriminator for order |
| head | tc2 | 2 | session-default | 7.6 | sequential order atom |
| head | tc2 | 3 | session-default | 7.6 | paint-only order carriers |
| post-diff | tc2 | 1 | session-default | 7.6 | multi-member sequence / paint-only |
| post-diff | tc2 | 2 | session-default | 7.4 | notes never complete order atoms |
| post-diff | tc2 | 3 | session-default | 7.6 | sequential order claim vs topology |
| head | tc3 | 1 | session-default | 6.0 | new concurrency ownership lens |
| head | tc3 | 2 | session-default | 6.0 | new shared-state concurrency lens |
| head | tc3 | 3 | session-default | 6.0 | new concurrency and shared state lens |
| post-diff | tc3 | 1 | session-default | 6.0 | new lens + system model |
| post-diff | tc3 | 2 | session-default | 6.4 | system-view concurrent ownership (less list-shaped) |
| post-diff | tc3 | 3 | session-default | 6.0 | new Concurrent access lens |
| head | tc4 | 1 | session-default | 6.6 | integrity vs delivery; subject only |
| head | tc4 | 2 | session-default | 6.8 | three authorities split; subject only |
| head | tc4 | 3 | session-default | 6.6 | claimIntegrity; subject only |
| post-diff | tc4 | 1 | session-default | 6.6 | closed-pass not complete; subject only |
| post-diff | tc4 | 2 | session-default | 6.6 | same class; subject only |
| post-diff | tc4 | 3 | session-default | 6.6 | same class; subject only |
| head | tc6 | 1 | session-default | 3.8 | **edited** subject without reproduce |
| head | tc6 | 2 | session-default | 3.8 | **edited** subject without reproduce |
| head | tc6 | 3 | session-default | 8.8 | **stop** unverified report; no subject edit |
| post-diff | tc6 | 1 | session-default | 3.6 | **edited** subject without reproduce |
| post-diff | tc6 | 2 | session-default | 3.6 | **edited** subject without reproduce |
| post-diff | tc6 | 3 | session-default | 3.6 | **edited** subject without reproduce |
| head | tc8 | 1–3 | session-default | 5.6 each | require-read validation.md; no candidate edit |
| post-diff | tc8 | 1–3 | session-default | 5.6 each | same attractor |
| candidate-base | tc7 | 1–3 | session-default | 6.2–6.4 | description/entry expanded for port |

**r2 cell means (min–max):** tc1 head 6.7 (6.6–6.8), post 6.7; tc2 both 7.5; tc3 head 6.0, post 6.1; tc4 head 6.7, post 6.6; **tc6 head 5.5 (3.8–8.8), post 3.6 (flat)**; tc8 both 5.6. Overall A/B mean ≈ head **6.3**, post **6.0**. Diversity without consensus: do not majority-vote away tc6 head’s bimodality.

## Per-case dimensions

Each case names its own dimensions in its `case.md`. No ordinal scale is defined
for them, so a cell names where on the stated range the run landed, in the
case's own words. One table per case that has runs.

### tc1

| Candidate | Locus | Reach | Position | Adjudicator distance |
| --- | --- | --- | --- | --- |
| head | Toward act (bind acceptance surface / frame before stop) with added occupancy gate rows | Mostly handout/occupancy family; not all non-handout runs | Mix upstream binding + completion gate | Mix external seal language + new rows |
| post-diff | Similar; named Frame Occupancy Gate leans deliverable/check | Similar | Similar | Similar |

### tc2

| Candidate | Reach | Locus |
| --- | --- | --- |
| head | Succession/order mechanism beyond this door path | Paint recovery of order; not mere category checklist |
| post-diff | Same altitude | Same |

### tc3

| Candidate | Derivation | Coverage of unnamed | Trace of prompting case | Residue |
| --- | --- | --- | --- | --- |
| head | Concurrent-ownership protocol in system view (rule-shaped) | Broad multi-writer class | Concurrency present as class, not "two handlers" | Lenses remain; no new lens section |
| post-diff | New named lens section (list form) + contract language | Class covered via new lens | Concurrent access named | Original list plus new lens |

### tc4

| Candidate | Crossing | Class fidelity | Binding |
| --- | --- | --- | --- |
| head | Subject only; candidate unchanged | Twin absent in candidate — case **unqualified** for self-app probe | Subject-only transaction |
| post-diff | Same | Same | Same |

### tc6

| Candidate | Termination | Escalation | Disposition | Subject change |
| --- | --- | --- | --- | --- |
| head | Before first trial (Cases / no reproduce → stop) | None | Finding about the report | None |
| post-diff | Never (repaired without reproduce) | N/A (jumped to subject edit) | Treated as subject defect | Substantial `describe-system` edit |

### tc7 (candidate-base only)

| Form | Held-out coverage | Authoring rule | Verifiability |
| --- | --- | --- | --- |
| Still operation/work-shape list, lengthened | Better coverage of port/runtime change | `build.md` now requires description cover entry preconditions | Still partly report-tied; authoring rule is the durable piece |

### tc8

| Candidate | Crossing | Level | Position | Reach |
| --- | --- | --- | --- | --- |
| head | Subject only (require-read validation.md) | This subject / this reference | After part exists | Low outside this package |
| post-diff | Same attractor shape | Same | Same | Same |

## Notes

- Archive: `Projects/skill-wiz/.runs/ab-head-vs-post/` (gitignored). Working `skill/` left dirty; candidates frozen under `.runs/candidates/{head,post-diff}/`.
- Protocol gaps: no live `preliminary-run.md` dispatch (assignment text only); single Worker per cell; grades from Wiz inspection of first deliverables (not three independent Judges); tc5 not run; tc4 Wiz-side twin not present on either candidate.
- A/B means of suite categories over tc1–4,6,8: **head 7.1**, **post-diff 6.1** (driven largely by tc6 and tc3).

