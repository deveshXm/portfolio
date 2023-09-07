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
      className="pointer-events-none relative min-h-[120vh] h-fit flex-1 w-full justify-center items-center"
    >
      <div className="absolute py-5 px-2 md:p-10 xl:px-60 xl:mx-60 z-[9] flex flex-col justify-center h-full">
        <Heading text={"Me?"} />
        <div>
          <div className="box md:p-5 p-2 xl:p-10 space-y-2 xl:space-y-6">
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
      <p
        className="select-none cursor-default text-3xl lg:text-4xl xl:text-8xl h-full overflow-hidden  w-full break-words 
      text-[#eae7ea] font-semibold pl-3 absolute"
      >
        {randomStrings[currentIndex]}
      </p>
    </div>
  );
}

export default About;
