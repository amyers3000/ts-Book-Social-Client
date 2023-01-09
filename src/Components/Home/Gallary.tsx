import { Box, Paper, Grid, Alert } from "@mui/material"
import { useEffect, useState } from "react"
import { getErrorMessage } from "../../App/errorHandling"
import agent from "../../App/api"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { clearStoredBook, getBooks, getOneBook } from "../../store/bookSlice"
import Books from "../Features/Books"
import BookView from "../Features/BookView"
import GalleryMessage from "./GalleryMessage"


const Gallary = () => {
    const { title, status, error, data, bookData } = useAppSelector((state) => state.book)
    const [newError, setNewError] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    let gridSize: number;
    let gridItemSize: number;
    let size: number
    let view: JSX.Element | null
    let display;
    if (bookData !== undefined) {
        gridSize = 6
        gridItemSize = 4
        size = 1400
        view = <BookView handleSave={handleSave}
            title={bookData[0].volumeInfo.title}
            authors={bookData[0].volumeInfo.authors[0]}
            image={bookData[0].volumeInfo.imageLinks?.thumbnail}
            description={bookData[0].volumeInfo.description}
            apiBookId={bookData[0].id}
        />
    } else {
        gridSize = 12
        gridItemSize = 3
        size = 1000
        view = null
        display = { display: "none" }
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getBooks(title))
            dispatch(clearStoredBook())

        }
          // eslint-disable-next-line
    }, [])


    function handleGetBook(bookId: number | string) {
        try {
            setNewError("")
            setSuccess(false)
            console.log(newError)
            dispatch(getOneBook(bookId))
           
        } catch (error) {
            console.log(error)
        }

    }

    function handleSave(bookId: string | number) {
        agent.Book.save(bookId, localStorage.getItem('token'))
            .then(() => { setSuccess(true); setNewError("") })
            .catch(err => {
                setNewError(getErrorMessage(err))
            })
    }

    let content;
    if (status === 'loading' || data?.length === 0) {
        content = <GalleryMessage message={"Loading..."} />
    } else if (status === 'succeeded') {
        content = data && data.map((book, i) => (
            <Books
                redux={true}
                gridItemSize={gridItemSize}
                key={book.id}
                image={book.volumeInfo.imageLinks?.thumbnail}
                handleGetBook={handleGetBook}
                bookId={book.id}
            />))
    } else if (status === 'rejected') {
        if (typeof (error) === "string") {
            dispatch(clearStoredBook())
            content = <GalleryMessage message={error} />
        }
    }



    return (
        <Box sx={{ mt: { lg: -38, xs: -38, p: 5 }, width: { lg: size, md: 900, xs: 500 }, mb: 'auto', ml: 'auto', mr: 'auto' }}>
            <Paper elevation={3} style={{ backgroundColor: '#FFFFFF' }} sx={{ m: 'auto' }} >
                <Grid container spacing={4} sx={{ height: 535 }}>
                    <Grid item lg={gridSize} md={12}>
                        <Grid container spacing={2} sx={{ height: 510, overflow: "hidden", overflowY: "scroll", overflowX:"scroll" }}>
                            {content}
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={12} sx={display}>
                        <Grid container spacing={2} sx={{ height: 500, overflow: "hidden", overflowY: "scroll" }}>
                            {newError === "" && success === false ? <Grid item xs={12}><Alert severity="info">Save book or search for another one</Alert></Grid> : null}
                            {newError && <Grid item xs={12}><Alert severity="error">{newError}</Alert></Grid>}
                            {success && <Grid item xs={12}><Alert>Book Saved</Alert></Grid>}
                            {view}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Gallary