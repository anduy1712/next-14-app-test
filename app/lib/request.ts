// import { cookies } from "next/headers";
import Cookies from "js-cookie";
type Options = Omit<RequestInit, "method"> & {
  baseURL?: string | undefined;
  isAuth?: boolean;
};

export type ResultDTO<T> = {
  status: number;
  data: T;
};

// const CHAT_SERVICE_URL = process.env.NEXT_PUBLIC_CHAT_SERVICE_URL as string;
const SERVICE_URL = "https://dummyjson.com";

export const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options: Options = { isAuth: true }
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
  };
  let baseURL = SERVICE_URL;

  if (options?.baseURL) {
    baseURL = options.baseURL;
  }

  let path = `${baseURL}/${url}`;

  console.log(path);
  if (url.startsWith("/")) {
    path = `${baseURL}${url}`;
    console.log("cut url", path);
  }

  const token = Cookies.get("token");

  const res = await fetch(path, {
    ...options,
    method,
    headers: {
      ...baseHeaders,
      ...(options.isAuth &&
        token && {
          Authorization: `Bearer ${token}`,
        }),
    },
    body,
  });

  const data = (await res.json()) as T;

  if (data?.token) {
    Cookies.set("token", data.token);
    Cookies.set("refreshToken", data.refreshToken);
  }

  let result: ResultDTO<T> = {
    status: res.status,
    data,
  };

  if (!res.ok) {
    if (res.status === 401) {
      //GET NEW TOKEN
      const refreshToken = Cookies.get("refreshToken");
      const newResponse = await request<{
        token: string;
        refreshToken: string;
      }>("POST", "/auth/refresh", {
        body: { refreshToken },
      });

      const { data } = newResponse;

      if (data.token) {
        //CALL API AGAIN
        const newRs = await request<T>(method, url, {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        });

        result = newRs;
        return result;
      }
    }

    throw new Error("Some thing wrong");
  }

  return result;
};
