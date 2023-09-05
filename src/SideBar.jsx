import { useEffect, useState } from "react";
import TypeWriter from "./components/TypeWriter";

function SideBar({
  handleHome,
  handleAbout,
  handleSkills,
  handleWork,
  handleExperience,
  handleContact,
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [consoleText, setConsoleText] = useState([
    "Greetings!",
    "Initializing...",
    "Loading About Myself...",
    "Loading My Work...",
    "Loading Experience...",
    "Loading Contacts...",
    "Checking...",
    "Completed",
  ]);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });
    };
    window.addEventListener("mousemove", updateCursorPosition);
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 flex justify-between w-full h-[100vh] p-10 pointer-events-none z-[1000]">
      <div className="text-4xl font-pixel font-thin flex justify-start">
        <div className="flex">
          <TypeWriter text={consoleText} />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="box p-5 text-4xl space-y-6 font-thin font-pixel w-fit flex flex-col pointer-events-auto">
          <button onClick={handleHome} >
            Home
          </button>
          <button onClick={handleAbout}>
            About
          </button>
          <button onClick={handleSkills}>
            Skills
          </button>
          <button onClick={handleWork}>
            Work
          </button>
          <button onClick={handleExperience}>
            Projects
          </button>
          <button onClick={handleContact}>
            contact
          </button>
        </div>
        <div className="box p-2 w-full flex flex-col justify-center items-center font-pixel text-xl">
          <p>X : {cursorPosition.x}</p>
          <p>Y : {cursorPosition.y}</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
