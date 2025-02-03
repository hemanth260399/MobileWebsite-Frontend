import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { changePasswordApi } from "../Api.js/loginApi"
import { useSelector } from "react-redux"
import { Loader } from "../loading"

export let Changepassword = () => {
    let navigate = useNavigate()
    let [params] = useSearchParams()
    const data = useSelector((state) => state.Itemreducer)
    const [error, setError] = useState('');
    let [loading, setloading] = useState(false)
    let [password, setpassword] = useState({ newpassword: "", confirmpassword: "" })
    let dataChange = (e) => {
        setpassword({ ...password, [e.target.name]: e.target.value })
    }
    let handleSubmit = async (e) => {
        e.preventDefault()
        if (!password.newpassword || !password.confirmpassword) {
            setError("Please fill all fields")
            return 0;
        }
        if (password.newpassword !== password.confirmpassword) {
            alert("Passwords do not match")
        } else {
            try {
                setloading(true)
                let responseData = await changePasswordApi(password.newpassword, params.get("token"))
                setloading(false)
                alert("Password changed successfully")
                setpassword({ newpassword: "", confirmpassword: "" })
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
                    <h2 className="text-center">Change Password</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-group">
                            <label htmlFor="email">New Password</label>
                            <input
                                type="password"
                                id="newpassword"
                                name="newpassword"
                                className="form-control"
                                placeholder="Enter your email"
                                value={password.newpassword}
                                onChange={dataChange}
                                min={5}
                                required
                            />
                            <label htmlFor="email">Confirm Password</label>
                            <input
                                type="text"
                                id="confirmpassword"
                                name="confirmpassword"
                                className="form-control"
                                placeholder="Enter your email"
                                value={password.confirmpassword}
                                onChange={dataChange}
                                min={5}
                                required
                            />
                        </div>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
                        <p style={{ cursor: "pointer", textDecoration: "underline" }} className="text-primary text-center mt-3" onClick={() => navigate("/")}>Login page</p>
                    </form>
                </div>
            </div>
            {loading && <Loader />}
        </>
    )
}