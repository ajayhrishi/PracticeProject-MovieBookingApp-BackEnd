import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../../api-helpers/api-helpers";

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    releaseDate: "",
    posterUrl: "",
    featured: false,
  });

  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors})
      .then(() => navigate(`/user-admin`))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography
            textAlign={"center"}
            variant={"h5"}
            fontFamily={"veranda"}
            mb={6}
          >
            Add New Movie
          </Typography>
          <FormLabel>Title</FormLabel>
          <TextField
            name="title"
            onChange={handleChange}
            variant="standard"
            margin="normal"
          />
          <FormLabel>Description</FormLabel>
          <TextField
            name="description"
            onChange={handleChange}
            variant="standard"
            margin="normal"
          />
          <FormLabel>Release Date</FormLabel>
          <TextField
            name="releaseDate"
            onChange={handleChange}
            type="date"
            variant="standard"
            margin="normal"
          />
          <FormLabel>Poster Url</FormLabel>
          <TextField
            name="posterUrl"
            onChange={handleChange}
            variant="standard"
            margin="normal"
          />
          <FormLabel>Actors</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={actor}
              name="actor"
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              margin="normal"
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel>Featured</FormLabel>
          <Checkbox
            name="featured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            variant="contained"
            sx={{
              width: "30%",
              bgcolor: "#2b2d42",
              margin: "auto",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
            type="submit"
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;
