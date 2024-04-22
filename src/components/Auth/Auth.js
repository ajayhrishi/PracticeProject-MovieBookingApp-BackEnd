import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import { userActions,errorActions  } from "../../store";
import AuthForm from "./AuthForm";

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onResponseRecieved = (data) =>{
    console.log('test point 234',data);
    if(data.status==="error"){console.log(data.error)
      return dispatch(errorActions.setError(data.error))
     } // to set the login error
    dispatch(errorActions.removeError());
    dispatch(userActions.login())
    localStorage.setItem("userId",data.id)
    navigate("/") 
  }
  const getData = (data) => {
    console.log('test point ab',data);
    sendUserAuthRequest(data.formInputs, data.signup)
      .then(onResponseRecieved)
      .catch((err) => console.log(err));
  };

  
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
