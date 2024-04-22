import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("http://127.0.0.1:5000/movie/").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async (data, signup) => { 
// need to work on this function
  console.log('triggered the sendUserAuthRequest');
  console.log('first log',data,signup);
 let res;
  let loginErr;
  if(signup){
    console.log('sign Up part');
    res = await axios
    .post(`http://127.0.0.1:5000/user/signUp`, {
      name: data.name,
      email: data.email,
      password: data.password,
    }).catch(err=>{
      if(err.response.status){
     console.log(err.response.data.message);
     loginErr= {
       status:"error",
       loginError: err.response.data.message}
 }})
  }else{
    console.log('login part');
    res = await axios
    .post(`http://127.0.0.1:5000/user/login`, {
      name : "",
      email: data.email,
      password: data.password,
  }).catch(err=>{
     if(err.response.status){
    console.log(err.response.data.message);
    loginErr={
      status:"error",
      loginError: err.response.data.message}
}}) } 
  if(loginErr) return loginErr ;
 
  // }  
 
  console.log('test point', res);
  console.log(res.data);

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected error occured");
    console.log(res.data); 
};

return res.data;
}

export const sendAdminAuthRequest = async (data) => {
  let res;
  let loginErr;
  try{res = await axios.post("http://127.0.0.1:5000/admin/login", {
    email: data.email,
    password: data.password,
  }) }catch(err){
    console.log('testing point #2',err.response)
    if(err.response.status){
      console.log(err.response.data.message);
      loginErr = {
        status:"error",
        loginError: err.response.data.message}
    }  
  };

  if(loginErr) return loginErr;
  console.log(res);
  if (res.status !== 200 && res.status !== 201) {
    return console.log("unexpected error ocuured!");
  }
  const resData = await res.data;
  return resData;

};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`http://127.0.0.1:5000/movie/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected error occured");
  }

  const resData = res.data;
  return resData;
};

export const newBooking = async (data) => {
  const res = await axios
    .post("http://127.0.0.1:5000/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("unexpected error occured!");
  }

  const resData = await res.data;
  return resData;
};

export const getUserBookingById = async () => {
  const id = localStorage.getItem("userId");

  const res = await axios
    .get(`http://127.0.0.1:5000/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected error ocuured");
  }

  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`http://127.0.0.1:5000/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected error occured");
  }

  const resData = res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`http://127.0.0.1:5000/user/${id}`).catch((err) => console.log(err)); // need to work on this funtion

  if (res.status !== 200) {
    console.log("unexpected error occured");
  }

  const resData = res.data;
  return resData;
};

export const addMovie = async (data) => {

  console.log('check point #addMovie start');
  const res = await axios
    .post(
      "http://127.0.0.1:5000/movie/addMovie/",
      {
        title: data.title,
        description: data.description,
        posterURL: data.posterUrl,
        releaseDate: data.releaseDate,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) =>{
      console.log(err);}
      );
      console.log('checkpoint latest');
  if (res.status !== 201) {
    return console.log("Unexpected error occured!");
  }
  console.log('check point ');
  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  // console.log(adminId);
  let res;
  try{
    res = await axios
    .get(`http://127.0.0.1:5000/admin/${adminId}`)   // Need to work on this function as well. 
    .catch((err) => console.log(err));
  }catch(err){
    console.log(err);
  }
  // console.log('this is a check point A');
  if (res.status !== 200) {
    return console.log("Unexpected error occured");
  }

  // console.log('this is the Check point B')

  const resData = res.data;
  return resData;
};

