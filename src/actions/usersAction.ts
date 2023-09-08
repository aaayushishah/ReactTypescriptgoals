import * as actionTypes from "./actionTypes";
import userService from "../services/userService";

const startUserList = () => {
  return {
    type: actionTypes.USER_START,
  };
};

const successUserList = (data: any) => {
  return {
    type: actionTypes.USER_SUCCESS,
    payload: data,
  };
};
const userListError = (error: any) => {
  return {
    type: actionTypes.USER_ERROR,
    payload: error,
  };
};

export function getUserList() {
  return (dispatch: any) => {
    dispatch(startUserList());
    return userService
      .getUsers()
      .then((res: any) => {
        dispatch(successUserList(res));
        return res;
      })
      .catch((err: any) => {
        dispatch(userListError(err));
        throw err;
      });
  };
}


const startDeleteUser = () => {
  return {
    type: actionTypes.DELETE_USER_START,
  };
};

const successDelete = (data: any) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    payload: data,
  };
};
const deleteError = (error: any) => {
  return {
    type: actionTypes.DELETE_USER_ERROR,
    payload: error,
  };
};

export function deleteUser(id: number) {
  return (dispatch: any) => {
    dispatch(startDeleteUser());
    return userService
      .deleteUser(id)
      .then((res: any) => {
        dispatch(successDelete(res));
        return res;
      })
      .catch((err: any) => {
        dispatch(deleteError(err));
        throw err;
      });
  };
}
