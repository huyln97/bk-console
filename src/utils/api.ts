import type {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
  ResponseType,
} from "axios";
import { getAccessToken } from "./token";
import axios from "axios";

export const BASE_URL = "https://api.dev-console.kimei.vn/api/v1";

export const REQUEST_URL = {
  SIGN_IN: "/users/login",
  SIGN_IN_WIth_GOOGLE: "users/google",
};

export type AxiosParams = {
  url: string;
  method: Method;
  data?: any;
  unmountSignal?: AbortSignal;
  headers?: Partial<AxiosRequestHeaders>;
  responseType?: ResponseType;
};
const api = async ({
  url,
  method,
  data,
  unmountSignal,
  headers,
  ...rest
}: AxiosParams) => {
  const accessToken = getAccessToken() || null;
  const authorization = data?.did
    ? data?.did
    : accessToken
    ? `Bearer ${accessToken}`
    : null;

  const request = {
    baseURL: BASE_URL,
    url,
    method,
    data,
    signal: unmountSignal,
    ...(authorization
      ? {
          headers: {
            Authorization: authorization,
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
          },
        }
      : headers
      ? { headers }
      : {}),
    ...rest,
  };
  try {
    return await axios(request as AxiosRequestConfig).then((res) => res.data);
  } catch (error) {
    throw error;
  }
};
export default api;
