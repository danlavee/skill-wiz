---
name: svgdx-diagrams
description: Create, edit, render, and visually verify controllable diagrams-as-code with svgdx and direct SVG compatibility. Use when a task needs deliberate visual composition, editable vector source, or an alternative to automatic-layout diagram tools. Produce verified artifacts through the bundled offline runtimes.
---

# SVGDX Diagrams

Use the bundled offline runtime. Treat the [manual](references/manual.md) as the complete language and operation reference. Treat the [construction library](references/construction-library.md) as the bounded, non-prescriptive capability catalog for static explanatory diagrams. Its scope and known exclusions are explicit. Neither reference is a tutorial or a diagram taxonomy.

## Design Before Discovery

Inspect the request, authoritative source material, and the current artifact when editing. Before consulting construction references, write `design-intent.md` in task language without markup, syntax, coordinates, or library vocabulary. Preserve substantive later revisions separately.

Record each source-authorized proposition as its smallest atom: owner/subject, predicate, object/result, participant roles, relation class, direction/order, causality or absence, cardinality, shared/joint and terminal scope, qualifier owner, precision, required distinction, epistemic status, and prohibited reading. Include every applicable meaning-bearing field. Assign it to explicit rendered wording or one declared visual carrier; a carrier may cover several only when final paint reconstructs each without source knowledge and no plausible structure omits, reassigns, or contradicts it. Wording cannot rescue contradictory alignment, branching, enclosure, order, spacing, or emphasis. Missing, weakened, conflicting, or added meaning fails. Record constraints, acceptance surfaces, authority limits, and uncertainty.

For a plain explanatory diagram, apply the [plain explanatory diagram defaults](references/visual-audit.md#plain-explanatory-diagram-defaults). A specialized technical convention may override a default only when the verbal design records the governing meaning or convention and the rendered result visibly justifies the departure.

## Discover

Use the [construction-library index](references/construction-library.md#capability-index) to locate relevant capability families and the [Language Index](references/manual.md#language-index) for exact syntax. Read the sections needed to realize or verify the design and its risks. Record non-obvious capability choices, execution owners, constraints, and review obligations in a short construction plan. Do not silently replace an unsupported requirement with a narrower result.

Use the manual only after the construction plan identifies the required language areas:

- Source/output behavior, configuration, or interoperability: [Document And SVG Model](references/manual.md#document-and-svg-model) and [Configuration](references/manual.md#configuration)
- Placement, sizing, alignment, enclosure, or extent: [Geometry And Layout](references/manual.md#geometry-and-layout)
- Attachment, direction, routing, or authored paths: [Relationships And Paths](references/manual.md#relationships-and-paths)
- Content, hierarchy, or appearance: [Text And Presentation](references/manual.md#text-and-presentation)
- Data, computation, variation, repetition, reuse, or scope: [Data Generation And Composition](references/manual.md#data-generation-and-composition)
- Runtime options, execution, validation, or compatibility: [Runtime Operation](references/manual.md#runtime-operation), [Diagnostics And Visual QA](references/manual.md#diagnostics-and-visual-qa), and [Provenance And Further Reference](references/manual.md#provenance-and-further-reference)

Consult upstream references when bundled behavior is incomplete or version-sensitive.

## Execute

Author editable source and transform it with the bundled adapter. Reconcile every atom field bidirectionally across authority, authored source, generated SVG, and final paint. Changed attribution, jointness, attachment, distinction, polarity, precision, or state fails.

After the final render, complete the [visual audit](references/visual-audit.md),
including its Painted Interaction Gate, on every requested surface. Persist
canonical `audit.md`, then run preview `--validate-audit` without rerendering.
The audit is a Builder claim; machine success proves only schema, binding,
reconciliation, and recorded closure. Rerendering invalidates it.

Do not hide diagnostics. Treat text, path, transform, and painted-bounds limitations as review obligations.
