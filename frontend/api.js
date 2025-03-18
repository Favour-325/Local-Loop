import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // Important for sending cookies
});

export const api_register = async (userData) => {
    return await API.post('api/register/', userData, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });
};

export const api_login = async (userData) => {
    return await API.post('api/login/', userData, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });
};

export const api_authenticate = async () => {
    return await API.get('api/auth/me/');
};

export const api_update = async () => {
    return await API.patch('api/auth/me/');
};

export const api_refreshToken = async () => {
    return await API.post('api/token/refresh/', {});
};

export const api_logout = async () => {
    return await API.post('api/logout/', {});
};

export const api_councilList = async () => {
    return await API.get('api/council/list')
}

// Get the list of requests made by a user
export const api_requestList = async () => {
    return await API.get('api/requests/')
}

export const api_requestCreate = async (formData) => {
    return await API.post('api/requests/', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
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
