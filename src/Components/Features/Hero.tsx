import { Paper, Grid, Box, Typography } from '@mui/material'
import Image from "../../assets/main.jpg"
import Header from '../Nav/Header'



const Hero = () => {
  return (
    <Paper sx={{ height: 700 }} style={{  backgroundImage: `url(${Image})`, backgroundPosition: '50% 20%'}}>
    <Header />
    <Grid container spacing={2} sx={{ mt: 15, ml: 5 }}>
        <Grid item xs={6}>
            <Box style={{ backgroundColor: 'rgba(0,0,0,.2)'}}>
                <Typography sx={{ fontWeight: 'bold' }} align="left" variant="h1" color='secondary'>Book-Social.</Typography>
                <Typography variant="h5" color="secondary">Welcome Alex, let's get reading</Typography>
            </Box>
        </Grid>
    </Grid>
</Paper>
  )
}

export default Hero