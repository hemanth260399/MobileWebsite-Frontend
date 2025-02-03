import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { placeOrderAPI, removefromcartAPI, viewCartAPI } from "../Api.js/addtocartApi"
import { useSearchParams } from "react-router"
import { loadStripe } from '@stripe/stripe-js';
import { Loader } from "../loading";
const Mobilecart = () => {
    let customerdata = useSelector((state) => state.Itemreducer)
    let dispatch = useDispatch()
    let [params] = useSearchParams()
    let [cart, setcart] = useState([])
    let [cartID, setcartID] = useState("")
    const [qtypiece, setqtypiece] = useState({})
    let [totalValue, settotalValue] = useState(0)
    let [loading, setloading] = useState(false)
    const qtychange = (id, e) => {
        let tempdata = { ...qtypiece, [id]: e.target.value }
        setqtypiece(tempdata)
    }
    const caltotal = (id, price) => {
        let tempqty = qtypiece[id] || 1
        return price * tempqty
    }
    const total = () => {
        settotalValue(cart.reduce((acc, product) => {
            let totalprice = caltotal(product.id, product.price)
            return acc + totalprice
        }, 0))
    }
    useEffect(() => {
        total()
    }, [qtypiece])
    useEffect(() => {
        let cartData = async () => {
            try {
                setloading(true)
                let data = await viewCartAPI(params.get("id"))
                setloading(false)
                setcartID(data.cartId)
                setcart(data.data)
                setqtypiece(
                    data.data.reduce((a, p) => {
                        a[p.id] = p.quantity
                        return a
                    }, {})
                )
                settotalValue(data.totalValue)
            } catch (e) {
                setloading(false)
                alert(e)
            }
        }
        cartData()
    }, [])
    let removefromcart = async (title, id, price) => {
        let responsedata = await removefromcartAPI({ customerid: customerdata.userInfo.id, title: title, total: price })
        let tempdata = { ...qtypiece, [id]: 0 }
        setqtypiece(tempdata)
        let tempcart = cart.filter((product) => product.id !== id)
        setcart(tempcart)
        total()
        dispatch({ type: "cartcountdec" })
    }
    let placeOrder = async () => {
        let stripe = await loadStripe(import.meta.env.VITE_REACT_STRIPE_KEY)
        let userId = params.get("id")
        let responsedata = await placeOrderAPI({ id: userId }, { total: totalValue, qty: qtypiece, cartId: cartID })
        setqtypiece({})
        setcart([])
        settotalValue(0)
        let result = await stripe.redirectToCheckout({
            sessionId: responsedata.stripeSessionId.id
        });
        if (result.error) {
            console.error("Error:", result.error.message);
        }
        alert(responsedata.msg)
    }
    return (
        <>
            {cart.length > 0 &&
                <div>
                    {cart.map((data) => (
                        <div className="card m-5" key={data.id} style={{ maxWidth: 1200, border: 0, borderRadius: 20, Color: "lightseablue" }}>
                            <div className="row no-gutters" >
                                <div className="col-md-3 text-cente r p-2" style={{ borderRight: "2px dashed" }}>
                                    <img src={data.image} alt="..." style={{ width: "100%", height: "100%", borderRadius: 20, }} />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h3 className="card-title">{data.title}</h3>
                                        <p className="card-text">Brand : {data.modelName}</p>
                                        <p className="card-text">Descrption : {data.description}</p>
                                        <p className="card-text">Category : Mobile</p>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="card-body text-center">
                                        <input type="number" name="qty" id="qty" value={qtypiece[data.id] || data.quantity} min={1} placeholder="1" style={{ textAlign: "center", width: 40 }} onChange={(e) => qtychange(data.id, e)} />
                                        <h5 className="card-title mt-5 ">Rs.{caltotal(data.id, data.price, data.quantity)}</h5>
                                        <button className="card-text mt-5" onClick={() => removefromcart(data.title, data.id, data.price)} style={{ border: 0, color: "red", backgroundColor: "white" }}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px 0px 20px" }}>
                        <h4>Sub Price</h4>
                        <h5>Rs. {totalValue}</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px 0px 20px" }}>
                        <h4>Shipping</h4>
                        <h5>FREE</h5>
                    </div>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px 0px 20px" }}>
                        <h4>Total Price</h4>
                        <h5>Rs. {totalValue}</h5>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-primary btn-lg btn-block my-5" onClick={placeOrder} style={{ backgroundColor: "orangered", color: "white", borderRadius: 15, width: 800 }}>Place Order</button>
                    </div>
                </div>
            }
            {loading && <Loader />}
        </>
    )

}
export default Mobilecart