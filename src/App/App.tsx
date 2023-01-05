import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import LogIn from "../Components/User/LogIn";


const theme = createTheme({
  palette: {
    secondary: {
      main: '#FFFFFF',
      dark: '#d4652f',
      light:'#001c3d'
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
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LogIn/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
