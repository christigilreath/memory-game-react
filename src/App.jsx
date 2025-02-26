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
  const [imageUrls, setImageUrls] = useState([]);

  //   const pokemonNames = [
  //     "bulbasaur",
  //     "ivysaur",
  //     "venusaur",
  //     "charmander",
  //     "charmeleon",
  //     "charizard",
  //     "squirtle",
  //     "wartortle",
  //     "blastoise",
  //     "caterpie",
  //     "metapod",
  //     "butterfree",
  //     "weedle",
  //     "kakuna",
  //     "beedrill",
  //     "pidgey",
  //     "rattata",
  //     "fearow",
  //     "pikachu",
  //     "sandshrew",
  //     "clefairy",
  //     "jigglypuff",
  //     "paras",
  //     "meowth",
  //     "psyduck",
  //     "persian",
  //     "mankey",
  //     "ditto",
  //     "poliwag",
  //     "abra",
  //     "kadabra",
  //     "alakazam",
  //     "machop",
  //     "graveler",
  //     "ponyta",
  //     "slowpoke",
  //     "magneton",
  //     "doduo",
  //     "seel",
  //     "grimer",
  //   ];
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
  console.log(pokemons[0]);
  useEffect(() => {
    if (pokemons.length === 0) {
      console.log("no pokemons yet");
      return;
    }
    console.log("image fetch effect");
    let ignore = false;
    const test = pokemons.map(async (pokemon) => {
      //   console.log(pokemon);
      const response = await fetch(pokemon.url);
      const json = await response.json();
      //   console.log(json);
      if (!ignore) {
        setImageUrls((prev) => {
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

  console.log(imageUrls);
  return (
    <>
      <header>
        <ScoreBoard />
      </header>
      <section>
        <GameBoard />
      </section>
    </>
  );
}

export default App;
