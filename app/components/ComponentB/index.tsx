"use client";

// import useLocalStorage from "@/app/hooks/useLocalStorage";
import React, { useEffect } from "react";

import "./styles.css";
import Item from "../Item";
import useLocalStorage from "@/app/hooks/useLocalStorage";

const ComponentB = () => {
  const [list, setList] = useLocalStorage<unknown[]>("list", []);

  const handleAddItem = () => {
    const newItem = {
      id: new Date().getUTCMilliseconds(),
      name: `List item ${new Date().getUTCMilliseconds()}`,
    };
    setList([...list, newItem]);
  };

  return (
    <div className="box-2">
      ComponentB:
      <div>
        {list.map((item: any) => {
          return <Item key={item.id} name={item.name} />;
        })}
      </div>
      <button onClick={handleAddItem}>Click change component a</button>
    </div>
  );
};

export default ComponentB;
