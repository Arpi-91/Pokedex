import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortAtoZ,
  sortZtoA,
  sortHighestToLowest,
  sortLowestToHighest,
} from "../../store/features/pokempoSlice";
import { FaAngleDown } from "react-icons/fa";

const SortByValue = (data) => {
  const [pokySortValue, setPokySortValue] = useState(null);
  const dispatch = useDispatch();
  const globalPokemons = useSelector((state) => state.pokemons.globalPokemons);

  const lowestToHighest = useRef(null);
  const highestToLowest = useRef(null);
  const aToz = useRef(null);
  const zToa = useRef(null);
  function handleClick() {
    data.setActive((state) => ({
      ...state,
      typefilterActiv: false,
      valueFilterchActiv: !data.active.valueFilterchActiv,
      perpageActive: false,
    }));
  }

  function handleSort(ref) {
    data.setActive((state) => ({
      ...state,
      typefilterActiv: false,
      valueFilterchActiv: !data.active.valueFilterchActiv,
      perpageActive: false,
    }));
    const sortRef = ref.current.textContent.slice(0, 3);
    const pokemonRef = ref.current.textContent;
    setPokySortValue(pokemonRef);
    switch (sortRef) {
      case "Low":
        return dispatch(
          sortLowestToHighest({
            state: data.state,
            globalPokemons: globalPokemons,
          })
        );
        break;
      case "Hig":
        return dispatch(
          sortHighestToLowest({
            state: data.state,
            globalPokemons: globalPokemons,
          })
        );
        break;
      case "A-Z":
        return dispatch(
          sortAtoZ({ state: data.state, globalPokemons: globalPokemons })
        );
        break;
      default:
        return dispatch(
          sortZtoA({ state: data.state, globalPokemons: globalPokemons })
        );
        break;
    }
  }

  return (
    <div className="sort_container">
      <div className="sort_content">
        <div
          className={
            !data.active.valueFilterchActiv
              ? "sort_items"
              : "sort_items sort_items_active"
          }
        >
          <div className="sort_top_side" onClick={handleClick}>
            <p>{!pokySortValue ? "Lowest To Highest Number" : pokySortValue}</p>
            <FaAngleDown
              className={
                !data.active.valueFilterchActiv
                  ? "angle_down"
                  : "angle_down to_up"
              }
            />
          </div>
          <div
            className={
              !data.active.valueFilterchActiv ? "sort_list" : "sort_list_active"
            }
          >
            <div
              className="sort_list_item"
              onClick={() => handleSort(lowestToHighest)}
            >
              <p ref={lowestToHighest}>Lowest To Highest Number</p>
            </div>
            <div
              className="sort_list_item"
              onClick={() => handleSort(highestToLowest)}
            >
              <p ref={highestToLowest}>Highest To Lowest Number</p>
            </div>
            <div className="sort_list_item" onClick={() => handleSort(aToz)}>
              <p ref={aToz}>A-Z</p>
            </div>
            <div className="sort_list_item" onClick={() => handleSort(zToa)}>
              <p ref={zToa}>Z-A</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SortByValue;
