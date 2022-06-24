import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducer'

const store = configureStore({
    reducer: rootReducer
});

export const { dispatch } = store

export default store;
