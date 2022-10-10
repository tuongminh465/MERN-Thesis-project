import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
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
    }
})

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,

} = userSlice.actions
export default userSlice.reducer;