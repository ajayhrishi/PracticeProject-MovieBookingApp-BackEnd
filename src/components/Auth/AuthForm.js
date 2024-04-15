import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";


import React, { useState } from "react";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
const labelStyle = { mt: 1, mb: 1 };

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formInputs));
    onSubmit({ formInputs, signup: isAdmin ? false : isSignUp });
  };

  const validate = (formInputs) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formInputs.name) {
      errors.name = "Name is required !";
    }

    if (!formInputs.email) {
      errors.email = "Email is required";
    } else if (!regex.test(formInputs.email)) {
      errors.email = "This is not a valid email format !";
    }

    if (!formInputs.password) {
      errors.password = "Password is required";
    } else if (formInputs.password.length < 6) {
      errors.password = " Password must be more than 6 characters !";
    } else if (formInputs.password.length > 12) {
      errors.password = "Password can not exceed more than 12 characters";
    }

    return errors;
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <DisabledByDefaultRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignUp ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent="center"
          flexDirection={"column"}
          width={400}
          margin="auto"
          alignContent={"center"}
        >
          {!isAdmin && isSignUp && (
            <>
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                variant="standard"
                margin="normal"
                name={"name"}
                onChange={handleChange}
              />
              <p style={{ color: "red" }}>{formErrors.name}</p>
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            variant="standard"
            margin="normal"
            type={"email"}
            name={"email"}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{formErrors.email}</p>
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            variant="standard"
            margin="normal"
            type={showPassword ? "text" : "password"}
            name={"password"}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <p style={{ color: "red" }}>{formErrors.password}</p>

          <Button
            type="submit"
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            variant="contained"
            fullWidth
          >
            {isSignUp ? "Signup" : "Login"}
          </Button>
          {!isAdmin && (
            <Button
              onClick={() => {
                setIsSignUp(!isSignUp);
              }}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              Switch to {isSignUp ? "Login" : "Signup"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
