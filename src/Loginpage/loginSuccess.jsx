import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router"
import { googleLoginApi } from "../Api.js/loginApi.js"
import { useDispatch, useSelector } from "react-redux"

export let SuccessLogin = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const data = useSelector((state) => state.Itemreducer)
    useEffect(() => {
        let loginapi = async () => {
            try {
                let data = await googleLoginApi()
                console.log(data)
                localStorage.setItem('userData', JSON.stringify(data.data))
                localStorage.setItem("token", data.token)
                dispatch({ type: "SET_USER_INFO", payload: data.data })
                navigate("/products")
            } catch (e) {
                alert(e)
            }
        }
        loginapi()
    }, [])
    if (data.autenctionState) {
        return <Navigate to="/products" />
    }
    return (
        <></>
    )
}