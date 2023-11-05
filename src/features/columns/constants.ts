import { SortByColumn } from "./columns";

export const COLUMN_DEFAULT_WIDTH: number = 150;

export const COLUMNS_PADDING_X: number = 3; // ( units of 8px )

export enum ColumnTypes {
  String = "string",
  Number = "number",
  Boolian = "boolian",
  Options = "options",
}

export enum Order {
  Ascending = "asc",
  Descending = "desc",
}

export const INITIAL_SORT_BY_COLUMN: SortByColumn = {
  columnId: "",
  columnTitle: "",
  order: Order.Ascending,
};
