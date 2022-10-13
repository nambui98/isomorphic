import { axiosClient } from "@iso/lib/axios/axios";
// import { AXIOS_CONFIGS, AXIOS_REQUEST_METHOD } from "../../constants/api";
import { getToken } from "@iso/lib/helpers/utility";

const dashboardRequest = {
  getHee(payload) {
    return axiosClient.post("dashboard/hee-info", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  getInfoSpendingToWallet(payload) {
    return axiosClient.post("dashboard/spending-to-wallet", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  getShoeInfoRequest(payload) {
    return axiosClient.post("dashboard/shoe-info", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  getActivityInfo(payload) {
    return axiosClient.post("dashboard/activities-info", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  getActivityFee(payload) {
    return axiosClient.post("dashboard/activities-fee", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
};

export default dashboardRequest;
