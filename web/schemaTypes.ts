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
   * Linked product — `singleProduct`
   *
   *
   */
  product: SingleProduct;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Has From — `boolean`
   *
   *
   */
  hasFrom: boolean;

  /**
   * Description — `array`
   *
   *
   */
  description?: Array<SanityKeyed<SanityBlock>>;

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

  /**
   * Products — `array`
   *
   *
   */
  products?: Array<SanityKeyedReference<Product>>;

  /**
   * Cover Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * Homepage Settings
 *
 *
 */
export interface HomepageSettings extends SanityDocument {
  _type: "homepageSettings";

  /**
   * homepageBanners — `array`
   *
   *
   */
  homepageBanners?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityAsset;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * homepageBlock1 — `homepageBlock`
   *
   *
   */
  homepageBlock1?: HomepageBlock;

  /**
   * homepageBlock2 — `homepageBlock`
   *
   *
   */
  homepageBlock2?: HomepageBlock;

  /**
   * homepageBlock3 — `homepageBlock`
   *
   *
   */
  homepageBlock3?: HomepageBlock;

  /**
   * nav — `array`
   *
   *
   */
  nav?: Array<SanityKeyed<Nav>>;

  /**
   * Password — `string`
   *
   *
   */
  password?: string;
}

export type ProductVariant = {
  _type: "productVariant";
  /**
   * ID — `string`
   *
   *
   */
  id: string;

  /**
   * Price — `number`
   *
   *
   */
  price: number;

  /**
   * Color — `string`
   *
   *
   */
  color?: string;

  /**
   * Min Size — `number`
   *
   *
   */
  minSize?: number;

  /**
   * Max Size — `number`
   *
   *
   */
  maxSize?: number;

  /**
   * Half Sizes — `boolean`
   *
   *
   */
  hasHalfSizes?: boolean;

  /**
   * All Half Sizes — `boolean`
   *
   *
   */
  isAllHalfSizes?: boolean;

  /**
   * Letters — `number`
   *
   *
   */
  letters?: number;

  /**
   * Additional — `string`
   *
   *
   */
  additional?: string;
};

export type OptionsSwitch = {
  _type: "optionsSwitch";
  /**
   * Size Field — `boolean`
   *
   *
   */
  withSize: boolean;

  /**
   * Color Field — `boolean`
   *
   *
   */
  withColor: boolean;

  /**
   * Letter Field — `boolean`
   *
   *
   */
  withLetters: boolean;

  /**
   * Name — `boolean`
   *
   *
   */
  withName: boolean;

  /**
   * Name for additional — `string`
   *
   *
   */
  additionalName?: string;

  /**
   * Additional Field — `boolean`
   *
   *
   */
  withAdditional: boolean;
};

export type HomepageBlock = {
  _type: "homepageBlock";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityAsset;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * reference — `reference`
   *
   *
   */
  reference?: SanityReference<Category | Product>;
};

export type Nav = {
  _type: "nav";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * reference — `reference`
   *
   *
   */
  reference?: SanityReference<Category | Product>;
};

export type SingleProduct = {
  _type: "singleProduct";
  /**
   * id — `string`
   *
   *
   */
  id?: string;

  /**
   * created — `number`
   *
   *
   */
  created?: number;

  /**
   * last_updated — `number`
   *
   *
   */
  last_updated?: number;

  /**
   * active — `boolean`
   *
   *
   */
  active?: boolean;

  /**
   * permalink — `string`
   *
   *
   */
  permalink?: string;

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * description — `string`
   *
   *
   */
  description?: string;

  /**
   * price — `price`
   *
   *
   */
  price?: Price;

  /**
   * quantity — `number`
   *
   *
   */
  quantity?: number;
};

export type CommercejsProducts = Array<SanityKeyed<SingleProduct>>;

export type Price = {
  _type: "price";
  /**
   * raw — `number`
   *
   *
   */
  raw?: number;

  /**
   * formatted — `string`
   *
   *
   */
  formatted?: string;

  /**
   * formatted_with_symbol — `string`
   *
   *
   */
  formatted_with_symbol?: string;

  /**
   * formatted_with_code — `string`
   *
   *
   */
  formatted_with_code?: string;
};

export type Documents = Product | Category | HomepageSettings;
