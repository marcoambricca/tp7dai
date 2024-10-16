import axios from "axios";

export async function apiCall(endpoint, payload, token){
    const url = 'http://localhost:3000/api/' + endpoint;
    let response = null;
    try {
        result = await axios.get(url, {
            params: payload,
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        response = result.data;
    }
    catch (error){
        console.log(error);
    }
    return response;
}

export async function apiPost(endpoint, payload, token) {
    const url = 'http://localhost:3000/api/' + endpoint;
    let response = null;
    try {
        const result = await axios.post(url, payload, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        response = result.data;
    } catch (error) {
        console.log(error);
    }
    
    return response;
}

import axios from 'axios';

export async function apiDelete(endpoint, token) {
    const url = 'http://localhost:3000/api/' + endpoint;
    let response = null;
    try {
        const result = await axios.delete(url, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        response = result.data;
    } catch (error) {
        console.log(error);
    }
    
    return response;
}