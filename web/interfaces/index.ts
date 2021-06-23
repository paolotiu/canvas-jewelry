// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
export interface Image {
  url: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export type NavItem =
  | {
      href: string;
      label: string;
      kind: 'link';
    }
  | {
      label: string;
      children: NavItem[];
      kind: 'group';
    };
