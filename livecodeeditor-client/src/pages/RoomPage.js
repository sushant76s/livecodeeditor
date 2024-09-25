import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { initSocket } from "../socket";
import toast from "react-hot-toast";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import {
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

import CodeEditor from "../components/CodeEditor";
// import ChatRoom from "../components/ChatRoom";
// import VerticalMenu from "../components/VerticalMenu";
// import { getUser } from "../services/UserAPI";
import ChatComponent from "../components/Chat";
import ListComponent from "../components/List";
import { roomInfo } from "../services/RoomAPI";

const drawerWidth = 300; // Width for Section B (25%)

// Create a container using Grid layout
const GridContainer = styled(Grid)(({ theme, isHidden }) => ({
  display: "grid",
  gridTemplateColumns: !isHidden ? "1fr" : "75% 25%", // Dynamic grid columns
  height: "calc(100vh - 64px)", // Full height minus AppBar height
  transition: "grid-template-columns 0.3s ease", // Smooth transition
  padding: theme.spacing(0),
}));

// const AppBarFixed = styled(AppBar)(({ theme }) => ({
//   top: "auto",
//   bottom: 0, // Stick it to the bottom
//   height: "64px",
//   zIndex: theme.zIndex.drawer + 1,
// }));

const AppBarFixed = styled(AppBar)(({ theme }) => ({
  top: "auto",
  bottom: 0, // Stick it to the bottom
  height: "48px", // Reduced height
  zIndex: theme.zIndex.drawer + 1,
  padding: "0 10px", // Adjust horizontal padding if necessary
  justifyContent: "center", // Center vertically
  "& .MuiToolbar-root": {
    minHeight: "48px", // Ensure toolbar height matches the app bar
    alignItems: "center", // Center content vertically
  },
  background: "#cfcfcf",
}));

const SectionA = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: "#f0f0f0",
  height: "100%",
  overflow: "auto",
}));

const SectionB = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  // backgroundColor: "#cfcfcf",
  backgroundColor: "#f0f0f0",
  height: "100%",
  overflow: "auto", // Ensure proper scroll behavior
}));

export default function RoomPage() {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [isBHidden, setIsBHidden] = useState(false);
  const [isUserList, setIsUserList] = useState(false); // Default to UserList being shown
  const [isChatOpen, setIsChatOpen] = useState(false); // Default Chat is hidden
  const [editorFontSize, setEditorFontSize] = useState("12px");
  const [editorTheme, setEditorTheme] = useState("light");

  const [clients, setClients] = useState([]);

  console.log("state: ", location.state);

  useEffect(() => {
    const infoFunction = async () => {
      const res = await roomInfo({ roomId });
      console.log("Room Info: ", res);
    };
    infoFunction();
  }, []);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        navigate("/");
      }

      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} Joined the Room`);
        }

        setClients(clients);
        socketRef.current.emit("sync-code", {
          code: codeRef.current,
          socketId,
        });
      });

      // Listening for DISCONNECTED event
      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} Left the room.`);
        setClients((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );
      });
    };
    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.off("joined");
        socketRef.current.off("disconnected");
        socketRef.current.disconnect();
      }
    };
  }, [roomId]);

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const toggleBVisibility = () => {
  //   setIsBHidden(!isBHidden);
  // };

  const toggleUserList = () => {
    if (isChatOpen) {
      setIsChatOpen(!isChatOpen);
    }
    const newListState = !isUserList;
    setIsUserList(newListState);
    setIsBHidden(newListState || isChatOpen);
  };

  const toggleChatVisibility = () => {
    if (isUserList) {
      setIsUserList(!isUserList);
    }
    const newChatState = !isChatOpen;
    setIsChatOpen(newChatState);
    setIsBHidden(newChatState || isUserList);
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room Id has been copied to your clipboard.");
    } catch (err) {
      toast.error("Failed to copy the room id.");
      console.error(err);
    }
  };

  const handleCopyCode = async () => {
    if (codeRef.current) {
      try {
        const code = codeRef.current; // Get the code from the ref
        await navigator.clipboard.writeText(code);
        toast.success("Code has been copied to your clipboard.");
      } catch (err) {
        toast.error("Failed to copy the code.");
        console.error(err);
      }
    }
  };

  function leaveRoom() {
    navigate("/");
  }

  const handleEditorFontSize = (event) => {
    setEditorFontSize(event.target.value);
  };

  const handleEditorTheme = (event) => {
    setEditorTheme(event.target.value);
  };

  console.log("clients: ", clients);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <GridContainer container isHidden={isBHidden}>
        {/* Section A (75%) */}
        <SectionA>
          <Paper sx={{ padding: 1, mb: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">Code Editor</Typography>

              <Stack direction="row-reverse" spacing={2}>
                {/* First Select Button */}
                <FormControl sx={{ m: 1, minWidth: 110 }} size="small">
                  {/* <InputLabel id="demo-select-small-label">Font Size</InputLabel> */}
                  <Select
                    // labelId="demo-select-small-label"
                    // id="demo-select-small"
                    value={editorFontSize}
                    onChange={handleEditorFontSize}
                    // label="Font Size"
                    size="small"
                    // sx={{ p: "4px 0 8px 5px", height: "1em" }}
                  >
                    <MenuItem value="12px">12px</MenuItem>
                    <MenuItem value="14px">14px</MenuItem>
                    <MenuItem value="16px">16px</MenuItem>
                    <MenuItem value="18px">18px</MenuItem>
                  </Select>
                </FormControl>

                {/* Second Select Button */}
                <FormControl sx={{ m: 1, minWidth: 100, p: 0 }} size="small">
                  {/* <InputLabel id="demo-select-small-label">Theme</InputLabel> */}
                  <Select
                    // labelId="demo-select-small-label"
                    // id="demo-select-small"
                    value={editorTheme}
                    onChange={handleEditorTheme}
                    // label="Theme"
                    size="small"
                  >
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="light">Light</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" onClick={handleCopyCode}>
                  Copy Code
                </Button>
              </Stack>
            </Stack>
          </Paper>
          <CodeEditor
            editorTheme={editorTheme}
            fontSize={editorFontSize}
            socketRef={socketRef}
            roomId={roomId}
            codeRef={codeRef}
          />
        </SectionA>

        {/* Section B (25%) */}
        {isBHidden && (
          <SectionB>
            {isUserList && (
              // <VerticalMenu
              //   clients={clients}
              //   copyRoomId={copyRoomId}
              //   leaveRoom={leaveRoom}
              // />
              <ListComponent clients={clients} />
            )}
            {isChatOpen && (
              // <ChatRoom
              //   socketRef={socketRef}
              //   roomId={roomId}
              //   username={location.state?.username}
              // />
              <ChatComponent />
            )}
          </SectionB>
        )}
      </GridContainer>

      {/* Bottom AppBar */}
      <AppBarFixed position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={copyRoomId}
            sx={{ mr: 1 }}
          >
            Copy RoomID
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={leaveRoom}
            sx={{ mr: 1 }}
          >
            Leave Room
          </Button>

          <Button
            variant="outlined"
            color="primary"
            // disabled={isUserList}
            onClick={toggleUserList}
            sx={{ mr: 1 }}
          >
            Users
          </Button>
          <Button
            variant="outlined"
            color="primary"
            // disabled={isChatOpen}
            // color="inherit"
            onClick={toggleChatVisibility}
          >
            Chat
          </Button>

          {/* Right-side icon button */}
          {/* <IconButton
            color="primary"
            aria-label="open drawer"
            edge="end"
            sx={{ ml: "auto" }}
            onClick={toggleBVisibility}
          >
            <MenuIcon />
          </IconButton> */}
        </Toolbar>
      </AppBarFixed>
    </Box>
  );
}
