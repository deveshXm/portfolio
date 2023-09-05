import { useState } from "react";
import Button from "./Button";

function Caraousel({ items, Card }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };
  return (
    <>
      <Button onClick={prevItem}>&lt;</Button>
      {items.map((item, index) =>
        index == currentIndex ? <Card item={item} key={index} /> : null
      )}
      <Button onClick={nextItem}>&gt;</Button>
    </>
  );
}

export default Caraousel;
