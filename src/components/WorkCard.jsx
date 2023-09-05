function WorkCard({ item }) {
  return (
    <div className="box p-10 space-y-5 overflow-hidden">
      <p className="text-6xl font-semibold overflow-hidden">
        {item.title}
      </p>
      <div className="w-full flex items-center justify-between">
        <p className="text-3xl font-medium">{item.place}</p>
        <p className="text-3xl font-medium">{item.date}</p>
      </div>
      <div className="text-2xl font-thin space-y-3">
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
