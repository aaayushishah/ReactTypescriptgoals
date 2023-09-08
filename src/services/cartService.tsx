import { ICart, IPlaceOrderDetails } from "../helpers/cartInterface";
import api from "./apis/api";

class CartService {
  addToCart(payload: ICart[]) {
    return api.cart.addToCart(payload);
  }
  getCartList(userId: Number) {
    return api.cart.getCartList(userId);
  }
  deleteItemFromCart(cartId: Number) {
    return api.cart.deleteItemFromCart(cartId);
  }
  placeOrder(payload: IPlaceOrderDetails) {
    return api.cart.placeOrder(payload);
  }
}
const cService = new CartService();
export default cService;
