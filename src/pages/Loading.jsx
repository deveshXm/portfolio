import { useEffect, useState, useRef } from "react";
import useJumbleAnimation from "../hooks/jumbleAnimation.js";

const Cell = ({ isHighlighted }) => {
  return (
    <div
      className={`w-8 h-8 select-none justify-center flex items-center ${
        isHighlighted
          ? "bg-transparent transition duration-200"
          : "bg-[#afec32]"
      }`}
    ></div>
  );
};

function Loading({ isCompleted, text }) {
  const numRows = 60;
  const numCols = 90;
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
    }, 3000);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpacity(true);
    }, 5000);
    updateCell();
  }, []);
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
      <div>
        <p
          ref={ref}
          className={`absolute top-[40%] left-[40%] transition duration-300 ease-in-out ${
            opacity ? " opacity-0" : ""
          } text-7xl text-black lg:text-9xl`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

export default Loading;
