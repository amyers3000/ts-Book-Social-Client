import axios from "axios"

export function getErrorMessage(error: unknown) {
    let message
    if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 500) return message = "Server Error"
            message = error.response.data.message
    } else message = String(error)
    return message
}