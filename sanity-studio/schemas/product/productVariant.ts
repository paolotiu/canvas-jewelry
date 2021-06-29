import { ObjectType } from '../schemaTypes';
import ConditionalField from 'sanity-plugin-conditional-field';

export const productVariant: ObjectType = {
  title: 'Product Variant',
  name: 'productVariant',
  type: 'object',
  fieldsets: [
    {
      name: 'size',
      title: 'Size',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false, // Defines if the fieldset should be collapsed by default or not
        columns: 2, // Defines a grid for the fields and how many columns it should have
      },
    },
  ],
  fields: [
    {
      type: 'number',
      name: 'price',
      title: 'Price',
      codegen: {
        required: true,
      },
      validation: (Rules) => Rules.required(),
    },
    {
      type: 'string',
      name: 'color',
      title: 'Color',
      options: {
        condition: (document) => {
          return document.optionsSwitch?.withColor;
        },
      },

      inputComponent: ConditionalField,
    },

    {
      type: 'number',
      name: 'minSize',
      title: 'Min Size',
      fieldset: 'size',

      options: {
        condition: (document) => {
          return document.optionsSwitch?.withSize;
        },
      },
      inputComponent: ConditionalField,
    },
    {
      type: 'number',
      name: 'maxSize',
      title: 'Max Size',
      fieldset: 'size',

      options: {
        condition: (document) => {
          return document.optionsSwitch?.withSize;
        },
      },
      inputComponent: ConditionalField,
    },
    {
      type: 'boolean',
      name: 'hasHalfSizes',
      title: 'Half Sizes',
      fieldset: 'size',

      initialValue: false,
      options: {
        condition: (document) => {
          return document.optionsSwitch?.withSize;
        },
      },
      inputComponent: ConditionalField,
    },
    {
      type: 'boolean',
      name: 'isAllHalfSizes',
      title: 'All Half Sizes',
      fieldset: 'size',
      initialValue: false,
      options: {
        condition: (document) => {
          return document.optionsSwitch?.withSize;
        },
      },
      inputComponent: ConditionalField,
    },
    {
      type: 'number',
      name: 'letters',
      title: 'Letters',

      options: {
        condition: (document) => {
          return document.optionsSwitch?.withLetters;
        },
      },
      inputComponent: ConditionalField,
    },

    {
      type: 'string',
      name: 'additional',
      title: 'Additional',

      options: {
        condition: (document) => {
          return document.optionsSwitch?.withAdditional;
        },
      },
      inputComponent: ConditionalField,
    },
  ],
};
