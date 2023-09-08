import api from "./apis/api";
import { hydrateUsers } from "./transformers/userTransformer";

class UserService {
  getUsers() {
    return api.user.getUsers().then(hydrateUsers);
  }
  deleteUser(id: number) {
    return api.user.deleteUser(id);
  }
}
const uService = new UserService();
export default uService;
