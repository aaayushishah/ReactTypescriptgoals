import * as actionTypes from "./actionTypes";
import productService from "../services/productService";
import { IProduct } from "../helpers/productInterface";

const startProductList = () => {
  return {
    type: actionTypes.GET_PRODUCT_LIST_START,
  };
};

const successProductList = (data: any) => {
  return {
    type: actionTypes.GET_PRODUCT_LIST_SUCCESS,
    payload: data,
  };
};
const productListError = (error: any) => {
  return {
    type: actionTypes.GET_PRODUCT_LIST_START,
    payload: error,
  };
};

export function getProducts() {
  return (dispatch: any) => {
    dispatch(startProductList());
    return productService
      .getProducts()
      .then((res: any) => {
        dispatch(successProductList(res));
        return res;
      })
      .catch((err: any) => {
        dispatch(productListError(err));
        throw err;
      });
  };
}

const startAddProduct = () => {
    return {
      type: actionTypes.PRODUCT_ADD_START,
    };
  };
  
  const successAddProduct = (data: any) => {
    return {
      type: actionTypes.PRODUCT_ADD_SUCCESS,
      payload: data,
    };
  };
  const productAddError = (error: any) => {
    return {
      type: actionTypes.PRODUCT_ADD_ERROR,
      payload: error,
    };
  };
  
  export function addProducts(payload: IProduct) {
    return (dispatch: any) => {
      dispatch(startAddProduct());
      return productService
        .addProduct(payload)
        .then((res: any) => {
          dispatch(successAddProduct(res));
          return res;
        })
        .catch((err: any) => {
          dispatch(productAddError(err));
          throw err;
        });
    };
  }

const startDeleteProduct = () => {
  return {
    type: actionTypes.DELETE_USER_START,
  };
};

const successProductDelete = (data: any) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    payload: data,
  };
};
const deleteProductError = (error: any) => {
  return {
    type: actionTypes.DELETE_USER_ERROR,
    payload: error,
  };
};

export function deleteProduct(id: number) {
  return (dispatch: any) => {
    dispatch(startDeleteProduct());
    return productService
      .deleteProduct(id)
      .then((res: any) => {
        dispatch(successProductDelete(res));
        return res;
      })
      .catch((err: any) => {
        dispatch(deleteProductError(err));
        throw err;
      });
  };
}
