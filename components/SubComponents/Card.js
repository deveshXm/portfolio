import React from "react";
import Image from "next/image";

const Card = ({ item }) => {

  let color;
  let hoverColor;

  if(item.color === "pink"){
    color = "bg-pink-500";
    hoverColor = "hover:border-pink-500 hover:bg-pink-500";
  }
  else if(item.color === "blue"){
    color = "bg-[#61DAFB]";
    hoverColor = "hover:border-[#61DAFB] hover:bg-[#61DAFB]";
  }
  else{
    color = "bg-[#3c873a]";
    hoverColor = "hover:border-[#3c873a] hover:bg-[#3c873a]";
  }

  return (
    <div className={`h-fit lg:h-[22vw] xl:h-[20vw] p-9 xl:p-12 border-gray-400 border-2 w-[80vw] lg:w-[22vw] ${hoverColor} hover:bg-opacity-40 transition duration-300 ease-in-out`}>
      <div className="flex fill-white items-center justify-evenly space-x-2">
        <Image src={item.logo} height={50} width={50} alt="logo" />
        <div className="text-2xl sm:text-lg md:text-base xl:text-[1.7rem] font-bold">
          <div>
            <p className="-mb-2 xl:-mb-[0.3rem] z-[3]">{item.title1}</p>
            <p className={`w-[70%] text-left h-1.5 ${color}` }></p>
          </div>
          <p>{item.title2}</p>
        </div>
      </div>
      <div className="font-roboto text-md md:text-sm lg:text-xs xl:text-base mt-9">
        <p className="text-left">{item.about}</p>
      </div>
    </div>
  );
};

export default Card;
