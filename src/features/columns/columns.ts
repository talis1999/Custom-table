import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import get from "lodash/get";
import sortBy from "lodash/sortBy";
import isEqual from "lodash/isEqual";

import type { RootState } from "../../app/store";
import { shouldResetSortByColumn, generateDefaultSortByColumn } from "./utils";

export interface Column {
  id: string;
  ordinalNo: number;
  title: string;
  type: "string" | "number" | "boolian" | "options";
  width?: number;
}

interface ColumnsState {
  columns: Column[];
  selectedColumns: string[];
  sortByColumn: SortByColumn;
}

export enum Order {
  Ascending = "asc",
  Descending = "desc",
}

export interface SortByColumn {
  columnId: string;
  order: Order;
}

const initialState: ColumnsState = {
  columns: [],
  selectedColumns: [],
  sortByColumn: { columnId: "", order: Order.Ascending },
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = [...action.payload];
      state.selectedColumns = [...action.payload].map((column) => column.id);
    },
    setSelectedColumns: (state, action: PayloadAction<string[]>) => {
      state.selectedColumns = [...action.payload];
      if (shouldResetSortByColumn(action.payload, state.sortByColumn))
        state.sortByColumn = { columnId: "", order: Order.Ascending };
    },
  },
});

export const { setColumns, setSelectedColumns } = columnsSlice.actions;

const getColumns = (state: RootState) => state.columns.columns;
const getSelectedColumns = (state: RootState) => state.columns.selectedColumns;
const getSortByColumn = (state: RootState) => state.columns.sortByColumn;

export const selectSelectedColumns = createSelector(
  [getSelectedColumns],
  (selectedColumns) => sortBy(selectedColumns),
  {
    memoizeOptions: {
      equalityCheck: isEqual,
      resultEqualityCheck: isEqual,
    },
  }
);

export const selectColumns = createSelector([getColumns], (columns) =>
  sortBy(columns, "ordinalNo")
);

export const selectFilteredColumns = createSelector(
  [selectColumns, selectSelectedColumns],
  (columns, selectedColumns) =>
    // Selected columns should be around the length of 20 at worst, therefore for now we will utilize includes
    columns.filter((column) => selectedColumns.includes(column.id))
);

export const selectSortByColumn = createSelector(
  [getSortByColumn, selectFilteredColumns],
  (sortBycolumn, columns) => {
    // return current default value
    if (!Boolean(sortBycolumn.columnId))
      return generateDefaultSortByColumn(columns);
    return sortBycolumn;
  },
  {
    memoizeOptions: {
      resultEqualityCheck: isEqual,
    },
  }
);

export default columnsSlice.reducer;
