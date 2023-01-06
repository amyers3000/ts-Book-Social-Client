import axios, { AxiosResponse } from "axios"
import { Credentials, Sign } from "./models/user";

axios.defaults.baseURL = 'http://localhost:5000/api/'

const responseBody = (response: AxiosResponse) => response.data;


const config = {
    headers: { 
        'Authorization' :`Bearer ${localStorage.token}`}
}

const requests = {
    get: (url: string, config?: {}) => axios.get(url, config).then(responseBody),
    post: (url: string, body: {}, config?: {}) => axios.post(url, body, config).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const API = {
    search: (title: string) => requests.get(`books/${title}`),
    save: (id: string) => requests.post("books", {id}, config)
}

const User = {
    login: (credentials : Credentials) => requests.post("users/login", credentials),
    signup: (credentials : Sign) => requests.post("users/signup", credentials),
    check: () => requests.get("users/check", config)
}

const agent = {
    API,
    User
}

export default agent