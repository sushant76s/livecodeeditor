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
import { userSignUp } from "../../services/UserAPI";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordAgain, setUserPasswordAgain] = useState("");

  const redirectToLogin = () => {
    navigate("/login");
  };

  const validateUser = async () => {
    if (!userEmail || !userPassword || !user || !userPasswordAgain) {
      toast.error("All the fields are required!");
      return;
    }
    if (userPassword !== userPasswordAgain) {
      toast.error("Password did not match!");
      return;
    }

    const userData = {
      fullName: user,
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await userSignUp(userData);
      if (!response) {
        throw new Error("Network response was not ok");
      }
      toast.success("User registered successfully!");
      console.log("Data after signup: ", response);
      navigate("/login");
    } catch (error) {
      toast.error("There was an error with the registration.");
      navigate("/signup");
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
          Sign Up to LiveCodeEditor
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            autoFocus
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordAgain"
            label="Re-enter Password"
            type="password"
            id="passwordAgain"
            value={userPasswordAgain}
            onChange={(e) => setUserPasswordAgain(e.target.value)}
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
            Sign Up
          </Button>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              If you are already a user, please &nbsp;
              <Link
                component="button"
                variant="body2"
                onClick={redirectToLogin}
              >
                login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
