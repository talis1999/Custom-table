import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Column {
  id: string;
  ordinalNo: number;
  title: string;
  type: "string" | "number" | "boolian" | "options";
  width?: number;
}

interface ColumnsBlacklist {
  [columnId: string]: boolean;
}

interface ColumnsState {
  columns: Column[];
  columnsBlacklist: ColumnsBlacklist;
}

const initialState: ColumnsState = {
  columns: [],
  columnsBlacklist: {},
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = [...action.payload];
    },
  },
});

export const { setColumns } = columnsSlice.actions;

const getColumns = (state: RootState) => state.columns.columns;
const getColumnsBlacklist = (state: RootState) =>
  state.columns.columnsBlacklist;

export const selectColumns = createSelector([getColumns], (columns) => {
  const sortedColumns: Column[] = [...columns];
  return sortedColumns.sort((a, b) => a.ordinalNo - b.ordinalNo);
});

export const selectFilteredColumns = createSelector(
  [selectColumns, getColumnsBlacklist],
  (columns, columnsBlacklist) =>
    columns.filter((column) => !columnsBlacklist[column.id])
);

export default columnsSlice.reducer;
