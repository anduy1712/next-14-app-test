"use client";

import useLocalStorage from "@/app/hooks/useLocalStorage";
// import useLocalStorage from "@/app/hooks/use-local-storage";
import "./styles.css";
import { useEffect, useState } from "react";
import { CustomError, THttpError } from "@/app/lib/type";
import { fetchTodoError } from "@/app/actions";

const defaultValue = [
  {
    id: "1",
    name: "List item 1",
  },
];

const ComponentA = () => {
  const [state, setState] = useState(false);
  const [list, setList] = useLocalStorage<{ id: string; name: string }[]>(
    "list",
    []
  );

  const handleSetList = () => {
    setList((prevList) => [
      ...prevList,
      {
        id: new Date().toString(),
        name: `List item ${new Date()}`,
      },
    ]);
  };

  const doSomething = async () => {
    try {
      const test = await fetchTodoError();
    } catch (error: any) {
      // get error.message
      console.log("yeah 2", error.message);
      // can't get error.status
      console.log("yeah 2", error.status);
    }
  };

  useEffect(() => {
    doSomething();
  }, []);
  console.log("redner component A", list);

  return (
    <div className="box">
      ComponentA:
      <div>
        {list.map((item) => (
          <div style={{ border: "4px solid blue" }} key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
      <button onClick={handleSetList}>Add item in list</button>
    </div>
  );
};

export default ComponentA;
