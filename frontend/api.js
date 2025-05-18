import axios from "axios";
//import Cookies from "js-cookie";

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true, // Important for sending cookies
});

/* API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access"); // Check if we have an access token then add that as an authorization header to our request, else nothing to do

        const publicEndpoints = ['/api/council/', '/api/user/register/', '/api/token/'];
        if (token && !publicEndpoints.includes(config.url)) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
); */

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
    return await API.get('api/auth/me/', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    });
};

export const api_update = async (id, userData) => {
    return await API.patch(`api/profile/update/${id}`, {userData}, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    });
};

export const api_refreshToken = async () => {
    return await API.post('api/token/refresh/', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    });
};

export const api_logout = async () => {
    return await API.post('api/logout/', {});
};

export const api_councilList = async () => {
    return await API.get('api/council/list/');
}

export const api_getCouncil = async (id) => {
    return await API.get(`api/council/${id}/`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    })
}

export const api_requestList = async () => {
    return await API.get('api/requests/list/', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    })
}

export const api_requestCreate = async (formData) => {
    return await API.post('api/requests/create/', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    })
}

// Get the list of services related to a given council
export const api_services = async () => {
    return await API.get('api/services/', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    })
}

// Get the list of projects related to a given council
export const api_projects = async () => {
    return await API.get('api/projects/', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    })
}

export const api_getProject = async (id) => {
    return await API.get(`api/projects/${id}/`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    })
}

// Get the list of contributions made by a user
export const api_contribList = async () => {
    return await API.get('api/contributions/', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
        }
    })
}

export const api_contribCreate = async (formData) => {
    return await API.post('api/contributions/create/', formData, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
}

export const api_feedbacks = async (content, project) => {
    return await API.post('api/feedbacks/', {content, project}, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
        }
    })
}
