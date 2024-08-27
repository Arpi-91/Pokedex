import React, { useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { serachPokemonsByName } from "../../store/features/pokempoSlice";
import AllFilters from "./AllFilters.css";


const SearchByName = (data) => {
  const globalPokemons = useSelector((state) => state.pokemons.globalPokemons);
  const dispatch = useDispatch();
  const inputValue = useRef();

  function handleFocuse() {
    data.setActive((state) => ({
      ...state,
      typefilterActiv: false,
      valueFilterchActiv: false,
      perpageActive: false,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      serachPokemonsByName({
        state: data.state,
        value: inputValue.current.value,
        globalPokemons: globalPokemons,
      })
    );
    e.target.reset();
  }

  return (
    <div className="filre_by_name_container">
      <form onSubmit={handleSubmit} onFocus={handleFocuse}>
        <input type="text" placeholder="Search by name" ref={inputValue} />
        <button className="filret_by_name_button">
          <BiSearchAlt color="white" />
        </button>
      </form>
    </div>
  );
};
export default SearchByName;