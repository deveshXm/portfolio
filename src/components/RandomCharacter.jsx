import { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";

function RandomCharacter({ defaultValue, landingOffset, biasness, height }) {
  const [value, setValue] = useState(defaultValue);
  const [isGenerating, setIsGenerating] = useState(false);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const lastScrollY = useRef(window.scrollY);
  const animationFrameId = useRef(null);
  const charRef = useRef(null);

  const easeOutQuad = (t) => t * (2 - t);

  const handleRandomChar = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollSpeed = Math.abs(currentScrollY - lastScrollY.current);
    lastScrollY.current = currentScrollY;

    const probability = Math.abs(landingOffset / height);
    const showDefault = probability > biasness;

    if (showDefault) {
      if (value !== defaultValue) {
        animateCharChange(defaultValue);
        setIsGenerating(false);
      }
    } else {
      const changeSpeed = easeOutQuad(Math.min(scrollSpeed / 50, 1)); // Adjust 50 to change sensitivity

      if (Math.random() < changeSpeed) {
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
        if (randomCharacter !== value) {
          animateCharChange(randomCharacter);
          setIsGenerating(true);
        }
      }
    }

    animationFrameId.current = requestAnimationFrame(handleRandomChar);
  }, [landingOffset, defaultValue, characters, value, biasness]);

  const animateCharChange = (newChar) => {
    gsap.to(charRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.1,
      onComplete: () => {
        setValue(newChar);
        gsap.to(charRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.1,
        });
      },
    });
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(handleRandomChar);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleRandomChar]);

  return (
    <span ref={charRef} style={{ color: isGenerating ? "#d49783" : "inherit" }}>
      {value}
    </span>
  );
}

export default RandomCharacter;
