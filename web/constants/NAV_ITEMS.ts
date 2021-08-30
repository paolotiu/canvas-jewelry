import { NavItem } from 'interfaces';

export const NAV_ITEMS: NavItem[] = [
  { href: 'new-in', label: 'New In', kind: 'link' },
  {
    href: 'best-sellers',
    label: 'Best Sellers',
    kind: 'link',
  },
  {
    label: 'Main Collections',
    children: [
      { label: 'Essentials', href: 'essentials', kind: 'link' },
      {
        label: 'Personalized',
        href: 'personalized',
        kind: 'link',
      },
      { label: 'Classic Pearls', href: 'classic-pearls', kind: 'link' },
      {
        label: 'Fine Jewelry',
        href: 'fine-jewelry',
        kind: 'link',
      },
    ],
    kind: 'group',
  },
  {
    label: 'Special Collections',
    children: [{ label: 'Daisy Pearls', href: 'daisy-pearls', kind: 'link' }],
    kind: 'group',
  },
  {
    label: 'Shop by Category',
    kind: 'group',
    children: [
      {
        label: 'Rings',
        href: 'rings',
        kind: 'link',
      },
      { label: 'Bracelets', href: 'bracelets', kind: 'link' },
      { label: 'Necklaces', href: 'necklaces', kind: 'link' },
      { label: 'Earrings', href: 'earrings', kind: 'link' },
      { label: 'Anklets', href: 'anklets', kind: 'link' },
      { label: 'Ear Cuffs', href: 'ear-cuffs', kind: 'link' },
    ],
  },
  {
    label: 'Packaging Upgrades',
    href: 'packaging-upgrades',
    kind: 'link',
  },
];
