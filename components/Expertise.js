import React, { useEffect } from "react";
import Image from "next/image";
import data from "../data";
import Card from "./SubComponents/Card";
import gojo from "../public/gojo.png";
import AOS from "aos";
import 'aos/dist/aos.css';

const Expertise = ({scroll}) => {

  useEffect(() => {
    AOS.init({duration : 1000});
  },[]);
  
  

  return (
    <div ref={scroll} className="bg-gradient-to-b from-[#15212c] via-[#1a191d] to-[#1a191d] flex items-center justify-center">
      <div className="text-white pt-10 sm:pt-32" >
        <h1 className="font-bold text-4xl sm:text-7xl text-center " data-aos = "fade-right">
          My Expertise
        </h1>
        <div className="pt-20 space-y-2 md:space-y-0 lg:flex " data-aos = "fade-up">
          {data.Expertise.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
        <div className="sm:flex sm:items-center sm:justify-center opacity-25 font-roboto" data-aos = "fade-up">
          <p className="md:text-2xl text-center  sm:flex sm:justify-center mt-10 sm:mt-0 opacity-50 " >
             &ldquo; I&rsquo;ll debug you &rdquo;
          </p>
          <div className=" mx-auto md:mx-0 h-[200px] w-[200px] md:h-[400px] md:w-[400px] opacity-50">
            <Image src={gojo} objectFit="contain" alt=" gojo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
