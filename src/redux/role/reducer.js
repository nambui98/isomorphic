import actions from "./actions";

const initState = { listRole: [], isLoading: false, errors: null, selectedId: null, addRole: false, statusAddRole: false, statusEditRole: false, listGroupByRole: null };

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
        ...state,
        isLoading: false,
        errors: action.payload?.data?.meta?.error_message,
      };
    case actions.GET_ALL_ROLE_PENDING:
      return {
        ...state,
        isLoading: true,
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
    case actions.GET_LIST_GROUP_BY_ROLE_SUCCESS:
      return {
        ...state,
        statusListGroupByRole: true,
        listGroupByRole: action.payload.data,
      };
    case actions.GET_LIST_GROUP_BY_ROLE_PENDING:
      return {
        ...state,
        statusListGroupByRole: false,
      };
    default:
      return state;
  }
}
