import { axiosClient } from "@iso/lib/axios/axios";
import { getToken } from "@iso/lib/helpers/utility";

const roleRequest = {
  getAllRole() {
    return axiosClient.post(
      "role/list",
      {
        txtSearch: "",
        limit: 20,
        page: 1,
      },
      {
        headers: {
          Authorization: "Bearer " + getToken().get("accessToken"),
        },
      }
    );
  },
};

export default roleRequest;
