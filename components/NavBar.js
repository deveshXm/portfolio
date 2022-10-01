import React, { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const NavBar = ({
  handleHome,
  handleExpertise,
  handleWork,
  handleExperience,
  handleContact,
}) => {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  const css =
    "hover:text-[#66d9ed] px-5 hover:cursor-pointer transform duration-300 ease-in-out";

  const rescss = "flex border-b border-purple-600 py-4 pl-4 hover:text-[#66d9ed] px-5 hover:cursor-pointer transform duration-300 ease-in-out w-full"
  return (
    <div className="flex fixed top-0 z-[10] w-full text-white p-4 2xl:text-3xl font-bold justify-end bg-gradient-to-t from-transparent to-black md:bg-none md:backdrop-blur-3xl items-center md:justify-center font-roboto">
      <div className="hidden md:flex">
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
      <div
        className=" ml-4 block md:hidden hover:cursor-pointer"
        onClick={handleNav}
      >
        {!nav ? <AiOutlineClose size={40} /> : <AiOutlineMenu size={40} />}
      </div>

      <div
        className={
          !nav
            ? "fixed left-0 top-0 h-full bg-opacity-50 backdrop-blur-md bg-black w-60 border-r border-r-gray-500 z-[1000] ease-in-out duration-500"
            : "fixed left-[-100%] top-0 h-full bg-opacity-50 backdrop-blur-md bg-black w-60 border-r border-r-gray-500 z-[1000] ease-in duration-500 font-roboto "
        }
      >
        <ul className="pt-24">
          <button onClick={handleHome} className={rescss}>
            home
          </button>
          <button onClick={handleExpertise} className={rescss}>
            expertise
          </button>
          <button onClick={handleWork} className={rescss}>
            work
          </button>
          <button onClick={handleExperience} className={rescss}>
            experience
          </button>
          <button onClick={handleContact} className={rescss}>
            contact
          </button>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
