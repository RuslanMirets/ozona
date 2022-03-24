import { ProductAction, ProductState, ProductActionTypes } from './../../types/product';

const initialState: ProductState = {
  products: [],
  productDetail: null,
};

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case ProductActionTypes.FETCH_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };
    default:
      return state;
  }
};
