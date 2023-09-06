import Heading from "./components/Heading";
import * as data from "../data.json";
import Caraousel from "./components/Caraousel";
import ProjectCard from "./components/ProjectCard";

function Projects({ scroll }) {
  return (
    <div
      ref={scroll}
      className="relative pointer-events-none h-fit w-full  bg-transparent py-5 px-2 lg:py-20 lg:px-60"
    >
      <Heading text={"Projects"} />
      <div className="flex mt-16 justify-center items-center h-[80vh]">
        <Caraousel items={data.projects} Card={ProjectCard} />
      </div>
    </div>
  );
}

export default Projects;
