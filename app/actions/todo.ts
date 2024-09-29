"use server";

import { headers } from "next/headers";
import { THttpError } from "../lib/type";

export const fetchTodo = async () => {
  const headerList = headers();
  console.log("res before request", headerList.get("duyan-test-header"));

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  console.log("res after request", res.headers.get("duyan-test-header"));
  const data = await res.json();
  return data;
};
