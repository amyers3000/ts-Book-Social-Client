import { Grid, Card, CardContent, CardActionArea } from '@mui/material'
import { useState } from 'react'
import { getErrorMessage } from '../../App/errorHandling'
import agent from '../../App/lib'
import { BookData } from '../../App/models/book'
import BookPopup from './BookPopup'

interface Props {
    book: BookData
}

const GallaryItem = ({ book }: Props) => {
    let [open, setOpen] = useState<boolean>(false)
    let [error, setError] = useState<string>("")

    function handleClose(){
        setOpen(false)
        setError("")
    }
    const handleOpen = () => setOpen(true)


    function handleSave() {
        agent.API.save(book.id)
            .catch(err => {        
                setError(getErrorMessage(err))
            })
    }

    return (
        <>
            <Grid item xs={6} md={3}>
                <Card >
                    <CardActionArea onClick={() => handleOpen()} >
                        {book.volumeInfo.imageLinks ?
                            <CardContent
                                component='img'
                                src={book.volumeInfo.imageLinks.thumbnail}
                                sx={{ width: 150, height: 220 }} /> :
                            <CardContent
                                component='img'
                                src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw"
                                sx={{ width: 150, height: 220 }} />}
                    </CardActionArea>
                    <BookPopup
                        error={error}
                        title={book.volumeInfo.title}
                        author={book.volumeInfo.authors}
                        description={book.volumeInfo.description}
                        handleClose={handleClose}
                        open={open}
                        handleSave={handleSave}
                    />
                </Card>
            </Grid>
        </>
    )
}

export default GallaryItem