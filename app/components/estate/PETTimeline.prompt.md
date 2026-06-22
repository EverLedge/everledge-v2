**The signature component of EverLedge.** Visualises a Potentially Exempt Transfer (PET) over its seven-year window: the gift date, taper-relief milestones at years 3–7, a "today" marker, progress toward full exemption, and the estimated exemption date. Place inside a `Card` on the Overview and Gifts views.

```jsx
<Card padding="var(--space-6)">
  <PETTimeline giftDate="2021-09-14" />
</Card>
```

When the gift is fully exempt (7+ years), the fill and milestone tick turn gold to signify the milestone. Taper-relief band is shown as a pill: full charge (0–3y), tapering 80→20% (3–7y), fully exempt (7y+).
