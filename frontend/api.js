import axios from "axios";
//import Cookies from "js-cookie";

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true, // Important for sending cookies
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access"); // Check if we have an access token then add that as an authorization header to our request, else nothing to do

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const api_register = async (userData) => {
    return await API.post('api/register/', userData, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });
};

export const api_login = async (userData) => {
    try {
        const response = await API.post('api/token/', userData);
        const { access, refresh } = response.data;

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        return response;
    } catch (error) {
        console.error("Login failed", error.response?.data || error.message);
    }
};

export const api_authenticate = async () => {
    return await API.get('api/auth/me/');
};

export const api_update = async () => {
    return await API.patch('api/auth/me/', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    });
};

export const api_refreshToken = async () => {
    return await API.post('api/token/refresh/', {});
};

export const api_logout = async () => {
    return await API.post('api/logout/', {});
};

export const api_councilList = async () => {
    return await API.get('api/council/list');
}

// Get the list of requests made by a user
export const api_requestList = async () => {
    return await API.get('api/requests/')
}

export const api_requestCreate = async (formData) => {
    //const csrfToken = Cookies.get("csrftoken");
    return await API.post('api/requests/', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    })
}

// Get the list of services related to a given council
export const api_services = async () => {
    return await API.get('api/services/')
}

// Get the list of projects related to a given council
export const api_projects = async () => {
    return await API.get('api/projects/')
}

// Get the list of contributions made by a user
export const api_contribList = async () => {
    return await API.get('api/contributions/')
}

export const api_contribCreate = async (formData) => {
    return await API.post('api/contributions/', formData, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
}

export const api_feedbacks = async (data) => {
    return await API.post('api/feedbacks/', data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}
