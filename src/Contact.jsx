import { useState } from "react";
import Button from "./components/Button";
import Heading from "./components/Heading";
import Input from "./components/Input";

function Contact({ scroll }) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userMessage, setUserMessage] = useState("");

  return (
    <div
      ref={scroll}
      className="relative pointer-events-none min-h-[100vh] h-fit  w-full  bg-transparent py-5 px-2 md:p-10 xl:py-20 xl:px-60"
    >
      <Heading text={"Contact"} />
      <div className="w-fit flex justify-center mt-20 flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-10">
        <div className="box p-2 lg:p-10 w-fit text-base sm:text-xl xl:text-4xl flex-1">
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
        <div className="flex-1 flex box p-2 xl:p-10 flex-col items-center justify-center">
          <Input placeholder={"Luke Skywalker"} text={"Name"} rows={1} />
          <Input placeholder={"luke@skywalker.com"} text={"E-mail"} rows={1} />
          <Input
            placeholder={"Force is strong within you!"}
            text={"Message"}
            rows={3}
          />
          <Button text={"\vSubmit\v"} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
