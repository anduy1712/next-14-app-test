import { Options, request } from "@/app/lib/request";

export const http = {
  get: async <T>(url: string, options?: Options) => {
    const response = await request<T>("GET", url, options);
    return response;
  },
  post: async <T>(url: string, options?: Options) => {
    try {
      const response = await request<T>("POST", url, options);
      return response;
    } catch (error: any) {
      return error;
    }
  },
};
