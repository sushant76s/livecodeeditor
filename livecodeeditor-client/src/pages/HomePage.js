import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import CodeIcon from "@mui/icons-material/Code";
import codeImage from "../assets/images/code-image.png";
import { userInfo } from "../services/UserAPI";
import { INITIAL_PATH } from "../config-global";

const guestUserId = process.env.REACT_APP_GUEST_USER_ID;

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleCreateRoom = () => {
    navigate(INITIAL_PATH.createRoom, {
      state: {
        user,
        isGuest: false,
      },
    });
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToSignUp = () => {
    navigate("/signup");
  };

  const handleTryEditor = () => {
    navigate(INITIAL_PATH.createRoom, {
      state: {
        isGuest: true,
      },
    });
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await userInfo();
      // console.log(userDetails);
      if (userDetails !== null) {
        setUser(userDetails.user);
      }
    };
    getUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setUser(null);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* AppBar / Navbar */}
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#fff", color: "#000", mb: 4, width: "100%" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <CodeIcon sx={{ mr: 1 }} />
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

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <Grid container spacing={2}>
          {/* Card 1 */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={codeImage}
                alt="LiveCodeEditor"
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  LiveCodeEditor
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  LiveCodeEditor is a collaborative real-time code editing tool
                  with integrated chat support, allowing multiple users to
                  connect and view code snippets simultaneously.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Cards 2, 3, and 4 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Experience real-time collaborative coding with LiveCodeEditor!
                </Typography>
                {user ? (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleCreateRoom}
                  >
                    LiveCodeEditor
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleTryEditor}
                  >
                    Try as Guest
                  </Button>
                )}
              </CardContent>
            </Card>

            {!user && (
              <>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      Access your LiveCodeEditor account to join collaborative
                      coding sessions and chat with peers in real-time.
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={redirectToLogin}
                    >
                      Login
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      Create your LiveCodeEditor account to start collaborating
                      on code snippets and chatting with your team instantly.
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={redirectToSignUp}
                    >
                      Signup
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <footer
        style={{
          padding: "20px 0",
          backgroundColor: "#fff",
          marginTop: "40px",
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          Developed by{" "}
          <Link
            href="https://github.com/sushant76s/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sushant
          </Link>{" "}
          &copy;2024
        </Typography>
      </footer>
    </div>
  );
};

export default HomePage;
