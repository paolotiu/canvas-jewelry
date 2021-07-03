import { Document } from '../schemaTypes';

export const homepageSchema: Document = {
  type: 'document',
  name: 'homepageSettings',
  title: 'Homepage Settings',
  // Limit to 1 document
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],

  fieldsets: [
    {
      title: 'Banners',
      name: 'banners',
      description: 'The homepage image banners',
      options: {
        collapsible: true,
      },
    },
  ],
  fields: [
    {
      name: 'homepageBanners',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      type: 'homepageBlock',
      name: 'homepageBlock1',
    },
    {
      type: 'homepageBlock',
      name: 'homepageBlock2',
    },
    {
      type: 'homepageBlock',
      name: 'homepageBlock3',
    },
    {
      type: 'array',
      name: 'nav',
      of: [{ type: 'nav' }],
      validation: (Rule) => Rule.length(4),
    },
    { type: 'string', name: 'password', title: 'Password' },
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Settings',
      };
    },
  },
};
