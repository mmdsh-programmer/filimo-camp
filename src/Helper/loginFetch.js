import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

export const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.REACT_APP_API_URL;


const Fetch = async(FetchConfig)=> {
  FetchConfig.showMessage = FetchConfig.showMessage === undefined ? true : FetchConfig.showMessage; // default is true
  const request = {
    method: FetchConfig.method,
    url: FetchConfig.url,
    data: FetchConfig.data,
    params: FetchConfig.params,
    redirect:FetchConfig.redirect,
    headers: {
      ...FetchConfig.headers,
      'Content-Type': 'application/json;charset=utf-8',
      'Accept-Language': 'fa-IR,fa;q=0.9',
    },
    responseType: FetchConfig.responseType,
  };

  const response = await axiosInstance(request)
    .then((res) => {
      return res.data || { data: 'OK' };
    })
    .catch(async (error) => {

      // && error.response.config.url !== '/admin-panel/login'
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
          status: error.response.status,
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
