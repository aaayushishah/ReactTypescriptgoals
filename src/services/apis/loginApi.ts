import { ILogin, IRegister } from "../../helpers/loginInterface";
import api from "./api";

export default class LoginAPI {
  login(payload: ILogin) {
    return api.post("/users/login", payload);
  }
  register(payload: IRegister) {
    return api.post("/users/register", payload);
  }
}
