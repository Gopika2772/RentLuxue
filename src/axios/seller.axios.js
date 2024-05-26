import axios from "axios";
const baseurl = process.env.SERVER_URL;

export const sellerRegister = (firstname, lastname, email, password, phone, role) =>
    axios.post(`${baseurl}/api/sellerRegister`, {
        firstname,
        lastname,
        email,
        password,
        phone,
        role
    });

export const sellerlogin = (email, password) =>
    axios.post(`${baseurl}/api/sellerLogin`, {
        email,
        password,
    });

export const registerProperty = (formData, token) => {
    return axios.post(`${baseurl}/api/prop`, {
        formData,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
};

export const getProperty = (user_id) => {
    return axios.get(`${baseurl}/api/prop/${user_id}`);
};

export const deleteProperty = (post_id, token) => {
    return axios.delete(`${baseurl}/api/prop/${post_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateProperty = (post_id, formData, token) => {
    return axios.put(`${baseurl}/api/prop/${post_id}`, formData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
};

export const update = (post_id, token) => {
    return axios.get(`${baseurl}/api/prop/post/${post_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
};
