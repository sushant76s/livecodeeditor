import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import toast from "react-hot-toast";
import codeImage from "../../assets/images/code-image.png";

const AuthForm = ({
  title,
  fields,
  onSubmit,
  redirectText,
  redirectAction,
  redirectLinkText,
  buttonText,
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const isEmptyField = fields.some((field) => !formData[field.name]);
    if (isEmptyField) {
      toast.error("All fields are required!");
      return;
    }
    onSubmit(formData);
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
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
          sx={{ width: 300, height: 75 }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          {title}
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={field.name}
              label={field.label}
              type={field.type || "text"}
              autoComplete={field.autoComplete}
              value={formData[field.name]}
              onChange={handleChange}
              onKeyUp={handleInputEnter}
            />
          ))}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              {redirectText}&nbsp;
              <Link component="button" variant="body2" onClick={redirectAction}>
                {redirectLinkText}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;
