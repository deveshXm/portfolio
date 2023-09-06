import { useRef, useState } from "react";
import useJumbleAnimation from "../hooks/jumbleAnimation";

function Heading({ text }) {
  const ref = useRef();
  const [title, setTitle] = useState(text);
  useJumbleAnimation(ref, title, setTitle);
  return (
    <div className="font-pixel text-8xl lg:text-9xl" ref={ref}>
      {title}
    </div>
  );
}

export default Heading;
