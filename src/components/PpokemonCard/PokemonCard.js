import React from "react";
import { Link } from "react-router-dom";
import "../PpokemonCard/PokemonCard.css";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";

export default function PokemonCard(state) {
  const allPokemons = useSelector((state) => state.pokemons.pokemons);
  const p_state = state.state;
  const name = p_state.name[0].toUpperCase() + p_state.name.slice(1);
  const p_id = p_state.id.toString().padStart(3, "0");
  return (
    <div className="pokemon_card_section">
      <Link
        to={{ pathname: `/pokemon/${state.state.id}/` }}
        state={{ state: state, globalState: allPokemons }}
      >
        {state.status || state.status === "null" ? (
          <Loading />
        ) : (
          <div className="pokemon_kard">
            <div className="_pokemon_avatar">
              <img
                src={p_state.sprites.other.dream_world.front_default}
                alt="avatar"
              />
            </div>
            <div className="pokemon_content">
              <div className="id_number">#{p_id}</div>
              <div className="pokemon_content_name">
                <h3>{name}</h3>
              </div>
              <div className="pokemon_content_types">
                {p_state.types.map((type, id) => {
                  return (
                    <div className={type.type.name} key={"typie_" + id}>
                      <div className="type_name">
                        <p>{type.type.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}
