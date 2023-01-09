import { Grid, Typography } from "@mui/material"

interface Props {
    message?: string
}

const GalleryMessage = ({message} : Props) => {
  return (
    <Grid item xs={12} >     
        <Typography align="center" variant="h4">{message}</Typography>     
    </Grid>
  )
}

export default GalleryMessage