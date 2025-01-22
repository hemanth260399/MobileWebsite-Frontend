import { useNavigate } from 'react-router'
import './success.css'
import { useSelector } from 'react-redux'
export let Rejectspage = () => {
    const data = useSelector((state) => state.Itemreducer)
    let navigate = useNavigate()
    return (
        <>
            <div className="success-page">
                <div className="success-box">
                    <div className="alert alert-danger text-center">
                        <h3>Payment Failed!</h3>
                        <p>Your payment has been not completed</p>
                    </div>
                    <div className="button-group text-center">
                        <button href="/" onClick={() => { navigate("/products") }} className="btn btn-primary mx-2">Go to Home</button>
                        <button onClick={() => { navigate(`/order?id=${data.userInfo.id}`) }} className="btn btn-outline-secondary mx-2">View Order History</button>
                    </div>
                </div>
            </div>
        </>
    )
}