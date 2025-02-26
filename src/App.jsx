import { useState, useEffect, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import ScoreBoard from "./components/ScoreBoard.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
  const URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5";
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    console.log("fetch pokemons");
    let ignore = false;

    async function fetchPokemon() {
      const response = await fetch(URL);

      const json = await response.json();
      if (!ignore) {
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
    if (pokemons.length === 0) {
      console.log("no pokemons yet");
      return;
    }
    console.log("image fetch effect");
    let ignore = false;
    const newArray = pokemons.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const json = await response.json();

      if (!ignore) {
        setImageData((prev) => {
          return [
            ...prev,
            {
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
        <ScoreBoard />
      </header>
      <section>
        <GameBoard imageData={imageData} setImageData={setImageData} />
      </section>
    </>
  );
}

export default App;
