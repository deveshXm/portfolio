import { ReactLenis } from "@studio-freight/react-lenis";
import Landing from "./pages/landing";
import Navbar from "./components/Navbar";
import Work from "./pages/Work";
import Contact from "./pages/contact";
import Footer from "./components/Footer";
import { useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import bg from "./assets/bg.jpg";

export default function App() {
  const aboutRef = useRef(0);
  const contactRef = useRef(0);
  const workRef = useRef(0);
  const landingRef = useRef(0);
  const lenisOptions = {
    // duration: 2.5,

    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 0.3,
    smoothTouch: true,
    touchMultiplier: 0.8,
    infinite: false,
    // lerp: 0.8,
    wheelMultiplier: 0.3,
    orientation: "vertical",
    smoothWheel: true,
    easing: (t) => t * 0.1, // Linear easing for consistent speed
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Analytics />
      <SpeedInsights />
      <Navbar aboutRef={aboutRef} contactRef={contactRef} workRef={workRef} landingRef={landingRef} />
      <div ref={landingRef} />
      <Landing aboutRef={aboutRef} contactRef={contactRef} />
      <div ref={workRef} />
      <Work />
      <div ref={contactRef} />
      <Contact />
      <Footer />
      <div className={`fixed h-screen w-full overflow-x-hidden z-[-100] top-0 left-0`}>
        <img src={bg} alt="bg" className="w-full h-full object-cover" />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "linear-gradient(to bottom, rgba(19,19,19,0.38) 0%, rgba(19,19,19,0.89) 54%, rgba(19,19,19,1) 100%)",
          }}
        />
      </div>
    </ReactLenis>
  );
}
