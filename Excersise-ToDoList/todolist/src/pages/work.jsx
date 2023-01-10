import DateComponent from "../components/clock";
import List from "../components/list";
import { useState } from "react";

export default function Work() {
  const [input, setInput] = useState();

  const sendInput = () => {
    <List list={input} />;
    console.log(input);
  };
  return (
    <div className="flex flex-col h-[92vh] w-full items-center pt-8 gap-8 bg-gradient-to-tr from-slate-200 to-slate-600">
      <div className="writer">
        <div className="text-8xl writer-text">Just Do It.</div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Add a Task"
          name=""
          id=""
          onChange={(event) => setInput(event.target.value)}
          className="border border-black rounded-lg p-1 w-[30vw]"
        />
        <button
          onClick={() => sendInput()}
          className="ml-2 p-1.5 rounded-md bg-slate-800 font-semibold text-white"
        >
          I got This!
        </button>
      </div>
      <DateComponent />
      <List />;
    </div>
  );
}
