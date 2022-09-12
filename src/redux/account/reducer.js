import actions from "./actions";
import { INIT_STATE } from "../common";

const initState = INIT_STATE;

function initStateEdit(edit) {
  const initState = { disabledView: false, resetPasswordView: false, changeRoleView: false, activeView: false };
  if (!edit) return initState;

  console.log("asdjfuewhqr", initState[edit]);

  return { ...initState, [edit]: true };
}

export default function accountReducer(
  state = {
    ...initState,
    listAccount: [],
    idAccount: null,
    addAccount: false,
    editView: false,
    disabledView: false,
    resetPasswordView: false,
    changeRoleView: false,
    activeView: false,
    statusDisableAccount: false,
    statusChangeRole: false,
  },
  action
) {
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
    case actions.GET_LIST_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
        listAccount: action.payload?.data.accounts,
      };
    case actions.ACTIVE_ACCOUNT_SUCCESS:
      return {
        ...state,
        activeAccountRequest: true,
      };
    case actions.ACTIVE_ACCOUNT_PENDING:
      return {
        ...state,
        activeAccountRequest: false,
      };
    case actions.DISABLE_ACCOUNT_SUCCESS:
      return {
        ...state,
        statusDisableAccount: true,
      };
    case actions.DISABLE_ACCOUNT_PENDING:
      return {
        ...state,
        statusDisableAccount: false,
      };
    case actions.CHANGE_ROLE_ACCOUNT_SUCCESS:
      return {
        ...state,
        statusChangeRole: true,
      };
    case actions.CHANGE_ROLE_ACCOUNT_PENDING:
      return {
        ...state,
        statusChangeRole: false,
      };
    case actions.CHANGE_ID_ACCOUNT:
      return {
        ...state,
        idAccount: action.payload,
      };
    case actions.ADD_ACCOUNT_ACTION:
      return {
        ...state,
        addAccount: true,
      };
    case actions.CHANGE_ACCOUNT:
      return {
        ...state,
        addAccount: false,
        editView: false,
        ...initStateEdit(""),
      };
    case actions.CHANGE_VIEW:
      return {
        ...state,
        editView: action.payload,
        activeView: true,
      };
    case actions.DISABLE_VIEW:
      return {
        ...state,
        ...initStateEdit("disabledView"),
      };
    case actions.RESET_PASSWORD_VIEW:
      return {
        ...state,
        ...initStateEdit("resetPasswordView"),
      };
    case actions.CHANGE_ROLE:
      return {
        ...state,
        ...initStateEdit("changeRoleView"),
      };
    case actions.ACTIVE_VIEW:
      return {
        ...state,
        ...initStateEdit("activeView"),
      };
    default:
      return state;
  }
}
