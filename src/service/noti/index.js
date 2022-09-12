// import axios from "axios";
import { axiosClient } from "@iso/lib/axios/axios";

import { getToken } from "@iso/lib/helpers/utility";

const authRequest = {
  getListNotifications(payload) {
    return axiosClient.post("notification/list", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  getNotification(payload) {
    return axiosClient.post("notification/get-by-id", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  saveNotification(payload) {
    return axiosClient.post("notification/save", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  sendNoti(payload) {
    return axiosClient.post("notification/send", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
};

export default authRequest;
