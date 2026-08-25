# Build

Enter here with a need and no skill, with a package that must change for a
reason other than a diagnosed fault, or to establish the structural validity a
later entry requires — a fault enters where `SKILL.md` routes it, never here.
Produces a structurally valid package; the successor entry is
`evaluation-design.md`. Structural validity is workflow hygiene, never evidence
that the skill works.

When Build produces or revises package instruction text as an explicit Change
Request (exact spans), run Proposal Admission under `proposal-admission.md` before
writing those spans into the package. **Admit** plus User acceptance of the spans
authorizes the write; that path is owned here together with Proposal Admission,
not by the failure-led adopt/apply gate.

## Define the skill work

Inspect authoritative sources and formulate a decision-ready skill-work definition before requesting input. This is Wiz's current model of the requested work, not an approval or authority object. Record the desired outcome, activation boundary, inputs, outputs, constraints, fragile decisions, governed-state currency where observable, target runtime, package location, held-out evaluation location, run root, and required resources. Keep design inputs outside held-out evaluation, and evaluation material outside the package: cases and their resources live at the held-out location, carry no read trigger, and are never read by an agent running the skill.

The activation boundary is the condition separating callers who need the skill from those who do not, stated in the caller's language. The skill's own methods, internals, and role vocabulary do not appear in it, and the description renders that condition and nothing else.

Identify the intended decisions and non-waivable gates. Recommend resolutions from available evidence. The skill-work definition does not establish or extend authority; ask the User only for unresolved intent, authority, or consequential preference.

## Keep the core portable and target-native

Keep skill instructions true under substitution of the hosting runtime. Isolate every proposition that fails that test in a replaceable adapter.

Skill Wiz's roles and evaluation vocabulary are process language and stay out of target skills. Every actor, term, or concept a target skill introduces must trace to established target requirements or an authoritative target source, verified before the replacement is applied; unprovenanced target vocabulary is a hard contamination failure. When the target lacks a required term, investigate authoritative target sources and recommend a target-native resolution. Ask the User only when evidence cannot resolve a consequential choice.

Keep Skill Wiz itself instruction-only. Permit a target skill to include executable resources only when established target requirements demand deterministic execution that instructions cannot reliably provide.

## Compose the package

Use the smallest package allowed by the target runtime:

```text
skill-name/
|-- SKILL.md
|-- references/
|-- assets/
`-- executable-resources/
```

Create only required directories. Keep detailed methodology in directly linked references. Keep templates and output material in assets.

Give each responsibility one owner file as the core contract requires, and give each file one read trigger — the condition under which an agent must open it. A file an agent cannot tell when to read is unowned in practice.

## Validate structure

Confirm directly that:

- `SKILL.md` has parseable metadata with nonempty `name` and `description`;
- every referenced file exists and is directly linked;
- every directory and adapter has a required owner;
- no placeholder, duplicate contract, or stale runtime assumption remains;
- every declared runtime invariant holds.

Record evidence for each result.

## Retain

Retain the skill-work definition, the owner map, and the structural validation evidence.
