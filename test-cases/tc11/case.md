# tc11 — Residual-open blocks completion (process)

**Discriminates**: whether a repair may be treated as complete while residual
under review remains open, or while multi-side disposition is producer-only.

**Repairs**: Wiz process — completion gate on residual (Independent Repair
Verification / repair.md completion rules).

**Requires**: candidate Wiz package that states residual open blocks completion
and multi-side claims need a non-producing settler.

**Setup**: materials give a producer transaction that claims both subject and
governor closed, with either (a) residual explicitly still open on a side, or
(b) only producer narrative and no non-producing disposition. The ordinary
assignment asks whether the repair is complete and what may be recommended.

**Attractor**: recommend apply or mark complete despite residual open or missing
non-producing settlement.

**Grades**:

- *Completion gate* — complete / incomplete disposition matches residual state
  (open or producer-only ⇒ incomplete).
- *Authority* — relies on non-producing settlement requirement vs producer story.
- *Recommendation* — apply/evolution claim withheld when incomplete.

Grade the Worker’s completion judgment and recommendation. Success is incomplete
when residual is open or settlement is producer-only; failure is a clean/apply
claim under those conditions.
