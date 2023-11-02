import get from "lodash/get";

import { Column, SortByColumn, Order } from "./columns";

export const shouldResetSortByColumn = (
  newColumnIds: string[],
  currentSortByColumn: SortByColumn
): Boolean => {
  return (
    Boolean(currentSortByColumn.columnId) &&
    !newColumnIds.includes(currentSortByColumn.columnId)
  );
};

export const generateDefaultSortByColumn = (
  columns: Column[]
): SortByColumn => ({
  columnId: get(columns, "[0].id", ""),
  order: Order.Ascending,
});

const stringToOrderEnum = (value: string = "") => {
  switch (value) {
    case "asc":
      return Order.Ascending;
    case "desc":
      return Order.Descending;
    default:
      return Order.Ascending;
  }
};

export const stringToSortByColumn = (value: string = ""): SortByColumn => {
  const splitValue: string[] = value.split(", ");
  return {
    columnId: get(splitValue, "[0]", ""),
    order: stringToOrderEnum(get(splitValue, "[1]", "")),
  };
};
