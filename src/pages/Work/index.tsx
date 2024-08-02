import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../../components/Heading";
import Heading2 from "../../components/Heading2";
import Button from "../../components/Button";
import Heading4 from "../../components/Heading4";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    name: "PRODUX",
    tenure: "JAN'24 - PRESENT",
    role: "AI SOFTWARE ENGINEER",
    about:
      "Revolutionizing the product management industry with cutting-edge AI solutions. Developed an advanced system that blends AI and real-time interactions, making complex tasks smoother and more efficient.",
  },
  {
    name: "HOPSTAIR",
    tenure: "JUL'23 - DEC'23",
    role: "REACT NATIVE ENGINEER",
    about: "Boosted user engagement by developing and enhancing features for a mobile app. Streamlined deployment processes, making releases faster and more reliable.",
  },
  {
    name: "FUNDWAVE",
    tenure: "MAY'23 - JUL'23",
    role: "SOFTWARE ENGINEER INTERN",
    about: "Worked on authentication microservices, improving security and performance. Collaborated with various teams to create scalable solutions.",
  },
  {
    name: "SHARDINGS",
    tenure: "OCT'22 - JAN'23",
    role: "THREEJS DEVELOPER INTERN",
    about: "Dove into front-end development with Three.js and Tailwind CSS, building engaging and dynamic web interfaces.",
  },
  {
    name: "MICROSOFT",
    tenure: "MAY'22 - JUN'22",
    role: "MICROSOFT ENGAGEE MENTEE",
    about: "Explored the world of machine learning and advanced frameworks during an intensive mentorship program.",
  },
];

const FloatingDiv = ({ text, position, offset = { x: 10, y: 10 } }) => {
  return (
    <div
      className=" z-10 fixed pointer-events-none border-[#e8c6b4] border-[1px] bg-[#131313] p-6 rounded-md floating-div w-[30vw] flex flex-col gap-4 min-h-[50vh] "
      style={{
        left: "0",
        top: "0",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "opacity 0.2s ease-in-out", // Add this line
        opacity: 1, // Change this from 0.8 to 1
      }}
    >
      {/* <Heading4 className="text-[#e8c6b4]">{text.name}</Heading4> */}
      <Heading4 className="text-[#e8c6b4]">{text.about}</Heading4>
    </div>
  );
};

function Work() {
  const containerRef = useRef(null);
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);

  const [showFloating, setShowFloating] = useState(false);
  const [floatingText, setFloatingText] = useState({ name: "", about: "" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (showFloating) {
      const offset = { x: 20, y: 20 }; // You can adjust these values to change the distance
      gsap.to(".floating-div", {
        x: mousePosition.x + offset.x,
        y: mousePosition.y + offset.y,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [mousePosition, showFloating]);

  useEffect(() => {
    const container = containerRef.current;
    const firstRow = firstRowRef.current;
    const secondRow = secondRowRef.current;

    gsap.fromTo(
      container,
      { rotate: 10 },
      {
        rotate: -10,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      firstRow,
      { x: "0rem" },
      {
        x: "-40rem",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      secondRow,
      { x: "-60rem" },
      {
        x: "0rem",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="bg-transparent h-full flex flex-col pt-[20vh] overflow-hidden">
      <div ref={containerRef}>
        <div ref={firstRowRef} className="w-full flex gap-12">
          <Heading>DEVESH</Heading>
          <div className="h-12 md:h-24 min-w-12 md:min-w-24 bg-[#ab4228] rounded-full m-auto" />
          <Heading>MEENA</Heading>
          <div className="h-12 md:h-24 min-w-12 md:min-w-24 bg-[#ab4228] rounded-full m-auto" />
          <Heading>DEVESH</Heading>
        </div>
        <div ref={secondRowRef} className="w-full flex gap-12">
          <Heading>WORK</Heading>
          <div className="h-12 md:h-24 min-w-12 md:min-w-24 bg-[#ab4228] rounded-full m-auto" />
          <Heading>EXPERIENCES</Heading>
          <div className="h-12 md:h-24 min-w-12 md:min-w-24 bg-[#ab4228] rounded-full m-auto" />
          <Heading>WORK</Heading>
        </div>
      </div>
      <div className="flex my-[20vh] flex-col mx-[30px] ">
        <div className="hidden lg:flex">
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="w-1/3 text-left">
                  <Heading2 className="text-[#e8c6b4] border-b-[1px] border-opacity-35 border-[#e8c6b4] py-1">COMPANY</Heading2>
                </th>
                <th className="w-1/3 text-left">
                  <Heading2 className="text-[#e8c6b4] border-b-[1px] border-opacity-35 border-[#e8c6b4] py-1">TENURE</Heading2>
                </th>
                <th className="w-1/3 text-left">
                  <Heading2 className="text-[#e8c6b4] border-b-[1px] border-opacity-35 border-[#e8c6b4] py-1">ROLE</Heading2>
                </th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience, index) => (
                <tr
                  key={index}
                  className="group relative cursor-pointer"
                  onMouseEnter={() => {
                    setShowFloating(true);
                    setFloatingText({ name: experience.name, about: experience.about });
                  }}
                  onMouseLeave={() => setShowFloating(false)}
                  onMouseMove={handleMouseMove}
                >
                  <td className="w-1/3 relative z-10">
                    <Heading2 className="text-[#e8c6b4] border-b-[1px] border-opacity-35 border-[#e8c6b4] py-1 group-hover:text-black transition-colors duration-300">
                      {experience.name}
                    </Heading2>
                  </td>
                  <td className="w-1/3 relative z-10">
                    <Heading2 className="text-[#e8c6b4] border-b-[1px] border-opacity-35 border-[#e8c6b4] py-1 group-hover:text-black transition-colors duration-300">
                      {experience.tenure}
                    </Heading2>
                  </td>
                  <td className="w-1/3 relative z-10">
                    <Heading2 className="text-[#e8c6b4] border-b-[1px] border-opacity-35 border-[#e8c6b4] py-1 group-hover:text-black transition-colors duration-300">
                      {experience.role}
                    </Heading2>
                  </td>
                  <div className="absolute inset-x-0 bottom-0 h-0 bg-[#e8c6b4] group-hover:h-full transition-all duration-300 ease-out"></div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex lg:hidden flex-col justify-center gap-2">
          {experiences.map((experience, index) => (
            <div className="border-b-[1px] border-opacity-35 border-[#e8c6b4] flex flex-col py-2">
              <Heading2 className="text-[#e8c6b4]">{experience.name}</Heading2>
              <Heading2 className="text-[#e8c6b4]">{experience.tenure}</Heading2>
              <Heading2 className="text-[#e8c6b4]">{experience.role}</Heading2>
            </div>
          ))}
        </div>
        <a href="https://linkedin.com/in/devxm" target="_blank">
          <Button text="SEE MORE" className="mt-[5vh]" />
        </a>
        <Heading2 className="w-[60vw] lg:w-[50vw] mx-auto indent-12 text-left mt-[10vh]  text-3xl md:text-4xl lg:text-5xl text-[#e8c6b4]">
          {"I HAD THE OPPORTUNITY TO WORK WITH AMAZING PEOPLE"}
        </Heading2>
      </div>
      {showFloating && (
        <FloatingDiv
          text={floatingText}
          position={mousePosition}
          offset={{ x: 20, y: 20 }} // You can adjust these values
        />
      )}
    </div>
  );
}

export default Work;
