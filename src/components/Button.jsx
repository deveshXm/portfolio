function Button({ text, link, onClick, children }) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <button
        className="pointer-events-auto px-5 md:px-10  py-2 xl:py-5 w-fit h-fit border-[1px] border-black text-base md:text-2xl xl:text-4xl font-thin hover:bg-gray-200 cursor-pointer  "
        onClick={onClick ? onClick : null}
      >
        {text ? text : children}
      </button>
    </a>
  );
}

export default Button;
