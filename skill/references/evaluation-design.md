# Evaluation Design

Enter here with a skill and no qualified cases, or with an observed failure in
any state — a failure is case material, not a repair ticket. Produces an
accepted evaluation record — an exploratory trial record or a locked anchor; the
successor entry is `run-and-grade.md`.

Evaluate whether a skill helps an Agent achieve the accepted goal under ordinary
conditions. Do not test whether the Agent can infer the preferred result.

## Size the evaluation

An exploratory trial supports early behavioral evidence only. Use a locked evaluation for acceptance, comparison, or generalization claims, or when simpler evidence cannot discriminate. Scale the design and retained evidence to the intended claim and uncertainty. Dispatch requires authority under the autonomy contract.

## Store the case, materialize the run

A stored case is a set of inputs, retained across runs and identical for every run that uses it: the resources a run acts on, the text delivered to a Worker, and the evaluator's record of what the case grades.

```text
tc<n>/
|-- test-resources/     what the assignment gives a run to work with; copied into a workspace as resources/
|-- assignment.md       the ordinary assignment under test
|-- guards.md           scope limits particular to this case, if it has any
`-- case.md             the evaluator's record: what the case discriminates and how a run is scored against it
```

The assignments and `guards.md` reach a Worker as verbatim instruction text. `case.md` reaches no Worker. Where a case must generate its defect rather than describe one, it also holds `produce.md` — the assignment for a preliminary run whose result the assignment under test is then handed. Where a case grades coverage the Worker could not have earned by naming, it also holds `withheld.md` — material kept out of every Worker-facing surface, checked absent from the brief before dispatch and checked covered in the result after.

What a run is dispatched against varies by run and is not stored. Where a case discriminates only under a run with a stated property — of its candidate, or of its structure — `case.md` states that property as a requirement. A list of the states already run is a log, and the case is not where it lives.

A workspace is one Worker's working location for one run. It holds the resources that Worker's assignment lists, the candidate that governs it, and everything that Worker then produces.

The candidate is the skill state this run tests, materialized into the workspace before dispatch: a base copy — installed, prior, or newly authored, as the run's purpose decides — with every change pending against it applied. The Worker is activated with the candidate and never with an installed package, so a run tests the state Wiz built rather than whatever the host happens to carry, and an iteration advances by rebuilding the candidate rather than by installing anything. A candidate is run material, discarded with the run; applying a pending change to one writes to no stored case.

Each run gets its own directory under the run root, named for the skill under development and then for the case and the run:

```text
<run-root>/<skill-under-development>/<case>-<run>/
|-- workspace/           the Worker's, holding its material at dispatch and its work after
|   |-- candidate/       the package governing the Worker; absent where the run is a no-package baseline
|   `-- resources/       what the assignment lists to act on
`-- evidence/            Wiz's, holding the candidate's base and the changes applied to it, the text as delivered, the untouched first result, and each disposition with the surface establishing it
```

A case's `test-resources/` arrives as `resources/`. The stored name is the evaluator's and reaches no Worker: a directory named for testing tells a Worker it is being tested, and no assignment can take that back.

A case that repairs the package governing it lists `candidate/` among the resources its assignment acts on. That is what holds one part in both roles; nothing else about the run changes.

The run root is the User's to decide: Wiz creates directories there, copies packages and resources into them, and deletes them, so where that happens is not Wiz's choice. Put the trade to the User — a temporary root needs no setup and disposes of itself; a root the User's project owns keeps a closed run inspectable, at the cost of an exclusion from version control and a clearing nobody else will do — and record the answer among the skill-work definition's locations. Where the runtime names the root rather than the User, resolve it and never write it literally.

Under that root Wiz assembles each run: the directory, the candidate, the resources, and the prompt. Record which root a run used with the rest of its setup.

Under either root, retention harvests `evidence/` to the held-out evaluation location before the run closes. A durable root is not retention: it holds run material, and run material is discarded.

Worker scope limits come from two places. `assets/worker-scope.md` holds the invariant ones, identical for every case and every run: they bound the workspace and bar any package outside it from governing the Worker, so a run tests its candidate and not the host. Wiz delivers that asset with every assignment, and no case authors or omits it. `guards.md` holds limits particular to one case, and Wiz delivers it only where a case has any.

## Record an exploratory trial

Record its goal and case, ordinary assignment, permitted and prohibited resources and permissions, evidence and verification, stopping condition, and no-claim boundary. The skill-work definition supplies its purpose and bounds, and the autonomy contract governs dispatch. It needs no separate semantic acceptance or stable identity unless it introduces a new consequential interpretation or permission.

## Design a locked anchor

Derive candidate cases from accepted requirements and authoritative inputs, treating each as authored evidence subject to validation, not evaluator truth. Construct the smallest ordinary assignment and inputs that instantiate the case's behavioral obligation without revealing the intended result.

Freeze a bidirectional authority map: every graded property maps to an exact Worker-visible source authority span with provenance or to an independently qualified universal hard property, and every required source atom maps to target evidence. Anything else is non-graded or blocks qualification. Derive the obligation roster independently of the actor being checked; the actor may add entries but cannot remove or close them.

Each graded property carries the ordering that makes two runs comparable and the level below which a grade is short. An anchor carrying neither cannot open a repair or gate a transition, and Wiz supplies neither.

A case enters the anchor only after independent establishment that its inputs are valid, its permissions and environment make it executable, its expected observations are correct or its grading method grounded, its Worker-facing material is uncontaminated, and its result discriminates the governed behavior. Verify deterministic claims by execution, calculation, parsing, rendering, or comparison; use independent reviewers where judgment remains. Any evidence-backed defect or outcome-changing alternative rejects the case regardless of reviewer agreement — revise and requalify it, or mark the obligation untestable. Qualify a case that must remain unread by Wiz in an isolated context returning only its identity and covered obligation.

Emit the qualified cases as the diff that freezes them into one anchor at the held-out evaluation location for the User to apply and accept, assign it a stable identity before dispatch, and retain each case's derivation, authority map, roster, verification, alternatives, and uncertainty. Any semantic change creates a new identity and requires renewed acceptance; bookkeeping-only changes do not.

A rubric that scores an instruction's breadth scores a symptom's width. Grade an instruction by what runs outside its prompting case do, per the reach test in Removing Choice Over Adding Checks.

## Derive a case from an observed failure

Reproduce the failure as an ordinary assignment under its recorded conditions, then qualify it exactly as any other case. A failure that cannot be reproduced under an ordinary assignment is not yet a case: record it as unverified and repair nothing on it. Reproduce it before reading any account of why it happened, so the case discriminates the behavior rather than the explanation.

Emit the qualified case as a diff adding it to the anchor with the observed behavior as the negative falsifier. What the state already does on the other cases is in the log; nothing is carried. Report a failure to reproduce as a finding about the report, not about the skill.

Where an anchor already exists, this is a semantic change: it takes a new identity and renewed User acceptance.

## Enforce blind-brief hard gates

Render each Worker brief as the smallest ordinary assignment that preserves the established outcome, necessary inputs, real constraints, permitted resources, permissions, and deliverable. Activation is the dispatch itself, and `run-and-grade.md` owns it. No brief carries a directive to invoke a skill. Keep evaluation content private unless independently required by the ordinary assignment. Neither the trial record nor the assignment can authorize its own unsupported content.

Reject every Worker-facing proposition that fails either gate:

- **Provenance**: it traces to a source the ordinary assignment independently requires. One that would not exist unless someone knew the expected result, the diagnosis, the grading, or a prior run fails, in whatever form it is carried.
- **Referential closure**: its actors, authorities, and referents resolve identically for the Worker and for Wiz. A term whose meaning depends on who is reading fails.

Review each brief textually and semantically. Do not dispatch one that teaches, steers, or exposes the evaluation.

## Retain

Retain the anchor identity, each case's derivation and verification record, the authority map, the obligation roster, and every brief as dispatched.
