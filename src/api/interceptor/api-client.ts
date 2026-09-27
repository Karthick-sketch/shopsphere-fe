import axios from "axios";
import AccessTokenStore from "./access-token-store";

const apiClient = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (request) => {
    const token = AccessTokenStore.getAccessToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    throw Promise.reject(error);
  },
);

export default apiClient;
