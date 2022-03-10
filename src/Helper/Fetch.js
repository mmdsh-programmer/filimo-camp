import axios, { AxiosRequestConfig } from 'axios';
import { ERequest } from './App.enums';
// import { RefreshToken } from './RefreshToken';
// import Manifest from '../manifest';
import { toast } from 'react-toastify';


export const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = 'http://37.152.185.94:8001/user/';
let CancelToken = axios.CancelToken;

let source = CancelToken.source();
// {
//   url,
//   method,
//   data,
//   params: {
//     [key],
//   },
//   headers: {
//     [key],
//   },
//   onUploadProgress,
//   showMessage,
//   cancelToken,
//   signal,
//   responseType,
// }
const Fetch = async(FetchConfig) => {
  FetchConfig.showMessage = FetchConfig.showMessage === undefined ? true : FetchConfig.showMessage; // default is true
  const expireTime = window.localStorage.getItem('Loyality:EXPIRE_TIME');
  if (expireTime && parseInt(expireTime) - +new Date() > 10000) {
    // await RefreshToken();
  }
  const request = {
    method: FetchConfig.method,
    url: FetchConfig.url,
    data: FetchConfig.data,
    params: FetchConfig.params, 
    onUploadProgress: FetchConfig.onUploadProgress,
    cancelToken: source.token,
    headers: {
      ...FetchConfig.headers,
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + window.localStorage.getItem('filimo:ACCESS_TOKEN'),
      'Accept-Language': 'fa-IR,fa;q=0.9',
    },
    responseType: FetchConfig.responseType,
  };

  const response = await axiosInstance(request)
    .then((res) => {
      console.log("res.data", res)
      return res || { data: 'OK' };
    })
    .catch(async (error) => {
      if (axios.isCancel(error)) {
        console.log('error2', error)
        return {
          ERROR: error.message
        }
      }
      if (error.response && error.response.data && error.response.status === 401) {
        // const refreshResult = await RefreshToken();
        // retry after refresh token
        // if (refreshResult !== 'ERROR') {
        //   return await Fetch(FetchConfig);
        // }
      } else if (error.response && error.response.data && error.response.data.message && error.response.status === 500) {
        FetchConfig.showMessage && showError(error.response.data.message);
        return {
          ERROR: 'ERROR',
          status: 500,
        };
      } else if (error.response && error.response.data && error.response.status) {
        error.response.data.message && FetchConfig.showMessage && showError(error.response.data.message);
        return {
          ERROR: 'ERROR',
          status: error.response,
        };
      }
    });
  if (response === undefined) {
    FetchConfig.showMessage && showError(['خطا در برقراری ارتباط با سرور']);
    return {
      ERROR: 'ERROR',
      status: -1,
    };
  }
  return response;
};

let timeout;
const showError = (messages) => {
  clearTimeout(timeout);
  timeout = window.setTimeout(() => {
    toast.error(typeof messages === 'string' ? messages : messages.join(' '));
  }, 500);
};

export default Fetch;

export function cancellation() {
  source.cancel('cancelled')
  source = CancelToken.source()
}