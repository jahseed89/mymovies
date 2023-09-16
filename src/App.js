import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, MovieDetails } from "./pages/index";
import { ThemeProvider } from "react-jss";

const theme = {
  colors: {
    blue: "#428bca",
  },
  borderRadius: "5px",
  desContainer: {
    width: "300px",
    display: 'flex',
    justifyContent: 'space-between',
  }
};
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:movie_id" element={<MovieDetails />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
