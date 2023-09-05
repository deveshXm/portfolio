import { useEffect, useState } from "react";

function generateRandomString(length = 1000) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  return Array.apply(null, Array(length))
    .map(function () {
      return characters.charAt(Math.floor(Math.random() * characters.length));
    })
    .join("");
}

function About() {
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
    <div className="relative max-h-[100vh] align-middle flex-1">
      <p className="select-none cursor-default font-pixel text-8xl  h-[100vh] overflow-hidden  w-full break-words 
      text-[#dfdcdf] font-semibold pl-3 absolute">
        {randomStrings[currentIndex]}
      </p>
    </div>
  );
}

export default About;
