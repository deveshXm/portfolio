function WorkCard({ item }) {
  return (
    <div className="box p-2 md:p-5 lg:p-10 space-y-2 lg:space-y-5 overflow-hidden w-full min-h-[40vh] xl:min-h-[50vh] flex flex-col justify-between">
      <p className="text-2xl lg:text-3xl 2xl:text-6xl 3xl:text-7xl font-semibold overflow-hidden">
        {item.title}
      </p>
      <div className="w-full flex items-center justify-between">
        <p className="text-sm lg:text-2xl 3xl:text-5xl font-medium">{item.place}</p>
        <p className="text-sm lg:text-2xl 3xl:text-5xl font-medium">{item.date}</p>
      </div>
      <div className="text-base lg:text-xl 3xl:text-4xl font-thin space-y-3">
        {item.about.map((point, index) => (
          <p key={index}>
            {"> "}
            {point}
          </p>
        ))}
      </div>
    </div>
  );
}

export default WorkCard;
