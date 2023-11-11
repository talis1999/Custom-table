import type { RootState } from "../app/store";

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
