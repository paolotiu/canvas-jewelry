import { ObjectType } from '../schemaTypes';

export const homepageBlock: ObjectType = {
  type: 'object',
  name: 'homepageBlock',
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
      type: 'image',
      title: 'Image',
      name: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      type: 'reference',
      name: 'reference',
      to: [{ type: 'category' }, { type: 'product' }],
    },
  ],
};
