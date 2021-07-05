import { Document } from '../schemaTypes';

export const productSchema: Document = {
  type: 'document',
  name: 'product',
  title: 'Product',
  fields: [
    {
      title: 'Linked product',
      name: 'product',
      type: 'singleProduct',
      codegen: {
        required: true,
      },
      validation: (Rules) => Rules.required(),
    },
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
        source: 'product.name',
      },
      codegen: {
        required: true,
      },
      validation: (Rules) => Rules.required(),
    },
    {
      type: 'boolean',
      name: 'hasFrom',
      title: 'Has From',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },

      codegen: {
        required: true,
      },
      validation: (Rules) => Rules.required(),
    },
    {
      type: 'array',
      name: 'description',
      title: 'Description',
      of: [{ type: 'block' }],
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
  ],

  preview: {
    select: {
      title: 'name',
      media: 'images.0',
    },
  },
};
