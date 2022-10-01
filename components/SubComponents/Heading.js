import React from "react";

const Heading = ({ title }) => {
  const arr = [];
  for (let i = 0; i <= title.length; i++) {
    arr.push(title[i]);
  }

  return (
    <div className="flex">
      {arr.map((item, idx) => (
        <div
          key={idx}
          className={`text-white hover:-translate-y-6 transition duration-[150] ease-in-out cursor-default hover:text-[#fed700]`}
        >
          <pre className="font-poppins">{item}</pre>
        </div>
      ))}
    </div>
  );
};

export default Heading;
