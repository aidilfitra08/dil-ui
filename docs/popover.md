# Popover accessibility and floating-layer guidance

`Popover` provides the shared floating-layer foundation for interactive dil-ui components.

## Accessibility

- `PopoverTrigger` exposes `aria-expanded` and `aria-controls`.
- `PopoverContent` uses the dialog role for interactive content.
- Escape and outside press close the layer.
- Floating UI's focus manager is available by setting `modal` on `Popover`; this also restores focus to the trigger.
- Keep a visible label or accessible name on trigger controls.
- Use `PopoverAnchor` when the reference element should not toggle the layer.

## Composition

Use `Popover` for calendars, command menus, selects, combobox results, date/time pickers, and color pickers. Keep domain state in the composed component and use `onOpenChange` only for layer visibility.

## Animation

Target `[data-state="open"]`, `[data-state="closed"]`, `[data-side]`, and `[data-align]` in CSS. `forceMount` can keep content mounted while a closing animation runs.

## Future floating components

Build new floating components by composing this primitive rather than duplicating portal, dismissal, positioning, or focus logic. Add component-specific keyboard behavior at the content level and preserve the Popover data attributes for consistent theming.
