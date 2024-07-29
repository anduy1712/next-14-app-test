"use client";

// import useLocalStorage from "@/app/hooks/useLocalStorage";
import React, { useEffect, useState } from "react";

import "./styles.css";
import Item from "../Item";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { httpClient, request } from "@/app/lib/request";
import { fetchTodo } from "@/app/actions/todo";

const defaultValue = [
  {
    id: 1,
    name: "List item 1",
  },
];

const ComponentA = () => {
  const [list, setList] = useLocalStorage<{ id: number; name: string }[]>(
    "list",
    defaultValue
  );

  const [data, setData] = useState([]);
  const handleAddItem = () => {
    fetchTodoData();
  };

  const handleAddItem2 = () => {
    fetchTodoData2();
  };

  const fetchTodoData = async () => {
    const rs = await fetchTodo();
    const { data } = rs;

    setData(data);
  };

  const fetchTodoData2 = async () => {
    const rs = await httpClient.get("/posts");
    console.log({ rs });
    const { data } = rs;

    setData(data);
  };

  useEffect(() => {
    // fetchTodoData();
    // const data = fetchTodoData()
  }, []);

  console.log("comp a render");
  return (
    <div className="box">
      ComponentA:
      <div>
        {data.map((item: any) => {
          return <Item key={item.id} name={item.title} />;
        })}
      </div>
      <button onClick={handleAddItem}>Click call api server a</button>
      <button onClick={handleAddItem2}>Click call api client a</button>
    </div>
  );
};

export default ComponentA;
