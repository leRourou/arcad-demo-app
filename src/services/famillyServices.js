import axios from 'axios';
import { Familly } from '../classes/models/familly';
import api from './api.json';

const api_endpoint = api.endpoint + 'families/';

export function getAllFamilies(nb, search, page ) {
    return axios.get(api_endpoint + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.families.map(familly => new Familly(familly)))
}

export function getFamillyById(id) {
    return axios.get(api_endpoint + id)
        .then(response => new Familly(response.data.familly));
}

export async function updateFamilly(familly) {
    familly.last_modification = new Date().toISOString()
    familly.id = parseInt(familly.id);
    const newFamilly = Familly.toAPIFormat(familly);
    try {
        const response = axios.put(api_endpoint, newFamilly);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

export async function createFamilly(familly) {
    familly.creation_date = new Date().toISOString().slice(0, 10); // Format : YYYY-MM-DD
    familly.id = parseInt(await getMaxID()) + 1;
    const newFamilly = Familly.toAPIFormat(familly);
    try {
        const response = await axios.post(api_endpoint, newFamilly);
                
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else {
            return error;
        }
    }
}

export function deleteFamilly(id) {
    return axios.delete(api_endpoint + id)
        .then(response => response);
}

export function getMaxID() {
    return axios.get(api_endpoint + `max`)
        .then(response => response.data.max)
}

export function getLengthFamilies() {
    return axios.get(api_endpoint + `length`)
        .then(response => response.data.length)
}