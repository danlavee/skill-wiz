#!/usr/bin/env node

import { parseArgs } from "node:util";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync } from "node:zlib";
import { initWasm, Resvg } from "./resvg-wasm/index.mjs";

const usage = `Usage: node preview_svg.mjs <input.svg> [options]

Options:
  -o, --output <file>       Write PNG to this path
      --width <pixels>      Preview width (default: 1600)
      --background <color>  CSS background color (default: white)
      --review              Write digest-bound two-dimensional review tiles and manifest
      --validate-audit <file>
                            Validate audit structure, bindings, and closure without rendering
  -h, --help                Show this help

Without --output, diagram.svg renders beside the source as diagram-preview.png.`;

const auditClasses = [
  "authority-atom",
  "visible-mark",
  "cross-owner-interaction",
  "directed-terminal",
  "text-owner-boundary",
  "artifact-finding",
];

function requireObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value;
}

function requireString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} must be a nonempty string.`);
  }
  return value;
}

async function readBoundFile(auditDir, binding, label, requireDigest = true) {
  requireObject(binding, label);
  const filePath = resolve(auditDir, requireString(binding.path, `${label}.path`));
  const bytes = await readFile(filePath);
  if (requireDigest) {
    const expected = requireString(binding.sha256, `${label}.sha256`);
    const actual = sha256(bytes);
    if (actual.toLowerCase() !== expected.toLowerCase()) {
      throw new Error(`${label} digest mismatch: expected ${expected}, got ${actual}.`);
    }
  }
  return { filePath, bytes };
}

async function validateAudit(auditPath) {
  const auditBytes = await readFile(auditPath);
  const auditText = auditBytes.toString("utf8");
  const blocks = [...auditText.matchAll(/```svgdx-audit\s*\r?\n([\s\S]*?)\r?\n```/g)];
  if (blocks.length !== 1) {
    throw new Error("audit.md must contain exactly one fenced svgdx-audit JSON block.");
  }

  let audit;
  try {
    audit = JSON.parse(blocks[0][1]);
  } catch (error) {
    throw new Error(`invalid svgdx-audit JSON: ${error.message}`);
  }
  requireObject(audit, "audit");
  if (audit.schemaVersion !== 1) throw new Error("audit.schemaVersion must be 1.");

  const auditDir = dirname(resolve(auditPath));
  const binding = requireObject(audit.binding, "audit.binding");
  await readBoundFile(auditDir, binding.authority, "binding.authority");
  await readBoundFile(auditDir, binding.authoringSource, "binding.authoringSource");
  const generated = await readBoundFile(
    auditDir,
    binding.generatedSvg,
    "binding.generatedSvg",
    false,
  );
  const preview = await readBoundFile(
    auditDir,
    binding.reviewPng,
    "binding.reviewPng",
    false,
  );
  const review = await readBoundFile(
    auditDir,
    binding.reviewManifest,
    "binding.reviewManifest",
  );
  const reviewManifest = JSON.parse(review.bytes.toString("utf8"));
  if (
    sha256(generated.bytes).toLowerCase() !==
    requireString(reviewManifest.sourceSha256, "review.json sourceSha256").toLowerCase()
  ) {
    throw new Error("generated SVG does not match review.json sourceSha256.");
  }
  if (
    sha256(preview.bytes).toLowerCase() !==
    requireString(reviewManifest.outputSha256, "review.json outputSha256").toLowerCase()
  ) {
    throw new Error("review PNG does not match review.json outputSha256.");
  }

  const tileByPosition = new Map();
  for (const tile of reviewManifest.tiles ?? []) {
    const tileBytes = await readFile(resolve(dirname(review.filePath), tile.file));
    if (
      sha256(tileBytes).toLowerCase() !==
      requireString(tile.sha256, `review tile ${tile.file} sha256`).toLowerCase()
    ) {
      throw new Error(`review tile digest mismatch: ${tile.file}.`);
    }
    tileByPosition.set(`${tile.row}:${tile.column}`, tile);
  }

  if (!Array.isArray(audit.views) || audit.views.length === 0) {
    throw new Error("audit.views must be a nonempty array.");
  }
  const viewIds = new Set();
  for (const view of audit.views) {
    requireObject(view, "view");
    const id = requireString(view.id, "view.id");
    if (viewIds.has(id)) throw new Error(`duplicate view id: ${id}.`);
    viewIds.add(id);
    if (view.kind === "output") continue;
    if (
      view.kind !== "tile" ||
      !Number.isInteger(view.row) ||
      !Number.isInteger(view.column) ||
      !tileByPosition.has(`${view.row}:${view.column}`)
    ) {
      throw new Error(`view ${id} does not identify a review-manifest surface.`);
    }
  }

  const inventory = requireObject(audit.inventory, "audit.inventory");
  const inventoryKeys = Object.keys(inventory).sort();
  if (JSON.stringify(inventoryKeys) !== JSON.stringify([...auditClasses].sort())) {
    throw new Error(`audit.inventory must contain exactly: ${auditClasses.join(", ")}.`);
  }
  if (!Array.isArray(audit.rows)) throw new Error("audit.rows must be an array.");

  const rowIds = new Set();
  const rowsByClass = new Map(auditClasses.map((name) => [name, []]));
  for (const row of audit.rows) {
    requireObject(row, "audit row");
    const id = requireString(row.id, "row.id");
    if (!/^[A-Z][A-Z0-9_-]*$/.test(id)) {
      throw new Error(`invalid row id: ${id}.`);
    }
    if (rowIds.has(id)) throw new Error(`duplicate row id: ${id}.`);
    rowIds.add(id);
    if (!auditClasses.includes(row.class)) {
      throw new Error(`invalid row class for ${id}: ${row.class}.`);
    }
    if (!Array.isArray(row.views) || row.views.length === 0) {
      throw new Error(`row ${id} must reference at least one view.`);
    }
    for (const view of row.views) {
      if (!viewIds.has(view)) throw new Error(`row ${id} references unknown view ${view}.`);
    }
    requireString(row.authorityAtom, `row ${id}.authorityAtom`);
    if (!Array.isArray(row.owners) || row.owners.length === 0) {
      throw new Error(`row ${id}.owners must be a nonempty array.`);
    }
    row.owners.forEach((owner, index) =>
      requireString(owner, `row ${id}.owners[${index}]`),
    );
    requireString(row.observation, `row ${id}.observation`);
    if (!["pass", "fail", "open"].includes(row.disposition)) {
      throw new Error(`row ${id}.disposition must be pass, fail, or open.`);
    }
    rowsByClass.get(row.class).push(id);
  }

  for (const className of auditClasses) {
    if (!Array.isArray(inventory[className])) {
      throw new Error(`inventory.${className} must be an array.`);
    }
    const declared = [...inventory[className]].sort();
    const actual = rowsByClass.get(className).sort();
    if (new Set(declared).size !== declared.length) {
      throw new Error(`inventory.${className} contains duplicate ids.`);
    }
    if (JSON.stringify(declared) !== JSON.stringify(actual)) {
      throw new Error(`inventory.${className} does not match its audit rows.`);
    }
  }

  const derivedClosure = audit.rows.some((row) => row.disposition === "open")
    ? "open"
    : audit.rows.some((row) => row.disposition === "fail")
      ? "closed-fail"
      : "closed-pass";
  if (audit.closure !== derivedClosure) {
    throw new Error(`audit.closure must be derived as ${derivedClosure}.`);
  }
  if (derivedClosure !== "closed-pass") {
    throw new Error(`audit is not deliverable: ${derivedClosure}.`);
  }

  console.log(JSON.stringify({
    schemaVersion: audit.schemaVersion,
    auditSha256: sha256(auditBytes),
    reviewManifestSha256: sha256(review.bytes),
    rowCount: audit.rows.length,
    counts: Object.fromEntries(
      auditClasses.map((name) => [name, rowsByClass.get(name).length]),
    ),
    closure: derivedClosure,
  }, null, 2));
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const chunk = Buffer.alloc(data.length + 12);
  chunk.writeUInt32BE(data.length, 0);
  chunk.write(type, 4, 4, "ascii");
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(chunk.subarray(4, data.length + 8)), data.length + 8);
  return chunk;
}

function encodeRgbaPng(width, height, rgba) {
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * stride;
    for (let x = 0; x < width; x += 1) {
      const source = (y * width + x) * 4;
      const target = row + 1 + x * 4;
      raw[target] = rgba[source];
      raw[target + 1] = rgba[source + 1];
      raw[target + 2] = rgba[source + 2];
      raw[target + 3] = rgba[source + 3];
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header.set([8, 6, 0, 0, 0], 8);
  return Buffer.concat([
    Buffer.from("89504e470d0a1a0a", "hex"),
    pngChunk("IHDR", header),
    pngChunk("IDAT", deflateSync(raw, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex").toUpperCase();
}

const supportedFontWeights = new Set([
  "400",
  "600",
  "700",
  "normal",
  "bold",
  "inherit",
  "initial",
  "unset",
]);

function sourcePosition(source, index) {
  const before = source.slice(0, index);
  const lines = before.split("\n");
  return { line: lines.length, column: lines.at(-1).length + 1 };
}

function maskCssComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, (comment) =>
    comment.replace(/[^\r\n]/g, " "),
  );
}

function normalizeCssValue(value) {
  return value.replace(/\s*!important\s*$/i, "").trim().toLowerCase();
}

function assertVerifiableXmlAttributes(source) {
  const failures = [];
  for (let start = source.indexOf("<"); start !== -1; start = source.indexOf("<", start + 1)) {
    if (/^<(?:\/|!|\?)/.test(source.slice(start, start + 3))) continue;
    let quote = null;
    let end = start + 1;
    let quotedGreaterThan = false;
    for (; end < source.length; end += 1) {
      const character = source[end];
      if (quote) {
        if (character === quote) quote = null;
        else if (character === ">") quotedGreaterThan = true;
      } else if (character === '"' || character === "'") {
        quote = character;
      } else if (character === ">") {
        break;
      }
    }
    if (end >= source.length) {
      failures.push({ ...sourcePosition(source, start), reason: "unterminated start tag" });
      break;
    }
    const tag = source.slice(start, end + 1);
    if (quotedGreaterThan) {
      failures.push({
        ...sourcePosition(source, start),
        reason: "quoted > in an attribute",
      });
    }
    if (/&(?:#\d+|#x[0-9a-f]+|[a-z][\w.-]*);/iu.test(tag)) {
      failures.push({
        ...sourcePosition(source, start),
        reason: "character reference in an attribute",
      });
    }
  }
  if (failures.length === 0) return;
  const details = failures
    .map(({ line, column, reason }) => `  ${line}:${column} ${reason}`)
    .join("\n");
  throw new Error(
    `SVG_PRESENTATION_SOURCE_UNVERIFIABLE:\n${details}\nUse literal, unambiguous presentation attributes so preview and renderer cannot interpret different text styles. Preview rejected; output was not updated.`,
  );
}

function inspectCssDeclarations(source, offset, context, findings) {
  const masked = maskCssComments(source);
  const weightPattern = /\bfont-weight\s*:\s*([^;}]+)/gi;
  let match;
  while ((match = weightPattern.exec(masked)) !== null) {
    const value = normalizeCssValue(match[1]);
    findings.declarationsChecked += 1;
    if (!supportedFontWeights.has(value)) {
      findings.violations.push({
        ...sourcePosition(findings.source, offset + match.index),
        context,
        property: "font-weight",
        value,
      });
    }
  }

  const shorthandPattern = /(?:^|[;{])\s*font\s*:/gi;
  while ((match = shorthandPattern.exec(masked)) !== null) {
    findings.violations.push({
      ...sourcePosition(findings.source, offset + match.index),
      context,
      property: "font",
      value: "shorthand",
    });
  }
}

function assertSupportedFontWeightDeclarations(source) {
  const text = source.toString("utf8");
  assertVerifiableXmlAttributes(text);
  const findings = {
    source: text,
    declarationsChecked: 0,
    violations: [],
  };

  const styleBlockPattern = /<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi;
  let match;
  while ((match = styleBlockPattern.exec(text)) !== null) {
    const contentOffset = match.index + match[0].indexOf(match[1]);
    inspectCssDeclarations(match[1], contentOffset, "style block", findings);
  }

  const tagPattern = /<(?!\/|!|\?)[^>]+>/g;
  while ((match = tagPattern.exec(text)) !== null) {
    const tag = match[0];
    const id = tag.match(/\bid\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    const context = id ? `element #${id[1] ?? id[2]}` : "element";
    const weightPattern =
      /\bfont-weight\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
    let weightMatch;
    while ((weightMatch = weightPattern.exec(tag)) !== null) {
      const value = normalizeCssValue(
        weightMatch[1] ?? weightMatch[2] ?? weightMatch[3],
      );
      findings.declarationsChecked += 1;
      if (!supportedFontWeights.has(value)) {
        findings.violations.push({
          ...sourcePosition(text, match.index + weightMatch.index),
          context,
          property: "font-weight",
          value,
        });
      }
    }

    const stylePattern = /\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
    let styleMatch;
    while ((styleMatch = stylePattern.exec(tag)) !== null) {
      const style = styleMatch[1] ?? styleMatch[2];
      const styleOffset =
        match.index + styleMatch.index + styleMatch[0].indexOf(style);
      inspectCssDeclarations(style, styleOffset, context, findings);
    }

    if (
      /\battributeName\s*=\s*(?:"font-weight"|'font-weight')/i.test(tag)
    ) {
      findings.violations.push({
        ...sourcePosition(text, match.index),
        context,
        property: "font-weight",
        value: "animated",
      });
    }
  }

  if (findings.violations.length > 0) {
    const details = findings.violations
      .map(
        ({ line, column, context, property, value }) =>
          `  ${line}:${column} [${context}] ${property}="${value}"`,
      )
      .join("\n");
    throw new Error(
      `SVG_FONT_WEIGHT_UNSUPPORTED:\n${details}\nUse explicit longhand values 400, 600, or 700 for the intended regular, semibold, or bold role. Preview rejected; output was not updated.`,
    );
  }

  return {
    supportedValues: ["400", "600", "700", "normal", "bold"],
    declarationsChecked: findings.declarationsChecked,
    unsupportedDeclarations: 0,
  };
}

const governedTextPresentationProperties = new Set([
  "fill",
  "fill-opacity",
  "stroke",
  "stroke-opacity",
  "stroke-width",
  "opacity",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "letter-spacing",
  "word-spacing",
  "text-anchor",
  "dominant-baseline",
  "visibility",
]);

function parseDeclarations(source) {
  const declarations = [];
  const pattern = /(?:^|;)\s*([\w-]+)\s*:\s*([^;}]+)/g;
  let match;
  while ((match = pattern.exec(maskCssComments(source))) !== null) {
    const property = match[1].toLowerCase();
    if (!governedTextPresentationProperties.has(property)) continue;
    const important = /\s*!important\s*$/i.test(match[2]);
    declarations.push({
      property,
      value: normalizeCssValue(match[2]),
      important,
      offset: match.index,
    });
  }
  return declarations;
}

function parseSimpleSelector(source) {
  const selector = source.trim();
  if (!selector || /[\s>+~:[\]]/.test(selector)) return null;
  const typeMatch = selector.match(/^(\*|[A-Za-z_][\w-]*)/);
  const type = typeMatch?.[1]?.toLowerCase() ?? "*";
  const remainder = selector.slice(typeMatch?.[0]?.length ?? 0);
  const ids = [...remainder.matchAll(/#([\w-]+)/g)].map((match) => match[1]);
  const classes = [...remainder.matchAll(/\.([\w-]+)/g)].map((match) => match[1]);
  if (remainder.replace(/(?:#[\w-]+|\.[\w-]+)/g, "") !== "") return null;
  return {
    source: selector,
    type,
    ids,
    classes,
    specificity: [ids.length, classes.length, type === "*" ? 0 : 1],
  };
}

function readAttribute(tag, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `(?:^|\\s)${escapedName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i",
  );
  const match = tag.match(pattern);
  return match ? match[1] ?? match[2] ?? match[3] : null;
}

function selectorMatchesElement(selector, element) {
  if (selector.type !== "*" && selector.type !== element.type) return false;
  if (selector.ids.some((id) => id !== element.id)) return false;
  return selector.classes.every((name) => element.classes.has(name));
}

function compareSpecificity(left, right) {
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

function resolveTextProperty(
  property,
  tag,
  matchingRules,
  inlineDeclarations,
  tagOffset,
) {
  const candidates = [];
  for (const rule of matchingRules) {
    for (const declaration of rule.declarations) {
      if (declaration.property !== property) continue;
      candidates.push({
        ...declaration,
        selector: rule.selector.source,
        specificity: rule.selector.specificity,
        order: rule.order,
        offset: rule.offset,
      });
    }
  }
  for (const declaration of inlineDeclarations) {
    if (declaration.property !== property) continue;
    candidates.push({
      ...declaration,
      selector: "inline style",
      specificity: [1, 0, 0],
      order: Number.MAX_SAFE_INTEGER,
      offset: tagOffset,
    });
  }
  candidates.sort((left, right) => {
    if (left.important !== right.important) return left.important ? 1 : -1;
    const specificity = compareSpecificity(left.specificity, right.specificity);
    return specificity || left.order - right.order;
  });
  const declared = readAttribute(tag, property);
  const winner = candidates.at(-1);
  return {
    declared,
    winner,
    effective:
      winner?.value ??
      (declared === null ? null : normalizeCssValue(declared)),
  };
}

const bundledFamilyAliases = new Map([
  ["noto sans", "Noto Sans"],
  ["sans-serif", "Noto Sans"],
  ["noto serif", "Noto Serif"],
  ["serif", "Noto Serif"],
  ["noto sans mono", "Noto Sans Mono"],
  ["monospace", "Noto Sans Mono"],
  ["kalam", "Kalam"],
  ["cursive", "Kalam"],
]);

function resolveBundledFontFamily(stack) {
  for (const entry of stack.split(",")) {
    const family = entry.trim().replace(/^(['"])(.*)\1$/u, "$2").toLowerCase();
    const resolved = bundledFamilyAliases.get(family);
    if (resolved) return resolved;
  }
  return null;
}

function resolveInheritedTextProperty(
  property,
  tag,
  matchingRules,
  inlineDeclarations,
  tagOffset,
  inherited,
) {
  const value = resolveTextProperty(
    property,
    tag,
    matchingRules,
    inlineDeclarations,
    tagOffset,
  ).effective;
  if (value === null || value === "inherit" || value === "unset") return inherited;
  if (value === "initial") return property === "font-family" ? "Noto Sans" : "400";
  return value;
}

function canonicalFontWeight(value) {
  if (value === "normal") return 400;
  if (value === "bold") return 700;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function assertNoTextPresentationConflicts(source) {
  const text = source.toString("utf8");
  const rules = [];
  const unsupportedSelectors = [];
  const styleBlockPattern = /<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi;
  let blockMatch;
  let order = 0;
  while ((blockMatch = styleBlockPattern.exec(text)) !== null) {
    const content = blockMatch[1].replace(/<!\[CDATA\[|\]\]>/g, "");
    const contentOffset = blockMatch.index + blockMatch[0].indexOf(blockMatch[1]);
    const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
    let ruleMatch;
    while ((ruleMatch = rulePattern.exec(content)) !== null) {
      const declarations = parseDeclarations(ruleMatch[2]);
      if (declarations.length === 0) continue;
      for (const selectorSource of ruleMatch[1].split(",")) {
        const selector = parseSimpleSelector(selectorSource);
        if (!selector) {
          unsupportedSelectors.push({
            ...sourcePosition(text, contentOffset + ruleMatch.index),
            selector: selectorSource.trim(),
          });
          continue;
        }
        rules.push({
          selector,
          declarations,
          order,
          offset: contentOffset + ruleMatch.index,
        });
        order += 1;
      }
    }
  }

  if (unsupportedSelectors.length > 0) {
    const details = unsupportedSelectors
      .map(({ line, column, selector }) => `  ${line}:${column} selector="${selector}"`)
      .join("\n");
    throw new Error(
      `SVG_PRESENTATION_SELECTOR_UNSUPPORTED:\n${details}\nUse simple type, class, or ID selectors for governed text presentation properties so preview can verify the winning authority. Preview rejected; output was not updated.`,
    );
  }

  const conflicts = [];
  const unsupportedFamilies = [];
  const usedFontRoles = new Map();
  let elementsChecked = 0;
  const stack = [{
    type: null,
    family: "Noto Sans",
    weight: "400",
    textContext: false,
  }];
  const tagPattern = /<(\/?)([A-Za-z_][\w:.-]*)\b[^>]*>/g;
  let tagMatch;
  while ((tagMatch = tagPattern.exec(text)) !== null) {
    const tag = tagMatch[0];
    const closing = tagMatch[1] === "/";
    const type = tagMatch[2].split(":").at(-1).toLowerCase();
    if (closing) {
      if (stack.length > 1) stack.pop();
      continue;
    }

    const element = {
      type,
      id: readAttribute(tag, "id"),
      classes: new Set((readAttribute(tag, "class") ?? "").split(/\s+/).filter(Boolean)),
    };
    const matchingRules = rules.filter(({ selector }) =>
      selectorMatchesElement(selector, element),
    );
    const inlineStyle = readAttribute(tag, "style");
    const inlineDeclarations = inlineStyle ? parseDeclarations(inlineStyle) : [];
    const inherited = stack.at(-1);
    const familyStack = resolveInheritedTextProperty(
      "font-family",
      tag,
      matchingRules,
      inlineDeclarations,
      tagMatch.index,
      inherited.family,
    );
    const effectiveWeight = resolveInheritedTextProperty(
      "font-weight",
      tag,
      matchingRules,
      inlineDeclarations,
      tagMatch.index,
      inherited.weight,
    );
    const selfClosing = /\/\s*>$/.test(tag);
    const textContext = inherited.textContext || type === "text";
    const textBearing =
      textContext && ["text", "tspan", "textpath", "a"].includes(type);

    const conflictProperties = textBearing
      ? governedTextPresentationProperties
      : ["font-family", "font-weight"];
    for (const property of conflictProperties) {
      const { declared, winner } = resolveTextProperty(
        property,
        tag,
        matchingRules,
        inlineDeclarations,
        tagMatch.index,
      );
      if (declared === null) continue;
      elementsChecked += 1;
      if (winner && normalizeCssValue(declared) !== winner.value) {
        conflicts.push({
          ...sourcePosition(text, tagMatch.index),
          id: element.id,
          property,
          declared: normalizeCssValue(declared),
          effective: winner.value,
          selector: winner.selector,
        });
      }
    }

    if (textBearing) {
      const family = resolveBundledFontFamily(familyStack);
      if (!family) {
        unsupportedFamilies.push({
          ...sourcePosition(text, tagMatch.index),
          id: element.id,
          familyStack,
        });
      } else {
        const weight = canonicalFontWeight(effectiveWeight);
        usedFontRoles.set(`${family}:${weight}`, { family, weight });
      }
    }

    if (!selfClosing) {
      stack.push({
        type,
        family: familyStack,
        weight: effectiveWeight,
        textContext,
      });
    }
  }

  if (conflicts.length > 0) {
    const details = conflicts
      .map(
        ({ line, column, id, property, declared, effective, selector }) =>
          `  ${line}:${column} [${id ? `#${id}` : "element"}] ${property}="${declared}" overridden by ${selector} => "${effective}"`,
      )
      .join("\n");
    throw new Error(
      `SVG_PRESENTATION_OVERRIDE:\n${details}\nRemove the superseded element attribute or make one unambiguous presentation authority. Preview rejected; output was not updated.`,
    );
  }

  if (unsupportedFamilies.length > 0) {
    const details = unsupportedFamilies
      .map(
        ({ line, column, id, familyStack }) =>
          `  ${line}:${column} [${id ? `#${id}` : "text"}] font-family="${familyStack}"`,
      )
      .join("\n");
    throw new Error(
      `SVG_FONT_FAMILY_UNSUPPORTED:\n${details}\nUse a bundled family or a stack that resolves to one. Preview rejected; output was not updated.`,
    );
  }

  return {
    governedProperties: [...governedTextPresentationProperties],
    explicitDeclarationsChecked: elementsChecked,
    conflicts: 0,
    usedFontRoles: [...usedFontRoles.values()].sort((left, right) =>
      `${left.family}:${left.weight}`.localeCompare(
        `${right.family}:${right.weight}`,
      ),
    ),
  };
}

function readOpenTypeWeight(buffer) {
  const tableCount = buffer.readUInt16BE(4);
  for (let index = 0; index < tableCount; index += 1) {
    const record = 12 + index * 16;
    if (buffer.toString("ascii", record, record + 4) !== "OS/2") continue;
    const offset = buffer.readUInt32BE(record + 8);
    if (offset + 6 > buffer.length) break;
    return buffer.readUInt16BE(offset + 4);
  }
  throw new Error("Bundled font conformance failed: OS/2 weight metadata is unavailable.");
}

function assertFontWeightConformance(font, faces) {
  const renderWeight = (fontConfiguration, family, weight) => {
    const fixture = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="48"><rect width="180" height="48" fill="white"/><text x="8" y="34" font-family="${family}" font-size="28" font-weight="${weight}" fill="black">Signal</text></svg>`,
    );
    const renderer = new Resvg(fixture, {
      fitTo: { mode: "width", value: 180 },
      background: "white",
      font: fontConfiguration,
    });
    const rendered = renderer.render();
    const digest = sha256(rendered.pixels);
    rendered.free();
    renderer.free();
    return digest;
  };

  const declaredCapabilities = [
    ["Noto Sans", [400, 600, 700]],
    ["Noto Serif", [400, 600, 700]],
    ["Noto Sans Mono", [400]],
    ["Kalam", [400]],
  ];
  const families = {};
  const regularMasks = new Set();
  for (const [family, weights] of declaredCapabilities) {
    const masks = [];
    for (const weight of weights) {
      const face = faces.find(
        (candidate) =>
          candidate.family === family && candidate.weight === weight,
      );
      if (!face || readOpenTypeWeight(face.buffer) !== weight) {
        throw new Error(
          `Bundled font conformance failed: ${family} ${weight} is not bound to matching static-face metadata.`,
        );
      }
      const fullMask = renderWeight(font, family, weight);
      const isolatedMask = renderWeight(
        {
          fontBuffers: [face.buffer],
          defaultFontFamily: family,
          sansSerifFamily: family,
          serifFamily: family,
          monospaceFamily: family,
          cursiveFamily: family,
        },
        family,
        weight,
      );
      if (fullMask !== isolatedMask) {
        throw new Error(
          `Bundled font conformance failed: ${family} ${weight} did not select its declared static face.`,
        );
      }
      masks.push(fullMask);
    }
    if (new Set(masks).size !== masks.length) {
      throw new Error(
        `Bundled font conformance failed: ${family} does not paint distinct ${weights.join(", ")} roles.`,
      );
    }
    families[family] = {
      testedWeights: weights,
      distinctMasks: true,
      boundToStaticFaces: true,
    };
    regularMasks.add(masks[0]);
  }
  if (regularMasks.size !== declaredCapabilities.length) {
    throw new Error(
      "Bundled font conformance failed: regular family roles do not paint distinctly.",
    );
  }
  return { families };
}

function assertUsedFontRoles(usedRoles, capabilities) {
  const unsupported = usedRoles.filter(
    ({ family, weight }) =>
      !capabilities.families[family]?.testedWeights.includes(weight),
  );
  if (unsupported.length === 0) return;
  const details = unsupported
    .map(({ family, weight }) => `  ${family} ${weight}`)
    .join("\n");
  throw new Error(
    `SVG_FONT_ROLE_UNSUPPORTED:\n${details}\nUse a family/weight pair proved by the bundled preview runtime.`,
  );
}

function cropRgba(sourceWidth, x, y, width, height, rgba) {
  const sourceRowBytes = sourceWidth * 4;
  const croppedRowBytes = width * 4;
  const cropped = Buffer.alloc(croppedRowBytes * height);
  for (let row = 0; row < height; row += 1) {
    const source = (y + row) * sourceRowBytes + x * 4;
    cropped.set(rgba.subarray(source, source + croppedRowBytes), row * croppedRowBytes);
  }
  return cropped;
}

function tileStarts(total, tileSize, overlap) {
  if (total <= tileSize) return [0];
  const step = tileSize - overlap;
  const starts = [];
  for (let start = 0; start < total; start += step) {
    const clamped = Math.min(start, total - tileSize);
    if (starts.at(-1) !== clamped) starts.push(clamped);
    if (clamped + tileSize >= total) break;
  }
  return starts;
}

async function writeReview(outputPath, width, height, rgba, identities) {
  const tileWidth = 1024;
  const tileHeight = 1024;
  const overlap = 64;
  const stem = basename(outputPath, extname(outputPath));
  const reviewDir = join(dirname(outputPath), `${stem}-review-${identities.outputSha256}`);
  await mkdir(reviewDir, { recursive: true });

  const xStarts = tileStarts(width, tileWidth, overlap);
  const yStarts = tileStarts(height, tileHeight, overlap);
  const tiles = [];
  for (let row = 0; row < yStarts.length; row += 1) {
    for (let column = 0; column < xStarts.length; column += 1) {
      const x = xStarts[column];
      const y = yStarts[row];
      const currentWidth = Math.min(tileWidth, width - x);
      const currentHeight = Math.min(tileHeight, height - y);
      const name = `tile-r${String(row + 1).padStart(3, "0")}-c${String(column + 1).padStart(3, "0")}.png`;
      const png = encodeRgbaPng(
        currentWidth,
        currentHeight,
        cropRgba(width, x, y, currentWidth, currentHeight, rgba),
      );
      await writeFile(join(reviewDir, name), png);
      tiles.push({
        file: name,
        row,
        column,
        x,
        y,
        width: currentWidth,
        height: currentHeight,
        sha256: sha256(png),
      });
    }
  }

  const manifestPath = join(reviewDir, "review.json");
  const manifest = {
    schemaVersion: 5,
    sourceSha256: identities.sourceSha256,
    outputSha256: identities.outputSha256,
    render: {
      requestedWidth: identities.requestedWidth,
      background: identities.background,
      adapterSha256: identities.adapterSha256,
      rasterizer: {
        name: "@resvg/resvg-wasm",
        version: "2.6.2",
        wasmSha256: identities.rasterizerWasmSha256,
      },
      fonts: identities.fonts,
      genericFontFamilies: identities.genericFontFamilies,
      fontCapabilities: identities.fontCapabilities,
      fontWeightPolicy: identities.fontWeightPolicy,
      textPresentationPolicy: identities.textPresentationPolicy,
    },
    width,
    height,
    tileWidth,
    tileHeight,
    overlap,
    tiles,
  };
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`svgdx preview: review ${manifestPath}`);
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      output: { type: "string", short: "o" },
      width: { type: "string", default: "1600" },
      background: { type: "string", default: "white" },
      review: { type: "boolean" },
      "validate-audit": { type: "string" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help) return console.log(usage);
  if (values["validate-audit"]) {
    if (positionals.length !== 0) {
      throw new Error("--validate-audit does not accept an SVG positional.");
    }
    return validateAudit(values["validate-audit"]);
  }
  if (positionals.length !== 1) throw new Error(usage);
  const requestedWidth = Number(values.width);
  if (!Number.isInteger(requestedWidth) || requestedWidth < 64 || requestedWidth > 8192) {
    throw new Error("--width must be an integer from 64 through 8192.");
  }

  const inputPath = positionals[0];
  const extension = extname(inputPath);
  const outputPath = values.output ?? `${extension ? inputPath.slice(0, -extension.length) : inputPath}-preview.png`;
  if (resolve(outputPath) === resolve(inputPath)) throw new Error("Output would overwrite the source.");

  const adapterPath = fileURLToPath(import.meta.url);
  const wasmPath = fileURLToPath(new URL("./resvg-wasm/index_bg.wasm", import.meta.url));
  const fontEntries = [
    { label: "Noto Sans Regular", family: "Noto Sans", weight: 400, relative: "../../assets/fonts/NotoSans-Regular.ttf" },
    { label: "Noto Sans SemiBold", family: "Noto Sans", weight: 600, relative: "../../assets/fonts/NotoSans-SemiBold.ttf" },
    { label: "Noto Sans Bold", family: "Noto Sans", weight: 700, relative: "../../assets/fonts/NotoSans-Bold.ttf" },
    { label: "Noto Serif Regular", family: "Noto Serif", weight: 400, relative: "../../assets/fonts/NotoSerif-Regular.ttf" },
    { label: "Noto Serif SemiBold", family: "Noto Serif", weight: 600, relative: "../../assets/fonts/NotoSerif-SemiBold.ttf" },
    { label: "Noto Serif Bold", family: "Noto Serif", weight: 700, relative: "../../assets/fonts/NotoSerif-Bold.ttf" },
    { label: "Noto Sans Mono", family: "Noto Sans Mono", weight: 400, relative: "../../assets/fonts/NotoSansMono.ttf" },
    { label: "Kalam", family: "Kalam", weight: 400, relative: "../../assets/fonts/Kalam-Regular.ttf" },
  ];
  const fontPaths = fontEntries.map(({ relative }) =>
    fileURLToPath(new URL(relative, import.meta.url)),
  );
  const [adapter, wasm, fonts, source] = await Promise.all([
    readFile(adapterPath),
    readFile(wasmPath),
    Promise.all(fontPaths.map((fontPath) => readFile(fontPath))),
    readFile(inputPath),
  ]);
  const fontWeightPolicy = assertSupportedFontWeightDeclarations(source);
  const textPresentationPolicy = assertNoTextPresentationConflicts(source);
  await initWasm(wasm);
  const font = {
    fontBuffers: fonts,
    defaultFontFamily: "Noto Sans",
    sansSerifFamily: "Noto Sans",
    serifFamily: "Noto Serif",
    monospaceFamily: "Noto Sans Mono",
    cursiveFamily: "Kalam",
  };
  const fontFaces = fontEntries.map((entry, index) => ({
    ...entry,
    buffer: fonts[index],
  }));
  const fontCapabilities = assertFontWeightConformance(font, fontFaces);
  assertUsedFontRoles(textPresentationPolicy.usedFontRoles, fontCapabilities);
  const renderer = new Resvg(source, {
    fitTo: { mode: "width", value: requestedWidth },
    background: values.background,
    font,
  });
  const rendered = renderer.render();
  const png = encodeRgbaPng(rendered.width, rendered.height, rendered.pixels);
  await writeFile(outputPath, png);
  if (values.review) {
    await writeReview(outputPath, rendered.width, rendered.height, rendered.pixels, {
      requestedWidth,
      background: values.background,
      adapterSha256: sha256(adapter),
      rasterizerWasmSha256: sha256(wasm),
      fonts: fontEntries.map(({ label, family, weight }, index) => ({
        label,
        family,
        weight,
        sha256: sha256(fonts[index]),
      })),
      genericFontFamilies: {
        default: "Noto Sans",
        sansSerif: "Noto Sans",
        serif: "Noto Serif",
        monospace: "Noto Sans Mono",
        cursive: "Kalam",
      },
      fontCapabilities,
      fontWeightPolicy,
      textPresentationPolicy,
      sourceSha256: sha256(source),
      outputSha256: sha256(png),
    });
  }
  rendered.free();
  renderer.free();
  console.log(`svgdx preview: wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
