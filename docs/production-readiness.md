# Production readiness and portfolio coverage

## Initial verdict

dil-ui is a pre-release design system with a substantial React component catalog. A multi-app rollout needs a verified package, a stable theme contract, and browser checks. The existing strengths are typed exports, token-based styling, a custom theme type, three light/dark presets, and interaction tests for several complex components.

| Area | Evidence | Readiness |
| --- | --- | --- |
| Theme contract | Neobrutalism, glassmorphism and retroterminal each have light and dark tokens. Theme variables are applied in effects, so the server HTML omits even explicit-mode tokens. ThemeScope lacks the data attribute used by Dialog, Popover and Tooltip to choose their portal root. | Needs hardening |
| Accessibility | Button variants use the surface text token on filled backgrounds. White on retroterminal dark primary green has about 1.37:1 contrast. Overlay tests exist. Focus, reduced motion and contrast coverage across all six preset combinations is still needed. | Release blocker |
| Package and CSS | The manifest exposes ESM, UMD/CJS, declarations and a CSS subpath. Vite scans all of src including the demo, and the package stylesheet imports global Tailwind Preflight. The root imports CSS as well. The current source-only npm pack dry run listed README and package.json. Recheck from a clean build. | Release blocker |
| Next.js consumption | The source has no client-boundary directives and the library entry exports hooks and interactive components. Prove the intended App Router import paths from the packed artifact. Vite output alone cannot establish Server Component compatibility. | Unverified |
| Quality and operations | Seven test files cover Accordion, Chart, Dialog, List, Popover, Slider and Tooltip. The repo has no tracked CI workflows, package-level smoke test, or configured Storybook command. The manifest declares MIT and the repo has no LICENSE file. | Needs release workflow |

## Initial verification baseline

The first locked install failed to resolve the npm registry and the retry did not complete. The TypeScript build check passed using the available compiler. Vite and ESLint stopped on missing Lightning CSS and Babel dependencies. Vitest timed out starting its workers before it ran any tests. Repeat all checks from a clean locked install. The npm dry run inspected the unbuilt checkout. The packed artifact still needs verification after a clean build.

## Coverage gate

This audit counts each reusable pattern once across the public homepage and admin. Playground is inventoried as a later rollout because it contains independent tools and experiments. Portfolio section layout, data loading, navigation state, PDF rendering, domain-specific command handling and upload persistence stay app-owned. A direct candidate means the exported API can represent the UI pattern without a new library capability. Candidates still need packed-package and browser verification.

| Reusable pattern | Portfolio location | dil-ui mapping | Source match |
| --- | --- | --- | --- |
| Text action | Admin dashboard and login | Button | Verified direct |
| Link styled as an action | Contact links and CV actions | Polymorphic Button | Verified direct |
| Icon-only action | PDF toolbar and project image controls | IconButton | Verified direct |
| Text/password field | Admin login and editors | Input | Verified direct |
| Field label | Login and editors | Label | Verified direct |
| Multiline field | Header and project editors | TextArea | Verified direct |
| Single-choice select | Bingo editor | Select | Verified direct |
| File control | CV and project image editors | FileInput | Verified direct |
| Panel/card surface | Skills, projects, education and blog | Card plus host layout | Verified direct |
| Tag/badge | Project technologies and skill tags | Badge | Verified direct |
| Expandable editor section | Admin AccordionItem | Accordion with app-owned row actions | Verified direct |
| Typed heading | Homepage and admin login | Typewriter | Verified direct |
| Busy indicator | Login and PDF viewer | Spinner | Verified direct |
| CV modal shell | Homepage hero | Dialog with portfolio-owned PDF content | Verified direct |
| Responsive section navigation | Homepage navbar | NeoNavbar with app-owned active section, sticky layout and native anchors. Tested desktop scroll, mobile disclosure and focus. | Verified adapter |
| Interactive hero terminal | Homepage hero | Terminal with app-owned history and command handling, opt-in output following and an input ref. Tested rich output, history and CV dialog focus. | Verified adapter |
| Inline status/error feedback | Login and admin flows | Toast exists. Add or compose persistent inline feedback with the right live-region behavior. | Partial |
| Project media carousel | Project cards | IconButton covers controls. A keyboard-accessible carousel composition is missing. | Gap |
| Retro page surface and decoration | Homepage and admin shell | PatternBackground and tokens cover pieces. Prove visual parity and reduced-motion behavior. | Partial |

**Current API coverage is 16/19 (84.2%).** All 16 patterns have browser evidence from the packed library. They include 14 direct patterns and two adapters. The gate is at least 16/19 verified patterns plus a passing clean consumer build and theme checks. Partial patterns can reach the gate through an app adapter if the library API already supports the behavior. A component only moves into the library when its reusable behavior and theme contract are clear. Keep the denominator stable for this migration; inventory and score the playground separately before touching those routes.

## Portfolio pattern verification

The showcase's **Portfolio patterns** example exercises the reusable UI with representative app handlers. Chromium verified desktop hash navigation, active section updates on scroll, mobile disclosure and keyboard focus restoration at 1024 px and 390 px. It also verified controlled submission, rich output, output following, arrow-key history, clearing output and focus return from a sample CV dialog. The checks passed in light and dark for all three presets. The same checks passed with the packed artifact in a temporary Next.js 16.4.6 and React 19.3.0 production build. The host supplied overlapping Tailwind display utilities. Sampled terminal and navigation text contrast reached at least 4.74:1 in both builds.

The adapter uses the portfolio's section IDs and a sample CV dialog. Full page styling, the PDF viewer and navigation to the actual playground route still need checks in the portfolio itself. The portfolio's actual routes still need regression checks after adoption.

## Public component verification

A production Next.js 16.4.6 fixture imported the exact dil-ui tarball. Chromium checked text buttons, native links, named icon buttons, card surfaces, badges, a typed heading, a busy indicator and a CV dialog shell. The checks passed at 1024 px and 390 px in all six preset and mode combinations. The keyboard could activate controls and anchors, and Escape returned focus from the dialog to its trigger. The heading and spinner responded to the reduced-motion setting. Sampled card and badge text contrast reached at least 5.47:1 across the tested themes.

The fixture uses sample content and a stand-in for the PDF panel. The portfolio retains its real PDF viewer, project gallery and route layout.

## Admin component verification

The packed library passed production Chromium checks for Input, Label, TextArea, Select, FileInput and Accordion in a representative editor. The fixture ran at 390 px and 1024 px in light and dark for all three presets. It verified native labeling, controlled password errors, keyboard traversal, a visible focus ring, text and select input, and file-count limits. Accordion arrow navigation, activation and panel state also passed.
