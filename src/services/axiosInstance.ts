import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { API_CONFIG } from "@/app/constants/config";

let axiosInstance: AxiosInstance | null = null;

const createAxiosClient = (): AxiosInstance => {
  const token = sessionStorage.getItem("ACCESS_TOKEN");
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };

  const client = axios.create({
    baseURL: API_CONFIG.url,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client.interceptors.request.use((config: any) => {
    const token = sessionStorage.getItem("ACCESS_TOKEN");
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          sessionStorage.removeItem("ACCESS_TOKEN");
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    },
  );

  return client;
};

const getAxiosClient = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = createAxiosClient();
  }
  return axiosInstance;
};

export default getAxiosClient;
