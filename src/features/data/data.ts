import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

import { rowIncludes, paginateRows } from "./utils";

export interface Row {
  id: string;
  [columnId: string]: any;
}

interface DataState {
  rows: Row[];
  searchQuery: string;
  page: number;
  limit: number;
}

const initialState: DataState = {
  rows: [],
  searchQuery: "Marry",
  page: 1,
  limit: 25,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<Row[]>) => {
      state.rows = [...action.payload];
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.page = 1;
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setRows, setLimit, setPage } = dataSlice.actions;

const getRows = (state: RootState) => state.data.rows;
export const getSearchQuery = (state: RootState) => state.data.searchQuery;
export const getPage = (state: RootState) => state.data.page;
export const getLimit = (state: RootState) => state.data.limit;

const selectFilteredRows = createSelector(
  [getRows, getSearchQuery],
  (rows, searchQuery) => {
    if (!searchQuery.length) return rows;
    return rows.filter((row) => rowIncludes(row, searchQuery));
  }
);

export const selectPagesLength = createSelector(
  [selectFilteredRows, getLimit],
  (rows, limit) => Math.ceil(rows.length / limit)
);

export const selectPaginatedRows = createSelector(
  [selectFilteredRows, getPage, getLimit],
  (rows, page, limit) => paginateRows({ rows, page, limit })
);

export default dataSlice.reducer;
