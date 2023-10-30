import { Column, SelectedColumns } from "./columns";

export const generateSelectedColumns = (
  columns: Column[] = []
): SelectedColumns => {
  const selectedColumns: SelectedColumns = {};
  columns.forEach((column) => {
    selectedColumns[column.id] = true;
  });

  return selectedColumns;
};
