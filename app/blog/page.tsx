import { useState } from "react";
import "./styles.css";
import useLocalStorage from "../hooks/useLocalStorage";
import ComponentA from "../components/ComponentA";
import ComponentB from "../components/ComponentB";
import { ClientOnly } from "../components/ClientOnly";

type Conversation = {
  id: string;
  name: string;
  messages: {
    message: string;
    role: string;
  }[];
  status: string;
};
const defaultValue: Conversation = {
  id: "1",
  name: "chat",
  messages: [],
  status: "",
};

export default function Page() {
  return (
    <div className="blog">
      <ComponentA />
      <ComponentB />
    </div>
  );
}
