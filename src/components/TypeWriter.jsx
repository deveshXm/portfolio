import { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypeWriter = (props) => {
  const [string, setString] = useState(props.text);
  const [text, helper] = useTypewriter({
    words: string,
    typeSpeed: 80,
    deleteSpeed: 80,
    delaySpeed: 100,
  });

  useEffect(() => {
    setString(props.text);
  }, [props]);

  return (
    <div className="flex">
      <p>{">"}</p>
      <span>{text}</span>

      <Cursor cursorStyle="_" cursorColor="black" />
    </div>
  );
};

export default TypeWriter;
