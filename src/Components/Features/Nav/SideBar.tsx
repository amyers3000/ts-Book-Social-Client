import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { NavLink } from 'react-router-dom';


interface Props {
    openMenu: boolean;
    handleOpenMenu: () => void;
}

const navStyle = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    // how to get to pseudo elements
    '&:hover': {
        color: 'grey.500'
    },
  }

const navLinks = [
    { title: 'Bookshelf' , path: '/bookshelf'},
    { title: 'Friends', path: '/friends'},
    {title: 'Browse', path: '/home'}
  ]

const SideBar = ({ openMenu, handleOpenMenu }: Props) => {
    return (
        <>
            <Drawer
                anchor='right'
                open={openMenu}
                sx={{width: 300}}
            >
                <Box>
                    <IconButton onClick={handleOpenMenu}>
                        <ClearIcon />
                    </IconButton>
                </Box>
                <List sx={{width: 150}}>
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
                </List>

            </Drawer>
        </>
    )
}

export default SideBar