import React, { useState } from "react";
import Image from "next/image";

const Button = ({ title, link, image }) => {
  return (
    <a href={link} class="button nav-link" target="_blank" rel="noreferrer">
      <div class="bottom"></div>
      <div class="top">
        <div className="flex justify-center space-x-2 w-[10rem] md:w-auto items-center">
          {image && (
            <Image
              src={image}
              alt="Mail Icon by Karya Sore"
              height="20px"
              width="20px"
            />
          )}
          <div class="label">{title}</div>
        </div>
        <div class="button-border button-border-left"></div>
        <div class="button-border button-border-top"></div>
        <div class="button-border button-border-right"></div>
        <div class="button-border button-border-bottom"></div>
      </div>
    </a>
  );
};

export default Button;
