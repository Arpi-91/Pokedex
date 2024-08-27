import _ from "lodash";

export const PaginationRange = (
  pagesCount,
  pokemonPage,
  pokemonPerPage,
  siblings
) => {
  console.log(pagesCount);
  let pagesNoInArray = 7 + siblings;
  if (pagesNoInArray >= pagesCount) {
    return _.range(1, pagesCount + 1);
  }

  let leftSiblingIndex = Math.max(pokemonPage - siblings, 1);
  let rightSiblingIndex = Math.min(pokemonPage + siblings, pagesCount);
  let leftDots = leftSiblingIndex > 2;
  let rightDots = rightSiblingIndex < pagesCount - 2;
  if (!leftDots && rightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, " ...", pagesCount];
  } else if (leftDots && !rightDots) {
    let rightItemCount = 3 + 2 * siblings;
    let rightRange = _.range(pagesCount - rightItemCount + 1, pagesCount + 1);
    return [1, "... ", ...rightRange];
  } else if (leftDots && rightDots) {
    let middleDots = _.range(leftSiblingIndex, rightSiblingIndex + 1);
    return [1, "... ", ...middleDots, " ...", pagesCount];
  } else if (pagesCount <= 1) {
    return [1];
  }
};
