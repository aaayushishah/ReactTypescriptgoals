import { IProduct } from "../helpers/productInterface";
import api from "./apis/api";

class ProductService {
  getProducts() {
    return api.product.getProducts();
  }
  addProduct(payload: IProduct) {
    return api.product.addProduct(payload);
  }
  deleteProduct(id: number) {
    return api.product.deleteProduct(id);
  }
}
const pService = new ProductService();
export default pService;
