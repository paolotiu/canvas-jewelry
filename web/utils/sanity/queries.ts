import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { groq } from 'next-sanity';
import { Category, Product } from 'schemaTypes';

const productFields = `
	_id,
	name,
	price,
	description,
	images[],
	'slug': slug.current,
	'mainImage': images[0].asset->,
  optionsSwitch

`;

export const ALL_PRODUCTS_QUERY = groq`

*[_type == 'product']{
	'slug': slug.current
}
`;

export const PRODUCT_BY_SLUG_QUERY = groq`

*[_type == 'product' && slug.current == $slug][0]{
	defaultVariant,
	variants[],
	${productFields}
}
`;

export const CATEGORY_BY_NAME_QUERY = groq`
*[_type == 'category' && lower(name) == lower($name)][0]{
	name,
	'products': *[_type == 'product' && references(^._id)]{${productFields}}
}
`;

export const CATEGORY_BY_SLUG_QUERY = groq`
*[_type == 'category' && slug.current == $slug][0]{
	name,
	products[]->{
    ${productFields}
    
  }

}
`;

export const ALL_CATEGORIES_QUERY = groq`
*[_type == 'category']{
	slug
}
`;

export type ProductReturn = Pick<Product, '_id' | 'description' | 'price' | 'name'> & {
  images: SanityImageSource[];
  slug: string;
  mainImage: {
    metadata: {
      lqip: string;
      dimensions: {
        aspectRatio: number;
      };
    };
    mimeType: string;
    url: string;
  };
};

export type ProductVariant = {
  price: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  hasHalfSizes?: boolean;
  isAllHalfSizes?: boolean;
};

export type ProductReturnWithVariants = ProductReturn & {
  defaultVariant: ProductVariant;
  variants: ProductVariant[];
  optionsSwitch?: OptionsSwitch;
};

export type OptionsSwitch = {
  withAdditional: boolean;
  withColor: boolean;
  withLetters: boolean;
  withSize: boolean;
};

export type CategoryWithProductsReturn = Pick<Category, '_id' | 'name'> & {
  products: ProductReturn[];
};
