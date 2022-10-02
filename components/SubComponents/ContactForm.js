import React from "react";
import Image from "next/image";
import Button from "./Button";

const ContactForm = () => {
  return (
    <div className=" font-poppins font-semibold flex space-x-3">
        <Button title={"E-mail"} link={"mailto:nothefakedevesh@gmail.com"} image={"/mail.svg"}/>
        <Button title={"Linkedin"} link={"https://www.linkedin.com/in/devxm"} image={"/linkedin.svg"}/>
        <Button title={"github"} link={"https://github.com/deveshXm"} image={"/github.svg"}/>
    </div>
  );
};

export default ContactForm;
