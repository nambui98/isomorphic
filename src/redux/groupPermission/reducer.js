import actions from "./actions";
import { INIT_STATE } from "../common";

export default function groupPermissionReducer(
  state = {
    ...INIT_STATE,
    listGroup: [],
    idGroup: null,
    editView: false,
    addGroup: false,
    updateGroup: false,
    deleteGroup: false,
    addGroupRequest: {
      statusAddGroup: false,
    },
    listPermissionByGroup: null,
  },
  action
) {
  switch (action.type) {
    case actions.GET_LIST_GROUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
        listGroup: action.payload.data,
      };
    case actions.GET_LIST_GROUP_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };
    case actions.CHANGE_GROUP_ID:
      return {
        ...state,
        idGroup: action.payload,
      };
    case actions.CHANGE_VIEW:
      return {
        ...state,
        editView: action.payload,
        updateGroup: true,
        deleteGroup: false,
      };
    case actions.CHANGE_GROUP:
      return {
        ...state,
        editView: false,
        addGroup: false,
      };
    case actions.EDIT_GROUP:
      return {
        ...state,
        groups: action.payload,
      };
    case actions.ACTIVE_VIEW:
      return {
        ...state,
        updateGroup: true,
        deleteGroup: false,
      };
    case actions.DELETE_GROUP:
      return {
        ...state,
        deleteGroup: true,
        updateGroup: false,
      };
    case actions.ADD_GROUP_ACTION:
      return {
        ...state,
        addGroup: true,
        editView: true,
      };
    case actions.ADD_GROUP_SUCCESS:
      return {
        ...state,
        addGroupRequest: {
          statusAddGroup: true,
        },
        isLoading: false,
      };
    case actions.ADD_GROUP_PENDING:
      return {
        ...state,
        addGroupRequest: {
          statusAddGroup: false,
        },
        isLoading: true,
      };
    case actions.DELETE_GROUP_REQUEST_SUCCESS:
      return {
        ...state,
        addGroupRequest: {
          statusAddGroup: true,
        },
        isLoading: false,
      };
    case actions.DELETE_GROUP_REQUEST_PENDING:
      return {
        ...state,
        addGroupRequest: {
          statusAddGroup: false,
        },
        isLoading: true,
      };
    case actions.LIST_PERMISSION_BY_GROUP_SUCCESS:
      return {
        ...state,
        listPermissionByGroup: action.payload.data,
      };

    default:
      return state;
  }
}
