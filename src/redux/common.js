import { RESPONSE_STATUS_CODE } from "../constants/api";
import { put, call } from "redux-saga/effects";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
export const PENDING = "PENDING";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

export const INIT_STATE = { isLoading: false, errors: null, success: false };

export const makeActionPending = ({ type, dataKey }) => ({
  type: `${type}_${PENDING}`,
  payload: {
    dataKey,
  },
});

export const makeActionSuccess = ({ type, dataKey, ...rest }) => ({
  type: `${type}_${SUCCESS}`,
  payload: {
    dataKey,
    ...rest,
  },
});

export const makeActionError = ({ type, dataKey, errors, ...rest }) => ({
  type: `${type}_${ERROR}`,
  payload: {
    dataKey,
    errors,
    ...rest,
  },
});

export const makeActionNotification = (payload) => {
  openNotificationWithIcon(payload.status, payload.title, payload.description);

  return {
    type: "PUSH_NOTIFICATION_MESSAGE",
    payload,
  };
};

const GeneratorFunction = function* () {
  yield undefined;
}.constructor;

function isGeneratorFunction(arg) {
  return arg instanceof GeneratorFunction;
}

function isGeneratorIterator(arg) {
  return arg.constructor === GeneratorFunction.prototype.constructor;
}

function isGenerator(fn) {
  return fn.constructor.name === "GeneratorFunction" || isGeneratorFunction(fn) || isGeneratorIterator(fn);
}

function* mappingActionCreators(creators, response, currentAction) {
  if (Array.isArray(creators)) {
    for (const action of creators) {
      if (isGenerator(action)) {
        const nextActionGF = yield action(response, currentAction);

        if (typeof nextActionGF === "object") {
          yield put(nextActionGF);
        } else if (typeof nextActionGF === "function") {
          yield put(nextActionGF(response, currentAction));
        } else {
          yield put({ type: "app/final" });
        }
      } else if (typeof action === "function") {
        yield put(action(response));
      } else {
        yield put(action);
      }
    }
  }
}

export const buildResponseError = (response) => {
  return {
    ...response,
    error: {
      key: response.data.error,
      items: response.data?.data,
    },
  };
};

/**
 * @function
 * @param {*} response
 */
export const buildResponseSuccess = (response) => {
  return {
    ...response,
    successfulData: response.data?.data,
  };
};

export const createBlankAsyncSagaRequest = ({ api, success, failure }) => {
  return function* (action) {
    try {
      yield put(
        makeActionPending({
          type: action.type,
        })
      );

      const response = yield call(api, action.payload);

      if (!response) {
        yield mappingActionCreators(failure, response);

        return yield put(
          makeActionError({
            type: action.type,
            errors: response,
          })
        );
      }

      if (RESPONSE_STATUS_CODE.SUCCESS.includes(response.status)) {
        // build success
        const rsSuccess = buildResponseSuccess(response);

        yield mappingActionCreators(success, rsSuccess, action);

        return yield put(
          makeActionSuccess({
            type: action.type,
            data: rsSuccess.successfulData,
          })
        );
      }

      // build error
      const errors = buildResponseError(response);

      yield mappingActionCreators(failure, errors);

      return yield put(
        makeActionError({
          type: action.type,
          errors,
        })
      );
    } catch (exception) {
      console.log("Error Exception:::::", exception);
      return yield put(
        makeActionError({
          type: action.type,
          errors: exception,
        })
      );
    }
  };
};
