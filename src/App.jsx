import { useState, useEffect } from "react";
import ScoreBoard from "./components/ScoreBoard.jsx";
import GameBoard from "./components/GameBoard.jsx";
import "./App.css";

function App() {
  const URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50";
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function fetchPokemon() {
      let json;
      try {
        const response = await fetch(URL);
        json = await response.json();
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Try refreshing the page.");
      }
      if (!ignore && json) {
        setPokemons((prev) => {
          return [...prev, ...json.results];
        });
      }
    }
    fetchPokemon();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    if (pokemons.length === 0) {
      return () => {
        ignore = false;
      };
    }

    const newArray = pokemons.map(async (pokemon) => {
      let json;
      try {
        const response = await fetch(pokemon.url);
        json = await response.json();
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Try refreshing the page.");
      }

      if (!ignore && json) {
        setImageData((prev) => {
          return [
            ...prev,
            {
              id: pokemon.name,
              name: pokemon.name,
              imgUrl: json.sprites.other["official-artwork"].front_default,
            },
          ];
        });
      }
    });

    return () => {
      ignore = true;
    };
  }, [pokemons]);

  return (
    <>
      <header>
        <h1>Catch All The Pokemon Memory Game</h1>
        <div>
          <p>See how many pokemon you can catch without repeating.</p>
          <ScoreBoard currentScore={currentScore} highScore={highScore} />
        </div>
      </header>
      <section>
        <GameBoard
          imageData={imageData}
          setImageData={setImageData}
          setCurrentScore={setCurrentScore}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      </section>
    </>
  );
}

export default App;
