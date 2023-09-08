import jwt from "jwt-decode";
class StoreClass {
  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }

  getUser() {
    let token = this.get("token") ?? "";
    let user: { _id: string; email: string, isAdmin:boolean } = { _id: '', email: '', isAdmin: false };
    if(token  != ''){
      user = jwt(token);
    }
    return user;
  }
}
  const Storage = new StoreClass(); 
  export default Storage;
  