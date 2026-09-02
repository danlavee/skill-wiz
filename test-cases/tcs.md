# Test Cases for skill-wiz

Each case grades what the skill did with its material. The diagram, code-review,
and description skills appearing here are that material; in some cases the
material is itself a Wiz package.

The case package and the run directory are specified by
`references/evaluation-design.md` in the Wiz package under test, which owns
both. This file holds only what is particular to this suite.

Every case owns its inputs outright. Two cases working on the same package hold
their own copies, so either can be re-pinned at a different state without
touching the other, and an edit meant for one case cannot reach a second.
Duplication is the point, not an oversight to consolidate.

**Runs.** A case is a behavioral anchor: it states a use case the skill must
meet, and any skill state can be run against it. Runs of one case differ only in
what the Worker works under. A state that already meets a case is held to it —
the case guards that behavior against regression. A state that fails it,
repaired and run again, additionally demonstrates the repair. The anchor holds
either way.

**Diversity.** When more than one Worker runs the same case and candidate,
retain every Worker's row. Report min, max, and mean per graded dimension and
per suite category; report behavior counts only for facts that do not
decompose. Do not consensus-collapse a bimodal cell. A path binary never
substitutes for the dimensions `case.md` names.

This suite builds its candidates from two bases:

| base | the candidate is |
| --- | --- |
| a prior | an earlier Wiz state, unpacked into `skills/` from that run's tars |
| `skill/` | Wiz as it currently stands, packed as a tar and unpacked into `skills/` |

Which base a run uses, and what was applied on top, is that run's setup and is
recorded in its evidence. `case.md` states a requirement only where the case
does not discriminate without one.

`case.md` separately names what the Worker **repairs**.

Briefs use craft-level domain language and avoid test-runner internal aliases.

No case stores a failure. A stored failure is authored evidence, and it goes
stale against the runtime it will be graded on. The `preliminary-run.md` run
generates the defect live, its review is written at run time, and
`assignment.md` hands that review to a fresh Worker. What the suite freezes is
the subject, not its output. A subject that stops producing the defect is a
finding — the case is unqualified — not a reason to cache one.

Regression and reach are one comparison read two ways. Run a repaired candidate
against the anchor and set every grade beside what `log.md` holds for the base
it came from: a grade that falls is something the repair broke, and no grade
moving anywhere but the fault's own case means the repair is a check, whatever
its wording. No case is designated for this and none travels with a repair.

## General Grading Categories

When evaluating skill quality or reviewing candidate skill repairs across models and test cases, grade performance (1–10 scale) across the following 5 general categories:

### 1. Correct Autonomy Level
- **Definition**: Evaluates whether the skill maintains the proper contract governing decision-making between the User and the Agent.
- **Criteria**:
  - The skill does not return avoidable cognitive labor or unnecessary questions back to the user when context is available.
  - The skill does not exceed its authorized boundaries or perform unapproved destructive actions.
  - Aligns autonomously with the user's intent while flagging material uncertainties appropriately.

### 2. RCA (Root Cause Analysis)
- **Definition**: Evaluates the depth and accuracy of cause diagnosis when a skill or worker fails.
- **Criteria**:
  - Uncovers the missing decision logic, missing structural rule, or contract gap that allowed the failure.
  - Avoids local surface patching, point coordinate fixes, or single-instance workarounds.
  - Uses multi-turn interrogation to force the worker to identify missing invariants.

### 3. Generalized Language
- **Definition**: Evaluates whether rules, invariants, and guidelines are framed in universal, domain-agnostic terms.
- **Criteria**:
  - Contains zero instance-specific identifiers, local coordinates, or transient prompt details.
  - Formulates rules as universal invariants governing any subject execution under the contract.
  - Ensures instructions generalize across different prompts, LLM families, and runtime environments.

### 4. Compression
- **Definition**: Evaluates instructional density, conciseness, and elimination of redundancy.
- **Criteria**:
  - Prefers updating, merging, or removing existing instructions over adding new verbose sections.
  - Eliminates filler words, conversational preamble, and duplicate explanations.
  - Ensures every line of code/instruction earns its keep ("Compression over addition").

### 5. Effectiveness
- **Definition**: Evaluates whether the skill produces correct, high-quality, and robust end results.
- **Criteria**:
  - Blind workers following the skill consistently pass machine-checked hard gates and quality rubrics.
  - Eliminates recurring failure modes across repeated evaluation runs.
  - Delivers distinctive, production-grade output meeting all structural and behavioral obligations.

Full inventory of cases (including process cases under `process/`): `MAP.md`. This file is not a run plan.

Candidate base for tc10–tc12: live `skill/` (or a frozen prior that already carries residual-open blocks, Stance Neutrality object conditions, and Falsifier Closure). Runs that grade process against a base that lacks those rules are unqualified for the positive path.

