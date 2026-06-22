The fixed left-hand navigation for the EverLedge web app. Wordmark with shield mark at top, icon+label items, tinted active state. Primary nav order: Overview, Estate, Gifts, Executors, Documents, Reports, Settings.

```jsx
<SidebarNav
  active="overview"
  onSelect={setView}
  items={[
    { id: 'overview', label: 'Overview', icon: 'home' },
    { id: 'estate', label: 'Estate', icon: 'landmark' },
    { id: 'gifts', label: 'Gifts', icon: 'gift', badge: 12 },
    { id: 'executors', label: 'Executors', icon: 'users' },
    { id: 'documents', label: 'Documents', icon: 'folder' },
    { id: 'reports', label: 'Reports', icon: 'file-text' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ]}
/>
```
