import axios, { type AxiosInstance } from "axios";

export const BACKEND_BASE_URL = "http://localhost:8765";

export const apiClient: AxiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 4000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Event listener for backend connection status
let backendOnline = false;
const listeners: Array<(status: boolean) => void> = [];

export function setBackendStatus(online: boolean) {
  if (backendOnline !== online) {
    backendOnline = online;
    listeners.forEach((listener) => listener(online));
  }
}

export function subscribeBackendStatus(listener: (status: boolean) => void) {
  listeners.push(listener);
  listener(backendOnline);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
}

export function getBackendStatus(): boolean {
  return backendOnline;
}
