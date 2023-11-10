import { useState } from "react";


export default function GameBoard({onSelectSquare,board}) {


//   function handleSelectSquare(rowIndex, playerInd) {
//     setGameBoard((prevGameBoard) => {
//       const updatedGameBoard = [
//         ...prevGameBoard.map((insideSymbol) => [...insideSymbol]),
//       ];
//       updatedGameBoard[rowIndex][playerInd] = activeplayerSymbol;
//       return updatedGameBoard;
//     });
//     onSelectSquare();
//   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, playerInd) => (
              <li key={playerInd}>
                <button onClick={() => onSelectSquare(rowIndex, playerInd)} disabled={playerSymbol!==null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
