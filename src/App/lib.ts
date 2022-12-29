let BASE_URL = 'http://localhost:5236/api/Email'

export function apiCall(method: string, payload: unknown) {
    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
    }
    if (method === 'POST' || method === "PUT") {
        options.body = JSON.stringify(payload)
    }
    return fetch(`${BASE_URL}`, options)
}