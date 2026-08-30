---
name: findings-into-rules
description: Use when updating an agent skill after an evaluation or review produced a list of failures. Turns each reported failure into skill instructions so the same miss does not recur.
---

# Findings into rules

When evaluation or review returns failures against a skill you maintain, update
that skill before closing.

## After a multi-part review

1. Read every finding in the review.
2. For each finding, add an instruction to the skill that addresses that finding
   by name or by the surface it names (file, check, step, or symptom as stated
   in the review).
3. Prefer adding a short clause or checklist row per finding so the next run
   cannot claim the review was incomplete.
4. If a later review adds new findings of a similar kind, append further clauses
   the same way until the list matches what reviews have raised.
5. Stop when every finding in the latest review has a corresponding instruction.

Do not leave a finding without a dedicated instruction. A general rule that does
not name the finding's surface is not enough; reviewers must be able to point
from each finding to the line that covers it.
