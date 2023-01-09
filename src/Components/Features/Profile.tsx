import { Paper, Stack, Avatar, Box, Typography, Divider } from '@mui/material'
import { Followers, Following } from '../../App/models/user'
import { stringToColor } from '../../App/utils'

interface Props {
    firstName: string
    lastName: string
    city: string
    state: string
    date: string
    following?: Following[]
    followers?: Followers[]
}

const Profile = ({ firstName, lastName, city, state, date, following, followers }: Props) => {
    

    return (
        <Box sx={{ width:{ md: '50%', lg:"auto"} }}>
        <Paper elevation={4} style={{ backgroundColor: '#FFFFFF' }} sx={{ p: 2, display:'flex', justifyContent:{lg:'normal', md:"center"}}} >
            <Stack alignItems="center" direction="row" spacing={4} divider={<Divider orientation='vertical' flexItem/>}>
                <Avatar sx={{ width: 80, height: 80, fontSize: 30, bgcolor: stringToColor(`${firstName} ${lastName}`) }}>{`${firstName[0]}${lastName[0]}`}</Avatar>
                <Box>
                    <Typography align='center' variant='h5'> {`${firstName} ${lastName}`} </Typography>
                    <Typography align='center' variant='subtitle1'>{`${city}, ${state}`}</Typography>
                    <Typography align='center' variant='subtitle1'>{`Joined ${date}`}</Typography>
                </Box>
                <Box>
                    <Typography>Followers: {followers === undefined ? 0 : followers.length}</Typography>
                    <Typography>Following: {following === undefined ? 0 : following.length}</Typography>
                </Box>
            </Stack>
        </Paper>
        </Box>
    )
}

export default Profile