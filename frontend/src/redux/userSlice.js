import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: {
            accessToken: ""
        },
        isFetching: false,
        error: false
    },
    reducers:{
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
            console.log("Login success")
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
            console.log("Login failed")
        },
        logout: (state) => {
            state.currentUser = null;
        }
    }
})

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,
    logout,
} = userSlice.actions
export default userSlice.reducer;