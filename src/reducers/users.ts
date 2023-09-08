import * as actionTypes from "../actions/actionTypes";

export const defaultState = {
  loading: false,
  data: [],
  error: null,
};
const defaultAction = {
  type: "",
  payload: "",
};
interface IAction {
  type: string;
  payload: any;
}
const userR = (state = defaultState, action: IAction = defaultAction) => {
  switch (action.type) {
    case actionTypes.USER_START:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case actionTypes.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.USER_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userR;
