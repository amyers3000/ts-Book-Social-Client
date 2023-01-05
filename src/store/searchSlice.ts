import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../App/lib";
import { BookData } from "../App/models/book";

interface SearchState {
    title: string
    data: BookData[]
    status: "loading" | "idle" | "rejected" | "succeeded"
    error: string | null | undefined
   
}


export const getBooks = createAsyncThunk<BookData[], string>('search/getBooks', async (title: string) => {
        let response = await agent.API.search(title)
        return response
    }
)


const initialState: SearchState = {
    title: "Dog",
    data: [],
    status: 'idle',
    error: null
    
}


const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchTerm: (state, action) => {
            const { term } = action.payload
            state.title = term
            console.log(state.title)
            
        },
      

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
                state.error = action.error.message
            })
    }


})

export const { searchTerm } = searchSlice.actions;
export default searchSlice.reducer;