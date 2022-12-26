import { getProductStart, getProductSuccess, getProductFail, deleteProductStart, deleteProductSuccess, deleteProductFail } from "./adminProductSlice"
import { publicRequest, userRequest } from "../../src/requestMethods"

export const getProducts = async (dispatch) => {
    dispatch(getProductStart()); 
    try {
        const res = await publicRequest.get('/products')
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFail());
        console.log(error)
    }
}

export const deleteProducts = async (_id, dispatch) => {
    dispatch(deleteProductStart)
    try {
        const res = await userRequest.delete(`/products/${_id}`)
        dispatch(deleteProductSuccess(_id))
        console.log(res)
    } 
    catch (error) {
        console.log(error)
        dispatch(deleteProductFail)
    }
}