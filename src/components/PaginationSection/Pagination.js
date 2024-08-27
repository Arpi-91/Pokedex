import React from "react";
import "./Pagination.css";
import { PaginationRange } from "./PaginationRange";

export default function Pagination({
  pokemonPerPage,
  allPokemons,
  // totalPages,
  hendleChangePgae,
  page,
  siblings,
}) {
  const totalPokemons = allPokemons.length;
  const pagesCount = Math.ceil(totalPokemons / pokemonPerPage);

  const pagesArray = PaginationRange(
    pagesCount,
    page,
    pokemonPerPage,
    siblings
  );

  return (
    <div className="pagination_container">
      <ul>
        <li>
          <button
            className="paginateion_li"
            onClick={() => hendleChangePgae("&lsaquo")}
          >
            &lsaquo;
          </button>
        </li>
        {pagesArray &&
          pagesArray.map((item) => {
            if (page === item) {
              return (
                <li key={`page_${item}`}>
                  <button
                    className="paginateion_li activePage"
                    key={item}
                    onClick={() => hendleChangePgae(item)}
                  >
                    {item}
                  </button>
                </li>
              );
            } else {
              return (
                <li key={`page_${item}`}>
                  <button
                    className="paginateion_li"
                    key={item}
                    onClick={() => hendleChangePgae(item)}
                  >
                    {item}
                  </button>
                </li>
              );
            }
          })}

        <li>
          <button
            className="paginateion_li"
            onClick={(e) => hendleChangePgae("&rsaquo")}
          >
            &rsaquo;
          </button>
        </li>
      </ul>
    </div>
  );
}
