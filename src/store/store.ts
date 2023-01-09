import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        book: bookReducer,
        authenticate: userReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch