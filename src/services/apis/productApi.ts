import { IProduct } from "../../helpers/productInterface";
import api from "./api";

export default class ProductAPI {
  getProducts() {
    return api.get("/product");
  }
  addProduct(payload: IProduct) {
    return api.post("/product/create", payload);
  }
  deleteProduct(id: number) {
    return api.delete(`/product/${id}`);
  }
}
