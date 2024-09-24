import React, { useState, useEffect } from "react";
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
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import codeImage from "../assets/images/code-image.png";

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const [rooms, setRooms] = useState([
    { id: "room1", name: "Room 1" },
    { id: "room2", name: "Room 2" },
    { id: "room3", name: "Room 3" },
    { id: "room4", name: "Room 4" },
    { id: "room5", name: "Room 5" },
    { id: "room6", name: "Room 6" },
    { id: "room7", name: "Room 7" },
    { id: "room8", name: "Room 8" },
    { id: "room9", name: "Room 9" },
  ]);

  // useEffect(() => {
  //   const id = uuidv4();
  //   setRoomId(id); // Automatically generate and set the room ID
  // }, []);

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    setTabValue(1);
    // toast.success("Created a new room");
  };

  const joinExistingRoom = (e) => {
    e.preventDefault();
    setRoomId("");
    setTabValue(2);
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room ID and username are required!");
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

  const handleRoomClick = (room) => {
    setRoomId(room.id);
    setUsername(room.name);
    navigate(`/room/${room.id}`, {
      state: {
        username: room.name,
      },
    });
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 1) {
      const id = uuidv4();
      setRoomId(id);
    }
    if (newValue === 2) {
      setRoomId("");
    }
    setTabValue(newValue);
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
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{ marginBottom: 3 }}
        >
          <Tab label="Existing Rooms" />
          <Tab label="Create Room" />
          <Tab label="Join Room" />
        </Tabs>

        {tabValue === 0 && (
          <Box
            sx={{
              maxHeight: "300px", // Set fixed height
              overflowY: "auto", // Make list scrollable
            }}
          >
            {rooms.length > 0 ? (
              <List>
                {rooms.map((room) => (
                  <div key={room.id}>
                    <ListItem button onClick={() => handleRoomClick(room)}>
                      <ListItemText primary={room.name} />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            ) : (
              <Box textAlign="center">
                <Typography variant="body1" color="textSecondary">
                  No rooms available.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => setTabValue(1)}
                >
                  Create a New Room
                </Button>
              </Box>
            )}
          </Box>
        )}

        {tabValue === 1 && (
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Room ID"
              variant="outlined"
              value={roomId}
              // InputProps={{
              //   readOnly: true, // or use disabled: true if you prefer
              // }}
              disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="Room Name"
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
              Create & Join Room
            </Button>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
              mt={3}
            >
              If you have an invite, you can join a&nbsp;
              <Link href="#" onClick={joinExistingRoom}>
                existing room
              </Link>
            </Typography>
          </Box>
        )}

        {tabValue === 2 && (
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={joinRoom}
            >
              Join Room
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
        )}
      </Card>
    </Box>
  );
};

export default CreateRoomPage;
