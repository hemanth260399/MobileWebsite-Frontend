import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export let registerAPI = async (data) => {
    try {
        let response = await axios.post(`${url}/register`, data)
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let loginAPI = async (data) => {
    try {
        console.log("api")
        let response = await axios.post(`${url}/login`, data)
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let forgetPasswordApi = async (data) => {
    try {
        let response = await axios.post(`${url}/forgetpassword`, { data: data })
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let changePasswordApi = async (data, token) => {
    try {
        console.log(token)
        let response = await axios.post(`${url}/changepassword?token=${token}`, { password: data })
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let googleLoginApi = async () => {
    try {
        let response = await axios.get(`${url}/auth/loginSuccess`, {
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            }
        })
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}