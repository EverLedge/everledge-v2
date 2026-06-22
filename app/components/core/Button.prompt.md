A composed, premium action button. Use `primary` for the single key action on a view, `secondary` for adjacent actions, `ghost` for tertiary/toolbar actions, `gold` only for premium/milestone actions, and `danger` for destructive confirmations.

```jsx
<Button variant="primary" size="md">Record a gift</Button>
<Button variant="secondary" iconLeft={<Icon name="download" />}>Export</Button>
<Button variant="gold">Complete estate</Button>
```

Variants: `primary | secondary | ghost | gold | danger`. Sizes: `sm | md | lg`. Supports `iconLeft`, `iconRight`, `fullWidth`, `disabled`.
