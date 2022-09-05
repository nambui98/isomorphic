import actions from "./actions";

const initState = { listRole: [], isLoading: false, errors: null };

export default function roleReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_ALL_ROLE_SUCCESS:
      return {
        ...state,
        listRole: action.payload?.data,
        isLoading: false,
        errors: null,
      };
    case actions.GET_ALL_ROLE_ERROR:
      return {
        ...initState,
      };
    default:
      return state;
  }
}
