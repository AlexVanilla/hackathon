import axios from 'axios'


export function create(payload) {
    return axios.post(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/users/`, payload)
        .then(onSuccess)
        .catch(onError)
}

export function readById(id){
    return axios.get(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/users/${id}`)
    .then(onSuccess)
    .catch(onError)
}
 
export function login(formData) {
    return axios.post(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/users/login`, formData)
}

function onSuccess(response) {
    return response.data
}

function onError(error) {
    console.error(error)
}
