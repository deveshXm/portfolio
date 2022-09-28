import React from "react";

const NavBar = () => {
  return (
    <div className="fixed h-[8vh] backdrop-blur-xl z-[10] w-full flex items-center justify-center gap-5 text-white text-xs font-medium font-roboto tracking-tighter">
      <div> home </div>
      <div> expertise</div>
      <div> work</div>
      <div> experience</div>
      <div> contact</div>
    </div>
  );
};

export default NavBar;
