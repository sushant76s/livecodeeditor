import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import LogoutIcon from "@mui/icons-material/Logout";
import GitHubIcon from "@mui/icons-material/GitHub";

const MainHeader = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        mb: 2,
        width: "100%",
      }}
    >
      <Toolbar variant="dense">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button sx={{ color: "black" }} onClick={handleRedirectToHome}>
            <CodeIcon />
          </Button>
          LiveCodeEditor
        </Typography>
        {user && (
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Hi, {user.fullName}
          </Typography>
        )}
        {user && (
          <Button
            startIcon={<LogoutIcon />}
            color="inherit"
            onClick={handleLogout}
            sx={{ mr: 2 }}
          >
            Logout
          </Button>
        )}
        <Button
          startIcon={<GitHubIcon />}
          color="inherit"
          href="https://github.com/sushant76s/livecodeeditor/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
