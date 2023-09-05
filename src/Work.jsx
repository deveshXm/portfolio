import Heading from "./components/Heading";
import * as data from "../data.json";
import { useState } from "react";
import Button from "./components/Button";

function Work() {
  const items = data.work;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };
  return (
    <div className="relative pointer-events-none h-[100vh] w-full  bg-transparent py-20 px-60">
      <Heading text={"Work"} />
      <div className="flex space-x-36 mt-16 justify-center items-center h-[50vh]">
        <Button onClick={prevItem}>&lt;</Button>
        {items.map((exp, index) =>
          index == currentIndex ? (
            <div className="box p-10 space-y-5 overflow-hidden" key={index}>
              <p className="text-6xl font-semibold overflow-hidden">
                {exp.title}
              </p>
              <div className="w-full flex items-center justify-between">
                <p className="text-3xl font-medium">{exp.place}</p>
                <p className="text-3xl font-medium">{exp.date}</p>
              </div>
              <div className="text-2xl font-thin space-y-3">
                {exp.about.map((point, index) => (
                  <p key={index}>
                    {"> "}
                    {point}
                  </p>
                ))}
              </div>
            </div>
          ) : null
        )}
        <Button onClick={nextItem}>&gt;</Button>
      </div>
    </div>
  );
}

export default Work;
