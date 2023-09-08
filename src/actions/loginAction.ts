import * as actionTypes from "./actionTypes";
import loginService from "../services/loginService";
import { ILogin, IRegister } from "../helpers/loginInterface";

const startLogin = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

const successLogin = (data: any) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data,
  };
};
const loginError = (error: any) => {
  return {
    type: actionTypes.LOGIN_ERROR,
    payload: error,
  };
};

export function userLogin(payload: ILogin) {
  return (dispatch: any) => {
    dispatch(startLogin());
    return loginService
      .login(payload)
      .then((res: any) => {
        dispatch(successLogin(res));
        return res;
      })
      .catch((err: any) => {
        dispatch(loginError(err));
        throw err;
      });
  };
}


const startRegister = () => {
  return {
    type: actionTypes.REGISTER_ERROR,
  };
};

const successRegister = (data: any) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload: data,
  };
};
const registerError = (error: any) => {
  return {
    type: actionTypes.REGISTER_ERROR,
    payload: error,
  };
};
export function userRegister(payload: IRegister) {
  return (dispatch: any) => {
    dispatch(startRegister());
    return loginService
      .register(payload)
      .then((res: any) => {
        dispatch(successRegister(res));
        return res;
      })
      .catch((err: any) => {
        dispatch(registerError(err));
        throw err;
      });
  };
}
