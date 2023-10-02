import useNavigateLogin from "@nepMeds/hooks/useNavigateLogin";
import axios from "axios";
import httpStatus from "http-status";
import { api } from "./service-api";

import TokenService from "./service-token";

const THREE_MINUTES = 3 * 60 * 1000;
export const baseURL = import.meta.env.VITE_APP_BACKEND_API;
export const normalURL = import.meta.env.VITE_APP_NORMAL_API;
export const FRONT_URL = import.meta.env.VITE_APP_NEPMEDS_URL;
export const ESEWA_URL = import.meta.env.VITE_APP_ESEWA_URL;

/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */

// CUSTOM INSTANCE
const HttpClient = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});

/**
 * Pass API Key in Header
 */
HttpClient.interceptors.request.use(async config => {
  const token = TokenService.getToken()?.access;

  if (config && config.headers) {
    if (token && config.headers["Authorization"] !== "") {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (config.headers["Authorization"] === "") {
      delete config.headers["Authorization"];
    }
  }
  return config;
});

export { HttpClient };

export function toFormData<T>(data: Record<string, any>) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData as T;
}

function buildFormData(
  formData: FormData,
  data: Record<string, any>,
  parentKey?: string
) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach(key => {
      buildFormData(
        formData,
        data[key],
        parentKey
          ? !isNaN(+key)
            ? `${parentKey}[${key}]`
            : `${parentKey}.${key}`
          : key
      );
    });
    // file changed
  } else if (parentKey) {
    const value = data instanceof Date ? data.toString() : data;
    if (!value) return;
    formData.append(parentKey, value);
  }
}

HttpClient.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response.status === httpStatus.UNAUTHORIZED &&
      TokenService.getToken()?.refresh !== ""
    ) {
      try {
        const refreshToken = TokenService.getToken()?.refresh || "";
        const response = await HttpClient.post<{
          data: { access: string }[];
        }>(api.refresh_token.post, {
          refresh: refreshToken,
        });
        const tokens = {
          access: response?.data?.data?.[0]?.access,
          refresh: refreshToken,
        };
        TokenService.setToken(tokens);
        return axios({
          ...error.config,
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });
      } catch (_error) {
        TokenService.clearToken();
        useNavigateLogin();
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error.response);
  }
);
