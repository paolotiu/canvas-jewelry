import { SanityCodegenConfig } from 'sanity-codegen';

import { defaultBabelOptions } from 'sanity-codegen/cli';
const config: SanityCodegenConfig = {
  schemaPath: './schemas/schema.ts',
  outputPath: '../web/schemaTypes.ts',

  babelOptions: {
    ...defaultBabelOptions,
    plugins: [
      ...defaultBabelOptions.plugins.filter(
        ([key]) => key !== 'module-resolver'
      ),
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            'part:@sanity/base/schema-creator':
              'sanity-codegen/schema-creator-shim',
            'all:part:@sanity/base/schema-type':
              'sanity-codegen/schema-type-shim',
            'part:@sanity/base/schema-type': 'sanity-codegen/schema-type-shim',
            '^part:.*': 'sanity-codegen/no-op',
            '^config:.*': 'sanity-codegen/no-op',
            '^all:part:.*': 'sanity-codegen/no-op',
            // 👇👇👇
            'sanity-plugin-conditional-field': 'sanity-codegen/no-op',
            // 👆👆👆
          },
        },
      ],
    ],
  },
};

export default config;
