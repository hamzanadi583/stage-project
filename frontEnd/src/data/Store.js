import { configureStore } from "@reduxjs/toolkit";
import SubSlice from './slice';

export const store = configureStore({
    reducer : SubSlice
});
