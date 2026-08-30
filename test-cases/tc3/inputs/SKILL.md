---
name: code-tidy
description: "Review changed or requested code for contract violations, unnecessary complexity, misleading names, weak error and configuration boundaries, and behavior-free bloat. Produce evidence-backed findings, and edit only when authorized."
---

# Code Tidy

## Scope and authority

Review the paths named by the user; otherwise review the current changed surface. Keep the work grounded in code evidence and repository conventions.

A review request authorizes read-only inspection and a report. Edit only when the user has asked for cleanup or implementation. Preserve repository instructions, public contracts, and unrelated work.

## System view first

Before classifying a smell, identify the relevant entry points, producers, consumers, data contracts, ownership boundaries, failure paths, configuration authority, and tests. Inspect callers and callees far enough to distinguish a local oddity from an intentional boundary.

## Review lenses

### Control flow and failure handling

- swallowed errors, ignored failure results, or lost causes
- error-handling scope broader than the operation it can meaningfully recover
- retry or fallback chains that obscure the authoritative path
- excessive nesting or control flow that hides state transitions
- acknowledgement, checkpoint, or cleanup ordering that creates partial failure

### Contracts, types, and data

- absence, null, nil, or zero-value checks that contradict an established contract
- reflection or dynamic probing on documented typed values
- lookup-with-default or falsy checks on required fields
- types marked nullable or optional although every valid producer supplies a value
- unconstrained top or dynamic types where a concrete type, enum, union, interface, or protocol exists
- manual parsing that bypasses established schema or model tooling
- repeated use-site reshaping that belongs at a boundary

### Responsibility and abstraction

- over-abstraction or ceremony wrappers
- scattered ownership of one behavior or invariant
- duplicated logic across real variations that should share an implementation
- abstractions, fields, or layers with no concrete producer, consumer, invariant, or runtime need
- compatibility paths for callers or data shapes that are not proven to exist

### Defaults and configuration

- defaults, generated values, or placeholders that hide required input
- ambient or global configuration reads inside core logic
- direct environment access outside configuration loaders or thin entry points
- parallel or loose configuration representations where the repository has an authoritative model
- fallback precedence that leaves configuration ownership unclear

### Observability

- user-facing, domain-facing, and operational failures classified for the wrong audience
- missing, duplicate, or wrongly leveled logs
- errors that lose their cause, stack, or decisive operation context
- diagnostics written through the wrong process, API, or structured-output boundary

### Bloat, comments, and naming

- behavior-free code or prose with no caller need, invariant, operational explanation, or maintenance value
- stale comments that describe old behavior, names, or architecture
- comments disproportionate to the complexity they explain
- names that misstate mechanism, lifecycle, authority, responsibility, or data content
- public or architectural names that pull implementation away from the intended design

## System-first workflow

1. Resolve the requested scope and whether edits are authorized.
2. Map the relevant system before judging local code.
3. Inspect the changed code with its callers, callees, declared types, schemas, tests, and public documentation.
4. Identify the repository's configuration authority from its instructions, loaders, schemas, entry points, callers, and configuration documentation. Search using names discovered in the repository; do not assume a framework, prefix, or document path.
5. Review through the lenses above. Treat probing, fallbacks, defaults, and wrappers as contract questions rather than isolated syntax smells.
6. Trace each failure from its origin through wrapping or translation to the boundary that classifies, logs, retries, or exposes it.
7. Compare names and comments with actual behavior, authority, lifecycle, and data content.
8. Separate high-confidence local cleanup from structural or public-contract changes. Apply only authorized changes; otherwise present options and one recommendation.
9. Verify behavior with the smallest decisive checks. Report what ran, what it proved, and what remains unverified.

## Editing policy

- Prefer root-cause repairs over additional fallbacks or defensive branches.
- Use the project's established schema or model tooling for parsing and validation. Access known fields directly; use reflection or dynamic probing only at genuinely dynamic boundaries.
- For required fields, use the language's required-field access or convert loose data into a typed model at the boundary. Let broken invariants surface there or translate them once into the project's established error type.
- Normalize proven alternative shapes once at the boundary and keep the core path direct.
- Distinguish allowed absence from fallback behavior. Optional schema data may be absent; untrusted input may be rejected clearly; external data may be validated at its boundary.
- Identify the authority a fallback should use. If authority is unclear, report the design question rather than adding another branch.
- Do not add abstractions unless they remove real duplication or match an established local pattern.
- Keep fixes proportional to the requested scope. Do not turn a narrow cleanup into an unrelated rewrite.
- Preserve comments that explain a non-obvious invariant, external constraint, failure mode, or reason the code cannot express. Delete stale or redundant commentary.
- Remove speculative fields, metadata, wrappers, and dynamic attributes that have no concrete producer, consumer, invariant, serialization need, or runtime behavior.
- Treat misleading names as defects. Apply local renames when authorized; present broad or public renames with impact and migration options.

## Evidence rules

- Check concrete callers, types, schemas, and failure boundaries before reporting a finding.
- Distinguish confirmed defects from design questions and repository conventions.
- Trace public or structural recommendations to the behavior they protect and the consumers they affect.
- Verify correct behavior, not merely the absence of an error.
- Report clean lenses when a thorough review found no issue; do not invent findings to fill every category.

## Report format

Lead with the outcome, scope, and a short architecture map. Order findings by severity and confidence.

For each finding or fix, report:

```text
file:line
severity and lens:
pattern:
contract checked:
evidence and callers:
what it hides or risks:
options:
recommendation:
verification:
```

For analysis-only work, distinguish confirmed findings from open questions. End with checks run, what they proved, and any verification limits.
