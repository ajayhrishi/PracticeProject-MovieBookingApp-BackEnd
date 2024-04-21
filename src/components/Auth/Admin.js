import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { adminActions,loginActions } from "../../store";
import AuthForm from "./AuthForm";

const Admin = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const onResponseRecieved = (data) =>{

    if(data.status==="error"){console.log(data.loginError)
     return dispatch(loginActions.setLoginError(data.loginError))
    } // to set the login error
    dispatch(loginActions.removeLoginError());
    dispatch(adminActions.login())
    localStorage.setItem("adminId", data.id)
    localStorage.setItem("token", data.token)
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
