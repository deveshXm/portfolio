import React from "react";
import Heading4 from "./Heading4";

function Footer() {
  return (
    <div className="px-[30px] border-t-[1px] border-1-[#e8c6b4] flex gap-12 pt-6 pb-10 justify-center md:justify-normal">
      <a href="https://linkedin.com/in/devxm" target="_blank">
        <Heading4>LINKEDIN</Heading4>
      </a>
      <a href="https://github.com/deveshXm" target="_blank">
        <Heading4>GITHUB</Heading4>
      </a>
      <a href="https://instagram.com/_devesh16" target="_blank">
        <Heading4>INSTAGRAM</Heading4>
      </a>
    </div>
  );
}

export default Footer;
