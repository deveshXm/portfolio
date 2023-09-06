import About from "./pages/About";
import Intro from "./pages/Intro";
import MouseTail from "./components/MouseTail";
import Skills from "./pages/Skills";

import { useRef, useState } from "react";
import Work from "./pages/Work";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Loading from "./pages/Loading";

function App() {
  const [completed, setCompleted] = useState(false);
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
    <div className="bg-[#f7f7f7] box-border  w-full text-[#111111] p-0 m-0 font-pixel">
      {!completed ? <Loading isCompleted={setCompleted} text={"Loading..."}/> : null}
      {/* <MouseTail />
      <SideBar
        handleHome={handleHome}
        handleAbout={handleAbout}
        handleSkills={handleSkills}
        handleWork={handleWork}
        handleExperience={handleExperience}
        handleContact={handleContact}
      /> */}
      {/* <Intro scroll={scrollToHome} />
      <About scroll={scrollToAbout} />
      <Skills scroll={scrollToSkills} />
      <Work scroll={scrollToWork} />
      <Projects scroll={scrollToProjects} />
      <Contact scroll={scrollToContact} />
      <Footer /> */}
    </div>
  );
}

export default App;
