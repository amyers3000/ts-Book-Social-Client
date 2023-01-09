import { SavedBooks } from "./book"

export interface Credentials {
    username: string
    password: string
}

export interface Sign {
    username: string
    password: string
    firstName: string
    lastName: string
    state: string
    city: string
}

export interface User {
    firstName: string
    lastName: string
    username: string
    city: string
    state: string
    following?: Following[]
    followers?: Followers[]
    createdAt: string
    userId: number
}

export interface Following {
    firstName: string
    lastName: string
    username: string
}

export interface Followers {
    firstName: string
    lastName: string
    username: string
}