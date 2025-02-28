import { useRef } from "react";
import ImageCard from "./ImageCard.jsx";

function GameBoard({
  imageData,
  setImageData,
  setCurrentScore,
  highScore,
  setHighScore,
}) {
  const clickedSetRef = useRef(new Set());

  function handleCardClick(e) {
    let pokemonTarget;
    e.target === "figure"
      ? (pokemonTarget = e.target.id)
      : (pokemonTarget = e.target.parentElement.id);
    //set scores
    if (clickedSetRef.current.has(pokemonTarget)) {
      alert("Already caught this pokemon! Start game over.");
      setCurrentScore(0);
      clickedSetRef.current = new Set();
    } else {
      clickedSetRef.current.add(pokemonTarget);
      setCurrentScore((prev) => {
        const newScore = prev + 1;
        if (newScore > highScore) {
          setHighScore(newScore);
        }
        return (prev = newScore);
      });
    }
    //shuffle cards
    const newArray = [...imageData];
    function shuffleArray(array) {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    shuffleArray(newArray);
    setImageData(newArray);
  }
  return (
    <div className="gameboard">
      {imageData.map((data) => (
        <ImageCard
          key={data.name}
          id={data.id}
          name={data.name}
          src={data.imgUrl}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default GameBoard;
