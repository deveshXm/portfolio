function Button({ text, link, onClick, children }) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <button
        className="pointer-events-auto px-5 lg:px-10  py-2 lg:py-5 w-fit h-fit border-[1px] border-black text-base lg:text-4xl font-thin hover:bg-gray-200 cursor-pointer  "
        onClick={onClick ? onClick : null}
      >
        {text ? text : children}
      </button>
    </a>
  );
}

export default Button;
