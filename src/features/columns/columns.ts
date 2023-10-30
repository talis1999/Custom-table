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

export interface SelectedColumns {
  [columnId: string]: boolean;
}

interface ColumnsState {
  columns: Column[];
  selectedColumns: SelectedColumns;
}

const initialState: ColumnsState = {
  columns: [],
  selectedColumns: {},
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = [...action.payload];
      state.selectedColumns = generateSelectedColumns([...action.payload]);
    },
  },
});

export const { setColumns } = columnsSlice.actions;

const getColumns = (state: RootState) => state.columns.columns;
const getSelectedColumns = (state: RootState) => state.columns.selectedColumns;

export const selectColumns = createSelector([getColumns], (columns) => {
  const sortedColumns: Column[] = [...columns];
  return sortedColumns.sort((a, b) => a.ordinalNo - b.ordinalNo);
});

export const selectFilteredColumns = createSelector(
  [selectColumns, getSelectedColumns],
  (columns, selectedColumns) =>
    columns.filter((column) => selectedColumns[column.id])
);

export default columnsSlice.reducer;
