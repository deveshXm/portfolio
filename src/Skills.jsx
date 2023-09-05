import Heading from "./components/Heading";
import * as data from "../data.json";
import { useEffect, useState } from "react";

function Skills() {
  const [strings, setStrings] = useState(data.skills);

  const calculateGridPosition = (index, columns, width, height) => {
    const col = index % columns;
    const row = Math.floor(index / columns);

    const x = col * width + Math.random() * width;
    const y = row * height + Math.random() * height;

    return { x, y };
  };

  useEffect(() => {
    const div = document.getElementById("randomDiv");
    if (!div) return;

    const maxDivWidth = div.clientWidth - 150;
    const maxDivHeight = div.clientHeight - 150;

    const columns = 10; // You can adjust the number of columns
    const rows = Math.ceil(strings.length / columns);
    const width = maxDivWidth / columns ;
    const height = maxDivHeight / rows ;

    const updatedStrings = strings.map((str, index) => {
      const { x, y } = calculateGridPosition(index, columns, width, height);
      return { text: str, x, y };
    });
    setStrings(updatedStrings);

    window.addEventListener("scroll", () => {
      const updatedStrings = strings.map((str, index) => {
        const { x, y } = calculateGridPosition(index, columns, width, height);
        return { text: str, x, y };
      });
      setStrings(updatedStrings);
    });
  }, []);

  return (
    <div className="relative pointer-events-none h-[100vh] w-full  bg-transparent p-20">
      <Heading text={"Skills"} />
      <div className="relative box w-[80vw] h-[70vh]">
        <p className="absolute p-3 text-xl">My Whiteboard</p>
        <div
          id="randomDiv"
          className="h-full p-20  bg-red-300 bg-opacity-25  "
        >
          <div>
            {strings.map((str, index) => (
              <div
                key={index}
                className="pointer-events-auto hover:rounded-3xl absolute text-4xl p-4 border-black border flex items-center justify-center cursor-default"
                style={{
                  top: `${str.y}px`,
                  left: `${str.x}px`,
                }}
              >
                {str.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
