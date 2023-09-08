import api from "./api";

export default class UserAPI {
  getUsers() {
    return api.get("/users");
  }
  deleteUser(id: number) {
    return api.delete(`/users/${id}`);
  }
}
