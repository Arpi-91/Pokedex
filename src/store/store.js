import { configureStore } from "@reduxjs/toolkit";
import { pokemonSlice } from "./features/pokempoSlice";

const store = configureStore({
  reducer: {
    pokemons: pokemonSlice.reducer,
  },
});
export default store;
