import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynkPokemon } from "../../store/features/pokempoSlice";
import PokemonCard from "../PpokemonCard/PokemonCard";
import Pagination from "../PaginationSection/Pagination";
import PerPageSegment from "../PaginationSection/PerPageSegment";
import SearchByName from "../Filter/SearchByName";
import FilterByTypes from "../Filter/FilterByTypes";
import SortByValue from "../Filter/SortByValue";
import Loading from "../Loading/Loading";

import "./AllPokemons.css";

export default function AllPokemons() {
  const allPokemons = useSelector((state) => state.pokemons.pokemons);
  const loadingStatus = useSelector((state) => state.pokemons.status);
  const loadingPage = useSelector((state) => state.pokemons.pageIsLoading);
  const [active, setActive] = useState({
    typefilterActiv: false,
    valueFilterchActiv: false,
    perpageActive: false,
  });
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(20);
  const lastPage = page * pokemonPerPage;
  const firstPage = lastPage - pokemonPerPage;
  const currentPokemons = allPokemons.slice(firstPage, lastPage);

  const hendleChangePgae = (value) => {
    const totalPages = Math.ceil(allPokemons.length / pokemonPerPage);
    // const totalPokemons = allPokemons.length;
    if (value === "&lsaquo" || value === "... ") {
      if (page === 1 || value === "... ") {
        setPage(1);
      } else {
        setPage(page - 1);
      }
    } else if (value === "&rsaquo" || value === " ...") {
      if (page === totalPages || value === " ...") {
        setPage(totalPages);
      } else {
        setPage(page + 1);
      }
    } else {
      setPage(value);
    }
  };

  useEffect(() => {
    dispatch(asynkPokemon());
  }, []);

  return (
    <div>
      <div className="container">
        <div className="heder_title">
          <div className="pokedex">
            <h1>Pokédex</h1>
          </div>
          <div className="filtered_side">
            <div className="filter_side_items">
              {allPokemons && (
                <SearchByName
                  state={allPokemons}
                  active={active}
                  setActive={setActive}
                />
              )}
              <div className="poky_sort">
                <FilterByTypes
                  state={allPokemons}
                  active={active}
                  setActive={setActive}
                />
                <SortByValue
                  state={allPokemons}
                  active={active}
                  setActive={setActive}
                />
              </div>
            </div>
            <div className="pagination_side">
              <PerPageSegment
                setPokemonPerPage={setPokemonPerPage}
                pokemonPerPage={pokemonPerPage}
                active={active}
                setActive={setActive}
              />
            </div>
          </div>
        </div>
        <div className="container_all_pokemons">
          {loadingPage && <Loading />}
          {allPokemons.length !== 0 ? (
            <ul>
              {currentPokemons &&
                currentPokemons.map((elem) => {
                  return (
                    <li key={elem.id} className="current_pokemon_card">
                      <PokemonCard
                        state={elem}
                        status={loadingStatus}
                        key={elem.id}
                      />
                    </li>
                  );
                })}
            </ul>
          ) : (
            <div className="not_faund">
              <h2 className="not_pokemons">Pokemon Not Found</h2>
            </div>
          )}
        </div>
        {allPokemons.length !== 0 && (
          <Pagination
            allPokemons={allPokemons}
            pokemonPerPage={pokemonPerPage}
            hendleChangePgae={hendleChangePgae}
            setPage={setPage}
            page={page}
            siblings={1}
          />
        )}
      </div>
    </div>
  );
}
