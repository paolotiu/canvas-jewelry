import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from '@utils/sanityClient';
import groq from 'groq';
import { Product } from 'schemaTypes';

export const getAllProductsQuery = groq`
*[_type == 'product']{
	_id,
	name,
	price,
	description,
	images[]

}
`;

export const getAllProducts = () => sanityClient.fetch<ProductExpanded[]>(getAllProductsQuery);

export type ProductExpanded = Pick<Product, '_id' | 'name' | 'price' | 'description'> & {
  images: SanityImageSource[];
};
export type ProductExpandedArray = ProductExpanded[];
