import Heading from "./components/Heading";
import * as data from "../data.json";
import Caraousel from "./components/Caraousel";
import WorkCard from "./components/WorkCard";

function Work({ scroll }) {
  return (
    <div
      ref={scroll}
      className="relative pointer-events-none h-fit w-full  bg-transparent py-20 px-60"
    >
      <Heading text={"Work"} />
      <div className="flex space-x-36 mt-16 justify-center items-center h-[50vh]">
        <Caraousel items={data.work} Card={WorkCard} />
      </div>
    </div>
  );
}

export default Work;
