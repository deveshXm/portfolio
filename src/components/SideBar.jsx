import { useEffect, useState } from "react";
import TypeWriter from "./TypeWriter";

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
    "Done",
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
    <div className="fixed top-0 left-0 flex justify-between text-lg md:text-2xl lg:text-4xl w-full h-[100vh] p-2 lg:p-10 pointer-events-none z-[1000]">
      <div className="font-pixel font-thin flex justify-start">
        <div className="flex">
          <TypeWriter text={consoleText} />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="box p-5 space-y-6 font-thin font-pixel w-fit flex flex-col pointer-events-auto">
          <button
            onClick={() => {
              handleHome();
              setConsoleText(["Load home"]);
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              handleAbout();
              setConsoleText(["Load about"]);
            }}
          >
            About
          </button>
          <button
            onClick={() => {
              handleSkills();
              setConsoleText(["Load skills"]);
            }}
          >
            Skills
          </button>
          <button
            onClick={() => {
              handleWork();
              setConsoleText(["Load work"]);
            }}
          >
            Work
          </button>
          <button
            onClick={() => {
              handleExperience();
              setConsoleText(["Load projects"]);
            }}
          >
            Projects
          </button>
          <button
            onClick={() => {
              handleContact();
              setConsoleText(["Load contact"]);
            }}
          >
            Contact
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
