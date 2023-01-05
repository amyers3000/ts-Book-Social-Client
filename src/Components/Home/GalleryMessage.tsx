import { Grid, Typography } from "@mui/material"

interface Props {
    message?: string
}

const GalleryMessage = ({message} : Props) => {
  return (
    <Grid item xs={12} >
        <Typography variant="h4" sx={{display: 'flex', justifyContent: 'center'}}>{message}</Typography>
    </Grid>
  )
}

export default GalleryMessage