import { useState, useEffect } from "react";
import { api_register, api_councilList } from "../../api.js";
import { useNavigate } from "react-router-dom";

import logo from '../assets/pictures/logo1.png';

import Footer from "../components/Footer";
import Styles from "../styles/styles";
import "../styles/AuthPage.css";

// Implement function to check that the phone number entered doesn't exist in the db

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [councils, setCouncils] = useState([]);
    const [selectedCouncil, setSelectedCouncil] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            newErrors.email = "Email required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email address"
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be atleast 6 characters long"
        } else if (password !== conPassword) {
            newErrors.password = "Passwords do not match"
        }
        return newErrors;
    };
    
    const getCouncils = async () => {
        try {
            const response = await api_councilList();
            setCouncils(response.data);
        } catch (error) {
            console.error("Error fetching council list: ", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        getCouncils();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        // The statement Object.keys(<object>) returns an array of the keys of the object in <object>
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await api_register({
                    email, 
                    'password': conPassword,
                    'council': selectedCouncil,
                }
            );
                
                // axios doesn't have .ok
                if (response.status === 201) {
    
                    alert("Successful");
    
                    navigate("/login");
                    
                } else {
                    navigate("/login")
                }
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
            left: "7px",
            fontSize: "19px",
            color: "#273746",
        }
    }

    return (
        <body>

            <main>
                <div className="container my-5">
                    <div className="row justify-content-center align-items-center m-auto" style={{width: "90%"}}>
                        <div className="card shadow border-0" style={Styles.customContainer}>
                            <div className="card-body">
                                <div className="text-center">
                                    <img src={logo} alt="localloop" width={120} height={100}/>
                                    <h2 className="card-title  fw-bolder lead">Welcome to LocalLoop 👋</h2>
                                </div>
                                <form
                                onSubmit={handleSubmit}
                                noValidate
                                >
                                    <div className="col-12 position-relative" style={Styles.inputGroup}>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <i className="bi bi-envelope-fill" style={Styles1.icons}></i>
                                        <input
                                        type="email"
                                        className="form-control py-2"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ padding: "0 30px", ...(errors.email ? Styles.inputError : {}) }}
                                        placeholder="example@gmail.com"
                                        />
                                        {errors.email && <span className="small text-danger">{errors.email}</span>}
                                    </div>

                                    <div className="col-12 position-relative" style={Styles.inputGroup}>
                                        <label className="form-label" htmlFor="councils">Councils</label>
                                        <select className="form-select" name="councils" id="councils" value={selectedCouncil} onChange={(e) => setSelectedCouncil(e.target.value)}>
                                            <option >Select your City Council</option>
                                            {councils.map((council) => {
                                                return (
                                                    <option key={council.id} value={council.name} onClick={() => {setSelectedCouncil(council.name)}}>{council.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    
                                    <div className="col-12 position-relative" style={Styles.inputGroup}>
                                        <label htmlFor="pass" className="form-label">Password</label>
                                        <i className="bi bi-lock-fill" style={Styles1.icons}></i><input
                                        type="password"
                                        className="form-control py-2"
                                        id="pass"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ padding: "0 30px", ...(errors.password ? Styles.inputError : {}) }}
                                        />
                                        {errors.password && <span className="small text-danger">{errors.password}</span>}
                                    </div>

                                    
                                    <div className="col-12 position-relative" style={Styles.inputGroup}>
                                        <label htmlFor="conPass" className="form-label">Confirm Password</label>
                                        <i className="bi bi-lock-fill" style={Styles1.icons}></i><input
                                        type="password"
                                        className="form-control py-2"
                                        id="conPass"
                                        value={conPassword}
                                        onChange={(e) => setConPassword(e.target.value)}
                                        style={{ padding: "0 30px", ...(errors.password ? Styles.inputError : {}) }}
                                        />
                                        {errors.password && <span className="small text-danger">{errors.password}</span>}
                                    </div>

                                    <div>
                                        <button type="submit" className="btn btn-primary mt-3 w-100">Sign Up</button>
                                        <p className="mt-2 text-center">Already have an account? <a href="/login">Sign In</a></p>
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

export default SignUp;