import React, { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const PerPageSegment = ({
  setPokemonPerPage,
  pokemonPerPage,
  active,
  setActive,
}) => {
  const per_count_10 = useRef(null);
  const per_count_20 = useRef(null);
  const per_count_30 = useRef(null);

  function handleClick() {
    console.log(active);
    setActive((state) => ({
      ...state,
      perpageActive: !active.perpageActive,
      valueFilterchActiv: false,
      typefilterActiv: false,
    }));

    console.log(active);
  }
  function handlePerPage(per_count) {
    setActive((state) => ({
      ...state,
      perpageActive: !active.perpageActive,
      valueFilterchActiv: false,
      typefilterActiv: false,
    }));
    const per_page_conut = per_count.current.textContent;
    setPokemonPerPage(Number(per_page_conut));
  }

  return (
    <div className="per_page">
      <div className="per_page_content">
        <h3>Show per page: </h3>
        <div
          className={
            !active.perpageActive
              ? "per_page_items"
              : "per_page_items items_active"
          }
        >
          <div className="per_page_activ_page" onClick={() => handleClick()}>
            <p>{pokemonPerPage}</p>
            <FaAngleDown
              className={
                !active.perpageActive ? "angle_down" : "angle_down to_up"
              }
            />
          </div>
          <div
            className={
              !active.perpageActive ? "per_page_list" : "per_page_list activ"
            }
          >
            <div
              className="per_page_list_item"
              onClick={() => handlePerPage(per_count_10)}
            >
              <p ref={per_count_10}>10</p>
            </div>
            <div
              className="per_page_list_item"
              onClick={() => handlePerPage(per_count_20)}
            >
              <p ref={per_count_20}>20</p>
            </div>
            <div
              className="per_page_list_item"
              onClick={() => handlePerPage(per_count_30)}
            >
              <p ref={per_count_30}>30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PerPageSegment;
