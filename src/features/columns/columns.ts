import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import sortBy from "lodash/sortBy";
import isEqual from "lodash/isEqual";

import type { RootState } from "../../app/store";
import { shouldResetSortByColumn, generateDefaultSortByColumn } from "./utils";
import {
  COLUMNS_PADDING_X,
  COLUMN_DEFAULT_WIDTH,
  Order,
  INITIAL_SORT_BY_COLUMN,
} from "./constants";

export interface Column {
  id: string;
  ordinalNo: number;
  title: string;
  type: "string" | "number" | "boolian" | "options";
  width?: number;
  options?: string[] | number[];
}

interface ColumnsState {
  columns: Column[];
  selectedColumns: string[];
  sortByColumn: SortByColumn;
}

export interface SortByColumn {
  columnId: string;
  columnTitle: string;
  order: Order;
}

const initialState: ColumnsState = {
  columns: [],
  selectedColumns: [],
  sortByColumn: INITIAL_SORT_BY_COLUMN,
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
        state.sortByColumn = INITIAL_SORT_BY_COLUMN;
    },
    setSortByColumn: (state, action: PayloadAction<SortByColumn>) => {
      state.sortByColumn = { ...action.payload };
    },
  },
});

export const { setColumns, setSelectedColumns, setSortByColumn } =
  columnsSlice.actions;

const getColumns = (state: RootState) => state.columns.columns;
const getSelectedColumns = (state: RootState) => state.columns.selectedColumns;
const getSortByColumn = (state: RootState) => state.columns.sortByColumn;

export const selectColumnsWidth = createSelector([getColumns], (columns) => {
  const columnsTotalWidth: number = columns.reduce(
    (totalWidth, column) => totalWidth + (column.width || COLUMN_DEFAULT_WIDTH),
    0
  );
  const columnsPaddingTotalWidth: number = 2 * 8 * COLUMNS_PADDING_X;

  return columnsTotalWidth + columnsPaddingTotalWidth;
});

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
