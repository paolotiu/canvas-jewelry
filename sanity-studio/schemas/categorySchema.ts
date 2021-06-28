import { Document } from './schemaTypes';

export const categorySchema: Document = {
  type: 'document',
  name: 'category',
  title: 'Category',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
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
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [
        {
          title: 'Product',
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
      validation: (Rule) =>
        Rule.custom((field) => {
          const refs = Object.values(field).map((f: any) => f._ref);
          const set = [...new Set(refs)];
          if (refs.length > set.length) {
            return 'Products must be unique';
          }
          return true;
        }),
    },
    {
      title: 'Cover Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
