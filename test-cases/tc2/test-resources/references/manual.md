# SVGDX Authoring Manual

This is the complete local reference for the bundled svgdx 0.30.0-compatible offline runtime. It describes capabilities, syntax, semantics, constraints, operation, and provenance in reference form. Standard SVG remains available throughout.

## Runtime Operation

Resolve paths relative to the directory containing `SKILL.md`.

The bundled [transform adapter](../executable-resources/node/render_svgdx.mjs) and [preview adapter](../executable-resources/node/preview_svg.mjs) require Node.js 18.3 or later and resolve runtime assets relative to their own locations.

| Operation | Command form | Result |
| --- | --- | --- |
| Validate | `node <skill-dir>/executable-resources/node/render_svgdx.mjs <source.svgdx> --check` | Parses and transforms without writing an artifact |
| Transform | `node <skill-dir>/executable-resources/node/render_svgdx.mjs <source.svgdx> -o <output.svg>` | Writes editable SVG output |
| Preview | `node <skill-dir>/executable-resources/node/preview_svg.mjs <output.svg> -o <preview.png> --review` | Writes a raster QA view plus native-pixel review tiles and a manifest |
| Validate audit | `node <skill-dir>/executable-resources/node/preview_svg.mjs --validate-audit <audit.md>` | Validates the canonical audit block, artifact bindings, view identities, inventories, and derived closure without rendering or writing |

The Node runtime adapter's transform wrapper accepts one source path, XML path, or `-` for standard input. Without an output option, a file source writes an adjacent `.svg`; standard input writes to standard output. `--stdout`, `--check`, and `--output` are mutually exclusive. `--metadata` adds `data-src-line` to the root when present, transformed source elements, and generated text. Repeatable `--var <key=value>` entries define variables before document processing, and `--help` reports usage. The wrapper reports transform warnings, refuses source overwrite, and accepts only one source.

The preview wrapper accepts one SVG path plus `--output`, `--width <pixels>`, `--background <colour>`, `--review`, and `--help`. Width is an integer from 64 through 8192; defaults are 1600 pixels and white. Without `--output`, it writes an adjacent `-preview.png`. `--review` also writes overlapping native-pixel two-dimensional tiles and `review.json` in a directory keyed by the full PNG digest. The manifest's `sourceSha256` identifies the generated SVG supplied to preview, not the editable SVGDX source. It also binds output digest, dimensions, tile coordinates and digests, render options, adapter and rasterizer identities, and font policy. Tiles from a different source, render, runtime, font, or configuration cannot masquerade as the current review surface. `--validate-audit` accepts no SVG positional and performs no render or write; it exits successfully only for a structurally valid, digest-bound, inventory-reconciled `closed-pass` audit. This validates integrity and recorded closure, not semantic completeness, observation truth, or pixel quality. Both wrappers use bundled WebAssembly and require no network access. Successful check and write notices use standard output; warnings and failures use standard error.

Use the adapters as the runtime boundary. Direct module initialization and substitute renderers are outside the documented workflow unless an adapter failure is first established and preserved with its exact diagnostic.

The renderer exits nonzero for malformed XML, invalid wrapper arguments, unsupported WASM API versions, and svgdx transform failures. Successful status reports execution validity and whether direct source/result string comparison is `identical` or `different`. That comparison does not identify pass-through, transformation, or semantic equivalence. Source composition, substantive SVGDX use, and semantic integrity remain review-required; establish them from the authored source and transformed result. `--check` is necessary but not sufficient: reconcile authored source, generated SVG, and rendered surfaces.

## Document And SVG Model

svgdx is an XML-based SVG superset. XML hierarchy, comments, and entity escaping still apply. Author processed `svg` trees without an SVG namespace; the transformer supplies the root namespace. An `svg` carrying `xmlns` is treated as native SVG and its subtree passes through without svgdx processing. Native SVG elements, attributes, definitions, presentation, CSS, gradients, filters, markers, clipping, and paths can coexist with svgdx extensions. SVG compatibility is qualified where svgdx performs geometry processing.

Input without an `svg` root is transformed as a fragment. Fragment output receives no generated root, namespace, dimensions, viewBox, background, auto-style CSS, definitions, or inline auto-style expansion. Auto-style classes remain unstyled unless styling is supplied by the embedding document.

Layout-managed elements are `circle`, `ellipse`, `image`, `line`, `path`, `polygon`, `polyline`, `rect`, `text`, `use`, `reuse`, `g`, `symbol`, `clipPath`, `box`, `point`, `svg`, and `foreignObject`.

For the root `svg` element:

- supplied attributes are preserved;
- missing SVG 1.1 version and namespace attributes are supplied;
- content bounds are calculated;
- missing `width`, `height`, and `viewBox` values are derived from bounds, scale, and border configuration; when one dimension is supplied, the other follows the calculated aspect ratio and preserves the supplied unit, and a missing `viewBox` is generated even when dimensions are supplied;
- non-rendering constructs affect bounds only where their documented semantics say so.

Layout arithmetic uses SVG user coordinates. Geometry containing units or percentages passes through but cannot generally supply a numeric svgdx bounding box unless a documented relative-length rule applies. `translate`, `scale`, and `rotate` affect calculated bounds, and location references account for transformed groups and reuse instances; `skewX`, `skewY`, and `matrix` render but are ignored by layout. Native SVG remains available when no svgdx construct owns the required result.

The `_` attribute emits a processed comment after variable substitution and expression evaluation. The `__` attribute emits raw comment content without that processing.

## Configuration

Place `config` before affected content. Its attributes update transform configuration from that point onward.

| Attribute | Domain | Meaning |
| --- | --- | --- |
| `debug` | boolean | Emit original processed elements and their attributes, generator/version, and full transform configuration as comments, and label generated auto-style sections; source attributes and supplied variables can therefore appear in output; default `false` |
| `scale` | number | Map user units to output millimetres; default `1` |
| `border` | nonnegative integer | Expand automatically calculated root bounds; default `5` |
| `background` | colour, `default`, or `none` | Set output background policy; default `default` |
| `auto-style-mode` | `none`, `inline`, or `css` | Disable auto-styles, emit them inline, or emit generated CSS; default `css` |
| `font-size` | number | Parameterize `d-text-*` size classes; default `3`; unclassified base text remains 3 px |
| `font-family` | string | Set theme font family; default `sans-serif` |
| `theme` | `default`, `bold`, `fine`, `glass`, `light`, or `dark` | Select built-in presentation defaults; default `default` |
| `svg-style` | CSS declaration string | Add style to the root SVG element |
| `loop-limit` | nonnegative integer | Reject excessive loop expansion; default `1000` |
| `var-limit` | nonnegative integer | Reject excessive variable string expansion; default `1024` |
| `depth-limit` | nonnegative integer | Reject excessive recursive processing; default `100` |
| `path-repeat-limit` | nonnegative integer | Reject excessive path repeat expansion; default `10000` |
| `seed` | nonnegative integer | Seed deterministic random expression functions; default `0` |
| `error-mode` | `strict`, `warn`, or `ignore` | Reject errors, preserve erroneous elements with warning comments, or preserve them silently; default `strict` |

`background="default"` selects the theme background; `none` requests transparency. Use strict error handling for deliverables. Limits reject the input; they do not truncate generated content.

`fine` uses reduced stroke and font weight; `bold` uses increased stroke and font weight; `glass` uses translucent fill and background; `light` and `dark` select their built-in foreground, fill, and background palettes.

The configuration attribute set is closed; unknown attributes are transform errors.

## Geometry And Layout

svgdx computes axis-aligned element bounds and exposes uniform geometry independent of the native shape attribute vocabulary.

### Position And Size

| Form | Semantics |
| --- | --- |
| `xy` | Position the selected location of a shape; defaults to its top-left bound |
| `cxy` | Position the center of a shape |
| `xy-loc` | Select which location on the positioned shape is controlled by `xy` |
| `wh` | Set width and height |
| `rxy` | Set ellipse x-radius and y-radius |
| `xy1`, `xy2` | Set the two endpoints of a line |
| `dx`, `dy`, `dxy` | Apply positional deltas where supported |
| `dw`, `dh`, `dwh` | Apply size deltas where supported |
| `rotate`, `rotate-loc` | Rotate in degrees around the selected bound location; center is the default |

Pair values use SVG comma-whitespace rules. A single pair value is repeated for both axes. Explicit native SVG attributes take precedence when both native and shortcut forms specify the same result. Universal geometry constraints may use `x`, `x1`, `cx`, `x2`, `width`, `y`, `y1`, `cy`, `y2`, and `height`; omitted positions default to zero, and over-constrained combinations fail. Line geometry can be derived from one endpoint plus width or height. Position and size deltas accept absolute numbers, percentages relative to the owned dimension, and rational `p/q` lengths with an integer denominator of at least 1. Rotated non-rectangular bounds can be conservative.

Position and size attributes can directly take an element reference. With no suffix, the target resolves the corresponding scalar from the referenced bound. For position attributes, optional `~<scalar>` or location/path-offset suffixes select the source value. For size attributes, optional `~<scalar>` selects another bound scalar. A following length adjusts the resolved value; percentage and rational adjustments use the owned referenced dimension. Valid scalar names are listed under Variables And Expressions.

### References And Alignment

An element reference is `#<id>`, one or more `^` tokens for preceding generated elements, or one or more `+` tokens for following generated elements. IDs begin with a letter or underscore and continue with letters, digits, underscores, hyphens, or colons. Supported layout references are resolved out of source order. Append a location to obtain a point on the referenced bound. Append `:<length>` without a location to address a line, polyline, or path offset; lines extrapolate outside the endpoint range, polylines and paths clamp to their first or last point, and curved-segment lengths are approximated.

| Location | Meaning |
| --- | --- |
| `@tl`, `@t`, `@tr` | top-left, top-center, top-right |
| `@l`, `@c`, `@r` | left-center, center, right-center |
| `@bl`, `@b`, `@br` | bottom-left, bottom-center, bottom-right |

The edge locations `t`, `r`, `b`, and `l` accept `:<length>`. A percentage is measured from the edge's left or top end and may fall outside 0 through 100 percent. A nonnegative number is measured from that start; a negative number is measured backward from the opposite end.

For `xy`, append one direction to an element reference to position another bound beside it: `|h` right, `|H` left, `|v` below, or `|V` above. A following absolute number is the gap. A location reference may instead be followed by an x/y offset pair. `xy-loc` controls which target location is aligned to the resulting point. These mechanisms provide edge, center, row, column, baseline, distributed-port, and guide alignment without embedding absolute coordinates.

### Bounds, Enclosure, And Containment

`surround` and `inside` are mutually exclusive. `surround` sizes an area shape to enclose referenced bounds; circles and ellipses use enclosing radii. `inside` derives contained geometry; rectangle-in-circle or ellipse cases use inscribed bounds, and circle or ellipse targets use inscribed radii. Multiple-reference `inside` involving circles or ellipses is limited and requires transformed-output inspection. `margin` then expands `surround` or contracts `inside`; one through four absolute, percentage, or rational values follow CSS top/right/bottom/left shorthand ordering. Containment emits `d-surround` or `d-inside` provenance classes.

`point` defines a non-rendering position and is excluded from composite and root bounds. `box` defines a non-rendering rectangular region and is included in those bounds. Both can be referenced by ID. A referenced `clipPath` can establish clipped bounds. Use these semantics deliberately for construction geometry and output extent.

Groups contribute aggregate bounds across rendered descendants, including labels and badges, and provide structural, transform, variable-local, and defaults scope. A location on a group addresses that aggregate, not a visually dominant child. Positioned groups retain inherent content size and reject conflicting size-inference constraints. Quadratic and cubic curves, arcs, and multiple path subpaths contribute calculated bounds, subject to transform and numerical limits. Rendered text bounds remain unreliable.

## Relationships And Paths

svgdx separates endpoint attachment from path geometry.

### Endpoint Attachment

`start` and `end` apply to `line` and `polyline`. Each accepts a coordinate pair or an element reference. Bare line references route axis-aligned where bounds overlap on one axis and join closest corners where neither axis overlaps. Intersecting bounds omit a connector when selected endpoints differ but retain a zero-length referenceable connector when both endpoints coincide. Location-qualified references select exact ports and bypass automatic port selection. Attachments use calculated bounds, not irregular visible outlines. `xy1` and `xy2` remain available for line endpoints without connector semantics.

### Generated And Authored Geometry

On `line`, `start` and `end` produce a straight relationship. On `polyline`, they produce a renderer-selected orthogonal route that may contain multiple corners. Repeated and collinear intermediate points are removed; a two-point polyline remains a polyline. Percentage or rational `corner-offset` values set bend placement and are clamped from zero through one, defaulting to 50 percent; absolute values set endpoint clearance and default to 3 units. Deprecated `edge-type` is consumed and ignored. Generated routing is version-sensitive: inspect transformed geometry and use authored `points` when turns must be deterministic.

`points` supplies every authored polyline or polygon vertex, including endpoints. Its sequence may contain literal coordinate pairs, expressions, element locations, line-like offsets, construction-point references, and scalar references. `dx`, `dy`, and `dxy` translate every resulting vertex. When `points` is present, `start` and `end` do not replace its first or last vertex; generated attachment and fully authored routing are alternative modes. This is the point-to-point mechanism for exact intermediate vertices and stable lanes. Numeric `corner-radius` removes repeated adjacent points, rounds every polygon corner or only intermediate polyline vertices, caps each radius by adjacent segment lengths, ignores an unmatched final coordinate, and emits a path retaining the radius attribute.

Native `path` supports standard SVG path data plus element-location and scalar references. Bearing starts at zero; `B` sets it absolutely and `b` adjusts it for subsequent relative `m`, `l`, `h`, and `v` commands only. `r` or `R` repeats a following bracket-delimited command block by a count. Repeat blocks may nest; sequential counts add, nested counts multiply, and the resulting expansion is bounded by `path-repeat-limit`. Treat these extensions as version-sensitive and validate their output.

### Direction And Markers

Direction is separated into semantic direction, geometric traversal order, and visible cue policy. Native SVG markers and CSS are supported, but no marker form is a general default. Decide marker sites, visible form, reference point, units, orientation, scale, paint, terminal clearance, and decorated extent from the verbal design and construction plan. Marker geometry is native SVG pass-through; SVGDX calculated path and root bounds do not establish decorated containment. Built-in auto-style orientation can be wrong on some vertical lines, and `context-stroke` marker paint can preview black in the bundled raster runtime. Inspect every rendered marker form and instance at every required orientation and surface. The bundled `assets/arrow-markers.svgdx` fragment is retired; do not use it as a design source.

## Text And Presentation

### Text Generation And Placement

`text` associates text with a shape and generates an immediately following SVG `text` element with `d-text`. Element character content and CDATA are accepted and concatenated in event order. Predefined and numeric XML character references are accepted; output serialization may normalize their lexical spelling while preserving the represented characters. Named references outside XML's predefined set are unsupported. Whitespace-only XML text outside the outer CDATA boundaries is treated as formatting, while inter-segment whitespace is retained. Literal or escaped newlines create multiple lines and preserve blank lines. A standalone SVG `text` element remains available. On a standalone text element, `rel` selects another element as the positioning bound and inside/outside basis.

`text-loc` uses bound locations, including edge offsets, for area shapes and relative positions for line-like content. Standalone relatively positioned text derives a compatible anchor automatically. `text-offset` defaults to 1, controls edge/corner inset or outset, and has no effect when centered. `text-dx`, `text-dy`, and `text-dxy` apply after that offset. `text-rotate` rotates around the text anchor without participating in layout; `text-lsp` sets multiline spacing in em units and defaults to 1.05. Generated text can retain these inert source attributes alongside emitted SVG positioning and transform attributes. Associated text defaults inside area shapes and outside line-like shapes; `d-text-inside` and `d-text-outside` override that policy.

Markdown processing is selected by nonempty `md`, an empty `md` flag for `text` or character content, or `d-markdown`. Nonempty `md` and `text` cannot coexist. Markdown recognizes inline bold, italic, and monospace spans only; it is not a block-markdown renderer.

Text-related source classes propagate to generated text; shadow, pattern, `d-surround`, flow, dash/dot, and most stroke-width classes are filtered. `d-inside` is not filtered. The moved presentation set is `alignment-baseline`; `font-family`, `font-size`, `font-size-adjust`, `font-stretch`, `font-style`, `font-variant`, and `font-weight`; `text-decoration`, `text-rendering`, `text-anchor`, `textLength`, and `lengthAdjust`; `word-spacing`, `letter-spacing`, `writing-mode`, and `unicode-bidi`. The source `style` attribute does not propagate; `text-style` supplies generated-text declarations. CSS selectors matching a propagated class still apply to the generated text element, so geometry-only declarations must be element-scoped or countered by text-specific presentation. Text geometry is font-dependent and not computed reliably during root-bound calculation.

### Defaults

`defaults` contains match rules that contribute attributes and classes without rendering. Attributes placed directly on `defaults` act as an initial wildcard rule. Child rules can match an element name, `_` for any element, a class, or an element-plus-class selector. The `match` attribute accepts comma-whitespace-separated selectors plus `init` and `final` flags. Those flags act only after their containing selector matches. Other selector forms are unsupported.

Explicit element attributes override defaults. Later matches override scalar attributes and augment `class`, `transform`, `style`, and `text-style`; classes are deduplicated. Defaults are scoped, with inner scopes taking priority without discarding outer scopes. `id` cannot be defaulted. Default substitution occurs before variable, expression, and compound-attribute processing.

### Native And Automatic Styles

Native SVG presentation attributes, inline `style`, `style` elements, classes, gradients, filters, patterns, and markers are supported. For text used on bundled raster surfaces, use explicit `font-family`, `font-size`, and `font-weight` properties rather than the CSS `font` shorthand. The bundled preview registers static Noto Sans and Noto Serif regular, semibold, and bold faces; Noto Sans Mono and Kalam have regular faces only. Use only family/weight pairs proved for that family by preview. Proof for another family does not establish a painted role, and an unavailable exact family requires an explicitly authored fallback. Use 400, 600, and 700 for proven regular, semibold, and bold roles. Preview rejects unsupported weights, unsupported family/weight pairs, font shorthand, and a required family with no authorized bundled fallback. Keep one unambiguous authority for each explicit text presentation property: preview rejects a stylesheet or inline declaration that wins with a different value than the element's presentation attribute, and governed stylesheet rules must use verifiable simple type, class, or ID selectors. The preview fails closed on start tags containing character references or a quoted `>` because its presentation verifier cannot prove that it and the renderer will decode those attributes identically. Use literal presentation attributes instead. A requested distinction that collapses in painted output still fails even when its declarations pass the source gate. On `linearGradient` and `radialGradient`, `stops` expands semicolon-separated offset/colour/optional-opacity entries; offsets accept absolute, percentage, or rational lengths and opacity is 0 through 1. Compound `xy1`/`xy2` and `cxy`/`fxy` provide vectors and focal points. Linear `dir` uses rightward zero and downward 90 degrees; absent `length` extends to the unit-square intercept. Supplying both endpoints with either `dir` or `length` is over-constrained. Centered gradient `rotate` maps to `gradientTransform`. Auto-style names beginning `d-` are reserved, and generated CSS is emitted only for encountered auto-styles.

| Family | Forms and behavior |
| --- | --- |
| Colour | `d-<colour>` controls stroke and associated text; `d-fill-<colour>` controls fill and contrast text; `d-text-<colour>` overrides text colour; `d-none` suppresses stroke without hiding associated text |
| Text size | `d-text-smallest`, `d-text-smaller`, `d-text-small`, `d-text-medium`, `d-text-large`, `d-text-larger`, `d-text-largest` |
| Text face and anchor | `d-text-monospace`, `d-text-italic`, `d-text-bold`, `d-text-normal`, `d-text-light`, `d-text-pre`, `d-text-vertical`; `d-text`, `d-text-top`, `d-text-bottom`, `d-text-left`, `d-text-right`, and each directional form with `-vertical` |
| Text outline | `d-text-ol`, colour suffixes, and `thinner`, `thin`, `medium`, `thick`, `thicker` width suffixes |
| Stroke pattern | `d-dot`, `d-dash`, `d-dot-dash` |
| Stroke weight | `d-thinner`, `d-thin`, `d-medium`, `d-thick`, `d-thicker` |
| Direction and motion | `d-arrow`, `d-biarrow`, `d-flow`, speed suffixes `slower`, `slow`, `fast`, `faster`, and `d-flow-rev` |
| Effects | `d-softshadow`, `d-hardshadow` |
| Fill patterns | `d-grid`, `d-grid-N`, `d-grid-v`, `d-grid-v-N`, `d-grid-h`, `d-grid-h-N`, `d-stipple`, `d-hatch`, `d-crosshatch`, with integer frequency suffixes from 1 through 100 |
| Bound visibility | `d-surround` and `d-inside` identify containment-derived geometry; `d-surround` can expose the calculated bound where supported |

Thickness steps change by factors of two. Text-size multipliers from `smallest` through `largest` are one-third, one-half, two-thirds, one, 1.5, two, and three times configured size. `d-text-pre` selects monospace preformatted handling with nonbreaking-space preservation. Flow durations are 4, 2, 1, 0.5, and 0.25 seconds from `slower` through `faster`; `d-flow-rev` reverses motion, and dot or dash classes can replace the flow pattern. Pattern spacing defaults to 1; horizontal and vertical grids select one axis, hatch families use fixed rotations, and pattern stroke scales from spacing and theme stroke. Pattern fills replace explicit fill colour. When conflicting auto-style classes have equal specificity, the last source class wins. Shadow and outside-text extents can exceed calculated bounds. Auto-colour assumes text has no stroke. Auto-style behavior depends on theme and `auto-style-mode`.

## Data Generation And Composition

### Variables And Expressions

`var` assigns one or more untyped, case-sensitive variables through attribute pairs; assignments on one element are evaluated simultaneously. Definitions are lexical to their nesting scope. `varDefault` assigns only when a variable is absent. Names begin with a letter or underscore and continue with letters, digits, or underscores; `_` conflicts with processed-comment syntax. `$name` and `${name}` perform substitution before expression tokenization; braces disambiguate adjacent characters.

Parent element attributes act as local variables for descendants and shadow globals without modifying them. Current-element attributes are excluded. For `reuse`, the invocation attributes provide locals. `var` attributes do not become locals.

Double braces delimit expressions. Values are numbers, quoted strings, unquoted text produced by `_`, bounding boxes, coordinate pairs, and comma-separated lists. Consecutive bracket delimiters preserve an otherwise tokenized fragment as one raw atom. Numeric zero is false and nonzero is true. Variable substitution precedes tokenization.

From highest to lowest precedence, syntax supports parentheses and unary minus; multiplication, division, Euclidean division `//`, and nonnegative Euclidean remainder `%`; addition and subtraction; infix `eq`, `ne`, `lt`, `le`, `gt`, and `ge`; then infix `and`, `or`, and `xor`. Operators of equal precedence associate left to right, logical operators do not short-circuit, and a comma separates list results or function arguments. Bare identifiers are function names. Numeric precision is at least single precision; trigonometric functions use degrees.

| Function family | Signatures and result |
| --- | --- |
| Scalar numeric | `abs(x)`, `ceil(x)`, `floor(x)`, `fract(x)`, `sign(x)`, `sqrt(x)`, `log(x)`, `exp(x)`, `pow(x,y)` |
| Division and aggregation | `divmod(x,n)` returns quotient and remainder; variadic `sum` and `product` accept an empty list, while `min`, `max`, and `mean` require at least one value |
| Trigonometry | `sin`, `cos`, `tan`, `asin`, `acos`, `atan`; angles are degrees |
| Random | `random()` returns a uniform value in `[0,1)`; `randint(min,max)` converts bounds to integers, requires ordered bounds, and includes both; `seed` controls determinism |
| Range and interpolation | `clamp(x,min,max)`, `mix(start,end,amount)` |
| Comparison and logic | `eq`, `ne`, `lt`, `le`, `gt`, `ge`, `if`, `not`, `and`, `or`, `xor`; false is zero and true is one |
| Coordinate and vector | `swap(a,b)`, `r2p(x,y)`, `p2r(r,theta)`, `addv(a...,b...)`, `subv(a...,b...)`, `scalev(s,a...)`; polar conversion uses rightward zero and clockwise display angles, add/sub require an even argument count, and scale requires at least one value |
| List | zero-based `select(n,a...)`, `head(a...)`, `tail(a...)`, `empty(a...)`, `count(a...)`, `in(x,a...)` |
| String and text | `split(separator,text)`, `splitw(text)`, `trim(text)`, `join(separator,a...)`; `_(value)` accepts exactly one string or text value and emits unquoted text |
| Geometry | `surround(bb...)` unions bounds; `inside(bb1,bb2)` returns per-axis intersection or the intervening gap; `mid` accepts exactly 2, 4, or 8 numeric values for scalar, coordinate, or bound midpoint; `xy(bb)`, `wh(bb)` or `size(bb)`, `loc(locspec,bb)`, and bounding-box `x1`, `y1`, `x2`, `y2`, `cx`, `cy`, `width`, and `height` |

Function names may result from substitution. User-defined functions are unsupported.

In expressions, a bare element reference yields its bounding box, a location or path-offset reference yields a coordinate pair, and a scalar reference yields one number. Scalar syntax is `<element-reference>~<name>`. Supported names are `x`, `x1`, `x2`, `y`, `y1`, `y2`, `w`, `width`, `h`, `height`, `cx`, `cy`, `r`, `rx`, and `ry`.

### Conditions And Iteration

`if` includes its content when numeric `test` is nonzero.

`loop` supports exactly one control form: `count`, `while`, or `until`. `count` is evaluated once as a nonnegative integer and performs a fixed number of iterations. `while` tests before each iteration. `until` tests after each iteration and therefore runs at least once. Optional `var`, floating-point `start`, and floating-point `step` apply to every control form, with start zero and step one by default. Side effects, including variable updates, occur per iteration.

`for` requires `data` and `var`, iterates the comma-separated evaluated list in `data`, and assigns each item to `var`; string items are quoted, and whitespace alone is not an item separator. Optional `idx` receives the zero-based index. Loop variables remain in the enclosing lexical scope after iteration. Deprecated aliases `loop-var` and `idx-var` are accepted but should not be authored.

All iterative forms are bounded by `loop-limit`. Variable expansion is bounded by `var-limit`, and recursive template processing by `depth-limit`.

### Definitions And Reuse

Native SVG `defs`, `symbol`, and `use` remain available and remain represented in output according to SVG semantics.

`specs` is a non-rendering source-definition container. Its identified descendants can be expanded by `reuse`. A container with `element="name"` defines a matching custom source element whose attributes become invocation locals. `loop`, `config`, `reuse`, `specs`, `var`, `if`, `defaults`, and `for` are reserved names. `specs` cannot be nested and does not remain in output.

`reuse` uses the unprefixed attribute name `href`; its value is an ID, previous-element, or next-element reference. It replaces itself with the expanded target, applies invocation ID, classes, style, and parameters, and adds the target ID as a class. Non-positioning invocation attributes become target locals; positioning attributes replace target positioning. Invocation `rotate` and `text-rotate` add to target values, while invocation `transform` follows the target transform. A reused `symbol` becomes `g`. Descendant IDs are copied into every expansion and must be omitted or parameterized to remain unique. This differs from native `use`, which remains a compact SVG reference in output.

`g` and `symbol` provide structural scope. Scoped defaults and parent-attribute locals compose through nesting. Groups, reuse instances, paths, polylines, and polygons support universal positioning through generated translation where direct geometry rewriting is not applicable. Native reusable definitions, source expansion, computed generation, and explicit source may be combined; select among them according to output and editability requirements rather than diagram category.

## Language Index

This index is for exact recall after capability discovery. It is not a substitute for the semantic sections above.

### Elements

| Element | Role |
| --- | --- |
| Native SVG elements | Rendered vector content, definitions, metadata, styling, clipping, filtering, and animation |
| `config` | Transform configuration |
| `defaults` | Scoped default attributes and classes |
| `var`, `varDefault` | Variable assignment and assignment-if-absent |
| `if` | Conditional source inclusion |
| `loop`, `for` | Repeated source generation |
| `specs`, `reuse` | Source definitions and expansion |
| Custom spec elements | Named source expansion through `specs element` |
| `point`, `box` | Non-rendering position and bound-affecting region |
| `g`, `symbol` | Structural and scoped composition |
| `linearGradient`, `radialGradient` | Native gradients with svgdx vector, stop, and rotation extensions |

### Attribute Families

| Family | Names or forms |
| --- | --- |
| Identity and comments | `id`, `class`, `_` processed comment, `__` raw comment |
| Configuration | `debug`, `scale`, `border`, `background`, `auto-style-mode`, font, theme, root style, limits, `seed`, `error-mode` |
| Position and size | universal x/y constraints, `xy`, `cxy`, `xy-loc`, `wh`, `rxy`, `xy1`, `xy2`, `dx`, `dy`, `dxy`, `dw`, `dh`, `dwh`, `rotate`, `rotate-loc` |
| Relative geometry | repeated `^` and `+`, `#id`, locations, edge and line/path offsets, directions, gaps, coordinate offsets, absolute/percentage/rational lengths |
| Enclosure | `surround`, `inside`, `margin` |
| Relationships and paths | `start`, `end`, `corner-offset`, `points`, `corner-radius`, path references, `B`, `b`, `r`, `R` |
| Text | `text`, `md`, `rel`, `text-loc`, `text-offset`, `text-dx`, `text-dy`, `text-dxy`, `text-rotate`, `text-lsp`, `text-style` |
| Gradients | `stops`, `xy1`, `xy2`, `cxy`, `fxy`, `dir`, `length`, `rotate` |
| Defaults | direct wildcard attributes, `match`, `init`, `final` |
| Reuse | `href`, invocation parameters, `specs element`, custom source elements |
| Conditions and iteration | `test`, `count`, `while`, `until`, `var`, `start`, `step`, `data`, `idx` |
| Expressions | `$name`, `${name}`, `{{...}}`, quoted strings, raw atoms, lists, element/bound/location/scalar references, arithmetic/comparison/logical operators |
| Functions | `abs`, `ceil`, `floor`, `fract`, `sign`, `divmod`, `sqrt`, `log`, `exp`, `pow`, `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `random`, `randint`, `min`, `max`, `sum`, `product`, `mean`, `clamp`, `mix`, `eq`, `ne`, `lt`, `le`, `gt`, `ge`, `if`, `not`, `and`, `or`, `xor`, `swap`, `r2p`, `p2r`, `select`, `addv`, `subv`, `scalev`, `head`, `tail`, `empty`, `count`, `in`, `split`, `splitw`, `trim`, `join`, `_`, `surround`, `inside`, `mid`, `xy`, `wh`, `size`, `loc`, `x1`, `y1`, `x2`, `y2`, `cx`, `cy`, `width`, `height` |
| Auto-styles | colour, fill, text, outline, anchor, size, weight, stroke pattern, arrows, flow, shadows, patterns, Markdown, inside/outside, and bound visibility families |
| Native SVG | Any SVG attribute valid for the element and target SVG version |

Generated routing and some compound transform interactions remain version-sensitive. Use the semantic limits above, run `--check`, and inspect generated SVG rather than inferring undocumented combinations.

## Diagnostics And Visual QA

Resolve all transform errors rather than suppressing them. After validation and transformation, apply the complete [visual audit](visual-audit.md). The audit is seeded from the source-bound semantic inventory, maps required content to generated structure and painted output in both directions, and separately records artifact-discovered defects. Successful transformation is not content equivalence or visual acceptance.

Render every requested raster through preview `--review`. Confirm that each manifest binds the current source, output, adapter, rasterizer, font, dimensions, background, and requested width. Inspect every full raster at recorded native scale. Inspect emitted tiles that cover local endpoint, vertex, meeting, marker, line, text, alignment, or spacing risks; inspect the complete tile set when the full surface cannot establish coverage. Tiles are QA views rather than substitute deliverables.

Treat each requested size as an independent acceptance surface and judge it at native pixel dimensions. Unreadable required content, incoherent overlap, clipping, or lost meaning fails the surface even when broad structure remains recognizable; enlargement cannot establish readability. Recompose and rerender until every governed semantic, structural, and perceptual disposition passes.

Apply these integrity invariants:

- **Semantic integrity:** Visible assertions, relations, qualifications, and uncertainty preserve source authority and precision.
- **Transformation integrity:** Required character data and meaning survive unchanged; execution success is not content equivalence.
- **Relationship integrity:** Visible relations have authorized endpoints, direction, meaning, and qualification; labels bind unambiguously.
- **Perceptual integrity:** Required content is directly readable at native size without enlargement; visible items remain inside their owners and clear of unrelated content.
- **Bounds integrity:** Global containment does not prove owner containment.
- **Evidence integrity:** Retain the artifact identity, inspected surfaces, and decisive evidence for every defect or unresolved claim.

Use the audit's compact evidence record. Verify required content and omissions; relationship terminals, direction, attachment, sharing, meetings, and markers; visible ownership and containment; declared and apparent alignment, repetition, spacing, balance, and symmetry; native-size hierarchy and readability; and artifact identity. Expand evidence where risk, ambiguity, failure, or analyzer limits require it. Meaning must not depend on colour alone when the acceptance surface requires a non-colour distinction.

Known review constraints:

- markers may extend beyond calculated bounds;
- `d-medium` can propagate to generated text and affect its stroke width;
- malformed `corner-radius` conversion can remain unconverted without a strict diagnostic;
- svgdx is pre-1.0 and syntax or edge behavior may change.

Use native SVG, explicit geometry, `box`, or a larger configured border when a documented calculation cannot establish the required result. Verify the resulting artifact rather than relying on the workaround itself.

## Provenance And Further Reference

Bundled svgdx runtime:

- [JavaScript wrapper](../executable-resources/node/svgdx-wasm/svgdx.js)
- [WebAssembly binary](../executable-resources/node/svgdx-wasm/svgdx_bg.wasm)
- [ESM metadata](../executable-resources/node/svgdx-wasm/package.json)
- [MIT license](../executable-resources/node/svgdx-wasm/LICENSE)
- [Source delta from the baseline](svgdx-v0.30.0-runtime.patch)

SHA-256: `svgdx.js` is `32E1CF9E13F4FBD5CE8115251704FCC36599E668FA63EF9396056429D35071B0`; `svgdx_bg.wasm` is `AF1DE822DD31121CBD4DBA816C7E6283CA69BFB341625225554FCA3FCBF98B7B`; the source delta is `1608A0BF1CB9D6DC743940341F74D1B10CFC5579A1A20EC3A71520C8F72F92E8`.

The binary was built from the v0.30.0 baseline plus the bundled source delta with Rust 1.97.0, target `wasm32-unknown-unknown`, release profile, disabled default features, and the `json` feature; bindings were generated by `wasm-bindgen` 0.2.125 for `web`; Binaryen 130.0.0 applied `wasm-opt -Oz`.

The PNG adapter bundles the [`@resvg/resvg-wasm` 2.6.2 wrapper](../executable-resources/node/resvg-wasm/index.mjs), [WebAssembly binary](../executable-resources/node/resvg-wasm/index_bg.wasm), and [MPL-2.0 license](../executable-resources/node/resvg-wasm/LICENSE). Its WASM SHA-256 is `22BF6E9F9A100D972DA0411A69C5BA504367FC1FA87B3B64E3F35E53926D2D70`. Offline text rendering uses static Noto Sans and Noto Serif regular, semibold, and bold faces plus regular Noto Sans Mono and Kalam. All are distributed under the SIL Open Font License retained in `assets/fonts`; the review manifest records every loaded font digest, generic-family mapping, and proven family capability.

Authoritative references:

- Bundled-runtime source baseline: https://github.com/codedstructure/svgdx/tree/v0.30.0
- Project and current source: https://github.com/codedstructure/svgdx
- Complete upstream manual: https://svgdx.net/docs/
- Upstream element reference: https://svgdx.net/docs/reference/element-ref.html
- Upstream attribute reference: https://svgdx.net/docs/reference/attribute-ref.html
- Upstream expression reference: https://svgdx.net/docs/reference/expressions.html
- Upstream layout reference: https://svgdx.net/docs/reference/layout.html
- Upstream style reference: https://svgdx.net/docs/reference/styles.html
- Hosted editor and runtime: https://svgdx.net/

The local manual is the discovery and operation authority for this skill. The hosted documentation can advance beyond the bundled runtime; use the v0.30.0 source baseline for version disputes and current upstream references for later behavior and native SVG semantics. Do not use a narrow tutorial chapter as a capability catalog.

The [construction library](construction-library.md) is the bounded cross-library capability catalog for static explanatory composition. It records source provenance, execution owner, local translation fidelity, and review obligations without replacing this manual's complete SVGDX language semantics. The [visual audit](visual-audit.md) is the normative artifact-review procedure.
