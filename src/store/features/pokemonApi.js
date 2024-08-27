import axios from "axios";

export default async function getAllPokemons() {
  const pokemonsData = {
    pokemons: [],
    types: [],
  };
  try {
    const response = await axios(
      "https://pokeapi.co/api/v2/pokemon?limit=250&offset=0"
    );
    const responsTypes = await axios("https://pokeapi.co/api/v2/type/");
    const pokemonList = response.data.results;
    const pokemonTypes = responsTypes.data.results;

    pokemonsData.pokemons = await fetchPokemons(pokemonList);
    pokemonsData.types = await fetchPokemonTypes(pokemonTypes);
    return pokemonsData;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
}
async function fetchPokemonTypes(data) {
  const types = [];
  for (let i = 0; i < data.length; i++) {
    const item = { id: i, type: data[i].name };
    types.push(item);
  }
  return types;
}

async function fetchPokemons(data) {
  try {
    const pokemonPromises = data.map((pokemon) =>
      axios(pokemon.url).then((response) => response.data)
    );

    const pokemonDetails = await Promise.all(pokemonPromises);
    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    return [];
  }
}
