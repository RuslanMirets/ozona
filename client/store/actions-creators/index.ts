import * as UserActionCreators from '../actions-creators/user';
import * as ProductActionCreators from '../actions-creators/product';
import * as CartActionCreators from '../actions-creators/cart';

export default {
  ...UserActionCreators,
  ...ProductActionCreators,
  ...CartActionCreators,
};
