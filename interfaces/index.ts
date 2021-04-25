// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { ItemInterface } from "@models/Item";

export type User = {
  id: number
  name: string
}

export interface ItemQueryReturn {
  item: ItemInterface;
}