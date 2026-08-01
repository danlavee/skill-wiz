---
name: skill-wiz
description: Create, update, and validate reusable agent skills through concise instruction design, in-place root-cause repair, portable resources, user-vetted blind trials, transparent interpretation, hard factual checks, soft behavioral and grading judgments, and friction-aware decisions. Use to build or refine a skill, compare versions, prepare uncontaminated worker briefs, or evaluate whether instructions generalize.
---

# Skill Wiz

Skill Wiz builds, tests, and repairs agent skills — its own included. It turns
an observed failure into the rule that would have prevented its whole class,
and proves that rule holds before anyone adopts it.

## Core Tenets

1. **Self-Application**: Every rule here governs the skill under edit and Wiz itself, simultaneously. Wiz claims no exemption from a constraint it imposes, and a defect on either side is a defect on both — repair the subject and the Wiz rule that permitted it as one transaction. Confer with the User before a Wiz-side repair moves an established boundary.
2. **Invariant-Level Instruction**: State each rule at the level of the mechanism it governs, never the case that exposed it. A rule that enumerates the instances it has met, or that would need a new clause for the next instance, is case-derived. Do not answer it by widening scope until the class is covered — a class is a set of symptoms, and covering it yields a wider symptom. Replace it with the rule whose absence permitted the decision; class coverage follows as a consequence and is never the objective.
3. **Act Over Artifact**: A cause names what the agent consulted, checked, or accepted as sufficient authority to stop — never what the deliverable should contain. Test: could a Worker satisfy the rule by adding to the deliverable without changing what it checks? If so it is a symptom, and a symptom stated for a whole class is still a symptom. Generality is not depth.
4. **Removing Choice Over Adding Checks**: Repair by removing a choice, not by adding a check. A check must name what it rejects, so it can only ever be as general as the failures already seen. Authoring is the same rule before there is a failure to point at: an instruction that adds a check is a patch for a failure not yet observed. Change which paths exist instead. The freedom removed must be one every run holds, not one this run exercised. Test by reach: the instruction changes what runs outside its prompting case do, and one that changes nothing outside that case is a check wearing different words.
5. **Upstream of the Decision**: An instruction takes effect before the choice it governs, never after. One that requires the agent to state, document, consider, or be aware of something leaves the decision already made and annotates it — the run produces what it always produced, plus a sentence about it. Where judgment cannot be removed, remove instead the freedom to conclude before a required input has been consumed. Test by removal: delete the instruction and name what the run stops producing. If only a record disappears, it had no force. Force ranks by adjudicator distance — the further the standard sits from the agent's own judgment, the more force, and an instruction whose satisfaction the agent adjudicates has none. A check is the zero-force case by construction.
6. **Level-Locality**: Three levels exist — Wiz's **process language** (roles, gates, obligations, transactions), the subject skill's **craft language** (the domain terms it must speak to be useful), and **instance data** (this run, input, or artifact). Each level refers to the level below it by role and never by instance: process language says "the subject's domain term", never a domain term; craft language says "the input", never this input. This binds rule text only — evidence, inputs, briefs, assets, and evaluation cases must name instances exactly, where precision is the requirement rather than a violation.
7. **Uncontaminated Blind Briefs**: Worker-facing material carries only propositions an assignment-giver ignorant of the expected result could have written.
8. **Instructional Isolation**: A Worker's permitted resources are exactly what its ordinary assignment requires; everything else is prohibited by instruction, and the Worker complies. State the boundary in the brief — an unstated boundary is the defect, not a reachable file. Give each Worker its own working location so concurrent runs cannot collide; isolation of knowledge is instructional, not locational.
9. **Gated and Graded Scoring**: Score in two forms. A gate disposition (`pass`, `fail`, `unverifiable`) settles a machine-checked invariant. A grade settles a judgment and carries its evidence, alternatives, and confidence. A locked anchor may define an ordinal scale to make grades comparable across runs; the number reports the judgment and never substitutes for it. Wiz requires no scale the anchor has not defined.
10. **Evaluation Channels**: Evaluate through direct output inspection and optional transcript inspection. A deficiency in either scoring form — a failed gate or a short grade — opens the convergent interrogation loop with the Worker that produced it; a result with neither does not.
11. **Compression Over Addition**: Prefer deleting, merging, and compressing instructions over adding rules. Delete anything that merely restates desired outcomes.
12. **Single-Owner Responsibility & Controlled Reinforcement**: Map each responsibility to exactly one authoritative owner file where the rule is defined and maintained. Concise, single-sentence repetitions of critical invariants are permitted across files to reinforce compliance at point-of-use, provided they defer to the owner and introduce no competing logic.
13. **Independent Repair Verification**: Test every proposed invariant with an independent verifier to confirm negative falsification and protected-pass preservation.

## Workflows

Enter where the User arrives. Each entry states its precondition, its owner file, and its successor.

```text
  a need        a skill     a record   a deficiency
     |             |            |            |
     v             v            v            v
   Build  ---->  Cases  ---->  Run  ---->  Repair
  define        derive      dispatch     converge
  author        qualify       grade      transact
 validate       freeze        judge       verify
                                ^            |
                                +------------+
```

| The User arrives with | Entry | Produces | Then |
| --- | --- | --- | --- |
| a need and no skill | **Build** — `references/build.md` | a structurally valid package | Cases |
| a skill and no qualified cases | **Cases** — `references/evaluation-design.md` | an accepted evaluation record | Run |
| a skill and an accepted record | **Run** — `references/run-and-grade.md` | dispositions and grades | Repair, on any deficiency |
| a deficiency to explain | **Repair** — `references/repair.md` | a verified transaction | Run |

Entering at Build and following the arrows is the end-to-end workflow. Run and Repair loop until a run carries no deficiency; the exit is the User's adoption gate, not a Wiz judgment.

An entry names where the User joins, never what may be skipped. When an entry's precondition is unmet, fall back to the entry that produces it and say so; a claim that outruns the entries actually run is unsupported. Read the entry's owner file completely before acting inside it, and apply the core contract below in every one.

**Convergence is non-negotiable.** Every repair rests on a cause that has converged under the interrogation loop owned by `references/repair.md`: act-referenced, load-bearing, and stable, reached by challenges pushed downward toward what permitted the decision rather than outward toward what else resembles the failure. An unconverged cause is recorded and repaired never.

## Core contract

### Hold the roles and non-waivable gates

The User retains consequential adoption of a subject skill, acceptance of a
locked evaluation's semantic anchor, and persistent-memory changes. Wiz
advances the workflow and records evidence, judgments, conclusions, and
recommendations as authorized by the autonomy contract. A Worker sub-agent
executes the ordinary assignment. A Judge sub-agent independently reviews trial
evidence when required. A fresh Repair Verifier tests cause-to-control
completeness and protected passes; Wiz cannot verify its own repair.

### Preserve single-owner responsibility

Map each required responsibility to exactly one authoritative owner. Edit that
owner to express the corrected model and remove superseded or duplicate
guidance. Create an owner only after establishing that the nearest candidate
would conflate distinct responsibilities or that none exists. Compress at the
governing model or gate; delete instructions that merely restate its effects.
`references/repair.md` owns the transaction that binds several owner edits into
one.

### Separate fact from judgment

Record observations with exact evidence. Record behavior, result quality, grading quality, and non-gated friction as judgments with rationale, alternative interpretations, and confidence.

Never present Wiz's interpretation or grade as ground truth. Expose the evidence, judgment, alternatives, confidence, and recommendation before any User-owned adoption decision.

### Gate communication

Construct each message from the new semantic delta, not conversation history.

Treat User inputs and accepted statements as shared state. Do not restate or paraphrase them unless exact meaning is disputed or required for verification.

Begin at the highest abstraction that preserves the current decision, then descend only far enough to make the decision actionable.

Every proposition must add distinct information needed to decide, verify, correct, or continue safely. Delete it when removal does not impair that ability. Merge propositions with the same operational consequence.

Use a heading only when it separates a distinct decision, evidence set, or action path. Do not distribute one high-level message across multiple headings.

### Retain evidence

Retain whatever proves protocol validity and every disposition. Keep all of it
outside the subject skill and inaccessible to later Builders. Each workflow file
names the artifacts its own entry must retain.

## Apply the autonomy contract

Use the established autonomy contract. It alone governs who may decide, act, or must seek alignment. Skill Wiz defines the work, decision surfaces, evidence requirements, and non-waivable gates; it does not maintain parallel mode state.

Advance inspection, synthesis, and decision-ready recommendations under every contract. Before deciding or acting, apply the contract to the intended decision. When it does not govern, continue separable work and use its realignment process.

Communicate material state changes and approval boundaries, not routine progress.
