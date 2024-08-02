import { ReactLenis } from "@studio-freight/react-lenis";
import Landing from "./pages/landing";
import Navbar from "./components/Navbar";
import Work from "./pages/Work";
import Contact from "./pages/contact";
import Footer from "./components/Footer";
import { useRef } from "react";

export default function App() {
  const aboutRef = useRef(0);
  const contactRef = useRef(0);
  const workRef = useRef(0);
  const landingRef = useRef(0);
  const lenisOptions = {
    duration: 2.5,
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 0.3,
    smoothTouch: true,
    touchMultiplier: 0.8,
    infinite: false,
    lerp: 0.8,
    wheelMultiplier: 0.3,
    orientation: "vertical",
    smoothWheel: true,
    easing: (t) => t * 0.1, // Linear easing for consistent speed
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Navbar aboutRef={aboutRef} contactRef={contactRef} workRef={workRef} landingRef={landingRef} />
      <div ref={landingRef} />
      <Landing aboutRef={aboutRef} contactRef={contactRef} />
      <div ref={workRef} />
      <Work />
      <div ref={contactRef} />
      <Contact />
      <Footer />
    </ReactLenis>
  );
}
