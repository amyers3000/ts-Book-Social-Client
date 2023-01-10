import { Paper, Stack, Avatar, Box, Typography, Divider, Button, Grid } from '@mui/material'
import { Followers, Following } from '../../App/models/user'
import { stringToColor } from '../../App/utils'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

interface Props {
    firstName: string
    lastName: string
    city: string
    state: string
    date: string | Date
    following?: Following[]
    followers?: Followers[]
    location?: string
    bookshelf: {
        md: string
        lg: string
    }
    username?: string
}

const Profile = ({ firstName, lastName, city, state, date, following, followers, location, bookshelf, username }: Props) => {
    const { userData } = useAppSelector((state) => (state.authenticate))


    return (
        <Box sx={{ width: bookshelf }}>
            <Paper elevation={4} style={{ backgroundColor: '#FFFFFF' }} sx={{ p: 2, display: 'flex', justifyContent: { lg: 'normal', md: "center" } }} >
                <Grid container>

                    <Stack alignItems="center" direction="row" spacing={4} divider={<Divider orientation='vertical' flexItem />}>
                        <Avatar sx={{ width: 60, height: 60, fontSize: 30, bgcolor: stringToColor(`${firstName} ${lastName}`) }}>{`${firstName[0]}${lastName[0]}`}</Avatar>
                        <Box display='flex' >
                            <Box>
                                <Typography align='center' variant='h6'> {`${firstName} ${lastName}`} </Typography>
                                <Typography align='center' variant='subtitle2'>{`${city}, ${state}`}</Typography>
                                <Typography align='center' variant='subtitle2'>{`Joined ${date}`}</Typography>

                            </Box>
                            <Box sx={{ m: 'auto' }}>
                                {userData.following.find((user) => user.username === username) ? <Button>Remove</Button> : <Button>Add</Button>}
                            </Box>
                        </Box>
                        
                        {location !== "/friends" && <Box>
                            <Typography>Followers: {followers === undefined ? 0 : followers.length}</Typography>
                            <Typography>Following: {following === undefined ? 0 : following.length}</Typography>
                        </Box>}

                    </Stack>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Profile