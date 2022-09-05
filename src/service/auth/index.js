import { axiosClient } from "@iso/lib/axios/axios";
// import { AXIOS_CONFIGS, AXIOS_REQUEST_METHOD } from "../../constants/api";

const authRequest = {
  login2FA(user) {
    return axiosClient.post("account/login", { account: user.email, password: user.password });
  },
  loginEnable2FARequest(user) {
    return axiosClient.post("account/verify-otp", { refId: user.refId, secretKey: user.secretKey, otp: user.textCode, action: user.action });
  },
  login(payload) {
    console.log("iosadufuewqfsadf", payload);
    return axiosClient.post("account/verify-otp", { refId: payload.refId, otp: payload.textCode, action: payload.action });
  },
};

export default authRequest;
