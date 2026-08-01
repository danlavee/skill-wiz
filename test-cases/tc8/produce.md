# Assignment

Use the skill in your workspace for this.

Describe our checkout stack for an engineer joining the on-call rota.

`checkout-api` calls `pricing` for a quote on every request. `pricing` reads
rate tables that `billing` publishes nightly. When `pricing` is unreachable,
`checkout-api` serves the last quote it held for that item for up to five
minutes and then fails the request.

The runbook we inherited says the five-minute window is enforced by
`checkout-api` itself. The pricing team's notes say the window is whatever
`quote-cache` was configured with. Nobody here has been able to say which is
right, or where `quote-cache` runs.

Return the description.
