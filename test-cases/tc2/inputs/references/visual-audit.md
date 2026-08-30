# Visual Audit

Verify intended meaning, generated structure, and final paint; transformation and confidence are not visual evidence.

## Compact Evidence Record

After the final render, persist `audit.md` with exactly one fenced
`svgdx-audit` JSON object. Bind authority and authoring source by path and
SHA-256; bind generated SVG and review PNG by path; bind `review.json` by path
and SHA-256. The runtime reconciles the latter two files and every review tile
against that manifest.

Seed the inventory from two independent directions: every smallest authority
atom and every visible generated SVG element. Classify each generated text,
connector, marker-bearing terminal, shape, repeated instance, and discovered
interaction. Author memory, intended ownership, or a convenient subset cannot
define completeness. The audit remains a production claim and cannot close a
process-owned external roster.

The object has `schemaVersion: 1`; `binding`; a nonempty `views` array; an
`inventory` with exactly `authority-atom`, `visible-mark`,
`cross-owner-interaction`, `directed-terminal`, `text-owner-boundary`, and
`artifact-finding`; matching `rows`; and derived `closure`. Each row has a
unique uppercase ID, one inventory class, one or more declared view IDs,
nonempty authority atom and owners, a localized final-paint observation, and
`pass`, `fail`, or `open`. An output view names the full PNG; a tile view names
its zero-based manifest row and column.

Use this exact object shape; replace example values and add one row for every
inventoried unit:

```svgdx-audit
{
  "schemaVersion": 1,
  "binding": {
    "authority": {"path": "../input.md", "sha256": "<sha256>"},
    "authoringSource": {"path": "diagram.svgdx", "sha256": "<sha256>"},
    "generatedSvg": {"path": "diagram.svg"},
    "reviewPng": {"path": "preview.png"},
    "reviewManifest": {
      "path": "preview-review-<digest>/review.json",
      "sha256": "<sha256>"
    }
  },
  "views": [
    {"id": "F", "kind": "output"},
    {"id": "T01", "kind": "tile", "row": 0, "column": 0}
  ],
  "inventory": {
    "authority-atom": ["A01"],
    "visible-mark": [],
    "cross-owner-interaction": [],
    "directed-terminal": [],
    "text-owner-boundary": [],
    "artifact-finding": []
  },
  "rows": [
    {
      "id": "A01",
      "class": "authority-atom",
      "views": ["F"],
      "authorityAtom": "smallest source-authorized proposition",
      "owners": ["rendered owner"],
      "observation": "localized final-paint observation",
      "disposition": "pass"
    }
  ],
  "closure": "closed-pass"
}
```

Inventory IDs and row IDs must match exactly per class. Closure is `open` when
any row is open, otherwise `closed-fail` when any row fails, otherwise
`closed-pass`. Machine validation proves only bytes, identities, finite
reconciliation, and recorded closure. It cannot establish that the inventory
is semantically complete, an observation is true, a disposition is justified,
or pixels are acceptable.

Group instances only when identical geometry, paint order, and raster
appearance share one decisive view; reuse, compound paths, nonuniform content,
close spacing, or local density requires instance rows. Missing, stale,
conflicting, disputed, or uninspected rows block delivery. Rerendering
invalidates all rows.

Audit twice: reconcile intended meaning, then reread only final paint adversarially for the strongest plausible alternative owner, topology, direction, claim, or hierarchy. If a hard property depends on author intent or retains a prohibited reading, fail and recompose; preserve disagreement rather than voting.

## Runtime And Surfaces

Transform with the bundled adapter and preserve diagnostics. Use preview `--review` to bind source, output, renderer, fonts, options, dimensions, and tiles.

Inspect generated SVG structurally. Inspect every requested painted surface at native pixels for readability, hierarchy, containment, and retained meaning. Use enlarged digest-bound crops or tiles for local geometry that native review cannot decide. Require direct vector-viewer inspection only when vector-viewer behavior is itself an acceptance property.

## Structural And Semantic Checks

Verify task-relevant:

- every semantic atom's owner, terminal scope, qualifier, epistemic state, and prohibited strengthening in both directions;
- unique IDs, resolved references, transforms, hidden content, and bounds participants;
- relationship identities, terminals, direction, cardinality, sharing, and generated path data;
- marker-bearing elements and repeated members;
- clipping, masks, filters, effects, and external resources.

## Plain Explanatory Diagram Defaults

Apply these defaults unless recorded technical meaning or a governing convention requires a visibly coherent departure.

1. Use one coherent type system. Default to one family. Additional families require stable, visibly distinct roles that still read as one system. Every meaning-bearing family/weight pair must be proven for that family by the production renderer and remain visibly distinct on every requested surface; declarations, fallback inventories, and probes of another family do not pass.
2. Use horizontal and vertical connector segments. Do not introduce diagonals, arbitrary bends, or line-to-line joins merely to reach an owner. Every junction requires a semantic role. Build an ordinary bend or branch as one continuous route or with matching stroke envelopes; an unintended protrusion, notch, seam, or emphasis fails even when centerlines meet.
3. Attach a lone face connector at that face's center. A meaningful vertex is also canonical when the owner's meaning or geometry is vertex-organized. Distribute multiple same-face connectors deliberately and symmetrically, or merge them through an authorized shared route.
4. Require visible justification for every off-center attachment. Collision avoidance, ordered ports, preserved symmetry, or real topology may justify it; routing convenience alone does not.
5. Use an undecorated line only for a genuinely undirected relation. Before authoring, declare one terminal per directed branch: source, receiver, traversal, cue, and deliberate contact or gap policy.
6. Decide Rules 5-6 together from one final-paint view containing the last approach, shaft, cap, join, complete cue, receiver boundary, nearby terminal-like paint, later paint, and full clearance. Cue, terminal, and endpoint-like-mark counts must reconcile. The cue owns one receiver and direction; no shaft, gap, penetration, protrusion, overwrite, competing terminal, or deformation may contradict its policy. Prove every non-identical instance; configuration, labels, and inferred aim are not proof.
7. When one source carries the same payload to several destinations, prefer one authorized shared connection with clean branches. Keep routes separate when payload, direction, identity, or timing differs.
8. Every non-canvas mark and presentation channel needs one authority atom or indispensable notation owner. Remove uncited or merely helpful paint. Reject any painted reading that adds, narrows, strengthens, obstructs, or creates topology. Neutral intent is not authorization.
9. Apply the Painted Interaction Gate to every text glyph-and-backing envelope at native size. Keep text visibly inside its owner or authorized corridor. Reflow or recompose rather than shrink, truncate, or alter meaning.
10. Apply Rule 8 separately to every repeated instance, junction, badge, observation aid, divider, enclosure, and explanation; none inherits another's authorization. Remove redundant instances. None may break continuity, hide direction, resemble an entity, or outweigh its relation.

## Relationships, Meetings, And Lines

For each relationship branch record participant roles, terminals, joint or separate attribution, traversal, contact policy, cue, meetings, and attached content. Verify:

- one generated branch and painted disposition for every logical branch;
- agreement among branch, cue, and terminal counts; compound-path evidence covers only proven subpaths;
- a declared role for every bend, branch, shared section, and junction;
- no unnecessary, duplicate, collinear, zero-length, or reversing segment;
- clear identity and sufficient space for parallel, shared, or overlapping routes, endings, labels, and meetings.

### Painted Interaction Gate

After the final render, inventory every interacting painted-unit pair and every
painted-unit/owner-boundary pair, regardless of shared owner, style, or intended
relationship. Use each unit's complete visible envelope, including glyphs,
backing, fill, stroke, marker, effect, and border. Record different-owner pairs
as `cross-owner-interaction`, other interacting pairs as `artifact-finding`,
and retain applicable `directed-terminal` and `text-owner-boundary` rows.

Give each interaction exactly one final-paint disposition: required semantic
meeting, explicit non-connection, or defect. A required meeting may use only
the contact needed to express it and must leave every unit's identity, text,
direction cue, endpoint, and topology decisive. Otherwise fail escaped,
crossed, covered, clipped, or masked text; hidden or cut boundaries, routes,
cues, or terminals; ambiguous contact, gap, receiver, or direction; and false
joins, branches, endpoints, enclosures, or composite shapes. Ownership,
authorization, source geometry, inferred intent, color, backing, and enlarged
readability cannot override destructive final paint. Recompose and rerender
until every interaction is inspected and non-defective.

## Text, Composition, And Extents

Verify:

- every text-owner pair, shared painted region, and intended reading order;
- repeated members preserve identity, count, dimensions, and intended equality or distinction;
- alignment, ordering, enclosure, spacing, balance, and symmetry survive paint;
- apparent near-alignments or near-symmetries are either intentional or corrected;
- whitespace, density, hierarchy, and emphasis support the intended reading;
- relationship text and required qualifications remain associated and practical to read.

## Completion

After the last render, match finite-unit counts and identities across authority,
generated structure, the hard-unit manifest, and every requested surface.
Deliver only when every inventoried instance on current final paint has one
decisive `pass`. `open`, `fail`, multiply plausible, stale, uninspected, or
unverifiable instances block delivery. Recompose and rerender; rerendering
invalidates the audit.
