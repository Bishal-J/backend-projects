import axios, { AxiosResponse } from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

// --- Type Definitions ---
type Params = Record<string, unknown>;
type Payload = Record<string, unknown>;

// --- Helper Functions ---
const getToken = (): string | null => localStorage.getItem("token");

const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- HTTP Methods ---

export const postWithAuth = async <T = unknown>(
  endpoint: string,
  data: Payload,
  params?: Params
): Promise<AxiosResponse<T>> => {
  return axios.post(`${BASE_URL}/${endpoint}`, data, {
    params,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...authHeaders(),
    },
  });
};

export const postWithoutAuth = async <T = unknown>(
  endpoint: string,
  data: Payload
): Promise<AxiosResponse<T>> => {
  return axios.post(`${BASE_URL}/${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
};

export const postFormWithAuth = async <T = unknown>(
  endpoint: string,
  formData: FormData
): Promise<AxiosResponse<T>> => {
  return axios.post(`${BASE_URL}/${endpoint}`, formData, {
    headers: {
      ...authHeaders(),
    },
  });
};

export const postLoginForm = async <T = unknown>(
  endpoint: string,
  data: Payload
): Promise<AxiosResponse<T>> => {
  return axios.post(`${BASE_URL}/${endpoint}`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getWithAuth = async <T = unknown>(
  endpoint: string,
  params?: Params
): Promise<AxiosResponse<T>> => {
  return axios.get(`${BASE_URL}/${endpoint}`, {
    params,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...authHeaders(),
    },
  });
};

export const getWithoutAuth = async <T = unknown>(
  endpoint: string,
  params?: Params
): Promise<AxiosResponse<T>> => {
  return axios.get(`${BASE_URL}/${endpoint}`, { params });
};

export const putWithAuth = async <T = unknown>(
  endpoint: string,
  data: Payload
): Promise<AxiosResponse<T>> => {
  return axios.put(`${BASE_URL}/${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...authHeaders(),
    },
  });
};

export const deleteRequest = async <T = unknown>(
  endpoint: string
): Promise<AxiosResponse<T>> => {
  return axios.delete(`${BASE_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...authHeaders(),
    },
  });
};

export const postExternalForm = async <T = unknown>(
  fullURL: string,
  data: Payload
): Promise<AxiosResponse<T>> => {
  return axios.post(fullURL, data);
};
