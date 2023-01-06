import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "../App/errorHandling";
import agent from "../App/lib";
import { Credentials, Sign } from "../App/models/user";



interface UserState {
    data: {
        firstName?: string 
        lastName?: string 
        username?: string 
        city?: string 
        state?: string 
        following?: Following[] 
    } | {}
    status: "loading" | "idle" | "rejected" | "succeeded"
    error: string | null | undefined
    token: string;
}


interface Following {
    firstName: string
    lastName: string
    username: string
}

const initialState: UserState = {
    data: {},
    status: 'idle',
    error: null,
    token: ""
}

export const checkUser = createAsyncThunk<UserState>('user/checkUser', async () => {
    try {
        let response = await agent.User.check()
        return response
    } catch (error) {
        return getErrorMessage(error)   
    }
}
)

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
            state.data = {}
            state.token = ""
        },
    },
    extraReducers(builder) {
        builder
            .addCase(checkUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.data = action.payload.user
                state.token = action.payload.token
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
                state.data = action.payload.user
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

