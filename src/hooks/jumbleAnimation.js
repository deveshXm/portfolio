import { useEffect, useMemo } from "react";

function replaceAt(s, i, c) {
  const arr = [...s];
  arr[i] = c;
  return arr.join("");
}

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export async function generateIncrementalRandomString(
  targetWord,
  setTarget,
  duration
) {
  const charset =
    " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890?!";
  let result = "";
  for (let i = 0; i < targetWord.length; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }

  setTarget(result);
  let currentIndex = 0;

  while (result !== targetWord) {
    while (result[currentIndex] !== targetWord[currentIndex]) {
      for (let i = 0; i < charset.length; i++) {
        await timer(duration);
        result = replaceAt(result, currentIndex, charset[i]);
        setTarget(result);
        if (charset[i] === targetWord[currentIndex]) {
          break;
        }
      }
    }
    currentIndex++;
  }
}

const useJumbleAnimation = (ref, target, setTarget, duration = 10) => {
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          generateIncrementalRandomString(target, setTarget, duration);
        }
      }),
    [ref]
  );
  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
};

export default useJumbleAnimation;
