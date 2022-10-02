import axios from "axios";

const BASE_URL = `http://localhost:5000/api`
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjFjYWEzMGIwYTliZDZhMTg0Zjc4OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDYzNDg0MiwiZXhwIjoxNjY0ODk0MDQyfQ.xBsXYdRPI1m3wMmHRjomnz-S-rl9f0LbBzhM_jEjHZo"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{ token: `Bearer ${TOKEN}`},
})