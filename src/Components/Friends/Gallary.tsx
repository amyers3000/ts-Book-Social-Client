import { Box, Paper, Grid, Stack, Typography } from "@mui/material"
import { profile } from "console"
import { FormEvent } from "react"
import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { searchUsers } from "../../store/userSlice"
import Books from "../Features/Books"
import Hero from "../Features/Hero"
import Profile from "../Features/Profile"
import SearchBar from "../Features/SearchBar"


const Gallary = () => {
    const dispatch = useAppDispatch()
    const { search, userData } = useAppSelector((state) => (state.authenticate))
    const location = useLocation()

    function handleClick(e: FormEvent<HTMLFormElement>, term: string, location: string) {
        e.preventDefault()
        dispatch(searchUsers(term))
    }
    return (

        <>
            <Hero title={"Find Friends."} message={"Find and follow your friends"} />
            <Box sx={{ mt: { lg: -45, md: -40, xs: -30 }, width: { lg: 920, md: 920, xs: 400 }, m: 'auto' }}>
                <Paper elevation={3} sx={{ m: 'auto', overflow: "hidden", overflowY: "scroll", overflowX: "scroll" }} >
                    <Grid container>
                        <Grid item md={6} sm={12}>
                            <Grid container spacing={4} sx={{ maxHeight: 500, width: 'auto' }}>
                                <Grid item sm={12} sx={{ minHeight: 500, width:'auto' }} style={{ backgroundColor: "#f1f2f6" }}  >
                                    <Box display='flex' justifyContent='center' sx={{ mt: 1 }}>
                                        <Stack spacing={1}>
                                            <SearchBar size={"auto"} placeholder="Search for friends" handleClick={handleClick} location={'none'} />
                                            {search.length > 0 && search.map((user) => (
                                                <Profile bookshelf={{ md: 'auto', lg: 'auto' }} firstName={user.firstName} lastName={user.lastName} city={user.city} state={user.state} date={user.createdAt} location={location.pathname} />))}
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={6} sm={12} >
                            <Grid container>
                                <Grid item sm={12} sx={{ minHeight: 435 }}>
                                    <Box display='flex' justifyContent='center' sx={{ m: 1 }}>
                                        {"following" in userData && userData.following.length > 0 ? userData.following.map((user) => (
                                            <Profile bookshelf={{ md: 'auto', lg: 'auto' }} firstName={user.firstName} lastName={user.lastName} city={user.city} state={user.state} date={user.createdAt} location={location.pathname} />))
                                            :
                                            <Box sx={{ mt: '40%', width: 'auto', display:{ sm:"flex", xs:'none'} }}>
                                                <Typography variant="h4" color="#C4C4C4">No Friends</Typography>
                                            </Box>}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>




        </>
    )
}

export default Gallary