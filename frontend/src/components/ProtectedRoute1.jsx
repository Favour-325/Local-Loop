// Check other methods to protect routes since this one is vulnerable

import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { API } from "../../api";
import { useState, useEffect } from "react"

// Custom protection designed to prevent unauthorized users from accessiing protected pages
function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // This sends the refresh token to the backend in order to get a new access token in case of expiration
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem("refresh")
        try {
            const res = await API.post("api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem("access", res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    // This checks if the access token in the localStorage is valid and in case of expiration calls the refreshToken function.
    const auth = async () => {
        const token = localStorage.getItem("access")
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div className="spinner-grow text-primary" style={{width: "3rem", height: "3rem"}} role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // If the user is authorized he is given to the child component else redirected to the login page.
    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute