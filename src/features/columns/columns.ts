import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

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

interface SortByColumn {
  columnId: string;
  ascending: boolean;
}

const initialState: ColumnsState = {
  columns: [],
  selectedColumns: [],
  sortByColumn: { columnId: "", ascending: true },
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
      // Reseting sortByColumnId if it was filtered out by column filters
      if (
        Boolean(state.sortByColumn.columnId) &&
        !action.payload.includes(state.sortByColumn.columnId)
      )
        state.sortByColumn = { columnId: "", ascending: true };
    },
  },
});

export const { setColumns, setSelectedColumns } = columnsSlice.actions;

const getColumns = (state: RootState) => state.columns.columns;
const getSelectedColumns = (state: RootState) => state.columns.selectedColumns;
const getSortByColumn = (state: RootState) => state.columns.sortByColumn;

export const selectSelectedColumns = createSelector(
  [getSelectedColumns],
  (selectedColumns) => {
    return [...selectedColumns].sort();
  }
);

export const selectColumns = createSelector([getColumns], (columns) => {
  const sortedColumns: Column[] = [...columns];
  return sortedColumns.sort((a, b) => a.ordinalNo - b.ordinalNo);
});

export const selectFilteredColumns = createSelector(
  [selectColumns, getSelectedColumns],
  (columns, selectedColumns) =>
    // Selected columns should be around the length of 20 at worst, therefore for now we will utilize includes
    columns.filter((column) => selectedColumns.includes(column.id))
);

export const selectSortByColumn = createSelector(
  [getSortByColumn, selectFilteredColumns],
  (sortBycolumn, columns) => {
    if (!Boolean(sortBycolumn.columnId))
      return { columnId: columns[0]?.id, ascending: true };
    return sortBycolumn;
  }
);

export default columnsSlice.reducer;
