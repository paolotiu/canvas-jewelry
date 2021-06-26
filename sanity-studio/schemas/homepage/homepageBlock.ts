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
      name: 'blockTitle',
      validation: (Rule) => Rule.required().max(50),
    },
    {
      type: 'image',
      title: 'Image',
      name: 'blockImage',
      options: {
        hotspot: true,
      },
    },
    {
      type: 'reference',
      name: 'blockReference',
      to: [{ type: 'category' }, { type: 'product' }],
    },
  ],
};
