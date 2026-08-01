#!/usr/bin/env node

import { parseArgs } from "node:util";
import { readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import init, { transform_json } from "./svgdx-wasm/svgdx.js";

const usage = `Usage: node render_svgdx.mjs <input.svgdx|input.xml|-> [options]

Options:
  -o, --output <file>   Write SVG to this path
      --stdout          Write SVG to stdout
      --check           Validate and render without writing SVG
      --metadata        Include svgdx source metadata
      --var <key=value> Set an input variable; repeat as needed
  -h, --help            Show this help

Without --output, input.svgdx or input.xml renders beside the source as input.svg.`;

function statusLine(source, output) {
  const sourceOutput = source === output ? "identical" : "different";
  return `execution=valid source-output=${sourceOutput} composition=review-required substantive-svgdx=review-required semantic-integrity=review-required`;
}

async function readStdin() {
  process.stdin.setEncoding("utf8");
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  return input;
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      output: { type: "string", short: "o" },
      stdout: { type: "boolean" },
      check: { type: "boolean" },
      metadata: { type: "boolean" },
      var: { type: "string", multiple: true },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help) return console.log(usage);
  if (positionals.length !== 1) throw new Error(usage);
  if ([values.output, values.stdout, values.check].filter(Boolean).length > 1) {
    throw new Error("Choose only one of --output, --stdout, or --check.");
  }

  const inputPath = positionals[0];
  const input = inputPath === "-" ? await readStdin() : await readFile(inputPath, "utf8");
  const vars = Object.fromEntries((values.var ?? []).map((entry) => {
    const split = entry.indexOf("=");
    if (split < 1) throw new Error(`Invalid --var '${entry}'; expected key=value.`);
    return [entry.slice(0, split), entry.slice(split + 1)];
  }));

  const wasmPath = fileURLToPath(new URL("./svgdx-wasm/svgdx_bg.wasm", import.meta.url));
  await init({ module_or_path: await readFile(wasmPath) });
  const response = JSON.parse(transform_json(JSON.stringify({
    version: 1,
    input,
    config: { add_metadata: Boolean(values.metadata), vars },
  })));
  if (response.error) throw new Error(`svgdx: ${response.error}`);
  for (const warning of response.warnings ?? []) console.error(`svgdx warning: ${warning}`);
  const status = statusLine(input, response.svg);

  if (values.check) return console.log(`svgdx: ${status}`);
  if (values.stdout || (inputPath === "-" && !values.output)) return process.stdout.write(response.svg);

  const extension = extname(inputPath);
  const outputPath = values.output ?? `${extension ? inputPath.slice(0, -extension.length) : inputPath}.svg`;
  if (inputPath !== "-" && resolve(outputPath) === resolve(inputPath)) {
    throw new Error("Output would overwrite the source; pass --output.");
  }
  await writeFile(outputPath, response.svg, "utf8");
  console.log(`svgdx: wrote ${outputPath} (${status})`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
