import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
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
import { createRoom, getRoom, joinRoom } from "../services/RoomAPI";
import { useAuth } from "../authentication/AuthContext";
import { initSocket } from "../socket";
import MainHeader from "../components/header/MainHeader";

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const location = useLocation();
  const socketRef = useRef(null);

  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [username, setUserName] = useState("");

  const isUser = location.state?.user ? true : false;

  console.log("Location State in Create Room Page: ", location.state);

  const handleCheckRoomId = async () => {
    const init = async () => {
      socketRef.current = await initSocket();
      // Emit an action to check if the room exists
      socketRef.current.emit("check-room", { roomId });

      // Return a promise that resolves when we get the room-check-response
      return new Promise((resolve) => {
        socketRef.current.on("room-check-response", ({ exists }) => {
          if (exists) {
            resolve(true); // Room exists
          } else {
            resolve(false); // Room doesn't exist
          }
        });
      });
    };

    // Wait for the result of room check and return it
    const check = await init();
    return check;
  };

  useEffect(() => {
    const getRoomList = async () => {
      const roomList = await getRoom();
      console.log("Room List: ", roomList);
      if (roomList) {
        setRooms(
          roomList.roomList.map((room) => ({
            id: room.roomId,
            name: room.roomName,
          }))
        );
      }
    };

    if (!isGuest && isUser) {
      getRoomList();
    }
  }, [isGuest, isUser]);

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

  const joinRoomFromList = async (room) => {
    console.log("List: ", room);
    setRoomId(room.id);
    setRoomName(room.name);
    // Join Room API
    if (!isGuest && isUser) {
      const joinedRoomResponse = await joinRoom({ roomId: room.id });
      console.log("Joined Room: ", joinedRoomResponse);
      if (joinedRoomResponse) {
        navigate(`/room/${room.id}`, {
          state: {
            roomName: room.name,
            roomId: room.id,
            user: location.state?.user,
          },
        });
      }
    }
  };

  const joinRoomUsingForm = async () => {
    if (!roomId || (!isGuest && isUser && !username)) {
      toast.error("Room ID and roomName are required!");
      return;
    }
    // Create Room API
    if (!isGuest && isUser) {
      if (!roomId || !roomName || (!isGuest && isUser && !username)) {
        toast.error("Room ID and roomName are required!");
        return;
      }
      const createdRoomResponse = await createRoom({
        roomId,
        roomName,
      });
      console.log("Created Room Response: ", createdRoomResponse);
      if (createdRoomResponse) {
        navigate(`/room/${roomId}`, {
          state: {
            roomName,
            roomId,
            user: location.state?.user,
          },
        });
      }
    } else {
      const testUser = {
        id: uuidv4(),
        fullName: username,
        email: `${username}@gmail.com`,
      };
      navigate(`/room/${roomId}`, {
        state: {
          roomName: "Guest-" + testUser.id.slice(0, 5),
          roomId,
          user: testUser,
        },
      });
    }
  };

  const joinRoomUsingId = async () => {
    if (!roomId || (!isGuest && isUser && !username)) {
      toast.error("Room ID and roomName are required!");
      return;
    }
    if (!isGuest && isUser) {
      const data = {
        roomId,
      };
      // Join Room API
      const joinedRoomResponse = await joinRoom(data);
      console.log("Joined Room: ", joinedRoomResponse);
      if (joinedRoomResponse) {
        navigate(`/room/${roomId}`, {
          state: {
            roomName: joinedRoomResponse.room.roomName,
            roomId,
            user: location.state?.user,
          },
        });
      }
    } else {
      const isValidRoomId = await handleCheckRoomId();
      console.log("validate id: ", isValidRoomId);
      if (isValidRoomId) {
        const testUser = {
          id: uuidv4(),
          fullName: username,
          email: `${username}@gmail.com`,
        };
        navigate(`/room/${roomId}`, {
          state: {
            roomName: "Guest-" + testUser.id.slice(0, 5),
            roomId,
            user: testUser,
          },
        });
      } else {
        toast.error("Room does not exist. Please check the room ID.");
      }
    }
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoomUsingForm();
    }
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

  console.log("Guest: ", isGuest);
  console.log("User: ", isUser);

  return (
    <>
      <MainHeader />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#f3f4f6" }}
      >
        <Card sx={{ padding: 3, width: 500, boxShadow: 3 }}>
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
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {rooms.length > 0 ? (
                <List>
                  {rooms.map((room) => (
                    <div key={room.id}>
                      <ListItem button onClick={() => joinRoomFromList(room)}>
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
                    onClick={createNewRoom}
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
                disabled
              />
              {isGuest && !isUser ? (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Room Name"
                  variant="outlined"
                  value="Guest"
                  // onChange={(e) => setRoomName(e.target.value)}
                  // onKeyUp={handleInputEnter}
                  disabled
                />
              ) : (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Room Name"
                  variant="outlined"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  // onKeyUp={handleInputEnter}
                />
              )}
              {isGuest && !isUser && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="User Name"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  // onKeyUp={handleInputEnter}
                />
              )}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={joinRoomUsingForm}
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
                // onKeyUp={handleInputEnter}
              />
              {isGuest && !isUser && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="User Name"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  // onKeyUp={handleInputEnter}
                />
              )}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={joinRoomUsingId}
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
    </>
  );
};

export default CreateRoomPage;
