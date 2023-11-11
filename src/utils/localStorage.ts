import get from "lodash/get";

import type { RootState } from "../app/store";
import { INITIAL_SORT_BY_COLUMN } from "../features/columns/constants";

export enum StoreKeys {
  SortByColumn = "columns.sortByColumn",
  PageIndex = "data.page",
  PageSize = "data.limit",
  UpsertPayload = "data.upsertPayload",
  SearchValue = "data.searchQuery",
}

export type GetInitialState = (storeKey: StoreKeys) => any;

const DEFAULT_STORE_VALUES: Record<string, any> = {
  "columns.sortByColumn": INITIAL_SORT_BY_COLUMN,
  "data.page": 1,
  "data.limit": 25,
  "data.upsertPayload": {},
  "data.searchQuery": "",
};

export const loadState = (): Record<string, any> | undefined => {
  try {
    const serializedState: string | null = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("FAILED TO LOAD STATE--", err);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState: string = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log("FAILED TO SAVE STATE--", err);
  }
};

export const newInitialStateGetter = (
  preloadedState: Record<string, any> | undefined
): GetInitialState => {
  return (storeKey: StoreKeys): any =>
    get(preloadedState, storeKey, DEFAULT_STORE_VALUES[storeKey]);
};
