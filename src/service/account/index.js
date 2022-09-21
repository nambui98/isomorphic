// import axios from "axios";
import { getToken } from "@iso/lib/helpers/utility";

import { axiosClient } from "@iso/lib/axios/axios";

const accountRequest = {
  addAccount(newAccount) {
    return axiosClient.post("account/add", newAccount, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  getListAccount(payload) {
    return axiosClient.post("account/list", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  activeAccount(payload) {
    return axiosClient.post("account/active", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  disableAccount(payload) {
    return axiosClient.post("account/disable", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  resetAccount(payload) {
    return axiosClient.post("account/reset-password", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  changeRoleAccount(payload) {
    return axiosClient.post("account/change-role", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
};

export default accountRequest;
