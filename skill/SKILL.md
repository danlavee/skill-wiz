---
name: skill-wiz
description: Use for any work on an agent skill — instructions another agent must run correctly beyond the case in front of you.
---

# Skill Wiz

Skill Wiz builds, tests, and repairs agent skills — its own included. It turns
an observed failure into the rule whose absence permitted it, and proves that
rule holds before anyone adopts it.

## Core Tenets

1. **Self-Application**: Every rule here governs the skill under edit and Wiz itself; Wiz claims no exemption from a constraint it imposes. What these instructions allow a run to treat as enough is a property of Wiz: when that allowance is wrong, repair the permitting rule, and in the same transaction every side the failure implicated and only those sides. A repair under a governing package does not complete on the named skill alone — dispose the permission class on the governor per `references/repair.md`; multi-side disposition is settled there, not by the producer alone. Confer with the User before a Wiz-side repair moves an established boundary.
2. **Invariant-Level Instruction**: State each rule at the level of the mechanism it governs, never the case that exposed it. A rule that enumerates the instances it has met, or that would need a new clause for the next instance, is case-derived. Do not answer it by widening scope until the class is covered — a class is a set of symptoms, and covering it yields a wider symptom. Replace it with the rule whose absence permitted the decision; class coverage follows as a consequence and is never the objective.
3. **Act Over Artifact**: A cause names what the agent accepted as sufficient authority to stop — never what the deliverable should contain. Test: could a Worker satisfy the rule by adding to the deliverable without changing what it checks? If so it is a symptom, and a symptom stated for a whole class is still a symptom. Generality is not depth.
4. **Removing Choice Over Adding Checks**: Repair by removing a choice, not by adding a check. A check must name what it rejects, so it can only ever be as general as the failures already seen. A definition stated as what a thing is not carries the same bound — it reaches only the negations its author happened to think of and leaves the reader to supply what the thing is. State what it is. Authoring is the same rule before there is a failure to point at: an instruction that adds a check is a patch for a failure not yet observed. Change which paths exist instead. The freedom removed must be one every run holds, not one this run exercised. Test by reach: the instruction changes what runs outside its prompting case do, and one that changes nothing outside that case is a check wearing different words.
5. **Upstream of the Decision**: An instruction takes effect before the choice it governs, never after. One that only requires the agent to record or acknowledge something leaves the decision already made and annotates it — the run produces what it always produced, plus a sentence about it. Where judgment cannot be removed, remove instead the freedom to conclude before a required input has been consumed. Test by removal: delete the instruction and name what the run stops producing. If only a record disappears, it had no force. Force ranks by adjudicator distance — the further the standard sits from the agent's own judgment, the more force, and an instruction whose satisfaction the agent adjudicates has none. A self-adjudicated check is the zero-force case by construction.
6. **Level-Locality**: Three levels exist — Wiz's **process language** (roles, gates, obligations, transactions), the subject skill's **craft language** (the domain terms it must speak to be useful), and **instance data** (this run, input, or artifact). Each level refers to the level below it by role and never by instance: process language says "the subject's domain term", never a domain term; craft language says "the input", never this input. This binds rule text only — evidence, inputs, briefs, assets, and evaluation cases must name instances exactly, where precision is the requirement rather than a violation.
7. **Uncontaminated Blind Briefs**: Worker-facing material carries only propositions an assignment-giver ignorant of the expected result could have written. Surface split, hard gates, and a retained contamination disposition before dispatch are owned by `references/evaluation-design.md`; a run without a pass disposition is not protocol-valid under `references/run-and-grade.md`.
8. **Instructional Isolation**: A Worker's permitted resources are exactly what its ordinary assignment requires; everything else is prohibited by instruction. State the boundary in the brief — an unstated boundary is the defect, not a reachable file. Give each Worker its own working location so concurrent runs cannot collide; isolation of knowledge is instructional, not locational.
9. **Grade Over Gate**: Prefer a continuous grade, then a category, then a binary. A binary usually names several properties that vary; decompose it and grade the parts, and keep the binary only where nothing varies. Reserve a gate disposition (`pass`, `fail`, `unverifiable`) for an invariant that does not decompose and whose satisfaction an adjudicator other than the acting agent settles. A grade settles a judgment and carries its evidence, alternatives, and confidence. A locked anchor may define an ordinal scale to make grades comparable across runs; the number reports the judgment and never substitutes for it. Wiz imposes neither a scale the anchor has not defined nor the threshold that would make a grade a pass.
10. **Evaluation Channels**: Grade the result only from surfaces the run produced before Wiz asked it anything; what an Agent says about its own work when asked is evidence about its model and never about the result. A deficiency in either scoring form — a failed gate or a short grade — opens the convergent interrogation loop with the Worker that produced it. Residual is not limited to those forms: a residual is verified only with its origin signal; a settlement-external challenge to an evaluation disposition is residual with the force of a failed gate — owner `references/run-and-grade.md` (Residual). A result with neither scoring deficiency and no such open residual does not open that loop.
11. **Compression Over Addition**: Answer a defect by deleting or merging before adding. Every proposition — rule, reference, or message — must add what its reader needs to decide, verify, correct, or continue; delete it when removal does not impair that, and merge propositions with the same operational consequence. Compress at the governing model or gate, and delete whatever merely restates an outcome another rule already produces.
12. **Single-Owner Responsibility & Controlled Reinforcement**: Map each responsibility to exactly one authoritative owner file where the rule is defined and maintained, and edit that owner to express a corrected model, removing whatever it supersedes. Create an owner only where the nearest candidate would conflate distinct responsibilities or none exists. Concise, single-sentence repetitions of critical invariants are permitted across files to reinforce compliance at point-of-use, provided they defer to the owner and introduce no competing logic.
13. **Independent Repair Verification**: No repair completes on the authority of whoever authored it. An independent verifier disposes of every obligation the repair claims, on executed evidence from the exact candidate. That includes claims that a side needs no control or that a permission class is already closed on a side. Settlement procedure is owned by `references/repair.md`. Residual still open under review, or a multi-side claim settled only by its producer, blocks completion — a disposition, note, or improved package text is not completion.
14. **Stance Neutrality**: Whoever dispatches a judgment binds the brief: do not encode a preferred terminal outcome (find fault, confirm soundness, clear the producer, convict the producer). State only what must be true for each allowed disposition and what evidence settles it. Preferring discovery of residual or preferring clearance is itself a permission the dispatched agent will satisfy. Criteria that can be met only by one stance are incomplete; rewrite them as conditions on the object under review, not on how hard to look. Object settlement conditions (what leaves residual open vs closed) are required brief content; omitting them is not neutrality. This tenet constrains dispatch and brief authorship, not a duty restated to the settler as self-adjudicated stance.
15. **Falsifier Closure**: A repair or self-evolution claim is incomplete until a re-run of the fault's falsifying case shows the removed freedom is no longer an available stop, and no protected grade falls. A process defect that permitted the wrong stop is case material under `references/evaluation-design.md` when package text alone does not govern the dispatcher; until that case is deficient or clean under protocol, evolution of that surface is unverified.
16. **Residual Descent**: Only a control that passes the descent test on a frozen residual ledger may enter Gate, Verify, re-run, or apply; owner `references/descent.md`. Partial descent stays on the same ledger (refine and re-test); reframe or fail does not open the expensive path. This does not claim global convergence — it removes non-descent iteration as an authorized repair path.

## Workflows

Enter where the User arrives. Before acting under skill-wiz after a User message, retain entry (or Stay) and governing obligations for that entry (deficient-path step 0). Work on an existing skill is usually failure-led; a bare need and a requirement change with no fault behind it are the entries that are not. Run and Repair advance as one deficient path until a decision-ready package exists; the User gate is adopt or apply, never permission to diagnose. After apply, Run again until a run carries no deficiency.

```mermaid
flowchart LR
  N([a need or changed requirement]) --> B
  S([a failure, no case for it]) --> C
  Q([a failure, a case for it]) --> R

  B[Build: define, author, validate] --> C
  C[Cases: derive, qualify, freeze] --> R
  R[Run: dispatch, grade, judge] -->|deficiency| P
  P[Repair: converge, transact, verify] --> G
  R -->|clean| U([User adoption])
  G([User gate: adopt or apply]) -->|apply| R
  P -->|blocked or unconverged| G
```

| The User arrives with | Enters at | Owner file |
| --- | --- | --- |
| a need with no skill, or a changed requirement with no fault | **Build**, then the whole chain | `references/build.md` |
| a failure no qualified case covers | **Cases** | `references/evaluation-design.md` |
| a failure a qualified case already covers | **Run** | `references/run-and-grade.md` |

Coverage is judged against the failure, not against the package: an anchor that exists but does not reach this failure is no coverage at all.

**An observed failure is case material, not a repair ticket.** Uncovered, it enters at Cases like any other case: reproduce it as an ordinary assignment and qualify it. That is what supplies the falsifier; the log supplies the grades a later repair is measured against.

**Repair is not an entry point.** `references/repair.md` is reached only from a deficiency in a protocol-valid run. A repair with no run behind it has no evidence, no falsifier, and nothing to protect. Cases that never become a run never reach Repair.

**A bare deficiency is not a User gate.** When a protocol-valid run is deficient and Repair remains authorized under the autonomy contract, continue into `references/repair.md` before any User-owned decision. Present once the package is decision-ready: clean-run adoption, or a verified repair transaction, or an explicit blocked or unconverged repair. Do not stop to ask whether to diagnose.

An entry names where the User joins, never what may be skipped. When an entry's precondition is unmet, fall back to the entry that produces it and say so; a claim that outruns the entries actually run is unsupported. Read the entry's owner file completely before acting inside it, and apply the core contract below in every one.

**Convergence is non-negotiable.** Every repair rests on a cause that has converged under the interrogation loop owned by `references/repair.md`; an unconverged cause is recorded and repaired never.

### Deficient path (end-to-end)

When the work is failure-led, the path is one chain. Order, User surfaces, and
what counts as an explicit suggestion are owned by
`references/deficient-path.md`. Step detail remains with each entry owner
(`evaluation-design.md`, `run-and-grade.md`, `repair.md`, `descent.md`).

```text
1. Observe a fault (subject, Wiz, or process/dispatch)
2. Cases — draft/qualify if no case reaches the fault
3. Run — materialize candidate, dispatch Worker(s), grade
4. Clean → User adoption; deficient → Repair (no “diagnose?” gate)
5. Repair — converge cause (interrogation)
6. Freeze residual ledger (class, object conditions, open sides)
7. Residual descent — explicit control; D1–D4 (pass / partial→refine / fail)
8. Form → Gate → Verify (settler) → mandatory falsifier re-run
9. Decision-ready package → User gate: adopt / apply / stop
10. On apply → re-run fault case (+ process cases owed) or Repair again
```

Read `references/deficient-path.md` completely when entering failure-led work.
Do not present mid-loop ideas or bare deficiency as the User gate; present when
that owner says the package is decision-ready (or blocked / unconverged).

## Core contract

### Hold the roles and non-waivable gates

The User retains consequential adoption of a subject skill, acceptance of a
locked evaluation's semantic anchor, and persistent-memory changes. Wiz does not
write to an accepted anchor or to a stored case: it emits the change as a diff
and the User applies it. That removes the classification — semantic or
bookkeeping — Wiz would otherwise make about its own change, and with it the
acceptance question it would be adjudicating on its own behalf. Wiz advances the
workflow through Run and, on deficiency, through Repair before any User-owned
adopt or apply decision, and records evidence, judgments, conclusions, and
recommendations as authorized by the autonomy contract. Worker, Judge, and Repair Verifier name
roles, not kinds of actor: each is a sub-agent Wiz dispatches in its own fresh
context, and the names exist only to separate them from the User and from Wiz.
A Worker executes the ordinary assignment. A Judge independently reviews trial
evidence when required. A Repair Verifier tests cause-to-control completeness
and multi-side residual disposition; residual open blocks completion. Wiz authors
that brief under Stance Neutrality and cannot verify its own repair.

### Separate fact from judgment

Record observations with exact evidence. Anything no gate settles is a grade. Never present Wiz's interpretation or grade as ground truth; expose the full decision-ready package, with its recommendation, before any User-owned decision.

A proposed instruction change is subject to the same altitude tests as an
applied repair (Invariant-Level Instruction, Act Over Artifact, Removing Choice
Over Adding Checks, Level-Locality, Compression Over Addition). Observed failure
surfaces are evidence for locating the control; they are not content to enumerate
into the package. A proposal that still needs a new clause for each new surface
of the same permission failure is incomplete.

### Gate communication

Construct each message from the new semantic delta. User inputs and accepted statements are shared state: do not restate or paraphrase them unless exact meaning is disputed or required for verification.

Begin at the highest abstraction that preserves the current decision, then descend only far enough to make the decision actionable.

Use a heading only when it separates a distinct decision, evidence set, or action path. Do not distribute one high-level message across multiple headings.

### Retain evidence

Retain whatever proves protocol validity and every disposition. Keep all of it
outside the subject skill and inaccessible to later Builders. Each workflow file
names the artifacts its own entry must retain.

## Apply the autonomy contract

Use the established autonomy contract. It alone governs who may decide, act, or must seek alignment. Skill Wiz defines the work, decision surfaces, evidence requirements, and non-waivable gates; it does not maintain parallel mode state.

Advance inspection, synthesis, and decision-ready recommendations under every contract. On a deficient protocol-valid run, decision-ready includes the Repair package when Repair is authorized — grades alone are not. Before deciding or acting, apply the contract to the intended decision. When it does not govern, continue separable work and use its realignment process.

Communicate material state changes and approval boundaries, not routine progress.
