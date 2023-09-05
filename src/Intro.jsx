import Typewriter from "typewriter-effect";
import Button from "./components/Button";

function Intro() {
  return (
    <div className="relative h-[100vh] w-full max-w-[100vw] bg-transparent pointer-events-none flex flex-col">
      <div className="h-full w-full text-9xl font-medium flex flex-col justify-center items-center">
        <iframe
          src="https://giphy.com/embed/Zb5oyPaa1x4Zoo3yEi"
          width="150"
          height="150"
        ></iframe>
        <p>Hello World!</p>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("I am a ")
              .pauseFor(300)
              .typeString("Programmer.")
              .deleteChars(13)
              .pauseFor(500)
              .typeString("Devesh.")
              .pauseFor(1000)
              .start();
          }}
        />
        <div className="flex">
          <Button
            text={"Resume"}
            link={
              "https://drive.google.com/file/d/1DRPTlA2wBm9rO7lus0LpkC3d8C8EpiUl/view?usp=sharing"
            }
          />
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
