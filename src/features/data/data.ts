import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import orderBy from "lodash/orderBy";
import isEqual from "lodash/isEqual";
import type { RootState } from "../../app/store";

import { selectSortByColumn } from "../columns/columns";
import { rowIncludes, paginateRows } from "./utils";

export interface Row {
  id: string;
  [columnId: string]: any;
}

export interface SelectedRow {
  rowId: string;
  groupValue: string;
  upsertModeActive: boolean;
}

interface DataState {
  rows: Row[];
  searchQuery: string;
  page: number;
  limit: number;
  selectedRow: SelectedRow;
  // groupedValues: string[] | number[] | boolean[];
}

const initialState: DataState = {
  rows: [],
  searchQuery: "",
  page: 1,
  limit: 25,
  selectedRow: {
    rowId: "",
    groupValue: "",
    upsertModeActive: false,
  },
  // groupedValues: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<Row[]>) => {
      state.rows = [...action.payload];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.page = 1;
      state.searchQuery = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.page = 1;
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSelectedRow: (state, action: PayloadAction<Partial<SelectedRow>>) => {
      state.selectedRow = { ...state.selectedRow, ...action.payload };
    },
  },
});

export const { setRows, setSearchQuery, setLimit, setPage, setSelectedRow } =
  dataSlice.actions;

const getRows = (state: RootState) => state.data.rows;
export const getSearchQuery = (state: RootState) => state.data.searchQuery;
export const getPage = (state: RootState) => state.data.page;
export const getLimit = (state: RootState) => state.data.limit;
const getSelectedRow = (state: RootState) => state.data.selectedRow;
// const getGroupedValues = (state: RootState) => state.data.groupedValues;

export const selectSelectedRow = createSelector(
  [getSelectedRow],
  (selectedRow) => selectedRow,
  {
    memoizeOptions: {
      equalityCheck: isEqual,
    },
  }
);

const selectFilteredRows = createSelector(
  [getRows, getSearchQuery],
  (rows, searchQuery) => {
    if (!searchQuery.length) return rows;
    return rows.filter((row) => rowIncludes(row, searchQuery));
  }
);

const selectSortedRows = createSelector(
  [selectFilteredRows, selectSortByColumn],
  (rows, sortByColumn) =>
    orderBy(rows, sortByColumn.columnId, sortByColumn.order)
);

export const selectPagesLength = createSelector(
  [selectSortedRows, getLimit],
  (rows, limit) => Math.ceil(rows.length / limit) || 1
);

export const selectPaginatedRows = createSelector(
  [selectSortedRows, getPage, getLimit],
  (rows, page, limit) => paginateRows({ rows, page, limit })
);

export default dataSlice.reducer;
