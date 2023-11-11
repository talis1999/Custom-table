import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {
  FormErrors,
  GroupRow,
  GroupedValues,
  Row,
  SelectedRow,
  UnionRow,
  UpsertPayload,
} from "./data";
import { Column, SortByColumn } from "../columns/columns";
import { RowMenu } from "./constants";
import { ColumnTypes } from "../columns/constants";

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
  if (upsertModeActive)
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
  if (selectedType === "boolean")
    return value === "true" || value === "false" ? JSON.parse(value) : value;
  return value;
};

export const groupRows = (
  rows: Row[],
  groupedValues: GroupedValues,
  sortByColumn: SortByColumn
): UnionRow[] => {
  const { columnId, columnTitle } = sortByColumn;
  // step 1 - copy groupedValues
  const tempGroupedValues: GroupedValues["columnId"] = {
    ...get(groupedValues, [columnId], {}),
  };
  // step 2 - filter rows + count groupedValues + get column type
  const sortByColumnValueType: string = typeof get(rows, ["0", columnId]);
  const filteredRows: Row[] = rows.filter((row) => {
    const rowValue: string = String(row[columnId]);
    if (tempGroupedValues[rowValue] === undefined) return true;
    tempGroupedValues[rowValue] += 1;
    return false;
  });
  // step 3 - generate grouped rows array and return only those with rowsCount > 0
  const groupedRows: GroupRow[] = Object.keys(tempGroupedValues)
    .map((key) => ({
      [columnId]: stringToSelectedType(key, sortByColumnValueType),
      columnTitle,
      value: key,
      rowsCount: tempGroupedValues[key],
    }))
    .filter((row) => row.rowsCount > 0);
  // step 4 - return both (will be sorted later)
  return [...filteredRows, ...groupedRows];
};

export const shouldLoadRowData = (
  selectedRowId: string,
  upsertModeActive: boolean = false
): boolean => Boolean(selectedRowId) && upsertModeActive;

export const shouldClearRowData = (
  selectedRowId: string,
  upsertModeActive: boolean = false
): boolean => !Boolean(selectedRowId) && upsertModeActive;

export const shouldInitUpsertPayload = (
  selectedRowId: string = "",
  isUpsertPayloadEmpty: boolean
): boolean => !Boolean(selectedRowId) && isUpsertPayloadEmpty;

export const getInitialUpsertPayload = (columns: Column[]): UpsertPayload => {
  const upsertPayload: UpsertPayload = {};
  columns.forEach(({ id, type, options }) => {
    if (type === ColumnTypes.String) upsertPayload[id] = "";
    if (type === ColumnTypes.Number) upsertPayload[id] = 0;
    if (type === ColumnTypes.Boolian) upsertPayload[id] = false;
    if (type === ColumnTypes.Options)
      upsertPayload[id] = get(options, "[0]", "");
  });

  return upsertPayload;
};

// !- This case includes only basic validation checks
export const generateFormErrors = (
  upsertPayload: UpsertPayload
): FormErrors => {
  const formErrors: FormErrors = {};
  Object.keys(upsertPayload).forEach((key) => {
    if (upsertPayload[key] === "") {
      formErrors[key] = "* Field required";
      return;
    }
  });
  return formErrors;
};
