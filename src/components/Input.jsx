function Input({ text, placeholder, onChange, rows, cols }) {
  return (
    <div className="">
      <p className="sm:text-xl md:text-2xl">{text}</p>
      <textarea
        rows={rows}
        cols={35}
        placeholder={placeholder}
        className="bg-transparent text-lg lg:text-3xl pointer-events-auto focus:outline-none border border-black p-1 lg:p-2"
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
