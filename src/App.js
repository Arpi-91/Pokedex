import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import AllPokemons from "./components/AllPokemons/AllPokemons";
import Pokemon from "./components/PokemonPage/Pokemon";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AllPokemons />} />
      <Route path="/pokemon/:id/" element={<Pokemon />} />
    </Routes>
  );
}
