import { ObjectType } from '../schemaTypes';
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
