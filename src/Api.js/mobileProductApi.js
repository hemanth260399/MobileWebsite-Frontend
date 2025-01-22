import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export let mobileProductAPI = async (data) => {
    try {
        let response = await axios.post(`${url}/products`, { id: data }, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.msg)
    }
}