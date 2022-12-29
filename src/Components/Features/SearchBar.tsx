import { Box, IconButton, InputBase, Paper, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react"


const SearchBar = () => {
    const [term, setTerm] = useState('')
    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Book Titles"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon/>
        </IconButton>
      </Paper>
    )
}

export default SearchBar