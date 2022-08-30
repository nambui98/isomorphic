const actions = {
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_REQUEST_SUCCESS",
  LOGIN_ERROR: "LOGIN_REQUEST_ERROR",
  LOGIN_PENDING: "LOGIN_REQUEST_PENDING",
  RESET_PASSWORD: "RESET_PASSWORD",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  LOGIN_2FA: "LOGIN_2FA",
  LOGIN_2FA_SUCCESS: "LOGIN_2FA_SUCCESS",
  LOGIN_2FA_ERROR: "LOGIN_2FA_ERROR",
  LOGIN_ENABLE_2FA: "LOGIN_ENABLE_2FA",
  LOGIN_ENABLE_2FA_PENDING: "LOGIN_ENABLE_2FA_PENDING",
  LOGIN_ENABLE_2FA_SUCCESS: "LOGIN_ENABLE_2FA_SUCCESS",
  LOGIN_ENABLE_2FA_ERROR: "LOGIN_ENABLE_2FA_ERROR",
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (payload) => {
    return {
      type: actions.LOGIN_REQUEST,
      payload,
    };
  },
  login2FA: (payload) => {
    return {
      type: actions.LOGIN_2FA,
      payload,
    };
  },
  loginEnable2FA: (payload) => {
    return {
      type: actions.LOGIN_ENABLE_2FA,
      payload,
    };
  },
  logout: () => ({
    type: actions.LOGOUT,
  }),
  forgotPassword: (payload) => ({
    type: actions.FORGOT_PASSWORD,
    payload,
  }),
  resetPassword: (payload) => ({
    type: actions.RESET_PASSWORD,
    payload,
  }),
};
export default actions;
