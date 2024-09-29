import ComponentA from "../components/ComponentA";
import ComponentB from "../components/ComponentB";
import ComponentC from "../components/ComponentC";
import "./styles.css";

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
      <div style={{ display: "flex" }}>
        <ComponentA />
        {/* <ComponentB /> */}
        {/* <ComponentC /> */}
      </div>

      {/* <Popper/> */}
    </div>
  );
}
