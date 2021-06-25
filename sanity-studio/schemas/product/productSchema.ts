import { Document } from '../schemaTypes';

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
      type: 'array',
      name: 'description',
      title: 'Description',
      of: [{ type: 'block' }],
    },
    {
      title: 'Default Variant',
      name: 'defaultVariant',
      type: 'productVariant',
    },
    {
      type: 'optionsSwitch',
      name: 'optionsSwitch',
    },
    {
      title: 'Variants',
      name: 'variants',
      type: 'array',
      of: [{ type: 'productVariant' }],
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

    // {
    //   type: 'array',
    //   name: 'categories',
    //   title: 'Categories',
    //   of: [{ type: 'reference', to: [{ type: 'category' }] }],
    // },
  ],
  initialValue: {
    withSize: true,
    withColor: true,
    withLetters: false,
    withAdditional: false,
  },
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
    },
  },
};
