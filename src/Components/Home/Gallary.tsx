import { Box, Paper, Grid } from "@mui/material"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { getBooks } from "../../store/searchSlice"
import GallaryItem from "./GallaryItem"
import GalleryMessage from "./GalleryMessage"


const Gallary = () => {
    const { title, status, error, data } = useAppSelector((state) => state.search)
    const dispatch = useAppDispatch();



    useEffect(() => {
        if (status === 'idle') {
            dispatch(getBooks(title))
            console.log(data)
        }
    }, [status, dispatch, title])

    let content;
    if (status === 'loading' || data?.length === 0) {
        content = <GalleryMessage message={"Loading..."} />
    } else if (status === 'succeeded') {
        content = data && data.map((book, i) => (
            <GallaryItem book={book} key={i} />))
    } else if (status === 'rejected') {
        if (typeof (error) === "string") {
            content = <GalleryMessage message={error} />
        }
    }

    return (
        <Box sx={{ mt: { lg: -38, xs: -20, p: 5 }, width: { md: 800, xs: 400 }, mb: 'auto', ml: 'auto', mr: 'auto' }}>
            <Paper elevation={3} style={{ backgroundColor: '#FFFFFF' }} sx={{ m: 'auto' }} >
                <Grid container spacing={2} >
                    {content}
                </Grid>
            </Paper>
        </Box>
    )
}

export default Gallary