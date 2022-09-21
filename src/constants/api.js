export const AXIOS_CONFIGS = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  responseType: "json",
};

export const AXIOS_REQUEST_METHOD = {
  POST: "post",
  GET: "get",
  PATCH: "patch",
  PUT: "put",
  DELETE: "delete",
};

export const RESPONSE_STATUS_AUTHOR = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

export const RESPONSE_STATUS_CODE = {
  SUCCESS: [200, 201, 304],
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const RESPONSE_STATUS_CODE_PASSED = [...RESPONSE_STATUS_CODE.SUCCESS];

export const ERROR_EXCEPTION = {
  DUPLICATE: "EntityDuplicateException",
  INVITATION_INVALID: "InvitationInvalidException",
  INVITATION_DUPLICATE: "DuplicatedWhoruUserException",
  INVITATION_USER_NOTFOUND: "UserNotfoundException",
};
