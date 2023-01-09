import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../App/errorHandling";
import agent from "../App/api";
import { BookData } from "../App/models/book";

interface bookState {
    title: string
    data: BookData[]
    bookData: BookData[] | undefined
    clicked: boolean
    status: "loading" | "idle" | "rejected" | "succeeded"
    error: string | null | undefined

}


export const getBooks = createAsyncThunk<BookData[], string>('book/getBooks', async (title: string, thunkApi) => {
    try {
        let response = await agent.API.search(title)
        return response
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                return thunkApi.rejectWithValue("No books match search criteria")
            }
        }
        return thunkApi.rejectWithValue(getErrorMessage(error))
    }
}
)




const initialState: bookState = {
    title: "Dog",
    data: [],
    bookData: undefined,
    clicked: false,
    status: 'idle',
    error: null

}


const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        searchTerm: (state, action) => {
            const { term } = action.payload
            state.title = term
        },
        getOneBook: (state, action) => {
            const { bookId } = action.payload
            let book = state.data.filter((book) => (book.id === bookId))
            state.bookData = book
        },
        clearStoredBook: (state)  => {
            state.bookData = undefined
        }


    },
    extraReducers(builder) {
        builder
            .addCase(getBooks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = 'rejected'
                console.log(action)
                let message = getErrorMessage(action.payload)

                state.error = message
            })
    }


})

export const { searchTerm, getOneBook, clearStoredBook } = bookSlice.actions;
export default bookSlice.reducer;