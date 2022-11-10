import actions from "./actions";

const initState = { accessToken: null, isLoading: false, isAuthenticated: false, error: null, permissions: null, secretKey: "", action: "", refId: "", qrcode: "" };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload?.data?.accessToken,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        permissions: action.payload?.data?.permissions[0],
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        accessToken: null,
        isLoading: false,
        isAuthenticated: false,
        // error: action.payload.errors.data?.meta?.error_message,
        error: "Invalid otp",
      };
    case actions.LOGIN_PENDING:
      return {
        ...state,
        accessToken: null,
        isLoading: true,
        isAuthenticated: false,
        error: null,
      };

    case actions.LOGIN_2FA_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case actions.LOGIN_2FA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        qrcode: action.payload?.data.qrcode,
        secretKey: action.payload?.data.secretKey,
        refId: action.payload?.data.refId,
        action: action.payload?.data.action,
        error: null,
      };
    case actions.LOGIN_2FA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: "Account or Password incorrect",
        action: "",
      };

    case actions.LOGIN_ENABLE_2FA_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actions.LOGIN_ENABLE_2FA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        refId: action.payload?.data.refId,
        action: action.payload?.data.action,
        error: null,
      };
    case actions.LOGIN_ENABLE_2FA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: "Invalid otp",
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
