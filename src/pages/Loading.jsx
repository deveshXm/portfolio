import { useEffect, useState, useRef } from "react";
import useJumbleAnimation from "../hooks/jumbleAnimation.js";

const Cell = ({ isHighlighted }) => {
  return (
    <div
      className={`w-20 h-20 select-none justify-center flex items-center ${
        isHighlighted
          ? "bg-transparent transition duration-200"
          : "bg-[#afec32] border border-black"
      }`}
    ></div>
  );
};

function Loading({ isCompleted, text }) {
  const numRows = 20;
  const numCols = 30;
  const ref = useRef();
  const [opacity, setOpacity] = useState("");
  const [title, setTitle] = useState(text);
  const [matrix, setMatrix] = useState(() =>
    new Array(numRows).fill(null).map(() => new Array(numCols).fill(false))
  );

  const updateCell = () => {
    setTimeout(() => {
      const traverseDiagonal = (slice) => {
        if (slice >= numRows + numCols - 1) {
          return;
        }

        const cellsToUpdate = [];

        for (
          let j = Math.max(0, slice - numRows + 1);
          j <= Math.min(slice, numCols - 1);
          ++j
        ) {
          const rowIndex = slice - j;
          const colIndex = j;
          cellsToUpdate.push([rowIndex, colIndex]);
        }

        const updateNextCell = () => {
          if (cellsToUpdate.length === 0) {
            requestAnimationFrame(() => {
              traverseDiagonal(slice + 1);
              if (slice === numRows + numCols - 2) {
                isCompleted(true);
              }
            });
            return;
          }

          const [rowIndex, colIndex] = cellsToUpdate.shift();

          setMatrix((prevMatrix) => {
            const updatedMatrix = [...prevMatrix];
            updatedMatrix[rowIndex] = [...prevMatrix[rowIndex]];
            updatedMatrix[rowIndex][colIndex] = true;
            return updatedMatrix;
          });

          updateNextCell();
        };

        updateNextCell();
      };

      traverseDiagonal(0);
    }, 2000);
  };

  useEffect(() => {
    updateCell();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(true);
    }, 2000);
  }, [opacity]);
  useJumbleAnimation(ref, title, setTitle, 1);

  return (
    <div className="fixed top-0 left-0 h-[100vh] w-full z-[1000]">
      <div>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <Cell key={colIndex} isHighlighted={cell} />
            ))}
          </div>
        ))}
      </div>
      <div className="top-0 left-0 absolute w-full h-full items-center justify-center flex">
        <p
          ref={ref}
          className={`transition duration-100 ease-in-out ${
            opacity ? " opacity-0" : ""
          } text-5xl text-black lg:text-9xl`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

export default Loading;
