import Button from "./Button";

function ProjectCard({ item }) {
  return (
    <div className="box p-2 md:p-5 lg:p-10 space-y-2 lg:space-y-5 overflow-hidden min-h-[50vh] xl:min-h-[60vh] w-full flex flex-col justify-between">
      <p className="text-lg sm:text-4xl lg:text-6xl font-semibold overflow-hidden">
        {item.title}
      </p>
      <p className="text-sm sm:text-3xl font-medium">{item.date}</p>
      <div className="text-xs sm:text-2xl font-thin space-y-3">
        {item.about.map((point, index) => (
          <p key={index}>
            {"> "}
            {point}
          </p>
        ))}
      </div>
      <div className="w-full justify-center items-center flex">
        <Button link={item.link} text={"Github"} />
      </div>
    </div>
  );
}

export default ProjectCard;
