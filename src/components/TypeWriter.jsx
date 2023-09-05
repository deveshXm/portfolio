import { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypeWriter = (props) => {
  const [text, helper] = useTypewriter({
    words: props.text,
    typeSpeed: 80,
    deleteSpeed: 80,
    delaySpeed: 100,
  });

  return (
    <div className="flex">
      <p>{">"}</p>
      <span>{text}</span>

      <Cursor cursorStyle="_" cursorColor="black" />
    </div>
  );
};

export default TypeWriter;
