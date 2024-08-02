import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "./Header";
import Footer from "./Footer";
import About from "./About";

gsap.registerPlugin(ScrollTrigger);

function Landing({ aboutRef, contactRef }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { top } = headerRef.current.getBoundingClientRect();
      setOffset(top);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const footer = footerRef.current;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=150%",
          scrub: 2,
          pin: true,
          onLeave: () => setIsAnimationComplete(true),
          onEnterBack: () => setIsAnimationComplete(false),
        },
        onComplete: () => setIsAnimationComplete(true),
        onReverseComplete: () => setIsAnimationComplete(false),
      });

      tl.to(
        header,
        {
          yPercent: -120,
          ease: "power1.inOut",
          duration: 1,
        },
        0
      ).to(
        footer,
        {
          yPercent: 120,
          ease: "power1.inOut",
          duration: 1,
        },
        0
      );
    });

    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (isAnimationComplete) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isAnimationComplete]);

  return (
    <div ref={containerRef} className="h-[100vh] overflow-hidden relative">
      <About landingOffset={offset} aboutRef={aboutRef} contactRef={contactRef} />
      <div ref={headerRef} className="absolute top-0 w-full">
        <Header />
      </div>
      <div ref={footerRef} className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
