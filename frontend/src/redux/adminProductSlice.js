import { createSlice } from "@reduxjs/toolkit";

const adminProductSlice = createSlice({
    name: 'adminProduct',
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //Get all
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false
            state.error = false
            state.products = action.payload
        },
        getProductFail: (state) => {
            state.isFetching = false
            state.error = true
        },
        //Delete
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false
            state.error = false
            const newProducts = state.products.filter(product => product._id !== action.payload)
            state.products = newProducts
        },
        deleteProductFail: (state) => {
            state.isFetching = false
            state.error = true
        },
    }
})

export const {
    getProductStart,
    getProductSuccess,
    getProductFail,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFail,
} = adminProductSlice.actions
export default adminProductSlice.reducer;
