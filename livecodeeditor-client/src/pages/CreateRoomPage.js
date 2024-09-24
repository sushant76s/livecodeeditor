import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardMedia,
} from "@mui/material";
import codeImage from "../assets/images/code-image.png";

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room Id and username are required!");
      return;
    }
    navigate(`/room/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f3f4f6" }}
    >
      <Card sx={{ padding: 3, width: 400, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={codeImage}
          alt="logo"
          sx={{ objectFit: "contain" }}
        />
        <Typography
          variant="h6"
          textAlign="center"
          mt={3}
          mb={2}
          fontWeight="bold"
        >
          Paste Invitation Room ID...
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            label="Room ID"
            variant="outlined"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={joinRoom}
          >
            Join
          </Button>

          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            mt={3}
          >
            If you don't have an invite, you can create a&nbsp;
            <Link href="#" onClick={createNewRoom}>
              new room
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default CreateRoomPage;
