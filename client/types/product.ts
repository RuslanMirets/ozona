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
}

export enum ProductActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
}

interface FetchProductsAction {
  type: ProductActionTypes.FETCH_PRODUCTS;
  payload: IProduct[];
}

export type ProductAction = FetchProductsAction;
