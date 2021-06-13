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
      validation: (Rules) => Rules.required(),
    },
  ],
};
