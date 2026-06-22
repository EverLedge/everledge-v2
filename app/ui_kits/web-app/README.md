# EverLedge — Web App UI Kit

An interactive, high-fidelity recreation of the EverLedge estate-management web application, composed entirely from the design-system components.

## Run
Open `index.html`. It loads the compiled design-system bundle (`../../_ds_bundle.js`), React, Babel and Lucide from CDN, then mounts the app shell.

## Screens
- **Overview** (`OverviewScreen.jsx`) — four summary metrics (Net Estate, Lifetime Gifts, IHT Exposure, Executors), the signature **PET Timeline**, Recent Activity and the Action Centre.
- **Gifts** (`GiftsScreen.jsx`) — filterable grid of `GiftCard`s (All / Active PETs / Exempt) plus the *Record a gift* dialog flow.
- **Executors / Documents** (`SecondaryScreens.jsx`) — executor cards and a stored-document list.
- **Topbar** (`Topbar.jsx`) — page title, search, notifications, account.
- Remaining nav items (Estate, Reports, Settings) render a tasteful placeholder.

## Interactions
- Switch sections via the left `SidebarNav`.
- On **Gifts**, filter with the tabs and open the *Record a gift* modal (add tile or top-right button).

## Data
`data.js` holds illustrative sample data on `window.EL_DATA` (the Whitcombe estate). Replace with live data in production.

## Notes
This is a cosmetic recreation for design reference — not production logic. IHT figures, taper relief and exemption dates are illustrative.
