import Button from "./components/Button";

function Intro() {
  return (
    <div className="relative h-full w-full bg-transparent pointer-events-none flex flex-col">
      <div className="text-4xl font-pixel font-thin p-10 flex justify-start">
        <div>
          <p>{"> Greetings"}</p>
          <p>{"> _"}</p>
          <p>{"> Initializing Sequence..."}</p>
        </div>
      </div>
      <div className="text-9xl font-pixel font-medium flex flex-col justify-center items-center">
        <iframe
          src="https://giphy.com/embed/Zb5oyPaa1x4Zoo3yEi"
          width="150"
          height="150"
        ></iframe>
        <p>Hello World!</p>
        <p>This is Devesh.</p>
        <div className="flex">
          <Button text={"Resume"} />
          <Button
            text={"Linkedin"}
            link={"https://www.linkedin.com/in/devxm"}
          />
          <Button text={"Github"} link={"https://www.github.com/deveshXm"} />
        </div>
      </div>
    </div>
  );
}

export default Intro;
