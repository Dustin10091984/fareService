import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
  //thunk: true,
});

export const { dispatch } = store;

export type RootState = ReturnType<typeof rootReducer>;

export default store;
