'use server'

import { request } from "../lib/request"

export const fetchTodo = async () => {
  const res = await request('GET','https://jsonplaceholder.typicode.com/posts');
  return res;
}