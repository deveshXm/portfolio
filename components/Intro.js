import React, { useState, useEffect, useRef } from "react";
import HALO from "vanta/dist/vanta.halo.min";
import * as THREE from "three";
import Heading from "./SubComponents/Heading";

const Intro = ({ scroll }) => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          baseColor: "#15212c",
          backgroundColor: "#15212c",
          yOffset: 0.09,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={scroll}>
      <div
        className=" bg-[#15212c] h-screen w-full flex items-center justify-center"
        ref={vantaRef}
      >
        <div className="space-y-20">
          <div className="space-y-20">
            <div className=" z-[1] text-center  text-white mt-36 ">
              <div className="text-5xl sm:text-7xl lg:text-8xl font-semibold drop-shadow-2xl max-w-[90vw]">
                <Heading title={"Hi! I'm Devesh"} color={"blue-500"}/>
              </div>
              <h4 className="text-1xl lg:text-2xl font-semibold font-poppins drop-shadow-2xl">
                Student , Developer , Basketball Player
              </h4>
            </div>
            <div className="flex justify-center ">
              <a href="https://drive.google.com/file/d/1ZAiKj7vhU_x7Zu5JTGWpSd8q33jaAVSP/view?usp=sharing">
                <button className="download">RESUME</button>
              </a>
            </div>
          </div>
            <div className="mx-auto w-fit h-fit mt-auto">
              <div class="indicator"/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
