# Changelog

## 0.2.0-rc.1

- Package ESM, CommonJS, TypeScript declarations and an explicit stylesheet entry. Scope library CSS to component markup and give Tailwind properties private names.
- Render theme tokens during server rendering. Keep the nearest theme on nested scopes and overlays, including custom portal targets.
- Improve action and form focus indicators, filled action contrast and reduced-motion behavior across the three built-in presets.
- Add opt-in output following to Terminal and improve NeoNavbar's mobile disclosure, keyboard focus and section anchor behavior.
- Enforce FileInput file limits for selection and drag-and-drop and associate help and error messages with the input.
- Add a standalone showcase and verify 16 portfolio UI patterns in a packed Next.js consumer.

Apps that depended on the previous global Tailwind reset should supply their own page reset. FileInput now enforces its `maxFiles` prop and limits single-file inputs to one file for drops.
