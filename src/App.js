import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage.js";
import Admin from "./components/Auth/Admin.js";
import Auth from "./components/Auth/Auth.js";
import Movies from "./components/Movies/Movies.js";
import Booking from "./components/Bookings/Booking";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "./store";
import UserProfile from "./components/Profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./components/Profile/AdminProfile";

const App = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn:", isAdminLoggedIn);
  console.log("isUserLoggedIn:", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/movies/booking/:id" element={<Booking />} />
            </>
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Route path="/add" element={<AddMovie />} />
              <Route path="/user-admin" element={<AdminProfile />} />
            </>
          )}
        </Routes>
      </section>
    </>
  );
};

export default App;

// hosted on https://practiceproject-moviebookingapp-frontend.onrender.com