import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../App/errorHandling";
import agent from "../App/api";
import { Comments, SavedBooks } from "../App/models/book";

interface BookshelfState {
    bookData: SavedBooks | {}
    comments?: Comments[]
    status: "loading" | "idle" | "rejected" | "succeeded"
    error: string | null | undefined


}


export const getSavedBook = createAsyncThunk<SavedBooks, number>('bookshelf/getSavedBook', async (id: number, thunkApi) => {
    try {
        let response = await agent.Book.getBook(id, localStorage.getItem('token'))
        return response
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                return thunkApi.rejectWithValue("No book was found")
            }
        }
        return thunkApi.rejectWithValue(getErrorMessage(error))
    }
}
)




const initialState: BookshelfState = {
    bookData: {},
    status: 'idle',
    error: null,
    comments: undefined

}


const bookshelfSlice = createSlice({
    name: "bookshelf",
    initialState,
    reducers: {
       

    },
    extraReducers(builder) {
        builder
            .addCase(getSavedBook.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getSavedBook.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.bookData = action.payload
                state.comments = action.payload.comments
            })
            .addCase(getSavedBook.rejected, (state, action) => {
                state.status = 'rejected'
                let message = getErrorMessage(action.payload)
                state.error = message
            })
    }


})

export const { } = bookshelfSlice.actions;
export default bookshelfSlice.reducer;