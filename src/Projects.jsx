import Heading from "./components/Heading";
import * as data from "../data.json";
import Caraousel from "./components/Caraousel";
import ProjectCard from "./components/ProjectCard";

function Projects({ scroll }) {
  return (
    <div
      ref={scroll}
      className="relative pointer-events-none h-[100vh] w-full  bg-transparent py-20 px-60"
    >
      <Heading text={"Projects"} />
      <div className="flex space-x-36 mt-16 justify-center items-center h-[80vh]">
        <Caraousel items={data.projects} Card={ProjectCard} />
      </div>
    </div>
  );
}

export default Projects;
