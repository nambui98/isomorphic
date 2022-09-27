import { axiosClient } from "@iso/lib/axios/axios";
// import { AXIOS_CONFIGS, AXIOS_REQUEST_METHOD } from "../../constants/api";
import { getToken } from "@iso/lib/helpers/utility";

const groupRequest = {
  getListGroupPermissions() {
    return axiosClient.post("group/list-all", {}, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  updateGroupPermissions(payload) {
    return axiosClient.post("group/update", payload, {
      headers: { Authorization: "Bearer " + getToken().get("accessToken") },
    });
  },
  addNewGroup(payload) {
    return axiosClient.post("group/add", payload, {
      headers: { Authorization: "Bearer " + getToken().get("accessToken") },
    });
  },
  deleteGroup(payload) {
    return axiosClient.post("group/delete", payload, {
      headers: { Authorization: "Bearer " + getToken().get("accessToken") },
    });
  },
  getListPermissions(payload) {
    return axiosClient.post("permission/list-by-group", payload, {
      headers: { Authorization: "Bearer " + getToken().get("accessToken") },
    });
  },
  getAllPermissions(payload) {
    return axiosClient.post("permission/list-all", {}, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
  updatePermissionByGroup(payload) {
    return axiosClient.post("group/update-group-permission", payload, {
      headers: { Authorization: "Bearer " + getToken().get("accessToken") },
    });
  },
  updateGroupByRole(payload) {
    return axiosClient.post("role/update-role-group", payload, {
      headers: { Authorization: "Bearer " + getToken().get("accessToken") },
    });
  },
};

export default groupRequest;
