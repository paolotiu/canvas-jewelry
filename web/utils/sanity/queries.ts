import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { groq } from 'next-sanity';
import { Category, Product } from 'schemaTypes';

const productFields = `
	_id,
	name,
	price,
	description,
	images[]
`;

export const ALL_PRODUCTS_QUERY = groq`

*[_type == 'product']{
	_id
}
`;
export const CATEGORY_BY_NAME_QUERY = groq`
*[_type == 'category' && lower(name) == lower($name)][0]{
	name,
	'products': *[_type == 'product' && references(^._id)]{${productFields}}
}
`;

export const ALL_CATEGORIES_QUERY = groq`
*[_type == 'category']{
	name
}
`;

export type ProductReturn = Pick<Product, '_id' | 'description' | 'price' | 'name'> & {
  images: SanityImageSource[];
};

export type CategoryWithProductsReturn = Pick<Category, '_id' | 'name'> & {
  products: ProductReturn[];
};
