import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import SearchBar from '../Features/SearchBar'

const Header = () => {
  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display='flex' alignItems='center'>
          <Typography variant='h6'>Book-Social</Typography>
        </Box>
        <SearchBar />
        <Box>
          <Typography  variant='h6'>Login</Typography>
        </Box>
      </Toolbar>

    </AppBar>
  )
}

export default Header