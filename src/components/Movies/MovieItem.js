import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl,id }) => {

  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn)
  const navigate = useNavigate()


  const handleBookingClick = () =>{
    if(isLoggedIn) {
      navigate(`booking/${id}`)
    }else{
      navigate(`/auth`)
    }
  }



  //console.log(releaseDate)
  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 320,
        borderRadius: 3,
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
      }}
    >
      <img height={"50%"} width="100%" src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString() }
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant ="contained"
          fullWidth
          LinkComponent={Link}
          onClick = {handleBookingClick}
          size="small"
          sx={{
            bgcolor:"#2b2d42",
            margin: "auto",
            ":hover": {bgcolor:"#121217" ,boxShadow: "10px 10px 20px #ccc" },
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
