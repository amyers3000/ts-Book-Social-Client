import { Box, Drawer, IconButton, List, ListItem } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';


interface Props {
    openMenu: boolean;
    handleOpenMenu: () => void;
}

const Links = ['Browse', 'My Books', "Friends"]

const SideBar = ({ openMenu, handleOpenMenu }: Props) => {
    return (
        <div>
            <Drawer
                anchor='right'
                open={openMenu}
            >
                <Box>
                    <IconButton onClick={handleOpenMenu}>
                        <ClearIcon />
                    </IconButton>
                </Box>
                <List>
                    {Links.map((title) => (
                        <ListItem>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

            </Drawer>
        </div>
    )
}

export default SideBar