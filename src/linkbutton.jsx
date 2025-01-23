import { Link, Outlet, useNavigate } from 'react-router-dom'
import "./App.css"
import { useDispatch, useSelector } from 'react-redux'
const Topbutton = () => {
    const data = useSelector((state) => state.Itemreducer)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let gotocart = () => {
        navigate(`/cart?id=${data.userInfo.id}`)
    }
    let logout = () => {
        dispatch({ type: 'LOGOUT' })
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            {/* <div className='header'>
                <h4 to="/products" className='iconarea'>
                    Mobile Application
                </h4>
                <div>
                    <button onClick={() => { navigate("/products") }}><i className="fa-solid fa-house-chimney"></i> Home</button>
                    <button onClick={gotocart}><i className="fa-solid fa-cart-shopping"></i> Cart {data.totalproduct}</button>
                    <button onClick={() => { navigate(`/order?id=${data.userInfo.id}`) }} ><i className="fa-solid fa-gift"></i> Orders</button>
                    <button onClick={logout}><i className="fa-solid fa-user-circle"></i> Logout</button>
                </div>
            </div > */}
            <nav className="navbar navbar-expand-lg navbar-light header">
                <div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse headerPart" id="navbarTogglerDemo03">
                    <div>
                        <h4 to="/products" className='iconarea'>
                            Mobile Application
                        </h4>
                    </div>
                    <div>
                        <button onClick={() => { navigate("/products") }}><i className="fa-solid fa-house-chimney"></i> Home</button>
                        <button onClick={gotocart}><i className="fa-solid fa-cart-shopping"></i> Cart {data.totalproduct}</button>
                        <button onClick={() => { navigate(`/order?id=${data.userInfo.id}`) }} ><i className="fa-solid fa-gift"></i> Orders</button>
                        <button onClick={logout}><i className="fa-solid fa-user-circle"></i> Logout</button>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
export default Topbutton;