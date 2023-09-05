import React from "react";
import Heading from "./SubComponents/Heading";
import Button from "./SubComponents/Button";
import Image from "next/image";

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
        <div className="text-white min-h-screen h-fit w-screen flex items-center justify-center ">
          <div className="w-full md:flex md:items-center md:justify-around">
            <div className=" md:ml-20 space-y-4 ">
              <div className=" font-poppins  text-4xl md:text-8xl font-medium text-lightblue flex justify-center">
                <Heading title={"Hi! I'm Devesh"} />
              </div>
              <div className="mt-5 font-poppins text-3xl text-center">
                <p>Student , Developer & Basketball player.</p>
              </div>
              <div className="flex justify-center ">
                <Button
                  title={"RESUME"}
                  link={
                    "https://docs.google.com/document/d/1htaoYT47PnWwykaWx1HmhDkPjO3T2lYh/edit?usp=sharing&ouid=104273066732846044937&rtpof=true&sd=true"
                  }
                />
              </div>
            </div>
            <div>
              <Image
                src="/student.png"
                height={400}
                width={400}
                alt="student"
              />
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Intro;
