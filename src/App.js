// import logo from './logo.svg';
import { useCallback, useState } from 'react';
import './App.scss';

function App() {
  const [gameState, setGameState] = useState({
    redCups: [2,2,2],
    blueCups: [2,2,2],
    turn: "red",
    grid: [
      {
        color: null,
        level: null, //0 = empty, 1=sm, 2=md, 3=lg
      },
      {
        color: null,
        level: null, //0 = empty, 1=sm, 2=md, 3=lg
      },
      {
        color: null,
        level: null, //0 = empty, 1=sm, 2=md, 3=lg
      },
      {
        color: null,
        level: null, //0 = empty, 1=sm, 2=md, 3=lg
      },
      {
        color: null,
        level: null, //0 = empty, 1=sm, 2=md, 3=lg
      },
      {
        color: null,
        level: null, //0 = empty, 1=sm, 2=md, 3=lg
      },
      {
        color: null,
        level: null, //0 = empty, 1=sm, 2=md, 3=lg
      },
      {
        color: null,
        level: null, //0 = empty, 1=sm, 2=md, 3=lg
      },
      {
        color: null,
        level: null, //0 = empty, 1=sm, 2=md, 3=lg
      },
    ]
  });

  const [selectedCupSize, setSelectedCupSize] = useState(0); // 0 ==small, 1 === med, 2 === large

  const cupNames = ["small", "medium", "large"];

  // const autoSetSelectedCup = useCallback((player) => {
  //   if (player === "red") {
  //     if (gameState.redCups[0] > 0) {
  //       setSelectedCupSize(0)
  //       return null
  //     }
  //     if (gameState.redCups[1] > 0) {
  //       setSelectedCupSize(1)
  //       return null

  //     }
  //     if (gameState.redCups[2] > 0) {
  //       setSelectedCupSize(2)
  //       return null
  //     }
  //   }
  //   if (player === "blue") {
  //     if (gameState.blueCups[0] > 0) {
  //       setSelectedCupSize(0)
  //       return null
  //     }
  //     if (gameState.blueCups[1] > 0) {
  //       setSelectedCupSize(1)
  //       return null

  //     }
  //     if (gameState.blueCups[2] > 0) {
  //       setSelectedCupSize(2)
  //       return null
  //     }
  //   }
  // }, [gameState.redCups, gameState.blueCups])

  const handleGridClick = useCallback((idx) => {
    // console.log(gameState.grid[idx]);
    const currentFieldState = gameState.grid[idx];
    const newRedCups = gameState.redCups;
    const newBlueCups = gameState.blueCups;

    // if (currentFieldState.color === gameState.turn) return
    if (currentFieldState.level >= selectedCupSize && currentFieldState.level !== null) return

    if (gameState.turn === "red") {
      if (newRedCups[selectedCupSize] <= 0) return
      newRedCups[selectedCupSize] = Number(newRedCups[selectedCupSize]) - 1;
    }

    if (gameState.turn === "blue") {
      if (newBlueCups[selectedCupSize] <= 0) return
      newBlueCups[selectedCupSize] = Number(newBlueCups[selectedCupSize]) - 1;
    }


    let newGrid = gameState.grid;

    newGrid[idx] = {
      color: gameState.turn,
      level: selectedCupSize
    }

    setGameState({
      ...gameState,
      redCups: newRedCups,
      blueCups: newBlueCups,
      turn: gameState.turn === "red" ? "blue" : "red",
      grid: newGrid
    })
    // autoSetSelectedCup(gameState.turn === "red" ? "blue" : "red")

  }, [gameState, selectedCupSize])

  const handleSelectCup = useCallback((idx, player) => {
    if (player !== gameState.turn) return
    if (player === "red") {
      if (gameState.redCups[idx] <= 0) return
    }
    if (player === "blue") {
      if (gameState.blueCups[idx] <= 0) return
    }
    setSelectedCupSize(idx)
  }, [gameState.turn, gameState.blueCups, gameState.redCups])


  console.log(gameState);
  console.log(selectedCupSize);

  return (
    <div className="app">
      {/* <h2>xxo</h2> */}
      <div className="grid-container">
        <div className="game-grid">
          {gameState.grid.map((el, idx) => {
            return <div key={`field_${idx}`} className="game-grid__field" onClick={() => handleGridClick(idx)}>
              <div className={`field-cup field-cup--${el.color} field-cup--${el.level}`}></div>
            </div>
          })}
        </div>
      </div>
      <div className="players-container">
        <div className={`player ${gameState.turn === "red" ? "player--active" : ""} `}>
          <h4 style={{ color: "red" }}>Red</h4>
          {Object.values(gameState.redCups).map((el, idx) => {
            let isSelected = false;
            if (gameState.turn === "red" && selectedCupSize === idx) {
              isSelected = true;
            }
            return <div key={`cup-red-${idx}`} className={`playercup ${el === 0 ? "playercup--empty" : ""} ${isSelected ? "playercup--selected" : ""}`} onClick={() => { handleSelectCup(idx, "red") }}>{el} {cupNames[idx]}</div>
          })}
        </div>
        <div className={`player ${gameState.turn === "blue" ? "player--active" : ""} `}>
          <h4 style={{ color: "blue" }}>Blue</h4>
          {Object.values(gameState.blueCups).map((el, idx) => {
            let isSelected = false;
            if (gameState.turn === "blue" && selectedCupSize === idx) {
              isSelected = true;
            }
            return <div key={`cup-blue-${idx}`} className={`playercup ${el === 0 ? "playercup--empty" : ""} ${isSelected ? "playercup--selected" : ""}`} onClick={() => { handleSelectCup(idx, "blue") }}>{el} {cupNames[idx]}</div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
