import React from "react";

const NavBar = () => {
  return (
    <div className="fixed h-[10vh] backdrop-blur-xl z-[10] w-full flex items-center justify-center gap-5 text-white text-xs md:text-sm font-medium font-roboto tracking-tighter">
      <p>&#47; &#47; home &nbsp;</p>
      <p>&#47; &#47; expertise &nbsp;</p>
      <p>&#47; &#47; work &nbsp; </p>
      <p>&#47; &#47; experience &nbsp; </p>
      <p>&#47; &#47; contact &nbsp;</p>
    </div>
  );
};

export default NavBar;
