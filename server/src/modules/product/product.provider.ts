import { Product } from './models/product.model';
import { PRODUCT_REPOSITORY } from './../../core/constants/index';

export const productProvider = [{ provide: PRODUCT_REPOSITORY, useValue: Product }];
