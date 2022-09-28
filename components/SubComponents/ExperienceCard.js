import { useState, React } from "react";

const ExperienceCard = (props) => {
  const [drop, setDrop] = useState(false);

  const handleClick = () => {
    setDrop(!drop);
  };
  return (
    <div className="space-y-4 text-sm">
      <div className="w-[90vw] bg-purple-600 h-12 flex items-center justify-between rounded-md text-white font-medium px-2">
        <div>Microsoft Engage 2022</div>
        <div className="flex items-center space-x-2">
          <div>May - June 2022</div>
          <button
            onClick={handleClick}
            className="hover:text-[#61c4d9] hover:border-[#61c4d9]  w-6 rounded-full border-2 "
          >
            {drop ? "-" : "+"}
          </button>
        </div>
      </div>
      <div
        className={`bg-[#241d41] ${
          drop ? "down" : "up"
        } text-white rounded-md p-4 w-[90vw]`}
      >
        <div></div>
      </div>
    </div>
  );
};

export default ExperienceCard;
