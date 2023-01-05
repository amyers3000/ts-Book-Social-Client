import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";


const theme = createTheme({
  palette: {
    secondary: {
      main: '#FFFFFF'
    }
  }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
