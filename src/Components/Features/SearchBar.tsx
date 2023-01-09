import { IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { FormEvent, useState } from "react"
import { useAppDispatch } from "../../store/hooks";
import { getBooks, searchTerm } from "../../store/bookSlice";
import { useLocation, useNavigate } from "react-router-dom";

export interface Props {
    open: boolean;
}



const SearchBar = ({ open }: Props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [term, setTerm] = useState<string>("")
    const dispatch = useAppDispatch()

    function handleClick(e: FormEvent<HTMLFormElement> ){
        e.preventDefault()
        dispatch(searchTerm({term}))
        dispatch(getBooks(term))
        if(location.pathname !== "/home"){
            navigate("/home")
        }
        
    }

    
    let button =
        <IconButton type="submit" sx={{ p: '10px', display: 'flex' }} aria-label="search">
            <SearchIcon/>
        </IconButton>
    

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={(e) => handleClick(e)}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Book Titles"
                inputProps={{ 'aria-label': 'search by book title' }}
                onChange={(e) => setTerm(e.target.value)}
            />
            {!open && button}
        </Paper>
    )
}

export default SearchBar