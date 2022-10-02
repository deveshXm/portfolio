import React, { useEffect } from "react";
import Button from "./Button";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectCard = ({ item }) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div
      className="w-[90vw] md:w-[50vw] border-2 border-white border-opacity-0 md:hover:border-opacity-100 rounded-md font-poppins border-dashed shadow-xl mx-auto transform duration-300"
      data-aos="fade-up"
    >
      <div className="space-y-4 p-6 rounded-md  border-2 border-white border-opacity-100 md:hover:translate-x-3 md:hover:translate-y-3 transition duration-300 bg-grey ">
        <div className="text-2xl font-semibold">{item.title}</div>
        <div className="py-2">{item.about}</div>
        <Button title={"View Project"} link={item.link}/>
      </div>
    </div>
  );
};

export default ProjectCard;
