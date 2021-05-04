// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { CategoryInterface } from '@models/Category';
import { ItemInterface } from '@models/Item';

export type UserJWTPayload = {
  name: string;
  email: string;
  admin: boolean;
};

export interface ItemQueryReturn {
  item: ItemData;
}

export interface CategoryData extends CategoryInterface {
  _id: string;
}
export interface ItemData extends ItemInterface {
  _id: string;
}

export interface Image {
  url: string;
}

export interface NavLink {
  href: string;
  label: string;
}
