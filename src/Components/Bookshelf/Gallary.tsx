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



const Shelf = () => {
  const [data, setData] = useState<User | {}>({})
  const [bookshelf, setBookShelf] = useState<SavedBooks[] | []>([])
  const [bookData, setBookData] = useState<SavedBooks | {}>({})
  const [show, setShow] = useState<boolean>(false)
  const [bookId, setBookId ] = useState<number[]>()
  const dispatch = useDispatch()
 

  useEffect(() => {
    agent.User.check(localStorage.getItem('token'))
      .then(res => { setData(res.user); setBookShelf(res.user.books) })
      .catch(e => console.log(e))
  }, [bookData])

  useEffect(() => {
    if(bookId)
    handleGetBook(bookId[bookId.length - 1])
  }, [bookId])

  function handleGetBook(id: string | number | undefined) {
    agent.Book.getBook(id, localStorage.getItem('token'))
      .then(res => setBookData(res))
      .then(() => setShow(true))
      .catch(e => console.log(e))
  }

  function handleRemove(bookId: number) {
    agent.Book.remove(bookId, localStorage.getItem('token'))
      .then(() => setBookData({}))
      .catch(e => console.log(e))

  }


  function handleSubmit(e: FormEvent<HTMLFormElement>, id: number, newComment: string) {
    e.preventDefault()
    agent.Comments.newComment(id, newComment, localStorage.getItem('token'))
        .then(() =>  bookId ? setBookId([...bookId, id]) : setBookId([id]))
        .catch(e => console.log(e))
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
      comments={bookData.comments}
      bookId={bookData.bookId}
      handleRemove={handleRemove}
      handleSubmit={handleSubmit}
       />
  } else {
    gridSize = 12
    gridItemSize = 3
    size = 1000
    content = null
    display = { display: "none" }
  }


  let profile;
  if ("firstName" in data) {
    let date = new Date(data.createdAt)
    profile = <Profile
      firstName={data.firstName}
      lastName={data.lastName}
      city={data.city}
      date={date.toLocaleDateString()}
      state={data.state}
      followers={data.followers}
      following={data.following}
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
                {bookshelf ? bookshelf.map((book) => (
                  <Books redux={false}
                    gridItemSize={gridItemSize}
                    key={book.bookId}
                    image={book.image}
                    handleGetBook={handleGetBook}
                    bookId={book.bookId}
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