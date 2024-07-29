import { request } from "@/app/lib/request";

export const http = {
  get: async <T>(url: string, options?: RequestInit) => {
    const response = await request<T>("GET", url, options);
    return response;
  },
  post: async <T>(url: string, options?: RequestInit) => {
    const response = await request<T>("POST", url, options);
    return response;
  },
};