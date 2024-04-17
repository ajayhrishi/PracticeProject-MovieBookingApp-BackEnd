import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  console.log(movies);
  return (
    <Box width="100%" height="100%" margin="auto" marginTop="2">
      <Box margin="auto" width="80%" height="40vh" padding="2">
        <img
          width="100%"
          height="100%"
          src="https://img.freepik.com/free-vector/online-cinema-banner-with-open-clapper-board-film-strip_1419-2242.jpg"
          alt="KABZA"
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign="center">
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin="auto"
        display="flex"
        width="80%"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies.slice(0,4).map((movie, index) => (
            <MovieItem
              id={movie._id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              key={index}
            />
          ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{
            margin: "auto",
            color: "#2b2d42",
            ":hover": {bgcolor:"#121217", boxShadow: "10px 10px 20px #ccc",},
          }}
        >
          VIEW ALL MOVIES
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
