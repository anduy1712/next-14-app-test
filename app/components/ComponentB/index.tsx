"use client";

import useLocalStorage from "@/app/hooks/useLocalStorage";
// import useLocalStorage from "@/app/hooks/useLocalStorage";

import "./styles.css";

const ComponentB = () => {
  const [list, setList] = useLocalStorage<unknown[]>("list", []);

  const handleAddItem = () => {
    const newItem = {
      id: new Date().getUTCMilliseconds(),
      name: `List item ${new Date().getUTCMilliseconds()}`,
    };
    setList([...list, newItem]);
  };
  console.log("redner component B", list);
  return (
    <div className="box-2">
      ComponentB:
      <div></div>
      <button onClick={handleAddItem}>Click change component a</button>
    </div>
  );
};

export default ComponentB;
