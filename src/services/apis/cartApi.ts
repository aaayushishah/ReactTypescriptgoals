import { ICart, IPlaceOrderDetails } from "../../helpers/cartInterface";
import api from "./api";

export default class CartAPI {
  addToCart(payload: ICart[]) {
    return api.post("/cart/add", payload);
  }
  getCartList(userId: Number) {
    return api.get(`/cart?userId=${userId}`);
  }
  deleteItemFromCart(cartId: Number) {
    return api.delete(`/cart/${cartId}`);
  }
  placeOrder(payload: IPlaceOrderDetails) {
    return api.post(`/order`, payload);
  }
}

