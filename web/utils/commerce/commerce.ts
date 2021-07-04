import Commerce from '@chec/commerce.js';

export const commerce = new Commerce('pk_test_29826298c92cb66e2c1b78715d8c49e77d339dc9d7cb7');
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type CommerceProduct = ThenArg<ReturnType<typeof commerce.products.retrieve>>;
export type CommerceProductVariants = ThenArg<ReturnType<typeof commerce.products.getVariants>>;
export type CommerceProductVariant = ThenArg<ReturnType<typeof commerce.products.getVariant>>;
export type CommerceVariantGroups = CommerceProduct['variant_groups'];
