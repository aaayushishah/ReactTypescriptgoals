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
const cartR = (state = defaultState, action: IAction = defaultAction) => {
  switch (action.type) {
    case actionTypes.GET_CART_LIST_START:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case actionTypes.GET_CART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.GET_CART_LIST_ERROR:
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

export default cartR;
