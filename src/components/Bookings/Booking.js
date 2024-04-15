import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState();
  const navigate = useNavigate();
  const id = useParams().id;
  //console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);
  //console.log(movie);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        console.log(res);
        navigate(`/user`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets Of Movie : {movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box

              flexDirection="cloumn"
              justifyContent={"column"}
              paddingTop={3}
              width="50%"
              maxWidth="35%"
              marginRight={"auto"}
              marginLeft={"20px"}
            >
              <img
                width={"80%"}
                height="300px"
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Starrer:{movie.actors.map((actor) => " " + actor + ", ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date : {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>

            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    type={"number"}
                    margin="normal"
                    variant="standard"
                    onChange={handleChange}
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    onChange={handleChange}
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
