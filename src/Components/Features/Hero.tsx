import { Paper, Grid, Box, Typography } from '@mui/material'
import Image from "../../assets/main.jpg"
import Header from './Nav/Header'

interface Props {
    title: string
    message?: string
    profile?: JSX.Element
}


const Hero = ({ title, message, profile }: Props) => {

    return (
        <Paper sx={{ height: 700 }} style={{ backgroundImage: `url(${Image})`, backgroundPosition: '50% 25%' }}>
            <Header />
            <Grid container spacing={2} sx={{ mt: 5 }} direction="row">
                <Grid item md={6} xs={12}>
                    <Box style={{ backgroundColor: 'rgba(0,0,0,.2)' }} sx={{ ml: { xs: 2, md:'auto'}, m:'auto', width: { xs: 400, md: 600 } }}>
                        <Typography sx={{ fontWeight: 'bold' }} align={"left"} variant="h1" color='secondary'>{title}</Typography>
                        <Typography variant="h5" color="secondary">{message}</Typography>
                    </Box>
                </Grid>
                <Grid item lg={6} md={12}>     
                        {profile}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Hero