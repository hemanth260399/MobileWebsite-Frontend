import { useDispatch, useSelector } from "react-redux"
import Mobilecard from "./Mobileproduct"
import { useEffect, useState } from "react"
import { mobileProductAPI } from "../Api.js/mobileProductApi"
import { Loader } from "../loading"
const Mobiledata = () => {
    const userdata = useSelector((state) => state.Itemreducer)
    let dispatch = useDispatch()
    let [productData, setproductData] = useState([])
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        let ProductCall = async () => {
            try {
                setLoading(true)
                let data = await mobileProductAPI(userdata.userInfo.id)
                setLoading(false)
                setproductData(data)
                if (data.count >= 0) {
                    dispatch({ type: "currentCartvalue", payload: data.count })
                } else {
                    dispatch({ type: "currentCartvalue", payload: 0 })
                }
            } catch (e) {
                setLoading(false)
                console.error(e)
            }
        }
        ProductCall()
    }, [])
    return (
        <>
            {productData.data && productData.data.map((data) => (
                <Mobilecard
                    key={data.id}
                    {...data}
                />
            ))}
            {loading && <Loader />}
        </>
    )
}

export default Mobiledata;