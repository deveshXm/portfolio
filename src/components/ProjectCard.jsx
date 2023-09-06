import Button from "./Button";

function ProjectCard({ item }) {
  return (
    <div className="box p-2 lg:p-10 space-y-2 lg:space-y-5 overflow-hidden">
      <p className="text-2xl lg:text-6xl font-semibold overflow-hidden">
        {item.title}
      </p>
      <p className="text-base lg:text-3xl font-medium">{item.date}</p>
      <div className="lg:text-2xl font-thin space-y-3">
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
