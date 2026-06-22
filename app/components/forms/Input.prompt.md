Labelled text input. Focus warms the border to primary blue with a soft glow. Use `prefix="£"` for currency, `iconLeft` for search/etc, `error` to surface validation.

```jsx
<Input label="Gift value" prefix="£" placeholder="0.00" />
<Input label="Recipient" hint="Full legal name" />
<Input label="Email" error="Enter a valid email" />
```
