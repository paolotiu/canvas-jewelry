import Commerce from '@chec/commerce.js';

export const commerce = new Commerce('pk_2982681b2d503b999b1e73784fa635e8fd2c7e1bde13f');
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type CommerceProduct = ThenArg<ReturnType<typeof commerce.products.retrieve>>;
export type CommerceProductVariants = ThenArg<ReturnType<typeof commerce.products.getVariants>>;
export type CommerceProductVariant = ThenArg<ReturnType<typeof commerce.products.getVariant>>;
export type CommerceVariantGroups = CommerceProduct['variant_groups'];

