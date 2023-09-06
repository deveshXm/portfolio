import TypeWriter from "./TypeWriter";

import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

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
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

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

  const rescss =
    "mx-auto py-4 pl-4 hover:text-black px-5 hover:cursor-pointer transform duration-300 bg-[#f7f7f7] ease-in-out w-full";

  return (
    <>
      <div className="fixed top-0 left-0 justify-between text-lg md:text-2xl lg:text-4xl w-full h-[100vh] p-2 lg:p-10 pointer-events-none z-[100] flex just-between">
        <div className="font-pixel font-thin flex justify-start">
          <div className="flex">
            <TypeWriter text={consoleText} />
          </div>
        </div>
        <div className="hidden xl:flex">
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
        <div className="pointer-events-auto xl:hidden h-fit">
          <div className="hover:cursor-pointer" onClick={handleNav}>
            {!nav ? (
              <AiOutlineClose color="black" size={40} />
            ) : (
              <AiOutlineMenu color="black" size={40} />
            )}
          </div>
          <div
            className={
              !nav
                ? "fixed left-[10%] top-[25%] h-fit w-[30vw] box z-[100] ease-in-out duration-500"
                : "fixed h-fit top-[25%] w-[30vw] box z-[100] left-[-110%] ease-in duration-500"
            }
          >
            <ul className="">
              <button onClick={handleHome} className={rescss}>
                Go To Top
              </button>
              <button onClick={handleAbout} className={rescss}>
                About Me
              </button>
              <button onClick={handleSkills} className={rescss}>
                My Skills
              </button>
              <button onClick={handleWork} className={rescss}>
                Work
              </button>
              <button onClick={handleExperience} className={rescss}>
                Projects
              </button>
              <button onClick={handleContact} className={rescss}>
                How to Contact
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
