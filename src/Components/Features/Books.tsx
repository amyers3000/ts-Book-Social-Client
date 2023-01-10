import { Grid, Card, CardActionArea, CardContent } from '@mui/material'
import { useAppDispatch } from '../../store/hooks'
import { getOneBook } from '../../store/bookSlice'
import { getSavedBook } from '../../store/bookShelfSlice'

interface Props {
    image : string | undefined
    bookId : number | string
    gridItemSize : number
    handleClick: (id : number | string) => void

    
}

const Books = ({image, bookId, gridItemSize, handleClick}: Props) => {



    return (
        <Grid item  xs={4} md={gridItemSize} >
            <Card  sx={{height:235 , ml:1}} style={{ backgroundColor: '#FCFCFC'  }}>
                <CardActionArea onClick={() => handleClick(bookId)} >
                    {image !== undefined ?
                        <CardContent
                            component='img'
                            src={image}
                            sx={{ width:'auto', height:"40%", objectFit:'contain', display:'flex', m:'auto' }} /> :
                        <CardContent
                            component='img'
                            src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw"
                            sx={{ width: 'auto', height:{ md:200, xs:180 }, objectFit:'cover', objectPosition:"50% 50%", display:'flex', m:'auto'  }} />}
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default Books