function Heading({ children, className}) {
  return <h1 className={`text-[70px] sm:text-[150px] lg:text-[200px] ${className}`}>{children}</h1>;
}

export default Heading;
