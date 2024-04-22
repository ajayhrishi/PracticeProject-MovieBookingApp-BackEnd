import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById, getMovieDetails } from "../../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AdminProfile = () => {
  console.log('adminPorfile Component triggered');
  const [movies, setMovies] = useState([]);
  const [admin, setAdmin] = useState(null);
  console.log('going in to the userEffect');
  useEffect(() => {
    console.log("check Point #1");
    getAdminById()
      .then((res) => {
        setAdmin(res.admin);
        const movieDetailsPromises = res.admin.movies.map(async (movie) => {
          return await getMovieDetails(movie);
        });
        Promise.all(movieDetailsPromises).then((moviesData) => {
          setMovies(moviesData);
          console.log('checkpoint #2', moviesData);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // Admin Profile Check point
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {admin && (
          <Box
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Name : {admin.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {admin.email}
            </Typography>
          </Box>
        )}

        {admin && admin.movies.length > 0 && (
          <Box width={"70%"} display={"flex"} flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"veranda"}
              textAlign={"center"}
              padding={2}
            >
              Added Movies
            </Typography>
            <Box
              margin={"auto"}
              display={"flex"}
              flexDirection={"column"}
              width={"80%"}
            >
              <List>
                {movies.map((movie, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      borderRadius: 3,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie: {movie.title ? movie.title : 'loading'}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}

      </Fragment>
    </Box>
  );
};

export default AdminProfile;