import { Grid, Card, CardContent, CardActionArea } from '@mui/material'
import { BookData } from '../../App/models/book'

interface Props {
    book: BookData
}

const GallaryItem = ({ book }: Props) => {


    return (
        <>
            <Grid item  xs={6} md={3}>
                <Card >
                    <CardActionArea >
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
                </Card>
            </Grid>
        </>
    )
}

export default GallaryItem