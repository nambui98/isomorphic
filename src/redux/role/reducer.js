import actions from "./actions";

const initState = { listRole: [], isLoading: false, errors: null, selectedId: null, addRole: false, statusAddRole: false, statusEditRole: false };

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
    case actions.ADD_NEW_ROLE_SUCCESS:
      return {
        ...state,
        statusAddRole: true,
      };
    case actions.ADD_NEW_ROLE_PENDING:
      return {
        ...state,
        statusAddRole: false,
      };
    case actions.EDIT_ROLE_SUCCESS:
      return {
        ...state,
        statusEditRole: true,
      };
    case actions.EDIT_ROLE_PENDING:
      return {
        ...state,
        statusEditRole: false,
      };
    default:
      return state;
  }
}
