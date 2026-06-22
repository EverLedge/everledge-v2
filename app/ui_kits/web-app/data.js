/* EverLedge — Oliver Beasant. Illustrative only. */
window.EL_DATA = {
  user: { name: 'Oliver Beasant', initials: 'OB', plan: 'Private Office' },
  summary: {
    netEstate: '£1,250,000',
    netEstateDelta: { value: '+£44,000', direction: 'up' },
    lifetimeGifts: '£290,000',
    ihtExposure: '£196,000',
    executors: '2',
  },
  gifts: [
    { id: 'g1', recipient: 'Natasha Beasant', relationship: 'Spouse', value: '£150,000', raw: 150000, giftDate: '2021-06-14' },
    { id: 'g2', recipient: 'Adam Beasant', relationship: 'Brother', value: '£60,000', raw: 60000, giftDate: '2019-03-22' },
    { id: 'g3', recipient: 'Oscar Beasant', relationship: 'Son', value: '£40,000', raw: 40000, giftDate: '2024-05-10' },
    { id: 'g4', recipient: 'Big Bee Media Trust', relationship: 'Family trust', value: '£25,000', raw: 25000, giftDate: '2023-01-08' },
    { id: 'g5', recipient: 'Victoria Beasant', relationship: 'Sister-in-law', value: '£10,000', raw: 10000, giftDate: '2022-12-20' },
    { id: 'g6', recipient: 'Charitable Gift', relationship: 'Charity', value: '£5,000', raw: 5000, giftDate: '2023-04-06' },
  ],
  executors: [
    { name: 'Natasha Beasant', relationship: 'Spouse', role: 'Primary executor', tone: 'gold' },
    { name: 'Adam Beasant', relationship: 'Brother · Big Bee Media', role: 'Reserve executor', tone: 'navy' },
  ],
  documents: [
    { name: 'Last Will & Testament', meta: 'Signed · 14 Jun 2021', icon: 'file-text', tag: 'Will' },
    { name: 'Lasting Power of Attorney', meta: 'Registered · 02 Jan 2022', icon: 'shield', tag: 'LPA' },
    { name: 'Property Valuation — Chazey Road', meta: 'Updated · 09 Jun 2026', icon: 'landmark', tag: 'Valuation' },
    { name: 'Big Bee Media Trust Deed', meta: 'Executed · 08 Jan 2023', icon: 'archive', tag: 'Trust' },
    { name: 'Property Deeds — Chazey Road', meta: 'Stored · 15 Aug 2020', icon: 'home', tag: 'Property' },
  ],
  activity: [
    { icon: 'gift', text: 'Gift to Oscar Beasant recorded', who: '£40,000', when: '3 weeks ago' },
    { icon: 'check', text: 'Property valuation updated', who: 'Chazey Road', when: '2 weeks ago' },
    { icon: 'users', text: 'Adam Beasant confirmed as reserve executor', who: 'Reserve', when: '1 month ago' },
    { icon: 'file-text', text: 'Trust deed uploaded', who: 'Big Bee Media Trust', when: '3 months ago' },
  ],
  actions: [
    { icon: 'calendar', title: 'PET to Adam nearing exemption', detail: 'Gift to Adam Beasant passes 7 years in March 2026', tone: 'warning' },
    { icon: 'landmark', title: 'Refresh estate valuation', detail: 'Last updated 2 weeks ago — consider annual review', tone: 'primary' },
    { icon: 'users', title: 'Invite Natasha to EverLedge', detail: 'Primary executor has not yet logged in', tone: 'neutral' },
  ],
};
