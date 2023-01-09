import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "../App/errorHandling";
import agent from "../App/api";
import { Credentials, Following, Sign } from "../App/models/user";



interface UserState {
    userData: {
        firstName?: string 
        lastName?: string 
        username?: string 
        city?: string 
        state?: string 
        following?: Following[] 
    } | {}
    status: "loading" | "idle" | "rejected" | "succeeded"
    error: string | null | undefined
    token: string | null;
}




const initialState: UserState = {
    userData: {},
    status: 'idle',
    error: null,
    token: null
}



export const loginUser = createAsyncThunk('user/loginUser', async (credentials: Credentials, thunkApi) =>{
        try {
            let response = await agent.User.login(credentials)
            console.log(response.token)
            localStorage.setItem('token', response.token)
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
     
    }
)

export const signupUser = createAsyncThunk('user/signupUser', async (credentials : Sign, thunkApi) => {
      try {
        let response = await agent.User.signup(credentials)
        return response
      } catch (error) {
            return thunkApi.rejectWithValue(getErrorMessage(error))
      }
      
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut : (state) => {
            localStorage.removeItem('token')
            state.userData = {}
            state.token = null
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.userData = action.payload.user
                state.token = localStorage.getItem('token')
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "rejected"
                let message = getErrorMessage(action.payload)
                state.error = message  
            })
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.userData = action.payload.user
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = "rejected"
                let message = getErrorMessage(action.payload)
                state.error = message
            })
    }
})

export const { signOut } = userSlice.actions;
export default userSlice.reducer;

