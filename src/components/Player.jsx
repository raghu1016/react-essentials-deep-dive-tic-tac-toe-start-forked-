import { useState } from "react";
export default function Player({
  initialname,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialname);

  function handleClick() {
    setIsEditing((editing) => !editing);
    if(isEditing){
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    console.log(event);
    setPlayerName(event.target.value);
  }
  let editedplayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editedplayerName = (
      <input tbype="text" required value={playerName} onChange={handleChange} />
    );
  }
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {editedplayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}> {isEditing ? "Save" : "Edit"} </button>
      </li>
    </>
  );
}
