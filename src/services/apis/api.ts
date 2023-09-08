import axios from "axios";
import UserAPI from "./userApi";
import LoginAPI from "./loginApi";
import ProductAPI from "./productApi";
import storage from "../storage";
import _ from "lodash";
import CartAPI from "./cartApi";

const BASEURL = "http://localhost:5000";
const win: Window = window;

class API {
  __user = new UserAPI();
  __login = new LoginAPI();
  __product = new ProductAPI();
  __cart = new CartAPI();
  api = axios.create({
    baseURL: BASEURL,
    transformRequest: [(data) => JSON.stringify(data)],
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  get user() {
    return this.__user;
  }
  get login() {
    return this.__login;
  }
  get product() {
    return this.__product;
  }
  get cart() {
    return this.__cart;
  }

  get(url: string, ...args: any) {
    return this.sendRequestInternal(this.api.get, url, ...args);
  }

  post(url: string, ...args: any) {
    return this.sendRequestInternal(this.api.post, url, ...args);
  }

  patch(url: string, ...args: any) {
    return this.sendRequestInternal(this.api.patch, url, ...args);
  }
  delete(url: string, ...args: any) {
    return this.sendRequestInternal(this.api.delete, url, ...args);
  }

  sendRequestInternal(requestFunc: any, url: string, ...args: any) {
    const token = storage.get("token");
    if (token) {
      this.api.defaults.headers.common["auth-token"] = `${token}`;
    }
    return requestFunc(url, ...args)
      .then((response: any) => response.data && response.data)
      .catch((error: any) => {
        if (error.response) {
          if (_.get(error, ["response", "data", "status"], 500) === 401) {
            storage.clearAll();
            win.location = "/";
          }
        }
        throw error;
      });
  }
}
const gApi = new API();
export default gApi;
