import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from "./quotesSlice.js";

export const store = configureStore({
    reducer: {
        quotesState: quotesReducer
    }
})