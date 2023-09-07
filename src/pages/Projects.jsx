import Heading from "../components/Heading";
import * as data from "../../data.json";
import Caraousel from "../components/Caraousel";
import ProjectCard from "../components/ProjectCard";

function Projects({ scroll }) {
  return (
    <div
      ref={scroll}
      className="relative pointer-events-none min-h-[100vh] h-full flex flex-col justify-center w-full bg-transparent md:p-10 py-5 px-2 xl:px-40 2xl:px-60 "
    >
      <Heading text={"Projects"} />
      <Caraousel items={data.projects} Card={ProjectCard} />
    </div>
  );
}

export default Projects;
