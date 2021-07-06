// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import { categorySchema } from './categorySchema';
import { productSchema } from './product/productSchema';
import { productVariant } from './product/productVariant';
import { optionalFields } from './product/productOptionSchema';
import { homepageSchema } from './homepage/homepageSchema';
import { homepageBlock } from './homepage/homepageBlock';
import { homepageNav } from './homepage/homepageNav';
import { Document } from './schemaTypes';
import MyCustomString from '../components/MyCustomString';

import { singleProduct } from './commerce/singleProduct';
import { commercejsProducts } from './commerce/commercejsProducts';
import { price } from './commerce/price';
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    productSchema,
    categorySchema,
    productVariant,
    optionalFields,
    homepageSchema,
    homepageBlock,
    homepageNav,
    singleProduct,
    commercejsProducts,
    price,
  ]),
});
