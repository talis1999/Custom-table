import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';


export interface Column {
  id: string;
  ordinalNo: number;
  title: string;
  type: 'string' | 'number' | 'boolian' | 'options';
  width?: number;
}

interface ColumnsState {
    columns: Column[];
    columnsFilters: any[];
}

const initialState: ColumnsState = {
    columns: [],
    columnsFilters: []
}

export const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
      setColumns: (state, action: PayloadAction<Column[]>) => {
        state.columns = [...action.payload];
      }
    }
  });

export const { setColumns } = columnsSlice.actions;

const getColumns = (state: RootState) => state.columns.columns;

export const selectColumns = createSelector(
    [getColumns],
    (columns) => columns
  );

export default columnsSlice.reducer;