import { configureStore } from "@reduxjs/toolkit";
import bookshelfReducer from "./bookShelfSlice";
import bookReducer from "./bookSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        book: bookReducer,
        authenticate: userReducer,
        bookshelf: bookshelfReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch