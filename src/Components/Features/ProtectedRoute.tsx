import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"


const ProtectedRoute = ({children} : any) => {
    
    

    if(!localStorage.getItem('token') ){
        return <Navigate to="/"/>
    }
    return children
}

export default ProtectedRoute