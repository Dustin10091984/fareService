import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development'
  //thunk: true,
});

export const { dispatch } = store;

export type RootState = ReturnType<typeof rootReducer>;

export default store;
