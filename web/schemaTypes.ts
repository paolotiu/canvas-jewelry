import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
};

/**
 * Product
 *
 *
 */
export interface Product extends SanityDocument {
  _type: "product";

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Price — `number`
   *
   *
   */
  price: number;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Images — `array`
   *
   *
   */
  images: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityAsset;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * Categories — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };
}

export type Documents = Product | Category;
