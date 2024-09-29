"use client";

import useNetwork from "@/app/hooks/use-net-work";
import "./styles.css";
import useLocalStorage from "@/app/hooks/use-local-storage";

const ComponentC = () => {
  const [status, setStatus] = useLocalStorage("status", false);
  const isOnline = useNetwork();

  console.log('isOnline', isOnline)
  const handleToggle = () => {
    setStatus((prevStatus) => !prevStatus);
  };

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    console.log("res", res.ok, res.status);
    try {
      const data = await res.json();
      console.log("data success", data);
    } catch (error) {
      console.log("error....-", error);
    }
  };

  console.log("redner component C", status);
  return (
    <div className="box-2">
      ComponentC:
      <h1>{status ? "Active" : "Inactive"}</h1>
      <button onClick={handleToggle}>Click change component a</button>
      <button onClick={fetchData}>Click to fetch product</button>
    </div>
  );
};

export default ComponentC;
