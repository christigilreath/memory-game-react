import ImageCard from "./ImageCard.jsx";
function GameBoard({ imageData, setImageData }) {
  function cardClick() {
    //check if card was clicked already and if it was check high score update scores (either to 0 or highscore)
    //if score reset to zero clear cache of clicked cards
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
    <div>
      {imageData.map((data) => (
        <ImageCard
          key={data.name}
          name={data.name}
          src={data.imgUrl}
          onClick={cardClick}
        />
      ))}
    </div>
  );
}

export default GameBoard;
