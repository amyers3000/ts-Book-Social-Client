import { Box, IconButton, InputBase, Paper, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react"

export interface Props {
    open: boolean;
}

const SearchBar = ({ open }: Props) => {
    const [term, setTerm] = useState('')

    let button =
        <IconButton type="button" sx={{ p: '10px', display: 'flex' }} aria-label="search">
            <SearchIcon/>
        </IconButton>
    

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Book Titles"
                inputProps={{ 'aria-label': 'search by book title' }}
            />
            {!open && button}
        </Paper>
    )
}

export default SearchBar