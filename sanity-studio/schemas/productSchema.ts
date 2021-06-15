import { Document } from './schemaTypes';
import client from 'part:@sanity/base/client';

export const productSchema: Document = {
  type: 'document',
  name: 'product',
  title: 'Product',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
      codegen: {
        required: true,
      },
      validation: (Rules) => Rules.required(),
      // validation: (Rules) => [
      //   Rules.required(),
      //   Rules.custom((title) => {
      //     return client
      //       .fetch(`count(*[_type == 'product' && name == "${title}"])`)
      //       .then((count: number) =>
      //         count >= 1 ? 'Name needs to be unique' : true
      //       );
      //   }),
      // ],
    },
    {
      type: 'number',
      name: 'price',
      title: 'Price',
      codegen: {
        required: true,
      },
      validation: (Rules) => Rules.required(),
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
      codegen: {
        required: true,
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
      codegen: {
        required: true,
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
