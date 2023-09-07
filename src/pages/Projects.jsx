import Heading from "../components/Heading";
import * as data from "../../data.json";
import Caraousel from "../components/Caraousel";
import ProjectCard from "../components/ProjectCard";

function Projects({ scroll }) {
  return (
    <div
      ref={scroll}
      className="relative pointer-events-none min-h-[120vh] h-full flex flex-col justify-center w-full bg-transparent md:p-10 py-5 px-2 xl:px-60 "
    >
      <Heading text={"Projects"} />
      <div className="mt-16 h-[80vh]">
        <Caraousel items={data.projects} Card={ProjectCard} />
      </div>
    </div>
  );
}

export default Projects;
