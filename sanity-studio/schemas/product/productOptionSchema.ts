import { ObjectType } from '../schemaTypes';

import ConditionalField from 'sanity-plugin-conditional-field';

export const optionalFields: ObjectType = {
  type: 'object',
  name: 'optionsSwitch',
  title: 'Options',
  fields: [
    {
      type: 'boolean',
      name: 'withSize',
      title: 'Size Field',
      initialValue: true,
      options: {
        layout: 'checkbox',
      },
    },
    {
      type: 'boolean',
      name: 'withColor',
      title: 'Color Field',
      initialValue: true,
      options: {
        layout: 'checkbox',
      },
    },
    {
      type: 'boolean',
      name: 'withLetters',
      title: 'Letter Field',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      type: 'string',
      name: 'additionalName',
      title: 'Name for additional',
      options: {
        condition: (document) => {
          return document.optionsSwitch?.withAdditional;
        },
      },
      initialValue: 'Additional',
      inputComponent: ConditionalField,
    },
    {
      type: 'boolean',
      name: 'withAdditional',
      title: 'Additional Field',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
  ],
};
