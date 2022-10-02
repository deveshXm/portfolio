import React from "react";
import Image from "next/image";

const Card = ({ item }) => {
  return (
    <div
      className={`h-fit lg:h-[22vw] xl:h-[20vw] w-[80vw] lg:w-[22vw] transition duration-300 ease-in-out lg:hover:-translate-y-10 rounded-md p-9 xl:p-12 border-2 border-lightblue shadow-xl hover:shadow-white shadow-pink`}
    >
      <div className="flex fill-white items-center justify-evenly space-x-2 ">
        <Image src={item.logo} height={50} width={50} alt="logo" />
        <div className="text-2xl sm:text-lg md:text-base xl:text-[1.7rem] font-bold">
          <div>
            <p className="-mb-2 xl:-mb-[0.3rem] z-[3]">{item.title1}</p>
            <p className={`w-[70%] text-left h-1.5 `}></p>
          </div>
          <p>{item.title2}</p>
        </div>
      </div>
      <div className="font-poppins text-md md:text-sm lg:text-xs xl:text-base mt-9">
        <p className="text-left">{item.about}</p>
      </div>
    </div>
  );
};

export default Card;
