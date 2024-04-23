import { useState } from "react";
import "./App.css";
import Data from "./Data";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
 palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
 },
 typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
 },
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <ThemeProvider theme={theme}>
      <h1>Library</h1>
      <Data />
    </ThemeProvider>
    </>
    );
}

export default App;
