import { useState } from "react";
// import { useAuth } from "../../AuthContext.jsx";
import { api_login } from "../../api";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import logo from '../assets/pictures/logo1.png';

import Footer from "../components/Footer";
import Styles from "../styles/styles";
import "../styles/AuthPage.css";

// Implement function to check if the account details entered exist in the db

function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    // const { login } = useAuth();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!credentials.email) {
            newErrors.email = "Email required";
        } else if (!emailRegex.test(credentials.email)) {
            newErrors.email = "Invalid email address"
        }

        if (!credentials.password) {
            newErrors.password = "Password is required";
        } else if (credentials.password.length < 6) {
            newErrors.password = "Password must be atleast 6 characters long"
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        // The statement Object.keys(<object>) returns an array of the keys of the object in <object>
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            try {
                await api_login(credentials);
                navigate("/home");
                
            } catch (error) {
                alert(error);
            }
        } else {
            setErrors(validationErrors);
        };
    };

    const Styles1 = {
        icons: {
            position: "absolute",
            top: "39px",
            left: "19px",
            fontSize: "19px",
            color: "#273746",
        }
    }

    return (
        <body className="page">

            {/* <header>
                <NavBar />
            </header> */}

            <main>
                <div className="container my-5">
                    <div className="row justify-content-center m-auto" style={{width: "90%"}}>
                        <div className="card shadow border-0" style={Styles.customContainer}>
                            <div className="card-body">
                                <div className="text-center">
                                    <img src={logo} alt="localloop" width={120} height={100}/>
                                    <h2 className="card-title  fw-bolder lead">Welcome to LocalL<span className='text-primary'>oo</span>p</h2>
                                </div>
                                <form className="row" onSubmit={handleSubmit}>
                                    <div className="col-12 position-relative" style={Styles.inputGroup}>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <i className="bi bi-envelope-fill" style={Styles1.icons}></i>
                                        <input
                                        type="email"
                                        className="form-control py-2"
                                        id="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        style={{ padding: "0 30px", ...(errors.email ? Styles.inputError : {}) }}
                                        placeholder="example@gmail.com"
                                        />
                                        {errors.email && <span className="small text-danger">{errors.email}</span>}
                                    </div>

                                    <div className="col-12 position-relative" style={Styles.inputGroup}>
                                        <label htmlFor="pass" className="form-label">Password</label>
                                        <i className="bi bi-lock-fill" style={Styles1.icons}></i><input
                                        type="password"
                                        className="form-control py-2"
                                        id="pass"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        style={{ padding: "0 30px", ...(errors.password ? Styles.inputError : {}) }}
                                        />
                                        {errors.password && <span className="small text-danger">{errors.password}</span>}
                                    </div>

                                    <div>
                                        <button type="submit" className="btn btn-primary mt-3 w-100">Sign In</button>
                                        <p className="mt-2 text-center">Don&apos;t have an account? <a href="/register">Sign Up</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>

        </body>
    );
}

export default Login;