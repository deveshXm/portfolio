import About from "./About";
import Intro from "./Intro";
import MouseTail from "./components/MouseTail";
import Skills from "./Skills";

import { useRef } from "react";
import Work from "./Work";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import SideBar from "./SideBar";

function App() {
  const scrollToHome = useRef();
  const scrollToSkills = useRef();
  const scrollToAbout = useRef();
  const scrollToWork = useRef();
  const scrollToProjects = useRef();
  const scrollToContact = useRef();

  const handleHome = () => {
    scrollToHome.current?.scrollIntoView({ behavior: "instant" });
  };
  const handleAbout = () => {
    scrollToAbout.current?.scrollIntoView({ behavior: "instant" });
  };
  const handleSkills = () => {
    scrollToSkills.current?.scrollIntoView({ behavior: "instant" });
  };
  const handleWork = () => {
    scrollToWork.current?.scrollIntoView({ behavior: "instant" });
  };
  const handleExperience = () => {
    scrollToProjects.current?.scrollIntoView({ behavior: "instant" });
  };
  const handleContact = () => {
    scrollToContact.current?.scrollIntoView({ behavior: "instant" });
  };
  return (
    <div className="bg-[#f7f7f7] box-border  max-w-[100vw] text-[#111111] p-0 m-0 font-pixel">
      <MouseTail />
      <SideBar
        handleHome={handleHome}
        handleAbout={handleAbout}
        handleSkills={handleSkills}
        handleWork={handleWork}
        handleExperience={handleExperience}
        handleContact={handleContact}
      />
      <Intro scroll={scrollToHome} />
      <About scroll={scrollToAbout} />
      <Skills scroll={scrollToSkills} />
      <Work scroll={scrollToWork} />
      <Projects scroll={scrollToProjects} />
      <Contact scroll={scrollToContact} />
      <Footer />
    </div>
  );
}

export default App;
