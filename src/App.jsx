import About from "./About";
import Intro from "./Intro";
import Background from "./Background";
import { useEffect, useState } from "react";

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      // Extract cursor X and Y coordinates from the event object
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });
    };

    // Attach the event listener when the component mounts
    window.addEventListener("mousemove", updateCursorPosition);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);
  return (
    <div className="relative bg-[#f7f7f7] h-[100vh] w-[100vw] overflow-x-hidden text-[#111111] p-0 m-0">
      <Background />
      <div className="absolute flex justify-end w-full h-full p-10 pointer-events-none">
        <div className="flex flex-col justify-between">
          <div className="box p-10 text-6xl space-y-6 font-thin font-pixel w-fit flex flex-col">
            <a>Home</a>
            <a>About</a>
            <a>Work</a>
            <a>Contact</a>
          </div>
          <div className="box mb-10 p-10 w-full font-pixel text-5xl">
            <p>X : {cursorPosition.x}</p>
            <p>Y : {cursorPosition.y}</p>
          </div>
        </div>
      </div>
      <Intro />
    </div>
  );
}

export default App;
