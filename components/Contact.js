import React, { useEffect } from "react";
import ContactForm from "./SubComponents/ContactForm";
import AOS from "aos";
import "aos/dist/aos";
import Heading from "./SubComponents/Heading";

const subhead =
  "<p>I'm a creative young mind looking for opportunities & I would love to collaborate on any kinds of project.<br/><br/>Have an exciting project you need help with?<br/> Send me an email or contact me via direct message!</p><br/>";

const Contact = ({ scroll }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      ref={scroll}
      className="bg-[url('../public/images/contact-bg.jpg')]  bg-cover bg-no-repeat h-fit md:h-screen flex items-center p-4 md:p-12 text-white space-y-10"
    >
      <div className="space-y-16">
        <div
          className="text-5xl mx-auto w-fit sm:mx-0 font-semibold md:text-8xl"
          data-aos="fade-right"
        >
          <Heading title={"Contact Me"} />
        </div>
        <div
          className="lg:flex w-fit lg:w-[60vw] xl:w-[43vw] "
          data-aos="fade-up"
        >
          <div className="space-y-2 border-2 border-white hover:border-pink transition duration-300 rounded-md flex items-center justify-center p-4 md:p-10">
            <div>
              <div
                className="font-poppins font-normal text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: subhead }}
              />
              <div className="">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
