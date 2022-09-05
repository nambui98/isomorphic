import actions from "./actions";
import { INIT_STATE } from "../common";

const initState = INIT_STATE;

export default function accountReducer(state = initState, action) {
  switch (action.type) {
    case actions.ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
      };
    case actions.ADD_ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: "invalid account!",
        success: false,
      };
    case actions.ADD_ACCOUNT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };
    default:
      return state;
  }
}
