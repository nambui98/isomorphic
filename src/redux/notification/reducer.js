import actions from "./actions";
import { INIT_STATE } from "../common";

const initState = INIT_STATE;

export default function notiReducer(state = { ...initState, statusSave: false, listNoti: [], noti: {}, totalNoti: 0, idSave: null, loadingGetNoti: false, bodySearch: null }, action) {
  switch (action.type) {
    case actions.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: true,
        listNoti: action.payload.data?.notifications,
        totalNoti: action.payload.data?.total,
      };
    case actions.GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.errors?.data?.meta?.error_message,
        success: false,
      };
    case actions.GET_NOTIFICATIONS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: false,
      };
    case actions.GET_NOTI_SUCCESS:
      return {
        ...state,
        noti: action.payload?.data,
        loadingGetNoti: false,
      };
    case actions.GET_NOTI_PENDING:
      return {
        ...state,
        loadingGetNoti: true,
      };
    case actions.DRAFT_NOTIFICATION_SUCCESS:
      return {
        ...state,
        idSave: action.payload?.data.notify_id,
      };
    case actions.SAVE_NOTIFICATION_PENDING:
      return {
        ...state,
        statusSave: false,
      };
    case actions.SAVE_NOTIFICATION_ERROR:
      return {
        ...state,
        statusSave: false,
      };
    case actions.SAVE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        statusSave: true,
      };
    case actions.SEARCH_LIST_NOTIFICATION:
      return {
        ...state,
        bodySearch: action.payload,
      };
    default:
      return state;
  }
}
