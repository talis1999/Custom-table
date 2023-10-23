import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';

import { paginateRows } from './utils';


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
    searchQuery: '',
    page: 1,
    limit: 25
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setRows: (state, action: PayloadAction<Row[]>) => {
        state.rows = [...action.payload];
      }
    }
  });

export const { setRows } = dataSlice.actions;

const getRows = (state: RootState) => state.data.rows;
const getPage = (state: RootState) => state.data.page;
const getLimit = (state: RootState) => state.data.limit;

// might get more complicated later on
export const selectRows = createSelector(
    [getRows, getPage, getLimit],
    (rows, page, limit) => paginateRows({rows, page, limit})
  );

export default dataSlice.reducer;