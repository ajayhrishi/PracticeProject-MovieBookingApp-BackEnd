import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { adminActions,errorActions } from "../../store";
import AuthForm from "./AuthForm";

const Admin = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const onResponseRecieved = (data) =>{ 
    console.log(data);
    if(data.status==="error"){console.log(data.loginError)
     return dispatch(errorActions.setError(data.loginError))
    } // to set the login error
    dispatch(errorActions.removeError());
    dispatch(adminActions.login());
    console.log('setting the location storage');
    localStorage.setItem("adminId", data.id)
    localStorage.setItem("token", data.token)
    console.log('admin Id', localStorage.getItem("adminId"));
    console.log('token', localStorage.getItem("token"));
    navigate("/")

  }
  const getData = (data) => {
    console.log("Admin", data);
    sendAdminAuthRequest(data.formInputs)
      .then(onResponseRecieved)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
