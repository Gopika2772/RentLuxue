import axios from "axios";
// const baseurl = process.env.SERVER_URL;
import {baseurl} from "../utils"


export const buyerRegister = (firstname, lastname, email, password, phone, role) => {
    return axios.post(`${baseurl}/api/buyerRegister`, { firstname, lastname, email, password, phone, role });
};

export const buyerLogin = (email, password) => {
    return axios.post(`${baseurl}/api/buyerLogin`, { email, password });
};

export const getPropertiesByCity = (city) => {
    return axios.get(`${baseurl}/api/city/${city}`);
};

export const getOwnerDetails = (user_id) => {
    return axios.get(`${baseurl}/api/owner/${user_id}`);
};

export const toggleLikePost = (post_id, user_id) => {
    return axios.post(`${baseurl}/api/like`, { post_id, user_id });
};
