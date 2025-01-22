import { useState } from 'react';
import './loginPage.css';
import { Navigate, useNavigate } from 'react-router';
import { loginAPI } from '../Api.js/loginApi';
import { useDispatch, useSelector } from 'react-redux';
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const data = useSelector((state) => state.Itemreducer)
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill out both fields');
        } else {
            try {
                let data = await loginAPI({ data: { email: email, password: password } })
                localStorage.setItem('userData', JSON.stringify(data.data))
                localStorage.setItem("token", data.token)
                dispatch({ type: "SET_USER_INFO", payload: data.data })
                navigate("/products")
            } catch (e) {
                alert(e.message)
            }
        }
    };
    let googleLogin = () => {
        console.log(import.meta.env.VITE_BE_URL)
        window.open(`${import.meta.env.VITE_BE_URL}/auth/google`, "_self")
    }
    if (data.autenctionState) {
        return <Navigate to="/products" />
    }
    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Login</button>
                </form>
                <p className="text-center mt-4 text-primary" style={{ cursor: "pointer" }} onClick={() => { navigate("/forgetpassword") }}>Forget Password</p>
                <p className="text-center mt-4 text-primary" style={{ cursor: "pointer" }} onClick={() => { navigate("/register") }}>Dont have an account? Register
                </p>
                <button className='google' onClick={googleLogin}><i className="fa-brands fa-google text-primary"></i>  Login with Google</button>
            </div>
        </div>
    );
}

export default LoginPage;
