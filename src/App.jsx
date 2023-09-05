import About from "./About";
import Intro from "./Intro";
import Background from "./components/Background";
import Skills from "./Skills";
import TypeWriter from "./components/TypeWriter";

import { useEffect, useState } from "react";

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [consoleText, setConsoleText] = useState([
    "Greetings!",
    "Initializing...",
  ]);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });
    };
    window.addEventListener("mousemove", updateCursorPosition);
    setTimeout(() => {
      setConsoleText(["Load skills", "Success"]);
    }, 4000);
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);
  return (
    <div className="bg-[#f7f7f7] box-border max-w-[100vw] text-[#111111] p-0 m-0">
      <Background />
      <div className="fixed top-0 left-0 flex justify-between w-full h-[100vh] p-10 pointer-events-none z-[1000]">
        <div className="text-4xl font-pixel font-thin flex justify-start">
          <div className="flex">
            <TypeWriter text={consoleText} />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="box p-10 text-6xl space-y-6 font-thin font-pixel w-fit flex flex-col">
            <a>Home</a>
            <a>About</a>
            <a>Work</a>
            <a>Contact</a>
          </div>
          <div className="box p-5 w-full flex flex-col justify-center items-center font-pixel text-3xl">
            <p>X : {cursorPosition.x}</p>
            <p>Y : {cursorPosition.y}</p>
          </div>
        </div>
      </div>
      <Intro />
      <Skills />
    </div>
  );
}

export default App;
