import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import codeImage from "../assets/images/code-image.png";
import { userInfo } from "../services/UserAPI";
import { INITIAL_PATH } from "../config-global";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/footer/Footer";
import CustomCard from "../components/custom-card/CustomCard";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout, isGuest, authToken } = useAuth();
  const [user, setUser] = useState(null);

  const handleCreateRoom = () => {
    navigate(INITIAL_PATH.createRoom, {
      state: {
        user,
      },
    });
  };

  const redirectToLogin = () => {
    navigate("/auth?type=signin");
  };

  const redirectToSignUp = () => {
    navigate("/auth?type=signup");
  };

  const handleTryEditor = () => {
    navigate(INITIAL_PATH.createRoom);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await userInfo();
      // console.log(userDetails);
      if (userDetails !== null) {
        setUser(userDetails.user);
      }
    };
    if (!isGuest) {
      getUserDetails();
    }
  }, [isGuest]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setUser(null);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* AppBar / Navbar */}
      <MainHeader user={user} handleLogout={handleLogout} />

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <Grid container spacing={2}>
          {/* Card 1 */}
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomCard
              image={codeImage}
              altText="LiveCodeEditor"
              title="LiveCodeEditor"
              description="LiveCodeEditor is a collaborative real-time code editing tool
                  with integrated chat support, allowing multiple users to
                  connect and view code snippets simultaneously."
            />
          </Grid>

          {/* Cards 2, 3, and 4 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomCard
              description="Experience real-time collaborative coding with LiveCodeEditor!"
              buttonText={user ? "Join Room/Create Room" : "Try as Guest"}
              onButtonClick={user ? handleCreateRoom : handleTryEditor}
            />

            {!user && (
              <>
                <CustomCard
                  description="Access your LiveCodeEditor account to join collaborative coding sessions and chat with peers in real-time."
                  buttonText="Login"
                  onButtonClick={redirectToLogin}
                />
                <CustomCard
                  description="Create your LiveCodeEditor account to start collaborating on code snippets and chatting with your team instantly."
                  buttonText="Signup"
                  onButtonClick={redirectToSignUp}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
