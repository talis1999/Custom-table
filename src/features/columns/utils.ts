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
