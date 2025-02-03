import { useState } from 'react';
import './registerPage.css';
import { Navigate, useNavigate } from 'react-router';
import { registerAPI } from '../Api.js/loginApi';
import { useSelector } from 'react-redux';
import { Loader } from '../loading';

let RegisterPage = () => {
    let navigate = useNavigate()
    const data = useSelector((state) => state.Itemreducer)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    let [loading, setloading] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setloading(true)
            let data = await registerAPI(formData)
            setloading(false)
            console.log(data);
            alert(data.msg)
            navigate("/")
        } catch (err) {
            setloading(false)
            alert(err.message)
        }
    };
    if (data.autenctionState) {
        return <Navigate to="/products" />
    }
    return (
        <>
            <div className="container register-container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg rounded">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Create an Account</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-orange btn-block mt-4">Register</button>
                                    <p className="text-center mt-4 text-primary" style={{ cursor: "pointer" }} onClick={() => { navigate("/") }}>Already have an account?Login</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </>
    );
};

export default RegisterPage;
