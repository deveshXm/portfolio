import React, { useEffect } from "react";
import ExperienceCard from "./SubComponents/ExperienceCard";
import Data from "../data.json";
import AOS from "aos";
import "aos/dist/aos";
import Heading from "./SubComponents/Heading";

const Experience = ({ scroll }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div ref={scroll} className="h-fit py-40 flex justify-center text-white">
      <div className="space-y-20">
        <div
          className="text-center text-5xl md:text-7xl lg:text-8xl font-semibold"
          data-aos="fade-right"
        >
          <Heading title="Professional" />
          <Heading title="Experience" />
        </div>
        <div className="flex justify-center pt-4">
          <div className="w-fit mx-auto space-y-5 " data-aos="fade-up">
            {Data.Experience.map((item) => (
              <ExperienceCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
