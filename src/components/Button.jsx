import { useEffect, useState } from "react";

function Button({ text, link, onClick, children, disabled, success, className }) {
  const [string, setString] = useState(text);
  useEffect(() => {
    if (disabled) {
      setString("\v\v...\v\v");
    }
  }, [disabled]);
  useEffect(() => {
    if (success == "success") {
      setString("Success");
      setTimeout(() => {
        setString(text);
      }, 2000);
    } else if (success == "error") {
      setString("\vError\v");
      setTimeout(() => {
        setString(text);
      }, 2000);
    }
  }, [success]);
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <button
        disabled={disabled}
        className={`pointer-events-auto px-5 md:px-10  py-2 xl:py-4 2xl:py-5 w-fit h-fit border-[1px] border-black text-base 2xl:text-4xl font-thin ${
          !disabled ? "hover:bg-gray-200" : ""
        }  cursor-pointer  ${
          success == null
            ? "bg-none"
            : success == "error"
            ? "bg-red-400"
            : "bg-lime-400"
        } ${className}`}
        onClick={onClick ? onClick : null}
      >
        {string ? string : children}
      </button>
    </a>
  );
}

export default Button;
