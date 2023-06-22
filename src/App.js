import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Important from './components/Important';
import Notestate from './context/Notes/Notestate';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Login from './components/Login';
import SignUp from './components/SignUp';
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";

const theme = createTheme({
  palette: {
    primary: {
      main: '#edf1f5',
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Notestate>
      <BrowserRouter>
      <Navbar />
      <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/important" element={<Important />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/signup" element={<SignUp />}/>
            <Route exact path="/about" element={<About />}/>
            <Route exact path="/contact" element={<Contact />}/>
            <Route exact path="/profile" element={<Profile />}/>
      </Routes>
      </BrowserRouter>
    </Notestate>
    </ThemeProvider>
  );
}

export default App;
