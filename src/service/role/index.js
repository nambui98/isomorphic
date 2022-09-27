import { axiosClient } from "@iso/lib/axios/axios";
import { getToken } from "@iso/lib/helpers/utility";

const roleRequest = {
  getAllRole(payload) {
    return axiosClient.post("role/list", payload, {
      headers: {
        Authorization: "Bearer " + getToken().get("accessToken"),
      },
    });
  },
  editRole(payload) {
    return axiosClient.post("role/update", payload, {
      headers: {
        Authorization: "Bearer " + getToken().get("accessToken"),
      },
    });
  },
  addNewRole(payload) {
    return axiosClient.post("role/add", payload, {
      headers: {
        Authorization: "Bearer " + getToken().get("accessToken"),
      },
    });
  },
  getListGroupByRole(payload) {
    return axiosClient.post("group/list-by-role", payload, {
      headers: {
        Authorization: "Bearer " + getToken().get("accessToken"),
      },
    });
  },
};

export default roleRequest;
