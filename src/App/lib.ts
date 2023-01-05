import axios, { AxiosResponse } from "axios"

axios.defaults.baseURL = 'http://localhost:5000/api/'

const responseBody = (response: AxiosResponse) => response.data;

export interface Credentials {
    username: string
    password: string
}

export interface Errors {
    code: number
    message: string
}

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const API = {
    search: (title: string) => requests.get(`books/${title}`),
    save: (id: string) => requests.post("books", {id})
}

const User = {
    login: (credentials : Credentials) => requests.post("users/login", credentials)
}

const agent = {
    API,
    User
}

export default agent