let BASE_URL = 'http://localhost:5000/api'

export function apiCall(method: string, payload: unknown | null, url : string) {
    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
    }
    if (method === 'POST' || method === "PUT") {
        options.body = JSON.stringify(payload)
    }
   
    return fetch(`${BASE_URL}/${url}`, options)
    
}