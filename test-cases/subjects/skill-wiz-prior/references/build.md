# Build

Enter here with a need and no skill, or with a package that must change for a
reason other than a diagnosed fault — a fault enters at `repair.md`. Produces a
structurally valid package; the successor entry is `evaluation-design.md`.
Structural validity is workflow hygiene, never evidence that the skill works.

## Define the skill work

Inspect authoritative sources and formulate a decision-ready skill-work definition before requesting input. This is Wiz's current model of the requested work, not an approval or authority object. Record the desired outcome, activation boundary, inputs, outputs, constraints, fragile decisions, governed-state currency where observable, target runtime, package location, held-out evaluation location, and required resources. Keep design inputs outside held-out evaluation.

Identify the intended decisions and non-waivable gates. Recommend resolutions from available evidence. The skill-work definition does not establish or extend authority; apply the autonomy contract before deciding or acting, and ask the User only for unresolved intent, authority, or consequential preference.

## Keep the core portable and target-native

Keep skill instructions true under substitution of the hosting runtime. Isolate every proposition that fails that test in a replaceable adapter.

Treat Skill Wiz's roles and evaluation vocabulary as private process language. When writing a target skill, use only actors, terms, and concepts supported by established target requirements or authoritative target sources.

Before applying a target-skill replacement, verify the provenance of every newly introduced actor or process term. Treat unprovenanced target vocabulary as a hard contamination failure. When the target lacks a required term, investigate authoritative target sources and recommend a target-native resolution. Ask the User only when evidence cannot resolve a consequential choice.

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

Create only required directories. Keep detailed methodology in directly linked references. Keep templates and output material in assets. Add executable resources only when the current skill-work definition requires them. Keep runtime adapters replaceable.

Give each responsibility one owner file as the core contract requires, and give each file one read trigger — the condition under which an agent must open it. A file an agent cannot tell when to read is unowned in practice.

## Validate structure

Confirm directly that:

- `SKILL.md` has parseable metadata with nonempty `name` and `description`;
- every referenced file exists and is directly linked;
- every directory and adapter has a required owner;
- no placeholder, duplicate contract, or stale runtime assumption remains;
- every declared runtime invariant holds.

Record evidence for each result. Surface only a failure or consequence that changes readiness, required action, or a User-owned decision.

## Retain

Retain the skill-work definition, the owner map, and the structural validation evidence.
