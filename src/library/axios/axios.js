import Axios from "axios";
import { AXIOS_CONFIGS } from "../../constants/api";

const baseURLdev = "https://staging.befitter.io/befadmin";
const baseURLProduction = "https://api.befitter.io/admin/";
const isDebug = true;
const baseURL = isDebug ? baseURLdev : baseURLProduction;
export const axiosClient = Axios.create({
  baseURL: baseURL,
  ...AXIOS_CONFIGS,
});

axiosClient.interceptors.response.use(handleSuccess, handleError);
axiosClient.interceptors.request.use(handleSuccess, handleError);

function handleSuccess(res) {
  return res;
}

function handleError(err) {
  if (err.response) {
    /**
     * @author
     * @description
     * @function handle refresh token
     * if status equal 401 or 403 then call service refresh token
     * if success then save new token and refresh token to local
     * if false then clear token and refresh token and later redirect client go to page login
     */

    return err.response;
  }

  if (err.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    console.log(err.request);
    return err.request;
  }

  if (err.message) {
    console.log("err.message:", err.message);
    return err.message;
  }

  return Promise.reject(err);
}
