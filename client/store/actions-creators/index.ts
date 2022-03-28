import * as UserActionCreators from '../actions-creators/user';
import * as ProductActionCreators from '../actions-creators/product';
import * as CartActionCreators from '../actions-creators/cart';
import * as OrderActionCreators from '../actions-creators/order';

export default {
  ...UserActionCreators,
  ...ProductActionCreators,
  ...CartActionCreators,
  ...OrderActionCreators,
};
