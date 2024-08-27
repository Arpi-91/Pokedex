import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Pokemon.css";
import Loading from "../Loading/Loading";

export default function Pokemon() {
  const navigate = useNavigate();
  const location = useLocation();
  const pokemon = location.state.state.state;
  const ppp = location.state.state;
  console.log(ppp);
  const p_id = pokemon.id.toString().padStart(3, "0");
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const baseUrlSpecies = "https://pokeapi.co/api/v2/pokemon-species/";

  const [isLoding, setIsLoding] = useState(true);

  console.log(pokemon);
  const pokyStates = {
    hd: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    special_attack: pokemon.stats[3].base_stat,
    special_defense: pokemon.stats[4].base_stat,
    speed: pokemon.stats[5].base_stat,
  };

  const [poky, setPoky] = useState({
    description: "",
    category: "",
    gender: [{ male: null }, { female: null }],
  });
  const stateCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    setIsLoding(true);
    axios(`${baseUrlSpecies}${pokemon.name}/`).then((data) => {
      const genusEntry = data.data.genera.find(
        (genus) => genus.language.name === "en"
      );
      const category = genusEntry
        ? genusEntry.genus.slice(0, -8)
        : "Category not found";
      const description = data.data.flavor_text_entries[10].flavor_text;
      setPoky((data) => ({
        ...data,
        description: description,
        category: category,
      }));
      const genderValue = data.data.gender_rate;
      if (genderValue !== -1) {
        if (genderValue === 0) {
          setPoky((data) => ({
            ...data,
            gender: [{ male: "male" }, { female: false }],
          }));
        } else if (genderValue === 8) {
          setPoky((data) => ({
            ...data,
            gender: [{ male: false }, { female: "female" }],
          }));
        } else {
          setPoky((data) => ({
            ...data,
            gender: [{ male: "male" }, { female: "female" }],
          }));
        }
      }
      console.log(poky);
      setIsLoding(false);
    });
  }, []);

  return (
    <>
      {isLoding ? (
        <Loading />
      ) : (
        <div className="pokemon_info_page">
          <div className="pokemon_info_top_section">
            <p>
              <button className="to_back" onClick={() => navigate(-1)}>
                <FaArrowLeft color="rgb(57, 127, 132)" />
                <span>Explore more Pokémon</span>
              </button>
            </p>
          </div>
          <div className="pokemon_info_box">
            <div className="poke_title">
              <h1>{name} </h1> <h1>#{p_id}</h1>
            </div>
            <div className="pokemon_glogal_info">
              <div className="pokemon_global_info_avatar">
                <div className="pokemon_avatar_photo">
                  <img
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt="pokemon_avatar"
                    className="pokemon_avatar"
                  />
                </div>
              </div>
              <div className="description_and_oder_data">
                <div className="pokemon_description">
                  {poky && <p>{poky.description}</p>}
                </div>
                <div className="pokemon_datas">
                  <div className="pokemon_datas_item">
                    <h4>Height</h4>
                    <p className="poky_data">{pokemon.height / 10}m</p>
                  </div>
                  <div className="pokemon_datas_item">
                    <h4>Weight</h4>
                    <p className="poky_data">{pokemon.weight}kg</p>
                  </div>
                  <div className="pokemon_datas_item">
                    <h4>Category</h4>
                    <p className="poky_data">{poky.category}</p>
                  </div>
                  <div className="pokemon_datas_item poky_types_data">
                    <h4>Types</h4>
                    {pokemon.types.map((elem) => {
                      return <p className="poky_data">{elem.type.name}</p>;
                    })}
                  </div>
                  <div className="pokemon_datas_item">
                    <h4>Abilities</h4>
                    {pokemon.abilities.map((elem) => {
                      return <p className={"poky_data"}>{elem.ability.name}</p>;
                    })}
                  </div>
                  <div className="pokemon_datas_item">
                    <h4>Genders</h4>
                    {!poky.gender[0].male && !poky.gender[1].female ? (
                      <p className="poky_data">Genderless</p>
                    ) : (
                      poky.gender.map((elem) => {
                        return (
                          <>
                            {elem.female && (
                              <p className="poky_data">{elem.female}</p>
                            )}
                            {elem.male && (
                              <p className="poky_data">{elem.male}</p>
                            )}
                          </>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="pokemon_states">
                  <h3>Stats</h3>
                  <div className="pokemon_states_items">
                    <div className="statem_item">
                      {stateCount.map((elem) => {
                        const count = 15 - Math.ceil(pokyStates.hd / 28);
                        return (
                          <div
                            className={
                              count <= elem
                                ? "fill stats_segment"
                                : "empty stats_segment"
                            }
                          ></div>
                        );
                      })}
                      <p>HP</p>
                    </div>

                    <div className="statem_item">
                      {stateCount.map((elem) => {
                        const count = 15 - Math.ceil(pokyStates.attack / 18);
                        return (
                          <div
                            className={
                              count <= elem
                                ? "fill stats_segment"
                                : "empty stats_segment"
                            }
                          ></div>
                        );
                      })}
                      <p>Attack</p>
                    </div>
                    <div className="statem_item">
                      {stateCount.map((elem) => {
                        const count = 15 - Math.ceil(pokyStates.defense / 30);
                        return (
                          <div
                            className={
                              count <= elem
                                ? "fill stats_segment"
                                : "empty stats_segment"
                            }
                          ></div>
                        );
                      })}
                      <p>Defense</p>
                    </div>
                    <div className="statem_item">
                      {stateCount.map((elem) => {
                        const count =
                          15 - Math.ceil(pokyStates.special_attack / 30);
                        return (
                          <div
                            className={
                              count <= elem
                                ? "fill stats_segment"
                                : "empty stats_segment"
                            }
                          ></div>
                        );
                      })}
                      <p>Special Attack</p>
                    </div>
                    <div className="statem_item">
                      {stateCount.map((elem) => {
                        const count =
                          15 - Math.floor(pokyStates.special_defense / 22);
                        return (
                          <div
                            className={
                              count <= elem
                                ? "fill stats_segment"
                                : "empty stats_segment"
                            }
                          ></div>
                        );
                      })}
                      <p>Special Defense</p>
                    </div>
                    <div className="statem_item">
                      {stateCount.map((elem) => {
                        const count = 15 - Math.ceil(pokyStates.speed / 18);
                        return (
                          <div
                            className={
                              count <= elem
                                ? "fill stats_segment"
                                : "empty stats_segment"
                            }
                          ></div>
                        );
                      })}
                      <p>Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
