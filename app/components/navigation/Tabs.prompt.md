Underline tab bar for switching sections within a view (e.g. All gifts / Active PETs / Exempt).

```jsx
<Tabs
  defaultActive="all"
  onChange={setTab}
  tabs={[
    { id: 'all', label: 'All gifts' },
    { id: 'active', label: 'Active PETs' },
    { id: 'exempt', label: 'Exempt' },
  ]}
/>
```
