import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getAllPokemons from "./pokemonApi";

const initialPokemonSlice = {
  status: 'loading',
  pokemons: [],
  globalPokemons: [],
  pokemonTypes: [],
  pageIsLoading: true,
};

export const asynkPokemon = createAsyncThunk("asyncPokemons", async () => {
  const res = await getAllPokemons();
  return res;
});

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState: initialPokemonSlice,
  reducers: {
    returnAllPokemons: (state, action) => {
      state.pokemons = state.globalPokemons;
    },


    serachPokemonsByName: (state, action) => {
      if (!action.payload.value.trim()) {
        state.pokemons = state.globalPokemons;
      } else {
        const newPkemonsList = action.payload.state.filter((pokemon) =>
          pokemon.name.includes(action.payload.value.toLowerCase())
        );

        if (newPkemonsList.length > 0) {
          state.pokemons = newPkemonsList;
        } else {
          state.pokemons = action.payload.globalPokemons;
        }
      }
    },
    filteredPokemonsByType: (state, action) => {
      const data = action.payload;
      const filtredList = data.globalPokemons.filter((pokemon) => {
        return pokemon.types
          .map((type) => type.type.name)
          .includes(action.payload.type.toLowerCase());
      });
      state.pokemons = filtredList;
    },
    sortLowestToHighest: (state, action) => {
      state.pokemons = [...action.payload.state].sort((a, b) => {
        return a.id - b.id;
      });
    },

    sortHighestToLowest: (state, action) => {
      state.pokemons = [...action.payload.state].sort((a, b) => {
        return b.id - a.id;
      });
    },
    sortAtoZ: (state, action) => {

      state.pokemons = [...action.payload.state].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    },
    sortZtoA: (state, action) => {
      state.pokemons = [...action.payload.state].sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(asynkPokemon.pending, (state, action) => {
        state.status = true;
      })
      .addCase(asynkPokemon.fulfilled, (state, action) => {
        state.pokemons = action.payload.pokemons;
        state.globalPokemons = action.payload.pokemons;
        state.pokemonTypes = action.payload.types;
        state.status = false;
        state.pageIsLoading = false
      })
      .addCase(asynkPokemon.rejected, (state, action) => {
        // console.log("loaadingggg");
      });
  },
});
export default pokemonSlice.reducer;
export const {
  returnAllPokemons,
  filteredPokemonsByType,
  serachPokemonsByName,
  sortLowestToHighest,
  sortHighestToLowest,
  sortAtoZ,
  sortZtoA,
} = pokemonSlice.actions;
