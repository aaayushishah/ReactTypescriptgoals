export interface ILogin {
  email: string;
  password: string;
}
export interface ILoginSuccess {
  token: string;
}
export interface IRegister {
  email: string;
  password: string;
  name: string;
  age: string;
  confirmPassword: string;
  address: IRegisterAddress;
}
interface IRegisterAddress {
  addressLine: string;
  area: string;
}
export interface IRegisterSuccess {
  id: string;
  token: string;
}
