import actions from "./actions";

const initState = { listRole: [], isLoading: false, errors: null, selectedId: null, addRole: false };

export default function roleReducer(state = initState, action) {
  console.log("ặehfuiewqr", action);
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
    case actions.CHANGE_ROLE_ID:
      return {
        ...state,
        selectedId: action.payload,
      };
    case actions.ADD_NEW_ROLE:
      return {
        ...state,
        addRole: true,
      };
    default:
      return state;
  }
}
