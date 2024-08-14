import axios from "axios";

export async function apiCall(endpoint){
    const url = 'http://localhost:3000/api/' + endpoint;
    let result;
    try {
        result = await axios.get(url);
    }
    catch {
        console.log(error);
    }
    return result.data;
}

export async function apiPost(endpoint, payload){
    const url = 'http://localhost:3000/api/' + endpoint;
    let result;
    try {
        result = await axios.post(url, payload);
    }
    catch {
        console.log(error);
    }
    return result.data;
}