function ScoreBoard({ currentScore, highScore }) {
  return (
    <div>
      <h2>Current Score: {currentScore}</h2>
      <h2>High Score: {highScore}</h2>
    </div>
  );
}

export default ScoreBoard;
