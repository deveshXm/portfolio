import React from "react";
import Image from "next/image";
import map from "../public/map.png";
import ContactForm from "./SubComponents/ContactForm";

const subhead =
  "<p>I'm a creative young mind looking for opportunities & I would love to collaborate on any kinds of project.<br/><br/>Have an exciting project you need help with?<br/> Send me an email or contact me via direct message!</p>";

const Contact = ({ scroll }) => {
  return (
    <div ref={scroll} className="bg-black h-fit p-12 text-white space-y-10">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold md:text-8xl">Contact Me</h1>
      </div>
      <div className="lg:flex ">
        <div className="space-y-2 bg-[#27282c] flex items-center justify-center px-10 py-5">
          <div>
            <div
              className="font-roboto text-sm font-normal"
              dangerouslySetInnerHTML={{ __html: subhead }}
            />
            <ContactForm />
          </div>
        </div>
        <div className="inline-block overflow-hidden">
          <a href="https://www.google.com/maps/place/Jaipur,+Rajasthan/@26.6299788,73.51859,8.07z/data=!4m5!3m4!1s0x396c4adf4c57e281:0xce1c63a0cf22e09!8m2!3d26.91258!4d75.7871246">
            <Image src={map} alt="map" className=" scale-[2.0] md:scale-100 " />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
