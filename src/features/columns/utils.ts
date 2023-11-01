import { SortByColumn } from "./columns";

export const shouldResetSortByColumn = (
  newColumnIds: string[],
  currentSortByColumn: SortByColumn
): Boolean => {
  return (
    Boolean(currentSortByColumn.columnId) &&
    !newColumnIds.includes(currentSortByColumn.columnId)
  );
};
