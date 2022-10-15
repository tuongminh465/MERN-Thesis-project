import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        status: false,
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers:{
        addProduct: (state, action) => {
            const index = state.products.findIndex(product => product.productId === action.payload.productId) 
            if (index === -1) {
                state.products.push(action.payload)
            } else {
                state.products[index].quantity += action.payload.quantity;
            }
            state.quantity += action.payload.quantity;
            state.total += action.payload.price * action.payload.quantity;
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
        },
        getUserCartStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

export const { addProduct, removeProduct, removeAllProduct, getUserCartStatus } = cartSlice.actions
export default cartSlice.reducer;