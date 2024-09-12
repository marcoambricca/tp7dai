import axios from "axios";

export async function apiCall(endpoint){
    const url = 'http://localhost:3000/api/' + endpoint;
    let response = null;
    try {
        result = await axios.get(url);
        response = result.data;
    }
    catch (error){
        console.log(error);
    }
    return response;
}

export async function apiPost(endpoint, payload){
    const url = 'http://localhost:3000/api/' + endpoint;
    let response = null;
    try {
        result = await axios.post(url, payload);
        response = result.data;
    }
    catch (error){
        console.log(error);
    }
    return response;
}