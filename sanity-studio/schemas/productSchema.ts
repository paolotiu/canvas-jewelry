import { Document } from './schemaTypes';

export const productSchema: Document = {
  type: 'document',
  name: 'product',
  title: 'Product',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
      codgen: {
        requried: true,
      },
      validation: (Rules) => Rules.required(),
    },
    {
      type: 'number',
      name: 'price',
      title: 'Price',

      codgen: {
        requried: true,
      },
      validation: (Rules) => Rules.required(),
    },
    {
      type: 'string',
      name: 'description',
      title: 'Description',
    },
    {
      type: 'array',
      name: 'images',
      title: 'Images',
      codgen: {
        requried: true,
      },
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rules) => Rules.min(1),
    },
    {
      type: 'array',
      name: 'categories',
      title: 'Categories',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
  ],
};
