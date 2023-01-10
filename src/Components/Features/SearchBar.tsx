import { IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { FormEvent, useState } from "react"
import { useAppDispatch } from "../../store/hooks";
import {  useNavigate } from "react-router-dom";

export interface Props {
    open?: boolean;
    handleClick: (e: FormEvent<HTMLFormElement>, term:string, location: string) => void
    placeholder: string
    location: string
    size: string | number
}



const SearchBar = ({ open, handleClick , placeholder, location, size }: Props) => {
    const [term, setTerm] = useState<string>("")
   

    let button =
        <IconButton type="submit" sx={{ p: '10px', display: 'flex' }} aria-label="search">
            <SearchIcon/>
        </IconButton>
    

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:size, minWidth:400 }}
            onSubmit={(e) => handleClick(e, term, location)}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search by book title' }}
                onChange={(e) => setTerm(e.target.value)}
            />
            {!open && button}
        </Paper>
    )
}

export default SearchBar