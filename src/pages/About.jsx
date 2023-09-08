import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import * as data from "../../data.json";

function generateRandomString(length = 2000) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  return Array.apply(null, Array(length))
    .map(function () {
      return characters.charAt(Math.floor(Math.random() * characters.length));
    })
    .join("");
}

function About({ scroll }) {
  const [randomStrings, setRandomStrings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const generatedStrings = Array.from({ length: 100 }, () =>
      generateRandomString()
    );
    setRandomStrings(generatedStrings);
  }, []);

  window.addEventListener("mousemove", () => {
    const randomNumber = Math.floor(Math.random() * 100);
    setCurrentIndex(randomNumber);
  });

  return (
    <div
      ref={scroll}
      className="relative pointer-events-none min-h-[100vh] h-full flex flex-col justify-center w-full bg-transparent md:p-10 py-5 px-2 xl:px-40 2xl:px-60"
    >
      <div className="h-full z-[1]">
        <Heading text={"Me?"} />
        <div>
          <div className="box md:p-5 p-2 xl:p-5 2xl:p-10 space-y-2 xl:space-y-6">
            {data.about.map((ele, index) => {
              return (
                <div key={index}>
                  <p className="text-xl lg:text-3xl 3xl:text-5xl font-semibold">
                    {ele.ques}
                  </p>
                  <p className="text-base lg:text-2xl 3xl:text-4xl">
                    {ele.ans}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 select-none cursor-default text-3xl xl:text-5xl 2xl:text-8xl h-full overflow-hidden  w-full break-words 
      text-[#eae7ea] font-semibold pl-3"
      >
        {randomStrings[currentIndex]}
      </div>
    </div>
  );
}

export default About;
