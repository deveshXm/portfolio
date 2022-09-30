import React from "react";

const Footer = () => {
  return (
    <div className="h-[20vh] font-roboto bg-[#27282c] flex items-center justify-center text-white">
      <div>
        <div className="flex space-x-2">
          <div className="flex ">
            <p className="text-3xl">&#169;</p>
          </div>
          <p className="flex items-center">2022 Devesh Meena</p>
        </div>
        <div>
          <p className="text-center">Made with passion</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
