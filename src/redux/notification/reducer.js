import actions from "./actions";
import { INIT_STATE } from "../common";

const initState = INIT_STATE;

export default function notiReducer(state = { ...initState, listNoti: [], noti: {}, totalNoti: 0, idSave: null }, action) {
  console.log("iewurioqwr", action);
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
      };
    case actions.DRAFT_NOTIFICATION_SUCCESS:
      return {
        ...state,
        idSave: action.payload?.data.notify_id,
      };
    default:
      return state;
  }
}
