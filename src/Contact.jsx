import Button from "./components/Button";
import Heading from "./components/Heading";

function Contact({ scroll }) {
  return (
    <div
      ref={scroll}
      className="relative pointer-events-none h-[100vh] w-full  bg-transparent py-5 px-2 lg:py-20 lg:px-60"
    >
      <Heading text={"Contact"} />
      <div className="w-fit flex justify-center mt-20 flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
        <div className="box p-2 lg:p-10 w-fit text-xl lg:text-4xl flex-1">
          <p>{"I am open for Fullstack/Backend roles."}</p>
          <br />
          <p>
            {
              "I'm a creative young mind looking for opportunities & I would love to collaborate on any kinds of project."
            }
          </p>
          <br />
          <p>
            {
              "Have an exciting project you need help with? Send me an email or contact me via direct message! "
            }
          </p>
        </div>
        <div className="lg:flex-col flex-1 box p-10 flex items-center justify-center">
          <Button
            text={"Linkedin"}
            link={"https://www.linkedin.com/in/devxm"}
          />
          <Button
            text={"\vGithub\v"}
            link={"https://www.github.com/deveshXm"}
          />
          <Button
            text={"\vGmail\v\v"}
            link={
              "https://mail.google.com/mail?view=cm&tf=0&to=meenadevesh2003@gmail.com"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
