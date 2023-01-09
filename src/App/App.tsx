import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Bookshelf from "../Components/Bookshelf/Bookshelf";
import Shelf from "../Components/Bookshelf/Gallary";
import ProtectedRoute from "../Components/Features/ProtectedRoute";
import Home from "../Components/Home/Home";
import LogIn from "../Components/User/LogIn";
import SignUp from "../Components/User/SignUp";


const theme = createTheme({
  palette: {
    secondary: {
      main: '#FFFFFF',
      dark: '#d4652f',
      light: '#001c3d'
    },
    primary: {
      main: '#000000',
      light: '#aeaeae'
    }
  }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/bookshelf" element={
          <ProtectedRoute>
            <Shelf/>
          </ProtectedRoute>
        } />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
