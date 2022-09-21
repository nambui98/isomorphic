const actions = {
  GET_NOTIFICATIONS: "GET_NOTIFICATIONS",
  GET_NOTIFICATIONS_SUCCESS: "GET_NOTIFICATIONS_SUCCESS",
  GET_NOTIFICATIONS_ERROR: "GET_NOTIFICATIONS_ERROR",
  GET_NOTIFICATIONS_PENDING: "GET_NOTIFICATIONS_PENDING",
  GET_NOTI: "GET_NOTI",
  GET_NOTI_SUCCESS: "GET_NOTI_SUCCESS",
  GET_NOTI_PENDING: "GET_NOTI_PENDING",
  SEND_NOTIFICATION: "SEND_NOTIFICATION",
  SEND_NOTIFICATION_SUCCESS: "SEND_NOTIFICATION_SUCCESS",
  SAVE_NOTIFICATION: "SAVE_NOTIFICATION",
  SAVE_NOTIFICATION_SUCCESS: "SAVE_NOTIFICATION_SUCCESS",
  SAVE_NOTIFICATION_PENDING: "SAVE_NOTIFICATION_PENDING",
  SAVE_NOTIFICATION_ERROR: "SAVE_NOTIFICATION_ERROR",
  DRAFT_NOTIFICATION: "DRAFT_NOTIFICATION",
  SEARCH_LIST_NOTIFICATION: "SEARCH_LIST_NOTIFICATION",
  DRAFT_NOTIFICATION_SUCCESS: "DRAFT_NOTIFICATION_SUCCESS",
  getListNotifications: (payload) => ({
    type: actions.GET_NOTIFICATIONS,
    payload,
  }),
  getNoti: (payload) => ({
    type: actions.GET_NOTI,
    payload,
  }),
  saveNotification: (payload) => ({
    type: actions.SAVE_NOTIFICATION,
    payload,
  }),
  draftNoti: (payload) => ({
    type: actions.DRAFT_NOTIFICATION,
    payload,
  }),
  sendNoti: (payload) => ({
    type: actions.SEND_NOTIFICATION,
    payload,
  }),
  searchListNotification: (payload) => ({
    type: actions.SEARCH_LIST_NOTIFICATION,
    payload,
  }),
};
export default actions;
