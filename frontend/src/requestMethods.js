import axios from "axios";
import { store } from "./redux/store";

const BASE_URL = `http://localhost:5000/api`
// const TOKEN = store.getState().user.currentUser.accessToken;

// console.log(TOKEN)

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    // headers: { token: `Bearer ${TOKEN}`},
})

userRequest.interceptors.request.use((config) => {
    const TOKEN = store.getState().user.currentUser.accessToken;
    const ID = store.getState().user.currentUser._id

    config.headers["token"] = `Bearer ${TOKEN}`;
    config.headers["userid"] = `${ID}`
    
    return config;
})
