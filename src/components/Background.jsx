import { useEffect, useState } from "react";

const Cell = ({ isHighlighted, onMouseOver }) => {
  const [number, setNumber] = useState(null);
  useEffect(() => {
    if (isHighlighted) {
      setNumber(Math.floor(Math.random() * 2));
    } else {
      setTimeout(() => {
        setNumber(null);
      }, 300);
    }
  }, [isHighlighted]);

  return (
    <div
      className={`w-8 h-8 select-none  text-white justify-center flex items-center ${
        isHighlighted
          ? "bg-[#afec32] transition duration-75"
          : "bg-[#f7f7f7] transition duration-1000"
      }`}
      onMouseOver={onMouseOver}
    >
      {number}
    </div>
  );
};

function Background() {
  const numRows = 60;
  const numCols = 100;
  const [matrix, setMatrix] = useState(() =>
    new Array(numRows).fill(null).map(() => new Array(numCols).fill(false))
  );
  const handleMouseOver = (rowIndex, colIndex) => {
    const newMatrix = matrix.map((row, r) =>
      row.map((cell, c) => {
        const distance = Math.sqrt((r - rowIndex) ** 2 + (c - colIndex) ** 2);
        return distance == 0;
      })
    );
    setMatrix(newMatrix);
  };

  //   useEffect(() => {
  //     setInterval(() => {
  //       const randomRow = Math.floor(Math.random() * 60);
  //       const randomCol = Math.floor(Math.random() * 100);

  //       matrix[randomRow][randomCol] = true;
  //       setMatrix(matrix);
  //       handleMouseOver(randomRow, randomCol);
  //       setTimeout(() => {
  //         matrix[randomRow][randomCol] = false;
  //         setMatrix(matrix);
  //       }, 200);
  //     }, 200);
  //   }, []);
  return (
    <div className="fixed top-0 left-0 h-[100vh]">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              isHighlighted={cell}
              onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Background;
