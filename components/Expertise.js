import React, { useEffect } from "react";
import Image from "next/image";
import data from "../data";
import Card from "./SubComponents/Card";
import gojo from "../public/gojo.png";
import AOS from "aos";
import 'aos/dist/aos.css';
import Heading from "./SubComponents/Heading";

const Expertise = ({scroll}) => {

  useEffect(() => {
    AOS.init({duration : 1000});
  },[]);
  
  

  return (
    <div ref={scroll} className="flex bg-[url('/images/expertise-bg.jpg')]  bg-cover bg-no-repeat h-fit items-center justify-center z-10">
      <div className="text-white pt-10 sm:pt-32" >
        <h1 className="font-bold text-4xl sm:text-7xl text-center font-poppins text-lightblue " data-aos = "fade-right">
          <Heading title={"My Expertise"}/>
        </h1>
        <div className="text-white pt-20 space-y-5 lg:space-y-0 lg:flex lg:space-x-2 " data-aos = "fade-up">
          {data.Expertise.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
        <div className="sm:flex sm:items-center sm:justify-center opacity-25 font-roboto" data-aos = "fade-up">
          <p className="md:text-2xl text-center  sm:flex sm:justify-center mt-10 sm:mt-0 opacity-50 " >
             &ldquo; I&rsquo;ll debug you &rdquo;
          </p>
          <div className=" mx-auto md:mx-0 h-[200px] w-[200px] md:h-[400px] md:w-[400px] opacity-50 ">
            <Image src={gojo} objectFit="contain" alt=" gojo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
