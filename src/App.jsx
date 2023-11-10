import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentActivePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentActivePlayer = "0";
  }
  return currentActivePlayer;
}

function App() {
  //const [activeplayer, setActivePlayer] = useState("X");
  const [players, setPlayers] = useState({
    X: "Player 1",
    0: "Player 2",
  });

  const [gameTurns, setGameTurns] = useState([]);
  let activeplayer = derivedActivePlayer(gameTurns);

  let gameboard = [...initialGameBoard.map((array) => [...array])];
  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSymbol = gameboard[combination[2].row][combination[2].column];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentActivePlayer) =>
    //   currentActivePlayer === "X" ? "0" : "X",
    // );
    setGameTurns((prevTurns) => {
      let currentActivePlayer = derivedActivePlayer(prevTurns);
      const updateTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentActivePlayer,
        },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialname={players["X"]}
              symbol="X"
              isActive={activeplayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initialname={players["0"]}
              symbol="0"
              isActive={activeplayer === "0"}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRematch} />
          )}
          <GameBoard
            onSelectSquare={handleSelectSquare}
            board={gameboard}
            // activeplayerSymbol={activeplayer}
          />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
