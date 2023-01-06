import { Alert, AppBar, Box, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import SearchBar from '../SearchBar'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import SideBar from './SideBar';
import { Container } from '@mui/system';
import Image from '../../../assets/new.png'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signOut } from '../../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Links = ['BookShelf', "Friends"]


const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const { error, status } = useAppSelector((state) => (state.search))
  const dispatch = useAppDispatch()

  function handleOpen() {
    setOpen(!open)
  }

  function handleOpenMenu() {
    setOpenMenu(!openMenu)
  }

  function handleClick(){
    dispatch(signOut())
    navigate("/")
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
          <Box display='flex' alignItems='center' sx={{ mr: { xs: 0, md: 10 } }}>
            <Container component='img' src={Image} style={{ height: 80, width: 95 }} sx={{ mr: 0, p: 2 }} />
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
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <List sx={{ display: 'flex' }}>
              {Links.map((title) => (
                <ListItemButton
                  key={title}
                >
                  <ListItemText primary={title.toUpperCase()}/>
                </ListItemButton>
              ))}
              <ListItemButton onClick={handleClick}>
                <ListItemText primary={"SignOut".toUpperCase()}/>
              </ListItemButton>
            </List>
          </Box>
        </Toolbar>
        {open && search}
        {status === "rejected" && <Alert severity='error'>
          {`${error}`}
        </Alert>}
      </AppBar >

    </>
  )
}

export default Header