import { useState } from "react"
import './loginPage.css';
import { Navigate, useNavigate } from "react-router";
import { forgetPasswordApi } from "../Api.js/loginApi";
import { useSelector } from "react-redux";
import { Loader } from "../loading";
export let Forgetpassword = () => {
    let navigate = useNavigate()
    let [Email, setEmail] = useState("")
    const [error, setError] = useState('');
    let [loading, setloading] = useState(false)
    const data = useSelector((state) => state.Itemreducer)
    let handleSubmit = async (e) => {
        e.preventDefault();
        if (!Email) {
            setError('Please fill out the fields');
        } else {
            try {
                setloading(true)
                let data = await forgetPasswordApi(Email)
                alert(data.msg)
                setloading(false)
                navigate("/")
            } catch (e) {
                setloading(false)
                alert(e)
            }
        }
    }
    if (data.autenctionState) {
        return <Navigate to="/products" />
    }
    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <h2 className="text-center">Forget Password</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
                        <p style={{ cursor: "pointer", textDecoration: "underline" }} className="text-primary text-center mt-3" onClick={() => navigate("/")}>Login page</p>
                    </form>
                </div>
                {loading && <Loader />}
            </div>

        </>
    )
}