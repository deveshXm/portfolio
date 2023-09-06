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
    <div className="flex items-center w-full">
      <Button onClick={prevItem}>&lt;</Button>
      <div className="flex-1 flex items-center justify-center">
        {items.map((item, index) =>
          index == currentIndex ? <Card item={item} key={index} /> : null
        )}
      </div>
      <Button onClick={nextItem}>&gt;</Button>
    </div>
  );
}

export default Caraousel;
