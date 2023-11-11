import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash/throttle";

import columnsReduser from "../features/columns/columns";
import dataReduser from "../features/data/data";
import { loadState, saveState } from "../utils/localStorage";

export const preloadedState: Record<string, any> | undefined = loadState();

export const store = configureStore({
  reducer: {
    columns: columnsReduser,
    data: dataReduser,
  },
  preloadedState,
});

store.subscribe(
  throttle(() => {
    saveState({
      columns: store.getState().columns,
      data: store.getState().data,
    });
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
