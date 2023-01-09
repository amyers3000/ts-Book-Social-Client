import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import Box from '@mui/system/Box/Box'
import { Comments } from '../../App/models/book'
import parse from 'html-react-parser'
import { FormEvent, useState } from 'react'
import agent from '../../App/api'
import Comment from '../Bookshelf/Comment'
import { handleDescription } from '../../App/utils'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addComment, addTempComment, removeSavedBook } from '../../store/bookShelfSlice'
import { useLocation } from 'react-router-dom'

interface Prop {
    title: string
    authors: string
    description: string
    bookId?: number
    image?: string
    handleSave?: (bookId: string) => void
    apiBookId?: string
    location: string

}

const BookView = ({ description, title, authors, bookId, image, handleSave, apiBookId, location}: Prop) => {
    const { comments } = useAppSelector((state) => (state.bookshelf))
    const [seeMore, setSeeMore] = useState<boolean>(false)
    const [newComment, setNewComment] = useState<string>("")
    const dispatch = useAppDispatch()
   
      
    function handleSubmit(e: FormEvent<HTMLFormElement>, id: number, newComment: string) {
        e.preventDefault()
        let data = { id: id, content:newComment }
        dispatch(addComment(data))
        dispatch(addTempComment(newComment))
       
        
    }

    function handleSeeMore() {
        setSeeMore(!seeMore)

    }

    let button;
    if (bookId !== undefined) {
        button = <Button color='error' onClick={() => dispatch(removeSavedBook(bookId))}>Remove</Button>
    } else if (handleSave && apiBookId) {
        button = <Button onClick={() => handleSave(apiBookId)} color='success'>Save Book</Button>
    }

    let comment;
    if(comments?.length !== 0 && comments && location === '/bookshelf' ){
        comment = comments.map((comment) => (<Comment key={comment.commentId} userId={comment.user.userId} content={comment.content} commentId={comment.commentId} firstName={comment.user.firstName} lastName={comment.user.lastName} createdAt={comment.createdAt} />))
    }else if(comments?.length === 0 && location === '/bookshelf'){
        comment = <Typography sx={{mt:3}} align='center'>No Comments Yet</Typography>
    }else{
        comment = null
    }

    return (
        <>
            <Grid item xs={12}>
                <Paper style={{ backgroundColor: "#f1f2f6" }} elevation={4} sx={{ width: '95%', ml: 2, mb: 1 }}>
                    <Stack direction='row' justifyContent="center" sx={{ minHeight: 200 }} >
                        {!seeMore && <Box component="img" src={image} sx={{ objectFit: 'contain', pt: 5, pl: 2, pb: 2, ml: 2 }} />}
                        <Box sx={{ m: 'auto' }}>
                            <Typography align='center' variant='h5' >{title}</Typography>
                            <Typography variant='subtitle1' align='center'  >{`By ${authors}`}</Typography>
                            <Box sx={{ width: "70%", ml: 'auto', mr: 'auto', mb: 'auto', mt: 2 }}>
                                <Typography align='left' variant='subtitle2'>{description && seeMore ? parse(description) : handleDescription(description, 250)}</Typography>
                                <Box display="flex" alignItems='center' justifyContent='center'>
                                {seeMore ? <Button onClick={handleSeeMore} > See Less</Button> : <Button sx={{}} onClick={handleSeeMore}>See More</Button>}
                                {button}
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                </Paper>
                {bookId !== undefined && location === '/bookshelf' ?
                    <Box sx={{ width: '95%', m: 'auto', display: 'flex', flexDirection: 'row' }} component="form" onSubmit={(e) => handleSubmit(e, bookId, newComment)} >
                        <TextField required fullWidth size='small' variant='filled' placeholder='Add to the discussion board' onChange={(e) => setNewComment(e.target.value)} />
                        <Button variant='contained' type="submit" >Submit</Button>
                    </Box>
                    : null}
                <Stack direction="column-reverse">
                {comment}
                </Stack>
            </Grid>
            {/* { "userId" in book.comments ? book.comments.user.userId : null} */}

        </>
    )
}

export default BookView