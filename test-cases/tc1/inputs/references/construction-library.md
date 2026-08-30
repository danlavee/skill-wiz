# Construction Library

This reference is a bounded capability catalog for static explanatory diagrams, not a tutorial, style guide, element gallery, diagram taxonomy, or recommendation hierarchy. It contains no domain entities or worked diagrams. Select capabilities from a prior verbal design; do not derive the design from the catalog.

## Scope

The catalog owns editable static SVGDX/native-SVG explanatory composition. It does not claim parametric physical geometry, quantitative plotting, net-aware electrical connectivity, solver-authoritative results, or interactive and time-dependent behavior. Static snapshots of externally owned content may be represented only with the source authority, omissions, and behavior boundary preserved. Known capability and runtime exclusions remain indexed rather than disappearing from discovery.

## How To Read The Catalog

Scan the complete index before opening a family. Each entry records:

- the author decision that must already exist or be resolved;
- the execution owner and translation into SVGDX plus native SVG;
- a status: **Direct**, **Composed**, **Constrained**, or **External**;
- the review obligation created by that translation;
- provenance codes for the abstract semantics.

**Direct** is represented by the stated SVGDX-computed, native-SVG pass-through, or combined execution owner without author calculation. **Composed** combines supported constructs or author-supplied calculations. **Constrained** preserves only a stated qualified form. **External** requires another authoritative computation; only its frozen result can be represented here. Status describes construction fidelity, not review burden, quality, or difficulty. A translation that mixes execution owners or guarantees must be split or list a separate status for each alternative.

## Capability Index

| Family | Capabilities |
| --- | --- |
| [Intent and identity](#intent-and-identity) | output contract; authored identity; expansion-safe identity; description; metadata; static-behavior boundary |
| [Frames and extents](#frames-and-extents) | viewport; coordinate frame; units; axis policy; object extent; painted extent; decorated extent; construction extent; transform scope; serialization precision |
| [Visible geometry](#visible-geometry) | point; line; area; ordered-boundary region; angular or radial region; point sequence; arbitrary outline; open path; closed path; subpath; discontinuity; compound fill; clipped result; masked result; computed Boolean result |
| [Placement](#placement) | explicit position; reference position; path-relative position; alignment; adjacency; separation; distribution; ordering; enclosure; containment; guide; ordered aligned set; packing; overlap response; balance; symmetry; generated placement |
| [Ownership and reuse](#ownership-and-reuse) | group; semantic container; visual enclosure; clipping owner; transform owner; definition; linked instance; expanded instance; parameterized instance; conditional content; repeated content |
| [Text and attached content](#text-and-attached-content) | owned text; text envelope; text anchor; baseline; wrapping; path-relative content; relationship label; object label; attached explanatory content |
| [Relationship model](#relationship-model) | terminals; direction; cardinality; multiplicity; attachment intent; attachment freedom; attachment order; attachment location; boundary policy; clearance; label ownership; layout participation |
| [Route skeleton](#route-skeleton) | direct segment; authored passage sequence; generated rectilinear route; authored rectilinear route; mixed-direction route; arrival and departure constraint; self-returning route; parallel lanes; shared trunk; branch; junction; gap; meeting treatment; imported route; routing objective and fallback |
| [Path behavior](#path-behavior) | segment family; authored controls; generated interpolation; passage validation; continuity; monotonicity; overshoot policy; corner policy; closure; missing-input policy; reversal; extraction; joining; offset construction; simplification; flattening; path measurement; intersection classification |
| [Direction and decoration](#direction-and-decoration) | start decoration; every-vertex decoration; selected-site decoration; end decoration; form; orientation; reference point; units; scaling; paint inheritance |
| [Visibility and painting](#visibility-and-painting) | existence; layout participation; visibility; opacity; stacking; fill; stroke; non-scaling stroke; cap; join; dash; paint order; semantic style channel |
| [Resources and effects](#resources-and-effects) | linked visual content; embedded visual content; foreign content; paint resource; spatial paint frame; pattern; filter; effect region; clipping; masking; blending and compositing |
| [Generated composition](#generated-composition) | value binding; derived value; scoped policy; conditional presence; finite expansion; data mapping; sequence generation; allocation; bounded recursion; deterministic order; identifier generation; deterministic variation |
| [External producer index](#external-producer-index) | global layout; obstacle routing; overlap optimization; outline intersection; collision-free attached-content placement; geometric intersection; Boolean geometry; curve generation; path derivation |
| [Static-behavior boundary](#static-behavior-boundary) | static snapshot; multiple static states; animation; interaction; viewer portability |
| [Verification](#verification) | source validation; transformed-structure review; topology review; relation review; intersection review; marker review; alignment review; symmetry review; spacing review; extent review; native-size review; enlarged geometry review |

This is an overview order, not a total dependency order. Follow the prerequisites named by selected entries. No earlier family is a preferred subset, and later, constrained, external, or excluded capabilities must not disappear from consideration.

## Intent And Identity

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| I01 | Output contract | Authoritative source, editable source, derivative outputs, and acceptance surfaces | SVGDX source, generated SVG, raster derivatives, retained manifests | Direct | Bind every derivative to current source and declared size | S, X |
| I02 | Authored identity | Which visible or semantic objects require durable identity | Native-SVG/XML `id` authored once | Direct | Unique IDs and stable references after transformation | S, C, E |
| I03 | Expansion-safe identity | Which generated descendants require identity and how instances remain distinct | SVGDX-computed parameterized or prefixed IDs plus generated-SVG checks | Composed | Every generated ID is unique and every reference resolves | S, X |
| I04 | Descriptive attachment | Smallest independently meaningful owner and required description | Native-SVG `title`, `desc`, metadata, ARIA, and data attributes | Direct | Description remains bound to the intended owner under grouping and reuse | S |
| I05 | Static-behavior boundary | Which externally owned behavior is excluded, frozen, or represented as separate static states | Metadata and one or more static artifacts; behavior remains external | Constrained | Static appearance does not imply unsupported interaction or time behavior | S, C, P |

## Frames And Extents

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| F01 | Viewport contract | Output dimensions, `viewBox`, and aspect policy | Root SVG attributes and configuration | Direct | No clipping or aspect distortion on required surfaces | S, X |
| F02 | Coordinate frame | Owner, origin, axis direction, and conversion boundary | Root or nested user coordinate systems | Direct | Parent-relative and global values are not mixed | S, E, G |
| F03 | Normalized layout units | Unit meaning and conversion ownership | SVGDX-computed numeric user units after explicit conversion | Direct | Converted values preserve scale, sign, and frame | S, X |
| F04 | Unit-bearing native geometry | Which values render without participating in SVGDX numeric layout | Native-SVG pass-through at an explicit boundary | Constrained | Rendered scale is correct and no SVGDX reference depends on uncomputed units | S, X |
| F05 | Object extent | Which unpainted geometry controls placement | SVGDX-computed axis-aligned bounds | Direct | Irregular or transformed visible outlines are not mistaken for these bounds | X, S, P |
| F06 | Painted extent | Whether stroke, text, filters, or effects participate | Author-supplied construction regions and rendered inspection | Constrained | Local overflow is checked independently of root containment | S, P, E, X |
| F07 | Decorated extent | Whether markers and path decorations participate | Author-supplied construction regions and rendered inspection | Constrained | Marker overhang and clipping are inspected on every orientation | S, X |
| F08 | Construction extent | Whether non-rendering geometry affects composition or export | SVGDX-computed `point` and `box` semantics | Direct | Invisible geometry has the intended bounds participation | X |
| F09 | Layout-aware transform | Transform owner, pivot, and supported calculation | SVGDX-computed translate, scale, and rotate behavior | Direct | Calculated and rendered extents agree | S, P, X |
| F10 | Pass-through transform | Skew or matrix ownership and whether later layout may depend on it | Native-SVG pass-through | Constrained | SVGDX layout does not claim transformed bounds; painted result is reviewed | S, P, X |
| F11 | Serialization contract | Precision, coordinate conversion, metadata retention, and authoritative output stage | Combined runtime transform and native-SVG serialization | Constrained | Round-trip or renderer drift does not alter meaning | S, D, G, X |

## Visible Geometry

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| V01 | Reference point | Position and bounds participation | SVGDX `point` | Direct | Point is excluded from visible and aggregate bounds as intended | X |
| V02 | Reference region | Position, dimensions, and bounds participation | SVGDX `box` | Direct | Region affects aggregate extent without becoming visible | X |
| V03 | Direct segment | Endpoints and cap behavior | Native/SVGDX `line` | Direct | Zero length, endpoint order, and cap extension are reviewed | S, X |
| V04 | Rectangular area | Position, extent, and corner policy | Native/SVGDX `rect` | Direct | Stroke and label extents remain inside intended owner | S, X |
| V05 | Radial area | Center, radii, and intended extent | Native/SVGDX `circle` or `ellipse` | Direct | Enclosure and attachment use the intended bound model | S, X |
| V06 | Ordered-boundary region | Boundary ownership, ordering, closure, and fill between boundaries | Author calculation plus native path | Composed | Boundaries remain ordered and do not cross or leave unintended gaps | D, S |
| V07 | Angular or radial region | Centre, angular/radial boundaries, direction, closure, and normalization | Author calculation plus native path | Composed | Range, direction, closure, and zero/negative treatment are preserved | D, S |
| V08 | Open point sequence | Ordered vertices and openness | Native/SVGDX `polyline` or open `path` | Direct | Every retained vertex has an explicit role; no accidental closure | S, X |
| V09 | Closed point sequence | Ordered vertices, closure, and fill rule | Native/SVGDX `polygon` or closed `path` | Direct | Winding, markers, and start/end coincidence are deliberate | S, X, P |
| V10 | Native arbitrary outline | Segment sequence, openness, and approximation authority | Native-SVG `path` pass-through | Direct | Output contains finite intended geometry and no unintended self-intersection | S, P |
| V11 | Extended arbitrary outline | Segment sequence plus SVGDX bearing/repetition semantics | SVGDX-computed extended path | Constrained | Version-sensitive expansion is validated and transformed geometry inspected | X, S |
| V12 | Multiple subpaths | Ownership, fill, and discontinuity semantics | Native-SVG path subpaths | Direct | Gaps do not imply connection; fills obey declared rule | S, D |
| V13 | Conditional discontinuity | Skip, split, substitute, or reject policy | Multiple subpaths or SVGDX-generated conditional geometry | Composed | Single-point or invisible segments do not silently lose meaning | D, S, X |
| V14 | Compound fill | Subpath ownership and fill rule | Native-SVG compound path/fill rule | Direct | Holes and overlaps survive rendering and scaling | S, P |
| V15 | Clipped result | Clip owner and whether clipping changes only visibility | Native-SVG `clipPath` pass-through | Direct | Clipping is not treated as semantic containment or new geometry | S, P |
| V16 | Masked result | Mask owner and opacity interpretation | Native-SVG `mask` pass-through | Direct | Masking does not become topology or geometry authority | S |
| V17 | Boolean result | Operation, tolerance, fill interpretation, and maximum error | Externally computed native path | External | Provenance and tolerance retained; visual masking is not substituted | P |

## Placement

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| P01 | Explicit placement | Owning frame and exact position | Native coordinates or SVGDX `xy`/`cxy` | Direct | Values remain in the declared frame | S, X |
| P02 | Reference placement | Reference owner, reference extent, location, and offset | SVGDX element references and location suffixes | Direct | Movement of the reference preserves intended relation | X |
| P03 | Path-relative placement | Path owner, offset metric, side, and local orientation | SVGDX approximate path-offset reference or native authored placement | Constrained | Curved-length approximation and orientation are reviewed | S, P, X |
| P04 | Alignment | Edge, center, guide, or declared axis | SVGDX shared scalar references and location-qualified placement | Direct | Aligned painted extents, not only source coordinates, are inspected | X, E, G |
| P05 | Baseline alignment | Text owners, baseline policy, and font envelope | Combined SVGDX placement and native text properties | Constrained | Renderer metrics and painted alignment are inspected | S, X |
| P06 | Adjacency | Side, order, and gap | SVGDX directional adjacency references | Direct | Gap remains clear after stroke, text, and decorations | X, E |
| P07 | Separation | Which item pair and which extents define clearance | Reference placement with explicit gaps | Composed | Pairwise clearances are checked after rendering | E, G, X |
| P08 | Distribution | Ordered items, span, and spacing policy | SVGDX expressions, references, and iteration | Composed | Stable order and equal or intentional spacing are measured | E, G, X |
| P09 | Enclosure | Visible owner, enclosed objects, and margin | SVGDX `surround` and `margin` | Direct | Text and decorations excluded from calculated bounds are verified | X, C |
| P10 | Interior placement in axis-aligned bounds | Container, margin, and selected location | SVGDX `inside` and reference placement | Direct | Visible content stays within the intended owner | X |
| P11 | Interior placement in radial or mixed bounds | Container set, margin, and approximation policy | SVGDX `inside` where supported | Constrained | Multi-reference and radial limitations are disclosed and rendered result inspected | X |
| P12 | Guide | Axis, extent, and bounds participation | SVGDX `point`/`box` or native invisible construction | Direct | Guide geometry does not leak into output or distort extent | X |
| P13 | Ordered aligned set | Order, alignment axis, and whether relationships influence placement | Authored reference layout | Composed | Placement order and relationship semantics remain distinct | G, E, X |
| P14 | Packing contract | Component granularity, gutters, order, and compactness priority | Authored/reference layout | Composed | Compactness does not destroy hierarchy or readability | G, E, X |
| P15 | Authored overlap response | Which overlaps are prohibited and what may move | Author recomposition | Composed | No unexplained movement or new collision | G, E |
| P16 | Optimized overlap response | Movable items, protected structure, objective, tolerance, and producer | Imported coordinates | External | Aspect, ordering, ownership, and movement are reviewed | G, E |
| P17 | Balance contract | Declared measures and their priority | Authored composition plus rendered judgment | Constrained | Occupied extent, whitespace, emphasis, and alternatives are recorded | G, E, C |
| P18 | Symmetry contract | Axis, paired owners, invariant dimensions, and permitted asymmetry | Shared references, parameters, and repetition | Composed | Only declared invariants are measured; apparent drift is separately judged | C, E, G, X |
| P19 | Generated placement | Objective, hard constraints, fixed items, version, and seed | Imported coordinates | External | Solver output is frozen, attributed, and reviewed rather than trusted | G, E, C |

## Ownership And Reuse

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| O01 | Structural group | Shared transform/style/scope and semantic ownership | Native/SVGDX `g` | Direct | Group bounds and inherited presentation are intentional | S, P, X |
| O02 | Semantic container | Ownership and hierarchy independent of visible enclosure | Group plus metadata | Composed | Containment does not imply unsupported behavior | S, C, E |
| O03 | Visual enclosure | Visible boundary and margin independent of hierarchy | Area geometry using surround/reference placement | Composed | Enclosure follows intended visible owners | C, E, X |
| O04 | Clipping owner | Which item controls visibility | Group plus `clipPath` | Direct | Clipping does not silently remove required content | S, P |
| O05 | Transform owner | Which descendants share transform and frame | Group transform or positioned group | Direct | Nested transforms and references remain coherent | S, P, X |
| O06 | Definition | Shared immutable or parameterized source | Native `defs`/`symbol` or SVGDX reuse definition | Direct | Definition scope and IDs are stable | S, P, X |
| O07 | Linked instance | Shared definition with instance-level placement | Native `use` | Direct | Style scope, inherited data, and shadow-tree behavior are accepted | S, P |
| O08 | Expanded instance | Independent editable copy | SVGDX expanded reuse | Composed | Descendant IDs remain unique and variation is intentional | X |
| O09 | Parameterized instance | Definition inputs, defaults, and variation boundary | SVGDX fragment/variable/reuse mechanisms | Composed | Parameters do not leak across scope | X |

## Text And Attached Content

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | Owned text | Semantic owner and required content | Native/SVGDX `text` generation | Direct | Character data survives transform and binds to the owner | S, X, E |
| T02 | Text envelope | Whether text affects placement, routing, enclosure, or only paint | Author-supplied construction region plus rendered check | Constrained | Font-dependent painted bounds are inspected at every size | S, E, X |
| T03 | Text anchor | Anchor point, horizontal policy, and owner | Native text anchoring plus SVGDX placement | Direct | Alignment remains correct after content variation | S, X |
| T04 | Baseline | Baseline policy and vertical relation | Native baseline properties plus placement | Constrained | Renderer behavior and font metrics are reviewed | S, X |
| T05 | Wrapping | Line breaks, width, and overflow policy | Explicit text/tspan generation | Composed | No clipping, collision, or accidental truncation | S, X |
| T06 | Native path-bound text | Path owner, offset, side, orientation, and direction | Native-SVG `textPath` pass-through | Direct | Renderer support, reversal, curvature, and collisions are inspected | S, D |
| T07 | Authored path-relative content | Path owner, offset metric, side, orientation, and movement policy | SVGDX approximate path-offset reference plus separate native content | Constrained | Approximation, ownership, orientation, and collision are inspected | S, X |
| T08 | Relationship label | Relationship owner, allowed movement, and collision participation | Separate text with path-relative or authored reference placement | Composed | Label remains clear of unrelated geometry and preserves direction | E, G, C, X |
| T09 | Object label | Object owner, internal/external position, and envelope policy | Generated or native text with reference placement | Composed | Label remains within or clearly attached to its owner | E, C, X |
| T10 | Attached explanatory content | Target, attachment ownership, prominence, and authority | Content plus authored attachment geometry | Composed | Declared prominence is preserved without inventing topology or obstruction | S, X |

## Relationship Model

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| R01 | Terminal set | Authorized terminal identities and roles | Source metadata plus path endpoints | Composed | Every visible relation maps to the intended terminal set | E, C, G |
| R02 | Semantic direction | Meaningful direction or absence of direction | Relationship metadata plus authorized terminal roles | Composed | Semantic direction remains independent of route traversal | C, G, E |
| R03 | Geometric traversal | Start/end order of rendered geometry | SVGDX/native path endpoint order | Direct | Traversal maps to the intended terminals | S, X |
| R04 | Visible direction cue | Whether and how direction is painted | Native markers or other declared presentation | Direct | Cue orientation agrees with required semantic direction | S, C, G, X |
| R05 | Cardinality | Number and role of source/target terminals | Multiple paths and explicit junctions | Composed | Multi-terminal meaning is not reduced to ambiguous path contact | E |
| R06 | Multiplicity | Whether parallel identities stay separate or may share geometry | Offset lanes, separate paths, or explicit shared trunk | Composed | Bundling does not erase count, direction, or identity | C, G, E |
| R07 | Attachment intent | Desired site and allowed freedom independent of final geometry | Relationship metadata plus realized endpoint | Composed | Intent and realization remain separately reviewable | G, E, C, J, X |
| R08 | Exact or calculated-bound attachment | Exact point or SVGDX-calculated bound location | SVGDX `start`/`end` on supported line/polyline or authored endpoint | Direct | Scope and calculated-bound semantics are explicit | G, E, C, J, X |
| R09 | Visible-outline attachment | Outline metric, transforms, tolerance, and fallback | Externally computed endpoint | External | Bounding fallback is disclosed and rendered contact verified | C, G, J, P |
| R10 | Attachment constraint | Free, side-bound, ordered, proportional, or exact | Authored constraint metadata and realization | Composed | Unimplemented automatic constraint solving is not implied | E, C, G |
| R11 | Endpoint clearance | Visible gap between object, stroke, marker, and path | Authored endpoint or route geometry | Composed | No penetration, unintended gap, or marker collision | E, C, S, X |
| R12 | Relationship label ownership | Label owner and permitted route-relative movement | Text plus relationship metadata | Composed | Label remains unambiguous through route changes | E, C, G |
| R13 | Declared layout participation | Whether a relationship should influence placement | Construction-plan metadata | Composed | Static SVG does not claim retained solver constraints | G, E |
| R14 | Solved layout participation | Producer-owned constraint and resulting coordinates | Frozen external result | External | Producer, options, and result are retained and reviewed | G, E |

## Route Skeleton

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| Q01 | Direct route | Terminal attachment and absence of intermediate controls | SVGDX `line` with `start`/`end` or explicit endpoints | Direct | Directness is intentional; unrelated content remains clear | X, S |
| Q02 | Authored passage sequence | Exact vertices and each vertex's passage, direction, clearance, segmentation, decoration, or topology role | SVGDX/native `points` | Direct | Every retained vertex has the recorded role and stable order | X, E, C |
| Q03 | Generated rectilinear route | Endpoint intent and acceptance of renderer-selected bends | SVGDX `polyline` with `start`/`end` | Constrained | Generated vertices are inspected and frozen when determinism matters | X, G, E, J |
| Q04 | Authored rectilinear route | Exact axis-aligned vertices and corner policy | Authored `points` or path commands | Direct | No extra turns, reversals, shared residue, or avoidable detour | S, X, E |
| Q05 | Mixed-direction route | Allowed segment directions and reason for each transition | Authored point sequence or path | Direct | Direction changes preserve declared passage and composition intent | S, C, X |
| Q06 | Arrival and departure constraint | Required direction or side near each terminal | Authored first/final segments or frozen external route | Composed | Realized approach agrees with the recorded constraint | E, C, G |
| Q07 | Self-returning route | Owner, departure, return side, loop extent, and direction | Authored path or point sequence | Composed | Loop remains distinct from self-intersection and nearby relations | C, E, G |
| Q08 | Parallel lanes | Identity order, lane spacing, and bend correspondence | Authored offset paths | Composed | Lanes remain distinguishable and do not swap order | C, G, E |
| Q09 | Shared section | Which identities may share geometry and where they split | Explicit shared path plus branch paths and metadata | Composed | Shared geometry does not imply an unintended junction or erase multiplicity | G, E |
| Q10 | Branch | Branch topology, parent section, and terminal ownership | Multiple explicit sections | Composed | Branch point is explicit and every section has clear ownership | E |
| Q11 | Junction | Semantic connection, terminal set, and visible notation | Explicit coincident endpoints plus junction geometry/metadata | Composed | Contact and crossing are not mistaken for a junction | E, P, C |
| Q12 | Deliberate gap | Owner, gap extent, and semantic effect | Multiple subpaths or mask | Composed | Gap does not break a relation that should remain continuous | S, C |
| Q13 | Meeting treatment | Meeting owner, visible classification, prominence, and semantic effect | Authored local geometry | Composed | Treatment preserves declared topology and does not obscure direction | C, P |
| Q14 | Routing objective | Priority among length, turn count, crossings, shared geometry, straightness, and preserved placement | Construction-plan metadata or external producer options | Composed | Trade-offs are explicit and not replaced by a universal style rule | A, E, G, J |
| Q15 | Routing fallback and failure | Unsupported conditions, fallback owner, and whether failure must stop | Explicit author policy or external producer contract | Composed | No silent route-family or endpoint substitution | A, E, G, C, J |
| Q16 | Imported route | Producer, version, options, frame conversion, and frozen geometry | Native path/polyline | External | Provenance retained; route is reviewed against local intent | G, E, C, J |

## Path Behavior

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| H01 | Segment family | Straight, quadratic, cubic, arc, or compound segment contract | Native path commands | Direct | Segment choice preserves required passage and topology | S, P, D |
| H02 | Authored curve controls | Segment controls, frame, and exact authority | Native-SVG path commands or authored SVGDX references | Direct | Rendered path follows the authored controls | S, P, X |
| H03 | Generated interpolation | Passage, endpoint, continuity, monotonicity, overshoot, and closure contract | Externally generated native path | External | Generator, options, and geometric guarantees are verified | D, P |
| H04 | Passage requirement | Which positions the rendered path must pass through and with what tolerance | Construction metadata plus authored or generated geometry | Composed | Approximation is not presented as exact passage | D, P, S |
| H05 | Continuity requirement | Required positional, tangent, or curvature continuity | Construction metadata plus authored or external geometry | Composed | Local joins and generated guarantees are inspected | D, P |
| H06 | Monotonicity requirement | Axis, order, and whether extrema may be introduced | Construction metadata plus externally generated geometry | External | No invented reversals or extrema | D |
| H07 | Overshoot policy | Permitted deviation from control or sample envelope | Construction metadata plus externally generated geometry | External | Curves do not enter prohibited regions or self-intersect | D, P |
| H08 | Authored corner geometry | Sharp or explicitly authored rounded geometry | Native-SVG path | Direct | Corner geometry preserves short segments and clearance | S |
| H09 | SVGDX corner conversion | Radius source and affected point-sequence vertices | SVGDX `corner-radius` conversion | Constrained | Conversion is confirmed in generated SVG; malformed residue fails | X, S |
| H10 | Closure policy | Open, closed, or separately closed subpaths | Native-SVG path closure | Direct | Fill, cap, and marker behavior match intent | S, D |
| H11 | Missing-input policy | Break, omit, substitute, or reject | Conditional generation and multiple subpaths | Composed | Missing content is not silently bridged | D, X |
| H12 | Path reversal | Whether traversal, controls, markers, and attached content reverse | Author calculation or external geometry producer | External | Directional and path-relative content are remapped | P, S |
| H13 | Path extraction | Source interval, direction, closure, and endpoint policy | External geometry producer | External | Extracted geometry preserves declared segment authority | P |
| H14 | Path joining | Endpoint tolerance, direction, closure, and ownership | External geometry producer | External | Join does not invent topology or lose terminal identity | P |
| H15 | Offset construction | Offset side, distance, joins, self-intersection, and tolerance | External geometry producer | External | Offset topology and clearance are verified | P |
| H16 | Simplification | Tolerance and maximum positional/topological error | Externally computed path | External | Endpoints, narrow regions, intersections, and direction survive | P |
| H17 | Flattening | Tolerance and retained point order | Externally computed polyline | External | Curve semantics are not claimed after approximation | P |
| H18 | Approximate path measurement | Measurement frame, tolerance, and use | SVGDX approximate curved path-offset semantics | Constrained | Approximation does not become unqualified fact | S, P, X |
| H19 | Intersection classification | Crossing, touch, overlap, shared segment, or self-intersection | External geometry analysis plus authored disposition | External | Coverage, tolerance, and unsupported geometry are explicit | P, C, E |

## Direction And Decoration

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| D01 | Start decoration | Site, meaning, and path direction | Native `marker-start` | Direct | Start/end semantics are not reversed | S |
| D02 | Every-vertex decoration | Whether every eligible intermediate vertex receives the decoration | Native-SVG `marker-mid` | Direct | Duplicate or role-bearing vertices create only intended marks | S |
| D03 | Selected-site decoration | Selected vertex or path position independent of every eligible vertex | Authored separate geometry or split path | Composed | Selected-site ownership and placement are explicit | S |
| D04 | End decoration | Site, meaning, and path direction | Native-SVG `marker-end` | Direct | Tip meets intended terminal under the R11 clearance contract | S, X |
| D05 | Decoration form | Visible geometry, fill or openness, and the distinction it carries | Authored native-SVG marker content or separately owned geometry | Composed | Form remains unambiguous, legible, and collision-free at every site and surface | S |
| D06 | Orientation policy | Automatic, reverse-start, or explicit angle | Native-SVG marker orientation | Direct | Every used path orientation is rendered and inspected | S, X |
| D07 | Reference point | Marker point that coincides with the path site | Marker `refX`/`refY` and `viewBox` | Direct | Visual point, not marker-box edge, meets the intended site | S |
| D08 | Unit policy | User-space or stroke-relative dimensions | Native-SVG marker units | Direct | Stroke changes do not cause unintended scale changes | S |
| D09 | Scale policy | Marker dimensions and visual weight | Native-SVG marker width, height, and viewBox | Direct | Declared prominence and distinctions remain readable | S, G |
| D10 | Paint policy | Inherited, contextual, or fixed paint | Native marker presentation/CSS | Constrained | Bundled raster and required SVG viewers agree sufficiently | S, X |

## Visibility And Painting

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| A01 | Existence | Whether object is generated at all | SVGDX condition | Direct | References do not target absent output | X, C |
| A02 | Layout participation | Whether invisible content affects composition | Construction geometry or external layout record | Constrained | Visibility and bounds participation are not conflated | C, X |
| A03 | Visibility | Whether content paints while remaining structurally present | Native visibility/display properties | Direct | Required meaning is not hidden or interactive-only | S, C |
| A04 | Opacity | Paint transparency independent of existence | Native opacity | Direct | Transparent content does not remain a misleading obstacle or owner | S, C |
| A05 | Stacking | Which object paints above another | Document order and grouping | Direct | Occlusion does not hide terminals, labels, or direction | S, P |
| A06 | Fill policy | Fill, rule, opacity, and semantic role | Native-SVG presentation | Direct | Fill does not erase required internal content or distinctions | S, P |
| A07 | Stroke policy | Width, scaling, semantic role, and clearance participation | Native-SVG presentation | Direct | Stroke weight preserves declared variation and participates in collision review | S, E, C |
| A08 | Non-scaling stroke | Whether stroke width stays constant under transforms | Native-SVG vector effect | Constrained | Required renderer support and painted extents are inspected | S |
| A09 | Cap policy | End treatment and zero-length behavior | Native-SVG stroke linecap | Direct | Caps do not alter apparent endpoint authority | S |
| A10 | Join policy | Corner appearance and miter behavior | Native-SVG stroke linejoin/miterlimit | Direct | Joins do not create spikes or obscure route corners | S |
| A11 | Dash policy | Pattern, phase, semantic role, and scale behavior | Native-SVG dash presentation | Direct | Pattern remains distinguishable and does not misplace direction cues | S, C |
| A12 | Paint order | Fill, stroke, and decoration sequencing | Native-SVG paint order where supported | Constrained | Renderer support and visibility remain acceptable | S |
| A13 | Semantic style channel | Which presentation properties carry distinctions on required surfaces | Classes and multiple presentation channels | Composed | Declared distinctions survive every acceptance surface | S, C |

## Resources And Effects

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| U01 | Linked visual content | Resource authority, URI policy, fallback, intrinsic dimensions, and portability | Native-SVG `image` or referenced SVG pass-through | Constrained | Offline availability, aspect, bounds, and viewer behavior are verified | S, X |
| U02 | Embedded visual content | Encoding, intrinsic dimensions, aspect, and authority | Native-SVG embedded image data | Direct | Content digest, bounds, readability, and output size are recorded | S |
| U03 | Foreign content | Required viewer, fallback, sizing, and semantic boundary | Native-SVG `foreignObject` pass-through | Constrained | Bundled raster and required viewers are tested; unsupported behavior is explicit | S, X |
| U04 | Paint resource | Solid, gradient, repeated, or referenced paint and its owner | Native-SVG paint server; SVGDX gradient conveniences where supported | Direct | Paint does not become geometry or topology authority | S, X |
| U05 | Spatial paint frame | User-space or object-relative coordinates, transforms, and extent | Native-SVG paint-resource coordinate attributes | Constrained | Frame and transform survive scaling and reuse | S, X |
| U06 | Repeated paint | Tile geometry, coordinate frame, transform, and overflow | Native-SVG pattern pass-through | Direct | Repetition, clipping, and viewer support are inspected | S, X |
| U07 | Filter or effect | Effect owner, region, units, inputs, fallback, and extent | Native-SVG filter/effect pass-through | Constrained | Effect overflow, clipping, bounds mismatch, and renderer support are recorded | S, X |
| U08 | Clipping or masking | Visibility owner, coordinate frame, and semantic neutrality | Native-SVG clip or mask pass-through | Direct | Required content is not silently removed and visibility is not new geometry | S, P |
| U09 | Blending and compositing | Source order, isolation, blend/composite rule, and fallback | Native-SVG/CSS pass-through where supported | Constrained | Required viewers preserve intended distinctions and no content disappears | S |
| U10 | Style inheritance | Owner, inheritance boundary, class policy, and override precedence | Combined SVGDX class propagation and native-SVG/CSS presentation | Constrained | Generated descendants receive only intended geometry and presentation properties | S, C, X |

## Generated Composition

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| G01 | Value binding | Owner, default, scope, and accepted value domain | SVGDX variable mechanisms | Direct | Scope and substitution are deterministic | X |
| G02 | Derived value | Inputs, operation, units, and valid range | SVGDX expressions | Direct | No invalid, non-finite, or frame-mixed geometry | X |
| G03 | Scoped policy | Target elements, inherited fields, and override boundary | SVGDX defaults | Direct | Policy does not leak into unrelated content | X |
| G04 | Conditional presence | Condition, absent-state semantics, bounds, and references | SVGDX conditions | Direct | Omitted content leaves no stale route, label, or inventory row | X |
| G05 | Finite expansion | Source, count, order, and expansion bound | SVGDX loops and data iteration | Direct | Expansion is finite, ordered, and complete | X, D |
| G06 | Data mapping | Input identity and geometry/presentation accessors | Value binding, derived values, and generated elements | Composed | Mapping does not silently reorder or invent data | D, X |
| G07 | Sequence generation | Start, step, count, and coordinate owner | Derived values and finite expansion | Composed | No accumulated drift or off-by-one extent | D, X |
| G08 | Contiguous allocation | Ordering, baseline, normalization, range, and sign policy | Author calculation plus generated geometry | Composed | Intervals cover the declared extent without unintended overlap or gap | D |
| G09 | Bounded recursion | Termination, expansion limit, and identity policy | SVGDX bounded reuse/recursion contract | Direct | Limit failures are explicit and no partial result is accepted | X |
| G10 | Deterministic order | Source identity, source order, generated index, and serialization order | Data order plus authored identity/index mapping | Composed | Repeated output does not swap visual or semantic order | D, C, X |
| G11 | Identifier generation | Prefix, scope, and collision policy | SVGDX expansion plus authored parameterized IDs | Composed | All output IDs are unique and references resolve | S, X |
| G12 | Deterministic variation | Seed or stable input identity, variation range, and repeatability | Author-computed values or frozen external result | Composed | Same inputs reproduce the same output and stay within authority | D, X |

## External Producer Index

These capabilities remain visible even though the bundled runtime does not compute them. Each decision has one canonical catalog owner; this section only identifies the external execution contract.

| External computation | Canonical owner | Producer record required |
| --- | --- | --- |
| Global placement | P19 | Objective, constraints, fixed items, spacing, version, seed, coordinates, and extents |
| Obstacle routing | Q14-Q16 | Obstacles, clearance, route family, objective penalties, fallback, version, vertices, and paths |
| Overlap optimization | P16 | Movable items, protected structure, objective, tolerance, and revised positions |
| Visible-outline intersection | R09 | Exact boundary, transforms, tolerance, fallback, and endpoint coordinates |
| Collision-free attached-content placement | T02, T08-T10 | Envelopes, allowed regions, priority, obstacles, output positions, and owner mapping |
| Geometric intersection | H19 | Supported geometry, transforms, stroke policy, tolerance, classifications, and coverage manifest |
| Boolean geometry | V17 | Operation, fill rule, tolerance, error bound, and native path result |
| Curve generation | H03-H07 | Passage, continuity, monotonicity, overshoot, closure, options, and native path result |
| Path derivation | H12-H17 | Operation, tolerance, protected points, topology policy, and native path/polyline result |

## Static-Behavior Boundary

| ID | Capability | Minimum author decision | Translation | Status | Review obligation | Sources |
| --- | --- | --- | --- | --- | --- | --- |
| B01 | Static snapshot | Instant or state represented and excluded behavior | Static SVGDX/native-SVG artifact plus metadata | Direct | Snapshot does not imply transition, interaction, or persistence | S, C |
| B02 | Multiple static states | State identities, comparison relation, and whether order is temporal | Separate static artifacts or explicit static composition | Composed | State content and distinctions remain independently reviewable | S, C |
| B03 | Time-dependent presentation | Timing authority, state changes, fallback, and required viewer | Native-SVG animation pass-through or external runtime | External | Static raster audit cannot verify time behavior; use an accepted behavior owner | S, X |
| B04 | Interaction | Events, hit regions, state, focus, and required runtime | External interactive owner or native scripting boundary | External | Static appearance does not claim behavior | S, C, P |
| B05 | Viewer portability | Required SVG and raster viewers plus accepted differences | Conservative native-SVG subset and pinned raster output | Constrained | Every required viewer is tested at declared conditions | S, X |

## Verification

Use the separate [visual audit](visual-audit.md) as the normative procedure. The following capabilities are indexed here because every construction selection creates evidence obligations.

| ID | Capability | Required evidence |
| --- | --- | --- |
| Z01 | Source validation | Parser/transform diagnostics and absence of unresolved source constructs |
| Z02 | Transformed-structure review | Generated elements, IDs, references, path data, markers, bounds, and metadata |
| Z03 | Output audit | Task-relevant semantic correspondence, painted integrity, and required-surface coverage, expanded only where risk or ambiguity requires evidence |

## Provenance

The library paraphrases abstract construction semantics and contains no copied source code, artwork, templates, icons, defaults, or worked diagrams. Primary sources were accessed 2026-07-18. Source codes identify semantic provenance; translation and review obligations are local synthesis unless the row says otherwise.

| Code | Primary authority | Baseline and license | Relevant primary references |
| --- | --- | --- | --- |
| S | W3C SVG Working Group | SVG 2 Candidate Recommendation 2018-10-04; W3C document terms | [SVG 2](https://www.w3.org/TR/SVG2/), [paths](https://www.w3.org/TR/SVG2/paths.html), [structure](https://www.w3.org/TR/SVG2/struct.html), [painting](https://www.w3.org/TR/SVG2/painting.html), [document license](https://www.w3.org/copyright/document-license-2023/) |
| X | Bundled SVGDX | v0.30.0 plus local source delta; MIT; pre-1.0 | [source baseline](https://github.com/codedstructure/svgdx/tree/v0.30.0); source-delta SHA-256 `1608A0BF1CB9D6DC743940341F74D1B10CFC5579A1A20EC3A71520C8F72F92E8`; transformer WASM SHA-256 `AF1DE822DD31121CBD4DBA816C7E6283CA69BFB341625225554FCA3FCBF98B7B`; [local manual provenance](manual.md#provenance-and-further-reference) |
| R | Bundled raster review | `@resvg/resvg-wasm` 2.6.2; MPL-2.0; Noto Sans, Noto Serif, Noto Sans Mono, and Kalam under OFL | raster WASM SHA-256 `22BF6E9F9A100D972DA0411A69C5BA504367FC1FA87B3B64E3F35E53926D2D70`; font digests are recorded per output by the preview manifest; [local manual provenance](manual.md#provenance-and-further-reference) |
| G | Graphviz | 15.1.0; EPL-2.0; official page records a 2026-03-07 CPL-to-EPL change | [documentation](https://graphviz.org/documentation/), [routing](https://graphviz.org/docs/attrs/splines/), [ports](https://graphviz.org/docs/attr-types/portPos/), [release/download](https://graphviz.org/download/), [license](https://graphviz.org/license/) |
| E | Eclipse Layout Kernel | 0.12.0; EPL-2.0 with conditional GPL-3.0 secondary option | [release](https://eclipse.dev/elk/downloads/releasenotes/release-0.12.0.html), [graph model](https://eclipse.dev/elk/documentation/tooldevelopers/graphdatastructure.html), [coordinates](https://eclipse.dev/elk/documentation/tooldevelopers/graphdatastructure/coordinatesystem.html), [spacing](https://eclipse.dev/elk/documentation/tooldevelopers/graphdatastructure/spacingdocumentation.html) |
| C | Cytoscape.js | v3.34.0; MIT | [documentation](https://js.cytoscape.org/), [source](https://github.com/cytoscape/cytoscape.js/tree/v3.34.0) |
| D | D3-shape | v3.2.0; ISC | [shape reference](https://d3js.org/d3-shape), [curve reference](https://d3js.org/d3-shape/curve), [source](https://github.com/d3/d3-shape/tree/v3.2.0) |
| P | Paper.js | v0.12.18 source tag; MIT; published-release status not relied upon | [reference](https://paperjs.org/reference/), [path](https://paperjs.org/reference/path/), [item](https://paperjs.org/reference/item/), [source tag](https://github.com/paperjs/paper.js/tree/v0.12.18) |
| J | JointJS Core | 4.3 documentation; MPL-2.0; documentation/release alignment requires recheck before code use | [anchors](https://docs.jointjs.com/api/anchors/), [connection points](https://docs.jointjs.com/api/connectionPoints/), [routers](https://docs.jointjs.com/api/routers/), [connectors](https://docs.jointjs.com/api/connectors/), [source](https://github.com/clientIO/joint) |
| A | libavoid / Adaptagrams | official source and generated API; LGPL-2.1-or-later or commercial; no formal release baseline | [source](https://github.com/mjwybrow/adaptagrams), [routing API](https://www.adaptagrams.org/documentation/classAvoid_1_1Router.html), [attachment sites](https://www.adaptagrams.org/documentation/classAvoid_1_1ShapeConnectionPin.html) |

Conceptual extraction does not authorize implementation copying. Recheck the exact upstream version and license before bundling any code or asset. Graphviz orthogonal routing has documented port/label limitations; ELK multi-terminal and junction behavior is algorithm-dependent; JointJS can fall back across endpoint and router stages; libavoid release provenance is weak; D3 curve families preserve different guarantees. Generated routing, text bounds, irregular-outline attachment, intersection analysis, effect bounds, and some marker behavior remain version- or renderer-sensitive.
