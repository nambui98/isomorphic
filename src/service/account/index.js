// import axios from "axios";
import { getToken } from "@iso/lib/helpers/utility";

import { axiosClient } from "@iso/lib/axios/axios";

const accountRequest = {
  addAccount(newAccount) {
    return axiosClient.post("account/add", newAccount, { headers: { Authorization: "Bearer " + getToken().get("accessToken") } });
  },
};

export default accountRequest;
