import { axiosClient } from "@iso/lib/axios/axios";
// import { AXIOS_CONFIGS, AXIOS_REQUEST_METHOD } from "../../constants/api";
import { getToken } from "@iso/lib/helpers/utility";

const cdnRequest = {
  getListCdn() {
    return axiosClient.get("cdn/list-versions", { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  viewContentVersion(payload) {
    return axiosClient.post("cdn/get-version", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  editVersion(payload) {
    return axiosClient.post("cdn/update-version", payload, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
};

export default cdnRequest;
