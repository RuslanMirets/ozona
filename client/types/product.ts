export interface IImage {
  url: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  images: IImage[];
  inStock: number;
  sold: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductState {
  products: IProduct[];
  productDetail: IProduct | null;
}

export enum ProductActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  FETCH_PRODUCT_DETAIL = 'FETCH_PRODUCT_DETAIL',
}

interface FetchProductsAction {
  type: ProductActionTypes.FETCH_PRODUCTS;
  payload: IProduct[];
}
interface FetchProductDetailAction {
  type: ProductActionTypes.FETCH_PRODUCT_DETAIL;
  payload: IProduct;
}

export type ProductAction = FetchProductsAction | FetchProductDetailAction;
