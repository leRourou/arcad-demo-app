import axios from 'axios';
import { Familly } from '../classes/models/familly';
import api from './api.json';

export function getAllFamilies(nb, search, page) {
    return axios.get(api.endpoint + api.items.familly + `?nb=${nb}&search=${search}&page=${page}`)
        .then(response => response.data.families.map(familly => new Familly(
            familly.ID,
            familly.DESCRIPTION,
            familly.CREATION_DATE,
            familly.LAST_MODIFICATION,
            familly.LAST_MODIFIER_ID,
            familly.DELETED
        )))
}

export function getFamillyById(id) {
    return axios.get(api.endpoint + api.items.familly + id)
        .then(response => { return response.data.familly }).then(familly =>
            new Familly(
                familly.ID,
                familly.DESCRIPTION,
                familly.CREATION_DATE,
                familly.LAST_MODIFICATION,
                familly.LAST_MODIFIER_ID,
                familly.DELETED
            ));
}