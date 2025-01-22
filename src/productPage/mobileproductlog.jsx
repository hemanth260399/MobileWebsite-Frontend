import { useDispatch, useSelector } from "react-redux"
import Mobilecard from "./Mobileproduct"
import { useEffect, useState } from "react"
import { mobileProductAPI } from "../Api.js/mobileProductApi"
const Mobiledata = () => {
    const userdata = useSelector((state) => state.Itemreducer)
    let dispatch = useDispatch()
    let [productData, setproductData] = useState([])
    useEffect(() => {
        let ProductCall = async () => {
            try {
                let data = await mobileProductAPI(userdata.userInfo.id)
                setproductData(data)
                if (data.count >= 0) {
                    dispatch({ type: "currentCartvalue", payload: data.count })
                } else {
                    dispatch({ type: "currentCartvalue", payload: 0 })
                }
            } catch (e) {
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
        </>
    )
}

export default Mobiledata;