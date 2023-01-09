import axios, { AxiosResponse } from "axios"
import { Credentials, Sign } from "./models/user";

axios.defaults.baseURL = 'http://localhost:5000/api/'

const responseBody = (response: AxiosResponse) => response.data;


function config(token : string | null){
    return{ headers: { 
        'Authorization' :`Bearer ${token}`}}
}

const requests = {
    get: (url: string, config?: {}) => axios.get(url, config).then(responseBody),
    post: (url: string, body: {}, config?: {}) => axios.post(url, body, config).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string, config: {}) => axios.delete(url, config).then(responseBody)
}

const API = {
    search: (title: string) => requests.get(`books/${title}`)
}

const Book = {
    save: (id: string | number, token: string | null) => requests.post("books", {id}, config(token)),
    getBook: (id: number | string | undefined, token: string | null ) => requests.get(`favorites/${id}`, config(token)),
    remove: (id: number, token: string | null ) => requests.delete(`favorites/${id}`, config(token))
}

const User = {
    login: (credentials : Credentials) => requests.post("users/login", credentials),
    signup: (credentials : Sign) => requests.post("users/signup", credentials),
    check: (token: string | null) => requests.get("users/check", config(token))
}

const Comments = {
    newComment: (bookId:number, content: string, token: string | null) => requests.post(`comments/${bookId}`,{content}, config(token))
}

const agent = {
    API,
    User,
    Book,
    Comments
}

export default agent