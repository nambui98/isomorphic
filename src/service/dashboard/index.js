import { axiosClient } from "@iso/lib/axios/axios";
// import { AXIOS_CONFIGS, AXIOS_REQUEST_METHOD } from "../../constants/api";
import { getToken } from "@iso/lib/helpers/utility";

const dashboardRequest = {
  getHee(payload) {
    console.log("iosadufuewqfsadf", payload);
    return axiosClient.post("dashboard/hee-info", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
};

export default dashboardRequest;
