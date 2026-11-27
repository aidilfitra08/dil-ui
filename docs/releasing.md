# Release and installation

The release unit is a versioned npm tarball. Consumers can lock the exact file and its integrity in `package-lock.json`. Give a changed build a new version and a new asset name.

## Versioning

Use semantic versions for the package's public exports, props and theme contract. Bump the prerelease number for each distinct 0.2.0 candidate. After the first stable release, use patch for compatible fixes, minor for compatible additions and major for breaking changes. Record migration implications in the [changelog](../CHANGELOG.md).

## Build and verify an artifact

- Confirm the manifest and lockfile carry the same version.
- Run `npm ci`, `npm run lint`, `npm test -- --pool=threads` and `npm run build:showcase`.
- Run `npm pack`. Its prepack checks the ESM, CommonJS, CSS and declaration entry points. Inspect the archive for the MIT license and the public distribution files.
- Install that exact archive in clean Vite and Next.js consumers. Check client hydration, scoped CSS and the theme smoke routes. Commit the release source and verify CI before publishing.
- Publish the exact archive to npm under the prerelease tag. Verify `npm ci` and a production build from the consumer lockfile.

## Install a local candidate

From the consumer project, use the path to the artifact produced by `npm pack`.

```sh
npm install ../dil-ui/dil-ui-0.2.0-rc.1.tgz
```

## Publish and install from npm

The public npm registry lists dil-dev as the maintainer of dil-ui, 0.1.0 as latest, and 0.2.0-rc.1 under next. Use the maintainer account to sign in and verify the account before publishing.

~~~sh
npm login --registry=https://registry.npmjs.org
npm whoami --registry=https://registry.npmjs.org
~~~

Publish the verified archive after approval. The command below records the 0.2.0-rc.1 publication. For a new candidate, use its new archive name and version. The next tag keeps 0.1.0 on latest during evaluation.

~~~sh
npm publish ./dil-ui-0.2.0-rc.1.tgz --access public --tag next --registry=https://registry.npmjs.org
npm view dil-ui@0.2.0-rc.1 dist.integrity --registry=https://registry.npmjs.org
~~~

In the portfolio, pin the exact version after publication. Verify npm ci, route types and the production build from the updated lockfile, then run the affected route checks in a deployment preview before production.

~~~sh
npm install --save-exact dil-ui@0.2.0-rc.1
npm ci
npm run typecheck
npm run build
~~~

Import `dil-ui/styles.css` once. In Next.js App Router, load the stylesheet from a layout and import interactive components from a file with a `"use client"` directive. See the [README](../README.md#quick-start) for component and theme examples.

If a deployment cannot access npm, copy the verified tarball into the consuming repository and install it as a relative dependency. Commit the tarball and both npm manifest files together so a fresh checkout can run npm ci.

~~~sh
npm install ./vendor/dil-ui-0.2.0-rc.1.tgz
~~~

## 0.2.0-rc.1 verification

The local archive passed lint, 55 unit tests, the showcase build, archive checks and fresh Vite 8.3.4 and Next.js 16.4.6 builds with React 19.3.0. The Next.js fixture passed Chromium checks for all 16 covered portfolio patterns across the six preset and mode combinations.

A fresh Vite consumer reproduced the repository-relative install with npm ci from its generated lockfile. The npm publish dry run passed for the exact tarball. A runtime-only consumer audit reported zero known vulnerabilities. The registry install and deployment preview still need verification after publication.

Archive SHA-256 is DB1129BA4DB9C026A0F9D6FF57F8F48034A9E734A5982838D9DD62BF6A9BB6D2. The npm download and a clean rebuild of local source tag v0.2.0-rc.1 both matched this checksum. Remote CI and the portfolio deployment preview are pending.


### Portfolio preflight

The exact tarball also passed a clean lockfile install, route type check, production build and focused lint in a temporary copy of the portfolio. Its Contact-only pilot verified theme switching, keyboard focus, native links and local admin sign-in and sign-out at 1280 px and 390 px in light and dark. The desktop CV passed on rerun. A comparison build without dil-ui also reproduced an intermittent PDF loading timeout. Keep this check in the hosted preview before promoting the portfolio change.
