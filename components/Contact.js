import React from "react";
import ContactForm from "./SubComponents/ContactForm";

const subhead =
  "<p>I'm a creative young mind looking for opportunities & I would love to collaborate on any kinds of project.<br/><br/>Have an exciting project you need help with?<br/> Send me an email or contact me via direct message!</p>";

const Contact = () => {
  return (
    <div className="bg-black h-fit p-12 text-white space-y-10">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold md:text-8xl">Contact Me</h1>
      </div>
      <div className="lg:flex ">
        <div className="space-y-10 bg-[#27282c] p-10">
          <div
            className="font-roboto text-sm xl:text-lg font-normal"
            dangerouslySetInnerHTML={{ __html: subhead }}
          />
          <ContactForm />
        </div>
        <div className="inline-block overflow-hidden">
          <img src="/map.png" className=" scale-[2.0] md:scale-100 " />
        </div>
      </div>
    </div>
  );
};

export default Contact;
