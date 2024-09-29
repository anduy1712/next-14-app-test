// import { cookies } from "next/headers";
import Cookies from "js-cookie";
export type Options = Omit<RequestInit, "method" | "body"> & {
  baseURL?: string | undefined;
  isAuth?: boolean;
  body?: {};
};

export type ResultDTO<T> = {
  status: number;
  data: T;
};

export type Tokens = {
  token: string;
  refreshToken: string;
};

// const CHAT_SERVICE_URL = process.env.NEXT_PUBLIC_CHAT_SERVICE_URL as string;
const SERVICE_URL = "https://dummyjson.com";
const baseHeaders: {
  [key: string]: string;
} = {
  "Content-Type": "application/json",
};
export const isClient = typeof window !== "undefined";

export const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options: Options = { isAuth: true }
): Promise<ResultDTO<T>> => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  let baseURL = SERVICE_URL;
  let path = `${baseURL}/${url}`;

  const isAuthUrl = ["/auth/login"].some((authUrl) => authUrl === url);

  if (options?.baseURL) {
    baseURL = options.baseURL;
  }

  if (url.startsWith("/")) {
    path = `${baseURL}${url}`;
  }

  if (isClient && options.isAuth) {
    const token = Cookies.get("token");
    baseHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(path, {
    method,
    headers: {
      ...baseHeaders,
    },
    ...options,
    body,
  });

  const data = (await res.json()) as T;
  // TODO: may need to be improved here
  if (isAuthUrl) {
    Cookies.set("token", (data as Tokens).token);
    Cookies.set("refreshToken", (data as Tokens).refreshToken);
  }

  let result: ResultDTO<T> = {
    status: res.status,
    data,
  };

  // Interceptor for handling 401 responses
  if (!res.ok) {
    if (res.status === 401) {
      // Attempt to refresh the tokens
      const refreshToken = Cookies.get("refreshToken");
      const newTokens = await request<Tokens>("POST", "/auth/refresh", {
        body: { refreshToken: "dsdsdsds" },
      });

      const { data } = newTokens;

      // If successful, save the new tokens and retry the original request
      if ("token" in data) {
        Cookies.set("token", data.token);
        Cookies.set("refreshToken", data.refreshToken);
        return await request<T>(method, url, options);
      }

      console.log('newTokens', newTokens)
      // If token refresh fails, return the error response
      throw new Error("Token refresh failed");
      return {
        status: newTokens.status,
        data: "refresh token invalid, please try again" as T,
      };
    }

    return result;
  }

  return result;
};
