function Button({ text, link }) {
  return (
    <button className="pointer-events-auto px-10 py-5 border-[1px] border-black text-4xl font-thin hover:bg-gray-200 cursor-pointer  ">
      <a href={link} target="_blank" rel="noreferrer">{text}</a>
    </button>
  );
}

export default Button;
