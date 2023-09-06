import Heading from "../components/Heading";
import * as data from "../../data.json";
import Caraousel from "../components/Caraousel";
import ProjectCard from "../components/ProjectCard";

function Projects({ scroll }) {
  return (
    <div
      ref={scroll}
      className="relative pointer-events-none h-fit w-full bg-transparent md:p-10 py-5 px-2 xl:py-20 xl:px-60"
    >
      <Heading text={"Projects"} />
      <div className="flex mt-16 justify-center items-center h-[80vh]">
        <Caraousel items={data.projects} Card={ProjectCard} />
      </div>
    </div>
  );
}

export default Projects;