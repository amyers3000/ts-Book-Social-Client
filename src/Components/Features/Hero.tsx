import { Paper, Grid, Box, Typography, Button, Container } from '@mui/material'
import Image from "../../assets/main.jpg"
import Header from './Nav/Header'
import Amazon from "../../assets/download.png"
import Barns from "../../assets/BarnesNoble.png"
import WebButton from './WebButton'

interface Props {
    buttonSeen: boolean
}

const Hero = ({ buttonSeen }: Props) => {

    return (
        <Paper sx={{ height: 700 }} style={{ backgroundImage: `url(${Image})`, backgroundPosition: '50% 20%' }}>
            <Header />
            <Grid container spacing={2} sx={{ mt: 10, ml: 5 }}>
                <Grid item md={6} xs={12}>
                    <Box style={{ backgroundColor: 'rgba(0,0,0,.2)' }}>
                        <Typography sx={{ fontWeight: 'bold' }} align="left" variant="h1" color='secondary'>Book-Social.</Typography>
                        <Typography variant="h5" color="secondary">Welcome Alex, let's get reading</Typography>
                    </Box>
                    <Box sx={{display:{ xs: 'none', md:'flex'}}}>
                    {!!buttonSeen && <WebButton image={Barns} message="Order books at Barns and Noble"/>}
                    {!!buttonSeen && <WebButton image={Amazon} message="Order books at Amazon"/>}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Hero