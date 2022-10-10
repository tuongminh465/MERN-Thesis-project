import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers:{
        addProduct: (state, action) => {
            const index = state.products.findIndex(product => product._id === action.payload._id) 
            if (index === -1) {
                state.products.push(action.payload)
            } else {
                state.products[index].amount += action.payload.amount;
            }
            state.quantity += action.payload.amount;
            state.total += action.payload.price * action.payload.amount;
        },
        removeProduct: (state, action) => {
            const total = state.total - (action.payload.price * action.payload.amount)
            const newCartProducts = state.products.filter((product) => product._id !== action.payload._id)
            state.quantity -= action.payload.amount;
            state.total = total.toFixed(2);
            state.products = newCartProducts;
        },
        removeAllProduct: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
})

export const { addProduct, removeProduct, removeAllProduct } = cartSlice.actions
export default cartSlice.reducer;