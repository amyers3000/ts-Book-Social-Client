import { Avatar, Box, Button, Divider, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import { stringToColor } from '../../App/utils'
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useDispatch } from 'react-redux';
import { removeComment, removeTempComment } from '../../store/bookShelfSlice';

interface Props {
    content: string
    commentId: number
    createdAt: string
    firstName?: string
    lastName?: string
    userId?: number
}

const Comment = ({ content, commentId, createdAt, firstName, lastName, userId }: Props) => {
    const { user } = useAppSelector((state) => (state.bookshelf))
    const dispatch = useAppDispatch()

    function timeConversion(createdAt: string) {
        let date = new Date(createdAt)
        return date.toDateString()
    }

    function handleRemove(commentId: number){
        dispatch(removeComment(commentId))
        dispatch(removeTempComment(commentId))
    }

    return (
        <Grid item xs={12}>
            <Box sx={{ width: '95%', m: 'auto', mb: .5 }}>
                <Paper elevation={4} style={{ backgroundColor: '#FFFFFF' }} sx={{ p: 1 }} >
                    <Stack alignItems="center" direction="row" spacing={2} divider={<Divider orientation='vertical' flexItem />} >
                        {firstName && lastName && <Avatar sx={{ bgcolor: stringToColor(`${firstName} ${lastName}`), ml: 1 }}>{`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}</Avatar>}
                        <Box sx={{ width: "95%" }} >

                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Box display='flex' alignItems='center' >
                                    <Typography variant='subtitle1'>{`${firstName} ${lastName}`}</Typography>
                                    <Typography sx={{ pl: 1 }} variant='caption'>{timeConversion(createdAt)}</Typography>
                                </Box>
                                { user?.userId === userId && <IconButton onClick={() => handleRemove(commentId)}>
                                    <CloseIcon fontSize='small' />
                                </IconButton>}
                            </Box>
                            <Typography variant='subtitle2'>{content}</Typography>

                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </Grid>
    )
}

export default Comment