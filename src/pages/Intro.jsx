import Button from "../components/Button";
import { useEffect, useRef, useState } from "react";
import useJumbleAnimation, {
  generateIncrementalRandomString,
} from "../hooks/jumbleAnimation";

function Intro({ scroll, completed }) {
  const ref = useRef();
  const [string, setString] = useState("");
  useEffect(() => {
    if (completed) {
      generateIncrementalRandomString("Devesh Here!", setString);
    }
  }, [completed]);
  return (
    <div
      ref={scroll}
      className="relative h-[100vh] w-full bg-transparent pointer-events-none flex flex-col"
    >
      <div className="h-full w-full text-5xl  md:text-7xl xl:text-9xl  font-medium flex flex-col justify-center items-center">
        <iframe
          src="https://giphy.com/embed/Zb5oyPaa1x4Zoo3yEi"
          width="150"
          height="150"
        ></iframe>
        <p>Hello There!</p>
        <p ref={ref}>
          <span className="text-transparent">a</span>
          {string}
          <span className="text-transparent">a</span>
        </p>
        <div className="flex">
          <Button
            text={"Resume"}
            link={
              "https://drive.google.com/file/d/1DRPTlA2wBm9rO7lus0LpkC3d8C8EpiUl/view?usp=sharing"
            }
          />
          <Button
            text={"Linkedin"}
            link={"https://www.linkedin.com/in/devxm"}
          />
          <Button text={"Github"} link={"https://www.github.com/deveshXm"} />
        </div>
      </div>
    </div>
  );
}

export default Intro;
