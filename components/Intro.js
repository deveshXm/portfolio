import React, { useState, useEffect, useRef } from "react";
import Heading from "./SubComponents/Heading";
import Button from './SubComponents/Button';

const Intro = ({ scroll }) => {
  return (
    <div ref={scroll} className="h-screen">
      <ul class="background ">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <div className="text-white h-screen w-screen flex items-center justify-center md:justify-start ">
          <div className=" md:ml-20 space-y-10 md:space-y-4 ">
            <div className=" font-poppins  text-4xl md:text-8xl font-medium text-lightblue flex justify-center">
              <Heading title={"Hi! I'm Devesh"} />
            </div>
            <div className="mt-5 font-poppins text-3xl text-center">
              <p>Student , Developer & Basketball player.</p>
            </div>
            <div className="flex justify-center ">
                <Button title={"RESUME"} link={"https://drive.google.com/file/d/1ZAiKj7vhU_x7Zu5JTGWpSd8q33jaAVSP/view?usp=sharing"}/>
            </div>
            
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Intro;
