import { SanityCodegenConfig } from 'sanity-codegen';
const config: SanityCodegenConfig = {
  schemaPath: './schemas/schema.ts',
  outputPath: '../web/schemaTypes.ts',
};

export default config;
