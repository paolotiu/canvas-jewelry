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
  ],
};
