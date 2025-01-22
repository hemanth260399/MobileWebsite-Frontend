import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export let addtocartAPI = async (data) => {
    try {
        let response = await axios.post(`${url}/addtocart`, data, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (err) {
        throw new Error(err.response.data)
    }
}
export let removefromcartAPI = async (data) => {
    try {
        let response = await axios.post(`${url}/removefromcart`, data, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let viewCartAPI = async (id) => {
    try {
        let response = await axios.get(`${url}/cart?id=${id}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let placeOrderAPI = async (id, data) => {
    try {
        console.log(id)
        let response = await axios.post(`${url}/placeorder?id=${id.id}`, data, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}
export let allorder = async (id) => {
    try {
        let response = await axios.get(`${url}/order?id=${id}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (err) {
        console.log("hello")
        throw new Error(err.response.data.msg)
    }
}