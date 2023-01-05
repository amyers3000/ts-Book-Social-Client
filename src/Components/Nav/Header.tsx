import { AppBar, Box, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material'
import SearchBar from '../Features/SearchBar'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import SideBar from './SideBar';
import { Container } from '@mui/system';
import Image from '../../assets/new.png'

const Links = ['Browse', 'My Books', "Friends"]


const Header = () => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false)

  function handleOpen() {
    setOpen(!open)
  }

  function handleOpenMenu() {
    setOpenMenu(!openMenu)
  }


  let search = <Toolbar sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'center' }}>
                  <SearchBar open={open} />
                </Toolbar>



  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }} style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={handleOpen} sx={{ display: { xs: 'flex', md: 'none' } }}>
            <SearchIcon color='secondary' />
          </IconButton>
          <Box display='flex' alignItems='center'  sx={{mr: { xs: 0, md: 10}}}>
            <Container component='img' src={Image} style={{ height: 80, width: 95}} sx={{ mr: 0, p: 2}}/>
            <Typography variant='h5'>Book-Social</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems='center'>
            <SearchBar open={open} />
          </Box>
          <Box display={{ xs: 'flex', md: 'none' }} alignItems='center'>
            <IconButton onClick={handleOpenMenu}>
              <MenuIcon color='secondary' />
            </IconButton>
            <SideBar openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
          </Box>
          <Box sx={{ display:{xs:'none', md: 'flex'} }}>
          <List sx={{ display: 'flex'}}>
                    {Links.map(( title ) => (
                        <ListItem                  
                            key={title}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
          </Box>
        </Toolbar>
        {open && search}
      </AppBar >

    </>
  )
}

export default Header