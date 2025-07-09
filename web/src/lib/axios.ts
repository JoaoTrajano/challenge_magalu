import axios from "axios";
import { publicEnv } from "./env";

export const api = axios.create({
  baseURL: publicEnv.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (publicEnv.NEXT_PUBLIC_ENABLE_API_DELAY) {
  api.interceptors.request.use((config) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(config), Math.round(Math.random() * 3000));
    });
  });
}
