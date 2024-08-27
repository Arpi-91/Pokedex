import React, { createRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import {
  filteredPokemonsByType,
  returnAllPokemons,
} from "../../store/features/pokempoSlice";

const FilterByTypes = ({ pokemons, active, setActive }) => {
  const [pokyTypeName, setPokyTypeName] = useState(null);

  const types = useSelector((state) => state.pokemons.pokemonTypes);
  const globalPokemons = useSelector((state) => state.pokemons.globalPokemons);
  const dispatch = useDispatch();
  const allPokemonsRef = useRef(null);

  function handleClick() {
    setActive((state) => ({
      ...state,
      typefilterActiv: !active.typefilterActiv,
      valueFilterchActiv: false,
      perpageActive: false,
    }));
  }

  function clickAllPokemons(ref) {
    dispatch(
      returnAllPokemons({ state: pokemons, globalPokemons: globalPokemons })
    );
    setActive((state) => ({
      ...state,
      typefilterActiv: !active.typefilterActiv,
      valueFilterchActiv: false,
      perpageActive: false,
    }));
    setPokyTypeName(null);
  }

  function filteredPokemons(ref) {
    const pokemonRef = ref.current.textContent;
    setPokyTypeName(pokemonRef);
    console.log(pokemonRef);
    dispatch(
      filteredPokemonsByType({
        state: pokemons,
        type: pokemonRef,
        globalPokemons: globalPokemons,
      })
    );
    setActive(!active.typefilterActiv);
  }

  const TypeItem = (type) => {
    const name = type.data.charAt(0).toUpperCase() + type.data.slice(1);
    const typeRef = useRef(null);
    return (
      <div
        className="filter_types_item"
        onClick={() => filteredPokemons(typeRef)}
      >
        <p ref={typeRef}>{name}</p>
      </div>
    );
  };

  return (
    <div className="filter_type">
      <div className="filter_content">
        <div
          className={
            !active.typefilterActiv
              ? "filter_items"
              : "filter_items filter_items_active"
          }
        >
          <div className="filter_top_side" onClick={handleClick}>
            <p>{!pokyTypeName ? "All Types" : pokyTypeName}</p>
            <FaAngleDown
              className={
                !active.typefilterActiv ? "angle_down" : "angle_down to_up"
              }
            />
          </div>
          <div
            className={
              !active.typefilterActiv
                ? "filter_types"
                : "filter_types filter_types_active"
            }
          >
            <div className="filter_types_flex">
              <div
                className="filter_types_item"
                onClick={() => clickAllPokemons(allPokemonsRef)}
              >
                <p ref={allPokemonsRef}> All Types </p>
              </div>
              {types.map((type) => {
                return <TypeItem data={type.type} key={type.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterByTypes;
