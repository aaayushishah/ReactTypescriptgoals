import { ILogin, IRegister } from "../helpers/loginInterface";
import api from "./apis/api";

class LoginService {
  login(payload: ILogin) {
    return api.login.login(payload);
  }
  register(payload: IRegister) {
    return api.login.register(payload);
  }
}
const lService = new LoginService();
export default lService;
