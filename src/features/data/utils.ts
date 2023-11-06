import get from "lodash/get";
import { GroupRow, GroupedValues, Row, SelectedRow, UnionRow } from "./data";
import { SortByColumn } from "../columns/columns";
import { RowMenu } from "./constants";

interface PaginateRowsArgs {
  rows: UnionRow[];
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
}: PaginateRowsArgs): UnionRow[] => {
  return rows.slice((page - 1) * limit, page * limit);
};

export const isRowMenuButtonEnabled = (
  selectedRow: SelectedRow,
  buttonType: RowMenu
): boolean => {
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

const stringToSelectedType = (
  value: string,
  selectedType: string
): string | number | boolean => {
  if (selectedType === "string") return value;
  if (selectedType === "number") return Number(value);
  if (selectedType === "boolean") return JSON.parse(value);
  return value;
};

export const groupRows = (
  rows: Row[],
  groupedValues: GroupedValues,
  sortByColumn: SortByColumn
): UnionRow[] => {
  // step 1 - copy groupedValues
  const tempGroupedValues: GroupedValues = { ...groupedValues };
  // step 2 - filter rows + count groupedValues + get column type
  const sortByColumnValueType: string = typeof get(rows, [
    "0",
    sortByColumn.columnId,
  ]);
  const filteredRows: Row[] = rows.filter((row) => {
    const rowValue: string = row[sortByColumn.columnId].toString();
    if (!groupedValues[rowValue]) return true;
    tempGroupedValues[rowValue] += 1;
    return false;
  });
  // step 3 - generate grouped rows array
  const groupedRows: GroupRow[] = Object.keys(tempGroupedValues).map((key) => ({
    [sortByColumn.columnId]: stringToSelectedType(key, sortByColumnValueType),
    columnTitle: sortByColumn.columnTitle,
    rowsCount: tempGroupedValues[key],
  }));
  // step 4 - return both (will be sorted later)
  return [...filteredRows, ...groupedRows];
};
