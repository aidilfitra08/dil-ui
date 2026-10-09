# Dialog

`Dialog` is the modal interaction primitive for confirmations, forms, edit workflows, and settings panels. It uses controlled or uncontrolled state, focus trapping/restoration, Escape dismissal, an overlay, ARIA title/description relationships, responsive sizing, and token-based styling.

```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit employee</DialogTitle>
      <DialogDescription>Update employee information.</DialogDescription>
    </DialogHeader>
    <form>{/* fields */}</form>
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

`DialogContent` automatically renders `DialogPortal` and `DialogOverlay`. Use `DialogPortal` and `DialogOverlay` explicitly when a custom composition or container is required. Set `modal={false}` for non-modal behavior.