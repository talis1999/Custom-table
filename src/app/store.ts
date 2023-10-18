import { configureStore } from '@reduxjs/toolkit';
import columnsReduser from '../features/columns';
import dataReduser from '../features/data';

export const store = configureStore({
  reducer: {
    columns: columnsReduser,
    data: dataReduser
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;