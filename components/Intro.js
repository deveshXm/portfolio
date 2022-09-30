import React, { useState, useEffect, useRef } from "react";
import HALO from "vanta/dist/vanta.halo.min";
import * as THREE from "three";

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
        className="h-screen w-full flex items-center justify-center"
        ref={vantaRef}
      >
        <div className="block-inline z-[1] text-center  text-white  ">
          <h6 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold drop-shadow-2xl max-w-[90vw]">
            DEVESH MEENA
          </h6>
          <h4 className="text-1xl lg:text-3xl font-semibold font-roboto drop-shadow-2xl">
            STUDENT , FULL STACK DEVELOPER{" "}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Intro;
