import { Row, SelectedRow } from "./data";
import { RowMenu } from "./constants";

interface PaginateRowsArgs {
  rows: Row[];
  page: number;
  limit: number;
}

export const rowIncludes = (row: Row, searchQuery: string): boolean => {
  const lowerCasedSearchQuery: string = searchQuery.toLowerCase();

  return Object.keys(row).some((key) => {
    if (key === "id" || typeof row[key] === "boolean") return false;
    return row[key].toString().toLowerCase().includes(lowerCasedSearchQuery);
  });
};

export const paginateRows = ({
  rows = [],
  page = 1,
  limit = 25,
}: PaginateRowsArgs): Row[] => {
  return rows.slice((page - 1) * limit, page * limit);
};

export const isRowMenuButtonEnabled = (
  selectedRow: SelectedRow,
  buttonType: RowMenu
): Boolean => {
  const { rowId, groupValue, upsertModeActive } = selectedRow;

  if (!Boolean(rowId) && !Boolean(groupValue) && !upsertModeActive)
    return buttonType === RowMenu.Add;
  if (Boolean(rowId) && !upsertModeActive)
    return [
      RowMenu.Group,
      RowMenu.Edit,
      RowMenu.Delete,
      RowMenu.Cancel,
    ].includes(buttonType);
  if (Boolean(rowId) && upsertModeActive)
    return [RowMenu.Save, RowMenu.Cancel].includes(buttonType);
  if (Boolean(groupValue))
    return [RowMenu.Ungroup, RowMenu.Cancel].includes(buttonType);

  return false;
};
