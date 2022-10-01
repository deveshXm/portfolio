import React from "react";
import Image from "next/image";

const Card = ({ item }) => {
  let color;
  let hoverColor;

  if (item.color === "pink") {
    hoverColor = "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 ";
  } else if (item.color === "blue") {
    hoverColor = "bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 ";
  } else {
    hoverColor = "bg-gradient-to-tr from-emerald-500 to-lime-600";
  }

  return (
    <div
      className={`h-fit lg:h-[22vw] xl:h-[20vw] w-[80vw] lg:w-[22vw]  ${hoverColor} transition duration-300 ease-in-out shadow-lg shadow-[#aeaeae] md:hover:-translate-y-10 rounded-md`}
    >
      <div className={`bg-[#171d26] rounded-md hover:bg-transparent transition duration-500 ease-in-out  p-9 xl:p-12 h-full`} >
        <div className="flex fill-white items-center justify-evenly space-x-2">
          <Image src={item.logo} height={50} width={50} alt="logo" />
          <div className="text-2xl sm:text-lg md:text-base xl:text-[1.7rem] font-bold">
            <div>
              <p className="-mb-2 xl:-mb-[0.3rem] z-[3]">{item.title1}</p>
              <p className={`w-[70%] text-left h-1.5 ${color}`}></p>
            </div>
            <p>{item.title2}</p>
          </div>
        </div>
        <div className="font-roboto text-md md:text-sm lg:text-xs xl:text-base mt-9">
          <p className="text-left">{item.about}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
