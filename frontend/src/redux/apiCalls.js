import { getProductStart, getProductSuccess, getProductFail, deleteProductStart, deleteProductSuccess, deleteProductFail } from "./adminProductSlice"
import { getUsersStart, getUsersSuccess, getUsersFail, deleteUserStart, deleteUserSuccess, deleteUserFail } from "./adminUsersSlice";
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

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart()); 
    try {
        const res = await userRequest.get('/users/find')
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFail());
        console.log(error)
    }
}

export const deleteUsers = async (_id, dispatch) => {
    dispatch(deleteUserStart)
    try {
        const res = await userRequest.delete(`/users/${_id}`)
        dispatch(deleteUserSuccess(_id))
        console.log(res)
    } 
    catch (error) {
        console.log(error)
        dispatch(deleteUserFail())
    }
}