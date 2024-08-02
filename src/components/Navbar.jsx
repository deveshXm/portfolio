import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Heading2 from "./Heading2";

function Navbar({ aboutRef, workRef, contactRef, landingRef }) {
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const menuRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    if (!isExpanded) {
      setIsHover(true);
      gsap.to(circleRef.current, {
        width: 100,
        height: 100,
        duration: 0.5,
        ease: "elastic.out(1,1)",
      });
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(circleRef.current, {
      width: 32,
      height: 32,
      duration: 0.5,
      ease: "elastic.out(1,1)",
    });
    gsap.to(textRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
    });
    setIsExpanded(false);
    setIsHover(false);
    gsap.to(menuRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(circleRef.current, {
          width: 32,
          height: 32,
          duration: 0.5,
          ease: "elastic.out(1,1)",
        });
      },
    });
  };

  const handleClick = () => {
    setIsExpanded(true);
    setIsHover(false);
    gsap.to(circleRef.current, {
      width: 300,
      height: 300,
      duration: 0.5,
      ease: "elastic.out(1,1)",
      onComplete: () => {
        gsap.to(menuRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });
  };

  useEffect(() => {
    console.log(isExpanded);
  }, [isExpanded]);

  const handleAboutScroll = () => aboutRef.current.scrollIntoView({ behavior: "smooth" });
  const handleWorkScroll = () => workRef.current.scrollIntoView({ behavior: "smooth" });
  const handleContactScroll = () => contactRef.current.scrollIntoView({ behavior: "smooth" });
  const handleLandingScroll = () => landingRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="z-[1000] isolate h-[80px] px-5 py-6 fixed bg-transparent w-full flex justify-between items-center mix-blend-hard-light">
      <button onClick={handleLandingScroll}>
        <Heading2 className="text-[#e8c6b4] ">{"D — M"}</Heading2>
      </button>
      <div className="relative">
        <div
          ref={circleRef}
          className="circle bg-[#e8c6b4] h-8 w-8 rounded-full mr-5 overflow-hidden absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <div ref={textRef} className="text-black text-left flex flex-col items-start opacity-0 absolute bottom-8 left-2" style={{ transform: "translateY(20px)" }}>
            {isHover && !isExpanded && <Heading2 className="text-black">MENU</Heading2>}
          </div>
          <div ref={menuRef} className="text-black text-left flex flex-col items-start opacity-0 absolute bottom-14 left-14" style={{ transform: "translateY(20px)" }}>
            {isExpanded && (
              <>
                <button onClick={handleAboutScroll}>
                  <Heading2 className="text-black hover:pl-2 transition-all duration-300">ABOUT</Heading2>
                </button>
                <button onClick={handleWorkScroll}>
                  <Heading2 className="text-black hover:pl-2 transition-all duration-300">WORK</Heading2>
                </button>
                <button onClick={handleContactScroll}>
                  <Heading2 className="text-black hover:pl-2 transition-all duration-300">CONTACT</Heading2>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
