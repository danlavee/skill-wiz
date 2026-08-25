# Proposal Admission

Owner of Proposal Admission: procedure, termination, User gates for this process,
presentation, Guide bind, and Dispose object conditions. SKILL.md carries a short
map and defers here.

Entered whenever an explicit Change Request must reach **Admit** before descent,
Verify, User gate, or apply. On the failure-led chain this is deficient-path
step 7 (Change Request Form). Not an entry that replaces Build, Cases, Run, or Repair.

## Change Request

Exact spans to edit. Presentation: each span as a unified diff (including
deletion-only) or as before/after blocks, whichever makes that edit legible; one
Change Request may mix shapes. This is **Change Request Form**, not Transaction Form.

## Steps

1. **Form** — Produce the Change Request (retained). When the User is in the
   loop and has not skipped the opening surface, the first Form is a User gate:
   Review does not start until the User approves or returns feedback that
   revises Form. When the User has skipped the opening surface, Review may
   start on the retained Form. Later Forms after **Refine** are not User gates.
2. **Review** — Default N = 3 Proposal Reviewers dispose against the governing
   obligations for the proposal class; record N when it differs; retain every
   disposition. Author and dispatch Review briefs under Bias guards and Leak
   guards (SKILL.md Brief guards; fixtures in evaluation-design.md).
3. **Bind** — Do not adopt by consensus or majority. When dispositions disagree,
   the Guide records a Guide bind that cites which retained dispositions it
   follows and which it does not.
4. **Dispose** — Named outcomes are **Admit**, **Refine**, **Reject**, and
   **Unverifiable**. **Admit** does not replace residual descent or Repair
   Verification. **Reject** or **Unverifiable** terminates the loop. **Refine**
   does not terminate: return to Form on the same proposal identity and continue
   Review without User interaction.
5. **Revise** — The Form step after **Refine**; not a separate User gate.

## Termination

The loop ends when Dispose is **Admit**, **Reject**, or **Unverifiable**, or when
three Form→Review→Bind→Dispose rounds have completed without **Admit**. On
round-cap without **Admit**, stop with a forced User gate on the latest Change
Request. On **Admit**, present the final Change Request for User acceptance of
those spans (approval or feedback). That acceptance is not the failure-led
adopt/apply gate (deficient-path steps 10–11): **Admit** does not complete
descent, Transaction Form, or Repair Verification. On the failure-led chain,
acceptance authorizes continuing at descent; for a standalone package edit, it
authorizes writing the spans. On **Reject** or **Unverifiable**, stop; open a
User gate only if the autonomy contract requires it.

## User surfaces

Default: present the Change Request **before** Review (opening User gate when
the User is in the loop) and **after Dispose** (termination surface). Do not
track Review internals in chat. Guide bind is not a User surface.

The User may **skip** posting the opening surface, the termination surface, or
both in chat. Skip must be stated for this run (User message or retained bind).
Skip of the opening surface means Review may start without chat Form; the
Change Request is still retained as Form evidence. Skip of the termination
surface means do not post that Change Request in chat; the User gate still
exists on the retained artifact until the User opens it. Round-cap and **Admit**
gates are not waived by skip—only chat posting is. Skip does not waive **Admit**,
User acceptance of the spans, or retained evidence.

## Dispose object conditions

Dispose outcomes **Admit**, **Refine**, **Reject**, and **Unverifiable** are named
results.

| Outcome | Object conditions |
| --- | --- |
| **Admit** | Change Request is explicit (exact spans); governing obligations for the proposal class are stated or clearly inherited from the bound entry; **Bias** holds on the Request; **Bias** and **Leak** hold on the Review brief; altitude holds (mechanism-level; not preferred work-shape); owner path is correct; **Admit** does not claim descent or Repair Verification complete |
| **Refine** | Salvageable shortfalls only; name each shortfall against governing obligations or Brief guards; same proposal identity continues |
| **Reject** | Wrong residual or requirement, Bias/Leak fail that cannot be cured by revise, or altitude fail that needs a different proposal identity |
| **Unverifiable** | Materials insufficient to dispose |

Retain every Review disposition, the Guide bind when used, the Dispose outcome,
Bias fail notes on the Change Request when disposed, and Bias/Leak fail notes
from the Review brief when disposed.
