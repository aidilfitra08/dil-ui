# dil-ui production readiness plan

The goal is to ship reusable React components with consistent styling across all three built-in themes and custom presets. The [readiness review and coverage inventory](production-readiness.md) records the baseline.

## M1. Reproducible package and Next.js consumption

- [x] Inspect the manifest, exports, Vite configuration, existing tests and npm pack output from the source checkout.
- [x] Verify the package on Node 26.13.1. The original checkout on branch codex/dil-ui-production-readiness builds and checks its ESM, CommonJS, CSS and declaration entry points. The tarball excludes demo, test and story declarations.
- [ ] Run a locked install and record the supported Node and React ranges from actual clean consumer checks. Run lint, tests and the build in CI.
- [x] Restore the unit-test baseline. All 32 tests pass after fixing test isolation, Slider keyboard focus and thumb bounds, and the Accordion prop warning.
- [x] Finish the lint baseline. The Slider, overlay and ThemeProvider cleanup removed the remaining findings. All 32 tests passed locally.
- [x] Add the component showcase under `src/examples` and the separate `dist-showcase/` build. Browser checks covered all six preset and mode combinations, desktop and mobile layout, overlay interactions and serving from a subdirectory.
- [x] Add a GitHub Actions workflow for installation, lint, tests, npm package validation and the showcase build. A remote run is pending.
- [x] Build temporary Vite and Next.js App Router consumers using the exact tarball. Vite emitted 376,722 bytes of JavaScript for a button and theme provider, and 700,691 bytes for a line chart and theme provider, including application dependencies. Next.js 16.4.6 and React 19.3.0 passed the production build, prerendered HTML, installed CSS and button hydration checks. The portfolio-pinned Next.js 16.4.0 compiled and prerendered the fixture, then its security check stopped the build.
- [x] Isolate package CSS from demo styles and host resets. Chromium compared two Next.js 16.4.6 routes using the packed artifact. Native headings and inputs, host utility classes and transform fallbacks retained their computed styles inside and outside ThemeProvider. Standalone and themed Buttons retained their styles, and host utilities could override component defaults.

## M2. Theme and accessibility contract

- [x] Render explicit-mode CSS variables on the server in ThemeProvider and ThemeScope. System mode uses light tokens for the server and hydration, then follows browser preference changes. Verified with unit tests and a production Next.js fixture in Chromium.
- [x] Align ThemeScope hooks and overlay boundaries. Dialog, Popover and Tooltip use the nearest scope and preserve source tokens at a custom container. Regression tests covered all three overlays and a dialog without a trigger. Chromium verified live token updates in an open custom-target dialog.
- [x] Add optional foreground tokens for filled actions and retain the text fallback for older custom themes. Chromium measured 186 rendered default, hover and disabled action samples across all six preset and mode combinations. The minimum was 4.82:1. Focused primary actions also cleared 4.5:1.
- [x] Check icon-only names, keyboard activation, focus indicators, disabled actions, dialog focus restoration and reduced-motion feedback. The showcase Actions section provides the interactive samples. Chromium verified focus and motion behavior in all six preset and mode combinations.

## M3. Portfolio coverage and release

- [x] Prove the Terminal and NeoNavbar adapters with representative portfolio behavior. The showcase verifies controlled commands, output following, history, sample CV dialog focus, section anchoring, active scroll state and mobile disclosure across all six preset and mode combinations. The exact tarball passed the same Chromium checks in a Next.js 16.4.6 production consumer.
- [x] Verify the eight public-facing direct patterns against the exact tarball. Chromium tested buttons, links, icon controls, cards, badges, typed text, busy indicators and the CV dialog shell across all six preset and mode combinations at desktop and mobile widths.
- [x] Verify the six direct admin patterns using the exact tarball in a production Next.js editor fixture. Chromium passed keyboard navigation, visible focus, labeled fields, invalid-password descriptions, selection and file limits at desktop and mobile widths in all six preset and mode combinations.
- [ ] Revisit inline status, project media and retro surfaces where actual route checks expose a reusable gap.
- [x] Meet the 16-of-19 library coverage gate with browser evidence across all six preset and mode combinations. Portfolio lint and a versioned release remain prerequisites for adoption.
- [x] Prepare 0.2.0-rc.1 with the MIT license, changelog, release checklist and installation examples. Clean Vite and Next.js consumers built from the same tarball. Chromium reverified all 16 covered patterns in the Next.js production build.
- [x] Publish 0.2.0-rc.1 to npm under next and verify that latest remains 0.1.0. The registry download matches the tested tarball, and the release source rebuilds the same archive.
- [ ] Verify the portfolio deployment preview after pinning the exact registry version.
