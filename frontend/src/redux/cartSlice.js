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
            state.quantity += action.payload.amount;
            state.products.push(action.payload)
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
            console.log("Products removed")
        }
    }
})

export const { addProduct, removeProduct, removeAllProduct } = cartSlice.actions
export default cartSlice.reducer;