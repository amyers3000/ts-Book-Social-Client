import { AppBar, Box, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import SearchBar from '../SearchBar'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { FormEvent, useState } from 'react';
import SideBar from './SideBar';
import { Container } from '@mui/system';
import Image from '../../../assets/new.png'
import { useAppDispatch } from '../../../store/hooks';
import { signOut } from '../../../store/userSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { clearStoredBook, getBooks, searchTerm } from '../../../store/bookSlice';


const navLinks = [
  { title: 'Bookshelf' , path: '/bookshelf'},
  { title: 'Friends', path: '/friends'},
  {title: 'Browse', path: '/home'}
]

const navStyle = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  // how to get to pseudo elements
  '&:hover': {
      color: 'grey.500'
  },
}

const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const location = useLocation()
  
  

  function handleClick(e: FormEvent<HTMLFormElement>, term: string, location: string ){
    e.preventDefault()
    dispatch(searchTerm({term}))
    dispatch(getBooks(term))
    if(location!== "/home"){
        navigate("/home")
    }
    
}

  function handleOpen() {
    setOpen(!open)
  }

  function handleOpenMenu() {
    setOpenMenu(!openMenu)
  }

  function handleSignout(){
    dispatch(signOut())
    navigate("/")
  }


  let search = <Toolbar sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'center' }}>
    <SearchBar size={400} open={open} placeholder="Search Book Titles" handleClick={handleClick} location={location.pathname} />
  </Toolbar>



  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }} style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={handleOpen} sx={{ display: { xs: 'flex', md: 'none' }, alignItems:'center' }}>
            <SearchIcon color='secondary' />
          </IconButton>
          <Box display='flex' alignItems='center' sx={{ mr: { xs: 0, md: 19 } }}>
            <Container component='img' src={Image} style={{ height: 75, width: 'auto' }} sx={{ mr: 0, p: 2 }} />
            <Typography variant='h5'>Book Social</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems='center'>
            <SearchBar size={400} open={open} placeholder="Search Book Titles" handleClick={handleClick} location={location.pathname} />
          </Box>
          <Box display={{ sm: 'flex', xs:'flex', md: 'none' }} alignItems='center'>
            <IconButton onClick={handleOpenMenu}>
              <MenuIcon color='secondary' />
            </IconButton>
            <SideBar openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
          </Box>
          <Box sx={{ display: { sm: 'none', xs:'none', md: 'flex' } }}>
            <List sx={{ display: 'flex' }}>
              {navLinks.map((nav) => (
                <ListItemButton 
                  component={NavLink}
                  to={nav.path}
                  key={nav.title}
                  sx={navStyle}
                >
                  <ListItemText  primary={nav.title.toUpperCase()}/>
                </ListItemButton>
              ))}
              <ListItemButton onClick={handleSignout} sx={navStyle}>
                <ListItemText primary={"SignOut".toUpperCase()}/>
              </ListItemButton>
            </List>
          </Box>
        </Toolbar>
        {open && search}
      </AppBar >

    </>
  )
}

export default Header