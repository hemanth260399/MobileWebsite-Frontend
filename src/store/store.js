import { configureStore } from "@reduxjs/toolkit";
import { Itemreducer } from "./reducer";

export const store = configureStore({
    reducer: { Itemreducer },
    devTools: true
})