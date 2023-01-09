import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../App/errorHandling";
import agent from "../App/api";
import { Comments, SavedBooks } from "../App/models/book";
import { User } from "../App/models/user";

interface BookshelfState {
    bookshelfData: SavedBooks[]
    user: User | undefined
    bookData: SavedBooks | {}
    comments?: Comments[]
    status: "loading" | "idle" | "rejected" | "succeeded"
    error: string | null | undefined
    show: boolean
    commentId: number


}

interface Data {
    id: number 
    content : string
}


export const getSavedBook = createAsyncThunk('bookshelf/getSavedBook', async (id: number | string | undefined, thunkApi) => {
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

export const removeSavedBook = createAsyncThunk('bookshelf/removeSavedBook', async (id: number, thunkApi) => {
    try {
        await agent.Book.remove(id, localStorage.getItem('token'))
        return id
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

export const checkUser = createAsyncThunk('bookshelf/checkUser', async (_, thunkApi) => {
    try {
        let response = await agent.User.check(localStorage.getItem('token'))
        return response
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                return thunkApi.rejectWithValue("No user found")
            }
        }
        return thunkApi.rejectWithValue(getErrorMessage(error)) 
    }
}
)

export const addComment = createAsyncThunk('bookshelf/addComment', async (data: Data, thunkApi) => {
    try {
        let response = await agent.Comments.newComment(data.id, data.content, localStorage.getItem('token'))
        return response
    } catch (error) {
        console.log(error)
        return thunkApi.rejectWithValue(getErrorMessage(error))  
    }
}
)

export const removeComment = createAsyncThunk('bookshelf/removeComment', async (commentId: number, thunkApi) => {
    try {
         await agent.Comments.removeComment(commentId, localStorage.getItem('token'))
        return commentId
    } catch (error) {
        console.log(error)
        return thunkApi.rejectWithValue(getErrorMessage(error))  
    }
}
)


const initialState: BookshelfState = {
    bookshelfData: [],
    user: undefined,
    bookData: {},
    status: 'idle',
    error: null,
    comments: undefined,
    show: false,
    commentId: 0

}


const bookshelfSlice = createSlice({
    name: "bookshelf",
    initialState,
    reducers: {
        addTempComment: (state, action) => {
            let date = new Date()
            let newComment: Comments = {
                content: action.payload,
                createdAt: date.toDateString(),
                commentId: state.commentId,
                user: {
                    firstName: state.user?.firstName,
                    lastName: state.user?.lastName
                }
            }
            state.comments?.push(newComment) 
        },
        removeTempComment: (state, action) => {
            state.comments = state.comments?.filter((comment) => comment.commentId !== action.payload)
        }
       

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
                state.show = true
            })
            .addCase(getSavedBook.rejected, (state, action) => {
                state.status = 'rejected'
                let message = getErrorMessage(action.payload)
                state.error = message
            })
            .addCase(removeSavedBook.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.bookData = {}
                state.show = false
                state.bookshelfData = state.bookshelfData.filter((book) => book.bookId !== action.payload)
            })
            .addCase(removeSavedBook.rejected, (state, action) => {
                state.status = 'rejected'
                let message = getErrorMessage(action.payload)
                state.error = message
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.bookshelfData = action.payload.user.books
                state.user = action.payload.user
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.status = 'rejected'
                let message = getErrorMessage(action.payload)
                state.error = message
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.commentId = action.payload
                
                
            })
            .addCase(addComment.rejected, (state, action) => {
                state.status = 'rejected'
                let message = getErrorMessage(action.payload)
                state.error = message
            })
            .addCase(removeComment.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.commentId = action.payload
                
                
            })
            .addCase(removeComment.rejected, (state, action) => {
                state.status = 'rejected'
                let message = getErrorMessage(action.payload)
                state.error = message
            })
    }


})

export const { addTempComment, removeTempComment} = bookshelfSlice.actions;
export default bookshelfSlice.reducer;