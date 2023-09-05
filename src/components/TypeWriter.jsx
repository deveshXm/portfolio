import { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypeWriter = (props) => {
  const [wordsList, setWordsList] = useState([""]);
  const [text, helper] = useTypewriter({
    words: wordsList,
    typeSpeed: 80,
    deleteSpeed: 80,
    delaySpeed: 100,
  });

  useEffect(() => {
    if (helper.isType == false && helper.isDelete == false) {
      setWordsList(props.text);
    }
  }, [props.text]);

  return (
    <div className="flex">
      <p>{">"}</p>
      <span>{text}</span>

      <Cursor cursorStyle="_" cursorColor="black" />
    </div>
  );
};

export default TypeWriter;
