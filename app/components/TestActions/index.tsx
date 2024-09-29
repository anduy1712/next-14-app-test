"use client";

import { fetchTodo } from "@/app/actions/todo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TestActions = () => {
  const [products, setProducts] = React.useState([]);

  const fetchProductFromUseServer = async () => {
    if (window) {
      window.history.pushState(null, "", `/vlog?value=true`);
    }
    const data = await fetchTodo();
    console.log("fetchProductFromUseServer:", data);
    setProducts(data);
  };

  const fetchProductFromClient = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    console.log("fetchProductFromClient:", data);
  };

  useEffect(() => {
    // fetchProductFromClient();
    // fetchProductFromUseServer();
  }, []);

  return (
    <div>
      TestActions
      <button onClick={fetchProductFromUseServer}>button</button>
    </div>
  );
};

export default TestActions;
