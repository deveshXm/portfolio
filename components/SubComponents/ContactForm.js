import React from "react";
import Image from "next/image";

const ContactForm = () => {
  return (
    <div className="space-y-1 font-roboto font-semibold w-full">
      <p className="opacity-40">{"<a>"}</p>
      <div className="flex space-x-2">
        <img
          src="/mail.svg"
          alt="Mail Icon by Karya Sore"
          height="25px"
          width="25px"
        />
        <a
          href="mailto:nothefakedevesh@gmail.com"
          className="hover:text-purple-600 hover:cursor-pointer"
        >
          {"E-mail"}
        </a>
      </div>
      <div className="flex space-x-2">
        <img src="/linkedin.svg" />
        <a
          href="https://www.linkedin.com/in/devxm"
          className="hover:text-purple-600 hover:cursor-pointer my"
        >
          LinkedIn
        </a>
      </div>
      <div className="flex items-center space-x-2">
        <img src="/github.svg" />
        <a
          href="https://github.com/deveshXm"
          className="hover:text-purple-600 hover:cursor-pointer "
        >
          Github
        </a>
      </div>
      <p className="opacity-40">{"</a>"}</p>
    </div>
  );
};

export default ContactForm;
