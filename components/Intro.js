import React, { useState, useEffect, useRef } from "react";
import HALO from "vanta/dist/vanta.halo.min";
import * as THREE from "three";

const Intro = () => {
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
    <div
      className="h-screen w-full flex items-center justify-center"
      ref={vantaRef}
    >
        <div className="block-inline z-[1] text-center  text-white ">
            <h6 className="text-7xl md:text-[120px] lg:text-[142px] font-bold">DEVESH MEENA</h6>
            <h4 className="text-1xl lg:text-3xl font-semibold font-roboto">STUDENT , FULL STACK DEVELOPER  </h4>
        </div>
      {/* <div className="text-white z-[1] drop-shadow-2xl inline-block ">
        <div className="font-bold text-5xl sm:text-2xl md:text-[142px] ">
          <p>DEVESH MEENA</p>
        </div>
        <div className="md:text-2xl font-medium  font-roboto ">
          <p>STUDENT , FULL STACK DEVELOPER.</p>
        </div>
      </div> */}
    </div>
  );
};

export default Intro;
