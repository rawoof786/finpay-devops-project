import axios from "axios";

const API_HOST = "http://35.154.42.201";

export const accountApi = axios.create({
  baseURL: `${API_HOST}:8082`,
});

export const transactionApi = axios.create({
  baseURL: `${API_HOST}:8083`,
});

export const paymentApi = axios.create({
  baseURL: `${API_HOST}:8084`,
});

export const userApi = axios.create({
  baseURL: `${API_HOST}:8081`,
});
