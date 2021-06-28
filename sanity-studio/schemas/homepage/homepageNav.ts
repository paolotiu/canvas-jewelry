import { ObjectType } from '../schemaTypes';

export const homepageNav: ObjectType = {
  type: 'object',
  name: 'nav',
  options: {
    collapsible: true,
  },
  fields: [
    {
      type: 'string',
      title: 'Title',
      name: 'title',
      validation: (Rule) => Rule.required().max(50),
    },
    {
      type: 'reference',
      name: 'reference',
      to: [{ type: 'category' }, { type: 'product' }],
    },
  ],
};
