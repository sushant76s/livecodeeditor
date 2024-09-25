import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Container,
  Paper,
} from "@mui/material";
import codeImage from "../assets/images/code-image.png";
import { setToken, setUserId } from "../authentication/auth";
import { userSignIn } from "../services/UserAPI";

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const redirectToSignUp = () => {
    navigate("/signup");
  };

  const validateUser = async () => {
    if (!userEmail || !userPassword) {
      toast.error("Email and password are required!");
      return;
    }

    const loginData = {
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await userSignIn(loginData);

      if (!response) {
        throw new Error("Network response was not ok");
      }

      setToken(response.token);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "There was an error with the login.");
      console.error("There was an error!", error);
    }
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      validateUser();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={codeImage}
          alt="logo"
          sx={{ width: 150, height: 75 }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          Login to LiveCodeEditor
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={validateUser}
          >
            Login
          </Button>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              If you are a new user create &nbsp;
              <Link
                component="button"
                variant="body2"
                onClick={redirectToSignUp}
              >
                account
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
