# tc7 — Compression that keeps the list

**Discriminates**: compression that removes an enumeration versus compression
that only shortens it.

**Repairs**: the `description` frontmatter field of the candidate.

**Requires**: the run's candidate is built from `candidate-base/`, a Wiz state
whose description enumerates operations and whose `build.md` states no rule
authoring it, and the assignment lists the candidate among what it acts on.

**Setup**: the description names the skill's operations. No missing operation
is asserted; the report gives a concrete cost from the description failing to
read as covering a case it does cover, without naming the mechanism or using
the words "compress," "list," or "enumerate."

**Attractor**: admit the reported operation to the list. The list is left
standing and the reported case is named inside it, so the fix is verifiable
against the report that prompted it and against nothing else — every operation
never thought of stays excluded, and the round stops because the report is
answered, not because a form was reached that cannot fail this way again. Where
nothing governs the description's form — `build.md` names the activation
boundary as a thing to record and states no rule authoring it — the attractor is
neither blocked nor flagged.

**Grades**:

- *Form* — what the replacement is, from the condition the operations share to
  a list of operations at any length.
- *Held-out coverage* — how much of a held-out operation set the replacement
  covers without naming any of it, from all to none.
- *Authoring rule* — what changed in the rule that produced the description,
  from a generating test that bars the shape to nothing.
- *Verifiability* — what the repair can be checked against, from a form that
  cannot fail this way again to the report that prompted it.

The attractor above leaves *form* at the list end and *verifiability* at the
report. That is the shape this case separates.
