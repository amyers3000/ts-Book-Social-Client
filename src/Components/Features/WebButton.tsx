import { Button, Box } from '@mui/material'

interface Props {
    image: string
    message?: string
}

const WebButton = ({ image, message }: Props) => {
    return (
        <Button variant="contained" color='secondary' size='small' sx={{ mr: 2, mt: 2, mb: 2, }} >
            <Box component='img' src={image} sx={{ height: 20, mr: 2 }} />
            {message}
        </Button>
    )
}

export default WebButton