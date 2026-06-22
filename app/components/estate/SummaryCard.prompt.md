Top-level dashboard metric card. The four canonical EverLedge summaries are Net Estate Value, Lifetime Gifts Recorded, Estimated IHT Exposure, and Executors Recorded. Figures use the mono typeface for a ledger feel.

```jsx
<SummaryCard label="Net Estate Value" value="£4.28M" icon="landmark"
  delta={{ value: '+£86,000', direction: 'up' }} caption="vs last valuation" />
<SummaryCard label="Estimated IHT Exposure" value="£612,000" icon="shield" caption="after reliefs" />
```

Use `accent` (gold) only for a milestone/premium metric.
