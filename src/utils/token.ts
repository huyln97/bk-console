import { MMKV } from "react-native-mmkv";
const storage = new MMKV();
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const setAccessToken = (token: string) => {
  storage.set(ACCESS_TOKEN, token);
};

export const getAccessToken = () => {
  return storage.getString(ACCESS_TOKEN);
};

export const setRefrestToken = (token: string) => {
  storage.set(REFRESH_TOKEN, token);
};

export const getRefrestToken = () => {
  return storage.getString(REFRESH_TOKEN);
};
