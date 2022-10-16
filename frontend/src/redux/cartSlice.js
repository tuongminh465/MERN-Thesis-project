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
            state.products = state.products.filter(product => product.productId !== action.payload.productId)
            state.quantity -= action.payload.amount;
            state.total = parseFloat(total.toFixed(2));
        },
        removeAllProduct: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        getUserCartStatus: (state, action) => {
            state.status = action.payload
        },
        fetchProduct: (state, action) => {
            state.products = action.payload.products
            state.quantity = action.payload.quantity
            state.total = action.payload.total
        }
    }
})

export const { 
    addProduct, 
    removeProduct, 
    removeAllProduct, 
    getUserCartStatus, 
    fetchProduct 
} = cartSlice.actions
export default cartSlice.reducer;