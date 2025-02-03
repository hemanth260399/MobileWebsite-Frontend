import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { googleLoginApi } from "../Api.js/loginApi.js"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../loading.jsx"

export let SuccessLogin = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [loading, setloading] = useState(false)
    const data = useSelector((state) => state.Itemreducer)
    useEffect(() => {
        let loginapi = async () => {
            try {
                setloading(true)
                let data = await googleLoginApi()
                setloading(false)
                localStorage.setItem('userData', JSON.stringify(data.data))
                localStorage.setItem("token", data.token)
                dispatch({ type: "SET_USER_INFO", payload: data.data })
                navigate("/products")
            } catch (e) {
                setloading(false)
                alert(e)
            }
        }
        loginapi()
    }, [])
    if (data.autenctionState) {
        return <Navigate to="/products" />
    }
    return (
        <>
            {loading && <Loader />}
        </>
    )
}