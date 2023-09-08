import * as actionTypes from "./actionTypes";
import cartService from "../services/cartService";
import { ICart, IPlaceOrderDetails } from "../helpers/cartInterface";

const startAddToCart = () => {
  return {
    type: actionTypes.ADD_TO_CART_START,
  };
};

const successAddToCart = (data: any) => {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    payload: data,
  };
};
const addToCartError = (error: any) => {
  return {
    type: actionTypes.ADD_TO_CART_START_ERROR,
    payload: error,
  };
};

export function addToCart(payload: ICart[]) {
  return (dispatch: any) => {
    dispatch(startAddToCart());
    return cartService
      .addToCart(payload)
      .then((res: any) => {
        dispatch(successAddToCart(res));
        return res;
      })
      .catch((err: any) => {
        dispatch(addToCartError(err));
        throw err;
      });
  };
}


const startGetCartList = () => {
  return {
    type: actionTypes.GET_CART_LIST_START,
  };
};

const successGetCartList = (data: any) => {
  return {
    type: actionTypes.GET_CART_LIST_SUCCESS,
    payload: data,
  };
};
const getCartListError = (error: any) => {
  return {
    type: actionTypes.GET_CART_LIST_ERROR,
    payload: error,
  };
};

export function getCartList(userId: Number) {
  return (dispatch: any) => {
    dispatch(startGetCartList());
    return cartService
      .getCartList(userId)
      .then((res: any) => {
        dispatch(successGetCartList(res));
        return res;
      })
      .catch((err: any) => {
        dispatch(getCartListError(err));
        throw err;
      });
  };
}

export function deleteItemFromCart(cartId: Number) {
  return (dispatch: any) => {
    return cartService
      .deleteItemFromCart(cartId)
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        throw err;
      });
  };
}
export function placeOrder(payload: IPlaceOrderDetails) {
  return (dispatch: any) => {
    return cartService
      .placeOrder(payload)
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        throw err;
      });
  };
}
