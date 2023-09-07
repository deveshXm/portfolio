import Heading from "../components/Heading";
import * as data from "../../data.json";
import Caraousel from "../components/Caraousel";
import WorkCard from "../components/WorkCard";

function Work({ scroll }) {
  return (
    <div
      ref={scroll}
      className="relative pointer-events-none min-h-[120vh] w-full flex flex-col justify-center  bg-transparent py-5 px-2 md:p-10 xl:py-20 xl:px-60"
    >
      <Heading text={"Work"} />
      <div className="mt-16 w-full">
        <Caraousel items={data.work} Card={WorkCard} />
      </div>
    </div>
  );
}

export default Work;
