import React, { useRef, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Heading2 from "./Heading2";
import Heading4 from "./Heading4";

const Button = ({ text, onClick, className, classNameText }) => {
  const textRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [textWidth, setTextWidth] = useState(0);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [text]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`bg-transparent  hover:cursor-pointer border border-[#e8c6b4] rounded-full overflow-hidden px-0 py-1 justify-start  ${className}`}
      style={{ minWidth: `${textWidth}px`, maxWidth: `${textWidth}px` }}
    >
      <Heading4 className={`text-[#e8c6b4] whitespace-nowrap ${classNameText} `}>
        {hover ? (
          <Marquee autoFill={true}>{text}&nbsp;</Marquee>
        ) : (
          <span ref={textRef} className="px-1 md:px-2">
            {text}
          </span>
        )}
      </Heading4>
    </button>
  );
};

export default Button;
