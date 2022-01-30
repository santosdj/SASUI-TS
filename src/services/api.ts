/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios, { AxiosRequestConfig } from "axios";

import TokenService from "./token.service";

// import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_SAS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  return config;
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {};
    }
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => error
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/sessions/azure" && err.response) {
      // Access Token was expired
      // eslint-disable-next-line no-underscore-dangle
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        console.log("refreshing token");

        try {
          const rs = await api.post("/refresh-token", {
            token: TokenService.getLocalRefreshToken(),
          });
          console.log("token refreshed", rs.data);
          const { authtoken, refreshtoken } = rs.data;

          TokenService.setLocalAccessToken(authtoken);
          TokenService.setLocalRefreshToken(refreshtoken);

          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;
