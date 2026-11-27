import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { Button, ChartContainer, ThemeProvider } from "dil-ui";

const require = createRequire(import.meta.url);
const commonJS = require("dil-ui");

for (const [name, esmExport] of Object.entries({ Button, ChartContainer, ThemeProvider })) {
  assert.ok(esmExport, `Missing ESM export: ${name}`);
  assert.ok(commonJS[name], `Missing CommonJS export: ${name}`);
}

const styles = readFileSync(require.resolve("dil-ui/styles.css"), "utf8");
assert.match(styles, /:where\(\.dil-ui-scope,/);
assert.doesNotMatch(styles, /--tw-/, "Package CSS must use private Tailwind properties");

assert.ok(statSync(new URL("../dist/index.d.ts", import.meta.url)).isFile());
console.log("Verified dil-ui ESM, CommonJS, CSS and declaration entry points.");
