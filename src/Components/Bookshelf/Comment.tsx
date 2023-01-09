import { Avatar, Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { stringToColor } from '../../App/utils'

interface Props {
    content: string
    commentId: number
    createdAt: string
    user: {
        username: string
        userId: number
        firstName: string
        lastName: string
    }
}

const Comment = ({ content, commentId, user, createdAt }: Props) => {
    
    function timeConversion(createdAt : string){
        let date = new Date (createdAt)
        return date.toDateString()
    }

    return (
        <Grid item xs={12}>
            <Box sx={{ width: '95%', m:'auto', mb:.5 }}>
                <Paper elevation={4} style={{ backgroundColor: '#FFFFFF' }} sx={{ p:1 }} >
                    <Stack alignItems="center" direction="row" spacing={2} divider={<Divider orientation='vertical' flexItem />}>
                        <Avatar sx={{ bgcolor: stringToColor(`${user.firstName} ${user.lastName}`), ml:1 }}>{`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}</Avatar>
                        <Stack direction="column">
                            <Stack direction="row" spacing={2} alignItems='center'>
                                <Typography variant='subtitle1'>{`${user.firstName} ${user.lastName}`}</Typography>
                                <Typography variant='caption'>{timeConversion(createdAt)}</Typography>
                            </Stack>
                            <Typography variant='subtitle2'>{content}</Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </Grid>
    )
}

export default Comment