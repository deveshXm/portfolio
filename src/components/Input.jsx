function Input({ text, placeholder, onChange, rows, cols, disabled }) {
  return (
    <div className="">
      <p className="sm:text-xl md:text-xl 2xl:text-2xl">{text}</p>
      <textarea
        disabled={disabled}
        rows={rows}
        cols={35}
        placeholder={placeholder}
        className="bg-transparent text-lg 2xl:text-3xl pointer-events-auto focus:outline-none border border-black p-1 lg:p-2"
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
