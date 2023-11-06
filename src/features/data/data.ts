import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import orderBy from "lodash/orderBy";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import set from "lodash/set";
import unset from "lodash/unset";
import cloneDeep from "lodash/cloneDeep";
import type { RootState } from "../../app/store";

import { selectSortByColumn } from "../columns/columns";
import { rowIncludes, paginateRows, groupRows } from "./utils";

export interface Row {
  id: string;
  [columnId: string]: string | number | boolean;
}

export interface GroupRow {
  [columnId: string]: string | number | boolean; // only used for sorting purposes
  columnTitle: string;
  value: string;
  rowsCount: number;
}

export type UnionRow = Row | GroupRow;

export interface GroupedValues {
  [columnId: string]: { [value: string]: number };
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
  groupedValues: GroupedValues;
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
  groupedValues: {},
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
    unsetSelectedRow: (state) => {
      state.selectedRow = {
        rowId: "",
        groupValue: "",
        upsertModeActive: false,
      };
    },
    addGroupValue: (state, action: PayloadAction<string>) => {
      const columnId: string = action.payload;
      const selectedRow: Row | undefined = state.rows.find(
        (row) => row.id === state.selectedRow.rowId
      );

      const groupedValue: string | number | boolean | undefined = get(
        selectedRow,
        [columnId]
      );

      if (groupedValue !== undefined) {
        set(state.groupedValues, [columnId, String(groupedValue)], 0);
        state.selectedRow.rowId = "";
      }
    },
    removeGroupValue: (state, action: PayloadAction<string>) => {
      const columnId: string = action.payload;

      const newGroupedValues: GroupedValues = cloneDeep(state.groupedValues);
      unset(newGroupedValues, [columnId, state.selectedRow.groupValue]);

      state.groupedValues = newGroupedValues;
      state.selectedRow.groupValue = "";
    },
  },
});

export const {
  setRows,
  setSearchQuery,
  setLimit,
  setPage,
  setSelectedRow,
  unsetSelectedRow,
  addGroupValue,
  removeGroupValue,
} = dataSlice.actions;

const getRows = (state: RootState) => state.data.rows;
export const getSearchQuery = (state: RootState) => state.data.searchQuery;
export const getPage = (state: RootState) => state.data.page;
export const getLimit = (state: RootState) => state.data.limit;
const getSelectedRow = (state: RootState) => state.data.selectedRow;
const getGroupedValues = (state: RootState) => state.data.groupedValues;

export const selectSelectedRow = createSelector(
  [getSelectedRow],
  (selectedRow) => selectedRow,
  {
    memoizeOptions: {
      equalityCheck: isEqual,
    },
  }
);

const selectGroupedValues = createSelector(
  [getGroupedValues],
  (groupedValues) => groupedValues,
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

const selectGroupedRows = createSelector(
  [selectFilteredRows, selectGroupedValues, selectSortByColumn],
  (rows, groupedValues, sortByColumn) => {
    if (
      isEmpty(rows) ||
      isEmpty(groupedValues) ||
      !Boolean(sortByColumn.columnId) ||
      !Boolean(sortByColumn.columnTitle)
    )
      return rows;
    return groupRows(rows, groupedValues, sortByColumn);
  }
);

const selectSortedRows = createSelector(
  [selectGroupedRows, selectSortByColumn],
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
