import { Box, Grid, Paper } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import agent from '../../App/api'
import { Comments, SavedBooks } from '../../App/models/book'
import { User } from '../../App/models/user'
import Hero from '../Features/Hero'
import Profile from '../Features/Profile'
import Books from '../Features/Books'
import BookView from '../Features/BookView'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addComment, addTempComment, checkUser, getSavedBook, removeSavedBook } from '../../store/bookShelfSlice'
import { useLocation } from 'react-router-dom'



const Shelf = () => {
  const { bookData, show, bookshelfData, user } = useAppSelector((state) => (state.bookshelf))
  const dispatch = useAppDispatch()
  const location = useLocation()
 

  useEffect(() => {
    dispatch(checkUser())
  }, [])

 
  function handleClick(id: number | string){
      dispatch(getSavedBook(id))
  }

  let gridSize: number;
  let gridItemSize: number;
  let size: number
  let content: JSX.Element | null
  let display;
  if (show && "title" in bookData) {
    gridSize = 6
    gridItemSize = 4
    size = 1400
    content = <BookView
      title={bookData.title}
      authors={bookData.authors}
      image={bookData.image}
      description={bookData.description}
      bookId={bookData.bookId}
      location={location.pathname}
       />
  } else {
    gridSize = 12
    gridItemSize = 3
    size = 1000
    content = null
    display = { display: "none" }
  }


  let profile;
  if (user !== undefined) {
    let date = new Date(user.createdAt)
    profile = <Profile
      firstName={user.firstName}
      lastName={user.lastName}
      city={user.city}
      date={date.toLocaleDateString()}
      state={user.state}
      followers={user.followers}
      following={user.following}
    />
  }

  return (
    <>
      <Hero title={"Your Bookshelf."} profile={profile} message={"Browse your favorites and discuss with friends"} />
      <Box sx={{ mt: { lg: -38, xs: -15, p: 5 }, width: { lg: size, md: 900, xs: 500 }, mb: 'auto', ml: 'auto', mr: 'auto' }}>
        <Paper elevation={3} style={{ backgroundColor: '#FFFFFF' }} sx={{ m: 'auto' }} >
          <Grid container spacing={4} sx={{ height: 535 }}>
            <Grid item lg={gridSize} md={12}>
              <Grid container spacing={2} sx={{ height: 510, overflow: "hidden", overflowY: "scroll", overflowX:"scroll" }}>
                {bookshelfData ? bookshelfData.map((book) => (
                  <Books 
                    gridItemSize={gridItemSize}
                    key={book.bookId}
                    image={book.image}
                    bookId={book.bookId}
                    handleClick={handleClick}
                  />
                )) : null}

              </Grid>
            </Grid>
            <Grid item lg={6} md={12} sx={{ display }}>
              <Grid container spacing={1} sx={{ height: 510, overflow: "hidden", overflowY: "scroll" }}>
                {content}
              </Grid>
            </Grid>

          </Grid>
        </Paper>
      </Box>

    </>
  )
}

export default Shelf