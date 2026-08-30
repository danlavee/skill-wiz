# Evaluation Design

Enter here with a skill and no qualified cases, or with an observed failure in
any state — a failure is case material, not a repair ticket. Produces an
accepted evaluation record — an exploratory trial record or a locked anchor; the
successor entry is `run-and-grade.md`.

Evaluate whether a skill helps an Agent achieve the accepted goal under ordinary
conditions. Do not test whether the Agent can infer the preferred result.

## Case selection

When the held-out suite ships a **case map**, that map inventories cases
(identity, what each discriminates, status). Where the map lives, and the
numeric bound of the hard cost cap, are named by the evaluation record or
suite (dev) layout — not this package. **Case selection** (this owner)
matches the Change Request, residual, or claim to map rows by what they
discriminate, under that cap, and records the selection in run evidence.
Suite files must not restate a competing run policy.

## Size the evaluation

An exploratory trial supports early behavioral evidence only. Use a locked evaluation for acceptance, comparison, or generalization claims, or when simpler evidence cannot discriminate. Scale the design and retained evidence to the intended claim and uncertainty. Dispatch requires authority under the autonomy contract.

## Store the case

The cases root and the evals root are named in `skill-dev.md`. This file
specifies the stored case. Dispatch layout under evals is `run-and-grade.md`.

A stored case is the Worker-facing files and the evaluator's record for one
case, identical for every run that uses it.

```text
cases/
|-- worker-scope.md
`-- <case-id>/
    |-- case.md
    |-- assignment.md
    |-- contamination.csv
    |-- guards.md              optional
    |-- preliminary-run.md     optional
    |-- withheld.md            optional
    `-- inputs/                optional
```

A named file holds what its job requires — a sentence or a long record — and
nothing else. The name is not permission to write more, and shortness is not
permission to omit the job. Optional files exist only when they have a job.

`cases/worker-scope.md` is the isolation brief for this evaluation. The owned
text is `assets/worker-scope.md`. Dispatch copies the freeze, not the live
asset. Changing the owned text is a change to every Worker-facing surface:
emit it as a held-out diff to `cases/worker-scope.md`.

Required: `case.md`, `contamination.csv`, and at least one assignment file.
One assignment text is `assignment.md`. More than one are
`assignment-<variant>.md` with no `assignment.md`; `case.md` says which a run
uses. `preliminary-run.md` is not an assignment variant.

Worker-facing: the assignment, `guards.md`, and `worker-scope.md`.
Evaluator-only: `case.md`, `contamination.csv`, `withheld.md`, and anything
that exists only because the expected result is known.

`guards.md` adds limits beyond `worker-scope.md`. `preliminary-run.md` produces
the defect the main assignment then receives. `withheld.md` is facts the
Worker must not be told. `inputs/` is files the assignment acts on; dispatch
copies it to `resources/`.

`contamination.csv` is the case's contamination disposition: columns `path`,
`class` (`worker-facing` or `evaluator-only`), `provenance`, `closure`,
`disposition` (`pass` or `fail`). It lists `cases/worker-scope.md` as
Worker-facing. Fail or missing blocks qualify and dispatch. Dispatch
re-confirms that record on the assembled prompt.

What a run is dispatched against is not stored in the case. Where a case
requires a property of its candidate or structure, `case.md` states that
property. Candidate bytes live as tars in that run.

## Record an exploratory trial

Record its goal and case, ordinary assignment, permitted and prohibited resources and permissions, evidence and verification, stopping condition, and no-claim boundary. The skill-work definition supplies its purpose and bounds, and the autonomy contract governs dispatch. It needs no separate semantic acceptance or stable identity unless it introduces a new consequential interpretation or permission.

## Design a locked anchor

Derive candidate cases from accepted requirements and authoritative inputs, treating each as authored evidence subject to validation, not evaluator truth. Construct the brief as under Enforce blind-brief hard gates, sized to the case's behavioral obligation.

Freeze a bidirectional authority map: every graded property maps to an exact Worker-visible source authority span with provenance or to an independently qualified universal hard property, and every required source atom maps to target evidence. Anything else is non-graded or blocks qualification. Derive the obligation roster independently of the actor being checked; the actor may add entries but cannot remove or close them.

Each graded property carries the ordering that makes two runs comparable and the level below which a grade is short. An anchor carrying neither cannot open a repair or gate a transition, and Wiz supplies neither.

A case enters the anchor only after independent establishment that its inputs are valid, its permissions and environment make it executable, its expected observations are correct or its grading method grounded, its Worker-facing material is uncontaminated, and its result discriminates the governed behavior. Verify deterministic claims by execution, calculation, parsing, rendering, or comparison; use independent reviewers where judgment remains. Any evidence-backed defect or outcome-changing alternative rejects the case regardless of reviewer agreement — revise and requalify it, or mark the obligation untestable. Qualify a case that must remain unread by Wiz in an isolated context returning only its identity and covered obligation.

Emit the qualified cases as the diff that freezes them into one anchor at the cases location for the User to apply and accept, assign it a stable identity before dispatch, and retain each case's derivation, authority map, roster, verification, alternatives, and uncertainty. Any semantic change creates a new identity and requires renewed acceptance; bookkeeping-only changes do not.

A rubric that scores an instruction's breadth scores a symptom's width. Grade an instruction by what runs outside its prompting case do, per the reach test in Removing Choice Over Adding Checks.

## Derive a case from an observed failure

Reproduce the failure as an ordinary assignment under its recorded conditions, then qualify it exactly as any other case. A failure that cannot be reproduced under an ordinary assignment is not yet a case: record it as unverified and repair nothing on it. Until a case is qualified and a run of it is deficient, no path continues into repair of the skill under the complaint. Reproduce it before reading any account of why it happened, so the case discriminates the behavior rather than the explanation.

Emit the qualified case as a diff adding it to the anchor with the observed behavior as the negative falsifier. What the state already does on the other cases is in the log; nothing is carried. Report a failure to reproduce as a finding about the report, not about the skill.

Where an anchor already exists, this is a semantic change: it takes a new identity and renewed User acceptance.

**Process and dispatch failures are case material.** When the fault is a wrong stop available to Wiz, a dispatcher, or a settler — preferred terminal in a judgment brief, multi-side residual closed by the producer alone, residual left open treated as repair complete, evolution claimed without a re-run that removes the freedom — reproduce that stop as an ordinary assignment or as a graded obligation on retained run surfaces (settler brief as dispatched, disposition, post-repair re-run record). Package prose that does not govern the dispatcher does not close the process residual; the case grades the surfaces that actually authorize the stop.

A case that protects self-evolution states a negative falsifier on the residual freedom (the old stop still available) and, where process is in scope, object settlement conditions for residual open vs closed. It does not grade identity with a known patch. Success is residual closed under those conditions after re-run; failure is residual still open or process surfaces still authorizing the wrong stop — either outcome is a protocol-valid result, and only residual-closed with no protected grade fall supports an evolution claim.

## Enforce blind-brief hard gates

A Worker brief is the smallest ordinary assignment that preserves the established outcome, necessary inputs, real constraints, permitted resources, permissions, and deliverable, without revealing the intended result. That is the only brief form; case design and dispatch use it. Activation is the dispatch itself, and `run-and-grade.md` owns it. No brief carries a directive to invoke a skill. Keep evaluation content private unless independently required by the ordinary assignment. Neither the trial record nor the assignment can authorize its own unsupported content.

**Surface split (before gates).** Separate every evaluation artifact into exactly one class:

- **Worker-facing** — assignment, permitted resources, case-particular guards, worker-scope, and the activation prompt as assembled. Nothing else.
- **Evaluator-only** — `case.md`, `contamination.csv`, `withheld.md`, and any text that exists only because the expected result is known.

Evaluator-only material is never copied into a Worker workspace `resources/`, never quoted into the activation prompt, and never “helpfully” restated in the dispatch message.

Reject every Worker-facing proposition that fails either gate:

- **Provenance**: it traces to a source the ordinary assignment independently requires. One that would not exist unless someone knew the expected result, the diagnosis, the grading, or a prior run fails, in whatever form it is carried.
- **Referential closure**: its actors, authorities, and referents resolve identically for the Worker and for Wiz. A term whose meaning depends on who is reading fails.

**Contamination disposition (required).** Before a case is dispatch-ready and again before every dispatch of that case, retain a contamination disposition that lists (1) every Worker-facing path or prompt span, (2) every evaluator-only artifact held out, and (3) pass or fail on provenance and referential closure for each Worker-facing surface and for the activation prompt. A fail blocks dispatch and blocks treating the case as qualified for a discrimination claim. A missing disposition is a fail. Self-adjudicated “looks fine” without that retained record is not a disposition. `run-and-grade.md` refuses protocol validity when this disposition is absent or failed at dispatch.

**Bias and Leak dispatcher fixtures.** Brief guards in SKILL.md name Bias guards
and Leak guards. Leak fails are disposed by the contamination disposition above
(Worker-facing vs evaluator-only; provenance and referential closure). Stance
Neutrality on judgment briefs remains its own tenet; it is not a Leak fixture.
Bias fails on a Review brief or Change Request body: instance enumeration is the
obligation or success criterion rather than a stated mechanism and object
settlement conditions; deleting that enumeration removes an operative constraint
no mechanism-level clause still carries; or a recipient could satisfy the text by
covering the enumeration without applying the mechanism. Level-Locality instance
naming where already required is not a Bias fail. Retain Bias fail notes with the
Proposal Admission record when the surface is a Change Request, and Bias/Leak fail
notes with the Proposal Admission record when the surface is a Review brief.

## Retain

Retain the anchor identity, each case's derivation and verification record, the authority map, the obligation roster, every brief as dispatched, every contamination disposition (case qualify and each dispatch), and Bias or Leak fail notes when those fixtures are disposed on a brief or Change Request surface.
