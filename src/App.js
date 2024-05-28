import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const Pokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10"
      );
      const data = await response.json();
      const pokemonDataPromises = data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      });
      const pokemonData = await Promise.all(pokemonDataPromises);
      setPokemons(pokemonData);
    };
    Pokemons();
  }, []);

  return (
    <div className="App">
      <div className="container flex flex-wrap justify-between ">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="card flex justify-between items-center    w-[550px] h-[200px] border-none p-5 mt-5 mb-5 bg-[#75c5f0] rounded-[10px] hover:scale-[1.1] cursor-pointer "
          > 
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-[150px]"
            />
            <h3 className=" font-bold text-[30px]">{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
