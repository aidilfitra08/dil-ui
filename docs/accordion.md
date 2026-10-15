# Accordion

The compound Accordion components support accessible single- and multiple-item disclosure with theme-token styling. Import `Accordion`, `AccordionItem`, `AccordionTrigger`, and `AccordionContent` from `dil-ui`.

```tsx
<Accordion type="single" collapsible defaultValue="shipping">
  <AccordionItem value="shipping">
    <AccordionTrigger>When will my order ship?</AccordionTrigger>
    <AccordionContent>Orders usually ship within two business days.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>What is the return window?</AccordionTrigger>
    <AccordionContent>Unused items can be returned within 30 days.</AccordionContent>
  </AccordionItem>
</Accordion>
```

For single mode, `value`/`defaultValue` are strings and `onValueChange` receives a string (empty when a collapsible accordion closes). `collapsible` allows the open item to close; without it, one item stays open after selection. For multiple mode, `value`/`defaultValue` are string arrays and `onValueChange` receives the next array. Both modes support controlled (`value` plus `onValueChange`) and uncontrolled (`defaultValue`) state.

Set `disabled` on an `AccordionItem` to disable that item, or on `Accordion` to disable all items. Trigger and content accept native button/div attributes and `className`; trigger content can be any React content (avoid nesting interactive controls inside the button). Use `data-state="open"`/`"closed"` for state-specific styling. Keyboard users can navigate triggers with Up/Down and Home/End and activate them with Enter or Space.
