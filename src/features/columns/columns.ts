import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { generateSelectedColumns } from "./utils";

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
}

const initialState: ColumnsState = {
  columns: [],
  selectedColumns: [],
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = [...action.payload];
      state.selectedColumns = generateSelectedColumns([...action.payload]);
    },
    setSelectedColumns: (state, action: PayloadAction<string[]>) => {
      state.selectedColumns = [...action.payload];
    },
  },
});

export const { setColumns, setSelectedColumns } = columnsSlice.actions;

const getColumns = (state: RootState) => state.columns.columns;
const getSelectedColumns = (state: RootState) => state.columns.selectedColumns;

export const selectSelectedColumns = createSelector(
  [getSelectedColumns],
  (selectedColumns) => selectedColumns
);

export const selectColumns = createSelector([getColumns], (columns) => {
  const sortedColumns: Column[] = [...columns];
  return sortedColumns.sort((a, b) => a.ordinalNo - b.ordinalNo);
});

export const selectFilteredColumns = createSelector(
  [selectColumns, getSelectedColumns],
  (columns, selectedColumns) =>
    columns.filter((column) => selectedColumns.includes(column.id))
);

export default columnsSlice.reducer;
