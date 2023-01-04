import { AppBar, Box, IconButton, List, ListItem, Menu, Toolbar, Typography } from '@mui/material'
import SearchBar from '../Features/SearchBar'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import SideBar from './SideBar';


const Header = () => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false)

  function handleOpen() {
    setOpen(!open)
  }

  function handleOpenMenu() {
    setOpenMenu(!openMenu)
  }

  function dropDown() {
    return (
      <Toolbar sx={{ display: { xs: 'flex', md: 'none'}, alignItems: 'center', justifyContent: 'center' }}>
        <SearchBar open={open} />
      </Toolbar>
    )
  }

  return (
    <>
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <IconButton onClick={handleOpen} sx={{ display: { xs: 'flex', md: 'none' } }}>
            <SearchIcon />
          </IconButton>
        <Box display='flex' alignItems='center'>
          <Typography variant='h6'>Book-Social</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems='center'>
          <SearchBar open={open} />
        </Box>
        <Box display='flex' alignItems='center'>
         <IconButton onClick={handleOpenMenu}>
            <MenuIcon />
         </IconButton>
         <SideBar openMenu={openMenu} handleOpenMenu={handleOpenMenu}/>
        </Box>
      </Toolbar>
      {open && dropDown()}
    </AppBar >
   
    </>
  )
}

export default Header