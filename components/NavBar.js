import React, { useRef, useState } from "react";

const NavBar = ({
  handleHome,
  handleExpertise,
  handleWork,
  handleExperience,
  handleContact,
}) => {
  const css =
    "hover:text-[#66d9ed] px-5 hover:cursor-pointer transform duration-300 ease-in-out";
  return (
    <div className="fixed h-[8vh] backdrop-blur-3xl z-[10] w-full flex items-center justify-center text-white text-sm font-medium font-roboto tracking-tighter ">
      <button onClick={handleHome} className={css}>
        home
      </button>
      <button onClick={handleExpertise} className={css}>
        expertise
      </button>
      <button onClick={handleWork} className={css}>
        work
      </button>
      <button onClick={handleExperience} className={css}>
        experience
      </button>
      <button onClick={handleContact} className={css}>
        contact
      </button>
    </div>
  );
};

export default NavBar;
