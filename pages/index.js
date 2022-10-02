import { useRef } from "react";
import Head from "next/head";
import Intro from "../components/Intro";
import Expertise from "../components/Expertise";
import Work from "../components/Work";
import NavBar from "../components/NavBar";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const scrollToHome = useRef();
  const scrollToExpertise = useRef();
  const scrollToWork = useRef();
  const scrollToExperience = useRef();
  const scrollToContact = useRef();

  const handleHome = () => {
    scrollToHome.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleExpertise = () => {
    scrollToExpertise.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleWork = () => {
    scrollToWork.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleExperience = () => {
    scrollToExperience.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleContact = () => {
    scrollToContact.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="body bg-grey">
      <Head>
        <title>Portfolio</title>
        <meta name="deScription" content="Devesh Meena Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar
        handleHome={handleHome}
        handleExpertise={handleExpertise}
        handleWork={handleWork}
        handleExperience={handleExperience}
        handleContact={handleContact}
      />
      <Intro scroll={scrollToHome} />
      <Expertise scroll={scrollToExpertise} />
      <Work scroll={scrollToWork} />
      <Experience scroll={scrollToExperience} />
      <Contact scroll={scrollToContact} />
      <Footer />
    </div>
  );
}
