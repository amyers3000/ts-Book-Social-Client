import { createTheme, ThemeProvider } from "@mui/material";
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
      <Home />
    </ThemeProvider>
  );
}

export default App;
