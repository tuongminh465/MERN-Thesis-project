import { createSlice } from "@reduxjs/toolkit";

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //Get all
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false
            state.error = false
            state.users = action.payload
        },
        getUsersFail: (state) => {
            state.isFetching = false
            state.error = true
        },
        //Delete
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false
            state.error = false
            const newUsers = state.users.filter(product => product._id !== action.payload)
            state.users = newUsers
        },
        deleteUserFail: (state) => {
            state.isFetching = false
            state.error = true
        },
    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFail,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFail,
} = adminUsersSlice.actions
export default adminUsersSlice.reducer;
